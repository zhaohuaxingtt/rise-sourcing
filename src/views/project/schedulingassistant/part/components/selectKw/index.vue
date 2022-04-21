<!--
 * @Author: Luoshuang
 * @Date: 2021-10-20 13:55:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-15 09:57:53
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\part\components\selectKw\index.vue
-->

<template> 
  <iDialog  
    :title="language('JIHUASHIJIANXIUGAI', '计划时间修改')"
    :visible.sync="dialogVisible" 
    @close="clearDialog" 
    class="fsDialog"
    width="20%"
  > 
    <span slot="footer" class="dialog-footer">
      <iButton @click="handleCancel">{{language('QUXIAO','取消')}}</iButton>
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEDING','确定')}}</iButton> 
    </span>
    <el-cascader 
      :class="`kwChange margin-bottom20 ` "  
      :value="valueTemp.split('-KW')"  
      :options="option"  
      @change="handleChange" 
      separator="-KW" 
      popper-class="projectmgt-cascader-popper"
    ></el-cascader>
  </iDialog> 
</template> 

<script>
import { iDialog, iButton } from 'rise'
import moment from 'moment'
export default {
  components: { iDialog, iButton },
  props: {
    dialogVisible: {type:Boolean, default:false},
    value: {type:String, default: ''}
  },
  data() {
    return {
      option: [],
      valueTemp: ''
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.valueTemp = this.value || ''
      } else {
        this.valueTemp = ''
      }
    }
  },
  created() {
    this.option = this.initOption()
  },
  methods: {
    handleChange(val) { 
      // console.log('val', val)
      this.valueTemp = val.join('-KW') 
    }, 
    handleConfirm() {
      this.$emit('handleChange', this.valueTemp)
      this.clearDialog()
    },
    handleCancel() {
      this.$emit('handleChange', this.value)
      this.clearDialog()
    },
    /**
     * @Description: 初始化下拉框
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */    
    initOption() { 
      const option = [];
      // 当前日期往前十年和往后十年的区间可选
      const afterYear = (moment().year() - 10) || 1900;
      for(var i = afterYear; i <= moment().year() + 10; i++) { 
        const countMonth = moment(i+'-01-01').weeksInYear() 
        const children = [] 
        for(var j = 1; j <= countMonth; j++) { 
          children.push({value: j<10?'0'+j:j+'',label: j<10?'0'+j:j+''}) 
        } 
        option.push({value:i+'',label:i+'',children:children}) 
      } 
      return option 
    },
    clearDialog() { 
      this.valueTemp = ''
      this.$emit('changeVisible', false) 
    }, 
  }
}
</script>

<style lang="scss" scoped>
.kwChange {
  width: 100%;
}

</style>

<style lang="scss">
.projectmgt-cascader-popper {
  .el-cascader-panel, .el-cascader-menu__wrap{
    height: 300px;
  }
}
</style>