//app/invoice/page.tsx
"use client"

import { useState } from "react"
import InvoicePreview from "@/components/invoice/InvoicePreview"
import InvoiceForm from "@/components/invoice/InvoiceForm"

export default function EditInvoicePageContent() {
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Invoice Generator</h1>

      {previewMode ? <InvoicePreview /> : <InvoiceForm />}

      <div className="text-center pt-6">
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
        >
          {previewMode ? "← Back to Edit" : "Preview Invoice"}
        </button>
      </div>
    </div>
  )
}
