<template>
    <iPage>
    <iCard>
        <div class="head">
            <div class="left">供应商市场总览<span>材料组编号-材料组名称</span></div>
            <div class="right">
                <iButton>编辑</iButton>
                <iButton @click="$router.go(-1)">返回</iButton>
            </div>
        </div>
        <!-- tittle -->
        <div class="moudle-tittle">
            <div class="module1"><img :src="statueImg" class="imgStatus"/>供应商财务状况</div>
            <div class="turnover">
                <div class="module2-left"><img class="imgStatus" :src="svwImg"/>营业额占比</div>
                <div>当前材料组占比: 11.00%</div>
            </div>
            <div class="module3"><img class="imgStatus" :src="userImg"/>供应商主要客户</div>
        </div>
        <list></list>
    </iCard>
    </iPage>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect} from 'rise'
import list from './components/list'
export default {
    data(){
        return {
            statueImg:require('./img/img.png'),
            svwImg:require('./img/note.png'),
            userImg:require('./img/user.png'),
        }
    },
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        list
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
    .head{
        display: flex;
        justify-content: space-between;
        .left{
            font-size: 22px;
            font-weight: bold;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span{
                margin-left: 20px;
                display: inline-block;
                font-size: 16px;
                opacity: 0.42;
            }
        }
    }
    .moudle-tittle{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 36px;
        margin-bottom: 17px;
        div{
            width: 33.33%;
        }
        .turnover{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right:30px;
            div{
                width: 50%;
            }
        }
    }
    .module1,.module2-left,.module3{
         display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .imgStatus{
            width:40px;
            height:40px;
            margin-right: 10px;
            display: inline-block;
        }
</style>