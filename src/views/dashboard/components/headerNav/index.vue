<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
<div class="headerNav-wraper margin-bottom10">
  <div class="headerNav">
    <iNavMvp :list="list" lang @change="change" :lev="1" routerPage></iNavMvp>
    <span class="freshDate">{{language('SHUJUJIEZHIZHI', '数据截止至')}}：{{freshDate}}</span>
  </div>
</div>
</template>
<script>
import {TAB} from '../data'
import moment from 'moment'
import {
  iNavMvp,
} from "rise";

export default {
  data() {
    return {
      list: TAB,
      tab: ''
    }
  },
  computed: {
    freshDate() {
      return moment().format('YYYY-MM-DD')
    }
  },
  components: {
    iNavMvp,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.headerNav-sub {
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
}
.freshDate {
  color: #5f6879;
  font-size: 12px;
  opacity: 0.67;
}
.pull-right{
  float: right;
}
</style>