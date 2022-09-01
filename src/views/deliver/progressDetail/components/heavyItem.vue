<template>
  <iCard title="Id.4x后座靠背总成项目管理进度图">
    <template slot='header-control'>
      <i-button>导出</i-button>
      <i-button>设置送样进度节点</i-button>
      <i-button>发送供应商填写计划</i-button>
    </template>
    <div class="row-item">
      <div class="first-column-item">
        <i class="el-icon-circle-plus-outline"></i> 零件A
      </div>
      <div v-for="item in header" :key="item" >
        {{item}}
      </div>
    </div>
    <item :list="list" :key="i" :header="header"/>
  </iCard>
</template>

<script>
import { iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise";
import Item from "./item.vue";
  export default {
    components:{
      iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage, Item,
    },
    data() {
      return {
        header: [
          '2019-12',
          '2020-01',
          '2020-02',
          '2020-03',
          '2020-04',
          '2020-05',
          '2020-06',
          '2020-07',
          '2020-08',
          '2020-09',
          '2020-10',
          '2020-11',
        ],
        list:[
          // status: 1 绿色；2 黄色
          {
          name:"1.0 BF",
          showChlid:false,
          status: 1,
          point:true,
          rang:['2019-12'],
          children:[
            { name:'1.1 TM数模数据', status: 2, rang:['2019-12'], },
            { name:'1.2 TZ图纸数据', status: 1, rang:['2019-12'], },
            { name:'1.2 TZ图纸数据', rang:['2019-12'], },
            { name:'1.3 Fakom(P-muster)', status: 2,
              rang:['2019-12','2020-01','2020-02',], },
            { name:'1.4 P-muster', point:true, status: 2, rang:['2020-04'], },
            { name:'1.5 software', point:true, status: 1, rang:['2020-01','2020-02'], width:'40%' },
            { name:'1.6 software', status: 1, rang:['2020-01','2020-02'], width:'20%' },
          ]
        },{
          name:"2.0 联系人提交清单",
          showChlid:false,
          status: 1,
          point:true,
          rang:['2020-03'],
          children:[
            { name:'2.1 TM数模数据', status: 2, },
            { name:'2.2 TZ图纸数据' },
            { name:'2.3 Fakom(P-muster)', status: 2, },
            { name:'2.4 P-muster' },
            { name:'2.5 software', status: 1, },
            { name:'1.6 software', status: 1, rang:['2020-01','2020-02'], width:'20%' },
          ]
        }
        ],
        obj:{
          name:"1.0BF",
          showChlid:false,
          status: 1,
          point:true,
          children:[
            { name:'1.1 TM数模数据', status: 2, },
            { name:'1.2 TZ图纸数据' },
            { name:'1.3 Fakom(P-muster)', status: 2, },
            { name:'1.4 P-muster' },
            { name:'1.5 software', status: 1,
              showChlid:false,
              children:[
              { name:'1.1 TM数模数据', status: 2, },
              { name:'1.2 TZ图纸数据' },
              { name:'1.3 Fakom(P-muster)', status: 2, },
              { name:'1.4 P-muster' },
              { name:'1.5 software', status: 1, },
            ]
            },
          ]
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.row-item{
  width: 100%;
  display: flex;
  flex-flow: row;
  color: #fff;
  font-size: 18px;
  text-align: center;
  background: #bdd7ee;
  &>div{
    flex: 1;
    height: 50px;
    line-height: 50px;
    border-right: 1px #ccc solid;
  }
  .first-column-item{
    flex: none;
    width: 200px;
    background: #1660f1;
  }
}
</style>