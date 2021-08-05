<!--
 * @Author: your name
 * @Date: 2021-07-27 10:51:49
 * @LastEditTime: 2021-07-30 16:11:42
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
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iInput
            v-model="form.partNum"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')">
          <iInput
            v-model="form.supplierSapCode"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')">
          <iInput
            v-model="form.supplierName"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('LK_CAIGOUGONGCHANG', '采购工厂')">
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
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('ZHIDINGTAIZHANGKUYUANLINGJIAN', '指定台账库原零件')">
      <template #header-control>
        <iButton @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
        <iButton @click="handleExport">{{ language("DAOCHU", "导出") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #currentAPrice="scope">
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
    <presentAllInPriceDialog :visible.sync="visible" :partNum="currentRow.partNum" :factoryCode="currentRow.factoryCode" @confirm="confirmAPrice" />
  </div>
</template>

<script>
import { iSearch, iInput, iSelect, iCard, iButton, iPagination, icon, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import presentAllInPriceDialog from "../presentAllInPriceDialog"
import { ledgerQueryForm, ledgerTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
import { excelExport } from "@/utils/filedowLoad"
import { getAekoOriginPartInfo, saveAekoOriginPart } from "@/api/aeko/detail"
import { cloneDeep } from "lodash"

export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, iPagination, tableList, icon, presentAllInPriceDialog },
  mixins: [ pageMixins ],
  data() {
    return {
      options: [],
      form: cloneDeep(ledgerQueryForm),
      tableTitle,
      tableListData: [{}],
      multipleSelection: [],
      visible: false,
      currentRow: {},
    }
  },
  created() {
    this.objectAekoPartId = this.$route.query.objectAekoPartId
    this.requirementAekoId = this.$route.query.requirementAekoId
    this.getAekoOriginPartInfo()
  },
  methods: {
    getAekoOriginPartInfo() {
      getAekoOriginPartInfo({
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
    sure() {
      this.page.currPage = 1
      this.getAekoOriginPartInfo()
    },
    reset() {
      this.page.currPage = 1
      this.form = cloneDeep(ledgerQueryForm)
      this.getAekoOriginPartInfo()
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    aPriceSelect(row) {
      this.visible = true

      this.currentRow = row
    },
    confirmAPrice(row) {
      this.currentRow.aprice = row.aprice
      this.currentRow = {}
    },
    // 保存
    handleSave() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOBAOCUNDEYUANLINGJIAN", "请选择需要保存的原零件"))

      this.saveLoading = true
      saveAekoOriginPart({
        originPartList: this.multipleSelection,
        objectAekoPartId: this.objectAekoPartId,
        requirementAekoId: this.requirementAekoId
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.$router.replace({
            path: "/aeko/aekodetail",
            query: {}
          })
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