import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { IGood } from "../types";

export interface ICartState {
    items: IGood[]
    checkedIds: number[]
}

export const useCartStore = defineStore('cart', () => {

    const state: ICartState = reactive({
        items: [],
        checkedIds: [] // 勾选到了的id数组
    })

    const total = computed(() => state.items.reduce((acc, cur) => acc + cur.cartCount,0))
    const totalPrice = computed(() => state.items.reduce((acc, cur) => acc + cur.price * cur.cartCount, 0).toFixed(2))
    const totalOldPrice = computed(() => state.items.reduce((acc, cur) => acc + cur.price * cur.cartCount, 0).toFixed(2))
    const isAllChecked = computed(() => state.items.length === state.checkedIds.length)

    // 得到购物车里面的物品数量
    const cartCountById = (id: number) => {
        return state.items.find(v => v.id === id)?.cartCount
    }
    // 加入购物车
    const pushProductToCart = (item: IGood) => {
        const cartItem = state.items.find(v => v.id === item.id)
        if(cartItem) {
            cartItem.cartCount++
            return
        }
        item.cartCount = 1
        state.items.push(item)

        const isIncluded = state.checkedIds.includes(item.id)
        if(!isIncluded) {
            state.checkedIds.push(item.id)
        }
    }
    // 从购物车中删除
    const removeProductFromCart = (item: IGood) => {
        const cartItemIndex = state.items.findIndex(v => v.id === item.id)
        const cartItem = state.items[cartItemIndex]
        if(cartItem) {
            cartItem.cartCount--
            if(cartItem.cartCount === 0) {
                state.items.splice(cartItemIndex, 1)
                const index = state.checkedIds.findIndex(v => v === item.id)
                if(index > -1) {
                    state.checkedIds.splice(index, 1)
                }
               
            }
        }
    }
    // 设置所有的商品
    const setCartItems = (items: IGood[]) => {
        state.items = items
        state.checkedIds = items.filter(v => v.checked).map(v => v.id)

    }
    // 设置选中的数组
    const setCheckedIds = (ids: number[]) => {
        state.checkedIds = ids
    }
    // 全选，和反选
    const toggleAllcheckd = (isAllChecked: boolean) => {
        const ids = isAllChecked ? state.items.map(v => v.id) : []
        state.checkedIds = ids
    }

    return {
        state,
        total,
        totalPrice,
        totalOldPrice,
        isAllChecked, // 是否全部选择
        cartCountById,
        pushProductToCart,
        removeProductFromCart,
        setCartItems,
        setCheckedIds,
        toggleAllcheckd
    }
})