<!--
 * @Author: wentliao
 * @Date: 2021-09-26 15:42:46
 * @Description: 价格轴弹窗
-->
<template>
<iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="priceAxisDialog"
  >
    <div>
        我是价格轴弹窗
    </div>
  </iDialog>
</template>

<script>
import {
    iDialog,
} from 'rise';
export default {
    name:'priceAxisDialog',
    components:{
        iDialog,
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },  
    },
    data(){
        return{

        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','priceAxisVisible',false);
        },
    },
}
</script>

<style>

</style>