"use client"

import { useRef } from "react"
// import html2canvas from "html2canvas"
import html2canvas from "html2canvas-pro"
import jsPDF from "jspdf"
import { useInvoiceStore } from "@/stores/invoiceStore"

export default function InvoicePreview() {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const { freelancer, client, items, tax } = useInvoiceStore()

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount

  const downloadPDF = async () => {
    if (!invoiceRef.current) return

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
    const imgWidth = canvas.width * ratio
    const imgHeight = canvas.height * ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save("invoice.pdf")
  }

  return (
    <div>
      <div className="border">
        <div
          ref={invoiceRef}
          className="p-8 rounded shadow-md text-sm sm:text-base"
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-lg font-bold mb-1">From</p>
              <p>{freelancer.name}</p>
              <p>{freelancer.email}</p>
              <p>{freelancer.address}</p>
            </div>
            <div>
              <p className="text-lg font-bold mb-1">To</p>
              <p>{client.name}</p>
              <p>{client.email}</p>
              <p>{client.address}</p>
            </div>
          </div>

          <table className="w-full border-collapse mb-6 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Description</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Unit Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">€{item.price.toFixed(2)}</td>
                  <td className="border p-2">
                    €{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right">
            <p>Subtotal: €{subtotal.toFixed(2)}</p>
            {tax > 0 && (
              <p>
                Tax ({tax}%): €{taxAmount.toFixed(2)}
              </p>
            )}
            <p className="font-bold text-xl">Total: €{total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <button
        onClick={downloadPDF}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded transition"
      >
        Download PDF
      </button>
    </div>
  )
}
