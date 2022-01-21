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
    <div class="topCar">
      <div class="topCar-left" v-if="isGs == true">
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
      <div class="topCar-left" v-if="isGs == false">
          <span class="xmtitle">{{language('CHEXINGXIANGMU','车型项目')}}{{params.carTypeProjectZh}}</span>
      </div>
      <div class="topCar-right">
        <iButton @click="changeVisible">{{language('QUXIAO','取消')}}</iButton>
        <iButton :loading="saveLoading" @click="addTableCar">{{language('YINGYONG','应用')}}</iButton>
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
        <template #cartypeLevelRate="scope">
          <span>{{ percent(scope.row.cartypeLevelRate) }}</span>
        </template>
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
        <template #cartypeLevelPercentRate="scope">
          <span>{{ percent(scope.row.cartypeLevelPercentRate) }}</span>
        </template>
      </tableList>
      <iPagination
        class="bottom-table"
        v-if="isGs == false"
        v-update
        @size-change="handleSizeChange($event, getNotGsTableList)"
        @current-change="handleCurrentChange($event, getNotGsTableList)"
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
import { savearDosage } from "@/api/partsprocure/editordetail";
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
      if (status) this.getPartType()
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
      fscarTableTitle:[...fscarTitle],
      saveLoading: false,
      carIds:[],
      cartypeIds:[]
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
            this.carIds = this.carTypeOptions.map(item=>item.id)
            this.carTypeModel = this.carIds
            this.changeTable(this.carIds)
          }
        })
      } else {
        this.getNotGsTableList()
      }
    },
    changeTable(data) {
      data.length == 0 ? this.cartypeIds = this.carIds :this.cartypeIds = data
      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      let data ={
        "cartypeIds":this.cartypeIds,
        "current": this.page.currPage,
        "size": this.page.pageSize
      }
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
    //非GS的table数据获取
    getNotGsTableList() {
          if (!this.params.carTypeProjectId) return iMessage.warn(this.language("DANGQIANSHUJUMEIYOUCHEXINGXIANGMUID", "当前数据没有车型项目ID，请选择车型项目后保存重试"))
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
              this.$set(val,'engineType',val.engineVo?.remark)
              this.$set(val,'gearboxName',val.gearboxVo?.remark)
              this.$set(val,'batteryCapacity',val.batteryVo?.remark)
            })
            this.fscarTableData = res.data || []
            this.page.totalCount = res.total || 0
          } else {
            iMessage.error(res.desZh)
        }
        })
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    addTableCar() {
      if (!this.selectData.length) return iMessage.warn(this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据"))

      let params = null
      if(this.isGs) {
        params = this.selectData.map(item => ({
          purchasingRequirementObjectId: this.params.purchasingRequirementObjectId,
          cartypeLevel: item.cartypeLevel,
          engineType: item.engineType,
          gearType: item.gearboxName,
          otherInfo: item.otherConf,
          cartype: item.cartypeId,
          cartypeConfigId: item.originId,
          partNum: this.params.partNum,
          partNameCn: this.params.partNameZh,
          partNameDe: this.params.partNameDe,
          cartypeLevelRate: item.cartypeLevelRate,
          cartypeCategory: item.cartypeCode
        }))
      } else {
        params = this.selectData.map(item => ({
          purchasingRequirementObjectId: this.params.purchasingRequirementObjectId,
          cartypeLevel: item.cartypeLevel,
          engineType: item.engineVo?.remark,
          gearType: item.gearboxVo?.remark,
          otherInfo: item.otherConf,
          cartype: item.carProjectId,
          cartypeConfigId: item.originId,
          partNum: this.params.partNum,
          partNameCn: this.params.partNameZh,
          partNameDe: this.params.partNameDe,
          cartypeLevelRate: item.cartypeLevelRate,
          cartypeCategory: item.cartypeProCode
        }))
      }

      this.saveLoading = true
      savearDosage(params)
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.$emit("afterSave")
          this.$emit('changeVisible', false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.saveLoading = false)

      // this.$emit('getSelectData', this.selectData)
    },
    // 获取车型
    // getCartypeDict() {
    //   getCartypeDict().then(res => {
    //     this.carTypeOptions = res.data
    //   }).catch(err=>{
    //     console.log(err)  
    //   })
    // },
    percent(val) {
      return math.multiply(math.bignumber(val), 100).toString() + '%'
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog{
    .topCar{
    display: flex;
    justify-content: space-between;
    margin:0 0 20px 0 ;
    .topCar-left{
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