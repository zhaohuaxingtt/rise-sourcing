<!--
 * @Author: your name
 * @Date: 2021-07-27 10:51:49
 * @LastEditTime: 2022-03-28 15:45:15
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\components\ledger\index.vue
-->
<template>
  <div class="ledger">
    <iSearch
      class="margin-top25"
      icon
      @sure="sure"
      @reset="reset"
      :resetKey="AEKO_QUONDAMPARTLEDGER_BUTTON_RESET"
      :searchKey="AEKO_QUONDAMPARTLEDGER_BUTTON_CONFIRM"
    >
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')" v-permission.auto="AEKO_QUONDAMPARTLEDGER_INPUT_PARTNUM|零件号">
          <iInput
            v-model="form.partNum"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
            <!-- :disabled="disabled" -->
        </el-form-item>
        <el-form-item :label="language('LK_GONGYINGSHANGSAPHAO', '供应商SAP号')" v-permission.auto="AEKO_QUONDAMPARTLEDGER_INPUT_SUPPLIERSAPCODE|供应商SAP号">
          <iInput
            v-model="form.supplierSapCode"
            :placeholder="language('LK_QINGSHURUGONGYINGSHANGSAPHAO', '请输入供应商SAP号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')" v-permission.auto="AEKO_QUONDAMPARTLEDGER_INPUT_SUPPLIERNAME|供应商简称">
          <iInput
            v-model="form.supplierName"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('LK_CAIGOUGONGCHANG', '采购工厂')" v-permission.auto="AEKO_QUONDAMPARTLEDGER_SELECT_FACTORYCODE|采购工厂">
            <!-- v-if="!factoryDisabled" -->
          <iSelect
            v-model="form.factoryCode"
            :placeholder="language('QINGXUANZECAIGOUGONGCHANG', '请选择采购工厂')"
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
          <!-- <iInput v-else readonly :value="factoryName"></iInput> -->
        </el-form-item>
      </el-form>
    </iSearch>
    <!-- 指定台账库 -->
    <iCard class="margin-top20" :title="language('ZHIDINGTAIZHANGKUYUANLINGJIAN', '指定台账库原零件')" v-permission.auto="AEKO_QUONDAMPARTLEDGER_TABLE_ZHIDINGTAIZHANGKUYUANLINGJIAN|指定台账库原零件" v-if="tableListData.length">
      <template #header-control>
        <!-- <iButton @click="handleSave" v-permission="AEKO_QUONDAMPARTLEDGER_BUTTON_SAVE">{{ language("BAOCUN", "保存") }}</iButton> -->
        <iButton 
          @click="handleExport" 
          v-permission.auto="AEKO_QUONDAMPARTLEDGER_BUTTON_EXPORT|台账库列表导出"
          :disabled="aekomultipleSelection.length > 0 "
        >
        {{ language("DAOCHU", "导出") }}
        </iButton>
      </template>
      <div class="body"  >
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
          :selectable="selectInit"
        >
          <template #aPrice="scope">
            <iInput class="aPriceSelect" :placeholder="language('QINGXUANZE', '请选择')" v-model="scope.row.aPrice" readonly @click.native="aPriceSelect(scope.row)">
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" />
              </div>
            </iInput>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getAekoOriginPartInfo)"
          @current-change="handleCurrentChange($event, getAekoOriginPartInfo)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>

    <!-- 指定AEKO库原零件 -->
    <aekoList  v-permission.auto="AEKO_QUONDAMPARTLEDGER_TABLE_ZHIDINGAEKOKUYUANLINGJIAN|指定AEKO库原零件" ref="aekoList" :ledgerSelection="multipleSelection" :form="form" :aekomultipleSelection="aekomultipleSelection" :objectAekoPartId="objectAekoPartId" @changeAekoSelection="changeAekoSelection"/>
    
    <presentAllInPriceDialog :visible.sync="visible" :apriceId="currentRow.aPriceId" @confirm="confirmAPrice" />
  </div>
</template>

<script>
import { iSearch, iInput, iSelect, iCard, iButton, iPagination, icon, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import presentAllInPriceDialog from "../presentAllInPriceDialog"
import { ledgerQueryForm, ledgerTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
import { excelExport } from "@/utils/filedowLoad"
import { getAekoOriginPartInfo, saveAekoOriginPart, judgeRight, getAekoOriginFactory } from "@/api/aeko/detail"
import { procureFactorySelectVo } from "@/api/dictionary"
import { cloneDeep, isEqual } from "lodash"


import aekoList from '../aeko'

export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, iPagination, tableList, icon, presentAllInPriceDialog,
  aekoList,
   },
  mixins: [ pageMixins ],
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  data() {
    return {
      partNum: "",
      objectAekoPartId: "",
      requirementAekoId: "",
      oldPartNumPreset: "",
      initPartNum: "",
      factoryCode: "", // 初始工厂
      procureFactoryOptiopns: [],
      form: cloneDeep(ledgerQueryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      visible: false,
      currentRow: {},
      factoryDisabled: false,
      disabled: false, // 禁止编辑零件号
      factoryName: "",
      aekomultipleSelection:[],
    }
  },
  watch: {
    form: {
      handler(data) {
        if (isEqual(data, ledgerQueryForm)) {
          this.objectAekoPartId = this.$route.query.objectAekoPartId
        } else {
          this.objectAekoPartId = ""
        }
      },
      deep: true
    }
  },
  async created() {
    this.partNum = this.$route.query.partNum  // 零件号
    this.isAea = this.$route.query.isAea == 'true' ? true : false  // 是否是AEA类型
    this.isDeclare = this.$route.query.isDeclare  // 是否预设零件号，0是，1不是
    this.objectAekoPartId = this.$route.query.objectAekoPartId
    this.requirementAekoId = this.$route.query.requirementAekoId
    this.originPartNum = this.$route.query.originPartNum  // 选择的原零件号
    this.oldPartNumPreset = this.$route.query.oldPartNumPreset  // 预设的原零件号
    // await this.getAekoOriginFactory()
    // 如果选择了原零件,查询原零件
    if(this.originPartNum && this.originPartNum != this.partNum){
      this.form.partNum = this.originPartNum
      this.judgeRight()  // 查询原零件
    }else{ // 没有选择原零件,默认查询新零件
      this.form.partNum = this.partNum
      this.judgeRight('init')  // 初次进入查询新零件
    }
    this.procureFactorySelectVo()
    this.initPartNum = this.form.partNum
  },
  methods: {
    getAekoOriginFactory() {
      return getAekoOriginFactory({
        objectAekoPartId: this.objectAekoPartId
      })
      .then(res => {
        if (res.code == 200) {
          if (res.data.factoryCode) {
            this.form.factoryCode = res.data.factoryCode
            this.factoryName = res.data.factoryName
            this.factoryCode = res.data.factoryCode
            // if(!this.isAea){
            //   this.factoryDisabled = true
            // }
          } else {
            // this.factoryDisabled = false
            this.form.factoryCode = ""
            this.factoryName = ""
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    judgeRight(flag='') {
      // 零件号拆分一下
      let partNumList = [];
      if(this.form.partNum){
        partNumList = this.form.partNum.split(',');
      }
      let data  = [];
      if(partNumList.length){
        partNumList.map((item)=>{
          data.push({
             partNum: item,
            userId: this.userInfo.id
          })
        })
      }else{
        data = [{
            partNum: this.form.partNum,
            userId: this.userInfo.id
          }]
      }
      
      judgeRight(data)
      .then(res => {
        if (res.code == 200) {
          if (!res.data[0].isView) {
            this.$message({
              type: 'warning',
              showClose: true,
              message: this.language('NOPERMISSIONS','您没有当前原零件材料组权限，请及时申请，以免影响后续操作。'),
              duration: 12000
            })
          }
            this.getAekoOriginPartInfo(flag)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.loading = false)
    },
    // 查询采购工厂
    procureFactorySelectVo() {
      procureFactorySelectVo()
      .then(res => {
        if (res.code == 200) {
          this.procureFactoryOptiopns = 
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
    // 查询台账库数据
    getAekoOriginPartInfo(flag='') {
      // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
      if(this.form.partNum && this.form.partNum.trim().length < 9){
        return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
      }

      this.loading = true
      if(flag!='init'){ // 使用新零件号查询时，先不获取AEKO库数据，避免table数据闪烁
        this.$refs.aekoList.getList('isRest');
      }

      getAekoOriginPartInfo({
        ...this.form,
        objectAekoPartId: this.objectAekoPartId,
        current: this.page.currPage,
        size: this.page.pageSize,

      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
          if(flag=='init'){  // 使用新零件查询时，判断是否禁用
            this.disabled = res.total ? true : false  // 查到数据则禁用零件号输入框，否则不禁用
            if(!this.disabled){  // 如果零件号输入框未禁用(新零件号未查到数据)
              if(this.oldPartNumPreset && this.oldPartNumPreset != this.form.partNum){  // 且有预设原零件号,且不等于新零件号，避免重复查询
                this.form.partNum = this.oldPartNumPreset  // 零件号替换为预设零件号
                this.getAekoOriginPartInfo()  // 重新查询
                this.$refs.aekoList.getList('isRest');  // 查询AEKO库
              }else{ // 没有预设原零件号,查询AEKO库
                this.$refs.aekoList.getList('isRest');
              }
            }else{  // 禁用零件号输入框(有数据)，则直接查询AEKO库
              this.$refs.aekoList.getList('isRest');
            }
          }
        } else {
          if(flag=='init'){ // 使用新零件查询失败时
            this.disabled = false
            if(this.oldPartNumPreset && this.oldPartNumPreset != this.form.partNum){  // 如果有预设原零件,且不等于新零件号,则尝试用预设原零件查询
              this.form.partNum = this.oldPartNumPreset
              this.getAekoOriginPartInfo()
              this.$refs.aekoList.getList('isRest'); // 如果有预设原零件，则用预设原零件查询AEKO库
            }else{  // 如果没有预设原零件，则用新零件查询AEKO库
              this.$refs.aekoList.getList('isRest');
            }
          }
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      })
      .catch(() => this.loading = false)
    },

    sure() {
      // 判断下零件号不能为空
      if(!this.form.partNum) return iMessage.warn(this.language('LK_AEKO_QUONDAMPART_SEARCH_TIPS','零件号不能为空'))
      this.page.currPage = 1
      if (isEqual(this.form, ledgerQueryForm)) {
        this.objectAekoPartId = this.$route.query.objectAekoPartId
      } else {
        this.objectAekoPartId = ""
      }
      
      this.judgeRight()
      // this.getAekoOriginPartInfo()
    },
    reset() {
      this.page.currPage = 1
      this.form = cloneDeep({ ledgerQueryForm, factoryCode:  this.factoryCode,partNum: this.initPartNum ? this.initPartNum : undefined})
      // this.form = cloneDeep({ ledgerQueryForm, factoryCode: this.factoryDisabled ? this.form.factoryCode : "",partNum: this.initPartNum ? this.initPartNum : undefined})
      
      this.objectAekoPartId = this.$route.query.objectAekoPartId
      // this.getAekoOriginPartInfo()
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 勾选aeko列表
    changeAekoSelection(list){
      this.aekomultipleSelection = list;
    },
    aPriceSelect(row) {
      this.visible = true

      this.currentRow = row
    },
    confirmAPrice(row) {
      this.currentRow.aPrice = row.price
      this.currentRow.currency = row.currency
      this.currentRow.unit = row.priceUnit
      this.currentRow = {}
    },
    // 保存
    handleSave() {
      if (!this.multipleSelection.length && !this.aekomultipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOBAOCUNDEYUANLINGJIAN", "请选择需要保存的原零件"))

      this.aekomultipleSelection.map((item)=>{
        item.aPrice = item.newPriceA;
        item.supplierCode = item.supplierSap;
        item.supplierName = item.supplierNameZh;
        item.facadeCode = item.procureFactory;
        item.facadeName = item.procureFactoryName;
      })

      const data = {
        partList:this.aekomultipleSelection.concat(this.multipleSelection),
        objectAekoPartId: this.$route.query.objectAekoPartId,
        requirementAekoId: this.requirementAekoId
      }

      this.$emit('changeStatus','saveLoading',true);
      saveAekoOriginPart(data)
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          if (sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)) {
            try {
              const aekoConatentDeclareParams = JSON.parse(sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`))
              this.$router.replace({
                path: "/aeko/aekodetail",
                query: {
                  from:aekoConatentDeclareParams.from || undefined,
                  requirementAekoId: aekoConatentDeclareParams.requirementAekoId
                }
              })
            } catch(e) {
              console.error(e)

              this.$router.replace({
                path: "/aeko/managelist",
                query: {}
              })
            }
          } else {
            this.$router.replace({
              path: "/aeko/managelist",
              query: {}
            })
          }
        } else {
          iMessage.error(message)
        }

        this.$emit('changeStatus','saveLoading',false);
      })
      .catch(() => this.$emit('changeStatus','saveLoading',false))
    },
    // 导出
    handleExport() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAODAOCHUDEYUANLINGJIAN", "请选择需要导出的原零件"))
    
      excelExport(this.multipleSelection, this.tableTitle)
    },
    // 勾选限制
    selectInit(row){
      const idArr = this.aekomultipleSelection.map((item)=>item.partNum.trim());
      // 判断AEKO零件列表是否已存在相同原零件 若存在 则不勾选
      if(!idArr.includes(row.partNum.trim())){
        return true 
      }else{
        return false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.ledger {
  .aPriceSelect {
    ::v-deep input {
      cursor: pointer;
    }

    ::v-deep .el-input__suffix {
      right: 0;
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
}
</style>
