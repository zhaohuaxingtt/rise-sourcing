<template>
  <div>
    <!-- 基本信息 -->
    <iCard style="margin-top: 0.5rem">
      <!-- <div class="form-top">
        <div>
          <h2>基础信息</h2>
        </div>
        <div>
          <iButton @click="handleSearchReset">重置</iButton>
          <iButton @click="handleSubmit">下一步 </iButton>
        </div>
      </div> -->
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
        <div class="form-top">
          <div>
            <h2>{{language('BIDDING_JICHUXINXI',"基础信息")}}</h2>
          </div>
          <div>
            <template v-if="ruleForm.biddingStatus !== '01'">
              <!-- <el-form>
                <iButton :disabled="false" @click="handleBack">返回 </iButton>
              </el-form> -->
            </template>
            <template v-else>
              <iButton @click="handleSearchReset">{{language('BIDDING_CHONGZHI','重置')}}</iButton>
              <iButton @click="handleSubmit">{{language('BIDDING_XIAYIBU','下一步')}} </iButton>
            </template>
          </div>
        </div>
        <div class="item">
          <iFormItem
            :label="language('BIDDING_XIANGMULEIXING', '项目类型')"
            prop="projectType"
            v-if="onProjectType"
          >
            <iLabel :label="language('BIDDING_XIANGMULEIXING', '项目类型')" slot="label" required></iLabel>
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

          <iFormItem :label="language('BIDDING_XIANGMULEIXING', '项目类型')" prop="projectType" v-else>
            <iLabel :label="language('BIDDING_XIANGMULEIXING', '项目类型')" slot="label" required></iLabel>
            <iInput v-model="ruleForm.projectType" disabled></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_RFQMINGCHENG', 'RFQ名称')" prop="rfqName" v-if="onRFQname">
            <iLabel :label="language('BIDDING_RFQMINGCHENG', 'RFQ名称')" slot="label"></iLabel>
            <iInput v-model="ruleForm.rfqName" disabled></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_XIANGMUMINGCHENG', '项目名称')" prop="projectName" v-else>
            <iLabel :label="language('BIDDING_XIANGMUMINGCHENG', '项目名称')" slot="label" required></iLabel>
            <iInput v-model="ruleForm['projectName']"></iInput>
          </iFormItem>

          <iFormItem :label="language('BIDDING_JINGPAILEIXING', '竞拍类型')" prop="biddingType">
            <iLabel :label="language('BIDDING_JINGPAILEIXING', '竞拍类型')" slot="label" required></iLabel>
            <iSelect
              v-model="ruleForm.biddingType"
              :disabled="
                ruleForm.roundType === '05' &&
                ruleForm.manualBiddingType === '02'
              "
            >
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
            <iLabel :label="language('BIDDING_BIJIADANWEI', '比价单位')" slot="label" required></iLabel>
            <iSelect v-model="ruleForm.currencyUnit" :disabled="ruleForm.roundType === '03'">
              <el-option
                v-for="(item, index) in currencyUnit"
                :key="index"
                :value="item.code"
                :label="item.code"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <iFormItem :label="language('BIDDING_HBDWBS', '货币单位倍数')" prop="currencyMultiple">
            <iLabel :label="language('BIDDING_HBDWBS', '货币单位倍数')" slot="label" required></iLabel>
            <iSelect
              v-model="ruleForm.currencyMultiple"
              @change="currencyChange"
              :disabled="ruleForm.biddingMode === '03'"
            >
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
            <iLabel :label="language('BIDDING_BJSFHS', '报价是否含税')" slot="label" required></iLabel>
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
          <iFormItem
            :label="language('BIDDING_JJJSSJ', '竞价结束时间')"
            prop="biddingEndTime"
            v-if="onTime"
          >
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
            <iLabel :label="language('BIDDING_JBBJFS', '竞标报价方式')" slot="label" required></iLabel>
            <iSelect
              v-model="ruleForm.biddingMode"
              :disabled="
                ruleForm.roundType === '03' ||
                (ruleForm.roundType === '05' &&
                  ruleForm.manualBiddingType === '02')
              "
            >
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
            <iSelect v-model="ruleForm.biddingResultForm">
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
          <iFormItem :label="language('BIDDING_JJJGSFGK', '竞价结果是否公开')" prop="isResultOpen" v-else>
            <iLabel
              :label="language('BIDDING_JJJGSFGK', '竞价结果是否公开')"
              slot="label"
              required
            ></iLabel>
            <iSelect v-model="ruleForm.isResultOpen">
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
            <iLabel :label="language('BIDDING_MOJUFEI', '模具费')" slot="label" required></iLabel>
            <iSelect v-model="ruleForm.moldFee" required>
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
              oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value.slice(0,15)"
              v-model="ruleForm.targetPrice"
            ></iInput>
          </iFormItem>
        </div>

        <div v-if="onOpenTenderNature">
          <!-- 横线 -->
          <div class="link-gray"></div>
          <div>
            <div><h2>{{language('BIDDING_JINGJIAXINGZHI','竞价性质')}}</h2></div>
            <div class="form-item-row1-clo2">
              <div style="margin-left: -12rem">
                <iFormItem prop="biddingNature">
                  <el-radio-group
                    v-model="ruleForm.biddingNature"
                    class="form-radio"
                  >
                    <el-radio label="01" class="form-radio-left"
                      >{{language('BIDDING_ZHONGJIANGUOCHENG','中间过程')}}</el-radio
                    >
                    <div class="form-radio-div" v-html="bidOpeningLeft"></div>
                    <el-radio label="02" class="form-radio-right"
                      >{{language('BIDDING_ZUIZHONGJIEGUO','最终结果')}}</el-radio
                    >
                    <div class="form-radio-div" v-html="bidOpeningRight"></div>
                  </el-radio-group>
                </iFormItem>
              </div>
              <!-- <iRadio v-model="radio" label="1">中间过程</iRadio> -->
            </div>
            <div class="form-item-row1">
              <div><span>{{language('BIDDING_QTXMGGXX','其他项目公告信息')}}</span></div>
              <!-- <iFormItem
              label="language('其他项目公告信息', '其他项目公告信息')"
              prop="otherProjectNotice"
            >
              <iLabel
                :label="language('其他项目公告信息', '其他项目公告信息')"
                slot="label"
              ></iLabel>
            </iFormItem> -->
              <div class="form-item-row1-clo1">
                <iInput
                  type="textarea"
                  :rows="4"
                  resize="none"
                  :maxlength="1000"
                  :placeholder="language('BIDDING_ZSXZW1000Z','字数限制为1000字')"
                  show-word-limit
                  v-model="ruleForm.otherProjectNotice"
                ></iInput>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </iCard>

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
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
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
    iButton,
    iLabel,
    iLabelML,
    // iTableCustom,
    // iPagination,
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
      currencyUnit:[
        {code:'USD'},
        {code:'RMB'},
        {code:'JPY'},
        {code:'EUR'},
      ],
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
    this.queryUnit();
    this.handleSearchReset();
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
    // onCurrencyUnit() {
    //   if (this.ruleForm.currencyUnit === 1) {
    //     return this.currencyUnit.slice(0, 2);
    //   }
    //   return [];
    // },
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
  },
  watch: {
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
          // this.$confirm("是否保存该报价信息？", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   type: "warning",
          // })
          //   .then(() => {
          //     //保存
          //     if (this.ruleForm.projectType === "正式项目") {
          //       this.ruleForm.projectType = "01";
          //     }
          //     const formData = this.ruleForm;
          //     return biddingInfo(formData);
          //   })
          //   .then((res) => {
          //     if (res) {
          //       this.$message.success("保存成功");
          //       this.$router.push({
          //         path: `/bidding/competition/project/${this.id}`,
          //       });
          //     } else {
          //       this.$message.error("保存失败");
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
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
          currencyUnit: res?.currencyUnit || this.currencyUnit[0]?.code ,
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
        if (res.roundType === "03") {
          if (!res.biddingMode) {
            this.ruleForm.biddingMode = "03";
          }
        } else if (res.roundType === "05" && res.manualBiddingType === "02") {
          this.ruleForm.biddingMode = "02";
        }
        // 竞标性质
        if (
          res.roundType === "03" ||
          (res.roundType === "05" && res.manualBiddingType === "01")
        ) {
          this.ruleForm.biddingNature = res.biddingNature || "01";
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
        // 比价单位
        if(res.roundType === "03" ){
          this.ruleForm.currencyUnit = 'RMB'
        }
        this.$nextTick(() => {
          this.rules = infoRules;
        });
      });
    },
    queryUnit() {
      getCurrencyUnit().then((res) => {
        this.currencyUnit = res.data;
        if (!this.ruleForm.currencyUnit) {
          this.ruleForm.currencyUnit = this.currencyUnit[0]?.code ;
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
</style>
