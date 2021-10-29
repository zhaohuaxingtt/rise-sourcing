<!--
 * @Author: your name
 * @Date: 2021-07-29 11:38:07
 * @LastEditTime: 2021-10-29 15:15:00
 * @LastEditors: YoHo
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
      <p class="title">
        {{ language("ZHUANGCHELVMEICHEYONGLIANG", "装⻋率/每⻋⽤量") }}
      </p>
      <div class="control" id="control">
        <iButton
          v-if="!disabled"
          :loading="saveLoading"
          @click="handleSave"
          v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_BUTTON_SAVE"
          >{{ language("BAOCUN", "保存") }}</iButton
        >
      </div>
    </template>
    <div class="body" v-loading="loading">
      <iFormGroup class="form" :row="4" inline>
        <iFormItem
          class="item"
          v-for="(item, $index) in form"
          :required="item.required"
          :key="$index"
          :label="`${language(item.key, item.name)}`"
          v-permission.dynamic="item.permissionKey"
        >
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
          <iText
            v-if="item.props === 'factoryName' || item.props === 'supplierName'"
            >{{ dosage[item.props] }}</iText
          >
          <iInput
            class="percentInput"
            v-else-if="item.props === 'usePortion'"
            v-model="dosage[item.props]"
            :disabled="disabled"
            @input="handleInputByUsePortion"
            @blur="handleBlurByUsePortion"
          >
            <template slot="append"
              ><span style="color: #000">%</span></template
            >
          </iInput>
        </iFormItem>
      </iFormGroup>
      <el-table
        v-permission="AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_TABLE"
        class="table margin-top30"
        height="480"
        :data="
          Array.isArray(dosage.aekoProjectCarDosageList)
            ? dosage.aekoProjectCarDosageList
            : []
        "
      >
        <template v-for="item in tableTitle">
          <el-table-column
            v-if="item.required"
            :key="item.key"
            :prop="item.props"
            align="center"
          >
            <template slot="header" slot-scope="scope">
              <div>
                {{ language(item.key, item.name) }}
                <span class="require">*</span>
              </div>
            </template>
            <template slot-scope="scope">
              <template v-if="item.props == 'originPerCarDosage'">
                <iInput
                  class="perCarDosage"
                  v-model="scope.row.originPerCarDosage"
                  :disabled="disabled"
                  @input="
                    handleInputByPerCarDosage($event, scope.row, item.props)
                  "
                  @blur="
                    handleBlurByPerCarDosage(
                      scope.row.originPerCarDosage,
                      scope.row,
                      item.props
                    )
                  "
                ></iInput>
              </template>
              <template v-else-if="item.props == 'perCarDosage'">
                <iInput
                  class="perCarDosage"
                  v-model="scope.row.perCarDosage"
                  :disabled="disabled"
                  @input="
                    handleInputByPerCarDosage($event, scope.row, item.props)
                  "
                  @blur="
                    handleBlurByPerCarDosage(
                      scope.row.perCarDosage,
                      scope.row,
                      item.props
                    )
                  "
                ></iInput>
              </template>
              <template v-else>{{ scope.row[item.props] }}</template>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="item.key"
            :label="language(item.key, item.name)"
            :prop="item.props"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 装车率加个% -->
              <template v-if="item.props == 'assemblyRate'"
                >{{ scope.row[item.props]*100 }}%</template
              >
              <template v-else>{{ scope.row[item.props] }}</template>
            </template>
          </el-table-column>
        </template>
        <template #append>
          <div class="summary">
            <span v-for="(val, key) in summary" :key="key">{{
              val | fixNum
            }}</span>
          </div>
        </template>
      </el-table>
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
import {cutOutNum} from "@/utils/cutOutNum";

export default {
  components: {
    iDialog,
    iButton,
    iFormGroup,
    iFormItem,
    iSelect,
    iText,
    iInput,
    tableList,
  },
  mixins: [filters],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    aekoInfo: {
      type: Object,
      require: true,
      default: () => ({}),
    },
    objectAekoPartId: {
      type: String,
      require: true,
      default: "",
    },
  },

  watch: {
    status(nv) {
      if (nv) {
        this.getAekoCarProject();
        this.getAekoCarDosage();
      } else {
        if (this.isUpdate) {
          this.$emit("update");
        }

        this.dosage = {};
        this.sourceCarTypeProject = {};
        this.saveLoading = false;
        this.isUpdate = false;
      }
    },
  },
  computed: {
    status: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      },
    },
    summary() {
      let result = {};
      let sumlist = ["originPerCarDosage", "perCarDosage"];
      this.tableTitle.forEach((i) => {
        if (sumlist.includes(i.props)) {
          result[i.props] = 0;
        } else {
          result[i.props] = "";
        }
      });
      console.log(this.dosage);
      this.dosage?.aekoProjectCarDosageList?.forEach((i) => {
        i &&
          Object.keys(i).forEach((key) => {
            if (sumlist.includes(key)) {
              result[key] += i[key] * i.assemblyRate;
            }
          });
      });
      result.levels = "TOTAL";
      return result;
    },
    disabled() {
      return this.aekoInfo.aekoStatus == "CANCELED";
    },
  },
  data() {
    return {
      loading: false,
      form,
      carProjectOptions: [],
      carProjectOptionsList: [],
      dosage: {},
      tableTitle,
      saveLoading: false,
      isUpdate: false,
      sums: [],
    };
  },
  methods: {
    // 提交时校验一下沿⽤原零件份额:usePortion
    validateData() {
      let isValidate = true;
      // 沿⽤原零件份额
      if (!this.dosage["usePortion"]) {
        const tips =
          this.language("YANYONGYUANLINGJIANFENE", "沿⽤原零件份额") +
          this.language("LK_AEKO_BUNENGWEIKONG", "不能为空");
        iMessage.warn(tips);
        isValidate = false;
      }
      // originPerCarDosage:原零件
      // perCarDosage:新零件
      let validList = this.dosage.aekoProjectCarDosageList.filter((i)=> i.perCarDosage&&i.originPerCarDosage)
      if(!(Array.isArray(validList)&&validList.length>0)){
        const tips = this.language('ZHISHAOYAOYOUYIHANG','至少要有一行') + this.language('YUANLINGJIANYONGLIANG','原零件用量')+'、'+this.language('XINLINGJIANYONGLIANG','新零件⽤量')+
        this.language("LK_AEKO_BUNENGWEIKONG", "不能为空");;
        iMessage.warn(tips);
        isValidate = false;
      }
      return isValidate;
    },
    // 表格合计
    summaryMethod(param) {
      const { columns, data } = param;
      const sums = [];
      console.log("columns=>", columns);
      console.log("data=>", data);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "TOTAL";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
      console.log(sums);
      this.sums = sums;
      return sums;
    },
    getAekoCarProject() {
      getAekoCarProject({
        objectAekoPartId: this.objectAekoPartId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.carProjectOptions = Array.isArray(res.data)
              ? res.data.map((item) => ({
                  key: item.carTypeProjectCode,
                  label: item.carTypeProjectZh,
                  value: item.carTypeProjectCode,
                }))
              : [];
            this.carProjectOptionsList = res.data || [];
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {});
    },
    // 获取列表
    getAekoCarDosage() {
      this.loading = true;

      getAekoCarDosage({
        requirementAekoId: this.aekoInfo.requirementAekoId,
        objectAekoPartId: this.objectAekoPartId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.dosage = res.data || {};
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    // 根据车型项目code获取每车用量
    getAekoCarDosageByCarTypeProjectCode(carTypeProjectCode) {
      this.loading = true;

      getAekoCarDosageByCarTypeProjectCode({ carTypeProjectCode })
        .then((res) => {
          if (res.code == 200) {
            this.dosage = Array.isArray(res.data) ? res.data : [];
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    handleChangeByCarTypeProject(value) {
      this.dosage.carTypeProjectZh = this.carProjectOptions.find(item => item.value === value).label
      const {carProjectOptionsList=[]} = this;
      carProjectOptionsList.map((item)=>{
        if(item.carTypeProjectCode === value){
          this.dosage.aekoProjectCarDosageList = Array.isArray(item.aekoProjectChange) ? item.aekoProjectChange : []
        }
      });

      // this.getAekoCarDosageByCarTypeProjectCode(value)
    },
    handleInputByUsePortion(value) {
      this.$set(this.dosage, "usePortion", numberProcessor(value, 2));
    },
    handleBlurByUsePortion() {
      if (this.dosage.usePortion) {
        this.$set(
          this.dosage,
          "usePortion",
          math.bignumber(this.dosage.usePortion).toFixed(2)
        );
      }
    },
    handleInputByPerCarDosage(value, row, props) {
      this.$set(row, props, numberProcessor(value, 2));
    },
    handleBlurByPerCarDosage(value, row, props) {
      if (value) {
        this.$set(row, props, math.bignumber(value).toFixed(2));
      }
    },
    // 保存
    handleSave() {
      const validate = this.validateData();
      if (!validate) {
        this.btnLoading = false;
        return;
      }
      if (+this.dosage.usePortion > 100)
        return iMessage.warn(
          this.language(
            "YANYONGYUANLINGJIANFENEBUNENGDAYUBAIFENZHIBAI",
            "沿⽤原零件份额不能大于100%"
          )
        );

      this.saveLoading = true;

      saveAekoCarDosage({
        ...this.dosage,
        objectAekoPartId: this.objectAekoPartId,
      })
        .then((res) => {
          const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

          if (res.code == 200) {
            iMessage.success(message);
            this.getAekoCarDosage();
            this.isUpdate = true;
          } else {
            iMessage.error(message);
          }

          this.saveLoading = false;
        })
        .catch(() => (this.saveLoading = false));
    },
  },
  filters: {
    fixNum(val) {
      if (isNaN(Number(val)) || (Number(val) === 0 && val !== 0)) return val;
      return Number(val).toFixed(2);
    },
  },
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
        width: 160px;
        font-size: 16px;
      }
    }
  }

  .dashes {
    margin-top: 40px;
    display: block;
    height: 1px;
    border: 1px dashed #cfd3dd;
  }

  ::v-deep .el-table {
    th .require {
      margin-left: 3px;
      color: #e30d0d;
    }
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
  .summary {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    background: #e5eeff;
    font-weight: bold;
    span {
      line-height: 52px;
      width: 100%;
      text-align: center;
      display: block;
    }
  }
  ::v-deep.el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
  }
  ::v-deep.el-table table th.label-require div::after {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  // ::v-deep .el-table .el-table__body-wrapper {
  //   overflow: initial;
  // }
}
</style>