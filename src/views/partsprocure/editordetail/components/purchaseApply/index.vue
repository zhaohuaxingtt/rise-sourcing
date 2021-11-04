<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-28 16:01:28
 * @LastEditTime: 2021-11-04 14:35:52
 * @LastEditors:  
-->
<template>
  <iDialog
    title="明细"
    :visible.sync="visibleDiolog"
    width="90%"
    @close="clearDiolog"
  >
    <iFormGroup row="4" :rules="rules" >
      <iFormItem v-for="(item, index) in detailTitle" :key="index" :label="item.label">
        <iText>{{detailList[item.props]}}</iText>
      </iFormItem>
    </iFormGroup>
  </iDialog>
</template>
<script>
import {iDialog, iFormGroup, iFormItem, iText} from 'rise' 
import {detailTitle} from './data'
import {getPurchaseDetail} from '@/api/partsprocure/editordetail'
export default {
  components: {
    iDialog,
    iFormGroup,
    iFormItem,
    iText
  },
  props: {
    visibleDiolog: {
      type: Boolean,
      default:false
    },
     item:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      detailTitle,
      detailList:{}
    }
  },
  watch:{
    'visibleDiolog':function(res) {
       if (res == true) this.init()
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('changeVisible',false)
    },
    init() {
      let data = {
        riseCode:this.item.riseCode,
        sapItem:this.item.sapItem,
      }
      console.log(data);
      getPurchaseDetail(data).then(res => {
        this.detailList = res.data[0]
      })
    }
  }
  
}
</script>
<style>
</style>
