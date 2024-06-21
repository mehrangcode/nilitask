import DoDate from "@doolooper/dodate"
import { useEffect, useRef, useState } from "react"
import { DatePickerType } from "../DatePicker"
import DatePickerBox from "./DatePickerBox"
import { convert2Digit } from "../../../utils/helper"

function ShamsiDatePicker({
    value = null,
    onChange = () => { },
    ...props
}: DatePickerType) {
    const [tempValue, setTempValue] = useState("")
    const [showBox, setShowBox] = useState(false)
    const [keepOpen, setKeepOpen] = useState(false)
    const [inputPos, setInputPos] = useState(undefined)
    function valueFormat() {
        return props?.displayFormat ? props?.displayFormat : props?.format === "YYYY MMMM" ? "YYYY MMMM" : props?.format === "YYYY" ? "YYYY" : "YYYY/MM/DD"
    }
    function initialValue() {
        if (value) {
            try {
                if (typeof value === "object" && (value as any)?.formatJalali) {
                    setTempValue(value.formatJalali(valueFormat()))
                } else if (typeof value === "string" && !value.includes("0001-01-01")) {
                    const convertedDate = new Date(value).toLocaleDateString('en')?.split("/");
                    if (convertedDate?.length === 3) {
                        setTempValue(DoDate.parse(`${convertedDate[2]}-${convert2Digit(convertedDate[0])}-${convert2Digit(convertedDate[1])}`, "YYYY-MM-DD").formatJalali(valueFormat()))
                    } else {
                        setTempValue(value)
                    }
                }
            } catch (error) {
                setTempValue("undefined")
            }
        } else {
            setTempValue("")
        }
    }
    useEffect(() => {
        if (!showBox && tempValue) {
            initialValue()
        }
    }, [showBox])
    useEffect(() => {
        initialValue()
    }, [value])
    const waitTime = useRef(null)
    const inputRef = useRef(null)
    const keepOpenRef = useRef(null)
    keepOpenRef.current = keepOpen
    if (props.mode === "calendar") {
        return <DatePickerBox
            position={props.position}
            inputPos={inputPos}
            style={props?.style || {}}
            disabledDate={props.disabledDate}
            picker={props?.picker}
            mode={props.mode}
            setTempValue={(shamsiValue) => {
                setTempValue(shamsiValue)
                onChange({ target: { value: DoDate.parseJalali(shamsiValue).format("YYYY-MM-DD") } })
            }}
            tempValue={tempValue}
            open={true}
            setKeepOpen={setKeepOpen}
            setValue={(value) => {
                onChange({ target: { value } })
                // setShowBox(false)
            }} />
    }
    return (
        <div className={"shamsiDatePicker" + (props?.className ? (" " + props.className) : "")}
            id={props?.id}
            onBlur={() => {
                clearTimeout(waitTime.current)
                waitTime.current = setTimeout(() => {
                    if (!keepOpenRef.current) {
                        setShowBox(false)
                    } else {
                        inputRef.current?.focus()
                    }
                }, 200);
            }}>
            <input
                className="ant-input ant-input-rtl ant-input-outlined datePickerInput"
                ref={inputRef}
                type="text"
                placeholder={props?.placeholder}
                disabled={props.disabled}
                readOnly={props?.inputReadOnly}
                autoFocus={props?.autoFocus}
                onFocus={(e) => {
                    e.target.select()
                    setInputPos(inputRef?.current?.getBoundingClientRect())
                    setShowBox(true)
                    setTimeout(() => {
                        setKeepOpen(false)
                    }, 100);
                }}
                onKeyDown={(e) => {
                    if (props?.onKeyDown) {
                        props.onKeyDown(e)
                    }
                }}
                value={tempValue}
                onChange={(e) => {
                    if (!e.target.value) {
                        onChange(e)
                    } else if (e.target.value?.length < 10) {
                        setTempValue(e.target.value)
                    } else if (e.target.value?.length === 10) {
                        try {
                            e.target.value = DoDate.parseJalali(e.target.value).format("YYYY-MM-DD")
                            onChange(e)
                        } catch (error) {
                            e.target.value = ""
                            setTempValue("")
                            onChange(e)
                        }
                    }
                }} />
            <DatePickerBox
                position={props.position}
                inputPos={inputPos}
                style={props?.style || {}}
                disabledDate={props.disabledDate}
                setTempValue={setTempValue}
                tempValue={tempValue}
                open={props?.open || showBox}
                setKeepOpen={setKeepOpen}
                picker={props?.picker}
                setValue={(value) => {
                    // onChange({ target: { value } })
                    onChange(DoDate.parse(value))
                    setShowBox(false)
                }} />
        </div>
    )
}

export default ShamsiDatePicker