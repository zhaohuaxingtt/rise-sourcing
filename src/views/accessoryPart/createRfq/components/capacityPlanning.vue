<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 20:06:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-31 15:07:54
 * @Description: 产能计划弹窗
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\capacityPlanning.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
    :show-close="false"
  >
    <template slot="title">
      <div class="clearFloat">
        <span class="font18 font-weight">产能计划</span>
          <div class="floatright">
            <!--------------------保存按钮----------------------------------->
            <iButton @click="handleSave" >保存</iButton>
            <!--------------------添加按钮----------------------------------->
            <iButton @click="handleAddParts" >结束编辑</iButton>
          </div>
      </div>
    </template>
    <tableList class="left-title-table" :selection="false" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" ></tableList>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { planTableTitle } from '../data'
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      backType: '',
      backReason: '',
      tableData: [{a: '降价幅度(%)'}],
      tableTitle: planTableTitle,
      searchParams: {}
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage() {
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: {  }})
      window.open(router.href,'_blank')
    },
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
  .left-title-table {
    ::v-deep thead th:not(th:first-of-type) {
      background-color: #F7FAFF;
      font-weight: 400;
    }
    ::v-deep thead th:first-of-type {
      border-right: 1px solid #fff;
    }
    ::v-deep tbody td {
      background-color: #F7FAFF;
      border-top: 1px solid #fff;
      
    }
    ::v-deep tbody td:first-of-type {
      background-color: rgba(22, 99, 246, 0.17);
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      font-weight: bold;
    }
  }
}
</style>