<!--
 * @Author: moxuan
 * @Date: 2021-02-25 09:59:25
 * @LastEditTime: 2021-03-26 00:37:33
 * @LastEditors: Please set LastEditors
 * @Description: RFQ模块首页
 * @FilePath: \rise\src\views\partsrfq\home\index.vue
-->
<template>
  <iPage class="partsrfqHome">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane label="寻源执行" name="source">
        <div>
          <div class="margin-bottom33">
            <iNav-mvp @change="change" right></iNav-mvp>
          </div>
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <iSearch class="margin-bottom20" :icon="true" @reset="handleSearchReset" @sure="getTableList">
            <el-form>
              <el-form-item label="零件号/FSNR/RFQ/采购员">
                <iInput placeholder='请输入查询' v-model="form.searchConditions"></iInput>
              </el-form-item>
              <el-form-item label="车型项目">
                <iSelect placeholder='请选择' v-model="form.carType">
                  <el-option v-for="items in carTypeOptions" :key='items.code' :value='items.code' :label="items.name"/>
                </iSelect>
              </el-form-item>
              <el-form-item label="零件项目类型">
                <iSelect placeholder='请选择' v-model="form.partType">
                  <el-option v-for="items in partTypeOptions" :key='items.code' :value='items.code'
                             :label="items.name"/>
                </iSelect>
              </el-form-item>
              <el-form-item label="RFQ状态">
                <iSelect placeholder='请选择' v-model="form.rfqStatus">
                  <el-option v-for="items in rfqStatusOptions" :key='items.code' :value='items.code'
                             :label="items.name"/>
                </iSelect>
              </el-form-item>
            </el-form>
          </iSearch>
          <iCard>
            <!------------------------------------------------------------------------>
            <!--                  table模块，向外入参表格数据，表头                    --->
            <!------------------------------------------------------------------------>
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">RFQ综合管理</span>
              <div class="floatright">
                <!--激活RFQ：仅前期采购员有该按钮权限。已经关闭的RFQ，如果需要再次打开时，点击该键-->
                <iButton @click="editRfq('02')" :loading="activateButtonLoading">激活RFQ</iButton>
                <!--新建RFQ：点击该键，系统会跳到下一界面。具体新建RFQ见另一user story，当RFQ类型为FS时，仅前期采购员有该按钮权限-->
                <iButton @click="newRfq">新建RFQ</iButton>
                <!--关闭RFQ：仅前期采购员有该按钮权限。以下情况可关闭：RFQ零件状态是全部定点或全部结束，当前RFQ没有零件-->
                <iButton @click="editRfq('01')" :loading="closeButtonLoading">关闭RFQ</iButton>
                <!--转派评分任务：选中RFQ之后，可以手动转派任务给EP/MQ同事-->
                <iButton @click="assignmentOfScoringTasks">转派评分任务</iButton>
                <!--转谈判：只会出现在前期采购员界面-->
                <iButton @click="editRfq('03')" :loading="transferNegotiationButtonLoading">转谈判</iButton>
                <!--转询价：只会出现在专业采购员界面-->
                <iButton @click="editRfq('04')" :loading="transferInquiryButtonLoading">转询价</iButton>
                <!--创建定点申请：在列表中选择RFQ，点击该键，会跳转到定点申请创建页面，RFQ的内容会自动带入到定点申请的各页签中-->
                <iButton disabled>创建定点申请</iButton>
                <iButton @click="exportTable">导出</iButton>
              </div>
            </div>
            <tablelist
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                @openPage='openPage'
                open-page-props="id"
                :index="true"
                icon-props="recordId"
            >
              <template v-slot:icon="scope">
                <div @click="toTop(scope.data)" class="icon-style">
                  <icon class="icon icon-color-active" name="iconliebiaoyizhiding"
                        v-if="scope.data.recordId > 1"></icon>
                  <icon class="icon" name="iconliebiaoyizhiding" v-else></icon>
                </div>
              </template>
            </tablelist>
            <!------------------------------------------------------------------------>
            <!--                  表格分页                                          --->
            <!------------------------------------------------------------------------>
            <iPagination
                @size-change="handleSizeChange($event, getTableList)"
                @current-change="handleCurrentChange($event, getTableList)"
                background
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :current-page='page.currPage'
                :total="page.totalCount"
            />
            <!------------------------------------------------------------------------>
            <!--                  转派评分任务弹出框                                   --->
            <!------------------------------------------------------------------------>
            <assignment-of-scoring-tasks
                v-model="diologAssignmentOfScroingTasks"
                :rfq-id="assignmentRfqIdList"
            />
          </iCard>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="进度监控" name="progress"></el-tab-pane> -->
    </el-tabs>
  </iPage>

</template>
<script>
import {iPage, iButton, iCard, iMessage, iPagination, iSearch, iInput, iSelect, iNavMvp, icon} from "@/components";
import tablelist from "pages/partsrfq/components/tablelist";
import assignmentOfScoringTasks from "pages/partsrfq/home/components/assignmentOfScoringTasks";
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle} from "pages/partsrfq/home/components/data";
import {getRfqDataList, editRfqData, findBySearches} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";
import store from '@/store'

export default {
  components: {
    iPage,
    tablelist,
    iButton,
    iCard,
    iNavMvp,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    icon,
    assignmentOfScoringTasks
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologAssignmentOfScroingTasks: false,
      form: {
        searchConditions: '',
        carType: '',
        partType: '',
        rfqStatus: ''
      },
      activateButtonLoading: false,
      closeButtonLoading: false,
      transferNegotiationButtonLoading: false,
      transferInquiryButtonLoading: false,
      carTypeOptions: [],
      partTypeOptions: [],
      rfqStatusOptions: [],
      assignmentRfqIdList: [],
      tab: 'source'
    };
  },
  created() {
    this.getTableList()
    this.getCarTypeOptions()
    this.getPartTypeOptions()
    this.getRfqStatusOptions()
  },
  methods: {
    openPage(id) {
      this.$router.push({
        path: `/partsrfq/editordetail?id=${id}`
      })
    },
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      const req = {
        rfqMangerInfosPackage: {
          userId: store.state.permission.userInfo.id,
          current: this.page.currPage,
          size: this.page.pageSize,
          ...this.form
        }
      }
      try {
        const res = await getRfqDataList(req)
        this.tableListData = res.data.getRfqInfoVO.rfqVOList;
        this.page.currPage = res.data.getRfqInfoVO.pageNum
        this.page.pageSize = res.data.getRfqInfoVO.pageSize
        this.page.totalCount = res.data.getRfqInfoVO.total
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    newRfq() {
      this.$router.push({
        path: '/partsrfq/editordetail'
      })
    },
    async editRfq(updateType) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn("抱歉，您当前还未选择任务！");
      }
      const idList = this.selectTableData.map(item => {
        return item.id
      })
      const req = {
        updateRfqStatusPackage: {
          updateType,
          tmRfqIdList: idList,
          userId: store.state.permission.userInfo.id
        }
      }
      this.setOperationButtonLoading(updateType, true)
      const res = await editRfqData(req)
      this.setOperationButtonLoading(updateType, false)
      res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
      this.getTableList()
    },
    assignmentOfScoringTasks() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要转派的评分任务！");
      this.diologAssignmentOfScroingTasks = true
      this.assignmentRfqIdList = this.selectTableData.map(item => {
        return item.id
      })
    },
    async toTop(row) {
      const setType = row.recordId > 1 ? '0' : '1'
      const req = {
        rfqSetTopPackage: {
          setType,
          rfqId: row.id,
          userId: store.state.permission.userInfo.id
        },
      }
      const res = await editRfqData(req)
      res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
      this.getTableList()
    },
    change() {
    },
    handleSearchReset() {
      this.form = {}
      this.getTableList()
    },
    exportTable() {
      if (this.selectTableData.length == 0)
        return iMessage.warn('请选择需要导出的数据')
      excelExport(this.selectTableData, this.tableTitle)
    },
    setOperationButtonLoading(updateType, boolean) {
      switch (updateType) {
        case '01':
          this.closeButtonLoading = boolean
          break;
        case '02':
          this.activateButtonLoading = boolean
          break;
        case '03':
          this.transferNegotiationButtonLoading = boolean
          break;
        case '04':
          this.transferInquiryButtonLoading = boolean
          break;
      }
    },
    async getCarTypeOptions() {
      const res = await findBySearches('01')
      this.carTypeOptions = res.data
    },
    async getPartTypeOptions() {
      const res = await findBySearches('02')
      this.partTypeOptions = res.data
    },
    async getRfqStatusOptions() {
      const res = await findBySearches('03')
      this.rfqStatusOptions = res.data
    }
  }
}
</script>
<style lang='scss' scoped>
.icon-color-active {
  color: $color-blue;
}

.icon-style {
  cursor: pointer;
}

.partsrfqHome {
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