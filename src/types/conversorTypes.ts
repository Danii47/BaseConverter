export type Bases = {
  [base: string]: string
}

export type BasesValues = {
  [base: string]: string
}

export type OptionsType = {
  bits: number | null
  signOptions: SignOptionsType
}

export type SignOptionsType = {
  ca2: boolean
  magnitudSign: boolean
}

export type Base = "2" | "8" | "10" | "16"