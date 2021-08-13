<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-08-13 15:18:57
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage class="partsignHome" v-permission="PARTSIGN_INDEXPAGE">
    <!-- <el-tabs v-model="tab" class="tab"> -->
      <!-- <el-tab-pane lazy :label="language('LK_XUNYUANZHIHANG','寻源')" name="source"> -->
      <!-- <el-tab-pane lazy  name="source"> -->
        <div>
          <!-- <div class="margin-bottom33">

            <iNavMvp @change="change" lang right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div> -->
          <div class="topMenu">
            <iNavMvp class="margin-bottom30" :list="list" lang @change="change" :lev="1" routerPage></iNavMvp>
            <iNavMvp class="margin-bottom30" lang @change="change"  right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div>
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <iSearch
            class="margin-bottom20"
            @sure="sure"
            @reset="reset"
            :resetKey="PARTSIGN_RESETBUTTON"
            :searchKey="PARTSIGN_CONFIRMBUTTON"
          >
            <el-form>
              <el-form-item :label="language('partsignLanguage.LingJianHao','零件号')">
                <iInput
                  v-model="form.partNum"
                  :placeholder="language('LK_QINGSHURULINGJIANHAO','请输入零件号')"
                  v-permission="PARTSIGN_PARTNUM"
                ></iInput>
              </el-form-item>
              <el-form-item :label="language('partsignLanguage.LingJianMingChengZH','零件名称（中）')">
                <iInput
                  v-model="form.partNameZh"
                  :placeholder="language('LK_QINGSHURULINGJIANMING','请输入零件名（中）')"
                  v-permission="PARTSIGN_PARTNAMEZH"
                ></iInput>
              </el-form-item>
              <el-form-item :label="language('partsignLanguage.SheJiKeShi','设计科室')">
                <iInput
                  v-model="form.dept"
                  :placeholder="language('LK_QINGTIANXIESHEJIKESHI','请填写设计科室')"
                  v-permission="PARTSIGN_DESIGNDEPARTMENT"
                ></iInput>
              </el-form-item>
              <el-form-item :label="language('LK_GONGCHENGSHI','工程师')">
                <iInput
                  :placeholder="language('LK_QINGTIANXIEGONGCHENGSHI','请填写工程师')"
                  v-model="form.tpPrincepalName"
                  v-permission="PARTSIGN_ENGINEER"
                ></iInput>
              </el-form-item>
              <el-form-item :label="language('LK_CHEXINGXIANGMU','车型项目')">
                <iSelect
                  v-model="form.projectCarType"
                  :placeholder="language('LK_QINGXUANZHECHEXINGXIANGMU','请选择车型项目')"
                  v-permission="PARTSIGN_MODELPROJECT"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="items.key"
                    :label="items.value"
                    v-for="(items, index) in getGroupList('project_car_type')"
                    :key="index"
                  ></el-option>
                </iSelect>
              </el-form-item>
              <el-form-item :label="language('LK_XINXIDANFENLEI','信息单分类')">
                <iSelect
                  v-model="form.tpInfoType"
                  :placeholder="language('LK_QINGXUANZHEXINXIFENLEI','请选择信息分类')"
                  v-permission="PARTSIGN_INFORMATIONCLASSIFICATION"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="items.key"
                    :label="items.value"
                    v-for="(items, index) in getGroupList('tp_info_type')"
                    :key="index"
                  ></el-option>
                </iSelect>
              </el-form-item>
              <el-form-item :label="language('LK_XINXIDANZHUANGTAI','信息单状态')">
                <iSelect
                  v-model="form.status"
                  :placeholder="language('LK_QINGXUANZHEXINXIDANZHUANGTAI','请选择信息单状态')"
                  v-permission="PARTSIGN_INFORMATIONSTATUS"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="items.key"
                    :label="items.value"
                    v-for="(items, index) in getGroupList('status')"
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
              <el-form-item :label="language('LK_XUNJIAZILIAOZHUANGTAI','询价资料状态')">
                <iSelect
                  v-model="form.attachmentStatus"
                  :placeholder="language('LK_QINGXUANZHEXUNJIAZILIAOZHUANGTAI','请选择询价资料状态')"
                  v-permission="PARTSIGN_INQUIRYSTATUS"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="items.key"
                    :label="items.value"
                    v-for="(items, index) in getGroupList('attachment_status')"
                    :key="index"
                  ></el-option>
                </iSelect>
              </el-form-item>
              <el-form-item :label="language('LK_MEICHEYONGLIANGZHUANGTAI','每车用量状态')">
                <iSelect
                  v-model="form.partDosageStatus"
                  :placeholder="language('LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI','请选择每车用量状态')"
                  v-permission="PARTSIGN_USAGEVEHICLE"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="items.key"
                    :label="items.value"
                    v-for="(items, index) in getGroupList('part_dosage_status')"
                    :key="index"
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
                language("LK_XINJIANXINXIDANQIANSHOU",'新件信息单签收')
              }}</span>
              <div class="floatright">
                <iButton @click="save" v-permission="PARTSIGN_SIGNBUTTON">{{
                  language("partsignLanguage.QianShou",'签收')
                }}</iButton>
                <iButton
                  @click="openDiologBack"
                  v-permission="PARTSIGN_BACKBUTTON"
                  >{{ language("partsignLanguage.TuiHui",'退回') }}</iButton
                >
                <iButton
                  @click="openDiologChangeItems"
                  v-permission="PARTSIGN_TRANSFERBUTTON"
                  >{{ language("partsignLanguage.ZhuanPai",'转派') }}</iButton
                >
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
        </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane lazy label="进度监控" name="progress"></el-tab-pane> -->
    <!-- </el-tabs> -->
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
} from 'rise';
import tablelist from "./components/tableList";
import { tableTitle, form, needTranslate, clickMessage, TAB} from "./components/data";
import { getTabelData, getPageGroup, patchRecords } from "@/api/partsign/home";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "./components/backItems";
import changeItems from "./components/changeItems";
import local from "@/utils/localstorage";
import filters from "@/utils/filters";
import { iNavMvp,iMessageBox } from "rise";
import { cloneDeep } from "lodash"

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

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
  },
  mixins: [pageMixins, filters],
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
      fromGroup: [],
      tab: "source",
      needTranslate: needTranslate,
      list:TAB,
    };
  },
  created() {
    Object.keys(this.$route.query).forEach(key => {
      this.$set(this.form, key, this.$route.query[key])
    })

    this.getPageGroup();
    this.getTableList();
    this.updateNavList
  },
  provide() {
    return {
      vm: this,
    };
  },
  computed: {
    ...mapState(["navList"]),
    ...mapActions(["updateNavList"])
  },
  methods: {
    //在跳转到详情界面之前，需要将数据格式化为中文。
    translateDataForDetail(v) {
      this.needTranslate.forEach((element) => {
        if (v[element.name]) {
          try {
            const result = this.getGroupList(element.key).find(
              (i) => i.key == v[element.name]
            );
            v[element.name] = result ? result.value : "";
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
          iMessage.success(this.language("LK_CAOZUOCHENGGONG",'操作成功'));
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
        if (res.code == '200') {
          iMessage.success(this.language("LK_CAOZUOCHENGGONG",'操作成功'));
          this.getTableList();
        }
      });
    },
    //查询重置
    sure() {
      this.getTableList();
    },
    reset() {
      for (let i in this.form) {
        if (i !== "userId") {
          this.form[i] = "";
        }
      }
      this.getTableList();
    },
    getGroupList(key) {
      if (this.fromGroup.length > 0) {
        let obj = this.fromGroup.find((items) => items.name == key);
        if (!obj) return [];
        return obj.infoList;
      }
    },
    openPage(val) {
      local.set(
        "tpPartInfoVO",
        JSON.stringify(this.translateDataForDetail(val))
      );
      this.$router.push({
        path: "/sourcing/partsign/editordetail",
      });
    },
    //获取上方group信息
    getPageGroup() {
      getPageGroup(this.form.userId).then((res) => {
        this.fromGroup = res.data.groupStatSenarioResult.groupStatInfoList;
      });
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
      getTabelData({
        ...this.form,
        ...this.page,
      })
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
          this.language("LK_NINDANGQIANHAIWEIXUANZENINXUYAOQIANSHOUDEXINXIDAN",'抱歉，您当前还未选择您需要签收的信息单！')
        );
      if (this.selectTableData.find((items) => items.status == 1))
        return iMessage.warn(
          this.language(
            "LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU",
            '抱歉，您选中的单据中存在已签收的信息单，不能批量签收！'
          )
        );
      iMessageBox(
        this.language("LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU",'您是否确认对新件信息单进行签收？'), // 暂时处理
        this.language("LK_WENXINTISHI",'温馨提示'),
        {
          confirmButtonText: this.language("LK_QUEDING",'确定'),
          cancelButtonText: this.language("LK_QUXIAO",'取 消'),
        }
      ).then((res) => {
        this.patchRecords(2, this.selectTableData);
      });
    },
    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language("LK_NINDANGQIANHAIWEIXUANZENINXUYAOTUIHUIDEXINXIDAN",'抱歉，您当前还未选择您需要退回的信息单！')
        );
      if (this.selectTableData.find((items) => items.status == 1))
        return iMessage.warn(
          this.language(
            "LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU",
            '抱歉，您选中的单据中存在已签收的信息单，不能批量签收！'
          )
        );
      this.diologBack = true;
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language("LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEXINXIDAN",'抱歉，您当前还未选择您需要转派的信息单！')
        );
      this.diologChangeItems = true;
    },
    //退回
    sureBackmark(val) {
      this.backmark = val;
      this.patchRecords(3, this.selectTableData);
      this.diologBack = false;
    },
    //转派
    sureChangeItems(val) {
      this.patchRecordsForTranslate(val.id, this.selectTableData);
      this.diologChangeItems = false;
    },
    // 通过待办数跳转
    clickMessage,
  },
  beforeRouteUpdate(to, from, next) {
    this.form = cloneDeep(form)

    Object.keys(to.query).forEach(key => {
      this.$set(this.form, key, to.query[key])
    })

    this.getTableList()
    next()
  }
};
</script>
<style lang="scss" scoped>
.partsignHome {
  position: relative;
  .topMenu{
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
