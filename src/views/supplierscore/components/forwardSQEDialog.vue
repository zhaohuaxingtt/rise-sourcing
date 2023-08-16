<template>
  <iDialog 
    class="forwardDialog" 
    v-bind="$props" 
    v-on="$listeners"
    :visible.sync="visible"
    :title="language('ZHUANPAIPINGFENRENWU', '转派评分任务')"
    :close-on-click-modal="false">
    <div class="body">
      <iFormGroup class="total margin-left20" :row="1" inline>
        <iFormItem class="item" :label="language('PINGFENREN', '评分人')">
          <iSelect v-model="userId" filterable :loading="loading" :loading-text="language('JIAZAIZHONG', '加载中')" @change="handleChange">
            <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </div>
    <div slot="footer" class="footer">
      <iButton :loading="confirmLoading" @click="handleConfirm">{{ language("QUEREN", "确认") }}</iButton>
      <iButton @click="handleCancel">{{ language("QUXIAO", "取消") }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iFormGroup, iFormItem, iButton, iMessage } from 'rise'
import { listUserByRoleCode } from "@/api/scoreConfig/configscoredept"
export default {
  components: { iDialog, iSelect, iFormGroup, iFormItem, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    visible(nv) {
      if (nv) {
        this.listUserByRoleCode()
      } else {
        this.userId = ""
        this.options = []
        this.userInfo = null
      }
    },
  },
  data() {
    return {
      userInfo: null,
      loading: false,
      options: [],
      userId: "",
      confirmLoading: false,
    }
  },
  methods: {
    listUserByRoleCode() {
      this.loading = true
      listUserByRoleCode({roleCode:'SQEPFR'})
      .then(res => {
        if (res?.code == 200) {
            this.options = res.data?.map((itemUser)=>{
              return {
                ...itemUser,
                value:itemUser.id+'',
                label: itemUser.nameZh+(itemUser.deptDTO&&itemUser.deptDTO['deptNum'] ? '-'+itemUser.deptDTO['deptNum'] : '')
              }
            })||[]
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleChange(value) {
      for (let i = 0, item; (item = this.options[i++]); ) {
        if (item.value === value) {
          this.userInfo = item
          break
        }
      }
    },
    // 确认
    handleConfirm() {
      if (!this.userInfo) return iMessage.warn(this.language("QINGXUANZEPINGFENREN", "请选择评分人"))
      this.$emit("confirm", this.userInfo)
    },
    // 取消
    handleCancel() {
      this.$emit("update:visible", false)
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