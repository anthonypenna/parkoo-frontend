type AsyncResult<A> = Promise<[unknown, null] | [null, A]>

export async function until<A>(promiseThunk: () => Promise<A>): AsyncResult<A> {
  try {
    const result = await promiseThunk()
    return [null, result]
  } catch (error) {
    return [error as A, null]
  }
}
