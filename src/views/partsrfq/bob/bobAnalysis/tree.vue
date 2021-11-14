<!--
 * @Author: your name
 * @Date: 2021-11-14 23:41:37
 * @LastEditTime: 2021-11-15 00:02:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\bob\bobAnalysis\tree.vue
-->
<template>

  <div>
    <span class="dataTitle margin-right60">{{model.title}}</span>
    <!-- <span class=" dataValue">
      <el-checkbox>{{model['value'+index]}}</el-checkbox>
    </span> -->
    <tree v-for="(item,index) in model.children"
          :model=item
          :key="index"></tree>
  </div>
</template>

<script>
// import tree from './tree'
export default {
  name: 'tree',
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  // components: {
  //   tree
  // },
  watch: {
    model: {
      handler (val) {
        console.log(val, "-------------------------------------------------------")
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tabeleList {
  & > span {
    flex: 1;
  }
  & > span:first-child {
    flex: 2;
  }
  .tableTitle {
    font-size: $font-size16;
    text-align: center;
  }
  .tableData {
    font-size: $font-size16;
  }
  .dataTitle {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
