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
          <iSearch
              class="margin-bottom20"
              style="margin-top: 20px"
              @sure="sure"
              @reset="reset"
              :icon="true"
              :resetKey="PARTSPROCURE_RESET"
              :searchKey="PARTSPROCURE_CONFIRM"
          >
            <el-form>
              <el-form-item label="车型项目">
                <iSelect
                    placeholder="请选择"
                    v-model="form['search.carTypeProject']"
                    v-permission="PARTSPROCURE_PARTSTATUS"
                    @change="changeCarTypeProject"
                >
                  <el-option
                      :value="item.id"
                      :label="item.cartypeNname"
                      v-for="(item, index) in fromGroup"
                      :key="index"
                  ></el-option>
                </iSelect>
              </el-form-item>
              <el-form-item label="项目类型">
                <iSelect
                    placeholder="请选择"
                    v-model="form['search.projectType']"
                    v-permission="PARTSPROCURE_VEHICLECATEGORIES"
                >
                  <el-option
                      :value="item.key"
                      :label="item.name"
                      v-for="(item, index) in getGroupList('cartype_category')"
                      :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item label="定点类型">
                <iSelect
                    placeholder="请选择"
                    v-model="form['search.fixedPointType']"
                    v-permission="PARTSPROCURE_MODELPROJECT"
                >
                  <el-option
                      :value="item.key"
                      :label="item.name"
                      v-for="(item, index) in getGroupList('cartype_project_zh')"
                      :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item label="车型类别">
                <iSelect
                    placeholder="请选择"
                    v-model="form['search.modelCategory']"
                    v-permission="PARTSPROCURE_PARTITEMTYPE"
                >
                  <el-option
                      :value="item.key"
                      :label="item.name"
                      v-for="(item, index) in getGroupList('part_project_type')"
                      :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
            </el-form>
          </iSearch>
          <iCard>
            <!------------------------------------------------------------------------>
            <!--                  table模块，向外入参表格数据，表头                    --->
            <!------------------------------------------------------------------------>
            <div class="header margin-bottom20">
              <div>
                材料组：
                <el-input placeholder="请输入查询" v-model="form['search.materialName']" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                零件六位号：
                <el-input placeholder="请输入查询" v-model="form['search.partNum']" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <iButton @click="deleteItems">添加行</iButton>
                <iButton @click="deleteItems">删除行</iButton>
                <iButton @click="deleteItems">参考车型</iButton>
                <iButton @click="deleteItems">保存</iButton>
                <iButton @click="deleteItems">生成投资清单</iButton>
              </div>
            </div>
            <tablelist
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                @openPage="openPage"
                :activeItems="'partNum'"
            >
              <template #moldProperties="scope">
                <iInput v-model="scope.row.moldProperties"></iInput>
              </template>
              <template #newLinieName="scope">
                <iInput v-model="scope.row.newLinieName"></iInput>
              </template>
              <template #zp="scope">
                <iInput v-model="scope.row.zp"></iInput>
              </template>
              <template #remarks="scope">
                <iInput v-model="scope.row.remarks"></iInput>
              </template>
            </tablelist>
            <!------------------------------------------------------------------------>
            <!--                  表格分页                                          --->
            <!------------------------------------------------------------------------>
            <iPagination
                v-update
                @size-change="handleSizeChange($event, getTableListFn)"
                @current-change="handleCurrentChange($event, getTableListFn)"
                background
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="page.totalCount"
            />
          </iCard>
          <!------------------------------------------------------------------------>
          <!--                  转派弹出框                                         --->
          <!------------------------------------------------------------------------>
          <changeItems
              v-model="diologChangeItems"
              @sure="sureChangeItems"
              :title="$t('LK_LINGJIANCAIGOUXIANGMUZHUANPAI')"
          ></changeItems>
          <backItems
              v-model="diologBack"
              @sure="cancel"
              :title="$t('LK_QUXIAOLINGJIANCAIGOUXIANGMU')"
          ></backItems>
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
import { budgetManagementData, form } from "./components/data";
import tablelist from "./components/tablelist";
import {
  getTabelData,
  changeProcure,
  getProcureGroup,
} from "@/api/partsprocure/home";
import {
  findInvestmentBuild,
  getCartypePulldown,
  findProjectTypeDetailPulldown,
} from "@/api/priceorder/stocksheet/edit";
import { insertRfq } from "@/api/partsrfq/home";
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
      carType: '',

      tableListData: [],
      tableLoading: false,
      tableTitle: budgetManagementData,
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
  },
  methods: {
    changeCarTypeProject(){
      console.log(this.form)
      let parmars = {
        cartypeProId: this.form['search.projectType'],
        materialName: this.form['search.materialName'],
        partNum: this.form['search.partNum'],
      }
      findProjectTypeDetailPulldown(parmars).then((res) => {
        console.log(res)
      });
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
      getCartypePulldown().then((res) => {
        this.fromGroup = res.data;
        this.form['search.carTypeProject'] = Number(this.$route.query.id)
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
      findInvestmentBuild({"id": 1,
        "cartypeNname": "项目xxx",
        "sourceType": "1" })
          .then((res) => {
            this.tableLoading = false;
            this.page.currPage = res.pageNum;
            this.page.pageSize = res.pageSize;
            this.page.totalCount = res.total;
            this.tableListData = res.data;
            console.log(this.tableListData)
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
      // this.getTableListFn();
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
.input-with-select{
  width: 200px;
}

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
    .header{
      display: flex;
      justify-content: space-between;

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
}
</style>
