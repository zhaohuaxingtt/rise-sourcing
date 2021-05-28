<!--
 * @Author: your name
 * @Date: 2021-05-27 12:32:54
 * @LastEditTime: 2021-05-28 17:03:41
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
        <el-form-item :label="$t('costanalysismanage.Rfqbianhao')">
          <iInput
            v-model="form.rfqNum"
            :placeholder="$t('costanalysismanage.Qingshururfqbianhao')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Rfqzhuangtai')">
          <iSelect
            v-model="form.rfqStatus"
            :placeholder="$t('costanalysismanage.Qingxuanzerfqzhuangtai')"
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
        <el-form-item :label="$t('costanalysismanage.Lingjianhao')">
          <iInput
            v-model="form.partNum"
            :placeholder="$t('costanalysismanage.Qingshurulingjianhao')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Chexingxiangmu')">
          <iSelect
            v-model="form.cartypeProject"
            :placeholder="$t('costanalysismanage.Qingxuanzechexingxiangmu')"
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
            :placeholder="$t('costanalysismanage.Qingshurupca')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Tia')">
          <iInput
            v-model="form.tia"
            :placeholder="$t('costanalysismanage.Qingshurutia')"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('costanalysismanage.Heavyitem')">
          <iSelect
            v-model="form.heavyItem"
            :placeholder="$t('costanalysismanage.Qingxuanzeheavyitem')"
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
            :placeholder="$t('costanalysismanage.Qingxuanzecommodity')"
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
            v-model="form.linie"
            :placeholder="$t('costanalysismanage.Qingxuanzelinie')"
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
    <iCard class="margin-top20" :title="$t('costanalysismanage.Rfqliebiao')">
      <tableList
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading">
        <template #rfqNum="scope">
          <span class="link" @click="jumpRfq(scope.row)">{{ scope.row.rfqNum }}</span>
        </template>
        <template #createDate="scope">
          <span>{{ scope.row.createDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #deadDate="scope">
          <span>{{ scope.row.deadDate | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #techFile="scope">
          <span class="link" @click="download(scope.row)">{{ $t("costanalysismanage.Xiazai") }}</span>
        </template>
        <template #cbd="scope">
            <span class="link" @click="cbd(scope.row)">{{ scope.row.cbd | dateFilter("YYYY-MM-DD") }}</span>
            <div class="attention margin-left4"><span>!</span></div>
        </template>
        <template #analysisReport="scope">
          <icon class="tick link" symbol name="iconbaojiazhuangtailiebiao_yibaojia" @click.native="analysisReport(scope.row)"/>
        </template>
        <template #order="scope">
          <icon class="link" symbol :name="scope.row.order == 1 ? 'iconliebiaoyizhiding' : 'iconliebiaoweizhiding'" @click.native="updateOrder(scope.row)" />
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
    </iCard>
    <!-- 技术资料下载弹窗 -->
    <downloadDialog :dialogVisible='downloadDialogVisible'/>
    <!-- CBD弹窗 -->
    <cbdDialog :dialogVisible='cbdDialogVisible'/>
  </div>
</template>

<script>
import { icon, iSearch, iInput, iSelect, iCard, iPagination } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import downloadDialog from './components/downloadFiles'
import cbdDialog from './components/cbdStatus'
import { tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"

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
      form: {
        rfqNum: "",
        rfqStatus: "",
        partNum: "",
        cartypeProject: "",
        pca: "",
        tia: "",
        heavyItem: "",
        commodity: "",
        linie: ""
      },
      list: [],
      loading: false,
      tableTitle,
      tableListData: [
        {
          rfqNum: "T2234345",
          createDate: 1622184508000,
          deadDate: 1622184508000,
          cbd: 1622184508000,
          analysisReport: 1622184508000,
          order: 1
        }
      ]
    }
  },
  methods: {
    getList() {},
    // 跳转RFQ详情
    jumpRfq(row) {
      window.open(`/#/costanalysismanage/rfqdetail?rfqNum=${ row.rfqNum }`, "_blank")
    },
    // 下载
    download(row) {
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
        query: {}
      })
    },
    // 变更顺序
    updateOrder(row) {
      this.$set(row, "order", row.order ? 0 : 1)
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