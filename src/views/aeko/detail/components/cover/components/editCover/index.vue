<!--
 * @Author: wentliao
 * @Date: 2021-07-28 16:51:12
 * @Description: 封面表态---编辑页
-->
<template>
  <iCard class="aeko-editCover" :title="' '" v-loading="btnLoading">
    <!-- 封面提示 -->
    <template #subInfo v-if="showTip">
      <span class="tip">
        {{
          language(
            "FENGMIANTISHIXINXI",
            "封面无须再进行提交，如需修改，请先【撤回】或者联系AEKO管理员【解冻】后再修改提交"
          )
        }}
      </span>
    </template>
    <template
      v-if="
        !(aekoInfo.aekoStatus == 'FROZEN' || aekoInfo.aekoStatus == 'CANCELED')
      "
      v-slot:header-control
    >
      <!-- 封面状态为待表态时展示 -->
      <template v-if="isTobeStated">
        <iButton @click="save()">{{ language("LK_BAOCUN", "保存") }}</iButton>
        <!-- 保存之后才能提交 -->
        <iButton v-if="basicInfo.aekoCoverId" @click="save('submit')">{{
          language("LK_TIJIAO", "提交")
        }}</iButton>
      </template>
      <!-- 封面状态为已提交时可展示 -->
      <iButton v-if="basicInfo.coverStatus == 'SUBMITED'" @click="cancelCover">
        {{ language("LK_AEKO_CHEHUI", "撤回") }}
        <el-tooltip
          :content="`${language(
            'LK_AEKO_COVER_TIPS_FENGMIANBIAOTAIHENEIRONGBIAOTAIJIANGYIBINGCHEHUI',
            '审批前，可对已提交的的单据进行撤回。封面表态和内容表态将被一并撤回。'
          )}`"
          placement="top"
        >
          <i class="el-icon-warning-outline font18 tipsIcon"></i>
        </el-tooltip>
      </iButton>
      <iButton v-if="isTobeStated" @click="resetCover">{{
        language("LK_ZHONGZHI", "重置")
      }}</iButton>
    </template>
    <!-- 可编辑头 -->
    <iFormGroup
      :key="basicInfo.isReference"
      :model="basicInfo"
      ref="ruleForm"
      :rules="rules"
      row="4"
      class="basic-form"
      :validate-on-rule-change="false"
      :show-message="false"
    >
      <iFormItem
        v-for="(item, index) in basicTitle"
        :key="index"
        :required="item.required"
        :label="language(item.labelKey, item.label) + ':'"
        v-permission.dynamic.auto="item.editPermissionKey"
        :label-width="item.labelWidth || '10rem'"
        :prop="item.props"
      >
        <template v-if="item.editable && isEdit">
          <el-tooltip
            class="item"
            effect="dark"
            :disabled="!item.tooltip || !basicInfo.getFsName"
            :content="basicInfo.getFsName"
            placement="top"
          >
            <template v-if="item.type === 'input'">
              <!-- 新⾸批送样周期(周数)处理正整数 -->
              <iInput
                v-if="item.props == 'sendCycle'"
                :disabled="disabled"
                @input="handleNumber($event, basicInfo, 'sendCycle')"
                v-model="basicInfo[item.props]"
              />
              <iInput
                v-else
                :disabled="disabled"
                v-model="basicInfo[item.props]"
              />
            </template>
            <iSelect
              v-else-if="item.type === 'select'"
              :filterable="item.filterable"
              :clearable="item.clearable"
              v-model="basicInfo[item.props]"
              :filter-method="
                (val) => {
                  dataFilter(val, item.selectOption);
                }
              "
              @visible-change="selectVisibleChange($event, item.selectOption)"
              :disabled="selectDisabled(item.props)"
              :multiple="item.multiple"
              collapse-tags
              @change="handleMultipleChange($event, item.props, item.multiple)"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in selectOptions[item.selectOption]"
                :key="item.value"
              ></el-option>
            </iSelect>
          </el-tooltip>
        </template>
        <iText v-else>{{ basicInfo[item.props] }}</iText>
      </iFormItem>
      <iFormItem prop="remark" class="remark-width">
        <p class="margin-bottom10 remark-label">
          {{ language("LK_BEIZHU", "备注") }}:
        </p>
        <iInput
          type="textarea"
          rows="10"
          class="text-disabled"
          v-model="basicInfo.remark"
          :disabled="disabled"
          v-permission.auto="
            AEKO_DETAIL_TAB_FENGMIAN_INPUT_TIPS | 封面表态备注框_编辑
          "
        />
      </iFormItem>
    </iFormGroup>
    <div
      class="margin-top50"
      v-permission.auto="
        AEKO_DETAIL_TAB_FENGMIAN_TABLE_LINIE_LINE | 封面表态费用表单_编辑
      "
    >
      <el-form
        class="basic-form"
        :key="basicInfo.isReference"
        :model="{ tableData }"
        :rules="rules"
        ref="tableForm"
        :show-message="false"
      >
        <!-- 表格区域 -->
        <tableList
          index
          :lang="true"
          :selection="false"
          :tableData="tableData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
        >
          <!-- 增加材料成本(RMB/⻋) -->
          <template #materialIncrease="scope">
            <el-form-item
              :prop="'tableData.' + scope.index + '.materialIncrease'"
              :rules="rules.materialIncrease"
            >
              <div class="table-materialIncrease" style="width: 120px">
                <thousandsFilterInput
                  class="thousandsFilterInput"
                  v-if="disabled"
                  :filterDisabled="disabled"
                  :inputValue="scope.row['materialIncrease']"
                  style="width: 100px"
                />
                <iInput
                  v-else
                  :disabled="disabled"
                  v-model="scope.row['materialIncrease']"
                  @input="handleNumber($event, scope.row, 'materialIncrease')"
                  style="width: 100px"
                />
                <!-- <span class="icon-tips" v-if="scope.row.isShowTips">
                <el-tooltip v-if="scope.row['expressionList'].length > 1" placement="top" effect="light" >
                  <div slot="content">
                    <p class="font-weight margin-bottom5" style="text-align:center">{{scope.row['expressionList'][0] || ''}}</p>
                    <p class="font16" style="color:#747F9D;text-align:center">{{scope.row['expressionList'][1] || ''}}</p>
                  </div>
                  <i class="el-icon-warning-outline font18 tipsIcon"></i>
                </el-tooltip>


                <i v-else class="el-icon-warning-outline font18 tipsIcon grey"></i>
              </span> -->
              </div>
            </el-form-item>
          </template>
          <!-- 增加投资费⽤(不含税) -->
          <template #investmentIncrease="scope">
            <el-form-item
              :prop="'tableData.' + scope.index + '.investmentIncrease'"
              :rules="rules.investmentIncrease"
            >
              <thousandsFilterInput
                class="thousandsFilterInput"
                v-if="disabled"
                :filterDisabled="disabled"
                :inputValue="scope.row['investmentIncrease']"
                style="width: 100px"
              />
              <iInput
                v-else
                :disabled="disabled"
                v-model="scope.row['investmentIncrease']"
                @input="handleNumber($event, scope.row, 'investmentIncrease')"
                style="width: 100px"
              />
            </el-form-item>
          </template>
          <!-- 其他费⽤(不含税) -->
          <template #otherCost="scope">
            <el-form-item
              :prop="'tableData.' + scope.index + '.otherCost'"
              :rules="rules.otherCost"
            >
              <thousandsFilterInput
                class="thousandsFilterInput"
                v-if="disabled"
                :filterDisabled="disabled"
                :inputValue="scope.row['otherCost']"
                style="width: 100px"
              />
              <iInput
                v-else
                :disabled="disabled"
                v-model="scope.row['otherCost']"
                @input="handleNumber($event, scope.row, 'otherCost')"
                style="width: 100px"
              />
            </el-form-item>
          </template>
        </tableList>
      </el-form>
      <p class="bottom-tips margin-top20">
        Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder
        Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder
        Invest≥10,000,000 RMB
      </p>
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iFormGroup,
  iFormItem,
  iInput,
  iSelect,
  iText,
  iMessage,
} from "rise";
import {
  previewBaicFrom,
  coverTableTitleCost,
  fromRules,
  BaicFrom,
} from "../../data";
import tableList from "../tableList";
import { pageMixins } from "@/utils/pageMixins";
import { numberProcessor } from "@/utils";
import { cloneDeep } from "lodash";
import {
  getLinieCoverDetail,
  getFsUser,
  coverSave,
  coverSubmit,
  coverCancel,
  checkAekoContentSubmitState,
  getCoverDetail,
  resetCover,
} from "@/api/aeko/detail/cover.js";
import thousandsFilterInput from "rise/web/aeko/quotationdetail/components/thousandsFilterInput";
export default {
  name: "editCover",
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iFormGroup,
    iFormItem,
    iInput,
    iSelect,
    iText,
    tableList,
    thousandsFilterInput,
  },
  props: {
    currentTab: { type: String },
    aekoInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),

    // adeko状态已冻结或者已撤销 禁用操作按钮 || 封面状态不为待表态时禁用
    disabled() {
      const { aekoInfo = {}, basicInfo = {} } = this;
      return (
        aekoInfo.aekoStatus == "FROZEN" ||
        aekoInfo.aekoStatus == "CANCELED" ||
        basicInfo.coverStatus != "TOBE_STATED"
      );
    },

    // 封面状态为待表态或者为空时展示保存提交重置按钮
    isTobeStated() {
      const { basicInfo = {} } = this;
      return (
        basicInfo.coverStatus == "TOBE_STATED" || basicInfo.coverStatus == ""
      );
    },

    // 是否显示提示信息
    showTip() {
      const { basicInfo = {} } = this;
      // 更改零件名称, 主要供应商, 新⾸批送样周期(周数) 三个没有值
      // 封面状态不为待表态，指定前期采购有值
      let flag = ["partName", "mainSupplier", "sendCycle"].some((item) => {
        return !(basicInfo[item] === "" || basicInfo[item] === null);
      });
      return (
        !flag && basicInfo.getFsName && basicInfo.coverStatus != "TOBE_STATED"
      );
    },
  },
  data() {
    return {
      isEdit: true,
      basicTitle: previewBaicFrom,
      basicInfo: {
        // fsName: [],
        isReference: "",
      },
      selectOptions: {
        isReference: [
          { label: "是", value: 1 },
          { label: "否", value: 0 },
        ],
        isTop: [
          { label: "是", value: 1 },
          { label: "否", value: 0 },
        ],
        isEffectpro: [
          { label: "是", value: 1 },
          { label: "否", value: 0 },
        ],
        fsList: [],
      },
      selectOptionsCopy: {
        fsList: [],
      },
      tableData: [],
      tableTitle: coverTableTitleCost,
      tableLoading: false,
      btnLoading: false,
      rules: null,
    };
  },
  watch: {
    // tab 页切换到审批记录时，查询数据
    currentTab: {
      handler(val) {
        if (val == "cover") {
          this.getDetail();
          this.getSearchUserList();
        }
      },
      immediate: true,
    },
    "$i18n.locale"(val) {
      this.rules = fromRules(this, this.basicInfo.isReference);
      this.$nextTick(() => {
        this.$refs["ruleForm"].validate();
        this.$refs["tableForm"].validate();
      });
    },
    "basicInfo.isReference": {
      deep: true,
      immediate: true,
      handler(val) {
        this.basicTitle = BaicFrom(val ? true : false);
        this.rules = fromRules(this, val ? true : false);
        // this.basicTitle = BaicFrom()
        // this.rules = fromRules(this)
        this.tableTitle.forEach((item) => {
          item.require = val ? true : false;
          // item.require = true
        });
      },
    },
  },
  created() {
    console.log(this.currentTab);
    // this.getDetail();
    // this.getSearchUserList();
  },
  methods: {
    // 获取详情
    async getDetail() {
      this.tableLoading = true;
      const { query } = this.$route;
      const { requirementAekoId = "" } = query;
      await getLinieCoverDetail({ requirementAekoId })
        .then((res) => {
          this.tableLoading = false;
          const { code, data = {} } = res;
          if (code == 200) {
            // const { fsId = "", coverCostsWithCarType = [], fsName } = data;
            // const { fsId = "", coverCostsWithCarType = [] } = data;
            const { coverCostsWithCarType = [] } = data;

            const costData = cloneDeep(coverCostsWithCarType);
            costData.map((item) => {
              item.investmentIncrease =
                this.fixNumber(item.investmentIncrease, 0) || 0;
              item.otherCost = this.fixNumber(item.otherCost, 0) || 0;

              item.isShowTips =
                item.materialIncrease == item.calMaterialIncrease;
              // 提示计算公式的字符串拆分一下
              item.expressionList = item.expression
                ? item.expression.split("<br/>")
                : [];

              item.materialIncrease = item.materialIncrease || "";
            });

            this.basicInfo = {
              ...data,
              coverCostsWithCarType: costData,
              // fsName: fsId && fsId.split(","),
              // getFsName: fsName,
            };

            this.tableData = costData;
          } else {
            this.$message.error(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          }
        })
        .catch((err) => {
          this.tableLoading = false;
        })
        .finally(() => {
          this.$nextTick(() => {
            this.$refs["ruleForm"].clearValidate();
            this.$refs["tableForm"].clearValidate();
          });
        });
    },
    // 获取前期采购员下拉列表
    async getSearchUserList() {
      await getFsUser().then((res) => {
        const { code, data = [] } = res;
        if (code == 200) {
          data.map((item) => {
            item.label = item.nameZh;
            item.value = item.id;
          });
          this.selectOptions["fsList"] = data;
          this.selectOptionsCopy["fsList"] = data;
        } else {
          this.$message.error(
            this.$i18n.locale === "zh" ? res.desZh : res.desEn
          );
        }
      });
    },
    // 给表头添加*
    // headerClass(row){
    //   const { columnIndex } = row;
    //   const list = [2,3,4];
    //   if(list.includes(columnIndex)){
    //     return 'label-require'
    //   }
    // },

    handleNumber(val, row, props) {
      if (props == "sendCycle") {
        this.$set(row, props, numberProcessor(val, 0));
      } else {
        this.$set(row, props, numberProcessor(val, 2, true));
      }
    },
    // 保存或者提交
    async save(type = "save") {
      const { basicInfo, selectOptions } = this;
      const { fsList = [] } = selectOptions;
      // const fsName = fsList.filter((item) => item.value == basicInfo.fsName);
      const { query } = this.$route;
      const { requirementAekoId = "" } = query;
      // 指定前期采购员参数需要处理一下
      const data = {
        ...basicInfo,
        coverCosts: basicInfo.coverCostsWithCarType || [],
        // fsId: basicInfo.fsName.join(","),
        // fsName: fsName.length ? fsName[0].label : basicInfo.getFsName,
        requirementAekoId,
        getFsName: undefined,
      };
      this.btnLoading = true;
      if (type == "submit") {
        // 提交
        const validate = this.validateData(data);
        if (!validate) {
          this.btnLoading = false;
          this.$message.warning(
            this.language("BITIANXIANGBUNENGWEIKONG", "必填项不能为空")
          );
          return;
        }
        // 提交前需校验下审批情况
        await checkAekoContentSubmitState(requirementAekoId)
          .then((res) => {
            if (res.code == 200) {
              if (res.data) {
                const tips = this.language(
                  "LK_TIPS_AKEO_COVER_DANGQIANFENGMIANXIAYOUDAISHENPIDENEIRONGBIAOTAI",
                  "当前封面下有已提交待审批的内容表态，将和封面一同提交审批。"
                );
                this.$message({
                  type: "success",
                  message: tips,
                  duration: 2000,
                  onClose: () => {
                    this.submitCover(data);
                  },
                });
                // this.submitCover(data);
              } else {
                this.$confirm(
                  "Aeko " +
                    this.aekoInfo.aekoCode +
                    " " +
                    this.language(
                      "SHIFOUJINTJIAOFENGMIANBIAOTAI",
                      "内容表态尚未提交，是否确认仅提交封面表态（如无需内容表态审批，请直接点击确认按钮）"
                    ),
                  this.language("LK_AEKO_NEIRONGBIAOTAI_CAOZUO", "操作")
                )
                  .then(() => {
                    this.submitCover(data);
                  })
                  .catch(() => {
                    this.btnLoading = false;
                  });
                // this.submitCover(data);
              }
            } else {
              this.$message.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .catch(() => {
            this.btnLoading = false;
          });
        return;
      } else {
        // 保存
        await coverSave(data)
          .then((res) => {
            this.btnLoading = false;
            const { code } = res;
            if (code == 200) {
              this.$message.success(
                this.language("LK_CAOZUOCHENGGONG", "操作成功")
              );
              this.getDetail();
            } else {
              this.$message.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .catch((err) => {
            this.btnLoading = false;
          });
      }
    },

    // 提交封面表态
    async submitCover(data) {
      await coverSubmit(data)
        .then((res) => {
          this.btnLoading = false;
          const { code } = res;
          if (code == 200) {
            this.$message.success(
              this.language("LK_CAOZUOCHENGGONG", "操作成功")
            );
            this.$emit("getBbasicInfo");
            this.getDetail();
          } else {
            this.$message.error(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          }
        })
        .catch((err) => {
          this.btnLoading = false;
        });
    },

    // 提交时校验一下
    validateData(data) {
      const { basicTitle } = this;
      let isValidate = true;
      this.$refs["tableForm"].validate((res) => {
        isValidate = isValidate && res;
      });
      this.$refs["ruleForm"].validate((res) => {
        isValidate = isValidate && res;
      });
      // for(let i=0;i<basicTitle.length;i++){
      //   const basic = basicTitle[i];
      //   if(basic['required']){
      //       if((!data[basic['props']] && basic['type']=='input') || (data[basic['props']]==='' && basic['type']=='select')){
      //         const tips = this.language(basicTitle[i]['labelKey'],basicTitle[i]['label'])+this.language('LK_AEKO_BUNENGWEIKONG','不能为空');
      //         this.$message.warning(tips);
      //         isValidate = false;
      //         break;
      //       }
      //   }
      // }

      // 备注
      // if(isValidate && !data.remark){
      //   const tips = this.language('LK_BEIZHU','备注')+this.language('LK_AEKO_BUNENGWEIKONG','不能为空');
      //   this.$message.warning(tips);
      //   isValidate = false;
      // }

      // 表格内输入框
      // if(isValidate){
      //   const {coverCostsWithCarType} = data;
      //   for(let i=0;i<coverCostsWithCarType.length;i++){
      //     const cost = coverCostsWithCarType[i] || {};
      //     if(!cost['investmentIncrease'] || !cost['materialIncrease'] ||!cost['otherCost']){
      //       const tips = this.language('LK_AEKO_BIAODANNEIFEIYONG','表单内费用') + this.language('LK_AEKO_BUNENGWEIKONG','不能为空');
      //       this.$message.warning(tips);
      //       isValidate = false;
      //       break;
      //     }
      //   }
      // }
      return isValidate;
    },

    // 费用千分位处理
    fixNumber(str, precision = 2) {
      if (!str) return "";
      var re = /(?=(?!(\b))(\d{3})+$)/g;
      str += "";
      var fixstr = str.replace(re, ",");
      if (precision == 0) {
        // 若小数点后两位是 .00 去除小数点后两位
        var last = fixstr.substr(fixstr.length - 3, 3);
        if (last == ".00") fixstr = fixstr.substr(0, fixstr.length - 3);
      }
      return fixstr;
    },

    // 撤回
    async cancelCover() {
      const { basicInfo } = this;
      const { aekoCoverId } = basicInfo;
      this.btnLoading = true;
      await coverCancel({ aekoCoverId })
        .then((res) => {
          this.btnLoading = false;
          if (res.code == 200) {
            this.$message.success(
              this.language("LK_CAOZUOCHENGGONG", "操作成功")
            );
            this.getDetail();
          } else {
            this.$message.error(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          }
        })
        .catch((err) => {
          this.btnLoading = false;
        });
    },

    // 指定前期采购员模糊搜索处理
    // dataFilter(val, props) {
    //   // 去除前后空格
    //   const trimVal = val.trim();
    //   const { selectOptions = [], selectOptionsCopy = [] } = this;
    //   if (trimVal) {
    //     // 人名要特殊处理 --- 可搜索英文去除大小写
    //     if (props == "fsList") {
    //       const list = selectOptions[props].filter((item) => {
    //         if (
    //           !!~item.nameZh.indexOf(trimVal) ||
    //           (item.nameEn &&
    //             !!~item.nameEn.toUpperCase().indexOf(trimVal.toUpperCase()))
    //         ) {
    //           return true;
    //         }
    //       });
    //       this.selectOptions[props] = list;
    //     }
    //   } else {
    //     this.selectOptions[props] = selectOptionsCopy[props];
    //   }
    // },
    // selectVisibleChange(visible, key) {
    //   switch (key) {
    //     case "fsList":
    //       if (!visible) {
    //         this.selectOptions["fsList"] = this.selectOptionsCopy["fsList"];
    //       }
    //       break;
    //     default:
    //   }
    // },

    // 未保存的情况下 是否相关 字段禁用
    selectDisabled(type) {
      const { disabled, basicInfo } = this;
      return disabled || (type == "isReference" && !basicInfo.aekoCoverId);
    },

    // 重置
    resetCover() {
      const { query } = this.$route;
      const { requirementAekoId = "" } = query;
      const { userInfo = {} } = this;
      const { deptDTO = {} } = userInfo;
      const data = {
        requirementAekoId,
        deptNum: deptDTO.deptNum,
      };
      this.getDetail();
      resetCover(data);
    },
    // handleMultipleChange(val, props, multiple) {
    //   if (props == "fsName" && multiple) {
    //     const list = this.selectOptionsCopy["fsList"] || [];
    //     const filterList = list.filter((item) => val.includes(item.value));
    //     this.basicInfo["getFsName"] = filterList
    //       .map((item) => item.label)
    //       .join(",");
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.aeko-editCover {
  padding-top: 20px;
  .basic-form {
    ::v-deep .el-form-item {
      &.is-error {
        .el-input {
          .el-input__inner {
            border-color: #ef3737;
          }
        }
        .el-textarea {
          .el-textarea__inner {
            border-color: #ef3737;
          }
        }
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
  .remark-label {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #4b4b4c;
    text-align: left;
    &::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
      display: inline-block;
    }
  }
  .remark-width {
    width: 100%;
  }
  ::v-deep .el-textarea {
    &.text-disabled.is-disabled .el-textarea__inner {
      color: #505050;
    }
  }
  .bottom-tips {
    color: #8c96a7;
  }
  .table-materialIncrease {
    position: relative;
    margin: 0 auto;
    .icon-tips {
      position: absolute;
      right: -15px;
      top: 6px;
      .tipsIcon {
        transform: rotate(180deg);
        color: #67C23A;
        &.grey {
          color: grey;
        }
      }
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
  .thousandsFilterInput {
    margin: 0 auto;
  }
  .tip {
    font-size: 12px !important;
    color: red;
    vertical-align: top;
  }
}
</style>
