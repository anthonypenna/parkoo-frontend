export function areEqual<A>(array1: A[], array2: A[]): boolean {
  if (array1.length !== array2.length) return false

  for (let i = 0; i < array1.length; i++) {
    const x = array1[i]
    const y = array2[i]

    if (x !== y) return false
  }

  return true
}
