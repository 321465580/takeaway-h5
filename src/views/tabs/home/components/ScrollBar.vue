<script setup lang='ts'>
import { ref, onMounted } from 'vue';
// import { useTimeout } from '../../../../hooks/useTimeout'
import { useInterval } from '../../../../hooks/useInterval'
import type { IScrollBarInfo } from '../../../../types'

interface IProps {
    intervalTime?: number
    transitionTime?: number
    height?: number
    data: IScrollBarInfo[]
}
// withDefaults 设置默认值
const props = withDefaults(defineProps<IProps>(), {
    intervalTime: 3000,
    transitionTime: 1000,
    height: 40,
})

// 获取<div ref="containRef">的dom结构
const containRef = ref()
// 动态设置css的高度
const heightPx = `${props.height}px`

onMounted(() => {
    // 滚动的逻辑
    // 拿到这个div的DOM结构
    const container = containRef.value
    const count = container.children.length
    const firstSwipeItem = container.children[0]
    container.style.height = `${count * props.height}px`
    let index = 0
    useInterval(() => {
        index++
        // 如果超过 item 个数就需要将第一个元素接到后面
        if (index >= count) {
            firstSwipeItem.style.transform = `translateY(${index * props.height})`
            // 第一个元素滚动动画结束后，将整个container位置重置
            const clear = setTimeout(() => {
                // 重置逻辑
                firstSwipeItem.style.transform = ''
                container.style.transform = ''
                container.style.transition = ''
                clearTimeout(clear)
            }, props.transitionTime)
        }
        container.style.transform = `tanslateY(-${index * props.height}px)`
        container.style.transition = `all linear ${props.transitionTime}`
        index = index % count
    }, props.intervalTime)
})
</script>

<template>
    <div class="home-scroll-bar">
        <div class="home-scroll-bar__swipe">
            <div ref="containRef">
                <div class="swipe-item" v-for="v in props.data" :key="v.type">
                    <div class="scroll-bar__info" :class="`scroll-bar__info__${v.type}`"></div>
                    <span class="info-badge">{{ v.badge }}</span>
                    <span class="info-detail" v-html="v.detail"></span>
                    <span class="info-btn op-thin-border">{{ v.btn }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
 .home-scroll-bar {
  --bean-color: rgb(252, 164, 40);
  --hongbao-color: rgb(252, 68, 25);
  &__swipe {
    background: white;
    border-radius: 8px;
    margin: 5px 10px;
    font-size: 13px;
    position: relative;
    overflow: hidden;
    height: v-bind(heightPx);
    .swipe-item {
      height: v-bind(heightPx);
    }
  }
  .scroll-bar__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    height: 100%;

    .info-badge {
      border-radius: 5px;
      padding: 2px 6px;
      color: white;
      margin-right: 6px;
      font-size: 12px;
    }
    .info-detail {
      flex: 1;
    }
    .info-btn {
      padding: 3px 14px;
      font-size: 12px;
      &.op-thin-border:before {
        border-radius: 50px;
      }
    }

    .info-num {
      font-weight: bold;
      margin: 0 2px;
    }

    &__bean {
      .info-badge {
        background: var(--bean-color);
      }
      .info-btn {
        color: var(--bean-color);
        &:before {
          border-color: var(--bean-color);
        }
      }
      .info-num {
        color: var(--bean-color);
      }
    }

    &__hongbao {
      .info-badge {
        background: var(--hongbao-color);
      }
      .info-btn {
        color: var(--hongbao-color);
        &:before {
          border-color: var(--hongbao-color);
        }
      }
      .info-num {
        color: var(--hongbao-color);
      }
    }
  }
}
</style>