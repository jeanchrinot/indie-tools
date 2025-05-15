import type { Metadata } from "next"

// Use constants instead of process.env directly in metadata
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Indie Tools"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://buildandbill.com"

export const metadata: Metadata = {
  title: `Terms of use | ${APP_NAME}`,
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

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

      <p className="mb-4">
        Welcome to our free invoice generator. By using this tool, you agree to
        the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Free Use</h2>
      <p className="mb-4">
        This tool is provided free of charge for freelancers, small businesses,
        and indie creators. You may use it to generate invoices for your own
        professional or business purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. No Legal or Financial Advice
      </h2>
      <p className="mb-4">
        The invoice generator is a simple tool and does not constitute legal,
        financial, or tax advice. You are responsible for ensuring your invoices
        comply with local laws and tax regulations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. No Warranties</h2>
      <p className="mb-4">
        {`This tool is provided "as is", without any warranties, express or
        implied. We do not guarantee that the tool will be error-free or always
        available.`}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Limitation of Liability
      </h2>
      <p className="mb-4">
        We are not liable for any damages or losses resulting from your use of
        this tool. You assume full responsibility for how you use the invoices
        generated.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Updates & Changes</h2>
      <p className="mb-4">
        We may update or change these terms at any time. Continued use of the
        tool after any changes means you accept the new terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p>
        If you have questions or feedback, feel free to reach out at{" "}
        <a href="mailto:hello@velombe.com" className="underline text-blue-600">
          hello@velombe.com
        </a>
        .
      </p>
    </main>
  )
}
