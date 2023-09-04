<script setup lang="ts">
import TheTop from './components/TheTop.vue';
import { useToggle } from '../../../hooks/useToggle'
import ScrollBar from './components/ScrollBar.vue';
import SearchView from '../../search/SearchView.vue'
import { useAsync } from '../../../hooks/useAsync';
import { fetchHomePageData } from '../../../api/home';
import { ICountdown } from '../../../types';
import OpLoadinfView from '../../../components/OpLoadinfView.vue';
import TheTransformer from './components/TheTransformer.vue';
import countDown from './components/countDown.vue';
import OpSwipe from '../../../components/swipe/OpSwipe'
import OpSwipeItem from '../../../components/swipe/OpSwipe'

const [isSearchView, toggleSearchView] = useToggle(false)
// 拿到请求页面的数据和状态
const { data, pending } = useAsync(fetchHomePageData, {
    banner: [],
    searchRecomments: [],
    transformer: [],
    scrollBarInfoList: [],
    countdown: {} as ICountdown,
    activities: []
})
</script>

<template>
    <div class="home-page">
        <!-- 实现搜索框的渐变动画，下方定义类名，进入和离开的时候的动画 -->
        <Transition name="fade">
            <SearchView v-if="isSearchView" @cancel="toggleSearchView"></SearchView>
        </Transition>

        <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView" />
        <OpLoadinfView :loading="pending" type="loading">
            <template #template>
                load
            </template>
            <div class="home-page__banner">
                <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" alt="">
            </div>
            <!-- 多个小图标组件 -->
            <TheTransformer :data="data.transformer"></TheTransformer>
            <!-- 滚动组件 -->
            <ScrollBar :data="data.scrollBarInfoList"/>
            <!-- 限时抢购组件 -->
            <div class="home-page__activity">
                <countDown :data="data.countdown"></countDown>
                <!-- 轮播图 -->
                <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
                    <OpSwipeItem v-for="v in data.activities" :key="v">
                        <img src="../../../assets/imgs/index_page/comments.png" alt="">
                        <!-- <img :src="v"> -->
                    </OpSwipeItem>
                </OpSwipe>
            </div>
            
        </OpLoadinfView>

    </div>
</template>

<style lang="scss" scoped>
.home-page {
    // 使用背景色的变量
    background: var(--op-gray-bg-color);
    padding-bottom: 70px;

    &__banner {
        img {
            width: 100%;
            padding-top: 10px ;
            background-color: white;
        }
    }
    &__activity {
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin: 10px;
        &__swipe {
            border-radius: 8px;
            width: 180px;
            height: 170px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}</style>