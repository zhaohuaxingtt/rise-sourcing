<!--
 * @Author: Luoshuang
 * @Date: 2021-08-03 10:39:24
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-23 17:17:46
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
          <iButton @click="handleAllSelect">{{language('QUANXUAN','全选')}}</iButton>
          <iButton @click="handleReset">{{language('LK_CHONGZHI','重置')}}</iButton>
          <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEREN','确认')}}</iButton>
        </div>
      </div>
    </template>
    <div class="checkList">
      <el-checkbox 
        class="checkList-item" 
        :style="`width:${item.checkWidth ? item.checkWidth : '18%'}`" 
        v-for="item in list" 
        :key="item.key" 
        :label="language(item.key, item.name)" 
        v-model="item.isSelect" 
        :disabled="disabledColumn.includes(item.key)"
      >
      </el-checkbox>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from 'rise'
import { updateFields } from '@/api/project'
export default {
  components: { iDialog, iButton },
  props: {
    dialogVisible: { type: Boolean, default: false },
    checkList: { type: Array, default: () => [] },
    type: {type:String},
    disabledColumn: {type: Array, default: () => []},
    defaultColumn: {type: Array, default: () => []},
  },
  watch:{
    checkList: {
      handler() {
        // eslint-disable-next-line no-undef
        this.list = _.cloneDeep(this.checkList)
      },
      deep: true
    }
  },
  data() {
    return {
      saveLoading: false,
      buyer: '',
      fsOptions: {},
      selectData: [],
      // eslint-disable-next-line no-undef
      list: _.cloneDeep(this.checkList)
    }
  },
  methods: {
    handleConfirm() {
      this.saveLoading = true
      const params = {
        type: this.type,
        fieldList: this.list.filter(item => item.isSelect).map(item => item.key)
      }
      updateFields(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$emit('changeVisible', false)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    handleReset() {
      this.list = this.list.map(item => {
        return {
          ...item,
          isSelect: this.defaultColumn.includes(item.key) ? true : false
        }
      })
    },
    handleAllSelect() {
      this.list = this.list.map(item => {
        return {
          ...item,
          isSelect: true
        }
      })
    },
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
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