<template>

  <div>
    <iCard>
      <div :class="{isFixed:isFixeds==true}">
        <div class="head">
          <div class="left">SVW供应商市场总览
            <span>
              {{categoryCode}}
            </span>
            <span>-</span>
            <span>{{categoryName}}</span>
          </div>
          <div class="right">
            <iButton @click="edite=!edite">{{edite?'编辑':'取消'}}</iButton>
            <iButton @click="$router.go(-1)"
                     v-show="edite">返回</iButton>
            <iButton @click="saveMarket"
                     v-show="!edite">保存</iButton>
            <iButton v-show="edite"
                     @click="pdf">生成报告</iButton>
          </div>
        </div>
        <!-- tittle -->
        <div class="moudle-tittle">
          <div class="module1"><img :src="statueImg"
                 class="imgStatus" />供应商财务状况</div>
          <div class="turnover">
            <div class="module2-left"><img class="imgStatus"
                   :src="svwImg" />营业额占比</div>
          </div>
          <div class="module3"><img class="imgStatus"
                 :src="userImg" />供应商主要客户</div>
        </div>
      </div>

      <div style="overflow:auto;height:620px;padding-right:10px">
        <list v-for="(x,index) of MarketOverviewDTO"
              :key="index"
              :MarketOverviewObj=x
              :index="index+1"
              :edite="edite"
              @returnObj="getreturnObj"></list>
      </div>
    </iCard>
    <saveDialog :dialogVisible="dialogVisible"
                :MarketOverviewDTO="MarketOverviewDTO"
                @changeVisible="close"></saveDialog>
  </div>

</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect, iMessage } from 'rise'
import { marketOverview, saveMarketOverview, marketOverviewReport } from '@/api/partsrfq/svw/index.js'
import { downloadPDF, dataURLtoFile } from "@/utils/pdf"
import { uploadUdFile } from "@/api/file/upload";
import list from './components/list'
import saveDialog from './components/saveDialog'
export default {
  data () {
    return {
      edite: true,
      statueImg: require('./img/img.png'),
      svwImg: require('./img/note.png'),
      userImg: require('./img/user.png'),
      dialogVisible: false,
      MarketOverviewDTO: [],
      SchemeId: "",
      categoryCode: "",
      categoryName: "",
      savereport: true,
      isFixeds: false,
      isFirst: true
    }
  },
  components: {
    iButton,
    iPage,
    iCard,
    iInput,
    iSelect,
    saveDialog,
    list
  },
  created () {
    this.categoryCode = this.$store.state.rfq.categoryCode
    this.categoryName = this.$store.state.rfq.categoryName
    this.getmarketOverview()
  },
  mounted () {

  },
  watch: {
    '$store.state.rfq.categoryCode': {
      handler (val) {
        this.categoryCode = val
        this.getmarketOverview()
      }
    },
    '$store.state.rfq.categoryName': {
      handler (val) {
        this.categoryName = val
        // this.getmarketOverview()
      }
    }
  },
  methods: {
    getmarketOverview () {
      marketOverview({ categoryCode: this.categoryCode, isFirst: this.isFirst }).then(res => {
        if (res.data) {
          this.SchemeId = res.data.id
          this.MarketOverviewDTO = JSON.parse(JSON.stringify(res.data.marketOverviewDTOList))
        }
      })
    },
    saveMarket () {
      this.edite = true
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      saveMarketOverview({
        categoryCode: this.categoryCode,
        id: this.SchemeId,
        // reportUrl: arr2[1],
        // reportFileName: data.name,
        marketOverviewSaveDTOList: this.MarketOverviewDTO
      }).then(res => {
        this.isFirst = false
        loading.close();
        iMessage.success("保存成功");
        this.getmarketOverview()
        this.clearDialog()
      })

      // this.categoryCode = this.$store.state.rfq.categoryCode
    },
    pdf () {
      this.dialogVisible = true
      this.edite = true
      // this.savereport = false
      // downloadPDF({
      //   idEle: "content",
      //   pdfName: "SVW供应商市场总览" + this.categoryCode + '-' + this.categoryName,
      //   exportPdf: true,
      //   callback: async (pdf, pdfName) => {
      //     try {
      //       const time = new Date().getTime();
      //       const filename = pdfName + time + ".pdf";
      //       const pdfFile = pdf.output("datauristring");
      //       const blob = dataURLtoFile(pdfFile, filename);
      //       uploadUdFile({
      //         applicationName: 'sourcing',
      //         businessId: Math.ceil(Math.random() * 100000),
      //         multifile: blob
      //       }).then(res => {
      //         const data = res.data[0]
      //         let arr = data.path.match(/^(?:[^\/]|\/\/)*/)
      //         let arr2 = data.path.split(arr[0])
      //         marketOverviewReport({
      //           "categoryCode": this.categoryCode,
      //           id: this.SchemeId,
      //           "reportFileName": data.name,
      //           // "reportName": "string",
      //           "reportUrl": arr2[1],
      //           // "schemeName": "string",
      //         })
      //         this.savereport = true
      //       });
      //     } catch {
      //       iMessage.error("保存失败");
      //       this.clearDialog()
      //     }
      //   },
      // });
    },
    getreturnObj (val, index) {
      console.log(val, index)
      this.MarketOverviewDTO[index] = val
      console.log(this.MarketOverviewDTO)
    },
    changeViewObj (val, index) {
      console.log(val, index)
    },
    close (val) {
      this.dialogVisible = val
    }

  }
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      margin-left: 20px;
      display: inline-block;
      font-size: 16px;
      opacity: 0.42;
    }
  }
}
.moudle-tittle {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 36px;
  margin-bottom: 17px;
  div {
    flex: 1;
  }
  .turnover {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // div{
    //     width: 50%;
    // }
  }
  .module1 {
    margin-right: 40px;
  }
}
.module1,
.module2-left,
.module3 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.module2-right {
  display: flex;
  justify-content: flex-end;
}
.imgStatus {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: inline-block;
}
.isFixed {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
  z-index: 999;
}
</style>