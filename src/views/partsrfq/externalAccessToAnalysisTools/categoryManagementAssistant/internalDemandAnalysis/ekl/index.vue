<template>
  <iCard id="batchSupplier">
    <template slot="header">
      <div class="flex-between-center title">
        <div class="flex-align-center">
          <span class="margin-right10">{{language("WODEYEJI", "我的业绩")}}</span>
          <el-tooltip effect="light"
                      placement="right">
            <div slot="content">
              <!-- <p>{{language('','')}}</p> -->
            </div>
            <!-- <icon slot="reference"
                name="iconxinxitishi"
                symbol
                class="cursor"></icon> -->
            <i class="el-icon-warning-outline margin-left10 tishi"></i>
          </el-tooltip>
          <!-- <span class="dw" :class="btnsgroup1.length?'mr40':''" v-text="!show?'单位：百万元':'Unit：Mio'"></span> -->
          <span class="dw"
                :class="btnsgroup1.length?'mr40':''">{{language("Unit：Mio","单位：百万元")}}</span>
        </div>
        <div class="flex">
          <iButton @click="save"
                   :loading="saveLoading" v-permission="CATEGORY_ASSISTANT_EKL_BAOCUN">{{language("BAOCUN","保存")}}</iButton>
          <iButton @click="goback">{{language("FANHUI","返回")}}</iButton>
        </div>
      </div>
    </template>
    <!-- powerBi -->
    <!-- <div id="powerBi" v-if="rollPer"></div> -->
    <div>
      <keep-live :include="['zfgsj', 'zfkssj','zfcgysj','zfbmsj','wfbmsj','wfkssj','pfjwfbmsj','pfjwfkssj','pfjzfbmsj','pfjzfcgysj','pfjzfgsj','pfjzfkssj']">
        <component :is="currentView"
                   @getData="getData"
                   :username="username" />
      </keep-live>
    </div>
  </iCard>

</template>

<script>
import { iPage, iNavMvp, iButton, iCard, icon, iMessage } from 'rise';
// import {tabRouterList} from '../data';
import { getEklPbi, getPowerBiVal } from '@/api/achievement'
import * as pbi from 'powerbi-client';
import zfbmsj from './components/zfbmsj.vue'
import zfkssj from './components/zfkssj.vue'
import zfcgysj from './components/zfcgysj.vue'
import zfgsj from './components/zfgsj.vue'
import pfjzfbmsj from './components/pfjzfbmsj.vue'
import pfjzfkssj from './components/pfjzfkssj.vue'
import pfjzfcgysj from './components/pfjzfcgysj.vue'
import pfjzfgsj from './components/pfjzfgsj.vue'
import wfbmsj from './components/wfbmsj.vue'
import wfkssj from './components/wfkssj.vue'
import pfjwfkssj from './components/pfjwfkssj.vue'
import pfjwfbmsj from './components/pfjwfbmsj.vue'

import { downloadPdfMixins } from '@/utils/pdf'

import {
  categoryAnalysis,
} from '@/api/categoryManagementAssistant/internalDemandAnalysis'

export default {
  components: {
    icon,
    iPage,
    iCard,
    iNavMvp,
    iButton,
    zfbmsj,
    zfkssj,
    zfcgysj,
    zfgsj,
    pfjzfbmsj,
    pfjzfkssj,
    pfjzfcgysj,
    pfjzfgsj,
    wfbmsj,
    wfkssj,
    pfjwfkssj,
    pfjwfbmsj
  },
  mixins: [downloadPdfMixins],
  data () {
    return {
      // tabRouterList,
      btnsgroup1: [],
      // indexBtn: 0,
      currentView: '',
      username: '8',
      url: {
        accessToken: "", //验证token
        embedUrl: "", //报告信息内嵌地址
        tokenExpiry: "", //token过期时间
      },
      report: null,
      name: '',
      filter: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "app_supplier_fin_analysis_sum_nt_daily",
          column: "subject_name"
        },
        operator: "In",
        values: [],//[this.name],// values
        filterType: null,
        requireSingleSelection: true
      },
      values: [],
      // show: false,
      state: false, // 控制科室采购员
      roleList: this.$store.state.permission.userInfo.roleList,
      // rollPer:true,

      // saveLoading:false,
      // choise:true,
      powerbi: null,
      // reportContainer: null,
      // config:{},
      numberChange: 0,
    };
  },
  created () {
    console.log(this.roleList)
    // console.log(this.$store.state)
    // console.log(this.$store.state.rfq)
    // console.log(this.$store.state.rfq.categoryCode)
  },
  watch: {
    '$store.state.rfq.categoryCode': {
      handler (val) {
        if (this.numberChange !== 0) {
          this.renderBi();
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 科室
    dept () {
      return this.$store.state.permission.userInfo.deptDTO.deptNum || this.$store.state.permission.userInfo.deptDTO.fullCode
    },
    pfjgly () {
      return this.roleList.some(item => item.code == 'PFJYJGLY')
    },
    // 角色判断
    role () {
      const deptName = this.$store.state.permission.userInfo.deptDTO.deptNum
    console.log(this.roleList)
      if (this.roleList.length == 1) {
        const Linie = this.roleList.some(item => item.code == 'LINIE')
        const zycgkzORkzzl = this.roleList.some(item => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ' || item.code == 'ZYCGKSXTY')
        const zycgkz = this.roleList.some(item => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ')
        const kzzl = this.roleList.some(item => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY')
        const zycgbzORbzzl = this.roleList.some(item => item.code == 'BZZL' || item.code == 'CGBZ')
        const zycgbz = this.roleList.some(item => item.code == 'CGBZ')
        const bzzl = this.roleList.some(item => item.code == 'BZZL')
        const zycggz = this.roleList.some(item => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ')
        const CGBZ_WF = this.roleList.some(item => item.code == 'CGBZ_WF')
        const ZYCGKZ_WF = this.roleList.some(item => item.code == 'ZYCGKZ_WF')
        const PFJYJGLY = this.roleList.some(item => item.code == 'PFJYJGLY')
        if (PFJYJGLY) {
          //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
          //            this.btnsgroup1 = ['CS(Spare)']
        } else if (Linie) {        // 采购员 采购员视觉
          this.username = '8'
          this.btnsgroup1 = ['Linie', 'Linie(Spare)']
          return 'Linie'
        } else if (zycgkzORkzzl) { // 采购科长||科长助理 科室视觉
          if (zycgkz) {
            this.username = '3'
            this.btnsgroup1 = ['CSM', 'CSM(Spare)']
            return 'KZ'
          }
          if (kzzl) {
            this.username = '4'
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
            return deptName
          }
        } else if (zycgbzORbzzl) { // 采购部长||部长助理 部门视觉
          this.username = ''
          this.btnsgroup1 = ['CS', 'CS(Spare)']
          return 'CS'
        } else if (zycggz) {       // 采购股长 股视觉
          this.username = '7'
          this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
          return deptName
        } else if (CGBZ_WF) {
          this.btnsgroup1 = ['CS', 'CS(Spare)']
          return 'CGBZ_WF'
        } else if (ZYCGKZ_WF) {
          this.btnsgroup1 = ['CSM', 'CSM(Spare)']
          return 'ZYCGKZ_WF'
        }
      } else {
        const Linie = this.roleList.some(item => item.code == 'LINIE') // 采购员
        const KZ = this.roleList.some(item => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ') // 科长
        const KZZL = this.roleList.some(item => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY') // 科长助理
        const BZ = this.roleList.some(item => item.code == 'CGBZ')      // 部长
        const BZZL = this.roleList.some(item => item.code == 'BZZL')    // 部长助理
        const GZ = this.roleList.some(item => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ') // 股长
        const PFJYJGLY = this.roleList.some(item => item.code == 'PFJYJGLY')
        if (PFJYJGLY) {
          //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
          //            this.btnsgroup1 = ['CS(Spare)']
        } else if (KZ && Linie) {
          this.username = '3'
          this.btnsgroup1 = ['CSM', 'CSM(Spare)']
          return 'KZ&&linie'
        } else if (KZ && !Linie) {
          this.username = '3'
          this.btnsgroup1 = ['CSM', 'CSM(Spare)']
          return 'KZ'
        } else if (KZZL && Linie) {
          this.username = '4'
          this.btnsgroup1 = [deptName, `${deptName}(Spare)`, 'Linie', 'Linie(Spare)']
          return `${deptName}&&Linie`
        } else if (KZZL && !Linie) {
          this.username = '4'
          this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
          return deptName
        } else if ((BZ && Linie) || (BZ && !Linie) || (BZZL && !Linie)) {
          this.btnsgroup1 = ['CS', 'CS(Spare)']
          if (BZZL && !Linie) {
            return 'CS'
          } else {
            return 'BZ'
          }

        } else if (BZZL && Linie) {
          this.username = '2'
          this.btnsgroup1 = ['CS', 'CS(Spare)', 'Linie', 'Linie(Spare)']
          return 'CS&&Linie'
        } else if (GZ && Linie) {
          this.username = '7'
          this.btnsgroup1 = [deptName, `${deptName}(Spare)`, 'Linie', 'Linie(Spare)']
          return `${deptName}&&Linie`
        } else if (GZ && !Linie) {
          this.username = '7'
          this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
          return deptName
        }
      }
    },
  },

  mounted () {
    console.log(this.role,"role=====");
    if (this.pfjgly) {
      this.currentView = 'pfjzfbmsj'
    } else if (this.role == 'CS' || this.role == 'BZ') { // 部门 部长助理||部长
      this.currentView = 'zfbmsj'
    } else if (this.role == 'KZ&&linie' || this.role == 'KZ') { // 科长
      this.currentView = 'zfkssj'
    } else if (this.role == this.dept) { // 股长
      this.currentView = 'zfgsj'
    } else if (this.role == `${this.dept}&&Linie`) { // 股长&&采购员
      this.currentView = 'zfgsj'
    } else if (this.role == 'CSM' || this.role == this.dept) { // 科室
      this.currentView = 'zfkssj'
    } else if (this.role == `${this.dept}&&Linie`) { // 科室&&采购员
      this.currentView = 'zfkssj'
    } else if (this.role == 'Linie') { // 采购员
      this.currentView = 'zfcgysj'
    } else if (this.role == 'CGBZ_WF' || this.role == 'ZYCGKZ_WF') { // 外方部门视图
      if (this.role == 'CGBZ_WF') {
        this.currentView = 'wfbmsj'
      } else {
        this.currentView = 'wfkssj'
      }
      // this.rollPer = false;
      // this.show = true
      // this.tabRouterList = [{
      //   value: 1,
      //   name: '我的业绩',
      //   url: '/achievement/baseData/mymerit',
      //   activePath: '/achievement/baseData/mymerit',
      //   permissionKey: 'ACHIEVEMENT',
      //   key: 'LK_WDYJ'
      // }]
    } else if (this.role == 'CS&&Linie') {
      //  CRW-4185
      this.currentView = 'zfbmsj'
    }
    console.log('this.currentView', this.currentView, this.role);
    // this.getReportData();
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    // 保存
    async save () {
      this.saveLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: '#batchSupplier',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName: '品类管理助手_' + "EKL_" + '我的业绩_' + this.$store.state.rfq.categoryName + '_' + window.moment().format('YYYY-MM-DD') + '_',
      });
      let params = {
        categoryCode: this.$store.state.rfq.categoryCode,
        fileType: "PDF",
        schemeType: "EKL",
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        schemeName: "",
        reportUrl: resFile.downloadUrl,
        operateLog: JSON.stringify({}),
      }
      categoryAnalysis(params).then(res => {
        if (res.code == '200') {
          this.saveLoading = false;
          iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功'))
        } else {
          iMessage.error(this.language('BAOCUNCHENGGONG', '保存失败'))
          this.saveLoading = false;
        }
      }).catch(res => {
        iMessage.error(this.language('BAOCUNCHENGGONG', '保存失败'))
        this.saveLoading = false;
      })
    },

    getData (data) {
      this.numberChange++;
      this.getReportData(data)
    },
    getReportData (data) {
      getPowerBiVal({
        ...data
        // username:213123159
      }).then(res => {
        if (res.result) {
          this.url = res.data

          this.config = {
            type: 'report',
            tokenType: pbi.models.TokenType.Embed,
            accessToken: this.url.accessToken,
            embedUrl: this.url.embedUrl,
            settings: {
              panes: {
                filters: {
                  visible: false
                },
                pageNavigation: {
                  visible: false
                }
              }
            }
          };
          this.reportContainer = document.getElementById('powerBi');
          this.powerbi = new pbi.service.Service(
            pbi.factories.hpmFactory,
            pbi.factories.wpmpFactory,
            pbi.factories.routerFactory
          )
          this.renderBi()
        }
      })
    },
    // getReportData(data) {
    //   this.config = {
    //     type: 'report',
    //     tokenType: pbi.models.TokenType.Embed,
    //     accessToken: this.url.accessToken,
    //     embedUrl: this.url.embedUrl,
    //     settings: {
    //       panes: {
    //         filters: {
    //           visible: false
    //         },
    //         pageNavigation: {
    //           visible: false
    //         }
    //       }
    //     }
    //   };
    //   this.reportContainer = document.getElementById('powerBi');
    //   this.powerbi = new pbi.service.Service(
    //     pbi.factories.hpmFactory,
    //     pbi.factories.wpmpFactory,
    //     pbi.factories.routerFactory
    //   )
    //   this.renderBi()
    // },
    // getData() {
    //   getEklPbi().then(res => {
    //     if (res.result) {
    //       this.url = res.data
    //       this.getData()
    //     }
    //   })
    // },
    // 初始化页面
    renderBi () {
      // if(!this.powerbi){
      //   return false;
      // }
      var report = this.powerbi.embed(this.reportContainer, this.config);
      // 主题颜色
      var themeJsonObject = {
        "name": "Customer_Color",
        "dataColors":
          [
            "#311B92", "#4527A0", "#512DA8", "#5E35B1", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB", "#D1C4E9", "#EDE7F6",
            "#1A237E", "#283593", "#303F9F", "#3949AB", "#3F51B5", "#5C6BC0", "#7986CB", "#9FA8DA", "#C5CAE9", "#E8EAF6",
            "#01579B", "#0277BD", "#0288D1", "#039BE5", "#03A9F4", "#29B6F6", "#4FC3F7", "#81D4FA", "#B3E5FC", "#E1F5FE",
            "#006064", "#00838F", "#0097A7", "#00ACC1", "#00BCD4", "#26C6DA", "#4DD0E1", "#80DEEA", "#B2EBF2", "#E0F7FA",
            "#004D40", "#00695C", "#00796B", "#00897B", "#009688", "#26A69A", "#4DB6AC", "#80CBC4", "#B2DFDB", "#E0F2F1",
            "#1B5E20", "#2E7D32", "#388E3C", "#43A047", "#4CAF50", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9",
            "#827717", "#9E9D24", "#AFB42B", "#C0CA33", "#CDDC39", "#D4E157", "#DCE775", "#E6EE9C", "#F0F4C3", "#F9FBE7",
            "#FF6F00", "#FF8F00", "#FFA000", "#FFB300", "#FFC107", "#FFCA28", "#FFD54F", "#FFE082", "#FFECB3", "#FFF8E1",
            "#BF360C", "#D84315", "#E64A19", "#F4511E", "#FF5722", "#FF7043", "#FF8A65", "#FFAB91", "#FFCCBC", "#FBE9E7",
            "#880E4F", "#AD1457", "#C2185B", "#D81B60", "#E91E63", "#EC407A", "#F06292", "#F48FB1", "#F8BBD0", "#FCE4EC"
          ],
        "background": "#FFFFFF",
        "foreground": "#070f25",
        "tableAccent": "#0F1934"
      };
      report.on("pageChanged", async function (event) {
        report.applyTheme({ themeJson: themeJsonObject });
      });
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1
      var date = myDate.getDate()
      var materialCode = "";
      var materialName = "";
      if (this.$store.state.rfq.categoryCode) {
        materialCode = this.$store.state.rfq.categoryCode;
        materialName = this.$store.state.rfq.categoryName;
      }
      if (date < 10) {
        month = month - 1
      }
      month = month >= 10 ? month + '' : '0' + month;
      report.on("loaded", async function () {
        var version_parameter = {
          $schema: "http://powerbi.com/product/schema#basic",
          target: {
            table: "app_proc_ekl_data_source",
            column: "data_version"
          },
          operator: "In",
          // values: ["202201"],
          filterType: pbi.models.FilterType.BasicFilter
        };
        var year_parameter = {
          $schema: "http://powerbi.com/product/schema#basic",
          target: {
            table: "app_proc_ekl_data_source",
            column: "data_year"
          },
          operator: "In",
          values: [year],
          filterType: pbi.models.FilterType.BasicFilter
        };

        var material_group_parameter = {
          $schema: "http://powerbi.com/product/schema#basic",
          target: {
            table: "app_proc_ekl_data_source",
            column: "material_group_code_name"
          },
          operator: "In",
          values: [materialCode + "-" + materialName],
          filterType: pbi.models.FilterType.BasicFilter
        };

        const pages = await report.getPages();
        var page = pages.filter(function (page) {
          return page.isActive
        })[0];
        const visuals = await page.getVisuals();
        visuals.filter(function (visual) {
          // 设置多个默认条件
          if ((visual.title == "data_version") && page.isActive == true) {
            visual.setSlicerState({
              filters: [version_parameter]
            });
          }
          if (visual.title == "data_year" && page.isActive == true) {
            visual.setSlicerState({
              filters: [year_parameter]
            });
          }
          // visual.title == "material_group_code_name" && 
          if (page.isActive == true) {
            visual.setSlicerState({
              filters: [material_group_parameter]
            });
          }
        });
      });
      this.report = report
      document.getElementsByTagName('iframe')[0].style.border = 'none'
    },
  },
};
</script>

<style scoped lang="scss">
.mr40 {
  margin-right: 40px;
}

#powerBi {
  width: 100%;
  height: calc(100vh - 19rem);
}

::v-deep #powerBi iframe {
  border: solid 1px #eee !important;
}
.dw {
  display: inline-block;
  width: 104px;
  height: 20px;
  font-size: 14px !important;
  text-align: right;
  font-family: Arial;
  font-weight: 400;
  line-height: 23px;
  color: #6d7b96;
  letter-spacing: 2px;
}
.navPage {
  padding: 20px 0 !important;
}
.title {
  width: 100%;
}
#batchSupplier {
  margin-top: 20px;
  height: calc(100vh - 11.25rem);
}
.tishi {
  color: #a5a5fe;
  font-size: 23px;
  margin-top: 0px;
  margin-left: 0;
}
</style>
