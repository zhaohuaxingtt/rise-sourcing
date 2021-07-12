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
    <p class="newVersion">新版本命名</p>
    <div class="changeContent">
      <div>PSK</div>
      <iInput v-model="saveParams.version" :placeholder="language('LK_QINGSHURU','请输入')" maxlength="5"></iInput>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save">{{ language('LK_QUEREN','确认') }}</iButton>
    </span>
    <iDialog title="是否确定保存为新版本？" :visible.sync="value2" width="381px" @close='clearDiolog2' v-loading="iDialogLoading2"
             :modal-append-to-body="true" append-to-body>
      <span slot="footer" class="dialog-footer">
        <iButton @click="value2 = false">{{ language('LK_QUXIAO','取 消') }}</iButton>
        <iButton @click="save2">{{ language('LK_QUEREN','确认') }}</iButton>
      </span>
    </iDialog>
  </iDialog>
</template>
<script>
import {iDialog, iInput, iButton, iMessage} from 'rise'
import {pageMixins} from "@/utils/pageMixins";
import {
  saveNewVersion
} from "@/api/ws2/budgetManagement/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iButton
  },
  props: {
    title: {type: String, default: 'LK_BAOCUNWEIXINBANBEN'},
    value: {type: Boolean},
    saveParams: {
      type: Object, default: () => {
      }
    },
  },
  data() {
    return {
      conversionVal: '',
      iDialogLoading: false,
      value2: false,
      iDialogLoading2: false
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    clearDiolog2() {
      this.value2 = false
    },
    save() {
      let _this = this
      this.value2 = true

    },
    save2(){
      this.iDialogLoading2 = true
      saveNewVersion(this.saveParams).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          // this.findInvestmentList()
          iMessage.success(result);
          this.value2 = false
          this.$emit('input', false)
          this.$emit('refresh')
        } else {
          iMessage.error(result);
        }
        this.iDialogLoading2 = false
      }).catch(() => {
        this.iDialogLoading2 = false
      });

    }
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
}
.changeContent {
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;

  .el-input {
    width: calc(100% - 50px);
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

