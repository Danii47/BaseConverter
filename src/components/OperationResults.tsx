import type { BasesValues, OptionsType } from "../types/conversorTypes"
import "./Components.css"

export default function OperationResults(
  { firstNumberBaseValues, secondNumberBaseValues, options }:
    { firstNumberBaseValues: BasesValues, secondNumberBaseValues: BasesValues, options: OptionsType }
) {
  return (
    <>
      <h1 style={{ margin: "0" }}>Resultados</h1>
      <div class="resultsContainer">
        <section>
          <h2 style={{ marginTop: "0"}}>Suma</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
        <section>
          <h2 style={{ marginTop: "0"}}>Resta</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
        <section>
          <h2 style={{ marginTop: "0"}}>Multiplicación</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
        <section>
          <h2 style={{ marginTop: "0"}}>División</h2>
          <div class="resultContainer">
            1011101
          </div>
        </section>
      </div>

    </>
  )
}