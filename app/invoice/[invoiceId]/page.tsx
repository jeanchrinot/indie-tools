// app/invoice/page.tsx
import type { Metadata } from "next"
import EditInvoicePageContent from "@/components/invoice/EditInvoicePageContent"

// Use constants instead of process.env directly in metadata
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Indie Tools"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://buildandbill.com"

export const metadata: Metadata = {
  title: `Edit Invoice | ${APP_NAME}`,
  description:
    "Create professional freelance invoices instantly. 100% free and easy to use. No signup or license required.",
  keywords: [
    "free invoice generator",
    "freelance invoice",
    "invoice PDF",
    "invoice template",
    "invoicing tool",
    "indie tools",
  ],
  openGraph: {
    title: "Free Invoice Generator for Freelancers",
    description:
      "Create professional freelance invoices instantly. No signup or license required.",
    url: APP_URL,
    siteName: APP_NAME,
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

export default function EditInvoicePage() {
  return <EditInvoicePageContent />
}
