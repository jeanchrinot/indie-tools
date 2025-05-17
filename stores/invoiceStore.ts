import { create } from "zustand"
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid" // For unique IDs

type InvoiceItem = {
  description: string
  quantity: number
  price: number
}

type ContactInfo = {
  name: string
  email: string
  address: string
  phone?: string
}

type InvoiceMeta = {
  number?: string
  date?: string
  dueDate?: string
  paymentDetails?: string
  status?: "draft" | "sent" | "paid"
  note?: string
}

type Invoice = {
  id: string
  freelancer: ContactInfo
  client: ContactInfo
  items: InvoiceItem[]
  tax: number
  currency: string
  invoiceMeta: InvoiceMeta
  credit: number
}

type InvoiceState = {
  invoices: Invoice[]
  currentInvoiceId: string | null
  createInvoice: () => string
  updateInvoice: (id: string, data: Partial<Invoice>) => void
  deleteInvoice: (id: string) => void
  setCurrentInvoice: (id: string) => void
  getCurrentInvoice: () => Invoice | undefined
  getInvoice: (id: string) => Invoice | undefined
  updateCurrentInvoiceField: <K extends keyof Invoice>(
    field: K,
    value: Invoice[K]
  ) => void
  updateCurrentInvoiceNestedField: <
    T extends keyof Pick<Invoice, "freelancer" | "client" | "invoiceMeta">,
    K extends keyof Invoice[T]
  >(
    section: T,
    field: K,
    value: Invoice[T][K]
  ) => void

  updateItem: (index: number, field: keyof InvoiceItem, value: string) => void
  addItem: () => void
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      invoices: [],
      currentInvoiceId: null,

      createInvoice: () => {
        const id = nanoid()
        const newInvoice: Invoice = {
          id,
          freelancer: { name: "", email: "", address: "", phone: "" },
          client: { name: "", email: "", address: "", phone: "" },
          items: [{ description: "", quantity: 1, price: 0 }],
          tax: 0,
          currency: "€",
          credit: 0,
          invoiceMeta: {
            number: `INV-${id.slice(0, 6).toUpperCase()}`,
            date: "",
            dueDate: "",
            paymentDetails: "",
            status: "draft",
            note: "Thank you for your business! If you have any questions, feel free to contact me.",
          },
        }

        set((state) => ({
          invoices: [...state.invoices, newInvoice],
          currentInvoiceId: id,
        }))
        return id
      },

      updateInvoice: (id, data) =>
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === id ? { ...inv, ...data } : inv
          ),
        })),

      deleteInvoice: (id) =>
        set((state) => ({
          invoices: state.invoices.filter((inv) => inv.id !== id),
          currentInvoiceId:
            state.currentInvoiceId === id ? null : state.currentInvoiceId,
        })),

      setCurrentInvoice: (id) => set({ currentInvoiceId: id }),

      getCurrentInvoice: () => {
        const state = get()
        return state.invoices.find((inv) => inv.id === state.currentInvoiceId)
      },
      getInvoice: (id) => {
        const state = get()
        return state.invoices.find((inv) => inv.id === id)
      },
      updateCurrentInvoiceField: (field, value) => {
        const id = get().currentInvoiceId
        if (!id) return
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === id ? { ...inv, [field]: value } : inv
          ),
        }))
      },

      updateCurrentInvoiceNestedField: <
        Section extends keyof Pick<
          Invoice,
          "freelancer" | "client" | "invoiceMeta"
        >,
        Field extends keyof Invoice[Section]
      >(
        section: Section,
        field: Field,
        value: Invoice[Section][Field]
      ) => {
        const id = get().currentInvoiceId
        if (!id) return
        set((state) => ({
          invoices: state.invoices.map((inv) => {
            if (inv.id !== id) return inv
            return {
              ...inv,
              [section]: {
                ...inv[section],
                [field]: value,
              },
            }
          }),
        }))
      },

      updateItem: (index, field, value) => {
        const id = get().currentInvoiceId
        if (!id) return
        set((state) => ({
          invoices: state.invoices.map((inv) => {
            if (inv.id !== id) return inv
            const newItems = [...inv.items]
            if (field === "description") {
              newItems[index][field] = value
            } else {
              newItems[index][field] = parseFloat(value) as never
            }
            return { ...inv, items: newItems }
          }),
        }))
      },

      addItem: () => {
        const id = get().currentInvoiceId
        if (!id) return
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === id
              ? {
                  ...inv,
                  items: [
                    ...inv.items,
                    { description: "", quantity: 1, price: 0 },
                  ],
                }
              : inv
          ),
        }))
      },
    }),
    {
      name: "indie-tools-invoice-storage-v2",
    }
  )
)
