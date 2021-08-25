<!--
 * @Author: your name
 * @Date: 2021-07-27 10:51:49
 * @LastEditTime: 2021-08-24 14:58:43
 * @LastEditors: Please set LastEditors
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
        <el-form-item :label="language('LINGJIANHAO', '零件号')" v-permission="AEKO_QUONDAMPARTLEDGER_INPUT_PARTNUM">
          <iInput
            v-model="form.partNum"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')" v-permission="AEKO_QUONDAMPARTLEDGER_INPUT_SUPPLIERSAPCODE">
          <iInput
            v-model="form.supplierSapCode"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')" v-permission="AEKO_QUONDAMPARTLEDGER_INPUT_SUPPLIERNAME">
          <iInput
            v-model="form.supplierName"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('LK_CAIGOUGONGCHANG', '采购工厂')" v-permission="AEKO_QUONDAMPARTLEDGER_SELECT_FACTORYCODE">
          <iSelect
            v-if="!factoryDisabled"
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
          <iInput v-else readonly :value="factoryName"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('ZHIDINGTAIZHANGKUYUANLINGJIAN', '指定台账库原零件')">
      <template #header-control>
        <!-- <iButton @click="handleSave" v-permission="AEKO_QUONDAMPARTLEDGER_BUTTON_SAVE">{{ language("BAOCUN", "保存") }}</iButton> -->
        <iButton @click="handleExport" v-permission="AEKO_QUONDAMPARTLEDGER_BUTTON_EXPORT">{{ language("DAOCHU", "导出") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          v-permission="AEKO_QUONDAMPARTLEDGER_TABLE"
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #aprice="scope">
            <iInput class="aPriceSelect" :placeholder="language('QINGXUANZE', '请选择')" v-model="scope.row.aprice" readonly @click.native="aPriceSelect(scope.row)">
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
    <presentAllInPriceDialog :visible.sync="visible" :apriceId="currentRow.apriceId" @confirm="confirmAPrice" />
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

export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, iPagination, tableList, icon, presentAllInPriceDialog },
  mixins: [ pageMixins ],
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
  data() {
    return {
      objectAekoPartId: "",
      requirementAekoId: "",
      oldPartNumPreset: "",
      procureFactoryOptiopns: [],
      form: cloneDeep(ledgerQueryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      visible: false,
      currentRow: {},
      factoryDisabled: false,
      factoryName: ""
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
    this.objectAekoPartId = this.$route.query.objectAekoPartId
    this.requirementAekoId = this.$route.query.requirementAekoId
    this.oldPartNumPreset = this.$route.query.oldPartNumPreset
    await this.getAekoOriginFactory()

    if (this.oldPartNumPreset) {
      this.judgeRight()
    } else {
      this.procureFactorySelectVo()
      // this.getAekoOriginPartInfo()
    }
  },
  methods: {
    getAekoOriginFactory() {
      return getAekoOriginFactory({
        objectAekoPartId: this.objectAekoPartId
      })
      .then(res => {
        if (res.code == 200) {
          if (res.data.factoryCode) {
            this.factoryDisabled = true
            this.factoryName = res.data.factoryName
          } else {
            this.factoryDisabled = false
            this.factoryName = ""
          }

          this.form.factoryCode = ""
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    judgeRight() {
      judgeRight([
        {
          partNum: this.oldPartNumPreset,
          userId: this.userInfo.id
        }
      ])
      .then(res => {
        if (res.code == 200) {
          if (res.data[0].isView) {
            this.procureFactorySelectVo()
            this.getAekoOriginPartInfo()
          } else {
            iMessage.error(res.data[0].describe)
            this.loading = false
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.loading = false)
    },
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
    getAekoOriginPartInfo() {
      // 判断零件号查询至少大于等于9位或为空的情况下才允许查询
      if(this.form.partNum && this.form.partNum.trim().length < 9){
        return iMessage.warn(this.language('LK_AEKO_LINGJIANHAOZHISHAOSHURU9WEI','查询零件号不足,请补充至9位或以上'));
      }

      this.loading = true

      getAekoOriginPartInfo({
        ...this.form,
        objectAekoPartId: this.objectAekoPartId,
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
      this.page.currPage = 1
      if (isEqual(this.form, ledgerQueryForm)) {
        this.objectAekoPartId = this.$route.query.objectAekoPartId
      } else {
        this.objectAekoPartId = ""
      }
      
      this.getAekoOriginPartInfo()
    },
    reset() {
      this.page.currPage = 1
      this.form = cloneDeep(ledgerQueryForm)
      this.objectAekoPartId = this.$route.query.objectAekoPartId
      this.getAekoOriginPartInfo()
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    aPriceSelect(row) {
      this.visible = true

      this.currentRow = row
      console.log("this.currentRow.apriceId", this.currentRow.apriceId)
    },
    confirmAPrice(row) {
      this.currentRow.aprice = row.price
      this.currentRow = {}
    },
    // 保存
    handleSave() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOBAOCUNDEYUANLINGJIAN", "请选择需要保存的原零件"))

      this.saveLoading = true
      saveAekoOriginPart({
        originPartList: this.multipleSelection,
        objectAekoPartId: this.$route.query.objectAekoPartId,
        requirementAekoId: this.requirementAekoId
      })
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

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
    // 导出
    handleExport() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAODAOCHUDEYUANLINGJIAN", "请选择需要导出的原零件"))
    
      excelExport(this.multipleSelection, this.tableTitle)
    }
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