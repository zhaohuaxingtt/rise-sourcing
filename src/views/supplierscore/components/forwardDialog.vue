<!--
 * @Author: your name
 * @Date: 2021-06-30 17:46:28
 * @LastEditTime: 2021-06-30 18:18:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\forwardDialog.vue
-->
<template>
  <iDialog 
    class="forwardDialog" 
    v-bind="$props" 
    v-on="$listeners"
    :visible.sync="status" 
    title="转派评分任务"
    :close-on-click-modal="false">
    <!-- :title="language('ZHUANPAIPINGFENRENWU', '转派评分任务')"  -->
    <div class="body">
      <iFormGroup class="total margin-left20" :row="1" inline>
        <!-- <iFormItem class="item" :label="language('PINGFENREN', '评分人')"> -->
          <iFormItem class="item" label="评分人">
          <!-- <iSelect v-model="nominateType" filterable :loading="loading" :loading-text="language('JIAZAIZHONG', '加载中')"> -->
          <iSelect v-model="nominateType" filterable :loading="loading" loading-text="加载中" @change="handleChange">
            <el-option v-for="item in options" :key="item.key" :value="item.value" :label="item.label" />
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </div>
    <div slot="footer" class="footer">
      <iButton :loading="confirmLoading" @click="confirm">{{ language("QUEREN", "确认") }}</iButton>
      <iButton @click="visible = false">{{ language("QUXIAO", "取消") }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iFormGroup, iFormItem, iButton, iMessage } from "@/components"
import { getNominateType } from "@/api/supplierscore"

export default {
  components: { iDialog, iSelect, iFormGroup, iFormItem, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        this.getOptions()
      } else {
        this.options = []
        this.userInfo = null
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
      userInfo: null,
      loading: false,
      options: [],
      confirmLoading: false,
    }
  },
  methods: {
    getOptions() {
      const getOptions = function() {}

      this.loading = true
      getOptions()
      .then(res => {
        if (res.code == 200) {
          this.options = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleChange(value) {
      for (let i = 0, item; (item = this.options[i++]); ) {
        if (item.id === value) {
          this.userInfo = item
          break
        }
      }
    },
    // 确认
    handleConfirm() {
      this.$emit("confirm", this.userInfo)
      // this.status = false
    },
    // 取消
    handleCancel() {
      this.$emit("cancel")
      this.status = false
    },
    // 更新loading
    updateConfirmLoading(status = false) {
      this.confirmLoading = status
    }
  }
}
</script>

<style lang="scss" scoped>
.forwardDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .el-form-item {
    margin-bottom: 0;

    ::v-deep .el-form-item__label {
      width: auto;
      min-width: 100px;
    }
  }

  ::v-deep .el-dialog {
    width: 500px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

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