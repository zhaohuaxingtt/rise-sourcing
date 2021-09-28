<!--
 * @Author: youyuan
 * @Date: 2021-08-03 10:35:28
 * @LastEditTime: 2021-09-28 18:02:23
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\costAnalysisMain\components\costAnalysisAdd\index.vue
-->
<template>
  <div>
    <handleInput
      :key="modalParam.key"
      v-model="modalParam.visible"
      @handleCloseDialog="handleCancel"
      @handleSubmitDialog="handleSubmitDialog"
    />
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language("FENXIMINGCHENG", "分析名称") }}</p>
        <span class="buttonBox">
          <iButton @click="clickHandleInput">{{
            language("SHOUGONGSHURU", "手工输入")
          }}</iButton>
          <iButton @click="clickBack">{{
            language("FANHUIFENXIKU", "返回分析库")
          }}</iButton>
        </span>
      </div>
      <div class="searchBox">
        <el-form
          :inline="true"
          :model="searchForm"
          :label-position="labelPosition"
          class="demo-form-inline"
        >
          <el-form-item
            style="width: 220px; marginRight: 53px;"
            :label="language('DINGDIANRIQI', '定点日期')"
          >
            <iDatePicker
              v-model="searchForm['date']"
              valueFormat="yyyy-MM-dd"
              type="daterange"
            ></iDatePicker>
          </el-form-item>
          <el-form-item style="width: 220px; marginRight: 53px;">
            <span slot="label">
              {{ language("ZUIJINNCIDINGDIANSHU", "最近n次定点数（n≤50）") }}
              <el-tooltip
                :content="language('ZUIDASHAIXUANFANWEI', '最大筛选范围：50次')"
                placement="top"
                effect="light"
              >
                <i class="el-icon-warning-outline rotate"></i>
              </el-tooltip>
            </span>
            <iInput
              v-positive="'num'"
              v-model="searchForm['nomiNum']"
              :placeholder="language('QINGSHURU', '请输入')"
              @change="handleNomiNumChange($event)"
            ></iInput>
          </el-form-item>
          <el-form-item
            style="width: 220px; marginRight: 53px;"
            :label="language('LIUWEIHAO', '六位号')"
          >
            <iInput
              v-alphabet
              v-model="searchForm['sixNum']"
              :placeholder="language('QINGSHURU', '请输入')"
            ></iInput>
          </el-form-item>
          <el-form-item class="searchButton">
            <el-button @click="handleSubmitSearch">{{
              language("QUEREN", "确认")
            }}</el-button>
            <el-button style="marginRight: -8px;" @click="handleSearchReset">{{
              language("CHONGZHI", "重置")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="mainContent">
        <div class="tableOptionBox">
          <p class="tableTitle">{{ language("SHAIXUANJIEGUO", "筛选结果") }}</p>
          <iButton @click="clickCreate">{{
            language("SHENGCHENG", "生成")
          }}</iButton>
        </div>
        <tableList
          ref="multipleTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
        >
        </tableList>
        <!-- <iPagination v-update
                     @size-change="handleSizeChange($event, changePage)"
                     @current-change="handleCurrentChange($event, changePage)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page='page.currPage'
                     :total="page.totalCount" /> -->
      </div>
    </iCard>
  </div>
</template>

<script>
import {
  iCard,
  iButton,
  iInput,
  iPagination,
  iDatePicker,
  iMessage,
} from "rise";
import tableList from "@/components/ws3/commonTable";
import { tableTitle } from "./components/data";
import { pageMixins } from "@/utils/pageMixins";
import handleInput from "./components/handleInput";
import { listNomiData } from "@/api/partsrfq/costAnalysis/index.js";
export default {
  name: "CostAnalysis",
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iPagination,
    tableList,
    iDatePicker,
    handleInput,
  },
  data() {
    return {
      costAnalysisMainUrl:
        "/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain",
      costAnalysisUrl:
        "/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysis",
      costAnalysisInputUrl:
        "/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisHandleInput",
      searchForm: {},
      labelPosition: "top",
      tableTitle,
      tableListData: [],
      tableListData1: [],
      loading: false,
      modalParam: {
        key: 0,
        visible: false,
      },
      selection: [],
    };
  },
  created() {
    // this.initTestData()
    
    this.operateLog = this.$route.query.operateLog? JSON.parse(this.$route.query.operateLog): null;
    this.initSearchData();
    this.getTableData().then((res) => {
      console.log(1111)
      if (res) {
        this.$nextTick((_) => {
          console.log(2222)
          this.handleDefaultSelect();
        });
      }
    });
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.tableListData = [
        {
          id: 1,
          partsId: "123 456 789A",
          fsId: "FS20-12345",
          supplierName: "上海汇众汽车有限公司",
          linie: "XXXX",
          date: "YYYY-MM-DD",
          carTypeProj: "Tiguan L",
        },
        {
          id: 2,
          partsId: "123 456 789A",
          fsId: "FS20-12345",
          supplierName: "上海汇众汽车有限公司",
          linie: "XXXX",
          date: "YYYY-MM-DD",
          carTypeProj: "Tiguan L",
        },
        {
          id: 3,
          partsId: "123 456 789A",
          fsId: "FS20-12345",
          supplierName: "上海汇众汽车有限公司",
          linie: "XXXX",
          date: "YYYY-MM-DD",
          carTypeProj: "Tiguan L",
        },
        {
          id: 4,
          partsId: "123 456 789A",
          fsId: "FS20-12345",
          supplierName: "上海汇众汽车有限公司",
          linie: "XXXX",
          date: "YYYY-MM-DD",
          carTypeProj: "Tiguan L",
        },
      ];
      this.loading = false;
    },
    // 初始化检索条件
    initSearchData() {
      // const operateLog = this.$route.query.operateLog
      //   ? JSON.parse(this.$route.query.operateLog)
      //   : null;
      let operateLog=this.operateLog
      let nomiNum=20
      if(operateLog && operateLog.nomiNum>20)nomiNum=operateLog.nomiNum
      this.searchForm = {
        ...this.searchForm,
        nomiNum: nomiNum,
        sixNum: operateLog ? operateLog.sixNum : null,
      };
      if (operateLog && operateLog.endDate && operateLog.startDate) {
        const date = [];
        date.push(operateLog.startDate.valueOf());
        date.push(operateLog.endDate.valueOf());
        this.$set(this.searchForm, "date", date);
      }
      this.page.pageSize = 100;
    },
    // 获取表格数据
    getTableData() {
      return new Promise((resolve) => {
        this.loading = true;
        if (this.searchForm.nomiNum > 50) {
          iMessage.error(this.language("NOMINUMVERIFY", "输入数字不能大于50"));
          this.loading = false;
          return;
        }
        const params = {
          pageNo: this.page.currPage,
          pageSize: 50,
          categoryCode: this.$store.state.rfq.categoryCode,
          startDate:
            this.searchForm.date && this.searchForm.date.length > 0
              ? this.searchForm.date[0]
              : null,
          endDate:
            this.searchForm.date && this.searchForm.date.length > 0
              ? this.searchForm.date[1]
              : null,
          nomiNum: this.searchForm.nomiNum,
          sixNum: this.searchForm.sixNum,
        };
        listNomiData(params).then((res) => {
          if (res && res.code == 200) {
           
            this.tableListData1 = _.cloneDeep(res.data);
            if(!this.operateLog){
              this.tableListData=this.tableListData1
            }
            this.page.totalCount = res.total;
            this.loading = false;
            resolve(_.cloneDeep(res.data));
          } else iMessage.error(res.desZh);
        });
      });
    },
    // 处理默认选中并排序
    handleDefaultSelect() {
      let dataList = _.cloneDeep(this.tableListData1);
     
      const operateLog = this.$route.query.operateLog
        ? JSON.parse(this.$route.query.operateLog)
        : null;
      if (operateLog) {
        const fsList = operateLog.idList;
        console.log(fsList);
        let checkList = [];
        let checkList2=[]
        dataList.forEach((item, index) => {
          
          if (fsList.indexOf(item.id) > -1) {
            checkList.push(item);
           
          }else{
            checkList2.push(item);
          }
          
        });
          checkList.sort((a, b) =>
            b.nomiDate.localeCompare(a.nomiDate)
          );
        this.tableListData = [...checkList, ...checkList2];
        this.$nextTick(() => {
        
          this.tableListData.forEach((item) => {
            if (fsList.indexOf(item.id) > -1) {
              this.$refs.multipleTable.$refs.dataTable.toggleRowSelection(
                item,
                true
              );
            }
          });
        });
      }
    },
    // 表格选中事件
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 点击手工输入
    clickHandleInput() {
      this.$set(this.modalParam, "key", Math.random());
      this.$set(this.modalParam, "visible", true);
    },
    // 点击返回分析库
    clickBack() {
      this.$router.push(this.costAnalysisUrl);
    },
    // 点击确定查询
    handleSubmitSearch() {
      this.page.currPage = 1;
      this.page.pageSize = 50;
      this.selection = [];
      this.getTableData().then((res) => {
        if (!res || res.length == 0) {
          iMessage.error(this.$t("TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR"));
        }else{
          this.handleDefaultSelect()
        }
      });
    },
    // 点击重置查询
    handleSearchReset() {
      this.page.currPage = 1;
      this.page.pageSize = 50;
      this.selection = [];
      this.searchForm={}
      if(this.operateLog){
        this.operateLog.nomiNum=20
      }else{
        this.operateLog={nomiNum:20}
      }
      
      this.initSearchData();
      this.getTableData().then((res) => {
        if (!res || res.length == 0) {
          iMessage.error(this.$t("TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR"));
        }else{
          this.tableListData=this.tableListData1
        }
      });
    },
    // 点击生成
    clickCreate() {
      console.log(this.selection);
      if (this.selection.length === 0) {
        iMessage.error(
          this.language("QINGXUANZHONGZHISHAOYITIAOSHUJU", "请选中至少一条数据")
        );
        return;
      }
      this.$router.push({
        path: this.costAnalysisMainUrl,
        query: {
          startDate:
            this.searchForm.date && this.searchForm.date.length > 0
              ? this.searchForm.date[0]
              : null,
          endDate:
            this.searchForm.date && this.searchForm.date.length > 0
              ? this.searchForm.date[1]
              : null,
          nomiNum: this.searchForm.nomiNum,
          sixNum: this.searchForm.sixNum,
          schemeId: this.$route.query.schemeId || null,
          fsNumList: JSON.stringify(this.selection.map((item) => item.id)),
        },
      });
    },
    // 取消手工输入弹窗
    handleCancel() {
      this.$set(this.modalParam, "visible", false);
    },
    // 点击提交手工输入弹窗数据
    handleSubmitDialog(data) {
      this.$router.push({
        path: this.costAnalysisInputUrl,
        query: {
          operateLog: JSON.stringify(data),
        },
      });
    },
    // 输入六位号发生变更
    handleNomiNumChange(e) {
      if (e > 50) this.$set(this.searchForm, "nomiNum", 50);
      if (e == 0) this.$set(this.searchForm, "nomiNum", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
    button {
      margin-left: 30px;
    }
  }
}
.searchBox {
  .searchButton {
    margin-top: 50px;
    float: right;
    z-index: 100;
    button {
      width: 100px;
      height: 35px;
      border: none;
      background-color: #eef2fb;
      font-weight: bold;
      color: #1660f1;
      font-size: 16px;
      // margin-right: -8px;
      margin-left: 30px;
    }
  }
}
.mainContent {
  margin-top: 48px;
  padding-bottom: 30px;
  .tableOptionBox {
    .tableTitle {
      display: inline;
      font-weight: bold;
      font-size: 16px;
      color: #000;
    }
    button {
      float: right;
      z-index: 100;
      margin-left: 30px;
      margin-bottom: 20px;
    }
  }
  .stickIcon:hover {
    cursor: pointer;
  }
  ::v-deep .openPage {
    position: relative;
    color: $color-blue;
    font-size: 14px;
    cursor: pointer;
  }
}

.rotate {
  transform: rotate(180deg);
  color: #a0bffc;
  margin-left: 10px;
  font-size: 16px;
}
</style>
