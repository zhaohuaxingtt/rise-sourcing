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
        <iButton @click="saveBdl" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_BDLSAVEBDL">保存</iButton>
        <iButton v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_DELETESUPPLIER">删除供应商</iButton>
        <iButton @click="addCustom" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_ADDCUSTOM">添加自定义评分项</iButton>
      </div>
    </div>
    <tableList :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading"
               @handleSelectionChange="handleSelectionChange"
               @openPage="openPage"
               @log="log" ref="table"></tableList>
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
      rfqId:''
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
    saveBdl(){
		
	},
    /**************************
     * 获取bdl列表
     **************************/
    translateParmars(){
      return {
        rfqId:this.rfqId,
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
        this.tableLoading = false;
      }).catch(err=>{
        this.tableLoading = false;
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
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
