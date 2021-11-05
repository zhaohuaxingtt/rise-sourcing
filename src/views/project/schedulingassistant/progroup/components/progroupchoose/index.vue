<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 11:23:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-08 14:05:23
 * @Description: 选择产品组弹窗
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\progroupchoose\index.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
  >
    <template slot="title">
      <div class="chosseProGroup">
        <span class="chosseProGroup-title">{{language('XUANZECHANPINZU','选择产品组')}}</span>
        <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEDING','确定')}}</iButton>
      </div>
    </template>
    <el-transfer 
      class="chooseProGroupTransfer"
      v-model="selectValue"
      :data="allData"
      :titles="[' ',' ']"
      target-order="push"
      :format="{ noChecked: '${total}项', hasChecked: '${checked}/${total}项' }"
    >
      <div class="transfer-footer" slot="left-footer">{{language('WEIXUANZECHANPINZU', '未选择产品组')}}</div>
      <div class="transfer-footer" slot="right-footer">{{language('YIXUANZECHANPINZU', '已选择产品组')}}</div>
    </el-transfer>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
export default {
  components: { iDialog, iButton },
  props: {
    dialogVisible: { type: Boolean, default: false },
    allData: {type:Array, default: () => []},
    selectValue: {type:Array, default: () => []}
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        // this.reasonDescription = ''
      }
    }
  },
  data() {
    return {
      saveLoading: false
    }
  },
  methods: {
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      // console.log(this.selectValue)
      this.saveLoading = true
      this.$emit('handleConfirm', this.selectValue)
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
.chooseProGroupTransfer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
  ::v-deep .el-transfer-panel {
    width: 40%;
    display: flex;
    flex-direction: column-reverse;
    .el-transfer-panel__header {
      background: transparent;
      border-top: 1px solid #EBEEF5;
      .el-checkbox .el-checkbox__label span {
        font-size: 16px;
        color: #41434A;
        font-weight: normal;
        position: relative;
        right: unset;
      }
    } 
    .el-transfer-panel__body {
      height: 310px;
    }
    .el-transfer-panel__list {
      height: 310px;
    }
    .el-transfer-panel__footer {
      position: relative;
      border-bottom: 1px solid #EBEEF5;
      background: rgba(233, 235, 239, .5);
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      padding-left: 18px;
    }
  }
  ::v-deep .el-transfer__buttons {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    .el-transfer__button {
      margin-left: 0;
      height: 36px;
      width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        margin-bottom: 0px;
      }
      &:last-child {
        margin-bottom: 20px;
      }
      i, span {
        font-size: 18px;
      }
      &.is-disabled {
        border-color: rgba(96, 104, 119, 0.3);
        color: rgba(96, 104, 119, 0.3);
        background-color: #fff;
      }
    }
  }
  ::v-deep .el-transfer-panel__item {
    margin: 10px 0;
    .el-transfer-panel .el-checkbox__inner {
      width: 18px;
      height: 18px;
    }
    .el-checkbox__label {
      font-size: 16px;
    }
  }
}
</style>