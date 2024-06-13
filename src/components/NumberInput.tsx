import type { BasesValues, OptionsType, Base } from "../types/conversorTypes"
import ChangeBaseInput from "./ChangeBaseInput"
import { BASES } from "../constants/Bases"


import "./Components.css"

export default function NumberInput(
  { baseValues, setBaseValues, options }:
  { baseValues: BasesValues, setBaseValues: Function, options: OptionsType }
) {

  return (
    <div class="inputsContainer">
    {
      Object.entries(BASES).map(([base, name]) => (
        <section>
          <h2 class="h2Titles">{name} <sub>({base})</sub> {base == "2" && <span class="bitsNumber">({baseValues.bits} bit{baseValues.bits !== 1 ? "s" : ""})</span>}</h2>
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