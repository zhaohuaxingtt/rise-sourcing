<template>
  <div>
    <iSearch
      class="margin-top25"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('RFQBIANHAO', 'RFQ编号')">
          <iInput v-model="form.rfqId" :placeholder="language('QINGSHURURFQBIANHAO', '请输入RFQ编号')" />
        </el-form-item>
        <el-form-item :label="language('RFQMINGCHENG', 'RFQ名称')">
          <iInput
            v-model="form.rfqName"
            :placeholder="language('QINGSHURURFQMINGCHENG', '请输入RFQ名称')"
          />
        </el-form-item>
        <el-form-item label="LINIE">
          <iSelect
            filterable
            remote
            clearable
            v-model="form.linieUserId"
            :remote-method="findLinieByName"
            :loading="linieLoading"
            :placeholder="language('QINGSHURULINIE', '请输入LINIE')"
            :loading-text="language('JIAZAIZHONG', '加载中')"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in linieOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iMultiLineInput v-model="form.partNum" :title="language('LINGJIANHAO', '零件号')" />
        </el-form-item>
        <el-form-item :label="language('LINGJIANMINGCHENG', '零件名称')">
          <iInput
            v-model="form.partName"
            :placeholder="
                  language('QINGSHURULINGJIANMINGCHENG', '请输入零件名称')
                "
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGSVWHAO', '供应商SVW号')">
          <iInput
            v-model="form.supplierSvwCode"
            :placeholder="
                  language('QINGSHURUGONGYINGSHANGSVWHAO', '请输入供应商SVW号')
                "
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGSAPHAO', '供应商SAP号')">
          <iInput
            v-model="form.supplierSapCode"
            :placeholder="
                  language('QINGSHURUGONGYINGSHANGSAPHAO', '请输入供应商SAP号')
                "
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')">
          <iInput
            v-model="form.supplierName"
            :placeholder="
                language('QINGSHURUGONGYINGSHANGMINGCHENG', '请输入供应商名称')
              "
          />
        </el-form-item>
        <el-form-item :label="language('CHEXING', '车型')">
          <iSelect
            filterable
            v-model="form.modelNameZh"
            :placeholder="language('QINGXUANZECHEXING', '请选择车型')"
          >
            <el-option value :label="language('ALL', '全部') | capitalizeFilter"></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')">
          <iSelect
            filterable
            v-model="form.carTypeProject"
            :placeholder="
                  language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')
                "
          >
            <el-option value :label="language('ALL', '全部') | capitalizeFilter"></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in cartypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="SQE评分人">
          <iSelect
            filterable
            remote
            clearable
            v-model="form.sqeUserId"
            :remote-method="findLinieByName"
            :loading="linieLoading"
            :placeholder="language('请输入SQE评分人', '请输入SQE评分人')"
            :loading-text="language('JIAZAIZHONG', '加载中')"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in linieOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_SHIFOUXIANSHIZIJI_1', '显示自己')">
          <iSelect v-model="form.showSelf" :placeholder="language('partsprocure.CHOOSE', '请选择')">
            <el-option value :label="language('ALL', '全部') | capitalizeFilter"></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in showSelfOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top30" :title="language('待评分任务列表')">
      <template #header-control>
        <iButton>{{ language("退回") }}</iButton>
        <iButton @click="transferDept">{{ language("分配股") }}</iButton>
        <iButton @click="handleTransfer">{{ language("分配SQE评分人") }}</iButton>
      </template>
      <tableList
        class="table"
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #rfqId="scope">
          <span class="link-underline" @click="jumpRfqDetail(scope.row)">
            {{
            scope.row.rfqId
            }}
          </span>
        </template>
      </tableList>
      <iPagination
        v-update
        class="margin-top30"
        @size-change="handleSizeChange($event, searchRfqBdlRatings)"
        @current-change="handleCurrentChange($event, searchRfqBdlRatings)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      <transferSQEDeptDialog
        ref="forwardDialog"
        :visible.sync="transferDeptDialogVisible"
        @confirm="confirmForward"
      />
      <forwardDialog
        ref="forwardDialog"
        :visible.sync="forwardDialogVisible"
        @confirm="confirmForward"
      />
    </iCard>
  </div>
</template>
  
    
  <script>
import {
  iSearch,
  iSelect,
  iInput,
  iCard,
  iButton,
  iPagination,
  iMessage,
  iMultiLineInput
} from "rise";
import transferSQEDeptDialog from "../components/transferSQEDeptDialog";
import forwardDialog from "../components/forwardDialog";
import tableList from "@/views/partsign/editordetail/components/tableList";
import filters from "@/utils/filters";
import { pageMixins } from "@/utils/pageMixins";
import { queryForm, tableTitle } from "./data";
import { cloneDeep } from "lodash";
import {
  findDropDownBox,
  findLinieByName,
  findInquiryBuyerByName,
  searchRfqBdlRatings,
  forward
} from "@/api/supplierscore";
import { getCartypeDict } from "@/api/partsrfq/home";
import axios from "axios";
import { getCarTypeSop } from "@/api/partsprocure/editordetail";

export default {
  components: {
    iSearch,
    iSelect,
    iInput,
    iCard,
    iButton,
    iPagination,
    transferSQEDeptDialog,
    forwardDialog,
    tableList,
    iMultiLineInput
  },
  mixins: [filters, pageMixins],
  data() {
    return {
      scoreStatusOptions: [],
      findLinieByNameSource: null,
      linieLoading: false,
      linieOptions: [],
      findInquiryBuyerByNameSource: null,
      buyerLoading: false,
      buyerOptions: [],
      carTypeOptions: [],
      cartypeProjectOptions: [],
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      forwardDialogVisible: false,
      transferDeptDialogVisible: false,
      showSelfOptions: [
        { label: "是", key: "nominationLanguage.Yes", value: true },
        { label: "否", key: "nominationLanguage.No", value: false }
      ]
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.permission?.userInfo || {};
    }
  },
  created() {
    this.findDropDownBox();
    this.getCartypeDict();
    this.getCarTypeSop();
    this.searchRfqBdlRatings();
  },
  methods: {
    // 设置初始查询条件
    setDefault() {
      let XTR_List = ["JSPFXTY", "ZLPFXTY"]; // 协调人
      let PFR_List = ["JSPFXTY", "ZLPFXTY"]; // 评分人
      let isXTR = false;
      let isPFR = false;
      (this.userInfo.roleList || []).map(item => {
        if (XTR_List.includes(item.code)) {
          isXTR = true;
        }
        if (PFR_List.includes(item.code)) {
          isPFR = true;
        }
      });
      if (isXTR && isPFR) {
        // 协调人&评分人（包含 JZSPFR、ZLPFR任一角色，且包含JSPFXTY、ZLPFXTY任一角色）：默认查询 待评分、待提交、待审核
        this.form.rateStatus = [
          "WATING_FOR_RATING", // 待评分
          "WATING_FOR_SUBMIT", // 待提交
          "RATING_FOR_AUDITING" // 待审核
        ];
      } else if (isXTR) {
        // 仅协调人（包含JSPFXTY、ZLPFXTY任一角色，但不包含JZSPFR、ZLPFR）：默认查询 待审核
        this.form.rateStatus = ["RATING_FOR_AUDITING"];
      } else if (isPFR) {
        // 仅评分人（包含 JZSPFR、ZLPFR任一角色，但不包含JSPFXTY、ZLPFXTY）：默认查询待评分、待提交
        this.form.rateStatus = ["WATING_FOR_RATING", "WATING_FOR_SUBMIT"];
      }
    },
    // 获取评分状态
    findDropDownBox() {
      findDropDownBox({
        types: ["RFQ_RATE_STATUS"]
      })
        .then(res => {
          if (res.code == 200) {
            this.scoreStatusOptions =
              Array.isArray(res.data) && res.data[0] && res.data[0].list
                ? res.data[0].list
                    .map(item => ({
                      key: item.key,
                      label: item.name,
                      value: item.key
                    }))
                    .filter(
                      item =>
                        !["NO_GRADE", "WATING_FOR_HANDLING"].includes(item.key)
                    )
                : [];
            this.setDefault();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {});
    },
    // 查询Linie
    findLinieByName(name) {
      this.linieLoading = true;

      if (this.findLinieByNameSource) this.findLinieByNameSource.cancel();
      this.findLinieByNameSource = axios.CancelToken.source();

      findLinieByName(
        {
          name
        },
        { cancelToken: this.findLinieByNameSource.token }
      )
        .then(res => {
          if (res.code == 200) {
            this.linieOptions = Array.isArray(res.data)
              ? res.data.map(item => ({
                  key: item.id,
                  label: item.nameZh,
                  value: item.id
                }))
              : [];
          }

          this.linieLoading = false;
        })
        .catch(() => (this.linieLoading = false));
    },
    // 查询询价采购员
    findInquiryBuyerByName(name) {
      this.buyerLoading = true;

      if (this.findInquiryBuyerByNameSource)
        this.findInquiryBuyerByNameSource.cancel();
      this.findInquiryBuyerByNameSource = axios.CancelToken.source();

      findInquiryBuyerByName(
        {
          name
        },
        { cancelToken: this.findInquiryBuyerByNameSource.token }
      )
        .then(res => {
          if (res.code == 200) {
            this.buyerOptions = Array.isArray(res.data)
              ? res.data.map(item => ({
                  key: item.id,
                  label: item.nameZh,
                  value: item.id
                }))
              : [];
          }

          this.buyerLoading = false;
        })
        .catch(() => (this.buyerLoading = false));
    },
    // 查询车型
    getCartypeDict() {
      getCartypeDict().then(res => {
        if (res.code == 200) {
          this.carTypeOptions = Array.isArray(res.data)
            ? res.data.map(item => ({
                key: item.code,
                label: item.name,
                value: item.name
              }))
            : [];
        }
      });
    },
    // 获取车型项目
    getCarTypeSop() {
      getCarTypeSop().then(res => {
        if (res.code == 200) {
          this.cartypeProjectOptions = Array.isArray(res.data)
            ? res.data.map(item => ({
                key: item.cartypeProCode,
                name: item.cartypeProName,
                value: item.cartypeProCode
              }))
            : [];

          this.$forceUpdate();
        }
      });
    },
    searchRfqBdlRatings() {
      const form = {};
      Object.keys(this.form).forEach(key => {
        form[key] =
          this.form[key] || this.form[key] === 0 || this.form[key] === false
            ? this.form[key]
            : undefined;
      });
      form.current = this.page.currPage;
      form.size = this.page.pageSize;
      // form.showSelf = form.showSelf=='YES'

      this.loading = true;
      searchRfqBdlRatings(form)
        .then(res => {
          if (res.code == 200) {
            this.tableListData = Array.isArray(res.data) ? res.data : [];
            this.page.totalCount = res.total || 0;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    handleSelectionChange(list) {
      this.multipleSelection = list;
    },
    // 查询
    sure() {
      this.page.currPage = 1;
      this.searchRfqBdlRatings();
    },
    // 重置
    reset() {
      this.form = cloneDeep(queryForm);
      this.setDefault();
      this.page.currPage = 1;
      this.searchRfqBdlRatings();
    },
    // 转派评分任务
    handleTransfer() {
      if (!this.multipleSelection.length)
        return iMessage.warn(
          this.language(
            "QINGXUANZEXUYAOZHUANPAIDEPINGFENRENWU",
            "请选择需要转派的评分任务"
          )
        );
      this.forwardDialogVisible = true;
    },
    // 确认转派
    confirmForward(userInfo) {
      this.$refs.forwardDialog.updateConfirmLoading(true);

      forward({
        raterId: userInfo.id,
        rater: userInfo.nameZh,
        rfqIds: this.multipleSelection.map(item => item.rfqId)
      })
        .then(res => {
          const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

          if (res.code == 200) {
            iMessage.success(message);
            this.forwardDialogVisible = false;
            this.searchRfqBdlRatings();
          } else {
            iMessage.error(message);
          }

          this.$refs.forwardDialog.updateConfirmLoading(false);
        })
        .catch(() => this.$refs.forwardDialog.updateConfirmLoading(false));
    },
    // 跳转RFQ详情
    jumpRfqDetail(row) {
      const route = this.$router.resolve({
        path: "/targetpriceandscore/supplierscore/rfqdetail",
        query: {
          rfqId: row.rfqId,
          currentTab: "supplierScore"
        }
      });
      window.open(route.href, "_blank");
    },
    // 分配股
    transferDept(){
      this.transferDeptDialogVisible = true
    },
  }
};
</script>
<style lang="scss" scoped>
</style>