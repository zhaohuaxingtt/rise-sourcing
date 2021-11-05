<!--
 * @Author: your name
 * @Date: 2021-06-30 17:46:28
 * @LastEditTime: 2021-07-13 17:27:44
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
    :title="language('ZHUANPAIPINGFENRENWU', '转派评分任务')"
    :close-on-click-modal="false">
    <div class="body">
      <iFormGroup class="total margin-left20" :row="1" inline>
        <iFormItem class="item" :label="language('PINGFENREN', '评分人')">
          <iSelect v-model="userId" filterable :loading="loading" :loading-text="language('JIAZAIZHONG', '加载中')" @change="handleChange">
            <el-option v-for="item in options" :key="item.key" :value="item.value" :label="item.label" />
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </div>
    <div slot="footer" class="footer">
      <iButton :loading="confirmLoading" @click="handleConfirm">{{ language("QUEREN", "确认") }}</iButton>
      <iButton @click="status = false">{{ language("QUXIAO", "取消") }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iFormGroup, iFormItem, iButton, iMessage } from 'rise'
import { getRater, findRaterByCurrentUser } from "@/api/supplierscore"

export default {
  components: { iDialog, iSelect, iFormGroup, iFormItem, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    userDeptType: {
      type: String,
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        // this.getRater()
        this.findRaterByCurrentUser()
      } else {
        this.userId = ""
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
      userId: "",
      confirmLoading: false,
    }
  },
  methods: {
    getRater() {
      this.loading = true
      getRater()
      .then(res => {
        if (res.code == 200) {
          if (Array.isArray(res.data.epList) && res.data.epList.length > 0) {
            this.options = res.data.epList.map(item => ({
              ...item,
              key: item.id,
              label: item.nameZh,
              value: item.id
            }))
          }

          if (Array.isArray(res.data.mqList) && res.data.mqList.length > 0) {
            this.options = res.data.mqList.map(item => ({
              ...item,
              key: item.id,
              label: item.nameZh,
              value: item.id
            }))
          }

          switch(this.userDeptType) {
            case "EP":
              this.options = [
                { key: "45", label: "谈和玉", value: "45" },
                { key: "51", label: "姜谷兰", value: "51" },
              ]
              break
            case "MQ":
              this.options = [
                { key: "43", label: "刘财", value: "43" },
                { key: "47", label: "冉兴腾", value: "47" },
              ]
              break
            default:
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    findRaterByCurrentUser() {
      this.loading = true
      findRaterByCurrentUser()
      .then(res => {
        if (res.code == 200) {
          if (Array.isArray(res.data.raterList) && res.data.raterList.length > 0) {
            this.options = res.data.raterList.map(item => ({
              ...item,
              key: item.id,
              label: item.nameZh,
              value: item.id
            }))
          }
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
      if (!this.userInfo) return iMessage.warn(this.language("QINGXUANZEPINGFENREN", "请选择评分人"))

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