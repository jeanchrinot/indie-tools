import type { Metadata } from "next"

// Use constants instead of process.env directly in metadata
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Indie Tools"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://buildandbill.com"

export const metadata: Metadata = {
  title: `Privacy policy | ${APP_NAME}`,
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

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains what
        information we collect and how we use it when you use our free invoice
        generator.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. No Personal Data Collection
      </h2>
      <p className="mb-4">
        We do not collect, store, or share any personal information. All data
        you enter into the invoice generator stays in your browser and is not
        sent to any server.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Local Storage</h2>
      <p className="mb-4">
        {`Your invoice data is temporarily saved in your browser's local storage
        to allow autosaving and persistence between sessions. You can clear your
        browser storage at any time to delete this data.`}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Analytics</h2>
      <p className="mb-4">
        We may use privacy-friendly analytics tools (like Plausible or Simple
        Analytics) to understand general usage trends. These do not collect
        personal data or track you across sites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Links</h2>
      <p className="mb-4">
        This site may include links to third-party websites. We are not
        responsible for the content or privacy practices of those websites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Changes to This Policy
      </h2>
      <p className="mb-4">
        {`We may update this policy occasionally. When we do, we'll update the
        date at the top of the page.`}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p>
        If you have any questions or concerns about this policy, please contact
        us at{" "}
        <a href="mailto:hello@velombe.com" className="underline text-blue-600">
          hello@velombe.com
        </a>
        .
      </p>
    </main>
  )
}
