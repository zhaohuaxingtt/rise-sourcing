<!--
 * @Author: Haojiang
 * @Date: 2021-06-24 17:53:08
 * @LastEditTime: 2021-11-08 15:44:03
 * @LastEditors:  
 * @Description: m签字单新增、详情
 * @FilePath: /front-web/src/views/designate/home/signSheet/newSignSheet.vue
-->
<template>
  <iPage class="designateHome" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSPAGE|签字单详情">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ mode === 'add' ? language("XINJIANQIANZIDAN",'新建签字单') : language("LK_QIANZIDAN",'签字单') }}</span
        >

        <div class="floatright">
          <span v-if="mode === 'add'">
            <iButton @click="handleSave" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSSAVE|签字单详情保存">
              {{ language("BAOCUN",'保存') }}
            </iButton>
            <iButton @click="handleSubmit" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSSUBMIT|签字单详情提交">
              {{ language("LK_TIJIAO",'提交') }}
            </iButton>
            <iButton @click="handleRemove" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSREMOVE|签字单详情移除">
              {{ language("YICHU",'移除') }}
            </iButton>
            <iButton @click="$router.push({path: '/sourcing/partsnomination/signSheet'})">
              {{ language("FANHUI",'返回') }}
            </iButton>
          </span>
          <span v-else>
            <iButton @click="$router.push({path: '/sourcing/partsnomination/signSheet'})">
              {{ language("LK_FANHUI",'返回') }}
            </iButton>
          </span>
          
        </div>
        <headerNav />
      </div>
      <iCard>
        
        <el-form class="signsheet-filter" :inline="true">
          <el-row gutter="20">
            <el-col span="6">
              <!-- 签字单号 -->
              <el-form-item :label="`${language('QIANZIDANHAO','签字单号')}:`">
                <iInput
                  v-model="form.signCode"
                  :disabled="true"
                  :placeholder="``"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col span="6">
              <!-- 状态 -->
              <el-form-item :label="`${language('ZHUANGTAI','状态')}:`">
                <iInput
                  v-model="form.statusDesc"
                  :disabled="true"
                  :placeholder="``"
                ></iInput>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <!-- 描述 -->
              <el-form-item :label="`${language('MIAOSHU','描述')}:`" class="desc">
                <iInput
                  v-model="form.description"
                  :placeholder="language('LK_QINGSHURU','请输入')"
                ></iInput>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn-right">
          <iButton @click="chooseSignsheet()">
            {{ language("XUANZE", '选择') }}
          </iButton>
        </div>
        <!-- 表格 -->
        <tablelist
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAIL_CHOSENTABLE|签字单详情已选择表格"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- 定点单号 -->
      <template #nominateName="scope">
        <a
          href="javascript:;"
          @click="viewNominationDetail(scope.row)">
          {{scope.row.nominateName}}
        </a>
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
      
      <!-- 一致性校验 -->
      <!-- <template #isPriceConsistent="scope">
        <span>{{scope.row.isPriceConsistent ? '通过' : '不通过'}}</span>
      </template> -->

      <!-- 定点日期 -->
      <template #nominateDate="scope">
        <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>

      <template #freezeDate="scope">
        <span>{{scope.row.freezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      <template #selStatus="scope">
        <div>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(false)" v-if="scope.row.selStatus === '已确认'">{{scope.row.selStatus}}</a>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(true)" v-else-if="scope.row.selStatus === '未确认'">{{scope.row.selStatus}}</a>
          <span v-else>{{scope.row.selStatus}}</span>
        </div>
      </template>
      
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getChooseData)"
        @current-change="handleCurrentChange($event, getChooseData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
      </iCard>
      <addSignsheet 
      :dialogVisible='dialogVisible' 
      @changeVisible='dialogVisible = false'
      @getChooseData='getChooseData'
      @choose="handleChoose"
      :form='form'
      ></addSignsheet>
      <div class="margin-top20">
        <!-- 引入定点申请综合管理页面 -->
        <!-- <designateSign
          :mode="'sign'"
          @choose="handleChoose"
          v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAIL_UNCHOSENTABLE|签字单详情未选择表格"
          :refresh.sync="designateSignRefresh" /> -->
      </div>
  </iPage>
</template>
<script>
import {detailsTableTitle as tableTitle, } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import tablelist from "@/views/designate/supplier/components/tableList";
import designateSign from "@/views/designate/home/designateSign/index";
import addSignsheet from "./components/addSignsheet";
import headerNav from "./components/headerNav";
import {
  getNomiSelectedPage,
  getNomiNotSelectedPage,
  saveSignSheet,
  submitSignSheet,
  removeSignsheetItems,
  getsignSheetDetails
} from '@/api/designate/nomination/signsheet'

import {
  iPage,
  iCard,
  iInput,
  iButton,
  iPagination,
  iMessage
} from "rise";

export default {
  mixins: [ filters, pageMixins ],
  data() {
    return {
      mode: this.$route.query.mode || '',
      form: {
        signId: '',
        statusDesc: '',
        description: ''
      },
      tableTitle,
      tableListData: [],
      selectTableData: [],
      tableLoading: false,
      designateSignRefresh: false,
      dialogVisible:false
    }
  },
  components: {
    iPage,
    iCard,
    iInput,
    iButton,
    iPagination,
    tablelist,
    addSignsheet,
    headerNav
    // designateSign
  },
  created() {
    const {query = {}} = this.$route
    const {signCode, status, id, desc} = query
    this.form.signId = id
    this.form.signCode = signCode
    this.form.status = status
    this.form.description = this.form.description && decodeURIComponent(desc) || ''
    this.getSignSheetDetails()
    this.getChooseData()
  },
  methods: {
    handleChoose(data) {
      console.log(data,'------------------------------------')
      this.tableListData = data
    },
    // 多选
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    getSignSheetDetails() {
      this.tableLoading = true
      getsignSheetDetails({
        signId: Number(this.$route.query.id) || ''
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const data = res.data || {}
          const status = data.status && data.status.name ? data.status.name : ''
          status && (this.form.status = status)
          data.signCode && (this.form.signCode = data.signCode)
          data.statusDesc && (this.form.statusDesc = data.statusDesc)
          data.description && (this.form.description = data.description)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        this.tableLoading = false
      })
    },
    // 获取已经选择的数据
    getChooseData(params) {
      this.tableLoading = true
      getNomiSelectedPage({
        ...params,
        signId: Number(this.form.signId) || '',
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
          console.log(this.selectTableData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        console.log(res)
      }).catch(e => {
        this.tableLoading = false
      })
    },
    // 保存
    async handleSave() {
      if (!this.tableListData.length) {
        iMessage.error(this.language('QINGXAUNZEDINGDIANSHENQINGDAN','请选择定点申请单号'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('LK_SAVESURE','您确定要执行保存操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.tableListData.map(o => Number(o.id))
      
      try {
        const params = {
          signId: Number(this.form.signId) || '', 
          description: this.form.description, 
          nominateIdArr: idList}
        console.log(this.form, params)
        const res = await saveSignSheet(params)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getChooseData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    async handleSubmit() {
      if (!this.tableListData.length) {
        iMessage.error(this.language('QINGXAUNZEDINGDIANSHENQINGDAN','请选择定点申请单号'))
        return
      }
      console.log('this.tableListData', this.tableListData)
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.tableListData.map(o => Number(o.id))
      try {
        const res = await submitSignSheet({
          signIdArr: [Number(this.form.signId)]
        })
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getChooseData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 移除项目
    async handleRemove() {
      const confirmInfo = await this.$confirm(this.language('LK_REMOVESURE','您确定要执行移除操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await removeSignsheetItems({
          signId: this.form.signId, 
          description: this.form.description, 
          nominateIdArr: idList})
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getChooseData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 查看详情
    viewNominationDetail(row) {
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
            applicationStatus: (row.applicationStatus && row.applicationStatus.code) || row.applicationStatus || '',
          }
        })
        window.open(routeData.href, '_blank')
      })
    },
    chooseSignsheet() {
      this.dialogVisible = true
      console.log(this.dialogVisible,'11111111111111');
    }
  }

}
</script>
<style lang="scss" scoped>
  .btn-right{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
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