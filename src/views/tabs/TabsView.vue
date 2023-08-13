<script setup lang="ts">
    import { RouterView, useRouter, useRoute } from 'vue-router'
    import { ref, watch } from 'vue';

    const route = useRoute()
    const router = useRouter()
    // 记录当前选择的tab
    const active = ref(route.name as string)

    // 监听active，改变的时候去更改路由
    watch(active, (newVal) => {
        router.push({name: newVal})
    })
</script>

<template>
    <RouterView />
    <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="order" icon="bars">订单</van-tabbar-item>
        <van-tabbar-item name="my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>

</style>