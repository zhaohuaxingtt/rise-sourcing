<!--
 * @Author: your name
 * @Date: 2021-05-27 12:32:54
 * @LastEditTime: 2021-06-04 14:04:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\home\index.vue
-->
<template>
  <div class="home">
    <div class="control">
      <logButton class="margin-left20" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>
    <iSearch
      class="margin-top65"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="$t('costanalysismanage.RfqBianHao')">
          <iInput
            v-model="form.rfqId"
            :placeholder="$t('costanalysismanage.QingShuRuRfqBianHao')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.RfqZhuangTai')">
          <iSelect
            v-model="form.rfqStatus"
            :placeholder="$t('costanalysismanage.QingXuanZeRfqZhuangTai')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in list"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.LingJianHao')">
          <iInput
            v-model="form.partNum"
            :placeholder="$t('costanalysismanage.QingShuRuLingJianHao')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.CheXingXiangMu')">
          <iSelect
            v-model="form.carType"
            :placeholder="$t('costanalysismanage.QingXuanZeCheXingXiangMu')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in list"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Pca')">
          <iInput
            v-model="form.pca"
            :placeholder="$t('costanalysismanage.QingShuRuPca')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Tia')">
          <iInput
            v-model="form.tia"
            :placeholder="$t('costanalysismanage.QingShuRuTia')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.HeavyItem')">
          <iSelect
            v-model="form.heavyItem"
            :placeholder="$t('costanalysismanage.QingXuanZeHeavyItem')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in list"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Commodity')">
          <iSelect
            v-model="form.commodity"
            :placeholder="$t('costanalysismanage.QingXuanZeCommodity')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in list"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Linie')">
          <iSelect
            v-model="form.linieId"
            :placeholder="$t('costanalysismanage.QingXuanZeLinie')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in list"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="$t('costanalysismanage.RfqLieBiao')">
      <tableList
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading">
        <template #id="scope">
          <span class="link" @click="jumpRfq(scope.row)">{{ scope.row.id }}</span>
        </template>
        <template #createDate="scope">
          <span>{{ scope.row.createDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #currentRoundsEndTime="scope">
          <span>{{ scope.row.deadDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #technoMaterial="scope">
          <span class="link" @click="download(scope.row)">{{ $t("costanalysismanage.XiaZai") }}</span>
        </template>
        <template #sendDate="scope">
            <span class="link" @click="cbd(scope.row)">{{ scope.row.sendDate | dateFilter("YYYY-MM-DD") }}</span>
            <div v-if="scope.row.sendDate" class="attention margin-left4"><span>!</span></div>
        </template>
        <template #analysisReport="scope">
          <icon class="tick link" symbol name="iconbaojiazhuangtailiebiao_yibaojia" @click.native="analysisReport(scope.row)"/>
        </template>
        <template #recordId="scope">
          <icon class="link" symbol :name="scope.row.recordId == 1 ? 'iconliebiaoyizhiding' : 'iconliebiaoweizhiding'" @click.native="updateOrder(scope.row)" />
        </template>
      </tableList>
      <iPagination 
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, getKmRfqList)"
        @current-change="handleCurrentChange($event, getKmRfqList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </iCard>
    <!-- 技术资料下载弹窗 -->
    <downloadDialog :rfqNum='rfqNum' :dialogVisible='downloadDialogVisible' @changeVisible="changeVisible"/>
    <!-- CBD弹窗 -->
    <cbdDialog :rfqNum='rfqNum' :dialogVisible='cbdDialogVisible'  @changeVisible="changeVisible"/>
  </div>
</template>

<script>
import { icon, iSearch, iInput, iSelect, iCard, iPagination, iMessage } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import downloadDialog from './components/downloadFiles'
import cbdDialog from './components/cbdStatus'
import { queryForm, tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getSelectOptions, getKmRfqList } from "@/api/costanalysismanage/home"
import { cloneDeep } from "lodash"

export default {
  components: { 
    icon,
    iSearch,
    iInput,
    iSelect,
    iCard,
    iPagination,
    logButton,
    tableList,
    downloadDialog,
    cbdDialog,
  },
  mixins: [ filters, pageMixins ],
  data(){
    return{
      downloadDialogVisible:false,
      cbdDialogVisible:false,
      form: cloneDeep(queryForm),
      list: [],
      loading: false,
      tableTitle,
      tableListData: [
        {
          id: "T2234345",
          createDate: 1622184508000,
          currentRoundsEndTime: 1622184508000,
          sendDate: 1622184508000,
          analysisReport: 1622184508000,
          recordId: 1
        }
      ],
      rfqNum:'', // 当前选择的rfq
    }
  },
  created() {
    // this.getSelectOptions("03")
    this.getKmRfqList()
  },
  methods: {
    // getSelectOptions(type) {
    //   getSelectOptions(type)
    //   .then(res => {
    //     if (res.code == 200) {
    //       console.log(res)
    //     } else {
    //       iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
    //     }
    //   })
    //   .catch(() => {})
    // },
    getKmRfqList() {
      this.loading = true

      getKmRfqList({
        current: this.page.currPage,
        size: this.page.pageSize,
        ...this.form
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 跳转RFQ详情
    jumpRfq(row) {
      window.open(`/#/costanalysismanage/rfqdetail?rfqId=${ row.id }`, "_blank")
    },
    // 下载
    download(row) {
      console.log(row);
      const { rfqNum='1' } = row;
      this.rfqNum = rfqNum;
      this.downloadDialogVisible = true
    },
    // CBD
    cbd(row) {
      this.cbdDialogVisible = true
    },
    // 分析报告
    analysisReport(row) {
      this.$router.push({
        path: "/costanalysismanage/costanalysis",
        query: { rfqId: row.id }
      })
    },
    // 变更顺序
    updateOrder(row) {
      this.$set(row, "recordId", row.recordId ? 0 : 1)
    },

    // 关闭弹窗
    changeVisible(type){
      this.downloadDialogVisible = type;
      this.cbdDialogVisible = type;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .tick {
    font-size: 18px;
  }

  .attention {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    width: 15px;
    height: 15px;
    color: $color-white;
    background: #E30D0D;
    border-radius: 50%;
    transform: translateY(-10%);

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 15px;
      line-height: 15px;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
}
</style>