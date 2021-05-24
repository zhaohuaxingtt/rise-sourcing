<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" top="0" @close='clearDiolog' v-loading="iDialogLoading" class="iDialogSaveAs"
           :modal-append-to-body='false'>
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <p class="newVersion">采购员</p>
    <div class="changeContent">
      <iSelect
          :placeholder="$t('LK_QINGXUANZE')"
          v-model="transferModel"
          filterable
          clearable
      >
        <el-option
            :value="item.modelProtitesName"
            :label="item.modelProtitesName"
            v-for="(item, index) in []"
            :key="index"
        ></el-option>
      </iSelect>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save">{{ $t('LK_QUEREN') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iSelect, iButton, iMessage} from 'rise'
import {pageMixins} from "@/utils/pageMixins";
import {
  saveNewVersion
} from "@/api/ws2/budgetManagement/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    iButton
  },
  props: {
    title: {type: String, default: '转派'},
    value: {type: Boolean},
  },
  data() {
    return {
      transferModel: '',
      iDialogLoading: false,
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    clearDiolog2() {
    },
    save() {
      let _this = this
    },
  },
  watch: {}
}
</script>
<style lang='scss' scoped>
.iDialogSaveAs {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}
.title {
  position: relative;
  display: inline-block;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}
.newVersion{
  font-size: 14px;
  color: #000000;
  margin-bottom: 6px;
}

</style>

