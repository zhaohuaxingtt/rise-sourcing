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
          <iInput v-model="form.rfqId" :placeholder="language('QINGSHURURFQBIANHAO', '请输入RFQ编号')"/>
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
          <iMultiLineInput v-model="form.partNum" :title="language('LINGJIANHAO', '零件号')"/>
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
        <el-form-item label="SQE">
          <iSelect
              filterable
              remote
              clearable
              v-model="form.sqeUserId"
              :remote-method="findLinieByName"
              :loading="linieLoading"
              :placeholder="language('请输入SQE', '请输入SQE')"
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
        <el-form-item :label="language('SQE状态')">
          <iSelect v-model="sqeRateStatus" multiple :placeholder="language('partsprocure.CHOOSE', '请选择')" collapse-tags >
            <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in statusOptions"
                :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top30" :title="language('全部任务列表')">
      <template #header-control>
        <iButton @click="backByRfq" v-permission="CSCSCOREMANAGE_MENU_SQESCORE_QUERY_TUIHUI">{{ language("退回") }}</iButton>
        <iButton @click="transferDept" v-permission="CSCSCOREMANAGE_MENU_SQESCORE_QUERY_FENPEIGU">{{ language("分配股") }}</iButton>
        <iButton @click="handleTransfer" v-permission="CSCSCOREMANAGE_MENU_SQESCORE_QUERY_FENPEISQEPINGFENREN">{{ language("分配SQE") }}</iButton>
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
          @size-change="handleSizeChange($event, sure)"
          @current-change="handleCurrentChange($event, getData)"
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
          :rows="multipleSelection"
          @confirm="confirmForward"
      />
      <forwardSQEDialog
          ref="forwardDialog"
          :visible.sync="forwardSQEDialogVisible"
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
import forwardSQEDialog from "../components/forwardSQEDialog";
import tableList from "@/views/partsign/editordetail/components/tableList";
import filters from "@/utils/filters";
import {pageMixins} from "@/utils/pageMixins";
import {queryForm, tableTitle} from "./data";
import {cloneDeep} from "lodash";
import {
  findDropDownBox,
  findLinieByName,
  findInquiryBuyerByName,
  forward,
  search,
  assignSqeRater,
  backByRfq
} from "@/api/supplierscore";
import {getCartypeDict} from "@/api/partsrfq/home";
import axios from "axios";
import {TAB} from "@/views/financialTargetPrice/components/data";
import {getCarTypeSop} from "@/api/partsprocure/editordetail";

export default {
  components: {
    iSearch,
    iSelect,
    iInput,
    iCard,
    iButton,
    iPagination,
    transferSQEDeptDialog,
    forwardSQEDialog,
    tableList,
    iMultiLineInput
  },
  mixins: [filters, pageMixins],
  data() {
    return {
      scoreStatusOptions: [],
      sqeRateStatus: [],
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
      forwardSQEDialogVisible: false,
      transferDeptDialogVisible: false,
      showSelfOptions: [
        {label: "是", key: "nominationLanguage.Yes", value: true},
        {label: "否", key: "nominationLanguage.No", value: false}
      ],
      statusOptions: [
        {label: "待分配", key: "待分配", value: 'UNDISTRIBUTED'},
        {label: "待评分", key: "待评分", value: 'WATING_FOR_RATING'},
        {label: "待提交", key: "待提交", value: 'WATING_FOR_SUBMIT'},
        {label: "待审核", key: "待审核", value: 'RATING_FOR_AUDITING'},
        {label: "审批驳回", key: "审批驳回", value: 'AUDIT_REJECT'},
        {label: "评分完成", key: "评分完成", value: 'RATING_COMPLETED'},
        {label: "已保存", key: "已保存", value: 'SAVED'},
        {label: "已退回", key: "已退回", value: 'GO_BACK'}
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
    this.getData();
  },
  methods: {
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
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          })
          .catch(() => {
          });
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
          {cancelToken: this.findLinieByNameSource.token}
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
          {cancelToken: this.findInquiryBuyerByNameSource.token}
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
    getData() {
      const params = {
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize,
        sqeRateStatus: this.sqeRateStatus.length ? this.sqeRateStatus : this.statusOptions.map(item => item.value)
      };
      this.loading = true;
      search(params)
          .then(res => {
            if (res?.code == 200) {
              this.tableListData = Array.isArray(res.data) ? res.data : [];
              this.page.totalCount = res.total || 0;
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).finally(() => {
        this.loading = false;
      });
    },
    // 退回
    backByRfq() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('请选择需要退回的数据'))
      backByRfq(this.multipleSelection.map(item => item.rfqId)).then(res => {
        if (res?.code == 200) {
          iMessage.success(this.$t('操作成功'))
          this.sure()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },
    // 分配股
    transferDept() {
      if (!this.multipleSelection.length) return iMessage.warn(
          this.language(
              "QINGXUANZEXUYAOZHUANPAIDEPINGFENRENWU",
              "请选择需要转派的评分任务"
          )
      );
      this.transferDeptDialogVisible = true
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
      this.forwardSQEDialogVisible = true;
    },
    handleSelectionChange(list) {
      this.multipleSelection = list;
    },
    // 查询
    sure() {
      this.page.currPage = 1;
      this.getData();
    },
    // 重置
    reset() {
      this.form = cloneDeep(queryForm);
      this.sure();
    },
    // 确认转派
    confirmForward(userInfo) {
      this.$refs.forwardDialog.updateConfirmLoading(true);

      assignSqeRater({
        rfqIds: this.multipleSelection.map(item => item.id),
        sqeRaterId: userInfo.value,
        sqeRaterName: userInfo.label
      })
          .then(res => {
            const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
            if (res?.code == 200) {
              iMessage.success(message);
              this.forwardSQEDialogVisible = false;
              this.getData();
            } else {
              iMessage.error(message);
            }
          })
          .finally(() => this.$refs.forwardDialog.updateConfirmLoading(false));
    },
    // 跳转RFQ详情
    jumpRfqDetail(row) {
      const route = this.$router.resolve({
        path: "/targetpriceandscore/supplierscore/rfqdetail",
        query: {
          rfqId: row.rfqId,
          currentTab: "supplierScore",
          from:'SQE'
        }
      });
      window.open(route.href, "_blank");
    },
  }
};
</script>
<style lang="scss" scoped>
</style>