<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" @close='clearDiolog' v-loading="iDialogLoading"
           :modal-append-to-body='false'>
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <p class="newVersion">新版本命名</p>
    <div class="changeContent">
      <div>PSK</div>
      <iInput v-model="saveParams.version" placeholder="请输入" maxlength="5"></iInput>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save">确认</iButton>
    </span>
    <iDialog title="是否确定保存为新版本？" :visible.sync="value2" width="381px" @close='clearDiolog2' v-loading="iDialogLoading2"
             :modal-append-to-body="true" append-to-body>
      <span slot="footer" class="dialog-footer">
        <iButton @click="value2 = false">取消</iButton>
        <iButton @click="save2" :loading='saveLoading'>确认</iButton>
      </span>
    </iDialog>
  </iDialog>
</template>
<script>
import {iDialog, iSearch, iInput, iButton, iMessage} from '@/components'
import {pageMixins} from "@/utils/pageMixins";
import {
  saveNewVersion
} from "@/api/priceorder/stocksheet/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSearch,
    iInput,
    iButton
  },
  props: {
    title: {type: String, default: '保存为新版本'},
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
      value2: false
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
      this.saveLoading = true
      saveNewVersion(this.saveParams).then((res) => {
        if (Number(res.code) === 0) {
          // this.findInvestmentList()
          iMessage.success(res.desZh);
          this.value2 = false
          this.$emit('input', false)
          this.$emit('refresh')
        } else {
          iMessage.error(res.desZh);
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      });

    }
  },
  watch: {}
}
</script>
<style lang='scss' scoped>
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

