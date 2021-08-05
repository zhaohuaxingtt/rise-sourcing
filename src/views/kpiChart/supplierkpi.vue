<template>
    <div>
        <iPage>
            <div class="head">
                <div class="head-left">
                    
                </div>
                <div class="head-right">
                    <div class="head-right-tittle">
                        <div class="fontbold">供应商筛选结果</div>
                        <iButton>{{$t('LK_QUEREN')}}</iButton>
                    </div>
                    <supplierTable :tabledata="tabledata"></supplierTable>
                </div>
            </div>
            <div class="foot">
                <div class="kpichart"><div class="tittle">总分</div><kpiEchart></kpiEchart></div>
                <div class="kpichart"><div class="tittle">服务质量</div><kpiEchart></kpiEchart></div>
                <div class="kpichart"><div class="tittle">成本竞争力</div><kpiEchart></kpiEchart></div>
                <div class="kpichart"><div class="tittle">交付</div><kpiEchart></kpiEchart></div>
            </div>
        </iPage>
    </div>
</template>

<script>
import kpiEchart from './components/kpiEchart'
import supplierTable from './components/supplierTable'
import {iButton,iPage} from 'rise'
export default {
    components:{
        kpiEchart,
        supplierTable,
        iButton,
        iPage
    },
    data(){
        return {
            tabledata:[{
                supplierName:'aaa'
            }]
        }
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .head{
        width: 100%;
        height: 414px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .head-left{
            width: calc(76% - 20px);
            height: 100%;
            background: #fff;
            border-radius: 10px;
        }
        .head-right{
            width: 24%;
            height: 100%;
            padding: 30px 40px 0 40px;
            overflow-y: auto;
            background: #fff;
             border-radius: 10px;
            .head-right-tittle{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 20px;
                .fontbold{
                    font-weight: bold;
                }
            }
        }
    }
    .foot{
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        .kpichart{
            width: calc(25% - 20px);
            .tittle{
                font-weight: bold;
                width: 100%;
                font-size: 16px;
                padding-left: 20px;
            }
        }
    }
</style>