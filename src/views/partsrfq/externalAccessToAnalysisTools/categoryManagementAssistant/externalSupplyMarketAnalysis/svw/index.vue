<template>
  <iPage>
    <div id="content">
      <iCard>

        <div class="head">
          <div class="left">供应商市场总览<span>材料组编号-材料组名称</span></div>
          <div class="right">
            <iButton @click="edite=!edite">{{edite?'编辑':'取消'}}</iButton>
            <iButton @click="saveMarket">{{edite?'返回':'保存'}}</iButton>
          </div>
        </div>
        <!-- tittle -->
        <div class="moudle-tittle">
          <div class="module1"><img :src="statueImg"
                 class="imgStatus" />供应商财务状况</div>
          <div class="turnover">
            <div class="module2-left"><img class="imgStatus"
                   :src="svwImg" />营业额占比</div>
            <div>当前材料组占比: 11.00%</div>
          </div>
          <div class="module3"><img class="imgStatus"
                 :src="userImg" />供应商主要客户</div>
        </div>
        <list v-for="(x,index) of MarketOverviewDTO"
              :key="index"
              :MarketOverviewObj=x
              :index="index+1"
              :edite="edite"></list>

      </iCard>
    </div>
  </iPage>
</template>

<script>
import { iButton, iPage, iCard, iInput, iSelect, iMessage } from 'rise'
import { marketOverview, saveMarketOverview } from '@/api/partsrfq/svw/index.js'
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadFile } from "@/api/file/upload";
import list from './components/list'
export default {
  data () {
    return {
      edite: true,
      statueImg: require('./img/img.png'),
      svwImg: require('./img/note.png'),
      userImg: require('./img/user.png'),
      MarketOverviewDTO: [],
      SchemeId: "",
      categoryCode: ""
    }
  },
  components: {
    iButton,
    iPage,
    iCard,
    iInput,
    iSelect,
    list
  },
  created () {
    this.getmarketOverview()
  },
  methods: {
    getmarketOverview () {
      marketOverview({ categoryCode: '9999' }).then(res => {
        console.log(res)
        this.SchemeId = res.data.id
        this.MarketOverviewDTO = JSON.parse(JSON.stringify(res.data.marketOverviewDTOList))
      })
    },
    saveMarket () {
      this.edite = true
      this.categoryCode = this.$store.state.rfq.categoryCode
      downloadPDF({
        idEle: "content",
        pdfName: "1111",
        callback: async (pdf, pdfName) => {
          try {
            const time = new Date().getTime();
            const filename = pdfName + time + ".pdf";
            const pdfFile = pdf.output("datauristring");
            const blob = dataURLtoFile(pdfFile, filename);
            const formData = new FormData();
            formData.append("multipartFile", blob);
            formData.append("applicationName", "rise");
            const res = await uploadFile(formData);
            console.log(res)
            // iMessage.success("保存成功");
          } catch {
            iMessage.err("保存失败");
          }
        },
      });
      // saveMarketOverview({
      //   categoryCode: this.categoryCode,
      //   id: this.SchemeId
      // })
    },
    changeViewObj (val, index) {
      console.log(val, index)
    }
  }
}
</script>

<style lang="scss" scoped>
    .head{
        display: flex;
        justify-content: space-between;
        .left{
            font-size: 22px;
            font-weight: bold;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span{
                margin-left: 20px;
                display: inline-block;
                font-size: 16px;
                opacity: 0.42;
            }
        }
    }
    .moudle-tittle{
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 36px;
        margin-bottom: 17px;
        div{
           flex: 1;
        }
        .turnover{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right:30px;
            // div{
            //     width: 50%;
            // }
        }
        .module1{
          margin-right: 40px;
        }
    }
    .module1,.module2-left,.module3{
         display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .imgStatus{
            width:40px;
            height:40px;
            margin-right: 10px;
            display: inline-block;
        }
</style>