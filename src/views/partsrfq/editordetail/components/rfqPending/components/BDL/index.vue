<!--
* @author:shujie
* @Date: 2021-3-5 10:56:32
 * @LastEditors: YoHo
* @Description: BDL列表
 -->
<template>
  <div class="BDL">
    <iCard collapse :title="language('BDL','BDL')">
      <template slot="subInfo">
        <div class="input">
          <iInput @keydown.native.enter="query" :placeholder="language('LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG','请输入查询供应商名称')" v-model="supplierName" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERNAMESEARCH|BDL供应商名称查询">
            <div class="inputSearchIcon" slot="suffix">
              <icon symbol name="iconshaixuankuangsousuo" @click.native="query" />
            </div>
          </iInput>
        </div>
      </template>
      <template slot="header-control">
        <div class="button-box">
          <iButton v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_BDLSAVEBDL|BDL添加" @click="handleAdd">{{ language("TIANJIA", "添加") }}</iButton>
          <iButton @click="handleDelete" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_DELETESUPPLIER|BDL删除供应商" :loading="deleteLoading">{{ language('LK_SHANCHU','删除') }}</iButton>
        </div>
      </template>
      <tableList :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                @openPage="openPage"
                @log="log" ref="table"
                @handleSelect="handleSelect"
                @handleSelectAll="handleSelectAll"
                v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TABLE|BDL列表"
      ></tableList>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount"></iPagination>
      <logDialog :visible.sync="logVisible"/>
      <bdlDialog :rfqId="rfqId" :visible.sync="bdlDialogVisible" @confirm="getTableList" />
    </iCard>
    <supplier-score :todo="false" class="margin-top20" />
  </div>
</template>

<script>
import {iCard, iButton, iInput, icon, iPagination, iMessage, iMessageBox } from "rise"
import tableList from "./tableList"
import {tableTitle} from "./data"
import {updateRfq, rfqBdlPage as getBdlList, deleteRfqBdl} from "@/api/partsrfq/editordetail";
import {updateRfqBdl} from '@/api/partsrfq/home/index'
import logDialog from '@/views/partsign/editordetail/components/logDialog'
import {pageMixins} from '@/utils/pageMixins'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import { cloneDeep } from 'lodash'
import bdlDialog from "../bdlDialog"
import supplierScore from "../supplierScore/components/supplierScore.vue";

export default {
  mixins:[pageMixins, rfqCommonFunMixins],
  components: {
    iCard,
    tableList,
    iButton,
    iInput,
    icon,
    logDialog,
    iPagination,
    bdlDialog,
    supplierScore
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    disabled() {
      return this.getDisabled()
    }
  },
  data() {
    return {
      tableTitle: cloneDeep(tableTitle),
      tableData: [],
      tableDataCache: [],
      tableLoading: false,
      searchKey: "",//搜索关键词	
      logVisible: false,
      rfqId:'',
      // selectTableData: [],
      selectTableDataCache: [],
      // editSelectTableDataCache: [],
      // noEditSelectTableDataCache: [],
      saveLoading: false,
      deleteLoading: false,
      addCustomStatus: false,
      bdlDialogVisible: false,
      supplierName: ""
    }
  },
  inject: ['getDisabled'],
  created() {
    this.rfqId = this.$route.query.id
    this.getTableList()
  },
  methods: {
    toggle(type) {
      this[type] = !this[type];
    },
    // 删除
    handleDelete() {
      if(!this.selectTableDataCache.length) return iMessage.warn(this.language('LK_NHWXZBDL','您还未选择BDL')) 
      iMessageBox(this.language('deleteSure','您确定要执行删除操作吗？'),this.language('LK_WENXINTISHI','温馨提示')).then(()=>{
        this.deleteLoading = true
      deleteRfqBdl({
        userId: this.userInfo.id,
        ids: this.selectTableDataCache.map(item => item.id),
        rfqId: this.rfqId
      })
      .then(res => {
        if (res.code == 200) {
          this.deleteLoading = false
          this.getTableList()
          this.selectTableDataCache = []
          this.resultMessage(res)
        } else {
          this.deleteLoading = false
          this.resultMessage(res)
        }
      })
      .catch(() => this.deleteLoading = false)
      })
    },
    /**************************
     * 获取bdl列表
     **************************/
    translateParmars() {
      return {
        supplierName: this.supplierName || undefined,
        rfqId:this.rfqId,
        size:this.page.pageSize,
        current:this.page.currPage,
        findType:11
      }
    },
    getTableList() {
      this.tableLoading = true;
      getBdlList(this.translateParmars()).then((res) => {
        // if(res.data && res.data.rfqBdlVO && res.data.rfqBdlVO.rfqBdlVOList){
        if(res.code == 200){
          // this.tableData = res.data.rfqBdlVO.rfqBdlVOList || []
          this.tableData = Array.isArray(res.data) ? res.data : []
          // this.tableDataCache = this.tableData
          this.page.totalCount = res.total || 0

          if (!this.$refs.table.addCustomShow && this.tableData[0] && this.tableData[0].userDefinedGradeField) {
            this.$refs.table.addCustom()
            this.$refs.table.addTitle = this.tableData[0].userDefinedGradeField
          }
        }

        this.tableData.forEach(item => {
          if (this.selectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
        })
        this.tableLoading = false;
      }).catch(err=>{
        this.tableLoading = false;
      });
    },
    query() {
      this.page.currPage = 1
      this.getTableList()
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableDataCache = this.selectTableDataCache.concat(
        val.filter(item => !this.selectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      )
    },
    handleSelect(selection, row) {
      if (!selection.includes(row)) { // 从cache中删除
        this.selectTableDataCache = this.selectTableDataCache.filter(item => item.supplierId !== row.supplierId)
      }
    },
    handleSelectAll(selection) {
      if (!selection.length) { // 当前页取消选中操作
        // 用于删除操作的cache列表
        this.selectTableDataCache = this.selectTableDataCache.filter(cacheItem => !this.tableData.some(item => item.supplierId === cacheItem.supplierId))
      }
    },
    // 跳转
    openPage(row) {
      window.open(`${ process.env.VUE_APP_PORTAL_URL }supplier/supplierList/details?subSupplierId=${row.supplierSubId}&supplierType=${row.supplierType}&nameZh=${row.supplierNameZh}&nameEn=${row.supplierNameEn}`, '_blank')
    },
    log() {
      // this.logVisible = true
      window.open(`/#/log?recordId=${ this.partDetails.tpPartID }`, '_blank')
    },
    handleSaveCustom() {
      this.saveLoading = true
      updateRfqBdl({
          rfqId: this.rfqId,
          updateType: "1",
          userId: this.userInfo.id,
          bdlInfoList: this.tableData.map(item => ({
            ...item,
            userDefinedGradeField: this.$refs.table.addTitle || undefined,
            userDefinedGrader: item.userDefinedGrader
          }))
        })
        .then(res => {
          if (res.code == 200) {
            this.getTableList()
            this.selectTableDataCache = []
            this.addCustomStatus = false
            this.resultMessage(res)
          } else {
            this.resultMessage(res)
          }

          this.saveLoading = false
        })
        .catch(() => this.saveLoading = false)
    },
    handleBack() {
      this.addCustomStatus = false
      this.$refs.table.addCustom()
    },
    // 添加自定义项目
    addCustom(){
      this.addCustomStatus = true
      if (!this.$refs.table.addTitle) {
        this.$refs.table.addCustom()
      }
    },
    handleAdd() {
      this.bdlDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.BDL{
  ::v-deep .card-header {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 20px 0;
    .card-title {
      display: inline-flex;
      align-items: center;
      .title{
        font-size: 18px;
        font-weight: bold;
      }
    }
    .tishi {
      display: inline-flex;
      align-items: center;
    }
    .tishi-icon {
      font-size: 18px;
      margin: 0 15px;
    }

    .danger {
      color: #f5222d;
    }
    .warning {
      color: #fa8c16;
    }
    .success {
      color: #389e0d;
    }
    .button-box {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-icon {
      font-size: 18px;
      margin: 0 20px;
    }
    .rotate {
      transform: rotate(180deg);
    }
  }
}
  .input {
    display: inline-flex;
    width: 250px;
    margin-left: 20px;
    ::v-deep .el-input{
      font-size: 14px !important;
    }
    
  ::v-deep .el-input__suffix {
    .el-input__suffix-inner {
      height: 100% !important;
    }

    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;
      cursor: pointer;

      .icon {
        height: 100% !important;
      }
    }
  }
  }
.header {
  .input {
    display: inline-flex;
    width: 250px;
    margin-left: 20px;
  }

}

</style>
