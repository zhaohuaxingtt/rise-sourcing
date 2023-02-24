<!--
 * @Author: haojiang
 * @Date: 2021-07-07 16:53:18
 * @LastEditTime: 2021-10-19 16:36:12
 * @LastEditors: Hao,Jiang
 * @Description: part Infomation
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/components/partInfomation.vue
-->
<template>
  <div class="caexpan-card">
    <div class="tit">3 Part Information</div>
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
          label="Einzel/ZSB.">
          <template slot-scope="scope">{{scope.row.eimzl || 'ZSB'}}</template>
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
          label="Einzel/ZSB.">
          <template slot-scope="scope">{{scope.row.eimzl1 || 'ZSB'}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      dataList: [],
    }
  },
  watch: {
    data() {
      if (this.data.length) {
        this.data.forEach((item, index) => {
          if (index % 2 === 0) {
            const nextItem = this.data[index + 1] ? this.data[index + 1] : {}
            const tmpItem = Object.assign(item, {
              partNum1: nextItem.partNum,
              carTypePro1: nextItem.carTypePro,
              partNameZh1: nextItem.partNameZh
            })
            this.dataList.push(tmpItem)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
  .caexpan-card {
    .tit {
      padding: 15px 0;
      font-size: 14px;
    }
    .caexpan-card-body {
      padding-left: 20px;
    }
  }
}
</style>