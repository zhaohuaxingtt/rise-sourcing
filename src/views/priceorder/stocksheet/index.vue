<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-04-01 23:39:00
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage class="partsprocureHome" v-permission="PARTSPROCURE_INDEXPAGE">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane name="source">
        <div>
          <div class="flex-between-center-center">
            <div class="tabs">
              <ul>
                <li v-for="(items, index) in tabtitle" :key="index" :class="{ 'active': items.active }">
                  {{items.name}}
                </li>
              </ul>
              <span class="bottom-line"></span>
            </div>
            <div class="btnList flex-align-center">
              <logButton class="margin-left20" @click="log" />
              <span>
                <icon symbol name="icondatabaseweixuanzhong"></icon>
              </span>
            </div>
          </div>
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <div class="content">
            <div class="item">
              <img class="addIcon" src="../../../assets/images/addCar.png" alt="">
            </div>
            <div class="item" v-for="(item, index) in contentData" :key="index" @click="toEdit(item.id)">
              <div class="item_top">
                <img class="editIcon" src="../../../assets/images/editCar.png" alt="">
<!--                <img :src="item.url" alt="">-->
                <div class="title">
                  <h4 :title="item.cartypeProjectName">{{ item.cartypeProjectName }}</h4>
                  <p :title="item.locationFactory">{{ item.locationFactory }}</p>
                  <p :title="item.sop">SOP：{{ item.sop }}</p>
                </div>
              </div>
              <div class="unit">
                单位：百万元
              </div>
<!--              <div class="echart" id="xxx"></div>-->

              <div class="chart" :id="'chart' + index"></div>
            </div>
          </div>
          <!------------------------------------------------------------------------>
          <!--                  转派弹出框                                         --->
          <!------------------------------------------------------------------------>
        </div>
      </el-tab-pane>
    </el-tabs>
  </iPage>
</template>
<script>
import {
  iPage,
  iButton,
  iCard,
  iMessage,
  iPagination,
  iSearch,
  icon,
  iInput,
  iSelect,
  iDatePicker,
  iTabs,
} from "@/components";
import { DatePicker } from "element-ui";
import logButton from "./components/logButton";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "@/views/partsign/home/components/backItems";
import { tableTitle, form } from "./components/data";
import tablelist from "./components/tablelist";
import echarts from "@/utils/echarts";
import {
  getTabelData,
  changeProcure,
  getProcureGroup,
} from "@/api/partsprocure/home";
import {
  findCartypePro
} from "@/api/priceorder/stocksheet";
import {getAllScoringDepartmentInfo, insertRfq} from "@/api/partsrfq/home";
import changeItems from "../../partsign/home/components/changeItems";
import filters from "@/utils/filters";
import creatFs from "./components/creatFs";
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iButton,
    iCard,
    tablelist,
    changeItems,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    backItems,
    creatFs,
    logButton,
    iDatePicker,
    icon,
    DatePicker,
    iTabs,
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      diologChangeItems: false,
      form: form,
      fromGroup: [],
      diologBack: false, //退回
      startLoding: false,
      tab: "source",
      value1: new Date().getTime(),
      tabtitle: [
        { name: "车型项目概览", index: 0, key: "LK_GAILIAN" },
        { name: "预算管理", active: true, key: "LK_CAIGOUSHENQING" },
        { name: "预算审批", active: false, key: "LK_CAIGOUDINGDAN" },
        { name: "BA申请", active: false, key: "LK_DINGJIAGUANLI" },
        { name: "BM申请", active: false, key: "LK_JIAGEZHUISU" },
        { name: "投资报告", active: false, key: "LK_HETONGCHAXUN" },
      ],

      contentData: []
    };
  },
  computed: {
    projectIds() {
      return this.getPurchasePrjectId();
    },
  },
  created() {
    this.getTableListFn();
    this.getProcureGroup();
    this.findCartypePro();
  },
  mounted() {



  },
  methods: {
    toEdit(id){
      this.$router.push({
        path: '/priceorder/stocksheet/Edit',
        query: {
          id: id,
        },
      })
    },
    //获取转派评分任务列表
    findCartypePro(){
      return new Promise((r)=>{
        findCartypePro().then(res => {
          if(res.code == "0"){
            this.contentData = res.data
            this.$nextTick(() => {
              const vm = echarts().init(document.getElementById("chart0"));
              let option = {
                grid: {
                  left: '0%',
                  right: '0',
                  bottom: '0%',
                  top: '12%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu'],
                  axisTick: {
                    show: false
                  },
                  axisLine:{
                    lineStyle:{
                      color: '#CDD4E2'
                    }
                  },
                  axisLabel:{
                    textStyle:{
                      color: '#485465'
                    }
                  },
                },
                yAxis: {
                  type: 'value',
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },

                },
                series: [
                  {
                    data: [120, 200, 150, 80],
                    type: 'bar',
                    barWidth: 30,
                     stack: 'total',
                    label: {
                      show: false,
                      position: 'top',
                      textStyle: {
                        color: '#485465'
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: function(params){
                          console.log(params)
                          let colorlist = ['#1763F7','#73A1FA','#B0C5F5','#CEE1FF'];
                          return colorlist[params.dataIndex];
                        }
                      },
                    }
                  },
                  {
                    data: [150, 100, 250, 100],
                    type: 'bar',
                    barWidth: 30,
                     stack: 'total',
                    label: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#485465'
                      }
                    },
                    itemStyle: {
                      normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: function(params){
                          console.log(params)
                          let colorlist = ['#55C2D0','#87D4DE','#BBE7EC','#D4F8F7'];
                          return colorlist[params.dataIndex];
                        }
                      },
                    }
                  }
                ]
              };
              vm.setOption(option);

              const vm1 = echarts().init(document.getElementById("chart1"));
              let option1 = {
                grid: {
                  left: '0%',
                  right: '0',
                  bottom: '0%',
                  top: '12%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu'],
                  axisTick: {
                    show: false
                  },
                  axisLine:{
                    lineStyle:{
                      color: '#CDD4E2'
                    }
                  },
                  axisLabel:{
                    textStyle:{
                      color: '#485465'
                    }
                  },
                },
                yAxis: {
                  type: 'value',
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },

                },
                series: [{
                  data: [120, 200, 150, 80],
                  type: 'bar',
                  barWidth: 30,
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#485465'
                    }
                  },
                  itemStyle: {
                    normal: {
                      barBorderRadius: [5, 5, 0, 0],
                      color: function(params){
                        console.log(params)
                        let colorlist = ['#1763F7','#73A1FA','#B0C5F5','#CEE1FF'];
                        return colorlist[params.dataIndex];
                      }
                    },
                  }
                }]
              };
              vm.setOption(option);
            })
          }
        }).catch()
      })
    },
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
    //获取上方group信息
    // part_status --零件状态
    // cartype_category --车型类型
    // cartype_project_zh --车型项目
    // part_preject_type --零件项目类型
    // procure_factory   --采购工厂
    // purchase_clause   --采购条款
    // part_type         --零件类型
    // unit              --单位
    // pay_clause        --支付条款
    // currency_id       --币种
    // linie_dept        --Linie部门A
    // linie_name        --Line
    // cf_controller     --Cf控制员
    // is_common_sourcing--Sourcing
    // buyer_name        --询价采购员
    getProcureGroup() {
      let types = [
        "project_status",
        "cartype_project_zh",
        "cartype_category",
        "part_project_type",
        "procure_factory",
      ];
      getProcureGroup({ types }).then((res) => {
        this.fromGroup = res.data;
      });
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.$t(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU"
          )
        );
      this.diologChangeItems = true;
    },
    //确认转派弹窗值。
    sureChangeItems(val) {
      let transfer = {
        buyerName: val.nameZh,
        buyerId: val.id,
        purchaseProjectIds: this.getPurchasePrjectId(),
      };
      changeProcure({
        transfer,
      })
        .then((res) => {
          this.diologChangeItems = false;
          if (res.data) {
            iMessage.success(this.$t("LK_ZHUANPAICHENGGONG"));
            this.getTableListFn();
          } else {
            iMessage.error(res.desZh);
          }
        })
        .catch(() => {
          this.diologChangeItems = false;
        });
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true;
      this.form["search.size"] = this.page.pageSize;
      this.form["search.current"] = this.page.currPage;
      getTabelData(this.form)
        .then((res) => {
          this.tableLoading = false;
          this.page.currPage = res.data.pageData.pageNum;
          this.page.pageSize = res.data.pageData.pageSize;
          this.page.totalCount = res.data.pageData.total;
          this.tableListData = res.data.pageData.data;
        })
        .catch(() => (this.tableLoading = false));
    },
    // 查询
    sure() {
      this.getTableListFn();
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.getTableListFn();
    },
    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.$t(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU"
          )
        );
      this.diologBack = true;
    },
    // 取消零件采购
    cancel(backmark) {
      let cancel = {
        cancelRemark: backmark,
        purchaseProjectIds: this.getPurchasePrjectId(),
      };
      changeProcure({
        cancel,
      })
        .then((res) => {
          if (res.data) {
            iMessage.success(this.$t("LK_CAOZUOCHENGGONG"));
            this.getTableListFn();
          } else {
            iMessage.error(res.desZh);
          }
          this.diologBack = false;
        })
        .catch(() => {
          this.diologBack = false;
        });
    },
    /*********************************************************************
     *                          启动询价模块
     *********************************************************************/
    validateStart() {
      return new Promise((r) => {
        if (this.selectTableData.length == 0) {
          r(false);
          iMessage.warn(
            this.$t(
              "LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU"
            )
          );
          return;
        }
        if (this.selectTableData.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
            this.$t(
              "LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA"
            )
          );
          return;
        }
        r(true);
      });
    },
    async start() {
      if (!(await this.validateStart())) return;
      this.startLoding = true;
      insertRfq({
        rfqPartDTOList: this.selectTableData,
      })
        .then((res) => {
          this.startLoding = false;
          if (res.data && res.data.rfqId) {
            this.$router.push({
              path: "/partsrfq/editordetail",
              query: {
                id: res.data.rfqId,
              },
            });
          } else {
            iMessage.warn(res.desZh);
          }
        })
        .catch((err) => {
          this.startLoding = false;
        });
    },
    /*********************************************************************
     *                          end
     *********************************************************************/
    // 获取选中零件号ID
    getPurchasePrjectId() {
      let purchasePrjectId = [];
      this.selectTableData.map((res) => {
        purchasePrjectId.push(res.purchasePrjectId);
      });
      return purchasePrjectId;
    },
    // 查询fliter数据
    getGroupList(key) {
      if (this.fromGroup.length > 0) {
        let obj = this.fromGroup.find((items) => items.type == key);
        if (!obj) return [];
        return obj.list;
      }
    },
    // 跳转批量维护
    openBatchmiantain() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.$t(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU"
          )
        );
      this.$router.push({
        path: "/partsprocure/batchmiantain",
        query: {
          ids: this.getPurchasePrjectId(),
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.partsprocureHome {
  position: relative;
  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }
  }
  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;

        & + & {
          padding: 0 25px;
        }
      }

      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
    .tabs {
      display: flex;
      > ul {
        display: flex;
        flex-direction: row;
        > li {
          max-width: 130px;
          color: #000000;
          line-height: 23px;
          font-size: 20px;
          font-weight: 400;
          opacity: 0.42;
          padding-bottom: 5px;
          margin-right: 50px;
          &.active{
            font-weight: bold;
            color: #000000;
            opacity: 1;
            border-bottom: 3px solid #1763F7;
          }
        }
      }
      > ul::after {
        width: 100%;
        height: 2px;
        border-bottom: 2px solid red;
      }
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 23px;
    .item {
      width: 410px;
      height: 418px;
      background: #FFFFFF;
      box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
      opacity: 1;
      border-radius: 10px;
      padding: 52px 36px 0 36px;
      margin-bottom: 29px;
      margin-right: calc((100% - 1640px) / 3);
      cursor: pointer;
      &:nth-of-type(4n){
        margin-right: 0;
      }
      .addIcon{
        width: 214px;
        height: 122px;
        transform: translate(-50%, -50%);
        margin-left: 50%;
        margin-top: 47%;
      }
      .item_top{
        display: flex;
        justify-content: space-between;
        color: #41434A;
        line-height: 21px;
        .editIcon{
          width: 150px;
          height: 53px;
          margin-top: 5px;
        }
        .title{
          width: 148px;
          h4{
            font-size: 16px;
            font-weight: bold;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p{
            font-size: 14px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .unit{
        font-size: 12px;
        color: #485465;
        text-align: right;
        margin-top: 46px;
      }
      .chart{
        width: 100%;
        height: 185px;
      }
    }
  }
}
</style>
