<!--
 * @Author: your name
 * @Date: 2021-07-29 11:38:07
 * @LastEditTime: 2022-04-01 16:20:21
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
        <iButton v-if="!disabled" @click="batchEdit">{{
          language("BATCHEDIT", "批量编辑")
        }}</iButton>
        <iButton
          v-if="!disabled"
          :loading="saveLoading"
          @click="handleSave"
          v-permission.auto="
            AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_BUTTON_SAVE | 保存
          "
          >{{ language("BAOCUN", "保存") }}</iButton
        >
        <iButton v-if="!disabled" :loading="saveLoading" @click="reset">{{
          language("CHONGZHI", "重置")
        }}</iButton>
      </div>
    </template>
    <div class="body" v-loading="loading">
      <el-form class="form" label-position="left">
        <el-form-item
          class="item"
          v-for="(item, $index) in form"
          :required="item.required"
          :key="$index"
          :label-width="item.labelWidth"
          :label="`${language(item.key, item.name)}`"
          v-permission.auto="item.permissionKey"
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
        </el-form-item>
      </el-form>
      <el-table
        v-permission.auto="
          AEKO_AEKODETAIL_CONTENTDECLARE_DOSAGEDIALOG_TABLE | 装车率_表格
        "
        class="table margin-top30"
        height="480"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
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
              <template v-if="item.props == 'assemblyRate'">{{
                scope.row.assemblyRate && calculatePercentage(scope.row) + "%"
              }}</template>
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
    <iDialog
      :visible.sync="visibleEdit"
      :title="language('BATCHEDIT', '批量编辑')"
      width="400px"
      append-to-body
    >
      <el-form label-position="left" label-width="80px">
        <el-form-item label="原用量">
          <i-input v-model="oldVal"></i-input>
        </el-form-item>
        <el-form-item label="新用量">
          <i-input v-model="newVal"></i-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </iDialog>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iButton,
  iFormGroup,
  iFormItem,
  iSelect,
  iText,
  iInput,
  iMessage,
  iMessageBox,
} from "rise";
import tableList from "@/views/partsign/editordetail/components/tableList";
import {
  dosageDialogForm as form,
  dosageDialogTableTitle as tableTitle,
} from "../data";
import { numberProcessor } from "@/utils";
import filters from "@/utils/filters";
import {
  getAekoCarProject,
  getAekoCarDosage,
  getAekoCarDosageByCarTypeProjectCode,
  saveAekoCarDosage,
} from "@/api/aeko/detail";
import { cutOutNum } from "@/utils/cutOutNum";

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
    tableData() {
      return Array.isArray(this.dosage.aekoProjectCarDosageList) &&
        this.dosage.aekoProjectCarDosageList.length
        ? this.dosage.aekoProjectCarDosageList
        : [{}];
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
      this.tableData.forEach((i) => {
        i &&
          Object.keys(i).forEach((key) => {
            if (sumlist.includes(key)) {
              result[key] += i[key] * i.assemblyRate || 0;
            }
          });
      });
      result.levels = "TOTAL";
      return result;
    },
    disabled() {
      // AEKO状态为撤销以及从AEKO查看跳转过来的
      const { query } = this.$route;
      const { from = "" } = query;
      const { auditType = "" } = query; // 我的申请详情页内嵌页面
      return (
        this.aekoInfo.aekoStatus == "CANCELED" || from == "check" || !!auditType
      );
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
      multipleSelection: [],
      visibleEdit: false,
      newVal: "",
      oldVal: "",
    };
  },
  methods: {
    sure() {
      this.multipleSelection.map((item) => {
        this.$set(item, "originPerCarDosage", this.oldVal);
        this.$set(item, "perCarDosage", this.newVal);
      });
      this.visibleEdit = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    batchEdit() {
      if (!this.multipleSelection.length)
        return iMessage.warn("请选择需要修改的数据");
      this.visibleEdit = true;
    },
    calculatePercentage(row) {
      return Number(row.assemblyRate * 100).toFixed(0);
    },
    // 提交时校验一下沿⽤原零件份额:usePortion
    validateData() {
      this.dosage.aekoProjectCarDosageList = JSON.parse(
        JSON.stringify(this.tableData)
      );
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
      let validList = this.dosage.aekoProjectCarDosageList.filter(
        (i) => i.perCarDosage && i.originPerCarDosage
      );
      if (!(Array.isArray(validList) && validList.length > 0)) {
        const tips =
          this.language("ZHISHAOYAOYOUYIHANG", "至少要有一行") +
          this.language("YUANLINGJIANYONGLIANG", "原零件用量") +
          "、" +
          this.language("XINLINGJIANYONGLIANG", "新零件⽤量") +
          this.language("LK_AEKO_BUNENGWEIKONG", "不能为空");
        iMessage.warn(tips);
        isValidate = false;
      }
      return isValidate;
    },
    // 表格合计
    summaryMethod(param) {
      const { columns, data } = param;
      const sums = [];
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
      this.dosage.carTypeProjectZh = this.carProjectOptions.find(
        (item) => item.value === value
      ).label;
      const { carProjectOptionsList = [] } = this;
      carProjectOptionsList.map((item) => {
        if (item.carTypeProjectCode === value) {
          this.dosage.aekoProjectCarDosageList = Array.isArray(
            item.aekoProjectChange
          )
            ? item.aekoProjectChange
            : [];
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
    // 重置
    reset() {
      iMessageBox(
        this.language(
          "CHONGZHIQINGQUEREN",
          "重置后，当前页面所有信息将被恢复至默认状态，请确认！"
        ), // 暂时处理
        this.language("CHONGZHITISHI", "重置提示"),
        {
          showCancelButton: false,
        }
      ).then(() => {
        this.getAekoCarProject();
        this.getAekoCarDosage();
      });
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
      display: inline-block;
      width: 300px;
      vertical-align: middle;

      &:last-of-type {
        margin-right: 0;
      }

      .el-form-item__label {
        // width: 120px;
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
    width: 140px;
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