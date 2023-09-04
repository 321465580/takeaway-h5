import { getCurrentInstance } from "vue";
import { extend } from "../utils/basic";

export function useExpose<T = Record<string, any>>(apis: T) {
    // 获取组件实例
    const instance = getCurrentInstance()
    // 如果组件存在，把apis的方法挂载到组件上
    if(instance) {
        extend(instance, apis)
    }
}