import DoDate from "@doolooper/dodate"
import { convert2Digit } from "../../../utils/helper"
import { appConst } from "../../../utils/AppConst"

function DatePickerMonthView({
    targetMonth,
    onMonthChangeHandler,
    setKeepOpen,
    disabledDate,
    targetDate,
    picker
}) {
    const disabled = (index) => {
        return (targetDate && disabledDate) && disabledDate(DoDate.parseJalali(`${targetDate.getYearJalali()}-${convert2Digit(index + 1)}-01`))
    }
    return (
        <div className="datePickerMonthView">
            {appConst.persianMonths.map((month, index) => {
                return <span
                    key={index}
                    className={targetMonth === index + 1 ? "datePickerItemBox active" : disabled(index) ? "datePickerItemBox disabled" : "datePickerItemBox"}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (disabled(index)) return
                        onMonthChangeHandler(index + 1)
                        if(picker !== "month") {
                            setKeepOpen(true)
                        }
                    }}>{month}</span>
            })}
        </div>
    )
}

export default DatePickerMonthView