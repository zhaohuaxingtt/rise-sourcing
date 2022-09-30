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
        //   '定点',
        //   '启动',
        //   'BF',
        //   'P-muster(机动)',
        //   '分供方确认',
        //   'PAB完成',
        //   '1st tryout',
        //   'OTS完成',
        //   'EM完成',
        //   '皮纹许可',
        //   '皮纹首件',
        //   'EM认可完成',
        //   'EM试装完成',
        //   'EMPB',
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
        }],
      }
    },
    methods:{
        setData(data){
            console.log(data);
            if(data.length<1){
                this.header = [];
                this.list = [];
                return;
            }
            data[0].nodeList = [
                {
                    actualEndTime:"2022-12-09 23:11:32",
                    actualStartTime: "2022-10-03 23:11:32",
                    id: 1,
                    nodeName: "1",
                    num: "1.0",
                    parentId: 0,
                    planEndTime: "2022-12-02 23:11:32",
                    planStartTime: "2022-10-02 23:11:32",
                },
                {
                    actualEndTime: null,
                    actualStartTime:null,
                    id: 1,
                    nodeName: "2",
                    num: "1.0",
                    parentId: 0,
                    planEndTime: "2023-02-02 23:11:32",
                    planStartTime: "2022-09-20 23:11:32",
                },
                {
                    actualEndTime: null,
                    actualStartTime: null,
                    id: 1,
                    nodeName: "3",
                    num: "1.0",
                    parentId: 0,
                    planEndTime: "2023-02-02 23:11:32",
                    planStartTime: "2022-09-10 23:11:32",
                },{
                    actualEndTime: null,
                    actualStartTime: null,
                    id: 1,
                    nodeName: "4",
                    num: "1.0",
                    parentId: 0,
                    planEndTime: "2023-02-02 23:11:32",
                    planStartTime: "2021-09-01 23:11:32",
                },
                ...data[0].nodeList,
            ]

            console.log(data);

            var header = [];
            data[0].nodeList.forEach(e=>{
                header.push(e.nodeName);
            })
            this.header = header;

            var list = _.cloneDeep(data);
            list.forEach(e=>{
                e.name = e.partNameZh;
                e.nameEn = e.partNameDe;

                //图标状态
                e.circular = 1;

                if(e.nodeList.length>0){
                    e.nodeList.forEach(item=>{
                        item.planStartWeek = this.week(item.planStartTime);
                        item.actuatlEndWeek = this.week(item.actualEndTime);
                        if(item.planStartTime){
                            // status 1 为绿色 2为黄色 3位红色 4位黑色 5为灰色
                            // type 1为圆 2位三角形
                            if(Math.round(new Date().getTime()/1000) < this.timeOff(item.planStartTime)){//绿灯
                                item.status = 1;
                                item.type = 1;
                                item.complete = true;
                            }else{
                                if(!item.actualStartTime){
                                    const time = Math.round(new Date().getTime()/1000) - this.timeOff(item.planStartTime)
                                    const week = time/60/60/24/7;
                                    const weekNum = Number(week.toFixed(5))
                                    console.log(weekNum);
                                    if(weekNum>0 && weekNum<=2){//黄灯
                                        item.status = 2;
                                        item.type = 1;
                                        item.complete = true;
                                    }else if(weekNum>2 && weekNum<=4){//红灯
                                        item.status = 3;
                                        item.type = 2;
                                        item.complete = true;
                                    }else if(weekNum>4){//黑灯
                                        item.status = 4;
                                        item.type = 1;
                                        item.complete = true;
                                    }
                                }else{
                                    item.status = 1;
                                    item.type = 1;
                                    item.complete = true;
                                }
                            }
                        }else{
                            item.status = 5;
                            item.type = 1;
                            item.complete = false;
                            item.planStartWeek = this.week(item.planStartTime);
                            item.actuatlEndWeek = this.week(item.actualEndTime);
                        }
                    })
                }

            })

            this.list = _.cloneDeep(list);

            console.log(this.list);
            
        },
        week(time,type){
            if(!time){
                return "";
            }
            var d1 = Math.ceil((new Date(time) - new Date(new Date(time).getFullYear().toString())) / (24 * 60 * 60 * 1000));
            //周天数
            // console.log(d1, "天数");
            //2. 代入获取本年的1月1号是星期几
            var week = new Date(new Date(time).getFullYear().toString() + "/01/01").getDay();
            // console.log(week, "代入获取本年的1月1号是星期几");
            //计算 当前时间是本年的第几周
            var weekTotal = Math.ceil((d1 + week - 1) / 7);

            var year = time.split(" ")[0].split("-")[0].slice(2)

            return weekTotal+"W-"+year;r
        },
        timeOff(val){
            if(val){
                return (new Date(val)).getTime()/1000;
            }else{
                return null;
            }
        },
    }
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