<!--
 * @Author: your name
 * @Date: 2021-07-29 11:38:07
 * @LastEditTime: 2021-08-13 02:54:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\detail\components\dosageDialog\index.vue
-->
<template>
  <iDialog
    class="dosageDialog"
    v-bind="$props"
    :visible.sync="status"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ language("ZHUANGCHELVMEICHEYONGLIANG", "装⻋率/每⻋⽤量") }}</p>
      <div class="control" id="control">
        <iButton v-if="!disabled" :loading="saveLoading" @click="handleSave" v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_BUTTON_SAVE">{{ language("BAOCUN", "保存") }}</iButton>
      </div>
    </template>
    <div class="body" v-loading="loading">
      <iFormGroup class="form" :row="4" inline>
        <iFormItem class="item" v-for="(item, $index) in form" :key="$index" :label="`${ language(item.key, item.name) }`" v-permission.dynamic="item.permissionKey">
          <div v-if="item.props === 'cartypeProject'">
            <iSelect
              v-if="aekoInfo.aekoType == 'AeA' && !disabled"
              v-model="dosage.cartypeProjectCode"
              :placeholder="language('QINGXUANZE', '请选择')"
              @change="handleChangeByCarTypeProject"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in carProjectOptions"
                :key="item.key"
              ></el-option>
            </iSelect>
            <iText v-else>{{ dosage.cartypeProjectZh }}</iText>
          </div>
          <iText v-if="item.props === 'factory' || item.props === 'supplierName'">{{ dosage[item.props] }}</iText>
          <iInput class="percentInput" v-else-if="item.props === 'usePortion'" v-model="dosage[item.props]" :disabled="disabled" @input="handleInputByUsePortion">
            <template slot="append">%</template>
          </iInput>
        </iFormItem>
      </iFormGroup>
      <tableList
        index
        lang
        class="table margin-top30"
        height="80%"
        v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_TABLE"
        :selection="false"
        :tableData="Array.isArray(dosage.aekoProjectCarDosageList) ? dosage.aekoProjectCarDosageList : []"
        :tableTitle="tableTitle">
        <template #perCarDosage="scope">
          <iInput class="perCarDosage" v-model="scope.row.perCarDosage" :disabled="disabled" @input="handleInputByPerCarDosage($event, scope.row)"></iInput>
        </template>
      </tableList>
      <i class="dashes"></i>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormGroup, iFormItem, iSelect, iText, iInput, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { dosageDialogForm as form, dosageDialogTableTitle as tableTitle } from "../data"
import { numberProcessor } from "@/utils"
import filters from "@/utils/filters"
import { getAekoCarProject, getAekoCarDosage, getAekoCarDosageByCarTypeProjectCode, saveAekoCarDosage } from "@/api/aeko/detail"

export default {
  components: { iDialog, iButton, iFormGroup, iFormItem, iSelect, iText, iInput, tableList },
  mixins: [ filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    aekoInfo: {
      type: Object,
      require: true,
      default: () => ({})
    },
    objectAekoPartId: {
      type: String,
      require: true,
      default: ""
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        this.getAekoCarProject()
        this.getAekoCarDosage()
      } else {
        if (this.isUpdate) {
          this.$emit("update")
        }

        this.dosage = {}
        this.sourceCarTypeProject = {}
        this.saveLoading = false
        this.isUpdate = false
      }
    },
  },
  computed: {
    status: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit("update:visible", value)
      }
    },
    disabled() {
      return this.aekoInfo.aekoStatus == "CANCELED"
    }
  },
  data() {
    return {
      loading: false,
      form,
      carProjectOptions: [],
      dosage: {},
      tableTitle,
      saveLoading: false,
      isUpdate: false
    };
  },
  methods: {
    getAekoCarProject() {
      getAekoCarProject({
        objectAekoPartId: this.objectAekoPartId
      })
      .then(res => {
        if (res.code == 200) {
          this.carProjectOptions =
            Array.isArray(res.data) ?
            res.data.map(item => ({
              key: item.carTypeProjectCode,
              label: item.carTypeProjectZh,
              value: item.carTypeProjectCode
            })) :
            []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    // 获取列表
    getAekoCarDosage() {
      this.loading = true

      getAekoCarDosage({
        requirementAekoId: this.aekoInfo.requirementAekoId,
        objectAekoPartId: this.objectAekoPartId,
      })
      .then(res => {
        if (res.code == 200) {
          this.dosage = res.data || {}
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 根据车型项目code获取每车用量
    getAekoCarDosageByCarTypeProjectCode(carTypeProjectCode) {
      this.loading = true
      
      getAekoCarDosageByCarTypeProjectCode({ carTypeProjectCode })
      .then(res => {
        if (res.code == 200) {
          this.dosage.aekoProjectCarDosageList = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleChangeByCarTypeProject(value) {
      this.dosage.carTypeProjectZh = this.carProjectOptions.find(item => item.value === value).label

      this.getAekoCarDosageByCarTypeProjectCode(value)
    },
    handleInputByUsePortion(value) {
      this.$set(this.dosage, "usePortion", numberProcessor(value, 2))
    },
    handleInputByPerCarDosage(value, row) {
      this.$set(row, "perCarDosage", numberProcessor(value, 2))
    },
    // 保存
    handleSave() {
      if (+this.dosage.oldPartShare > 100) return iMessage.warn(this.language("YANYONGYUANLINGJIANFENEBUNENGDAYUBAIFENZHIBAI", "沿⽤原零件份额不能大于100%"))

      this.saveLoading = true

      saveAekoCarDosage({
        ...this.dosage,
        objectAekoPartId: this.objectAekoPartId
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getAekoCarDosage()
          this.isUpdate = true
        } else {
          iMessage.error(message)
        }

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
  }
};
</script>

<style lang="scss" scoped>
.dosageDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  .control {
    position: absolute;
    top: 50%;
    right: 94px;
    transform: translate(0, -50%);
  }

  ::v-deep .el-dialog {
    width: 1745px !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
      padding-right: 15px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 60px);
      padding-right: 13px;
    }
  }

  .form {
    ::v-deep .el-form-item {
      margin-right: 60px;
      margin-bottom: 0;

      &:last-of-type {
        margin-right: 0;
      }

      .el-form-item__label {
        width: 140px;
        font-size: 16px;
      }
    }
  }

  .dashes {
    margin-top: 40px;
    display: block;
    height: 1px;
    border: 1px dashed #CFD3DD;
  }

  ::v-deep .el-table {
    .el-table__body-wrapper {
      min-height: initial !important;  
    }

    &::before {
      background: transparent;
    }
  }

  .perCarDosage {
    width: 110px;

    ::v-deep input {
      text-align: center;
    }
  }

  .percentInput {
    ::v-deep input {
      text-align: center;
    }
  }

  ::v-deep .el-table .el-table__body-wrapper {
    overflow: initial;
  }
}
</style>