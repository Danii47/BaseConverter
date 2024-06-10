import { useState } from "preact/hooks"
import ChangeBaseInput from "./ChangeBaseInput"
import ButtonsOptions from "./ButtonsOptions"
import type { Bases, Base } from "../types/conversorTypes"

import "./Components.css"

export default function ButtonsContainer({ bases: BASES }: { bases: Bases }) {

  const [baseValues, setBaseValues] = useState({
    2: "0",
    8: "0",
    10: "0",
    16: "0",
  })

  const [options, setOptions] = useState({
    bits: 0,
    signOptions: {
      ca2: false,
      magnitudSign: false,
    }
  })

  return (
    <>
      <ButtonsOptions setOptions={setOptions} options={options}/>
      <div class="inputsContainer">
        {
          Object.entries(BASES).map(([base, name]) => (
            <section>
              <h2>{name} <sub>({base})</sub> {base == "2" && `(${options.bits} bits)`}</h2>
              <ChangeBaseInput
                base={base as Base}
                baseValues={baseValues}
                setBaseValues={setBaseValues}
                options={options}
                setOptions={setOptions}
              />
            </section>
          ))
        }
      </div>
    </>
  )
}