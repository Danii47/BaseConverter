import { useEffect, useState, type Dispatch, type StateUpdater } from "preact/hooks"

import { type OperationsData } from "../types/conversorTypes"

import "./Components.css"
import { twoComplementValue } from "../utils/twoComplement"

export default function MultiplicationTable() {


  const [operationsData, setOperationsData] = useState() as [OperationsData, Dispatch<StateUpdater<OperationsData>>]

  useEffect(() => {
    const storageData = localStorage.getItem('operationsData')

    if (storageData) {
      setOperationsData(JSON.parse(storageData))
    }
  }, [])

  const generateMultiplicationTable = () => {

    let firstNumber = operationsData.firstNumberBaseValues.values["2"]
    let secondNumber = operationsData.secondNumberBaseValues.values["2"]

    if (operationsData.options.ca2 && firstNumber[0] === "1") {
      firstNumber = twoComplementValue(firstNumber)
    } else if (operationsData.options.magnitudSign && firstNumber[0] === "1") {
      firstNumber = firstNumber.substring(1)
    }

    if (operationsData.options.ca2 && secondNumber[0] === "1") {
      secondNumber = twoComplementValue(secondNumber)
    } else if (operationsData.options.magnitudSign && secondNumber[0] === "1") {
      secondNumber = secondNumber.substring(1)
    }

    let Phi = "".padStart(operationsData.maxBits, "0")
    let Plo = secondNumber.padStart(operationsData.maxBits, "0")


    const table = [
      <tr>
        <td>Inicial</td>
        <td>{"".padStart(operationsData.maxBits, "0")}</td>
        <td>{secondNumber.padStart(operationsData.maxBits, "0")}</td>
        <td>P<sub>LO</sub> ← Multiplicador</td>
      </tr>
    ]

    for (let i = 0; i < operationsData.maxBits; i++) {
      let P0 = Plo.slice(-1)

      if (P0 === "1") {
        Phi = (parseInt(Phi, 2) + parseInt(firstNumber, 2)).toString(2).padStart(operationsData.maxBits, "0")
        table.push(

          <tr>
            <td>{i + 1}</td>
            <td>{Phi}</td>
            <td>{Plo}</td>
            <td>P<sub>HI</sub> = P<sub>HI</sub> + Multiplicador</td>
          </tr>

        )
      }

      Plo = (Phi.slice(-1) + Plo.substring(0, Plo.length - 1)).padStart(operationsData.maxBits, "0")
      Phi = ("0" + Phi.substring(0, Phi.length - 1)).padStart(operationsData.maxBits, "0")

      table.push(
        <tr class={i === operationsData.maxBits - 1 ? "tableResult" : ""}>
          <td>{i === operationsData.maxBits - 1 ? "Resultado" : i + 1}</td>
          <td>{Phi}</td>
          <td>{Plo}</td>
          <td>P &gt;&gt; 1</td>
        </tr>
      )

    }


    return table
  }

  const operationResult = () => {
    const multiplicationResult = (parseInt(operationsData.firstNumberBaseValues.values["10"]) * parseInt(operationsData.secondNumberBaseValues.values["10"])).toString(2)

    if (operationsData.options.ca2) {
      return multiplicationResult[0] === "-" ? twoComplementValue("0" + multiplicationResult.substring(1)) : "0" + multiplicationResult
    } else if (operationsData.options.magnitudSign) {
      return multiplicationResult[0] === "-" ? "1" + multiplicationResult.substring(1) : "0" + multiplicationResult
    }

    return multiplicationResult
  }

  return (
    <div class="operations">
      {
        !operationsData ?
          "No hay datos de operaciones" :

          <>
            <div class="operationToShow">
              <p class="operationText">{operationsData.firstNumberBaseValues.values["2"]}<sub>(2)</sub> × {operationsData.secondNumberBaseValues.values["2"]}<sub>(2)</sub> ({operationsData.firstNumberBaseValues.values["10"]}<sub>(10)</sub> × {operationsData.secondNumberBaseValues.values["10"]}<sub>(10)</sub>) = {operationResult()}</p>
              <br />
              {
                operationsData.options.ca2 &&
                (
                  <>
                    <p>Multiplicación de los valores absolutos (Complemento a 2)</p>
                    <p class="operationText"> {operationsData.firstNumberBaseValues.values["2"][0] === "1" ? twoComplementValue(operationsData.firstNumberBaseValues.values["2"]).padStart(operationsData.maxBits, "0") : operationsData.firstNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}<sub>(2)</sub> × {operationsData.secondNumberBaseValues.values["2"][0] === "1" ? twoComplementValue(operationsData.secondNumberBaseValues.values["2"]).padStart(operationsData.maxBits, "0") : operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}<sub>(2)</sub> ({operationsData.firstNumberBaseValues.values["10"][0] === "-" ? operationsData.firstNumberBaseValues.values["10"].substring(1) : operationsData.firstNumberBaseValues.values["10"]}<sub>(10)</sub> × {operationsData.secondNumberBaseValues.values["10"][0] === "-" ? operationsData.secondNumberBaseValues.values["10"].substring(1) : operationsData.secondNumberBaseValues.values["10"]}<sub>(10)</sub>)</p>
                  </>

                )
              }
              {
                operationsData.options.magnitudSign &&
                (
                  <>
                    <p>Multiplicación de los valores absolutos (Signo magnitud)</p>
                    <p class="operationText"> {operationsData.firstNumberBaseValues.values["2"][0] === "1" ? operationsData.firstNumberBaseValues.values["2"].substring(1).padStart(operationsData.maxBits, "0") : operationsData.firstNumberBaseValues.values["2"].substring(1).padStart(operationsData.maxBits, "0")}<sub>(2)</sub> × {operationsData.secondNumberBaseValues.values["2"][0] === "1" ? twoComplementValue(operationsData.secondNumberBaseValues.values["2"]).padStart(operationsData.maxBits, "0") : operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}<sub>(2)</sub> ({operationsData.firstNumberBaseValues.values["10"][0] === "-" ? operationsData.firstNumberBaseValues.values["10"].substring(1) : operationsData.firstNumberBaseValues.values["10"]}<sub>(10)</sub> × {operationsData.secondNumberBaseValues.values["10"][0] === "-" ? operationsData.secondNumberBaseValues.values["10"].substring(1) : operationsData.secondNumberBaseValues.values["10"]}<sub>(10)</sub>)</p>
                  </>

                )
              }
            </div>
            <div class="operationsTableContainer">


              <table class="operationsTable">
                <thead>
                  <tr>
                    <th>Iteración</th>
                    <th>P<sub>HI</sub></th>
                    <th>P<sub>LO</sub></th>
                    <th>Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {generateMultiplicationTable()}
                </tbody>
              </table>
            </div>
          </>

      }
    </div>
  )
}