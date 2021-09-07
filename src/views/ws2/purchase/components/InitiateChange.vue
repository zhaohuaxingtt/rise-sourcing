<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" top="0" @close='clearDiolog' class="iDialogCon">
    <div slot="title" class="title">
      <div class="text">
        {{ $t(title) }}
      </div>
    </div>
    <div class="changeContent">
      请注意，发起变更后不可撤回，请确认是否继续发起变更
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>{{ $t('LK_QUEREN') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iSearch, iInput, iButton, icon, iMessage} from 'rise'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {
  addBmChangeList
} from "@/api/ws2/purchase/changeTask";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
  },
  props: {
    title: {type: String, default: '提示'},
    value: {type: Boolean},
    content: {type: String, default: ''},
    bmParams: {type: Array, default: () => []},
  },
  data() {
    return {
      conversionVal: '',
      saveLoading: false,
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      this.saveLoading = true
      addBmChangeList(this.bmParams).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          if(res.data.isPermission){
            this.$emit('input', false)
            this.$emit('InitiateChangeClose')
            iMessage.success(result)
          } else {
            iMessage.error(res.data.bmSerial.join(',') + this.language('LK_CHUYUBIANGENGLIUCHENGZHONG', '处于变更流程中，不可重复发起变更'))
          }
        } else {
          // this.findBmNewChangePageList()
          iMessage.error(result)
        }
        this.saveLoading = false
      }).catch(err => {
        this.saveLoading = false
      })
    },
  },
  watch: {}
}
</script>
<style lang='scss' scoped>
.iDialogCon {
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
    .icon {
      cursor: pointer;
    }
  }

  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding-bottom: 30px;
  font-size: 14px;
  p{
    color: #000000;
    margin-bottom: 6px;
  }
  ::v-deep .el-input{
    width: calc(100% - 20px);
  }
  ::v-deep .card {
    box-shadow: none;
    border-radius: 0;
    background: none;

    .cardBody {
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .iSearch-content {
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

