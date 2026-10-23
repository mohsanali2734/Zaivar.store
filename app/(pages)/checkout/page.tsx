import type { Metadata } from "next";
import CheckoutForm from "@/components/products/CheckoutForm";
import { SITE } from "@/lib/products";

export const metadata: Metadata = {
  title: `Checkout | ${SITE.name}`,
  description: `Complete your purchase securely at ${SITE.name}. Fast shipping and Cash on Delivery available across Pakistan.`,
  alternates: {
    canonical: "/checkout",
  },
 
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}