<!--
* @author:shujie
* @Date: 2021-3-5 10:56:32
* @LastEditors: shujie
* @Description: BDL列表
 -->
<template>
  <iCard>
    <div class="header flex-between-center">
      <div class="input">
        <iInput placeholder="请输入查询供应商名称,厂商..." suffix-icon="iconfont iconshaixuankuangsousuo" v-model="searchKey"></iInput>
      </div>
      <div>
        <iButton>保存</iButton>
        <iButton>删除供应商</iButton>
        <iButton @click="addCustom">添加自定义评分项</iButton>
        <iButton @click="log">日志</iButton>
      </div>
    </div>
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading"
               @handleSelectionChange="handleSelectionChange"
               @openPage="openPage"
               @log="log" 
			   ref="table"></tableList>
    <logDialog :visible.sync="logVisible"/>
  </iCard>
</template>

<script>
import {iCard, iButton, iInput} from "@/components"
import tableList from "./tableList"
import {tableTitle} from "./data"
import {getTabelData} from "@/api/partsign/home";
import logDialog from '@/views/partsign/editordetail/components/logDialog'

export default {
  components: {
    iCard,
    tableList,
    iButton,
    iInput,
    logDialog
  },
  data() {
    return {
      tableTitle,
      tableData: [],
      tableLoading: false,
      searchKey: "",//搜索关键词	
      logVisible: false,
    }
  },
  created() {
    this.getTableList()
  },
  methods: {

    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getTabelData().then((res) => {
        this.tableListData = res.data;
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
      this.logVisible = true
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
	::v-deep .iconshaixuankuangsousuo{
		font-size: 12px;
	}
	
  }
}

</style>
