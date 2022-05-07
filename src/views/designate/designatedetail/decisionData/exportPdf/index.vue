<template> <!-- 导出RS单决策资料 -->
  <div class="exportPdf" ref="exportPdf" :style="{'width': pageWidth + 80 + 'px'}">
    <div class="btnControl">
      <iButton :loading="exportLoading" @click="exportPdf">{{ language("DAOCHUPDF", "导出PDF") }}</iButton>
    </div>
    <div class="main" ref="contentPage">
      <div class="title">
        <span>{{ language("DINGDIANGUANLI", "定点管理") }}: {{ nominateAppId }}</span>
        <span class="mtz" v-if="this.nomiData.mtzApplyId">
          <span class="crossbar">-</span>
          <span class="num">MTZ{{ this.nomiData.mtzApplyId }}</span>
        </span>
        <span class="nomiType">{{ language("DINGDIANSHENQINGLEIXING", "定点申请类型") }}：{{ this.nomiData.nominateProcessTypeDesc }}</span>
      </div>
      <div class="content" id="allMoudles">
        <!-- title -->
        <div id="html2canvasTitle">
          <rsTitle class="module">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/title"/>
            </template>
          </rsTitle>
         </div>
        <!-- [ { "key": "Title", "name": "Title", "path": "/designate/decisiondata/title" }, 
        { "key": "PartList", "name": "Part List", "path": "/designate/decisiondata/partlist" },
         { "key": "Tasks", "name": "Tasks", "path": "/designate/decisiondata/tasks" },
          { "key": "Drawing", "name": "Drawing", "path": "/designate/decisiondata/drawing" },
           { "key": "BDL", "name": "BDL", "path": "/designate/decisiondata/bdl" }, 
           { "key": "SingleSourcing", "name": "Single Sourcing", "path": "/designate/decisiondata/singlesourcing" }, 
           { "key": "ABPrice", "name": "A-B Price", "path": "/designate/decisiondata/abprice" }, 
           { "key": "CostAnalysis", "name": "Cost Analysis", "path": "/designate/decisiondata/costanalysis" }, \
           { "key": "TimeLine", "name": "Timeline", "path": "/designate/decisiondata/timeline" },
            { "key": "Strategy", "name": "Strategy", "path": "/designate/decisiondata/strategy" },
             { "key": "AwardingScenario", "name": "Awarding Scenario", "path": "/designate/decisiondata/awardingscenario" },
              { "key": "RS", "name": "RS", "path": "/designate/decisiondata/rs" },
               { "key": "MTZ", "name": "MTZ", "path": "/designate/decisiondata/mtz", "isMtz": true }, 
               { "key": "Attachment", "name": "Attachment", "path": "/designate/decisiondata/attachment" } ] -->
        <!-- PartList -->
        <div id="html2canvasPartList">
          <partList class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/partlist"/>
            </template>
          </partList>
        </div>

        <!-- Tasks -->
        <div id="html2canvasTasks">
          <tasks class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/tasks"/>
            </template>
          </tasks>
        </div>

        <!-- drawing -->
        <div id="html2canvasDrawing">
          <drawing class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/drawing"/>
            </template>
          </drawing>
        </div>

        <!-- bdl -->
        <div id="html2canvasBDl">
          <bdl isExportPdf class="module">
            <template #tabTitle>
            <headerTab value="/designate/decisiondata/bdl"/>
            </template>
          </bdl>
        </div>

        <!-- singleSourcing -->
        <div id="html2canvasSingleSourcing">
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
        <div id="html2canvasTimeline">
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
        

        <div id="html2canvasRs" :key="key">
          <rs class="module" :nomiData="nomiData">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/rs"/>
            </template>
          </rs>
        </div>
      </div>
    </div>

    
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import { iButton, iTabsList, iMessage } from "rise"
import {nominateAppSDetail,decisionDownloadPdf, decisionDownloadPdfLogo} from "@/api/designate"
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
import { transverseDownloadPDF } from "@/utils/pdf"

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
        key: state => state.sourcing.updateKey,
    }),
  },
  created() {
    this.nominateAppId = this.$route.query.desinateId
    if (!this.nominateAppId) return

    this.nominateAppSDetail()
  },
  data() {
    return {
      // exportLoading: false,
      nominateAppId: "", // 定点申请id
      nomiData: {}, // 定点申请数据
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
    }
  },
  props:{
    exportLoading:{
      type:Boolean,
      default:false,
    }
  },
  methods: {
    nominateAppSDetail() {
      nominateAppSDetail({
        nominateAppId: this.nominateAppId
      }).then(res => {
        if (res.code == 200) {
          this.nomiData = res.data || {}
        }
      })
    },
    exportPdf() {
      this.handleExportPdf()
      return
      // this.exportLoading = true
      // transverseDownloadPDF({
      //   dom: this.$refs.contentPage,
      //   pdfName: `定点申请_${ this.$route.query.desinateId }_决策资料`,
      //   exportPdf: true,
      //   waterMark: true,
      //   callback: () => {
      //     this.exportLoading = false
      //   }
      // })
      
      
        if(this.clickIndex >= this.transferDom.length){
          this.checkAllImageUpload();
        }else{
          // a-b价渲染有延迟
          setTimeout(()=>{
            this.getPdfImage();
          },100)
        }

    },
    getPdfImage(){
        const ops = {
          scale:(1,1),
        };
        const {clickIndex,transferDom} = this;

        // const domId = '#'+transferDom[clickIndex]['DomId'];
        html2canvas(this.$el.querySelector('#allMoudles'),ops).then(canvas=>{


          // 为了处理分别截图延迟问题 现将整块截图后裁取
          transferDom.map((item,index)=>{
              let outOffsetTop = document.getElementById("allMoudles").offsetTop;
              let innerOffsetTop = document.getElementById(item.DomId).offsetTop
              
              let offsetTop = innerOffsetTop - outOffsetTop;
              let offsetHeight = document.getElementById(item.DomId).offsetHeight;

              console.log(item.DomId+':','offsetTop:'+offsetTop,'offsetHeight:'+offsetHeight);

           
              var ctx=canvas.getContext("2d");
              var imgData=ctx.getImageData(0,offsetTop,1920,offsetHeight);

              
              var copyCanvas = document.getElementById("myCanvas");
              copyCanvas.width = '1920';
              copyCanvas.height = offsetHeight;
              
              var ctxs = copyCanvas.getContext("2d");
              ctxs.putImageData(imgData,0,0);

              // const url = copyCanvas.toDataURL("image/png")
              // const a = document.createElement('a');
              // a.href = url;
              // a.setAttribute('download', 'chart-download');
              // a.click();

              
                this.clickIndex++;


                var imgurl = copyCanvas.toBlob((blob)=>{
                  //以时间戳作为文件名 实时区分不同文件
                  let filename = `${new Date().getTime()}.png`;

                  console.log(blob,'copyCanvas')
                  //转换canvas图片数据格式为formData
                  let pdfFile = new File([blob], filename, {type: 'image/png'});
                  // let formData = new FormData();
                  // formData.append('file', pdfFile);
                  
                  this.transferDom[index]['pdfFile'] = pdfFile;
                  this.checkAllFilesDone();
                })
              // if(this.clickIndex < transferDom.length) this.getPdfImage();
              // else this.exportLoading = false;
            })
             
        });
    },

    // 查看所有图片是否上传完毕
    async checkAllImageUpload(){
      const { transferDom=[] } = this;
      const filter = transferDom.filter((item)=>item.imageUrl);
      if(filter.length == transferDom.length){ // 上传完毕
        const list = transferDom.map((item)=>item.imageUrl);
        await decisionDownloadPdf(list).then((res)=>{
          this.$emit('changeStatus','exportLoading',false)
        }).catch((err)=>{
          this.$emit('changeStatus','exportLoading',false)
        })
      }
    },

    // 查看所有图片是否生成完毕
    async checkAllFilesDone(){
      const { transferDom=[] } = this;
      const filter = transferDom.filter((item)=>item.pdfFile);
       if(filter.length == transferDom.length){ // 生成完毕
        //将转换为formData的canvas图片 上传到服务器
        transferDom.map((item)=>{
          uploadUdFile({
          multifile: item.pdfFile
        }).then((res=>{
          if(res.code == 200){
            item['imageUrl'] = res.data[0].path || '';
            this.checkAllImageUpload();
          }else{
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }));
        })
        
       }
    },
    // 导出pdf
    async handleExportPdf() {
      this.fileList = []
      let elList = this.$refs.exportPdf.getElementsByClassName('pageCard-main')
      // console.log(elList);
      setTimeout(async () => {
        if(!elList.length){
          iMessage.warn('请稍等')
          this.$emit('changeStatus','exportLoading',false)
          return
        }
        for (let i = 0; i < elList.length; i++) {
          const el = elList[i];
          if(el.getElementsByClassName('pageNum')[0])
          el.getElementsByClassName('pageNum')[0].innerHTML = `page ${i+1} of ${elList.length}`;
          console.log(i,'=>img:start');
          await this.getPdfImage({
            dom: el,
            index: i
          })
          console.log(i,'=>img:end');
        }
        this.uploadUdFile();
      }, 0)
    },
    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    async getPdfImage({
      //html横向导出pdf
      dom,
      index
    }) {
      await html2canvas(dom, {
        allowTaint:true,
        dpi: 96, //分辨率
        scale: 2, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        bgcolor: "#ffffff", //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
      }).then(async (canvas) => {
          await this.getPdfFile(canvas,index)
      });
    },

    async getPdfFile(copyCanvas,num){
      return new Promise((r,j)=>{
        copyCanvas.toBlob((blob) => {
          //以时间戳作为文件名 实时区分不同文件
          let filename = `${new Date().getTime()}.png`;
          let pdfFile = new File([blob], filename, { type: "image/png" });
          this.fileList.push({ file: pdfFile, index: num });
          r(num)
        });
      })
    },
    // 下载 pdf 文件
    async DownloadPdf(){
      let arr = this.fileList.filter(item=>!item.imageUrl)
      if(arr.length) return
      const list = this.fileList.map((item)=>item.imageUrl);
      await decisionDownloadPdfLogo({filePaths:list, needLogo:false, needSplit:false, width: 841.89*2, height: 595.28*2})
      this.$emit('changeStatus','exportLoading',false)
    },

    // 上传图片
    async uploadUdFile(){
      this.fileList.map((item)=>{
        uploadUdFile({
        multifile: item.file
        }).then(res=>{
          if(res.code == 200){
            item['imageUrl'] = res.data[0].path
            console.log(res.data[0].objectUrl);
            this.DownloadPdf();
          }else{
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        });
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.exportPdf {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  position: relative;

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
      >div{
        padding: 0 20px;
      }

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
#allMoudles{
  &>div+div{
    margin-top: 20px;
  }
  
  ::v-deep .pdf-item{
    width: 100%;
    height: 0;
    overflow: hidden;
  }
  ::v-deep .pageCard-main{
    // overflow: hidden;
    margin-top: 20px;
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
</style>
