<!--
 * @Description: CF车型配置
 * @Author: tyra liu
 * @Date: 2021-11-16 16:54:18
 * @LastEditTime: 2021-11-23 13:52:48
 * @LastEditors:  
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="changeVisible"
    width="80%"
  >
    <div class="top">
      <div class="top-left">
        <span class="title">{{language('CHEXING','车型')}}</span>
        <iSelect v-model="carTypeModel" @change="changeTable">
          <el-option
            v-for="(item,index) in carTypeOptions"
            :key="index"
            :label="item.carTypeName"
            :value="item.carTypeId"
          >  
          </el-option>
        </iSelect>
      </div>
      <div class="top-right">
        <iButton @click="changeVisible">{{language('QUXIAO','取消')}}</iButton>
        <iButton @click="addTableCar">{{language('YINGYONG','应用')}}</iButton>
      </div>
    </div>
    <div class="margin-bottom20">
      <tableList
        lang
        :tableTitle="carTableTitle"
        :tableData="carTableData"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableListFn)"
        @current-change="handleCurrentChange($event, getTableListFn)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>
<script>
import {iDialog, iButton, iSelect, iMessage, iPagination} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList";
import {carTitle} from "../data"
import {searchCarTypeConfig,searchCarType} from "@/api/partsprocure/home"
import { pageMixins } from "@/utils/pageMixins";
export default {
  components: { iDialog, iButton, tableList, iSelect, iPagination},
  props: {
    dialogVisible: {
      type:Boolean,
      default:false
    }
  },
  mixins: [pageMixins],
  data() {
    return {
      carTableTitle:[...carTitle],
      carTableData:[],
      carTypeOptions:[],
      carTypeModel:'',
      tableLoading:false,
      selectData:[]
    }
  },
  created() {
    this.getPartType()
  },
  methods: {
    changeVisible() {
      this.$emit('changeVisible', false)
    },
    //通过零件采购项目查询车型
    getPartType() {
      searchCarType(this.$route.query.projectId).then(res => {
        if(res.code == '200') {
          this.carTypeOptions = res.data
        }
      })
    },
    changeTable(data) {
      this.getTableList(data)
    },
    getTableList(data) {
      this.tableLoading = true
      searchCarTypeConfig(data).then(res=>{
        if(res.code == '200' ) {
          this.tableLoading = false
          this.carTableData = res.data || []
        } else {
          iMessage.error(res.desZh)
        }
      }).catch(()=>{
        this.tableLoading = false
      })
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    addTableCar() {
      this.$emit('getSelectData', this.selectData)
      this.$emit('changeVisible', false)
    }
    // 获取车型
    // getCartypeDict() {
    //   getCartypeDict().then(res => {
    //     this.carTypeOptions = res.data
    //   }).catch(err=>{
    //     console.log(err)  
    //   })
    // },
  }
}
</script>

<style scoped lang="scss">
  .top{
    display: flex;
    justify-content: space-between;
    margin:0 0 20px 0 ;
    .top-left{
      display: flex;
      .title{
          font-size: 18px;
          color: #131523;
          font-weight: bold;
          width: 70px;
        }
    }
  }
</style>