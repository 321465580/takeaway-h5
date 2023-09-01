/* 
    倒计时钩子
    requestAnimationFrame: 是浏览器提供的一个动画帧回调函数，每一帧执行一次
    浏览器，一秒刷新60帧

    setInterval和setTimeout不准
*/

import { ref, computed } from "vue"
import { cancelRAF, rAF } from '../utils/raf'

/* 
    start方法：开始计时
    pause方法：暂停计时
    reset方法：重置时间
    current变量：当前时间
    remain变量：保存剩余多少时间

    性能优化：是否需要毫秒级的计时，判断当前剩余时间是否与remain为同一秒
*/

type CurrentTime = {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
    total: number
}

type UseCountDownOptiosn = {
    // 需要倒计时多久
    time: number,
    millisecond?: boolean,
    // 时间改变后调用的函数
    onChange?: (current: CurrentTime) => void
    // 时间倒计完毕后调用的函数
    onFinish?: () => void
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function parseTime(time: number) {

    const days = Math.floor(time / DAY)
    const hours = Math.floor((time % DAY) / HOUR)
    const minutes = Math.floor((time % HOUR) / MINUTE)
    const seconds = Math.floor((time % MINUTE) / SECOND)
    const milliseconds = Math.floor(time % SECOND)

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        total: time
    }
}

function isSameSecond(time1: number, time2: number) {
    return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountdown(options: UseCountDownOptiosn) {
    let rafId: number;
    let counting: boolean;  // 当前是否在倒计时
    let endTime: number // 倒计时的那个时间戳
    let remain = ref(options.time)  // 剩下的时间
    const current = computed(() => parseTime(remain.value)) // 就是显示在页面上的时间

    // 暂停时间
    const pause = () => {
        counting = false
        cancelRAF(rafId)
    }

    // 得到当前剩余的时间
    const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)
    // 给剩余的时间赋值
    const setRemain = (value: number) => {
        remain.value = value
        options.onChange?.(current.value)

        if (value === 0) {
            pause()
            options.onFinish?.()
        }
    }

    // 毫秒级别的计时
    const microTick = () => {
        rafId = rAF(() => {
            if (counting) {
                const remainRemain = getCurrentRemain()
                setRemain(remainRemain)

                if (remain.value > 0) {
                    microTick()
                }
            }
        })
    }

    // 非毫秒级别的计时
    const notMicroTick = () => {
        rafId = rAF(() => {
            if (counting) {
                const remainRemain = getCurrentRemain()
                // 如果不是相同的时间，就去赋值
                if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
                    setRemain(remainRemain)
                }

                if (remain.value > 0) {
                    notMicroTick()
                }

            }
        })
    }

    const tick = () => {
        if (options.millisecond) {
            // 毫秒级别的
            microTick()
        } else {
            // 非毫秒级别的
            notMicroTick()
        }
    }

    // 开始计时
    const start = () => {
        if (!counting) {
            endTime = Date.now() + remain.value
            counting = true
            // 倒计时开始
            tick()
        }
    }

    // 重置
    const reset = (totalTime = options.time) => {
        pause()
        remain.value = totalTime
    }

    return {
        start,
        pause,
        reset,
        current
    }
}