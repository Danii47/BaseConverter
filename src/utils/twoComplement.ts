export function twoComplementValue(value: string) {
  let newValue = value
  let complement = false

  for (let i = newValue.length - 1; i >= 0; i--) {
    if (newValue[i] == "1" && !complement) {
      complement = true
    } else if (complement) {
      newValue = newValue.substring(0, i) + String(Number(!Boolean(Number(newValue[i])))) + newValue.substring(i + 1);
    }
  }

  return newValue
}