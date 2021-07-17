<template>
  <iPage class="new-bob">
    <div id="content">
      <div class="navBox flex-between-center"
           v-if="!reportSave">
        <span class="title">BOB{{ $t("TPZS.FENXI")
          }}<span v-if="inside">-RFQ {{ rfq }}</span></span>
        <div class="flex-align-center">
          <!--预览-->
          <iButton class="margin-left30"
                   @click="pre = true">{{
            $t("LK_YULAN")
          }}</iButton>
          <!--保存-->
          <iButton class="margin-left30"
                   @click="saveDialog">{{
            $t("LK_BAOCUN")
          }}</iButton>
          <!--BoB分析库-->
          <iButton @click="goToBob">BoB{{ $t("分析库") }}</iButton>
          <!--查找零件-->
          <iButton class="margin-left30"
                   @click="findPart">{{
            $t("查找零件")
          }}</iButton>
        </div>
      </div>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col :span="4">
          <iCard :collapse="false"
                 style="height: 500px"
                 v-if="!reportSave">
            <el-form label-position="top"
                     :model="form"
                     style="height: 460px">
              <el-row class="margin-bottom20">
                <div v-if="inside">
                  <!--比较类型-->
                  <el-form-item :label="$t('比较类型')">
                    <iSelect v-model="chartType"
                             @change="changeBy">

                      <el-option value="supplier"
                                 :label="$t('按供应商比较')">
                      </el-option>
                      <el-option value="turn"
                                 :label="$t('按轮次比较')"></el-option>
                      <el-option value="spareParts"
                                 :label="$t('按零件号比较')"></el-option>
                    </iSelect>
                  </el-form-item>
                  <!--供应商-->
                  <el-form-item :label="$t('TPZS.GONGYINGSHANG')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'supplier' ? 5 : 1"
                               v-model="form.supplier">
                      <el-option v-for="(i, index) in supplierList"
                                 :key="index"
                                 :value="i.supplierId"
                                 :label="i.nameZh">
                        <span style="float: left">{{ i.nameZh }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"><i class="el-icon-error"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!--轮次-->
                  <el-form-item :label="$t('轮次')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'turn' ? 5 : 1"
                               v-model="form.turn">
                      <el-option value="-1"
                                 label="最新"></el-option>
                      <el-option v-for="(i, index) in turnList"
                                 :key="index"
                                 :value="i.turn"
                                 :label="'第' + i.turn + '轮'"></el-option>
                    </el-select>
                  </el-form-item>
                  <!--零件号-->
                  <el-form-item :label="$t('LK_SPAREPARTSNUMBER') + '/' + $t('LK_FSHAO')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'spareParts' ? 5 : 1"
                               v-model="form.spareParts">
                      <el-option v-for="(i, index) in partList"
                                 :key="index"
                                 :value="i.fsNo"
                                 :label="i.spareParts"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item :label="$t('比较类型')">
                    <iSelect v-model="chartType"
                             @change="changeBy">
                      <el-option value="combination"
                                 :label="$t('混合比较')">
                      </el-option>

                    </iSelect>
                  </el-form-item>
                  <el-form-item :label="$t('FS号-零件号-供应商')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'combination' ? 6 : 1"
                               v-model="form.combination"
                               @change="selectChange">
                      <el-option v-for="(i) in options"
                                 :key="i.key"
                                 :value="i.key"
                                 :label="i.nameZh+''+i.value">
                        <!-- <p >{{ i.nameZh }}</p>
                        <p >{{ i.value }}</p> -->
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </el-row>
            </el-form>
            <div class="end">
              <iButton type="primary"
                       @click="searchChartData">{{
                $t("LK_QUEDING")
              }}</iButton>
              <iButton type="primary"
                       @click="handleSearchReset">{{
                $t("LK_ZHONGZHI")
              }}</iButton>
            </div>
          </iCard>
        </el-col>
        <el-col :span="reportSave ? 24 : 20">
          <iCard style="height: 500px"
                 collapse>
            <iRow>
              <el-col :span="inside ? 18 : 24">
                <crown-bar :chartData="chartData"
                           :title="chartTitle"
                           @select="showSelect"
                           :type="bobType"
                           :by="chartType" />
                <div class="toolTip-div"
                     ref="toolTipDiv"
                     v-show="showSelectDiv">
                  <iSelect v-model="bobType"
                           ref="toolTipSelect"
                           @blur="closeDiv"
                           @change="changeType">
                    <el-option value="Best of Best"
                               label="Best of Best"></el-option>
                    <el-option value="Best of Average"
                               label="Best of Average"></el-option>
                    <el-option value="Best of Second"
                               label="Best of Second"></el-option>
                  </iSelect>
                </div>
              </el-col>
              <el-col :span="6"
                      v-if="inside">
                <div class="left-dash1">
                  <out-bar v-if="chartData1.length > 0"
                           :chartData="chartData1"
                           @del="delOut"
                           @change="changeOut"></out-bar>
                  <div v-else
                       @click="findPart"
                       class="icon-add">
                    <icon style="font-size: 260px"
                          name="iconbob-daitianjia"
                          symbol></icon>
                    <div style="text-align: center">{{ $t("待添加") }}</div>
                  </div>
                </div>
              </el-col>
            </iRow>
          </iCard>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col :span="4">
          <iCard :collapse="false"
                 style="height: 500px"
                 v-if="!reportSave">
            <ul class="anchorList flex">
              <li v-for="(i,index) in anchorList"
                  :key="index"
                  @click="doActive(index)"
                  :class="{active:index==current}">{{i}}
              </li>
            </ul>
          </iCard>
        </el-col>
        <el-col :span="reportSave ? 24 : 20">
          <bobAnalysis ref="bobAnalysis"></bobAnalysis>
        </el-col>
      </el-row>
    </div>
    <findingParts v-if="value"
                  v-show="value"
                  :value="value"
                  @sure="sure"
                  @close="closeDialog"
                  @add="add"></findingParts>
    <preview ref="preview"
             v-if="pre"
             :value="pre"
             @closeDialog="closePreView"></preview>
    <iDialog title="保存"
             :visible.sync="dialogVisible"
             width="20%">
      <div>
        <div class="margin-bottom15 flex-between-center">
          <label for="">保存在分析库</label>
          <el-checkbox v-model="analysisSave"></el-checkbox>
        </div>
        <iInput v-model="analysisName"
                placeholder="请输入文件名称" />
      </div>
      <div class="margin-top20">
        <div class="margin-bottom15 flex-between-center">
          <label for="">保存为报告</label>
          <el-checkbox v-model="reportSave"></el-checkbox>
        </div>
        <iInput v-model="reportName"
                placeholder="请输入文件名称" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <iButton type="primary"
                 @click="save">确 定</iButton>
      </span>
    </iDialog>
  </iPage>
</template>

<script>
import {
  iPage,
  iButton,
  iCard,
  iSelect,
  icon,
  iDialog,
  iInput,
  iMessage,
} from "rise";
import CrownBar from "./components/crownBar.vue";
import bobAnalysis from "@/views/partsrfq/bob/bobAnalysis/index.vue";
import findingParts from "@/views/partsrfq/components/findingParts.vue";
import { getBobLevelOne, removeBobOut, addBobOut } from "@/api/partsrfq/bob";
import { part, supplier, turn, update, add, initOut, querySupplierTurnPartList } from "@/api/partsrfq/bob/analysisList";
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadFile } from "@/api/file/upload";
import preview from "./preview.vue";
import OutBar from "./components/outBar.vue";

export default {
  componentName: "parentCom",
  components: {
    iPage,
    iButton,
    iCard,
    iSelect,
    CrownBar,
    bobAnalysis,
    findingParts,
    OutBar,
    icon,
    preview,
    iDialog,
    iInput,
  },
  data () {
    return {
      rfq: "",
      inside: false,
      chartData: [],
      chartData1: [],
      chartType: this.inside ? "supplier" : "mixComp",
      bobType: "Best of Best",
      form: {
        supplier: [],
        turn: [],
        spareParts: [],
      },
      showSelectDiv: false,
      analysisSchemeId: "",
      value: false,
      pre: false,
      partList: [],
      supplierList: [],
      turnList: [],
      options: [],
      analysisName: "",
      reportName: "",
      Split: window._.split,
      dialogVisible: false,
      analysisSave: false,
      reportSave: false,
      anchorList: ['原材料/散件', '制造费', '保费成本', '管理费', '其他费用', '利润'],
      current: 0,
      isCover: true
    };
  },
  created () {
    if (this.$store.state.rfq.entryStatus === 1) {
      this.inside = true;
      this.rfq = this.$store.state.rfq.rfqId
      this.analysisSchemeId = this.$route.query.rfqId;
      this.getChartData();
    } else {
      if (this.$route.query.rfqId) {
        this.value = false
        this.analysisSchemeId = this.$route.query.rfqId;
        this.getChartData();
      } else {
        this.findPart()
        this.analysisSchemeId = this.$store.state.rfq.SchemeId;
      }
    }
    // if (!this.inside)
    this.newBuild = this.$route.query.newBuild;
    if (this.newBuild) this.analysisSave = true;
    // this.getOptions();
  },
  watch: {
    analysisName: {
      handler (newval) {
        this.isCover = false
      }
    },
    reportName: {
      handler (newval) {
        this.isCover = false
      }
    }
  },
  mounted () { },
  methods: {
    getOptions () {
      part({
        analysisSchemeId: this.analysisSchemeId,
        data: {},
      }).then((res) => (this.partList = res.data));
      supplier({
        analysisSchemeId: this.analysisSchemeId,
        data: {},
      }).then((res) => (this.supplierList = res.data));
      turn({
        analysisSchemeId: this.analysisSchemeId,
        data: {},
      }).then((res) => (this.turnList = res.data));
    },
    querySupplierTurnPartList () {
      querySupplierTurnPartList({
        data: {},
        analysisSchemeId: this.analysisSchemeId,
      }).then((res) => {
        this.options = res.data
        this.$nextTick(() => {
          let html = ""
          this.options.forEach((value, index) => {
            html +=
              `<div class="el-tag el-tag--info el-tag--small el-tag--light" style="display:flex;justify-content: center;align-items: center;">
            <div >
             <p class="el-select__tags-text">${value.nameZh}</p>
             <p class="el-select__tags-text">${value.value}</p>
            </div> 
             <i class="el-tag__close el-icon-close"></i>
           </div>`
          })
          this.$el.querySelector('.el-select__tags').innerHTML = `<div>${html}</div>`

        });
      })
    },
    selectChange (e) {
      this.$nextTick(() => {
        let html = ""
        console.log(e)
        this.options.forEach((value, index) => {
          e.forEach((i, index) => {
            if (value.key == i) {
              html +=
                `<div class="el-tag el-tag--info el-tag--small el-tag--light" style="display:flex;justify-content: center;align-items: center;">
            <div >
             <p class="el-select__tags-text">${value.nameZh}</p>
             <p class="el-select__tags-text">${value.value}</p>
            </div> 
             <i class="el-tag__close el-icon-close"></i>
           </div>`
            }
          })
        })
        this.$el.querySelector('.el-select__tags').innerHTML = `<div>${html}</div>`

      });
    },
    findPart () {
      this.value = true;
    },
    closeDialog (val) {
      this.value = val;
    },
    closePreView (val) {
      this.pre = val;
    },
    sure () { },
    changeBy (e) {
      this.chartType = e;
      if (this.chartType === 'combination') {
        this.form = {
          combination: []
        }
        return
      }
      this.form = {
        supplier: [],
        turn: [],
        spareParts: [],
      };
    },
    changeType (e) {
      this.bobType = e;
      this.initChartData();
      this.closeDiv();
    },
    goToBob () {
      this.$router.push("bob");
    },
    closeDiv () {
      this.showSelectDiv = false;
    },
    showSelect (e) {
      const position = e.event.target.position;
      this.showSelectDiv = true;
      this.$refs.toolTipDiv.style.left = position[0] + 210 + "px";
      this.$refs.toolTipDiv.style.top = position[1] + 15 + "px";
      this.$refs.toolTipSelect.focus();
    },
    initChartData () {
      // const data=require('./data.json')
      // this.chartData = data
    },
    handleSearchReset () {
      this.form = {
        supplier: [],
        turn: [],
        spareParts: [],
      };
      this.getChartData();
    },
    add (val) {
      console.log(val)
      if (this.inside) {
        addBobOut({
          analysisSchemeId: this.analysisSchemeId,
          fs: val[0].fsNum,
          partNumber: val[0].partNum,
          rfqId: val[0].rfqId,
          supplierId: val[0].supplierId,
        }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.desZh);
            this.getChartData();
            this.closeDialog()
          } else {
            this.$message.error(res.desZh);
            this.closeDialog()
          }
        });
      } else {
        let arr = []
        val.forEach((value, index, array) => {
          arr.push({
            fs: value.fsNum,
            partNumber: value.partNum,
            rfqId: value.rfqId,
            supplierId: value.supplierId,
          })
        })
        initOut({ list: arr }).then(res => {
          if (res.code === '200') {
            this.$message.success(res.desZh);
            this.analysisSchemeId = res.data
            this.$store.dispatch('setSchemeId', this.analysisSchemeId);
            this.$refs.bobAnalysis.SchemeId = res.data
            console.log(this.$refs.bobAnalysis.SchemeId, 'gggg')
            this.$refs.bobAnalysis.chargeRetrieve('all')
            this.querySupplierTurnPartList()
            this.getChartData()
            this.closeDialog()
          } else {
            this.$message.error(res.desZh);
            this.closeDialog()
          }

        })
      }

    },
    searchChartData () {
      let params = {}
      if (this.$store.state.rfq.entryStatus === 1) {
        params = {
          analysisSchemeId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          spareParts: this.form.spareParts.join(","),
          supplier: this.form.supplier.join(","),
          turn: this.form.turn.join(","),
        }
      } else {
        params = {
          analysisSchemeId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          combination: this.form.combination.join(",")
        }
      }
      getBobLevelOne(params).then((res) => {
        const allData = res.data || [];
        this.chartData = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 0
        );
        this.chartData1 = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 1
        );
        this.chartType = allData.analysisDimension;
        this.bobType = allData.defaultBobOptions;

        if (this.chartType === 'combination') {
          this.form = {
            combination: []
          }
          this.form.combination = this.Split(allData.combination, ",");
          this.querySupplierTurnPartList()
        } else {
          this.form = {
            supplier: [],
            turn: [],
            spareParts: [],
          };
          this.form.supplier = this.Split(allData.supplier, ",").map(Number);
          this.form.turn = this.Split(allData.turn, ",");
          this.form.spareParts = this.Split(allData.spareParts, ",");
        }
      });
    },
    async getChartData () {
      await this.getOptions();
      getBobLevelOne({
        analysisSchemeId: this.analysisSchemeId,
      }).then((res) => {
        const allData = res.data || [];
        this.chartData = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 0
        );
        this.chartData1 = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 1
        );
        this.chartType = allData.analysisDimension;
        this.bobType = allData.defaultBobOptions;
        this.analysisName = allData.name
        this.reportName = allData.name + '_' + window.moment(new Date()).format("yyyy.MM");
        if (this.chartType === 'combination') {
          this.form = {
            combination: []
          }
          this.form.combination = this.Split(allData.combination, ",");
        } else {
          this.form = {
            supplier: [],
            turn: [],
            spareParts: [],
          };
          this.form.supplier = this.Split(allData.supplier, ",").map(Number);
          this.form.turn = this.Split(allData.turn, ",");
          this.form.spareParts = this.Split(allData.spareParts, ",");
        }

      });
    },
    delOut () {
      removeBobOut({
        id: this.chartData1[0].id,
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.desZh);
          this.getChartData();
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    changeOut () {
      removeBobOut({
        id: this.chartData1[0].id,
      });
      this.findPart();
    },
    saveDialog () {
      this.dialogVisible = true;
    },
    save () {
      let that = this;
      // if()
      const form = {
        analysisDimension: this.chartType,
        defaultBobOptions: this.bobType,
        id: this.analysisSchemeId,
        name: this.analysisName,
        spareParts: this.form.spareParts.join(","),
        supplierId: this.form.supplier.join(","),
        turn: this.form.turn.join(","),
        isCover: this.isCover
      };
      if (this.analysisSave) {
        update(form)
          .then((res) => {
            iMessage.success("保存成功");
            this.dialogVisible = false;
            this.reportSave = false;
          })
          .catch((err) => {
            iMessage.err("保存失败");
            this.dialogVisible = false;
            this.reportSave = false;
          });
      }
      if (this.reportSave) {
        downloadPDF({
          idEle: "content",
          pdfName: "Volume Pricing Overview",
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
              const data = res.data[0];
              const req = {
                analysisSchemeId: 1,
                downloadName: data.fileName,
                downloadUrl: data.filePath,
                reportName: that.reportName,
              };
              await add(req);
              that.dialogVisible = false;
              that.reportSave = false;
            } catch {
              that.dialogVisible = false;
              that.reportSave = false;
            }
          },
        });
      }
    },
    doActive (index) {
      this.$nextTick(() => {
        //页面滚动了的距离
        let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //指定dom到页面顶端的距离
        let nodeList = this.$el.querySelectorAll('.el-table__row--level-0')
        nodeList[index].scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      });
      this.current = index
    }
  },
  computed: {
    chartTitle () {
      if (this.chartType === "supplier") {
        return this.form.spareParts;
      } else if (this.chartType === "turn") {
        return this.form.supplier + " " + this.form.spareParts;
      } else if (this.chartType === "spareParts") {
        return this.form.supplier;
      } else if (this.chartType === 'combination') {
        return this.form.combination;
      } else {
        return ''
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.new-bob {
  .end {
    text-align: center;
    position: relative;
    bottom: 30px;
  }
  .toolTip-div {
    z-index: 20;
    min-width: 164px;
    max-width: 224px;
    z-index: 6;
    background: "#fff";
    opacity: 1;
    border-radius: 5px;
    position: absolute;
    box-shadow: 0px 4px 10px rgba(27, 29, 33, 0.12);
    top: 0;
    left: 0;
    padding: 10px;
  }
  .left-dash1 {
    border: none;
    border-left: 5px dashed grey;
    .icon-add {
      margin-top: 100px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
.el-tag .flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-select .el-tag {
  white-space: nowrap; //不换行
  overflow: hidden; //超出隐藏
  text-overflow: ellipsis; //变成...
}
::v-deep
  .el-select-dropdown.is-multiple
  .el-select-dropdown__item.selected::after {
  content: none;
}
::v-deep .el-tag--small {
  height: 3.5rem;
}
.anchorList {
  width: 60%;
  flex-direction: column;
  text-align: center;
  margin: 100px auto;
  li {
    padding: 10px 0;
    color: #1b1d21;
    list-style: disc !important;
  }
}
.active {
  color: #1660f1 !important;
}
</style>
