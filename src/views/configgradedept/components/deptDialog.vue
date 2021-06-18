<!--
 * @Author: your name
 * @Date: 2021-06-18 15:11:44
 * @LastEditTime: 2021-06-18 19:04:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configgradedept\components\deptDialog.vue
-->
<template>
  <iDialog 
    class="deptDialog"
    v-bind="$props"
    v-on="$listeners"
    :title="$t('选择部门编号')"
    :visible.sync="visible">
    <div class="body">
      <div class="form">
        <el-form>
          <el-row>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="$t('部门编号')">
                <iSelect
                  v-model="form"
                  :placeholder="$t('请选择部门编号')"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item in options"
                    :key="item.key"
                  ></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="$t('部门中文名')">
                <iSelect
                  v-model="form"
                  :placeholder="$t('请选择部门中文名')"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item in options"
                    :key="item.key"
                  ></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="$t('部门英文名')">
                <iSelect
                  v-model="form"
                  :placeholder="$t('请选择部门英文名')"
                >
                  <el-option
                    value=""
                    :label="$t('all') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item in options"
                    :key="item.key"
                  ></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="8" class="formControl">
              <iButton @click="handleQuery">{{ $t("确认") }}</iButton>
              <iButton @click="handleReset">{{ $t("重置") }}</iButton>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <i class="cutLine"></i>
      <div class="form">
        <el-form>
          <el-row>
            <el-col :span="4" :offset="20" class="control">
              <iButton @click="handleConfrim">{{ $t("确定") }}</iButton>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="content">
        <tableList
          class="table"
          index
          singleSelect
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSingleSelectChange="handleSingleSelectChange" />
      </div>
    </div>
    <template #footer class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { deptDialogQueryForm as queryForm, deptDialogTableTitle as tableTitle } from "./data"
import { cloneDeep } from "lodash"

export default {
  components: { iDialog, iSelect, iButton, iPagination, tableList },
  mixins: [ filters, pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    visible(nv) {
      if (nv) { 
        // 请求
        this.getList()
      } else {
        this.page.currPage = 1
        this.form = cloneDeep(queryForm)
        this.tableListData = []
      }

      this.$emit("update:visible", nv)
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    // ...Vuex.mapState({
    //   userInfo: state => state.permission.userInfo,
    // }),
  },
  data() {
    return {
      options: [],
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [{}, {}, {}, {}, {}],
      selectRow: null,
      sendLoading: false,
      recallLoading: false
    };
  },
  methods: {
    getList() {
      const getList = function() {}

      this.loading = true

      getList({
        ...this.form,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.selectRow = null
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSingleSelectChange(row) {
      this.selectRow = row
    },
    // 确认
    handleQuery() {
      this.page.currPage = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.form = cloneDeep(queryForm)
      this.getList()
    },
    // 确定
    handleConfrim() {
      if (!this.selectRow) return iMessage.warn("请选择一个部门编号")

      this.$emit("confrim", cloneDeep(this.selectRow))
      this.visible = false
    }
  }
};
</script>

<style lang="scss" scoped>
.deptDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title {
    height: 25px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  ::v-deep .el-dialog {
    width: 1745px !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      // height: 580px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      @include pdtb(28px, 28px);
    }
  }

  .formControl,
  .control {
    text-align: right;
    margin-top: 40px;
  }

  .cutLine {
    display: block;
    width: 100%;
    height: 1px;
    background: #707070;
    opacity: .1;
  }

  .control,
  .content {
    margin-top: 22px;
  }

  .content {
    height: 500px;
  }
}
</style>