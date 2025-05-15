"use client"

import { useRef } from "react"
import html2canvas from "html2canvas-pro"
import jsPDF from "jspdf"
import InvoiceContent from "@/components/invoice/InvoiceContent"
import { useInvoiceStore } from "@/stores/invoiceStore"

export default function InvoicePreview() {
  const invoiceRef = useRef<HTMLDivElement>(null)
  const { invoiceMeta } = useInvoiceStore()

  const downloadPDF = async () => {
    const element = document.getElementById("invoice-export")
    if (!element) return

    // Force browser to render the hidden element
    element.style.display = "block"

    await new Promise((resolve) => setTimeout(resolve, 100)) // wait for DOM to paint

    const canvas = await html2canvas(element as HTMLElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
    const imgWidth = canvas.width * ratio
    const imgHeight = canvas.height * ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(`Invoice-${invoiceMeta.number || "INV-001"}.pdf`)
    // element.style.display = "none"
  }

  return (
    <div>
      {/* Visible Invoice */}
      <div ref={invoiceRef} className="max-w-3xl mx-auto bg-white">
        <InvoiceContent />
      </div>

      {/* Hidden Export Version */}
      <div
        id="invoice-export"
        className="hidden absolute top-0 left-0 w-[794px] bg-white p-8"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "794px", // or match your real invoice width
          backgroundColor: "white",
        }}
      >
        <InvoiceContent />
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}
