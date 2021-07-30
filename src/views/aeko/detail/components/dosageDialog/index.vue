<!--
 * @Author: your name
 * @Date: 2021-07-29 11:38:07
 * @LastEditTime: 2021-07-29 16:51:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\detail\components\dosageDialog\index.vue
-->
<template>
  <iDialog
    class="dosageDialog"
    v-bind="$props"
    :visible.sync="status"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ language("ZHUANGCHELVMEICHEYONGLIANG", "装⻋率/每⻋⽤量") }}</p>
      <div class="control" id="control">
        <iButton @click="handleConfirm">{{ language("BAOCUN", "保存") }}</iButton>
      </div>
    </template>
    <div class="body">
      <div v-for="(carTypeProject, $i) in carTypeProjectList" :key="$i" class="carTypeProject">
        <iFormGroup class="form" :row="4" inline>
          <iFormItem class="item" v-for="(item, $index) in form" :key="$index" :label="`${ language(item.key, item.name) }`">
            <div v-if="item.props === 'a'">
              <iText v-if="lll">bbbasss</iText>
              <iSelect
                v-else
                :placeholder="language('QINGXUANZE', '请选择')"
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item in options"
                  :key="item.key"
                ></el-option>
              </iSelect>
            </div>
            <iText v-if="item.props === 'b' || item.props === 'c'"></iText>
            <iInput v-else-if="item.props === 'd'"></iInput>
          </iFormItem>
        </iFormGroup>
        <tableList
          index
          lang
          class="table margin-top30"
          :selection="false"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading">
        </tableList>
        <i class="dashes"></i>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormGroup, iFormItem, iSelect, iText, iInput, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { dosageDialogForm as form, dosageDialogTableTitle as tableTitle } from "../data"
import filters from "@/utils/filters"

export default {
  components: { iDialog, iButton, iFormGroup, iFormItem, iSelect, iText, iInput, tableList },
  mixins: [ filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    status(nv) {
      if (nv) {
        this.getList()
      } else {
        // this.selectRow = null
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
      loading: false,
      form,
      options: [],
      carTypeProjectList: [{}, {}, {}],
      tableTitle,
      tableListData: [],
      // selectRow: null,
      lll: false
    };
  },
  methods: {
    // 获取列表
    getList() {
      this.tableListData = [{}, {}, {}]
      // this.loading = true

      // getPartsBySupplier({
      //   current: this.page.currPage,
      //   size: this.page.pageSize,
      //   rfqId: this.rfqId,
      //   partFsInfos: this.parts.map(part => ({
      //     fs: part.fsnrGsnrNum,
      //     partNum: part.partNum
      //   }))
      // })
      // .then(res => {
      //   if (res.code == 200) {
      //     this.multipleSelection = []
      //     this.tableListData = Array.isArray(res.data) ? res.data : []
      //     this.page.totalCount = res.total || 0
      //   } else {
      //     iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
      //   }

      //   this.loading = false
      // })
      // .catch(() => this.loading = false)
    },
    // 确认
    handleConfirm() {
      // this.$emit("confirm", this.selectRow)
      this.status = false
    },
  }
};
</script>

<style lang="scss" scoped>
.dosageDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  .control {
    position: absolute;
    top: 50%;
    right: 94px;
    transform: translate(0, -50%);
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
      height: 580px;
      overflow-y: scroll;
      padding-right: 15px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 60px);
      padding-right: 13px;
    }
  }

  .carTypeProject {
    &:not(&:first-of-type) {
      padding-top: 50px;
    }
  }

  .form {
    ::v-deep .el-form-item {
      margin-right: 60px;
      margin-bottom: 0;

      &:last-of-type {
        margin-right: 0;
      }

      .el-form-item__label {
        width: 140px;
        font-size: 16px;
      }
    }
  }

  .dashes {
    margin-top: 40px;
    display: block;
    height: 1px;
    border: 1px dashed #CFD3DD;
  }

  ::v-deep .el-table {
    .el-table__body-wrapper {
      min-height: initial !important;  
    }

    &::before {
      background: transparent;
    }
  }
}
</style>