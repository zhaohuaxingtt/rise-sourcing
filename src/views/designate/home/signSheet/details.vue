<!--
 * @Author: Haojiang
 * @Date: 2021-06-24 17:53:08
 * @LastEditTime: 2023-04-26 14:13:57
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: m签字单新增、详情
 * @FilePath: \front-web\src\views\designate\home\signSheet\details.vue
-->
<template>
  <div v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSPAGE|签字单详情">
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
       <span class="font18 font-weight">{{language('XIANGQINGLIEBIAO', '详情列表')}}</span>
        <div class="floatright btn-right">
          <template>
            <iButton v-if="isDraft" @click="chooseSignsheet()">
              {{ language("XUANZE", '选择') }}
            </iButton>
            <iButton v-if="isDraft || isRefuse" @click="handleRemove"
                      v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSREMOVE|签字单详情移除">
              {{ language("YICHU",'移除') }}
            </iButton>
          </template>  
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>   
      </div>
      <!-- 表格 -->
      <tablelist
                  permissionKey="DESIGNATE_HOME_SIGNSHEET_DETAILS"
                  class="margin-top20"
                 :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAIL_CHOSENTABLE|签字单详情已选择表格"
                 @handleSelectionChange="handleSelectionChange"
                  ref="tableList"
                  :lang="true"
                 >
        <!-- 定点单号 -->
        <template #nominateName="scope">
          <span class="nominateId">
            <a href="javascript:;"
              @click="viewNominationDetail(scope.row)">
              {{scope.row.nominateName}}
            </a>
          </span>
        </template>
        <!-- 定点类型 -->
        <template #nominateProcessType="scope">
          <span>{{(scope.row.nominateProcessType && scope.row.nominateProcessType.desc) || ''}}</span>
        </template>
        <!-- 定点类型 -->
        <template #applicationStatus="scope">
          <span>{{(scope.row.applicationStatus && scope.row.applicationStatus.desc) || ''}}</span>
        </template>

        <!-- re冻结日期 -->
        <template #rsFreezeDate="scope">
          <span>{{scope.row.rsFreezeDate | dateFilter("YYYY-MM-DD")}}</span>
        </template>

        <!-- 定点日期 -->
        <template #nominateDate="scope">
          <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
        </template>

        <template #freezeDate="scope">
          <span>{{scope.row.freezeDate | dateFilter("YYYY-MM-DD")}}</span>
        </template>
        <template #selStatus="scope">
          <div>
            <a href="javascript:;"
               class="selStatus-link"
               @click="confirmSelSheet(false)"
               v-if="scope.row.selStatus === '已确认'">{{scope.row.selStatus}}</a>
            <a href="javascript:;"
               class="selStatus-link"
               @click="confirmSelSheet(true)"
               v-else-if="scope.row.selStatus === '未确认'">{{scope.row.selStatus}}</a>
            <span v-else>{{scope.row.selStatus}}</span>
          </div>
        </template>

      </tablelist>
    </iCard>
    <addSignsheet :dialogVisible='dialogVisible'
                  @changeVisible='dialogVisible = false'
                  @choose="handleChoose"
                  v-if="dialogVisible"
                  ></addSignsheet>
  </div>
</template>
<script>
import { detailsTableTitle as tableTitle, } from './components/data'
import filters from "@/utils/filters"
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import addSignsheet from "./components/addSignsheet";
import {  getNomiSelectedPage } from '@/api/designate/nomination/signsheet'
import { removeSignApp } from '@/api/designate/nomination/mApprove'
import buttonTableSetting from '@/components/buttonTableSetting'
import { iCard, iButton, iMessage } from "rise";

export default {
  mixins: [filters,tableSortMixins],
  data () {
    return {
      mode: this.$route.query.mode || '',
      tableTitle,
      tableListData: [],
      selectTableData: [],
      tableLoading: false,
      designateSignRefresh: false,
      dialogVisible: false,
      templateTable:[],
    }
  },
  watch: {
    tableListData(val){
      this.$emit('setData','part',val.length)
    }
  },
  props: {
    isRefuse: {
      type:Boolean,
      default:false
    },
    isDraft: {
      type:Boolean,
      default:false
    },
  },
  components: {
    iCard,
    iButton,
    tablelist,
    addSignsheet,
    buttonTableSetting
  },
  created () {
    this.getChooseData()
  },
  methods: {
    // 添加数据后回调
    handleChoose (data) {
      if(this.tableListData.length == '0') {
        this.tableListData = data
      } else {
        let temTable = this.tableListData
        let addData = data
        let ids = temTable.map(item => item.id)
        let newTamDAta = addData.filter(value => {
          let res = !(ids.indexOf(value.id) > -1) 
            return res
        })
        this.tableListData = this.tableListData.concat(newTamDAta)
      }
      this.$emit('save','partDesignateOrders')
    },
    // 多选
    handleSelectionChange (data) {
      this.selectTableData = data
    },
    // 获取已经选择的数据
    getChooseData() {
      this.tableLoading = true
      getNomiSelectedPage({
        signId: Number(this.$route.query.id) || ''
      }).then(res => {
        this.tableLoading = false
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableLoading = false
      })
    },
    // 移除项目
    async handleRemove () {
      if (!this.selectTableData.length) return iMessage.error(this.language('QINGXAUNZEDINGDIANSHENQINGDAN', '请选择定点申请单号'))
      await this.$confirm(this.language('LK_REMOVESURE', '您确定要执行移除操作吗？'))
      let params = {
        nominateIdArr: this.selectTableData.map(item=>item.id),
        signId: Number(this.$route.query.id)
      }
      removeSignApp(params).then(res=>{
        if(res?.code==200){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getChooseData()
          this.$emit('getSignSheetDetails')
          this.$emit("deleteData", this.selectTableData)
        }else{
          iMessage.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'))
        }
      })
      // this.tableListData = this.tableListData.filter(item => !this.selectTableData.includes(item))
      // 清空之前先发出事件
      // this.selectTableData = []
    },
    // 查看详情
    viewNominationDetail (row) {
      // 缓存nominateProcessType
      // this.$store.dispatch('setNominationType', row.nominateProcessType)
      // 禁用nominateProcessType编辑
      this.$store.dispatch('setNominationTypeDisable', true)
      this.$nextTick(() => {
        const routeData = this.$router.resolve({
          path: '/designate/decisiondata/rs',
          query: {
            desinateId: row.id,
            designateType: (row.nominateProcessType && row.nominateProcessType.code) || row.nominateProcessType || '',
            partProjType: (row.partProjType && row.partProjType.code) || row.partProjType || '',
            businessKey: (row.partProjType && row.partProjType.code) || row.partProjType || '',
            applicationStatus: (row.applicationStatus && row.applicationStatus.code) || row.applicationStatus || '',
          }
        })
        window.open(routeData.href, '_blank')
      })
    },
    chooseSignsheet () {
      this.dialogVisible = true
    },
  }

}
</script>
<style lang="scss" scoped>
.btn-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.signsheet-filter {
  .el-form-item {
    ::v-deep .el-form-item__label {
      padding-right: 30px;
    }
  }
  .desc {
    width: 100%;
    ::v-deep .el-form-item__content {
      width: 90%;
    }
  }
}
</style>