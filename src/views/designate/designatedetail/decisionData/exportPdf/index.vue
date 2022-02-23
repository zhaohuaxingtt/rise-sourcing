<template> <!-- 导出RS单决策资料 -->
  <div class="exportPdf">
    <div class="btnControl">
      <iButton :loading="exportLoading" @click="exportPdf">{{ language("DAOCHUPDF", "导出PDF") }}</iButton>
    </div>
    <div class="main" ref="contentPage" id="allMoudles">
      <div class="title">
        <span>{{ language("DINGDIANGUANLI", "定点管理") }}: {{ nominateAppId }}</span>
        <span class="mtz" v-if="this.nomiData.mtzApplyId">
          <span class="crossbar">-</span>
          <span class="num">MTZ{{ this.nomiData.mtzApplyId }}</span>
        </span>
        <span class="nomiType">{{ language("DINGDIANSHENQINGLEIXING", "定点申请类型") }}：{{ this.nomiData.nominateProcessTypeDesc }}</span>
      </div>
      <div class="content">
        <!-- title -->
        <div id="html2canvasTitle">
          <headerTab value="/designate/decisiondata/title"/>
          <rsTitle class="module"/>
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
          <headerTab value="/designate/decisiondata/partlist"/>
          <partList class="module"/>
        </div>

        <!-- Tasks -->
        <div id="html2canvasTasks">
          <headerTab value="/designate/decisiondata/tasks"/>
          <tasks class="module"/>
        </div>

        <!-- drawing -->
        <div id="html2canvasDrawing">
          <headerTab value="/designate/decisiondata/drawing"/>
          <drawing class="module"/>
        </div>

        <!-- bdl -->
        <div id="html2canvasBDl">
          <headerTab value="/designate/decisiondata/bdl"/>
          <bdl class="module"/>
        </div>

        <!-- singleSourcing -->
        <div id="html2canvasSingleSourcing">
          <headerTab value="/designate/decisiondata/singlesourcing"/>
          <singleSourcing class="module"/>
        </div>

        <!-- abprice -->
        <div id="html2canvasAbprice">
          <headerTab value="/designate/decisiondata/abprice"/>
          <abPrice class="module"/>
        </div>

        <!-- timeline -->
        <div id="html2canvasTimeline">
          <headerTab value="/designate/decisiondata/timeline"/>
          <timeline class="module"/>
        </div>
        <!-- awardingScenario -->
        <div id="html2canvasAwardingScenario">
          <div  class="tab-list">
            <headerTab value="/designate/decisiondata/awardingscenario"/>
          </div>
          <awardingScenario class="module" />
        </div>
        

        <div id="html2canvasRs">
            <headerTab value="/designate/decisiondata/rs"/>
          <rs class="module" :nomiData="nomiData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton, iTabsList } from "rise"
import {nominateAppSDetail,decisionDownloadPdf} from "@/api/designate"
import rsTitle from "./components/rsTitle"
import partList from "./components/partList"
import tasks from "./components/tasks"
import drawing from "./components/drawing"
import bdl from "./components/bdl"
import singleSourcing from "./components/singleSourcing"
import timeline from "./components/timeline"
import rs from "./components/rs"
import awardingScenario from '../../awardingscenario'
import abPrice from '../abPrice'
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
          console.log("nmsl", this.nomiData)
        }
      })
    },
    exportPdf() {
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
      
      // this.transferDom.map((item)=>{
      //   html2canvas(this.$el.querySelector('#'+item.DomId)).then(canvas=>{
        this.getPdfImage();
      // })

    },
    getPdfImage(){
        const ops = {
          scale:(1,1),
        };
        const {clickIndex,transferDom} = this;
        const domId = '#'+transferDom[clickIndex]['DomId'];
        html2canvas(this.$el.querySelector(domId),ops).then(canvas=>{
            var imgurl = canvas.toBlob((blob)=>{
            //以时间戳作为文件名 实时区分不同文件
              let filename = `${new Date().getTime()}.png`;
              //转换canvas图片数据格式为formData
              let pdfFile = new File([blob], filename, {type: 'image/png'});
              // let formData = new FormData();
              // formData.append('file', pdfFile);

              //将转换为formData的canvas图片 上传到服务器
                uploadUdFile({
                  multifile: pdfFile
                }).then((res=>{
                  if(res.code == 200){
                    console.log(res.data,'res.data.pathres.data.pathres.data.path')
                    this.transferDom[clickIndex]['imageUrl'] = res.data[0].path || '';
                    this.checkAllImageUpload();
                  }else{
                    this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                  }
                }));

              })
            
            // const url = canvas.toDataURL("image/png")

            // const a = document.createElement('a');
            // a.href = url;
            // a.setAttribute('download', 'chart-download');
            // a.click();
            this.clickIndex++;
            if(this.clickIndex < transferDom.length) this.getPdfImage();
            // else this.exportLoading = false;
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
    width: 1920px; /*no*/
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
    width: 1920px; /*no*/
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
      padding: 0 20px;

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
        border: 1px solid #999;
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
          max-width: 1920px;
        }
      }
    }
  }
  #html2canvasAbprice{
    ::v-deep.btnSearch{
      display: none;
    }
  }
}
</style>
