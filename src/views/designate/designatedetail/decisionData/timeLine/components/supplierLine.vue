<!--
 * @Author: wentliao
 * @Date: 2021-05-25 10:17:35
 * @Description: 渐变的时间线
-->
<template>
    <div class="supplier-line" :style="{'marginLeft':left}">
        <p class="supplier-item-time">{{dateTime}}</p>
        <p class="supplier-item-line" :style="{width:percent}"></p>
    </div>
</template>

<script>
export default {
    name:'supplier',
    props:{
        left:{
            type: String,
            default:'0'
        },
        dateTime:{
            type:String,
            default:''
        },
        percent:{
            type: String,
            default:'100%'
        }
    },
    data(){
        return{

        }
    }
}
</script>

<style  lang="scss" scoped>
    .supplier-line{
        width: 600px;
        .supplier-item-time{
            font-size: 10px;
            color: #0D2451;
        }
        .supplier-item-line{
            display: inline-block;
            height: 8px;
            border-radius: 8px;
            background: linear-gradient(to right,#93ACFF,#0056FF);
            opacity: .5;
        }
        
    }
</style>