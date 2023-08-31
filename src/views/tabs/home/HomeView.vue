<script setup lang="ts">
import TheTop from './components/TheTop.vue';
import { useToggle } from '../../../hooks/useToggle'
import SearchView from '../../search/SearchView.vue'
import { useAsync } from '../../../hooks/useAsync';
import { fetchHomePageData } from '../../../api/home';
import { IHomeInfo } from '../../../types';

// 搜索推荐, 传给TheTop组件
const recomments = [
    {
        value: 1,
        label: '牛腩'
    },
    {
        value: 2,
        label: '坤坤'
    }
]

const [isSearchView, toggleSearchView] = useToggle(false)
// 拿到请求页面的数据和状态
const { data, pending } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
    <div class="home-page">
        <!-- 实现搜索框的渐变动画，下方定义类名，进入和离开的时候的动画 -->
        <Transition name="fade">
            <SearchView v-if="isSearchView" @cancel="toggleSearchView"></SearchView>
        </Transition>

        <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
        {{ data }}
        {{ pending }}
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
    ;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}</style>