import ShamsiDatePicker from "./shamsi/ShamsiDatePicker"
import './datePicker.css'
import DoDate from "@doolooper/dodate"
import { CSSProperties } from "react"
export type DatePickerType = {
    position?: string
    value?: string | DoDate
    onChange?: (e) => void
    mode?: string
    tabIndex?: number
    format?: string
    displayFormat?: string
    disabled?: boolean
    style?: CSSProperties
    disabledDate?: (date: DoDate) => boolean
    placeholder?: string
    inputReadOnly?: boolean
    picker?: string
    allowClear?: boolean
    autoFocus?: boolean
    className?: string
    id?: string
    open?: boolean
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => React.KeyboardEventHandler<HTMLInputElement>
}
function DatePicker(props: DatePickerType) {
    return (
        <ShamsiDatePicker {...props} />
    )
}

export default DatePicker