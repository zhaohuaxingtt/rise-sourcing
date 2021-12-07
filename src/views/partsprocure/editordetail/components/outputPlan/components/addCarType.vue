<!--
 * @Description: CF车型配置
 * @Author: tyra liu
 * @Date: 2021-11-16 16:54:18
 * @LastEditTime: 2021-12-02 17:37:13
 * @LastEditors:  
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="changeVisible"
    width="80%"
    class="dialog" 
  >
    <div class="top">
      <div class="top-left" v-if="isGs == true">
          <span class="title">{{language('CHEXING','车型')}}</span>
          <iSelect class="carselect" v-model="carTypeModel" @change="changeTable" multiple  collapse-tags>
            <el-option
              v-for="(item,index) in carTypeOptions"
              :key="index"
              :label="item.name"
              :value="item.id"
            >  
            </el-option>
          </iSelect>
      </div>
      <div class="top-left" v-if="isGs == false">
          <span class="xmtitle">{{language('CHEXINGXIANGMU','车型项目')}}{{params.carTypeProjectZh}}</span>

      </div>
      <div class="top-right">
        <iButton @click="changeVisible">{{language('QUXIAO','取消')}}</iButton>
        <iButton @click="addTableCar">{{language('YINGYONG','应用')}}</iButton>
      </div>
    </div>
    <div >
      <tableList
       v-if="isGs == true"
        lang
        :tableTitle="carTableTitle"
        :tableData="carTableData"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      </tableList>
      <iPagination
        v-if="isGs == true"
        class="bottom-table"
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      <tableList
        v-if="isGs == false"
        
        lang
        :tableTitle="fscarTableTitle"
        :tableData="fscarTableData"
        :tableLoading="fstableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      </tableList>
      <iPagination
        class="bottom-table"
        v-if="isGs == false"
        v-update
        @size-change="handleSizeChange($event, searchCarTypeConfig)"
        @current-change="handleCurrentChange($event, searchCarTypeConfig)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      <div class="placeholder"></div>
    </div>
  </iDialog>
</template>
<script>
import {iDialog, iButton, iSelect, iMessage, iPagination} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList";
import {carTitle,fscarTitle} from "../data"
import {searchCarTypeConfig,searchCarType,searchCarTypeProConfig} from "@/api/partsprocure/home"
import { pageMixins } from "@/utils/pageMixins";
export default {
  components: { iDialog, iButton, tableList, iSelect, iPagination},
  props: {
    dialogVisible: {
      type:Boolean,
      default:false
    },
    partType:{
      type:String
    },
    params: {
      type: Object,
      require: true,
      default:()=>{}
    },
  },
  mixins: [pageMixins],
  watch: {
    dialogVisible(status) {
      if (!status) this.selectData = []
    }
  },
  data() {
    return {
      carTableTitle:[...carTitle],
      carTableData:[],
      fscarTableData:[],
      carTypeOptions:[],
      carTypeModel:'',
      tableLoading:false,
      selectData:[],
      isGs:true,
      fscarTableTitle:[...fscarTitle]
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
      if(this.params.partProjectType == '1000003' || this.params.partProjectType == '50002001') {
      this.isGs = true
    } else {
      this.isGs = false
    }
      if(this.isGs == true) {
        searchCarType(this.$route.query.projectId).then(res => {
          if(res.code == '200') {
            this.carTypeOptions = res.data
          }
        })
      } else {
        this.tableLoading = true
        let data ={
          "cartypeProId":this.params.carTypeProjectId,
          "current": this.page.currPage,
          "size": this.page.pageSize
        }
        searchCarTypeProConfig(data).then(res => {
          if(res.code == '200') {
            this.tableLoading = false
            res.data.forEach(val=>{
              console.log(val);
              this.$set(val,'engineType',val.engineVo?.engineName)
              this.$set(val,'gearboxName',val.gearboxVo?.gearboxName)
              this.$set(val,'batteryCapacity',val.batteryVo?.capacity)
            })
            this.fscarTableData = res.data || []

            this.page.totalCount = res.total || 0
          } else {
            iMessage.error(res.desZh)
        }
        })
      }
    },
    changeTable(data) {
      this.getTableList(data)
    },
    getTableList(value) {
      this.tableLoading = true
      console.log(value);
      let data ={
        "cartypeIds":value,
        "current": this.page.currPage,
        "size": this.page.pageSize
      }
      console.log(data);
      searchCarTypeConfig(data).then(res=>{
        if(res.code == '200' ) {
          this.tableLoading = false
          this.carTableData = res.data || []
          this.page.totalCount = res.total || 0
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
      if (!this.selectData.length) return iMessage.warn(this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据"))

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
  .dialog{
    .top{
    display: flex;
    justify-content: space-between;
    margin:0 0 20px 0 ;
    .top-left{
      display: flex;
      justify-content: space-between;
      .title{
          font-size: 18px;
          color: #131523;
          font-weight: bold;
          width: 70px;
        }
      .xmtitle{
        font-size: 18px;
        color: #131523;
        font-weight: bold;
        width: 400px;
      }
      .carselect{
        ::v-deep.el-input__inner{
          width: 350px;
        }
      }
    }      
    ::v-deep .i-pagination[data-v-20fc8d19] .pagination {
          margin-bottom: 20px;
      }
    
    }
      .placeholder{
        height: 30px !important;
      }
  }
  
</style>