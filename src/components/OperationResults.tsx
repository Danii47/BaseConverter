import { useEffect, useState } from "preact/hooks"
import type { BasesValues, Operation, OptionsType } from "../types/conversorTypes"
import "./Components.css"

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
    if (operation === "+") {
      
    }
  }, [firstNumberBaseValues, secondNumberBaseValues])

  return (
    <>
      <h2 class="resultsTitle">Resultados</h2>  
      <div class="resultsContainer">
        <section>
          <h2 class="h2Titles">Binario</h2>
          <div class="resultContainer">
            {result.values["2"]}
          </div>
        </section>
        <section>
          <h2 class="h2Titles">Octal</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
        <section>
          <h2 class="h2Titles">Decimal</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
        <section>
          <h2 class="h2Titles">Hexadecimal</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
      </div>

    </>
  )
}