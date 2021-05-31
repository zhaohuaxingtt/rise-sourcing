<template>
  <iDialog class="dialog" title="批量编辑" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <el-form>
        <!-- 单一原因 -->
        <el-form-item :label="$t('nominationSupplier.DanYiYuanYin')">
          <iSelect
            v-model="form.projectCarType"
            :placeholder="$t('LK_QINGXUANZE')"
          >
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in []"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- 部门 -->
        <el-form-item :label="$t('nominationSupplier.BuMen')">
          <iSelect
            v-model="form.projectCarType"
            :placeholder="$t('LK_QINGXUANZE')"
          >
            <el-option
              :value="items.key"
              :label="items.value"
              v-for="(items, index) in []"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <iButton>{{ $t("LK_BAOCUN") }}</iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from '@/components'
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
    params: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    params: {
      handler() {
        this.$nextTick(() => { if (this.visible) this.getAttachment() })
      },
      deep: true
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