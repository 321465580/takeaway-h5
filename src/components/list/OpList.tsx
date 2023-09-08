import { createNamespace } from 'vant/lib/utils'
import { Loading as VanLoading } from 'vant'
import { defineComponent, nextTick, ref, onMounted, onUpdated } from 'vue'
import { useRect } from '../../hooks/useRect'
import { useScrollParent } from '../../hooks/useScrollParent'
import { useEventListener } from '../../hooks/useEventListener'
import "./OpList.scss"

const [name, bem] = createNamespace('list')

export default defineComponent({
    name,
    props: {
        offset: {
            type: Number,
            default: 300,
        },
        direction: {
            type: String,
            default: 'down',
        },
        loading: {
            type: Boolean,
        },
        finished: {
            type: Boolean,
        },
        finishedText: {
            type: String,
        },
        loadingText: {
            type: String,
        },
    },
    setup(props, { slots, emit }) {
        const loading = ref(props.loading)
        const root = ref()
        const placeholder = ref()
        // 获取谁的滚动容器
        const scrollParent = useScrollParent(root)

        const check = () => {
            nextTick(() => {
                if(loading.value || props.finished) {
                    return
                }
                // 获取相对位置信息
                const scrollParentRect = useRect(scrollParent)
                if(!scrollParentRect.height) {
                    return 
                }
                const { offset, direction } = props 
                const placeholderRect = useRect(placeholder)
                let isReachEdge = false
                if(props.direction === 'up') {
                    isReachEdge = scrollParentRect.top - placeholderRect.top <= offset
                } else {
                    isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset
                }

                if(isReachEdge) {
                    loading.value  = true
                    emit('update:loading', true)
                    emit('load')
                }
            })
        }

        const renderLoading = () => {
            if(loading.value && !props.finished) {
                return (
                    <div class={bem('loading')}>
                        {slots.loading? slots.loading() : <VanLoading class={bem('loading-icon')}>{props.loadingText || "加载中"}</VanLoading>}
                    </div>
                )
            }
        }

        const renderFinishedText = () => {
            if(props.finished) {
                const text = slots.finished ? slots.finished() : props.finishedText
                if(text) {
                    return <div class={bem('finished-text')}>{text}</div>
                }
            }
        }

        onUpdated(() => {
            loading.value = props.loading
        })

        // 第一次去加载
        onMounted(() => {
            check()
        })
        // 判断是否去加载
        useEventListener("scroll", check, {
            target: scrollParent,
            passive: true
        })

        return () => {
            const Content = slots.default?.()
            const Placeholder = <div ref={placeholder} class={bem('placeholder')}></div>

            return (
                <div ref={root} class={bem()}>
                    {props.direction === "down" ? Content : Placeholder}
                    {renderLoading()}
                    {renderFinishedText()}
                    {props.direction === "up" ? Content : Placeholder}
                </div>
            )

        }
    }
})