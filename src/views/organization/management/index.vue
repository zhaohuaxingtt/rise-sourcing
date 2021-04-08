<!--
 * @Author: lyujiahong
 * @Date: 2021-04-07 09:59:25
 * @LastEditTime: 2021-04-07 09:59:25
 * @LastEditors: Please set LastEditors
 * @Description: RFQ模块首页
 * @FilePath: \rise\src\views\partsrfq\home\index.vue
-->
<template>
  <iPage class="orgationcheckHome">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane label="组织机构管理" name="source">
        <div>
          <iCard class="icard-one">
            <!------------------------------------------------------------------------>
            <!--                  table模块，向外入参表格数据，表头                    --->
            <!------------------------------------------------------------------------>
            <div class="margin-bottom20 clearFloat">
              <div class="font18 font-weight">
                <!--激活RFQ：仅前期采购员有该按钮权限。已经关闭的RFQ，如果需要再次打开时，点击该键-->
                <iButton :loading="activateButtonLoading">
                  新建组织机构
                </iButton>
                <!--新建RFQ：点击该键，系统会跳到下一界面。具体新建RFQ见另一user story，当RFQ类型为FS时，仅前期采购员有该按钮权限-->
                <iButton>{{ $t("LK_BIANJI") }}</iButton>
                <!--关闭RFQ：仅前期采购员有该按钮权限。以下情况可关闭：RFQ零件状态是全部定点或全部结束，当前RFQ没有零件-->
                <iButton :loading="closeButtonLoading">
                  {{ $t("LK_SHANCHU") }}
                </iButton>
              </div>
            </div>
            <tablelist
              :tableData="tableListData"
              :tableTitle="tableTitle"
              :tableLoading="tableLoading"
              @handleSelectionChange="handleSelectionChange"
              @openPage="openPage"
              open-page-props="id"
              :index="true"
              icon-props="recordId"
            >
              <template v-slot:icon="scope">
                <div @click="toTop(scope.data)" class="icon-style">
                  <icon
                    class="icon icon-color-active"
                    name="iconliebiaoyizhiding"
                    v-if="scope.data.recordId > 1"
                  ></icon>
                  <icon class="icon" name="iconliebiaoyizhiding" v-else></icon>
                </div>
              </template>
            </tablelist>
          </iCard>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="进度监控" name="progress"></el-tab-pane> -->
    </el-tabs>
  </iPage>
</template>
<script>
import {
  iPage,
  iButton,
  iCard,
  iMessage,
  iPagination,
  iSearch,
  iInput,
  iSelect,
  icon,
} from "@/components";
import { pageMixins } from "@/utils/pageMixins";
import { tableTitle } from "./component/data";
import filters from "@/utils/filters";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
import tablelist from "./component/tablelist";

export default {
  components: {
    iPage,
    iButton,
    iCard,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    icon,
    tablelist,
  },
  mixins: [pageMixins, filters, rfqCommonFunMixins],
  data() {
    return {
      activateButtonLoading: false,
      closeButtonLoading: false,
      tableTitle: tableTitle,
      tab: "source",
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.orgationcheckHome {
  position: relative;
  .icard-one {
    height: 700px;
    border-radius: 10px;
    margin-top: 66px;
  }
  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: transparent !important;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;

        & + & {
          padding: 0 25px;
        }
      }

      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }
}
</style>