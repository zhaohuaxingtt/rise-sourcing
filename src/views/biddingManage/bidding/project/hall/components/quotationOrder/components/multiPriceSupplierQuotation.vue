<template>
  <div>
    <iCard :title="language('BIDDING_XIANGMUXINXI', '项目信息')" class="card">
      <template slot="header-control">
        <div>
          <iButton
            :disabled="biddingStatus"
            :class="{ yingbiao: biddingStatus, unyingbiao: !biddingStatus }"
            @click="handleNext"
            >{{ language('BIDDING_CHUJIA', '出价') }}</iButton
          >
        </div>
        <i
          @click="toggle"
          class="el-icon-arrow-up icon margin-left20 cursor"
          :class="{ rotate: hidens }"
        ></i>
      </template>

      <div class="card--body">
        <el-form
          :model="ruleForm"
          label-width="9rem"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
        >
          <div class="form">
            <div class="input-box">
              <div class="form-row">
                <iFormItem :label="language('BIDDING_QISHIZONGJIA', '起始总价')">
                  <iLabel
                    :label="language('BIDDING_QISHIZONGJIA', '起始总价')"
                    slot="label"
                    required
                  ></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input__totalprice"
                      :data-value="orgTotalPrices"
                      :value="
                        biddingStatus
                          ? ruleForm.totalPrices
                          : totalPriceFlag
                          ? '0' + currencyMultiple
                          : startingPrice
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_DAXIE', '大写')">
                  <iLabel :label="language('BIDDING_DAXIE', '大写')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="
                        biddingStatus
                          ? numberUppercase
                          : totalPriceFlag
                          ? language('BIDDING_LINGYUANZHENG','零元整')
                          : numberUppercase
                      "
                      disabled
                    ></iInput>
                    <div class="form--item--number--lable">{{ unit }}</div>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem
                  :label="language('BIDDING_QISHINIANYUE', '起始年月')"
                  prop="beginMonth"
                  :hideRequiredAsterisk="true"
                >
                  <iLabel :label="language('BIDDING_QISHINIANYUE', '起始年月')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput
                      class="form--item--number--input"
                      :value="ruleForm.beginMonth"
                      disabled
                    ></iInput>
                  </div>
                </iFormItem>
                <iFormItem :label="language('BIDDING_CHEXING', '车型')">
                  <iLabel :label="language('BIDDING_CHEXING', '车型')" slot="label"></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
              </div>
              <div class="form-row" :class="{ hiden: hidens }">
                <iFormItem :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')">
                  <iLabel :label="language('BIDDING_CHEXINGXIANGMU', '车型项目')" slot="label"></iLabel>
                  <div class="form-item-tag">
                    <el-tag :key="tag" v-for="tag in modelProjectsOption">
                      {{ tag.name }}
                    </el-tag>
                  </div>
                </iFormItem>
                <iFormItem />
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </iCard>

    <iCard class="card">
      <div class="card--header">
        <div class="card--header--item card--header--item__top">
          <div>{{ language('BIDDING_CHANPINXINXI', '产品信息') }}</div>
          <div class="margin-left40">{{language('BIDDING_PLGXCCJ','批量更新出厂价')}}</div>
          <div class="margin-left10">
            <iInput
              style="width: 7.2rem"
              :value="factoryPricePercent"
              @blur="handleFactoryPricePercentBlur"
              @input="handleFactoryPricePercentInput"
              :disabled="biddingStatus"
            >
              <template slot="suffix">%</template>
            </iInput>
          </div>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="tableDataForm"
          :tableData="ruleForm.supplierProducts"
          :tableTitle="multiPleTableTitle"
          :selection="false"
          :type="'0'"
          :tableLoading="tableLoading"
          :inputProps="biddingStatus ? [] : inputProps"
          :priceProps="priceProps"
          @handleSelectionChange="handleSelectionChange"
           @handlerInputBlur="handlerInputBlur"
        >
          <template slot="moldFee" slot-scope="scope">
            <template v-if="ruleForm.moldFee === '01'">
              <div>{{ scope.row["moldFee"] }}</div>
            </template>
            <template v-else>
              <i-input
                v-if="!biddingStatus"
                oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                v-model="scope.row['moldFee']"
                @blur="handlerInputBlur($event, scope)"
              />
              <div v-else>{{ scope.row["moldFee"] }}</div>
            </template>
          </template>

          <!-- 操作 -->
          <template slot="caozuo" slot-scope="scope">
            <span>
              <a
                href="javascript:void(0)"
                class="open-link-text"
                @click="handleClickOne(scope)"
              >
                <i class="el-icon-edit"> </i>
              </a>
            </span>
          </template>
        </tableColumnTemplate>
      </div>
    </iCard>
    <iCard class="card" title="批量更新年降" v-show=" !biddingStatus ">
      <tableColumnTemplate
        :tableData="batchUpdateYearsPlan"
        :tableTitle="stageColumn"
        :selection="false"
        :type="'3'"
        :tableLoading="false"
        :inputProps="biddingStatus ? [] : outPutProps
        "
        @handleInputOnBlur="handleInputOnBlur"
      >
      </tableColumnTemplate>
    </iCard>
    <iCard class="card yearsPlan" title="年降计划">
      <tableColumnTemplate
          ref="yearsPlan"
          :tableData="yearsPlan"
          :tableTitle="stageColumn"
          :selection="false"
          :type="'4'"
          :tableLoading="false"
          :inputProps="biddingStatus ? [] : outPutProps
          "
          :annualOutputObj="annualOutput"
          :beginMonth="ruleForm.beginMonth"
          @handlerInputBlur="handlerInputBlur"
        >
        </tableColumnTemplate>
    </iCard>
    <iCard class="card" title="折现率">
      <tableColumnTemplate
          ref="annualOutput"
          :tableData="annualOutput1"
          :tableTitle="outPutColumn"
          :selection="false"
          :type="'5'"
          :tableLoading="false"
        >
      </tableColumnTemplate>
    </iCard>  
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormItem, iLabel } from "rise";
import tableColumnTemplate from "./tableColumnTemplate.vue";
import {
  multiPleTableTitle,
  baseRules,
  currencyMultipleLib,
  yearsPlanTableColumn,
  planBaseData,
  planBaseYear,
  stageColumn,
  outPutColumn
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
import { findHallQuotation, saveBiddingQuotation } from "@/api/bidding/bidding";
import Big from "big.js";
import dayjs from "dayjs";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iFormItem,
    iLabel,
    tableColumnTemplate,
  },
  props: {
    id: String,
    initData: {
      type: Object,
      default: () => ({}),
    },
    supplierCode: String,
    isSupplier: { type: Boolean, default: false },
    biddingQuoteRule: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // factoryPricePercentFlag: true,
      hidens: false,
      totalPriceFlag: false,
      tableLoading: false,
      rules: baseRules,
      ruleForm: {
        beginMonth: "",
        modelProjects: [],
        models: [],
        biddingProducts: [],
        supplierProducts: [],
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
        "lifecycle",
        "aveAnnualOutput",
        "maxAnnualOutput",
      ],
      inputProps: [
        "factoryPrice",
        "packingFee",
        "packingFee2",
        "transportFee",
        "operationFee",
        "developFee",
      ],
     
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      yearsPlanTable: [],
      purchasePlanTable: [],
      prefactoryPrice: 0,
      stageColumn,
      outPutColumn,
      batchUpdateYearsPlan: [{
        "title":'',
        "stage1":'',
        "stage2":'',
        "stage3":'',
        "stage4":'',
        "stage5":'',
        "stage6":'',
        "stage7":'',
        "stage8":'',
        "stage9":'',
        },
      ],
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
      annualOutput1: [{
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
      outPutProps:[
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
      orgTotalPrices:0,
    };
  },
  watch: {
    "initData.biddingStatus"(val, oldVal) {
      if (val !== oldVal) {
        this.handleSearchReset();
      }
    },
    //监听产品  计算B价 ==出厂价+包装费+运输费+操作费
    supplierProducts: {
      handler(val, oldVal) {
        if (val?.length > 0)
          val.forEach((item) => {
            item.bprice =
              isNaN(Number(item.factoryPrice)) ||
              isNaN(Number(item.packingFee)) ||
              isNaN(Number(item.transportFee)) ||
              isNaN(Number(item.operationFee))
                ? item.bprice
                : Big(Number(item.factoryPrice) || 0)
                    .add(Number(item.packingFee) || 0)
                    .add(Number(item.transportFee) || 0)
                    .add(Number(item.operationFee) || 0)
                    .toFixed(2);
          });
      },
      deep: true, //true 深度监听
    },
  },
  mounted() {
    getDiscount({}).then((res) => {
      let o = {...planBaseData,title:'折现率'};
      res?.data?.md_discount_rate.map(item=>{
        let x = Number(item.code.replace('Y','0'));
        o[`stage${x}`]=item.describe;
      })
      this.annualOutput[0]={...o};
      this.annualOutput1[0]={...o};
    });
    getCurrencyUnit().then((res) => {
      this.currencyUnit = res.data?.reduce((obj, item) => {
        return { ...obj, [item.code]: item.name };
      }, {});
    });
    getUnits({}).then((res) => {
      this.quantityUnit = res.data;
    });
    this.handleSearchReset();
  },
  computed: {
    biddingStatus() {
      if (
        (this.ruleForm.biddingStatus === "04" ||
          this.ruleForm.biddingStatus === "05") &&
        this.ruleForm.isSupplierOffer &&
        this.ruleForm.supplierKickOutStatus === "01"
      ) {
        return false;
      }
      return true;
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
    // orgTotalPrices() {
    //   let total = 0;
    //   this.ruleForm.supplierProducts.forEach((item, index) => {
    //     if (
    //       isNaN(Number(item.factoryPrice)) ||
    //       isNaN(Number(item.packingFee)) ||
    //       isNaN(Number(item.packingFee2)) ||
    //       isNaN(Number(item.transportFee)) ||
    //       isNaN(Number(item.operationFee)) ||
    //       isNaN(Number(item.moldFee)) ||
    //       isNaN(Number(item.developFee))
    //     ) {
    //       return 0;
    //     }
    //     item.upsetPrice = this.calculationDetails(item, index);
    //     total = Big(this.calculationDetails(item, index)).add(total).toNumber();
    //   });
    //   return total;
    // },
    totalPrices() {
      return this.orgTotalPrices;
    },
    numberUppercase() {
      if (this.biddingStatus) {
        return digitUppercase(Number(this.ruleForm.totalPrices));
      }
      return digitUppercase(Number(this.totalPrices));
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    supplierProducts() {
      return this.ruleForm.supplierProducts;
    },
    annualOutputObj(){
      return  this.annualOutput.reduce((obj,item)=>{
       return {...obj,[item.title]:item.stage1}
      },{})
    },
  },
  methods: {
    //批量更新年降 鼠标移出更新年将列表
    handleInputOnBlur(row, props){
      if (this.yearsPlan?.length > 0 && row[props]) {
        this.yearsPlan.forEach((e, index) => {
          if ((index+1) % 2 === 0) {
            let purchase = this.yearsPlan[index];
            purchase[props] = row[props];
          }
        });
      }
      row[props]='';
      this.handlerInputBlur();
    },
    //输入完成出发计算总价方法
    handlerInputBlur(){
      let supplierProducts = this.ruleForm.supplierProducts;
      let sum= supplierProducts.reduce((sum, item, index) => {
        if(isNaN(Number(item.factoryPrice)) ||
          isNaN(Number(item.moldFee)) ||
          isNaN(Number(item.developFee))){
            return sum;
          }
        item.upsetPrice = Big(this.calculationDetails(item, index)).add(Number(item.moldFee)).add(Number(item.developFee)).toFixed(2);
        return Big(this.calculationDetails(item, index)).add(sum).add(Number(item.moldFee)).add(Number(item.developFee)).toNumber();
      }, 0);
      this.orgTotalPrices=Big(sum).toFixed(2);
    },
    toggle() {
      this.hidens = !this.hidens;
      this.$emit("toggle", this.hidens);
    },
    //产品操作事件
    handleClickOne(scope) {
      this.$nextTick(() => {
        var tr = document.querySelectorAll(
          ".yearsPlan .el-table__body-wrapper tr"
        )[scope.row.index * 2+1];
        document.querySelector(".routerpage").scrollTop =
          tr.getBoundingClientRect().top +
          document.querySelector(".routerpage").scrollTop -
          document.querySelector(".routerpage").getBoundingClientRect().top;
      });
    },
    calculationDetails(product, productIndex) {
      this.$nextTick(() => {
        this.$refs["tableDataForm"].$children[0].validate((valid) => {
          if (valid) {
            this.$refs["yearsPlan"].$children[0].validate((valid) => {
              if (valid) {
                this.totalPriceFlag = false;
              } else {
                this.totalPriceFlag = true;
              }
            });
          } else {
            this.totalPriceFlag = true;
          }
        });
      });
      
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
    //限制批量更新出厂价（%）：输入框，1~10000
    handleFactoryPricePercentInput(val) {
      let reg = /^([1-9]|[1-9]\d{0,3}|10000)$/;
      if (val && !reg.test(val)) {
        return;
      }
      this.factoryPricePercent = val;
    },
    //批量更新出厂价鼠标移出数据清空
    handleFactoryPricePercentBlur() {
      this.ruleForm.supplierProducts.forEach((e) => {
        const tmp = this.factoryPricePercent || 100;
        if (!isNaN(Number(tmp))) {
          e.factoryPrice = Big(e.factoryPrice || 0)
            .times(Number(tmp) === 0 ? 1 : tmp / 100)
            .toNumber();
        }
      });
      this.factoryPricePercent = "";
    },

    //下一步
    handleNext() {
      // 拍买
      if (this.ruleForm.biddingType === "01") {
        if (
          Number(this.totalPrices) < Number(this.biddingQuoteRule.actualValue)
        ) {
          this.$confirm("本次报价小于规则设定的警戒值，是否继续？",this.language('BIDDING_TISHI',"提示"), {
            confirmButtonText: this.language('BIDDING_QUEDING',"确定"),
        cancelButtonText: this.language('BIDDING_QUXIAO',"取消"),
            type: "warning",
          })
            .then(() => {
              this.submitForm(
                "ruleForm",
                "tableDataForm",
                "yearsPlan",
                () => {
                  this.$emit("getRank");
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.submitForm(
            "ruleForm",
            "tableDataForm",
            "yearsPlan",
            () => {
              this.$emit("getRank");
            }
          );
        }
      } else {
        if (
          Number(this.totalPrices) > Number(this.biddingQuoteRule.actualValue)
        ) {
          this.$confirm("本次报价大于规则设定的警戒值，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.submitForm(
                "ruleForm",
                "tableDataForm",
                "yearsPlan",
                () => {
                  this.$emit("getRank");
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.submitForm(
            "ruleForm",
            "tableDataForm",
            "yearsPlan",
            () => {
              this.$emit("getRank");
            }
          );
        }
      }
      // this.submitForm(
      //   "ruleForm",
      //   "tableDataForm",
      //   "yearsPlan",
      //   () => {
      //     this.$emit("getRank");
      //   }
      // );
    },
    submitForm(formName, tableDataForm, yearsPlan, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(tableDataForm, yearsPlan, callback);
        } else {
          this.$message.error(this.language('BIDDING_XMXXSJYW',"项目信息数据有误！"));
          return;
        }
      });
    },
    submitTableForm(tableDataForm, yearsPlan, callback) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          this.submitPurchasePlanTableForm(yearsPlan, callback);
        } else {
          this.$message.error(this.language('BIDDING_CPXISJYW',"产品信息数据有误！"));
          return;
        }
      });
    },
    submitPurchasePlanTableForm(yearsPlan, callback) {
      this.$refs[yearsPlan].$children[0].validate((valid) => {
        if (valid) {
          this.handleSaveData(callback);
        } else {
          this.$message.error("年降数据有误！");
          return;
        }
      });
    },
    //数据验证通过提交数据
    handleSaveData(callback) {
      let formData = { ...this.ruleForm };
      //采购计划
      this.ruleForm.supplierProducts.forEach((item, index) => {
        item.supplierPlans = [];
        for (let i = 1; i < 16; i++) {
          let obj = {
            stage: i,
            productId: item.id,
            partNumber: this.yearsPlan[index*2 + 1].title,
            procureYearMonth: this.yearsPlan[index * 2][`stage${i}`],
            cutPricePlan: this.yearsPlan[index * 2 + 1][`stage${i}`],
            id: this.yearsPlan[index * 2 + 1][`id${i}`],
          };
          item.supplierPlans.push(obj);
        }
      });
      let supplierOffer = {
        biddingId: this.id,
        clientTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        offerPrice: this.totalPrices,
        supplierCode: this.supplierCode,
      };
      //起始总价
      formData.totalPrices = this.totalPrices;
      formData.supplierOffer = supplierOffer;
      console.log(869,formData)
      //保存
      saveBiddingQuotation(formData)
        .then((res) => {
          this.$message.success("出价成功");
          callback && callback();
        })
        .catch((err) => {
          console.log(err);
          this.yearsPlanTable = [];
          this.purchasePlanTable = [];
          this.handleSearchReset();
        });
    },
    handleSearchReset() {
      this.yearsPlan = [];
      this.annualOutput = [];
      
      let param = { biddingId: this.id, supplierCode: this.supplierCode };
      this.query(param);
    },
    async query(e) {
      // 根据 ID 获取竞价大厅报价单列表数据
      const res = await findHallQuotation(e);
      this.updateRuleForm(res);
    },
    updateRuleForm(data) {
      this.ruleForm = {
        ...data,
        totalPrices: data.supplierOffer?.offerPrice || data.totalPrices,
      };
      getModels().then((res) => {
        data.models.forEach((item) => {
          this.modelsOption.push(
            ...res?.data?.filter((e) => e.code === item.modelCode)
          );

          let obj = {};
          this.modelsOption = this.modelsOption.reduce(function (item, next) {
            obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
            return item;
          }, []);
        });
      });

      getProjects().then((res) => {
        data.modelProjects.forEach((item) => {
          this.modelProjectsOption.push(
            ...res?.data?.filter((e) => e.code === item.projectCode)
          );

          let obj = {};
          this.modelProjectsOption = this.modelProjectsOption.reduce(function (
            item,
            next
          ) {
            obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
            return item;
          },
          []);
        });
      });
       //this.ruleForm.productions 采购员年产量
      this.ruleForm.biddingProducts?.forEach((items,index) => {
        let output = {};
        output = items.productions.reduce((obj, item) => {
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
        this.annualOutput.push({
            ...planBaseData,
          ...output[items.id]?.procureYearMonth,
          title: items.fsnrGsnr,
        })
        this.annualOutput.push({
          ...planBaseData,
          ...output[items.id]?.procureNum,
          title: items.productCode,
        })
      })
      if (!this.ruleForm.supplierProducts?.length) {
        this.ruleForm.supplierProducts = data.biddingProducts;
      }
      this.ruleForm.supplierProducts?.forEach((items,index) => {
        items.productions=[];
        if (items.procurePlans !== undefined) {
          items.supplierPlans = items.procurePlans;
        }
        let o = items.supplierPlans?.reduce((obj, item) => {
          if (item.supplierProdId === undefined) {
            item.supplierProdId = item.productId;
          }
          if (!obj[item.supplierProdId]) {
            obj[item.supplierProdId] = {
              yearMonth: { title: "" },
              cutPricePlan: { title: "" },
            };
          }
          obj[item.supplierProdId].yearMonth[`stage${item.stage}`] =
            item.procureYearMonth;
          if (data.supplierProducts?.length) {
            obj[item.supplierProdId].yearMonth[`id${item.stage}`] = item.id;
          }
          obj[item.supplierProdId].cutPricePlan[`stage${item.stage}`] = item.cutPricePlan;
          if (data.supplierProducts?.length) {
            obj[item.supplierProdId].cutPricePlan[`id${item.stage}`] = item.id;
          }
          return obj;
        }, {});
        if (o[items.id] !== undefined) {
          this.yearsPlan.push({
            ...planBaseYear,
            ...o[items.id].yearMonth,
            title: items.fsnrGsnr,
          });
          this.yearsPlan.push({
            ...planBaseYear,
            ...o[items.id].cutPricePlan,
            title: items.productCode,
          });
        }
        if (!data.supplierProducts?.length) {
          items.id = "";
        }
      });
      
      this.$nextTick(() => {
        this.handlerInputBlur();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 30px;
  .card--header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .card--header--item {
      font-size: 18px;
      font-weight: bold;
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
  // .card--body {
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
            .form-item-tag ::v-deep {
              height: auto;
              box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
              border-color: transparent;
              border-radius: 0.25rem;
              .el-tag {
                background-color: #f5f7fa;
                color: #000;
                border-radius: 18px;
                border-color: #fff;
                margin-left: 3px;
                min-width: 15px;
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
              .form--item--number--input__totalprice ::v-deep .el-input__inner {
                color: #1660f1;
                background-color: #ffffff;
                box-shadow: 0 0 0.1875rem rgb(22 96 241 / 55%);
                border-color: #1660f1;
              }
            }
          }
        }
        .el-form-item + .el-form-item {
          margin-left: 120px;
        }
      }
    }
  }
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
  // }
}
.rotate {
  transform: rotate(180deg);
  color: #d3d3db;
}
.hiden {
  display: none !important;
}
::v-deep .control {
  display: flex !important;
  align-items: center;
  .icon {
    color: #d3d3db;
  }
}

.yingbiao {
  background-color: #f4f5f6;
}
.unyingbiao {
  background-color: #1660f1;
  color: #fff;
}
</style>
