<template>
  <div>
    <template v-for="item in rowData">
      <div :key="item" class="row-list">
        <el-checkbox v-model="check" :indeterminate="indeterminate"></el-checkbox>
        <div>
          <icon v-if="item.show" symbol name="iconzidingyi" />
          <icon v-else-if="!item.show" symbol name="iconzidingyi" />
          {{item.col1}}
        </div>
        <div>{{item.col2}}</div>
      </div>
      <template v-if="item.children&&item.show">
        <row-list :rowData="item.children" :key="item"></row-list>
      </template>
    </template>
  </div>
</template>

<script>
import { icon } from "rise";
  export default {
    props:{
      rowData:{
        type: Array,
        default: ()=>[]
      }
    },
    data() {
      return {
        indeterminate: false
      }
    },
  }
</script>

<style lang="scss" scoped>
.row-list{
  width: 100%;
  display: flex;
  flex-flow: row;
}
</style>