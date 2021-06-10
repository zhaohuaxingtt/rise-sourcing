<!--
 * @Author: your name
 * @Date: 2021-05-27 12:32:54
 * @LastEditTime: 2021-06-09 14:37:38
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
              :value="item.value"
              :label="item.label"
              v-for="item in rfqStatusOptions"
              :key="item.key"
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
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeOptions"
              :key="item.key"
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
            <el-option v-for="item in heavyItemOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
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
          <span class="link-underline" @click="jumpRfq(scope.row)">{{ scope.row.id }}</span>
        </template>
        <template #createDate="scope">
          <span>{{ scope.row.createDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #currentRoundsEndTime="scope">
          <span>{{ scope.row.deadDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #technoMaterial="scope">
          <span class="link-underline" @click="download(scope.row)">{{ $t("costanalysismanage.XiaZai") }}</span>
        </template>
        <template #sendDate="scope">
            <span class="link-underline" @click="cbd(scope.row)">{{ scope.row.sendDate | dateFilter("YYYY-MM-DD") }}</span>
            <div v-if="scope.row.sendDate" class="attention margin-left4"><span>!</span></div>
        </template>
        <template #analysisReport="scope">
          <icon class="tick link-underline" symbol name="iconbaojiazhuangtailiebiao_yibaojia" @click.native="analysisReport(scope.row)"/>
        </template>
        <template #recordId="scope">
          <icon class="link-underline" symbol :name="+scope.row.recordId > 0 ? 'iconliebiaoyizhiding' : 'iconliebiaoweizhiding'" @click.native="updateOrder(scope.row)" />
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
import { getSelectOptions, getKmRfqList, updateRfq } from "@/api/costanalysismanage/home"
import { selectDictByKeys } from "@/api/dictionary"
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
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
  },
  data(){
    return{
      carTypeOptions: [],
      rfqStatusOptions: [],
      heavyItemOptions: [],
      downloadDialogVisible:false,
      cbdDialogVisible:false,
      form: cloneDeep(queryForm),
      list: [],
      loading: false,
      tableTitle,
      tableListData: [],
      rfqNum:'', // 当前选择的rfq
    }
  },
  created() {
    this.getSelectOptions("01", "carTypeOptions")
    this.getSelectOptions("03", "rfqStatusOptions")
    this.getDict()
    this.getKmRfqList()
  },
  methods: {
    getSelectOptions(type, optionsKey) {
      getSelectOptions(type)
      .then(res => {
        if (res.code == 200) {
          this[optionsKey] = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.code,
              label: item.name,
              value: item.code
            })) :
            []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    getDict() {
      selectDictByKeys(
        [
          { keys: "HEAVY_ITEM" },
        ]
      )
      .then(res => {
        if (res.code == 200) {
          this.dictMap = {}
          Object.keys(res.data).forEach(key => {
            this.heavyItemOptions = res.data["HEAVY_ITEM"].map(item => ({
              ...item,
              key: item.code,
              value: item.code,
              zh: item.name,
              en: item.nameEn,
              de: item.nameDe
            }))
          })
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
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
    // 查询
    sure() {
      this.getKmRfqList()
    },
    // 重置
    reset() {
      this.form = cloneDeep(queryForm)
      this.page.currPage = 1
      this.getKmRfqList()
    },
    // 跳转RFQ详情
    jumpRfq(row) {
      // this.$router.push({
      //   path: "/costanalysismanage/rfqdetail",
      //   query: {
      //     rfqId: row.id
      //   }
      // })
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
      // this.$router.push({
      //   path: "/costanalysismanage/costanalysis",
      //   query: { rfqId: row.id }
      // })
      window.open(`/#/costanalysismanage/costanalysis?rfqId=${ row.id }`, "_blank")
    },
    // 变更顺序
    updateOrder(row) {
      // this.$set(row, "recordId", row.recordId ? 0 : 1)
      this.loading = true

      updateRfq({
        rfqSetTopPackage: {
          setType: row.recordId > 0 ? "0" : "1",
          rfqId: row.id,
          userId: this.userInfo.id
        },
      })
      .then(res => {
        if (res.code == 200) {
          this.getKmRfqList()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
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