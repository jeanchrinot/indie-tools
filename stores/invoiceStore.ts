import { create } from "zustand"
import { persist } from "zustand/middleware"

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

type InvoiceState = {
  freelancer: ContactInfo
  client: ContactInfo
  items: InvoiceItem[]
  tax: number
  currency: string
  invoiceMeta: InvoiceMeta
  credit: number
  setFreelancer: (info: Partial<ContactInfo>) => void
  setClient: (info: Partial<ContactInfo>) => void
  setItems: (items: InvoiceItem[]) => void
  updateItem: (index: number, field: keyof InvoiceItem, value: string) => void
  addItem: () => void
  setTax: (tax: number) => void
  setCurrency: (currency: string) => void
  setInvoiceMeta: (meta: Partial<InvoiceMeta>) => void
  setCredit: (value: number) => void
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      freelancer: { name: "", email: "", address: "", phone: "" },
      client: { name: "", email: "", address: "", phone: "" },
      items: [{ description: "", quantity: 1, price: 0 }],
      tax: 0,
      currency: "€", // default
      invoiceMeta: {
        number: "INV-001",
        date: "",
        dueDate: "",
        paymentDetails: "",
        status: "draft",
        note: "Thank you for your business! If you have any questions, feel free to contact me.",
      },
      credit: 0,
      setFreelancer: (info) =>
        set((state) => ({
          freelancer: { ...state.freelancer, ...info },
        })),
      setClient: (info) =>
        set((state) => ({
          client: { ...state.client, ...info },
        })),
      setItems: (items) => set(() => ({ items })),
      updateItem: (index, field, value) =>
        set((state) => {
          const items = [...state.items]
          if (field === "description") {
            items[index][field] = value
          } else {
            items[index][field] = parseFloat(value) as never
          }
          return { items }
        }),
      addItem: () =>
        set((state) => ({
          items: [...state.items, { description: "", quantity: 1, price: 0 }],
        })),
      setTax: (tax) => set(() => ({ tax })),
      setCurrency: (currency: string) => set({ currency }),
      setCredit: (value) => set(() => ({ credit: value })),
      setInvoiceMeta: (meta) =>
        set((state) => ({
          invoiceMeta: { ...state.invoiceMeta, ...meta },
        })),
    }),
    {
      name: "indie-tools-invoice-storage",
    }
  )
)
