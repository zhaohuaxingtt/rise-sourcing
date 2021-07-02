<!--
 * @Author: your name
 * @Date: 2021-06-18 15:11:44
 * @LastEditTime: 2021-07-02 18:24:27
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
    :visible.sync="visible">
    <div class="body">
      <div class="form">
        <el-form>
          <el-row>
            <el-col :span="4" class="padding-right50">
              <el-form-item :label="language('BUMENBIANHAO', '部门编号')">
                <iSelect
                  filterable
                  v-model="form.deptNum"
                  :placeholder="language('QINGXUANZEBUMENBIANHAO', '请选择部门编号')"
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
                  v-model="form.nameZh"
                  :placeholder="language('QINGXUANZEBUMENZHONGWENMING', '请选择部门中文名')"
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
                  v-model="form.nameEn"
                  :placeholder="language('QINGXUANZEBUMENYINGWENMING', '请选择部门英文名')"
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
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSingleSelectChange="handleSingleSelectChange" />
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import filters from "@/utils/filters"
import { deptDialogQueryForm as queryForm, deptDialogTableTitle as tableTitle } from "./data"
import { cloneDeep } from "lodash"
import { getAllDept } from "@/api/configscoredept"

export default {
  components: { iDialog, iSelect, iButton, tableList },
  mixins: [ filters ],
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
        this.getAllDept()
      } else {
        this.form = cloneDeep(queryForm)
        this.tableListData = []
      }

      this.$emit("update:visible", nv)
    },
  },
  data() {
    return {
      deptNumOptions: [],
      nameZhOptions: [],
      nameEnOptions: [],
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      selectRow: null,
      sendLoading: false,
      recallLoading: false
    };
  },
  methods: {
    getAllDept() {
      this.loading = true

      getAllDept(this.form)
      .then(res => {
        if (res.code == 200) {
          this.selectRow = null
          this.tableListData = Array.isArray(res.data) ? res.data : []

          if (Object.keys(this.form).every(key => !this.form[key])) {
            this.deptNumOptions = []
            this.nameZhOptions = []
            this.nameEnOptions = []
            this.tableListData.forEach(item => {
              this.deptNumOptions.push({ key: item.deptNum, label: item.deptNum, value: item.deptNum })
              this.nameZhOptions.push({ key: item.nameZh, label: item.nameZh, value: item.nameZh })
              this.nameEnOptions.push({ key: item.nameEn, label: item.nameEn, value: item.nameEn })
            })
          }
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
      this.getAllDept()
    },
    // 重置
    handleReset() {
      this.form = cloneDeep(queryForm)
      this.getAllDept()
    },
    // 确定
    handleConfrim() {
      if (!this.selectRow) return iMessage.warn(this.language("QINGXUANZEYIGEBUMENBIANHAO", "请选择一个部门编号" ))

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