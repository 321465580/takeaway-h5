import { ref } from 'vue'
import type { UnwrapRef } from 'vue'

// T是返回数据的类型，asyncFn请求的函数, 返回Promise,initValue初始值, immediate是否立刻执行
export function useAsync<T>(asyncFn: () => Promise<T>, initValue: T, immediate = true) {
    // 请求的状态
    const pending = ref(false)
    // 请求的数据
    const data = ref(initValue)
    // 请求发生的错误
    const error = ref(null)
    // 执行这个请求函数
    const execute = function() {
        pending.value = true
        error.value = null
        return asyncFn().then(res => {
            data.value = res as UnwrapRef<T>
            pending.value = false
        }).catch(err => {
            error.value = err
            pending.value = false
        })
    }

    if(immediate) {
        execute()
    }

    return {
        pending,
        data,
        error,
        execute
    }
}