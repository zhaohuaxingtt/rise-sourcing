<!--
 * @Author: wentliao
 * @Date: 2021-05-24 11:39:32
 * @Description: 决策资料-timeLine
-->
<template>
    <div class="decision-data-timeLine">
        <iCard collapse title="Material Group 1">
            <groupStep/>
            <!-- 供应商card -->
            <div class="supplier-list">
                <iCard collapse title="Supplier 1" class="supplier-item">
                    <template slot="header-control">
                        <supplierStep/>
                    </template>
                    <div>
                        <p>供应商card</p>
                        <p>供应商card</p>
                        <p>供应商card</p>
                        <p>供应商card</p>
                        <p>供应商card</p>
                        <p>供应商card</p>
                    </div>
                </iCard>
            </div>
        </iCard>
    </div>
</template>

<script>
import {
  iCard,
  iButton,
} from "rise";
import groupStep from './components/groupStep'
import supplierStep from './components/supplierStep'
export default {
    name:'timeLine',
     components:{
        groupStep,
        supplierStep,
        iCard,
        iButton,
    },
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
.decision-data-timeLine{
    .supplier-list{
        margin-top: 30px;
        .supplier-item{
            position: relative;
            ::v-deep .cardHeader{
                .collapse{
                    position: absolute;
                    left: -5px;
                    top: 43px;
                }
            }
        }
    }
}
</style>