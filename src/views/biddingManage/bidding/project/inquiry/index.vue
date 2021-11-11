<template>
  <div>
    <iCard
      :title="language('BIDDING_BAOJIA', '报价')"
      :class="{
        'can-pointer': ruleForm.biddingStatus !== '01' || !headerCollapseVal,
      }"
      collapse
      ref="headerCollapse"
    >
      <template slot="header-control">
        <i class="el-icon-success icon-success" v-show="headerCollapseVal"></i>
        <div v-show="headerCollapseVal">
          <iButton @click="handleCheck('header')">{{ language('BIDDING_CHAKAN', '查看') }}</iButton>
        </div>

        <div v-show="!headerCollapseVal" style="display: flex">
          <!-- 竞价 -->
          <iButton
            v-if="
              (ruleForm.roundType === '03' || ruleForm.roundType === '05') &&
              (ruleForm.biddingStatus === '02' ||
                ruleForm.biddingStatus === '03') &&
              isBiddingDelay
            "
            @click="onBiddingDelay"
            >{{ language('BIDDING_JINGJIAYANQI', '竞价延期') }}</iButton
          >
          <!-- 竞价大厅 -->
          <iButton
            v-if="
              disHall
            "
            @click="handleHrefHall"
            >{{ language('BIDDING_JIANGJIADATING', '竞价大厅') }}</iButton
          >
          <!-- 开标 -->
          <iButton
            v-if="
              ruleForm.roundType === '02' &&
              ruleForm.biddingStatus === '03' &&
              isOpenDelay
            "
            @click="onOpenDelay"
            >{{ language('BIDDING_KAIBIAOYANQI', '开标延期') }}</iButton
          >
          <template
            v-if="
              ruleForm.roundType === '01' || ruleForm.roundType === '06'
                ? false
                : true
            "
          >
            <iButton v-show="isDelay" @click="handleSetting()">{{
              ruleForm.roundType == "02" ? language('BIDDING_KAIBIAOSHEZHI', '开标设置') : language('BIDDING_JINJIASHEZHI', '竞价设置')
            }}</iButton>
          </template>

          <!-- 开标 -->
          <div style="margin-left: 0.5rem" v-if="ruleForm.roundType === '02'">
            <iButton
              v-if="ruleForm.biddingStatus === '01' && isOpenDelay"
              @click="handleSave('header')"
              >{{ language('BIDDING_BAOCUN', '保存') }}</iButton
            >
            <iButton
              v-if="ruleForm.biddingStatus === '01' && isOpenDelay"
              @click="handleFinish('header', 'save')"
              >{{ language('BIDDING_WANCHENG', '完成') }}</iButton
            >
          </div>
          <!-- 竞价 -->
          <div style="margin-left: 0.5rem" v-else>
            <iButton
              v-if="
                (ruleForm.biddingStatus === '01' ||
                  ruleForm.roundType === '05') &&
                ruleForm.biddingStatus === '01' &&
                isBiddingDelay
              "
              @click="handleSave('header')"
              >{{ language('BIDDING_BAOCUN', '保存') }}</iButton
            >
            <iButton
              v-if="
                (ruleForm.biddingStatus === '01' ||
                  ruleForm.roundType === '05') &&
                ruleForm.biddingStatus === '01' &&
                isBiddingDelay
              "
              @click="handleFinish('header', 'save')"
              >{{ language('BIDDING_WANCHENG', '完成') }}</iButton
            >
          </div>
          <!-- 竞价 -->

          <iButton
            v-if="ruleForm.roundType !== '02' && !isBiddingDelay"
            @click="onBiddingSend"
            >{{ language('BIDDING_FASONG', '发送') }}</iButton
          >
          <iButton
            v-if="ruleForm.roundType !== '02' && !isBiddingDelay"
            @click="onBiddingCancel"
            >{{ language('BIDDING_QUXIAO', '取消') }}</iButton
          >

          <!-- 开标 -->

          <iButton
            v-if="ruleForm.roundType === '02' && !isOpenDelay"
            @click="onOpenSend"
            >{{ language('BIDDING_FASONG', '发送') }}</iButton
          >
          <iButton
            v-if="ruleForm.roundType === '02' && !isOpenDelay"
            @click="onOpenCancel"
            >{{ language('BIDDING_QUXIAO', '取消') }}</iButton
          >
        </div>
      </template>
      <component
        ref="formComponent"
        v-if="formComponent"
        :is="formComponent"
        :biddingId="id"
        v-model="ruleForm"
        :isOpenDelay="isOpenDelay"
        :isBiddingDelay="isBiddingDelay"
      ></component>
    </iCard>

    <iCard
      :title="language('BIDDING_GONGYINGSHANG', '供应商')"
      :class="{
        'can-pointer': ruleForm.biddingStatus !== '01' || !contentCollapseVal,
      }"
      collapse
      ref="contentCollapse"
    >
      <template
        slot="header-control"
        v-if="ruleForm.biddingStatus !== '01' ? false : true"
      >
        <i class="el-icon-success icon-success" v-show="contentCollapseVal"></i>
        <div v-show="contentCollapseVal">
          <iButton @click="handleCheck('content')">{{ language('BIDDING_CHAKAN', '查看') }}</iButton>
        </div>
        <div v-show="!contentCollapseVal">
          <iButton
            v-if="ruleForm.roundType === '05'"
            @click="showSupplierDialog = true"
            >{{ language('BIDDING_YYGYS', '邀请供应商') }}</iButton
          >
          <iButton @click="handleSave('content')">{{ language('BIDDING_BAOCUN', '保存') }}</iButton>
          <iButton @click="handleFinish('content', 'save')">{{
            language('BIDDING_WANCHENG', '完成')
          }}</iButton>
        </div>
      </template>
      <commonTable
        ref="tableDataForm"
        :tableData="suppliersPage"
        :tableTitle="ruleForm.roundType == '05' ? manualTableTitle : tableTitle"
        :tableLoading="tableLoading"
        :inputProps="inputProps"
        :selection="false"
        @handleSelectionChange="handleSelectionChange"
      >
        <!-- 是否参与本轮RFQ -->
        <template slot="isAttend" slot-scope="scope">
          <!-- <div v-if="ruleForm.biddingStatus !== '01'">
            {{ scope.row["isAttend"] ? "是" : "否" }}
          </div> -->
          <!-- <iSelect v-else v-model="scope.row['isAttend']" required>
            <el-option
              v-for="item in isAttendList"
              :key="item.isAttend"
              :label="item.name"
              :value="item.isAttend"
            >
            </el-option>
          </iSelect> -->
          <el-switch
              v-model="scope.row['isAttend']"
              active-text="Y"
              inactive-text="N"
              :active-value='true'
              :inactive-value='false'
              @change="handleChange($event, scope.row)"
              :disabled="ruleForm.biddingStatus !== '01'"
            >
            </el-switch>
        </template>
        <!-- 供应商名称 -->
        <template slot="supplierName" slot-scope="scope">
          <a
            style="color: blue;cursor: pointer;"
            @click="handleHref(scope.row)"
            >{{ scope.row.supplierName }}
          </a>
        </template>
        <!-- 联系人 -->
        <template slot="contactName" slot-scope="scope">
          <div v-if="ruleForm.biddingStatus !== '01'">
            {{ scope.row["contactName"] }}
          </div>
          <iFormItem v-else :label="language('BIDDING_LIANGXIREN', '联系人')" >
            <iSelect
              :value="scope.row['contactName']"
              value-key="nameZh"
              @change="handleUserChange(scope.row, $event)"
            >
              <el-option
                v-for="item in userListCache[scope.row.supplierId]"
                :key="item.nameZh"
                :label="item.nameZh"
                :value="item"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </template>
        <!-- 电话 -->
        <template slot="telephone" slot-scope="scope">
          <div>{{ scope.row["telephone"] }}</div>
        </template>
        <!-- 邮箱 -->
        <template slot="email" slot-scope="scope">
          <div v-if="ruleForm.biddingStatus !== '01'">
            {{ scope.row["email"] }}
          </div>
          <iInput v-else v-model="scope.row['email']" required></iInput>
        </template>
        <!-- CBD选择 -->
        <template slot="cbdLevel" slot-scope="scope">
          <div v-if="ruleForm.biddingStatus !== '01'">
            {{ cbdLevelLib[scope.row["cbdLevel"]] || scope.row["cbdLevel"]}}
          </div>
          <div v-else>

            <iSelect
              v-if="ruleForm.roundType == '02' || ruleForm.roundType == '03'"
              v-model="scope.row['cbdLevel']"
            >
              <el-option
                v-for="item in scope.row.cbdLevelList"
                :key="item"
                :label="item"
                :value="item === 'L1' ? '01' : item === 'L2' ? '02' : item === 'L3' ? '03' : ''"
              >
              </el-option>
            </iSelect>
          </div>
        </template>
      </commonTable>
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        prev-text="上一页"
        next-text="下一页"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
        @size-change="handleSizeChange"
      />
    </iCard>

    <supplierListDialog
      :show.sync="showSupplierDialog"
      @save-checked="handleSupplierChecked"
      :suppliers="ruleForm.suppliers"
    />

    <!-- 汇率 -->
    <iCard
      :title="language('BIDDING_HUILV', '汇率')"
      :class="{
        'can-pointer': ruleForm.biddingStatus !== '01' || !reatCollapseVal,
      }"
      collapse
      ref="reatCollapse"
    >
      <template
        slot="header-control"
        v-if="ruleForm.biddingStatus !== '01' ? false : true"
      >
        <i class="el-icon-success icon-success" v-show="reatCollapseVal"></i>
        <div v-show="reatCollapseVal">
          <iButton @click="handleCheck('reat')">{{ language('BIDDING_CHAKAN', '查看') }}</iButton>
        </div>
        <div v-show="!reatCollapseVal">
          <iButton @click="handleAdd">{{ language('BIDDING_XINZHENG', '新增') }}</iButton>
          <iButton @click="handleDelete">{{ language('BIDDING_SHANCHU', '删除')}}</iButton>
          <iButton @click="handleSave('reat')">{{ language('BIDDING_BAOCUN', '保存') }}</iButton>
          <iButton @click="handleFinish('reat', 'save')">{{
            language('BIDDING_WANCHENG', '完成')
          }}</iButton>
        </div>
      </template>
      <template>
        <parities
          ref="reatForm"
          :paritiesList="paritiesList"
          v-model="ruleForm"
          @selectDel="selectDel"
          @handle-currencys="handleCurrencys"
        />
      </template>
    </iCard>

    <!-- 附件 -->
    <iCard
      :title="language('BIDDING_XUNJIAFUJIAN', '询价附件')"
      :class="{
        'can-pointer': ruleForm.biddingStatus !== '01' || !attachCollapseVal,
      }"
      collapse
      ref="attachCollapse"
      v-show="ruleForm.roundType === '05'"
    >
      <template
        slot="header-control"
        v-if="ruleForm.biddingStatus !== '01' ? false : true"
      >
        <i class="el-icon-success icon-success" v-show="attachCollapseVal"></i>
        <div v-show="attachCollapseVal">
          <iButton @click="handleCheck('attach')">{{ language('BIDDING-CHAKAN', '查看') }}</iButton>
        </div>
        <div v-show="!attachCollapseVal" class="form-attchment">
          <el-upload
            class="form-attchment-button"
            action="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="httpUpload"
          >
            <iButton>新增</iButton>
          </el-upload>
          <iButton @click="delAttachments">{{language('BIDDING_SHANCHU', '删除') }}</iButton>
          <iButton @click="handleSave('attach')">{{ language('BIDDING_BAOCUN', '保存') }}</iButton>
          <iButton @click="handleFinish('attach', 'save')">{{
            language('BIDDING-WANCHENG', '完成')
          }}</iButton>
        </div>
      </template>
      <template>
        <attachment
          ref="attachForm"
          v-model="ruleForm"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
        />
      </template>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iSelect, iPagination, iPage } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import supplierListDialog from "./components/supplierListDialog";
import manualForm from "./components/manualForm";
import roundForm from "./components/roundForm";
import britishForm from "./components/britishForm";
import inquiryForm from "./components/inquiryForm";
import quotationForm from "./components/quotationForm";
import parities from "./components/parities";
import attachment from "./components/attachment";
import {
  tableTitle,
  isAttendList,
  cbdLevelLib,
  manualTableTitle,
} from "./components/data";
import { pageMixins } from "@/utils/pageMixins";
import {
  getSupplierInfoById,
  getSuppliers,
  getCurrencyUnit,
  uploadFile,
} from "@/api/mock/mock";
import {
  findInquiry,
  findRfqInquiry,
  saveInquiryBidding,
  deleteExchangeRate,
  delayBidding,
  delayOpenTender,
  cbdLevel,
} from "@/api/bidding/bidding";
import dayjs from "dayjs";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iSelect,
    iPagination,
    iPage,

    commonTable,

    parities,
    attachment,

    manualForm,
    roundForm,
    britishForm,
    inquiryForm,
    quotationForm,

    supplierListDialog,
  },
  data() {
    return {
      showSupplierDialog: false,

      id: 0,
      orgRuleForm: {
        biddingProducts: [],
      },
      ruleForm: { biddingProducts: [], exchangeRates: [] },
      paritiesList: [],
      selectedTableData: [],

      cbdLevelList: {},
      cbdLevelLib,
      userListCache: {},
      userListData:{},
      tableTitle,
      isAttendList,
      manualTableTitle,

      isOpenDelay: true,
      isBiddingDelay: true,
      isDelay: true,

      headerCollapseVal: false,
      contentCollapseVal: false,
      reatCollapseVal: false,
      attachCollapseVal: false,

      place: "header",

      initList: {},
      initSuppliers: [],
      initRate: [],
      initAttachments: [],
      exchangeRateIds: [],
      checkdefault: false,

      clickType: "",
      currencys: [],

      flag: [],
      checked: true,
      pointerEvents: "visible",
      size: "",
      dataType:'',
      rfqCode:'',
      time:''
    };
  },
  computed: {
    disHall(){
      const {biddingStatus} = this.ruleForm
      return biddingStatus ==='02' || biddingStatus === '04' || biddingStatus === '06' || biddingStatus === '07' || biddingStatus === '08'
    },
    formComponent() {
      const { roundType } = this.ruleForm;
      return "05" === roundType
        ? "manualForm"
        : "03" === roundType
        ? "britishForm"
        : "01" === roundType
        ? "inquiryForm"
        : "06" === roundType
        ? "quotationForm"
        : "roundForm";
    },
    suppliersPage() {
      // let result = [];
      // let count = 0;
      //  while (count * this.page.pageSize < suppliers?.length) {
      //   result.push(suppliers.slice(count * this.page.pageSize, this.page.pageSize * (count + 1)))
      //   count++;
      // }

      const { suppliers } = this.ruleForm;
      const { currPage, pageSize } = this.page;
      return suppliers?.slice((currPage - 1) * pageSize, pageSize * currPage);
    },
  },
  async created() {
    console.log('process.env.VUE_APP_HREFSUPPLIER',process.env)
    this.id = this.$route.params.id;
    const flag = this.$route.path.includes('/bidding/project/inquiry')
    if(!flag){
      this.rfqCode = this.$route.query.id
    }
  },
  mounted() {
    this.handleSearchReset();
    this.queryCurrency();
    this.time = setInterval(() => {
      if(localStorage.getItem('close')) {
        clearInterval(this.time)
        localStorage.removeItem('close')
        window.location.reload()
      }
    }, 1000);
  },
  methods: {
    handleHrefHall(){
      const {biddingStatus} = this.ruleForm
      if(biddingStatus ==='02' || biddingStatus === '04'){
        this.$router.push({
          name:'biddingProjectHall'
        })
      }else if (biddingStatus === '06' || biddingStatus === '07' || biddingStatus === '08') {
        this.$router.push({
          name:'biddingProjectResult'
        })
      }
    },
    handleHref(row){
      console.log('gegadgegee',row)
      const a = process.env.VUE_APP_PORTAL_URL
      window.open(`${a}supplier/supplierList/details?supplierType=PP&id=${row.id}&subSupplierId=${row.supplierId}`, "_blank");
    },
    beforeAvatarUpload(file) {
      console.log(file);
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
    delAttachments() {
      if (this.selectedTableData.length === 0) {
        return this.$message.error(this.language('BIDDING_QXZXJFJ','请选择询价附件'));
      }
      this.$confirm(this.language('BIDDING_SFSCXZXJFJ',"是否删除选中询价附件？"), this.language('BIDDING_TISHI',"提示"), {
        confirmButtonText: this.language('BIDDING_SHI',"是"),
        cancelButtonText: this.language('BIDDING_FOU',"否"),
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
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    onOpenDelay() {
      this.isOpenDelay = false;
      this.isDelay = false;
      console.log(this.isOpenDelay);
    },
    onBiddingDelay() {
      this.isBiddingDelay = false;
      this.isDelay = false;
    },
    // 开标发送
    onOpenSend() {
      this.isOpenDelay = false;
      const { openTenderTime, pricingDeadline, projectCode } = this.ruleForm;
      const fromdata = { openTenderTime, pricingDeadline, projectCode };
      let dataTime = this.orgRuleForm.pricingDeadline;
      if (dataTime >= pricingDeadline) {
        return this.$message.error(this.language('BIDDING_BNXYDYDQSJ', '不能小于等于当前时间'));
      }
      delayOpenTender(fromdata)
        .then((res) => {
          this.$message.success(this.language('BIDDING_CAOZUOCHENGGONG','操作成功'));
          console.log(res);
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'));
        });
    },
    // 竞价发送
    onBiddingSend() {
      this.isBiddingDelay = false;
      const { pricingDeadline, biddingBeginTime, biddingEndTime, projectCode } =
        this.ruleForm;
      const fromdata = {
        pricingDeadline,
        biddingBeginTime,
        biddingEndTime,
        projectCode,
      };
      let pricingTime = this.orgRuleForm.pricingDeadline;
      if (pricingTime >= pricingDeadline) {
        return this.$message.error(this.language('BIDDING_BNXYDYZQDSJ','不能小于等于之前的时间'));
      }
      delayBidding(fromdata)
        .then((res) => {
          this.$message.success(this.language('BIDDING_CAOZUOCHENGGONG','操作成功'));
          location.reload();
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'));
        });
    },
    // 开标取消
    onOpenCancel() {
      this.isDelay = true;
      this.isOpenDelay = true;
      console.log(this.isOpenDelay);
      this.ruleForm = {
        ...this.ruleForm,
        pricingDeadline: this.orgRuleForm.pricingDeadline,
      };
    },
    // 竞价取消
    onBiddingCancel() {
      this.isDelay = true;
      this.isBiddingDelay = true;
      this.ruleForm = {
        ...this.ruleForm,
        biddingBeginTime: this.orgRuleForm.biddingBeginTime,
      };
    },
    // 新增汇率信息
    handleAdd() {
      this.ruleForm.exchangeRates.push({
        id: new Date().getTime(),
        biddingId: this.ruleForm.id,
        currency: "",
        exchangeRate: "",
      });

      console.log(this.ruleForm);
    },
    selectDel(evt) {
      let { val, id } = evt;
      if (val) {
        this.exchangeRateIds.push(id);
      } else {
        this.exchangeRateIds = new Set(this.exchangeRateIds);
        this.exchangeRateIds.delete(id);
      }
      this.exchangeRateIds = [...new Set(this.exchangeRateIds)];
      console.log(this.exchangeRateIds);
    },
    handleCurrencys(e) {
      console.log(this.currencys);
    },
    // 删除汇率信息
    handleDelete() {
      if (this.exchangeRateIds.length === 0) {
        return this.$message.error(this.language('BIDDING_QINGXUANZEHUILV','请选择汇率'));
      }
      this.$confirm(this.language('BIDDING_SFSCHLXX',"是否删除汇率信息？"), this.language('BIDDING_TISHI',"提示"), {
        confirmButtonText: this.language('BIDDING_SHI',"是"),
        cancelButtonText: this.language('BIDDING_FOU',"否"),
        type: "warning",
      })
        .then(() => {
          let param = {
            exchangeRateIds: this.exchangeRateIds,
            biddingId: this.ruleForm.id,
          };
          deleteExchangeRate(param)
            .then((res) => {
              this.checkdefault = false;
              this.$message.success(this.language('BIDDING_SHANCHUCHENGGONG','删除成功'));
              this.exchangeRateIds = this.exchangeRateIds.map((item) => {
                return item;
              });
              this.ruleForm.exchangeRates = this.ruleForm.exchangeRates.filter(
                (item) => {
                  return !this.exchangeRateIds.includes(item.id);
                }
              );
              this.exchangeRateIds.length = 0;
              this.orgRuleForm = {
                ...this.orgRuleForm,
                exchangeRates: res.exchangeRates,
              };
            })
            .catch(() => {
              this.$message.error(this.language('BIDDING_SHANCHUSHIBAI','删除失败'));
            });
        })
        .catch(() => {});
    },
    handleSearchReset() {
      let param = { id: this.id };
      this.query(param);
    },
    handleCheck(place) {
      const placeCollapse = this.$refs[`${place}Collapse`];
      this.$set(this, `${place}CollapseVal`, false);
      placeCollapse.collapseValue = true;
    },
    handleFinish(place, type) {
      this.clickType = type;
      this.place = place;
      const callback = () => {
        const placeCollapse = this.$refs[`${place}Collapse`];
        this.$set(this, `${place}CollapseVal`, true);
        placeCollapse.collapseValue = false;
      };
      if (place === "header") {
        this.submitForm(callback);
      } else {
        this.submitForm(callback);
      }
    },
    handleSave(place, type) {
      this.clickType = type;
      this.place = place;
      this.submitForm();
    },
    handleSetting() {
      this.place = "header";
      this.clickType = "keep";
      const params = {id: this.ruleForm.id, roundType: this.ruleForm.roundType}
      if (this.ruleForm.biddingStatus !== "01") {
        const flag = this.$route.path.includes('/bidding/project/inquiry')
        if(flag){
          const router = this.$router.resolve({
            name:
              this.ruleForm.roundType == "02"
                ? "biddingOpen"
                : "biddingCompetitionBase",
          });
          window.open(router.href,'_blank')
        } else {
          this.$emit('jump',params) 
        }
        return;
      }
      
      this.submitForm(() => {
        const flag = this.$route.path.includes('/bidding/project/inquiry')
        if(flag){
          const router = this.$router.resolve({
            name:
              this.ruleForm.roundType == "02"
                ? "biddingOpen"
                : "biddingCompetitionBase",
          });
          window.open(router.href,'_blank')
        } else {
          this.$emit('jump',params) 
        }
        return;
      });
    },
    handleSupplierChecked(rows) {
      console.log('gdsagdsgdsg',rows)
      const len = this.ruleForm.suppliers.length;
      const suppliersList = this.ruleForm.suppliers;
      // console.log('点击保存供应商',suppliersList, rows);
      const suppliers = rows.map((row, index) => {
        this.$set(this.userListCache, row.id, row.purchaserNameZh);
        return {
          sort: Number(len + index) + 1,
          biddingId: this.id,
          // id:row.id,
          userList: row.userList,
          contactName: row.purchaserNameZh,   //联系人
          email: row.purchaserEmail,          //邮箱
          telephone: row.phoneM,
          supplierCode: row.sapCode || row.svwCode || row.svwTempCode || '',
          supplierId: row.subSupplierId,
          supplierName: row.nameZh,
          mbdl: "",
          isAttend: true,
          // ...(this.ruleForm.roundType == "05"
          //   ? {
          //       cbdLevel: this.cbdLevelList[0]?.cbdLevel,
          //       supplierCode: row.supplierId,
          //     }
          //   : {
          //       cbdLevel: "",
          //       // supplierCode: "",
          //     }),
        };
      });
      this.ruleForm.suppliers.push(...suppliers);
      this.ruleForm.suppliers = this.ruleForm.suppliers?.map((supplier) => {
        this.querySuppliers(supplier.supplierCode,supplier.supplierId);
          return {
            ...supplier,
          };
      })
      console.log('gdsagdsgdsg5555555',this.ruleForm.suppliers)
      this.page.total = this.ruleForm.suppliers.length;
    },
    handleUserChange(row, item) {
      row.contactName = item.nameZh;
      row.contactId = item.id;
      row.email = item.email;
      row.telephone = item.phoneM;
    },
    // handleCbdChange(row, item) {
    //   console.log(row,item)
    //   row.cbdLevel = item.cbdLevel;
    //   // row.supplierCode = item.supplierCode;
    //   row.supplierCode = item.supplierId;
    // },
    submitForm(callback) {
      if (this.place === "header") {
        this.$refs["formComponent"].$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.saveForm(callback);
          } else {
            return;
          }
        });
      } else if (this.place === "reat") {
        this.$refs["reatForm"].$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.saveForm(callback);
          } else {
            return;
          }
        });
      } else if (this.place === "attach") {
        this.$refs["attachForm"].$children[0].validate((valid) => {
          if (valid) {
            this.saveForm(callback);
          } else {
            return;
          }
        });
      } else {
        console.log(826,this.$refs["tableDataForm"])
        this.$refs["tableDataForm"].$children[0].validate((valid) => {
          if (valid) {
            this.saveForm(callback);
          } else {
            return;
          }
        });
      }
    },
    saveForm(callback) {
      // let suppliers = [...this.ruleForm.suppliers];
      if (this.place === "header") {
        this.initList.suppliers = [...this.ruleForm.suppliers];
        const list = this.ruleForm;
        if (this.isEqual(list, this.initList)) {
          if (this.clickType === "save") {
            this.$refs.headerCollapse.collapseValue = false;
            this.$set(this, `headerCollapseVal`, true);
          }
          this.saveForms(callback);
        } else {
          this.saveFormHeader(callback);
        }
      } else if (this.place === "content") {
        this.initSuppliers = this.initSuppliers.map((item, index) => {
          item.index = index;
          return item;
        });
        if (this.isEqual(this.ruleForm.suppliers, this.initSuppliers)) {
          if (this.clickType === "save") {
            this.$refs.contentCollapse.collapseValue = false;
            this.$set(this, `contentCollapseVal`, true);
          }
          this.saveForms(callback);
        } else {
          this.saveFormContent(callback);
        }
        //汇率
      } else if (this.place === "reat") {
        const listRate = this.ruleForm.exchangeRates;
        if (this.isEqual(listRate, this.initRate)) {
          if (this.clickType === "save") {
            this.$refs.reatCollapse.collapseValue = false;
            this.$set(this, `reatCollapseVal`, true);
          }
          this.saveForms(callback);
        } else {
          this.handleSaveRate(callback);
        }
        // 附件
      } else if (this.place === "attach") {
        const attachments = this.ruleForm.attachments;
        if (this.isEqual(attachments, this.initAttachments)) {
          if (this.clickType === "save") {
            this.$refs.attachCollapse.collapseValue = false;
            this.$set(this, `attachCollapseVal`, true);
          }
          this.saveForms(callback);
        } else {
          this.handleSaveAttach(callback);
        }
      }
    },
    saveFormHeader(callback) {
      // this.$confirm(
      //   "是否保存该轮次报价信息？",
      //   // : "是否保存该轮次供应商信息？",
      //   "提示",
      //   {
      //     confirmButtonText: "是",
      //     cancelButtonText: "否",
      //     type: "warning",
      //   }
      // )
      //   .then(() => {// })
      //保存
      const {
        pricingDeadline,
        openTenderTime,
        roundType,
        biddingEndTime,
        biddingBeginTime,
        manualBiddingType,
      } = this.ruleForm;
      let endTime = new Date(biddingEndTime).getTime() + 3 * 24 * 3600 * 1000;
      endTime = dayjs(endTime).format("YYYY-MM-DD HH:mm:00");
      const deadline = dayjs(pricingDeadline).format("YYYY-MM-DD HH:mm:00");
      const openTime = dayjs(openTenderTime).format("YYYY-MM-DD HH:mm:00");
      const beginTime = dayjs(biddingBeginTime).format("YYYY-MM-DD HH:mm:00");
      const end = dayjs(biddingEndTime).format("YYYY-MM-DD HH:mm:00");

      if (roundType === "02") {
        if (deadline > openTime) {
          return this.$message.error(this.language('BIDDING_KBSJBXYWYBJJZRQ','开标时间必须要晚于报价截止日期'));
        }
      }
      if (
        roundType === "03" ||
        (roundType === "05" && manualBiddingType === "01")
      ) {
        if (beginTime >= end) {
          return this.$message.error(this.language('BIDDING_JSSJBXYWYKSRQ','结束时间必须要晚于开始日期'));
        } else if (endTime > deadline) {
          console.log(endTime, pricingDeadline);
          return this.$message.error(this.language('BIDDING_BJJZRQBWYJSSJH3GGZR','报价截止日期不晚于结束时间后3个工作日'));
        }
      }
      const formData = this.ruleForm;
      return saveInquiryBidding({
        ...this.orgRuleForm,
        ...formData,
        suppliers: this.orgRuleForm.suppliers,
        exchangeRates: this.orgRuleForm.exchangeRates,
        inquiryIsCompleted: this.clickType == "save" ? 1 : 0,
        quotationAreaFlag: roundType !== "05"
      })
        .then((res) => {
          if (res) {
            this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
            // this.handleSearchReset();
            this.initList = {
              ...res,
              openTenderStatus: res.openTenderStatus || "01", // 默认未开标
            };
            callback && callback();
          } else {
            this.$message.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveFormContent(callback) {
      // this.$confirm("是否保存该轮次供应商信息？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {})
      //保存
      const formData = this.ruleForm;
      console.log('formDatasafsafsa',formData)
      return saveInquiryBidding({
        ...this.orgRuleForm,
        suppliers: formData.suppliers.map((item) => {
          const { index, userList, ...obj } = item;
          return obj;
        }),
        supplierIsCompleted: this.clickType == "save" ? 1 : 0,
        quotationAreaFlag: false
      })
        .then((res) => {
          if (res) {
            this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
            this.initSuppliers = res.suppliers?.map((supplier) => {
              this.querySuppliers(supplier.supplierCode,supplier.supplierId);
              
              if (supplier.isAttend === null || supplier.isAttend === "")
                return {
                  ...supplier,
                  isAttend: true,
                  // "number" !== typeof supplier.isAttend && supplier.mbdl === "M"
                  //   ? true
                  //   : supplier.isAttend,
                };
              else
                return {
                  ...supplier,
                };
            });
            this.orgRuleForm = {
              ...this.orgRuleForm,
              suppliers: res.suppliers,
            };
            callback && callback();
          } else {
            this.$message.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 保存汇率信息
    handleSaveRate(callback) {
      const currencys = this.ruleForm.exchangeRates.map((item) => {
        return item.currency;
      });
      if ([...new Set(currencys)].length < currencys.length) {
        return this.$message.error(this.language('BIDDING_HLBNCF','汇率不能重复'));
      }
      // this.$confirm("是否保存该轮次汇率信息？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {})
      const formData = this.ruleForm;
      return saveInquiryBidding({
        // ...formData,
        ...this.orgRuleForm,
        exchangeRates: formData.exchangeRates,
        exchangeIsCompleted: this.clickType == "save" ? 1 : 0,
        quotationAreaFlag: false
      })
        .then((res) => {
          this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
          this.initRate = [...res.exchangeRates];
          this.orgRuleForm = {
            ...this.orgRuleForm,
            exchangeRates: res.exchangeRates,
          };
          callback && callback();
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
        });
    },
    // 保存附件
    handleSaveAttach(callback) {
      // this.$confirm("是否保存该轮次汇率信息？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // })
      //   .then(() => {})
      const formData = this.ruleForm;
      return saveInquiryBidding({
        // ...formData,
        ...this.orgRuleForm,
        attachments: formData.attachments,
        attachmentIsCompleted: this.clickType == "save" ? 1 : 0,
        quotationAreaFlag: false
      })
        .then((res) => {
          this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
          this.initAttachments = [...res.attachments];
          this.orgRuleForm = {
            ...this.orgRuleForm,
            attachments: res.attachments,
          };
          this.handleSearchReset();
          callback && callback();
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
        });
    },
    // 附件
    async httpUpload(content) {
      let formData = new FormData();
      formData.append("file", content.file);
      const res = await uploadFile(formData).catch((err) => {
        this.$message.error(this.language('BIDDING_SHANGCHUANSHIBAI', '上传失败'));
      });
      // this.attachmentId = res.id;
      this.ruleForm.attachments.push({
        attachmentId: res.id,
        attachmentName: res.name,
        attachmentSize: this.size,
        biddingId: this.ruleForm.id,
        updateDate: "",
      });
      this.$message.success(this.language('BIDDINGH_SHANGCHUANCHENGGONG', '上传成功'));
      console.log(this.ruleForm.attachments);
    },
    saveForms(callback) {
      const formData = this.ruleForm;
      saveInquiryBidding({
        ...this.orgRuleForm,
        ...{
          header: {
            ...formData,
            suppliers: this.orgRuleForm.suppliers,
            exchangeRates: this.orgRuleForm.exchangeRates,
            inquiryIsCompleted: this.clickType == "save" ? 1 : 0,
            quotationAreaFlag: formData.roundType !== "05",
          },
          content: {
            suppliers: formData.suppliers.map((item) => {
              const { index, userList, ...obj } = item;
              return obj;
            }),
            supplierIsCompleted: this.clickType == "save" ? 1 : 0,
          },
          reat: {
            exchangeRates: formData.exchangeRates,
            exchangeIsCompleted: this.clickType == "save" ? 1 : 0,
          },
          attach: {
            attachments: formData.attachments,
            attachmentIsCompleted: this.clickType == "save" ? 1 : 0,
          },
        }[this.place],
      }).then((res) => {
        if (res) {
          this.$message.success(this.language('BIDDING_BAOCUNCHENGGONG',"保存成功"));
          // this.handleSearchReset();
          callback && callback();
        } else {
          this.$message.error(this.language('BIDDING_BAOCUNSHIBAI',"保存失败"));
        }
      });
    },
    query(e) {
      // 根据ID查询条款信息
      this.tableLoading = true;
      const flag = this.$route.path.includes('/bidding/project/inquiry')
      if(!flag)
      {
        const rfqCode = {rfqCode:this.rfqCode}
        findRfqInquiry(rfqCode)
        .then((res) => {
          console.log(res);
          if (res.inquiryIsCompleted == true) {
            this.$refs.headerCollapse.collapseValue = false;
            this.$set(this, `headerCollapseVal`, true);
          }
          if (res.supplierIsCompleted == true) {
            this.$refs.contentCollapse.collapseValue = false;
            this.$set(this, `contentCollapseVal`, true);
          }
          if (res.exchangeIsCompleted == true) {
            this.$refs.reatCollapse.collapseValue = false;
            this.$set(this, `reatCollapseVal`, true);
          }
          // 附件
          if (res.attachmentIsCompleted == true) {
            console.log("object");
            this.$refs.attachCollapse.collapseValue = false;
            console.log("object2");
            this.$set(this, `attachCollapseVal`, true);
          }
          this.page.currPage = 1;
          this.page.total = res.suppliers.length;
          // this.page.pageSize = 1;
          // this.page.pageSizes = [1,2,3,4];
          this.orgRuleForm = { ...res };
          this.ruleForm = {
            ...res,
            openTenderStatus: res.openTenderStatus || "01", // 默认未开标
            exchangeRates: res.exchangeRates?.map((item) => ({
              ...item,
            })),
            suppliers: res.suppliers?.map((supplier) => {
              console.log('obsfsaject',supplier)
              this.querySuppliers(supplier.supplierCode,supplier.supplierId);
              if (supplier.isAttend === null || supplier.isAttend === "")
                return {
                  ...supplier,
                  isAttend: true,
                  // "number" !== typeof supplier.isAttend && supplier.mbdl === "M"
                  //   ? true
                  //   : supplier.isAttend,
                  // cbdLevelList:this.cbdLevelList
                  //   supplier.cbdLevel == "03"
                  //     ? this.cbdLevelList.slice(2, 3)
                  //     : supplier.cbdLevel == "02"
                  //     ? this.cbdLevelList.slice(1, 3)
                  //     : this.cbdLevelList,
                };
              else
                return {
                  ...supplier,
                  // cbdLevelList:this.cbdLevelList
                  //   supplier.cbdLevel == "03"
                  //     ? this.cbdLevelList.slice(2, 3)
                  //     : supplier.cbdLevel == "02"
                  //     ? this.cbdLevelList.slice(1, 3)
                  //     : this.cbdLevelList,
                };
            }),
          };
          this.initList = {
            ...res,
            openTenderStatus: res.openTenderStatus || "01", // 默认未开标
          };
          this.initRate = [...res.exchangeRates];
          this.initAttachments = [...res.attachments];
          this.initSuppliers = res.suppliers?.map((supplier) => {
            console.log('obsfsaject',supplier)
            this.querySuppliers(supplier.supplierCode,supplier.supplierId);
            // if (!supplier.isAttend)
            if (supplier.isAttend === null || supplier.isAttend === "")
              return {
                ...supplier,
                isAttend: true,
                // "number" !== typeof supplier.isAttend && supplier.mbdl === "M"
                //   ? true
                //   : supplier.isAttend,
              };
            else
              return {
                ...supplier,
              };
          });
          this.tableLoading = false;

          this.$emit("change-title", this.ruleForm);
        })
        .catch((err) => {
          this.tableLoading = false;
        });
      
      } else {
        findInquiry(e)
        .then((res) => {
          console.log(res);
          if (res.inquiryIsCompleted == true) {
            this.$refs.headerCollapse.collapseValue = false;
            this.$set(this, `headerCollapseVal`, true);
          }
          if (res.supplierIsCompleted == true) {
            this.$refs.contentCollapse.collapseValue = false;
            this.$set(this, `contentCollapseVal`, true);
          }
          if (res.exchangeIsCompleted == true) {
            this.$refs.reatCollapse.collapseValue = false;
            this.$set(this, `reatCollapseVal`, true);
          }
          // 附件
          if (res.attachmentIsCompleted == true) {
            console.log("object");
            this.$refs.attachCollapse.collapseValue = false;
            console.log("object2");
            this.$set(this, `attachCollapseVal`, true);
          }
          this.page.currPage = 1;
          this.page.total = res.suppliers.length;
          // this.page.pageSize = 1;
          // this.page.pageSizes = [1,2,3,4];
          this.orgRuleForm = { ...res };
          this.ruleForm = {
            ...res,
            openTenderStatus: res.openTenderStatus || "01", // 默认未开标
            exchangeRates: res.exchangeRates?.map((item) => ({
              ...item,
            })),
            suppliers: res.suppliers?.map((supplier) => {
              this.querySuppliers(supplier.supplierCode,supplier.supplierId);
              if (supplier.isAttend === null || supplier.isAttend === "")
                return {
                  ...supplier,
                  isAttend: true,
                  // "number" !== typeof supplier.isAttend && supplier.mbdl === "M"
                  //   ? true
                  //   : supplier.isAttend,
                  // cbdLevelList:this.cbdLevelList
                    // supplier.cbdLevel == "03"
                    //   ? this.cbdLevelList.slice(2, 3)
                    //   : supplier.cbdLevel == "02"
                    //   ? this.cbdLevelList.slice(1, 3)
                    //   : this.cbdLevelList,
                };
              else
                return {
                  ...supplier,
                  // cbdLevelList:this.cbdLevelList
                    // supplier.cbdLevel == "03"
                    //   ? this.cbdLevelList.slice(2, 3)
                    //   : supplier.cbdLevel == "02"
                    //   ? this.cbdLevelList.slice(1, 3)
                    //   : this.cbdLevelList,
                };
            }),
          };
          this.initList = {
            ...res,
            openTenderStatus: res.openTenderStatus || "01", // 默认未开标
          };
          this.initRate = [...res.exchangeRates];
          this.initAttachments = [...res.attachments];
          this.initSuppliers = res.suppliers?.map((supplier) => {
            console.log('obsfsaject',supplier)
            this.querySuppliers(supplier.supplierCode,supplier.supplierId);
            // if (!supplier.isAttend)
            if (supplier.isAttend === null || supplier.isAttend === "")
              return {
                ...supplier,
                isAttend: true,
                // "number" !== typeof supplier.isAttend && supplier.mbdl === "M"
                //   ? true
                //   : supplier.isAttend,
              };
            else
              return {
                ...supplier,
              };
          });
          this.tableLoading = false;

          this.$emit("change-title", this.ruleForm);
        })
        .catch((err) => {
          this.tableLoading = false;
        });
      }
    },
    handleSizeChange(val) {
      console.log("handleSizeChange", this.page);
      this.page.pageSize = val;
    },
    async querySuppliers(supplierCode,supplierId) {
      // 联系人
      
      if (!this.userListCache[supplierId]) {
        this.$set(this.userListCache, supplierId, []);
        const params = {supplierId, isOnlyValid: true}
        const data = await getSupplierInfoById(params);
        this.$set(this.userListCache, supplierId, data.data || []);
        const list = this.userListCache[supplierId].filter(item => item.isDefault) || {}
        this.$set(this.userListData, supplierId, list || []);
      }
      // CBD
      if (!this.cbdLevelList[supplierCode]) {
        const res = await cbdLevel(supplierCode);
        this.$set(this.cbdLevelList, supplierCode, res || []);
        this.ruleForm.suppliers = this.ruleForm.suppliers?.map((supplier) => {
          return {
            ...supplier,
            mbdl: supplier.mbdl == '2' || supplier.mbdl == 'M' ? 'M' : '',
            cbdLevelList: supplier?.cbdArea == "03"
                  ? this.cbdLevelList[supplierCode].slice(2, 3)
                  : supplier?.cbdArea == "02"
                  ? this.cbdLevelList[supplierCode].slice(1, 3)
                  : this.cbdLevelList[supplierCode],
            contactName:this.userListData[supplier.supplierId]?.[0]?.nameZh,
            email:this.userListData[supplier.supplierId]?.[0]?.email,
            telephone:this.userListData[supplier.supplierId]?.[0]?.phoneM
          };
        })
      }
    },
    // 表格选中值集
    handleCurrentChange(e) {
      this.page.currPage = e;
      // let param = {
      //   pageNum: this.page.currPage,
      //   pageSize: 10,
      // };
      // this.query(param);
    },
    //判断两个对象是否相等
    isEqual(objA, objB) {
      //相等
      if (objA === objB) return objA !== 0 || 1 / objA === 1 / objB;
      //空判断
      if (objA == null || objB == null) return objA === objB;
      //类型判断
      if (
        Object.prototype.toString.call(objA) !==
        Object.prototype.toString.call(objB)
      )
        return false;

      switch (Object.prototype.toString.call(objA)) {
        case "[object RegExp]":
        case "[object String]":
          //字符串转换比较
          return "" + objA === "" + objB;
        case "[object Number]":
          //数字转换比较,判断是否为NaN
          if (+objA !== +objA) {
            return +objB !== +objB;
          }

          return +objA === 0 ? 1 / +objA === 1 / objB : +objA === +objB;
        case "[object Date]":
        case "[object Boolean]":
          return +objA === +objB;
        case "[object Array]":
          //判断数组
          for (let i = 0; i < objA.length; i++) {
            if (!this.isEqual(objA[i], objB[i])) return false;
          }
          return true;
        case "[object Object]":
          // eslint-disable-next-line no-case-declarations
          let keys = Object.keys(objA);
          //判断对象
          for (let i = 0; i < keys.length; i++) {
            if (!this.isEqual(objA[keys[i]], objB[keys[i]])) return false;
          }

          keys = Object.keys(objB);
          for (let i = 0; i < keys.length; i++) {
            if (!this.isEqual(objA[keys[i]], objB[keys[i]])) return false;
          }

          return true;
        default:
          return false;
      }
    },
    // 第三方接口货币信息
    queryCurrency() {
      getCurrencyUnit().then((res) => {
        console.log(res);
        this.paritiesList = [...this.paritiesList, ...res.data];
      });
    },
  },
  destroyed(){
    clearInterval(this.time)
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  &__header {
    &-title {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      font-weight: bold;
      .el-button--default {
        min-width: 130px;
        margin-bottom: 10px;
      }
    }
  }
  &__navtab {
    margin-bottom: 15px;
    &-item {
      .el-button {
        margin-left: 2px;
        background-color: #fcfdfd;
        color: #ccc;
      }
      .el-button.active {
        color: #1763f7;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
  }
}
.card {
  margin-bottom: 30px;
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}

::v-deep .el-form-item {
  .el-input.is-disabled {
    .el-input__inner {
      text-align: center;
    }
  }
  .el-select .el-input.is-disabled {
    .el-input__suffix {
      display: none;
    }
  }
}

::v-deep .cardHeader {
  position: relative;

  .collapse {
    pointer-events: none;
  }
}

::v-deep .can-pointer .cardHeader {
  .collapse {
    pointer-events: visible;
  }
}

.icon-success {
  color: green;
  font-size: 1.8rem;
  position: absolute;
  left: 120px;
  top: 35px;
  z-index: 10;
}

.form-attchment {
  display: flex;
  .form-attchment-button {
    padding: 0 0.5625rem;
  }
}
::v-deep .el-switch.is-disabled{
   opacity:1;
}
::v-deep .el-switch{
 
//开关样式
  .el-switch__label--left {
    position: relative;
    left: 42px;
    color: #fff;
    z-index: -1111;
    background: transparent !important;
  }
  .el-switch__label--right {
    position: relative;
    right: 42px;
    color: #fff;
    z-index: -1111;
    background: transparent !important;
  }
  .el-switch__label--right.is-active {
    z-index: 1;
    color: #fff !important;
  }
  .el-switch__label--left.is-active {
    z-index: 1;
    color: #9c9c9c !important;
  }
}
</style>
