<template>
  <div class="material-dialog">
    <iDialog
      title="业务日志"
      :visible.sync="isShow"
      width="85%"
      @open="handleOpen"
      @close="handleClose"
    >
      <i-search
        @sure="sure"
        @reset="reset"
        class="margin-bottom20"
        :icon="true"
      >
        <el-form row="1" :model="query" ref="queryForm">
          <el-form-item :label="'操作类型'">
            <iDicoptions :optionKey="optionKey" v-model="query.type" filterable>
            </iDicoptions>
          </el-form-item>
          <el-form-item :label="'操作人'">
            <i-input :placeholder="'请输入'" v-model="query.creator" />
          </el-form-item>
        </el-form>
      </i-search>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        class="log-table"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            {{ props.row.content }}
          </template>
        </el-table-column>
        <el-table-column
          label="模块"
          prop="module"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作类型"
          prop="typeName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作人"
          prop="creator"
          align="center"
        ></el-table-column>
        <el-table-column
          label="请求时间"
          prop="rqTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="响应时间"
          prop="respTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="结果"
          prop="result"
          align="center"
        ></el-table-column>
      </el-table>

      <div class="pagination-box">
        <iPagination
          v-update
          class="pagination"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSearch, iInput, iPagination } from "rise";
import { getLogMenu } from "@/utils";
import { roleMixins } from "@/utils/roleMixins";
import { pageMixins } from "@/utils/pageMixins";
import { getLogList } from "@/api/aeko/approve";
import iDicoptions from "rise/web/components/iDicoptions";

export default {
  components: { iDialog, iSearch, iInput, iPagination, iDicoptions },
  mixins: [roleMixins, pageMixins],
  props: {
    bizId: {
      type: Number,
      Default: function () {
        return 0;
      },
    },
    show: [Boolean],
    module: [String], // 流程模块,
    optionKey: {
      type: String,
      default: "LOG_TYPE",
    },
    hasId: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData: [],
      query: {
        type: "",
        creator: "",
      },
      loading: false,
    };
  },
  computed: {
    isShow: {
      get() {
        return this.show;
      },
      set(val) {
        this.page.currPage = 1;
        this.$emit("update:show", val);
      },
    },
  },
  methods: {
    sure() {
      this.page.currPage = 1;
      this.getList();
    },
    reset() {
      this.query = {
        type: "",
        creator: "",
      };
      this.sure();
    },
    handleClose() {
      this.query = {
        type: "",
        creator: "",
      };
    },
    handleOpen() {
      this.sure();
    },
    getList() {
      this.query.bizId_obj_ae = this.bizId;
      let menu = getLogMenu();
      // createBy_obj_ae:11193   当前用户id
      // bizId_obj_ae:11111      AEKO id
      // menuName_obj_ae:菜单    当前所在页面
      // module_obj_ae:模块      当前所在流程模块
      const params = {
        current: this.page.currPage - 1, // 前后端页面定义有一页偏差
        size: this.page.pageSize,
        extendFields: {
          ...this.query,
          module_obj_ae: this.module,
          createBy_obj_ae: this.hasId ? this.userInfo.id : "",
          menuName_obj_ae: menu,
        },
      };
      this.loading = true;
      getLogList(params)
        .then((res) => {
          if(res?.code=='200'){
            const { data } = res
            this.tableData = data.content || [];
            this.page.totalCount = data.total || 0;
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination-box {
  padding-bottom: 30px;
}

.material-dialog {
  .card {
    box-shadow: none;

    ::v-deep .cardBody {
      padding: 0;
    }
  }
  ::v-deep .el-table__body-wrapper {
    height: 410px;
    overflow-y: auto;
    border-bottom: 1px solid #eee;
  }
}
</style>
