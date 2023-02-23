<!--
 * @Author: wentliao
 * @Date: 2021-05-24 11:39:32
 * @Description: 决策资料-timeLine
-->
<template>
  <div
    class="decision-data-timeLine"
    v-permission.auto="
      SOURCING_NOMINATION_ATTATCH_TIMELINE | (决策资料 - timeline)
    "
  >
    <div v-for="(item, index) in carList" :key="'timeLine_' + index">
      <!-- 编辑状态 -->
      <!--  -->
      <iCard collapse :title="item.carProjectCode" class="timeLine-card">
        <template slot="header-control">
          <!-- 按钮区域 -->
          <!-- v-if="isPreview == '0'" -->
          <div class="timeLine-btn-list">
            <span v-if="isEdit(index)">
              <iButton
                :loading="isLoading"
                @click="save"
                v-permission.auto="
                  SOURCING_NOMINATION_ATTATCH_TIMELINE_SAVE | 保存
                "
                >{{ language("LK_BAOCUN", "保存") }}</iButton
              >
              <iButton
                @click="cancel(index)"
                v-permission.auto="SOURCING_NOMINATION_ATTATCH_CANCEL | 取消"
                >{{ language("LK_QUXIAO", "取 消") }}</iButton
              >
            </span>
            <span v-else>
              <!-- v-if="!nominationDisabled && !rsDisabled" 暂时注释,便于模拟数据 -->
              <iButton @click="edit(item,index)">{{
                language("LK_BIANJI", "编辑")
              }}</iButton>
              <iButton @click="refresh(item,index)">{{
                language("刷新", "刷新")
              }}</iButton>
            </span>
          </div>
        </template>
        <tableList
          :key="index"
          :tableTitle="tableTitle"
          :selection="false"
          :tableData="[item]"
        >
          <template #partReleaseTime="scope">
            <iDatePicker
              v-model="scope.row.partReleaseTime"
              v-if="isEdit(index)"
              type="date"
              format="yyyy-MM-dd"
            ></iDatePicker>
            <span v-else>{{ scope.row.partReleaseTime | dateFormat }}</span>
          </template>
          <template #rfqTime="scope">
            <iDatePicker
              v-model="scope.row.rfqTime"
              v-if="isEdit(index)"
              type="date"
              format="yyyy-MM-dd"
            ></iDatePicker>
            <span v-else>{{ scope.row.rfqTime | dateFormat }}</span>
          </template>
          <template #cscTime="scope">
            <iDatePicker
              v-model="scope.row.cscTime"
              v-if="isEdit(index)"
              type="date"
              format="yyyy-MM-dd"
            ></iDatePicker>
            <span v-else>{{ scope.row.cscTime | dateFormat }}</span>
          </template>
          <template #bfConfirmTime="scope">
            <iDatePicker
              v-model="scope.row.bfConfirmTime"
              v-if="isEdit(index)"
              type="date"
              format="yyyy-MM-dd"
            ></iDatePicker>
            <span v-else>{{ scope.row.bfConfirmTime | dateFormat }}</span>
          </template>
          <template #vffTbtTime="scope">
            <span>{{ scope.row.vffTbtTime | dateFormat }}</span>
          </template>
          <template #pvsTbtTime="scope">
            <span>{{ scope.row.pvsTbtTime | dateFormat }}</span>
          </template>
          <template #osTbtTime="scope">
            <span>{{ scope.row.osTbtTime | dateFormat }}</span>
          </template>
          <template #sopTbtTime="scope">
            <span>{{ scope.row.sopTbtTime | dateFormat }}</span>
          </template>
        </tableList>
        <!-- 供应商编辑列表 -->

        <tableList
          class="margin-top20"
          :key="index"
          :tableTitle="tableTitleSupplier"
          :selection="false"
          :tableData="item.timeAxisSupplierInfoList"
        >
          <template #supplierName="scope">
            <span
              >{{ scope.row.supplierName }}{{ scope.row.supplierNameEn }}</span
            >
          </template>
          <template #oneStWeek="scope">
            <iInput
              class="input"
              v-model="scope.row.oneStWeek"
              :disabled="!isEdit(index)"
            ></iInput
            ><span class="margin-left5">W</span>
          </template>
          <template #emWeek="scope">
            <iInput
              class="input margin-right10"
              v-model="scope.row.emWeek"
              :disabled="!isEdit(index)"
            ></iInput
            ><span class="margin-left10">W</span>
          </template>
          <!-- <template #otsWeek="scope">
            <iDatePicker
              class="input"
              v-model="scope.row.otsWeek"
              :disabled="!isEdit(index)"
              type="date"
              format="yyyy-MM-dd"
            ></iDatePicker>
          </template> -->
          <template #qoneWeek="scope">
            <iInput
              class="input margin-right10"
              v-model="scope.row.qoneWeek"
              :disabled="!isEdit(index)"
            ></iInput
            ><span class="margin-left10">W</span>
          </template>
          <template #qthreeWeek="scope">
            <iInput
              class="input margin-right10"
              v-model="scope.row.qthreeWeek"
              :disabled="!isEdit(index)"
            ></iInput
            ><span class="margin-left10">W</span>
          </template>
        </tableList>
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard, iDatePicker, iInput, iButton, icon, iMessage } from "rise";
import tableList from "../../components/tableList";
import { tableTitle, tableTitleSupplier } from "./components/data";
import groupStep from "./components/groupStep";
import supplierStep from "./components/supplierStep";
import supplierLine from "./components/supplierLine";
import supplierItem from "./components/supplierItem";
import {
  getTimeaxis,
  saveTimeaxis,
  getTimeline,
  updateTimeline,
  syncNomiCarProjectTime
} from "@/api/designate/decisiondata/timeLine";
export default {
  name: "timeLine",
  components: {
    tableList,
    groupStep,
    supplierStep,
    supplierLine,
    supplierItem,
    iCard,
    iDatePicker,
    iInput,
    iButton,
    icon,
  },
  data() {
    return {
      editStatus: false,
      tableTitle,
      tableTitleSupplier,
      isLoading: false,
      detailData: [],
      editData:{},
      carList: [],
      index:null
    };
  },
  created() {
    this.getTimeline();
  },
  methods: {
    isEdit(index){
        return this.editStatus && this.index==index
    },
    // 获取时间轴
    getTimeline() {
      getTimeline(this.$route.query.desinateId).then((res) => {
        if (res?.code == "200") {
          this.carList = res.data;
        }
      });
    },
    updateTimeline() {
      let params = {};
      updateTimeline(params).then((res) => {
        if (res?.code == "200") {
        }
      });
    },
    // 刷新供应商数据
    refresh(){
      syncNomiCarProjectTime(this.$route.query.desinateId).then(res=>{
        if(res?.code=='200'){
          this.getTimeline()
        }
      })
    },
    // 编辑
    edit(item,index) {
      this.oldData = JSON.parse(JSON.stringify(item))
      this.$set(this, 'editData', item)
      this.editStatus = true;
      this.index = index
    },
    // 取消
    cancel(index){
      this.$set(this.carList,[index],JSON.parse(JSON.stringify(this.oldData)))
      this.editStatus = false;
      this.index = null
    },
    // 保存
    async save() {
      this.isLoading = true;
      let params = {
        timeAxisInfos: [this.editData],
        timeAxisSupplierInfoList: this.editData.timeAxisSupplierInfoList,
      };
      updateTimeline(params).then((res) => {
        if(res?.code=='200'){
            iMessage.success(res.desZh)
            this.editStatus = false;
            this.index = null
        }else{
            iMessage.error(res.desZh)
        }
      }).finally(()=>{
      this.isLoading = false
      });
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
    isPreview() {
      return this.$store.getters.isPreview;
    },
  },
  filters:{
    dateFormat(val){
        if(val) return window.moment(val).format('YYYY-MM-DD')
        return val
    }
  }
};
</script>

<style lang="scss" scoped>
.decision-data-timeLine {
  .supplier-list {
    margin-top: 30px;
    .supplier-item {
      position: relative;
      ::v-deep .cardHeader {
        .collapse {
          position: absolute;
          left: -5px;
          top: 43px;
        }
      }
      .supplier-item-list {
        width: 100%;
        overflow: hidden;
        li {
          padding: 25px 0;
          align-items: center;
          .supplier-item-name {
            font-size: 16px;
            color: #0d2451;
          }
          .supplier-item-line {
            width: 900px;
          }
          &:not(:last-child) {
            border-bottom: 1px solid rgba($color: #707070, $alpha: 0.18);
          }
        }
      }
    }
  }
  .timeLine-card {
    margin-bottom: 20px;
  }
  .timeLine-btn-list {
    margin-bottom: 20px;
    text-align: right;
  }
  .timeLine-edit-list {
    .show-icon {
      width: 100px;
      padding-top: 10px;
      .show-icon-item {
        width: 25px;
        height: 25px;
        margin-left: 20px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .list-item-step {
      flex: 1;
    }
  }
  .step-icon {
    color: rgb(112, 112, 112);
  }
}
.input {
  width: 150px !important;
}
</style>