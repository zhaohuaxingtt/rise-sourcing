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
      请注意，发起变更后不可撤回，请确认是否继续发起变更?
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="assign" :loading='saveLoading'>{{ language('LK_QUEREN', '确认') }}</iButton>
      <iButton @click="clearDiolog">{{ language('LK_QUXIAO', '取消') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iSearch, iSelect, iInput, iButton, icon, iMessage} from 'rise'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {
  liniePullDownByDept,
  assign,
  assignOneself,
} from "@/api/ws2/purchase/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
    iSelect
  },
  props: {
    title: {type: String, default: 'LK_FAQIBIANGENG'},
    value: {type: Boolean},
    handoverParams: {
      type: Object,
      default: () => ({
            bmid: [],
            moldInvestmentStatus: [],
            departmentsList: [],
      })
    },
  },
  data() {
    return {
      deptId: '',
      linieID: '',
      linieList: [],
      conversionVal: '',
      handoverSelfLoading: false,
      saveLoading: false,
      dialogLoading: false,
    }
  },
  mounted() {

  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      this.$emit('input', false)
      this.$emit('conversionSave', this.conversionVal)
    },
    changeDept(val){
      if(val){
        this.linieID = ''
        this.liniePullDownByDept()
      }
    },
    liniePullDownByDept(){
      this.dialogLoading = true
      liniePullDownByDept({deptId: this.deptId}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.linieList = res.data
        } else {
          iMessage.error(result);
        }
        this.dialogLoading = false
      }).catch(() => {
        this.dialogLoading = false
      });
    },
    assign(){
      this.saveLoading = true
      assign({
        bmid: this.handoverParams.bmid,
        deptId: this.deptId,
        linieID: this.linieID,
        moldInvestmentStatus: this.handoverParams.moldInvestmentStatus,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.$emit('input', false)
          this.$emit('handoverClose')
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      });
    },
    assignOneself(){
      this.handoverSelfLoading = true
      assignOneself().then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.linieID = res.data.linieID
          this.deptId = res.data.deptId
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.handoverSelfLoading = false
      }).catch(() => {
        this.handoverSelfLoading = false
      });
    },
  },
  watch: {
    value(val){
      if(val){
        this.liniePullDownByDept()
      }
    }
  }
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

