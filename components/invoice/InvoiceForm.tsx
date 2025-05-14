"use client"

import { useInvoiceStore } from "@/stores/invoiceStore"

const InvoiceForm = () => {
  const {
    freelancer,
    client,
    items,
    tax,
    invoiceMeta,
    setFreelancer,
    setClient,
    setInvoiceMeta,
    updateItem,
    addItem,
    setTax,
  } = useInvoiceStore()

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const taxAmount = (subtotal * tax) / 100
  const total = subtotal + taxAmount

  return (
    <div className="space-y-8">
      {/* Freelancer & Client Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Info</h2>
          <input
            className="input mb-2"
            placeholder="Name"
            value={freelancer.name}
            onChange={(e) => setFreelancer({ name: e.target.value })}
          />
          <input
            className="input mb-2"
            placeholder="Email"
            value={freelancer.email}
            onChange={(e) => setFreelancer({ email: e.target.value })}
          />
          <input
            className="input mb-2"
            placeholder="Phone Number"
            value={freelancer.phone || ""}
            onChange={(e) => setFreelancer({ phone: e.target.value })}
          />
          <textarea
            className="input resize-none"
            placeholder="Address"
            rows={2}
            value={freelancer.address}
            onChange={(e) => setFreelancer({ address: e.target.value })}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Client Info</h2>
          <input
            className="input mb-2"
            placeholder="Client Name"
            value={client.name}
            onChange={(e) => setClient({ name: e.target.value })}
          />
          <input
            className="input mb-2"
            placeholder="Client Email"
            value={client.email}
            onChange={(e) => setClient({ email: e.target.value })}
          />
          <input
            className="input mb-2"
            placeholder="Phone Number"
            value={client.phone || ""}
            onChange={(e) => setClient({ phone: e.target.value })}
          />
          <textarea
            className="input resize-none"
            placeholder="Client Address"
            rows={2}
            value={client.address}
            onChange={(e) => setClient({ address: e.target.value })}
          />
        </div>
      </div>

      {/* Invoice Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Invoice Info</h2>
          <input
            className="input mb-2"
            placeholder="Invoice Number"
            value={invoiceMeta.number || ""}
            onChange={(e) => setInvoiceMeta({ number: e.target.value })}
          />
          <input
            type="date"
            className="input mb-2"
            placeholder="Invoice Date"
            value={invoiceMeta.date || ""}
            onChange={(e) => setInvoiceMeta({ date: e.target.value })}
          />
          <input
            type="date"
            className="input"
            placeholder="Due Date"
            value={invoiceMeta.dueDate || ""}
            onChange={(e) => setInvoiceMeta({ dueDate: e.target.value })}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
          <textarea
            className="input resize-none min-h-[142px]"
            placeholder="Bank account, PayPal, Wise, etc."
            rows={4}
            value={invoiceMeta.paymentDetails || ""}
            onChange={(e) => setInvoiceMeta({ paymentDetails: e.target.value })}
          />
        </div>
      </div>

      {/* Line Items */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Line Items</h2>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                className="input"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  updateItem(index, "description", e.target.value)
                }
              />
              <input
                type="number"
                className="input"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
              />
              <input
                type="number"
                className="input"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="button mt-3 px-4 py-2 text-sm"
        >
          + Add Line Item
        </button>
      </div>

      {/* Totals */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="flex gap-2 items-center">
          <label htmlFor="tax" className="font-medium">
            Tax (%):
          </label>
          <input
            id="tax"
            type="number"
            className="input w-24"
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm">Subtotal: €{subtotal.toFixed(2)}</p>
          <p className="text-sm">Tax: €{taxAmount.toFixed(2)}</p>
          <p className="text-xl font-bold">Total: €{total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm
