<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:06:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:01:28
 * @Description: 项目管理概览
 * @FilePath: \front-sourcing\src\views\project\overview\index.vue
-->

<template>
  <iPage class="overview">
    <projectTop />
    <search
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="sure"
      @reset="reset"
      :icon="false"
    ></search>
    <tableList :title="titleName+' 列表'" class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from "rise";
import projectTop from "../../components/projectHeader";
import search from "../../components/search";
import tableList from "../../components/tableList";
import { kickOffSearchList as searchList } from "../../components/data";
export default {
  components: {
    iPage,
    projectTop,
    search,
    iCard,
    iButton,
    tableList,
  },
  data() {
    return {
      searchList,
      selectOptions: {
        partTypeOptions: [
          {
            label: "类型1",
            value: 1,
          },
        ],
        proessOptions: [
          {
            label: "进度1",
            value: 1,
          },
        ],
      },
      searchParams: {
        prop6: "",
        prop8: "",
      },
      titleName:"",
    };
  },
  created() {
    this.titleName = this.$route.query?.type;
  },
  methods: {
    sure(form) {
      this.searchParams = form;
    },
    reset() {
      this.searchParams = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  &-home {
    padding: 0 !important;
    padding-top: 10px !important;
    // height: calc(100% - 55px) !important;
    // overflow: auto !important;
  }
}
</style>