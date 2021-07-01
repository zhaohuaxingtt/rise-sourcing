<!--
 * @Author: your name
 * @Date: 2021-06-22 14:14:49
 * @LastEditTime: 2021-06-28 19:19:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\index.vue
-->
<template>
  <iPage class="supplierScore">
    <div class="header clearFloat">
      <!-- <div class="title">{{ language("XUNYUANZHIXING", "寻源执行") }}</div> -->
      <div class="title">寻源执行</div>
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
          <!-- <iInput v-model="form.rfqId" :placeholder="language('QINGSHURURFQBIANHAO', '请输入RFQ编号')" /> -->
          <iInput v-model="form.rfqId" placeholder="请输入RFQ编号" />
        </el-form-item>
        <el-form-item :label="language('RFQMINGCHENG', 'RFQ名称')">
          <!-- <iInput v-model="form.rfqName" :placeholder="language('QINGSHURURFQMINGCHENG', '请输入RFQ名称')" /> -->
          <iInput v-model="form.rfqName" placeholder="请输入RFQ名称" />
        </el-form-item>
        <el-form-item label="LINIE">
          <iSelect
            v-model="form.linieUserId"
            :placeholder="language('QINGXUANZELINIE', '请选择LINIE')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- <el-form-item :label="language('XUNJIACAIGOUYUAN', '询价采购员')"> -->
        <el-form-item label="询价采购员">
          <iSelect
            v-model="form.buyerId"
            :placeholder="language('QINGXUANZEXUNJIACAIGOUYUAN', '请选择询价采购员')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- <el-form-item :label="language('PINGFENZHUANGTAI', '评分状态')"> -->
        <el-form-item label="评分状态">
          <iSelect
            v-model="form.rateStatus"
            :placeholder="language('QINGXUANZEPINGFENZHUANGTAI', '请选择评分状态')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- <el-form-item :label="language('LINGJIANHAO', '零件号')"> -->
        <el-form-item label="零件号">
          <!-- <iInput v-model="form.partNum" :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')" /> -->
          <iInput v-model="form.partNum" placeholder="请输入零件号" />
        </el-form-item>
        <!-- <el-form-item :label="language('LINGJIANMINGCHENG', '零件名称')"> -->
        <el-form-item label="零件名称">
          <!-- <iInput v-model="form.partName" :placeholder="language('QINGSHURULINGJIANMINGCHENG', '请输入零件名称')" /> -->
          <iInput v-model="form.partName" placeholder="请输入零件名称" />
        </el-form-item>
        <!-- <el-form-item :label="language('GONGYINGSHANGSVWHAO', '供应商SVW号')"> -->
        <el-form-item label="供应商SVW号">
          <!-- <iInput v-model="form.supplierSvwCode" :placeholder="language('QINGSHURUGONGYINGSHANGSVWHAO', '请输入供应商SVW号')" /> -->
          <iInput v-model="form.supplierSvwCode" placeholder="请输入供应商SVW号" />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGSAPHAO', '供应商SAP号')">
          <!-- <iInput v-model="form.supplierSapCode" :placeholder="language('QINGSHURUGONGYINGSHANGSAPHAO', '请输入供应商SAP号')" /> -->
          <iInput v-model="form.supplierSapCode" placeholder="请输入供应商SAP号" />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')">
          <!-- <iInput v-model="form.supplierName" :placeholder="language('QINGSHURUGONGYINGSHANGMINGCHENG', '请输入供应商名称')" /> -->
          <iInput v-model="form.supplierName" placeholder="请输入供应商名称" />
        </el-form-item>
        <!-- <el-form-item :label="language('CHEXING', '车型')"> -->
        <el-form-item label="车型">
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
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')"> -->
        <el-form-item label="车型项目">
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
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <!-- <iCard class="margin-top30" :title="language('GONGYINGSHANGPINGFENGUANLI', '供应商评分管理')" > -->
    <iCard class="margin-top30" title="供应商评分管理" >
      <template #header-control>
        <!-- <iButton @click="handleTransfer">{{ language("ZHUANPAIPINGFENRENWU", "转派评分任务") }}</iButton> -->
        <iButton @click="handleTransfer">转派评分任务</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :lang="false"
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
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, icon, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage } from "rise"
import logButton from "@/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { navList, queryForm, tableTitle } from "./components/data"
import { searchRfqBdlRatings } from "@/api/supplierscore"
import { cloneDeep } from "lodash"

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
    tableList,
    logButton
  },
  mixins: [ filters, pageMixins ], 
  data() {
    return {
      navList,
      options: [],
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: []
    }
  },
  created() {
    this.searchRfqBdlRatings()
  },
  methods: {
    searchRfqBdlRatings() {
      const form = {}
      Object.keys(this.form).forEach(key => {
        form[key] = this.form[key] || this.form[key] === 0 ? this.form[key] : undefined
      })
      form.current = this.page.currPage
      form.size = this.page.pageSize

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
    },
    // 跳转RFQ详情
    jumpRfqDetail(row) {
      window.open(`/#/supplierscore/rfqdetail?rfqId=${ row.rfqId }`, "_blank")
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