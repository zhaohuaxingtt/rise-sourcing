<template>
  <iCard title="Id.4x后座靠背总成项目管理进度图">
    <template slot='header-control'>
      <i-button>导出</i-button>
      <i-button @click="jumpHeavy">heavyItem零件设置</i-button>
      <i-button @click="jumpSupplier">发送供应商填写计划</i-button>
    </template>
    <div class="wrap-back">
      <div class="wrap-div"></div>
      <div class="line-div">
        <div class="line-samll" v-for="(item,index) in lineList" :key="index" :style="{left:item.w+'%'}">
          <div :class="item.garyShow?'gray':'line-line'"></div>
          <span :class="item.garyShow?'gray-name':''">{{item.name}}</span>
        </div>
      </div>
      <div class="row-item">
        <div class="first-column-item">
          <i class="el-icon-circle-plus-outline"></i> 零件A
        </div>
        <div v-for="item in header" :key="item">
          {{item}}
        </div>
      </div>
      <item :list="list" @refresh="refresh" :key="i" :header="header"/>

      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="partPage.currPage"
        :page-sizes="partPage.pageSizes"
        :page-size="partPage.pageSize"
        :layout="partPage.layout"
        :total="partPage.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage,iPagination } from "rise";
import Item from "./item.vue";
import {
  getGanttChart,
} from "@/api/project/deliver";

export default {
  components:{
    iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage, Item,iPagination
  },
  props:{
    carProjectId:{
      type:String,
      default:"",
    },
    partPage:{
      type:Object,
      default:{
        totalCount:0, //总条数
        pageSize:1,   //每页多少条
        pageSizes:[10,20,50,100,300], //每页条数切换
        currPage:1,    //当前页
        layout:"sizes, prev, pager, next, jumper"
      },
    },
    carProjectOptions:{
      type:Array,
      default:[],
    }
  },
  data() {
    return {
      header: [],//title
      list:[],
      minT:"",
      maxT:"",
      lineList:[],
    }
  },
  created(){
    // this.getData();
  },
  mounted(){

  },
  methods:{
    refresh(){
      this.$nextTick(()=>{
        const s = document.getElementsByClassName("table-content")[0].offsetHeight;

        const y = document.getElementsByClassName("wrap-div")[0];
        // 设置阴影部分div宽高
        const h = s-50
        y.style.height = h + "px";

        // 设置line的div宽高
        const line = document.getElementsByClassName("line-div")[0];
        line.style.height = s + "px";
      })
    },
    noTodayWrap(){
      var div = document.getElementsByClassName("row-item")[0];
      var width = div.offsetWidth - 200//div宽度,零件Adiv宽度200，需要减去
      var nowTimeCode = this.timeOff("2022-09-15 12:15:30");//当前时间
      // var nowTimeCode = Math.round(new Date().getTime()/1000);

      const start = this.header[0] + "-01 00:00:00"
      const end = this.header[this.header.length-1] + "-30 23:59:59"
      var startTimeCode = this.timeOff(start)
      var endTimeCode = this.timeOff(end)
      var difference = endTimeCode - startTimeCode//最大时间-最小时间的差值

      var w = 0;

      if(nowTimeCode >= startTimeCode && nowTimeCode<=endTimeCode){
        const t = nowTimeCode - startTimeCode;
        const divW = t/difference*100
        w = Number(divW.toFixed(2))
      }
      this.$nextTick(()=>{
        const y = document.getElementsByClassName("wrap-div")[0];

        // 设置阴影部分div宽高
        const s = document.getElementsByClassName("table-content")[0].offsetHeight;
        const h = s-50
        y.style.height = h + "px";
        y.style.width = w + "%";

        // 设置line的div宽高
        const line = document.getElementsByClassName("line-div")[0];
        line.style.width = width + "px";
        line.style.height = s + "px";

        // 设置线
        this.lineList = [//目前写死的，真实数据进来的时候再进行筛选，当line数据中的时间time不满足最小时间和最大时间内，就过滤掉
          {
            name:"BF",
            time:"2022-09-02 20:15:30",
          },{
            name:"VFF",
            time:"2022-09-08 20:15:30",
          },{
            name:"PVS",
            time:"2022-09-20 20:15:30",
          },{
            name:"OS",
            time:"2022-09-25 20:15:30",
          },{
            name:"SOP",
            time:"2022-09-26 20:15:30",
          },
        ]

        this.lineList.forEach(e=>{
          const lineS = this.timeOff(e.time)
          var lineOneW = 0;
          if(lineS >= startTimeCode && lineS <= endTimeCode){
            const linet = lineS - startTimeCode;
            const lineW = linet/difference*100
            lineOneW = Number(lineW.toFixed(2))
          }
          if(this.timeOff(e.time) > nowTimeCode){
            e.garyShow = true;
          }
          e.w = lineOneW;
        })


        console.log(this.lineList);
      })
    },
    handleSizeChange(val){

    },
    handleCurrentChange(val){
      this.$emit("handleCurrentChange",val)
    },
    setData(data){
      var header = [];
      var minTime = "";
      var maxTime = "";

      // console.log(header);
      data.forEach(e => {
        // console.log(e);
        header.push({
          time:e.actualEndTime,
          code:this.timeOff(e.actualEndTime),
        })
        header.push({
          time:e.actualStartTime,
          code:this.timeOff(e.actualStartTime),
        })
        header.push({
          time:e.planEndTime,
          code:this.timeOff(e.planEndTime),
        })
        header.push({
          time:e.planStartTime,
          code:this.timeOff(e.planStartTime),
        })
        if(!e.planStartTime && e.planEndTime){
          e.pointRangTop = [[e.planEndTime.split(" ")[0].split("-")[0],e.planEndTime.split(" ")[0].split("-")[1]].join("-")]
          e.pointWidthTop = (e.planEndTime.split(" ")[0].split("-")[3]/30).toFixed(0) + "%";
        }else if(e.planStartTime && e.planEndTime){
          e.barRangTop = this.yearMake(e.planEndTime,e.planStartTime)
          e.barRangTopRight = (e.planEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
          e.barWidthTopLeft = (e.planStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
          e.barWidthTopLeftWidth = (100-(e.planStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";
        }
        if(!e.actualStartTime && e.actualEndTime){
          e.pointRangBottom = [[e.actualEndTime.split(" ")[0].split("-")[0],e.actualEndTime.split(" ")[0].split("-")[1]].join("-")]
          e.pointWidthBottom = (e.actualEndTime.split(" ")[0].split("-")[3]/30).toFixed(0) + "%";
        }else if(e.actualStartTime && e.actualEndTime){
          e.barRangBottom = this.yearMake(e.actualEndTime,e.actualStartTime)
          e.barWidthBottomRight = (e.actualEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
          e.barWidthBottomLeft = (e.actualStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
          e.barWidthBottomLeftWidth = (100-(e.actualStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";
        }
        e.showChlid = false;

        if(e.childList.length>0){
          e.childList.forEach(item => {
            header.push({
              time:item.actualEndTime,
              code:this.timeOff(item.actualEndTime),
            })
            header.push({
              time:item.actualStartTime,
              code:this.timeOff(item.actualStartTime),
            })
            header.push({
              time:item.planEndTime,
              code:this.timeOff(item.planEndTime),
            })
            header.push({
              time:item.planStartTime,
              code:this.timeOff(item.planStartTime),
            })

            if(!item.planStartTime && item.planEndTime){
              item.pointRangTop = [[item.planEndTime.split(" ")[0].split("-")[0],item.planEndTime.split(" ")[0].split("-")[1]].join("-")]
              item.pointWidthTop = (item.planEndTime.split(" ")[0].split("-")[3]/30).toFixed(0) + "%";
            }else if(item.planStartTime && item.planEndTime){
              this.yearAll = [];
              this.minYear = item.planStartTime;
              this.maxYear = item.planEndTime;
              item.barRangTop = this.yearMake(item.planEndTime,item.planStartTime)
              item.barRangTopRight = (item.planEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
              item.barWidthTopLeft = (item.planStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
              item.barWidthTopLeftWidth = (100-(item.planStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";
            }
            if(!item.actualStartTime && item.actualEndTime){
              item.pointRangBottom = [[item.actualEndTime.split(" ")[0].split("-")[0],item.actualEndTime.split(" ")[0].split("-")[1]].join("-")]
              item.pointWidthBottom = (item.actualEndTime.split(" ")[0].split("-")[3]/30).toFixed(0) + "%";
            }else if(item.actualStartTime && item.actualEndTime){
              this.yearAll = [];
              this.minYear = item.actualStartTime;
              this.maxYear = item.actualEndTime;
              item.barRangBottom = this.yearMake(item.actualEndTime,item.actualStartTime)
              item.barWidthBottomRight = (item.actualEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
              item.barWidthBottomLeft = (item.actualStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
              item.barWidthBottomLeftWidth = (100-(item.actualStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";
            }

          })
        }
      });
      const headerList = header.filter(item => item.code)
      minTime = Math.min.apply(null,headerList.map((item,index) => {
        return item.code
      }))
      maxTime = Math.max.apply(null,headerList.map((item,index) => {
        return item.code
      }))
      headerList.forEach(e=>{
        if(e.code.toString() == minTime.toString()){
          this.minT = e.time;
        }
        if(e.code.toString() == maxTime.toString()){
          this.maxT = e.time;
        }
      })
      this.header = this.yearMake(this.maxT,this.minT);

      console.log(headerList);
      this.list = _.cloneDeep(data);

      this.noTodayWrap();
    },
    yearMake(max,min){
      var maxYear = max;
      var minYear = min;
      var yearAll = [];
      let time = "";

      var i=0;
      while(i<100){
        if(this.timeOff(maxYear)<this.timeOff(minYear)){
          break;
        }
        if(yearAll.length > 0){
          if(yearAll[yearAll.length-1] == [maxYear.split(" ")[0].split("-")[0],maxYear.split(" ")[0].split("-")[1]].join("-")){
            break;
          }else{
            time = yearAll[yearAll.length-1];
            var data = [time.split(" ")[0].split("-")[0],time.split(" ")[0].split("-")[1]].join("-")
            if(data.split("-")[1] == 12){
              const num = [Number(data.split("-")[0]) + 1,"01"].join("-")
              yearAll.push(num)
              i++
            }else{
              let month = "";
              if(Number(data.split("-")[1]) < 9){
                month = "0" + (Number(data.split("-")[1]) + 1)
              }else{
                month = Number(data.split("-")[1]) + 1
              }
              const num = [data.split("-")[0],month].join("-")
              yearAll.push(num)
              i++
            }
          }
        }else{
          time = minYear;
          var data = [time.split(" ")[0].split("-")[0],time.split(" ")[0].split("-")[1]].join("-")
          yearAll.push(data)
          i++
        }
      }
      console.log(yearAll)
      return (yearAll)
    },
    timeOff(val){
      if(val){
        return new Date(val).getTime();
      }else{
        return null;
      }
    },
    getData(){
      console.log(this.carProjectId)
      getGanttChart({
        cartypeProId:this.carProjectId,
        current:1,
        size:1,
      }).then(res=>{
        console.log(res);
      })
    },
    jumpHeavy(){
      const routeData = this.$router.resolve({
        path:"/deliver/shuttle",
        query:{
          carProjectId:this.carProjectId,
        }
      })
      window.open(routeData.href, '_blank')
    },
    jumpSupplier(){
      var obj = this.carProjectOptions.filter(e=> e.cartypeProId == this.carProjectId)
      const routeData = this.$router.resolve({
        path:"/deliver/deliverPlan",
        query:{
          carProjectId:this.carProjectId,
          carProjectName:obj[0].cartypeProNameZh
        }
      })
      window.open(routeData.href, '_blank')
    },
  }
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
.wrap-back{
  width:100%;
  height:100%;
  position: relative;
}
.wrap-div{
  position: absolute;
  right:0;
  top:100px;
  background:black;
  opacity:0.02;
  // vertical-align: top;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  -ms-pointer-events: none;
  -o-pointer-events: none;
  pointer-events: none;
}
.line-div{
  position: absolute;
  right:0;
  top:50px;
  // background:#1660f1;
  display: flex;
  flex-wrap: wrap;
}
.line-samll{
  position:absolute;
  height:100%;
  top: 0;
  left:10%;
  display: flex;
  .line-line{
    height: 100%;
    width: 2px;
    background: #1660f1;
  }

  .gray{
    height: 100%;
    width: 2px;
    background:#cbcbcb;
  }

  span{
    margin-left: 10px;
    margin-top: 18px;
    font-size: 14px;
    font-weight: bold;
  }
  .gray-name{
    color:#a9a9a9;
  }
}

</style>