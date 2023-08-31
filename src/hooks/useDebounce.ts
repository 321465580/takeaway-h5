// interface IDebounceFn<T> {
//     (...args: T[]): void | Promise<void>
// }

// export function useDebounce<T>(fn: IDebounceFn<T>, delay: number) {
//     let timer: number | null = null
//     return function f(this: void, ...args: T[]) {
//         if(timer) {
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             fn.call(this, ...args)
//         }, delay)
//     }
// }
import type { Ref, UnwrapRef } from 'vue'
import { ref, watch } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number) {
    const debeounceValue = ref(value.value)

    let timer: null | number = null

    watch(value, (newVal) => {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            debeounceValue.value = newVal as UnwrapRef<T>
        }, delay)
    })

    return debeounceValue
}