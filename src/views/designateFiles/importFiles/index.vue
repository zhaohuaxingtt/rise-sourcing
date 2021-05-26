<!--
 * @Author: wentliao
 * @Date: 2021-05-26 10:45:22
 * @Description: 特殊定点-配附件--附件需求导入列表
-->
<template>
    <iPage class="importFiles">
        <el-tabs v-model="tab" class="tab">
            <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
                 <div class="margin-bottom33">
                    <iNavMvp right routerPage lev="2" :list="navList" />
                </div>
                <!-- 内容区 -->
                <h1>附件需求导入</h1>
            </el-tab-pane>
        </el-tabs>
    </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
} from "rise";
import { navList } from "@/views/partsign/home/components/data";
import { cloneDeep } from "lodash";
export default {
    name:'importFiles',
    components:{
        iPage,
        iNavMvp,
    },
    data(){
        return{
            tab:'source',
            navList: cloneDeep(navList),
        }
    }

}
</script>

<style lang="scss" scoped>
.importFiles {
  position: relative;

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