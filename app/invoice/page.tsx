//app/invoice/page.tsx
import { Metadata } from "next"
import InvoicePageContent from "@/components/invoice/InvoicePageContent"

export const metadata: Metadata = {
  title: "Free Invoice Generator",
  description:
    "Create professional freelance invoices instantly. 100% free and easy to use. No signup or license required.",
  keywords: [
    "free invoice generator",
    "freelance invoice",
    "invoice PDF",
    "invoice template",
    "invoicing tool",
  ],
  openGraph: {
    title: "Free Invoice Generator for Freelancers",
    description:
      "Create professional freelance invoices instantly. No signup or license required.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator for Freelancers",
    description:
      "Create professional freelance invoices instantly. No signup or license required.",
  },
}

export default function InvoicePage() {
  return <InvoicePageContent></InvoicePageContent>
}
