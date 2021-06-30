<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-06-25 11:40:19
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage class="partsprocureHome">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
        <div>
          <div class="margin-bottom33">
            <iNavMvp @change="change" lang right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div>
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <iSearch
            class="margin-bottom20"
            @sure="sure"
            @reset="reset"
            :resetKey="PARTSPROCURE_RESET"
            :searchKey="PARTSPROCURE_CONFIRM"
          >
            <el-form>
              <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNUMBER')">
                <iInput
                  :placeholder="$t('partsprocure.PARTSPROCURE')"
                  v-model="form['search.partNum']"
                  v-permission="PARTSPROCURE_PARTNUMBER"
                ></iInput>
              </el-form-item>
              <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTNAMEZH')">
                <iInput
                  :placeholder="
                    $t('partsprocure.PLEENTER') +
                    $t('partsprocure.PARTSPROCUREPARTNAMEZH')
                  "
                  v-model="form['search.partNameZh']"
                  v-permission="PARTSPROCURE_PARTNAMEZH"
                ></iInput>
              </el-form-item>
              <el-form-item
                :label="$t('partsprocure.PARTSPROCUREFSNFGSNFSPNR')"
              >
                <iInput
                  :placeholder="
                    $t('partsprocure.PLEENTER') +
                    $t('partsprocure.PARTSPROCUREFSNFGSNFSPNR')
                  "
                  v-model="form['search.fsnrGsnrNum']"
                  v-permission="PARTSPROCURE_FSINPUT"
                >
                </iInput>
              </el-form-item>
              <el-form-item
                :label="$t('partsprocure.PARTSPROCUREINQUIRYBUYER')"
              >
                <iInput
                  :placeholder="
                    $t('partsprocure.PLEENTER') +
                    $t('partsprocure.PARTSPROCUREINQUIRYBUYER')
                  "
                  v-model="form['search.buyerName']"
                  v-permission="PARTSPROCURE_INQUIRYBUYER"
                >
                </iInput>
              </el-form-item>
              <el-form-item :label="$t('partsprocure.PARTSPROCURELINIE')">
                <iInput
                  :placeholder="
                    $t('partsprocure.PLEENTER') +
                    $t('partsprocure.PARTSPROCURELINIE')
                  "
                  v-model="form['search.linieName']"
                  v-permission="PARTSPROCURE_LINIEINPUT"
                ></iInput>
              </el-form-item>
              <el-form-item :label="$t('partsprocure.PARTSPROCUREPARTSTATUS')">
                <iSelect
                  :placeholder="
                    $t('partsprocure.CHOOSE') +
                    $t('partsprocure.PARTSPROCUREPARTSTATUS')
                  "
                  v-model="form['search.partStatus']"
                  v-permission="PARTSPROCURE_PARTSTATUS"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.key"
                    :label="item.name"
                    v-for="(item, index) in getGroupList('project_status')"
                    :key="index"
                  ></el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="$t('partsprocure.PARTSPROCUREVEHICLECATEGORIES')"
              >
                <iSelect
                  :placeholder="
                    $t('partsprocure.CHOOSE') +
                    $t('partsprocure.PARTSPROCUREVEHICLECATEGORIES')
                  "
                  v-model="form['search.cartypeCategory']"
                  v-permission="PARTSPROCURE_VEHICLECATEGORIES"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.key"
                    :label="item.name"
                    v-for="(item, index) in getGroupList('cartype_category')"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="$t('partsprocure.PARTSPROCUREMODELPROJECT')"
              >
                <iSelect
                  :placeholder="
                    $t('partsprocure.CHOOSE') +
                    $t('partsprocure.PARTSPROCUREMODELPROJECT')
                  "
                  v-model="form['search.cartypeProjectZh']"
                  v-permission="PARTSPROCURE_MODELPROJECT"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.key"
                    :label="item.name"
                    v-for="(item, index) in getGroupList('cartype_project_zh')"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="$t('partsprocure.PARTSPROCUREPARTITEMTYPE')"
              >
                <iSelect
                  :placeholder="
                    $t('partsprocure.CHOOSE') +
                    $t('partsprocure.PARTSPROCUREPARTITEMTYPE')
                  "
                  v-model="form['search.partPrejectType']"
                  v-permission="PARTSPROCURE_PARTITEMTYPE"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.key"
                    :label="item.name"
                    v-for="(item, index) in getGroupList('part_project_type')"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="$t('partsprocure.PARTSPROCUREPURCHASINGFACTORY')"
              >
                <iSelect
                  :placeholder="
                    $t('partsprocure.CHOOSE') +
                    $t('partsprocure.PARTSPROCUREPURCHASINGFACTORY')
                  "
                  v-model="form['search.procureFactory']"
                  v-permission="PARTSPROCURE_PURCHASINGFACTORY"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.key"
                    :label="item.name"
                    v-for="(item, index) in getGroupList('procure_factory')"
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
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">
                {{ $t("partsprocure.PARTSPROCURENEWPROCUREMENTPROJECT") }}</span
              >
              <div class="floatright">
                <!-- 手工采购项目创建 -->
                <iButton @click="openCreateParts">{{ language("SHOUGONGCAIGOUXIANGMUCHUANGJIAN", "手工采购项目创建") }}</iButton>
                <iButton
                  @click="openDiologChangeItems"
                  v-permission="PARTSPROCURE_TRANSFER"
                >
                  {{ $t("partsprocure.PARTSPROCURETRANSFER") }}
                </iButton>
                <creatFs
                  :projectIds="projectIds"
                  @refresh="getTableListFn"
                  v-permission="PARTSPROCURE_GENERATEFSBUTTON"
                ></creatFs>
                <!--  <iButton @click="creatFs" v-permission="PARTSPROCURE_GENERATEFSBUTTON">
                  {{ $t('partsprocure.PARTSPROCUREGENERATEFSGSNR') }}
                </iButton> -->
                <iButton
                  @click="openDiologBack"
                  v-permission="PARTSPROCURE_CANCELPROCUREMENTITEMS"
                >
                  {{ $t("partsprocure.PARTSPROCURECANCELPARTSPURCHASE") }}
                </iButton>
                <iButton
                  @click="openBatchmiantain"
                  v-permission="PARTSPROCURE_BATCHMAINTENANCE"
                >
                  {{ $t("partsprocure.PARTSPROCUREBATCHMAINTENANCE") }}
                </iButton>
                <iButton
                  @click="start"
                  :loading="startLoding"
                  v-permission="PARTSPROCURE_STARTINQUIRY"
                >
                  {{ $t("partsprocure.PARTSPROCURESTARTINQUIRY") }}
                </iButton>
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
  iInput,
  iSelect,
} from "rise";
import { iNavMvp } from "rise";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "@/views/partsign/home/components/backItems";
import { tableTitle, form } from "./components/data";
import tablelist from "../../partsign/home/components/tableList";
import {
  getTabelData,
  changeProcure,
  getProcureGroup,
} from "@/api/partsprocure/home";
import { insertRfq } from "@/api/partsrfq/home";
import changeItems from "../../partsign/home/components/changeItems";
import filters from "@/utils/filters";
import creatFs from "./components/creatFs";
import { cloneDeep } from "lodash"
import { clickMessage } from "@/views/partsign/home/components/data"

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iButton,
    iCard,
    tablelist,
    changeItems,
    iPagination,
    iNavMvp,
    iSearch,
    iInput,
    iSelect,
    backItems,
    creatFs,
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      diologChangeItems: false,
      form: cloneDeep(form),
      fromGroup: [],
      diologBack: false, //退回
      startLoding: false,
      tab: "source",
    };
  },
  computed: {
    projectIds() {
      return this.getPurchasePrjectId();
    },
    ...mapState(["navList"]),
    ...mapActions(["updateNavList"])
  },
  created() {
    Object.keys(this.$route.query).forEach(key => {
      this.$set(this.form, `search.${ key }`, this.$route.query[key])
    })

    this.getTableListFn();
    this.getProcureGroup();
    this.updateNavList
  },
  methods: {
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/sourcing/partsprocure/editordetail",
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
          // this.page.currPage = res.data.pageData.pageNum;
          // this.page.pageSize = res.data.pageData.pageSize;
          this.page.totalCount = res.data.pageData.total || 0
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
              path: "/sourcing/partsrfq/editordetail",
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
      if (Array.isArray(this.fromGroup) && this.fromGroup.length > 0) {
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
        path: "/sourcing/partsprocure/batchmiantain",
        query: {
          ids: this.getPurchasePrjectId(),
        },
      });
    },
    openCreateParts() {
      this.$router.push({ path: "/sourcing/createparts/home" })
    },
    // 通过待办数跳转
    clickMessage,
  },
  beforeRouteUpdate(to, from, next) {
    this.form = cloneDeep(form)

    Object.keys(to.query).forEach(key => {
      this.$set(this.form, `search.${ key }`, to.query[key])
    })

    this.getTableListFn()
    next()
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
  }
}
</style>
