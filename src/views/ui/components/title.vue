<!--
 * @Author: yuszhou
 * @Date: 2020-07-27 18:21:20
 * @LastEditTime: 2020-08-03 20:17:47
 * @LastEditors: Please set LastEditors
 * @Description: ui界面头部管理
 * @FilePath: \test\src\views\ui\components\title.vue
--> 

<template>
<div class="title">
    <div class="font18 padding10">{{title}}</div>
    <div class="padding10">
        <slot name='components'></slot>
        <slot name='code'></slot>
    </div>
</div>
</template>
<script>
export default{
    props:{
        title:{
            type:String,
            default:'title'
        }
    }
}
</script>
<style lang='scss' scoped>
</style>