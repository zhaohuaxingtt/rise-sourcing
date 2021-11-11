<!--
 * @Author: your name
 * @Date: 2021-06-22 14:14:49
 * @LastEditTime: 2021-11-11 17:27:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\index.vue
-->
<template>
  <iPage class="supplierScore">
    <div class="header clearFloat">
      <div class="title">{{ language("XUNYUANZHIXING", "寻源执行") }}</div>
      <iNavMvp class="nav" :lev="2" :list="navList" />
      <div class="control">
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iSearch
      class="margin-top25"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON">
      <el-form>
        <el-form-item :label="language('RFQBIANHAO', 'RFQ编号')">
          <iInput v-model="form.rfqId" :placeholder="language('QINGSHURURFQBIANHAO', '请输入RFQ编号')" />
        </el-form-item>
        <el-form-item :label="language('RFQMINGCHENG', 'RFQ名称')">
          <iInput v-model="form.rfqName" :placeholder="language('QINGSHURURFQMINGCHENG', '请输入RFQ名称')" />
        </el-form-item>
        <el-form-item label="LINIE">
          <iSelect
            filterable
            remote
            v-model="form.linieUserId"
            :remote-method="findLinieByName"
            :loading="linieLoading"
            :placeholder="language('QINGSHURULINIE', '请输入LINIE')"
            :loading-text="language('JIAZAIZHONG', '加载中')"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in linieOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('XUNJIACAIGOUYUAN', '询价采购员')">
          <iSelect
            filterable
            remote
            v-model="form.buyerId"
            :remote-method="findInquiryBuyerByName"
            :loading="buyerLoading"
            :placeholder="language('QINGSHURUXUNJIACAIGOUYUAN', '请输入询价采购员')"
            :loading-text="language('JIAZAIZHONG', '加载中')"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in buyerOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('PINGFENZHUANGTAI', '评分状态')">
          <iSelect
            v-model="form.rateStatus"
            :placeholder="language('MORENPINGFENZHUANGTAI', '默认评分状态')"
          >
            <el-option
              :value="-1"
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in scoreStatusOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iInput v-model="form.partNum" :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')" />
        </el-form-item>
        <el-form-item :label="language('LINGJIANMINGCHENG', '零件名称')">
          <iInput v-model="form.partName" :placeholder="language('QINGSHURULINGJIANMINGCHENG', '请输入零件名称')" />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGSVWHAO', '供应商SVW号')">
          <iInput v-model="form.supplierSvwCode" :placeholder="language('QINGSHURUGONGYINGSHANGSVWHAO', '请输入供应商SVW号')" />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGSAPHAO', '供应商SAP号')">
          <iInput v-model="form.supplierSapCode" :placeholder="language('QINGSHURUGONGYINGSHANGSAPHAO', '请输入供应商SAP号')" />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')">
          <iInput v-model="form.supplierName" :placeholder="language('QINGSHURUGONGYINGSHANGMINGCHENG', '请输入供应商名称')" />
        </el-form-item>
        <el-form-item :label="language('CHEXING', '车型')">
          <iSelect
            v-model="form.modelNameZh"
            :placeholder="language('QINGXUANZECHEXING', '请选择车型')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in cartypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_SHIFOUXIANSHIZIJI_1', '是否显⽰⾃⼰')">
          <iSelect
            v-model="form.showSelf"
            :placeholder="language('partsprocure.CHOOSE','请选择')"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in showSelfOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top30" :title="language('GONGYINGSHANGPINGFENGUANLI', '供应商评分管理')">
      <template #header-control>
        <iButton @click="handleTransfer">{{ language("ZHUANPAIPINGFENRENWU", "转派评分任务") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #rfqId="scope">
            <span class="link-underline" @click="jumpRfqDetail(scope.row)">{{ scope.row.rfqId }}</span>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, searchRfqBdlRatings)"
          @current-change="handleCurrentChange($event, searchRfqBdlRatings)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
      <forwardDialog ref="forwardDialog" :visible.sync="forwardDialogVisible" @confirm="confirmForward" />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, icon, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage } from "rise"
import logButton from "@/components/logButton"
import forwardDialog from "@/views/supplierscore/components/forwardDialog"
import tableList from "@/views/partsign/editordetail/components/tableList"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { navList, queryForm, tableTitle } from "./components/data"
import { cloneDeep } from "lodash"
import { findDropDownBox, findLinieByName, findInquiryBuyerByName, searchRfqBdlRatings, forward } from "@/api/supplierscore"
import { getCartypeDict, findBySearches } from "@/api/partsrfq/home"
import axios from "axios"

export default {
  components: {
    iPage,
    iNavMvp,
    icon,
    iSearch, 
    iSelect, 
    iInput,
    iCard,
    iButton,
    iPagination,
    logButton,
    forwardDialog,
    tableList
  },
  mixins: [ filters, pageMixins ], 
  data() {
    return {
      navList,
      scoreStatusOptions: [],
      findLinieByNameSource: null,
      linieLoading: false,
      linieOptions: [],
      findInquiryBuyerByNameSource: null,
      buyerLoading: false,
      buyerOptions: [],
      carTypeOptions: [],
      cartypeProjectOptions: [],
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      forwardDialogVisible: false,
      showSelfOptions:[
        {label:'是',key:'nominationLanguage.Yes',value:'YES'},
        {label:'否',key:'nominationLanguage.No',value:'NO'},
      ]
    }
  },
  created() {
    this.findDropDownBox()
    this.getCartypeDict()
    this.findBySearches()
    this.searchRfqBdlRatings()
  },
  methods: {
    // 获取评分状态
    findDropDownBox() {
      findDropDownBox({
        types: ["RFQ_RATE_STATUS"]
      })
      .then(res => {
        if (res.code == 200) {
          this.scoreStatusOptions = 
            Array.isArray(res.data) && res.data[0] && res.data[0].list ? 
            res.data[0].list.map(item => ({
              key: item.key,
              label: item.name,
              value: item.key
            })).filter(item => item.key != "4"):
            []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    // 查询Linie
    findLinieByName(name) {
      this.linieLoading = true

      if (this.findLinieByNameSource) this.findLinieByNameSource.cancel()
      this.findLinieByNameSource = axios.CancelToken.source()

      findLinieByName({
        name
      }, { cancelToken: this.findLinieByNameSource.token })
      .then(res => {
        if (res.code == 200) {
          this.linieOptions =
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.id,
              label: item.nameZh,
              value: item.id
            })) :
            []
        }

        this.linieLoading = false
      })
      .catch(() => this.linieLoading = false)
    },
    // 查询询价采购员
    findInquiryBuyerByName(name) {
      this.buyerLoading = true

      if (this.findInquiryBuyerByNameSource) this.findInquiryBuyerByNameSource.cancel()
      this.findInquiryBuyerByNameSource = axios.CancelToken.source()

      findInquiryBuyerByName({
        name
      }, { cancelToken: this.findInquiryBuyerByNameSource.token })
      .then(res => {
        if (res.code == 200) {
          this.buyerOptions =
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.id,
              label: item.nameZh,
              value: item.id
            })) :
            []
        }

        this.buyerLoading = false
      })
      .catch(() => this.buyerLoading = false)
    },
    // 查询车型
    getCartypeDict() {
      getCartypeDict()
      .then(res => {
        if (res.code == 200) {
          this.carTypeOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.code,
              label: item.name,
              value: item.name
            })) :
            []
        }
      })
    },
    // 查询车型项目
    findBySearches() {
      findBySearches("01")
      .then(res => {
        if (res.code == 200) {
          this.cartypeProjectOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.code,
              label: item.name,
              value: item.name
            })) :
            []
        }
      })
    },
    searchRfqBdlRatings() {
      const form = {}
      Object.keys(this.form).forEach(key => {
        form[key] = this.form[key] || this.form[key] === 0 ? this.form[key] : undefined
      })
      form.current = this.page.currPage
      form.size = this.page.pageSize
      form.showSelf = form.showSelf=='YES'

      this.loading = true
      searchRfqBdlRatings(form)
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0

          console.log("test")
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 查询
    sure() {
      this.page.currPage = 1
      this.searchRfqBdlRatings()
    },
    // 重置
    reset() {
      this.form = cloneDeep(queryForm)
      this.page.currPage = 1
      this.searchRfqBdlRatings()
    },
    // 转派评分任务
    handleTransfer() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOZHUANPAIDEPINGFENRENWU", "请选择需要转派的评分任务"))
      this.forwardDialogVisible = true
    },
    // 确认转派
    confirmForward(userInfo) {
      this.$refs.forwardDialog.updateConfirmLoading(true)

      forward({
        raterId: userInfo.id,
        rater: userInfo.nameZh,
        rfqIds: this.multipleSelection.map(item => item.rfqId)
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.forwardDialogVisible = false
          this.searchRfqBdlRatings()
        } else {
          iMessage.error(message)
        }

        this.$refs.forwardDialog.updateConfirmLoading(false)
      })
      .catch(() => this.$refs.forwardDialog.updateConfirmLoading(false))
    },
    // 跳转RFQ详情
    jumpRfqDetail(row) {
      const route = this.$router.resolve({
        path: "/supplierscore/rfqdetail",
        query: {
          rfqId: row.rfqId,
          currentTab: "supplierScore"
        }
      })
      window.open(route.href, "_blank")
    }
  }
}
</script>

<style lang="scss" scoped>
.supplierScore {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .nav {
      position: absolute;
      top: 50%;
      right: 130px;
      transform: translate(0, -50%);
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>