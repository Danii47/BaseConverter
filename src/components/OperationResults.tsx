import { useEffect, useState } from "preact/hooks"
import { BASES } from "../constants/Bases"
import { twoComplementValue } from "../utils/twoComplement"
import { comprobateValidNumber } from "../utils/comprobateIsValidNumber"

import type { BasesValues, Operation, OptionsType, Base } from "../types/conversorTypes"

import "./Components.css"
import type { JSX } from "preact/jsx-runtime"

const OPERATIONS = {
  "+": (firstValue: number, secondValue: number) => firstValue + secondValue,
  "-": (firstValue: number, secondValue: number) => firstValue - secondValue,
  "×": (firstValue: number, secondValue: number) => firstValue * secondValue,
  "÷": (firstValue: number, secondValue: number) => Math.floor(firstValue / secondValue),
}

export default function OperationResults(
  { firstNumberBaseValues, secondNumberBaseValues, options, operation }:
    { firstNumberBaseValues: BasesValues, secondNumberBaseValues: BasesValues, options: OptionsType, operation: Operation }
) {

  const [result, setResult] = useState({
    bits: 0,
    values: {
      2: "0",
      8: "0",
      10: "0",
      16: "0",
    }

  })

  useEffect(() => {
    if (!comprobateValidNumber(firstNumberBaseValues.values["10"], "10") || !comprobateValidNumber(secondNumberBaseValues.values["10"], "10")) return

    const firstValueDecimal = parseInt(firstNumberBaseValues.values["10"], 10)
    const secondValueDecimal = parseInt(secondNumberBaseValues.values["10"], 10)

    const decimalResult = OPERATIONS[operation](firstValueDecimal, secondValueDecimal)

    if (isNaN(decimalResult) || decimalResult === Infinity) return

    let binaryResult = decimalResult.toString(2)

    if (options.ca2) {
      binaryResult = binaryResult[0] === "-" ? twoComplementValue("0" + binaryResult.substring(1)) : "0" + binaryResult
    } else if (options.magnitudSign) {
      binaryResult = binaryResult[0] === "-" ? "1" + binaryResult.substring(1) : "0" + binaryResult
    }


    localStorage.setItem("operationsData", JSON.stringify({
      firstNumberBaseValues,
      secondNumberBaseValues,
      options,
      maxBits: Math.max(firstNumberBaseValues.bits, secondNumberBaseValues.bits)
    }))

    setResult({
      bits: binaryResult.length,
      values: {
        2: binaryResult.slice(0, 16),
        8: parseInt(binaryResult, 2).toString(8).slice(0, 16),
        10: decimalResult.toString(10),
        16: parseInt(binaryResult, 2).toString(16),
      }
    })

  }, [firstNumberBaseValues, secondNumberBaseValues, operation])

  const handleClickResult = (event: JSX.TargetedEvent<HTMLDivElement>) => {
    const { innerText } = event.target as HTMLDivElement
    navigator.clipboard.writeText(innerText)
  }

  return (
    <>
      <h2 class="resultsTitle">Resultados</h2>
      <div class="resultsContainer">
        {
          Object.entries(BASES).map(([base, name]) => {

            const showSteps = (base === "2") && (operation === "×" || operation === "÷") && result.values[base as Base] !== "0"

            const valueIsZero = result.values[base as Base] === "0"

            return (
              <section>
                {
                  showSteps ? (
                    <a href={`${operation === "×" ? "/multiplicacion" : "/division"}`} class="noLinkStyle">
                      <h2 title="Pasos de procesador" class="h2Titles canClickResult">
                        {name} <sub>({base})</sub> {(base === "2") ? <span class="bitsNumber">({result.bits} bit{result.bits !== 1 ? "s" : ""})</span> : ""}
                      </h2>
                    </a>
                  ) : (
                    <h2 class="h2Titles">
                      {name} <sub>({base})</sub> {(base === "2") ? <span class="bitsNumber">({result.bits} bit{result.bits !== 1 ? "s" : ""})</span> : ""}
                    </h2>
                  )
                }
                <div onClick={!valueIsZero ? handleClickResult : undefined} title={!valueIsZero ? "Copiar resultado" : ""} class={`resultContainer ${!valueIsZero ? "showingResult" : ""}`}>
                  {result.values[base as Base]}
                </div>
              </section>
            )
          })
        }
      </div>
    </>
  )
}