<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 10:09:36
 * @LastEditTime: 2021-03-24 20:31:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\index.vue
-->
<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  详情页头部保存区域                                  --->
    <!------------------------------------------------------------------------>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">零件采购项目</span>
      <div class="floatright">
        <iButton @click="start">启动项目</iButton>
        <iButton @click="creatFs">生成FS/GSNR</iButton>
        <iButton @click="openDiologBack">取消零件采购项目</iButton>
        <iButton @click="splitPurch">拆分采购工厂</iButton>
        <iButton @click="openDiologClose">结束项目</iButton>
        <iButton @click="save">保存</iButton>
        <iButton @click="back">返回</iButton>
        <logButton class="margin-left20" @click="log" />
        <span>
          <icon symbol name="icondatabaseweixuanzhong"></icon>
        </span>
      </div>
    </div>

    <!------------------------------------------------------------------------>
    <!--                  基本信息区域                                       --->
    <!------------------------------------------------------------------------>
    <iCard>
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem label="零件号：" name="test">
              <iText>
                {{ detailData.detailData }}
              </iText>
            </iFormItem>
            <iFormItem label="零件名称（中）：" name="test">
              <iText>
                {{ detailData.partNameZh }}
              </iText>
            </iFormItem>
            <iFormItem label="零件项目类型：" name="test">
              <iSelect v-model="detailData.partPrejectType">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('part_preject_type')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="采购工厂：" name="test">
              <iSelect v-model="detailData.procureFactory">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('procure_factory')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="Common Sourcing：" name="test">
              <iSelect v-model="detailData.commonSourcing">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('is_common_sourcing')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="支付条款：" name="test">
              <iSelect v-model="detailData.payClause"
                ><el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('pay_clause')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="FSNR/GSNR/SPNR：" name="test">
              <iText>
                {{ detailData.commonSourcing }}
              </iText>
            </iFormItem>
            <iFormItem label="零件名称（德）：" name="test">
              <iText>
                {{ detailData.partNameDe }}
              </iText>
            </iFormItem>
            <iFormItem label="零件类型：" name="test">
              <iSelect v-model="detailData.partType">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('part_type')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="单位：" name="test">
              <iSelect v-model="detailData.unit">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('unit')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="MTZ零件：" name="test">
              <iSelect v-model="detailData.mtz">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('mtz')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="询价采购员：" name="test">
              <iText>
                {{ detailData.buyerName }}
              </iText>
            </iFormItem>
            <iFormItem label="LINIE部门：" name="test">
              <iSelect v-model="detailData.linieDept">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('linie_dept')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="LINIE：" name="test">
              <iSelect v-model="detailData.linieName">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('linie_name')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="CF控制员：" name="test">
              <iSelect v-model="detailData.cfController"
                ><el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('cf_controller')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
            <iFormItem label="货币：" name="test">
              <iSelect v-model="detailData.currencyId"
                ><el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('currency_id')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="签收日期：" name="test">
              <iText>
                {{ detailData.signDate }}
              </iText>
            </iFormItem>
            <iFormItem label="SOP日期：" name="test">
              <iText>
                {{ detailData.sopDate }}
              </iText>
            </iFormItem>
            <iFormItem label="零件状态：" name="test">
              <iText>
                {{ detailData.partStatus }}
              </iText>
            </iFormItem>
            <iFormItem label="BMG：" name="test">
              <iText>
                {{ detailData.bmg }}
              </iText>
            </iFormItem>
            <iFormItem label="采购条款：" name="test">
              <iSelect v-model="detailData.purchaseClause"
                ><el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="(item, index) in getGroupList('purchase_clause')"
                  :key="index"
                ></el-option>
              </iSelect>
            </iFormItem>
          </div>
        </div>
      </iFormGroup>
    </iCard>
    <iTabsList class="margin-top20" type="border-card">
      <el-tab-pane label="材料组信息">
        <materialGroupInfo />
      </el-tab-pane>
      <el-tab-pane label="零件产量计划">
        <outputPlan :params="infoItem" />
        <outputRecord class="margin-top20" />
        <usage class="margin-top20" />
      </el-tab-pane>
      <el-tab-pane label="图纸和TP详情页">
        <drawing :params="infoItem" />
        <sheet class="margin-top20" :params="infoItem" />
      </el-tab-pane>
      <el-tab-pane label="物流要求">
        <logistics :infoItem="infoItem"></logistics>
      </el-tab-pane>
      <el-tab-pane label="申请目标价">
        <targePrice @refresh="getDatail"></targePrice>
      </el-tab-pane>
      <el-tab-pane label="备注信息">
        <remarks :partNum="infoItem.partNum"></remarks>
      </el-tab-pane>
    </iTabsList>
    <backItems
      v-model="diologBack"
      @sure="cancel"
      title="取消零件采购"
    ></backItems>
    <!-- 结束项目 -->
    <backItems
      v-model="diologClose"
      @sure="cancel"
      title="结束项目"
    ></backItems>
    <splitFactory :splitPurchBoolean='splitPurchBoolean' :purchaseProjectId='purchaseProjectId'></splitFactory>
  </iPage>
</template>
<script>
import {
  iPage,
  iFormGroup,
  iFormItem,
  iCard,
  iText,
  iSelect,
  iButton,
  iTabsList,
} from "@/components";
import logistics from "./components/logistics";
import targePrice from "./components/targetPrice";
import materialGroupInfo from "./components/materialGroupInfo";
import outputPlan from "./components/outputPlan/outputPlan";
import outputRecord from "./components/outputPlan/outputRecord";
import usage from "./components/outputPlan/usage";
import drawing from "./components/drawingSheet/drawing";
import sheet from "./components/drawingSheet/sheet";
import remarks from "./components/remarks";
import backItems from "@/views/partsign/home/components/backItems";
import { getPageGroup } from "@/api/partsign/home";
import logButton from "@/views/partsign/editordetail/components/logButton";
import { getTabelData, changeProcure } from "@/api/partsprocure/home";
import {detailData} from "./components/data";
import splitFactory from './components/splitFactory'
export default {
  components: {
    iPage,
    iFormGroup,
    iFormItem,
    iCard,
    iText,
    iSelect,
    iButton,
    iTabsList,
    logistics,
    targePrice,
    materialGroupInfo,
    outputPlan,
    outputRecord,
    usage,
    drawing,
    sheet,
    remarks,
    logButton,
    backItems,
    splitFactory
  },
  data() {
    return {
      infoItem: {},
      detailData: detailData, //顶部详情数据
      targetprice: {}, //申请目标价数据
      fromGroup: [], //上方筛选列表
      diologBack: false, //取消零件采购
      diologClose: false, //结束项目
      splitPurchBoolean: false,
      purchaseProjectId:''
    };
  },
  created() {
    this.infoItem = JSON.parse(this.$route.query.item);
    this.purchaseProjectId = this.infoItem.purchasePrjectId
    this.getDatail();
    this.getPageGroup();
  },
  methods: {
    splitPurch() {
      this.splitPurchBoolean = !this.splitPurchBoolean;
    },
    //---------------------------------------------------
    // 获取详情数据
    getDatail() {
      let data = {
        "detailBaseReq.partNum": this.infoItem.partNum,
      };
      getTabelData(data).then((res) => {
        this.detailData = res.data.detailData;
        if (res.data.targetprice) {
          this.targetprice = res.data.targetprice;
        }
      });
    },
    //获取上方group信息
    getPageGroup() {
      getPageGroup(12314).then((res) => {
        this.fromGroup = res.data.groupStatSenarioResult.groupStatInfoList;
      });
    },
    // 查询fliter数据
    getGroupList(key) {
      if (this.fromGroup.length > 0) {
        let obj = this.fromGroup.find((items) => items.name == key);
        if (!obj) return [];
        return obj.infoList;
      }
    },
    // 启动项目
    start() {
      let start = {
        operator: "112",
        purchaseProjectIds: [this.infoItem.purchasePrjectId],
      };
      changeProcure({
        start,
      }).then((res) => {
        this.getDatail();
      });
    },
    //退回
    openDiologClose() {
      this.diologClose = true;
    },
    // 结束项目
    close(backmark) {
      let close = {
        closeRemark: backmark,
        operator: "112",
        purchaseProjectIds: [this.infoItem.purchasePrjectId],
      };
      changeProcure({
        close,
      }).then((res) => {
        this.getDatail();
      });
    },
    //修改详情。
    save(val) {
      let detailData = this.detailData;
      changeProcure({
        detailData,
      })
        .then((res) => {
          this.diologChangeItems = false;
          this.getDatail();
        })
        .catch(() => {
          this.diologChangeItems = false;
        });
    },
    // 生成fs号
    creatFs() {
      let fs = {
        purchaseProjectIds: [this.infoItem.purchasePrjectId],
      };
      changeProcure({
        fs,
      }).then((res) => {
        this.getDatail();
      });
    },
    //退回
    openDiologBack() {
      this.diologBack = true;
    },
    // 取消零件采购
    cancel(backmark) {
      let cancel = {
        cancelRemark: backmark,
        purchaseProjectIds: [this.infoItem.purchasePrjectId],
      };
      changeProcure({
        cancel,
      })
        .then((res) => {
          this.diologBack = false;
          this.getDatail();
        })
        .catch(() => {
          this.diologBack = false;
        });
    },
    // 返回
    back() {
      this.$router.go(-1);
    }, // 查看日志
    log() {
      window.open(
        `/#/log?recordId=${this.detailData.purchasePrjectId}`,
        "_blank"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.row {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .col {
    width: 395px;
    border-right: 1px solid $color-border;
    margin-right: 10px;
    padding-right: 20px;

    &:last-child {
      margin-right: 0px;
      border-right: none;
    }
  }

  .items {
    width: 300px;
  }
}
</style>
