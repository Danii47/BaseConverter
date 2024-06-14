import { useEffect, useState, type Dispatch, type StateUpdater } from "preact/hooks"

import "./Components.css"

type OperationsData = {
  options: {
    magnitudSign: boolean
    ca2: boolean
  }
  firstNumberBaseValues: {
    bits: number
    values: {
      [key: string]: any
    }
  }
  secondNumberBaseValues: {
    bits: number
    values: {
      [key: string]: any
    }
  },
  maxBits: number
}

export default function MultiplicationTable() {


  const [operationsData, setOperationsData] = useState() as [OperationsData, Dispatch<StateUpdater<OperationsData>>]

  useEffect(() => {
    const storageData = localStorage.getItem('operationsData')

    if (storageData) {
      setOperationsData(JSON.parse(storageData))
    }
  }, [])

  const generateMultiplicationTable = () => {

    let Phi: string = "".padStart(operationsData.maxBits, "0")
    let Plo: string = operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")

    const table = [
      <tr>
        <td>Inicial</td>
        <td>{"".padStart(operationsData.maxBits, "0")}</td>
        <td>{operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}</td>
        <td>P<sub>LO</sub> ← Multiplicador</td>
      </tr>
    ]

    for (let i = 0; i < operationsData.maxBits; i++) {
      let P0 = Plo.slice(-1)

      if (P0 === "1") {
        Phi = (parseInt(Phi, 2) + parseInt(operationsData.firstNumberBaseValues.values["2"], 2)).toString(2)
        table.push(

          <tr>
            <td>{i + 1}</td>
            <td>{Phi}</td>
            <td>{Plo}</td>
            <td>P<sub>HI</sub> = P<sub>HI</sub> + Multiplicador</td>
          </tr>

        )
      }

      Plo = Phi.slice(-1) + Plo.substring(0, Plo.length - 1)
      Phi = "0" + Phi.substring(0, Phi.length - 1)

      table.push(
        <tr class={i === operationsData.maxBits - 1 ? "tableResult" : ""}>
          <td>{i + 1}</td>
          <td>{Phi}</td>
          <td>{Plo}</td>
          <td>P &gt;&gt; 1</td>
        </tr>
      )

    }


    return table
  }

  return (
    <>
      {
        !operationsData ?
          <div>No hay datos de operaciones</div> :
          <div class="operations">

            <div class="operationToShow">
              <p>{operationsData.firstNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}<sub>(2)</sub> × {operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}<sub>(2)</sub> ({operationsData.firstNumberBaseValues.values["10"]} × {operationsData.secondNumberBaseValues.values["10"]})</p>
            </div>
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
      }
    </>
  )
}