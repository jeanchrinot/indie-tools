"use client"

import { useRef } from "react"
import html2canvas from "html2canvas-pro"
import jsPDF from "jspdf"
import { useInvoiceStore } from "@/stores/invoiceStore"

export default function InvoicePreview() {
  const invoiceRef = useRef<HTMLDivElement>(null)
  const { freelancer, client, items, tax, invoiceMeta } = useInvoiceStore()

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount

  const downloadPDF = async () => {
    if (!invoiceRef.current) return

    const canvas = await html2canvas(invoiceRef.current, {
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

    // Add clickable link at bottom center (adjust X/Y based on your layout)
    // const linkText = "Created with freeinvoice.com"
    // const x = pageWidth / 2 - pdf.getTextWidth(linkText) / 2
    // const y = imgHeight + 20 // 20px below the image
    // pdf.textWithLink(linkText, x, y, {
    //   url: "https://freeinvoice.com",
    // })

    pdf.save(`Invoice-${invoiceMeta.number || "INV-001"}.pdf`)
  }

  return (
    <div>
      <div
        ref={invoiceRef}
        className="max-w-3xl mx-auto p-8 bg-white text-gray-800 rounded-md shadow"
      >
        {/* Header: Service Provider & Invoice Info */}
        <div className="flex justify-between mb-8">
          {/* Service Provider */}
          <div className="text-sm leading-snug">
            <p className="text-lg font-semibold mb-2">{freelancer.name}</p>
            <div>{freelancer.email}</div>
            <div>{freelancer.phone}</div>
            <div>{freelancer.address}</div>
          </div>

          {/* Invoice Info */}
          <div className="text-sm text-right leading-snug">
            <p className="text-xl font-bold mb-2 text-gray-900">Invoice</p>
            <div>
              Invoice #:{" "}
              <span className="font-medium">{invoiceMeta.number}</span>
            </div>
            <div>
              Date:{" "}
              <span className="font-medium">
                {new Date(invoiceMeta.date || "").toLocaleDateString()}
              </span>
            </div>
            <div>
              Due:{" "}
              <span className="font-medium">
                {new Date(invoiceMeta.dueDate || "").toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Client & Payment Details */}
        <div className="flex justify-between mb-8">
          {/* Client Info */}
          <div className="text-sm leading-snug">
            <p className="font-semibold mb-2">Bill To</p>
            <div>{client.name}</div>
            <div>{client.email}</div>
            <div>{client.phone}</div>
            <div>{client.address}</div>
          </div>

          {/* Payment Details */}
          <div className="text-sm text-right leading-snug">
            <p className="font-semibold mb-2">Payment Details</p>
            <div className="whitespace-pre-line">
              {invoiceMeta.paymentDetails}
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <table className="w-full mb-6 text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 font-semibold text-left">
              <th className="py-2">Description</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Unit Price</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b border-gray-200 last:border-none">
                <td className="py-3">{item.description}</td>
                <td className="py-3">{item.quantity}</td>
                <td className="py-3">€{item.price.toFixed(2)}</td>
                <td className="py-3">
                  €{(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="text-right text-sm text-gray-700 space-y-1 mb-8">
          <p>Subtotal: €{subtotal.toFixed(2)}</p>
          {tax > 0 && (
            <p>
              Tax ({tax}%): €{taxAmount.toFixed(2)}
            </p>
          )}
          <p className="text-lg font-semibold text-gray-900">
            Total: €{total.toFixed(2)}
          </p>
        </div>

        {/* Custom Text */}
        <div className="text-sm text-gray-600 mt-8">
          <p className="mb-4">
            Thank you for your business! If you have any questions, feel free to
            contact me at {freelancer.email}.
          </p>
          <p className="text-xs text-gray-400 italic text-center">
            Created with{" "}
            <a
              href={process.env.NEXT_PUBLIC_APP_URL}
              className="underline"
              target="_blank"
            >
              {process.env.NEXT_PUBLIC_APP_URL}
            </a>
          </p>
        </div>
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
