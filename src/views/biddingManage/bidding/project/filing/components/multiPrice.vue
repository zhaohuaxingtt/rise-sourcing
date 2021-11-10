/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div>
    <iCard class="card" :title="language('BIDDING_XIANGMUXINXI', '项目信息')" collapse>
      <div>
        <el-form
          :model="ruleForm"
          label-width="9rem"
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
                <iFormItem
                  :label="language('BIDDING_CHEXING', '车型')"
                  :prop="ruleForm.roundType !== '03' ? 'models' : ''"
                  class="mutiple-form"
                >
                  <iLabel :label="language('BIDDING_CHEXING', '车型')" slot="label" required></iLabel>
                  <iSelect
                    v-model="ruleForm.models"
                    multiple
                    filterable
                    :placeholder="
                      ruleForm.roundType !== '03' ? language('BIDDING_QINGXUANZE', '请选择') : ''
                    "
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
                <iFormItem
                  :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')"
                  :prop="ruleForm.roundType !== '03' ? 'modelProjects' : ''"
                  class="mutiple-form"
                >
                  <iLabel
                    :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')"
                    slot="label"
                    required
                  ></iLabel>
                  <iSelect
                    v-model="ruleForm.modelProjects"
                    multiple
                    filterable
                    :placeholder="
                      ruleForm.roundType !== '03' ? language('BIDDING_QINGXUANZE', '请选择') : ''
                    "
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
                <iFormItem :label="language('BIDDING_QISHIZONGJIA', '起始总价')">
                  <iLabel :label="language('BIDDING_QISHIZONGJIA', '起始总价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :data-value="orgTotalPrices"
                      :value="
                        totalPriceFlag ? '0' + currencyMultiple : startingPrice
                      "
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
                      class="form--item--number--input"
                      :value="totalPriceFlag ? language('BIDDING_LINGYUANZHENG','零元整') : numberUppercase"
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
          :tableData="ruleForm.biddingProducts"
          :tableTitle="multiPleTableTitle"
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
import {
  multiPleTableTitle,
  baseRules,
  currencyMultipleLib,
  planBaseData,
  planBaseYear,
} from "./data";
import { pageMixins } from "@/utils/pageMixins";
import { digitUppercase } from "@/utils/digitUppercase";
import {
  getModels,
  getProjects,
  getCurrencyUnit,
  getUnits,
  getDiscount,
} from "@/api/mock/mock";
import {
  getRfqInfo,
  findMultiPrice,
  saveMultiPrice,
} from "@/api/bidding/bidding";
import Big from "big.js";
import dayjs from "dayjs";

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
  data() {
    return {
      factoryPricePercentFlag: true,
      totalPriceFlag: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        totalPrices: 0,
      },
      factoryPricePercent: "",
      multiPleTableTitle,
      priceProps: [
        "factoryPrice",
        "packingFee",
        "packingFee2",
        "transportFee",
        "operationFee",
        "moldFee",
        "developFee",
        "targetPrice",
      ],
      inputProps: [
        "factoryPrice",
        "packingFee",
        "packingFee2",
        "transportFee",
        "operationFee",
        "moldFee",
        "developFee",
        "targetPrice",
        "lifecycle",
        "aveAnnualOutput",
        "maxAnnualOutput",
      ],
      yearsPlanTableInputProps: [
        "stage1",
        "stage2",
        "stage3",
        "stage4",
        "stage5",
        "stage6",
        "stage7",
        "stage8",
        "stage9",
        "stage10",
        "stage11",
        "stage12",
        "stage13",
        "stage14",
        "stage15",
      ],
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      rfqinfoProduct: [],
      yearsPlanTable: [],
      purchasePlanTable: [],
      prefactoryPrice: 0,
      yearsPlan: [],
      annualOutput: [{
        title: "折现率",
        stage1: 1,
        stage2: 0.9,
        stage3: 0.81,
        stage4: 0.73,
        stage5: 0.66,
        stage6: 0.59,
        stage7: 0.53,
        stage8: 0.48,
        stage9: 0.43,
        stage10: 0.39,
        stage11: 0.35,
        stage12: 0.31,
        stage13: 0.28,
        stage14: 0.25,
        stage15: 0.23,
        }
      ],
    };
  },
  mounted() {
    this.handleSearchReset();
    
    getModels().then((res) => {
      this.modelsOption = res?.data?.filter((item) => item.name?.length > 0);
    });
    getProjects().then((res) => {
      this.modelProjectsOption = res?.data?.filter(
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
    getRfqInfo({ rfqCode: this.ruleForm.rfqCode }).then((res) => {
      this.rfqinfoProduct = res.products;
    });
  },
  computed: {
    disabledAll() {
      return this.ruleForm.roundType === "03" ? true : false;
    },
    unit() {
      return this.currencyUnit[this.ruleForm.currencyUnit];
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    currencyMultiple() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.unit || "元";
    },
    orgTotalPrices() {
      let biddingProducts = this.ruleForm.biddingProducts;
      return biddingProducts.reduce((sum, item, index) => {
        return isNaN(Number(item.factoryPrice)) ||
          isNaN(Number(item.moldFee)) ||
          isNaN(Number(item.developFee))
          ? sum
          : Big(this.calculationDetails(item, index)).add(sum).add(Number(item.moldFee)).add(Number(item.developFee)).toNumber();
      }, 0);
    },

    totalPrices() {
      return Big(this.orgTotalPrices).toFixed(2);
    },
    numberUppercase() {
      return digitUppercase(Big(this.orgTotalPrices).toFixed(2));
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    biddingProducts() {
      return this.ruleForm.biddingProducts;
    },
  },
  watch: {
    //监听年度降价计划 更新采购计划的降级计划
    yearsPlanTable: {
      handler(val, oldVal) {
        let yearsPlan = val[0];
        if (this.purchasePlanTable?.length > 0) {
          this.purchasePlanTable.forEach((e, index) => {
            if (index % 3 === 1) {
              // this.$set(
              //   this.purchasePlanTable[index],
              //   `stage${0 + 1}`,
              //   yearsPlan[`stage${0 + 1}`]
              // );
              let purchase = this.purchasePlanTable[index];
              purchase.stage1 = yearsPlan.stage1;
              purchase.stage2 = yearsPlan.stage2;
              purchase.stage3 = yearsPlan.stage3;
              purchase.stage4 = yearsPlan.stage4;
              purchase.stage5 = yearsPlan.stage5;
              purchase.stage6 = yearsPlan.stage6;
              purchase.stage7 = yearsPlan.stage7;
              purchase.stage8 = yearsPlan.stage8;
              purchase.stage9 = yearsPlan.stage9;
              purchase.stage10 = yearsPlan.stage10;
              purchase.stage11 = yearsPlan.stage11;
              purchase.stage12 = yearsPlan.stage12;
              purchase.stage13 = yearsPlan.stage13;
              purchase.stage14 = yearsPlan.stage14;
              purchase.stage15 = yearsPlan.stage15;
            }
          });
        }
      },
      deep: true,
    },
    //监听产品  计算B价 ==出厂价+包装费+运输费+操作费
    biddingProducts: {
      handler(val, oldVal) {
        if (val.length > 0)
          val.forEach((item) => {
            item.bPrice =
              isNaN(Number(item.factoryPrice)) ||
              isNaN(Number(item.packingFee)) ||
              isNaN(Number(item.packingFee2)) ||
              isNaN(Number(item.transportFee)) ||
              isNaN(Number(item.operationFee))
                ? item.bPrice
                : Big(item.factoryPrice || 0)
                    .add(item.packingFee || 0)
                    .add(item.packingFee2 || 0)
                    .add(item.transportFee || 0)
                    .add(item.operationFee || 0)
                    .toFixed(2);
          });
      },
      deep: true, //true 深度监听
    },
    //监听更新出厂价
    // factoryPricePercent(val, oldVal) {
    //   if (this.factoryPricePercentFlag)
    //     this.ruleForm.biddingProducts.forEach((e) => {
    //       const tmp = val || 100;
    //       if (!isNaN(Number(tmp)) && !isNaN(Number(oldVal))) {
    //         oldVal
    //           ? (e.factoryPrice = Big(e.factoryPrice || 0)
    //               .div(Number(oldVal) === 0 ? 1 : oldVal / 100)
    //               .times(Number(tmp) === 0 ? 1 : tmp / 100)
    //               .toNumber())
    //           : (e.factoryPrice = Big(e.factoryPrice || 0)
    //               .times(Number(tmp) === 0 ? 1 : tmp / 100)
    //               .toNumber());
    //       }
    //     });
    // },
  },
  methods: {
    //采购数量input事件
    handleInputNum(val, scope) {
      let stage = scope.column.property;
      const purchasePlanDateItem = this.purchasePlanTable[scope.$index - 2];
      let dateYear = new Date(purchasePlanDateItem[stage]).getFullYear();
      for (let i = 1; i < 16; i++) {
        if (purchasePlanDateItem[`stage${i}`].includes(dateYear)) {
          scope.row[`stage${i}`] = val;
        }
      }
    },
    //采购计划日期 input事件
    handleInputDate(val, scope) {
      let stage = scope.column.property;
      let dateYear = new Date(val).getFullYear();
      const purchaseQtyItem = this.purchasePlanTable[scope.$index + 2];
      for (let i = 1; i < 16; i++) {
        if (scope.row[`stage${i}`]?.includes(dateYear)) {
          purchaseQtyItem[stage] = purchaseQtyItem[`stage${i}`];
        }
      }
    },
    //产品操作事件
    handleClickOne(scope) {
      this.$nextTick(() => {
        var tr = document.querySelectorAll(
          "#purchasePlanTableForm .el-table__body-wrapper tr"
        )[scope.row.index * 3];
        document.querySelector(".routerpage").scrollTop =
          tr.getBoundingClientRect().top +
          document.querySelector(".routerpage").scrollTop -
          document.querySelector(".routerpage").getBoundingClientRect().top;
      });
    },
    calculationDetails(product, productIndex) {
      this.prefactoryPrice = Number(product?.factoryPrice);
      //折现率
      const discounts = this.annualOutput[0];
      //该零件产量日期{15年}
      const dateList = this.annualOutput[productIndex*2+1];
      //该零件产量{15年}
      const outputList = this.annualOutput[productIndex*2+2];
      //该零件降价计划日期
      const yearsPlanDate = this.yearsPlan[productIndex*2];
      //该零件降价百分比
      const yearsPlanPercent = this.yearsPlan[productIndex*2+1];
      //该零件年度总和
      let yearSum = 0;
      for (let i = 1; i < 16; i++) {
        //该零件该年度产量为0  不计算本次
        if(Number(outputList[`stage${i}`])===0){
          continue;
        }
        //本年产量日期
        let annualYesr = dayjs(dateList[`stage${i}`]).year();
        let dateArray= Object.values(yearsPlanDate);
        //产量年度在该零件年降计划出现次数数组count
        let count =dateArray.filter(item=>{
          if(item && item?.toString().includes(annualYesr)){
            return item;
          }
        })
        if(!dateList[`stage${i}`]){
          return 0;
        }
        //产量月份
        const month1 = dayjs(dateList[`stage${i}`]).month()+1;
        //当前月产量
        let monthCount=Big(outputList[`stage${i}`]).div(12-month1+1).toNumber();
        if(count.length && count.length===1){
          //2)产量年度在该零件年降计划中存在1个
          //年降月份
            const month = dayjs(count[0]).month()+1;
          // 年降前
          let downBefore = this.nlms({
            factoryPrice:this.prefactoryPrice,
            packingPrice:product.packingFee,
            transportPrice: product.transportFee,
            operatingPrice: product.operationFee,
            output:monthCount,
            monthCount:month-month1,
            discount:discounts[`stage${i}`]
          });
          //年降后
          this.prefactoryPrice=
          !yearsPlanPercent[`stage${i}`]?this.prefactoryPrice:Big(this.prefactoryPrice || 0)
          .times(
            Big(1)
              .minus(Number(yearsPlanPercent[`stage${i}`]) / 100)
              .toNumber()
          )
          .toNumber();
          let downAfter = this.nlms({
            factoryPrice:this.prefactoryPrice,
            packingPrice:product.packingFee,
            transportPrice: product.transportFee,
            operatingPrice: product.operationFee,
            output:monthCount,
            monthCount:13-month,
            discount:discounts[`stage${i}`]
          });
          yearSum=Big(yearSum).add(downBefore).add(downAfter).toNumber();
        }else if(count.length && count.length > 1){
          //3)产量年度在该零件年降计划中存在N（>1）个
          
          //第一次年降月份count[0]
            const month = dayjs(count[0]).month()+1;
          //第一次年降前
          let firstDownBefore = this.nlms({
            factoryPrice:this.prefactoryPrice,
            packingPrice:product.packingFee,
            transportPrice: product.transportFee,
            operatingPrice: product.operationFee,
            output:monthCount,
            monthCount:month-month1,
            discount:discounts[`stage${i}`]
          });
          //从第1次年降后到第N-1次年降后
          let betweenDown = count.reduce((sum, item, index) => {
            if(index>0){
              const betweenMonth = (dayjs(item).month()+1)-(dayjs(count[index-1]).month()+1);
              let num = Number(this.findKey(yearsPlanDate,item).slice(5));
              //计算本年出厂价
              this.prefactoryPrice=
              !yearsPlanPercent[`stage${i}`]?this.prefactoryPrice:Big(this.prefactoryPrice || 0)
              .times(
                Big(1)
                  .minus(Number(yearsPlanPercent[`stage${num-1}`]) / 100)
                  .toNumber()
              )
              .toNumber();
              return Big(this.nlms({
                factoryPrice:this.prefactoryPrice,
                packingPrice:product.packingFee,
                transportPrice: product.transportFee,
                operatingPrice: product.operationFee,
                output:monthCount,
                monthCount:betweenMonth,
                discount:discounts[`stage${i}`]
              })).add(sum).toNumber();
            }
            return sum;
          }, 0);
          
          //第N次年降月份
          const nMonth = dayjs(count[count.length-1]).month()+1;
          let nAfter = this.nlms({
            factoryPrice:this.prefactoryPrice,
            packingPrice:product.packingFee,
            transportPrice: product.transportFee,
            operatingPrice: product.operationFee,
            output:monthCount,
            monthCount:13-nMonth,
            discount:discounts[`stage${i}`]
          });
          yearSum=Big(yearSum).add(firstDownBefore).add(betweenDown).add(nAfter).toNumber();   
        }else{
          //1)产量年度在该零件年降计划中不存在
          yearSum=Big(yearSum).add(this.nlms({
            factoryPrice:this.prefactoryPrice,
            packingPrice:product.packingFee,
            transportPrice: product.transportFee,
            operatingPrice: product.operationFee,
            output:outputList[`stage${i}`],
            monthCount:1,
            discount:discounts[`stage${i}`]
          })).toNumber();
        }
      }
      return yearSum;
    },
    //总价基本计算公式
    nlms({
      factoryPrice,//出厂价
      packingPrice,//包装费
      transportPrice,//运输费
      operatingPrice,//操作费
      output,//产量
      monthCount,//月份数
      discount,//折现率
    }){
      if (
        isNaN(Number(factoryPrice)) ||
        isNaN(Number(packingPrice)) ||
        isNaN(Number(transportPrice)) ||
        isNaN(Number(operatingPrice))
      ) {
        return 0;
      }
      let productBaseSum= Big(factoryPrice || 0).add(packingPrice || 0).add(transportPrice || 0).add(operatingPrice || 0).toNumber();
      return Big(productBaseSum).times(output || 0).times(monthCount || 0).times(discount || 0).toNumber();
    },
    //根据value找到对象key
    findKey (obj,value, compare = (a, b) => a === b) {undefined
      return Object.keys(obj).find(k => compare(obj[k], value))
    },

    //FSNR/GSNR更改联动零件号 和 采购计划FSNR/GSNR、零件号
    rfqinfoChange(e) {
      let obj = this.rfqinfoProduct.filter((item) => {
        return e.fsnrGsnr === item.fsnrGsnr;
      });
      if (obj.length < 1) {
        return;
      }
      e.productName = obj[0]?.productName;
      e.productCode = obj[0]?.productCode;
      //3n
      this.purchasePlanTable[e.index * 3].title = obj[0]?.fsnrGsnr;
      this.purchasePlanTable[e.index * 3 + 1].title = obj[0]?.productCode;
    },
    //零件号更改联动采购计划零件号
    partNumberChange(e) {
      this.purchasePlanTable[e.index * 3 + 1].title = e.productCode;
    },
    //限制批量更新出厂价（%）：输入框，1~10000
    handleFactoryPricePercentInput(val) {
      let reg = /^([1-9]|[1-9]\d{0,3}|10000)$/;
      if (val && !reg.test(val)) {
        return;
      }
      this.factoryPricePercent = val;
      this.factoryPricePercentFlag = true;
    },
    //批量更新出厂价鼠标移出数据清空
    handleFactoryPricePercentBlur() {
      this.ruleForm.biddingProducts.forEach((e) => {
        const tmp = this.factoryPricePercent || 100;
        if (!isNaN(Number(tmp))) {
          e.factoryPrice = Big(e.factoryPrice || 0)
            .times(Number(tmp) === 0 ? 1 : tmp / 100)
            .toNumber();
        }
      });
      this.factoryPricePercent = "";
      this.factoryPricePercentFlag = false;
    },
    //上一步
    handlePre() {
      this.$confirm(this.language('BIDDING_SFBCGXMXX',"是否保存该项目信息？"), this.language('BIDDING_TISHI',"提示"), {
        confirmButtonText: this.language('BIDDING_SHI',"是"),
        cancelButtonText: this.language('BIDDING_FOU',"否"),
        type: "warning",
      }).then(() => {
        this.submitForm(
          "ruleForm",
          "tableDataForm",
          "yearsPlanTableForm",
          "purchasePlanTableForm",
          () => {
            this.$router.push({
              name: "biddingCompetitionBase",
            });
          }
        );
      });
    },
    //下一步
    handleNext() {
      this.$confirm(this.language('BIDDING_SFBCGXMXX',"是否保存该项目信息？"), this.language('BIDDING_TISHI',"提示"), {
        confirmButtonText: this.language('BIDDING_SHI',"是"),
        cancelButtonText: this.language('BIDDING_FOU',"否"),
        type: "warning",
      }).then(() => {
        this.submitForm(
          "ruleForm",
          "tableDataForm",
          "yearsPlanTableForm",
          "purchasePlanTableForm",
          () => {
            this.$router.push({
              name: "biddingCompetitionQuotation",
            });
          }
        );
      });
    },
    handleSearchReset() {
      this.purchasePlanTable = [];
      this.yearsPlanTable = [];
      let param = { id: this.id };
      this.query(param);
    },
    submitForm(
      formName,
      tableDataForm,
      yearsPlanTableForm,
      purchasePlanTableForm,
      callback
    ) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(
            tableDataForm,
            yearsPlanTableForm,
            purchasePlanTableForm,
            callback
          );
        } else {
          this.$message.error(this.language('BIDDING_XMXXSJYW',"项目信息数据有误！"));
          return;
        }
      });
    },
    submitTableForm(
      tableDataForm,
      yearsPlanTableForm,
      purchasePlanTableForm,
      callback
    ) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          this.submitYearsPlanTableForm(
            yearsPlanTableForm,
            purchasePlanTableForm,
            callback
          );
        } else {
          this.$message.error(this.language('BIDDING_CPXISJYW',"产品信息数据有误！"));
          return;
        }
      });
    },
    submitYearsPlanTableForm(
      yearsPlanTableForm,
      purchasePlanTableForm,
      callback
    ) {
      this.$refs[yearsPlanTableForm].$children[0].validate((valid) => {
        if (valid || this.ruleForm.biddingProducts.length == 0) {
          this.submitPurchasePlanTableForm(purchasePlanTableForm, callback);
        } else {
          this.$message.error("年降计划数据有误！");
          return;
        }
      });
    },
    submitPurchasePlanTableForm(purchasePlanTableForm, callback) {
      this.$refs[purchasePlanTableForm].$children[0].validate((valid) => {
        if (valid) {
          this.handleSaveData(callback);
        } else {
          this.$message.error(this.language('BIDDING_CGJHSJYW',"采购计划数据有误！"));
          return;
        }
      });
    },
    //数据验证通过提交数据
    handleSaveData(callback) {
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
      //年降计划
      let yearsPlans = [];
      for (let i = 1; i < 16; i++) {
        let obj = {
          biddingId: this.id,
          stage: i,
          cutPricePlan: this.yearsPlanTable[0][`stage${i}`],
          discountRate: this.yearsPlanTable[1][`stage${i}`],
          id: this.yearsPlanTable[0][`id${i}`],
        };
        yearsPlans.push(obj);
      }

      //采购计划
      let procurePlans = [];
      this.ruleForm.biddingProducts.forEach((item, index) => {
        for (let i = 1; i < 16; i++) {
          let obj = {
            stage: i,
            productId: item.id,
            productCode: this.purchasePlanTable[index * 3 + 1].title,
            procureYearMonth: this.purchasePlanTable[index * 3][`stage${i}`],
            cutPricePlan: this.purchasePlanTable[index * 3 + 1][`stage${i}`],
            procureNum: this.purchasePlanTable[index * 3 + 2][`stage${i}`],
            id: this.purchasePlanTable[index * 3 + 2][`id${i}`],
          };
          procurePlans.push(obj);
        }
      });
      let formData = { ...this.ruleForm };
      //起始总价
      formData.totalPrices = this.totalPrices;
      formData.models = modelList;
      formData.modelProjects = modelProjectList;
      formData.yearsPlans = yearsPlans;
      formData.procurePlans = procurePlans;
      //保存
      saveMultiPrice(formData)
        .then((res) => {
          this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
          callback && callback();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleAddProduct() {
      this.ruleForm.biddingProducts.push({
        biddingId: this.id,
        fsnrGsnr: "",
        productName: "",
        productCode: "",
        factoryPrice: "",
        packingFee: "",
        upsetPrice: "",
        packingFee2: "",
        transportFee: "",
        operationFee: "",
        bPrice: "",
        moldFee: "",
        developFee: "",
        targetPrice: "",
        quantityUnit: "",
        lifecycle: "",
        aveAnnualOutput: "",
        maxAnnualOutput: "",
      });
      this.handleAddPurchase();
      this.page.total = this.ruleForm.biddingProducts.length;
      this.page.currPage = Math.ceil(this.page.total / this.page.pageSize);
    },
    handleAddPurchase(e) {
      let nowYear = this.ruleForm.beginMonth;
      var date = "";
      if (nowYear) {
        date = new Date(nowYear);
      }
      let plan = this.yearsPlanTable[0];
      this.purchasePlanTable.push(
        {
          title: typeof e === "undefined" ? "" : e.fsnrGsnr,
          stage1: nowYear,
          stage2: date ? date.getFullYear() + 1 + "-01" : "",
          stage3: date ? date.getFullYear() + 2 + "-01" : "",
          stage4: date ? date.getFullYear() + 3 + "-01" : "",
          stage5: date ? date.getFullYear() + 4 + "-01" : "",
          stage6: date ? date.getFullYear() + 5 + "-01" : "",
          stage7: date ? date.getFullYear() + 6 + "-01" : "",
          stage8: date ? date.getFullYear() + 7 + "-01" : "",
          stage9: date ? date.getFullYear() + 8 + "-01" : "",
          stage10: date ? date.getFullYear() + 9 + "-01" : "",
          stage11: date ? date.getFullYear() + 10 + "-01" : "",
          stage12: date ? date.getFullYear() + 11 + "-01" : "",
          stage13: date ? date.getFullYear() + 12 + "-01" : "",
          stage14: date ? date.getFullYear() + 13 + "-01" : "",
          stage15: date ? date.getFullYear() + 14 + "-01" : "",
        },
        {
          title: typeof e === "undefined" ? "" : e.productCode,
          stage1: plan?.stage1,
          stage2: plan?.stage2,
          stage3: plan?.stage3,
          stage4: plan?.stage4,
          stage5: plan?.stage5,
          stage6: plan?.stage6,
          stage7: plan?.stage7,
          stage8: plan?.stage8,
          stage9: plan?.stage9,
          stage10: plan?.stage10,
          stage11: plan?.stage11,
          stage12: plan?.stage12,
          stage13: plan?.stage13,
          stage14: plan?.stage14,
          stage15: plan?.stage15,
        },
        {
          ...planBaseData,
        }
      );
    },
    handleAddYearPlan() {
      let obj = {
        title: "折现率",
        stage1: 1,
        stage2: 0.9,
        stage3: 0.81,
        stage4: 0.73,
        stage5: 0.66,
        stage6: 0.59,
        stage7: 0.53,
        stage8: 0.48,
        stage9: 0.43,
        stage10: 0.39,
        stage11: 0.35,
        stage12: 0.31,
        stage13: 0.28,
        stage14: 0.25,
        stage15: 0.23,
      };
      this.yearsPlanTable.splice(1, 0, obj);
    },
    async query(e) {
      // 根据ID查询条款信息
      this.tableLoading = true;
      let o = {...planBaseData,title:'折现率'};
      const res = await  getDiscount({});
      if(res?.data != null){
        res?.data?.md_discount_rate.map(item=>{
          let x = Number(item.code.replace('Y','0'));
          this.$set(o,`stage${x}`,item.describe)
        })
      }
      this.annualOutput[0]={...o};
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
        models: data.models?.map((item) => item.modelCode),
        modelProjects: data.modelProjects?.map((item) => item.projectCode),
      };
      
      //this.ruleForm.procurePlans 年降计划
      let o = {};
      if (this.ruleForm.procurePlans?.length) {
        o = this.ruleForm.procurePlans.reduce((obj, item) => {
          if (!obj[item.productId]) {
            obj[item.productId] = {
              yearMonth: { title: "" },
              cutPricePlan: { title: "" },
            };
          }
          obj[item.productId].yearMonth[`stage${item.stage}`] =
            item.procureYearMonth;
          obj[item.productId].yearMonth[`id${item.stage}`] = item.id;
          obj[item.productId].cutPricePlan[`stage${item.stage}`] =
            item.cutPricePlan;
          obj[item.productId].cutPricePlan[`id${item.stage}`] = item.id;
          return obj;
        }, {});
      }
      //this.ruleForm.productions 年产量
      let output = {};
      if (this.ruleForm.productions?.length) {
        output = this.ruleForm.productions.reduce((obj, item) => {
          if (!obj[item.productId]) {
            obj[item.productId] = {
              procureYearMonth: { title: "" },
              procureNum: { title: "" },
            };
          }
          obj[item.productId].procureYearMonth[`stage${item.stage}`] =
            item.procureYearMonth;
          obj[item.productId].procureYearMonth[`id${item.stage}`] = item.id;
          obj[item.productId].procureNum[`stage${item.stage}`] =
            item.procureNum;
          obj[item.productId].procureNum[`id${item.stage}`] = item.id;
          return obj;
        }, {});
      }
      this.ruleForm.biddingProducts?.forEach((item) => {
          this.yearsPlan.push({
            ...planBaseYear,
            ...o[item.id]?.yearMonth,
            title: item.fsnrGsnr,
          });
          this.yearsPlan.push({
            ...planBaseYear,
            ...o[item.id]?.cutPricePlan,
            title: item.productCode,
          });
          this.annualOutput.push({
             ...planBaseData,
            ...output[item.id]?.procureYearMonth,
            title: item.fsnrGsnr,
          })
          this.annualOutput.push({
            ...planBaseData,
            ...output[item.id]?.procureNum,
            title: item.productCode,
          })
        });
      
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    handleDeleteTable() {
      let indexs = this.selectedTableData.map((e) => {
        return e.index;
      });
      if (
        this.ruleForm.roundType === "03" &&
        this.selectedTableData.length >= this.ruleForm.biddingProducts.length
      ) {
        this.$message.error(this.language('BIDDING_BNQKCPXXLBZSBLYH',"不能清空产品信息列表，至少保留一行！"));
        return;
      }
      //删除产品
      this.ruleForm.biddingProducts = this.ruleForm.biddingProducts.filter(
        (item, index) => !indexs.includes(index)
      );
      let planIndexs = [];
      indexs.forEach((i) => {
        planIndexs.push(i * 3);
        planIndexs.push(i * 3 + 1);
        planIndexs.push(i * 3 + 2);
      });
      //删除产品对应的采购计划数据
      this.purchasePlanTable = this.purchasePlanTable.filter(
        (item, index) => !planIndexs.includes(index)
      );
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
    .card--header--item__top {
      display: flex;
      align-items: center;
      ::v-deep .el-input__suffix {
        position: absolute;
        height: 100%;
        right: 0.3125rem;
        top: 0.4rem;
        font-size: 16px;
        text-align: center;
        color: #aaaaaa;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        pointer-events: none;
      }
    }
  }
  .card--body {
    margin-top: 20px;
    ::v-deep .el-table {
      .cell {
        padding-left: 3px;
        padding-right: 3px;
        .el-form-item {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .el-table__header {
        background-color: rgb(216 229 253);
      }
      tr:nth-child(even) {
        background-color: #eff5fd;
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
                min-width: 4rem;
                margin-left: 4%;
                text-align: right;
              }
              .form--item--number--input ::v-deep .el-input__inner {
                background-color: #f5f7fa;
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
