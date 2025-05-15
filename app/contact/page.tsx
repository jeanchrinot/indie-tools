import type { Metadata } from "next"

// Use constants instead of process.env directly in metadata
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Indie Tools"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://buildandbill.com"

export const metadata: Metadata = {
  title: `Contact | ${APP_NAME}`,
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

export default function ContactPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg mb-4">
        If you have any questions, feedback, or collaboration ideas, feel free
        to reach out at{" "}
        <a href="mailto:hello@velombe.com" className="underline text-blue-600">
          hello@velombe.com
        </a>
        !
      </p>
      <p>
        Also,{" "}
        <a
          href="https://velombe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          visit my website
        </a>
      </p>
    </main>
  )
}
