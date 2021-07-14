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
            <el-form label-position="top"
                     :model="form"
                     style="height: 460px">
              <el-row class="margin-bottom20">
                <!--比较类型-->
                <el-form-item :label="$t('比较类型')">
                  <iSelect v-model="chartType">
                    <el-option value="supplier"
                               label="按供应商比较"></el-option>
                    <el-option value="round"
                               label="按轮次比较"></el-option>
                    <el-option value="num"
                               label="按零件号比较"></el-option>
                  </iSelect>
                </el-form-item>
                <!--供应商-->
                <el-form-item :label="$t('TPZS.GONGYINGSHANG')">
                  <iSelect multiple
                           v-model="form.supplier"> </iSelect>
                </el-form-item>
                <!--轮次-->
                <el-form-item :label="$t('轮次')">
                  <iSelect multiple
                           v-model="form.round"></iSelect>
                </el-form-item>
                <!--零件号-->
                <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
                  <iSelect multiple
                           v-model="form.num"></iSelect>
                </el-form-item>
              </el-row>
            </el-form>
            <div class="end">
              <iButton type="primary"
                       @click="getChartData">确定</iButton>
              <iButton type="primary"
                       @click="handleSearchReset">重置</iButton>
            </div>
          </iCard>
        </el-col>
        <el-col :span="reportSave ? 24 : 20">
          <bobAnalysis></bobAnalysis>
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
import { part, supplier, turn, update, add } from "@/api/partsrfq/bob/analysisList";
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
      rfq: "2222",
      inside: false,
      chartData: [],
      chartData1: [],
      chartType: "supplier",
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
      analysisName: "",
      reportName: "",
      Split: window._.split,
      dialogVisible: false,
      analysisSave: false,
      reportSave: false,
    };
  },
  created () {
    
    if (this.$route.query.rfqId) {
      this.inside = true;
      this.rfq = this.$route.query.rfqId
    }
    this.analysisSchemeId = this.$route.query.rfqId;
    this.newBuild = this.$route.query.newBuild;
    if (this.newBuild) this.analysisSave = true;
    this.getChartData();
    // this.getOptions();
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
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    searchChartData () {
      getBobLevelOne({
        analysisSchemeId: this.analysisSchemeId,
        analysisDimension: this.chartType,
        spareParts: this.form.spareParts.join(","),
        supplier: this.form.supplier.join(","),
        turn: this.form.turn.join(","),
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
        this.form = {
          supplier: [],
          turn: [],
          spareParts: [],
        };

        this.form.supplier = this.Split(allData.supplier, ",").map(Number);
        this.form.turn = this.Split(allData.turn, ",");
        this.form.spareParts = this.Split(allData.spareParts, ",");
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
      const form = {
        analysisDimension: this.chartType,
        defaultBobOptions: this.bobType,
        id: this.analysisSchemeId,
        name: this.analysisName,
        spareParts: this.form.spareParts.join(","),
        supplierId: this.form.supplier.join(","),
        turn: this.form.turn.join(","),
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
  },
  computed: {
    chartTitle () {
      if (this.chartType === "supplier") {
        return this.form.spareParts;
      } else if (this.chartType === "turn") {
        return this.form.supplier + " " + this.form.spareParts;
      } else if (this.chartType === "spareParts") {
        return this.form.supplier;
      } else {
        return "";
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
</style>
