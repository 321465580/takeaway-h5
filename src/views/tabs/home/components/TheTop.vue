<script setup lang="ts">
import { ref } from "vue";
import OpSearch from "../../../../components/OpSearch.vue";
import type { ISearchRecomment } from "../../../../types";
interface IProps {
  recomments: ISearchRecomment[];
}
/* 
        通过使用 defineProps，告诉 Vue 编译器该组件具有 recomments 属性，
        并规定了它的类型，这样就确保了组件在使用时必须传入符合类型要求的 recomments 属性值。
        在使用 defineProps 之后，你可以直接在组件中访问定义的 props，而无需使用 this 或 $props。
    */
defineProps<IProps>();

interface IEmits {
  (e: "searchClick"): void;
}

const emits = defineEmits<IEmits>();

const inputVal = ref("阿斯顿");
const onSearch = (value?: string | number) => {
  console.log("search", value);
};
const onCancel = () => {
  console.log("cancel");
};
const onClear = () => {
  console.log("clear");
};
</script>

<template>
  <div class="home-top">
    <div class="top">
      <img
        class="location-icon"
        src="@/assets/imgs/index_page/location.png"
        alt=""
      />
      <div class="location">幸福小区(北区东南门)</div>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" />
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
    </div>

    <!-- <VanSearch
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="世界茶饮 35减2"
    >
      <template #right-icon>
        <div>搜索</div>
      </template>
    </VanSearch> -->

    <VanSticky>
      <OpSearch
        show-action
        shape="round"
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="世界茶饮 35减2"
        v-model="inputVal"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
        @input-click="emits('searchClick')"
      >
        <template #right-icon>
          <div @click="emits('searchClick')">搜索</div>
        </template>
      </OpSearch>
    </VanSticky>

    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag">
        {{ v.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;
  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
    .location-icon {
      width: 20px;
      height: 20px;
    }
    .location {
      flex: 1;
    }
    .shopcart-icon {
      width: 24px;
      height: 24px;
    }
    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }
  .search-recommend {
    display: flex;
    padding: 0 10px 8px;
    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>

<style lang="scss">
.home-top {
  .van-field__right-icon {
    margin-right: 0;
  }
}
</style>
