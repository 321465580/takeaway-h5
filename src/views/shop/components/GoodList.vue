<script setup lang='ts'>
import OpLoadinfView from '../../../components/OpLoadinfView.vue';
import { useAsync } from '../../../hooks/useAsync';
import { fetchGoodsListData } from '../../../api/goods'
import { useRoute } from 'vue-router';
import { IGood, IMenu } from '../../../types'
import { ref, watch } from 'vue';
import GoodsItem from './GoodsItem.vue';
import { useCartStore } from '../../../stores/cart';

const { setCartItems } = useCartStore()
const route = useRoute()
const { id } = route.params

const { data, pending} = useAsync(() => fetchGoodsListData(id as string).then((v) => v.data), [] as IMenu[])

const creategoryActive = ref(0)

// 当更新的时候，去设置购物车
watch(data, (nv) => {
    const cardGoods = nv.reduce((acc: IGood[], cur: IMenu) => [...acc, ...cur.goods], []).filter(v => v.cartCount)
    setCartItems(cardGoods)
})
</script>

<template>
    <OpLoadinfView :loading="pending" type="skeleton">
        <div class="shop-goods-list">
            <VanSidebar v-model="creategoryActive">
                <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"></VanSidebarItem>
            </VanSidebar>
            <div class="list">
                <template v-for="v in data" :key="v.label">
                    <div class="category-name">{{ v.label }}</div>
                    <GoodsItem  v-for="cv in v.goods" :key="cv.id" :data="cv" />
                </template>
                
            </div>
        </div>
    </OpLoadinfView>
</template>

<style lang="scss" scoped>
.shop-goods-list {
  --van-sidebar-selected-border-color: none;
  --van-sidebar-padding: 14px var(--van-padding-sm);
  --van-sidebar-font-size: 13px;

  display: flex;
//   height: 480px;

  .sidebar {
    overflow-y: hidden;
    padding-bottom: 50px;
  }

  .list {
    flex: 1;
    margin: 0 10px;
    position: relative;

    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
      background: white;
      z-index: 1;
      width: 100%;

      &__fixed {
        position: absolute;
        top: -1px;
        left: 0;
      }
    }
  }
}
</style>