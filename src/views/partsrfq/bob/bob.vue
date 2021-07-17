<!--
 * @Author: xuxin
 * @Date: 2021-06-16 10:41:04
 * @Description: BOB主页面
 * @FilePath: \front-web\src\views\bob\bob.vue
-->
<template>
  <div class="bob-main">
    <iSearch @reset="handleSearchReset" @sure="handleSearch" :icon="false">
      <el-form label-position="top">
        <el-row class="margin-bottom20">
          <!--材料组-->
          <el-form-item :label="$t('LK_CAILIAOZU')">
            <iInput
              :placeholder="$t('请输入材料组编号/名称')"
              v-model="form.group"
            ></iInput>
          </el-form-item>
          <!--零件号-->
          <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
            <iInput
              :placeholder="$t('请输入零件号')"
              v-model="form.num"
            ></iInput>
          </el-form-item>
          <!--供应商状态-->
          <el-form-item :label="$t('RFQ号/名称')">
            <iInput
              v-model="form.rfq"
              :disabled="rfqStatus"
              :placeholder="$t('请输入RFQ号')"
            ></iInput>
          </el-form-item>
          <!--集团打包-->
          <el-form-item :label="$t('创建人')">
            <iInput
              :placeholder="$t('请输入创建人名称')"
              v-model="form.owner"
            />
          </el-form-item>
        </el-row>
      </el-form>
    </iSearch>
    <iCard :title="$t('BoB分析库')" class="margin-top20">
      <template v-slot:header-control>
        <div v-if="!edit">
          <iButton @click="newBob">{{ $t("新建") }}</iButton>
          <iButton @click="editBob">{{ $t("LK_BIANJI") }}</iButton>
          <iButton @click="deleteBob">{{ $t("delete") }}</iButton>
        </div>
        <div v-else>
          <iButton @click="cancelEditBob">{{ $t("LK_QUXIAO") }}</iButton>
          <iButton @click="saveEdit">{{ $t("LK_BAOCUN") }}</iButton>
        </div>
      </template>
      <el-table
        tooltip-effect='light'
        v-if="isRenderTable"
        ref="multipleTable"
        :data="tableListData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :max-height="450"
        :tree-props="{ children: 'children' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
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
          label="分析名称"
          width="250"
        >
          <template slot-scope="scope">
            <div class="openPage">
              <el-row :gutter="20">
                <el-col :span="18" style="textalgin: center">
                  <el-tooltip v-if="!edit" :content="scope.row.name" placement="top" effect="light">
                    <p v-if="!edit" class="ellipsis"  @click="clickName(scope.row)">
                      {{
                        scope.row.name
                    }}
                    </p>
                  </el-tooltip>
                  <iInput
                    v-else
                    class="nameInput"
                    v-model="scope.row.name"
                  ></iInput>
                </el-col>
                <el-col :span="6">
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
        <el-table-column :label="$t('LK_CAILIAOZU')" prop="materialGroup">
        </el-table-column>
        <el-table-column :label="$t('RFQ')" prop="rfqNo"> </el-table-column>
        <el-table-column
          :label="$t('默认项')"
          align="center"
          header-align="center"
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
        <el-table-column :label="$t('文件类型')" prop="fileType">
        </el-table-column>
        <el-table-column :label="$t('创建人')" prop="createNameZh">
        </el-table-column>
        <el-table-column :label="$t('LK_CHUANGJIANRIQI')" prop="createDate" show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$t('上次修改日期')" prop="updateDate" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <div @click="handleStick(scope.row)" class="stickIcon">
              <icon
                v-if="scope.row.fileType === '方案' && scope.row.isTop"
                name="iconliebiaoyizhiding"
                class="iconliebiaoyizhiding"
                symbol
              />
              <icon
                v-else-if="scope.row.fileType === '方案' && !scope.row.isTop"
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

      <reportPreview :visible="reportVisible" :reportUrl="reportUrl" />
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
  initIn,
} from "@/api/partsrfq/bob/analysisList";
import { pageMixins } from "@/utils/pageMixins";
import reportPreview from "@/views/partsrfq/vpAnalyse/vpAnalyseList/components/reportPreview";
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
  },
  data() {
    return {
      form: {},
      rfqID: "220",
      edit: false,
      tableListData: [],
      backUpData: [],
      selection: [],
      entryStatus: this.$store.state.rfq.entryStatus,
      pre: false,
      rfqStatus: false,
      reportVisible: false,
      reportUrl: null,
      currentDefaultObj: null, //当前编辑对象
      isRenderTable: true,
      defaultData: [
        { value: "是", label: this.$t("nominationLanguage.Yes") },
        { value: "否", label: this.$t("nominationLanguage.No") },
      ],
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
        let flag =
          status === "是" || status === "否"
            ? status
            : null;
        if (this.currentDefaultObj && this.currentDefaultObj.isDefault == "是") {
          if (val.id == this.currentDefaultObj.id )
            flag = "是";
          else if (!flag) flag = null;
          else flag = "否";
        }
        return val.fileType == "方案" ? flag : null;
      };
    },
  },
  methods: {
    //初始化查询数据
    initSearchData() {
      const data = this.$store.state.rfq.rfqId;
      const status = this.$store.state.rfq.entryStatus;
      if (data && status == 1) this.rfqStatus = true;
      this.form = {
        ...this.form,
        rfq: data,
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
          id: 1,
          myindex: "1",
          name: "aaaa",
          group: "1111",
          rfqName: "bbbb",
          defaultRule: "是",
          fileType: "方案",
          owner: "11",
          createDate: "",
          modifyDate: "",
          top: "1",
          children: [
            {
              id: 2,
              myindex: "1.1",
              name: "aaaa1",
              group: "1111",
              rfqName: "bbbb1",
              defaultRule: "",
              fileType: "报告",
              owner: "111",
              createDate: "",
              modifyDate: "",
            },
          ],
        },
        {
          id: 3,
          myindex: "2",
          name: "aaa2",
          group: "1111",
          rfqName: "bbbb2",
          defaultRule: "",
          fileType: "方案",
          owner: "11",
          createDate: "",
          modifyDate: "",
          top: "0",
          children: null,
        },
      ];
    },
    //重置查询事件
    handleSearchReset() {
      this.initSearchData();
      this.getTableList();
    },
    //检索事件
    handleSearch() {
      this.getTableList().then((res) => {
        if (!res.data || res.data.length == 0) {
          iMessage.error(
            "抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入"
          );
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
          partsNo: this.form.num ? this.form.num : null,
          rfqNo: this.form.rfq ? this.form.rfq : null,
        };
        getBobAnalysisDataList(params).then((res) => {
          if (res && res.code == 200) {
            this.page.totalCount = res.total;
            this.tableListData = res.data;
            this.handleTableNumber(this.tableListData, 1, null);
            resolve(res);
          }
        });
      });
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
    // 点击编辑按钮
    editBob() {
      this.backUpData = window._.cloneDeep(this.tableListData);
      this.edit = !this.edit;
    },
    //取消保存編輯狀態下的數據
    cancelEditBob() {
      console.log('tableListData', this.tableListData);
      // console.log('backUpData', this.backUpData);
      // this.$delete(this.tableListData, 'isDefault')
      // this.$set(this, "tableListData", window._.cloneDeep(this.backUpData));

      this.backUpData.map((item, index) => {
        // this.$set(this.tableListData, index, item)
        this.$set(this.tableListData[index], 'name', item.name)
        this.$set(this.tableListData[index], 'isDefault', item.isDefault)
      })
    
      console.log('tableListData2', this.tableListData);
      this.edit = !this.edit;
      // this.getTableList()
    },
    // 点击新建按钮
    newBob() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.entryStatus === 1) {
        initIn({
          rfqId: this.form.rfq,
        }).then((res) => {
          // this.$store.dispatch('setSchemeId', res.data);
          this.$router.push({
            path: "/sourcing/partsrfq/bobNew",
            query: {
              rfqId: res.data,
              newBuild: true,
            },
          });
          loading.close();
        });
      } else {
        this.$router.push({
          path: "/sourcing/partsrfq/bobNew",
          query: {
            newBuild: true,
          },
        });
        loading.close();
      }
    },
    // 点击删除按钮
    deleteBob() {
      if (!this.selection || this.selection.length == 0) {
        iMessage.error("请选中要删除的数据");
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
      // if (row.id == 1) {
      //   debugger;
      // }
      this.$set(row, "isDefault", val);
      this.$set(this, "currentDefaultObj", row);
      // this.currentDefaultObj = row
    },
    //保存编辑
    saveEdit() {
      let count = 0;
      this.tableListData.forEach((item) => {
        if (item.isDefault == "是") count++;
      });
      if (count > 1) {
        iMessage.error(this.$t("只能存在一个默认方案"));
        return;
      }
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
      if (val.fileType == "方案") {
        this.$router.push({
          path: "/sourcing/partsrfq/bobNew",
          query: {
            rfqId: val.id,
          },
        });
      } else if (val.fileType == "报告") {
        this.reportVisible = true;
        if (val.path) this.reportUrl = val.path;
      }
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
  width: 150px;
}

.bob-main {
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

  .openPage {
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