<!--
 * @Author: youyuan
 * @Date: 2021-08-04 19:51:49
 * @LastEditTime: 2021-08-14 10:10:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\index.vue
-->
<template>
  <div class="mainBox">
    <iSearch @reset="handleSearchReset" @sure="handleSearch" :icon="false">
      <el-form label-position="top">
        <el-row class="margin-bottom20">
          <!--材料组-->
          <el-form-item :label="$t('LK_CAILIAOZU')">
            <iInput
              :placeholder="$t('TPZS.QSRCLZBHMC')"
              v-model="form.group"
            ></iInput>
          </el-form-item>
          <!--零件号-->
          <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
            <iInput
              :placeholder="$t('LK_QINGSHURULINGJIANHAO')"
              v-model="form.num"
            ></iInput>
          </el-form-item>
          <!--RFQ号-->
          <el-form-item :label="$t('TPZS.RFQHMC')">
            <iInput
              v-model="form.rfq"
              :disabled="rfqStatus"
              :placeholder="$t('TPZS.QSRRFQH')"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('TPZS.CJR')">
            <iInput
              :placeholder="$t('TPZS.QINGSHURUCHUANGJIANRENMINGCHENG')"
              v-model="form.owner"
            />
          </el-form-item>
        </el-row>
      </el-form>
    </iSearch>
    <iCard
      :title="language('PIFENXIKU', 'Price Index分析库')"
      class="margin-top20"
    >
      <template v-slot:header-control>
        <div v-if="!edit">
          <iButton @click="clickRawMaterial">{{
            language("YUANCAILIAOJIAGEZONGLAN", "原材料价格总览")
          }}</iButton>
          <iButton @click="clickEdit">{{ $t("LK_BIANJI") }}</iButton>
          <iButton @click="clickAdd">{{ $t("TPZS.LK_CREATE") }}</iButton>
          <iButton @click="clickDel">{{ $t("delete") }}</iButton>
        </div>
        <div v-else>
          <iButton @click="cancelEdit">{{ $t("LK_QUXIAO") }}</iButton>
          <iButton @click="saveEdit">{{ $t("LK_BAOCUN") }}</iButton>
        </div>
      </template>
      <el-table
        tooltip-effect="light"
        ref="multipleTable"
        :data="tableListData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :max-height="450"
        :row-class-name="rowStyle"
        :tree-props="{ children: 'children' }"
        @selection-change="handleSelectionChange"
        @select="rowSelect"
        @select-all="selectAll"
      >
        <el-table-column
          align="center"
          header-align="center"
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="#"
          type="index"
          :index="indexMethod"
          align="center"
          header-align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          :label="$t('TPZS.FXMC')"
          width="450"
        >
          <template slot-scope="scope">
            <div class="openPage">
              <el-row :gutter="20">
                <el-col :span="20" style="textalgin: center">
                  <el-tooltip
                    v-if="!edit"
                    :content="scope.row.name"
                    placement="top"
                    effect="light"
                  >
                    <p
                      v-if="!edit"
                      class="ellipsis"
                      @click="clickName(scope.row)"
                    >
                      {{ scope.row.name }}
                    </p>
                  </el-tooltip>
                  <iInput
                    v-else
                    class="nameInput"
                    v-model="scope.row.name"
                  ></iInput>
                </el-col>
                <el-col :span="4">
                  <span v-if="scope.row.fileType == $t('TPZS.SCHEME_TYPE')">
                    <span class="number">
                      <p>{{ scope.row.reportList.length }}</p>
                    </span>
                    <icon
                      class="numberIcon"
                      style="
                         {
                          font-size: 24px;
                        }
                      "
                      symbol
                      name="iconwenjianshuliangbeijing"
                    ></icon>
                  </span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('LK_CAILIAOZU')"
          prop="materialGroup"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('RFQ')"
          prop="rfqNo"
          width="100"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('TPZS.MRX')"
          align="center"
          header-align="center"
          width="80"
        >
          <template slot-scope="scope">
            <div v-if="!edit">
              {{ defaultStatus(scope.row, scope.row.isDefault) }}
            </div>
            <div
              v-else-if="
                edit &&
                scope.row.fileType == $t('TPZS.SCHEME_TYPE') &&
                scope.row.isDefault != '空' &&
                scope.row.isDefault
              "
            >
              <iSelect
                :value="defaultStatus(scope.row, scope.row.isDefault)"
                @change="changeDefault($event, scope.row)"
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in defaultData"
                  :key="index"
                ></el-option>
              </iSelect>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('TPZS.WJLX')"
          prop="fileType"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('TPZS.CJR')"
          prop="createNameZh"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('LK_CHUANGJIANRIQI')"
          prop="createDate"
          show-overflow-tooltip
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('TPZS.SCXGRQ')"
          prop="updateDate"
          show-overflow-tooltip
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column width="50" align="center" header-align="center">
          <template slot-scope="scope">
            <div @click="handleStick(scope.row)" class="stickIcon">
              <icon
                v-if="
                  scope.row.fileType === $t('TPZS.SCHEME_TYPE') &&
                  scope.row.isTop
                "
                name="iconliebiaoyizhiding"
                class="iconliebiaoyizhiding"
                symbol
              />
              <icon
                v-else-if="
                  scope.row.fileType === $t('TPZS.SCHEME_TYPE') &&
                  !scope.row.isTop
                "
                name="iconliebiaoweizhiding"
                class="iconliebiaoweizhiding"
                symbol
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
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

      <reportPreview
        :visible="reportVisible"
        :reportUrl="reportUrl"
        :title="reportTitle"
        :key="reportKey"
        @handleCloseReport="handleCloseReport"
      />
      <addScheme
        :key="addPiParams.key"
        v-model="addPiParams.visible"
      />
    </iCard>
  </div>
</template>

<script>
import {
  iCard,
  iInput,
  iSearch,
  iButton,
  iPagination,
  iSelect,
  icon,
  iMessage,
} from "rise";
import {
  getBobAnalysisDataList,
  fetchStaick,
  fetchEdit,
  fetchDel,
} from "@/api/partsrfq/bob/analysisList";
import { pageMixins } from "@/utils/pageMixins";
import reportPreview from "@/views/partsrfq/vpAnalyse/vpAnalyseList/components/reportPreview";
import addScheme from './components/add'
import { getAnalysisList, fetchAnalysisStick, fetchAnalysisSave, fetchAnalysisDel} from '@/api/partsrfq/piAnalysis/index'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    iSearch,
    iButton,
    iPagination,
    iSelect,
    icon,
    reportPreview,
    addScheme
  },
  data() {
    return {
      form: {}, //检索条件
      edit: false, //编辑模式
      tableListData: [], //表格数据
      backUpData: [], //备份数据
      selection: [],  //选中数据
      entryStatus: this.$store.state.rfq.entryStatus, //内部进入/外部进入
      rfqStatus: false, //rfq输入框禁用/启用状态
      reportVisible: false, //报告pdf弹窗是否显示
      reportUrl: null,  //报告地址
      reportTitle: null, //报告名称
      reportKey: 0, //报告弹窗key
      defaultData: [ //默认项下拉框
        { value: "是", label: this.$t("nominationLanguage.Yes") },
        { value: "否", label: this.$t("nominationLanguage.No") },
      ],
      currentDefaultObj: null, //当前编辑对象
      updatedDefault: false, //是否已更新默认项
      rawMaterialUrl: '/sourcing/partsrfq/rawMateria', //原材料组件路由地址
      addPiParams: { //新增PI分析方案弹窗参数
        key: 0,
        visible: false
      }
    };
  },
  created() {
    this.initSearchData();
  },
  mounted() {
    this.getTableList();
  },
  computed: {
    defaultStatus() {
      return function (val, status) {
        let flag = status === "是" || status === "否" ? status : null;
        if (
          this.currentDefaultObj &&
          this.currentDefaultObj.isDefault == "是"
        ) {
          if (val.id == this.currentDefaultObj.id) flag = "是";
          else if (!flag) flag = null;
          else flag = "否";
        }
        return val.fileType == this.$t("TPZS.SCHEME_TYPE") ? flag : null;
      };
    },
  },
  methods: {
    //初始化查询数据
    initSearchData() {
      if (this.$store.state.rfq.entryStatus == 1) this.rfqStatus = true;
      this.form = {
        ...this.form,
        group: this.$store.state.rfq.materialGroup,
        num: this.$store.state.rfq.spareParts,
        owner: null,
        rfq: this.$store.state.rfq.rfqId,
      };
    },
    //表格序号函数
    indexMethod(e) {
      const rows = [];
      this.tableListData.forEach((r) => {
        rows.push(r.number);
        if (r.reportList && r.reportList !== null) {
          r.reportList.forEach((c) => {
            rows.push(c.number);
          });
        }
      });
      return rows[e];
    },
    //初始化测试数据
    initData() {
      this.tableListData = [
        {
          id: 243,
          name: "667_5K0959659-气囊传感器-FRONTSENSOR",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: "667",
          isTop: true,
          isDefault: "否",
          path: null,
          createBy: 1,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-07-28",
          updateDate: "2021-08-05",
          topDate: "2021-08-04",
          fileType: "方案",
          reportList: [
            {
              id: 26,
              name: "test11627549500570.pdf",
              materialGroup: null,
              materialGroupCode: null,
              rfqNo: null,
              isTop: null,
              isDefault: null,
              path: "https://dev-rise.obs.cloud.csvw.com:443/rise%2Ftest11627549500570.pdf",
              createBy: 1,
              createUserName: null,
              createNameZh: "超级管理员",
              createNameEn: "admin",
              createNameDe: null,
              createDate: "2021-07-29",
              updateDate: "2021-08-05",
              topDate: null,
              fileType: "报告",
              reportList: null,
            },
            {
              id: 27,
              name: "test1627549751859.pdf",
              materialGroup: null,
              materialGroupCode: null,
              rfqNo: null,
              isTop: null,
              isDefault: null,
              path: "https://dev-rise.obs.cloud.csvw.com:443/rise%2Ftest1627549751859.pdf",
              createBy: 1,
              createUserName: null,
              createNameZh: "超级管理员",
              createNameEn: "admin",
              createNameDe: null,
              createDate: "2021-07-29",
              updateDate: "2021-08-05",
              topDate: null,
              fileType: "报告",
              reportList: null,
            },
          ],
        },
        {
          id: 232,
          name: "667_5K0959659-气囊传感器-FRONTSENSOR",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: "667",
          isTop: true,
          isDefault: "否",
          path: null,
          createBy: 1,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-07-28",
          updateDate: "2021-08-05",
          topDate: "2021-08-04",
          fileType: "方案",
          reportList: [],
        },
        {
          id: 286,
          name: "667_5K0959659-气囊传感器-FRONTSENSOR",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: "667",
          isTop: false,
          isDefault: "否",
          path: null,
          createBy: 34,
          createUserName: "WS2TEST002",
          createNameZh: "孙途观",
          createNameEn: "Sun Tuguan",
          createNameDe: null,
          createDate: "2021-08-04",
          updateDate: "2021-08-05",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 282,
          name: "755_6Q5945097BD-车窗密封条24421-FENSTERSCHACHTABD11",
          materialGroup: "橡胶件 ab Mgr. 600",
          materialGroupCode: "117",
          rfqNo: "755",
          isTop: false,
          isDefault: "否",
          path: null,
          createBy: 42,
          createUserName: "WS1ETEST01",
          createNameZh: "刘发",
          createNameEn: null,
          createNameDe: null,
          createDate: "2021-08-04",
          updateDate: "2021-08-04",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 281,
          name: "754_6Q5945097BD-车窗密封条24421-FENSTERSCHACHTABD11",
          materialGroup: "橡胶件 ab Mgr. 600",
          materialGroupCode: "117",
          rfqNo: "754",
          isTop: false,
          isDefault: "否",
          path: null,
          createBy: 1,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-08-04",
          updateDate: "2021-08-04",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 277,
          name: "754_6Q5945097BD-车窗密封条24421-FENSTERSCHACHTABD11",
          materialGroup: "橡胶件 ab Mgr. 600",
          materialGroupCode: "117",
          rfqNo: "754",
          isTop: false,
          isDefault: "是",
          path: null,
          createBy: 42,
          createUserName: "WS1ETEST01",
          createNameZh: "刘发",
          createNameEn: null,
          createNameDe: null,
          createDate: "2021-08-04",
          updateDate: "2021-08-04",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 273,
          name: "505_ENT959655-气囊控制器-AIRBAG ECU",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: "505",
          isTop: false,
          isDefault: "否",
          path: null,
          createBy: 1,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-08-03",
          updateDate: "2021-08-03",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 269,
          name: "yuleTest",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: null,
          isTop: false,
          isDefault: null,
          path: null,
          createBy: 11,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-08-02",
          updateDate: "2021-08-02",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 262,
          name: "667_5K0959659-气囊传感器-FRONTSENSOR",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: "667",
          isTop: false,
          isDefault: "否",
          path: null,
          createBy: 1,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-07-30",
          updateDate: "2021-08-05",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
        {
          id: 261,
          name: "667_5K0959659-气囊传感器-FRONTSENSOR",
          materialGroup: "安全电器件",
          materialGroupCode: "030",
          rfqNo: "667",
          isTop: false,
          isDefault: "否",
          path: null,
          createBy: 1,
          createUserName: "admin",
          createNameZh: "超级管理员",
          createNameEn: "admin",
          createNameDe: null,
          createDate: "2021-07-29",
          updateDate: "2021-08-05",
          topDate: null,
          fileType: "方案",
          reportList: [],
        },
      ];
      this.tableListData = JSON.parse(this.tableListData);
    },
    //重置查询事件
    handleSearchReset() {
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.initSearchData();
      this.getTableList();
    },
    //检索事件
    handleSearch() {
      this.page.currPage = 1;
      this.page.pageSize = 10;
      this.getTableList().then((res) => {
        if (!res.data || res.data.length == 0) {
          iMessage.error(this.$t("TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR"));
        }
      });
    },
    //获取表格数据
    getTableList() {
      return new Promise((resolve) => {
        const params = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          createByName: this.form.owner ? this.form.owner : null,
          materialGroup: this.form.group ? this.form.group : null,
          spareParts: this.form.num ? this.form.num : null,
        };
        const status = this.$store.state.rfq.entryStatus;
        const rfq = this.form.rfq ? this.form.rfq : null;
        if (status == 0) {
          //外部进入
          params["rfqName"] = rfq;
        } else if (status == 1) {
          //内部进入
          params["rfqNo"] = rfq;
        }
        getBobAnalysisDataList(params).then((res) => {
          if (res && res.code == 200) {
            this.page.totalCount = res.total;
            this.tableListData = res.data;
            this.handleTableNumber(this.tableListData, 1, null);
            this.updateTableData();
            resolve(res);
          }
        });
      });
    },
    //更新表格数据
    updateTableData() {
      if (this.updatedDefault) {
        this.tableListData.map((item, index) => {
          let flag =
            item.isDefault === "是" || item.isDefault === "否"
              ? item.isDefault
              : null;
          if (
            this.currentDefaultObj &&
            this.currentDefaultObj.isDefault == "是"
          ) {
            if (item.id == this.currentDefaultObj.id) flag = "是";
            else if (!flag) flag = null;
            else flag = "否";
          }
          this.$set(this.tableListData[index], "isDefault", flag);
        });
      }
    },
    //递归处理树结构数据的序号
    handleTableNumber(data, suffix, prefix) {
      data.forEach((item) => {
        const number = prefix ? prefix + "." + suffix : suffix;
        item["number"] = number;
        if (item.reportList && item.reportList.length > 0) {
          item["children"] = item.reportList;
          this.handleTableNumber(item.reportList, 1, number);
        }
        suffix++;
      });
    },
    // 点击原材料按钮
    clickRawMaterial() {
      this.$router.push(this.rawMaterialUrl)
    },
    // 点击编辑按钮
    clickEdit() {
      this.backUpData = window._.cloneDeep(this.tableListData);
      this.edit = !this.edit;
    },
    //取消保存編輯狀態下的數據
    cancelEdit() {
      this.backUpData.map((item, index) => {
        this.$set(this.tableListData[index], "name", item.name);
        this.$set(this.tableListData[index], "isDefault", item.isDefault);
      });
      this.edit = !this.edit;
    },
    // 点击新建按钮
    clickAdd() {
      this.addPiParams = {
        ...this.addPiParams,
        key: Math.random(),
        visible: true
      }
    },
    // 点击删除按钮
    clickDel() {
      if (!this.selection || this.selection.length == 0) {
        iMessage.error(this.$t("TPZS.QXZXYCZDSJ"));
        return;
      }
      fetchDel(this.selection).then((res) => {
        if (res.code == 200) {
          iMessage.success(res.desZh);
        } else iMessage.error(res.desZh);
        this.getTableList();
      });
    },
    //编辑时，改变默认项事件
    changeDefault(val, row) {
      this.$set(row, "isDefault", val);
      this.$set(this, "currentDefaultObj", row);
      if (val == "是") this.updatedDefault = true;
      this.updateTableData();
    },
    //保存编辑
    saveEdit() {
      this.edit = false;
      const params = this.tableListData;
      fetchEdit(params).then((res) => {
        if (res) {
          if (res.code == 200) iMessage.success(res.desZh);
          else iMessage.error(res.desZh);
          this.getTableList();
        }
      });
    },
    // 选中项发生改变
    handleSelectionChange(val) {
      this.selection = val;
    },
    rowSelect(selection, row) {
      if (row.fileList) {
        //只对有子节点的行响应
        if (!row.isChecked) {
          //由行数据中的元素isChecked判断当前是否被选中
          row.fileList.map((item) => {
            //遍历所有子节点
            this.$refs.dataTable.toggleRowSelection(item, true); //切换该子节点选中状态
            /*
            方法名                    说明                                      参数
                                 用于多选表格，切换某一行的选中状态，         row, selected
            toggleRowSelection   如果使用了第二个参数，则是设置这一行
                                 选中与否（selected 为 true 则选中）
             */
            item.isChecked = true;
          });
          row.isChecked = true; //当前行isChecked标志元素切换为false
        } else {
          row.fileList.map((item) => {
            this.$refs.dataTable.toggleRowSelection(item, false);
            item.isChecked = false;
          });
          row.isChecked = false;
        }
        // console.log(this.multipleSelection, row);
      }
    },
    selectAll(selection) {
      // selection 是选中的数据集合
      this.$refs.dataTable.data.map((items) => {
        //使用$ref获取注册的子组件信息，用data获取所有行，并用map函数遍历行
        if (items.fileList) {
          if (!items.isChecked) {
            //若遍历出来的行未选中
            this.$refs.dataTable.toggleRowSelection(items, true); //行变为选中状态
            items.isChecked = true; //更新标志参数
            items.fileList.map((item) => {
              //遍历子节点并改变状态与标志参数
              this.$refs.dataTable.toggleRowSelection(item, true);
              item.isChecked = true;
            });
          } else {
            //选中状态同理
            this.$refs.dataTable.toggleRowSelection(items, false);
            items.isChecked = false;
            items.fileList.map((item) => {
              this.$refs.dataTable.toggleRowSelection(item, false);
              item.isChecked = false;
            });
          }
        } else {
          if (!items.isChecked) items.isChecked = true;
          else items.isChecked = false;
        }
      });
      // console.log(this.orgs)
    },
    // 点击置顶按钮
    handleStick(val) {
      const params = window._.cloneDeep(val);
      params.isTop = !val.isTop;
      fetchStaick(params).then((res) => {
        if (res) {
          if (res.code == 200) {
            val.isTop = !val.isTop;
            iMessage.success(res.desZh);
            this.getTableList();
          } else iMessage.error(res.desZh);
        }
      });
    },
    // 点击名称,触发跳转事件
    clickName(val) {
      if (val.fileType == this.$t("TPZS.SCHEME_TYPE")) {
        this.$router.push({
          path: "/sourcing/partsrfq/bobNew",
          query: {
            chemeId: val.id,
            rfqId: val.rfqNo || "",
          },
        });
      } else if (val.fileType == this.$t("TPZS.REPORT_TYPE")) {
        this.reportTitle = val.name;
        this.reportVisible = true;
        this.reportKey = Math.random();
        if (val.path) this.reportUrl = val.path;
      }
    },
    //点击关闭报告预览弹窗
    handleCloseReport() {
      this.reportVisible = false;
    },
    //给方案数据设置斑马纹样式名
    rowStyle({ row }) {
      return row.fileType == this.$t("TPZS.SCHEME_TYPE") && row.number % 2 == 0
        ? "scheme"
        : "report";
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .cell {
  .el-table__expand-icon {
    float: right !important;
    z-index: 999;
  }
  .el-table__indent,
  .el-table__placeholder {
    display: none;
  }
}

::v-deep .el-table .el-table__row .el-input .el-input__inner {
  text-align: center !important;
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 96%;
}

::v-deep .el-table .scheme{
  background-color: #e0eafd;
}
::v-deep .el-table .report {
  background-color: #fff;
}

.mainBox {
  ::v-deep .el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  //有子节点 且未展开
  ::v-deep .el-table .el-icon-arrow-right:before {
    background: url("../../../assets/images/Icon - Arrow Drop Down.png")
      no-repeat 0 0;
    content: "";
    display: block;
    width: 10px;
    height: 4px;
    font-size: 10px;
    background-size: 10px;
  }
  //有子节点 且已展开
  ::v-deep .el-table .el-table__expand-icon--expanded {
    .el-icon-arrow-right:before {
      background: url("../../../assets/images/Icon - Arrow收起.png") no-repeat 0
        0;
      content: "";
      display: block;
      width: 10px;
      height: 4px;
      font-size: 10px;
      background-size: 10px;
      transform: rotate(270deg);
    }
  }
  ::v-deep .openPage {
    position: relative;
    color: $color-blue;
    font-size: 14px;
    cursor: pointer;
    width: 90%;
    .number {
      position: absolute;
      right: 12px;
      top: 2px;
      color: #fff;
      font-size: 10px;
      z-index: 1;
      width: 20px;
    }
    .numberIcon {
      position: absolute;
      font-size: 24px;
      right: 10px;
      top: 3px;
    }
  }
  .stickIcon :hover {
    cursor: pointer;
  }
}
</style>