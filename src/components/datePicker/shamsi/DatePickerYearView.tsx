import DoDate from "@doolooper/dodate"
import { useMemo } from "react"

interface IProps {
    targetDate: DoDate
    onYearChangeHandler: (year: number) => void
    setKeepOpen: (state: boolean) => void
}
function DatePickerYearView({
    targetDate,
    onYearChangeHandler,
    setKeepOpen
}: IProps) {
    const years = useMemo(() => {
        const mainYear = targetDate.getYearJalali()
        const yearsList = []
        for (let y = mainYear - 5; y < mainYear + 10; y++) {
            yearsList.push(y)
        }
        return Array.from(Array(15), (_, i) => i + (mainYear - 5)) //yearsList
    }, [targetDate])
    return (
        <div className="datePickerMonthView">
            {years.map((year, i) => {
                return <span
                    key={i}
                    className={targetDate.getYearJalali() === year ? "datePickerItemBox active" : "datePickerItemBox"}
                    onClick={() => {
                        onYearChangeHandler(year)
                        setKeepOpen(true)
                    }}>{year}</span>
            })}
        </div>
    )
}

export default DatePickerYearView