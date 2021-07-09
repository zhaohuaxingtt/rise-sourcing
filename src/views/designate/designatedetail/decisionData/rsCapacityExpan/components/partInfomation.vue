<!--
 * @Author: haojiang
 * @Date: 2021-07-07 16:53:18
 * @LastEditTime: 2021-07-07 17:02:48
 * @LastEditors: Please set LastEditors
 * @Description: part Infomation
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/components/partInfomation.vue
-->
<template>
  <div class="caexpan-card">
    <div class="tit">3 Part infomation</div>
    <div class="caexpan-card-body">
      <el-table
        fit
        border
        tooltip-effect='light'
        :data='dataList'
        width="100%"
        @selection-change="handleSelectionChange"
        :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
        :class="{monitorTable: true}">
        <el-table-column
          align='center'
          prop="partNum"
          label="Part No.">
        </el-table-column>
        <el-table-column
          align='center'
          prop="carTypePro"
          label="Carline">
        </el-table-column>
        <el-table-column
          align='center'
          prop="partNameZh"
          label="Part Name">
        </el-table-column>
        <el-table-column
          align='center'
          prop="eimzl"
          label="Einzel/ZSB">
        </el-table-column>
        <!-- 横向排列 重复一遍 -->
        <el-table-column
          align='center'
          prop="partNum1"
          label="Part No.">
        </el-table-column>
        <el-table-column
          align='center'
          prop="carTypePro1"
          label="Carline">
        </el-table-column>
        <el-table-column
          align='center'
          prop="partNameZh1"
          label="Part Name">
        </el-table-column>
        <el-table-column
          align='center'
          prop="eimzl1"
          label="Einzel/ZSB">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
  .caexpan-card {
    .tit {
      padding: 15px 0;
    }
    .caexpan-card-body {
      padding-left: 20px;
    }
  }
}
</style>