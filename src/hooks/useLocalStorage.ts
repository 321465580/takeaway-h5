import { computed } from 'vue'

const parseJSON = (value: string) => {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch (error) {
        return undefined
    }
}

export function useLocalStorage<T>(key: string, initValue: T)  {
    const readValue = () => {
        try {
            // 有值就返回，没有值就返回一个默认的值
            const item = window.localStorage.getItem(key)
            return item ? parseJSON(item) : initValue
        } catch (error) {
            return initValue
        }
    }
    // 值
    const storeValue = computed(() => readValue())
    // 设置
    const setValue = (value: T) => {
        try {
            // 如果存放的是方法
            const newValue = value instanceof Function? value(storeValue) : value
            window.localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {}
    }
    // 删除
    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {}
    }


    return {
        value: storeValue,
        setValue,
        removeItem
    }
}