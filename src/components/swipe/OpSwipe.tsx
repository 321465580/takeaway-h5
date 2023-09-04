import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { createNamespace } from '../../utils/create';
import { clamp } from '../../utils/format';
import { doubleRaf } from '../../utils/raf';
import { useChildren } from '../../hooks/useChildren';
import "./OpSwipe.scss"

export type SwipeState = {
    rect: {width: number; height: number} | null
    width: number
    height: number
    offset: number
    active: number
    swiping: boolean
}

const [name, bem] = createNamespace('swipe')

export const SWIPE_KEY = Symbol(name)

// 导出组件
export default defineComponent({
    name,
    props: {
        autoplay: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 500
        },
        // 
        loop: {
            type: Boolean,
            default: true
        },
        // 立即播放
        showIndicators: {
            type: Boolean,
            defult: true
        },
        vertical: {
            type: Boolean,
            defult: false
        }
    },
    setup(props, { slots }) {
        const root = ref()
        const track = ref() // 包裹的op-swipe-item
        const state = reactive<SwipeState>({
            rect: null,
            offset: 0,
            width: 0,
            height: 0,
            active: 0,
            swiping: false //　是否在滚动中
        })
        // 获取轮播swipe的children
        const { children, linkChildren } = useChildren(SWIPE_KEY)
        const count  = computed(() => children.length)
        const size = computed(() => state[props.vertical ? 'height' : 'width'])
        const trackSize = computed(() => count.value * size.value)
        const trackStyle = computed(() => {
            const mainAxis = props.vertical ? 'height' : 'width'
            const style = {
                transitionDuration: `${state.swiping? 0 : props.duration}ms`,
                transform: `translate${props.vertical? 'Y': 'X'}(${state.offset}px)`,
                [mainAxis]: `${trackSize.value}px`
            }

            return style
        })

        const minOffset = computed(() => {
            if(state.rect) {
                const base = props.vertical ? state.rect.height : state.rect.width
                return base - trackSize.value
            }
            return 0
        })

        

        const getTargetActive = (pace: number) => {
            const { active } = state
            if(pace) {
                if(props.loop) {
                    // 如果是循环播放的，就是在-1，count.value之间，如果是正向滚动，把最后一个的item放到-1，把第一个放到最后一个
                    return clamp(active + pace, -1, count.value)
                }
                // 让active + pace在0~count.value - 1的范围之间
                return clamp(active + pace, 0, count.value - 1)
            } 
            return active
        }

        const getTargetOffset = (targetActive: number, offset = 0) => {
            const currentPosition = targetActive * size.value
            const targetOffset = offset - currentPosition
            return targetOffset
        }

        // 自动播放的逻辑
        const move = ({pace = 0, offset = 0 }) => {
            if(count.value <= 1) return
            const targetActive = getTargetActive(pace)
            const targetOffset = getTargetOffset(targetActive, offset)

            // 判断是否需要循环
            if(props.loop) {
                // 正向滚动, 左 -> 右
                if(children[0] && targetOffset !== minOffset.value) {
                    children[0].setOffset(targetOffset < minOffset.value? trackSize.value : 0)
                }
                // 方向滚动，右 -> 左
                if(children[count.value - 1] && targetOffset !== 0) {
                    children[count.value - 1]?.setOffset(targetOffset > 0? -trackSize.value: 0)
                }
            }

            state.active = targetActive
            state.offset = targetOffset
        }

        const correctPosition = () => {
            state.swiping = true
            if(state.active <= -1) {
                move({ pace: count.value})
            } else if(state.active >= count.value) {
                move({ pace: -count.value})
            }
        }

        const next = () => {
            // 矫正位置
            correctPosition()

            doubleRaf(() => {
                state.swiping = false
                move({
                    pace: 1, // 移动一个位置
                })
            })
        }
        let timeout: number

        const stopAutoPlay = () => clearTimeout(timeout)

        // 自动播放的方法
        const autoplay = () => {
            stopAutoPlay()
            if(props.autoplay > 0 && count.value > 1) {
                setTimeout(() => {
                    next()
                    autoplay()
                }, props.autoplay)
            }
        }

        // 初始化的方法
        const init = () => {
            if(!root.value) {
                return
            }
            const rect = {
                width: root.value?.offsetWidth,
                height: root.value?.offsetHeight
            }
            state.rect = rect
            state.width = rect.width
            state.height = rect.height
            
            autoplay()
        }

        // 激活的指示器点
        const activeIndicator = computed(() => {
            return (state.active + count.value) % count.value
        })

        // 渲染点
        // 遍历数组执行的函数，第一个参数是数组的值，第二个是数组的索引
        const renderDot = (val: string, index: number) => {
            const active = index === activeIndicator.value
            return <i class={bem('indicator', { active })}></i>
        }

        // 指示器的组件
        const renderIndicator = () => {
            if(props.showIndicators) {
                return <div class={bem('indicators')}>
                    {/* 生成数组渲染点 */}
                    {Array(count.value).fill('').map(renderDot)}
                </div>
            }
        }

        linkChildren({
            size,
            props
        })

        onMounted(init)
        onBeforeMount(stopAutoPlay)
        watch(() => props.autoplay, autoplay)

        return () => (
            <div ref={root} class={bem()}>
                <div ref={track} style={trackStyle.value}  class={bem('track')} >
                    {slots.default?.()}
                </div>
                {renderIndicator()}
            </div>
        )
    }
})