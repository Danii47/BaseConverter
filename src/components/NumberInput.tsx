import type { Bases, BasesValues, OptionsType, Base } from "../types/conversorTypes"
import ChangeBaseInput from "./ChangeBaseInput"

import "./Components.css"

export default function NumberInput(
  { bases: BASES, baseValues, setBaseValues, options }:
  { bases: Bases, baseValues: BasesValues, setBaseValues: Function, options: OptionsType }
) {

  return (
    <div class="inputsContainer">
    {
      Object.entries(BASES).map(([base, name]) => (
        <section>
          <h2 class="h2Titles">{name} <sub>({base})</sub> {base == "2" && `(${baseValues.bits} bit${baseValues.bits !== 1 ? "s" : ""})`}</h2>
          <ChangeBaseInput
            base={base as Base}
            baseValues={baseValues}
            setBaseValues={setBaseValues}
            options={options}
          />
        </section>
      ))
    }
  </div>
  )
}