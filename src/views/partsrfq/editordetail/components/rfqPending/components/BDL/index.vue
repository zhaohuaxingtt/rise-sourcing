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
        <iInput placeholder="请输入查询供应商名称,厂商..." suffix-icon="iconfont iconshaixuankuangsousuo" v-model="searchKey"></iInput>
      </div>
      <div>
        <iButton @click="saveBdl" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_BDLSAVEBDL">{{ $t('LK_BAOCUN') }}</iButton>
        <iButton v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_DELETESUPPLIER">{{ $t('LK_SHANCHUGONGYINGSHANG') }}</iButton>
        <iButton @click="addCustom" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_ADDCUSTOM">{{ $t('LK_TIANJIAZIDINGYIPINGFENXIANG') }}</iButton>
      </div>
    </div>
    <tableList :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading"
               @handleSelectionChange="handleSelectionChange"
               @openPage="openPage"
               @log="log" ref="table"
               @handleSelect="handleSelect"
               @handleSelectAll="handleSelectAll"></tableList>
    <iPagination @size-change="handleSizeChange($event, getTableList)"
			@current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
			:page-size="page.pageSize" :layout="page.layout" :total="page.totalCount"></iPagination>
    <logDialog :visible.sync="logVisible"/>
  </iCard>
</template>

<script>
import {iCard, iButton, iInput,iPagination} from "@/components"
import tableList from "./tableList"
import {tableTitle} from "./data"
import {getBdlList} from "@/api/partsrfq/editordetail";
import logDialog from '@/views/partsign/editordetail/components/logDialog'
import {pageMixins} from '@/utils/pageMixins'
export default {
  mixins:[pageMixins],
  components: {
    iCard,
    tableList,
    iButton,
    iInput,
    logDialog,
    iPagination
  },
  data() {
    return {
      tableTitle,
      tableData: [],
      tableLoading: false,
      searchKey: "",//搜索关键词	
      logVisible: false,
      rfqId:'',
      selectTableData: [],
      editSelectTableDataCache: [],
      noEditSelectTableDataCache: []
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
    saveBdl() {
      this.multipleSelectionCache = []
    },
    /**************************
     * 获取bdl列表
     **************************/
    translateParmars(){
      return {
        rfqId:'249356903498256384',
        // this.rfqId || 
        size:this.page.pageSize,
        current:this.page.currPage,
        findType:11
      }
    },
    getTableList() {
      this.tableLoading = true;
      getBdlList(this.translateParmars()).then((res) => {
        if(res.data && res.data.rfqBdlVO && res.data.rfqBdlVO.rfqBdlVOList){
          this.tableData = res.data.rfqBdlVO.rfqBdlVOList
        }
        this.tableData = [{supplierId: 1}, {supplierId: 2}, {supplierId: 3}, {supplierId: 4}, {supplierId: 5}, {supplierId: 6}]

        this.editSelectTableDataCache = this.editSelectTableDataCache.filter(
          cacheItem => !this.tableData.some(item => {
            return item.isEdit ? item.supplierId === cacheItem.supplierId : undefined
          })
        )

        this.noEditSelectTableDataCache = this.noEditSelectTableDataCachel.filter(
          cacheItem => !this.tableData.some(item => {
            return !item.isEdit ? item.supplierId === cacheItem.supplierId : undefined
          })
        )

        // this.tableData.forEach(item => {
        //   if (item.isEdit) {
        //     if (this.editSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
        //   } else {
        //     if (this.noEditSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.multipleTable.toggleRowSelection(item, true))
        //   }
        // })
        
        // toggleRowSelection
        
        this.tableLoading = false;
      }).catch(err=>{
        this.tableLoading = false;
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      // this.selectTableData = val
      const editSelectTableData = [] // 没有保存过的bdl
      const noEditSelectTableData = [] // 保存过的bdl
      for (let i = 0, item; (item = val[i++]); ) {
        item.isEdit ?
          editSelectTableData.push(item) :
          noEditSelectTableData.push(item)
      }

      // 用于保存操作的cache列表
      this.editSelectTableDataCache = this.editSelectTableDataCache.concat(
        editSelectTableData.filter(item => !this.editSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      )

      // 用于删除操作的cache列表
      this.noEditSelectTableDataCache = this.noEditSelectTableDataCache.concat(
        noEditSelectTableData.filter(item => !this.noEditSelectTableDataCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      )
    },
    handleSelect(selection, row) {
      if (!selection.includes(row)) { // 从cache中删除
        row.isEdit ?
          this.editSelectTableDataCache = this.editSelectTableDataCache.filter(item => item.supplierId !== row.supplierId) :
          this.noEditSelectTableDataCache = this.noEditSelectTableDataCache.filter(item => item.supplierId !== row.supplierId)
      }
    },
    handleSelectAll(selection) {
      if (selection.length !== this.tableData.length) { // 当前页取消选中操作
        const editNoSelectTableData = [] // 没有保存过的bdl
        const noEditNoSelectTableData = [] // 保存过的bdl
        for (let i = 0, item; (item = this.tableData[i++]); ) {
          item.isEdit ?
            editNoSelectTableData.push(item) :
            noEditNoSelectTableData.push(item)
        }

        // 用于保存操作的cache列表
        this.editSelectTableDataCache = this.editSelectTableDataCache.filter(cacheItem => !editNoSelectTableData.some(item => item.supplierId === cacheItem.supplierId))

        // 用于删除操作的cache列表
        this.noEditSelectTableDataCache = this.noEditSelectTableDataCache.filter(cacheItem => !noEditNoSelectTableData.some(item => item.supplierId === cacheItem.supplierId))
      }
    },
    // 跳转
    openPage() {

    },
    log() {
      // this.logVisible = true
      window.open(`/#/log?recordId=${ this.partDetails.tpPartID }`, '_blank')
    },
	// 添加自定义项目
	addCustom(){
		this.$refs.table.addCustom()
	}
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;

  .input {
    width: 250px;
    ::v-deep .iconshaixuankuangsousuo {
      font-size: 12px;
    }
	
  }
}

</style>
