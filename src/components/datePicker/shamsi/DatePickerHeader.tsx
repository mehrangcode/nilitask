import { appConst } from "../../../utils/AppConst"

function DatePickerHeader({
  targetDate,
  setActiveView,
  setKeepOpen,
  addMonth
}) {
  return (
    // <div className="datePickerHeader">
    //   <span className="navigationIcon" onClick={() => {
    //     addMonth(-1)
    //   }}> {"<"} </span>
    //   <div className="dateLabel">
    //     <span onClick={() => {
    //       setActiveView("years")
    //       setKeepOpen(true)
    //     }}>{targetDate.getYearJalali()}</span> - <span onClick={() => {
    //       setActiveView("months")
    //       setKeepOpen(true)
    //     }}>{Const.jalaliMonths[targetDate.getMonthJalali() - 1]}</span>
    //   </div>
    //   <span className="navigationIcon" onClick={() => {
    //     addMonth(1)
    //   }}> {">"} </span>
    // </div>
    <div className="datePickerHeader">
      <div className="dateLabel">
        <span onClick={() => {
          setActiveView("years")
          setKeepOpen(true)
        }}>{targetDate?.getYearJalali()}</span> - <span onClick={() => {
          setActiveView("month")
          setKeepOpen(true)
        }}>{appConst.persianMonths[targetDate.getMonthJalali() - 1]}</span>
      </div>
      <div className="navigationWrapper" style={{display: "flex", gap: "0.5rem"}}>
        <span className="navigationIcon" onClick={() => {
          addMonth(-1)
        }}> {"<"} </span>
        <span className="navigationIcon" onClick={() => {
          addMonth(1)
        }}> {">"} </span>
      </div>
    </div>
  )
}

export default DatePickerHeader