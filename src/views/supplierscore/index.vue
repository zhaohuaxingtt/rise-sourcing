<!--
 * @Author: your name
 * @Date: 2021-06-22 14:14:49
 * @LastEditTime: 2021-06-22 16:36:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\index.vue
-->
<template>
  <iPage class="supplierScore">
    <div class="header clearFloat">
      <div class="title">{{ $t("寻源执行") }}</div>
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
        <el-form-item :label="$t('RFQ编号')">
          <iInput v-model="form.rfqNum" :placeholder="$t('请输入RFQ编号')" />
        </el-form-item>
        <el-form-item :label="$t('RFQ名称')">
          <iInput v-model="form.rfqNum" :placeholder="$t('RFQ名称')" />
        </el-form-item>
        <el-form-item :label="$t('LINIE')">
          <iSelect
            v-model="form.linie"
            :placeholder="$t('请选择LINIE')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('询价采购员')">
          <iSelect
            v-model="form.buyerName"
            :placeholder="$t('请选择询价采购员')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('评分状态')">
          <iSelect
            v-model="form.scoreStatus"
            :placeholder="$t('请选择评分状态')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('零件号')">
          <iInput v-model="form.partNum" :placeholder="$t('请输入零件号')" />
        </el-form-item>
        <el-form-item :label="$t('零件名称')">
          <iInput v-model="form.partName" :placeholder="$t('请输入零件名称')" />
        </el-form-item>
        <el-form-item :label="$t('供应商SVW号')">
          <iInput v-model="form.svwNum" :placeholder="$t('请输入供应商SVW号')" />
        </el-form-item>
        <el-form-item :label="$t('供应商SAP号')">
          <iInput v-model="form.sapNum" :placeholder="$t('请输入供应商SAP号')" />
        </el-form-item>
        <el-form-item :label="$t('供应商名称')">
          <iInput v-model="form.supplierName" :placeholder="$t('请输入供应商名称')" />
        </el-form-item>
        <el-form-item :label="$t('车型')">
          <iSelect
            v-model="form.carType"
            :placeholder="$t('请选择车型')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('车型项目')">
          <iSelect
            v-model="form.carProjectType"
            :placeholder="$t('请选择车型项目')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
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
    <iCard class="margin-top30" :title="$t('供应商评分管理')" >
      <template #header-control>
        <iButton @click="handleTransfer">{{ $t("转派评分任务") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #rfqNum="scope">
            <span class="link-underline" @click="jumpRfqDetail(scope.row)">{{ scope.row.rfqNum }}</span>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
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
import { navList, tableTitle } from "./components/data"

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
      form: {},
      loading: false,
      tableTitle,
      tableListData: [{ rfqNum: "32" }],
      multipleSelection: []
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      const getList = function () {}

      this.loading = true
      getList()
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
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
    // 转派评分任务
    handleTransfer() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t("请选择需要转派的评分任务"))
    },
    // 跳转RFQ详情
    jumpRfqDetail(row) {
      window.open(`/#/supplierscore/rfqdetail?rfqId=${ row.rfqNum }`, "_blank")
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