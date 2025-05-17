"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useInvoiceStore } from "@/stores/invoiceStore"

const InvoiceForm = () => {
  const {
    setCurrentInvoice,
    getInvoice,
    updateCurrentInvoiceField,
    updateCurrentInvoiceNestedField,
    updateItem,
    addItem,
  } = useInvoiceStore()

  const params = useParams()
  const invoiceId = params.invoiceId

  useEffect(() => {
    if (typeof invoiceId == "string") {
      setCurrentInvoice(invoiceId)
    }
  }, [invoiceId, setCurrentInvoice])

  if (typeof invoiceId !== "string") {
    return <p>Invalid invoice ID</p>
  }

  const invoice = getInvoice(invoiceId)

  if (!invoice) {
    return <p>No invoice selected</p>
  }

  const { freelancer, client, items, tax, credit, currency, invoiceMeta } =
    invoice

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const taxAmount = (subtotal * tax) / 100
  const total = subtotal + taxAmount

  console.log("currentInvoiceId", invoiceId)
  console.log("invoice", invoice)

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
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "freelancer",
                "name",
                e.target.value
              )
            }
          />
          <input
            className="input mb-2"
            placeholder="Email"
            value={freelancer.email}
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "freelancer",
                "email",
                e.target.value
              )
            }
          />
          <input
            className="input mb-2"
            placeholder="Phone Number"
            value={freelancer.phone || ""}
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "freelancer",
                "phone",
                e.target.value
              )
            }
          />
          <textarea
            className="input resize-none"
            placeholder="Address"
            rows={2}
            value={freelancer.address}
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "freelancer",
                "address",
                e.target.value
              )
            }
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Client Info</h2>
          <input
            className="input mb-2"
            placeholder="Client Name"
            value={client.name}
            onChange={(e) =>
              updateCurrentInvoiceNestedField("client", "name", e.target.value)
            }
          />
          <input
            className="input mb-2"
            placeholder="Client Email"
            value={client.email}
            onChange={(e) =>
              updateCurrentInvoiceNestedField("client", "email", e.target.value)
            }
          />
          <input
            className="input mb-2"
            placeholder="Client Phone Number"
            value={client.phone || ""}
            onChange={(e) =>
              updateCurrentInvoiceNestedField("client", "phone", e.target.value)
            }
          />
          <textarea
            className="input resize-none"
            placeholder="Client Address"
            rows={2}
            value={client.address}
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "client",
                "address",
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* Invoice Metadata */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Invoice Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              className="input"
              value={invoiceMeta.number || ""}
              onChange={(e) =>
                updateCurrentInvoiceNestedField(
                  "invoiceMeta",
                  "number",
                  e.target.value
                )
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="input h-[42px]"
              value={invoiceMeta.status || "draft"}
              onChange={(e) =>
                updateCurrentInvoiceNestedField(
                  "invoiceMeta",
                  "status",
                  e.target.value as any
                )
              }
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              className="input"
              value={invoiceMeta.date || ""}
              onChange={(e) =>
                updateCurrentInvoiceNestedField(
                  "invoiceMeta",
                  "date",
                  e.target.value
                )
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="input"
              value={invoiceMeta.dueDate || ""}
              onChange={(e) =>
                updateCurrentInvoiceNestedField(
                  "invoiceMeta",
                  "dueDate",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
          <textarea
            className="input resize-none min-h-[100px]"
            placeholder="Bank account, PayPal, Wise, etc."
            value={invoiceMeta.paymentDetails || ""}
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "invoiceMeta",
                "paymentDetails",
                e.target.value
              )
            }
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Note to Client</h2>
          <textarea
            className="input resize-none min-h-[100px]"
            placeholder="Thank you for your business!"
            value={invoiceMeta.note || ""}
            onChange={(e) =>
              updateCurrentInvoiceNestedField(
                "invoiceMeta",
                "note",
                e.target.value
              )
            }
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
        <button onClick={addItem} className="button mt-3 px-4 py-2 text-sm">
          + Add Line Item
        </button>
      </div>

      {/* Totals & Settings */}
      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex gap-2 items-center">
            <label htmlFor="tax" className="font-medium flex-1">
              Tax (%):
            </label>
            <input
              id="tax"
              type="number"
              className="input flex-2"
              value={tax}
              onChange={(e) =>
                updateCurrentInvoiceField(
                  "tax",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="credit" className="font-medium flex-1">
              Credit:
            </label>
            <input
              id="credit"
              type="number"
              className="input flex-2"
              value={credit}
              onChange={(e) =>
                updateCurrentInvoiceField(
                  "credit",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="currency" className="font-medium flex-1">
              Currency:
            </label>
            <select
              id="currency"
              className="input flex-2"
              value={currency}
              onChange={(e) =>
                updateCurrentInvoiceField("currency", e.target.value)
              }
            >
              <option value="€">€</option>
              <option value="$">$</option>
              <option value="£">£</option>
              <option value="₺">₺</option>
              <option value="₹">₹</option>
              <option value="¥">¥</option>
            </select>
          </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm">
            Subtotal: {currency}
            {subtotal.toFixed(2)}
          </p>
          <p className="text-sm">
            Tax: {currency}
            {taxAmount.toFixed(2)}
          </p>
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
      </div>
    </div>
  )
}

export default InvoiceForm
