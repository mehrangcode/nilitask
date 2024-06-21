import DoDate from "@doolooper/dodate"
import { CSSProperties, useEffect, useMemo, useState } from "react"
import DatePickerDaysView from "./DatePickerDaysView"
import DatePickerHeader from "./DatePickerHeader"
import DatePickerMonthView from "./DatePickerMonthView"
import DatePickerYearView from "./DatePickerYearView"
import { convert2Digit } from "../../../utils/helper"

function DatePickerBox({
    tempValue = "",
    setTempValue,
    open = false,
    setValue,
    setKeepOpen,
    mode = "",
    picker,
    disabledDate,
    style,
    inputPos,
    position
}) {
    const [activeView, setActiveView] = useState("days")
    useEffect(() => {
        if ((picker && activeView !== picker) || activeView !== "days") {
            setActiveView(picker || "days")
        }
    }, [tempValue, open, picker])
    const targetDate = useMemo(() => {
        if (open) {
            if (tempValue?.length === 10) {
                try {
                    return DoDate.parseJalali(tempValue)
                } catch (error) {
                    return DoDate.now()
                }
            }
            return DoDate.now()
        }
        return undefined
    }, [tempValue, open])
    const boxStyle = useMemo<CSSProperties>(() => {
        return {
            top: !position || position?.includes("bottom") ?  inputPos?.y + 33 : position?.includes("top") ? inputPos?.y - 305 : "unset",
            ...style
        }
    }, [style, inputPos, position])
    return (
        <div
            style={boxStyle}
            className={open ? "datePickerBox open " + (mode === "calendar" ? "calendarMode shamsiDatePicker" : "") : "datePickerBox" + (mode === "calendar" ? "calendarMode shamsiDatePicker" : "")}
            onClick={() => setKeepOpen(true)}>
            {open ? <>
                <DatePickerHeader
                    targetDate={targetDate}
                    setActiveView={setActiveView}
                    setKeepOpen={setKeepOpen}
                    addMonth={(month) => {
                        let y = targetDate.getYearJalali()
                        let m = targetDate.getMonthJalali()
                        m += month
                        if (m === 13) {
                            m = 1
                            y += 1
                        } else if (m === 0) {
                            m = 12
                            y -= 1
                        }
                        setTempValue(`${y}/${convert2Digit(m)}/01`)
                    }}
                />
                <div className="datePickerViewBody">
                    {activeView === "days" ? <DatePickerDaysView
                        disabledDate={disabledDate}
                        targetDate={targetDate} setValue={setValue} /> : null}
                    {activeView === "month" ? <DatePickerMonthView
                        picker={picker}
                        targetDate={targetDate}
                        disabledDate={disabledDate}
                        targetMonth={targetDate.getMonthJalali()}
                        setKeepOpen={setKeepOpen}
                        onMonthChangeHandler={(month) => {
                            const selectedDate = DoDate.parseJalali(`${targetDate.getYearJalali()}-${convert2Digit(month)}-01`)
                            if (picker === "month") {
                                setValue(selectedDate.format("YYYY-MM-DD"))
                            } else {
                                setTempValue(selectedDate.formatJalali("YYYY/MM/DD"))
                                setActiveView("days")
                            }
                        }}
                    /> : null}
                    {activeView === "years" ? <DatePickerYearView
                        targetDate={targetDate}
                        setKeepOpen={setKeepOpen}
                        onYearChangeHandler={(year) => {
                            const selectedDate = DoDate.parseJalali(`${year}-${convert2Digit(targetDate.getMonthJalali())}-01`)
                            if (picker === "years") {
                                setValue(selectedDate.format("YYYY-MM-DD"))
                            } else {
                                setTempValue(selectedDate.formatJalali("YYYY/MM/DD"))
                                setActiveView("days")
                            }
                        }}
                    /> : null}
                </div>
                <div className="datePickerFooter"></div>
            </> : null}
        </div>
    )
}

export default DatePickerBox