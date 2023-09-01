<!-- 金刚位组件
    一堆图标的组件
-->
<script setup lang='ts'>
import { ITransformer } from '../../../../types';

interface IProps {
    data: ITransformer[]
}

defineProps<IProps>()
</script>

<template>
    <div class="home-transformer">
        <div v-for="v in data" :key="v.label" class="home-transformer__item">
            <img :src="v.imgUrl" alt="">
            <div>{{ v.label }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-transformer {
    display: grid;
    // 五列
    grid-template-columns: repeat(5, 1fr);
    padding: 10px ;

    &__item {
        font-size: 13px;
        line-height: 15px;
        text-align: center;

        img {
            width: 48px;
        }
    }
}

</style>