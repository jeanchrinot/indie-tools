// File: components/invoice/InvoiceContent.tsx
"use client"

import { useInvoiceStore } from "@/stores/invoiceStore"

export default function InvoiceContent() {
  const { freelancer, client, items, tax, currency, invoiceMeta, credit } =
    useInvoiceStore()

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount

  return (
    <div className="p-8 bg-white text-gray-800 rounded-md shadow text-sm leading-snug">
      {/* Header */}
      {invoiceMeta.status === "paid" && (
        <div className="text-right mb-4">
          <span className="font-medium uppercase text-sm text-green-600 border border-b border-green-600 px-4 py-1">
            {invoiceMeta.status || "Draft"}
          </span>
        </div>
      )}

      <div className="flex justify-between mb-8">
        <div>
          <p className="text-lg font-semibold mb-2">{freelancer.name}</p>
          <div>{freelancer.email}</div>
          <div>{freelancer.phone}</div>
          <div>{freelancer.address}</div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold mb-2 text-gray-900">Invoice</p>
          <div>
            Invoice #: <span className="font-medium">{invoiceMeta.number}</span>
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

      {/* Client & Payment */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="font-semibold mb-2">Bill To</p>
          <div>{client.name}</div>
          <div>{client.email}</div>
          <div>{client.phone}</div>
          <div>{client.address}</div>
        </div>
        <div className="text-right">
          <p className="font-semibold mb-2">Payment Details</p>
          <div className="whitespace-pre-line">
            {invoiceMeta.paymentDetails}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-6">
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
              <td className="py-3">
                {currency}
                {item.price.toFixed(2)}
              </td>
              <td className="py-3">
                {currency}
                {(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right text-gray-700 space-y-1 mb-8">
        <p>
          Subtotal: {currency}
          {subtotal.toFixed(2)}
        </p>
        {tax > 0 && (
          <p>
            Tax ({tax}%): {currency}
            {taxAmount.toFixed(2)}
          </p>
        )}
        {credit > 0 && (
          <p className="text-sm font-bold text-green-700">
            Credit: -{currency}
            {credit.toFixed(2)}
          </p>
        )}
        <p className="text-xl font-bold">
          Total: {currency}
          {(total - credit).toFixed(2)}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-600">
        <p className="mb-4 whitespace-pre-line">{invoiceMeta.note}</p>
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
  )
}
