<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2022-03-31 14:34:24
 * @LastEditors: YoHo
 * @Description: 零件采购项目建立首页。
 * @FilePath: \front-sourcing\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage class="partsprocureHome">
      <headerNav />
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
      <iSearch
        class="margin-bottom7"
        @sure="
          () => {
            page.currPage = 1;
            getTableListFn();
          }
        "
        @reset="reset"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
      >
        <el-form>
          <el-form-item
            :label="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')"
            v-permission.auto="PARTSPROCURE_PARTNUMBER | 零件号"
          >
            <iMultiLineInput
              :placeholder="
                language(
                  'partsprocure.PARTSPROCURE',
                  '请输入零件号，多个逗号分隔'
                )
              "
              :title="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')"
              v-model="form['partNum']"
            ></iMultiLineInput>
          </el-form-item>
          <el-form-item
            :label="
              language('partsprocure.PARTSPROCUREPARTNAMEZH', '零件名（中）')
            "
            v-permission.auto="PARTSPROCURE_PARTNAMEZH | 零件名中文"
          >
            <iInput
              clearable
              :placeholder="
                language('partsprocure.PLEENTER', '请输入') +
                language('partsprocure.PARTSPROCUREPARTNAMEZH', '零件名（中）')
              "
              v-model="form['partNameZh']"
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="
              language(
                'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
                '零件采购项目号'
              )
            "
            v-permission.auto="PARTSPROCURE_FSINPUT | 零件采购项目号"
          >
            <iInput
              clearable
              :placeholder="
                language('partsprocure.PLEENTER', '请输入') +
                language(
                  'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
                  '零件采购项目号'
                )
              "
              v-model="form['fsnrGsnrNum']"
            >
            </iInput>
          </el-form-item>
          <el-form-item :label="language('RFQBIANHAO', 'RFQ编号')">
            <iInput
              clearable
              v-Int
              v-model="form['rfqId']"
              :placeholder="`${language(
                'partsprocure.PLEENTER',
                '请输入'
              )}${language('RFQBIANHAO', 'RFQ编号')}`"
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="
              language('partsprocure.PARTSPROCUREINQUIRYBUYER', '询价采购员')
            "
            v-permission.auto="PARTSPROCURE_INQUIRYBUYER | 询价采购员"
          >
            <iInput
              clearable
              :placeholder="
                language('partsprocure.PLEENTER', '请输入') +
                language('partsprocure.PARTSPROCUREINQUIRYBUYER', '询价采购员')
              "
              v-model="form['buyerName']"
            >
            </iInput>
          </el-form-item>
          <el-form-item
            :label="language('partsprocure.PARTSPROCURELINIE', 'LINIE')"
            v-permission.auto="PARTSPROCURE_LINIEINPUT | LINIE"
          >
            <iInput
              clearable
              :placeholder="
                language('partsprocure.PLEENTER', '请输入') +
                language('partsprocure.PARTSPROCURELINIE', 'LINIE')
              "
              v-model="form['linieName']"
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="language('partsprocure.PARTSPROCUREPARTSTATUS', '零件状态')"
            v-permission.auto="PARTSPROCURE_PARTSTATUS | 零件状态"
          >
            <iSelect
              clearable
              :placeholder="
                language('partsprocure.CHOOSE', '请选择') +
                language('partsprocure.PARTSPROCUREPARTSTATUS', '零件状态')
              "
              v-model="form['status']"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="item.code"
                :label="item.name"
                v-for="(item, index) in fromGroup['RFQ_PART_STATUS_CODE_TYPE']"
                :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="
              language('partsprocure.PARTSPROCUREVEHICLECATEGORIES', '车型大类')
            "
            v-permission.auto="PARTSPROCURE_VEHICLECATEGORIES | 车型大类"
          >
            <iSelect
              clearable
              filterable
              :placeholder="
                language('partsprocure.CHOOSE', '请选择') +
                language(
                  'partsprocure.PARTSPROCUREVEHICLECATEGORIES',
                  '车型大类'
                )
              "
              v-model="form['carTypeCategory']"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="item.code"
                :label="item.name"
                v-for="(item, index) in fromGroup['CARTYPE_CATEGORY']"
                :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="
              language('partsprocure.PARTSPROCUREMODELPROJECT', '车型项目')
            "
            v-permission.auto="PARTSPROCURE_MODELPROJECT | 车型项目"
          >
            <iSelect
              clearable
              filterable
              :placeholder="
                language('partsprocure.CHOOSE', '请选择') +
                language('partsprocure.PARTSPROCUREMODELPROJECT', '车型项目')
              "
              v-model="form['carTypeProjectId']"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="item.id"
                :label="item.name"
                v-for="(item, index) in fromGroup['CAR_TYPE_PRO']"
                :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="
              language('partsprocure.PARTSPROCUREPARTITEMTYPE', '零件项目类型')
            "
            v-permission.auto="PARTSPROCURE_PARTITEMTYPE | 零件项目类型"
          >
            <iSelect
              clearable
              :placeholder="
                language('partsprocure.CHOOSE', '请选择') +
                language(
                  'partsprocure.PARTSPROCUREPARTITEMTYPE',
                  '零件项目类型'
                )
              "
              v-model="form['partProjectType']"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="item.code"
                :label="item.name"
                v-for="(item, index) in fromGroup['PPT']"
                :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="
              language('partsprocure.PARTSPROCUREPURCHASINGFACTORY', '采购工厂')
            "
            v-permission.auto="PARTSPROCURE_PURCHASINGFACTORY | 采购工厂"
          >
            <iSelect
              clearable
              :placeholder="
                language('partsprocure.CHOOSE', '请选择') +
                language(
                  'partsprocure.PARTSPROCUREPURCHASINGFACTORY',
                  '采购工厂'
                )
              "
              v-model="form['procureFactory']"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="item.code"
                :label="item.name"
                v-for="(item, index) in fromGroup['FAC']"
                :key="index"
              >
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_XIANSHIZIJI', '显示自己')"
            v-permission.auto="PARTSPROCURE_SHOWSELF | 显示自己"
          >
            <iSelect
              clearable
              v-model="form.showSelf"
              :placeholder="
                language('LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI', '显示自己')
              "
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="true"
                :label="language('YES', '是')"
              ></el-option>
              <el-option
                :value="false"
                :label="language('NO', '否')"
              ></el-option>
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
            {{
              language(
                "partsprocure.PARTSPROCURENEWPROCUREMENTPROJECT",
                "零件采购项目管理"
              )
            }}</span
          >
          <div class="floatright">
            <!-- 手工采购项目创建 -->
            <iButton
              @click="openCreateParts"
              v-permission.auto="
                PARTSPROCURE_CREATEMANUALPROCUREMENTITEM | 手工采购项目创建
              "
              >{{
                language("SHOUGONGCAIGOUXIANGMUCHUANGJIAN", "手工采购项目创建")
              }}</iButton
            >
            <iButton
              :loading="zpLoading"
              @click="openDiologChangeItems"
              v-permission.auto="PARTSPROCURE_TRANSFER | 转派"
              >{{ language("partsprocure.PARTSPROCURETRANSFER", "转派") }}
            </iButton>
            <creatFsGsNr
              :projectItems="selectTableData"
              @refresh="getTableListFn"
              v-permission.auto="
                PARTSPROCURE_GENERATEFSBUTTON | 生成零件采购项目号
              "
            ></creatFsGsNr>
            <cancelProject
              :backItems="selectTableData"
              @refresh="getTableListFn"
              v-permission.auto="
                PARTSPROCURE_CANCELPROCUREMENTITEMS | 取消零件采购项目号
              "
            ></cancelProject>
            <iButton
              @click="openBatchmiantain"
              v-permission.auto="PARTSPROCURE_BATCHMAINTENANCE | 批量维护"
              >{{
                language(
                  "partsprocure.PARTSPROCUREBATCHMAINTENANCE",
                  "批量维护"
                )
              }}</iButton
            >
            <startProject
              :startItems="selectTableData"
              v-permission.auto="PARTSPROCURE_STARTINQUIRY | 启动询价"
            ></startProject>
            <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
          </div>
        </div>
        <tablelist
          permissionKey="PARTSPROCURE_HOME"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          @openPage="openPage"
          @openPageTwo="openPageTwo"
          :activeItems="'partNum'"
          :activeItemsTwo="'code'"
          ref="tableList"
          :lang="true"
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
        :title="
          language('LK_LINGJIANCAIGOUXIANGMUZHUANPAI', '零件采购项目转派')
        "
      ></changeItems>
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
  iMultiLineInput,
} from "rise";
import headerNav from "@/components/headerNav";
import { pageMixins } from "@/utils/pageMixins";
import { cancelProject, creatFsGsNr, startProject } from "@/components";
import {
  tableTitle,
  form,
  validateProjectConfig,
  partsprocureNavList,
} from "./components/data";
// import tablelist from "../../partsign/home/components/tableList";
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { getTabelData, changeProcure } from "@/api/partsprocure/home";
import changeItems from "../../partsign/home/components/changeItems";
import filters from "@/utils/filters";
import { clickMessage } from "@/views/partsign/home/components/data";
import { selectDictByKeyss, procureFactorySelectVo } from "@/api/dictionary";
import { getCartypeDict } from "@/api/partsrfq/home";
import { setPretreatmentParams } from "@/utils/tool";
import { getCarTypeSop } from "@/api/partsprocure/editordetail";
import buttonTableSetting from "@/components/buttonTableSetting";
// eslint-disable-next-line no-undef
const { mapActions } = Vuex.createNamespacedHelpers("sourcing");

export default {
  mixins: [pageMixins, filters, tableSortMixins],
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
    creatFsGsNr,
    cancelProject,
    startProject,
    iMultiLineInput,
    headerNav,
    buttonTableSetting,
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      diologChangeItems: false,
      form: JSON.parse(JSON.stringify(form)),
      fromGroup: [],
      diologBack: false, //退回
      tab: "source",
      zpLoading: false,
      cancelLoading: false,
    };
  },
  computed: {
    projectIds() {
      return this.getPurchasePrjectId();
    },
  },
  created() {
    this.tableTitle = tableTitle.filter((item) => !item.isCommonSourcingShow);
    this.getTableListFn();
    this.getProcureGroup();
    this.getCarTypeSop();
  },
  methods: {
    //获取采购工厂
    procureFactorySelectVo() {
      procureFactorySelectVo().then((res) => {
        this.fromGroup["FAC"] = res.data;
      });
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
        .then((res) => {
          if (res?.data) {
            this.fromGroup["CARTYPE_CATEGORY"] = res.data;
            this.$forceUpdate();
          } else {
            this.fromGroup["CARTYPE_CATEGORY"] = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转详情
    openPage(item) {
      const openParts = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          projectId: item.id,
          businessKey: item.partProjectType, //新增业务标识。
        },
      });
      window.open(openParts.href, "_blank");
    },
    openPageTwo(row) {
      window.open(
        `http://10.122.17.38/order/#/purchaserequisition/newapplication?code=` +
          row.code,
        "_blank"
      );
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
        "RFQ_PART_STATUS_CODE_TYPE",
        // "CAR_TYPE_PRO",
        "PPT",
      ];
      selectDictByKeyss(types).then((res) => {
        this.fromGroup = res.data;
        this.getCartypeDict();
        this.procureFactorySelectVo();
      });
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU",
            "抱歉，您当前还未选择您需要转派的零件采购项目！"
          )
        );
      this.diologChangeItems = true;
    },
    //确认转派弹窗值。
    sureChangeItems(val) {
      this.zpLoading = true;
      let transfer = {
        buyerName: val.nameZh,
        buyerId: val.id,
        ids: this.getPurchasePrjectId(),
      };
      this.diologChangeItems = false;
      changeProcure(transfer)
        .then((res) => {
          if (res.code == "200") {
            iMessage.success(this.language("LK_ZHUANPAICHENGGONG", "转派成功"));
            this.getTableListFn();
            this.zpLoading = false;
          } else {
            iMessage.error(res.desZh);
            this.zpLoading = false;
          }
        })
        .catch(() => {
          this.zpLoading = false;
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
      this.form.size = this.page.pageSize;
      this.form.current = this.page.currPage;
      // 获取预置的参数
      setPretreatmentParams(this, this.form, this.$route.query);
      getTabelData(this.form)
        .then((res) => {
          this.tableLoading = false;
          this.page.totalCount = res.total || 0;
          res.data.forEach((val) => {
            val.mtz == true ? (val.mtz = "是") : (val.mtz = "否");
          });
          this.tableListData = res.data;
        })
        .catch(() => (this.tableLoading = false));
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }

      this.form.showSelf = true;
      this.getTableListFn();
    },

    /*********************************************************************
     *                          end
     *********************************************************************/
    // 获取选中零件号ID
    getPurchasePrjectId() {
      let purchaseProjectId = this.selectTableData.map((res) => res.id);
      return purchaseProjectId;
    },
    // 跳转批量维护
    openBatchmiantain() {
      if (this.selectTableData.length == 0) {
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU",
            "抱歉，您当前还未选择您需要批量维护产量计划的项目"
          )
        );
      }
      if (
        this.selectTableData.find(
          (i) =>
            i.partProjectType == "1000040" || i.partProjectType == "1000030"
        )
      )
        return iMessage.warn(
          this.language(
            "LK_GANGCAILEIXINGBUNENGJINGXINGCAOZUO",
            "抱歉，钢材类型不能进行操作"
          )
        );
      if (
        !this.selectTableData.every(
          (i) => i.partProjectType == this.selectTableData[0].partProjectType
        )
      ) {
        return iMessage.warn(
          this.language(
            "BAOQIANNINXUANZHEDELINGJIANCAIGXIANGMUZHONGB",
            "抱歉，您当前选择的零件采购项目类型不相同，不能一起批量维护！"
          )
        );
      }
      // if(this.selectTableData.find(i=>i.status == 14)) return iMessage.warn(this.language('LINGJIANCAIGXMYDJ','选择的零件采购项目中存在零件已冻结状态，无法为您批量维护！'))
      if (
        this.selectTableData.find((i) =>
          ["FROZEN_NOM", "NOMINATED"].includes(i.status)
        )
      )
        return iMessage.warn(
          this.language(
            "LINGJIANCAIGXMYDJ2",
            "选择的零件采购项目中存在零件已冻结、已定点状态，无法为您批量维护！"
          )
        );
      this.$router.push({
        path: "/sourceinquirypoint/sourcing/partsprocure/batchmiantain",
        query: {
          ids: this.getPurchasePrjectId(),
          businessKey: this.selectTableData[0].partProjectType,
        },
      });
    },
    openCreateParts() {
      const creatParts = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/createparts/home",
      });
      window.open(creatParts.href, "_blank");
    },
    // 通过待办数跳转
    clickMessage,
    // 获取车型项目
    getCarTypeSop() {
      getCarTypeSop().then((res) => {
        if (res.code == 200) {
          this.fromGroup.CAR_TYPE_PRO = Array.isArray(res.data)
            ? res.data.map((item) => ({
                code: item.cartypeProCode,
                id: item.id,
                name: item.cartypeProName,
              }))
            : [];

          this.$forceUpdate();
        }
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
  .topMenu {
    display: flex;
    justify-content: space-between;
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
  }
}
</style>
