<script setup lang="ts">
    import TheTop from './components/TheTop.vue';

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
</script>

<template>
    <div class="home-page">
        <TheTop :recomments="recomments"/>
    </div>
</template>

<style scoped>
.home {
    font-size: 37.5px
}
</style>