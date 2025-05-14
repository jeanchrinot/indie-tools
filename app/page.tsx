// File: app/page.tsx
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Free Invoice Generator for Freelancers | ${process.env.NEXT_PUBLIC_APP_NAME}`,
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

export default function HomePage() {
  return (
    <main className="flex-grow flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4">
          Simple Invoicing for Freelancers
        </h2>
        <p className="mb-6 text-lg text-gray-600">
          Generate professional invoices in seconds — completely free. No
          account or license key needed.
        </p>
        <Link href="/invoice" className="button text-lg px-6 py-3">
          Create Invoice
        </Link>
      </div>
    </main>
  )
}
