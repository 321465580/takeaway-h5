<script setup lang="ts">
import { ref } from "vue";
import OpSearch from "../../components/OpSearch.vue";
import { fetchSearchData } from "../../api/search";
import type { ISearchResult } from "../../types";
import { useToggle } from "../../hooks/useToggle";
import { computed } from "vue";
import { watch } from "vue";
import { useDebounce } from '../../hooks/useDebounce'

interface IEmits {
  (e: "cancel"): void;
}
// 拿到自定义事件
const emits = defineEmits<IEmits>();

// 搜索框的输入的值
const searchValue = ref("");
// 存储搜索到的结果
const searchResult = ref([] as ISearchResult[]);
// 定义搜索框的状态
const [INIT, DONE, DOING] = [-1, 0, 1];
const searchState = ref(INIT);
// 搜索框触发的函数
const onSearch = async (val?: number | string) => {
  try {
    searchState.value = DOING;
    const { list } = await fetchSearchData(val as string);
    searchResult.value = list;
  } finally {
    searchState.value = DONE;
  }
};

// 历史记录
const [isHistoryTagShow, toggleHistoryTagShow] = useToggle(false)
const HISTORY_TAGS = ['比萨', '西红柿', '阿斯顿', '安慰', '阿萨德', 'asd', '请问二位', '阿萨德千万人', '在县城中心', '草莽流寇']
const historyTags = computed(() => isHistoryTagShow.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5))

const onTagClick = (tag: string) => {
  searchValue.value = tag
  onSearch(tag)
}
// 当输入框的值，发生改变的时候，自动的去搜索
// 防抖函数
// const watchFn = useDebounce((newVal) => {
//   if(!newVal) {
//     searchResult.value = []
//     return
//   }
//   onSearch(newVal as string)
// }, 1000)
// watch(searchValue, watchFn)

// 防抖值

const debounceValue = useDebounce(searchValue, 1000)
watch(debounceValue, (nv) => {
  if (!nv) {
    searchResult.value = []
    return
  }
  onSearch(nv as string)
})

</script>

<template>
  <div class="search-view">
    <!-- 搜索框 -->
    <OpSearch show-action shape="round" placeholder="请输入搜索关键词" v-model="searchValue" @search="onSearch"
      @cancel="emits('cancel')"></OpSearch>
    <!-- 历史记录 -->
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <TransitionGroup name="list">
        <div class="history-tag" v-for="tag in historyTags" :key="tag" @click="onTagClick(tag)">{{ tag }}</div>
        <div class="history-tag" @click="toggleHistoryTagShow">
          <VanIcon v-if="isHistoryTagShow" name="arrow-up" />
          <VanIcon v-else name="arrow-down" />
        </div>
      </TransitionGroup>
    </div>

    <!-- 搜索出来的结果 -->
    <div v-else class="search-view__result">
      <div class="searching" v-if="searchState === DOING">~正在搜索~</div>
      <!-- 完成搜索后 -->
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="item in searchResult" :key="item.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ item.label }}</div>
          <div class="count">{{ item.resultCount }}个结果</div>
        </div>
        <div class="no-result" v-if="!searchResult.length">~暂无推荐~</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);

    .label {
      margin-bottom: var(--van-padding-xs);
    }

    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);

      .name {
        flex: 1;
        padding-left: 6px;
      }

      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }

    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
