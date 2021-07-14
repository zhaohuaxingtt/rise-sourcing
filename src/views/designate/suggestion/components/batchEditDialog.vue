<template>
  <iDialog class="dialog" :title="language('BATCHEDIT','批量编辑')" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <el-form>
        <!-- 供应商名 -->
        <el-form-item :label="language('nominationSupplier_GongYingShangMing','供应商名')">
          <iSelect
            v-model="form.supplierName"
            @change="onSupplierNameChange"
            :placeholder="language('LK_QINGXUANZE','请选择')"
          >
            <el-option
              :value="items.supplierName"
              :label="items.supplierName"
              v-for="(items, index) in supplierList"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 比例 -->
        <el-form-item :label="language('nominationSuggestion_BiLi','比例')">
          <iInput v-model="form.ratio" :placeholder="language('LK_QINGSHURU','请输入')" />
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <iButton @click="submit">{{ language("LK_BAOCUN",'保存') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iSelect } from 'rise'

export default {
  components: { iDialog, iButton, iInput, iSelect },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    supplierList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      form: {

      },
      loading: false,
      controlHeight: 0
    }
  },
  methods: {
    onSupplierNameChange(data) {
      const tar = this.supplierList.find(o => o.supplierName = data) || {}
      this.form.supplierId = tar.supplierId || ''
    },
    submit() {
      this.$emit('submit', this.form)
      this.$nextTick(() => {
        this.form = {}
        this.$emit('update:visible', false)
      })
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.form = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  ::v-deep .el-dialog {
    width: 350px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      padding-bottom: 20px;
      .footer {
        text-align: right;
      }
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
}
</style>