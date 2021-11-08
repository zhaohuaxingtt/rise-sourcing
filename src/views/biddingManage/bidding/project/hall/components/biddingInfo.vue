<template>
  <div>
    <!-- 竞价信息 -->
    <iCard
      :title="language('BIDDING_JINGJIAXINXI', '竞价信息')"
      collapse
      ref="biddingHall"
      v-loading="reLoading"
    >
      <template slot="header-control">
        <div class="bidding-hall-header">
          <!-- 头部Form -->
          <el-form
            class="form"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            :hideRequiredAsterisk="true"
            :validate-on-rule-change="false"
            v-show="toggle"
          >
            <div class="bidding-hall">
              <div class="item bidding-hall__left">
                <!-- 系统时间 -->
                <iFormItem
                  :label="language('BIDDING_XITONGSHIJIAN', '系统时间')"
                  v-if="
                    ruleForm.biddingStatus == '02' ||
                    ruleForm.biddingStatus == '04'
                  "
                >
                  <iLabel :label="language('BIDDING_XITONGSHIJIAN', '系统时间')" slot="label"></iLabel>
                  <iInput
                    :value="systemCurrentTime"
                    class="red"
                    disabled
                  ></iInput>
                </iFormItem>
                <!-- 距离开始时间 -->
                <iFormItem
                  :label="language('BIDDING_JLKSSJ', '距离开始时间')"
                  v-if="ruleForm.biddingStatus == '02'"
                >
                  <iLabel :label="language('BIDDING_JLKSSJ', '距离开始时间')" slot="label"></iLabel>
                  <iInput :value="beginDate" class="red" disabled></iInput>
                </iFormItem>
                <!-- 持续时间 -->
                <iFormItem :label="language('BIDDING_CHIXUSHIJIAN', '持续时间')" v-if="showDurationTime">
                  <iLabel :label="language('BIDDING_CHIXUSHIJIAN', '持续时间')" slot="label"></iLabel>
                  <iInput
                    :value="durationTime"
                    :class="ruleForm.biddingStatus == '04' ? 'red' : ''"
                    disabled
                  ></iInput>
                </iFormItem>
                <!-- 本轮剩余时间 -->
                <iFormItem
                  :label="language('BIDDING_BLSYSJ', '本轮剩余时间')"
                  v-if="
                    ruleForm.manualBiddingType == '02' &&
                    ruleForm.biddingStatus == '04'
                  "
                >
                  <iLabel :label="language('BIDDING_BLSYSJ', '本轮剩余时间')" slot="label"></iLabel>
                  <iInput :value="remainingTime" class="red" disabled></iInput>
                </iFormItem>
                <!-- 距离结束时间 -->
                <iFormItem
                  :label="language('BIDDING_JLJSSJ', '距离结束时间')"
                  v-if="
                    ruleForm.manualBiddingType != '02' &&
                    ruleForm.biddingStatus == '04'
                  "
                >
                  <iLabel :label="language('BIDDING_JLJSSJ', '距离结束时间')" slot="label"></iLabel>
                  <iInput :value="endDate" class="red" disabled></iInput>
                </iFormItem>
                <!-- 竞价结束时间 -->
                <iFormItem
                  :label="language('BIDDING_JJJSSJ', '竞价结束时间')"
                  v-if="
                    ruleForm.roundType == '03' ||
                    ruleForm.manualBiddingType == '01' ||
                    ruleForm.biddingStatus == '06'
                  "
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
                <!-- 起拍价 -->
                <iFormItem label="起拍价" v-if="showTotalPrices">
                  <iLabel :label="language('BIDDING_QIPAIJIA', '起拍价')" slot="label"></iLabel>
                  <div class="form--item--number">
                    <iInput v-model="totalPrices" disabled></iInput>
                  </div>
                </iFormItem>
                <!-- 竞标状态 -->
                <iFormItem :label="language('BIDDING_JINGBIAOZHUANGTAI', '竞标状态')">
                  <iLabel
                    :label="
                      ruleForm.roundType == '05' || ruleForm.roundType == '03'
                        ? language('BIDDING_JINGJIAZHUANGTAI', '竞价状态')
                        : language('BIDDING_JINGBIAOZHUANGTAI', '竞标状态')
                    "
                    slot="label"
                  ></iLabel>
                  <iSelect v-model="ruleForm.biddingStatus" disabled>
                    <el-option
                      v-for="(item, index) in biddingStatue"
                      :key="index"
                      :value="item.value"
                      :label="item.name"
                    >
                    </el-option>
                  </iSelect>
                </iFormItem>
              </div>
              <div class="bidding-hall__right">
                <div class="bidding-hall__right-rank">
                  <div class="align-center" v-if="role == 'supplier'&& ruleForm.manualBiddingType != '02'">
                    <div class="bidding-hall__right-rank-top">
                      <div
                        :class="
                          ranks.trafficLight == '01'
                            ? 'green-ball'
                            : ranks.trafficLight == '02'
                            ? 'yellow-ball'
                            : ranks.trafficLight == '03'
                            ? 'red-ball'
                            : ''
                        "
                        v-if="ruleForm.resultOpenForm == '02'"
                      />
                      <span
                        v-if="
                          ranks.currentSort && ruleForm.resultOpenForm != '02'
                        "
                        >{{language('BIDDING_DI', '第')}}</span
                      >
                      <span class="blue">{{
                        ranks.currentSort ? ranks.currentSort : "-"
                      }}</span>
                      <span
                        v-if="
                          ranks.currentSort && ruleForm.resultOpenForm != '02'
                        "
                        >{{language('BIDDING_MING', '名')}}</span
                      >
                    </div>
                    <div class="bidding-hall__right-rank-bottom">{{ language('BIDDING_DANGQIANPAIMING','当前排名') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
          <iButton
            @click="handleInvalid"
            class="invalid-button"
            v-if="showInvalid && role != 'supplier'"
            >{{language('BIDDING_ZUOFEI', '作废')}}</iButton
          >
        </div>
      </template>

      <!-- 主要Form -->
      <el-form
        class="form"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        :hideRequiredAsterisk="true"
        :validate-on-rule-change="false"
      >
        <div class="bidding-hall">
          <div class="bidding-hall__left">
            <div class="item">
              <!-- 系统时间 -->
              <iFormItem
                :label="language('BIDDING_XITONGSHIJIAN', '系统时间')"
                v-if="
                  ruleForm.biddingStatus == '02' ||
                  ruleForm.biddingStatus == '04'
                "
              >
                <iLabel :label="language('BIDDING_XITONGSHIJIAN', '系统时间')" slot="label"></iLabel>
                <iInput
                  :value="systemCurrentTime"
                  class="red"
                  disabled
                ></iInput>
              </iFormItem>
              <!-- 距离开始时间 -->
              <iFormItem
                :label="language('BIDDING_JLKSSJ', '距离开始时间')"
                v-if="ruleForm.biddingStatus == '02'"
              >
                <iLabel :label="language('BIDDING_JLKSSJ', '距离开始时间')" slot="label"></iLabel>
                <iInput :value="beginDate" class="red" disabled></iInput>
              </iFormItem>
              <!-- 本轮剩余时间 -->
              <iFormItem
                :label="language('BIDDING_BLSYSJ', '本轮剩余时间')"
                v-if="
                  ruleForm.manualBiddingType == '02' &&
                  ruleForm.biddingStatus == '04'
                "
              >
                <iLabel :label="language('BIDDING_BLSYSJ', '本轮剩余时间')" slot="label"></iLabel>
                <iInput :value="remainingTime" class="red" disabled></iInput>
              </iFormItem>
              <!-- 距离结束时间 -->
              <!-- <iFormItem :label="language('距离结束时间', '距离结束时间')"> -->
              <iFormItem
                :label="language('BIDDING_JLJSSJ', '距离结束时间')"
                v-if="
                  ruleForm.manualBiddingType != '02' &&
                  ruleForm.biddingStatus == '04'
                "
              >
                <iLabel :label="language('BIDDING_JLJSSJ', '距离结束时间')" slot="label"></iLabel>
                <iInput :value="endDate" class="red" disabled></iInput>
              </iFormItem>
              <!-- 竞价结束时间 -->
              <iFormItem
                :label="language('BIDDING_JJJSSJ', '竞价结束时间')"
                v-if="
                  ruleForm.roundType == '03' ||
                  ruleForm.manualBiddingType == '01' ||
                  ruleForm.biddingStatus == '06'
                "
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
              <!-- 持续时间 -->
              <iFormItem :label="language('BIDDING_CHIXUSHIJIAN', '持续时间')" v-if="showDurationTime">
                <iLabel :label="language('BIDDING_CHIXUSHIJIAN', '持续时间')" slot="label"></iLabel>
                <iInput
                  :value="durationTime"
                  :class="ruleForm.biddingStatus == '04' ? 'red' : ''"
                  disabled
                ></iInput>
              </iFormItem>

              <!-- 项目编号 -->
              <iFormItem :label="language('BIDDING_XIANGMUBIANHAO', '项目编号')">
                <iLabel :label="language('BIDDING_XIANGMUBIANHAO', '项目编号')" slot="label"></iLabel>
                <iInput v-model="ruleForm.projectCode" disabled></iInput>
              </iFormItem>
              <!-- RFQ名称 -->
              <iFormItem :label="language('BIDDING_RFQMINGCHENG', 'RFQ名称')">
                <iLabel :label="language('BIDDING_RFQMINGCHENG', 'RFQ名称')" slot="label"></iLabel>
                <iInput v-model="ruleForm.rfqName" disabled></iInput>
              </iFormItem>
              <!-- RFQ编号 -->
              <iFormItem :label="language('BIDDING_RFQBIANHAO', 'RFQ编号')">
                <iLabel :label="language('BIDDING_RFQBIANHAO', 'RFQ编号')" slot="label"></iLabel>
                <iInput v-model="ruleForm.rfqCode" disabled></iInput>
              </iFormItem>
              <!-- 采购员 -->
              <iFormItem :label="language('BIDDING_CAIGOUYUAN', '采购员')">
                <iLabel :label="language('BIDDING_CAIGOUYUAN', '采购员')" slot="label"></iLabel>
                <iInput v-model="ruleForm.linieName" disabled></iInput>
              </iFormItem>
              <!-- 采购员电话 -->
              <iFormItem :label="language('BIDDING_CAIGOUYUANDIANHUA', '采购员电话')">
                <iLabel :label="language('BIDDING_CAIGOUYUANDIANHUA', '采购员电话')" slot="label"></iLabel>
                <iInput v-model="liniePhone" disabled></iInput>
              </iFormItem>
              <!-- 竞拍类型 -->
              <iFormItem :label="language('BIDDING_JINGPAILEIXING', '竞拍类型')">
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
              <!-- 起拍价 -->
              <iFormItem label="起拍价" v-if="showTotalPrices">
                <iLabel :label="language('BIDDING_QIPAIJIA', '起拍价')" slot="label"></iLabel>
                <div class="form--item--number">
                  <!-- <iInput
                  class="form--item--number--input"
                  v-model="startingPrice"
                  disabled
                ></iInput> -->
                  <iInput v-model="totalPrices" disabled></iInput>
                  <!-- <div class="form--item--number--lable">{{ unit }}</div> -->
                </div>
              </iFormItem>
              <!-- 最低价格 -->
              <!--  v-if="showPrice" -->
              <iFormItem
                label="最低价格"
                v-if="role == 'supplier' ? false : showPrice"
              >
                <!-- <iFormItem label="最低价格"> -->
                <iLabel :label="language('BIDDING_ZUIDIJIAGE', '最低价格')" slot="label"></iLabel>
                <div class="form--item--number">
                  <iInput v-model="minPrice" disabled></iInput>
                </div>
              </iFormItem>
              <!-- 最高价格 -->
              <iFormItem
                label="最高价格"
                v-if="role == 'supplier' ? false : showPrice"
              >
                <iLabel :label="language('BIDDING_ZUIGAOJIAGE', '最高价格')" slot="label"></iLabel>
                <div class="form--item--number">
                  <iInput v-model="maxPrice" disabled></iInput>
                </div>
              </iFormItem>
              <!-- 幅度 -->
              <iFormItem
                label="幅度"
                v-if="role == 'supplier' ? false : showAmplitude"
              >
                <iLabel :label="language('BIDDING_FUDU', '幅度')" slot="label"></iLabel>
                <div class="form--item--number">
                  <iInput v-model="amplitude" disabled></iInput>
                </div>
              </iFormItem>
              <!-- 竞标状态 -->
              <iFormItem :label="language('BIDDING_JINGBIAOZHUANGTAI', '竞标状态')">
                <iLabel
                  :label="
                    ruleForm.roundType == '05' || ruleForm.roundType == '03'
                      ? language('BIDDING_JINGJIAZHUANGTAI', '竞价状态')
                      : language('BIDDING_JINGBIAOZHUANGTAI', '竞标状态')
                  "
                  slot="label"
                ></iLabel>
                <iSelect v-model="ruleForm.biddingStatus" disabled>
                  <el-option
                    v-for="(item, index) in biddingStatue"
                    :key="index"
                    :value="item.value"
                    :label="item.name"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
            <!-- 作废原因 -->
            <div class="form" v-if="ruleForm.biddingStatus === '08'">
              <iFormItem :label="language('BIDDING_ZUOFEIYUANYING', '作废原因')" class="invalid-reason">
                <iLabel :label="language('BIDDING_ZUOFEIYUANYING', '作废原因')" slot="label"></iLabel>
                <!-- <iInput
                  v-model="ruleForm.invalidReason"
                  type="textarea"
                  placeholder="请填写作废原因"
                  resize="none"
                  :rows="3"
                  show-word-limit
                  disabled
                /> -->
                <div class="invalidReason">{{ ruleForm.invalidReason }}</div>
              </iFormItem>
            </div>
          </div>

          <div class="bidding-hall__right">
            <div class="bidding-hall__right-rank">
              <div class="align-center" v-if="role == 'supplier'">
                <div class="bidding-hall__right-rank-top">
                  <div
                    :class="
                      ranks.trafficLight == '01'
                        ? 'green-ball'
                        : ranks.trafficLight == '02'
                        ? 'yellow-ball'
                        : ranks.trafficLight == '03'
                        ? 'red-ball'
                        : ''
                    "
                    v-if="ruleForm.resultOpenForm == '02'"
                  />
                  <span
                    v-if="ranks.currentSort && ruleForm.resultOpenForm != '02'"
                    >{{language('BIDDING_DI', '第')}}</span
                  >
                  <span class="blue">{{
                    ranks.currentSort ? ranks.currentSort : "-"
                  }}</span>
                  <span
                    v-if="ranks.currentSort && ruleForm.resultOpenForm != '02'"
                    >{{language('BIDDING_MING', '名')}}</span
                  >
                </div>
                <div class="bidding-hall__right-rank-bottom">{{ language('BIDDING_DANGQIANPAIMING','当前排名') }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </iCard>

    <invalid-dialog
      @reset="reset"
      :projectCode="ruleForm.projectCode"
      :id="id"
      :show.sync="invalidShow"
    />

    <!-- <div class="full-screen-loading" v-loading="reLoading"></div> -->
  </div>
</template>
<script>
import { iInput, iSelect, iFormItem, iCard, iLabel, iButton } from "rise";
import {
  infoForm,
  moldFee,
  biddingMode,
  isTax,
  projectType,
  biddingResultForm,
  resultOpenForm,
  currencyMultiple,
  isResultOpen,
  attachments,
  currencyMultipleLib,
  biddingType,
  biddingStatue,
} from "./data";
import { getCurrencyUnit } from "@/api/mock/mock";
import {
  getSupplierRank,
  findHallQuotation,
  findHallSupplier,
  getBiddingDetails,
  getCurrentDutchOffer,
} from "@/api/bidding/bidding";
import { pageMixins } from "@/utils/pageMixins";
import invalidDialog from "./invalidDialog.vue";
import Big from "big.js";
import dayjs from "dayjs";

export default {
  mixins: [pageMixins],
  components: {
    iInput,
    iSelect,
    iFormItem,
    iCard,
    iLabel,
    iButton,
    invalidDialog,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    supplierCode: {
      type: String,
    },
  },
  data() {
    return {
      id: 0,
      ruleForm: { ...infoForm, attachments: [] },
      heRuleForm: {},
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
      currencyUnit: {},
      biddingStatue,

      rank: "-",
      toggle: false,

      timer: null,
      curTime: 0,
      lastTime: 0,
      serverTime: "2021-08-06 14:00:00",
      eightHour: 8 * 60 * 60 * 1000,
      nowTime: 946656000000,

      // 作废显示
      invalidShow: false,

      reLoadTimer: null,
      reLoading: false,

      biddingInterval: 0,

      ranks: {},

      amplitudeList: {
        maxPrice: 0,
        minPrice: 0,
        finPrice: 0,
      },
      quoteRule: {},
      rankTimer: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.findHallQuotation({
      biddingId: this.id,
      supplierCode: this.supplierCode,
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearTimeout(this.reLoadTimer);
    clearInterval(this.rankTimer);
  },
  mounted() {
    // this.queryUnit();
    this.handleTime();
    this.handleSearchReset();
    let biddingHall = this.$refs.biddingHall;
    // this.handleToggle();
    biddingHall.handleCollapse = this.handleToggle;
    biddingHall.handleCollapse();

    // if (this.role == "supplier") {
    //   const fn = () => {
    //     let param = { biddingId: this.id, supplierCode: this.supplierCode };
    //     this.getSupplierRank(param);
    //   };
    //   if (
    //     this.ruleForm.biddingStatus == "04" ||
    //     this.ruleForm.biddingStatus == "05"
    //   ) {
    //     this.rankTimer = setInterval(fn, 1000);
    //   }
    //   fn();
    // }
    this.handleIntervalRank();
  },
  computed: {
    role() {
      return this.$route.meta.role;
    },
    roundType() {
      if (this.ruleForm.roundType === "05") {
        if (this.ruleForm.manualBiddingType === "02") {
          return false;
        }
      }
      return true;
    },
    bidOpening() {
      if (this.ruleForm.openTenderNature == "01") {
        return this.bidOpeningLeft;
      } else if (this.ruleForm.openTenderNature == "02") {
        return this.bidOpeningRight;
      } else {
        return "";
      }
    },
    unit() {
      return this.currencyMultiple[this.ruleForm.currencyUnit];
    },
    orgTotalPrices() {
      let biddingProducts = this.ruleForm.biddingProducts;
      return biddingProducts.reduce(
        (sum, item) =>
          isNaN(Number(item.purchaseQty)) || isNaN(Number(item.upsetPrice))
            ? sum
            : Big(item.purchaseQty || 0)
                .times(item.upsetPrice || 0)
                .add(sum)
                .toNumber(),
        0
      );
    },
    beishu() {
      return currencyMultipleLib[this.ruleForm.currencyMultiple]?.beishu || 1;
    },
    totalPrices() {
      let totalPrices = this.ruleForm.totalPrices || 0;
      let unit = this.currencyMultiples(this.ruleForm?.currencyMultiple) || "";
      return totalPrices + "" + unit;
    },
    startingPrice() {
      return this.totalPrices + this.currencyMultiple;
    },
    cTime() {
      return this.curTime - this.lastTime;
    },
    // 系统时间
    systemCurrentTime() {
      let { systemCurrentTime } = this.ruleForm;
      let time = dayjs(systemCurrentTime).valueOf() + this.cTime;
      return time > 0 ? dayjs(time).format("YYYY-MM-DD HH:mm:ss") : "00:00:00";
    },
    // 距离开始时间
    beginDate() {
      return dayjs(this.nowTime + this.beginDateVal).format("HH:mm:ss");
    },
    beginDateVal() {
      let { systemCurrentTime, biddingBeginTime } = this.ruleForm;
      let beginTime = dayjs(biddingBeginTime).valueOf();
      let systemTime = dayjs(systemCurrentTime).valueOf();
      let time = beginTime - systemTime - this.cTime;
      if (isNaN(time) || time < 0) {
        return 0;
      } else {
        return time;
      }
    },
    // 距离结束时间
    endDate() {
      return dayjs(this.nowTime + this.endDateVal).format("HH:mm:ss");
    },
    endDateVal() {
      const { biddingEndTime, systemCurrentTime } = this.ruleForm;
      const endTime = dayjs(biddingEndTime).valueOf();
      const systemTime = dayjs(systemCurrentTime).valueOf();
      const time = endTime - systemTime - this.cTime;
      if (isNaN(time) || time < 0) {
        return 0;
      } else {
        return time;
      }
    },
    // 本轮剩余时间
    remainingTime() {
      return dayjs(this.nowTime + this.remainingTimeVal).format("HH:mm:ss");
    },
    // 剩余时间
    remainingTimeVal() {
      const { systemTime, createDate, biddingInterval } = this.heRuleForm;
      const craTime = dayjs(createDate).valueOf();
      const sysTime = dayjs(systemTime).valueOf();
      let rtime = sysTime - craTime;
      let time = biddingInterval * 1000 - rtime - this.cTime;
      if (isNaN(time) || time < 0) {
        return 0;
      } else {
        return time;
      }
    },

    // 持续时间
    durationTime() {
      return dayjs(this.nowTime + this.durationTimeVal).format("HH:mm:ss");
    },
    // 持续时间val
    durationTimeVal() {
      let {
        systemCurrentTime,
        biddingBeginTime,
        biddingEndTime,
        biddingStatus,
      } = this.ruleForm;

      let time = 1;
      let systemTime = dayjs(systemCurrentTime).valueOf();
      let beginTime = dayjs(biddingBeginTime).valueOf();
      let endTime = dayjs(biddingEndTime).valueOf();
      if (biddingStatus == "04") {
        time = systemTime - beginTime + this.cTime;
      } else if (
        biddingStatus == "06" ||
        biddingStatus == "07" ||
        biddingStatus == "08"
      ) {
        time = endTime - beginTime;
      }
      return time;
    },

    minPrice() {
      let unit = this.currencyMultiples(this.ruleForm?.currencyMultiple) || "";
      return this.amplitudeList.minPrice
        ? this.dividedBeiShu(this.amplitudeList.minPrice) + unit
        : "";
    },
    maxPrice() {
      let unit = this.currencyMultiples(this.ruleForm?.currencyMultiple) || "";
      return this.amplitudeList.maxPrice
        ? this.dividedBeiShu(this.amplitudeList.maxPrice) + unit
        : "";
    },
    // 幅度
    amplitude() {
      let { manualBiddingType, totalPrices, biddingType, roundType } =
        this.ruleForm;
      let { maxPrice, minPrice, finPrice } = this.amplitudeList;
      let amp;
      if (manualBiddingType == "02" && biddingType == "01") {
        amp = (
          ((this.dividedBeiShu(finPrice) - totalPrices) / totalPrices).toFixed(4) * 100
        ).toFixed(2);
      } else if (
        (manualBiddingType == "01" || roundType == "03") &&
        biddingType == "02"
      ) {
        amp = (
          (( this.dividedBeiShu(maxPrice) - totalPrices) / totalPrices).toFixed(4) * 100
        ).toFixed(2);
      } else {
        amp = (
          ((totalPrices - this.dividedBeiShu(minPrice)) / totalPrices).toFixed(4) * 100
        ).toFixed(2);
      }
      return isNaN(amp) ? "" : amp + "%";
    },
    // 显示rfq
    showRfq() {
      let { roundType, rfqRound } = this.ruleForm;
      if (roundType == "04") {
        return true;
      } else if (roundType == "05" && rfqRound) {
        return true;
      } else {
        return false;
      }
    },
    // 显示起拍价
    showTotalPrices() {
      let { roundType, manualBiddingType } = this.ruleForm;
      if (
        roundType == "03" ||
        manualBiddingType == "01" ||
        manualBiddingType == "02"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 显示最低价格 最高价格 幅度
    showPrice() {
      let { biddingStatus, manualBiddingType } = this.ruleForm;
      if (
        biddingStatus == "06" ||
        biddingStatus == "07" ||
        biddingStatus == "08"
      ) {
        if (manualBiddingType == "02") {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    showAmplitude() {
      let { biddingStatus } = this.ruleForm;
      if (
        biddingStatus == "06" ||
        biddingStatus == "07" ||
        biddingStatus == "08"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 显示持续时间
    showDurationTime() {
      let { biddingStatus, manualBiddingType } = this.ruleForm;
      return (biddingStatus == "04" ||
        biddingStatus == "06" ||
        biddingStatus == "07" ||
        biddingStatus == "08") &&
        manualBiddingType != "01"
        ? true
        : false;
    },
    // 显示距离结束时间
    showEndDate() {
      let { biddingStatus, roundType, manualBiddingType } = this.ruleForm;
      if (manualBiddingType == "02" && biddingStatus == "04") {
        return true;
      } else if (roundType == "03" && biddingStatus == "04") {
        return true;
      } else {
        return false;
      }
    },
    // 采购员电话
    liniePhone() {
      let { liniePhone } = this.ruleForm;
      return liniePhone?.replace(/^(.{3})(.*)(.{4})$/, "$1-$2-$3");
    },
    // 显示排名
    showRank() {
      let { rankDisplayLimit, priceLimit, rankLimit } = this.quoteRule;
      let { offerPrice, currentSort } = this.ranks;
      if (rankDisplayLimit == "01") {
        if (priceLimit <= offerPrice) {
          return true;
        } else {
          return false;
        }
      } else if (rankDisplayLimit == "02") {
        if (rankLimit <= currentSort) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    showInvalid() {
      let { biddingStatus, roundType, manualBiddingType } = this.ruleForm;
      if (biddingStatus == "06") {
        if (roundType == "05") {
          if (manualBiddingType == "01" || manualBiddingType == "02") {
            return true;
          } else {
            return false;
          }
        } else if (roundType == "03") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  watch: {
    // value: {
    //   immediate: true,
    //   handler(val) {
    //     this.ruleForm = val;
    //   },
    // },
    // ruleForm(val) {
    //   this.$emit("input", val);
    // },
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
    "ruleForm.biddingStatus"() {
      this.handleIntervalRank();
    },
    remainingTimeVal(val, oldVal) {
      if (val <= 0 && oldVal > 0) {
        this.handleReload();
      }
    },
    beginDateVal(val, oldVal) {
      if (val <= 0 && oldVal > 0) {
        this.handleReload();
      }
    },
    endDateVal(val, oldVal) {
      if (val <= 0 && oldVal > 0) {
        this.handleReload();
      }
    },
  },
  methods: {
    handleIntervalRank() {
      clearInterval(this.rankTimer);
      if (this.role == "supplier") {
        const fn = () => {
          let param = { biddingId: this.id, supplierCode: this.supplierCode };
          this.getSupplierRank(param);
        };
        if (
          this.ruleForm.biddingStatus == "04" ||
          this.ruleForm.biddingStatus == "05"
        ) {
          this.rankTimer = setInterval(fn, 1000);
        }
        fn();
      }
    },
    timesBeiShu(val){
     return Big(val).times(this.beishu).toNumber()
    },
    dividedBeiShu(val){
     return Big(val).div(this.beishu).toNumber()
    },
    reset() {
      this.id = this.$route.params.id;
      this.handleSearchReset();
    },
    currencyMultiples(currencyMultiple) {
      return {
        "01": "元",
        "02": "千",
        "03": "万",
        "04": "百万",
      }[currencyMultiple];
    },
    // 荷式时间
    async getCurrentDutchOffer(e) {
      const res = await getCurrentDutchOffer(e).catch((e) => {
        console.log(e);
      });
      if (this.remainTimeVal(res) <= 0) {
        await this.handleReload();
        return;
      }
      this.heRuleForm = { ...res };
    },
    // 倒计时结束刷新
    handleReload() {
      clearTimeout(this.reLoadTimer);
      this.reLoadTimer = setTimeout(async () => {
        await this.handleSearchReset();
      }, 2000);
    },
    // 重置
    async handleSearchReset() {
      let param = { biddingId: this.id, supplierCode: this.supplierCode };
      this.$emit("reload");
      await this.query(param);
      await this.getSupplierRank(param);
      await this.getBiddingDetails(param);
    },
    beginTimeVal(res) {
      let { systemCurrentTime, biddingBeginTime } = res;
      let beginTime = dayjs(biddingBeginTime).valueOf();
      let systemTime = dayjs(systemCurrentTime).valueOf();
      let time = beginTime - systemTime;
      return time;
    },
    endTimeVal(res) {
      const { biddingEndTime, systemCurrentTime } = res;
      const endTime = dayjs(biddingEndTime).valueOf();
      const systemTime = dayjs(systemCurrentTime).valueOf();
      const time = endTime - systemTime;
      return time;
    },
    remainTimeVal(res) {
      const { systemTime, createDate } = res;
      const craTime = dayjs(createDate).valueOf();
      const sysTime = dayjs(systemTime).valueOf();
      let rtime = sysTime - craTime;
      let time = this.biddingInterval * 1000 - rtime;
      return time;
    },
    handleTime() {
      clearInterval(this.timer);
      this.timer = null;
      this.lastTime = Date.now();
      this.curTime = Date.now();
      this.timer = setInterval(() => {
        this.curTime = Date.now();
      }, 300);
    },
    async query(e) {
      const res = await findHallQuotation(e).catch(err => {
        console.log(err)
      });
      let biddingStatus = res?.biddingStatus;
      if (biddingStatus == "02") {
        if (this.beginTimeVal(res) <= 0) {
          await this.handleReload();
          return;
        }
      }
      if (biddingStatus == "04" && res.manualBiddingType == "02") {
        await this.getCurrentDutchOffer({
          id: Number(e.biddingId),
          supplierCode: this.supplierCode,
        }).catch(err => {
          console.log(err)
        });
      }
      if (biddingStatus == "04" && res.manualBiddingType != "02") {
        if (this.endTimeVal(res) <= 0) {
          await this.handleReload();
          return;
        }
      }
      if (this.endDateVal <= 0 && biddingStatus == "05") {
        window.location.reload();
      }
      if (this.ruleForm.biddingStatus == "04" && biddingStatus == "06") {
        this.$message.success(this.language('BIDDING_JINGJIAYIJIESHU', "竞价已结束!"));
      }
      this.reLoading = true;
      this.ruleForm = {
        ...res,
      };
      this.handleTime();
      this.getBiddingDetails(e);
      const result = await findHallSupplier({
        id: e.biddingId,
      }).catch();
      this.biddingInterval = result.quoteRule?.biddingInterval;
      this.quoteRule = {
        ...result.quoteRule,
      };
      if(this.ruleForm.totalPrices){
        this.ruleForm.totalPrices= this.dividedBeiShu(this.ruleForm?.totalPrices);
      }
      this.reLoading = false;
    },
    async findHallQuotation(e) {
      const res = await findHallQuotation(e).catch(err => {
        console.log(err)
      });
      this.ruleForm = { ...res };
    },
    async getBiddingDetails(e) {
      const biddingDetail = await getBiddingDetails({
        id: e.biddingId,
      }).catch((err) => {
        console.log(err)
      });

      if (biddingDetail || biddingDetail?.length > 0) {
        this.handlePrice(biddingDetail);
      }
    },
    async getSupplierRank(e) {
      if (this.ruleForm.manualBiddingType != "02") {
        const r = await getSupplierRank(e).catch(err => {
          console.log(err)
        });
        this.ranks = {
          ...r,
        };
      }
    },
    handlePrice(list) {
      let max = list[0]?.offerPrice;
      let min = list[0]?.offerPrice;
      let time = dayjs(list[0]?.clientTime).valueOf();
      let index = 0;

      for (let i = 0; i < list.length; i++) {
        if (list[i]?.offerPrice > max) {
          max = list[i].offerPrice;
        }
        if (list[i]?.offerPrice < min) {
          min = list[i].offerPrice;
        }
        if (time < dayjs(list[i]?.clientTime).valueOf()) {
          index = i;
        }
      }
      this.amplitudeList.maxPrice = max;
      this.amplitudeList.minPrice = min;
      this.amplitudeList.finPrice = list[index]?.offerPrice;
    },
    handleToggle() {
      let biddingHall = this.$refs.biddingHall;
      let biddingHeader = document.getElementsByClassName("cardHeader");
      if (biddingHall.collapseValue) {
        biddingHall.collapseValue = false;
        biddingHeader[0].style = "padding-bottom: 10rem";
        this.toggle = true;
      } else {
        biddingHall.collapseValue = true;
        biddingHeader[0].style = "padding-bottom: 1.875rem";
        this.toggle = false;
      }
    },
    // 作废
    handleInvalid() {
      // this.$message.error("作废");
      this.invalidShow = true;
    },
    getRank() {
      this.handleSearchReset();
    },
  },
};
</script>
<style lang="scss" scoped>
.item ::v-deep {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    display: flex;
    width: 33.3%;
    max-height: 2.5rem;

    .el-form-item__label {
      width: 8.4rem;
      min-width: 5rem;
      line-height: normal;
      display: flex;
      align-items: center;
    }

    .invalid-reason .is-no-asterisk {
      display: flex;
      flex-direction: row;
      clear: both;
    }
    .el-textarea {
      transform: translateX(-0.925rem);
      width: 79.7rem;
    }
    .el-form-item__content {
      width: 20rem;
      .el-input {
        margin-left: -1rem;
      }
    }
    /* 禁用样式 */
    .el-input.is-disabled .el-input__inner {
      background-color: #f4f5f6;
      color: #000;
      text-align: center;
    }
    .red.el-input.is-disabled .el-input__inner {
      background-color: #f4f5f6;
      color: red;
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

.form-item-file {
  flex: 1;
  margin-left: -10rem;
}
.bidding-hall {
  display: flex;
  flex-direction: row;
  width: 100%;

  &__left {
    width: 100%;
  }

  &__right {
    width: 16rem;
    &-rank {
      height: 90%;
      min-height: 6rem;
      background-color: #f4f5f6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 5px;
      box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);

      &-top {
        padding: 1rem 0;
        font-size: 1.3rem;
        font-weight: bold;
        padding-bottom: 1rem;
        position: relative;

        .red-ball {
          position: absolute;
          background-color: red;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .green-ball {
          position: absolute;
          background-color: green;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .yellow-ball {
          position: absolute;
          background-color: yellow;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &-bottom {
        color: gray;
      }
    }
  }
}
.blue {
  color: #1763f7;
  padding: 0 0.6rem;
}

::v-deep .card {
  .cardHeader {
    /* padding: 1.875rem 2.5rem 10rem 1.875rem; */
    position: relative;

    .bidding-hall-header {
      position: absolute;
      left: 2.5rem;
      top: 5.25rem;
      right: 2.5rem;
    }

    .bidding-hall__right-rank {
      height: 82%;
    }

    .bidding-hall__right-rank-bottom {
      color: gray;
      font-size: 0.75rem;
    }
  }
}

.invalid-button {
  position: absolute;
  top: -3.6rem;
  right: 2.6rem;
}

.full-screen-loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  pointer-events: none;
}
*,
body,
html {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.align-center {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.invalidReason {
  background: #f5f7fa;
  padding: 10px 15px 10px 15px;
  margin-right: 70px;
  transform: translateX(30px);
  height: 59.5px;
  min-height: 59.5px;
  color: #aaaaaa;
  border-radius: 6px;
  font-size: 15px;
  line-height: 15px;
  overflow: auto;
  cursor: not-allowed;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  letter-spacing: -1px;
}
</style>
