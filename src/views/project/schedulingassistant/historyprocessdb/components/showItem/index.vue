<!--
 * @Author: Luoshuang
 * @Date: 2021-08-03 10:39:24
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 11:31:10
 * @Description: 配置显示字段弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\historyprocessdb\components\showItem\index.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
  >
    <template slot="title">
      <div class="chosseProGroup">
        <span class="chosseProGroup-title">{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</span>
        <div>
          <iButton>{{language('QUANXUAN','全选')}}</iButton>
          <iButton>{{language('LK_CHONGZHI','重置')}}</iButton>
          <iButton>{{language('QUEREN','确认')}}</iButton>
        </div>
      </div>
    </template>
    <div class="checkList">
      <el-checkbox class="checkList-item" v-for="item in checkList" :key="item.key" :label="language(item.key, item.name)" :checked="item.isSelect" :disabled="item.disabled"></el-checkbox>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import { getBuyer, getFsUserList } from '@/api/project'
export default {
  components: { iDialog, iButton },
  props: {
    dialogVisible: { type: Boolean, default: false },
    checkList: { type: Array, default: () => [] }
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        //
      }
    }
  },
  data() {
    return {
      saveLoading: false,
      buyer: '',
      fsOptions: {},
      selectData: []
    }
  },
  methods: {
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (this.selectData.length < 1) {
        iMessage.warn('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据')
        return
      }
      this.saveLoading = true
      this.$emit('handleConfirm', this.selectData)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
.chosseProGroup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  &-title {
    font-size: 18px;
    font-weight: 600;
    color: #000
  }
}
.checkList {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  &-item {
    width: 18%;
    margin-bottom: 28px;
    display: flex;
    ::v-deep .el-checkbox__label{
      font-size: 18px;
    }
    ::v-deep .el-checkbox__inner {
      width: 20px;
      height: 20px;
      &::after {
        width: 5px;
        height: 10px;
        left: 6px;
      }
    }
    ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #4D4F5C;
    }
  }
}
</style>