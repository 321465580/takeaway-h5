import { ref } from "vue";
import type { Ref} from "vue"

export function useToggle(initState: boolean): [Ref<boolean>, () => void] {
    // 页面状态
    const state = ref(initState)
    const toggle = function() {        
        state.value = !state.value
    }
    return [state, toggle]
}