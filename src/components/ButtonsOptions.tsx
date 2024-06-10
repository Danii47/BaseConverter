import { type OptionsType } from "../types/conversorTypes"
import { type JSX } from 'preact';

import "./Components.css"

export default function ButtonsOptions({ setOptions, options }: { setOptions: Function, options: OptionsType }) {

  const handleChangeOption = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const { id, checked } = event.target as HTMLInputElement
  
    if (!checked) return

    console.log({options})

    setOptions(() => {
      if (id == "ca2") {
        return {
          ...options,
          signOptions: {
            ca2: true,
            magnitudSign: false,
          }
        }
      } else if (id == "magnitudSign") {
        return {
          ...options,
          signOptions: {
            ca2: false,
            magnitudSign: true,
          }
        }
      } else {
        return {
          ...options,
          signOptions: {
            ca2: false,
            magnitudSign: false,
          }
        }
      }
    })
  }

  return (
    <section style={styles.container} class="buttonOptionsContainer">
      <label style={styles.label}>
        <input type="radio"
          style={styles.input}
          name="options"
          id="ca2"
          onInput={handleChangeOption}
        />
        Complemento a 2
      </label>
      <label style={styles.label}>
        <input type="radio"
          style={styles.input}
          name="options"
          id="magnitudSign"
          onInput={handleChangeOption}
        />
        Signo magnitud
      </label>
      <label style={styles.label}>
        <input type="radio"
          style={styles.input}
          name="options"
          onInput={handleChangeOption}
          checked={!options.signOptions.ca2 && !options.signOptions.magnitudSign}
        />
        Bits sin signo
      </label>
    </section>
  )
}

const styles = {
  container: {
    display: "flex",
    gap: "2rem",
    marginTop: "2vh",
  },

  label: {
    display: "flex",
    gap: ".2rem",
  },

  input: {
    cursor: "pointer",
  },
}