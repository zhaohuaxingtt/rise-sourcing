<!--
 * @Author: your name
 * @Date: 2021-06-22 16:16:26
 * @LastEditTime: 2022-03-09 17:45:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\components\score\index.vue
-->
<template>
  <iCard
      :title="language('LK_GONGYINGSHANGPINGFEN', '供应商评分')"
      class="score"
  >
    <template #header-control>
      <div v-if="!editStatus" key="1">
        <iButton v-if="isMQRater" :loading="exportLoading" icon="el-icon-download" @click="exportSQE">{{
            language("下载SQE评分表")
          }}
        </iButton>
        <iButton v-if="isMQRater" icon="el-icon-download" @click="exportSQE('MQ')" :loading="exportMQLoading">{{ language("下载质量评分表") }}</iButton>
<!--        保留一个下载,使用SQE下载接口-->
<!--        <iButton v-if="isMQRater" icon="el-icon-download" @click="exportSQE" :loading="exportMQLoading">{{ language("下载质量评分表") }}</iButton>-->
        <iButton v-if="isMQRater" @click="handleEdit('sqeApproval')">{{ language("编辑SQE评分审核") }}</iButton>
        <template v-if="showSQE">
          <iButton v-if="rfqInfo.hasShowSqeEdit" @click="handleEdit('sqe')">{{ language("编辑SQE评分") }}</iButton>
          <iButton v-if="rfqInfo.hasShowSqeBack" @click="back">{{ language("退回SQE评分") }}</iButton>
          <iButton v-if="rfqInfo.hasShowSqeReject" @click="reject">{{ language("驳回") }}</iButton>
          <iButton v-if="rfqInfo.hasShowSqeApprove" @click="approve">{{ language("通过") }}</iButton>
        </template>
        <!-- 转派--该评分任务的协调人 -->
        <iButton
            v-if="rfqInfo.coordinatorId == userInfo.id"
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_TRANSFER | 转派
          "
            @click="forwardDialogVisible = true"
        >{{ language("LK_ZHUANPAI", "转派") }}
        </iButton
        >
        <!-- 撤回 -->
        <iButton
            v-if="rfqInfo.hasShowRecall"
            :loading="recallLoading"
            @click="handleRecall"
        >{{ language("CHEHUI", "撤回") }}
        </iButton
        >
        <!-- 退回至采购员 编辑 提交---该评分任务的评分人 -->
        <iButton
            v-if="rfqInfo.hasShowBack"
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_BACK |
              退回至采购员
          "
            :loading="backLoading"
            @click="handleBack"
        >{{ language("TUIHUIZHICAIGOUYUAN", "退回至采购员") }}
        </iButton
        >
        <!-- 编辑/提交  状态为待评分/待提交 该评分任务的评分 -->
        <iButton
            v-if="rfqInfo.hasShowEdit"
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_EDIT | 编辑
          "
            @click="handleEdit"
        >{{ language("BIANJI", "编辑") }}
        </iButton
        >
        <iButton
            v-if="rfqInfo.hasShowSubmit || rfqInfo.hasShowSqeSubmit"
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_SUBMIT | 提交
          "
            :loading="submitLoading"
            @click="handleSubmit"
        >{{ language("LK_TIJIAO", "提交") }}
        </iButton
        >
        <!-- 批准 驳回 该评分任务的协调人 待审核 -->
        <iButton
            v-if="rfqInfo.hasShowApprove"
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_APPROVE | 批准
          "
            :loading="approveLoading"
            @click="handleApprove"
        >{{ language("PIZHUN", "批准") }}
        </iButton
        >
        <iButton
            v-if="rfqInfo.hasShowReject"
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_REJECT | 拒绝
          "
            @click="handleReject"
        >{{ language("JUJUE", "拒绝") }}
        </iButton
        >
      </div>
      <div v-if="editStatus" key="2">
        <iButton @click="handleCloseEdit">{{
            language("JIESHUBIANJI", "结束编辑")
          }}
        </iButton>
        <iButton
            v-permission.auto="
            SUPPLIERSCORE_RFQDETAIL_SUPPLIERSCORE_SCORE_BUTTON_SAVE | 保存
          "
            :loading="saveLoading"
            @click="handleSave"
        >{{ language("BAOCUN", "保存") }}
        </iButton
        >
      </div>
    </template>
    <div class="body">
      <el-table
          v-loading="loading"
          :data="tableListData"
          :empty-text="language('ZANWUSHUJU', '暂无数据')"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            :selectable="selectInit"
            type="selection"
            width="55"
        ></el-table-column>
        <el-table-column
            align="center"
            label="#"
            type="index"
        ></el-table-column>
        <el-table-column
            v-for="(item, $index) in tableTitle"
            :key="$index"
            :label="language(item.key, item.name)"
            :show-overflow-tooltip="item.tooltip"
            align="center"
            :min-width="item.minWidth"
        >
          <template v-if="item.props === 'sapCode'" v-slot="scope">
            <span>{{
                scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode
              }}</span>
          </template>
          <template v-else-if="item.props === 'partScore'" v-slot="scope">
            <span class="link-underline" @click="viewPartScore(scope.row)">{{
                language("CHAKAN", "查看")
              }}</span>
          </template>
          <template v-else v-slot="scope">
            <span>{{ scope.row[item.props] }}</span>
          </template>
        </el-table-column>
        <template v-if="showSQE">
          <el-table-column
              :label="language('SQE评分')"
              align="center"
          >
            <el-table-column
                v-for="item in SQETableTitle"
                :key="item.props"
                :label="language(item.key, item.name)"
                :show-overflow-tooltip="item.tooltip"
                :width="item.width"
                align="center"
            >

              <template v-if="item.props === 'sqeStatus'" v-slot="scope">
                <span>{{ scope.row[item.props] }}</span>
              </template>
              <template v-else-if="item.props === 'sqePerformance'" v-slot="scope">
                <iSelect v-if="editStatus && hasEditLine(scope.row.id) && ['sqeApproval','sqe'].includes(editType)"
                         v-model="scope.row.sqePerformance">
                  <el-option
                      v-for="(item, index) in sqeGrade"
                      :key="index"
                      :label="$i18n.locale === 'zh' ? item.name : item.nameEn"
                      :value="item.code"
                  >
                  </el-option>
                </iSelect>
                <span>{{ getSelectLabel(scope.row, 'sqePerformance', sqeGrade) }}</span>
              </template>
              <template v-else-if="item.props === 'sqeAuditRemark'" v-slot="scope">
                <iInput v-if="editStatus && hasEditLine(scope.row.id) && editType==='sqeApproval'"
                        v-model="scope.row[item.props]"/>
                <span v-else>{{ hideLabel(scope.row, item.props) }}</span>
              </template>
              <template v-else v-slot="scope">
                <iInput v-if="editStatus && hasEditLine(scope.row.id) && ['sqeApproval','sqe'].includes(editType)"
                        v-model="scope.row[item.props]"/>
                <span v-else>{{ hideLabel(scope.row, item.props) }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </template>
        <template v-if="!isFromSQE">
          <template v-if="isFileRfqType">
            <el-table-column
              :label="language('LK_FUJIANPINGFEN', '附件评分')"
              align="center"
            >
              <el-table-column
                v-for="item in deptScoreTableTitle"
                :key="item.props"
                :label="language(item.key, item.name)"
                :show-overflow-tooltip="item.tooltip"
                :width="item.width"
                align="center"
              >
                <template v-if="item.props === 'rate'" #header="scope">
                  <span>{{ scope.column.label }}<i class="required">*</i></span>
                </template>
                <template v-if="item.props === 'rate'" v-slot="scope">
                  <div v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)">
                    <iSelect v-model="scope.row.rate">
                      <el-option
                        v-for="(item, index) in affixGrade"
                        :key="index"
                        :label="$i18n.locale === 'zh' ? item.name : item.nameEn"
                        :value="item.code"
                      >
                      </el-option>
                    </iSelect>
                  </div>
                  <span v-else>{{ showaffixName(scope.row.rate) }}</span>
                </template>
                <template
                  v-else-if="
                  item.props === 'externalFee' || item.props === 'addFee'
                "
                  v-slot="scope"
                >
                  <iInput
                    v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                    v-model="scope.row[item.props]"
                    style="width: 90%"
                    @input="handleInputByMoney($event, item.props, scope.row)"
                  />
                  <span v-else>{{ scope.row[item.props] }}</span>
                </template>
                <template
                  v-else-if="item.props === 'confirmCycle'"
                  v-slot="scope"
                >
                  <!-- @input="handleInputByWeek($event, item.props, scope.row) -->
                  <iInput
                    v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                    v-model="scope.row.confirmCycle"
                    type="number"
                    @input="handlePutByZ($event, item.props, scope.row)"
                  />
                  <span v-else>{{ scope.row.confirmCycle }}</span>
                </template>
                <template v-else-if="item.props === 'remark'" v-slot="scope">
                  <el-tooltip :disabled="!scope.row.memo" placement="top">
                    <div slot="content" style="maxwidth: 200px">
                      {{ scope.row.memo }}
                    </div>
                    <div>
                      <iInput
                        v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                        v-model="scope.row.memo"
                      />
                      <span v-else class="text-overflow">{{
                          scope.row.memo
                                                         }}</span>
                    </div>
                  </el-tooltip>
                </template>
                <template v-else v-slot="scope">
                  <span>{{ scope.row[item.props] }}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </template>
          <template v-else>
            <template v-if="isMQ">
              <el-table-column
                :label="language('ZHILIANGPINGFEN', '质量评分')"
                align="center"
              >
                <el-table-column
                  v-for="item in deptScoreTableTitle"
                  :key="item.props"
                  :label="language(item.key, item.name)"
                  :show-overflow-tooltip="item.tooltip"
                  :width="item.width"
                  align="center"
                >
                  <template v-if="item.props === 'rate'" #header="scope">
                    <span>{{ scope.column.label }}<i class="required">*</i></span>
                  </template>
                  <template v-if="item.props === 'rate'" v-slot="scope">
                    <template v-if="scope.row.rateTag == 'MQ'">
                      <div v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)">
                        <iSelect v-model="scope.row.rate">
                          <el-option
                            v-for="(item, index) in mqGrage"
                            :key="index"
                            :label="item.nameEn"
                            :value="item.code"
                          >
                          </el-option>
                        </iSelect>
                      </div>
                      <span v-else>{{ scope.row.rate }}</span>
                    </template>
                  </template>
                  <template
                    v-else-if="
                    item.props === 'externalFee' || item.props === 'addFee'
                  "
                    v-slot="scope"
                  >
                    <template v-if="scope.row.rateTag == 'MQ'">
                      <iInput
                        v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                        v-model="scope.row[item.props]"
                        style="width: 90%"
                        @input="handleInputByMoney($event, item.props, scope.row)"
                      />
                      <span v-else>{{ scope.row[item.props] }}</span>
                    </template>
                  </template>
                  <template
                    v-else-if="item.props === 'confirmCycle'"
                    v-slot="scope"
                  >
                    <template v-if="scope.row.rateTag == 'MQ'">
                      <!-- @input="handleInputByWeek($event, item.props, scope.row)" -->
                      <iInput
                        v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                        v-model="scope.row.confirmCycle"
                        type="number"
                        @input="handlePutByZ($event, item.props, scope.row)"
                      />
                      <span v-else>{{ scope.row.confirmCycle }}</span>
                    </template>
                  </template>
                  <template v-else-if="item.props === 'remark'" v-slot="scope">
                    <template v-if="scope.row.rateTag == 'MQ'">
                      <el-tooltip :disabled="!scope.row.memo" placement="top">
                        <div slot="content" style="maxwidth: 200px">
                          {{ scope.row.memo }}
                        </div>
                        <div>
                          <iInput
                            v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                            v-model="scope.row.memo"
                          />
                          <span v-else class="text-overflow">{{
                              scope.row.memo
                                                             }}</span>
                        </div>
                      </el-tooltip>
                    </template>
                  </template>
                  <template v-else v-slot="scope">
                    <template v-if="scope.row.rateTag == 'MQ'">
                      <span>{{ scope.row[item.props] }}</span>
                    </template>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
            <template v-if="isEP">
              <el-table-column
                :label="language('JISHUPINGFEN', '技术评分')"
                align="center"
              >
                <el-table-column
                  v-for="item in deptScoreTableTitle"
                  :key="item.props"
                  :label="language(item.key, item.name)"
                  :show-overflow-tooltip="item.tooltip"
                  :width="item.width"
                  align="center"
                >
                  <template v-if="item.props === 'rate'" #header="scope">
                    <span>{{ scope.column.label }}<i class="required">*</i></span>
                  </template>
                  <template v-if="item.props === 'rate'" v-slot="scope">
                    <template v-if="scope.row.rateTag == 'EP'">
                      <div v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)">
                        <iSelect v-model="scope.row.rate">
                          <el-option
                            v-for="(item, index) in epGrade"
                            :key="index"
                            :label="item.nameEn"
                            :value="item.code"
                          >
                          </el-option>
                        </iSelect>
                      </div>
                      <span v-else>{{ scope.row.rate }}</span>
                    </template>
                  </template>
                  <template
                    v-else-if="
                    item.props === 'externalFee' || item.props === 'addFee'
                  "
                    v-slot="scope"
                  >
                    <template v-if="scope.row.rateTag == 'EP'">
                      <iInput
                        v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                        v-model="scope.row[item.props]"
                        style="width: 90%"
                        @input="handleInputByMoney($event, item.props, scope.row)"
                      />
                      <span v-else>{{ scope.row[item.props] }}</span>
                    </template>
                  </template>
                  <template
                    v-else-if="item.props === 'confirmCycle'"
                    v-slot="scope"
                  >
                    <template v-if="scope.row.rateTag == 'EP'">
                      <!-- @input="handleInputByWeek($event, item.props, scope.row)" -->
                      <iInput
                        v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                        v-model="scope.row.confirmCycle"
                        type="number"
                        @input="handlePutByZ($event, item.props, scope.row)"
                      />
                      <span v-else>{{ scope.row.confirmCycle }}</span>
                    </template>
                  </template>
                  <template v-else-if="item.props === 'remark'" v-slot="scope">
                    <template v-if="scope.row.rateTag == 'EP'">
                      <el-tooltip :disabled="!scope.row.memo" placement="top">
                        <div slot="content" style="maxwidth: 200px">
                          {{ scope.row.memo }}
                        </div>
                        <div>
                          <iInput
                            v-if="editStatus && hasEditLine(scope.row.id) && !['sqeApproval','sqe'].includes(editType)"
                            v-model="scope.row.memo"
                          />
                          <span v-else class="text-overflow">{{
                              scope.row.memo
                                                             }}</span>
                        </div>
                      </el-tooltip>
                    </template>
                  </template>
                  <template v-else v-slot="scope">
                    <template v-if="scope.row.rateTag == 'EP'">
                      <span>{{ scope.row[item.props] }}</span>
                    </template>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
          </template>
        </template>
      </el-table>
    </div>
    <forwardDialog
        ref="forwardDialog"
        :visible.sync="forwardDialogVisible"
        @confirm="confirmForward"
    />
    <rejectDialog
        ref="rejectDialog"
        :visible.sync="rejectDialogVisible"
        @confirm="confirmReject"
    />
    <remarkDialog
        ref="remarkDialog"
        :data="currentRow.memo"
        :visible.sync="remarkDialogVisible"
        @cancel="currentRow = {}"
        @confirm="confirmRemark"
    />
  </iCard>
</template>

<script>
import {iCard, iButton, iInput, iSelect, iMessage, iMessageBox} from "rise";
import forwardDialog from "@/views/supplierscore/components/forwardDialog";
import rejectDialog from "./components/rejectDialog";
import remarkDialog from "@/views/supplierscore/components/remarkDialog";
import {pageMixins} from "@/utils/pageMixins";
import {scoreTableTitle as tableTitle, deptScoreTableTitle, SQETableTitle} from "../data";
import {cloneDeep, isEqual} from "lodash";
import {
  getRfqBdlRatingsByCurrentDept,
  forward,
  backRfqBdlRatings,
  submitRfqBdlRatings,
  approveRfqBdlRatings,
  rejectRfqBdlRatings,
  updateRfqBdlRatings,
  updateRfqBdlRatingMemo,
  recallRate,
  exportSqeRating,
  exportMqRating,
  updateSqeRateBatch,
  updateSeqAuditBatch,
  back,
  submit,
  reject,
  approve
} from "@/api/supplierscore";
import {numberProcessor} from "@/utils";
import {selectDictByKeys} from "@/api/dictionary";

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iSelect,
    forwardDialog,
    rejectDialog,
    remarkDialog,
  },
  mixins: [pageMixins],
  props: {
    rfqId: {
      type: String,
      require: true,
    },
    rfqInfo: {
      type: Object,
      default: () => {
      },
    },
    showSQE: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    isFileRfqType() {
      const {rfqInfo = {}} = this;
      return rfqInfo.rfqType == "ANNEX";
    },
    deptScoreTableTitle() {
      if (this.isFileRfqType) {
        return deptScoreTableTitle.filter((item) => !item.isFileHidden);
      } else {
        return deptScoreTableTitle;
      }
    },
    // SQE股长
    isSqeCoordinator(){
      return this.userInfo.id == this.rfqInfo.sqeCoordinatorId
    },
    // SQE评分人
    isSqeRater(){
      return this.userInfo.id == this.rfqInfo.sqeRaterId
    },
    // 质量评分人
    isMQRater(){
      return this.$route.query.rateTag == 'MQ' && this.rfqInfo.raterId == this.userInfo.id
    },
    isMQ() {
      return this.tableListData.some((item) => item.rateTag == "MQ");
    },
    isEP() {
      return this.tableListData.some((item) => item.rateTag == "EP");
    },
    isFromSQE(){  // 如果是SQE页面入口进来的，则不能查看质量评分
      return this.$route.query.from === 'SQE'
    },
    // SQE表头
    SQETableTitle(){
      if(this.isFromSQE){ // 如果是SQE进入的页面，则不显示SQE表格审核项
        return SQETableTitle.filter(item=>!['sqeAuditRemark'].includes(item.props))
      }
      return SQETableTitle
    }
  },
  inject: ["getRfqDetailByCurrentDept", "getSQERfqDetailByCurrentDept"],
  data() {
    return {
      editStatus: false,
      loading: false,
      tableTitle: tableTitle,
      tableListData: [],
      tableListDataCache: [],
      multipleSelection: [],
      rateTag: "",
      remarkDialogVisible: false,
      forwardDialogVisible: false,
      currentRow: {},
      backLoading: false,
      submitLoading: false,
      approveLoading: false,
      rejectDialogVisible: false,
      saveLoading: false,
      mqGrage: [],
      epGrade: [],
      affixGrade: [],
      sqeGrade: [], // 绩效等级
      recallLoading: false,
      exportLoading: false,
      exportMQLoading: false,
      editIdList: [],
      editType: ''
    };
  },
  created() {
    this.getSelectOptions()
  },
  methods: {
    getSelectOptions() {
      let codeList = [
        {keys: "MQ_GRADE"},
        {keys: "EP_GRADE"},
        {keys: "AFFIX_GRADE"},
        {keys: "SQE_PERFORMANCE"}
      ]
      selectDictByKeys(codeList).then((res) => {
        this.mqGrage = res?.data.MQ_GRADE;
        this.epGrade = res?.data.EP_GRADE;
        this.affixGrade = res?.data.AFFIX_GRADE;
        this.sqeGrade = res?.data.SQE_PERFORMANCE;
      });
    },
    // SQE评分未完成时不显示SQE信息
    hideLabel(row, props, label=''){
      if(!this.isFromSQE){
        // 如果不是从SQE评分进入页面，则默认是质量评分人,只展示评分完成的数据
        if(['评分完成'].includes(row.sqeStatus)){
          return label || row[props]
        }else{
          return '-'
        }
      }
      return label || row[props]
    },
    getSelectLabel(row, props, options = []) {
      if (!options.length) return this.hideLabel(row, props)
      let item = options.find(item => item.value === row[props])
      let label = this.$i18n.locale === 'zh' ? item?.name : item?.nameEn
      return this.hideLabel(row, props, label)
    },
    getRfqBdlRatingsByCurrentDept() {
      this.loading = true;
      getRfqBdlRatingsByCurrentDept({
        rfqId: this.rfqId,
      })
          .then((res) => {
            if (res.code == 200) {
              this.tableListData = Array.isArray(res.data) ? res.data : [];
              this.tableListDataCache = cloneDeep(this.tableListData);
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch(() => {
        this.tableListData = [];
      })
          .finally(() => {
            this.loading = false;
          });
    },
    handleSelectionChange(list) {
      if (!this.editStatus) {
        this.multipleSelection = list;
      }
    },
    // 确认转派
    confirmForward(userInfo) {
      this.$refs.forwardDialog.updateConfirmLoading(true);

      forward({
        raterId: userInfo.id,
        rater: userInfo.nameZh,
        rfqIds: [this.rfqId],
      })
          .then((res) => {
            const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

            if (res.code == 200) {
              iMessage.success(message);
              this.forwardDialogVisible = false;
              this.getRfqBdlRatingsByCurrentDept();
              this.getRfqDetailByCurrentDept();
            } else {
              iMessage.error(message);
            }

            this.$refs.forwardDialog.updateConfirmLoading(false);
          })
          .catch(() => this.$refs.forwardDialog.updateConfirmLoading(false));
    },
    // 退回至采购员
    handleBack() {
      this.backLoading = true;

      backRfqBdlRatings({
        rfqId: this.rfqId,
      })
          .then((res) => {
            const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

            if (res.code == 200) {
              iMessage.success(message);
              // this.$emit("updateRfq")
              this.getRfqBdlRatingsByCurrentDept();
              this.getRfqDetailByCurrentDept();
            } else {
              iMessage.error(message);
            }

            this.backLoading = false;
          })
          .catch(() => (this.backLoading = false));
    },
    // 提交
    async handleSubmit() {
      if (this.isFromSQE) { // SQE页面进来就提交SQE
        this.submit()
      } else {
        const rfqBdlRateIds = this.tableListData
            .filter((item) => ["待评分", "待提交"].includes(item.rateStatus))
            .map((item) => item.id);

        this.submitLoading = true;

        submitRfqBdlRatings({
          rfqBdlRateIds,
          rfqId: this.rfqId,
        })
            .then((res) => {
              const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

              if (res.code == 200) {
                iMessage.success(message);
                // this.$emit("updateRfq")
                this.getRfqBdlRatingsByCurrentDept();
              } else {
                iMessage.error(message);
              }

              this.submitLoading = false;
            })
            .catch(() => (this.submitLoading = false));
      }
    },
    // 批准
    async handleApprove() {
      const rfqBdlRateIds = this.tableListData
          .filter((item) => ["待审核"].includes(item.rateStatus))
          .map((item) => item.id);
      this.approveLoading = true;

      approveRfqBdlRatings({
        rfqId: this.rfqId,
        rfqBdlRateIds,
      })
          .then((res) => {
            const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

            if (res.code == 200) {
              iMessage.success(message);
              // this.$emit("updateRfq")
              this.getRfqBdlRatingsByCurrentDept();
            } else {
              iMessage.error(message);
            }

            this.approveLoading = false;
          })
          .catch(() => (this.approveLoading = false));
    },
    // 拒绝
    async handleReject() {
      this.rejectDialogVisible = true;
    },
    // 确认拒绝
    confirmReject(reason) {
      this.$refs.rejectDialog.updateConfirmLoading(true);

      const rfqBdlRateIds = this.tableListData
          .filter((item) => ["待审核"].includes(item.rateStatus))
          .map((item) => item.id);

      rejectRfqBdlRatings({
        rfqBdlRateIds,
        rfqId: this.rfqId,
        reason,
      })
          .then((res) => {
            const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

            if (res.code == 200) {
              iMessage.success(message);
              this.rejectDialogVisible = false;
              // this.$emit("updateRfq")
              this.getRfqBdlRatingsByCurrentDept();
            } else {
              iMessage.error(message);
            }

            this.$refs.rejectDialog.updateConfirmLoading(false);
          })
          .catch(() => this.$refs.rejectDialog.updateConfirmLoading(false));
    },
    // 结束编辑
    handleCloseEdit() {
      if (!isEqual(this.tableListData, this.tableListDataCache)) {
        iMessageBox(
            this.language(
                "DISCARDCHANGE",
                "内容已经发生变化，是否确定要放弃修改？"
            ),
            this.language("TISHI", "提示"),
            {
              confirmButtonText: this.language("QUEREN", "确认"),
            }
        )
            .then(() => {
              this.editStatus = false;
              this.tableListData = cloneDeep(this.tableListDataCache);
            })
            .catch(() => {
            });
      } else {
        this.editStatus = false;
      }
    },
    // 保存
    handleSave() {
      if (this.editType === 'sqe') {
        this.updateSqeRateBatch()
      } else if (this.editType === 'sqeApproval') {
        this.updateSeqAuditBatch()
      } else  {
        if (isEqual(this.tableListData, this.tableListDataCache)) {
          return iMessageBox(
            this.language("NOCHANGEDONTSAVE", "没有发现更改，不需要保存。"),
            this.language("TISHI", "提示"),
            {
              showCancelButton: false,
              confirmButtonText: this.language("QUEREN", "确认"),
            }
          );
        }
        // 过滤一下编辑项的变更
        const filterTableData = this.tableListData.filter((item) =>
          this.editIdList.includes(item.id)
        );
        if (filterTableData.some((item) => !item.rate && item.rate !== 0)) {
          return iMessage.warn(
            this.language("PINGFENLIEWEIBITIANXIANG", "评分列为必填项")
          );
        }
        this.saveLoading = true;
        updateRfqBdlRatings(
          filterTableData.map((item) => ({
            addFee: item.addFee,
            confirmCycle: item.confirmCycle,
            externalFee: item.externalFee,
            id: item.id,
            rate: item.rate,
            rfqId: this.rfqId,
            memo: item.memo,
          }))
        )
        .then((res) => {
          const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn
          if (res.code == 200) {
            iMessage.success(message);
            this.getRfqBdlRatingsByCurrentDept();
          } else {
            iMessage.error(message);
          }
          this.saveLoading = false;
        })
        .catch(() => (this.saveLoading = false));
      }
    },
    // 查看零件评分
    viewPartScore(row) {
      const route = this.$router.resolve({
        path: "/targetpriceandscore/supplierscore/partscore",
        query: {
          rfqId: row.rfqId,
          supplierId: row.supplierId,
          rfqType: this.rfqInfo.rfqType || "",
        },
      });
      window.open(route.href, "_blank");
    },
    // 确认备注
    confirmRemark(remark) {
      this.$refs.remarkDialog.updateConfirmLoading(true);

      updateRfqBdlRatingMemo({
        id: this.currentRow.id,
        memo: remark,
      })
          .then((res) => {
            const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

            if (res.code == 200) {
              iMessage.success(message);
              this.$set(this.currentRow, "memo", remark);
              this.remarkDialogVisible = false;
              this.currentRow = {};
              // this.getRfqBdlRatingsByCurrentDept() 测试数据是否正确更新用
            } else {
              iMessage.error(message);
            }

            this.$refs.remarkDialog.updateConfirmLoading(false);
          })
          .catch(() => this.$refs.remarkDialog.updateConfirmLoading(false));
    },
    // 输入金额
    handleInputByMoney(value, key, row) {
      this.$set(row, key, numberProcessor(value, 2));
    },
    // 输入周期
    handleInputByWeek(value, key, row) {
      let week = numberProcessor(value, 0);
      if (+week > 53) week = "53";
      this.$set(row, key, week);
    },

    handlePutByZ(value, key, row) {
      let week = numberProcessor(value, 0);
      this.$set(row, key, week);
    },

    // 附件评分的文本展示
    showaffixName(rate) {
      const {affixGrade = []} = this;
      const affix = affixGrade.filter((item) => item.code == rate);
      if (Array.isArray(affix) && affix.length) {
        return this.$i18n.locale === "zh" ? affix[0].name : affix[0].nameEn;
      } else {
        return rate;
      }
    },
    // 编辑
    async handleEdit(type) {
      this.editType = type
      this.editStatus = true;
      if (type === 'sqe') {  // 编辑SQE评分
        let list = []
        if(this.isSqeCoordinator){
          list.push('待审批')
        }
        if(this.isSqeRater){
          list.push("待评分", "已保存", "审批驳回")
        }
        console.log(list)
        this.editIdList = this.tableListData
            .filter((item) => list.includes(item.sqeStatus))
            .map((item) => item.id);
        console.log(this.editIdList)
      } else if (type === 'sqeApproval') {  // 编辑SQE审核
        this.editIdList = this.tableListData
            .filter((item) => ["评分完成"].includes(item.sqeStatus))
            .map((item) => item.id);
      } else {
        this.editIdList = this.tableListData
            .filter((item) => ["待评分", "待提交"].includes(item.rateStatus))
            .map((item) => item.id);
      }
    },
    // 判断该行是否可编辑
    hasEditLine(id) {
      return this.editIdList.includes(id);
    },
    // 列表是否可勾选
    selectInit() {
      return !this.editStatus;
    },
    // 撤回评分
    handleRecall() {
      if (this.multipleSelection.length != 1)
        return iMessage.warn(
            this.language("QINGXUANZEYITIAOSHUJU", "请选择一条数据")
        );
      if (this.multipleSelection.some((item) => item.rateStatus !== "评分完成"))
        return iMessage.warn(
            this.language(
                "BUNENGBAOHANPINGFENWEIWANCHENGDESHUJU",
                "不能包含评分未完成的数据"
            )
        );

      this.$confirm(
          this.language(
              "PINGFENRENWURECALLTIPS",
              "评分任务将撤回至待评分状态，是否确认撤回"
          )
      ).then(() => {
        this.recallLoading = true;
        recallRate(this.multipleSelection.map((item) => item.id))
            .then((res) => {
              const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

              if (res.code == 200) {
                iMessage.success(message);
                this.getRfqBdlRatingsByCurrentDept();
              } else {
                iMessage.error(message);
              }
            })
            .finally(() => (this.recallLoading = false));
      });
    },
    // 导出SQE评分任务
    async exportSQE(flag='') {
      let ids = []
      if (this.multipleSelection.length) {
        ids = this.multipleSelection.map(item => item.id)
      } else {
        ids = this.tableListData.map(item => item.id)
      }
      this.exportLoading = true
      await exportSqeRating(ids, flag)
      this.exportLoading = false
    },
    // 导出质量评分任务
    async exportMQ() {
      let ids = []
      if (this.multipleSelection.length) {
        ids = this.multipleSelection.map(item => item.id)
      } else {
        ids = this.tableListData.map(item => item.id)
      }
      this.exportMQLoading = true
      await exportMqRating(ids)
      this.exportMQLoading = false
    },
    // 编辑SQE评分
    updateSqeRateBatch() {
      let filterTableData = this.tableListData.filter((item) =>
          this.editIdList.includes(item.id)
      );
      updateSqeRateBatch(filterTableData.map(item => {
        return {
          id: item.id,
          sqePerformance: item.sqePerformance,
          sqeQtr: item.sqeQtr,
          sqeRemark: item.sqeRemark
        }
      })).then(res => {
        console.log('res=>', res)
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res?.code == 200) {
          iMessage.success(message)
          this.editStatus = false;
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }
      })
    },
    // 编辑SQE审核
    updateSeqAuditBatch() {
      let filterTableData = this.tableListData.filter((item) =>
          this.editIdList.includes(item.id)
      );
      updateSeqAuditBatch(filterTableData.map(item => {
        return {
          id: item.id,
          sqeAuditRemark: item.sqeAuditRemark,
          sqePerformance: item.sqePerformance,
          sqeQtr: item.sqeQtr,
          sqeRemark: item.sqeRemark
        }
      })).then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res?.code == 200) {
          iMessage.success(message)
          this.editStatus = false;
          this.getRfqBdlRatingsByCurrentDept()
        } else {
          iMessage.error(message)
        }
      })
    },
    //   提交SQE评分
    submit() {
      let ids = []
      if (this.multipleSelection.length) {
        ids = this.multipleSelection.map(item => item.id)
      } else {
        ids = this.tableListData.filter(item=>item.sqeStatus==='已保存').map(item => item.id)
      }
      if(!ids.length) return iMessage.warn(this.language('没有SQE评分状态为已保存的数据'))
      submit(ids).then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res?.code == 200) {
          iMessage.success(message)
          this.getRfqBdlRatingsByCurrentDept()
          this.getSQERfqDetailByCurrentDept()
        } else {
          iMessage.error(message)
        }
      })
    },
    //   退回SQE评分
    back() {
      if (!this.multipleSelection.length)
        return iMessage.warn(this.language("请选择需要退回的数据"));
      back(this.multipleSelection.map(item => item.id)).then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res?.code == 200) {
          iMessage.success(message)
          this.getRfqBdlRatingsByCurrentDept()
          this.getSQERfqDetailByCurrentDept()
        } else {
          iMessage.error(message)
        }
      })
    },
    //   驳回SQE
    reject() {
      let ids = []
      if (this.multipleSelection.length) {
        ids = this.multipleSelection.map(item => item.id)
      } else {
        ids = this.tableListData.filter(item=>item.sqeStatus==='已保存').map(item => item.id)
      }
      if(!ids.length) return iMessage.warn(this.language('没有SQE评分状态为待审核的数据'))
      reject(ids).then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res?.code == 200) {
          iMessage.success(message)
          this.getRfqBdlRatingsByCurrentDept()
          this.getSQERfqDetailByCurrentDept()
        } else {
          iMessage.error(message)
        }
      })
    },
    //   批准通过SQE
    approve() {
      let ids = []
      if (this.multipleSelection.length) {
        ids = this.multipleSelection.map(item => item.id)
      } else {
        ids = this.tableListData.filter(item=>item.sqeStatus==='待审核').map(item => item.id)
      }
      if(!ids.length) return iMessage.warn(this.language('没有SQE评分状态为待审核的数据'))
      approve(ids).then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res?.code == 200) {
          iMessage.success(message)
          this.getRfqBdlRatingsByCurrentDept()
          this.getSQERfqDetailByCurrentDept()
        } else {
          iMessage.error(message)
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.score {
  .required {
    color: #e30d0d;
    font-style: normal;
    margin-left: 2px;
    font-size: 14px;
  }

  .text-overflow {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>