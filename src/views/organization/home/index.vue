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
      <el-tab-pane label="ProCS" name="source">
        <div>
          <iCard class="icard-one">
            <ProcessTree ref="tree" class="tree" :data="treeData" v-dragabled />
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
  iPagination,
  iSearch,
  iInput,
  iSelect,
  icon,
} from "@/components";
import ProcessTree from "./component/ProcessTree";
import assignmentOfScoringTasks from "pages/partsrfq/home/components/assignmentOfScoringTasks";
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";

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
    assignmentOfScoringTasks,
    ProcessTree,
  },
  mixins: [pageMixins, filters, rfqCommonFunMixins],
  data() {
    return {
      tab: "source",
      treeData: [
        {
          name: "节点1",
          children: [
            { name: "节点5" },
            { name: "节点5", isLong: true },
            {
              name: "节点26",
              children: [
                { name: "节点3" },
                { name: "节点3" },
                {
                  name: "节点33",
                  children: [
                    { name: "节点3" },
                    { name: "节点3" },
                    { name: "节点3" },
                  ],
                },
              ],
            },
            { name: "节点3", children: [{ name: "节点3" }, { name: "节点3" }] },
            { name: "节点4", children: [{ name: "节点3" }] },
            { name: "节点5", isLong: true },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {},
  mounted() {
    this.$refs.tree.initDomWidth();
  },
};
</script>
<style lang='scss' scoped>
.orgationcheckHome {
  position: relative;
  .icard-one {
    height: 500px;
    border-radius: 10px;
    margin-top: 66px;
    .tree {
      display: flex;
      flex-direction: column;
    }
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
        background: $color-blue;
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