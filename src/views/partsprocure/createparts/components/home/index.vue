<!--
 * @Author: your name
 * @Date: 2021-05-24 17:06:01
 * @LastEditTime: 2021-06-02 13:55:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createparts\components\home\index.vue
-->
<template>
  <div class="home">
    <div class="control">
      <logButton class="margin-left20" @click="log" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>
    <iSearch
      class="margin-top65"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSPROCURE_RESET"
      :searchKey="PARTSPROCURE_CONFIRM"
      :icon="true"
    >
      <el-form>
        <el-form-item :label="$t('createparts.LingJianHao')">
          <iInput :placeholder="$t('createparts.QingShuRuLingJianHao')" v-model="form.partNum" />
        </el-form-item>
        <el-form-item :label="$t('createparts.LingJianMingZhong')">
          <iInput :placeholder="$t('createparts.QingShuRuLingJianMingZhong')" v-model="form.partNameZh" />
        </el-form-item>
        <el-form-item :label="$t('createparts.LingJianMingDe')">
          <iInput :placeholder="$t('createparts.QingShuRuLingJianMingDe')" v-model="form.partNameDe" />
        </el-form-item>
        <el-form-item :label="$t('createparts.LingJianZhuangTai')">
          <iSelect :placeholder="$t('createparts.QingXuanZeLingJianZhuangTai')" v-model="form.partStatus">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option v-for="item in dictMap.PART_STATE" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('createparts.LingJianLaiYuan')">
          <iSelect :placeholder="$t('createparts.QingXuanZeLingJianLaiYuan')" v-model="form.source">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option v-for="item in dictMap.SOURCE_OF_PART" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton :loading="createPartsLoading" @click="createParts">{{ $t("createparts.ChuangJianCaiGouXiangMu") }}</iButton>
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
          <template #date="scope">
            <span>{{ scope.row.date | dateFilter("YYYY-MM-DD") }}</span>
          </template>
          <template #log="scope">
            <span class="link" @click="log(scope.row)">{{ $t("createparts.ChaKan") }}</span>
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
  </div>
</template>

<script>
import { icon, iSearch, iInput, iSelect, iCard, iButton, iPagination, iMessage } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList";
import { tableTitle, queryForm } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getParts, createParts } from "@/api/partsprocure/editordetail"
import { selectDictByKeys } from "@/api/dictionary"
import { cloneDeep } from "lodash"

export default {
  components: { 
    icon, 
    iSearch, 
    iInput, 
    iSelect, 
    iCard, 
    iButton,
    iPagination,
    logButton,
    tableList
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      dictMap: {
        PART_STATE: [],
        SOURCE_OF_PART: []
      },
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      createPartsLoading: false
    }
  },
  created() {
    this.getDict()
    this.getParts()
  },
  methods: {
    getDict() {
      selectDictByKeys(
        [
          { keys: "PART_STATE" },
          { keys: "SOURCE_OF_PART" }
        ]
      )
      .then(res => {
        if (res.code == 200) {
          this.dictMap = {}
          Object.keys(res.data).forEach(key => {
            this.$set(this.dictMap, key, res.data[key].map(item => ({
              ...item,
              key: item.code,
              value: item.code,
              zh: item.name,
              en: item.nameEn,
              de: item.nameDe
            })))
          })
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    sure() {
      this.getParts()
    },
    reset() {
      this.form = cloneDeep(queryForm)
      this.getParts()
    },
    getParts() {
      this.loading = true

      getParts({
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize
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
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 创建采购项⽬
    createParts() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.$t("createparts.QingXuanZeZhiShaoYiTiaoShuJu"))

      this.createPartsLoading = true

      createParts({
        manuallyCreatePartProjectDTOList: this.multipleSelection.map(item => ({
          carTypeProjectNum: item.carTypeProjectNum,
          partNum: item.partNum,
          partProjectType: item.partType,
          status: item.partStatus
        }))
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)

          if (this.multipleSelection.length == 1) {
            console.log(1)
          } else {
            console.log(1)
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.createPartsLoading = false
      })
      .catch(() => this.createPartsLoading = false)
    },
    // 查看操作日志
    log(row) {

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
}
</style>