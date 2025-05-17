"use client"

import { useRouter } from "next/navigation"
import { useInvoiceStore } from "@/stores/invoiceStore"
import Link from "next/link"

export default function InvoiceListPage() {
  const router = useRouter()
  const { invoices, createInvoice, deleteInvoice } = useInvoiceStore()

  const handleNewInvoice = () => {
    const id = createInvoice()
    router.push(`/invoice/${id}`)
  }

  const handleDelete = (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this invoice?"
    )
    if (confirmDelete) deleteInvoice(id)
  }

  return (
    <div className="flex-grow flex-col max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Invoices</h1>
      <div className="flex-grow flex flex-col items-center justify-center max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleNewInvoice}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Invoice
          </button>
        </div>

        {invoices.length === 0 ? (
          <p className="text-gray-600">
            {`No invoices yet. Click "New Invoice" to create one.`}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded shadow-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Invoice #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {invoice.invoiceMeta.number || invoice.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {invoice.client.name || "Unnamed client"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 capitalize">
                      {invoice.invoiceMeta.status}
                    </td>
                    <td className="px-4 py-2 text-sm text-right space-x-2">
                      <Link
                        href={`/invoice/${invoice.id}`}
                        className="inline-block px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="px-3 py-1 rounded border border-red-600 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
