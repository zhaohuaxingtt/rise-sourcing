<!--
 * @Author: xuxin
 * @Date: 2021-06-16 10:41:04
 * @Description: BOB主页面
 * @FilePath: \front-web\src\views\bob\bob.vue
-->
<template>
  <div class="bob-main">
    <iSearch @reset="handleSearchReset" @sure="getTableList" :icon="false">
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
            <iInput v-model="form.rfq"></iInput>
          </el-form-item>
          <!--集团打包-->
          <el-form-item :label="$t('创建人')">
            <iInput :placeholder="$t('请输入零件号')" v-model="form.owner" />
          </el-form-item>
        </el-row>
      </el-form>
    </iSearch>
    <iCard :title="$t('BoB分析库')" class="margin-top20">
      <template v-slot:header-control>
        <div v-if="!edit">
          <iButton @click="editBob">{{ $t("LK_BIANJI") }}</iButton>
          <iButton @click="newBob" >{{ $t("新建") }}</iButton>
          <iButton @click="deleteBob">{{ $t("delete") }}</iButton>
        </div>
        <div v-else>
          <iButton @click="editBob">{{ $t("LK_QUXIAO") }}</iButton>
          <iButton @click="saveEdit">{{ $t("LK_BAOCUN") }}</iButton>
        </div>
      </template>
      <el-table
        ref="multipleTable"
        :data="tableListData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :max-height="450"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
        @selection-change="handleSelectionChange"
        @select="checkChildren"
        @select-all="checkAll"
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column
          label="#"
          type="index"
          :index="indexMethod"
          align="center"
          header-align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column :label="$t('分析名称')" width="200">
          <template slot-scope="scope">
            <el-row type="flex" align="middle">
              <el-col :span="scope.row.reportList !== null ? 20 : 16">
                <div v-if="edit">
                  <iInput v-model="scope.row.name" />
                </div>
                <div v-else>
                  <iButton type="text" @click="pre = true">{{
                    scope.row.name
                  }}</iButton>
                </div>
              </el-col>
              <el-col :span="4">
                <iNumIcon
                  style="margin-top: 20px"
                  v-if="scope.row.reportList"
                  :num="
                    scope.row.reportList !== null
                      ? scope.row.reportList.length
                      : 0
                  "
                />
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column :label="$t('LK_CAILIAOZU')" prop="materialGroup">
        </el-table-column>
        <el-table-column :label="$t('RFQ')" prop="rfqNo"> </el-table-column>
        <el-table-column :label="$t('默认项')">
          <template slot-scope="scope">
            <div v-if="edit && scope.row.fileType == '方案'">
              <iSelect v-model="scope.row.isDefault" @change="setDefault">
                <el-option value="是" label="是" />
                <el-option value="否" label="否" />
              </iSelect>
            </div>
            <div v-else>
              {{ scope.row.isDefault == "空" ? null : scope.row.isDefault }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('文件类型')" prop="fileType">
        </el-table-column>
        <el-table-column :label="$t('创建人')" prop="createNameZh">
        </el-table-column>
        <el-table-column :label="$t('LK_CHUANGJIANRIQI')" prop="createDate">
        </el-table-column>
        <el-table-column :label="$t('上次修改日期')" prop="updateDate">
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
    </iCard>
    <!-- <preview :value="pre" @close="closePreView"></preview> -->
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
  initOut,
} from "@/api/partsrfq/bob/analysisList";
import { pageMixins } from "@/utils/pageMixins";
import iNumIcon from "./iNumIcon.vue";
// import preview from "./newReport/preview.vue";
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
    iNumIcon,
    // preview,
  },
  data() {
    return {
      form: {},
      rfqID: "220",
      edit: false,
      tableListData: [],
      backUpData: [],
      selection: [],
      pre: false,
    };
  },
  mounted() {
    this.form = {
      ...this.form,
      rfq: this.rfqID,
    };
    // this.initData()
    this.getTableList();
  },
  methods: {
    closePreView(val) {
      this.pre = val;
    },
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
    handleSearchReset() {
      this.form = {
        rfq: this.rfqID,
      };
      this.getTableList();
    },
    //获取表格数据
    getTableList() {
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
          this.page.total = res.totalCount;
          this.tableListData = res.data;
          this.handleTableNumber(this.tableListData, 1, null);
        }
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
      if (!this.edit) this.backUpData = window._.cloneDeep(this.tableListData);
      else this.tableListData = window._.cloneDeep(this.backUpData);
      this.edit = !this.edit;
    },
    newBob() {
       const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      initIn({
        rfqId: this.rfqID,
      }).then((res) => {
        this.$router.push({
          path: "/sourcing/partsrfq/bobNew",
          query: {
            rfqId: res.data,
            newBuild:true
          },
        });
         loading.close()
       
      });
    },
    // 点击删除按钮
    deleteBob() {
      if (!this.selection || this.selection.length == 0) {
        iMessage.error("请选中要删除的数据");
        return;
      }
      fetchDel(this.selection).then((res) => {
        if (res.code == 200) iMessage.success(res.desZh);
        else iMessage.error(res.desZh);
        this.getTableList();
      });
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
    handleSizeChange(e, fn) {},
    handleCurrentChange(e, fn) {},
    // 选中项发生改变
    handleSelectionChange(val) {
      this.selection = val;
    },
    checkAll(currentSelect) {
      const haschild = currentSelect.filter(
        (r) => r.reportList && r.reportList !== null && r.reportList.length > 0
      );
      if (haschild.length > 0) {
        currentSelect.map((r) => {
          if (
            r.reportList &&
            r.reportList !== null &&
            r.reportList.length > 0
          ) {
            r.reportList.forEach((c) => {
              this.currentSelect.push(c);
              this.$refs.multipleTable.toggleRowSelection(c, true);
            });
          }
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    checkChildren(currentSelect, row) {
      let action = currentSelect.indexOf(row) !== -1 ? true : false;
      if (
        row.reportList &&
        row.reportList !== null &&
        row.reportList.length > 0
      ) {
        row.reportList.map((c) => {
          this.$refs.multipleTable.toggleRowSelection(c, action);
        });
      }
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
  },
};
</script>

<style lang="scss">
.bob-main {
  margin-top: 10px;
  .el-table__expand-icon {
    float: right !important;
    margin-top: 20px !important;
  }
  .stickIcon :hover {
    cursor: pointer;
  }
}
</style>