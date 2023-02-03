<!--
 * @Author: wentliao
 * @Date: 2022-02-18 17:00:19
 * @Description: 顶部tab
-->
<template>
    <div class="pdfHeader">
        <p class="preview-title margin-top20 margin-bottom20">CSC Nomination Recommendation</p>
        <div class="exportPdfTab">
            <ul>
                <li v-for="(item,index) in decisionType"  class="item" :key="index+'decisionType'">
                    <span :class="value==item.path ? 'currentTab' : ''">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { decisionType } from '@/layout/nomination/components/data'
export default {
    name:'exportPdfTab',
    props:{
        value:{
            type:String,
            default:'',
        }
    },
    data(){
        return{
            decisionType,
        }
    }
}
</script>

<style lang="scss" scoped>
    .pdfHeader{
        .preview-title{
            font-size: 20px;
            font-weight: bold;
        }
        .exportPdfTab{
            border-bottom: 2px solid #E4E7ED;
            margin-bottom: 20px;
            margin-top: 20px;
            ul{
                display:flex;
                li{
                    color: #303133;
                    line-height: 30px;
                    position: relative;
                    font-size: 14px;
                    font-weight: bold;
                    &:first-child{
                        margin-right: 20px;
                    }
                    font-size: 14px;
                    &:not(:first-child){
                        margin: 0 20px;
                    }
                    .currentTab{
                        color:#1763F7;
                    }
                    .currentTab::after{
                        content: "";
                        display: block;
                        width: 100%;
                        height: 2px;
                        background: #1763F7;
                        position: absolute;
                        bottom: -2px;
                        left: 0;
                    }
                }
            }
        }
    }
</style>