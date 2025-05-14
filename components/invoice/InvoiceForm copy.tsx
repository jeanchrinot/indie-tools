"use client"

import { useInvoiceStore } from "@/stores/invoiceStore"

const InvoiceForm = () => {
  const {
    freelancer,
    client,
    items,
    tax,
    setFreelancer,
    setClient,
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
            name="freelancer-name"
            className="input mb-2"
            placeholder="Name"
            value={freelancer.name}
            onChange={(e) => setFreelancer({ name: e.target.value })}
          />
          <input
            name="freelancer-email"
            className="input mb-2"
            placeholder="Email"
            value={freelancer.email}
            onChange={(e) => setFreelancer({ email: e.target.value })}
          />
          <textarea
            name="freelancer-address"
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
            name="client-name"
            className="input mb-2"
            placeholder="Client Name"
            value={client.name}
            onChange={(e) => setClient({ name: e.target.value })}
          />
          <input
            name="client-email"
            className="input mb-2"
            placeholder="Client Email"
            value={client.email}
            onChange={(e) => setClient({ email: e.target.value })}
          />
          <textarea
            name="client-address"
            className="input resize-none"
            placeholder="Client Address"
            rows={2}
            value={client.address}
            onChange={(e) => setClient({ address: e.target.value })}
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
                name={`item-description-${index}`}
                className="input"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  updateItem(index, "description", e.target.value)
                }
              />
              <input
                name={`item-quantity-${index}`}
                type="number"
                className="input"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
              />
              <input
                name={`item-price-${index}`}
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
          className="mt-3 px-4 py-2 bg-gray-100 text-sm rounded hover:bg-gray-200"
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
            name="tax"
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
