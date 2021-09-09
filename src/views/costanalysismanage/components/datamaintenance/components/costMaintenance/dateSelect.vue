<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:15
 * @LastEditTime: 2021-09-09 17:47:44
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\components\costMaintenance\dateSelect.vue
-->
<template>
      <iDialog :title="language('SHANGCHUAN','上传')" :visible.sync="value" width="400px" @close='clearDiolog' top="40vh">
        <p class="tip margin-bottom10">{{ language('QXZJYSCDRGCBSSNF','请选择将要上传的人工成本所属年份') }}</p>
        <iDatePicker  type="year" v-model="date" value-format="yyyy" :picker-options="pickerOptions" ></iDatePicker>
        <span slot="footer" class="dialog-footer">
          <iButton :loading='repeatClick' @click="sureChangeItems">{{language('LK_QUEREN','确认')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iButton,iDatePicker,iDialog} from 'rise'
export default{
  components:{iButton,iDatePicker,iDialog},
  props:{
    value:{type:Boolean},
  },
  data(){
      return {
        date:"",
        pickerOptions: {
         disabledDate(time) {
               let currentYear = new Date().getTime()
               return time.getTime() > currentYear;
            }
      },
    }
  },
  methods:{
    clearDiolog(){
      this.$emit('input',false)
    },
    sureChangeItems(){
      this.$emit('sure',this.date)
    }    
  }
}
</script>
<style lang='scss' scoped>
  
</style>
