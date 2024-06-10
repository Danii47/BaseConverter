import type { JSX } from "preact/jsx-runtime"
import type { Base, BasesValues, OptionsType } from "../types/conversorTypes"
import { useEffect } from "preact/hooks"
import "./Components.css"
import { getNewBaseValue } from "../utils/getNewBaseValues"

export default function ChangeBaseInput(
  { base, baseValues, setBaseValues, options, setOptions }:
    { base: Base, baseValues: BasesValues, setBaseValues: Function, options: OptionsType, setOptions: Function }
) {


  useEffect(() => {
    setBaseValues((baseValues: BasesValues) => {

      const baseValuesEntries = Object.entries(baseValues) as Array<[Base, number]>

      const newVaseValue = getNewBaseValue(baseValuesEntries, base as Base, baseValues[base].toString(), options)

      return Object.fromEntries(newVaseValue)

    })
  }, [options.signOptions])


  const handleChangeInput = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const { id: changingBase, value: newValue } = event.target as HTMLInputElement

    const newBits = changingBase !== "2" ? parseInt(newValue, Number(changingBase)).toString(2) : newValue

    setOptions((options: OptionsType) => {
      if (!options.signOptions.magnitudSign && !options.signOptions.ca2) {
        return {
          ...options,
          bits: newBits[0] === "-" ? newBits.length - 1 : newBits.length
        }

      } else {

        return {
          ...options,
          bits: newBits[0] === "-" || changingBase !== "10" ? newBits.length : newBits.length + 1
        }
      }
    })

    setBaseValues((baseValues: BasesValues) => {


      const baseValuesEntries = Object.entries(baseValues) as Array<[Base, number]>
      const newVaseValue = getNewBaseValue(baseValuesEntries, changingBase as Base, newValue, options)

      return Object.fromEntries(newVaseValue)

    })
  }
  return (
    <input
      type={base !== "16" ? "number" : "text"}
      id={base}
      value={baseValues[base]}
      onInput={handleChangeInput}
      class={`conversorInput ${base === "2" ? "binaryInput" : ""}`}
    />
  )
}