<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-28 16:01:28
 * @LastEditTime: 2021-10-28 18:03:42
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
      <iFormItem v-for="(item, index) in detailList" :key="index" :label="item.label">
        <iText>{{item.value}}</iText>
      </iFormItem>
    </iFormGroup>
  </iDialog>
</template>
<script>
import {iDialog, iFormGroup, iFormItem, iText} from 'rise' 
import {detailList} from './data'
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
     diolog:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      detailList
    }
  },
  created() {
    console.log(this.detailList);
  },
  methods: {
    clearDiolog() {
      this.$emit('changeVisible',false)
    }
  }
  
}
</script>
<style>
</style>
