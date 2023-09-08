import { onMounted, nextTick, onActivated } from "vue"

export function onMountedOrActivated(hook: () => void) {

    let mounted: boolean

    onMounted(() => {
        nextTick(() => {
            mounted = true
        })
    })

    onActivated(() => {
        if(mounted) {
            hook()
        }
    })
}