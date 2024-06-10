import type { Base, OptionsType } from "../types/conversorTypes"
import { twoComplementValue } from "./twoComplement"

export function getNewBaseValue(
  baseValuesEntries: Array<[Base, string]>,
  changingBase: Base,
  newValue: string,
  options: OptionsType
): Array<[Base, string]> {
  
  return baseValuesEntries.map(([base]) => {

    if (base === changingBase) {
      return [base, newValue]
    } else {


      const newBaseValue = parseInt(newValue, Number(changingBase)).toString(Number(base))

      if (options.signOptions.magnitudSign) {

        if (base === "2" && changingBase === "10") {

          return [base, newBaseValue[0] === "-" ? "1" + newBaseValue.substring(1) : "0" + newBaseValue]

        } else if (base === "10" && changingBase === "2") {

          return [base, newValue[0] === "1" ? "-" + parseInt(newValue.substring(1), 2).toString(Number(base)) : newBaseValue]

        } else if (base === "10") {

          const binaryValue = parseInt(newValue, Number(changingBase)).toString(2)

          return [base, binaryValue[0] === "1" ? "-" + parseInt(binaryValue.substring(1), 2).toString(Number(base)) : newBaseValue]

        } else if (changingBase === "10") {

          const binaryValue = parseInt(newValue, Number(changingBase)).toString(2)
          const value = binaryValue[0] === "-" ? parseInt("1" + binaryValue.substring(1), 2).toString(Number(base)) : newBaseValue

          return [base, value !== "NaN" ? value : ""]

        }

      } else if (options.signOptions.ca2) {

        if (base === "2" && changingBase === "10") {

          return [base, newBaseValue[0] === "-" ? twoComplementValue("0" + newBaseValue.substring(1)) : "0" + newBaseValue]

        } else if (base === "10" && changingBase === "2") {

          return [base, newValue[0] === "1" ? "-" + parseInt(twoComplementValue(newValue), 2).toString(Number(base)) : newBaseValue]

        } else if (base === "10") {

          const binaryValue = parseInt(newValue, Number(changingBase)).toString(2)

          return [base, binaryValue[0] === "1" ? "-" + parseInt(twoComplementValue(binaryValue), 2).toString(Number(base)) : newBaseValue]

        } else if (changingBase === "10") {

          const binaryValue = parseInt(newValue, Number(changingBase)).toString(2)
          const value = binaryValue[0] === "-" ? parseInt(twoComplementValue("0" + binaryValue.substring(1)), 2).toString(Number(base)) : newBaseValue

          return [base, value !== "NaN" ? value : ""]

        }

      }

      return [base, newBaseValue !== "NaN" ? newBaseValue : ""]

    }
  })
}