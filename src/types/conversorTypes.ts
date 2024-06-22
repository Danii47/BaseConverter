export type Base = "2" | "8" | "10" | "16"

export type Bases = {
  [base in Base]: string
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


export type Operations = {
  sum: "+"
  sub: "-"
  mult: "×"
  div: "÷"
}

export type Operation = "+" | "-" | "×" | "÷"

export type OperationsData = {
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