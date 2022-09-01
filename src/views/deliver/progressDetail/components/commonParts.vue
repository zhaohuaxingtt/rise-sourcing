<template>
  <iCard title="">
    <template slot='header-control'>
      <i-button>设置排序</i-button>
      <i-button>导出</i-button>
    </template>
    <div>
        
    </div>
    <div class="box-wrap">
        <div class="row-item">
            <div class="first-column-item">
                <!-- <i class="el-icon-circle-plus-outline"></i> 零件A -->
            </div>
            <div v-for="item in header" :key="item" class="top-title">
                {{item}}
            </div>
            <div style="width:80px;">
                <!-- <i class="el-icon-circle-plus-outline"></i> 零件A -->
            </div>
        </div>
        <itemParts :list="list" :key="i" :header="header"/>
    </div>
  </iCard>
</template>

<script>
import { iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise";
import itemParts from "./itemParts.vue";
  export default {
    components:{
      iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage,itemParts
    },
    data() {
      return {
        header: [
          '定点',
          '启动',
          'BF',
          'P-muster(机动)',
          '分供方确认',
          'PAB完成',
          '1st tryout',
          'OTS完成',
          'EM完成',
          '皮纹许可',
          '皮纹首件',
          'EM认可完成',
          'EM试装完成',
          'EMPB',
        ],
        list:[
        // status 1 为绿色 2为黄色 3位红色 4位黑色 5为灰色
        // type 1为圆 2位三角形
          {
          name:"BF",
          edition:"1.0",
          circular:1,//圆类型
          data:[
            {
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:3,//状态
                type:2,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:2,//状态
                type:2,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:2,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:3,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:4,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:2,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:1,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:1,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:1,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:2,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:1,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:1,//类型
                complete:false,//是否完成
            },{
                name:"CWED-DSA",
                status:5,//状态
                type:2,//类型
                complete:false,//是否完成
            },
          ]
        },{
          name:"联系人提交清单",
          edition:"2.0",
          circular:2,
          data:[
            {
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },{
                name:"CWED-DSA",
                status:1,//状态
                type:1,//类型
                complete:true,//是否完成
            },
          ]
        }],
      }
    },
  }
</script>

<style lang="scss" scoped>
.row-item{
  display: inline-flex;
  color: black;
  font-size: 18px;
  text-align: center;
  background: #fff;
  &>div{
    width: 150px;
    height: 50px;
    line-height: 50px;
    background: #fff;
  }
  .first-column-item{
    flex: none;
    width: 160px;
    background: #fff;
    margin-right:20px;
  }
}
.top-title{
    font-weight: bold;
}
.box-wrap{
    overflow-x:auto;
}
</style>