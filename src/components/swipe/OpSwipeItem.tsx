import { CSSProperties, computed, defineComponent, reactive } from "vue";
import { createNamespace } from "../../utils/create";
import { SWIPE_KEY } from "./OpSwipe";
import { useExpose } from '../../hooks/useExpose'
import { useParent } from "../../hooks/useParent";

const [name, bem] = createNamespace('swipe-item')

export default defineComponent({
    name,
    setup(props, { slots }) {

        const state = reactive({
            offset: 0
        })

        const { parent } = useParent(SWIPE_KEY)

        const style = computed(() => {
            const style: CSSProperties = {}

            if(parent) {
                if(parent.size.value) {
                    style[parent.props.vertical? 'height' : 'width'] = `${parent.size.value}px`
                }
                if(parent.offset) {
                    style.transform = `translate${parent.props.vertocal ? "Y" : "X"}${state.offset}px`
                }

            }

            return style
        })

        // 设置state.offset
        const setOffset = (offset: number) => {
            state.offset = offset
        }
        // 暴露方法
        useExpose({ setOffset })

        return () => (
            <div class={bem()} style={style.value}>
                {slots.default?.()}
            </div>
        )
    },
})