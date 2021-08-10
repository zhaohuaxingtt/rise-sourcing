<template>
    <iPage>
    <div>
        <div class="head">
            <div class="left">SVW供应商市场总览<span>材料组编号-材料组名称</span></div>
            <div class="right">
                <iButton>编辑</iButton>
                <iButton @click="$router.go(-1)">返回</iButton>
            </div>
        </div>
    </div>
    </iPage>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect} from 'rise'
export default {
    data(){
        return {

        }
    },
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect
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
            
            span{
                margin-left: 20px;
                display: inline-block;
                font-size: 16px;
                opacity: 0.42;
            }
        }
    }
</style>