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
      <el-form v-loading="dialogLoading">
        <el-form-item :label="language('LK_KESHI', '科室')">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              filterable
              clearable
              v-model="deptId"
              @change="changeDept"
          >
            <el-option
                :value="item.deptId"
                :label="item.commodity"
                v-for="(item, index) in handoverParams.departmentsList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="Linie">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              filterable
              clearable
              v-model="linieID"
          >
            <el-option
                :value="item.linieID"
                :label="item.linieName"
                v-for="(item, index) in linieList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <iButton @click="assignOneself" :loading='handoverSelfLoading'>{{ language('LK_ZHUANPAIZIJI', '转派自己') }}</iButton>
      <iButton @click="assign" :loading='saveLoading'>{{ language('LK_QUEREN', '确认') }}</iButton>
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
    title: {type: String, default: 'LK_ZHUANPAI'},
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

