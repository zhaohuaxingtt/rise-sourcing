<!--
 * @Author: your name
 * @Date: 2021-09-02 10:00:24
 * @LastEditTime: 2021-09-08 10:12:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\svw\components\saveDialog.vue
-->
<template>
  <div>
    <iDialog :title="language('BAOCUN','保存')"
             :visible.sync="dialogVisible"
             @close="clearDialog"
             width="70%">
      <div id="content">
        <iCard>
          <div class="head">
            <div class="left">SVW供应商市场总览
              <span>
                {{categoryCode}}
              </span>
              <span>-</span>
              <span>{{categoryName}}</span>
            </div>
            <div class="right">
              <iButton @click="save"
                       v-show="savereport">生成报告</iButton>
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

          <list v-for="(x,index) of MarketOverviewDTO"
                :key="index"
                :MarketOverviewObj=x
                :index="index+1"
                :edite="edite"
                @returnObj="getreturnObj"></list>

        </iCard>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iCard, iDialog, iMessage, iButton } from 'rise'
import list from './list'
import { downloadPDF, dataURLtoFile } from "@/utils/pdf"
import { marketOverview, saveMarketOverview } from '@/api/partsrfq/svw/index.js'
import { uploadUdFile } from "@/api/file/upload";
export default {
  data () {
    return {
      statueImg: require('../img/img.png'),
      svwImg: require('../img/note.png'),
      userImg: require('../img/user.png'),
      savereport: true
    }
  },
  mounted () {
    this.categoryCode = this.$store.state.rfq.categoryCode
    this.categoryName = this.$store.state.rfq.categoryName
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    MarketOverviewDTO: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    iDialog,
    iCard,
    list,
    iButton
  },
  methods: {
    clearDialog () {
      this.$emit('changeVisible', false)
    },
    save () {
      this.savereport = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      downloadPDF({
        idEle: "content",
        pdfName: "SVW供应商市场总览" + this.categoryCode + '-' + this.categoryName,
        exportPdf: true,
        callback: async (pdf, pdfName) => {
          try {
            const time = new Date().getTime();
            const filename = pdfName + time + ".pdf";
            const pdfFile = pdf.output("datauristring");
            const blob = dataURLtoFile(pdfFile, filename);
            uploadUdFile({
              applicationName: 'sourcing',
              businessId: Math.ceil(Math.random() * 100000),
              multifile: blob
            }).then(res => {
              this.savereport = true
              const data = res.data[0]
              let arr = data.path.match(/^(?:[^\/]|\/\/)*/)
              let arr2 = data.path.split(arr[0])
              loading.close();
            });
          } catch {
            loading.close();
            iMessage.error("保存失败");
            this.clearDialog()
          }
        },
      });
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