<template>
        <table class="customTab" cellspacing="0" cellpadding="0">
            <tr class="tbheard">
                <td v-for="(x,index) in tableTittle" :key="index">
                    <div  :class="dashedStatus(index)" >{{x.label}}
                    <i :class="iconStatus(x,index)" @click="handleFold"></i></div></td>
            </tr>
            <tr v-for="(tData,indexData) in tableData" :key="indexData+'body'">
                <td v-for="(title,index) in tableTittle" :key="index+'t'">
                    <div>{{valuePropetype(tData,title)}}</div>
                </td>
            </tr>
        </table>
</template>

<script>
import { iCard } from 'rise'

export default {
    components:{
        iCard
    },
    props:{
        tabelTittle:{
            type:Array,
            default:()=>[]
        },
        tableDataBefore:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return {
            isFold:false,
            tabSetting:this.tabelTittle,
            tableTittle:[],
            tableDataBefore:this.tableDataBefore,
            tableData:[],
        }
    },
    created() {
      this.tableTittle = window._.cloneDeep(this.tabSetting)
      this.tableData = window._.cloneDeep(this.tableDataBefore)
    },
    mounted(){
        this.handleFold()
    },
    methods:{
        handleFold(){
            this.isFold=!this.isFold
            const startIdx = this.tabSetting.findIndex(x=>{return x.start==true})
            const endtIdx = this.tabSetting.findIndex(x=>{return x.start==false})
            if(this.isFold){
                let lessdata = []
                let tbdata = []
                this.tableTittle.forEach((x,index)=>{
                    if(index<startIdx+1 || index>endtIdx){
                        lessdata.push(x)
                    }else{
                        this.tableData[index]
                    }
                })
                this.tableTittle=lessdata
               
            }else{
                this.tableTittle=JSON.parse(JSON.stringify(this.tabSetting))
            }
            
        },
        iconStatus(x){
            if(x.icon){
                if(this.isFold){
                   if(x.start){
                        return 'el-icon-plus'
                    }else{
                        return ''
                    } 
                }else{
                    if(x.start){
                        return ''
                    }else{
                        return 'el-icon-minus'
                    }
                }
            }
            
        },
        dashedStatus(x){
            let idxstar= this.tableTittle.findIndex(x=>{return x.start==true})
            let idxend = this.tableTittle.findIndex(x=>{return x.start==false})
            if(x==idxstar || x>idxstar){
                if(x<idxend){
                    return 'dash-right'
                }else{
                    return ''
                }
            }else{
                return ''
            }
        },
        valuePropetype(tData,obj){
            if(JSON.stringify(tData) !== "{}"){
                for (const key in tData) {
                    if(key==obj.prop){
                        return tData[key]
                    }
                }
            }
        }
      
    }
}
</script>

<style lang="scss" scoped>
    .customTab{
        width: 100%;
        min-height: 100px;
        table-layout:fixed;
        .tbheard{
            background-color: rgba(22,96,241,0.1)!important;
            td{
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                position: relative;
            }
            td:first-child{
                border-top-left-radius: 10px;
            }
            td:last-child{
                border-top-right-radius: 10px;
            }
            .el-icon-plus{
                color: #fff;
                background: #1763F7;
                cursor: pointer;
                border-radius: 4px;
            }
            .el-icon-minus{
                color: #fff;
                background: #1763F7;
                cursor: pointer;
                border-radius: 4px;
            }
        }
        tr>td{
            text-align: center;
            font-size: 14px;
            color: #000;
            position: relative;
           div{
                padding: 17px 0;
                position: relative;
                z-index: 999;
           }
        }
        tr:hover{
            background-color: #F7FAFF;
        }
        tr:nth-child(2n-1) {background-color: #F7FAFF;} 
    }
    .dash-left::after{
        position: absolute;
        content: '';
        border-top:1px dashed #1660F1;
        width: 200px;
        top: 20%;
        transform: translateY(-50%);
        left: 0;
    }
    .dash-right::before{
        position: absolute;
        content: '';
        border-top:1px dashed #1660F1;
        width: 50%;
        height: 1px;
        top: 50%;
        right: -25%;
        transform: translateY(-50%);
    }
</style>

