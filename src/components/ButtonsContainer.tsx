import { useState } from "preact/hooks"
import ChangeBaseInput from "./ChangeBaseInput"
import ButtonsOptions from "./ButtonsOptions"
import type { Bases, Base } from "../types/conversorTypes"

import "./Components.css"
import NumberInput from "./NumberInput"
import OperationResults from "./OperationResults"

export default function ButtonsContainer({ bases: BASES }: { bases: Bases }) {

  const [firstNumberBaseValues, setFirstNumberBaseValues] = useState({
    bits: 0,
    values: {
      2: "0",
      8: "0",
      10: "0",
      16: "0",
    }
  })

  const [secondNumberBaseValues, setSecondNumberBaseValues] = useState({
    bits: 0,
    values: {
      2: "0",
      8: "0",
      10: "0",
      16: "0",
    }
  })

  const [options, setOptions] = useState({
    ca2: false,
    magnitudSign: false,
  })

  return (
    <>
      <ButtonsOptions
        setOptions={setOptions}
        options={options}
      />

      <NumberInput
        bases={BASES}
        baseValues={firstNumberBaseValues}
        setBaseValues={setFirstNumberBaseValues}
        options={options}
      />

      <NumberInput
        bases={BASES}
        baseValues={secondNumberBaseValues}
        setBaseValues={setSecondNumberBaseValues}
        options={options}
      />

      <OperationResults
        firstNumberBaseValues={firstNumberBaseValues}
        secondNumberBaseValues={secondNumberBaseValues}
        options={options}
      />
    </>
  )
}