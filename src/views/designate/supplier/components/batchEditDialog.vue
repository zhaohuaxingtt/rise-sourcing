<template>
  <iDialog class="dialog" :title="language('LK_BATCHEDIT','批量编辑')" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <el-form>
        <!-- 单一原因 -->
        <el-form-item :label="language('nominationSupplier_DanYiYuanYin','单一原因')">
          <iSelect
            v-model="form.singleReason"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            clearable
          >
            <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.label"
              :label="items.label"
              v-for="(items, index) in (selectOptions.reason || [])"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 部门 -->
        <el-form-item :label="language('nominationSupplier_BuMen','部门')">
          <iSelect
            v-model="form.department"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            clearable
          >
            <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.value"
              :label="items.value"
              v-for="(items, index) in (selectOptions.dept || [])"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <iButton @click="submit">{{ language("LK_BAOCUN",'保存') }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'

export default {
  components: { iDialog, iButton, iSelect },
  mixins: [ pageMixins, filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    selectOptions: {
      type: Object,
      default: () => ({})
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        department: '',
        singleReason: ''
      },
      loading: false,
      controlHeight: 0
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.form)
      this.$nextTick(() => {
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