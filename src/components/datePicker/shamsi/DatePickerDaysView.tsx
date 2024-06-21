import DoDate from "@doolooper/dodate"
import { useEffect, useState } from "react"
import { convert2Digit } from "../../../utils/helper"

function DatePickerDaysView({
    targetDate,
    setValue,
    disabledDate
}: {
    targetDate: DoDate,
    setValue: (value: string) => void
    disabledDate: (currentDate: DoDate) => boolean
}) {
    const [days, setDays] = useState<{ label: number }[]>([])
    const [tempDate, setTempDate] = useState<DoDate>(undefined)
    useEffect(() => {
        setTempDate(targetDate)
    }, [targetDate])
    useEffect(() => {
        if (tempDate) {
            const firstDaysOfWeek = DoDate.parseJalali(tempDate.formatJalali("YYYY-MM-DD").slice(0, 8) + ("01")).dayOfWeekJalali()
            const daysCount = tempDate.getMonthJalali() <= 6 ? 31 : tempDate.getMonthJalali() < 12 ? 30 : tempDate.isLeapYearJalali() ? 30 : 29
            const updatedDays = []
            for (let day = 1; day <= daysCount + firstDaysOfWeek; day++) {
                if (day - 1 < firstDaysOfWeek) {
                    updatedDays.push({
                        label: undefined,
                    })
                } else {
                    updatedDays.push({
                        label: day - firstDaysOfWeek
                    })
                }
            }
            setDays(updatedDays)
        }
    }, [tempDate])
    const disabled = (currentDay) => {
        return (targetDate && disabledDate) && disabledDate(DoDate.parseJalali(`${tempDate.getYearJalali()}-${convert2Digit(tempDate.getMonthJalali())}-${currentDay.label}`))
    }

    return (
        <div className="datePickerBody">
            {[
                "ش",
                "ی",
                "د",
                "س",
                "چ",
                "پ",
                "ج",
            ].map(dayName => {
                return <span key={dayName} className="dayName">{dayName}</span>
            })}
            {days.map(d => {
                return <span key={d.label} className={d.label === targetDate.getDayJalali() ? "day active" : disabled(d) ? "day disable" : d.label ? "day" : "day disable"}
                    onClick={(e) => {
                        if (disabled(d)) return
                        if (!d.label) return
                        e.stopPropagation()
                        const value = DoDate.parseJalali(`${tempDate.getYearJalali()}-${convert2Digit(tempDate.getMonthJalali())}-${d.label}`).format("YYYY-MM-DD")
                        setValue(value)
                    }}>{d.label || ""}</span>
            })}
        </div>
    )
}

export default DatePickerDaysView