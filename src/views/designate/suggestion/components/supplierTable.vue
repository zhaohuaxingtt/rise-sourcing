<template>
  <iCard class="supplierTable singleSupplier">
      <div class="margin-bottom20 clearFloat" v-if="!onlyTable">
        <div class="floatright">
          <!-- 创建MTZ申请 -->
          <!-- <iButton @click="handlecreatemtz" :disabled="isMtzDisabled || getSelectedMtzFlag"  v-permission.auto="SOURCING_NOMINATION_SUGGESTION_CREATEMTZAPPLY|创建MTZ申请">
            {{ language("LK_CREATEMTZREQUEST",'创建MTZ申请') }}
           </iButton> -->
          <span v-if="!nominationDisabled && !rsDisabled" class="margin-left10">
            <!-- 批量编辑 -->
            <iButton @click="handleBatchEdit" v-permission.auto="SOURCING_NOMINATION_SUGGESTION_BATCHEDIT|批量编辑">
              {{ language("LK_BATCHEDIT",'批量编辑') }}
            </iButton>
            <!-- 复制 -->
            <iButton
              @click="copyLines"
              v-permission.auto="SOURCING_NOMINATION_SUGGESTION_COPY|复制"
            >
              {{ language("LK_COPY",'复制') }}
            </iButton>
            <!-- 删除 -->
            <iButton
              :disabled="checkCanbeDelete"
              @click="handleBatchDelete"
              v-permission.auto="SOURCING_NOMINATION_SUGGESTION_DELETE|删除"
            >
              {{ language("LK_DELETE",'删除') }}
            </iButton>
            <iButton
              @click="submit"
              :loading="submiting"
              v-permission.auto="SOURCING_NOMINATION_SUGGESTION_SAVE|保存"
            >
              {{ language("LK_BAOCUN","保存") }}
            </iButton>
          </span>
          <iButton
            class="leftMargin"
            @click="showMouldVisibal" 
            v-permission.auto="SOURCING_NOMINATION_SUGGESTION_MOLDBUDGETMANAGEMENT|模具预算管理"
          >
            {{ language("MOJUYUSUANGUANLI","模具预算管理") }}
          </iButton>
        </div>
      </div>
      <tablelist
        index
        :tableData="data"
        :tableTitle="supplierTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        ref="tablelist"
        v-permission.auto="SOURCING_NOMINATION_SUGGESTION_TABLE|表格"
      >
        <template #rfqNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.rfqNum}}</a>
        </template>
        <!-- 供应商名 -->
        <template #supplierName="scope">
          <div v-if="!onlyTable && !nominationDisabled && !rsDisabled">
            <iSelect
              v-model="scope.row.supplierName"
              @focus="getRfqDepartment(scope.row)"
              @change="onSupplierChange(arguments, scope.row)"
              :placeholder="language('LK_QINGXUANZE','请选择')">
              <el-option
                :value="items.supplierName"
                :label="items.supplierName"
                v-for="(items, index) in (scope.row.departmentOption || [])"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.supplierName}}</span>
        </template>
        <!-- 比例 -->
        <template #ratio="scope">
          <div v-if="!onlyTable && !nominationDisabled && !rsDisabled">
            <iInput v-model="scope.row.ratio" :placeholder="language('LK_QINGSHURU','请输入')" />
            <!-- <iSelect
              v-model="scope.row.ratio"
              :placeholder="language('LK_QINGXUANZE','请选择')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect> -->
          </div>
          <span v-else>{{scope.row.ratio}}</span>
        </template>
        <template #sapCode="scope">
          <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>
      </tablelist>
      <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getDataList)"
        @current-change="handleCurrentChange($event, getDataList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      /> -->

    <!-- 批量编辑弹窗 -->
    <batchEditDialog :visible.sync="batchEditVisibal" :supplierList="supplierList" @submit="onBatchEdit" />
    <!-- 模具弹窗 -->
    <mouldDialog :visible.sync="mouldVisibal" :rfqIds="rfqIds" :fsIds="fsIds" :supplierIds="supplierIds" />
    <!-- 黑名单校验弹窗提示 -->
    <dialogTableTips ref="dialogTableTips" tableType="SUGGESTIONSAVE" :tableListData="blackTableListData"/>
  </iCard>
</template>

<script>
import Vue from 'vue'
import {
  supplierTitle,
  // mokeSupplierData
} from './data'
import tablelist from "@/views/designate/supplier/components/tableList";
import batchEditDialog from "./batchEditDialog"
// import mouldDialog from "./mouldDialog"
import mouldDialog from "./mouldBudgetManagementDialog"
import  dialogTableTips  from '@/views/partsrfq/components/dialogTableTips';
import { pageMixins } from '@/utils/pageMixins'

import {
  getSuggestionList,
  updateSuggestion,
  getPartSupplierList,
  deleteSuggestion
} from '@/api/designate/suggestion/part'
import { nominateAppSDetail } from '@/api/designate'
import _ from 'lodash'

import {
  iCard,
  iButton,
  iInput,
  // iPagination,
  iMessage,
  iSelect
} from "rise";

export default {
  components: {
    iCard,
    iButton,
    iSelect,
    iInput,
    // iPagination,
    tablelist,
    batchEditDialog,
    mouldDialog,
    dialogTableTips,
  },
  mixins: [ pageMixins ],
  props: {
    onlyTable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 表头
      supplierTitle,
      // 表单数据
      data: [],
      // 表单选择的数据
      selectData: [],
      // 控制右边按钮整体切换
      editControl: false,
      // 批量编辑弹窗
      batchEditVisibal: false,
      // 模具弹窗
      mouldVisibal: false,
      // 列表加载状态
      tableLoading: false,
      // 支持删除的行，us规定，只允许删除新增的行，不允许删除系统带出的行
      canBeDelete: false,
      // 最后一条数据的index,用于复制数据
      lastSelecteDataIndex: 0,
      // 供应商列表
      supplierList: [],
      nomiData: {},
      submiting: false,
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      },
      // 全量rfqId，用于模具预算管理列表查询
      rfqIds: [],
      fsIds: [],
      supplierIds: [],
      isMtzDisabled: false,
      selectedDataMtz: false,
      isFrozen:false,
      blackTableListData:[],
    }
  },
  mounted() {
    this.getDataList()
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    // 检查选中的条目是否可以被删除
    checkCanbeDelete() {
      let state = false;
      if (this.selectData.length === 0) return state = true
      state = this.selectData.filter(o => o.isAdd || !o.sysDefault).length !== this.selectData.length
      return state
    },
    getSelectedMtzFlag(){
      let flg = false;
      this.selectData.forEach((e)=>{
        if(!flg && (e.mtz=='否' || !e.supplierId)){
          flg = true;
        } 
      });
      return flg;
    }
  },
  methods: {
     nominateAppSDetail() {
      if(this.$route.query.desinateId){
        nominateAppSDetail({
          nominateAppId: this.$route.query.desinateId
        })
        .then(res => {
          this.nomiData =res.data;
          this.isMtzDisabled = this.nomiData.mtzApplyId || this.nomiData.isFreeze ===1
        })
      } 
    },
    // 生成随机id
    randomid() {
      return Math.floor(Math.random() * 10000000)
    },
    // 获取供应商信息
    async getSupplierData() {
      const data = this.selectData.map(o => {
        return {
          fsnrGsnrNum: o.fsnrGsnrNum,
          nominateAppId: this.$store.getters.nomiAppId || '',
          rfqId: o.rfqId
        }
      })
      try {
        const res = await getPartSupplierList(data)
        if (res.code === '200') {
          this.supplierList = res.data
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 获取单个零件供应商信息
    getRfqDepartment(item) {
      if (item.departmentOption) return
      const params = [{
        fsnrGsnrNum: item.fsnrGsnrNum,
        nominateAppId: this.$store.getters.nomiAppId || '',
        rfqId: item.rfqId
      }]
      getPartSupplierList(params).then(res => {
        if (res.code === '200') {
          Vue.set(item, 'departmentOption', res.data)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    // 切换供应商回调
    onSupplierChange(data, row) {
      const val = data && data[0] || ''
      const list = row.departmentOption || []
      const op = list.find(o => o.supplierName === val) || {}
      Vue.set(row, 'supplierId', op.supplierId || '')
      Vue.set(row, 'sapNum', op.sap || '')
    },
    // 批量删除
    async handleBatchDelete() {
      const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
      if (confirmInfo !== 'confirm') return
      // this.selectData.forEach((item) => {
      //   const dIndex = this.data.findIndex(o => o.sid === item.sid)
      //   if (dIndex > -1) {
      //     this.data.splice(dIndex, 1)
      //   }
      // })
      const data = {
        ids: this.selectData.map(o => o.id)
      }
      try {
        const res = await deleteSuggestion(data)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          setTimeout(() => {
            this.getDataList()
          }, 1500)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 批量编辑
    handleBatchEdit() {
      if (!this.selectData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      this.batchEditVisibal = true
    },
    onBatchEdit(data) {
      // 批量更新选中数据
      this.selectData.forEach(o => {
        const tar = this.data.find(s => s.sid === o.sid) || {}
        data.supplierId && (this.$set(tar, 'supplierId', data.supplierId))
        data.supplierName && (this.$set(tar, 'supplierName', data.supplierName))
        data.ratio && (this.$set(tar, 'ratio', data.ratio))
      })
    },
    // 保存修改记录
    async submit() {
      // if (!this.selectData.length) {
      //   iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
      //   return
      // }
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
      if (confirmInfo !== 'confirm') return
      this.submiting = true
      const data = this.data && this.data.map(o => {
        return {
          fsnrGsnrNum: o.fsnrGsnrNum,
          id: o.id,
          nominateAppId: this.$store.getters.nomiAppId || '',
          ratio: o.ratio,
          sourceId: o.sourceId,
          supplierId: o.supplierId,
          supplierName: o.supplierName
        }
      }) || []
      updateSuggestion(data).then(res => {
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getDataList()
        }else if(res.code == '501'){
          this.blackTableListData = res.data || [];
          this.$refs.dialogTableTips.show(); 
        }else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.submiting = false
      }).catch(e => {
        this.submiting = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    // handlEdit() {
    //   if (!this.selectData.length) {
    //     iMessage.error('请选择')
    //     return
    //   }
    //   this.editControl = true
    //   this.setEditState(true)
    // },
    // setEditState(state = false) {
    //   this.selectData.forEach(item => {
    //     const tar = this.selectData.find(o => o.id === item.id)
    //     tar && (Vue.set(tar, 'isEdit', state))
    //   })
    // },
    // 批量选择
    handleSelectionChange(data) {
      this.selectData = data
      if (data.length) {
        this.getSupplierData()
      } else {
        this.supplierList = []
      }
    },
    // 复制条目
    async copyLines(){
      if (!this.selectData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const data = this.selectData[this.selectData.length - 1]
      this.lastSelecteDataIndex = this.data.findIndex(o => o.sid === data.sid)
      const confirmInfo = await this.$confirm(this.language('copyChosenSure','您确定要复制选中的数据吗？'))
      if (confirmInfo !== 'confirm') return
      // 复制数组
      const tempArray = _.cloneDeep(this.selectData)
      tempArray.map(o => {
        // 重新分配唯一识别id
        o.sid = this.randomid()
        // 标识该条数据可以删除
        o.isAdd = true
        o.sourceId = o.id
        delete o.id
        return o
      })
      // 计算插入开始结束位置
      const start = this.lastSelecteDataIndex + 1
      // const end = this.lastSelecteDataIndex + this.selectData.length
      // 插入数组
      this.data.splice(start, 0, tempArray)
      this.data = Array.from(new Set(this.data.flat(Infinity)))
    },
    getDataList() {
      this.tableLoading = true
      getSuggestionList({
        nominateAppId: this.$store.getters.nomiAppId || '',
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.data = res.data || []
          // this.data = this.data.slice(0, 4)
          this.data.map(o => {
            !o.sid && (o.sid = this.randomid())
            o.mtz == true ? o.mtz = '是' : o.mtz = '否'
            o.isBeforeFrozen == true ? this.isFrozen = false : this.isFrozen = true
            return
          })
          this.page.totalCount = res.total || this.data.length
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableLoading = false
      })
    },
    showMouldVisibal() {
      this.rfqIds = []
      this.fsIds = []
      this.supplierIds = []

      let list = []
      if (this.selectData.length > 0) {
        list = this.selectData
      } else {
        list = this.data
      }

      list.forEach(item => {
        this.rfqIds.push(item.rfqId)
        this.fsIds.push(item.fsnrGsnrNum)
        this.supplierIds.push(item.supplierId)
      })

      this.rfqIds = _.uniq(this.rfqIds)
      this.fsIds = _.uniq(this.fsIds)
      this.supplierIds = _.uniq(this.supplierIds)

      this.mouldVisibal = true
    },
    // 创建MTZ申请
    // handlecreatemtz() {
    //   if(!this.selectData.length) {
    //     iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
    //     return
    //   }else {
    //     let nom = this.selectData[0].nominateId || ''
    //     let item =[]
    //     let supplierId = []
    //     item = this.selectData.map(val => val.partNum).join(',') || ''
    //     supplierId = this.selectData.map(val => val.supplierId).join(',') || ''
    //     window.location.href=`${ process.env.VUE_APP_PORTAL_URL }mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor?appId=`+nom+`&item=`+item+`&supplierId=`+supplierId
    //   }
    // },
  },
  created(){
    this.nominateAppSDetail()
  }
}
</script>
<style lang="scss" scoped>
.supplierTable {
  .leftMargin{
    margin: 0 0 0 10px;
  }
}
</style>