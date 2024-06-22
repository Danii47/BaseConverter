import type { JSX } from "preact/jsx-runtime"
import type { Base, BasesValues, OptionsType } from "../types/conversorTypes"
import { useEffect } from "preact/hooks"
import "./Components.css"
import { getNewBaseValue } from "../utils/getNewBaseValues"
import { comprobateValidNumber } from "../utils/comprobateIsValidNumber"

export default function ChangeBaseInput(
  { base, baseValues, setBaseValues, options }:
    { base: Base, baseValues: BasesValues, setBaseValues: Function, options: OptionsType }
) {


  useEffect(() => {
    setBaseValues((baseValues: BasesValues) => {

      const baseValuesEntries = Object.entries(baseValues.values) as Array<[Base, string]>
      const newBaseValue = getNewBaseValue(baseValuesEntries, base as Base, baseValues.values[base].toString(), options)

      const objectFromEntries = Object.fromEntries(newBaseValue)
      objectFromEntries["10"] = objectFromEntries["10"] === "NaN" || objectFromEntries["10"] === "0NaN" ? "" : objectFromEntries["10"]

      const newBits = objectFromEntries["2"] !== "0NaN" ? objectFromEntries["2"].length : 0

      return {
        bits: newBits || baseValues.bits,
        values: objectFromEntries
      }

    })
  }, [options])


  const handleChangeInput = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const { id: changingBase, value: newValue } = event.target as HTMLInputElement

    if (!comprobateValidNumber(newValue, changingBase)) {
      setBaseValues((baseValues: BasesValues) => {
        return {
          ...baseValues,
          values: {
            ...baseValues.values,
            [changingBase]: newValue

          }
        }
      })
      return
    }

    
    setBaseValues((baseValues: BasesValues) => {
      
      const baseValuesEntries = Object.entries(baseValues.values) as Array<[Base, string]>
      const newBaseValue = getNewBaseValue(baseValuesEntries, changingBase as Base, newValue, options)

      const newBinaryNumber = changingBase !== "2" ? parseInt(newValue, Number(changingBase)).toString(2) : newValue
      
      let newBits

      if (!options.magnitudSign && !options.ca2) {
        newBits = newBinaryNumber[0] === "-" ? newBinaryNumber.length - 1 : newBinaryNumber.length
      } else {
        newBits = newBinaryNumber[0] === "-" || changingBase !== "10" ? newBinaryNumber.length : newBinaryNumber.length + 1
      }

      const objectFromEntries = Object.fromEntries(newBaseValue)
      objectFromEntries["10"] = objectFromEntries["10"] === "NaN" ? "" : objectFromEntries["10"]
  
      return {
        bits: newBits,
        values: objectFromEntries
      }

    })
  }
  return (
    <input
      type="text"
      id={base}
      value={baseValues.values[base]}
      onInput={handleChangeInput}
      class={`conversorInput ${!comprobateValidNumber(baseValues.values[base], base) ? "error" : ""}`}
    />
  )
}