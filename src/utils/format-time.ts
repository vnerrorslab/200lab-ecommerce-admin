import { format, getTime } from 'date-fns'

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined

export function fDate(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy'

    return date ? format(new Date(date), fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy p'

    return date ? format(new Date(date), fm) : ''
}

export function fTimestamp(date: InputValue) {
    return date ? getTime(new Date(date)) : ''
}
