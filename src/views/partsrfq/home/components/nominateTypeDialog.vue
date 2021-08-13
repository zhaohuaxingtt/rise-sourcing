<!--
 * @Author: your name
 * @Date: 2021-06-11 11:34:55
 * @LastEditTime: 2021-06-28 20:21:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\home\components\nominateTypeDialog.vue
-->
<template>
  <iDialog class="nominateTypeDialog" :title="language('LK_QINGXUANZEDINGDIANSHENQINGLEIXING','请选择定点申请类型')" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <iFormGroup class="total margin-left20" :row="1" inline>
        <iFormItem class="item" :label="language('LK_DINGDIANSHENQINGLEIXING','定点申请类型')">
          <iSelect v-model="nominateType" :loading="loading" :placeholder='language("SELECT","请选择")'>
            <el-option v-for="item in options" :key="item.key" :value="item.value" :label="item.label" />
          </iSelect>
        </iFormItem>
      </iFormGroup>
    </div>
    <div slot="footer" class="footer">
      <iButton @click="confirm">{{language('SURE','确定')}}</iButton>
      <iButton @click="visible = false">{{language('REMOVE','取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iFormGroup, iFormItem, iButton, iMessage } from 'rise'
import { getNominateType } from "@/api/designate"

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
    visible(nv) {
      this.$emit('update:visible', nv)

      if (nv) {
        this.getNominateType()
      } else {
        this.nominateType = ""
      }
    }
  },
  data() {
    return {
      nominateType: "",
      loading: false,
      options: []
    }
  },
  methods: {
    getNominateType() {
      this.loading = true

      getNominateType()
      .then(res => {
        if (res.code == 200) {
          this.options = Object.keys(res.data).map(key => ({
            key: key,
            label: res.data[key],
            value: key
          }))
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    confirm() {
      this.$emit("confirm", this.nominateType)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.nominateTypeDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .el-form-item {
    margin-bottom: 0;

    ::v-deep .el-form-item__label {
      width: 140px;
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
}
</style>