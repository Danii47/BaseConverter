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
  
    let Phi = "".padStart(operationsData.maxBits, "0")
    let Plo = operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")

    for (let i = 0; i < operationsData.maxBits; i++) {
      let P0 = Plo.slice(-1)

      if (P0 === "1") {
        Phi = (parseInt(Phi, 2) + parseInt(operationsData.firstNumberBaseValues.values["2"], 2)).toString(2)
      }

      Phi = Plo[0] === "1" ? Phi.substring(1) + "1" : Phi.substring(1) + "0"
      Plo = Plo.substring(1) + "0"

      
    }


    return (<div>
      test
    </div>)
  }

  return (
    <>
      {
        !operationsData ?
          <div>No hay datos de operaciones</div> :
          <div class="operations">
            Numero: {operationsData.firstNumberBaseValues.values["2"]} x {operationsData.secondNumberBaseValues.values["2"]}
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
                <tr>
                  <td>Inicial</td>
                  <td>{"".padStart(operationsData.maxBits, "0")}</td>
                  <td>{operationsData.secondNumberBaseValues.values["2"].padStart(operationsData.maxBits, "0")}</td>
                  <td>P<sub>LO</sub> ← Multiplicador</td>
                </tr>
                {generateMultiplicationTable()}
              </tbody>
            </table>

          </div>
      }
    </>
  )
}