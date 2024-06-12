import type { JSX } from "preact/jsx-runtime"
import type { Operation } from "../types/conversorTypes"
import type { Dispatch, StateUpdater } from "preact/hooks"


export default function OperationButtons(
  { setOperation, operation }:
    { setOperation: Dispatch<StateUpdater<Operation>>, operation: Operation }
) {

  const handleChangeOperation = (event: JSX.TargetedEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement

    if (operation === id) return

    setOperation(id as Operation)
  }

  return (
    <div class="operationButtons">
      <button id="+" onClick={handleChangeOperation} class={`operationButton ${(operation === "+" ? "selected" : "")}`}>
        +
      </button>
      <button id="-" onClick={handleChangeOperation} class={`operationButton ${(operation === "-" ? "selected" : "")}`}>
        -
      </button>
      <button id="×" onClick={handleChangeOperation} class={`operationButton ${(operation === "×" ? "selected" : "")}`}>
        ×
      </button>
      <button id="÷" onClick={handleChangeOperation} class={`operationButton ${(operation === "÷" ? "selected" : "")}`}>
        ÷
      </button>
    </div>
  )
}