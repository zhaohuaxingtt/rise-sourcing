<!--
* @author:shujie
* @Date: 2021-3-5 10:56:32
 * @LastEditors: Please set LastEditors
* @Description: BDL列表
 -->
<template>
  <iCard>
    <div class="header flex-between-center">
      <div class="input">
        <!-- <iInput :placeholder="language('LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG','请输入查询供应商名称')" suffix-icon="iconfont iconshaixuankuangsousuo" v-model="searchKey" @input="handleInputBySearchKey"></iInput> -->
        <iInput :placeholder="language('LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG','请输入查询供应商名称')" v-model="supplierName">
          <div class="inputSearchIcon" slot="suffix">
            <icon symbol name="iconshaixuankuangsousuo" @click.native="query" />
          </div>
        </iInput>
      </div>
      <div v-if="!disabled">
        <div v-if="!addCustomStatus">
          <iButton v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_BDLSAVEBDL" @click="handleAdd">{{ language("TIANJIA", "添加") }}</iButton>
          <!-- <iButton v-if="editSelectTableDataCache.length" @click="handleSave" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_BDLSAVEBDL" :loading="saveLoading">{{ language('LK_QUEREN','确认') }}</iButton> -->
          <iButton v-if="selectTableDataCache.length" @click="handleDelete" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_DELETESUPPLIER" :loading="deleteLoading">{{ language('LK_SHANCHUGONGYINGSHANG','删除供应商') }}</iButton>
          <iButton @click="addCustom" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_ADDCUSTOM">{{ language('LK_TIANJIAZIDINGYIPINGFENXIANG','添加自定义评分项') }}</iButton>
        </div>
        <div v-else>
          <iButton @click="handleSaveCustom" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_SAVECUSTOM">{{ language('LK_BAOCUN','保存') }}</iButton>
          <iButton @click="handleBack" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_BACKCUSTOM">{{ language('LK_FANHUI','返回') }}</iButton>
        </div>
      </div>
    </div>
    <tableList :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading"
               @handleSelectionChange="handleSelectionChange"
               @openPage="openPage"
               @log="log" ref="table"
               @handleSelect="handleSelect"
               @handleSelectAll="handleSelectAll"></tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)"
			@current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
			:page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount"></iPagination>
    <logDialog :visible.sync="logVisible"/>
    <bdlDialog :rfqId="rfqId" :visible.sync="bdlDialogVisible" @confirm="getTableList" />
  </iCard>
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
    bdlDialog
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
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
  computed: {
    disabled() {
      return this.getDisabled()
    }
  },
  created() {
    this.rfqId = this.$route.query.id
    this.getTableList()
  },
  methods: {
    /**************************
     * 获取bdl列表
     * 需求：
     **************************/
    // 保存
    // handleSave() {
    //   if(this.editSelectTableDataCache.length == 0) return iMessage.warn(this.language('LK_NHWXZBDL','您还未选择BDL')) 
    //   this.saveLoading = true
    //   updateRfq({
    //     updateRfqBdlPackage: {
    //       rfqId: this.rfqId,
    //       updateType: "2",
    //       userId: this.userInfo.id,
    //       bdlInfoList: this.editSelectTableDataCache.map(item => ({
    //         ...item,
    //         userDefinedGradeField: this.$refs.table.addTitle || undefined,
    //         userDefinedGrader: item.userDefinedGrader
    //       }))
    //     }
    //   })
    //     .then(res => {
    //       if (res.code == 200) {
    //         this.getTableList()
    //         this.editSelectTableDataCache = []
    //         this.resultMessage(res)
    //       } else {
    //         this.resultMessage(res)
    //       }

    //       this.saveLoading = false
    //     })
    //     .catch(() => this.saveLoading = false)
    // },
    // 删除
    handleDelete() {
      if(!this.selectTableDataCache.length) return iMessage.warn(this.language('LK_NHWXZBDL','您还未选择BDL')) 
      iMessageBox(this.language('deleteSure','您确定要执行删除操作吗？'),this.language('LK_WENXINTISHI','温馨提示')).then(()=>{
        this.deleteLoading = true
      //   updateRfq({
      //     deleteBdlPackage: {
      //       userId: this.userInfo.id,
      //       ids: this.noEditSelectTableDataCache.map(item => item.id)
      //     }
      //   })
      //     .then(res => {
      //       if (res.code == 200) {
      //         this.getTableList()
      //         this.noEditSelectTableDataCache = []
      //         this.resultMessage(res)
      //       } else {
      //         this.resultMessage(res)
      //       }

      //       this.deleteLoading = false
      //     })
      //     .catch(() => this.deleteLoading = false)
      // })
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

        // this.tableData.forEach(item => {
        //   if (item.isEdit) {
        //     if (this.editSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
        //   } else {
        //     if (this.noEditSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
        //   }
        // })
        
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
      // this.selectTableData = val
      // const editSelectTableData = [] // 没有保存过的bdl
      // const noEditSelectTableData = [] // 保存过的bdl
      // for (let i = 0, item; (item = val[i++]); ) {
      //   item.isEdit ?
      //     editSelectTableData.push(item) :
      //     noEditSelectTableData.push(item)
      // }

      // // 用于保存操作的cache列表
      // this.editSelectTableDataCache = this.editSelectTableDataCache.concat(
      //   editSelectTableData.filter(item => !this.editSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      // )

      // // 用于删除操作的cache列表
      // this.noEditSelectTableDataCache = this.noEditSelectTableDataCache.concat(
      //   noEditSelectTableData.filter(item => !this.noEditSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      // )
      this.selectTableDataCache = this.selectTableDataCache.concat(
        val.filter(item => !this.selectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      )
    },
    handleSelect(selection, row) {
    //   if (!selection.includes(row)) { // 从cache中删除
    //     row.isEdit ?
    //       this.editSelectTableDataCache = this.editSelectTableDataCache.filter(item => item.supplierId !== row.supplierId) :
    //       this.noEditSelectTableDataCache = this.noEditSelectTableDataCache.filter(item => item.supplierId !== row.supplierId)
    //   }
      if (!selection.includes(row)) { // 从cache中删除
        this.selectTableDataCache = this.selectTableDataCache.filter(item => item.supplierId !== row.supplierId)
      }
    },
    handleSelectAll(selection) {
    //   if (!selection.length) { // 当前页取消选中操作
    //     const editNoSelectTableData = [] // 没有保存过的bdl
    //     const noEditNoSelectTableData = [] // 保存过的bdl
    //     for (let i = 0, item; (item = this.tableData[i++]); ) {
    //       item.isEdit ?
    //         editNoSelectTableData.push(item) :
    //         noEditNoSelectTableData.push(item)
    //     }

    //     // 用于保存操作的cache列表
    //     this.editSelectTableDataCache = this.editSelectTableDataCache.filter(cacheItem => !editNoSelectTableData.some(item => item.supplierId === cacheItem.supplierId))

    //     // 用于删除操作的cache列表
    //     this.noEditSelectTableDataCache = this.noEditSelectTableDataCache.filter(cacheItem => !noEditNoSelectTableData.some(item => item.supplierId === cacheItem.supplierId))
    //   }
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
      // if(this.editSelectTableDataCache.length == 0) return iMessage.error(this.$t('LK_NHWXZBDL')) 
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

    // handleInputBySearchKey(value) {
    //   if (value) {
    //     this.tableData = this.tableDataCache.filter(item => !value || (item.supplierNameZh && item.supplierNameZh.toLowerCase().includes(value.trim().toLowerCase())))
    //   } else {
    //     this.tableData = this.tableDataCache
    //   }

    //   this.tableData.forEach(item => {
    //     if (item.isEdit) {
    //       if (this.editSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
    //     } else {
    //       if (this.noEditSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
    //     }
    //   })
    // },
    handleAdd() {
      this.bdlDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;

  .input {
    width: 250px;
    // ::v-deep .iconshaixuankuangsousuo {
    //   font-size: 12px;
    // }
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

</style>
