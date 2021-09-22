<template>
    <div>
       <iTableCustom
       :data="tabledata"
       :columns="tabsetting"
       @handle-selection-change="handleSelectChange">
       </iTableCustom>
    </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import {tabsetting} from './data.js'
import {spiTotalScore} from '@/api/kpiChart'
export default {
    props:{
        tabledata:{
            type:Array,
            default:[]
        }
    },
    components:{
        iTableCustom
    },
    data(){
        return {
            tabsetting:tabsetting,
            tabledata:[...this.tabledata],
            idList:[]
        }
    },
    methods:{
        handleSelectChange(x){
            if(x.length>0){
                this.idList=[]
                x.forEach(x => {
                    this.idList.push(x.supplierId)
                })
            }
            this.$emit("returnScoreID",this.idList)
            this.$emit('returnSupplierName',x)
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>