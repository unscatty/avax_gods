import { DeepReadonly, readonly, Ref, ref, UnwrapRef } from 'vue'

export const useState = <T>(
  initialState: T
): [
  Readonly<Ref<DeepReadonly<UnwrapRef<T>>>>,
  (
    newState: UnwrapRef<T> | ((previousState: UnwrapRef<T>) => UnwrapRef<T>)
  ) => void
] => {
  const state = ref(initialState)

  const setState = (
    newState: UnwrapRef<T> | ((previousState: UnwrapRef<T>) => UnwrapRef<T>)
  ) => {
    if (typeof newState === 'function') {
      state.value = (newState as (previousState: UnwrapRef<T>) => UnwrapRef<T>)(
        state.value
      )
    } else {
      state.value = newState
    }
  }

  return [readonly(state), setState]
}
