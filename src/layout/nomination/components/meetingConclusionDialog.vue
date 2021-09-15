<template>
  <iDialog 
    class="meetingConclusionDialog" 
    v-bind="$props" 
    v-on="$listeners"
    :visible.sync="status" 
    :title="language('XUANZEHUIYIJIEGUO', '选择会议结果')"
    :close-on-click-modal="false">
    <div class="body">
      <iFormGroup class="total" :row="1" inline>
        <iFormItem class="item">
          <iSelect v-model="meetingResult">
            <el-option
              v-for="item in meetingResultArray || []"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </div>
    <div slot="footer" class="footer">
      <iButton :loading="loading" @click="handleConfirm">{{ language("QUEREN", "确认") }}</iButton>
      <iButton @click="status = false">{{ language("QUXIAO", "取消") }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iFormGroup, iFormItem, iButton, iMessage, iSelect } from "rise"
import { meetingResult as meetingResultArray } from "./data"
import { submitFlow } from "@/api/designate"

export default {
  components: { iDialog, iFormGroup, iFormItem, iButton, iSelect },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    desinateId: {
      type: String,
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        this.loading = false
      } else {
        this.meetingResult = ""
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
      meetingResultArray,
      loading: false,
      confirmLoading: false,
      meetingResult: ""
    }
  },
  methods: {
    // 确认
    handleConfirm() {
      if (!this.meetingResult) return iMessage.warn(this.language("QINGXUANZEHUIYIJIEGUO", "请选择会议结果"))

      this.loading = true

      submitFlow({
        meetingId: "1",
        meetingResult: this.meetingResult,
        nominateAppId: this.desinateId,
        nominateIdArr: [this.desinateId]
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.$emit("afterConfirm", this.meetingResult)
          this.status = false
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.loading = false)
    },
    // 取消
    handleCancel() {
      this.$emit("cancel")
      this.status = false
    }
  }
}
</script>

<style lang="scss" scoped>
.meetingConclusionDialog {
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