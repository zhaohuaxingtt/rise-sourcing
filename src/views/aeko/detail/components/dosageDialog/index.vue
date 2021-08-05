<!--
 * @Author: your name
 * @Date: 2021-07-29 11:38:07
 * @LastEditTime: 2021-08-04 19:56:45
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
        <iButton @click="handleConfirm">{{ language("BAOCUN", "保存") }}</iButton>
      </div>
    </template>
    <div class="body" v-loading="loading">
      <iFormGroup class="form" :row="4" inline>
        <iFormItem class="item" v-for="(item, $index) in form" :key="$index" :label="`${ language(item.key, item.name) }`">
          <div v-if="item.props === 'cartypeProject'">
            <iText v-if="lll">{{ dosage.cartypeProjectZh }}</iText>
            <iSelect
              v-else
              v-model="dosage.cartypeProjectCode"
              :placeholder="language('QINGXUANZE', '请选择')"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in carProjectOptions"
                :key="item.key"
              ></el-option>
            </iSelect>
          </div>
          <iText v-if="item.props === 'factory' || item.props === 'supplierName'">{{ dosage[item.props] }}</iText>
          <iInput class="percentInput" v-else-if="item.props === 'oldPartShare'" v-model="dosage[item.props]"></iInput>
        </iFormItem>
      </iFormGroup>
      <tableList
        index
        lang
        class="table margin-top30"
        :selection="false"
        :tableData="Array.isArray(dosage.aekoProjectCarDosageList) ? dosage.aekoProjectCarDosageList : []"
        :tableTitle="tableTitle">
        <template #consumption="scope">
          <iInput v-model="scope.row.consumption" @input="handleInputByConsumption($event, scope.row)"></iInput>
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
import { getAekoCarProject, getAekoCarDosage } from "@/api/aeko/detail"

export default {
  components: { iDialog, iButton, iFormGroup, iFormItem, iSelect, iText, iInput, tableList },
  mixins: [ filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    requirementAekoId: {
      type: String,
      require: true,
      default: ""
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
        // this.selectRow = null
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
    }
  },
  data() {
    return {
      loading: false,
      form,
      carProjectOptions: [],
      dosage: {},
      tableTitle,
      // selectRow: null,
      lll: true
    };
  },
  methods: {
    getAekoCarProject() {
      getAekoCarProject({
        requirementAekoId: this.requirementAekoId
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
        requirementAekoId: this.requirementAekoId,
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
    // 确认
    handleConfirm() {
      // this.$emit("confirm", this.selectRow)
      this.status = false
    },
    handleInputByConsumption(value, row) {
      this.$set(row, "consumption", numberProcessor(value, 2))
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
      overflow-y: scroll;
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

  .percentInput {
    ::v-deep input {
      text-align: center;
    }
  }
}
</style>