<!--
 * @Author: wentliao
 * @Date: 2021-09-23 11:07:36
 * @Description: 指定车型项目弹窗
-->

<template>
  <iDialog
    :title="language('LK_AEKO_ZHIDINGTOUZICHEXINGXIANGMU','指定投资⻋型项⽬')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="investCarTypeProDialog"
  >
      我是指定车型项目弹窗
  </iDialog>
</template>

<script>
import {
  iDialog,
} from 'rise';
export default {
    name:'investCarTypeProDialog',
    components:{
      iDialog,
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','investCarTypeProVisible',false);
        },
    }
    
}
</script>

<style>

</style>