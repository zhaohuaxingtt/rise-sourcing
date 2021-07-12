<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" top="0" @close='clearDiolog'
           v-loading="iDialogLoading" class="iDialogSaveAs"
           :modal-append-to-body='false'>
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <p class="newVersion">采购员</p>
    <div class="changeContent">
      <iSelect
          :placeholder="$t('partsprocure.PLEENTER')"
          v-model="applyUserId"
          filterable
          clearable
      >
        <el-option
            :value="item.userID"
            :label="item.userName"
            v-for="(item, index) in applyUserIdList"
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
import {assign} from "@/api/ws2/budgetApproval";

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
    applyUserIdList: {type: Array, default: () => []},
    multipleSelection: {type: Array, default: () => []},
  },
  data() {
    return {
      applyUserId: '',
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
      this.iDialogLoading = true
      assign({
        applyIds: this.multipleSelection.map(item => item.id),
        assignId: this.applyUserId
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.$emit('input', false)
          this.$emit('refresh')
        } else {
          iMessage.error(result);
        }
        this.iDialogLoading = false
      }).catch(() => {
        this.iDialogLoading = false
      });
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

.newVersion {
  font-size: 14px;
  color: #000000;
}

.changeContent {
  margin-top: 6px;
  margin-bottom: 20px;
}

</style>

