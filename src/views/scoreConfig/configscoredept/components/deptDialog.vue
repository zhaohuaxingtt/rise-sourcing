<!--
 * @Author: your name
 * @Date: 2021-06-18 15:11:44
 * @LastEditTime: 2021-07-20 16:09:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\components\deptDialog.vue
-->
<template>
  <iDialog 
    class="deptDialog"
    v-bind="$props"
    v-on="$listeners"
    :title="language('XUANZEBUMENBIANHAO', '选择部门编号')"
    :visible.sync="status">
    <div class="body">
      <div class="form">
        <el-form>
          <el-row>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="language('BUMENBIANHAO', '部门编号')">
                <iSelect
                  filterable
                  v-lazy-select="() => optionsLazy('deptNum')"
                  v-model="form.deptNum"
                  :filter-method="$event => selectFilter($event, 'deptNum')"
                  :placeholder="language('QINGSHURUBUMENBIANHAO', '请输入部门编号')"
                  @visible-change="selectVisibleChange($event, 'deptNum')"
                >
                  <el-option
                    value=""
                    :label="language('ALL', '全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item in deptNumOptions"
                    :key="item.key"
                  ></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="language('BUMENZHONGWENMING', '部门中文名')">
                <iSelect
                  filterable
                  v-lazy-select="() => optionsLazy('nameZh')"
                  v-model="form.nameZh"
                  :filter-method="$event => selectFilter($event, 'nameZh')"
                  :placeholder="language('QINGSHURUBUMENZHONGWENMING', '请输入部门中文名')"
                  @visible-change="selectVisibleChange($event, 'nameZh')"
                >
                  <el-option
                    value=""
                    :label="language('ALL', '全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item in nameZhOptions"
                    :key="item.key"
                  ></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="language('BUMENYINGWENMING', '部门英文名')">
                <iSelect
                  filterable
                  v-lazy-select="() => optionsLazy('nameEn')"
                  v-model="form.nameEn"
                  :filter-method="$event => selectFilter($event, 'nameEn')"
                  :placeholder="language('QINGSHURUBUMENYINGWENMING', '请选择部门英文名')"
                  @visible-change="selectVisibleChange($event, 'nameEn')"
                >
                  <el-option
                    value=""
                    :label="language('ALL', '全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.value"
                    :label="item.label"
                    v-for="item in nameEnOptions"
                    :key="item.key"
                  ></el-option>
                </iSelect>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="8" class="formControl">
              <iButton @click="handleQuery">{{ language("QUEREN", "确认") }}</iButton>
              <iButton @click="handleReset">{{ language("CHONGZHI", "重置") }}</iButton>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <i class="cutLine"></i>
      <div class="form">
        <el-form>
          <el-row>
            <el-col :span="4" :offset="20" class="control">
              <iButton @click="handleConfrim">{{ language("QUEDING", "确定") }}</iButton>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="content">
        <tableList
          class="table"
          index
          singleSelect
          :selectable="selectable"
          :lang="true"
          :cellClassName="cellClass"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSingleSelectChange="handleSingleSelectChange" />
      </div>
      <div slot="footer" class="footer">
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getAllDeptByPage)"
          @current-change="handleCurrentChange($event, getAllDeptByPage)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import filters from "@/utils/filters"
import { deptDialogQueryForm as queryForm, deptDialogTableTitle as tableTitle } from "./data"
import { cloneDeep, chunk, debounce } from "lodash"
import { getAllDept, getAllDeptByPage } from "@/api/configscoredept"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iDialog, iSelect, iButton, iPagination, tableList},
  mixins: [ filters, pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    filterDeptNums: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    status(nv) {
      if (nv) { 
        // 请求
        this.page.currPage = 1
        this.page.pageSize = 10
        this.getAllDeptByPage()

        this.debouncer = null
        this.deptNumOptionsCurrentPage = 1
        this.nameZhOptionsCurrentPage = 1
        this.nameEnOptionsCurrentPage = 1
        this.getAllDept()
      } else {
        this.form = cloneDeep(queryForm)
        this.tableListData = []
      }
    },
  },
  computed: {
    status: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit("update:visible", value)
      }
    }
  },
  data() {
    return {
      deptNumOptions: [],
      deptNumOptionsCache: [],
      deptNumOptionsCacheChunks: [],
      deptNumOptionsFilterCache: [],
      deptNumOptionsCurrentPage: 1,
      
      nameZhOptions: [],
      nameZhOptionsCache: [],
      nameZhOptionsCacheChunks: [],
      nameZhOptionsFilterCache: [],
      nameZhOptionsCurrentPage: 1,

      nameEnOptions: [],
      nameEnOptionsCache: [],
      nameEnOptionsCacheChunks: [],
      nameEnOptionsFilterCache: [],
      nameEnOptionsCurrentPage: 1,
      
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      selectRow: null,
      sendLoading: false,
      recallLoading: false,

      debouncer: null
    };
  },
  methods: {
    getAllDeptByPage() {
      this.loading = true

      getAllDeptByPage({
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.selectRow = null
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.loading = false)
    },
    getAllDept() {
      this.loading = true

      return getAllDept(this.form)
      .then(res => {
        if (res.code == 200) {
          const data = Array.isArray(res.data) ? res.data : []

          if (Object.keys(this.form).every(key => !this.form[key])) {
            this.deptNumOptionsCache = []
            this.nameZhOptionsCache = []
            this.nameEnOptionsCache = []

            const setObj = {
              deptNumSet: new Set(),
              nameZhSet: new Set(),
              nameEnSet: new Set()
            }

            const keys = ["deptNum", "nameZh", "nameEn"]

            data.forEach(item => {
              keys.forEach(key => {
                item[key] && setObj[`${ key }Set`].add(item[key])
              })
            })
            
            keys.forEach(key => {
              setObj[`${ key }Set`].forEach(value => this[`${ key }OptionsCache`].push({ key: value, label: value, value, lowerCaseLabel: typeof value === "string" ? value.toLowerCase() : value }))

              this[`${ key }OptionsFilterCache`] = this[`${ key }OptionsCache`]
              this[`${ key }OptionsCacheChunks`] = chunk(this[`${ key }OptionsFilterCache`], 20)
              this[`${ key }Options`] = this[`${ key }OptionsCacheChunks`][0] || []
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    optionsLazy(key) {
      console.log("a", this[`${ key }Options`].length)
      console.log("b", this[`${ key }OptionsFilterCache`].length)
      
      if (this[`${ key }Options`].length < this[`${ key }OptionsFilterCache`].length) {
        this[`${ key }OptionsCurrentPage`] += 1
        this[`${ key }Options`] = this[`${ key }Options`].concat(this[`${ key }OptionsCacheChunks`][this[`${ key }OptionsCurrentPage`] - 1])
      }
    },
    selectFilter(value, key) {
      if (this.debouncer && typeof this.debouncer.cancel === "function") this.debouncer.cancel()
      
      this.debouncer = debounce(() => {
        let _value = typeof value === "string" ? value.trim().toLowerCase() : _value

        if (_value) {
          this[`${ key }OptionsFilterCache`] = this[`${ key }OptionsCache`].filter(item => item.lowerCaseLabel.includes(_value))
          this[`${ key }OptionsCacheChunks`] = chunk(this[`${ key }OptionsFilterCache`], 20)
        } else {
          this[`${ key }OptionsFilterCache`] = this[`${ key }OptionsCache`]
          this[`${ key }OptionsCacheChunks`] = chunk(this[`${ key }OptionsCache`], 20)
        }

        this[`${ key }OptionsCurrentPage`] = 1
        this[`${ key }Options`] = this[`${ key }OptionsCacheChunks`][0] || []
      }, 400)
      this.debouncer()
    },
    selectVisibleChange(visible, key) {
      if (!visible) {
        this[`${ key }OptionsFilterCache`] = this[`${ key }OptionsCache`]
        this[`${ key }OptionsCacheChunks`] = chunk(this[`${ key }OptionsCache`], 20)
      }

      this[`${ key }Options`] = this[`${ key }OptionsCacheChunks`][0] || []
      this[`${ key }OptionsCurrentPage`] = 1
    },
    handleSingleSelectChange(row) {
      this.selectRow = row
    },
    // 确认
    handleQuery() {
      this.page.currPage = 1

      this.getAllDeptByPage()
    },
    // 重置
    handleReset() {
      this.form = cloneDeep(queryForm)
      this.getAllDeptByPage()
    },
    // 确定
    handleConfrim() {
      if (!this.selectRow) return iMessage.warn(this.language("QINGXUANZEYIGEBUMENBIANHAO", "请选择一个部门编号" ))

      this.$emit("confrim", cloneDeep(this.selectRow))
      this.status = false
    },
    selectable(row) {
      return !this.filterDeptNums.includes(row.deptNum)
    },
    cellClass(rowInfo) {
      if (this.filterDeptNums.indexOf(rowInfo.row.deptNum) > -1) {
        return "hideCheckbox"
      }
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
      @include pdtb(6px, 28px);
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