<!--
 * @Author: your name
 * @Date: 2021-05-27 12:32:54
 * @LastEditTime: 2021-09-13 14:22:10
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
        <el-form-item :label="language('RFQBIANHAO', 'RFQ编号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURURFQBIANHAO', '请输入RFQ编号')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="language('RFQZHUANGTAI', 'RFQ状态')">
          <iSelect
            v-model="form.rfqStatus"
            :placeholder="language('QINGXUANZERFQZHUANGTAI', '请选择RFQ状态')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item[$i18n.locale]"
              v-for="item in rfqStatusOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iInput
            v-model="form.partNum"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="language('LINGJIANMING', '零件名')">
          <iInput
            v-model="form.partName"
            :placeholder="language('QINGSHURULINGJIANMING', '请输入零件名')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')">
          <iSelect
            v-model="form.carType"
            :placeholder="language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option v-for="item in carTypeOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
        <el-form-item label="PCA">
          <iInput
            v-model="form.pca"
            :placeholder="language('QINGSHURUPCA', '请输入PCA')"
          ></iInput>
        </el-form-item>
        <el-form-item label="TIA">
          <iInput
            v-model="form.tia"
            :placeholder="language('QINGSHURUTIA', '请输入TIA')"
          ></iInput>
        </el-form-item>
        <el-form-item label="Heavy Item">
          <iSelect
            v-model="form.heavyItem"
            :placeholder="language('QINGXUANZEHEAVYITEM', '请选择Heavy Item')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option v-for="item in heavyItemOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
        <el-form-item label="COMMODITY">
          <iSelect
            v-model="form.commodity"
            :placeholder="language('QINGXUANZECOMMODITY', '请选择COMMODITY')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="item in commodityOptions"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="LINIE">
          <iSelect
            v-model="form.linieId"
            :loading="linieLoading"
            :loading-text="language('JIAZAIZHONG', '加载中')"
            :placeholder="language('QINGXUANZELINIE', '请选择LINIE')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="item in linieOptions"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('XIANSHIZIJI', '显示自己')">
          <iSelect
            v-model="form.showSelf"
            :placeholder="language('QINGXUANZELINIE', '请选择')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option :value="true" :label="language('SHI', '是')"></el-option>
            <el-option :value="false" :label="language('FOU', '否')"></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('RFQLIEBIAO', 'RFQ列表')">
      <tableList
        index
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading">
        <template #id="scope">
          <span :class="(scope.row.sendDate)?'link-underline':''" @click="(scope.row.sendDate)?jumpRfq(scope.row):''">{{ scope.row.id }}</span>
        </template>
        <template #createDate="scope">
          <span>{{ scope.row.createDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #currentRoundsEndTime="scope">
          <span>{{ scope.row.currentRoundsEndTime | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #technoMaterial="scope">
          <span class="link-underline" @click="download(scope.row)">{{ language("XIAZAI", "下载") }}</span>
        </template>
        <template #sendDate="scope">
            <span class="link-underline" @click="cbd(scope.row)">{{ scope.row.sendDate | dateFilter("YYYY-MM-DD") }}</span>
            <div v-if="scope.row.sendDate" class="attention margin-left4"><span>!</span></div>
        </template>
        <template #analysisReport="scope">
          <span class="link-underline" @click="analysisReport(scope.row)">{{ scope.row.analysisReport | dateFilter("YYYY-MM-DD") }}</span>
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
    <cbdDialog v-if="cbdDialogVisible" :rfqId='rfqNum' :dialogVisible='cbdDialogVisible'  @changeVisible="changeVisible"/>
  </div>
</template>

<script>
import { icon, iSearch, iInput, iSelect, iCard, iPagination, iMessage } from "rise"
import logButton from "@/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import downloadDialog from './components/downloadFiles'
import cbdDialog from './components/cbdStatus'
import { queryForm, tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getSelectOptions, getKmRfqList, getCommodityOptions, getLinieOptionsByCommodity } from "@/api/costanalysismanage/home"
import {setRfqTop} from '@/api/partsrfq/home/index'
import { selectDictByKeys } from "@/api/dictionary"
import { cloneDeep } from "lodash"
import axios from "axios"

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
      commodityOptions: [],
      linieOptions: [],
      linieLoading: false,
      getLinieOptionsByCommoditySource: null
    }
  },
  created() {
    this.getDict()
    this.getCommodityOptions()
    this.getKmRfqList()
  },
  watch: {
    "form.commodity"(nv) {
      if (nv) {
        this.form.linieId = ""
        this.getLinieOptionsByCommodity(nv)
      } else {
        this.linieOptions = []
      }
    }
  },
  methods: {
    getDict() {
      selectDictByKeys(
        [
          { keys: "HEAVY_ITEM" },
          { keys: "RFQ_STATE" },
          { keys: "CAR_TYPE_PRO" }
        ]
      )
      .then(res => {
        if (res.code == 200) {
          Object.keys(res.data).forEach(key => {
            switch(key) {
              case "HEAVY_ITEM":
                this.heavyItemOptions = res.data["HEAVY_ITEM"].map(item => ({
                  ...item,
                  key: item.code,
                  value: item.code,
                  zh: item.name,
                  en: item.nameEn,
                  de: item.nameDe
                }))
                break
              case "RFQ_STATE":
                this.rfqStatusOptions = res.data["RFQ_STATE"].map(item => ({
                  ...item,
                  key: item.code,
                  value: item.code,
                  zh: item.name,
                  en: item.nameEn,
                  de: item.nameDe
                }))
                break
              case "CAR_TYPE_PRO":
                this.carTypeOptions = res.data["CAR_TYPE_PRO"].map(item => ({
                  ...item,
                  key: item.code,
                  value: item.code,
                  zh: item.name,
                  en: item.nameEn,
                  de: item.nameDe
                }))
                break
              default:
            }
            
          })
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    getCommodityOptions() {
      getCommodityOptions()
      .then(res => {
        if (res.code == 200) {
          this.commodityOptions = res.data.map(item => ({
            key: item.id,
            label: item.nameZh,
            value: item.id,
          }))
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    getLinieOptionsByCommodity(deptId) {
      this.linieLoading = true

      if (this.getLinieOptionsByCommoditySource) this.getLinieOptionsByCommoditySource.cancel()
      this.getLinieOptionsByCommoditySource = axios.CancelToken.source()

      getLinieOptionsByCommodity({ deptId }, { cancelToken: this.getLinieOptionsByCommoditySource.token })
      .then(res => {
        if (res.code == 200) {
          this.linieOptions = res.data.map(item => ({
            key: item.id,
            label: item.nameZh,
            value: item.id,
          }))
        } else {
          this.linieOptions = []
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.linieLoading = false
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
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 查询
    sure() {
      this.page.currPage = 1
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
      const route = this.$router.resolve({
        path: "/costanalysismanage/rfqdetail",
        query: {
          rfqId: row.id
        }
      })
      window.open(route.href, "_blank")
    },
    // 下载
    download(row) {
      console.log(row);
      const { id='' } = row;
      this.rfqNum = id;
      this.downloadDialogVisible = true
    },
    // CBD弹窗
    cbd(row) {
      console.log(row);
      const { id='' } = row;
      this.rfqNum = id;
      this.cbdDialogVisible = true
    },
    // 分析报告
    analysisReport(row) {
      const route = this.$router.resolve({
        path: "/costanalysismanage/costanalysis",
        query: { rfqId: row.id }
      })
      window.open(route.href, "_blank")
    },
    // 变更顺序
    updateOrder(row) {
      // this.$set(row, "recordId", row.recordId ? 0 : 1)
      this.loading = true
      setRfqTop({
          setType: row.recordId ? "0" : "1",
          rfqId: row.id,
          userId: this.userInfo.id
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
      this.rfqNum = null;
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