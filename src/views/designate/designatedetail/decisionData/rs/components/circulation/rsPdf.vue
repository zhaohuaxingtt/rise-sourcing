<template>
  <div class="rsPdf">
    <!-- <iCard class="rsCard" v-if="isPF">
      <template #header>
        <div class="title">
          <p>CSC推荐表/CSC Recommendation Sheet会外流转</p>
        </div>
      </template>
      <iFormGroup row="4" class="csc">
        <div class="col">
          <iFormItem
            v-for="(item, index) in titleData"
            :key="'titleData' + index"
            :label="item.label + ':'"
          >
            <iText v-if="item.props === 'currency'">{{
              basicData.currencyMap && basicData.currencyMap[basicData.currency]
                ? basicData.currencyMap[basicData.currency].name
                : basicData.currency
            }}</iText>
            <iText v-else-if="item.props === 'exchangeRate'">
              <span
                class="exchangeRageCurrency"
                v-for="item in exchangeRageCurrency"
                :key="item"
                >1{{
                  basicData.currencyMap && basicData.currencyMap[item]
                    ? basicData.currencyMap[item].name
                    : item
                }}={{ basicData.currencyRateMap[item]
                }}{{
                  basicData.currencyMap.RMB
                    ? basicData.currencyMap.RMB.name
                    : "RMB"
                }}</span
              >
            </iText>
            <iText v-else-if="item.props === 'partProjectType'">{{
              basicData[item.props] === partProjTypes.PEIJIAN ? "配件" : "附件"
            }}</iText>
            <iText v-else>{{ basicData[item.props] }}</iText>
          </iFormItem>
        </div>
      </iFormGroup>
    </iCard> -->
    <iCard class="rsCard">
      <template #header>
        <div class="title">
          <p>{{ `流转定点推荐 - ${cardTitle}` }}</p>
        </div>
      </template>
      <template v-for="(tableData,index) in tableList">
        <div class="pdf-item margin-20" :key="index">
          <div class="infos">
            <div class="infoWrapper" v-for="(info, $index) in infos" :key="$index">
              <div class="info">
                <span class="label">{{ info.name }}：</span>
                <span v-if="info.props === 'exchange'" v-html="exchangeRate"></span>
                <span v-if="info.props === 'nominateAppTime'">{{ basicData[info.props] | dateFilter('YYYY-MM-DD') }}</span>
                <div v-else>{{ basicData[info.props] }}</div>
              </div>
            </div>
          </div>
          <!-- 第一页比其它页面多一个头部 -->
          <div :style="{'height':(index==0?tableHeight:otherTableHeight) + 'px'}">
          <tableList
            :selection="false"
            :tableTitle="tableTitle"
            :tableData="tableData"
            class="rsTable"
            border
          >
            <!-- FS号 -->
            <template #fsnrGsnrNum="scope">
              <template v-for="(fs,i) in getFS(scope.row.fsnrGsnrNum)">
                <p :key="i">{{fs}}</p>
              </template>
            </template>
            <!-- 年降 -->
            <template #ltc="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
            </template>

            <!-- 年降开始时间 -->
            <template #beginYearReduce="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "beginYearReduce") }}</span>
            </template>

            <template #sapCode="scope">
              <span>{{
                scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode
              }}</span>
            </template>

            <template #share="scope">
              <span>{{ +scope.row.share || 0 }}</span>
            </template>
          </tableList>
          </div>
            <div class="beizhu">
              备注 Remarks:
              <div class="beizhu-value">
                <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
              </div>
            </div>
          <div class="page-logo">
            <img src="../../../../../../../assets/images/logo.png" alt="">
            <div>
              <p>严琴</p>
              <p>2022-03-29</p>
              <p>page 1 of 12</p>
            </div>
          </div>
        </div>
      </template>
      <!-- <template v-else>
        <div class="pdf-item">
          <div :style="{'height':tableHeight + 'px'}">
          <tableList
          border
            :max-height="tableHeight"
            :selection="false"
            :tableTitle="tableTitle"
            :tableData="tableData.slice(0,firstCount)"
            class="rsTable margin-top20"
          >
            <template #fsnrGsnrNum="scope">
              <template v-for="(fs,i) in getFS(scope.row.fsnrGsnrNum)">
                <p :key="i">{{fs}}</p>
              </template>
            </template>
            <template #ltc="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
            </template>

            <template #beginYearReduce="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "beginYearReduce") }}</span>
            </template>

            <template #sapCode="scope">
              <span>{{
                scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode
              }}</span>
            </template>

            <template #share="scope">
              <span>{{ +scope.row.share || 0 }}</span>
            </template>
          </tableList>
          </div>
            <div class="beizhu">
              备注 Remarks:
              <div class="beizhu-value">
                <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
              </div>
            </div>
        </div>
        <template v-for="index in parseInt((tableData.length+count-firstCount)/count)">
          <div :key="index" class="pdf-item" :style="{'height':tableHeight + 'px'}">
            <tableList
            border
            :max-height="tableHeight"
              :selection="false"
              :tableTitle="tableTitle"
              :tableData="tableData.slice(count*(index-1)+firstCount,count*index+firstCount )"
              class="rsTable margin-top20"
            >
              <template #ltc="scope">
                <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
              </template>

              <template #beginYearReduce="scope">
                <span>{{ resetLtcData(scope.row.ltcs, "beginYearReduce") }}</span>
              </template>

              <template #sapCode="scope">
                <span>{{
                  scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode
                }}</span>
              </template>

              <template #share="scope">
                <span>{{ +scope.row.share || 0 }}</span>
              </template>
            </tableList>
            <div class="beizhu">
              备注 Remarks:
              <div class="beizhu-value">
                <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
              </div>
            </div>
          </div>
        </template>
      </template> -->
    </iCard>
  </div>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from "rise"
import tableList from "@/views/designate/designatedetail/components/tableList"
import { partProjTypes, fileType } from "@/config"
import { getList, getRemark, reviewListRs, searchRsPageExchangeRate } from "@/api/designate/decisiondata/rs"
import { checkList, fileTableTitle, infos } from "./data"
import { nomalTableTitleSub, accessoryTableTitle, sparePartTableTitle } from "./pdfData"

export default {
  components: { iCard, iFormGroup, iFormItem, iText, tableList },
  props:{
    nominateId:{
      type:String,
    },
  cardTitle: { type: String },
  basicData: { type: Object, default: () => ({}) },
  titleData: { type: Array, default: () => [] },
  // tableTitle: { type: Array, default: () => [] },
  tableData: { type: Array, default: () => [] },
  firstCount: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  remarkItem: { type: Array, default: () => [] },
  projectType: { type: String },
  isApproval: { type: Boolean },
  exchangeRageCurrency: { type: Array, default: () => [] },
  checkList: { type: Array, default: () => [] },
  exchangeRate: { type: String, default: "" },
  tableHeight: { type: Number, default: 0 },
  otherTableHeight: { type: Number, default: 0 },
  tableList: { type: Array, default: () => [] },
  },
  data() {
    return {
      partProjTypes,
      height:0,
      // titleData: [
      //   { label: "零件关系", value: "配件", props: "partProjectType" },
      //   { label: "询价采购员", value: "胡伟", props: "buyer" },
      //   { label: "货币单位", value: "RMB", props: "currency" },
      //   { label: "申请单号", value: "", props: "nominateAppId" },
      //   { label: "申请日期", value: "2020-01-01", props: "nominateAppTime" },
      //   { label: "LINIE采购员", value: "胡伟", props: "linieName" },
      //   { label: "Exchange rate", value: "", props: "cfExchangeRate" },
      // ],
      // basicData: {},
      // tableData: [],
      // projectType: partProjTypes.PEIJIAN,
      // remarkItem: [],
      infos,
    };
  },
  watch:{
    tableHeight(v){
      this.height = v
    }
  },
  computed: {
    tableTitle () {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle
      } else if (this.projectType === partProjTypes.GSLINGJIAN || this.projectType === partProjTypes.GSCOMMONSOURCING) {
        return gsTableTitle
      }

      return nomalTableTitleSub
    },
    isPF() {
      // 是否配附件
      return (
        this.projectType === this.partProjTypes.PEIJIAN ||
        this.projectType === this.partProjTypes.FUJIAN
      );
    },
  },
  methods: {
    getFS(item){
      let arr = item.split('(')
      if(arr[1]) arr[1] = '('+arr[1]
      return arr
    },
    // 单独处理下年降或年降计划
    resetLtcData(row, type) {
      if (!row) return ""
      // 年降开始时间
      if (type == "beginYearReduce") {
        // 取第一个非0的年份
        const list = row.filter((item) => item.ltcRate != "0.00");
        return list.length ? list[0].ltcDate : "-";
      } else {
        // 年降
        // 从非0开始至非0截至的数据 不包含0
        let strList = [];
        let strFlag = false;
        for (let i = 0; i < row.length; i++) {
          if (row[i].ltcRate != "0.00") {
            strFlag = true;
            strList.push(row[i].ltcRate);
          } else if (strFlag && row[i].ltcRate == "0.00") {
            break;
          }
        }
        return strList.length ? strList.join("/") : "-";
      }
    },
    // /**
    //  * @Description: 获取表格初始数据
    //  * @Author: Luoshuang
    //  * @param {*}
    //  * @return {*}
    //  */    
    // getTopList() {
    //   getList(this.nominateId).then(res => {
    //     if (res.code == 200) {
    //       this.basicData = res.data
    //       this.tableData = res.data.lines
    //       this.projectType = res.data.partProjectType || ''
    //     } else {
    //       this.basicData = {}
    //       this.tableData = []
    //       this.projectType = ''
    //     }
    //   })
    // },
    // getRemark() {
    //   getRemark(this.nominateId).then(res => {
    //     if (res.code == 200) {
    //       this.remarkItem = res.data.map(item => {
    //         return {value: item, checked: false}
    //       })
    //     }
    //   })
    // },
  },
};
</script>

<style lang="scss" scoped>
.rsPdf {
  width: 100%;
  background: #FFFFFF;

  .rsCard {
    box-shadow: none;
    & + .rsCard {
      margin-top: 20px; /*no*/
    }
  }

  .rsTable {
    font-size: 8px; /*no*/
    &::before {
      height: 0;
    }
    ::v-deep thead th {
      padding-top: 8px; /*no*/
      padding-bottom: 8px; /*no*/
      & > .cell {
        padding-left: 3px; /*no*/
        padding-right: 3px; /*no*/
        line-height: 14px; /*no*/
        span {
          // zoom: 0.85;
        }

        // span span {
        //   // font-size: 8px;
        // }
        p {
          min-height: 16px; /*no*/
        }
      }
    }
    ::v-deep tr {
      border-left: 1px solid #EBEEF5;
      border-bottom: 1px solid #EBEEF5;
      td {
        & > .cell{
          padding-right: 1px; /*no*/
          padding-left: 1px; /*no*/
        }
      }
    }
  }

  .meetingRemark-item {
    margin-top: 20px; /*no*/
    min-height: 100px; /*no*/
    border: 1px solid rgb(201, 216, 219); /*no*/
    box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
    border-radius: 5px; /*no*/
    padding: 5px 10px; /*no*/
  }

  .infos {
    display: flex;
    margin-bottom: 20px;

    .infoWrapper {
      flex: 1;
    
      .info {
        font-size: 13px;
        display: flex;
        .label {
          font-weight: 800;
        }
      }
    }
  }
  .pdf-item{
    ::v-deep .card{
      .cardHeader{
        padding-left: 0
      }
      .cardBody{
        padding-left: 0
      }
    }
  }
  
  .beizhu {
    background-color: rgba(22, 96, 241, 0.03);
    // height: 40px;
    padding: 12px 14px;
    font-weight: bold;
    display: flex;
    &-value {
      font-weight: 400;
      margin-left: 20px;
    }
  }
  .page-logo{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
  }
}
</style>