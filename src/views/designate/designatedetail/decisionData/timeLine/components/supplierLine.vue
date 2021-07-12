<!--
 * @Author: wentliao
 * @Date: 2021-05-25 10:17:35
 * @Description: 渐变的时间线
-->
<template>
    <div class="supplier-line" :style="{'marginLeft':left}">
        <p class="supplier-item-time">
            {{ beginDate | dateFilter("YYYY-MM-DD")}} 
            - 
            {{ endDate | dateFilter("YYYY-MM-DD")}}</p>
        <p class="supplier-item-line" :style="{width:percent}"></p>
    </div>
</template>

<script>
import filters  from '@/utils/filters'
export default {
    name:'supplier',
    mixins: [filters],
    props:{
        allList:{
            type:Array,
            default:()=>[],
        },
        supplierIndex:{
            type:Number,
            default:0
        },
        dateTime:{
            type:String,
            default:''
        },
    },
    data(){
        return{
            left:0,
            percent:'100%',
            beginDate:null,
            endDate:null,
        }
    },
    created(){
        this.formatTime();
    },
    methods:{
        // 重置下数据
        formatTime( ){
            const { 
                allList,
                supplierIndex,
            } = this;
            let newList = [];
            allList.map((item=>{newList.push(Number(item.beginDate),Number(item.endDate))}));
            // 排序取出最小和最大时间
            let sortList = newList.sort((a,b)=>a-b);
            let start= sortList[0];
            let end= sortList[sortList.length-1];
            // console.log(sortList,start,end);
            allList.map((item,index)=>{
                if(supplierIndex == index){
                    //获取当前item占总进度条的百分比
                    this.percent = ((Number(item.endDate) - Number(item.beginDate)) / (end - start)) * 100 +'%';
                    // 获取当前item与开始时间的差距
                    const distance = ((Number(item.beginDate) - start) / (end - start)) * 100
                    this.left = distance < 90 ? distance+'%' : '78%'; 
                    // 开始时间
                    this.beginDate = Number(item.beginDate) ;
                    // 结束时间
                    this.endDate = Number(item.endDate);


                }
            });
            
        },
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