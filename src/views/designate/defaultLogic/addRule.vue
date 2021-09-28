<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 20:14:24
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-21 10:52:28
 * @Description: 添加规则弹窗
 * @FilePath: \front-web\src\views\designate\defaultLogic\addRule.vue
-->

<template>
  <iDialog
    :title="language('LK_TIANJIAGUIZE','添加规则')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
  >
    <template slot="footer">
      <iButton @click="handleAddRule" :disabled="rules.length > 4">{{language('LK_TIANJIATIAOJIAN','添加条件')}}</iButton>
      <iButton @click="handleSave" :loading="loading">{{language('LK_BAOCUN','保存')}}</iButton>
    </template>
    <el-form class="add-rule-form">
      <el-form-item :label="language('LK_YUSHEDINGDIANLEIXING','预设定点类型')" >
        <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="ddType" >
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
      <el-form-item :label="language('LK_TIAOJIAN','条件') +(index+1)" >
        <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="item.input1" :disabled="index < 1">
          <el-option
            v-for="item in input1Options"
            :disabled="item.disabled || alreadyExsist(item.value)"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item v-if="item.input1 !== ''" :label="' '">
        <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="item.input2" @change="val => handleSelectChange(val, item)">
          <el-option
            v-for="item in (item.input1 === 0 ? partTypeOptions : item.input1 === 4 ? tradeOptions : input2Options )"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item v-if="item.input1 !== '' && item.input1 !== 0 && item.input1 !== 4" :label="' '">
        <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="item.input3" type="number" oninput="if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+5)}"></iInput>
      </el-form-item>
      <icon v-if="index > 0" symbol name="icondingdianshenqingyusheluoji-shanchu" @click.native="handleDeleteRule(index)" class="delete-icon cursor"></icon>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, icon, iMessage } from 'rise'
import { getDictByCode } from '@/api/dictionary'
import { applyType } from '@/layout/nomination/components/data'
import { findFuelTypeList } from '@/api/designate/defaultLogic/index'
export default {
  components: { iDialog, iButton, iSelect, iInput, icon },
  props: {
    dialogVisible: {type: Boolean, default: false}
  },
  created() {
    getDictByCode('PPT').then(res => {
      if (res?.result) {
        this.partTypeOptions = res.data[0].subDictResultVo.map(item => {
          return {value: item.code, label: item.name}
        })
      }
    })
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.init()
      }
    }
  },
  data() {
    return {
      loading: false,
      ddType: '',
      rules: [
        {input1: 0, input2: '', input3: ''}
      ],
      tradeOptions: [],
      partTypeOptions: [{
        value: 'option1',
        label: 'FS零件'
      }, {
        value: 'option2',
        label: 'Special零件'
      }],
      input1Options: [{
        value: 0,
        label: '零件采购项目类型',
        disabled: true
      }, {
        value: 1,
        label: '单价'
      }, {
        value: 2,
        label: 'TTO'
      }, {
        value: 3,
        label: 'TO Per Year'
      }, {
        value: 4,
        label: '燃料类型',
      }],
      input2Options: [{
        value: 2,
        label: '大于'
      }, {
        value: 1,
        label: '小于'
      }, {
        value: 3,
        label: '不大于'
      }, {
        value: 4,
        label: '不小于'
      }]
    }
  },
  computed: {
    typeOptions() {
      return applyType.map(item => {return {value: item.id, label: item.name}})
    }
  },
  methods: {
    getFuelType(val) {
      findFuelTypeList(val).then(res => {
        if (res?.result) {
          this.tradeOptions = res.data.map(item => {return {value: item, label: item}})
        }
      })
    },
    /**
     * @Description: 下拉框选择修改
     * @Author: Luoshuang
     * @param {*} val
     * @param {*} item
     * @return {*}
     */    
    handleSelectChange(val, item) {
      console.log(this)
      if(item.input1 === 0 && val) {
        this.getFuelType(val)
      }
    },
    /**
     * @Description: 修改保存按钮的loading状态
     * @Author: Luoshuang
     * @param {*} loading
     * @return {*}
     */    
    changeSaveLoading(loading) {
      this.loading = loading
    },
    /**
     * @Description: 初始化弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      this.loading = false
      this.rules = [
        {input1: 0, input2: '', input3: ''}
      ]
      this.ddType = ''
    },
    /**
     * @Description: 看下拉框中的值是否已被选择(这里主要是看车型燃料是否已选择，若已选择则不能再选)
     * @Author: Luoshuang
     * @param {*} type
     * @return {*}
     */    
    alreadyExsist(type) {
      if (type === 4) {
        if (this.rules.some(item => item.input1 === type)) {
          return true
        }
      }
      return false
    },
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
      if(this.ddType === '') {
        iMessage.warn(this.language('LK_QINGXUANZEYUSHEDINGDIANLEIXING','请选择预设定点类型'))
        return
      }
      if(this.rules.some(item => {
        if(item.input1 === '') {
          return true
        } else if(item.input2 === '') {
          return true
        } else if([1,2,3].includes(item.input1) && item.input3 === '') {
          return true
        }
        return false
      })) {
        iMessage.warn(this.language('LK_QINGJIANGGUIZETIANXIEWANZHENG','请将规则填写完整'))
        return
      }

      this.loading = true
      console.log(this.rules);
      const params = {
        fuelTypeValue: this.rules.filter(item => item.input1 === 4).input2,
        nomiType: this.ddType,
        partTermType: this.rules[0].input2,
        presetLogic:this.rules.filter(item => item.input1 != 4).reduce((accu, curr, index) => {
          if(index === 0) {
            return accu
          }
          const data = curr.input1 === 4 ? {
            isFuelTypeInuse: 1,
            fuelTypeValue: curr.input2
          } : {
            conditionType: curr.input1,
            logicType: curr.input2,
            conditionValue: curr.input3
          }
          return [...accu, data]
        },[])
      }
      this.$emit('handleSave', params)
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
    // border: 1px solid #000;
  }
}
</style>