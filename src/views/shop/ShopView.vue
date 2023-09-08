<script setup lang='ts'>
import { useAsync } from '../../hooks/useAsync'
import { fetchShopPageData } from '../../api/shop'
import OpLoadinfView from '../../components/OpLoadinfView.vue'
import { useRoute } from "vue-router"
import ShopHeader from './components/ShopHeader.vue'
import { PRIMARY_COLOR } from '../../../config'
import OpTodo from '../../components/OpTodo.vue'
import GoodList from './components/GoodList.vue'
import { ref } from 'vue'
import shopCart from './components/shopCart.vue'

const TAB_LIST = [
    {
        value: 1,
        label: '全部商品',
        component: GoodList
    },
    {
        value: 2,
        label: '评价',
        component: OpTodo
    },
    {
        value: 3,
        label: '商家',
        component: OpTodo
    },
]
const active = ref(TAB_LIST[0].value)

const route = useRoute()
const { id  } = route.params

const { data, pending } = useAsync(() => fetchShopPageData(id as string), {
    announcement: '',
    discounts: [],
    redbags: [],
    activitys: [],
    branch: '',
    comments: [],
    deliveryDistance: '',
    deliveryStrategy: '',
    deliveryStratingPrice: '',
    deliveryTags: [],
    deliveryTime: '',
    id: '',
    monthlyCount: 0,
    postUrl: '',
    bgUrl: '',
    score: 0,
    services: [],
    shopName: '',
    tops: [],
})

const onClickLeft = () => history.back()

</script>

<template>
    <div class="shop-page">
        <VanNavBar left-text="返回" left-arrow @click-left="onClickLeft" />
        <OpLoadinfView :loading="pending" type="skeleton">
            <ShopHeader :data="data"></ShopHeader>
            <VanTabs v-model:active="active" :color="PRIMARY_COLOR" animated sticky swipeable>
                <VanTab v-for="v in TAB_LIST" :key="v.value" :title="v.label" :name="v.value">
                    <component :is="v.component"></component>
                </VanTab>
            </VanTabs>
            <shopCart v-if="active === 1"/>
        </OpLoadinfView>
    </div>
</template>

<style lang="scss">
.shop-page {
  .van-tabs__line,
  .van-nav-bar {
    z-index: 0;
  }
}
</style>