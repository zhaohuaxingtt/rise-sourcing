<template>
  <div>
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item :label="$t('partsprocure.PARTSPROCUREMODELPROJECT')">
          <iSelect v-model="searchParams.search1" @change="carModelSearch">
            <el-option
              v-for="(item, index) in selectOptions1 || []"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="VW SET">
          <iSelect v-model="searchParams.search2" :multiple="true">
            <el-option
              v-for="(item, index) in selectOptions2 || []"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('PROCAIGOUXIANGMULEIXING')">
          <iSelect v-model="searchParams.search3" :multiple="true">
            <el-option
              v-for="(item, index) in selectOptions3 || []"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_LINGJIANHAO')">
          <iMultiLineInput
            :placeholder="
              language(
                'partsprocure.PARTSPROCURE',
                '请输入零件号，多个逗号分隔'
              )
            "
            :title="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')"
            v-model="searchParams.search4"
          ></iMultiLineInput>
          <!-- <iInput v-model="searchParams.search4"></iInput>  -->
        </el-form-item>
        <el-form-item :label="$t('LK_LINGJIANMINGCHENG')">
          <iInput v-model="searchParams.search5"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard collapse title="Calculation Model VSI" class="margin-top20">
      <template v-slot:header-control>
        <iButton @click="cancelVSI" v-if="!VSIeditType">{{
          $t("QUXIAO")
        }}</iButton
        ><!-- 取消 -->
        <iButton
          @click="editVSI"
          v-if="VSIeditType"
          v-permission="PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_EDIT"
          >{{ language("BIANJI", "编辑") }}</iButton
        >
        <iButton @click="saveVSI" v-if="!VSIeditType">{{
          language("BAOCUN", "保存")
        }}</iButton>
      </template>
      <iFormGroup row="3" v-loading="loading">
        <iFormItem>
          <iLabel label="Calculation Model SVI" slot="label"></iLabel>
          <div class="format_div">{{ $postThousandth(VSIData.VSIData1) }}</div>
        </iFormItem>
        <iFormItem>
          <iLabel label="Motor & Gearbox" slot="label"></iLabel>
          <div class="format_div" v-if="VSIeditType">
            {{ $postThousandth(VSIData.VSIData2) }}
          </div>
          <iInput
            v-model="VSIData.VSIData2"
            type="number"
            @change="inputVSI"
            v-else
            :disabled="VSIeditType"
          ></iInput>
        </iFormItem>
        <iFormItem>
          <iLabel label="HT/CKD/MTZ/NTVorlogistic/MBCP" slot="label"></iLabel>
          <div class="format_div" v-if="VSIeditType">
            {{ $postThousandth(VSIData.VSIData3) }}
          </div>
          <iInput
            v-model="VSIData.VSIData3"
            type="number"
            @change="inputVSI"
            v-else
            :disabled="VSIeditType"
          ></iInput>
        </iFormItem>
        <iFormItem>
          <iLabel label="Calculation Model CSC-Base" slot="label"></iLabel>
          <div class="format_div" v-if="VSIeditType">
            {{ $postThousandth(VSIData.VSIData4) }}
          </div>
          <iInput
            v-model="VSIData.VSIData4"
            type="number"
            @change="inputVSI"
            v-else
            :disabled="VSIeditType"
          ></iInput>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <iCard :title="$t('XIANGQINGLIEBIAO')" class="margin-top20">
      <template v-slot:header-control>
        <iButton
          v-if="!editType"
          @click="exportExcel"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_DAOCHU
          "
          >{{ $t("BIDDING_DAOCHU") }}</iButton
        ><!-- 导出 -->
        <iButton
          v-if="!editType"
          @click="downModel"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_XIAZAI
          "
          >{{ $t("下载上传模板") }}</iButton
        ><!-- 下载上传模板 -->
        <!-- 批量上传 -->
        <iButton
          v-if="!editType"
          @click="batchUpload"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_PILIANGSHANGCHUAN
          "
          style="display: inline-block; margin-right: 10px"
          >{{ $t("批量上传") }}</iButton
        >
        <el-upload
          class="upload-demo"
          v-show="false"
          style="display: inline-block; margin-right: 10px"
          multiple
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-progress="uploadProgress"
          :data="uploadData"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :disabled="upLoading"
          :headers="{
            token: getToken(),
          }"
        >
          <iButton ref="clickBtn" @click="batchload">{{
            $t("批量上传")
          }}</iButton>
        </el-upload>
        <iButton
          v-if="!editType"
          @click="refresh"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_REFRESH
          "
          >{{ $t("LK_SHUAXIN") }}</iButton
        ><!-- 刷新 -->
        <iButton
          v-if="!editType"
          @click="add"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_ADD
          "
          >{{ $t("XINZENG") }}</iButton
        ><!-- 新增 -->
        <iButton
          v-if="!editType"
          @click="delModelCar"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_DEL
          "
          >{{ $t("LK_DELETE") }}</iButton
        ><!-- 删除 -->
        <iButton
          v-if="!editType"
          @click="editBtn"
          v-permission="
            PROJECTMGT_PROJECTPROGRESSREPORT_MASTERIALCOST_TABLE_EDIT
          "
          >{{ $t("EDITBTN") }}</iButton
        ><!-- 编辑 -->
        <iButton v-if="editType" @click="cancel">{{ $t("QUXIAO") }}</iButton
        ><!-- 取消 -->
        <iButton v-if="editType" @click="save">{{ $t("SAVE") }}</iButton
        ><!-- 保存 -->
        <!-- <iButton v-if="!editType" @click="editTitle">{{$t("编辑表头")}}</iButton> -->
      </template>

      <tableList
        :tableData="tableListData"
        ref="contractForm"
        height="400px"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :index="true"
        indexFixed
        :selectable="editType"
        border
        @handleSelectionChange="handleSelectionChange"
      >
        <!-- 车型项目 -->
        <template slot="cartypeProId" slot-scope="scope">
          <!-- <iSelect
                    v-model="scope.row.cartypeProId"
                    clearable
                    filterable
                    :placeholder="language('QINGSHURU', '请输入')"
                    v-if="scope.row.editType"
                >
                    <el-option
                        v-for="(item,index) in selectOptions1 || []"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </iSelect> -->
          <div v-if="scope.row.editType">
            <span>{{ scope.row.cartypeProName }}</span>
          </div>
          <span v-else style="width: 90%">{{ scope.row.cartypeProName }}</span>
        </template>
        <!-- VSI参考零件号 -->
        <template slot="vsiPartNum" slot-scope="scope">
          <div v-if="scope.row.editType" class="model_dev">
            <div>
              <iInput v-model="scope.row.vsiPartNum"></iInput>
              <!-- <i class="el-icon-search search_btn_lj"></i> -->
            </div>
            <img
              class="model_img"
              @click="pointerNum(scope.row)"
              :src="require('@/assets/images/tongbu.png')"
              alt=""
            />
          </div>
          <span v-else style="width: 90%">{{ scope.row.vsiPartNum }}</span>
        </template>
        <!-- VSI参考零件名称 -->
        <template slot="vsiPartName" slot-scope="scope">
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.vsiPartName"></iInput>
          </div>
          <span v-else style="width: 90%">{{ scope.row.vsiPartName }}</span>
        </template>
        <!-- VW Set -->
        <template slot="vwSet" slot-scope="scope">
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.vwSet"></iInput>
          </div>
          <span v-else style="width: 90%">{{ scope.row.vwSet }}</span>
        </template>
        <!-- VSI参考模块 -->
        <template slot="vsiModel" slot-scope="scope">
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.vsiModel"></iInput>
          </div>
          <span v-else style="width: 90%">{{ scope.row.vsiModel }}</span>
        </template>
        <!-- VSI-单价 -->
        <template slot="vsiPrice" slot-scope="scope">
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.vsiPrice" type="number"></iInput>
          </div>
          <span v-else style="width: 90%">{{
            $postThousandth(scope.row.vsiPrice)
          }}</span>
        </template>
        <!-- VSI-数量 -->
        <template slot="vsiNum" slot-scope="scope">
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.vsiNum" type="number"></iInput>
          </div>
          <span v-else style="width: 90%">{{ scope.row.vsiNum }}</span>
        </template>
        <!-- VSI-整车 -->
        <template slot="vsiCar" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.vsiCar)
          }}</span>
        </template>
        <!-- 定点零件号 -->
        <template slot="nomiPartNum" slot-scope="scope">
          <div v-if="scope.row.editType" class="model_dev">
            <div>
              <iInput v-model="scope.row.nomiPartNum"></iInput>
              <i
                class="el-icon-search search_btn_lj"
                @click="showPartDialog(scope.row)"
              ></i>
            </div>
            <img
              class="model_img"
              @click="pointerRefresh(scope.row)"
              :src="require('@/assets/images/tongbu.png')"
              alt=""
            />
          </div>
          <span v-else style="width: 90%">{{ scope.row.nomiPartNum }}</span>
        </template>
        <!-- 定点A价 -->
        <template slot="nomiAPrice" slot-scope="scope">
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.nomiAPrice" type="number"></iInput>
          </div>
          <span v-else style="width: 90%">{{
            $postThousandth(scope.row.nomiAPrice)
          }}</span>
        </template>
        <!-- 定点-整车 -->
        <template slot="nomiCar" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.nomiCar)
          }}</span>
        </template>

        <!-- 年降 -->
        <template slot="ltcRate" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.ltcRate)
          }}</span>
        </template>
        <!-- 年降（SOP+1） -->
        <template slot="firstAnnualPrice" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.firstAnnualPrice)
          }}</span>
        </template>
        <!-- '年降（SOP+2） -->
        <template slot="secondAnnualPrice" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.secondAnnualPrice)
          }}</span>
        </template>
        <!-- 年降（SOP+3） -->
        <template slot="thirdAnnualPrice" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.thirdAnnualPrice)
          }}</span>
        </template>

        <!-- 定点供应商 -->
        <template slot="nomiSupplier" slot-scope="scope">
          <!-- <el-select
                    v-model="scope.row.nomiSupplier"
                    clearable
                    filterable
                    :placeholder="language('QINGSHURU', '请输入')"
                    v-if="scope.row.editType"
                >
                    <el-option
                        v-for="(item,index) in pointerSupplier || []"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.nomiSupplier"></iInput>
          </div>
          <span v-else style="width: 90%">{{ scope.row.nomiSupplier }}</span>
        </template>
        <!-- 科室 -->
        <template slot="dept" slot-scope="scope">
          <!-- <el-select
                    v-model="scope.row.dept"
                    clearable
                    filterable
                    :placeholder="language('QINGSHURU', '请输入')"
                    v-if="scope.row.editType"
                >
                    <el-option
                        v-for="(item,index) in deptList || []"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
          <div v-if="scope.row.editType">
            <iInput v-model="scope.row.dept"></iInput>
          </div>
          <span v-else style="width: 90%">{{ scope.row.dept }}</span>
        </template>
        <!-- 模具预算 -->
        <template slot="modelBudget" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.modelBudget)
          }}</span>
        </template>
        <!-- 定点模具费用 -->
        <template slot="nomiModelCost" slot-scope="scope">
          <span style="width: 90%">{{
            $postThousandth(scope.row.nomiModelCost)
          }}</span>
        </template>
      </tableList>
      <iPagination
        v-update
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>

    <!-- 下载上传模板 -->
    <uploadDialog
      v-if="uploadDialogVisible.dialogVisible"
      :uploadDialogVisible="uploadDialogVisible"
      @clearUpload="clearUploadFunc"
    >
    </uploadDialog>

    <!-- 刷新 -->
    <refreshDialog
      v-if="refreshDialogVisible.dialogVisible"
      :refreshDialogVisible="refreshDialogVisible"
      @clearRefresh="clearRefreshFunc"
    >
    </refreshDialog>

    <!-- 上传下载接口 -->
    <uploadRequest
      v-if="uploadRequestVisible.dialogVisible"
      :uploadRequestVisible="uploadRequestVisible"
      @clearuploadRequestVisible="clearuploadRequestVisibleFunc"
    >
    </uploadRequest>

    <!-- 删除 -->
    <delCarModel
      v-if="delDialogVisible.dialogVisible"
      :delDialogVisible="delDialogVisible"
      @clearDel="clearDelFunc"
      @submit="saveModelCar"
    ></delCarModel>

    <!-- 零件 -->
    <partDialog
      v-if="partDialogVisible.dialogVisible"
      :partDialogVisible="partDialogVisible"
      @cancalCommit="cancalCommit"
      @commit="commitPart"
    ></partDialog>

    <!-- 格式校验错误 -->
    <rulesError
      :errorList="errorList"
      v-if="rulesErrorVisible.dialogVisible"
      :rulesErrorVisible="rulesErrorVisible"
      @close="rulesClose"
    ></rulesError>
  </div>
</template>

<script>
import {
  iSelect,
  iPage,
  iSearch,
  iInput,
  iCard,
  iButton,
  iFormGroup,
  iFormItem,
  iLabel,
  iPagination,
  iMessage,
  iMessageBox,
  iMultiLineInput,
} from "rise";
import tableList from "@/components/commonTable";
import { getSelectCarType } from "@/api/project";
import {
  modifyCalculationModelVSI,
  getProjectProgressReportDetail,
  createProjectProgressReport,
  modifyProjectProgressReport,
  removeProjectProgressReport,
  getDefaultCarTypePro,
  getCalculationModelVSI,
  downloadFile,
  uploadFile,
  getvmSetList,
  refreshNomiPartNum,
  getPartInfoByVsiNumOrNomiPartNUM,
  exportProjectProgressReport,
} from "@/api/project/projectprogressreport";
import { ModeltableTitle, dataPoint } from "./data";
import refreshDialog from "./materilaCostMaintenance/refreshDialog";
import delCarModel from "./materilaCostMaintenance/delCarModel";
import uploadDialog from "./materilaCostMaintenance/uploadDialog";
import uploadRequest from "./materilaCostMaintenance/uploadRequest";
import partDialog from "./materilaCostMaintenance/partDialog";
import rulesError from "./materilaCostMaintenance/rulesError";
import { getToken } from "@/utils";
import { Mul, numAdd, formatDecimal } from "./util";

export default {
  components: {
    iSelect,
    iSearch,
    iInput,
    iPage,
    iCard,
    iMultiLineInput,
    iButton,
    iFormGroup,
    iFormItem,
    iLabel,
    tableList,
    iPagination,
    refreshDialog,
    delCarModel,
    uploadDialog,
    partDialog,
    uploadRequest,
    rulesError,
  },
  data() {
    return {
      uploadUrl:
        process.env.VUE_APP_PROJECTMGT + "/project-progress-report/uploadFile",
      uploadData: {
        id: "",
      },
      upLoading:false,
      VSIeditType: true,
      searchParams: {
        search1: "",
        search2: [],
        search3: [],
        search4: "",
        search5: "",
      },
      searchParamsOld: {
        search1: "",
        search2: [],
        search3: [],
        search4: "",
        search5: "",
      },
      VSIData: {
        VSIData1: "",
        VSIData2: "",
        VSIData3: "",
        VSIData4: "",
      },
      selectOptions1: [], //车型项目
      selectOptions2: [], //VW SET
      selectOptions3: [
        {
          value: 1,
          label: "FS零件",
          labelEn: "",
        },
        {
          value: 2,
          label: "COP零件",
          labelEn: "",
        },
        {
          value: 3,
          label: "FS Common Sourcing",
          labelEn: "",
        },
      ],

      vsiData: {
        objectVSI1: "",
        objectVSI2: "",
        objectVSI3: "",
        objectVSI4: "",
      },

      //表格
      tableListDataOld: [],
      tableListData: [],
      tableTitle: [],
      dataPoint,
      loading: false,

      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100, 300], //每页条数切换
        currPage: 1, //当前页
        layout: "sizes, prev, pager, next, jumper",
      },

      refreshDialogVisible: {
        dialogVisible: false,
      },
      delDialogVisible: {
        dialogVisible: false,
      },
      uploadDialogVisible: {
        dialogVisible: false,
      },
      partDialogVisible: {
        dialogVisible: false,
        dataList: {},
      },
      uploadRequestVisible: {
        dialogVisible: false,
      },
      rulesErrorVisible: {
        dialogVisible: false,
      },

      selectList: [], //勾选数组
      editIdArr: [], //勾选id数据
      editType: false, //新增编辑状态

      pointerSupplier: [], //定点供应商
      deptList: [], //科室
      CalculationModelVSIId: "",
      editInforType: 1,

      errorList: [], //校验失败
    };
  },
  created() {
    this.getSearchList();

    this.tableTitle = ModeltableTitle(this);
  },
  methods: {
    getToken,
    exportExcel() {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      exportProjectProgressReport({
        carTypeProId: this.searchParams.search1,
        list: [...this.selectList],
      });
    },
    commitPart(val) {
      //选择零件后同步表格数据
      this.partDialogVisible.dialogVisible = false;
      var editData = this.tableListData[val.oldList.index];
      this.dataPoint.forEach((e) => {
        editData[e.props] = val.newList[e.props];
      });
    },
    pointerNum(val) {
      //VSI参考零件号
      if (val.vsiPartNum) {
        getPartInfoByVsiNumOrNomiPartNUM({
          cartypeProId: this.searchParams.search1,
          nomiPartNum: "",
          vsiPartNum: val.vsiPartNum,
        }).then((res) => {
          console.log(res);
          if (res.result) {
            this.tableTitle.forEach((e) => {
              if (e.props == "cartypeProId") {
                // 没有返回的时候,使用行内现有的
                val[e.props] = res.data[e.props] || val[e.props];
              } else {
                val[e.props] = res.data[e.props];
              }
            });
          }
        });
      } else {
        iMessage.error(this.$t("请输入VSI参考零件号"));
      }
    },
    pointerRefresh(val) {
      if (val.nomiPartNum) {
        getPartInfoByVsiNumOrNomiPartNUM({
          cartypeProId: this.searchParams.search1,
          nomiPartNum: val.nomiPartNum,
          vsiPartNum: "",
        }).then((res) => {
          console.log(res);
          if (res.result) {
            this.dataPoint.forEach((e) => {
              val[e.props] = res.data[e.props];
            });
          }
        });
      } else {
        iMessage.error(this.$t("请输入或选择参考零件号"));
      }
    },
    inputVSI(val) {
      if (
        this.VSIData.VSIData2 &&
        this.VSIData.VSIData3 &&
        this.VSIData.VSIData4
      ) {
        this.VSIData.VSIData1 = numAdd(
          numAdd(Number(this.VSIData.VSIData2), Number(this.VSIData.VSIData3)),
          Number(this.VSIData.VSIData4)
        ).toString();
      }
    },
    editVSI() {
      if (this.searchParams.search1) {
        this.VSIeditType = false;
      } else {
        iMessage.warn("请选择车型项目");
      }
    },
    cancelVSI() {
      iMessageBox(
        this.language("SHIFOUQUXIAOBIANJI", "是否取消编辑？"),
        this.language("LK_WENXINTISHI", "温馨提示"),
        {
          confirmButtonText: this.language("QUEREN", "确认"),
          cancelButtonText: this.language("QUXIAO", "取消"),
        }
      )
        .then((res) => {
          this.VSIeditType = true;
          this.getVSIData(this.searchParams.search1);
        })
        .catch((res) => {});
    },
    saveVSI() {
      modifyCalculationModelVSI({
        calcalationModel: this.VSIData.VSIData4,
        calculationModelVsi: this.VSIData.VSIData1,
        cartypeProId: this.searchParams.search1,
        // cartypeProId:this.searchParams.search1[0],
        id: this.CalculationModelVSIId ? this.CalculationModelVSIId : "",
        motorGearbox: this.VSIData.VSIData2,
        vorlogistic: this.VSIData.VSIData3,
      })
        .then((e) => {
          if (e.result) {
            iMessage.success(e.desZh);
            this.VSIeditType = true;
            this.getVSIData(this.searchParams.search1);
          } else {
            iMessage.error(e.desZh);
          }
        })
        .catch((e) => {
          iMessage.error(e.desZh);
        });
    },
    sure() {
      this.page.currPage = 1;
      // 若有定点起止时间将其拆分成两个字段
      this.getVSIData(this.searchParams.search1);

      console.log(111111);

      this.getTableList();

      console.log(22222);
    },
    reset() {
      this.searchParams = _.cloneDeep(this.searchParamsOld);

      // 若有定点起止时间将其拆分成两个字段
      this.getVSIData(this.searchParams.search1);
      this.getTableList();
    },
    getSearchList() {
      getSelectCarType().then((res) => {
        if (res?.result) {
          this.selectOptions1 = res.data.map((item) => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProjectZh,
            };
          });
          this.getCarDefault();
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
        }
      });
      getvmSetList({}).then((res) => {
        if (res.result) {
          this.selectOptions2 = res.data;
        }
      });
    },
    getCarDefault() {
      getDefaultCarTypePro().then((res) => {
        console.log(res);
        if (res.result) {
          this.searchParams.search1 = res.data;
          // this.searchParams.search1 = "50024008";
          this.searchParamsOld.search1 = res.data;
          // this.searchParamsOld.search1 = "50024008";
          // this.getVSIData(this.searchParams.search1);

          this.uploadData = {
            // id:"50024008"
            id: this.searchParams.search1,
          };
          this.getVSIData(this.searchParams.search1);
          this.getTableList();
        }
        // this.searchParams.search1 = "2000234171";
        // this.searchParamsOld.search1 = "2000234171";
        // this.getVSIData(this.searchParams.search1);
        // this.getTableList();
      });
    },
    getVSIData(id) {
      getCalculationModelVSI({
        carTypeProId: id,
      }).then((res) => {
        if (res.result && res.data) {
          this.VSIData.VSIData1 = res.data.calculationModelVsi;
          this.VSIData.VSIData2 = res.data.motorGearbox;
          this.VSIData.VSIData3 = res.data.vorlogistic;
          this.VSIData.VSIData4 = res.data.calcalationModel;
          this.CalculationModelVSIId = res.data.id;
        } else {
          this.VSIData.VSIData1 = "";
          this.VSIData.VSIData2 = "";
          this.VSIData.VSIData3 = "";
          this.VSIData.VSIData4 = "";
          this.CalculationModelVSIId = "";
        }
      });
    },
    carModelSearch(val) {
      //选择顶部搜索车型项目
      this.uploadData = {
        id: val,
      };
      console.log(this.uploadData);
      // this.getVSIData(val);//获取VSI
      // this.getTableList();//获取顶部table表格
    },
    cancalCommit() {
      //关闭零件号弹窗
      this.partDialogVisible.dialogVisible = false;
    },
    showPartDialog(val) {
      //选择零件号弹窗
      this.partDialogVisible.dialogVisible = true;
      this.partDialogVisible.dataList = val;
    },
    save() {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      var that = this;
      if (this.editInforType == 1) {
        //新增
        this.$refs.contractForm.$refs.commonTableForm.validate((valid) => {
          if (valid) {
            createProjectProgressReport({
              //新增
              ...this.tableListData[0],
              // vsiNum:Number(this.tableListData[0].vsiNum)
            }).then((res) => {
              that.$refs.contractForm.$refs.commonTable.clearSelection();
              console.log(1111);
              that.cancelEdit("save");
            });
            // this.$refs.contractForm.$refs.commonTableForm.clearValidate()
          }
        });
      } else if (this.editInforType == 2) {
        //编辑
        this.$refs.contractForm.$refs.commonTableForm.validate((valid) => {
          if (valid) {
            console.log(this.selectList);
            modifyProjectProgressReport(
              //新增
              this.selectList
              // vsiNum:Number(this.tableListData[0].vsiNum)
            ).then((res) => {
              that.$refs.contractForm.$refs.commonTable.clearSelection();
              console.log(2222);
              that.cancelEdit("save");
            });

            // this.$refs.contractForm.$refs.commonTableForm.clearValidate()
          }
        });
      }
    },
    cancelEdit(val) {
      if (val == "save") {
        this.getTableList();
      } else if (val == "del") {
        this.getTableList();
        // this.tableListData.forEach(e=>{
        //     if(e.editType){
        //         e.editType = false;
        //     }
        // })
      }
    },
    add(otherObj = {}) {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      this.editType = true;
      const time = new Date().getTime();
      const newItemList = this.tableTitle.map((item) => {
        return item.props;
      });
      const newItem = {};
      newItemList.map((item) => {
        newItem[item] = "";
      });
      var cartypePro = this.selectOptions1.find((e) => {
        if (e.value == this.searchParams.search1) {
          return e;
        }
      });
      this.tableListData.unshift({
        ...newItem,
        editType: true,
        ...otherObj,
        time,
        cartypeProName: cartypePro.label,
        cartypeProId: this.searchParams.search1,
        calculationModelVsiId: this.CalculationModelVSIId,
      });

      this.$refs.contractForm.$refs.commonTable.clearSelection();
      this.$refs.contractForm.$refs.commonTable.toggleRowSelection(
        this.tableListData[0],
        true
      );

      this.editInforType = 1;
    },
    cancel() {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      //取消
      iMessageBox(
        this.language("SHIFOUQUXIAOBIANJI", "是否取消编辑？"),
        this.language("LK_WENXINTISHI", "温馨提示"),
        {
          confirmButtonText: this.language("QUEREN", "确认"),
          cancelButtonText: this.language("QUXIAO", "取消"),
        }
      )
        .then((res) => {
          this.getTableList();
        })
        .then((res) => {
          this.editIdArr = [];
          this.editType = false;
          this.$refs.contractForm.$refs.commonTable.clearSelection();
          // this.$refs.contractForm.$refs.commonTableForm.clearValidate()

          this.cancelEdit("cancel");
        })
        .catch((res) => {});
    },
    editBtn() {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      if (this.selectList.length > 0) {
        this.editType = true;
        var changeArrayList = [];
        this.selectList.forEach((item) => {
          item.editType = true;
          changeArrayList.push(item.id);
        });
        this.editIdArr = changeArrayList;
        this.editInforType = 2;
      } else {
        iMessage.error("请选择需要修改数据！");
      }
    },
    getTableList() {
      this.loading = true;
      var data = {};
      // if(this.searchParams.search4.split(",").length <= 1){
      //     data = {
      //         cartypeProIdList:this.searchParams.search1,
      //         nomiPartNum:this.searchParams.search4,
      //         partPrjTypeList:this.searchParams.search3,
      //         vsiPartName:this.searchParams.search5,
      //         vwSetList:this.searchParams.search2,
      //         current:this.page.currPage,
      //         size:this.page.pageSize,
      //     }
      // }else{
      var nomiValueDataList = [];
      if (this.searchParams.search4 !== "") {
        nomiValueDataList = this.searchParams.search4.split(",");
      }
      data = {
        cartypeProIdList: [this.searchParams.search1],
        nomiPartNumList: nomiValueDataList,
        partPrjTypeList: this.searchParams.search3,
        vsiPartName: this.searchParams.search5,
        vwSetList: this.searchParams.search2,
        current: this.page.currPage,
        size: this.page.pageSize,
      };
      // }

      getProjectProgressReportDetail(data)
        .then((res) => {
          console.log(res);
          if (res.result) {
            this.page.currPage = res.pageNum;
            this.page.pageSize = res.pageSize;
            this.page.totalCount = res.total;

            this.tableListDataOld = res.data;
            this.tableListDataOld.forEach((e) => {
              if (e.vsiNum) {
                e.vsiNum = e.vsiNum.split(".")[0];
              }
            });
            this.tableListData = _.cloneDeep(this.tableListDataOld);
            this.editType = false;
          } else {
            iMessage.error(res.desZh);
            this.editType = false;
          }
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.editType = false;
          iMessage.error(res.desZh);
        });
    },
    clearUploadFunc() {
      this.uploadDialogVisible.dialogVisible = false;
    },
    downModel() {
      // this.uploadRequestVisible.dialogVisible = true;
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      downloadFile({
        // carTypeProId:"50024008"
        carTypeProId: this.searchParams.search1,
      });
    },
    uploadSuccess(res, file) {
      this.upLoading = false
      if (res.code == 200 && res.result) {
        iMessage.success(this.$t("SHANGCHUANCHENGGONG"));
        this.page.pageSize = 10;
        this.page.currPage = 1;
        this.getTableList();
      } else {
        if (res.data == null) {
          iMessage.error(res.desZh);
        } else {
          this.errorList = res.data;
          this.rulesErrorVisible.dialogVisible = true;
        }
      }
    },
    uploadProgress() {},
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        iMessage.error("上传文件大小不能超过 20MB!");
      }else{
        this.upLoading = true
      }
      return isLt2M;
    },
    handleExceed(files, fileList) {
      iMessage.warn(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    batchUpload() {
      if (this.VSIData.VSIData1) {
        this.$refs.clickBtn.$el.click();
      } else {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
      }
    },
    clearDelFunc() {
      this.delDialogVisible.dialogVisible = false;
    },
    saveModelCar() {
      const ids = [];
      this.selectList.forEach((e) => {
        ids.push(e.id);
      });
      removeProjectProgressReport(ids).then((res) => {
        if (res.result) {
          this.cancelEdit("del");
          this.delDialogVisible.dialogVisible = false;
        } else {
        }
      });
    },
    delModelCar() {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      if (this.selectList.length > 0) {
        this.delDialogVisible.dialogVisible = true;
      } else {
        iMessage.error("请选择需要删除的数据");
      }
    },
    clearRefreshFunc() {
      this.refreshDialogVisible.dialogVisible = false;
    },
    refresh() {
      if (!this.VSIData.VSIData1) {
        iMessage.error(this.$t("请先编辑保存VSI数据"));
        return false;
      }
      // this.refreshDialogVisible.dialogVisible = true;
      if (this.selectList.length < 1) {
        iMessage.error(this.$t("LK_QINGXUANZEZHISHAOYITIAOSHUJU"));
      } else {
        const data = [];
        this.selectList.forEach((e) => {
          e.key =
            "vsiPartNum" +
            e.vsiPartNum +
            "nomiPartNum" +
            e.nomiPartNum +
            "cartypeProId" +
            this.searchParams.search1;
          data.push({
            vsiPartNum: e.vsiPartNum,
            nomiPartNum: e.nomiPartNum,
            cartypeProId: this.searchParams.search1,
          });
        });

        refreshNomiPartNum(data).then((res) => {
          if (res?.result) {
              this.getTableList();
          }else{
            iMessage.error(res.desZh)
          }
        });
      }
    },
    clearuploadRequestVisibleFunc() {
      this.uploadRequestVisible.dialogVisible = false;
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.currPage = 1;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.page.currPage = val;
      this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  display: flex;
  word-wrap: break-word;
  align-items: center;
  line-height: normal !important;
  .flex-align-center {
    width: 100%;
  }
  span {
    width: 100%;
    word-wrap: break-word;
    line-height: 20px !important;
  }
}

.search_btn_lj {
  position: absolute;
  right: 30px;
  top: 12px;
  font-size: 18px;
  cursor: pointer;
}

.model_dev {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.model_img {
  width: 20px;
  height: 15px;
  margin-left: 5px;
  cursor: pointer;
}
.upload-demo {
  margin-left: 10px;
}

.format_div {
  width: 100%;
  height: 2.1875rem;
  background: #f5f7fa;
  line-height: 2.1875rem;
  padding-left: 16px;
  padding-right: 16px;
  color: #c0c4cc;
}

::v-deep .el-form-item__content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: inherit;
}
</style>