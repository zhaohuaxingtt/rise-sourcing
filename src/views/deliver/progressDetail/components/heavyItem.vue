<template>
  <iCard :title="$getLabel(nameZ,nameE)+'-'+$getLabel(titleName.name,titleName.nameE)+'-'+supplierName">
    <template slot='header-control'>
      <i-button @click="derivationClick" v-permission="SONGYANGGUANLI_GUOCHENGJIANKONG_DAOCHU">{{$t("DAOCHU")}}</i-button>
      <i-button @click="jumpHeavy" v-permission="SONGYANGGUANLI_GUOCHENGJIANKONG_LINGJIANSHEZHI">{{$t("heavyItem零件设置")}}</i-button>
      <i-button @click="jumpSupplier" v-permission="SONGYANGGUANLI_GUOCHENGJIANKONG_FASONGTIANXIEJIHUA">{{$t("发送供应商填写计划")}}</i-button>
    </template>
    <div class="wrap-back" id="qrCodeDiv">
      <div class="line-div">
        <div class="wrap-div"></div>
        <div style="width:100%;height:100%;">
          <div class="line-samll" v-for="(item,index) in lineListNew" :key="index" :style="{left:item.w+'%'}">
            <div :class="item.garyShow?'gray':'line-line'"></div>
            <el-tooltip
              :content="item.time"
              placement="left" effect="light"
              >
                <span :class="item.garyShow?'gray-name':''">{{item.name}}</span>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="row-item" id="row-item">
        <el-tooltip
          :content="$getLabel(titleName.name,titleName.nameE)+'-'+titleName.number"
          placement="top" effect="light"
          >
          <div class="first-column-item">
            <i class="el-icon-circle-plus-outline" style="cursor:pointer;" @click="upOpen" v-if="!openShow"></i>
            <i class="el-icon-remove-outline" style="cursor:pointer;" @click="upOpen" v-else></i>
            {{$getLabel(titleName.name,titleName.nameE)}}-{{titleName.number}}
          </div>
        </el-tooltip>
        <div v-for="item in header" :key="item">
          <el-tooltip
            :content="item"
            placement="top" effect="light"
            >
            <div>
              {{item}}
            </div>
          </el-tooltip>
        </div>
      </div>
      <item :list="list" @refresh="refresh" :key="i" :header="header"/>
    </div>
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
  </iCard>
</template>

<script>
import { iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage,iPagination } from "rise";
import Item from "./item.vue";
import {
  getGanttChart,
  queryPepNodeTimeByCarTypeProId
} from "@/api/project/deliver";
import { downloadPDF, dataURLtoFile, transverseDownloadPDFNew } from '@/utils/pdf'

export default {
  components:{
    iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage, Item,iPagination
  },
  props:{
    titleName:{
      type:Object,
      default:{},
    },
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
    },
    supplierName:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      header: [],//title
      list:[],
      minT:"",
      maxT:"",
      nameZ:"",
      nameE:"",

      lineList:[
        {
          name:"BF",
          time:null,
          code:null,
        },{
          name:"VFF",
          time:null,
          code:null,
        },{
          name:"PVS",
          time:null,
          code:null,
        },{
          name:"OS",
          time:null,
          code:null,
        },{
          name:"SOP",
          time:null,
          code:null,
        },
      ],
      lineListNew:[],//线vff,bf,pvs,os,sop集合

      openShow:false,//左侧菜单集合图标显示

      headerShow:false,//判断横坐标年份集合是否为空
    }
  },
  created(){
    // this.getData();
  },
  mounted(){

  },
  methods:{
    queryPepNodeTimeByCarTypeProId(val,id){
      queryPepNodeTimeByCarTypeProId({
        carTypeProId:id,
      }).then(res=>{
        if(res.data?.createBy){
          this.lineList = [
            {
              name:"BF",
              time:res.data?.pepBf?res.data?.pepBf:null,
              code:this.timeOff(res.data?.pepBf)
            },{
              name:"VFF",
              time:res.data?.pepVff?res.data?.pepVff:null,
              code:this.timeOff(res.data?.pepVff)
            },{
              name:"PVS",
              time:res.data?.pepPvs?res.data?.pepPvs:null,
              code:this.timeOff(res.data?.pepPvs)
            },{
              name:"OS",
              time:res.data?.pepOs?res.data?.pepOs:null,
              code:this.timeOff(res.data?.pepOs)
            },{
              name:"SOP",
              time:res.data?.pepSop?res.data?.pepSop:null,
              code:this.timeOff(res.data?.pepSop)
            },
          ]
          this.headerShow = true;
        }else{
          this.lineList = [
            {
              name:"BF",
              time:null,
              code:null,
            },{
              name:"VFF",
              time:null,
              code:null,
            },{
              name:"PVS",
              time:null,
              code:null,
            },{
              name:"OS",
              time:null,
              code:null,
            },{
              name:"SOP",
              time:null,
              code:null,
            }
          ]
          this.headerShow = false;
        }
        this.setData(val);
      })
    },
    upOpen(){
      this.openShow = !this.openShow;
      var listE = _.cloneDeep(this.list);
      listE.forEach(e=>{
        if(this.openShow){
          e.showChlid = true;
        }else{
          e.showChlid = false;
        }
      })
      this.list = _.cloneDeep(listE);
      this.refresh();
    },
    derivationClick(){
      var name = "甘特图"
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      transverseDownloadPDFNew({
        idEle: 'qrCodeDiv',
        pdfName: name,
        exportPdf: true,
        // waterMark: true,
        title:'#row-item',
        callback: async (pdf, pdfName) => {
          console.log(pdf)
          try {
            loading.close()
            const filename = pdfName.replaceAll(/\./g, '_') + '.pdf'
            const pdfFile = pdf.output('datauristring')
            const blob = dataURLtoFile(pdfFile, filename)
          } catch {
            iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'))
          }
        }
      })
    },
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
    noTodayWrap(){//绘制线和today阴影的dom节点
      var div = document.getElementsByClassName("row-item")[0];
      var parts = document.getElementsByClassName("first-column-item")[0];
      var width = div.offsetWidth - parts.offsetWidth//div宽度,零件Adiv宽度200，需要减去
      var back = document.getElementsByClassName("row-item")[0];
      // var nowTimeCode = this.timeOff("2022-09-05 15:20:00");//当前时间
      var nowTimeCode = Math.round(new Date().getTime()/1000);

      const start = this.header[0] + "-01 00:00:00"
      const end = this.header[this.header.length-1] + "-30 23:59:59"
      var startTimeCode = this.timeOff(start)
      var endTimeCode = this.timeOff(end)
      var difference = endTimeCode - startTimeCode//最大时间-最小时间的差值

      var w = 0;

      console.log(startTimeCode)
      console.log(endTimeCode)
      console.log(nowTimeCode)

      if(nowTimeCode >= startTimeCode && nowTimeCode<=endTimeCode){
        const t = nowTimeCode - startTimeCode;
        const divW = 100 - t/difference*100
        w = Number(divW.toFixed(2))

        console.log(w);
      }
      this.$nextTick(()=>{
        const y = document.getElementsByClassName("wrap-div")[0];

        // 设置阴影部分div宽高
        const s = document.getElementsByClassName("table-content")[0].offsetHeight;
        const h = s-50
        y.style.height = h + "px";
        y.style.width = w + "%";
        // y.style.top = back.offsetHeight + "px";
        y.style.top = "50px";

        // 设置line的div宽高
        const line = document.getElementsByClassName("line-div")[0];
        line.style.width = width + "px";
        line.style.height = s + "px";

        // 设置线
        var lineArr = _.cloneDeep(this.lineList)
        var lineArrNew = [];
        lineArr.forEach(e=>{
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
        lineArr.forEach(e=>{
          console.log(e.w)
          if(e.w != 0){
            lineArrNew.push(e);
          }
        })
        this.lineListNew = lineArrNew;
      })
    },
    handleSizeChange(val){

    },
    handleCurrentChange(val){
      this.$emit("handleCurrentChange",val)
    },
    setData(data){
      this.nameZ = this.carProjectOptions.filter(e=>e.cartypeProId == this.carProjectId)[0].cartypeProNameZh
      this.nameE = this.carProjectOptions.filter(e=>e.cartypeProId == this.carProjectId)[0].cartypeProNameEn

      var minTime = "";
      var maxTime = "";
      var headerConcat = [];

      if(data.length<1){
        this.list = [];

        headerConcat = headerConcat.concat(this.lineList)
        const headerList = headerConcat.filter(item => item.code)
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

        if(this.headerShow){
          this.header = this.yearMake(this.maxT,this.minT);
        }else{
          this.header = [];
        }
        this.noTodayWrap();
      }else{
        var header = [];
        

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
          if(!e.planStartTime && e.planEndTime){//计划点
            e.pointRangTop = [[e.planEndTime.split(" ")[0].split("-")[0],e.planEndTime.split(" ")[0].split("-")[1]].join("-")]
            e.pointWidthTop = (e.planEndTime.split(" ")[0].split("-")[2]/30).toFixed(0) + "%";
          }else if(e.planStartTime && e.planEndTime){//计划线
            if(e.planStartTime.split(" ")[0].split("-")[1] == e.planEndTime.split(" ")[0].split("-")[1]){//同月份
              e.barRangTop = this.yearMake(e.planEndTime,e.planStartTime)//绘制的所有月份集合
              e.barRangTopWidth = ((e.planEndTime.split(" ")[0].split("-")[2] - e.planStartTime.split(" ")[0].split("-")[2])/30*100).toFixed(0) + "%";//宽
              e.barRangTopMarginLeft = ((e.planStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0)) + "%";//开始时间的线距
            }else{
              e.barRangTop = this.yearMake(e.planEndTime,e.planStartTime)//绘制的所有月份集合
              e.barRangTopRight = (e.planEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";//结束时间的线距
              e.barWidthTopLeft = (e.planStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";//开始时间的线距
              e.barWidthTopLeftWidth = (100-(e.planStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";//宽
            }
          }
          if(!e.actualStartTime && e.actualEndTime){//实际点
            e.pointRangBottom = [[e.actualEndTime.split(" ")[0].split("-")[0],e.actualEndTime.split(" ")[0].split("-")[1]].join("-")]
            e.pointWidthBottom = (e.actualEndTime.split(" ")[0].split("-")[2]/30).toFixed(0) + "%";
          }else if(e.actualStartTime && e.actualEndTime){//实际线

            if(e.actualStartTime.split(" ")[0].split("-")[1] == e.actualEndTime.split(" ")[0].split("-")[1]){
              e.barRangBottom = this.yearMake(e.actualEndTime,e.actualStartTime)//绘制的所有月份集合
              e.barRangBottomWidth = ((e.actualEndTime.split(" ")[0].split("-")[2] - e.actualStartTime.split(" ")[0].split("-")[2])/30*100).toFixed(0) + "%";//宽
              e.barRangBottomMarginLeft = ((e.actualStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0)) + "%";//开始时间的线距
            }else{
              e.barRangBottom = this.yearMake(e.actualEndTime,e.actualStartTime)
              e.barWidthBottomRight = (e.actualEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
              e.barWidthBottomLeft = (e.actualStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
              e.barWidthBottomLeftWidth = (100-(e.actualStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";
            }
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

              if(!item.planStartTime && item.planEndTime){//计划点
                item.pointRangTop = [[item.planEndTime.split(" ")[0].split("-")[0],item.planEndTime.split(" ")[0].split("-")[1]].join("-")]
                item.pointWidthTop = (item.planEndTime.split(" ")[0].split("-")[2]/30).toFixed(0) + "%";
              }else if(item.planStartTime && item.planEndTime){//计划线
                // this.yearAll = [];
                // this.minYear = item.planStartTime;
                // this.maxYear = item.planEndTime;
                if(item.planStartTime.split(" ")[0].split("-")[1] == item.planEndTime.split(" ")[0].split("-")[1]){//同一月份
                  item.barRangTop = this.yearMake(item.planEndTime,item.planStartTime)//绘制的所有月份集合
                  item.barRangTopWidth = ((item.planEndTime.split(" ")[0].split("-")[2] - item.planStartTime.split(" ")[0].split("-")[2])/30*100).toFixed(0) + "%";//结束时间的线距
                  item.barRangTopMarginLeft = ((item.planStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0)) + "%";//结束时间的线距
                }else{//不同月份
                  item.barRangTop = this.yearMake(item.planEndTime,item.planStartTime)//绘制的所有月份集合
                  item.barRangTopRight = (item.planEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";//结束时间的线距
                  item.barWidthTopLeft = (item.planStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";//开始时间的线距
                  item.barWidthTopLeftWidth = (100-(item.planStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";//宽
                }
              }
              if(!item.actualStartTime && item.actualEndTime){//实际点
                item.pointRangBottom = [[item.actualEndTime.split(" ")[0].split("-")[0],item.actualEndTime.split(" ")[0].split("-")[1]].join("-")]
                item.pointWidthBottom = (item.actualEndTime.split(" ")[0].split("-")[2]/30).toFixed(0) + "%";
              }else if(item.actualStartTime && item.actualEndTime){//实际线
                if(item.actualEndTime.split(" ")[0].split("-")[1] == item.actualStartTime.split(" ")[0].split("-")[1]){//同一月份
                  item.barRangBottom = this.yearMake(item.actualEndTime,item.actualStartTime)//绘制的所有月份集合
                  item.barRangBottomWidth = ((item.actualEndTime.split(" ")[0].split("-")[2] - item.actualStartTime.split(" ")[0].split("-")[2])/30*100).toFixed(0) + "%";//结束时间的线距
                  item.barRangBottomMarginLeft = ((item.actualStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0)) + "%";//结束时间的线距
                }else{//不同月份
                  item.barRangBottom = this.yearMake(item.actualEndTime,item.actualStartTime)
                  item.barWidthBottomRight = (item.actualEndTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
                  item.barWidthBottomLeft = (item.actualStartTime.split(" ")[0].split("-")[2]/30*100).toFixed(0) + "%";
                  item.barWidthBottomLeftWidth = (100-(item.actualStartTime.split(" ")[0].split("-")[2]/30*100)).toFixed(0) + "%";
                }
              }
            })
          }
        });
        headerConcat = headerConcat.concat(header).concat(this.lineList)
        const headerList = headerConcat.filter(item => item.code)
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
        this.list = _.cloneDeep(data);

        this.noTodayWrap();
      }
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
        // return new Date(val).getTime();
        return (new Date(val)).getTime()/1000;
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

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    padding-right: 10px;
  }
}
.wrap-back{
  width:100%;
  height:100%;
  position: relative;
  padding: 20px;
}
.wrap-div{
  position: absolute;
  right:0;
  background:black;
  opacity:0.03;
  // vertical-align: top;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  -ms-pointer-events: none;
  -o-pointer-events: none;
  pointer-events: none;
}
.line-div{
  position: absolute;
  right:20px;
  top:70px;
  // background:#1660f1;
  display: flex;
  flex-wrap: wrap;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  -ms-pointer-events: none;
  -o-pointer-events: none;
  pointer-events: none;
}
.line-samll{
  position:absolute;
  height:100%;
  top: 0;
  left:10%;
  // display: flex;
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
    position: absolute;
    top: 0;
    pointer-events:all;
  }
  .gray-name{
    color:#a9a9a9;
  }
}

</style>