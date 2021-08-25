<!--
 * @Author: your name
 * @Date: 2021-07-26 16:46:44
 * @LastEditTime: 2021-08-25 14:39:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\components\contentDeclare\index.vue
-->
<template>
  <div class="contentDeclare">
    <iSearch
      class="margin-top25"
      @sure="sure"
      @reset="reset"
      :resetKey="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_RESET"
      :searchKey="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_CONFIRM"
    >
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_INPUT_PARTNUM">
          <iInput
            v-model="form.partNum"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_INPUT_SUPPLIERSAPCODE">
          <iInput
            v-model="form.supplierSapCode"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_CARTYPEPROJECTCODE">
          <iSelect
            multiple
            collapse-tags
            filterable
            reserve-keyword
            size="mini"
            class="multipleSelect"
            v-model="form.cartypeProjectCode"
            :placeholder="language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')"
            :filter-method="$event => selectFilter($event, 'cartypeProjectCode')"
            v-lazy-select="cartypeProjectLazy"
            @change="handleChangeByAll($event, 'cartypeProjectCode')"
            @visible-change="selectVisibleChange($event, 'cartypeProjectCode')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, $index) in carTypeProjectOptions"
              :key="$index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEIRONGZHUANGTAI', '内容状态')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_STATUS">
          <iSelect
            multiple
            collapse-tags
            filterable
            reserve-keyword
            size="mini"
            class="multipleSelect"
            v-model="form.status"
            :placeholder="language('QINGXUANZENEIRONGZHUANGTAI', '请选择内容状态')"
            :filter-method="$event => selectFilter($event, 'status')"
            @change="handleChangeByAll($event, 'status')"
            @visible-change="selectVisibleChange($event, 'status')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in contentStatusOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('MTZXIANGGUAN', 'MTZ相关')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_ISMTZ">
          <iSelect
            filterable
            reserve-keyword
            v-model="form.isMtz"
            :placeholder="language('QINGXUANZEMTZXIANGGUAN', '请选择MTZ相关')"
            :filter-method="$event => selectFilter($event, 'isMtz')"
            @visible-change="selectVisibleChange($event, 'isMtz')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in mtzOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CAIGOUGONGCHANG', '采购工厂')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_PROCUREFACTORY">
          <iSelect
            filterable
            reserve-keyword
            v-model="form.procureFactory"
            :placeholder="language('QINGXUANZECAIGOUGONGCHANG', '请选择采购工厂')"
            :filter-method="$event => selectFilter($event, 'procureFactory')"
            @visible-change="selectVisibleChange($event, 'procureFactory')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in procureFactoryOptiopns"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_INPUT_SUPPLIERNAMEZH">
          <iInput
            v-model="form.supplierNameZh"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('ZHIDINGTOUZICHEXINGXIANGMU', '指定投资⻋型项⽬')" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_INVESTCARTYPEPRO">
          <iSelect
            filterable
            v-model="form.investCarTypePro"
            :placeholder="language('QINGXUANZEZHIDINGTOUZICHEXINGXIANGMU', '请选择指定投资⻋型项⽬')"
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
    <iCard class="margin-top20" :title="language('NEIRONGBIAOTAI', '内容表态')">
      <template v-slot:header-control>
        <iButton v-if="!disabled" :loading="declareToggleLoading" @click="handleDeclareToggle" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_DECLARETOGGLE">{{ language("WUGUANXIANGGUANQIEHUAN", "⽆关相关切换") }}</iButton>
        <iButton v-if="!disabled" :loading="declareResetLoading" @click="handleDeclareReset" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_DECLARERESET">{{ language("BIAOTAICHONGZHI", "表态重置") }}</iButton>
        <iButton v-if="!disabled" disabled v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_GRANTSUPPLIERQUOTATION">{{ language("FAFANGGONGYINGSHANGBAOJIA", "发放供应商报价") }}</iButton>
        <iButton v-if="!disabled" disabled v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_INVESTCARTYPEPRO">{{ language("ZHIDINGTOUZICHEXINGXIANGMU", "指定投资⻋型项⽬") }}</iButton>
        <iButton v-if="!disabled" @click="handleExport" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_EXPORT">
          {{ language("DAOCHU", "导出") }}
          <el-tooltip 
            :content="`${language('LK_AEKO_NEIRONGBIAOTAIDAOCHUTISHI','勾选零件行项目-->导出->批量维护原零件信息-->导入')}`"
            placement="top">
            <i class="el-icon-warning-outline font18 tipsIcon"></i>
          </el-tooltip>
        </iButton>
        <iButton v-if="!disabled" disabled v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_IMPORT">{{ language("DAORU", "导⼊") }}</iButton>
        <iButton v-if="!disabled" :loading="submitLoading" @click="handleSubmit" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_SUBMIT">{{ language("TIJIAO", "提交") }}</iButton>
        <iButton v-if="!disabled" disabled v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_RECALL">{{ language("CHEHUI", "撤回") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          fixed
          v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_TABLE"
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #oldPartNumPreset="scope">
            <iInput v-if="scope.row.status === 'EMPTY' && !isDeclareBlackListPart(scope.row) && !disabled" class="oldPartNumPresetQuery" :class="{ oldPartNumPreset: !scope.row.isDeclare }" :placeholder="language('QINGXUANZE', '请选择')" v-model="scope.row.oldPartNumPreset" readonly>
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" class="oldPartNumPresetIcon" @click.native="oldPartNumPresetSelect(scope.row)" />
              </div>
            </iInput>
            <iInput v-else v-model="scope.row.oldPartNumPreset" class="inputClass" :class="{ oldPartNumPreset: !scope.row.isDeclare }" :placeholder="language('QINGXUANZE', '请选择')" readonly></iInput>
          </template>
          <template #dosage="scope">
            <span class="link-underline" @click="viewDosage(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #quotation="scope">
            <span class="link-underline-disabled" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #priceAxis="scope">
            <span class="link-underline-disabled" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #investCarTypePro="scope">
            <iSelect
              v-model="scope.row.investCarTypePro"
              :disabled="disabled"
              :placeholder="language('QINGXUANZE', '请选择')"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in options"
                :key="item.key"
              ></el-option>
            </iSelect>
          </template>
          <template #isMtz="scope">
            <span v-if="scope.row.isMtz == 1" class="link-underline-disabled" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, init)"
          @current-change="handleCurrentChange($event, init)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
    <dosageDialog :visible.sync="dosageDialogVisible" :aekoInfo="aekoInfo" :objectAekoPartId="currentRow.objectAekoPartId" @update="init" />
  </div>
</template>

<script>
import { iSearch, iInput, iSelect, iCard, iButton, icon, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import dosageDialog from "../dosageDialog"
import { contentDeclareQueryForm, mtzOptions, contentDeclareTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
import { excelExport } from "@/utils/filedowLoad"
import { getAekoLiniePartInfo, patchAekoReference, patchAekoReset, patchAekoContent } from "@/api/aeko/detail"
import { getDictByCode } from "@/api/dictionary"
import { searchCartypeProject } from "@/api/aeko/manage"
import { procureFactorySelectVo } from "@/api/dictionary"
import { cloneDeep, chunk, debounce } from "lodash"

// const printTableTitle = tableTitle.filter(item => item.props !== "dosage" && item.props !== "quotation" && item.props !== "priceAxis")


export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, icon, iPagination, tableList, dosageDialog },
  mixins: [ pageMixins ],
  props: {
    aekoInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    disabled() {
      return this.aekoInfo.aekoStatus == "CANCELED"
    }
  },
  data() {
    return {
      form: cloneDeep(contentDeclareQueryForm),
      carTypeProjectOptions: [],
      carTypeProjectOptionsCache: [],
      carTypeProjectOptionsCacheChunks: [],
      carTypeProjectOptionsFilterCache: [],
      cartypeProjectCurrentPage: 1,
      contentStatusOptions: [],
      contentStatusOptionsCache: [],
      mtzOptions,
      procureFactoryOptiopns: [],
      procureFactoryOptiopnsCache: [],
      options: [],
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      declareToggleLoading: false,
      declareResetLoading: false,
      currentRow: {},
      dosageDialogVisible: false,
      submitLoading: false,
      debouncer: null
    };
  },
  created() {
    this.searchCartypeProject()
    this.getDictByCode()
    this.procureFactorySelectVo()

    if (sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)) {
      try {
        const aekoConatentDeclareParams = JSON.parse(sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`))

        this.form = aekoConatentDeclareParams.form
        // this.page.currPage = aekoConatentDeclareParams.currPage
        // this.page.pageSize = aekoConatentDeclareParams.pageSize
      } catch(e) {
        console.error(e)
      }
    }
  },
  methods: {
    searchCartypeProject() {
      searchCartypeProject()
      .then(res => {
        if (res.code == 200) {
          this.carTypeProjectOptionsCache = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.code,
              label: item.name,
              value: item.code,
              lowerCaseLabel: typeof item.name === "string" ? item.name.toLowerCase() : item.name
            })) :
            []

          this.carTypeProjectOptionsFilterCache = this.carTypeProjectOptionsCache
          this.carTypeProjectOptionsCacheChunks = chunk(this.carTypeProjectOptionsCache, 20)
          this.carTypeProjectOptions = this.carTypeProjectOptionsCacheChunks[0] || []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },
    getDictByCode() {
      getDictByCode("CONTENT_STATUS")
      .then(res => {
        if (res.code == 200) {
          this.contentStatusOptionsCache = 
            Array.isArray(res.data) && res.data[0] && Array.isArray(res.data[0].subDictResultVo) ?
            res.data[0].subDictResultVo.map(item => ({
              key: item.code,
              label: item.name,
              value: item.code,
              lowerCaseLabel: typeof item.name === "string" ? item.name.toLowerCase() : item.name
            })) :
            []
          this.contentStatusOptionsCache.unshift({
            key: "EMPTY",
            label: "(空)",
            value: "EMPTY",
            lowerCaseLabel: "(空)"
          })

          this.contentStatusOptions = this.contentStatusOptionsCache
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    procureFactorySelectVo() {
      procureFactorySelectVo()
      .then(res => {
        if (res.code == 200) {
          this.procureFactoryOptiopnsCache = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.code,
              label: item.name,
              value: item.code,
              lowerCaseLabel: typeof item.name === "string" ? item.name.toLowerCase() : item.name
            })) :
            []

          this.procureFactoryOptiopns = this.procureFactoryOptiopnsCache
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    handleChangeByAll(value, key) {
      if (!value[value.length - 1]) {
        this.$set(this.form, key, [""])
      } else {
        this.$set(this.form, key, this.form[key].filter(item => item || item === 0))
      }
    },
    init() {
      this.loading = true

      const form = {}
      Object.keys(this.form).forEach(key => form[key] = typeof this.form[key] === "string" ? this.form[key].trim() : this.form[key])
      
      getAekoLiniePartInfo({
        ...form,
        requirementAekoId: this.aekoInfo.requirementAekoId,
        cartypeProjectCode: Array.isArray(this.form.cartypeProjectCode) ? (this.form.cartypeProjectCode.length === 1 && this.form.cartypeProjectCode[0] === "" ? null : this.form.cartypeProjectCode) : null,
        status: Array.isArray(this.form.status) ? (this.form.status.length === 1 && this.form.status[0] === "" ? null : this.form.status) : null,
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
    sure() {
      // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
      if(this.form.partNum && this.form.partNum.trim().length < 9){
        return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
      }

      this.page.currPage = 1
      this.init()
    },
    reset() {
      this.page.currPage = 1
      this.form = cloneDeep(contentDeclareQueryForm)
      this.sure()
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 查看装⻋率/每⻋⽤量
    viewDosage(row) {
      this.currentRow = row
      this.dosageDialogVisible = true
    },
    view() {},
    oldPartNumPresetSelect(row) {
      // if (!row.oldPartNumPreset) return

      const query = {
        requirementAekoId: this.aekoInfo.requirementAekoId,
        objectAekoPartId: row.objectAekoPartId,
        oldPartNumPreset: typeof row.oldPartNumPreset === "string" && row.oldPartNumPreset.trim()
      }

      if (!query.oldPartNumPreset) delete query.oldPartNumPreset

      this.$router.push({
        path: "/aeko/quondampart",
        query
      })
    
      sessionStorage.setItem(`aekoConatentDeclareParams_${ this.aekoInfo.requirementAekoId }`, JSON.stringify({
        form: this.form,
        requirementAekoId: this.aekoInfo.requirementAekoId,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        currentTab: "contentDeclare"
      }))
    },
    // 相关无关切换
    handleDeclareToggle() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOQIEHUANBIAOTAIDELINGJIAN", "请选择需要切换表态的零件"))

      if (!this.multipleSelection.every(item => item.status === "TOBE_STATED" || item.status === "QUOTING" || item.status === "QUOTED")) return iMessage.warn(this.language("QINGXUANZENEIRONGZHUANGTAIWEIDBYDELINGJIANJINXINGQIEHUAN", "请选择内容状态为待表态、报价中、已报价的零件进行切换"))

      this.declareToggleLoading = true

      patchAekoReference({
        requirementAekoId: this.aekoInfo.requirementAekoId,
        objectAekoPartId: this.multipleSelection.map(item => item.objectAekoPartId)
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.init()
        } else {
          iMessage.error(message)
        }

        this.declareToggleLoading = false
      })
      .catch(() => this.declareToggleLoading = false)
    },
    // 表态重置
    async handleDeclareReset() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOCHONGZHIBIAOTAIDELINGJIAN", "请选择需要重置表态的零件"))

      if (!this.multipleSelection.every(item => item.status === "TOBE_STATED" || item.status === "QUOTING" || item.status === "QUOTED")) return iMessage.warn(this.language("QINGXUANZENEIRONGZHUANGTAIWEIDBYDELINGJIANJINXINGCHONGZHI", "请选择内容状态为待表态、报价中、已报价的零件进行重置"))

      await this.$confirm(this.language('DECLARERESETTIPS','该行表态内容会被重置，请确认'))

      this.declareResetLoading = true

      patchAekoReset({
        requirementAekoId: this.aekoInfo.requirementAekoId,
        objectAekoPartId: this.multipleSelection.map(item => item.objectAekoPartId)
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.init()
        } else {
          iMessage.error(message)
        }

        this.declareResetLoading = false
      })
      .catch(() => this.declareResetLoading = false)
    },
    // 导出
    handleExport() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAODAOCHUDEYUANLINGJIAN", "请选择需要导出的原零件"))
      let printTableTitle = tableTitle.filter(item => item.isExport);
      let oldPartIndex = 0;
      
      
      printTableTitle.map((item,index)=>{
        // 原零件号(系统预设)
        if(item.props == 'oldPartNumPreset'){
          item.name = '原零件号(系统预设)';
          oldPartIndex= index;
        }
      })

      // 原零件号 需用户自己填写
        printTableTitle.splice(oldPartIndex+1,0,{
          props:'oldPart',
          name:'原零件号'
        })
        
        // 零件行项目ID 
        printTableTitle.unshift(({
          props:'objectAekoPartId',
          name:'零件行项目ID'
        }))

      excelExport(this.multipleSelection, printTableTitle)
    },
    // 提交
    handleSubmit() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOTIJIAOBIAOTAIDELINGJIAN", "请选择需要提交表态的零件"))

      for (let i = 0, item; (item = this.multipleSelection[i++]); ) {
        if (item.status !== "TOBE_STATED" && item.status !== "QUOTING" && item.status !== "QUOTED")
          return iMessage.warn(this.language("QINGXUANZENEIRONGZHUANGTAIWEIDBYDELINGJIANJINXINGTIJIAO", "请选择内容状态为待表态、报价中、已报价的零件进行提交"))
      }

      this.submitLoading = true

      patchAekoContent({
        requirementAekoId: this.aekoInfo.requirementAekoId,
        objectAekoPartId: this.multipleSelection.map(item => item.objectAekoPartId)
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.init()
        } else {
          iMessage.error(message)
        }

        this.submitLoading = false
      })
      .catch(() => this.submitLoading = false)
    },
    selectFilter(value, key) {
      if (this.debouncer && typeof this.debouncer.cancel === "function") this.debouncer.cancel()
      
      this.debouncer = debounce(() => {
        let _value = typeof value === "string" ? value.trim().toLowerCase() : _value

        switch(key) {
          case "cartypeProjectCode":
            if (_value) {
              this.carTypeProjectOptionsFilterCache = this.carTypeProjectOptionsCache.filter(item => item.lowerCaseLabel.includes(_value))
              this.carTypeProjectOptionsCacheChunks = chunk(this.carTypeProjectOptionsFilterCache, 20)
            } else {
              this.carTypeProjectOptionsFilterCache = this.carTypeProjectOptionsCache
              this.carTypeProjectOptionsCacheChunks = chunk(this.carTypeProjectOptionsCache, 20)
            }

            this.cartypeProjectCurrentPage = 1
            this.carTypeProjectOptions = this.carTypeProjectOptionsCacheChunks[0] || []
            break
          case "status":
            if (_value) {
              this.contentStatusOptions = this.contentStatusOptionsCache.filter(item => item.lowerCaseLabel.includes(_value))
            } else {
              this.contentStatusOptions = this.contentStatusOptionsCache
            }
            break
          case "isMtz":
            if (_value) {
              this.mtzOptions = mtzOptions.filter(item => item.label.includes(_value))
            } else {
              this.mtzOptions = mtzOptions
            }
            break
          case "procureFactory":
            if (_value) {
              this.procureFactoryOptiopns = this.procureFactoryOptiopnsCache.filter(item => item.lowerCaseLabel.includes(_value))
            } else {
              this.procureFactoryOptiopns = this.procureFactoryOptiopnsCache
            }
            break
          default:
        }
      }, 400)
      this.debouncer()
    },
    selectVisibleChange(visible, key) {
      switch(key) {
        case "cartypeProjectCode":
          if (!visible) {
            this.carTypeProjectOptionsFilterCache = this.carTypeProjectOptionsCache
            this.carTypeProjectOptionsCacheChunks = chunk(this.carTypeProjectOptionsCache, 20)
          }

          this.carTypeProjectOptions = this.carTypeProjectOptionsCacheChunks[0] || []
          this.cartypeProjectCurrentPage = 1
        break
        case "status":
          if (!visible) {
            this.contentStatusOptions = this.contentStatusOptionsCache
          }
        break
        case "isMtz":
          if (!visible) {
            this.mtzOptions = mtzOptions
          }
        break
        case "procureFactory":
          if (!visible) {
            this.procureFactoryOptiopns = this.procureFactoryOptiopnsCache
          }
        break
        default:
      }
    },
    cartypeProjectLazy() {
      if (this.carTypeProjectOptions.length < this.carTypeProjectOptionsFilterCache.length) {
        this.cartypeProjectCurrentPage += 1
        this.carTypeProjectOptions = this.carTypeProjectOptions.concat(this.carTypeProjectOptionsCacheChunks[this.cartypeProjectCurrentPage - 1])
      }
    },
    isDeclareBlackListPart(part) {
      // return part.changeType === "M" || part.changeType === "I" || part.changeType === "U"
      return false // 取消黑名单限制
    }
  },
};
</script>

<style lang="scss" scoped>
.contentDeclare {
  .multipleSelect {
    ::v-deep .el-tag {
      position: relative;

      &:last-of-type {
        padding-right: 5px;
      }

      &:first-of-type {
        padding-right: 10px;
      }

      .el-select__tags-text {
        display: inline-block;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .el-tag__close {
        top: -25%;
      }
    }
  }

  .oldPartNumPresetQuery {
    ::v-deep input {
      caret-color: rgb(96, 98, 102);
    }

    .oldPartNumPresetIcon {
      cursor: pointer;

      ::v-deep .el-input__suffix {
        right: 0;
      }
    }
    
    ::v-deep .el-input__suffix-inner {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
    }
  }

  .oldPartNumPreset {
    ::v-deep input {
      color: #c7c7c7;
    }
  }

  .inputClass {
    ::v-deep input {
      color: #000;
    }
  }

  ::v-deep .el-input__suffix {
    .el-input__suffix-inner {
      height: 100% !important;
    }

    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;

      .icon {
        height: 100% !important;
      }
    }
  }
  .tipsIcon{
    transform: rotate(180deg);
  }
}
</style>