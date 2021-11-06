<template>
  <div>
    <el-form
      class="form"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      :hideRequiredAsterisk="true"
      :validate-on-rule-change="false"
      :disabled="ruleForm.biddingStatus !== '01'"
    >
      <iCard style="margin-top: 1rem">
        <div class="form-top">
          <div>
            <h2>基础信息</h2>
          </div>
          <div>
            <template v-if="ruleForm.biddingStatus !== '01'">
              <el-form>
                <iButton :disabled="false" @click="handleBack">返回 </iButton>
              </el-form>
            </template>
            <template v-else>
              <iButton @click="handleBack">返回 </iButton>
              <iButton @click="handleSearchReset">重置</iButton>
              <iButton @click="handleSubmit">完成设置 </iButton>
            </template>
          </div>
        </div>

        <div class="item">
          <iFormItem
            label="$t('项目类型')"
            prop="projectType"
            v-if="onProjectType"
          >
            <iLabel :label="$t('项目类型')" slot="label" required></iLabel>
            <iSelect v-model="ruleForm.projectType">
              <el-option
                v-for="(item, index) in projectType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('项目类型')" prop="projectType" v-else>
            <iLabel :label="$t('项目类型')" slot="label" required></iLabel>
            <iInput v-model="ruleForm.projectType" disabled></iInput>
          </iFormItem>

          <iFormItem label="$t('RFQ名称')" prop="rfqName">
            <iLabel :label="$t('RFQ名称')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqName" disabled></iInput>
          </iFormItem>

          <iFormItem label="$t('比价单位')" prop="currencyUnit">
            <iLabel :label="$t('比价单位')" slot="label" required></iLabel>
            <iSelect v-model="ruleForm.currencyUnit">
              <el-option
                v-for="(item, index) in currencyUnit"
                :key="index"
                :value="item.code"
                :label="item.code"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('采购员')" prop="linieName">
            <iLabel :label="$t('采购员')" slot="label"></iLabel>
            <iInput v-model="ruleForm.linieName" disabled></iInput>
          </iFormItem>

          <iFormItem label="$t('采购员电话')" prop="liniePhone">
            <iLabel :label="$t('采购员电话')" slot="label"></iLabel>
            <iInput v-model="ruleForm.liniePhone" disabled></iInput>
          </iFormItem>

          <iFormItem label="$t('报价是否含税')" prop="isTax">
            <iLabel :label="$t('报价是否含税')" slot="label" required></iLabel>
            <iSelect v-model="ruleForm.isTax">
              <el-option
                v-for="(item, index) in isTax"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('报价截止时间')" prop="pricingDeadline">
            <iLabel :label="$t('报价截止时间')" slot="label"></iLabel>
            <iInput
              :value="
                ruleForm.pricingDeadline
                  ? ruleForm.pricingDeadline.replace('T', ' ')
                  : ''
              "
              disabled
            ></iInput>
          </iFormItem>

          <iFormItem label="$t('开标时间')" prop="openTenderTime">
            <iLabel :label="$t('开标时间')" slot="label"></iLabel>
            <iInput
              :value="
                ruleForm.openTenderTime
                  ? ruleForm.openTenderTime.replace('T', ' ')
                  : ''
              "
              disabled
            ></iInput>
          </iFormItem>

          <iFormItem label="$t('开标结果公开形式')" prop="resultOpenForm">
            <iLabelML showTip class="form-item-resultOpenForm-icon">
              <div class="hover-text">
                <span
                  >排名：指供应商知道自身的具体排名（供应商不知道具体一共有多少供应商参与了报价）</span
                ><br />
                <span class="hover-item"
                  >红绿灯：指供应商只能通过红黄绿灯判断供应商报价的竞争力，而无法知道具体的名次，也无法判断自己是否中标</span
                ><br />
                <span
                  >所有排名：指供应商不仅能看到自己的排名，还可以看到其他参加报价的供应商的排名</span
                >
              </div>
            </iLabelML>
            <iLabel
              :label="$t('开标结果公开形式')"
              slot="label"
              required
            ></iLabel>
            <iSelect v-model="ruleForm.resultOpenForm">
              <el-option
                v-for="(item, index) in resultOpenForm"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem label="$t('目标价')" prop="targetPrice">
            <iLabelML showTip class="form-item-targetPrice-icon">
              <div class="hover-text">
                <span>填写后，供应商可以看到对应目标价</span>
              </div>
            </iLabelML>
            <iLabel :label="$t('目标价')" slot="label"></iLabel>
            <iInput
              type="number"
              oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
              v-model="ruleForm.targetPrice"
            ></iInput>
          </iFormItem>
        </div>

        <div v-if="onOpenTenderNature">
          <!-- 横线 -->
          <div class="link-gray"></div>

          <div>
            <div><h2>开标性质</h2></div>
            <div class="form-item-row1-clo2">
              <div style="margin-left: -12rem">
                <iFormItem prop="openTenderNature">
                  <el-radio-group
                    v-model="ruleForm.openTenderNature"
                    class="form-radio"
                  >
                    <el-radio label="01" class="form-radio-left"
                      >中间过程</el-radio
                    >
                    <div class="form-radio-div" v-html="bidOpeningLeft"></div>
                    <el-radio label="02" class="form-radio-right"
                      >最终结果</el-radio
                    >
                    <div class="form-radio-div" v-html="bidOpeningRight"></div>
                  </el-radio-group>
                </iFormItem>
              </div>
              <!-- <iRadio v-model="radio" label="1">中间过程</iRadio> -->
            </div>
            <div>
              <div><span>其他项目公告信息</span></div>
              <div class="form-item-row1-clo1">
                <iInput
                  type="textarea"
                  :rows="4"
                  resize="none"
                  :maxlength="1000"
                  placeholder="字数限制为1000字"
                  show-word-limit
                  v-model="ruleForm.otherProjectNotice"
                ></iInput>
              </div>
            </div>
          </div>
        </div>
      </iCard>

      <!-- 报价规则 -->
      <iCard
        style="margin-top: 2rem"
        v-if="ruleForm.resultOpenForm === '03' ? false : true"
      >
        <div class="form-top-rules">
          <div>
            <h2>报价规则</h2>
          </div>
        </div>
        <div class="form-rules">
          <div class="item">
            <iFormItem :label="$t('排名显示规则')" prop="rankShowRule">
              <iLabel :label="$t('排名显示规则')" slot="label"></iLabel>
              <div>
                <iLabelML showTip class="form-item-rankShowRule-icon">
                  <div class="hover-text">
                    <span>供应商对红绿灯名次区间/偏离比例的</span>
                    <span class="hover-stick">具体定义不可见</span>
                    <span>。</span>
                  </div>
                </iLabelML>
              </div>
              <!-- <iLabel :label="$t('排名显示规则')" slot="label"></iLabel> -->
              <iSelect v-model="ruleForm.rankShowRule" style="width: 20rem">
                <el-option
                  v-for="(item, index) in rankShowRule"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>

          <!--  显示红绿灯（按名次区间定义）-->
          <div
            class="form-content"
            v-if="
              ruleForm.rankShowRule === '02' && ruleForm.resultOpenForm != '01'
            "
          >
            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span>排名区间，绿灯区间</span
                ><span class="form-item1">&nbsp;&nbsp;（整数）</span>
              </div>
              <iFormItem prop="quoteRule.greenLightFrom">
                <iInput
                  v-model="ruleForm.quoteRule.greenLightFrom"
                  maxlength="3"
                  style="width: 4rem"
                  @change="handleChangeLightArea"
                />
              </iFormItem>
              <div class="from-item-clo1"><span class="form-line">—</span></div>
              <iFormItem prop="quoteRule.greenLightTo">
                <iInput
                  v-model="ruleForm.quoteRule.greenLightTo"
                  maxlength="3"
                  style="width: 4rem"
                  @change="handleChangeLightArea"
                />
              </iFormItem>
            </div>
            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span class="form-item2">黄灯区间</span>
              </div>
              <iFormItem prop="quoteRule.yellowLightFrom">
                <iInput
                  v-model="ruleForm.quoteRule.yellowLightFrom"
                  maxlength="3"
                  style="width: 4rem"
                  @change="handleChangeLightArea"
                />
              </iFormItem>
              <div class="from-item-clo1"><span class="form-line">—</span></div>
              <iFormItem prop="quoteRule.yellowLightTo">
                <iInput
                  v-model="ruleForm.quoteRule.yellowLightTo"
                  maxlength="3"
                  style="width: 4rem"
                  @change="handleChangeLightArea"
                />
              </iFormItem>
            </div>
            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span class="form-item3">红灯区间</span>
              </div>
              <iFormItem prop="quoteRule.redLightFrom">
                <iInput
                  v-model="ruleForm.quoteRule.redLightFrom"
                  maxlength="3"
                  style="width: 4rem"
                  @change="handleChangeLightArea"
                />
              </iFormItem>
              <div class="from-item-clo1"><span class="form-line">—</span></div>
              <iFormItem prop="quoteRule.redLightTo">
                <iInput
                  v-model="ruleForm.quoteRule.redLightTo"
                  maxlength="3"
                  style="width: 4rem"
                  @change="handleChangeLightArea"
                />
              </iFormItem>
            </div>
          </div>

          <!-- 显示红绿灯（按目标价偏离比例定义）  -->
          <div
            class="form-content2"
            v-if="
              ruleForm.rankShowRule === '03' && ruleForm.resultOpenForm != '01'
            "
          >
            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span class="form-item1">目标价</span>
              </div>
              <iFormItem prop="quoteRule.targetPrice">
                <iInput
                  v-model="ruleForm.quoteRule.targetPrice"
                  style="width: 10rem"
                  @change="handleChangeLightDeviation"
                  oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
                  type="number"
                />
              </iFormItem>
              <div class="from-item-clo1">
                <span class="form-line"></span>
              </div>
            </div>

            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span class="form-item1">偏离目标价</span>
              </div>
              <iFormItem prop="quoteRule.greenDeviationValue">
                <iInput
                  v-model="ruleForm.quoteRule.greenDeviationValue"
                  style="width: 4rem"
                  @change="handleChangeLightDeviation"
                />
              </iFormItem>
              <div class="from-item-clo1">
                <span class="form-line">%以内，显示绿灯</span>
              </div>
            </div>
            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span class="form-item2">偏离目标价</span>
              </div>
              <iFormItem prop="quoteRule.yellowDeviationValue">
                <iInput
                  v-model="ruleForm.quoteRule.yellowDeviationValue"
                  style="width: 4rem"
                  @change="handleChangeLightDeviation"
                />
              </iFormItem>
              <div class="from-item-clo1">
                <span class="form-line">%以内，显示黄灯</span>
              </div>
            </div>
            <div class="from-item-rankShowRule">
              <div class="from-item-clo1">
                <span class="form-item3">否则显示红灯</span>
              </div>
            </div>
          </div>
        </div>
      </iCard>
    </el-form>
    <!-- 附件 -->
    <!-- <iCard style="margin-top: 2rem">
      <div class="form-top-file">
        <div>
          <h2 style="font-size: 1.3rem">询价附件</h2>
        </div>
        <div class="form-item">
          <div class="form-item-content1">
            <el-upload
              action="1"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
              :http-request="httpUpload"
              multiple
            >
              <iButton>上传附件</iButton>
            </el-upload>
          </div>
          <div>
            <iButton @click="delAttachments">删除附件 </iButton>
          </div>
        </div>
      </div>
      <el-form
        class="form"
        :model="ruleForm"
        label-width="10rem"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <div class="form-row">
          <iFormItem prop="attachments" class="form-item-file">
            <iTableCustom
              height="15rem"
              style="margin-bottom: 3rem"
              :data="ruleForm.attachments"
              :columns="attachments"
              :loading="false"
              @handle-selection-change="handleSelectionChange"
            />
          </iFormItem>
        </div>
        <div>
          <iPagination
            v-update
            @current-change="handleCurrentChange($event)"
            background
            :page-sizes="10"
            :page-size="10"
            prev-text="上一页"
            next-text="下一页"
            layout="prev, pager, next, jumper"
            :current-page="page.currPage"
            :total="ruleForm.attachments.length"
          />
        </div>
      </el-form>
    </iCard> -->
  </div>
</template>
<script>
import {
  iInput,
  iSelect,
  iFormItem,
  iCard,
  iButton,
  iLabel,
  iMessage,
  // iPagination,
} from "rise";
import {
  infoForm,
  projectType,
  currencyUnitMultiples,
  resultOpenForm,
  isTax,
  infoRules,
  rankShowRule,
  attachments,
  currencyUnit,
} from "./data";
import { uploadFile, getCurrencyUnit } from "@/api/mock/mock";
import { getBiddingId, biddingInfo } from "@/api/bidding/bidding";
import iLabelML from "@/components/biddingComponents/iLabelML";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {
    iInput,
    iSelect,
    iFormItem,
    iCard,
    iButton,
    iLabel,
    iLabelML,
    // iPagination,
    // iTableCustom,
  },
  data() {
    return {
      ruleForm: { ...infoForm, rankShowRule: "", attachments: [] },
      rules: {},
      projectType,
      resultOpenForm,
      isTax,
      attachments,
      attachmentId: "",
      currencyUnit,
      pricingDeadline: "",
      openTenderTime: "",
      selectedTableData: [],
      quoteRule: {
        greenLightFrom: "",
        greenLightTo: "",
        greenDeviationValue: "", //绿灯偏离值
        yellowLightFrom: "",
        yellowLightTo: "",
        yellowDeviationValue: "", //黄灯偏离值
        redLightFrom: "",
        redLightTo: "",
        redDeviationValue: "", //红灯偏离值
        biddingId: "",
      },
      currencyUnitMultiples,
      bidOpeningLeft: `<p>本次开标为项目谈判的中间过程，开标结果作为选定供应商的参考，最终供应商的选择以最终谈判结果及上汽大众联合采购委员会（CSC）会议决策为准。</p>
                      <p>This project bidding is a process of negotiation. The results of the project bidding will be used as a 
                      reference for the selection of suppliers . Final selection of suppliers will be based on final 
                      negotiation results and made by SAIC VOLKSWAGEN CSC meeting.</p>`,
      bidOpeningRight: `<p>本次项目开标结果将作为选定供应商的重要依据，上汽大众优先选择开标最优供应商，并保留与其进一步谈判权利。最终定点结果以上汽大众联合采购委员会（CSC）会议决策为准。</p>
                        <p>The results of the project bidding will be an important basis for the selection of suppliers. SAIC VOLKSWAGEN 
                        will give priority to the best supplier(s) in bidding for selection and reserve the right of further
                        negotiation. The final nomination results will be made by SAIC VOLKSWAGEN CSC meeting.</p>`,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.handleSearchReset();
    this.queryUnit();
  },
  computed: {
    rankShowRule() {
      if (this.ruleForm.resultOpenForm === "01") {
        return rankShowRule.slice(0, 1);
      }
      if (this.ruleForm.resultOpenForm === "02") {
        return rankShowRule.slice(1, 3);
      }
      return [];
    },
    onProjectType() {
      if (this.ruleForm.roundType === "05") {
        return true;
      }
      return false;
    },
    onOpenTenderNature() {
      if (this.ruleForm.roundType === "02") {
        return true;
      }
      return false;
    },
  },
  watch: {
    "ruleForm.quoteRule.greenLightTo"(val) {
      const { greenLightFrom } = this.ruleForm.quoteRule;
      if (!(greenLightFrom || 0 === greenLightFrom) && (val || 0 === val)) {
        this.$set(this.ruleForm.quoteRule, "greenLightFrom", 1);
      }
    },
    "ruleForm.quoteRule.yellowLightTo"(val) {
      const { greenLightTo, yellowLightFrom } = this.ruleForm.quoteRule;
      if (
        !(yellowLightFrom || 0 === yellowLightFrom) &&
        (val || 0 === val) &&
        !isNaN(greenLightTo)
      ) {
        this.$set(
          this.ruleForm.quoteRule,
          "yellowLightFrom",
          Number(greenLightTo) + 1
        );
      }
    },
    "ruleForm.quoteRule.redLightTo"(val) {
      const { yellowLightTo, redLightFrom } = this.ruleForm.quoteRule;
      if (
        !(redLightFrom || 0 === redLightFrom) &&
        (val || 0 === val) &&
        !isNaN(yellowLightTo)
      ) {
        this.$set(
          this.ruleForm.quoteRule,
          "redLightFrom",
          Number(yellowLightTo) + 1
        );
      }
    },
    "ruleForm.resultOpenForm"(val) {
      if (val === "01") {
        this.ruleForm.rankShowRule = "01";
        rankShowRule.slice(0, 1);
      }
      if (val === "02") {
        if (this.ruleForm.rankShowRule == "01") {
          this.ruleForm.rankShowRule = "02";
        }
        rankShowRule.slice(1, 3);
      } else if (val === "03") {
        this.ruleForm.rankShowRule = "";
      }
    },
    "ruleForm.rankShowRule"(val) {
      if (val === "03" || val === "02") {
        this.ruleForm.quoteRule = {
          ...this.ruleForm.quoteRule,
          ...this.quoteRule,
        };
        this.$refs["ruleForm"].clearValidate([
          "quoteRule.greenLightFrom",
          "quoteRule.greenLightTo",
          "quoteRule.yellowLightFrom",
          "quoteRule.yellowLightTo",
          "quoteRule.redLightFrom",
          "quoteRule.redLightTo",
          "quoteRule.greenDeviationValue",
          "quoteRule.yellowDeviationValue",
        ]);
      }
    },
    "ruleForm.quoteRule.targetPrice"(val) {
      console.log(val);
      if (val === null || val === "" || val === undefined) {
        this.$refs["ruleForm"].clearValidate([
          "quoteRule.greenDeviationValue",
          "quoteRule.yellowDeviationValue",
        ]);
      }
    },
  },
  methods: {
    // 返回
    handleBack() {
      this.$router.push({
        name: "biddingProjectInquiry",
      });
    },
    // 重置
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    handleChangeLightArea() {
      this.$refs["ruleForm"].validateField(
        [
          "quoteRule.greenLightTo",
          "quoteRule.yellowLightFrom",
          "quoteRule.yellowLightTo",
          "quoteRule.redLightFrom",
          "quoteRule.redLightTo",
        ],
        (error) => {
          !error &&
            this.$refs["ruleForm"].validateField("quoteRule.greenLightFrom");
        }
      );
    },
    handleChangeLightDeviation() {
      this.$refs["ruleForm"].validateField([
        "quoteRule.greenDeviationValue",
        "quoteRule.yellowDeviationValue",
      ]);
    },
    // 附件
    async httpUpload(content) {
      let formData = new FormData();
      formData.append("file", content.file);
      await uploadFile(formData)
        .then((res) => {
          console.log(res);
          this.ruleForm.attachments.push({
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentSize: this.size,
            biddingId: this.ruleForm.id,
            rfqCode: this.ruleForm.rfqCode,
            uploadDate: this.getTime(),
            uploadName: "xxx",
            source: "02",
          });
          iMessage.success(this.$t("上传成功"));
        })
        .catch((err) => {
          iMessage.error(this.$t("上传失败"));
        });
    },
    beforeAvatarUpload(file) {
      this.size = file.size;
      // if (this.size < 0.1 * 1024) {
      //   //如果小于0.1KB转化成B
      //   this.size = this.size.toFixed(2) + "B";
      // } else if (this.size < 0.1 * 1024 * 1024) {
      //   //如果小于0.1MB转化成KB
      //   this.size = (this.size / 1024).toFixed(2) + "KB";
      // } else if (this.size < 0.1 * 1024 * 1024 * 1024) {
      //   //如果小于0.1GB转化成MB
      //   this.size = (this.size / (1024 * 1024)).toFixed(2) + "MB";
      // } else {
      //   //其他转化成GB
      //   this.size = (this.size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      // }
      if (this.size < 0.1 * 1024 * 1024 * 1024) {
        this.size = (this.size / (1024 * 1024)).toFixed(2);
      }
      const isSize = file.size / 1024 / 1024 < 15;
      if (!isSize) {
        this.$message.error(this.$t("文件大小最大限制"));
      }
      return isSize;
    },
    getTime(date) {
      // let date = new Date();
      let value =
        date.getFullYear() +
        "-" +
        this.checkTime(date.getMonth() + 1) +
        "-" +
        this.checkTime(date.getDate());
      return value;
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    delAttachments() {
      this.$confirm("是否删除选中询价附件？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const attachmentIds = this.selectedTableData.map((item) => {
            return item.attachmentId;
          });
          let attchments = this.ruleForm.attachments.filter((item) => {
            return !attachmentIds.includes(item.attachmentId);
          });
          this.ruleForm.attachments = attchments;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmit() {
      this.submitForm("ruleForm");
      // this.$confirm("是否保存该基本信息 ?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      //   if (this.ruleForm.projectType === "正式项目") {
      //     this.ruleForm.projectType = "01";
      //   }
      //   this.ruleForm.quoteRule.biddingId = this.id;
      //   this.submitForm("ruleForm");
      //   if (this.ruleForm.projectType === "01") {
      //     this.ruleForm.projectType = "正式项目";
      //   }
      // });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否保存该报价信息？", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning",
          })
            .then(() => {
              //保存
              if (this.ruleForm.projectType === "正式项目") {
                this.ruleForm.projectType = "01";
              }
              this.ruleForm.quoteRule.biddingId = this.id;
              this.ruleForm.quoteRule = {...this.ruleForm.quoteRule,rankDisplayRule:this.ruleForm.rankShowRule}
              const formData = {...this.ruleForm,quoteRule:this.ruleForm.quoteRule};
              return biddingInfo(formData);
            })
            .then((res) => {
              if (res) {
                this.$message.success("保存成功");
                if (this.ruleForm.projectType === "01") {
                  this.ruleForm.projectType = "正式项目";
                }
                this.$router.push({
                  path: `/bidding/project/inquiry/${this.id}`,
                });
                formName;
              } else {
                this.$message.error("保存失败");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
      let param = {
        pageNum: this.page.currPage,
        pageSize: 10,
      };
    },

    query(e) {
      // 根据 ID 获取竞价信息
      getBiddingId(e).then((res) => {
        this.ruleForm = {
          ...this.ruleForm,
          ...res,
          quoteRule: res.quoteRule || {},
          isTax: res.isTax || "01",
          resultOpenForm: res.resultOpenForm || "01",
          openTenderNature: res.openTenderNature || "01",
        };
        this.quoteRule = { ...this.quoteRule, ...res.quoteRule };
        this.$emit("change-title", res);
        // 项目类型
        if (res.roundType === "03" || res.roundType === "04") {
          this.ruleForm.projectType === "01";
        }
        if (this.ruleForm.projectType == "01") {
          this.ruleForm.projectType = "正式项目";
        }
        if (!res.rankShowRule) {
          if (res.resultOpenForm === "01") {
            this.ruleForm.rankShowRule = "01";
          }
        }
        this.$nextTick(() => {
          this.rules = infoRules(this.ruleForm);
        });
      });
    },
    queryUnit() {
      getCurrencyUnit().then((res) => {
        this.currencyUnit = res.data;
        if (!this.ruleForm.currencyUnit) {
          this.ruleForm.currencyUnit = this.currencyUnit[0]?.code;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.item ::v-deep {
  display: flex;
  margin-right: -6rem;
  flex-wrap: wrap;
  .el-form-item {
    display: flex;
    width: 28%;
    margin-right: 5rem;
    position: relative;
    .el-form-item__label {
      width: 52%;
    }
    .el-form-item__content {
      width: 100%;
      .el-input {
        margin-left: 1rem;
      }
    }
    /* 禁用样式 */
    .el-input.is-disabled .el-input__inner {
      background-color: #f4f5f6;
      color: #000;
      text-align: center;
    }
    .form-item-row1-clo3-right {
      line-height: initial;
      text-align: left;
    }
    /* 供应商图标 */
    .form-item-resultOpenForm-icon {
      position: absolute;
      left: -1.4rem;
    }
    /* 目标价图标 */
    .form-item-targetPrice-icon {
      position: absolute;
      left: -6.5rem;
      top: 3px;
    }
    .form-item-rankShowRule-icon {
      position: absolute;
      left: -4rem;
      /* top: 0.4rem; */
      top: 2px;
    }
  }
}
.form-item-targetPrice {
  position: relative;
  .form-item-targetPrice-icon {
    position: absolute;
    left: -9.5rem;
    /* top: 0.4rem; */
    top: 2px;
  }
  .form-item-rankShowRule-icon {
    position: absolute;
    left: 6rem;
    /* top: 0.4rem; */
    top: 2px;
  }
}

.form-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
::v-deep .el-button--default {
  min-width: 7rem;
}
.hover-text {
  max-width: 270px;
  color: #999999;
  font-family: "PingFangSC-Regular";
  font-size: 14px;
  font-weight: 400;
  .hover-stick {
    color: #1660f1;
  }
}

.form {
  /* 横线 */
  .link-gray {
    width: 100%;
    height: 2px;
    background: #e1e4ed;
    margin-top: 20px;
    margin-bottom: 25px;
  }
  .form-item-row1-clo2 {
    margin-top: 2rem;
    div {
      margin-left: 0px !important;
    }
    ::v-deep .el-form-item__content {
      margin-right: 5rem;
    }
    .form-radio {
      display: flex;
      margin-bottom: 2rem;
      .form-radio-right {
        margin-left: 5rem;
        margin-right: 3rem;
      }
      .form-radio-left {
        margin-right: 3rem;
      }
      .form-radio-div {
        width: 100%;
        background-color: #f8f8fa;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
        font-size: 0.8rem;
        line-height: 1.5;
        padding: 0.3125rem 0.9375rem;
        text-align: justify;
        overflow: auto;
      }
    }
  }
  .form-item-row1-clo1 {
    margin-top: 0.5rem;
  }
}
/* 报价规则 */
.form-top-rules {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.form-rules {
  .form-item-row1-content {
    /* display: flex; */ //文字平行
    position: relative;
    ::v-deep .el-form-item {
      /* display: flex; */
      /* flex: 1; */
      .el-form-item__content {
        flex: 1;
      }
      .el-input__inner {
        text-align: center;
      }
    }
    .form-item-targetPrice-icon {
      position: absolute;
      left: -3.3rem;
      /* top: 0.4rem; */
      top: 4px;
    }
  }
  .form-content {
    display: flex;
    /* margin-left: 5rem; */
    margin-left: 12rem;
    align-items: baseline;
    .from-item-rankShowRule {
      display: flex;
      div {
        ::v-deep .el-form-item__content {
          margin-left: 0px !important;
        }
      }
      .from-item-clo1 {
        margin-top: 0.5rem;
      }

      ::v-deep .el-form-item__error {
        padding-left: 0;
        white-space: nowrap;
      }
    }

    .form-item1 {
      margin-right: 1.5rem;
      color: red;
    }
    .form-item2 {
      margin-left: 2rem;
      margin-right: 1rem;
    }
    .form-item3 {
      margin-left: 2rem;
      margin-right: 1rem;
    }
    .form-line {
      margin: 0 1rem;
    }
  }
  .form-content2 {
    display: flex;
    /* margin-left: 5rem; */
    margin-left: 12rem;
    align-items: baseline;
    .from-item-rankShowRule {
      display: flex;
      div {
        ::v-deep .el-form-item__content {
          margin-left: 0px !important;
        }
      }
      .from-item-clo1 {
        margin-top: 0.5rem;
      }

      ::v-deep .el-form-item__error {
        padding-left: 0;
        white-space: nowrap;
      }
    }
    .form-item1 {
      margin-right: 2rem;
    }
    .form-item2 {
      margin-left: 2rem;
      margin-right: 1rem;
    }
    .form-item3 {
      margin-left: 2rem;
      margin-right: 1rem;
    }
    .form-line {
      margin: 0 1rem;
    }
  }
}
/* 附件 */
.form-top-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .form-item {
    display: flex;
    .form-item-content1 {
      margin-right: 1rem;
    }
  }
}
.form-item-file {
  flex: 1;
  margin-left: -10rem;
}
.form-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
