<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2022-12-05 20:36:54
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 零件签收列表界面.
 * @FilePath: \front-sourcing\src\views\partsign\home\index.vue
-->
<template>
  <iPage class="partsignHome">
      <headerNav />
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
      <iSearch
        class="margin-bottom7"
        @sure="sure"
        @reset="reset"
        :resetKey="PARTSIGN_RESETBUTTON"
        :searchKey="PARTSIGN_CONFIRMBUTTON"
      >
        <el-form>
          <el-form-item
            :label="language('partsignLanguage.LingJianHao', '零件号')"
            v-permission.auto="PARTSIGN_PARTNUM | 零件号"
          >
            <!-- <iInput
                  clearable
                  v-model="form.partNum"
                  :placeholder="language('LK_QINGSHURULINGJIANHAO','请输入零件号')"
                ></iInput> -->
            <iMultiLineInput
              v-model="form.partNum"
              :title="language('partsignLanguage.LingJianHao', '零件号')"
            />
          </el-form-item>
          <el-form-item
            :label="
              language('partsignLanguage.LingJianMingChengZH', '零件名称（中）')
            "
            v-permission.auto="PARTSIGN_PARTNAMEZH | 零件名中"
          >
            <iInput
              clearable
              v-model="form.partNameZh"
              :placeholder="
                language('LK_QINGSHURULINGJIANMING', '请输入零件名（中）')
              "
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="language('partsignLanguage.SheJiKeShi', '设计科室')"
            v-permission.auto="PARTSIGN_DESIGNDEPARTMENT | 设计科室"
          >
            <iInput
              clearable
              v-model="form.dept"
              :placeholder="
                language('LK_QINGTIANXIESHEJIKESHI', '请填写设计科室')
              "
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="language('LK_GONGCHENGSHI', '工程师')"
            v-permission.auto="PARTSIGN_ENGINEER | 工程师"
          >
            <iInput
              clearable
              :placeholder="
                language('LK_QINGTIANXIEGONGCHENGSHI', '请填写工程师')
              "
              v-model="form.tpPrincepalName"
            ></iInput>
          </el-form-item>
          <!-- <el-form-item :label="language('LK_XUNJIACAIGOUYUAN','询价采购员')" v-permission.auto="PARTSIGN_INQUIRYPURCHASER|询价采购员">
                <iSelect multiple v-model="form.userId" :placeholder="language('LK_QINGXUANZHEXUNJIACAIGOUYUAN','请选择询价采购员')" value-key="id">
                  <el-option 
                  v-for="(items,index) in inquiryBuyerList" 
                  :key='index' 
                  :value='items.id' 
                  :label="items.nameZh"/>
                </iSelect>
                <iInput
                  :placeholder="language('LK_QINGTIANXIEXUNJIACAIGOUYUAN','请填写询价采购员')"
                  v-model="form.tpPrincepalName"
                ></iInput>
              </el-form-item> -->
          <el-form-item
            :label="language('LK_CHEXINGXIANGMU', '车型项目')"
            v-permission.auto="PARTSIGN_MODELPROJECT | 车型项目"
          >
            <iSelect
              clearable
              v-model="form.carTypeProjectId"
              :placeholder="
                language('LK_QINGXUANZHECHEXINGXIANGMU', '请选择车型项目')
              "
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="items.id"
                :label="items.name"
                v-for="(items, index) in fromGroup['CAR_TYPE_PRO'] || []"
                :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_XINXIDANFENLEI', '信息单分类')"
            v-permission.auto="PARTSIGN_INFORMATIONCLASSIFICATION | 信息单分类"
          >
            <iSelect
              clearable
              v-model="form.tpInfoType"
              :placeholder="
                language('LK_QINGXUANZHEXINXIFENLEI', '请选择信息分类')
              "
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="items.code"
                :label="items.name"
                v-for="(items, index) in fromGroup['TP_INFO_TYPE'] || []"
                :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_XINXIDANZHUANGTAI', '信息单状态')"
            v-permission.auto="PARTSIGN_INFORMATIONSTATUS | 信息单状态"
          >
            <iSelect
              clearable
              v-model="form.status"
              multiple
              collapse-tags
              :placeholder="
                language('LK_QINGXUANZHEXINXIDANZHUANGTAI', '请选择信息单状态')
              "
              @change="handleChangeByStatus"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="items.code"
                :label="items.name"
                v-for="(items, index) in fromGroup['TP_INFO_STATUS'] || []"
                :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <!-- <el-form-item :label="language('LK_XINXIDANLIUSHUIHAO','信息单流水号')">
                <iInput
                  v-model="form.tpId"
                  :placeholder="language('LK_QINGTIANXIEXINXIDANLIUSHUIHAO','请填写信息单流水号')"
                  v-permission="PARTSIGN_PARTINFOID"
                ></iInput>
              </el-form-item> -->
          <el-form-item
            :label="language('LK_XUNJIAZILIAOZHUANGTAI', '询价资料状态')"
            v-permission.auto="PARTSIGN_INQUIRYSTATUS | 询价资料状态"
          >
            <iSelect
              clearable
              v-model="form.attachmentStatus"
              :placeholder="
                language(
                  'LK_QINGXUANZHEXUNJIAZILIAOZHUANGTAI',
                  '请选择询价资料状态'
                )
              "
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="items.code"
                :label="items.name"
                v-for="(items, index) in fromGroup['TP_ATTACHEMENT_STATUS'] ||
                []"
                :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_MEICHEYONGLIANGZHUANGTAI', '每车用量状态')"
            v-permission.auto="PARTSIGN_USAGEVEHICLE | 每车用量状态"
          >
            <iSelect
              clearable
              v-model="form.partDosageStatus"
              :placeholder="
                language(
                  'LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI',
                  '请选择每车用量状态'
                )
              "
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="items.code"
                :label="items.name"
                v-for="(items, index) in fromGroup['TP_CAR_DOSAGE_STATUS'] ||
                []"
                :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_XIANSHIZIJI', '显示自己')"
            v-permission.auto="PARTSIGN_XIANSHIZIJI | 显示自己"
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
          <!--<span class="font18 font-weight">新件信息单签收</span>-->
          <span class="font18 font-weight">{{
            language("LK_XINJIANXINXIDANQIANSHOU", "新件信息单签收")
          }}</span>
          <div class="floatright">
            <iButton
              @click="save"
              v-permission.auto="PARTSIGN_SIGNBUTTON | 签收"
              >{{ language("partsignLanguage.QianShou", "签收") }}</iButton
            >
            <iButton
              @click="openDiologBack"
              v-permission.auto="PARTSIGN_BACKBUTTON | 退回"
              >{{ language("partsignLanguage.TuiHui", "退回") }}</iButton
            >
            <iButton
              @click="openDiologChangeItems"
              v-permission.auto="PARTSIGN_TRANSFERBUTTON | 转派"
              >{{ language("partsignLanguage.ZhuanPai", "转派") }}</iButton
            >
            <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
          </div>
        </div>
        <tablelist
          permissionKey="PARTSIGN_HOME"
          max-height="570px"
          ref="tableList"
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          @openPage="openPage"
          :activeItems="'partNum'"
          v-permission.auto="PARTSIGN_TABLE | 表格"
        >
          <template #status="scope">
            <el-popover
              placement="top"
              trigger="hover"
              :disabled="
                !(
                  scope.row.status === '未完整' &&
                  Array.isArray(scope.row.incompleteMsg) &&
                  scope.row.incompleteMsg.length
                )
              "
            >
              <p
                slot="reference"
                :class="{ incomplete: scope.row.status === '未完整' }"
                style="cursor: pointer"
              >
                {{ scope.row.status
                }}<icon
                  v-if="scope.row.status === '未完整'"
                  class="tips"
                  name="iconzhongyaoxinxitishi"
                />
              </p>
              <div>
                <p
                  v-for="(msg, $index) in scope.row.incompleteMsg"
                  :key="$index"
                >
                  {{ msg }}
                </p>
              </div>
            </el-popover>
          </template>
        </tablelist>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
      </iCard>
      <!------------------------------------------------------------------------>
      <!--                  转派弹出框                                        --->
      <!------------------------------------------------------------------------>
      <changeItems
        v-model="diologChangeItems"
        @sure="sureChangeItems"
      ></changeItems>
      <!------------------------------------------------------------------------>
      <!--                  退回弹出框                                         --->
      <!------------------------------------------------------------------------>
      <backItems v-model="diologBack" @sure="sureBackmark"></backItems>
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
  icon,
  iMultiLineInput,
} from "rise";
// import tablelist from "./components/tableList";
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import {
  tableTitle,
  form,
  needTranslate,
  clickMessage,
} from "./components/data";
import { getTabelData, patchRecords } from "@/api/partsign/home";
import { purchaseUsers,getListByRoleCode } from "@/api/usercenter";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "./components/backItems";
import changeItems from "./components/changeItems";
import local from "@/utils/localstorage";
import filters from "@/utils/filters";
import { iNavMvp, iMessageBox } from "rise";
import { cloneDeep } from "lodash";
import { selectDictByKeyss } from "@/api/dictionary";
import store from "@/store";
import { TP_INFO_STATUS } from "./components/data";
import { setPretreatmentParams } from "@/utils/tool";
import headerNav from "@/components/headerNav";
import buttonTableSetting from "@/components/buttonTableSetting";
import { getCarTypeSop } from "@/api/partsprocure/editordetail";
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing");

export default {
  components: {
    iPage,
    tablelist,
    iButton,
    iCard,
    backItems,
    changeItems,
    iNavMvp,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    icon,
    iMultiLineInput,
    headerNav,
    buttonTableSetting,
  },
  mixins: [pageMixins, filters, tableSortMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologChangeItems: false,
      diologBack: false,
      backmark: "",
      inquiryBuyer: "",
      inquiryBuyerList: [],
      form: cloneDeep(form),
      fromGroup: {},
      tab: "source",
      needTranslate,
    };
  },
  created() {
    Object.keys(this.$route.query).forEach((key) => {
      this.$set(this.form, key, this.$route.query[key]);
    });

    this.getSelectOptions();
    this.getCarTypeSop();
    this.getTableList();
    this.getInquiryBuyerListFn();
    this.updateNavList;
  },
  provide() {
    return {
      vm: this,
    };
  },
  computed: {
    ...mapState(["navList"]),
    ...mapActions(["updateNavList"]),
  },
  methods: {
    //获取询价采购员数据。
    getInquiryBuyerListFn() {
      getListByRoleCode('QQCGY').then((res) => {
      // purchaseUsers({ roleCode: "QQCGY" }).then((res) => {
        let userInfoId = store.state.permission.userInfo.id;
        this.inquiryBuyerList = res.data || [];
        let data = this.inquiryBuyerList;
        data.forEach((val) => {
          if (val.id === userInfoId) {
            this.form.userId = userInfoId;
          }
        });
      });
    },
    //在跳转到详情界面之前，需要将数据格式化为中文。
    translateDataForDetail(v) {
      this.needTranslate.forEach((element) => {
        if (v[element.name]) {
          try {
            const options = element.option
              ? this.fromGroup[element.option] || []
              : [];
            const result = options.find((i) => i.code === v[element.name]);
            v[element.name] = result ? result.name : "";
          } catch (error) {
            v[element.name] = "";
          }
        }
      });
      return v;
    },
    translateDataToservice(data) {
      const idList = [];
      data.forEach((items) => idList.push(items.tpPartID));
      return idList;
    },
    //签收退回
    patchRecords(type, dataList) {
      patchRecords({
        signTpInfoGroup: {
          isCSFAccepted: type,
          tpIds: this.translateDataToservice(dataList),
          csFReceiveMemo: this.backmark,
        },
      }).then((res) => {
        if (res.code == 200) {
          iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
          this.getTableList();
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    //转派
    patchRecordsForTranslate(id, dataList) {
      patchRecords({
        transferTpInfoGroup: {
          tpIds: this.translateDataToservice(dataList),
          userId: id,
        },
      }).then((res) => {
        if (res.code == "200") {
          iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
          this.getTableList();
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    //查询重置
    sure() {
      this.page.currPage = 1;
      this.getTableList();
    },
    reset() {
      this.page.currPage = 1;
      for (let i in this.form) {
        if (i !== "userId") {
          this.form[i] = "";

          if (i === "status") {
            this.$set(this.form, "status", ["NOTACCEPTED", "NOT_COMPLETE"]);
          }
        }
      }

      this.form.showSelf = true;
      this.getTableList();
    },
    getSelectOptions() {
      const types = [
        "TP_INFO_STATUS",
        "TP_INFO_TYPE",
        "TP_ATTACHEMENT_STATUS",
        "TP_CAR_DOSAGE_STATUS",
      ];
      selectDictByKeyss(types).then((res) => {
        this.fromGroup = res.data;
      });
    },

    // 获取车型项目
    getCarTypeSop() {
      getCarTypeSop().then((res) => {
        if (res.code === "200") {
          this.$set(
            this.fromGroup,
            "CAR_TYPE_PRO",
            Array.isArray(res.data)
              ? res.data.map((item) => ({
                  id: item.id,
                  code: item.cartypeProCode,
                  name: item.cartypeProName,
                  value: item.cartypeProName,
                }))
              : []
          );
        }
      });
    },
    openPage(val) {
      // local.set(
      //   "tpPartInfoVO",
      //   JSON.stringify(this.translateDataForDetail(val))
      // );

      const routeData = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsign/editordetail",
        query: {
          tpPartID: val.tpPartID,
        },
      });
      window.open(routeData.href, "_blank");
    },
    translateDataToRender(data) {
      let newMap = [];
      data.forEach((element) => {
        newMap.push({
          ...element.tpPartInfoVO,
          ...{
            partAttachmentList: element.partAttachmentList,
          },
          ...{
            partPerCaVerList: element.partPerCaVerList,
          },
        });
      });
      return newMap;
    },
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      // 用户寻源概览的参数
      // 获取寻源概览过来的预置参数
      setPretreatmentParams(this, this.form, this.$route.query);
      const params = {
        ...this.form,
        ...this.page,
        status: this.form.status
          ? this.form.status[0] === ""
            ? []
            : this.form.status
          : [],
      };
      getTabelData(params)
        .then((res) => {
          this.tableLoading = false;
          this.page.currPage = res.data.tpRecordsSenarioResult.currPage;
          this.page.pageSize = res.data.tpRecordsSenarioResult.pageSize;
          this.page.totalCount = res.data.tpRecordsSenarioResult.totalCount;
          this.tableListData = this.translateDataToRender(
            res.data.tpRecordsSenarioResult.tpRecordList
          );
        })
        .catch((err) => {
          this.tableLoading = false;
          this.tableListData = [];
        });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    //签收
    save() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOQIANSHOUDEXINXIDAN",
            "抱歉，您当前还未选择您需要签收的信息单！"
          )
        );
      if (this.selectTableData.find((items) => items.status == 1))
        return iMessage.warn(
          this.language(
            "LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU",
            "抱歉，您选中的单据中存在已签收的信息单，不能批量签收！"
          )
        );
      iMessageBox(
        this.language(
          "LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU",
          "您是否确认对新件信息单进行签收？"
        ), // 暂时处理
        this.language("LK_WENXINTISHI", "温馨提示"),
        {
          confirmButtonText: this.language("LK_QUEDING", "确定"),
          cancelButtonText: this.language("LK_QUXIAO", "取 消"),
        }
      ).then((res) => {
        this.patchRecords(TP_INFO_STATUS.ACCEPTED, this.selectTableData); // 签收
      });
    },
    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOTUIHUIDEXINXIDAN",
            "抱歉，您当前还未选择您需要退回的信息单！"
          )
        );
      if (this.selectTableData.find((items) => items.status == 1))
        return iMessage.warn(
          this.language(
            "LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU",
            "抱歉，您选中的单据中存在已签收的信息单，不能批量签收！"
          )
        );
      this.diologBack = true;
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEXINXIDAN",
            "抱歉，您当前还未选择您需要转派的信息单！"
          )
        );
      this.diologChangeItems = true;
    },
    //退回
    sureBackmark(val) {
      this.backmark = val;
      this.patchRecords(TP_INFO_STATUS.REFUSED, this.selectTableData); // 退回
      this.diologBack = false;
    },
    //转派
    sureChangeItems(val) {
      this.patchRecordsForTranslate(val.id, this.selectTableData);
      this.diologChangeItems = false;
    },
    // 通过待办数跳转
    clickMessage,
    handleChangeByStatus(val) {
      if (Array.isArray(val)) {
        if (val.length) {
          const filterItems = val.filter((item) => item !== "");
          this.$set(
            this.form,
            "status",
            filterItems.length
              ? val[val.length - 1] === ""
                ? [""]
                : filterItems
              : [""]
          );
        } else {
          this.$set(this.form, "status", [""]);
        }
      } else {
        this.$set(this.form, "status", [""]);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.form = cloneDeep(form);

    Object.keys(to.query).forEach((key) => {
      this.$set(this.form, key, to.query[key]);
    });

    this.getTableList();
    next();
  },
};
</script>
<style lang="scss" scoped>
.partsignHome {
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

  .incomplete {
    color: #ff8b00;
  }

  .tips {
    font-size: 12px;
    margin-left: 4px;
  }
}
</style>
