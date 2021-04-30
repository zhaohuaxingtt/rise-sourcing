<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" @close='clearDiolog'>
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <div class="changeContent">
      <iInput v-model="saveParams.version" placeholder="请输入" maxlength="5"></iInput>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>确认</iButton>
    </span>
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
    title: {type: String, default: '请您使用PSK版本号进行命名'},
    value: {type: Boolean},
    saveParams: {type: Object, default: () => {}},
  },
  data() {
    return {
      conversionVal: ''
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      // this.tableLoading = true
      saveNewVersion(this.saveParams).then((res) => {
        if (Number(res.code) === 0) {
          // this.findInvestmentList()
          iMessage.success(res.desZh);
        } else {
          iMessage.error(res.desZh);
          // this.tableLoading = false
        }
      }).catch(() => {
        // this.tableLoading = false
      });
      this.$emit('input', false)
    },
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

.changeContent {
  padding-bottom: 30px;

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

