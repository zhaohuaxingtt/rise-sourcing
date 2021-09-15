<!--
 * @Author: youyuan
 * @Date: 2021-08-04 19:51:49
 * @LastEditTime: 2021-09-10 13:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\index.vue
-->
<template>
  <div class="mainBox">
    <iSearch @reset="handleSearchReset" @sure="handleSearch" :icon="false">
      <el-form label-position="top">
        <el-row >
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
    <iCard class="margin-top20">
          <!-- :title="language('PIFENXIKU', 'Price Index分析库')" -->
        <div  class="margin-bottom20 clearFloat">
          <span  class="font18 font-weight" >{{language('PIFENXIKU', 'Price Index分析库')}}</span>
          <div class="floatright">
          <div v-if="!editMode">
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
            </div>
        </div>

      <el-table
        tooltip-effect="light"
        ref="multipleTable"
        :data="tableListData"
        style="width: 100%; margin-bottom: 20px"
        row-key="number"
        :max-height="450"
        :row-class-name="rowStyle"
        :tree-props="{ children: 'children' }"
        @selection-change="handleSelectionChange"
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
                <el-col :span="20">
                  <span v-if="!editMode"
                        style="textAlgin: center">
                    <el-tooltip :content="scope.row.analysisSchemeName"
                                placement="top"
                                effect="light">
                      <span class="ellipsis"
                        v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')"
                        @click="clickScheme(scope.row)">{{scope.row.analysisSchemeName}}</span>
                    </el-tooltip>
                    <el-tooltip :content="scope.row.reportName"
                                placement="top"
                                effect="light">
                      <span class="ellipsis"
                        v-if="scope.row.type == $t('TPZS.REPORT_TYPE')"
                        @click="clickReport(scope.row)">{{scope.row.reportName}}</span>
                    </el-tooltip>
                  </span>
                  <span v-else>
                    <iInput class="nameInput"
                            v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')"
                            v-model="scope.row.analysisSchemeName"></iInput>
                    <iInput class="nameInput"
                            v-if="scope.row.type == $t('TPZS.REPORT_TYPE')"
                            v-model="scope.row.reportName"></iInput>
                  </span>
                </el-col>
                <el-col :span="4">
                  <span v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')">
                    <span class="number">
                      {{scope.row.reportCount}}
                    </span>
                    <icon class="numberIcon"
                          style="{font-size:24px}"
                          symbol
                          name="iconwenjianshuliangbeijing"></icon>
                  </span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('LK_CAILIAOZU')"
          prop="materialGroupName"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('RFQ')"
          prop="rfqId"
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
          <div v-if="!editMode">
            {{ defaultStatus(scope.row, scope.row.isDefault) }}
          </div>
          <div v-else-if="editMode && scope.row.type == $t('TPZS.SCHEME_TYPE') && scope.row.isDefault != '空' && scope.row.isDefault">
            <iSelect :value="defaultStatus(scope.row, scope.row.isDefault)"
                     @change="changeDefault($event, scope.row)">
              <el-option :value="item.value"
                         :label="item.label"
                         v-for="(item, index) in defaultData"
                         :key="index"></el-option>
            </iSelect>
          </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('TPZS.WJLX')"
          prop="type"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          :label="$t('TPZS.CJR')"
          prop="createByName"
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
            <div class="stickIcon" v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')"
               @click="handleStick(scope.row)">
              <icon v-if="scope.row.isTop && scope.row.isTop == 1"
                    style="{font-size:24px}"
                    symbol
                    name="iconliebiaoyizhiding"></icon>
              <icon v-else
                    style="{font-size:24px}"
                    symbol
                    name="iconliebiaoweizhiding"
                    @click="handleStick(scope.row)"></icon>
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
        @handleCloseAddModal="handleCloseAddModal"
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
  iMessage
} from "rise";
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
      editMode: false, //编辑模式
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
    defaultStatus () {
      return function (val, status) {
        let flag = status === "是" || status === "否" ? status : null;
        if (this.currentDefaultObj && this.currentDefaultObj.isDefault == "是") {
          if (val.number == this.currentDefaultObj.number) flag = "是";
          else if (!flag) flag = null;
          else flag = "否";
        }
        return val.type == this.$t('TPZS.SCHEME_TYPE') ? flag : null;
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
        if (r.piReportVOList && r.piReportVOList !== null) {
          r.piReportVOList.forEach((c) => {
            rows.push(c.number);
          });
        }
      });
      return rows[e];
    },
    //初始化测试数据
    initData() {
      
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
          createByName: this.form.owner || null,
          materialGroupName: this.form.group || null,
          partsNo: this.form.num || null,
          rfqNo:  this.form.rfq || null
        };
        getAnalysisList(params).then((res) => {
          if (res && res.code == 200) {
            this.page.totalCount = res.total;
            this.tableListData = res.data;
            this.handleTableNumber(this.tableListData, 1, null);
            console.log('tableListData', this.tableListData);
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
        if (item.piReportVOList && item.piReportVOList.length > 0) {
          item["children"] = item.piReportVOList;
          this.handleTableNumber(item.piReportVOList, 1, number);
        }
        suffix++;
      });
    },
    // 点击原材料按钮
    clickRawMaterial() {
      this.$router.push({
        path: this.rawMaterialUrl,
        query: {
          round: this.$route.query.round,
          id: this.$store.state.rfq.rfqId,
        }  
      })
    },
    // 点击编辑按钮
    clickEdit() {
      this.backUpData = window._.cloneDeep(this.tableListData);
      this.editMode = !this.editMode;
    },
    //取消保存編輯狀態下的數據
    cancelEdit() {
      this.backUpData.map((item, index) => {
        if (item.type == this.$t('TPZS.SCHEME_TYPE'))
          this.$set(this.tableListData[index], 'analysisSchemeName', item.analysisSchemeName)
        else
          this.$set(this.tableListData[index], 'reportName', item.reportName)
      })
      this.editMode = !this.editMode;
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
      const params = {
        ids: [],
        reportIds: []
      }
      this.selection.map(item => {
        if(item.type == this.$t('TPZS.SCHEME_TYPE')) params.ids.push(item.id)
        else params.reportIds.push(item.id)
      })
      fetchAnalysisDel(params).then((res) => {
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
      this.editMode = false;
      const params = {
        piEditDTOList: this.tableListData
      }
      fetchAnalysisSave(params).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh);
          this.getTableList();
        } else iMessage.error(res.desZh);
        
      });
    },
    // 选中项发生改变
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 点击置顶按钮
    handleStick(val) {
      fetchAnalysisStick({id: val.id}).then((res) => {
        if (res) {
          if (res.code == 200) {
            iMessage.success(res.desZh);
            this.getTableList();
          } else iMessage.error(res.desZh);
        }
      });
    },
    //点击方案名称，跳转总单价页面
    clickScheme (row) {
      const schemeUrl = '/sourcing/partsrfq/piAnalyseDetail'
      const opneSchemeUrl = this.$router.resolve({
        path: schemeUrl,
        query: {
          schemeId: row.analysisSchemeId,
          round: this.round
        }
      })
      window.open(opneSchemeUrl.href,'_blank')
    },
    //点击报告名称，打开报告预览弹窗
    clickReport (row) {
      this.reportTitle = row.reportName
      this.reportKey = Math.random()
      if (row.downloadUrl) this.reportUrl = row.downloadUrl
      this.reportVisible = true
    },
    //点击关闭报告预览弹窗
    handleCloseReport() {
      this.reportVisible = false;
    },
    //给方案数据设置斑马纹样式名
    rowStyle({ row }) {
      return row.type == this.$t("TPZS.SCHEME_TYPE") && row.number % 2 == 0
        ? "scheme"
        : "report";
    },
    // 关闭新增分析方案弹窗
    handleCloseAddModal() {
      this.addPiParams.visible = false
    }
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