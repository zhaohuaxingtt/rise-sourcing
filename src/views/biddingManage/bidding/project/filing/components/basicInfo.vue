<template>
  <div>
    <!-- 基本信息 -->
    <iCard :title="language('BIDDING_JIBENXINXI', '基本信息')" collapse>
      <el-form
        class="form"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        :hideRequiredAsterisk="true"
        :validate-on-rule-change="false"
      >
        <div class="item">
          <iFormItem :label="language('BIDDING_XIANGMULEIXING', '项目类型')" prop="projectType">
            <iSelect v-model="ruleForm.projectType" disabled>
              <el-option
                v-for="(item, index) in projectType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_RFQMINGCHENG', 'RFQ名称')" prop="rfqName" v-if="onRFQname">
            <iLabel :label="language('BIDDING_RFQMINGCHENG', 'RFQ名称')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqName" disabled></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_XIANGMUMINGCHENG', '项目名称')" prop="projectName" v-else>
            <iLabel :label="language('BIDDING_XIANGMUMINGCHENG', '项目名称')" slot="label"></iLabel>
            <iInput v-model="ruleForm['projectName']" disabled></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_JINGPAILEIXING', '竞拍类型')" prop="biddingType">
            <iLabel :label="language('BIDDING_JINGPAILEIXING', '竞拍类型')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.biddingType" disabled>
              <el-option
                v-for="(item, index) in biddingType"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_BIJIADANWEI', '比价单位')" prop="currencyUnit">
            <iLabel :label="language('BIDDING_BIJIADANWEI', '比价单位')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.currencyUnit" disabled>
              <el-option
                v-for="(item, index) in currencyUnit"
                :key="index"
                :value="item.nameEn"
                :label="item.nameEn"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_HBDWBS', '货币单位倍数')" prop="currencyMultiple">
            <iLabel :label="language('BIDDING_HBDWBS', '货币单位倍数')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.currencyMultiple" disabled>
              <el-option
                v-for="(item, index) in currencyMultiple"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_BJSFHS', '报价是否含税')" prop="isTax">
            <iLabel :label="language('BIDDING_BJSFHS', '报价是否含税')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.isTax" disabled>
              <el-option
                v-for="(item, index) in isTax"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_JJKSSJ', '竞价开始时间')" prop="biddingBeginTime">
            <iLabel :label="language('BIDDING_JJKSSJ', '竞价开始时间')" slot="label"></iLabel>
            <iInput
              :value="
                ruleForm.biddingBeginTime
                  ? ruleForm.biddingBeginTime.replace('T', ' ')
                  : ''
              "
              disabled
            ></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_JJJSSJ', '竞价结束时间')" prop="biddingEndTime" v-if="onTime">
            <iLabel :label="language('BIDDING_JJJSSJ', '竞价结束时间')" slot="label"></iLabel>
            <iInput
              :value="
                ruleForm.biddingEndTime
                  ? ruleForm.biddingEndTime.replace('T', ' ')
                  : ''
              "
              disabled
            ></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_BJJZSJ', '报价截止时间')" prop="pricingDeadline">
            <iLabel :label="language('BIDDING_BJJZSJ', '报价截止时间')" slot="label"></iLabel>
            <iInput
              :value="
                ruleForm.pricingDeadline
                  ? ruleForm.pricingDeadline.replace('T', ' ')
                  : ''
              "
              disabled
            ></iInput>
          </iFormItem>

          <!-- 轮次为在线竞价-英式 显示 -->
          <iFormItem :label="language('BIDDING_JBBJFS', '竞标报价方式')" prop="biddingMode">
            <iLabel :label="language('BIDDING_JBBJFS', '竞标报价方式')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.biddingMode" disabled>
              <el-option
                v-for="(item, index) in biddingMode"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_JBJGHZXS', '竞标结果汇总形式')" prop="biddingResultForm">
            <iLabel :label="language('BIDDING_JBJGHZXS', '竞标结果汇总形式')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.biddingResultForm" disabled>
              <el-option
                v-for="(item, index) in biddingResultForm"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem
            :label="language('BIDDING_KBJGGKXS', '开标结果公开形式')"
            prop="resultOpenForm"
            v-if="roundType"
            class="form-item-row1-clo3-right"
          >
            <iLabelML showTip class="form-item-resultOpenForm-icon">
              <div class="hover-text">
                <span
                  >{{language('BIDDING_PMZGYSZDZSDJTPMGYSBZDJTYGYDSGYSCYLBJ','排名：指供应商知道自身的具体排名（供应商不知道具体一共有多少供应商参与了报价）')}}</span
                ><br />
                <span class="hover-item"
                  >{{language('BIDDING_HLDZGYSZNTGHHLDPDGYSBJDJZL','红绿灯：指供应商只能通过红黄绿灯判断供应商报价的竞争力，而无法知道具体的名次，也无法判断自己是否中标')}}</span
                ><br />
                <span
                  >{{language('BIDDING_SYPMZGYSBJNKDZJDPMHKYKDQTCJBJDGYSDPM','所有排名：指供应商不仅能看到自己的排名，还可以看到其他参加报价的供应商的排名')}}</span
                >
              </div>
            </iLabelML>
            <iLabel
              :label="language('BIDDING_KBJGGKXS', '开标结果公开形式')"
              slot="label"
              class="form-item-row1-clo3-right"
            ></iLabel>
            <iSelect v-model="ruleForm.resultOpenForm" disabled>
              <el-option
                v-for="(item, index) in resultOpenForm"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem
            :label="language('BIDDING_JJJGSFGK', '竞价结果是否公开')"
            prop="isResultOpen"
            v-else
          >
            <!-- <iInput v-model="ruleForm.isResultOpen" disabled></iInput> -->
            <iSelect v-model="ruleForm.isResultOpen" disabled>
              <el-option
                v-for="(item, index) in isResultOpen"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          
          <iFormItem :label="language('BIDDING_MOJUFEI', '模具费')" prop="moldFee" v-if="isMoldFee">
            <iLabel :label="language('BIDDING_MOJUFEI', '模具费')" slot="label"></iLabel>
            <iSelect v-model="ruleForm.moldFee" disabled>
              <el-option
                v-for="(item, index) in moldFee"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </iSelect>
          </iFormItem>

          <iFormItem :label="language('BIDDING_CAIGOUYUAN', '采购员')" prop="linieName">
            <iLabel :label="language('BIDDING_CAIGOUYUAN', '采购员')" slot="label"></iLabel>
            <iInput v-model="ruleForm.linieName" disabled></iInput>
          </iFormItem>
<!-- 
          <iFormItem :label="language('采购员', '采购员')" prop="linieName">
            <iLabel :label="language('采购员', '采购员')" slot="label"></iLabel>
            <iInput v-model="ruleForm.linieName" disabled></iInput>
          </iFormItem> -->

          <iFormItem :label="language('BIDDING_CAIGOUYUANDIANHUA', '采购员电话')" prop="liniePhone">
            <iLabel :label="language('BIDDING_CAIGOUYUANDIANHUA', '采购员电话')" slot="label"></iLabel>
            <iInput v-model="ruleForm.liniePhone" disabled></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_MUBIAOJIA', '目标价')" prop="targetPrice">
            <iLabelML showTip class="form-item-targetPrice-icon">
              <div class="hover-text">
                <span>{{language('BIDDING_TXHGYSKYKDDYDMBJ','填写后，供应商可以看到对应目标价')}}</span>
              </div>
            </iLabelML>
            <iLabel :label="language('BIDDING_MUBIAOJIA', '目标价')" slot="label"></iLabel>
            <iInput
              type="number"
              v-model="ruleForm.targetPrice"
              disabled
            ></iInput>
          </iFormItem>
        </div>

        <div v-if="onOpenTenderNature">
          <!-- 横线 -->
          <div class="link-gray"></div>
          <div>
            <div><h2>{{language('BIDDING_JINGJIAXINGZHI','竞价性质')}}</h2></div>
            <div class="form-item-row1">
              <div class="form-item-row1-clo1">
                <div class="bid-opening" v-html="bidOpening"></div>
              </div>
            </div>
            <div class="form-item-row1">
              <div><span>{{language('BIDDING_QTXMGGXX','其他项目公告信息')}}</span></div>
              <div class="form-item-row1-clo1">
                <iInput
                  type="textarea"
                  :rows="4"
                  resize="none"
                  :maxlength="1000"
                  :placeholder="language('BIDDING_ZSXZW1000Z','字数限制为1000字')"
                  show-word-limit
                  v-model="ruleForm.otherProjectNotice"
                  disabled
                ></iInput>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </iCard>
  </div>
</template>
<script>
import { iInput, iSelect, iFormItem, iCard, iLabel, iMessage } from "rise";
import {
  infoForm,
  infoRules,
  moldFee,
  biddingMode,
  isTax,
  projectType,
  biddingResultForm,
  resultOpenForm,
  currencyMultiple,
  isResultOpen,
  attachments,
  biddingType,
} from "./data";
import { getCurrencyUnit, uploadFile } from "@/api/mock/mock";
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
    iLabel,
    iLabelML,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      id: 0,
      ruleForm: { ...infoForm, attachments: [] },
      rules: [],
      projectType,
      resultOpenForm,
      isTax,
      currencyMultiple,
      biddingResultForm,
      biddingMode,
      moldFee,
      isResultOpen,
      attachments,
      attachmentId: "",
      biddingBeginTime: "",
      biddingEndTime: "",
      pricingDeadline: "",
      biddingType,
      isMoldFee: false,
      currencyVlaue: "",
      selectedTableData: [],
      bidOpeningLeft: `<p>本次竞价为项目谈判的中间过程，竞价结果作为选定供应商的参考，最终供应商的选择以最终谈判结果及上汽大众联合采购委员会（CSC）会议决策为准。</p>
                      <p>This project bidding is a process of negotiation. The results of the project bidding will be used as a reference for 
                      the selection of suppliers . Final selection of suppliers will be based on final negotiation 
                      results and made by SAIC VOLKSWAGEN CSC meeting.</p>`,
      bidOpeningRight: `<p>本次项目竞价结果将作为选定供应商的重要依据，上汽大众优先选择竞价最优供应商，并保留与其进一步谈判权利。最终定点结果以上汽大众联合采购委员会（CSC）会议决策为准。</p>
                        <p>The results of the project bidding will be an important basis for the selection of suppliers. SAIC VOLKSWAGEN will give priority to the best supplier(s)
                         in bidding for selection and reserve the right of further negotiation. The final n
                         omination results will be made by SAIC VOLKSWAGEN CSC meeting.</p>`,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    // this.queryUnit();
    // this.handleSearchReset();
  },
  computed: {
    roundType() {
      if (this.ruleForm.roundType === "05") {
        if (this.ruleForm.manualBiddingType === "02") {
          return false;
        }
      }
      return true;
    },
    onProjectType() {
      if (this.ruleForm.roundType === "05") {
        return true;
      }
      return false;
    },
    // 竞标结果汇总形式
    onBiddingResultForm() {
      if (
        this.ruleForm.roundType === "03" ||
        (this.ruleForm.roundType === "05" &&
          this.ruleForm.manualBiddingType === "01")
      ) {
        return true;
      }
      return false;
    },
    // 竞标性质
    onOpenTenderNature() {
      if (
        this.ruleForm.roundType === "03" ||
        (this.ruleForm.roundType === "05" &&
          this.ruleForm.manualBiddingType === "01")
      ) {
        return true;
      }
      return false;
    },
    onTime() {
      if (
        this.ruleForm.roundType === "05" &&
        this.ruleForm.manualBiddingType === "02"
      ) {
        return false;
      }
      return true;
    },
    onRFQname() {
      if (this.ruleForm.roundType === "05" && this.ruleForm.rfqCode == null) {
        return false;
      }
      return true;
    },
    bidOpening() {
      if(this.ruleForm.biddingNature == "01") {
        return this.bidOpeningLeft
      }else if(this.ruleForm.biddingNature == "02"){
        return this.bidOpeningRight
      }else {
        return ''
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    "ruleForm.biddingMode": {
      immediate: true,
      handler(val) {
        if (val === "03") {
          this.ruleForm.currencyMultiple = "01";
          this.isMoldFee = true;
        } else {
          this.isMoldFee = false;
        }
      },
    },
  },
  methods: {
    // 重置
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    currencyChange(val) {
      console.log(val);
      this.currencyVlaue = val;
    },
    // 附件
    async httpUpload(content) {
      let formData = new FormData();
      formData.append("file", content.file);
      await uploadFile(formData)
        .then((res) => {
          this.attachmentId = res.id;
          this.ruleForm.attachments.push({
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentSize: this.size,
            biddingId: this.ruleForm.id,
            rfqCode: this.ruleForm.rfqCode,
            uploadDate: this.getTime(),
            // uploadDate: new Date(),
            uploadName: "xxx",
            source: "02",
          });
          iMessage.success(this.language('BIDDINGH_SHANGCHUANCHENGGONG', '上传成功'));
        })
        .catch((err) => {
          iMessage.error(this.language('BIDDING_SHANGCHUANSHIBAI', '上传失败'));
        });
    },
    beforeAvatarUpload(file) {
      console.log(file);
      this.size = file.size;
      if (this.size < 0.1 * 1024 * 1024 * 1024) {
        this.size = (this.size / (1024 * 1024)).toFixed(2);
      }
      const isSize = file.size / 1024 / 1024 < 15;
      if (!isSize) {
        this.$message.error(this.language('BIDDING_WJDXZDXZ15M', '文件大小最大限制15M'));
      }
      return isSize;
    },
    getTime() {
      let date = new Date();
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
      this.$confirm(this.language('BIDDING_SFSCXZXJFJ',"是否删除选中询价附件？"), this.language('BIDDING_TISHI',"提示"), {
        confirmButtonText: this.language('BIDDING_QUEDING',"确定"),
        cancelButtonText: this.language('BIDDING_QUXIAO',"取消"),
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
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = this.ruleForm;
          if (this.ruleForm.projectType === "正式项目") {
            this.ruleForm.projectType = "01";
          }
          biddingInfo(formData)
            .then((res) => {
              if (res) {
                iMessage.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
                this.$router.push({
                  path: `/bidding/competition/project/${this.id}`,
                });
              } else {
                iMessage.success(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
              }
            })
            .catch((err) => {
              console.log("err", err);
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
          currencyUnit: res.currencyUnit || this.currencyUnit[0]?.nameEn,
          biddingType: res.biddingType || "01",
          isTax: res.isTax || "01",
          resultOpenForm: res.resultOpenForm || "01",
          moldFee: res.moldFee || "02",
          targetPrice: res.targetPrice || "",
        };
        this.$parent.$emit("change-title", res);
        // 项目类型
        if (res.roundType === "03" || res.roundType === "04") {
          this.ruleForm.projectType === "01";
        }
        if (this.ruleForm.projectType === "01") {
          this.ruleForm.projectType = "正式项目";
        }
        // 竞标报价方式
        if (!res.biddingMode) {
          if (res.roundType === "03") {
            this.ruleForm.biddingMode = "03";
          } else if (res.roundType === "05" && res.manualBiddingType === "02") {
            this.ruleForm.biddingMode = "02";
          }
        }
        // 竞标性质
        if (
          res.roundType === "03" ||
          (res.roundType === "05" && res.manualBiddingType === "01")
        ) {
          this.ruleForm.openTenderNature = "01";
        }
        // 多价格
        if (res.biddingType === "03") {
          this.ruleForm.currencyMultiple = "01";
        }
        //竞拍类型
        if (
          res.roundType === "04" ||
          (res.roundType === "05" && res.manualBiddingType === "02")
        ) {
          this.ruleForm.biddingType = "01";
        }
        // 报价是否含税
        if (res.roundType === "02") {
          this.ruleForm.isTax = "01";
        }
        //货币单位倍数
        if (this.ruleForm.biddingMode === "03") {
          this.ruleForm.currencyMultiple =
            this.ruleForm.currencyMultiple || "01";
        }
        this.$nextTick(() => {
          this.rules = infoRules;
        });
      });
    },
    queryUnit() {
      getCurrencyUnit().then((res) => {
        this.currencyUnit = res.map((item) => {
          return {
            ...item,
            id: String(item.id),
          };
        });
        if (!this.ruleForm.currencyUnit) {
          this.ruleForm.currencyUnit = this.currencyUnit[0]?.nameEn;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* 测试 */

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
      width: 16.4rem;
      line-height: normal;
      display: flex;
      align-items: center;
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
    /* 目标价图标 */
    .form-item-targetPrice-icon {
      position: absolute;
      left: -6.5rem;
      top: 3px;
    }
    /* 供应商图标 */
    .form-item-resultOpenForm-icon {
      position: absolute;
      left: -1.4rem;
    }
  }
}
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

.form-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
::v-deep .el-button--default {
  min-width: 10rem;
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

.bid-opening{
  background: #F5F7FA;
  padding: 10px 15px 40px 15px;
  margin-bottom: 1rem;
  color: #AAAAAA;
  border-radius: 6px;
  font-size: 15px;
  line-height: 15px;
  overflow: auto;
  cursor: not-allowed;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  letter-spacing: -1px;
}
</style>
