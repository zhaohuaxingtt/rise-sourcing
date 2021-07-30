<template>
    <div>
       <iTableCustom
       :data="tabledata"
       :columns="tabsetting">
       </iTableCustom>
    </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import {tabsetting} from './data.js'
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
            tabledata:[...this.tabledata]
        }
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>