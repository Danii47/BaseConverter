import { useState, type Dispatch, type StateUpdater } from "preact/hooks"
import ButtonsOptions from "./ButtonsOptions"
import type { Operation } from "../types/conversorTypes"

import "./Components.css"
import NumberInput from "./NumberInput"
import OperationResults from "./OperationResults"
import OperationButtons from "./OperationButtons"

export default function ButtonsContainer() {

  const [firstNumberBaseValues, setFirstNumberBaseValues] = useState(() => {
    
    const storageData = localStorage.getItem('operationsData')

    if (storageData) {
      return JSON.parse(storageData).firstNumberBaseValues
    } else {
      return {
        bits: 0,
        values: {
          2: "0",
          8: "0",
          10: "0",
          16: "0",
        }
      }
    }
  })

  const [secondNumberBaseValues, setSecondNumberBaseValues] = useState(() => {
    const storageData = localStorage.getItem('operationsData')

    if (storageData) {
      return JSON.parse(storageData).secondNumberBaseValues
    } else {
      return {
        bits: 0,
        values: {
          2: "0",
          8: "0",
          10: "0",
          16: "0",
        }
      }
    }
  })

  const [options, setOptions] = useState(() => {
    const storageData = localStorage.getItem('operationsData')

    if (storageData) {
      return JSON.parse(storageData).options
    } else {
      return {
        ca2: false,
        magnitudSign: false,
      }
    }
  })

  const [operation, setOperation] = useState("+") as [Operation, Dispatch<StateUpdater<Operation>> ];

  return (
    <>
      <ButtonsOptions
        setOptions={setOptions}
        options={options}
      />

      <NumberInput
        baseValues={firstNumberBaseValues}
        setBaseValues={setFirstNumberBaseValues}
        options={options}
      />

      <OperationButtons
        setOperation={setOperation}
        operation={operation}
      />

      <NumberInput
        baseValues={secondNumberBaseValues}
        setBaseValues={setSecondNumberBaseValues}
        options={options}
      />

      <OperationResults
        firstNumberBaseValues={firstNumberBaseValues}
        secondNumberBaseValues={secondNumberBaseValues}
        options={options}
        operation={operation}
      />
    </>
  )
}