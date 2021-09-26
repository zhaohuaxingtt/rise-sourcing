<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-09-26 17:08:28
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\materialGroup\index.vue
-->
<template>
  <iCard
    :title="language('CAILIAOZUDINGWEI', '材料组定位')"
    class="margin-top20"
    id="materialGroup"
    v-loading="pageLoading"
  >
    <template slot="header-control">
      <template v-if="isEdit">
        <iButton @click="edit">{{ language("BIANJI", "编辑") }}</iButton>
      </template>
      <template v-else>
        <iButton @click="edit">{{ language("QUXIAO", "取消") }}</iButton>
        <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton>
        <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
      </template>
      <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
    </template>
    <!-- 材料组定位/材料组占比情况 -->
    <div>
      <div class="cardTitle flex-align-center">
        <icon symbol name="iconcailiaozudingwei" class="font30"></icon>
        <span>{{ language("CAILIAOZUDINGWEI", "材料组定位") }}</span>
      </div>
      <piecewise
        :materialGroupPosition="materialGroup.materialGroupPosition"
        @handleChartClick="handleChartClick"
      ></piecewise>
    </div>
    <!-- 业务影响度特征分布情况 供应复杂度特征分布 -->
    <el-row gutter="50" class="margin-top35">
      <el-col :span="8">
        <div class="cardTitle flex-align-center">
          <icon
            symbol
            name="iconyewuyingxiangdutezhengfenbu"
            class="font30"
          ></icon>
          <span>{{ language("YWYXDTZFBQK", "业务影响度特征分布情况") }}</span>
        </div>
        <tableList
          class="margin-top20"
          :tableData="materialGroup.kpiDistribution.importantFeaturesMoneys"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        />
      </el-col>
      <el-col :span="8">
        <div class="cardTitle flex-align-center">
          <icon
            symbol
            name="icongongyingfuzadutezhengfenbu"
            class="font30"
          ></icon>
          <span>{{ language("YSFZDTZFBQK", "供应复杂度特征分布") }}</span>
        </div>
        <tableList
          class="margin-top20"
          :tableData="materialGroup.kpiDistribution.importantFeaturesRisk"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :selection="false"
        />
      </el-col>
      <el-col :span="8">
        <div class="cardTitle flex-align-center">
          <icon
            symbol
            name="iconcailiaozuzhanbiqingkuang"
            class="font30"
          ></icon>
          <span>{{ language("CLZZBQK", "材料组占比情况") }}</span>
          <iSelect
            style="width:180px"
            class="margin-left20"
            v-model="deptId"
            @change="handleChangeDep"
          >
            <el-option
              :value="item.existShareId"
              :label="item.existShareName"
              v-for="(item, index) in deptData"
              :key="index"
            ></el-option>
          </iSelect>
        </div>
        <ring :ringData="materialGroup.materialGroupProportionList"></ring>
      </el-col>
    </el-row>
    <!-- 战略方向/采购策略 -->
    <div class="cardTitle flex-align-center margin-top35">
      <icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
      <span>{{ language("ZLFXCGCL", "战略方向/采购策略") }}</span>
    </div>
    <div class="flex-between-center">
      <div
        class="problem"
        v-for="(item, index) in materialGroup.problemAndSuggestionList"
        :key="index"
      >
        <el-tooltip :content="item.problemName" placement="top" effect="light">
          <p class="problemTitle">{{ item.problemName }}</p>
        </el-tooltip>
        <iInput
          :disabled="isEdit"
          type="textarea"
          rows="2"
          resize="none"
          v-model="item.suggestContent"
        ></iInput>
      </div>
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iPagination,
  iSelect,
  iButton,
  iMessage,
  iMessageBox,
  icon,
  iInput,
} from "rise";
import tableList from "@/views/partsrfq/externalAccessToAnalysisTools/components/tableList.vue";
import { tableTitle } from "./data";
import {
  materialGroupPosition,
  saveMaterialGroupScheme,
  resettingSuggest,
} from "@/api/categoryManagementAssistant/marketData/materialGroup";
import ring from "./ring";
import piecewise from "./piecewise";
import { downloadPdfMixins } from "@/utils/pdf";
import resultMessageMixin from "@/utils/resultMessageMixin";
import { getDeptData } from "@/api/kpiChart";
export default {
  mixins: [downloadPdfMixins, resultMessageMixin],
  components: {
    iCard,
    tableList,
    iButton,
    icon,
    iInput,
    ring,
    piecewise,
    iSelect,
  },
  props: {
    searchCriteria: {
      type: Object,
      default: () => {},
    },
  },
  computed: {},
  data() {
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      pageLoading: false,
      isEdit: true,
      selectData: [],
      categoryCode: "",
      categoryName: "",
      materialGroup: {
        kpiDistribution: {
          importantFeaturesMoneys: [],
          importantFeaturesRisk: [],
        },
        materialGroupPosition: {
          centerPoint: {},
          currentPoint: {},
          otherPointList: [],
        },
        problemAndSuggestionList: [],
        materialGroupProportionList: [],
      },
      deptData: [], //科室数据
      deptId: "", //科室id
    };
  },
  created() {
    this.categoryCode = this.$store.state.rfq.categoryCode;
    this.categoryName = this.$store.state.rfq.categoryName;
  },
  mounted() {
    this.getMaterialGroup();
    this.getDeptData();
  },
  watch: {
    "$store.state.rfq.categoryCode"() {
      this.categoryCode = this.$store.state.rfq.categoryCode;
      this.categoryName = this.$store.state.rfq.categoryName;
      this.getMaterialGroup();
    },
  },
  methods: {
    handleSelectionChange(list) {
      this.selectData = list;
    },
    // 获取当前用户科室
    getDeptData() {
      getDeptData({}).then((res) => {
        if (res.data) {
          this.deptData = res.data;
        }
      });
    },
    // 切换科室
    handleChangeDep(newDep) {
      this.deptId = newDep;
      this.getMaterialGroup();
    },
    getMaterialGroup() {
      this.tableLoading = true;
      let data = {
        materialGroupCode: this.categoryCode,
        userId: this.$store.state.permission.userInfo.id,
        departId: this.deptId,
      };
      materialGroupPosition(data)
        .then((res) => {
          if (res.data) {
            this.tableLoading = false;
            this.materialGroup = res.data;
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // 保存
    async save() {
      this.isEdit = true;
      this.pageLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: "materialGroup",
        pdfName: `品类管理助手_材料组定位_${
          this.$store.state.rfq.categoryName
        }_${window.moment().format("YYYY-MM-DD")}_`,
      });
      let params = {
        materialGroupCode: this.categoryCode,
        materialGroupName: this.categoryName,
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        schemeName: "",
        reportUrl: resFile.downloadUrl,
        problemAndSuggestionList: this.materialGroup.problemAndSuggestionList,
      };
      saveMaterialGroupScheme(params)
        .then((res) => {
          this.resultMessage(res);
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 编辑
    edit() {
      this.isEdit = !this.isEdit;
    },
    // 重置
    async reset() {
      try {
        this.newDep = "";
        const req = {
          materialGroupCode: this.categoryCode,
        };
        const res = await resettingSuggest(req);
        this.materialGroup.problemAndSuggestionList = res.data;
        this.resultMessage(res, () => {
          this.getMaterialGroup();
        });
      } finally {
        this.tableLoading = false;
      }
    },
    // 点击echarts图 获取数据
    handleChartClick(code) {
      this.categoryCode = code;
      this.getMaterialGroup();
    },
  },
};
</script>

<style lang="scss">
.el-table .el-table__body-wrapper {
  min-height: auto;
}
.cardTitle {
  padding-bottom: 10px;
  border-bottom: 1px solid #ced4e1;
  span {
    font-size: 18px;
    color: $color-black;
    font-weight: bold;
    margin-left: 15px;
  }
}
.problem {
  width: 19%;
  margin-top: 30px;
  > p {
    font-size: 16px;
    color: #333333;
    margin-bottom: 10px;
    font-weight: bold;
  }
  input {
    color: #6e7c97;
    font-size: 14px;
  }
}
.problemTitle {
  @include text_;
}
</style>
