<template> <!-- 导出RS单决策资料 -->
<div>
  <div class="percentage-box">
    <el-progress :percentage="percentage" type="circle" class="percentage" :show-text="false" stroke-width="15"></el-progress>
    <div class="percentage-text">
      {{percentageText}}
    </div>
  </div>
  <div class="exportPdf" ref="exportPdf" :style="{'width': pageWidth + 80 + 'px'}">
    <div class="content" id="allMoudles">
      <div class="showPage" ref="showPage">
        <!-- title -->
        <div id="html2canvasTitle" v-if="showPage">
          <rsTitle class="module">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/title"/>
            </template>
          </rsTitle>
        </div>
        <!-- PartList -->
        <div id="html2canvasPartList" v-if="showPage">
          <partList class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/partlist"/>
            </template>
          </partList>
        </div>

        <!-- Tasks -->
        <div id="html2canvasTasks" v-if="showPage">
          <tasks class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/tasks"/>
            </template>
          </tasks>
        </div>

        <!-- drawing -->
        <div id="html2canvasDrawing" v-if="showPage">
          <drawing class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/drawing"/>
            </template>
          </drawing>
        </div>
        <!-- bdl -->
        <div id="html2canvasBDl" v-if="showPage">
          <bdl isExportPdf class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/bdl"/>
            </template>
          </bdl>
        </div>

        <!-- singleSourcing -->
        <div id="html2canvasSingleSourcing" v-if="showPage">
          <singleSourcing class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/singlesourcing"/>
            </template>
          </singleSourcing>
        </div>

        <!-- abprice -->
        <!-- <div id="html2canvasAbprice">
          <abPrice class="module pageCard-main rsPdfCard">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/abprice"/>
            </template>
          </abPrice>
        </div> -->

        <!-- timeline -->
        <div id="html2canvasTimeline" v-if="showPage">
          <timeline class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/timeline"/>
            </template>
          </timeline>
        </div>
        <!-- awardingScenario -->
        <div id="html2canvasAwardingScenario">
          <awardingScenario class="module">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/awardingscenario"/>
            </template>
          </awardingScenario>
        </div>
        

        <div id="html2canvasRs" v-if="showPage">
          <rs class="module">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/rs"/>
            </template>
          </rs>
        </div>
      </div>
    </div>
    <canvas id="myCanvas"></canvas>
    <div ref="pdf-containr" class="pdf-containr"></div>
  </div>
</div>
</template>

<script>
import { iButton, iTabsList, iMessage } from "rise"
import {decisionDownloadPdfLogo} from "@/api/designate"
// import rsTitle from "./components/rsTitle"
import rsTitle from "../title"
import partList from "./components/partList"
import tasks from "./components/tasks"
import drawing from "./components/drawing"
// import bdl from "./components/bdl"
import singleSourcing from "./components/singleSourcing"
import timeline from "./components/timeline"
// import rs from "./components/rs"
import awardingScenario from '../../awardingscenario'
import abPrice from '../abPrice'
import bdl from "../bdl"
import rs from "../rs/home"

import { decisionType } from '@/layout/nomination/components/data'
import headerTab from './headerTab'
import {
    uploadUdFile
} from '@/api/file/upload'

export default {
  components: {
    iButton,
    rsTitle,
    partList,
    tasks,
    drawing,
    bdl,
    singleSourcing,
    timeline,
    rs,
    iTabsList,
    awardingScenario,
    headerTab,
    abPrice,
  },
  computed:{
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
        updateKey: state => state.sourcing.updateKey,
        imgList: state => state.sourcing.imgList,
    }),
  },
    watch: {
      updateKey(val){
        this.$forceUpdate()
      },
      imgList(val){ // 图片加载完毕之后在执行导出
        if(!val.length&&this.watchPdf){
            this.$nextTick(()=>{
              this.exportPdf()
              this.watchPdf = false
            })
        }
      },
      watchPdf(val){  // 60秒后图片还是没有加载完毕，直接导出
        if(val){
          // setTimeout(()=>{
          //   this.exportPdf()
          //   this.watchPdf = false
          // },60000)
        }
      }
    },
  data() {
    return {
      // exportLoading: false,
      decisionType,
      transferDom:[
        {DomId:'html2canvasTitle',key:'title'},
        {DomId:'html2canvasPartList',key:'partList'},
        {DomId:'html2canvasTasks',key:'tasks'},
        {DomId:'html2canvasDrawing',key:'drawing'},
        {DomId:'html2canvasBDl',key:'bdl'},
        {DomId:'html2canvasSingleSourcing',key:'singleSourcing'},
        {DomId:'html2canvasAbprice',key:'abPrice'},
        {DomId:'html2canvasTimeline',key:'timeline'},
        {DomId:'html2canvasAwardingScenario',key:'awardingScenario'},
        {DomId:'html2canvasRs',key:'rs'},
      ],
      clickIndex:0,
      loading:false,
      watchPdf:false,
      showPage: true,
      percentage:"0",
      percentageText:'导出中，请稍后',
    }
  },
  props:{
    exportLoading:{
      type:Boolean,
      default:false,
    }
  },
  methods: {
    exportPdf() {
      if(this.imgList.length&&!this.watchPdf){
        this.watchPdf = true
        return iMessage.warn('图片加载中，请稍等。。。')
      }
      if(!this.loading)
      setTimeout(()=>{this.handleExportPdf()},2000)  // 延迟 2s 渲染 img, canvas 元素
      return
    },
    
    // 导出pdf
    handleExportPdf() {
      this.loading = true
      console.time('截图')
      this.fileList = []
      const pageWH = []
      let domList = this.$refs.showPage.getElementsByClassName('pageCard-main')
      for (let i = 0; i < domList.length; i++) {
        pageWH.push({
          width:domList[i].offsetWidth,
          height:domList[i].offsetHeight,
          el:domList[i].cloneNode(true)
        });
        
      }
      const dom =  this.$refs.showPage.cloneNode(true)
      const elList = dom.getElementsByClassName('pageCard-main')
      this.elList = elList
      if(!elList.length){
        iMessage.warn('请稍等')
        this.$emit('changeStatus','exportLoading',false)
        return
      }
      this.pageLength = elList.length
      this.showPage = false
      setTimeout(async()=>{
        this.$nextTick(async()=>{
          console.log('start');
          for (let i = 0; i<this.pageLength; i++) {
            const el = elList[i]
            await this.getPdfImage({
              dom: el,
              WH: pageWH[i],
              j:i
            })
          }
        })
      },200)
    },
    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    async getPdfImage({
      //html横向导出pdf
      dom,
      WH,
      j
    }) {
      let scale = 2
      const el = this.$refs['pdf-containr']
      // canvas 不能通过innerHTML渲染
      if(dom.getElementsByTagName('canvas').length==0){
        dom.getElementsByClassName('pageNum')[0].innerHTML = `page ${j+1} of ${this.pageLength}`;
        el.style.width = WH.width + 'px'
        el.style.height = WH.height + 'px'
        el.innerHTML = dom.outerHTML
        await html2canvas(el, {
          // allowTaint:true,
          dpi: 96, //分辨率
          scale: scale, //设置缩放
          useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
          bgcolor: "#ffffff", //应该这样写
          logging: false, //打印日志用的 可以不加默认为false
          porxy: '',
          ignoreElements:(el)=>{
            if(el.id=='pdfHide'){
              return true
            }
            return false
          },
        }).then(async (canvas) => {
          this.changePercentage(j)
          this.getPdfFile(canvas,j)
        }).catch((error)=>{
          console.log(error);
        })
      }else{
        let length = this.$refs.showPage.getElementsByClassName('pageCard-main').length
        let el = this.$refs.showPage.getElementsByClassName('pageCard-main')[length-1]
        el.getElementsByClassName('pageNum')[0].innerHTML = `page ${j+1} of ${this.pageLength}`;
        el.style.width = WH.width + 'px'
        el.style.height = WH.height + 'px'
        await html2canvas(el, {
          // allowTaint:true,
          dpi: 96, //分辨率
          scale: scale, //设置缩放
          useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
          bgcolor: "#ffffff", //应该这样写
          logging: false, //打印日志用的 可以不加默认为false
          porxy: '',
          ignoreElements:(el)=>{
            if(el.id=='pdfHide'){
              return true
            }
            return false
          },
        }).then(async (canvas) => {
          this.changePercentage(j)
          this.getPdfFile(canvas,j)
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    changePercentage(j){
      this.percentage = parseInt((j+1)/this.pageLength*100)
    },
    async getPdfFile(copyCanvas,index,i=0){
      return new Promise((r,j)=>{
        copyCanvas.toBlob((blob) => {
          //以时间戳作为文件名 实时区分不同文件
          let filename = `${new Date().getTime()}.png`;
          let pdfFile = new File([blob], filename, { type: "image/png" });
          uploadUdFile({multifile:pdfFile}).then(res=>{
            if(res?.code=='200'){
              this.fileList.push({index, imageUrl: res.data[0].path });
              if(this.pageLength == this.fileList.length){
                console.timeEnd('截图')
                this.DownloadPdf()
              }
              r(true)
            }else{
              this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
              j(false)
            }
          }).catch(error=>{
            console.log(error);
            if(i==3) return
            getPdfFile(copyCanvas,index,++i)
            // this.$confirm('提示',`第${index}页截取失败，是否重试并继续导出`, {
            //   confirmButtonText: '确认',
            //   cancelButtonText: '返回',
            // }).then(() => {
            //   getPdfFile(copyCanvas,index)
            // }).catch(() => {
            //   this.pageLength--
            // });
          })
        });
      })
    },
    // 下载 pdf 文件
    async DownloadPdf(){
      let arr = this.fileList.filter(item=>!item.imageUrl)
      if(arr.length) return
      console.time('接口')
      if(this.percentage==100){
        this.percentageText = '下载中，请稍后'
      }
      const list = this.fileList.sort((a,b)=> a.index - b.index ).map((item)=>item.imageUrl);
      await decisionDownloadPdfLogo({filePaths:list, needLogo:false, needSplit:false, width: 841.89*2, height: 595.28*2}).then(()=>{
        this.$emit('changeStatus','exportLoading',false)
        console.timeEnd('接口')
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.pdf-containr{
  width: max-content;
  // height: 0;
  // position: absolute;
  // overflow: hidden;
}
.exportPdf {
  min-width: 1800px;
  // width: max-content;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  // position: relative;

  .tab-list {
    margin-top:40px
  }

  .btnControl {
    // width: 1920px; /*no*/
    width: 100%;
    text-align: right;
    position: absolute;
    height: 30px; /*no*/
    top: 30px; /*no*/
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 9999;
    padding-right: 20px;
  }

  .main {
    // width: 1920px; /*no*/
    width: 100%;
    padding: 30px 0; /*no*/
    margin: 0 auto;
    box-sizing: content-box;

    .title {  
      display: flex;
      align-items: center;
      font-size: 20px; /*no*/
      font-weight: bold;
      white-space: nowrap;
      height: 30px; /*no*/
      line-height: 30px; /*no*/
      // padding: 0 20px;

      .mtz {
        .num {
          color: $color-blue;
        }
      }

      .nomiType {
        margin-left: 14px; /*no*/
        font-size: 14px; /*no*/
        font-weight: normal;
        white-space: nowrap;
      }
    }

    .crossbar {
      padding: 0 5px; /*no*/
    }

    .content {
      margin-top: 30px; /*no*/
      ::v-deep .card {
        box-shadow: none;
        // border: 1px solid #999;
      }

      .module {
        & + .module {
          margin-top: 20px; /*no*/
        }
        
        ::v-deep.el-select .el-input__inner{
          box-shadow: none;
          border: 1px solid rgba(0,38,98,.15);
        }
        ::v-deep.el-select {
          overflow: hidden;
          .el-select__tags {
            overflow: visible;
            z-index: 20;
          }
          .el-input__inner{
            padding:8px 5px;
        }
        }
        ::v-deep.rsPdf{
          width:100%;
          // max-width: 1920px;
        }
      }
    }
  }
  #html2canvasAbprice{
    padding-bottom: 10px;
    ::v-deep.btnSearch{
      display: none;
    }
  }
  #html2canvasTasks{
    padding-bottom: 10px;
  }
  #html2canvasRs{
    ::v-deep.meeting{
      overflow: visible;
      height: auto;
      .card{
        // border-color: transparent;
        &.checkDate{
          margin-top: 20px;
        }
        .btnWrapper button{
          display: none;
        }
      }
    }
  }
}
::v-deep .pageCard-main{
  background: #FFF;
}
.exportPdf{
  #allMoudles{
    &>div+div{
      margin-top: 20px;
    }
  }
    ::v-deep .pdf-item{
      width: 100%;
      height: 0;
      overflow: hidden;
    }
    ::v-deep .pageCard-main{
      overflow: hidden;
      margin-top: 20px;
    }
    ::v-deep .pdf-containr{
      .pageCard-main{
        overflow: hidden;
        margin-top: 0px;
      }
    }
    ::v-deep .max-content{
      width: max-content;
      min-width: 1860px;
    }
    
  ::v-deep .rsPdfCard{
    box-shadow: none;
    & + .rsCard {
      margin-top: 20px; /*no*/
    }
    .cardHeader{
      padding: 30px 0px;
    }
    .cardBody{
      padding: 0px;
    }
  }
  ::v-deep .page-logo{
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
      border-top: 1px solid #666;
    }
}
.percentage-box{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99999;
  background: rgba(255,255,255,0.8);
}
.percentage-text{
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(32 160 255);
}
</style>
