<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-03-24 14:48:51
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage>
    <div class="margin-bottom20">
      <iNav-mvp
        @change="change"
        right
        v-permission="PERMISSION_TEST"
      ></iNav-mvp>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" @sure="sure" @reset="reset" :resetKey="PARTSIGN_RESETBUTTON" :searchKey:"PARTSIGN_CONFIRMBUTTON">
      <el-form>
        <el-form-item label="零件号" >
          <iInput v-model="form.partNum" placeholder="请输入零件号" v-permission="PARTSIGN_PARTNUM"></iInput>
        </el-form-item>
        <el-form-item label="零件名（中）">
          <iInput
            v-model="form.partNameZh"
            placeholder="请输入零件名（中）" v-permission="PARTSIGN_PARTNAMEZH"
          ></iInput>
        </el-form-item>
        <el-form-item label="设计科室">
          <iInput v-model="form.dept" placeholder="请填写设计科室" v-permission="PARTSIGN_DESIGNDEPARTMENT"></iInput>
        </el-form-item>
        <el-form-item label="工程师">
          <iInput placeholder="请填写工程师" v-permission="PARTSIGN_ENGINEER"></iInput>
        </el-form-item>
        <el-form-item label="车型项目">
          <iSelect v-model="form.projectCarType" placeholder="请选择车型项目" v-permission="PARTSIGN_MODELPROJECT">
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in getGroupList('project_car_type')"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="信息单分类">
          <iSelect v-model="form.tpInfoType" placeholder="请选择信息分类" v-permission="PARTSIGN_INFORMATIONCLASSIFICATION">
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in getGroupList('tp_info_type')"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="信息单状态">
          <iSelect v-model="form.status" placeholder="请选择信息单状态" v-permission="PARTSIGN_INFORMATIONSTATUS">
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in getGroupList('status')"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="信息单流水号">
          <iInput v-model="form.id" placeholder="请填写信息单流水号" v-permission="PARTSIGN_PARTINFOID"></iInput>
        </el-form-item>
        <el-form-item label="询价资料状态">
          <iSelect
            v-model="form.attachmentStatus"
            placeholder="请选择询价资料状态" v-permission="PARTSIGN_INQUIRYSTATUS"
          >
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in getGroupList('attachment_status')"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="每车用量状态">
          <iSelect
            v-model="form.partDosageStatus"
            placeholder="请选择没车用量状态" v-permission="PARTSIGN_USAGEVEHICLE"
          >
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
        <span class="font18 font-weight">新件信息单签收</span>
        <div class="floatright">
          <iButton @click="save" v-permission="PARTSIGN_SIGNBUTTON">签收</iButton>
          <iButton @click="openDiologBack" v-permission="PARTSIGN_BACKBUTTON">退回</iButton>
          <iButton @click="openDiologChangeItems" v-permission="PARTSIGN_TRANSFERBUTTON">转派</iButton>
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
} from "@/components";
import tablelist from "./components/tableList";
import { tableTitle, form } from "./components/data";
import { getTabelData, getPageGroup, patchRecords } from "@/api/partsign/home";
import { pageMixins } from "@/utils/pageMixins";
import backItems from "./components/backItems";
import changeItems from "./components/changeItems";
import { iNavMvp } from "@/components";
import local from "@/utils/localstorage";
import { iMessageBox } from "../../../components";
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
  mixins: [pageMixins],
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
      form: form,
      fromGroup: [],
    };
  },
  created() {
    this.getPageGroup();
    this.getTableList();
  },
  methods: {
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
        if (res.data) {
          iMessage.success("操作成功");
          this.getTableList();
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
        if (res.data) {
          iMessage.success("操作成功");
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
      local.set("tpPartInfoVO", JSON.stringify(val));
      this.$router.push({
        path: "/partsign/editordetail",
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
        return iMessage.warn("抱歉，您当前还未选择您需要签收的信息单！");
      if (this.selectTableData.find((items) => items.status == 1))
        return iMessage.warn(
          "抱歉，您选中的单据中存在已签收的信息单，不能批量签收！"
        );
      iMessageBox("您是否确认对新件信息单进行签收？").then((res) => {
        this.patchRecords(1, this.selectTableData);
      });
    },
    //退回
    openDiologBack() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要退回的信息单！");
      if (this.selectTableData.find((items) => items.status == 1))
        return iMessage.warn(
          "抱歉，您选中的单据中存在已签收的信息单，不能批量签收！"
        );
      this.diologBack = true;
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要转派的信息单！");
      this.diologChangeItems = true;
    },
    //退回
    sureBackmark(val) {
      this.backmark = val;
      this.patchRecords(0, this.selectTableData);
      this.diologBack = false;
    },
    //转派
    sureChangeItems(val) {
      this.patchRecordsForTranslate(val, this.selectTableData);
      this.diologChangeItems = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
