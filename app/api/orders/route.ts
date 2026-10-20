import { NextResponse } from "next/server";
import { Resend } from "resend";
import { byId, formatPrice, PROVINCES } from "@/lib/products";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const PHONE = /^(\+92|0)3\d{2}[\s-]?\d{7}$/;
const EMAIL = /^\S+@\S+\.\S+$/;

// IMPORTANT: make these match the shipping logic in your lib/store
const FREE_SHIPPING_OVER = 5000;
const SHIPPING_FEE = 250;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Body = {
  customer?: Record<string, string>;
  province?: string;
  items?: Record<string, number>;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const c = body.customer ?? {};
  const name = (c.name ?? "").trim();
  const phone = (c.phone ?? "").trim();
  const email = (c.email ?? "").trim();
  const address = (c.address ?? "").trim();
  const city = (c.city ?? "").trim();
  const province = (body.province ?? "").trim();

  if (
    !name ||
    !PHONE.test(phone) ||
    !address ||
    !city ||
    !(PROVINCES as readonly string[]).includes(province) ||
    (email && !EMAIL.test(email))
  ) {
    return NextResponse.json({ error: "Please check your delivery details." }, { status: 400 });
  }

  // Rebuild the order from the server's own product data (never trust client prices)
  const lines = Object.entries(body.items ?? {}).flatMap(([id, q]) => {
    const p = byId(id);
    const qty = Math.floor(Number(q));
    return p && qty >= 1 && qty <= 99 ? [{ p, qty }] : [];
  });
  if (!lines.length) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const subtotal = lines.reduce((sum, { p, qty }) => sum + p.price * qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const orderNo = `ZV-${Date.now().toString().slice(-6)}`;

  const rowsHtml = lines
    .map(
      ({ p, qty }) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee">${esc(p.name)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${formatPrice(p.price * qty)}</td>
      </tr>`
    )
    .join("");

  const orderTable = `
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #ddd">Item</th>
          <th style="padding:8px;border-bottom:2px solid #ddd">Qty</th>
          <th style="text-align:right;padding:8px;border-bottom:2px solid #ddd">Price</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <p style="text-align:right;margin:12px 0 0">
      Subtotal: ${formatPrice(subtotal)}<br/>
      Shipping: ${shipping ? formatPrice(shipping) : "Free"}<br/>
      <strong style="font-size:16px">Total: ${formatPrice(total)}</strong>
    </p>`;

  const from = process.env.ORDER_FROM_EMAIL!;
  const to = process.env.ORDER_TO_EMAIL!;

  // 1) Email to store owner (required)
  const owner = await resend.emails.send({
    from,
    to,
    replyTo: email || undefined,
    subject: `New order ${orderNo} - ${formatPrice(total)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>New order ${orderNo}</h2>
        <p>
          <strong>Name:</strong> ${esc(name)}<br/>
          <strong>Phone:</strong> ${esc(phone)}<br/>
          <strong>Email:</strong> ${email ? esc(email) : "-"}<br/>
          <strong>Address:</strong> ${esc(address)}, ${esc(city)}, ${esc(province)}<br/>
          <strong>Payment:</strong> Cash on delivery
        </p>
        ${orderTable}
      </div>`,
  });

  if (owner.error) {
    console.error("Resend owner email failed:", owner.error);
    return NextResponse.json({ error: "Could not place your order. Please try again." }, { status: 500 });
  }

  // 2) Confirmation to customer (optional, best-effort)
  if (email) {
    const cust = await resend.emails.send({
      from,
      to: email,
      subject: `Your order ${orderNo} is confirmed`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
          <h2>Thank you, ${esc(name)}!</h2>
          <p>Your order <strong>${orderNo}</strong> is confirmed. Please pay ${formatPrice(total)} in cash when it arrives.</p>
          <p><strong>Delivering to:</strong> ${esc(address)}, ${esc(city)}, ${esc(province)}</p>
          ${orderTable}
        </div>`,
    });
    if (cust.error) console.error("Resend customer email failed:", cust.error);
  }

  return NextResponse.json({ orderNo, total });
}