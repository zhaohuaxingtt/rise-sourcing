<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 20:14:24
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-25 11:01:17
 * @Description: 添加规则弹窗
 * @FilePath: \front-web\src\views\designate\defaultLogic\addRule.vue
-->

<template>
  <iDialog
    title="添加规则"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="690px"
  >
    <template slot="footer">
      <iButton @click="handleAddRule" :disabled="rules.length > 4">添加条件</iButton>
      <iButton @click="handleSave">保存</iButton>
    </template>
    <el-form class="add-rule-form">
      <el-form-item label="预设定点类型" >
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="ddType" >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
    <el-form v-for="(item, index) in rules" :key="index" class="add-rule-form" >
      <el-form-item :label="'条件'+(index+1)" >
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="item.input1" :disabled="index < 1">
          <el-option
            v-for="item in input1Options"
            :disabled="item.disabled"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item v-if="item.input1 !== ''" :label="' '">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="item.input2">
          <el-option
            v-for="item in (index > 0 ? input2Options : partTypeOptions)"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item v-if="item.input1 !== '' && item.input1 !== 'option1'" :label="' '">
        <iInput :placeholder="$t('LK_QINGSHURU')" v-model="item.input3" type="number" oninput="if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+5)}"></iInput>
      </el-form-item>
      <icon v-if="index > 0" symbol name="icondingdianshenqingyusheluoji-shanchu" @click.native="handleDeleteRule(index)" class="delete-icon cursor"></icon>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, icon } from 'rise'
export default {
  components: { iDialog, iButton, iSelect, iInput, icon },
  props: {
    dialogVisible: {type: Boolean, default: false}
  },
  data() {
    return {
      ddType: '',
      rules: [
        {input1: 'option1', input2: '', input3: ''}
      ],
      partTypeOptions: [{
        value: 'option1',
        label: 'FS零件'
      }, {
        value: 'option2',
        label: 'Special零件'
      }],
      typeOptions: [{
        value: 'option1',
        label: '上会'
      }, {
        value: 'option2',
        label: '流转'
      }, {
        value: 'option3',
        label: '备案'
      }],
      input1Options: [{
        value: 'option1',
        label: '零件采购项目类型',
        disabled: true
      }, {
        value: 'option2',
        label: '单价'
      }, {
        value: 'option3',
        label: 'TTO'
      }],
      input2Options: [{
        value: 'option1',
        label: '大于'
      }, {
        value: 'option2',
        label: '小于'
      }, {
        value: 'option3',
        label: '不大于'
      }, {
        value: 'option4',
        label: '不小于'
      }]
    }
  },
  methods: {
    /**
     * @Description: 清除弹框
     * @param {*}
     * @return {*}
     */    
    clearDialog() {
      this.$emit('changeVisible', false)
    },
    /**
     * @Description: 添加条件按钮点击事件
     * @param {*}
     * @return {*}
     */    
    handleAddRule() {
      this.rules.push({input1: '', input2: '', input3: ''})
    },
    /**
     * @Description: 保存已经添加的条件
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.clearDialog()
    },
    /**
     * @Description: 删除添加的条件
     * @param {*} deleteIndex
     * @return {*}
     */    
    handleDeleteRule(deleteIndex) {
      this.rules = this.rules.filter((item, itemIndex) => {
        return itemIndex !== deleteIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-rule-form {
  height: 90px;
  position: relative;
  ::v-deep .el-form-item {
    margin-bottom: 2px;
    width: 220px;
    float: left;
    margin-right: 40px;
    padding-left: 2px;
    padding-top: 5px;
    padding-bottom: 5px;

    .el-form-item__label {
      height: 14px;
      font-size: 14px;
      color: $color-black;
      font-weight: 400;
      line-height: 14px;
      margin-bottom: 8px;
    }

    .el-form-item__content {
      line-height: inherit;
    }
  }
  .delete-icon {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 0;
    top: 35px;
    border: 1px solid #000;
  }
}
</style>