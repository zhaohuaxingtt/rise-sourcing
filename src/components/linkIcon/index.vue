<!--
 * @Author: wentliao
 * @Date: 2021-07-29 17:36:06
 * @Description: 表单内公用的跳转icon
-->
<template>
    <span  class="icon-gray  cursor "  @click="openPage">
        <icon symbol class="show" name="icontiaozhuananniu" />
        <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
    </span>
</template>

<script>
import { icon } from 'rise';
export default {
    name:'linkIcon',
    components:{icon},
    methods:{
        openPage(){
            this.$emit('openPage');
        },
    }
}
</script>

<style lang="scss" scoped>
.icon-gray{
    cursor: pointer;
    .active{
        display: none;
    }
    .show{
        display: block;
    }
    &:hover{
        cursor: pointer;
        .show{
        display: none;
        }
        .active{
        display: block;
        }
    }
    
}
</style>