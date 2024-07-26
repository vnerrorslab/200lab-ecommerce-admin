import { IOrderCustomer } from "./order"

export type IInvoiceTableFilterValue = string | Date | null

export type IInvoiceTableFilters = {

    invoiceNumber: string
    name: string
    startDate: Date | null
    endDate: Date | null
}

export type IInvoiceItem = {
    id: string
    invoiceNumber : string
    totalAmount: number
    totalQuantity: number
    createdAt: Date
    expiredAt: Date
    customer: IOrderCustomer
}