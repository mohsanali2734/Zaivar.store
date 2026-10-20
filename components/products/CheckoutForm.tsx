"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { byId, formatPrice, PROVINCES } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "phone" | "email" | "address" | "city" | "province", string>>;

const PHONE = /^(\+92|0)3\d{2}[\s-]?\d{7}$/;

export default function CheckoutForm() {
  const { cart, count, subtotal, shipping, total, clear } = useStore();
  const [errors, setErrors] = useState<Errors>({});
  const [province, setProvince] = useState("");
  const [order, setOrder] = useState<{ no: string; total: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const rows = Object.entries(cart).flatMap(([id, q]) => {
    const p = byId(id);
    return p ? [{ p, q }] : [];
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const v = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Errors = {};
    if (!v.name?.trim()) err.name = "Please enter your full name.";
    if (!PHONE.test((v.phone ?? "").trim())) err.phone = "Enter a valid mobile number like 0300 1234567.";
    if (v.email?.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) err.email = "Enter a valid email address.";
    if (!v.address?.trim()) err.address = "Please enter your delivery address.";
    if (!v.city?.trim()) err.city = "Please enter your city.";
    if (!province) err.province = "Please select a province.";
    setErrors(err);
    if (Object.keys(err).length) {
      (document.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus();
      return;
    }

    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: v, province, items: cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setOrder({ no: data.orderNo, total: data.total });
      clear();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    return (
      <div className="wrap grid place-items-center gap-4 py-24 text-center animate-in fade-in zoom-in-95 duration-700">
        <CheckCircle2 className="size-16 text-primary" strokeWidth={1.2} />
        <h1>Thank you!</h1>
        <p className="max-w-md text-muted-foreground">
          Order <strong className="text-foreground">{order.no}</strong> is confirmed. Pay {formatPrice(order.total)} in cash when it arrives. We will message you on WhatsApp with tracking.
        </p>
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "mt-4 h-12 px-8 text-xs uppercase tracking-widest")}>Keep shopping</Link>
      </div>
    );
  }

  if (!count) {
    return (
      <div className="wrap grid place-items-center gap-4 py-24 text-center">
        <h1>Your bag is empty</h1>
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-xs uppercase tracking-widest")}>Start shopping</Link>
      </div>
    );
  }

  const field = (id: keyof Errors, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-e` : undefined} className="h-12" {...props} />
      {errors[id] && <p id={`${id}-e`} role="alert" className="text-sm text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="wrap py-12">
      <h1 className="mb-10">Checkout</h1>
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <form onSubmit={submit} noValidate className="space-y-6">
          <h2 className="!mb-0 text-2xl">Delivery details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", "Full name", { autoComplete: "name" })}
            {field("phone", "Mobile (03XX XXXXXXX)", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
          </div>
          {field("email", "Email (optional)", { type: "email", autoComplete: "email" })}
          {field("address", "Address", { autoComplete: "street-address" })}
          <div className="grid gap-5 sm:grid-cols-2">
            {field("city", "City", { autoComplete: "address-level2" })}
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select value={province} onValueChange={(value) => setProvince(value ?? "")}>
                <SelectTrigger id="province" className="h-12 w-full" aria-invalid={!!errors.province}><SelectValue placeholder="Select province" /></SelectTrigger>
                <SelectContent>{PROVINCES.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
              </Select>
              {errors.province && <p role="alert" className="text-sm text-destructive">{errors.province}</p>}
            </div>
          </div>

          <div className="border border-primary/50 bg-secondary/50 p-4 text-sm">
            <p className="font-medium">Payment: Cash on delivery</p>
            <p className="text-muted-foreground">Pay the rider when your order arrives.</p>
          </div>

          {serverError && <p role="alert" className="text-sm text-destructive">{serverError}</p>}

          <Button type="submit" size="lg" disabled={loading} className="h-14 w-full text-xs uppercase tracking-widest">
            {loading ? "Placing order..." : `Place order · ${formatPrice(total)}`}
          </Button>
        </form>

        <aside aria-label="Order summary" className="h-fit border bg-secondary/40 p-6 lg:sticky lg:top-24">
          <h2 className="!mb-4 text-2xl">Summary</h2>
          <ul className="divide-y">
            {rows.map(({ p, q }) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <div className="relative size-16 shrink-0 overflow-hidden border">
                  <Image src={p.image} alt={p.alt} fill sizes="64px" className="object-cover" />
                  <span className="absolute right-0 top-0 grid size-5 place-items-center bg-primary text-[10px] font-bold text-primary-foreground">{q}</span>
                </div>
                <p className="flex-1 text-sm">{p.name}</p>
                <p className="text-sm font-medium">{formatPrice(p.price * q)}</p>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
            <div className="flex justify-between pt-2 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}