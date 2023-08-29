  <template>
  <div>
    <iSearch @sure="getTableList" @reset="handleSearchReset('ruleForm')">
      <el-form>
        <iFormItem :label="language('BIDDING_RFQ/XIANGMUBIANHAO', 'RFQ/项目编号')" prop="rfqCode">
          <iInput clearable :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.rfqCode"></iInput>
        </iFormItem>
        <iFormItem :label="language('BIDDING_RFQ/XIANGMUMINGCHENG', 'RFQ/项目名称')" prop="rfqName">
          <iInput clearable :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.rfqName"></iInput>
        </iFormItem>
        <iFormItem :label="language('BIDDING_XIANGMULEIXING', '项目类型')" prop="projectType">
          <iSelect ref='select' v-model="ruleForm.projectType" clearable @keydown.native.capture.enter.stop.prevent>
            <el-option
              v-for="(item, index) in projectType"
              :key="index"
              :value="item.value"
              :label="language(item.key, item.label)"
            >
            </el-option>
          </iSelect>
        </iFormItem>
        <iFormItem :label="language('BIDDING_BAOJIALEIXING', '报价类型')" prop="quoteType">
          <iSelect ref='select' v-model="ruleForm.quoteType" clearable @keydown.native.capture.enter.stop.prevent>
            <el-option
              v-for="(item, index) in quoteType"
              :key="index"
              :value="item.value"
              :label="language(item.key, item.label)"
            >
            </el-option>
          </iSelect>
        </iFormItem>
        <iFormItem :label="language('BIDDING_JINGJIALEIXING', '竞价类型')" prop="biddingType">
          <iSelect ref='select' v-model="ruleForm.biddingType" clearable @keydown.native.capture.enter.stop.prevent>
            <el-option
              v-for="(item, index) in biddingType"
              :key="index"
              :value="item.value"
              :label="language(item.key, item.label)"
            >
            </el-option>
          </iSelect>
        </iFormItem>
        <iFormItem :label="language('BIDDING_BENLUNRFQGUANBISHIJIAN', '本轮RFQ关闭时间')" prop="rfqEndTime">
          <iDatePicker
            clearable
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd 23:59:59"
            type="date"
            :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
            v-model="ruleForm.rfqEndTime"
          />
        </iFormItem>
        <iFormItem :label="language('BIDDING_KAISHISHIJIAN', '开始时间')" prop="openTenderTime">
          <iDatePicker
            clearable
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
            v-model="ruleForm.openTenderTime"
          />
        </iFormItem>
        <iFormItem :label="language('BIDDING_JIESHUSHIJIAN', '结束时间')" prop="biddingBeginTime">
          <iDatePicker
            clearable
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="language('BIDDING_QINGXUANZE', '请选择')"
            v-model="ruleForm.biddingBeginTime"
            :picker-options="biddingBeginTimeOptions"
          />
        </iFormItem>
        <iFormItem :label="language('BIDDING_ZHUANGTAI', '状态')" prop="biddingStatus">
          <iSelect ref='select' v-model="ruleForm.biddingStatus" clearable @keydown.native.capture.enter.stop.prevent>
            <el-option
              v-for="(item, index) in biddingStatus"
              :key="index"
              :value="item.value"
              :label="language(item.key, item.label)"
            >
            </el-option>
          </iSelect>
        </iFormItem>
        <iFormItem :label="language('BIDDING_CHUANGJIANREN', '创建人')" prop="createName">
          <iInput clearable :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.createName"></iInput>
        </iFormItem>
        <iFormItem :label="language('BIDDING_LINGJIANHAO', '零件号')" prop="partNumber">
          <iInput clearable :placeholder="language('BIDDING_QINGSHURU', '请输入')" v-model="ruleForm.partNumber"></iInput>
        </iFormItem>
      </el-form>
    </iSearch>
    <iCard class="margin-top7">
        <div class="form-top1">
          <div>
            <h2>{{language('BIDDING_XIANGMULIEBIAO', '项目列表')}}</h2>
          </div>
          <div>
            <iButton @click="showAddManual = true">{{language('BIDDING_XINJIANXIANGMU', '新建项目')}}</iButton>
            <iButton
              @click="handleDelete"
              :disabled="selectedTableData.length === 0"
              >{{language('BIDDING_SHANCHU', '删除')}}</iButton
            >
          </div>
        </div>
        <commonTable
          ref="tableDataForm"
          :tableTitle="projectTableTitle"
          :tableLoading="tableLoading"
          :tableData="tableListData"
          maxHeight="570px"
          @handleSelectionChange="handleSelectionChange"
        >
        <!-- 报价类型 -->
          <template slot="quoteType" slot-scope="scope">
            <span>
              {{scope.row['quoteType'] === '01' ? language('BIDDING_KAIBIAO','开标') 
              : scope.row['quoteType'] === '02' ? language('BIDDING_YINGSHI','英式') 
              : scope.row['quoteType'] === '03' ? language('BIDDING_HESHI','荷氏') : ''}}
            </span>
          </template>

          <!-- 序号 -->
          <template slot="index" slot-scope="scope">
            <span>{{ scope.row.index + 1 }}</span>
          </template>

          <!-- 项目编号 -->
          <template slot="projectCode" slot-scope="scope">
            <span style="cursor: pointer; color:blue" @click="handleGoDetail(scope.row)">{{scope.row['projectCode']}}</span>
          </template>

          <!-- 项目名称 -->
          <template slot="projectName" slot-scope="scope">
            <span>{{scope.row['projectName'] || scope.row['rfqName']}}</span>
          </template>

          <!-- 项目类型 -->
          <template slot="projectType" slot-scope="scope">
            <span>
              {{scope.row['projectType'] === '01' ? language('BIDDING_ZS','正式')
              : scope.row['projectType'] === '02' ? language('BIDDING_CS','测试') : ''}}
              </span>
          </template>

          <!-- 状态 -->
          <template slot="biddingStatus" slot-scope="scope">
            <span>{{status(scope.row['biddingStatus'])}}</span>
          </template>

          <!-- 创建日期 -->
          <template slot="createDate" slot-scope="scope">
            <span>{{scope.row['createDate'] ? scope.row['createDate'].substring(0, 10) : ''}}</span>
          </template>

          <!-- 竞价起止日期 -->
          <template slot="biddingBeginTime" slot-scope="scope">
            <span>{{scope.row['quoteType'] === '01' ? '' : (scope.row['biddingBeginTime'] ? scope.row['biddingBeginTime'].substring(0, 16).replace('T', ' ') : '')}}
              <br />
              {{(scope.row['roundType'] === '05' && scope.row['quoteType'] === '03') || scope.row['quoteType'] === '01'
                ? ''
                : (scope.row['biddingEndTime'] ? scope.row['biddingEndTime'].substring(0, 16).replace('T', ' ') : '')}}
            </span>
          </template>

           <!-- 报价截止日期 -->
          <template slot="pricingDeadline" slot-scope="scope">
            <span>{{scope.row['pricingDeadline'] ? scope.row['pricingDeadline'].substring(0, 16).replace('T', ' ') : ''}}</span>
          </template>

           <!-- 开标时间 -->
          <template slot="openTenderTime" slot-scope="scope">
            <span>{{scope.row['roundType'] === '03' ? '' : (scope.row['openTenderTime'] ? scope.row['openTenderTime'].substring(0, 16).replace('T', ' ') : '')}}</span>
          </template>
        </commonTable>

        <iPagination
          v-update
          @current-change="handleCurrentChange($event, query)"
          @size-change="handleSizeChange($event, query)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :prev-text="language('BIDDING_SHANGYIYE','上一页')"
          :next-text="language('BIDDING_XIAYIYE','下一页')"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.total"
        />

        <addManual :show.sync="showAddManual" />
      </iCard>
  </div>
</template>
<script>
import {
  iSearch,
  iInput,
  iSelect,
  iFormItem,
  iCard,
  iButton,
  iLabel,
  iPagination,
  iDatePicker,
} from "rise";
import {
  projectTableTitle,
  projectType,
  quoteType,
  biddingType,
  biddingStatus,
  infoForm,
} from "./data";
import addManual from "./addManual.vue";
import { queryProjectByPage, deleteProject } from "@/api/bidding/bidding";
import commonTable from "@/components/biddingComponents/commonTable";
import iTableCustom from "@/components/biddingComponents/iTableCustom";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {
    iSearch,
    iInput,
    iSelect,
    iFormItem,
    iCard,
    iButton,
    iLabel,
    iPagination,
    // iTableCustom,
    iDatePicker,
    commonTable,
    addManual,
  },
  data() {
    return {
      ruleForm: { ...infoForm },
      rules: {},
      selectedTableData: "",
      projectTableTitle,
      projectType,
      quoteType,
      biddingType,
      biddingStatus,
      tableLoading: false,
      showAddManual: false,
      tableListData: [],
      formData: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.getTableList();
    // 绑定enter事件
    this.enterKeyup();
  },
  destroyed() {
    // 销毁enter事件
      this.enterKeyupDestroyed();
  },
  computed: {
    
  },
  watch: {
    "ruleForm.createName"(val) {
      if (val == "") this.ruleForm.createName = null;
    },
    "ruleForm.rfqCode"(val) {
      if (val == "") this.ruleForm.rfqCode = null;
    },
    "ruleForm.rfqName"(val) {
      if (val == "") this.ruleForm.rfqName = null;
    },
    "ruleForm.partNumber"(val) {
      if (val == "") this.ruleForm.partNumber = null;
    },
  },
  methods: {
    enterKey(event) {
      const code = event.keyCode
          ? event.keyCode
          : event.which
              ? event.which
              : event.charCode;
      if (code == 13) {
        console.log(218,this.$refs.select)
        this.$refs.select.blur();
          this.getTableList();
      }
    },
    status(value){
      return {
        '01' : this.language('BIDDING_CAOGAO','草稿'),
        '02' : this.language('BIDDING_DAIJINGJIA','待竞价'),
        '03' : this.language('BIDDING_WEIKAIBIAO','未开标'),
        '04' : this.language('BIDDING_JINGJIAZHONG','竞价中'),
        '05' : this.language('BIDDING_YIKAIBIAO','已开标'),
        '06' : this.language('BIDDING_YIJIESHU','已结束'),
        '07' : this.language('BIDDING_YILIUBIAO','已流标'),
        '08' : this.language('BIDDING_YIZUOFEI','已作废'),
        '09' : this.language('BIDDING_YIQUXIAO','已取消'),
        '10' : this.language('BIDDING_YIFACHU','已发出'),
      }[value]
    },
    enterKeyupDestroyed() {
        document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
        document.addEventListener("keyup", this.enterKey);
    },
    // 查询
    getTableList() {
      this.page.currPage = 1;
      this.query();
    },
    // 重置
    handleSearchReset() {
      this.ruleForm = { ...infoForm }
      this.getTableList();
    },
    handleGoDetail(e) {
      this.$router.push({
        path: `/bidding/project/inquiry/${e.id}`,
      });
      sessionStorage.setItem("projectBack", "back");
    },
    // 删除
    handleDelete() {
      let flag = false;
      const ids = this.selectedTableData.map((item) => {
        if (item.biddingStatus === "01") {
          if (item.roundType === "05") {
            flag = false;
            return item.id;
          } else {
            return (flag = true);
          }
        } else {
          return (flag = true);
        }
      });
      console.log(ids);
      if (flag) {
        return this.$message.error(this.language('BIDDING_ZKXZSGCJQZTW【CG】DXM','只可选择手工创建且状态为【草稿】的项目'));
      }
      this.$confirm(this.language('BIDDING_SFSCXZDXM','是否删除选中的项目？'), this.language('BIDDING_TISHI','提示'), {
        confirmButtonText: this.language('BIDDING_SHI','是'),
        cancelButtonText: this.language('BIDDING_FOU','否'),
        type: "warning",
      })
        .then(() => {
          const param = { ids };
          deleteProject(param)
            .then((res) => {
              this.$message.success(this.language('BIDDING_SHANCHUCHENGGONG','删除成功'));
              this.getTableList();
            })
            .catch(() => {
              this.$message.error(this.language('BIDDING_SHANCHUSHIBAI','删除失败'));
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 表格选中值集
    handleSelectionChange(val) {
      console.log(val);
      this.selectedTableData = val;
    },

    query() {
      this.tableLoading = true;
      let {rfqCode, rfqName, createName, partNumber} = this.ruleForm
      rfqCode = rfqCode && rfqCode.trim()  ? rfqCode.trim() : null
      rfqName = rfqName && rfqName.trim() ? rfqName.trim() : null
      createName = createName && createName.trim() ? createName.trim() : null
      partNumber = partNumber && partNumber.trim() ? partNumber.trim() : null
      this.ruleForm = {...this.ruleForm, rfqCode, rfqName, createName, partNumber}
      let param = {
        ...this.ruleForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      // 分页查询获取项目列表
      queryProjectByPage(param)
        .then((res) => {
          this.tableListData = res.data;
          this.page.total = res.total;
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .card .cardHeader  {
  justify-content: flex-end !important;
  padding-bottom: 0;
  .title{
    display: none !important;
  }
  .rotate{
    margin-bottom: 1.875rem;
  }
}
.form-top {
  display: flex;
  margin-top: -0.8rem;
  /* align-items: center;
  justify-content: space-between; */
  /* margin-bottom: 1.5rem; */
}
.form-top1{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.item ::v-deep {
  display: flex;
  /* margin-right: -6rem; */
  flex-wrap: wrap;
  .el-form-item {
    /* display: flex; */ //平行解开
    width: 220px;
    margin-right: 4rem;
    position: relative;
    .el-form-item__label {
      width: 100%;
      .flex-align-center{
        /* font-weight: 600; */
        font-size: 14px;
        height: 16px;
        margin-bottom: 12px;
      }
    }
    .el-form-item__content {
      width: 100%;
      line-height:35px;
      .el-input{
        font-size: 14px;
      }
    }
    /* 禁用样式 */
    .el-input.is- .el-input__inner {
      background-color: #f4f5f6;
      color: #000;
      text-align: center;
    }
  }
}
::v-deep .el-icon-arrow-up:before {
  font-weight: bold;
}
.item-button{
  flex: none;
  margin-top: 1.5rem;
  .item-button-child2{
    margin-left: 20px;
  }
}

::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
    .el-form-item__content {
      line-height: revert;
    }
  }
}
</style>
