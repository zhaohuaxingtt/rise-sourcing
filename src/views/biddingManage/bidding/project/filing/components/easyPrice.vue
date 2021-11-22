<template>
  <div>
    <iCard class="card" :title="language('BIDDING_XIANGMUXINXI', '项目信息')" collapse>
      <div>
        <el-form
          :model="ruleForm"
          label-width="17%"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
          :disabled="
            ruleForm.biddingStatus === '08' ||
            ruleForm.biddingStatus === '02' ||
            ruleForm.biddingStatus === '03'
          "
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem
                  :label="language('BIDDING_QISHINIANYUE', '起始年月')"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel
                    :label="language('BIDDING_QISHINIANYUE', '起始年月')"
                    slot="label"
                    required
                  ></iLabel>
                  <iDatePicker
                    style="width: 50%"
                    :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                    value-format="yyyy-MM"
                    type="month"
                    v-model="ruleForm.beginMonth"
                    disabled
                  />
                </iFormItem>
                <iFormItem :label="language('BIDDING_CHEXING', '车型')" prop="models" class="mutiple-form">
                  <iLabel :label="language('BIDDING_CHEXING', '车型')" slot="label" required></iLabel>
                  <iSelect
                    v-model="ruleForm.models"
                    multiple
                    filterable
                    :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                    disabled
                  >
                    <el-option
                      v-for="item in modelsOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </div>
              <div class="form-row">
                <iFormItem :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')" prop="modelProjects" class="mutiple-form">
                  <iLabel
                    :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')"
                    slot="label"
                    required
                  ></iLabel>
                  <iSelect
                    v-model="ruleForm.modelProjects"
                    multiple
                    filterable
                    :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
                    disabled
                  >
                    <el-option
                      v-for="item in modelProjectsOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
                <!-- 单价 -->
                <iFormItem
                  :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                  v-if="ruleForm.biddingMode === '01'"
                >
                  <iLabel :label="language('BIDDING_QISHIZONGJIA', '起始总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      v-model="startingPrice"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <!-- 总价 -->
                <iFormItem :label="language('BIDDING_QISHIZONGJIA', '起始总价')" prop="totalPrices" v-else>
                  <iLabel
                    :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                    slot="label"
                    required
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      v-if="flag"
                      class="form--item--number--input__center"
                      :value="ruleForm.totalPrices"
                      @input="handleInputChange"
                      @blur="handleInputBlur"
                      disabled
                    ></iInput>
                    <iInput
                      v-else
                      class="form--item--number--input__center"
                      :value="totalStartingPriceString"
                      @focus="handleInputFocus"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row">
                <iFormItem :label="language('BIDDING_DAXIE', '大写')">
                  <iLabel :label="language('BIDDING_DAXIE', '大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      v-if="ruleForm.biddingMode === '01'"
                      class="form--item--number--input"
                      v-model="numberUppercase"
                      disabled
                    ></iInput>
                    <iInput
                      v-else
                      class="form--item--number--input"
                      v-model="totalNumberUppercaseString"
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem />
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </iCard>

    <!-- 产品信息 -->
    <!-- <iCard class="card" :title="language('产品信息', '产品信息')">
      <div class="card--body">
        <commonTable
          ref="tableDataForm"
          :tableData="ruleForm.products"
          :tableTitle="ruleForm.biddingMode === '02' ? totalTableTitle : unitTableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        >
        </commonTable>
      </div>
    </iCard> -->
  </div>
</template>

<script>
import {
  iCard,
  iButton,
  iInput,
  iFormItem,
  iLabel,
  iSelect,
  iDatePicker,
} from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import {
  unitTableTitle,
  totalTableTitle,
  baseRules,
  currencyMultipleLib,
} from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
} from "@/api/mock/mock";
import {
  findMultiPrice,
  saveUnitPrice,
  getRfqInfo,
} from "@/api/bidding/bidding";
import Big from "big.js";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iFormItem,
    iLabel,
    iSelect,
    iDatePicker,
  },
  props: {
    id: String,
    initData: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {},
  data() {
    return {
      flag: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        totalPrices: 0,
      },
      unitTableTitle,
      totalTableTitle,
      inputProps: ["productName", "productCode"],
      selectProps: [],
      selectPropsOptionsObject: {},
      selectedTableData: [],
      isApprovalOption: [
        {
          model: this.language('demoData1', 'demoData1'),
          id: 1,
        },
        {
          model: this.language('demoData2', 'demoData2'),
          id: 2,
        },
        {
          model: this.language('demoData3', 'demoData3'),
          id: 3,
        },
      ],
      modelsOption: [],
      modelProjectsOption: [],
      totalStartingPrice: 0,
      currencyUnit: {},
      rfqinfoProduct: [],
      rfqinfoProductCopy: [],
      timeout: "",
      quantityUnit: [],
    };
  },
  mounted() {
    this.updateRuleForm(this.initData);
    getModels().then((res) => {
      this.modelsOption = res?.data.filter((item) => item.name?.length > 0);
    });
    getProjects().then((res) => {
      this.modelProjectsOption = res?.data.filter(
        (item) => item.name?.length > 0
      );
    });
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    getUnits({}).then((res) => {
      this.quantityUnit = res.data;
    });
    // getRfqInfo({ rfqCode: this.ruleForm.rfqCode }).then((res) => {
    //   this.rfqinfoProduct = res.products;
    //   // this.rfqinfoProductCopy = res.products;
    // });
    // this.rfqinfoProductCopy = this.loadAll();
  },
  computed: {
    unit() {
      return this.currencyUnit[this.ruleForm.currencyUnit];
    },
    tableListData() {
      return this.ruleForm.biddingProducts?.slice(
        (this.page.currPage - 1) * 10,
        (this.page.currPage - 1) * 10 + 10
      );
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    currencyMultiple() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.unit || "元";
    },
    orgTotalPrices() {
      let biddingProducts = this.ruleForm.biddingProducts;
      return biddingProducts.reduce(
        (sum, item) =>
          isNaN(Number(item.purchaseQty)) || isNaN(Number(item.upsetPrice))
            ? sum
            : Big(item.purchaseQty || 0)
                .times(item.upsetPrice || 0)
                .add(sum)
                .toNumber(),
        0
      );
    },
    numberUppercase() {
      return digitUppercase(
        Big(this.orgTotalPrices).times(this.beishu).toNumber()
      );
    },
    totalNumberUppercaseString() {
      return digitUppercase(
        Big(Number(this.ruleForm.totalPrices)).times(this.beishu).toNumber()
      );
    },
    startingPrice() {
      return this.orgTotalPrices + this.currencyMultiple;
    },
    totalStartingPriceString() {
      if (this.ruleForm.totalPrices == null) {
        return 0 + this.currencyMultiple;
      }
      return this.ruleForm.totalPrices + this.currencyMultiple;
    },
  },
  methods: {
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    querySearch(queryString, cb) {
      console.log(this.rfqinfoProductCopy);
      console.log(this.rfqinfoProduct);

      // 假数据
      const restaurants = this.rfqinfoProductCopy;
      let data = this.rfqinfoProductCopy.filter((item) => {
        if (item.value == queryString) {
          return item.value;
        }
      });
      // 接口数据，不起作用
      // const restaurants = this.rfqinfoProduct;
      // let data = this.rfqinfoProduct.filter((item) => {
      //   if (item.fsnrGsnr == queryString) {
      //     return item.fsnrGsnr;
      //   }
      // });

      const results = queryString ? data : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 精准搜索
    dataFilter(val) {
      let data = this.rfqinfoProduct.filter((item) => {
        if (item.fsnrGsnr == val) {
          return item.fsnrGsnr;
        }
      });

      this.rfqinfoProduct = data;
    },
    filterChange(val) {
      if (!val) {
        this.rfqinfoProduct = this.rfqinfoProductCopy;
      }
    },
    rfqinfoChange(e) {
      let obj = this.rfqinfoProduct.filter((item) => {
        return e.fsnrGsnr === item.fsnrGsnr;
      });
      e.productName = obj[0]?.productName;
      e.productCode = obj[0]?.productCode;
    },
    handleInputFocus() {
      this.flag = true;
    },
    handleInputBlur() {
      this.flag = false;
      // this.ruleForm.totalPrices = isNaN(Number(this.ruleForm.totalPrices))
      //   ? this.ruleForm.totalPrices
      //   : Big(Number(this.ruleForm.totalPrices)).toFixed(2);
    },
    handleInputChange(val) {
      let reg = /^[\d]{0,15}(\.[\d]{0,2})?$/;
      if (val && !reg.test(val)) {
        return;
      }
      this.ruleForm.totalPrices = val;
    },
    handlePre() {
      if (this.ruleForm.biddingProducts.length == 0) {
        return this.$message.error(this.language('BIDDING_CPXXBNWK',"产品信息不能为空"));
      }
      // this.$confirm("是否保存该项目信息？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      //   this.submitForm("ruleForm", "tableDataForm", () => {
      //     this.$router.push({
      //       name: "biddingCompetitionBase",
      //     });
      //   });
      // });
      this.submitForm("ruleForm", "tableDataForm", () => {
        this.$router.push({
          name: "biddingCompetitionBase",
        });
      });
    },
    handleNext() {
      if (this.ruleForm.biddingProducts.length == 0) {
        return this.$message.error(this.language('BIDDING_CPXXBNWK',"产品信息不能为空"));
      }
      // this.$confirm("是否保存该项目信息？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      //   this.submitForm("ruleForm", "tableDataForm", () => {
      //     this.$router.push({
      //       name: "biddingCompetitionQuotation",
      //     });
      //   });
      // });
      this.submitForm("ruleForm", "tableDataForm", () => {
        this.$router.push({
          name: "biddingCompetitionQuotation",
        });
      });
    },
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    submitForm(formName, tableDataForm, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(tableDataForm, callback);
        } else {
          return;
        }
      });
    },
    submitTableForm(tableDataForm, callback) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          let modelList = [];
          this.ruleForm.models.forEach((item) => {
            this.modelsOption.forEach((option) => {
              if (option.code === item) {
                modelList.push({
                  biddingId: this.id,
                  model: option.name,
                  modelCode: option.code,
                });
              }
            });
          });
          let modelProjectList = [];
          this.ruleForm.modelProjects.forEach((item) => {
            this.modelProjectsOption.forEach((option) => {
              if (option.code === item) {
                modelProjectList.push({
                  biddingId: this.id,
                  project: option.name,
                  projectCode: option.code,
                });
              }
            });
          });
          let formData = { ...this.ruleForm };
          //起始总价
          if (this.ruleForm.biddingMode === "01") {
            //单价
            formData.totalPrices = this.orgTotalPrices;
            let reg = /^[\d]{0,15}(\.[\d]{0,6})?$/;
            if (!reg.test(formData.totalPrices)) {
              return this.$message.error(this.language('BIDDING_QSZJBNDY17W',"起始总价不能大于17位(含两位小数）"));
            }
          }
          formData.models = modelList;
          formData.modelProjects = modelProjectList;
          //保存
          saveUnitPrice(formData)
            .then((res) => {
              this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
              callback && callback();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return;
        }
      });
    },
    handleAddProduct() {
      this.ruleForm.biddingProducts.push({
        biddingId: this.id,
        fsnrGsnr: "",
        productName: "",
        productCode: "",
        purchaseQty: "",
        quantityUnit: "",
        upsetPrice: "",
        targetPrice: "",
        productParm: "",
      });
      this.page.total = this.ruleForm.biddingProducts.length;
      this.page.currPage = Math.ceil(this.page.total / this.page.pageSize);
    },
    query(e) {
      // 根据ID查询条款信息
      this.tableLoading = true;
      findMultiPrice(e)
        .then((res) => {
          this.updateRuleForm(res);
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
        models: data.models
          .map((item) => item),
        modelProjects: data.modelProjects
          .map((item) => item),
      };
      if(this.ruleForm.totalPrices){
        this.ruleForm.totalPrices= this.dividedBeiShu(this.ruleForm?.totalPrices);
      }
      if (!this.ruleForm.biddingProducts?.length) {
        this.handleAddProduct();
      } else {
        this.page.total = this.ruleForm.biddingProducts.length;
      }
      // if (this.ruleForm.biddingMode === "02") {
      //   //总价
      //   this.ruleForm.totalPrices = Big(this.ruleForm.totalPrices || 0)
      //     .times(this.beishu)
      //     .toNumber();
      // }
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
    },
    handleDeleteTable() {
      let indexs = this.selectedTableData.map((e) => e.index);
      this.ruleForm.biddingProducts = this.ruleForm.biddingProducts.filter(
        (item, index) => {
          return !indexs.includes(index);
        }
      );
      // if (this.tableListData.length === 0 && this.page.currPage !== 1) {
      //   this.page.currPage = this.page.currPage - 1;
      // }
      // this.page.total = this.ruleForm.biddingProducts.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 30px;
  .card--header {
    display: flex;
    justify-content: space-between;
    .card--header--item {
      font-size: 18px;
      font-weight: bold;
    }
    .card--header--item--btn {
      ::v-deep .el-button--default {
        min-width: 150px;
      }
    }
  }
  .card--body {
    margin-top: 20px;

    ::v-deep .el-table {
      .el-form-item {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }

  .form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .input-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .form-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        .el-form-item {
          width: 100%;
          .el-form-item__label {
            min-width: 17%;
          }
          .el-form-item__content {
            width: 100%;
            .el-select ::v-deep {
              height: auto;
              .el-select__tags {
                .el-tag {
                  background-color: #f7f7f7;
                  color: #000;
                  border-radius: 20px;
                  .el-tag__close {
                    color: #000000;
                    background-color: transparent;
                    font-size: large;
                    font-weight: bold;
                  }
                }
              }
            }
            .form--item--number {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              .form--item--number--lable {
                min-width: 8%;
                margin-left: 4%;
              }
              .form--item--number--input ::v-deep .el-input__inner {
                background-color: #f7f7f7;
                text-align: center;
              }
              .form--item--number--input__center ::v-deep .el-input__inner {
                text-align: center;
              }
            }
          }
        }
        .el-form-item + .el-form-item {
          margin-left: 80px;
        }
      }
    }
  }
}
::v-deep .mutiple-form {
  .el-input.is-disabled .el-input__inner {
    background-color: transparent;
  }
}
</style>
