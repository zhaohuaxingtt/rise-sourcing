<!--
 * @Author: your name
 * @Date: 2021-07-26 16:46:44
 * @LastEditTime: 2021-11-05 21:43:20
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\detail\components\contentDeclare\index.vue
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
        <el-form-item :label="language('LINGJIANHAO', '零件号')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_INPUT_PARTNUM|零件号">
          <iInput
            v-model="form.partNum"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_INPUT_SUPPLIERSAPCODE|供应商编号">
          <iInput
            v-model="form.supplierSapCode"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="showCarTypeLabel" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_CARTYPEPROJECTCODE|车型项目">
          <iSelect
            multiple
            collapse-tags
            filterable
            reserve-keyword
            size="mini"
            class="multipleSelect"
            v-model="form.cartypeProjectCode"
            :placeholder="language('partsprocure.CHOOSE','请选择')"
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
        <el-form-item :label="language('NEIRONGZHUANGTAI', '内容状态')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_STATUS|内容状态">
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
        <el-form-item :label="language('MTZXIANGGUAN', 'MTZ相关')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_ISMTZ|MTZ相关">
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
        <el-form-item :label="language('LK_CAIGOUGONGCHANG', '采购工厂')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_PROCUREFACTORY|采购工厂">
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
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_INPUT_SUPPLIERNAMEZH|供应商简称">
          <iInput
            v-model="form.supplierNameZh"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('ZHIDINGTOUZICHEXINGXIANGMU', '指定投资⻋型项⽬')" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_SELECT_INVESTCARTYPEPRO|指定投资车型项目">
          <iSelect
            collapse-tags 
            filterable
            multiple
            clearable
            reserve-keyword
            v-model="form.investCarTypePros"
            :placeholder="language('QINGXUANZEZHIDINGTOUZICHEXINGXIANGMU', '请选择指定投资⻋型项⽬')"
            @change="handleChangeByAll($event, 'investCarTypePros')"
            @visible-change="selectVisibleChange($event, 'investCarTypePros')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item"
              :label="item"
              v-for="(item,index) in investCarTypeProOptions"
              :key="item+index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('NEIRONGBIAOTAI', '内容表态')">
      <template v-slot:header-control>
        <iButton v-if="!disabled && !cantBeCombine" :loading="declareToggleLoading" @click="combine" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_COMBINE|组合">
          {{ language("nominationSuggestion_ZuHe", "组合") }}
          <el-tooltip effect="light" popper-class="custom-card-tooltip" :content="language('LK_AEKONEIRONGZUHECOMMENTS','多变一或多变多组合操作，用于系统计算封面表态的单车成本变化。')" placement="top">
            <i class="el-icon-warning-outline bule iconSuffix"></i>
          </el-tooltip>
        </iButton>
        <iButton v-if="!disabled && cantBeCombine" @click="cancelCombination" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_CANCELCOMBINE|取消组合">{{language("nominationSuggestion_QuXiaoZuHe", "取消组合")}}</iButton>


        <iButton v-if="!disabled" :loading="declareToggleLoading" @click="handleDeclareToggle" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_DECLARETOGGLE|无关相关切换">{{ language("WUGUANXIANGGUANQIEHUAN", "⽆关相关切换") }}</iButton>
        <iButton v-if="!disabled" :loading="declareResetLoading" @click="handleDeclareReset" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_DECLARERESET|表态重置">{{ language("AEKO_YUANLINGJIANHAOCHONGZHI", "原零件号重置") }}</iButton>
        <iButton v-if="!disabled" :loading="declareSendSupplier" @click="sendSupplierPrice"  v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_GRANTSUPPLIERQUOTATION|发放供应商报价">{{ language("FAFANGGONGYINGSHANGBAOJIA", "发放供应商报价") }}</iButton>
        <iButton v-if="!disabled" @click="goToinvestCarTypePro" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_INVESTCARTYPEPRO|指定投资车型项目">{{ language("ZHIDINGTOUZICHEXINGXIANGMU", "指定投资⻋型项⽬") }}</iButton>
        <iButton v-if="!disabled" @click="handleExport" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_EXPORT|导出">
          {{ language("DAOCHU", "导出") }}
          <el-tooltip 
            effect="light" 
            popper-class="custom-card-tooltip"
            :content="`${language('LK_AEKO_NEIRONGBIAOTAIDAOCHUTISHI','勾选零件行项目-->导出->批量维护原零件信息-->导入')}`"
            placement="top">
            <i class="el-icon-warning-outline font18 tipsIcon"></i>
          </el-tooltip>
        </iButton>
        <span class="margin-left5 margin-right5" v-if="!disabled" v-permission.atuo="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_IMPORT|导入">
          <Upload 
            hideTip
            :buttonText="language('DAORU','导⼊')"
            :request="importItemExcel"
            :onHttpUploaded="onHttpUploaded"
            :accept="'.xlsx,.xls'"
          />
        </span>
        <iButton v-if="!disabled" :loading="submitLoading" @click="handleSubmit" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_SUBMIT|提交">{{ language("TIJIAO", "提交") }}</iButton>
        <iButton v-if="!disabled" :loading="cancelLoading" @click="cancelContent" v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_BUTTON_RECALL|撤回">
          {{ language("CHEHUI", "撤回") }}
          <el-tooltip 
            effect="light" 
            popper-class="custom-card-tooltip"
            :content="`${language('LK_AEKO_TIPS_ZHIZHENDUINEIRONGCHEHUI_CAOZUO','审批前，可对已提交的单据进行撤回。此处只针对内容撤回，如需撤回封面表态，请在封面表态中操作【撤回】')}`"
            placement="top">
            <i class="el-icon-warning-outline font18 tipsIcon"></i>
          </el-tooltip>
          </iButton>
      </template>
      <div class="body">
        <!-- 列隐藏显示 -->
        <p class="flex-align-center margin-bottom20">
          <span class="margin-right10">{{language('LK_AEKO_CONTENTDECLARE_LIEYINCANGXIANSHI','列隐藏/显示')}}:</span>
          <iSelect
            style="width: 200px;"
            collapse-tags
            multiple
            clearable
            v-model="addTableTitle"
            :placeholder="language('partsprocure.CHOOSE','请选择')"
            @change="handleChangeTable"
          >
            <el-option
                v-for="(item,index) in showLineList || []"
                :key="'showLineList_'+index"
                :label="language(item.key,item.name)"
                :value="item.props"
                >
              </el-option> 
          </iSelect>
        </p>
        <tableList
          class="table"
          index
          fixed
          v-permission.auto="AEKO_AEKODETAIL_CONTENTDECLARE_TABLE|内容表态表单"
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :span-method="spanMethod"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #groupName="scope">
            <div class="aeko-combine-input" v-if="scope.row.groupCode">
              <iInput type="textarea" v-if="!disabled" :placeholder="language('LK_QINGSHURU', '请输入')" @blur="updateGroupName(scope.row)" v-model="scope.row.groupName">
              </iInput>
              <span v-else>{{scope.row.groupName}}</span>
            </div>
          </template>
          <template #oldPartNumPreset="scope">
            <iInput v-if="scope.row.status === 'EMPTY'||scope.row.status === 'TOBE_STATED' && !isDeclareBlackListPart(scope.row) && !disabled" class="oldPartNumPresetQuery" :class="{ oldPartNumPreset: !scope.row.isDeclare }" :placeholder="language('QINGXUANZE', '请选择')" v-model="scope.row.oldPartNumPreset" readonly>
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" class="oldPartNumPresetIcon" @click.native="oldPartNumPresetSelect(scope.row)" />
              </div>
            </iInput>
            <iInput v-else v-model="scope.row.oldPartNumPreset" class="inputClass" :class="{ oldPartNumPreset: !scope.row.isDeclare }" :placeholder="language('QINGXUANZE', '请选择')" readonly></iInput>
          </template>
          <template #dosage="scope">
            <span v-if="scope.row.status !='EMPTY'" class="link-underline" @click="viewDosage(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #quotationId="scope">
            <span v-if="scope.row.quotationId" class="link-underline" @click="jumpQuotation(scope.row)">{{ language("AEKO_CONTENT_BAOJIA", "报价") }}</span>
          </template>
          <!-- 模具投资变动 -->
          <template #mouldPriceChange="scope">
            <span>{{scope.row.mouldPriceChange | thousandsFilter}}</span>
          </template>
          <!-- 价格轴 -->
          <template #priceAxis="scope">
            <!-- -disabled -->
            <span v-if="scope.row.quotationId" class="link-underline" @click="showPriceAxis(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #investCarTypePro="scope">
            <iSelect
              v-model="scope.row.investCarTypePro"
              :disabled="disabledInvestCarTypePro(scope.row)"
              :placeholder="language('QINGXUANZE', '请选择')"
              @change="handleChangeCarInvestProjects($event, scope.row)"
            >
              <el-option
                :value="item"
                :label="item"
                v-for="item in (scope.row.carInvestProjects || [])"
                :key="item"
              ></el-option>
            </iSelect>
          </template>
          <template #isMtz="scope">
            <span v-if="scope.row.isMtz == 1" class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <!-- 是否待报价 -->
          <template #isReplace="scope">
            <span v-if="scope.row.isReplace!==null">{{scope.row.isReplace ? language('nominationLanguage.Yes','是')  : language('nominationLanguage.No','否')}}</span>
          </template>
          <!-- 合并原承运方式和新承运方式 -->
          <template #tranWayDesc="scope">
            <span>{{getRranWayDesc(scope.row)}}</span>
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
    <!-- 指定投资⻋型项⽬ -->
    <investCarTypeProDialog v-if="investCarTypeProVisible" :multipleSelection="multipleSelection" :dialogVisible="investCarTypeProVisible" @changeVisible="changeVisible" @refresh="init"/>
    <!-- 价格轴 -->
    <priceAxisDialog v-if="priceAxisVisible" :dialogVisible="priceAxisVisible" :priceAxisRow="priceAxisRow" @changeVisible="changeVisible"/>
  </div>
</template>

<script> 
import { iSearch, iInput, iSelect, iCard, iButton, icon, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import dosageDialog from "../dosageDialog"
import { contentDeclareQueryForm, mtzOptions, contentDeclareTableTitle as tableTitle,hidenTableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
// import { excelExport } from "@/utils/filedowLoad"
import { getAekoLiniePartInfo, patchAekoReference, patchAekoReset, patchAekoContent,sendSupplier,liniePartExport,sendSupplierCheck,cancelContent,updateInvestCarProject,searchInvestCar,importItemExcel } from "@/api/aeko/detail"
import { getDictByCode } from "@/api/dictionary"
// import { searchCartypeProject } from "@/api/aeko/manage"
import { partListGetCartype } from "@/api/aeko/detail/partsList.js"
import { procureFactorySelectVo } from "@/api/dictionary"
import { cloneDeep, chunk, debounce } from "lodash"

import investCarTypeProDialog from './components/investCarTypeProDialog' 
import priceAxisDialog from './components/priceAxisDialog' 

// 组合相关功能
import {combine} from './mixins/combine'


import Upload from '@/components/Upload'

import filters from "@/utils/filters"

import { setLogModule } from "@/utils";


// const printTableTitle = tableTitle.filter(item => item.props !== "dosage" && item.props !== "quotation" && item.props !== "priceAxis")


export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, icon, iPagination, tableList, dosageDialog,investCarTypeProDialog,priceAxisDialog,Upload },
  mixins: [ pageMixins, combine ],
  props: {
    aekoInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    disabled() {
      // AEKO状态为撤销以及从AEKO查看跳转过来的
      const {query} = this.$route;
      const {from=''} = query;
      return this.aekoInfo.aekoStatus == "CANCELED"  || from == 'check';
    },
    // 判断展示车型还是车型项目 展示label
    showCarTypeLabel(){
      const {aekoInfo={}} = this;
      if(aekoInfo.aekoType == 'AeA'){  // 车型
        return this.language('LK_AEKO_CHEXING', '车型')
      }else{ // 车型项目
        return this.language('CHEXINGXIANGMU', '车型项目')
      }
    },
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
      investCarTypeProOptions: [],
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      declareToggleLoading: false,
      declareResetLoading: false,
      currentRow: {},
      dosageDialogVisible: false,
      investCarTypeProVisible: false,
      priceAxisVisible: false,
      priceAxisRow:{},
      submitLoading: false,
      debouncer: null,
      declareSendSupplier:false,
      cancelLoading:false,
      showLineList:hidenTableTitle,
      addTableTitle:[],
      importItemExcel:importItemExcel,
    };
  },
  created() {
    setLogModule('AEKO表态-详情页-内容表态')
    this.searchCartypeProject()
    this.getDictByCode()
    this.procureFactorySelectVo()
    this.getSearchInvestCar()

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

    const {query} = this.$route;
    const {from=''} = query;
    // AEKO查看跳转过来的数据table的新承运方式和原承运方式合并成一列
    if(from == 'check'){
      this.tableTitle = tableTitle.filter((item)=>item.props!='originBnkTranWayDesc' && item.props!='newBnkTranWayDesc')
    }else{
      this.tableTitle = tableTitle.filter((item)=>item.props!='tranWayDesc')
    }
    
  },
  methods: {
    searchCartypeProject() {
      const {query} = this.$route;
      const { requirementAekoId ='',} = query;
      partListGetCartype(requirementAekoId)
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
    // 获取投资车型项目下拉
    async getSearchInvestCar(){
      const requirementAekoId = this.$route.query.requirementAekoId;
      await searchInvestCar(requirementAekoId).then((res)=>{
        if(res.code == 200){
          this.investCarTypeProOptions = res.data || [];
        }
      })
    },
    init() {
      this.loading = true

      const form = {}
      Object.keys(this.form).forEach(key => form[key] = typeof this.form[key] === "string" ? this.form[key].trim() : this.form[key])


      // 零件号需要单独处理下  根据逗号和空格拆成List
      const {partNum=''} = form;
      let newPartNum = partNum=='' ? [] : partNum.split(/[ ,，]+/);
      
      getAekoLiniePartInfo({
        ...form,
        partNum:newPartNum,
        requirementAekoId: this.aekoInfo.requirementAekoId,
        cartypeProjectCode: Array.isArray(this.form.cartypeProjectCode) ? (this.form.cartypeProjectCode.length === 1 && this.form.cartypeProjectCode[0] === "" ? null : this.form.cartypeProjectCode) : null,
        investCarTypePros: Array.isArray(this.form.investCarTypePros) ? (this.form.investCarTypePros.length === 1 && this.form.investCarTypePros[0] === "" ? null : this.form.investCarTypePros) : null,
        status: Array.isArray(this.form.status) ? (this.form.status.length === 1 && this.form.status[0] === "" ? null : this.form.status) : null,
        current: this.page.currPage,
        size: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.tableListData.map(o => {
            // 分组管理需要备份原始分组名称
            o.groupNameBak = o.groupName
            return
          })
          this.page.totalCount = res.total || 0
          this.rowspan(this.tableListData)
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
    jumpQuotation(row){
      const { quotationId="" } = row;
      let { quotationFrom="" } = row; // 有quotationFrom则是绑定报价单，不能编辑
      const route = this.$router.resolve({
        path: '/aeko/quotationdetail',
        query: {
          quotationId: quotationFrom || quotationId,
          editDisabled: !['TOBE_STATED','QUOTING','QUOTED','REJECT'].includes(row.status) || (quotationFrom?true:false)
        }
      })

      window.open(route.href, "_blank")
    },
    // 查看mtz变更
    view(row) {
      this.$router.push({name: 'aekoMtzDetails', query: {
        objectAekoPartId: row.objectAekoPartId,
        aekoNum: this.aekoInfo.aekoCode
      }})
    },
    oldPartNumPresetSelect(row) {
      // if (!row.oldPartNumPreset) return
      // 如果是从AEKO查看跳转过来的 不允许跳转
      const routeQuery = this.$route.query;
      const {from=''} = routeQuery;
      if(from == 'check') return;

      const query = {
        partNum: row.partNum,
        isDeclare: row.isDeclare, // 0: 预设原零件，1: 选择的原零件
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

      // if (!this.multipleSelection.every(item => item.status === "TOBE_STATED" || item.status === "QUOTING" || item.status === "QUOTED")) return iMessage.warn(this.language("QINGXUANZENEIRONGZHUANGTAIWEIDBYDELINGJIANJINXINGQIEHUAN", "请选择内容状态为待表态、报价中、已报价的零件进行切换"))

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
      if (!this.multipleSelection.length) return iMessage.warn(this.language("AEKO_QINGXUANZEYAODAOCHUDELINGJIANHANGXIANGMU", "请选择要导出的零件行项目!"))
      const ids = this.multipleSelection.map((item)=>item.objectAekoPartId);
      liniePartExport({ids});
      // let printTableTitle = tableTitle.filter(item => item.isExport);
      // let oldPartIndex = 0;
      // const {multipleSelection=[],aekoInfo={}} = this;

      // const selectionList = cloneDeep(multipleSelection);

      
      // selectionList.map((item)=>{
      //   // 原零件号加个“请填写”
      //   item.oldPart = '请填写';
      //   // 供应商SAP号若没有值填充“请填写”
      //   if(item.supplierSapCode == ''){
      //     item.supplierSapCode = "请填写";
      //   }
      // });
      
      
      // printTableTitle.map((item,index)=>{
      //   // 原零件号(系统预设)
      //   if(item.props == 'oldPartNumPreset'){
      //     item.name = '原零件号(系统预设)';
      //     oldPartIndex= index;
      //   }

      //   // 判断下AEKO类型是Aeko/MP导出列显示列显示车型项目  AeA时导出列显示车型
      //   if(item.props == 'cartypeZh'){
      //     if(aekoInfo && aekoInfo.aekoType ){
      //         if(aekoInfo.aekoType == 'AeA'){  // 车型
      //           item.name = '车型'
      //         }else if(['Aeko','MP'].includes(aekoInfo.aekoType)){ // 车型项目
      //           item.name = '车型项目'
      //         }
      //     }
      //   }
      // })

      // // 原零件号 需用户自己填写
      //   printTableTitle.splice(oldPartIndex+1,0,{
      //     props:'oldPart',
      //     name:'原零件号'
      //   })
        
      //   // 零件行项目ID 
      //   printTableTitle.unshift(({
      //     props:'objectAekoPartId',
      //     name:'零件行项目ID'
      //   }))

      // excelExport(selectionList, printTableTitle)
    },
    // 提交
    handleSubmit() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOTIJIAOBIAOTAIDELINGJIAN", "请选择需要提交表态的零件"))

      for (let i = 0, item; (item = this.multipleSelection[i++]); ) {
        if (!['TOBE_STATED','QUOTING','QUOTED','REJECT'].includes(item.status))
          return iMessage.warn(this.language("QINGXUANZENEIRONGZHUANGTAIWEIDBYHUOJUJUEDELINGJIANJINXINGTIJIAO", "请选择内容状态为待表态、报价中、已报价或拒绝的零件进行提交"))
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
          // case "cartypeProjectCode":
          //   if(_value){

          //   }else{

          //   }
          // break
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
    },
    // 发送供应商报价-先校验一品多点
    async sendSupplierPrice(){
      if (!this.multipleSelection.length) return iMessage.warn(this.language("AEKO_QINGXUANZEXUYAOCAOZUODEYUANLINGJIANXIANGMU", "请选择需要操作的原零件项目"))
      const {multipleSelection=[]} = this;
      this.declareSendSupplier = true;
      const data = {
        requirementAekoId:this.$route.query.requirementAekoId,
        objectAekoPartId:multipleSelection.map((item)=>item.objectAekoPartId)
      };
      // 校验一品多点
      await sendSupplierCheck(data).then((res)=>{
        const {code } = res;
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if(code == 200){
          // 存在一品多点
          if(Array.isArray(res.data) && res.data.length > 0){
            this.$confirm(
            this.language('LK_TIPS_AKEO_LINGJIANCUNZAIYIPINDUODIAN','当前选中的零件中存在一品多点，将同时发送报价至相关供应商，是否继续发送报价？'),
            this.language('LK_AEKO_NEIRONGBIAOTAI_CAOZUO','操作'),
            {
                confirmButtonText: this.language('nominationLanguage.Yes','是'),
                cancelButtonText: this.language('nominationLanguage.No','否'),
            }
            ).then(()=>{ // 确认后需要将objectAekoPartId替换成查询返回的list
              this.sendSupplier({
                ...data,
                objectAekoPartId:res.data,
              });
            }).catch(()=>{
              this.sendSupplier(data);
            })
          }else{
            this.sendSupplier(data);
          }
          
        }else{
          this.declareSendSupplier = false;
          iMessage.error(message);
        }
      }).catch(()=> this.declareSendSupplier = false)
      
    },

    // 发送供应商报价
    async sendSupplier(data){
      await sendSupplier(data).then((res)=>{
        this.declareSendSupplier = false;
        const SupplierMessage = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        const {code,data={}} = res;
        if(code == 200){
          const buildFailReasonList = data.buildFailReasonList || [];
          const sendFailReasonList = data.sendFailReasonList || [];

          if(buildFailReasonList.length || sendFailReasonList.length){
            const arr = buildFailReasonList.concat(sendFailReasonList);
            console.log(arr,'arr');
            let str = '';
            arr.map((item)=>{
              str+= `<p>${item}</p>`;
            })
            this.$alert(
              str,
              this.language('LK_WENXINTISHI','温馨提示'
            ), {
            dangerouslyUseHTMLString: true,
            confirmButtonText: this.language('LK_QUEDING','确定'),
          });
          }
          this.init();
        }else{
          iMessage.error(SupplierMessage);
        }   
      }).catch((err)=>{
            this.declareSendSupplier = false;
        })
    },

    // 指定车型项目弹窗展示
    goToinvestCarTypePro(){
      const { multipleSelection } = this;
      if (!multipleSelection.length) return iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      this.investCarTypeProVisible = true;
    },

    changeVisible(type,visible){
      this[type] = visible;
    },

    // 撤回
    async cancelContent(){
      const { multipleSelection } = this;
      if (!multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOCHEHUIBIAOTAIDELINGJIAN", "请选择需要撤回表态的零件"))
      const data = multipleSelection.map((item)=>item.objectAekoPartId);
      this.cancelLoading = true;
      await cancelContent(data).then((res)=>{
        this.cancelLoading = false;
        if(res.code == 200){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
          this.init()
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch((err)=>{
        this.cancelLoading = false;
      })
    },

    // 查看价格轴弹窗
    showPriceAxis(row={}){
      this.priceAxisVisible = true;
      this.priceAxisRow = row;
    },

    // 显示隐藏表头
    handleChangeTable(value=[]){
      const arr = [];
      value.map((item)=>{
        const filterItem = hidenTableTitle.filter((item2)=> item2.props == item);
        if(filterItem.length) arr.push(filterItem[0]);
      })
      this.tableTitle = tableTitle.concat(arr);
    },

    // 变更投资车型项目
    async handleChangeCarInvestProjects(value,row){
      const data =[{
        investCarTypePro: value,
        objectAekoPartId: row.objectAekoPartId,
        requirementAekoId: this.$route.query.requirementAekoId
      }];
      await updateInvestCarProject(data).then((res)=>{
        if(res.code == 200){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
        }else{
          this.init();
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          
        }
      })
    },

    // 承运方式展示字段
    getRranWayDesc(row){
      console.log(row,'getRranWayDesc');
      if(row.originBnkTranWay==null && row.newBnkTranWay==null){
        return ' '
      }else if(row.originBnkTranWay == row.newBnkTranWay){ //若新原零件承运方式相同，则承运方式显示自运或者承运
        return row.originBnkTranWayDesc
      }else if(row.originBnkTranWay != row.newBnkTranWay){  //若新原零件承运方式不同 则承运方式显示原承运方式&（原）&-&新承运方式&（新）
        return `${row.originBnkTranWayDesc || '-'}(原)-${row.newBnkTranWayDesc || '-'}(新)`
      }else{
        return ' '
      }
      
    },

    // 导入
    async onHttpUploaded(formData,content){
      const newFormData = new FormData()
      newFormData.append('uploadFile', content.file)
      await importItemExcel(newFormData).then((res)=>{
        const {code} = res;
        if(code!=200){
          const tips = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
          this.$alert(tips, this.language('LK_AEKO_ALERT_TISHI','提示'), {
            confirmButtonText: this.language('LK_QUEDING','确定'),
          })
        }else{
          this.$message.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
          this.init();
        }
      }).catch((e)=>{
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      });
    },
    // 投资车型项目下拉是否禁用
    disabledInvestCarTypePro(row){
      console.log(row,this.disabled);
      // 当模具投资变动有值时 禁用下拉
      // 内容状态为 报价中 已报价 拒绝 不禁用
      const statusDisabled = row.status=='QUOTING' || row.status=='QUOTED' || row.status=='REJECT';

      return row.mouldPriceChange || !statusDisabled || this.disabled
    },

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
::v-deep.el-button {
  &:hover {
    .iconSuffix {
      color: #ffffff;
    }
  }
}
.el-table_1_column_3 .cell {
  position: relative;
}
.aeko-combine-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  border: 1px solid rgba(217, 222, 229, 0.5);
  background: #fff;
  ::v-deep.el-textarea {
    height: 100%;
    .el-textarea__inner {
      resize: none;
      box-shadow: none;
      height: 100%;
    }
  }
}
</style>