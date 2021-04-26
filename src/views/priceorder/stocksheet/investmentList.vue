<!--
 * @Author: yz
 * @Date: 2021-04-26 09:50:42
 * @Description: 投资清单。
-->
<template>
  <div class="investmentList">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane name="source">
        <div>
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <iCard class="margin-bottom20 headerIcard" style="margin-top: 20px">
            <img class="editIcon" src="../../../assets/images/editCar.png" alt="">
            <div class="infoIcard">
              <div>
                <label>版本号：</label>
                <span>V-PSK88</span>
              </div>
              <div>
                <label>车型名称：</label>
                <span>V-PSK88</span>
              </div>
              <div>
                <label>采购工厂：</label>
                <span>V-PSK88</span>
              </div>
              <div>
                <label>SOP：</label>
                <span>V-PSK88</span>
              </div>
              <div>
                <label>批准投资：</label>
                <span>V-PSK88</span>
              </div>
            </div>
          </iCard>
          <iCard>
            <!------------------------------------------------------------------------>
            <!--                  table模块，向外入参表格数据，表头                    --->
            <!------------------------------------------------------------------------>
            <div class="header margin-bottom20">
              <div class="search">
                <label>专业科室：</label>
                <iSelect
                    placeholder="请选择"
                    v-model="form['search.professionalDepartments']"
                    v-permission="PARTSPROCURE_PARTSTATUS"
                    filterable
                    @change="changeCarTypeProject"
                >
                  <el-option
                      :value="item.id"
                      :label="item.cartypeNname"
                      v-for="(item, index) in fromGroup"
                      :key="index"
                  ></el-option>
                </iSelect>
              </div>
              <div>
                <iButton @click="addRow">添加行</iButton>
                <iButton @click="deleteIRow">删除行</iButton>
                <iButton @click="referenceModelShow = true">参考车型</iButton>
                <iButton @click="saveRow">保存</iButton>
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
              <template #linie="scope">
                <iInput v-model="scope.row.linie"></iInput>
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
    <addRow v-model="addRowShow" :carTypeProId="form['search.carTypeProject']" @updateTable="getTableListFn"></addRow>
    <referenceModel
        v-model="referenceModelShow"
        :carTypeProId="form['search.carTypeProject']"
        :carType="this.fromGroup"
        @updateTable="getTableListFn"
    ></referenceModel>
  </div>
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
} from "@/components";
import logButton from "./components/logButton";
import {pageMixins} from "@/utils/pageMixins";
import backItems from "@/views/partsign/home/components/backItems";
import {budgetManagementData, form} from "./components/data";
import tablelist from "./components/tablelist";
import addRow from "./components/addRow";
import referenceModel from "./components/referenceModel";
import {
  getTabelData,
  changeProcure,
} from "@/api/partsprocure/home";
import {
  findInvestmentBuild,
  getCartypePulldown,
  findProjectTypeDetailPulldown,
  findProjectDetailById,
  saveCustomCart,
  deleteList,
  GetOtherCarTypeAlternative,
  updateBuildInvestment,
  ConfirmCustomerCarTypeSelect
} from "@/api/priceorder/stocksheet/edit";
import {insertRfq} from "@/api/partsrfq/home";
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
    logButton,
    icon,
    addRow,
    referenceModel,
  },
  data() {
    return {
      carType: '',
      addRowShow: false,
      referenceModelShow: false,
      modelCategoryList: [],
      fixedPointTypeList: [],
      projectTypeList: [],
      carTypeProjectDisabled: false,
      addCarTypeProject: '',
      isAdd: '',

      tableListData: [],
      tableLoading: false,
      tableTitle: budgetManagementData,
      selectTableData: [],
      diologChangeItems: false,
      form: form,
      fromGroup: [],
      diologBack: false, //退回
      startLoding: false,
      addCarTypeLoading: false,
      tab: "source",
      value1: new Date().getTime(),
      tabtitle: [
        {name: "车型项目概览", index: 0, key: "LK_GAILIAN"},
        {name: "预算管理", active: true, key: "LK_CAIGOUSHENQING"},
        {name: "预算审批", active: false, key: "LK_CAIGOUDINGDAN"},
        {name: "BA申请", active: false, key: "LK_DINGJIAGUANLI"},
        {name: "BM申请", active: false, key: "LK_JIAGEZHUISU"},
        {name: "投资报告", active: false, key: "LK_HETONGCHAXUN"},
      ],
    };
  },
  computed: {
    projectIds() {
      return this.getPurchasePrjectId();
    },
  },
  created() {
    this.isAdd = this.$route.query.id == 'add' ? true : false
  },
  methods: {
    handleAddCarTypeProject() {
      this.tableLoading = true
      saveCustomCart({cartypeProjectName: this.addCarTypeProject}).then((res) => {
        if (Number(res.code) === 0) {
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    addRow() {
      this.addRowShow = true
    },
    deleteIRow() {
      if (this.selectTableData.length == 0) {
        iMessage.warn('请先勾选');
        return
      }
      this.tableLoading = true
      deleteList(this.selectTableData.map(item => ({id: item.id, isDelete: 2}))).then((res) => {
        if (Number(res.code) === 0) {
          this.getTableListFn()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
      });
    },
    saveRow() {
      if (this.selectTableData.length == 0) {
        iMessage.warn('请先勾选');
        return
      }
      if (this.selectTableData.length > 1) {
        iMessage.warn('只能勾选保存一行数据');
        return
      }
      this.tableLoading = true
      updateBuildInvestment(this.selectTableData[0]).then((res) => {
        if (Number(res.code) === 0) {
          this.getTableListFn()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
          this.tableLoading = false
        }
      }).catch(() => {
        this.tableLoading = false
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
      let params = {
        cartypeProId: this.form['search.carTypeProject'],
        materialName: this.form['search.materialName'],
        partNum: this.form['search.partNum'],
        current: this.page.currPage,
        size: this.page.pageSize
      }
      findInvestmentBuild(params)
          .then((res) => {
            if (res.data) {
              this.page.currPage = res.pageNum;
              this.page.pageSize = res.pageSize;
              this.page.totalCount = res.total;
              this.tableListData = res.data;
            }
            this.tableLoading = false;
          })
          .catch(() => (this.tableLoading = false));
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
.input-with-select {
  width: 200px;
}

.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.investmentList {
  position: relative;

  .headerIcard ::v-deep .cardBody {
    padding: 18px 60px 22px 50px;
    display: flex;
    align-items: center;

    .infoIcard {
      margin-left: 49px;

      div {
        font-size: 14px;
        margin-bottom: 10px;

        label {
          display: inline-block;
          min-width: 80px;
        }

        &:nth-of-type(1), &:nth-of-type(2) {
          label {
            font-weight: bold;
          }
        }
      }
    }
  }

  //组件按钮间距
  ::v-deep .cardBody .iSearch-content .operation {
    width: auto;
    display: none;
  }

  ::v-deep .serch {
    margin-right: 0;
  }

  .searchSure {
    float: right;
    margin-top: 27px;
  }

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

  .header {
    display: flex;
    justify-content: space-between;

    .search {
      ::v-deep .el-input, ::v-deep .el-select {
        width: 220px;
        margin-right: 30px;
      }
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

        &.active {
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
</style>
