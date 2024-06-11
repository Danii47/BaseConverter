export type Bases = {
  [base: string]: string
}

export type BasesValues = {
  bits: number
  values: {
    [base: string]: string
  } 
}

export type OptionsType = {
  ca2: boolean
  magnitudSign: boolean
}

export type Base = "2" | "8" | "10" | "16"