/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div>
    <iCard class="card">
      <div class="card--header">
        <div class="card--header--item">
          {{language('BIDDING_XIANGMUXINXI', '项目信息')}}
        </div>
        <div class="card--header--item card--header--item--btn">
          <template v-if="ruleForm.biddingStatus !== '01'"> </template>
          <template v-else>
            <iButton @click="handlePre">{{ language('BIDDING_SHANGYIBU', '上一步') }}</iButton>
            <iButton @click="handleSearchReset">{{ language('BIDDING_CHONGZHI','重置') }}</iButton>
            <iButton @click="handleNext">{{ language('BIDDING_XIAYIBU','下一步') }}</iButton>
          </template>
        </div>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          label-width="9rem"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
          :disabled="ruleForm.biddingStatus !== '01'"
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
                    @change="handleChangeBeginMonth"
                  />
                </iFormItem>
                <iFormItem
                  :label="language('BIDDING_CHEXING', '车型')"
                  :prop="ruleForm.roundType !== '03' ? 'models' : ''"
                >
                  <iLabel :label="language('BIDDING_CHEXING', '车型')" slot="label" required></iLabel>
                  <iSelect
                    v-model="ruleForm.models"
                    multiple
                    filterable
                    :placeholder="
                      ruleForm.roundType !== '03' ? language('BIDDING_QINGXUANZE', '请选择') : ''
                    "
                    :disabled="disabledAll"
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
                    :disabled="disabledAll"
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
                <iFormItem />
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
          <template v-if="ruleForm.biddingStatus !== '01'"></template>
          <template v-else>
            <div class="margin-left40">{{language('BIDDING_PLGXCCJ','批量更新出厂价')}}</div>
            <div class="margin-left10">
              <iInput
                style="width: 7.2rem"
                :value="factoryPricePercent"
                @blur="handleFactoryPricePercentBlur"
                @input="handleFactoryPricePercentInput"
              >
                <template slot="suffix">%</template>
              </iInput>
            </div>
          </template>
        </div>
        <div class="card--header--item card--header--item--btn">
          <template v-if="ruleForm.biddingStatus !== '01'"></template>
          <template v-else>
            <iButton
              :disabled="ruleForm.roundType === '03'"
              @click="handleAddProduct"
              >{{ language('BIDDING_TIANJIACHANPIN', '添加产品') }}</iButton
            >
            <!-- <iButton @click="handleAddProduct">{{ language('添加产品', '添加产品') }}</iButton> -->
            <iButton
              @click="handleDeleteTable"
              :disabled="selectedTableData.length === 0"
              >{{ language('BIDDING_SHANCHU', '删除') }}</iButton
            >
          </template>
        </div>
      </div>
      <div class="card--body">
        <tableColumnTemplate
          ref="tableDataForm"
          :tableData="this.ruleForm.biddingProducts"
          :tableTitle="multiPleTableTitle"
          :type="'0'"
          :tableLoading="tableLoading"
          :inputProps="ruleForm.biddingStatus !== '01' ? [] : inputProps"
          :priceProps="priceProps"
          @handleSelectionChange="handleSelectionChange"
          @handlerInputBlur="handlerInputBlur"
        >
          <!-- FSNR/GSNR -->

          <template slot="fsnrGsnr" slot-scope="scope">
            <!-- 只读 -->
            <template v-if="ruleForm.biddingStatus !== '01'">
              <div>{{ scope.row["fsnrGsnr"] }}</div>
            </template>
            <template v-else>
              <iInput
                v-if="!disabledAll"
                v-model="scope.row['fsnrGsnr']"
                :trigger-on-focus="false"
                @select="handleSelect"
                @blur="rfqinfoChange(scope.row)"
              >
              </iInput>
              <div v-else>{{ scope.row["fsnrGsnr"] }}</div>
            </template>
          </template>

          <template slot="productName" slot-scope="scope">
            <!-- 只读 -->
            <template v-if="ruleForm.biddingStatus !== '01'">
              <div>{{ scope.row["productName"] }}</div>
            </template>
            <template v-else>
              <i-input v-if="!disabledAll" v-model="scope.row['productName']" @blur="handlerInputBlur($event, scope)"/>
              <div v-else>{{ scope.row["productName"] }}</div>
            </template>
          </template>

          <template slot="productCode" slot-scope="scope">
            <!-- 只读 -->
            <template v-if="ruleForm.biddingStatus !== '01'">
              {{ scope.row["productCode"] }}
            </template>
            <template v-else>
              <i-input
                v-if="!disabledAll"
                v-model="scope.row['productCode']"
                @input="partNumberChange(scope.row)"
                @blur="handlerInputBlur($event, scope)"
                :disabled="scope.row['fsnrGsnr'].length !== 0"
              />
              <div v-else>
                {{ scope.row["productCode"] }}
              </div>
            </template>
          </template>

          <!-- 单位 -->
          <template slot="quantityUnit" slot-scope="scope">
            <!-- 只读 -->
            <template v-if="ruleForm.biddingStatus !== '01'">
              <div>{{ scope.row["quantityUnit"] }}</div>
            </template>
            <template v-else>
              <i-select v-model="scope.row['quantityUnit']" filterable @change="handlerInputBlur($event, scope)">
                <el-option
                  v-for="items in quantityUnit"
                  :key="items.nameZh"
                  :value="items.nameZh"
                  :label="items.key ? $t(items.key) : items.nameZh"
                />
              </i-select>
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
    <iCard class="card" title="批量更新年降" v-show=" ruleForm.biddingStatus === '01' ">
      <tableColumnTemplate
        :tableData="batchUpdateYearsPlan"
        :tableTitle="stageColumn"
        :selection="false"
        :type="'3'"
        :tableLoading="false"
        :inputProps="
          ruleForm.biddingStatus !== '01' ? [] : outPutProps
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
          :inputProps="
            ruleForm.biddingStatus !== '01' ? [] : outPutProps
          "
          :annualOutputObj="annualOutput"
          :beginMonth="ruleForm.beginMonth"
          @handlerInputBlur="handlerInputBlur"
        >
        </tableColumnTemplate>
    </iCard>
    <iCard class="card" title="年产量">
      <tableColumnTemplate
          ref="annualOutput"
          :tableData="annualOutput"
          :tableTitle="outPutColumn"
          :selection="false"
          :type="'5'"
          :tableLoading="false"
          :inputProps="
            ruleForm.biddingStatus !== '01' ? [] : outPutProps
          "
          :beginMonth="ruleForm.beginMonth"
          @handleOutPutInputDate="handleOutPutInputDate"
          @handlerInputBlur="handlerInputBlur"
        >
      </tableColumnTemplate>
    </iCard>
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
import tableColumnTemplate from "./tableColumnTemplate.vue";
import {
  multiPleTableTitle,
  baseRules,
  currencyMultipleLib,
  planBaseData,
  planBaseYear,
  rfqinfoProduct,
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
import {
  getRfqInfo,
  findMultiPrice,
  saveMultiPrice,
  listQuotationByFs
} from "@/api/bidding/bidding";
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
    iSelect,
    iDatePicker,
    tableColumnTemplate,
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
      biddingStatus: "",
      factoryPricePercent: "",
      multiPleTableTitle,
      priceProps: [
        "factoryPrice",
        "packingFee",
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
        "transportFee",
        "operationFee",
        "moldFee",
        "developFee",
        "targetPrice",
        "lifecycle",
        "aveAnnualOutput",
        "maxAnnualOutput",
      ],
      quantityUnit: [],
      selectedTableData: [],
      modelsOption: [],
      modelProjectsOption: [],
      currencyUnit: {},
      rfqinfoProduct,
      yearsPlanTable: [],
      purchasePlanTable: [],
      prefactoryPrice: 0,
      planyearChange: false,
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
      annualOutput: [],
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
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.unit || this.language('BIDDING_YUAN',"元");
    },
    totalPrices() {
      return this.orgTotalPrices;
    },
    numberUppercase() {
      return digitUppercase(Number(this.orgTotalPrices));
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    biddingProducts() {
      return this.ruleForm.biddingProducts;
    },
    annualOutputObj(){
      return  this.annualOutput.reduce((obj,item)=>{
       return {...obj,[item.title]:item.stage1}
      },{})
    },
  },
  watch: {
    // // 手工英式，RFQ为空，起始总价有值自动带年产量的日期
    // "ruleForm.beginMonth"(val) {
    //   const { roundType, manualBiddingType, rfqCode } = this.ruleForm;
    //   let date = new Date(val);
    //   if (
    //     roundType === "05" &&
    //     manualBiddingType === "01" &&
    //     rfqCode === null
    //   ) {
    //     if (val) {
    //       this.ruleForm.biddingProducts.forEach((item) => {
    //         let planBaseDataOfDate = {
    //         title: item.fsnrGsnr || '',
    //         stage1: val,
    //         stage2: date ? date.getFullYear() + 1 + "-01" : "",
    //         stage3: date ? date.getFullYear() + 2 + "-01" : "",
    //         stage4: date ? date.getFullYear() + 3 + "-01" : "",
    //         stage5: date ? date.getFullYear() + 4 + "-01" : "",
    //         stage6: date ? date.getFullYear() + 5 + "-01" : "",
    //         stage7: date ? date.getFullYear() + 6 + "-01" : "",
    //         stage8: date ? date.getFullYear() + 7 + "-01" : "",
    //         stage9: date ? date.getFullYear() + 8 + "-01" : "",
    //         stage10: date ? date.getFullYear() + 9 + "-01" : "",
    //         stage11: date ? date.getFullYear() + 10 + "-01" : "",
    //         stage12: date ? date.getFullYear() + 11 + "-01" : "",
    //         stage13: date ? date.getFullYear() + 12 + "-01" : "",
    //         stage14: date ? date.getFullYear() + 13 + "-01" : "",
    //         stage15: date ? date.getFullYear() + 14 + "-01" : "",
    //       };
    //         for (let i = 0; i < this.annualOutput.length; i++) {
    //           if (i % 2 === 1) {
    //             this.annualOutput.splice(i, 1, {
    //               ...planBaseDataOfDate,
    //             });
    //           }
    //         }
    //       });
    //     }
    //   }
    // },
    //监听产品  计算B价 ==出厂价+包装费+运输费+操作费
    biddingProducts: {
      handler(val, oldVal) {
        if (val.length > 0)
          val.forEach((item) => {
            item.bprice =
              isNaN(Number(item.factoryPrice)) ||
              isNaN(Number(item.packingFee)) ||
              isNaN(Number(item.transportFee)) ||
              isNaN(Number(item.operationFee))
                ? item.bprice
                : Big(item.factoryPrice || 0)
                    .add(item.packingFee || 0)
                    .add(item.transportFee || 0)
                    .add(item.operationFee || 0)
                    .toFixed(2);
          });
      },
      deep: true, //true 深度监听
    },
  },
  methods: {
    //年产量日期选择  后续补全
    handleOutPutInputDate(val, scope) {
      let dateYear = new Date(val).getFullYear();
      if(this.ruleForm.beginMonth && dateYear === new Date(this.ruleForm.beginMonth).getFullYear()){
        this.$set(this.annualOutput[scope.$index], 'stage1', dayjs(this.ruleForm.beginMonth).format('YYYY-MM'));
      }
      for (let i = 2; i < 16; i++) {
        dateYear=dateYear+1;
          this.annualOutput[scope.$index][`stage${i}`] = dateYear+'-01';
      }
    },
    //更改起始年月联动年产量年月
    handleChangeBeginMonth(val){
      let dateYear = new Date(val).getFullYear();
      this.annualOutput.forEach((item,index)=>{
        if(!val){
          for (let i = 1; i < 16; i++) {
            item[`stage${i}`]='';
          }
          return;
        }
        if((index % 2 ===1 && dayjs(val).isAfter(dayjs(item.stage1))) || (index % 2 ===1 && !item.stage1)){
          for (let i = 1; i < 16; i++) {
            if(i===1){
              item[`stage${i}`]=val;
            }else{
              dateYear=dateYear+1;
              item[`stage${i}`] =dateYear+'-01';
            }
          }
        }
      })
    },
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
      let biddingProducts = this.ruleForm.biddingProducts;
      let sum= biddingProducts.reduce((sum, item, index) => {
        return isNaN(Number(item.factoryPrice)) ||
          isNaN(Number(item.moldFee)) ||
          isNaN(Number(item.developFee))
          ? sum
          : Big(this.calculationDetails(item, index)).add(sum).add(Number(item.moldFee)).add(Number(item.developFee)).toNumber();
      }, 0);
      this.orgTotalPrices=Big(sum).toFixed(2);
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
                this.$refs["annualOutput"].$children[0].validate(
                  (valid) => {
                    if (valid) {
                      this.totalPriceFlag = false;
                    } else {
                      this.totalPriceFlag = true;
                    }
                  }
                );
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
    //FSNR/GSNR更改联动零件号 和 采购计划FSNR/GSNR、零件号
    rfqinfoChange(e) {
      // let obj = this.rfqinfoProduct.filter((item) => {
      //   return e.fsnrGsnr === item.fsnrGsnr;
      // });
      // if (obj.length < 1) {
      //   e.productName = "";
      //   e.productCode = "";
      // this.yearsPlan[e.index*2].title='';
      // this.yearsPlan[e.index*2+1].title='';
      // this.annualOutput[e.index*2+1].title='';
      // this.annualOutput[e.index*2+2].title='';
      //   return;
      // }
      // e.productName = obj[0]?.productName;
      // e.productCode = obj[0]?.productCode;
      // this.yearsPlan[e.index*2].title=obj[0]?.fsnrGsnr;
      // this.yearsPlan[e.index*2+1].title=obj[0]?.productCode;
      // this.annualOutput[e.index*2+1].title=obj[0]?.fsnrGsnr;
      // this.annualOutput[e.index*2+2].title=obj[0]?.productCode;
      // this.handlerInputBlur();
      listQuotationByFs(e.fsnrGsnr).then(res => {
        if (!res) {
          e.productName = "";
          e.productCode = "";
          this.yearsPlan[e.index*2].title='';
          this.yearsPlan[e.index*2+1].title='';
          this.annualOutput[e.index*2+1].title='';
          this.annualOutput[e.index*2+2].title='';
          return;
        }
        e.productCode = res.partNum
        e.productName = res.partName;
        this.yearsPlan[e.index*2].title = res.partPrjCode;
        this.yearsPlan[e.index*2+1].title = res.partNum;
        this.annualOutput[e.index*2+1].title = res.partPrjCode;
        this.annualOutput[e.index*2+2].title = res.partNum;
        this.handlerInputBlur();
      })
    },
    //零件号更改联动采购计划零件号
    partNumberChange(e) {
      this.yearsPlan[e.index*2+1].title=e.productCode;
      this.annualOutput[e.index*2+2].title=e.productCode;
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
          "yearsPlan",
          "annualOutput",
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
          "yearsPlan",
          "annualOutput",
          () => {
            this.$router.push({
              name: "biddingCompetitionQuotation",
            });
          }
        );
      });
    },
    handleSearchReset() {
      this.yearsPlan = [];
      this.annualOutput = [];
      let param = { id: this.id };
      this.query(param);
    },
    submitForm(
      formName,
      tableDataForm,
      yearsPlan,
      annualOutput,
      callback
    ) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitTableForm(
            tableDataForm,
            yearsPlan,
            annualOutput,
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
      yearsPlan,
      annualOutput,
      callback
    ) {
      this.$refs[tableDataForm].$children[0].validate((valid) => {
        if (valid) {
          this.submitYearsPlanTableForm(
            yearsPlan,
            annualOutput,
            callback
          );
        } else {
          this.$message.error(this.language('BIDDING_CPXISJYW',"产品信息数据有误！"));
          return;
        }
      });
    },
    submitYearsPlanTableForm(
      yearsPlan,
      annualOutput,
      callback
    ) {
      this.$refs[yearsPlan].$children[0].validate((valid) => {
        if (valid || this.ruleForm.biddingProducts.length == 0) {
          this.submitannualOutput(annualOutput, callback);
        }
        else {
          this.$message.error("年降计划数据有误！");
          return;
        }
        
      });
    },
    submitannualOutput(annualOutput, callback) {
      this.$refs[annualOutput].$children[0].validate((valid) => {
        if (valid) {
          this.handleSaveData(callback);
        } else {
          this.$message.error("年产量数据有误！");
          return;
        }
      });
    },
    //数据验证通过提交数据
    handleSaveData(callback) {
      const productCode = this.ruleForm.biddingProducts.map(
        (item) => item.productCode
      );
      if(new Set(productCode).size !== this.ruleForm.biddingProducts.length){
        return this.$message.error(this.language('BIDDING_CPLJHBNCF',"产品零件号不能重复！"));
      }
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

      let procurePlans = [];
      let productions=[];
      this.ruleForm.biddingProducts.forEach((item, index) => {
        for (let i = 1; i < 16; i++) {
          if(i<10){
            let obj = {
              stage: i,
              productId: item.id,
              productCode: this.yearsPlan[index*2 + 1].title,
              procureYearMonth: this.yearsPlan[index*2][`stage${i}`],
              cutPricePlan: this.yearsPlan[index*2 + 1][`stage${i}`],
              id: this.yearsPlan[index*2 + 1][`id${i}`],
            };
            procurePlans.push(obj);
          }
          let obj1 = {
            stage: i,
            productId: item.id,
            productCode: this.annualOutput[index*2 + 2].title,
            procureYearMonth: this.annualOutput[index*2+1][`stage${i}`],
            procureNum: this.annualOutput[index*2 + 2][`stage${i}`],
            id: this.annualOutput[index*2 + 2][`id${i}`],
          };
          productions.push(obj1);
        }
      });
      let formData = { ...this.ruleForm };
      //起始总价
      formData.totalPrices = this.totalPrices;
      formData.models = modelList;
      formData.modelProjects = modelProjectList;
      formData.procurePlans = procurePlans;
      formData.productions = productions;

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
        transportFee: "",
        operationFee: "",
        bprice: "",
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
        date = dayjs(nowYear).year();
      }
      this.yearsPlan.push({
        ...planBaseYear,
        title: typeof e === "undefined" ? "" : e.fsnrGsnr,
      },{
        ...planBaseYear
      })
      this.annualOutput.push(
        {
          title: typeof e === "undefined" ? "" : e.fsnrGsnr,
          stage1: nowYear? nowYear : "",
          stage2: date ? date  + 1 + "-01" : "",
          stage3: date ? date  + 2 + "-01" : "",
          stage4: date ? date  + 3 + "-01" : "",
          stage5: date ? date  + 4 + "-01" : "",
          stage6: date ? date  + 5 + "-01" : "",
          stage7: date ? date  + 6 + "-01" : "",
          stage8: date ? date  + 7 + "-01" : "",
          stage9: date ? date  + 8 + "-01" : "",
          stage10: date ? date  + 9 + "-01" : "",
          stage11: date ? date  + 10 + "-01" : "",
          stage12: date ? date  + 11 + "-01" : "",
          stage13: date ? date  + 12 + "-01" : "",
          stage14: date ? date  + 13 + "-01" : "",
          stage15: date ? date  + 14 + "-01" : "",
        },{
          ...planBaseData
        }
      )
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
        biddingStatus: data.biddingStatus,
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
      if (
        !this.ruleForm.biddingProducts?.length &&
        this.ruleForm.roundType !== "03"
      ) {
        this.handleAddProduct();
      } else {
        this.ruleForm.biddingProducts.forEach((item) => {
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
      }
      // ruleForm.roundType === '03'
      if(!this.ruleForm.productions?.length && this.ruleForm.roundType === '03' && this.ruleForm.beginMonth && this.ruleForm.biddingProducts?.length){
          console.log(1226,this.ruleForm.beginMonth)
          let date = new Date(this.ruleForm.beginMonth);
          this.ruleForm.biddingProducts.forEach((item,index) => {
            let planBaseDataOfDate = {
              title: item.fsnrGsnr || '',
              stage1: this.ruleForm.beginMonth,
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
            };
            let planBaseDataOfDate1={... planBaseData,title:item.productCode};
            this.annualOutput.splice(index*2+1, 1, {
              ...planBaseDataOfDate,
            });
            this.annualOutput.splice(index*2+2, 1, {
              ...planBaseDataOfDate1,
            });
           })
      }
      this.$nextTick(() => {
        this.handlerInputBlur();
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
      let annualIndexs = [];
      indexs.forEach((i) => {
        planIndexs.push(i * 2);
        planIndexs.push(i * 2 + 1);
        annualIndexs.push(i * 2 + 1);
        annualIndexs.push(i * 2 + 2);
      });
      //删除产品对应的降价计划数据
      this.yearsPlan = this.yearsPlan.filter(
        (item, index) => !planIndexs.includes(index)
      );
      this.annualOutput = this.annualOutput.filter(
        (item, index) => !annualIndexs.includes(index)
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
</style>
