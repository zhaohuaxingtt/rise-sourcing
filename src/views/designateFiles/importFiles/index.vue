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
                <iCard>
                  <div class="margin-bottom20 clearFloat">
                    <div class="floatright">
                      <iButton>{{$t('LK_DAORU')}}</iButton>
                      <iButton>{{$t('LK_PEIJIANMUBANXIAZAI')}}</iButton>
                    </div>
                  </div>
                  <!-- 表格区域 -->
                  <el-table
                    :data="tableData"
                    fit 
                    tooltip-effect='light'
                    :empty-text="$t('LK_ZANWUSHUJU')"
                  >
                    <el-table-column
                      type="selection"
                      align='center'
                      width="50">
                    </el-table-column>
                    <el-table-column
                      type="index"
                      label="#"
                      align='center'
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="prop1"
                      align='center'
                      :label="$t('LK_BIANHAO')">
                      <template slot-scope="scope">
                        <span @click="goFilesList" class="link-underline" >{{scope.row.prop1}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="prop2"
                      align='center'
                      :label="$t('LK_DAORUSHIJIAN')">
                    </el-table-column>
                    <el-table-column
                      prop="prop3"
                      align='center'
                      :label="$t('LK_DAORUYUAN')">
                    </el-table-column>
                    <el-table-column
                      prop="prop4"
                      align='center'
                      :label="$t('LK_KESHI')">
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                   <iPagination
                      v-update
                      @size-change="handleSizeChange($event, getTableListFn)"
                      @current-change="handleCurrentChange($event, getTableListFn)"
                      background
                      :current-page="page.currPage"
                      :page-sizes="page.pageSizes"
                      :page-size="page.pageSize"
                      :layout="page.layout"
                      :total="page.totalCount"
                    />
                </iCard>
            </el-tab-pane>
        </el-tabs>
    </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
  iCard,
  iButton,
  iPagination,
} from "rise";
import { navList } from "@/views/partsign/home/components/data";
import { cloneDeep } from "lodash";
import { pageMixins } from "@/utils/pageMixins";
export default {
    name:'importFiles',
    mixins: [pageMixins],
    components:{
        iPage,
        iNavMvp,
        iCard,
        iButton,
        iPagination,
    },
    data(){
        return{
            tab:'source',
            navList: cloneDeep(navList),
            tableData:[
              {
                prop1:'编号123',
                prop2:'2020-01-01',
                prop3:'分配科室',
                prop4:'SKAP',

              }
            ],
        }
    },
    methods:{
      // 跳转附件清单页
      goFilesList(){
        this.$router.push({path:'/sourcing/importfiles/detaillist'})
      },
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