<template> <!-- 导出RS单决策资料 -->
<div>
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
        <div class="showPage" ref="showPage">
        <!-- title -->
        <div id="html2canvasTitle">
          <rsTitle class="module">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/title"/>
            </template>
          </rsTitle>
         </div>
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
        

        <div id="html2canvasRs">
          <rs class="module" :nomiData="nomiData">
            <template #tabTitle>
              <headerTab value="/designate/decisiondata/rs"/>
            </template>
          </rs>
        </div>
        <canvas id="myCanvas"></canvas>
        </div>
        <div ref="pdf-containr" class="pdf-containr"></div>
      </div>
    </div>
  </div>
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
        updateKey: state => state.sourcing.updateKey,
        imgList: state => state.sourcing.imgList,
    }),
  },
    watch: {
      updateKey(val){
        this.$forceUpdate()
      },
      imgList(val){ // 图片加载完毕之后在执行导出
      console.log(val);
        if(!val.length&&this.watchPdf){
          this.exportPdf()
          this.watchPdf = false
        }
      },
      watchPdf(val){  // 40秒后图片还是没有加载完毕，直接导出
        if(val){
          setTimeout(()=>{
            this.exportPdf()
            this.watchPdf = false
          },40000)
        }
      }
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
      loading:false,
      watchPdf:false
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
      console.log(this.imgList);
      if(this.imgList.length&&!this.watchPdf){
        this.watchPdf = true
        return iMessage.warn('图片加载中，请稍等。。。')
      }
      if(!this.loading)
      this.handleExportPdf()
      return
    },
    // 查看所有图片是否上传完毕
    async checkAllImageUpload(){
      const { transferDom=[] } = this;
      const filter = transferDom.filter((item)=>item.imageUrl);
      if(filter.length == transferDom.length){ // 上传完毕
        const list = transferDom.map((item)=>item.imageUrl);
        await decisionDownloadPdf(list).then((res)=>{
          // this.$emit('changeStatus','exportLoading',false)
        }).catch((err)=>{
          // this.$emit('changeStatus','exportLoading',false)
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
      this.loading = true
      console.time('截图')
      this.fileList = []
      let elList = this.$refs.showPage.getElementsByClassName('pageCard-main')
      setTimeout(async () => {
        console.log(elList);
        if(!elList.length){
          iMessage.warn('请稍等')
          this.$emit('changeStatus','exportLoading',false)
          return
        }
        // let div = document.createElement('div')
        // div.setAttribute('class','pdfItem')
        // let sumHeight = 0
        // this.$refs['pdf-containr'].innerHTML = ''
        // let WH = []
        // let list = []
        // let j = 0
        // const pageLength = elList.length
        // this.pageLength = pageLength
        // for (let i = 0; i<pageLength; i++) {
        //   const el = elList[0]
        //   WH.push({width: el.offsetWidth+'', height: el.offsetHeight+''})
        //   if(el.getElementsByClassName('pageNum')[0])
        //   el.getElementsByClassName('pageNum')[0].innerHTML = `page ${i+1} of ${pageLength}`;
        //   sumHeight+=el.offsetHeight
        //   const elDom = el;
        //   const itemDom = document.createElement('div')
        //   itemDom.style.width = el.offsetWidth +'px'
        //   itemDom.style.height = el.offsetHeight + 'px'
        //   itemDom.appendChild(elDom)
        //   if(sumHeight>=14000/2){
        //     this.$refs['pdf-containr'].appendChild(div)
        //       list.push(j)
        //       j = i
        //       sumHeight = el.offsetHeight
        //       div = document.createElement('div')
        //       div.setAttribute('class','pdfItem')
        //   }
        //   div.appendChild(itemDom)
        // }
        // list.push(j)
        // this.$refs['pdf-containr'].appendChild(div)
        // let pdfPageList = this.$refs['pdf-containr'].getElementsByClassName('pdfItem')
        for (let index = 0; index < elList.length; index++) {
          let pdfItem = elList[index];
          await this.getPdfImage({
                  dom: pdfItem,
                  // WH,
                  // j:list[index]
                  j:index
                })
        }
        elList = null
        this.fileList = []
        // this.$refs['pdf-containr'].innerHTML = ''
      }, 10)
    },
    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    async getPdfImage({
      //html横向导出pdf
      dom,
      // WH,
      j
    }) {
      let scale = 2
      console.log('j=>start',j);
      console.time('img'+j);
      await html2canvas(dom, {
        imageTimeout:10000,
        allowTaint:true,
        dpi: 96, //分辨率
        scale: scale, //设置缩放
        // useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        bgcolor: "#ffffff", //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
      }).then(async (canvas) => {
        console.timeEnd('img'+j);
        console.log('j=>end',j);
        // let copyCanvas = document.getElementById("myCanvas");
        // let ctx=canvas.getContext("2d");
        // let height = canvas.height
        // let offsetHeight = 0
        // let i = 0
        // while(height>20){
          // let width = (WH[j+i]?.width || WH[0].width) * scale
          // let pageHeight = (WH[j+i]?.height || WH[0].height) * scale
          // let width = canvas.width
          // let pageHeight = canvas.height
          // copyCanvas.width = width
          // copyCanvas.height = pageHeight
          // const imgData=ctx.getImageData(0,0,canvas.width,canvas.height );
          // const ctxs = copyCanvas.getContext("2d");
          // ctxs.putImageData(imgData,0,0);
          // console.log('img=>',j,);
          this.getPdfFile(canvas,j)
          // height -= pageHeight
          // offsetHeight+=pageHeight
          // i++
          // ctxs.clearRect(0, 0, canvas.width,canvas.height); //清空截图画布
        // }
      }).catch((error)=>{
        console.log(error);
      });
    },

    async getPdfFile(copyCanvas,index){
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
          })
        });
      })
    },
    // 下载 pdf 文件
    async DownloadPdf(){
      let arr = this.fileList.filter(item=>!item.imageUrl)
      console.log(arr);
      if(arr.length) return
      console.time('接口')
      const list = this.fileList.sort((a,b)=> a.index - b.index ).map((item)=>item.imageUrl);
      await decisionDownloadPdfLogo({filePaths:list, needLogo:false, needSplit:false, width: 841.89*2, height: 595.28*2}).then(()=>{
        this.$emit('changeStatus','exportLoading',false)
        console.timeEnd('接口')
      })
    },
    // 上传图片
    async uploadUdFile(){
      this.fileList.map((item)=>{
        uploadUdFile({
        multifile: item.file
        }).then(res=>{
          if(res.code == 200){
            item['imageUrl'] = res.data[0].path
            // console.log(res.data[0].objectUrl);
            this.$nextTick(()=>{
              this.DownloadPdf();
            })
          }else{
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch(()=>{
          this.$message.error('PDF 导出失败')
          uploadUdFile({
          multifile: item.file
          }).then(res=>{
            if(res.code == 200){
              item['imageUrl'] = res.data[0].path
              console.log(res.data[0].objectUrl);
              this.$nextTick(()=>{
                this.DownloadPdf();
              })
            }else{
              this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          }).catch(()=>{
            this.$emit('changeStatus','exportLoading',false)
          })
        });
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
</style>
