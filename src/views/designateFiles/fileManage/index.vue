<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 16:20:16
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 18:08:02
 * @Description: 附件综合管理
 * @FilePath: \front-web\src\views\designateFiles\fileManage\index.vue
-->

<template>
  <iPage class="signForParts" v-permission="PARTSIGN_INDEXPAGE">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
        <div>
          <div class="margin-bottom33">
            <iNavMvp @change="change" right routerPage lev="2" :list="navList" />
          </div>
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="getTableList" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
                <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
                  <el-option value="" :label="$t('all')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </iSelect> 
                <iInput v-else v-model="searchParams[item.value]"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">附件综合查询</span>
                <div class="floatright">
                  <!--------------------分配LINIE/CSS----------------------------------->
                  <iButton @click="handleSendLinie" >分配LINIE/CSS</iButton>
                  <!--------------------退回按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" >退回</iButton>
                  <!--------------------创建RFQ----------------------------------->
                  <iButton @click="handleCreateRFQ">创建RFQ</iButton>
                  <!--------------------加入已有RFQ----------------------------------->
                  <iButton @click="handleJoinRFQ">加入已有RFQ</iButton>
                  <!--------------------删除按钮----------------------------------->
                  <iButton @click="remove" >删除</iButton>
                </div>
            </div>
            <tableList :activeItems='"c"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @handleFileDownload="handleFileDownload"></tableList>
            <!------------------------------------------------------------------------>
            <!--                  表格分页                                          --->
            <!------------------------------------------------------------------------>
            <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
              :page-size="page.pageSize"
              :layout="page.layout"
              :current-page="page.currPage"
              :total="page.totalCount"
            />
          </iCard>
          <!------------------------------------------------------------------------>
          <!--                  分配LINIE/CSS弹窗                                   --->
          <!------------------------------------------------------------------------>
          <linieDialog :dialogVisible="linieDialogVisible" @changeVisible="changeLinieDialogVisible" @updateLinie="updateLinie" />
          <!------------------------------------------------------------------------>
          <!--                    退回弹窗                                        --->
          <!------------------------------------------------------------------------>
          <backDialog :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBack" />
          <!------------------------------------------------------------------------>
          <!--                    加入已有RFQ弹窗                                  --->
          <!------------------------------------------------------------------------>
          <joinRfqDialog ref="joinRfq" :dialogVisible="joinRfqDialogVisible" @changeVisible="changeJoinRfqDialogVisible" @joinRfq="joinRfq" />
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="进度监控" name="progress"></el-tab-pane> -->
    </el-tabs>
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage, iNavMvp } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import { tableTitle, tableMockData, searchList } from './data'
import linieDialog from './components/setLinie'
import backDialog from './components/back'
import { navList } from "@/views/partsign/home/components/data"
import { cloneDeep, uniq } from 'lodash'
import { getAffixList, updateAffixList } from '@/api/designateFiles/index'
import { downloadFile } from '@/api/file'
import { insertRfq } from '@/api/accessoryPart/index'
import joinRfqDialog from '@/views/designateFiles/fileManage/components/joinRfq'
export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, linieDialog, backDialog, iNavMvp, joinRfqDialog },
  data() {
    return {
      tableData: tableMockData,
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {},
      linieDialogVisible: false,
      backDialogVisible: false,
      selectParts: [],
      navList: cloneDeep(navList),
      tab: "source",
      selectOptions: {
        yesOrNoOption: [{value: '1', label: '是'},{value: 0, label: '否'}]
      },
      joinRfqDialogVisible: false
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    handleSendLinie() {
      // if (this.selectParts.length < 1) {
      //   iMessage.warn('请选择附件')
      //   return
      // }
      // const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      // if (selectLINIE.length > 1 || selectLINIE[0]) {
      //   iMessage.warn('请选择未分配LINIE的附件')
      //   return
      // }
      this.changeLinieDialogVisible(true)
    },
    handleJoinRFQ() {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择附件')
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      const selectRfq = uniq(this.selectParts.map(item => item.rfqId))
      if (selectLINIE.length > 1) {
        iMessage.warn('请选择相同LINIE的附件')
        return
      } 
      if (!selectLINIE[0]) {
        iMessage.warn('请选择已分配LINIE的附件')
        return
      }
      if (selectRfq.length > 1 || selectRfq[0]) {
        iMessage.warn('请选择未分配RFQ的附件')
        return
      }
      this.changeJoinRfqDialogVisible(true)
    },
    /**
     * @Description: 加入已有rfq
     * @Author: Luoshuang
     * @param {*} rfq
     * @return {*}
     */    
    joinRfq(rfq) {
      const params = {
        insertRfqPackage: {
          rfqId: rfq.rfqId,
          operationType: '1',
          rfqPartDTOList: this.selectParts.map(item => {
            return {
              buyerName: item.csfUser, // 询价采购员
              linieName: item.csfUser, // linie
              linieUserId: item.csfuserId, // linie
              partNum: item.partNum, // 零件号
              fsnrGsnrNum: item.spnrNum, // fs号
              stuffId: item.stuffId, // 工艺组ID，还没有
              stuffName: item.stuffName, // 工艺组name，还没有
            }
          }),
          userId: store.state.permission.userInfo.id
        }
      }
      insertRfq(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.joinRfq.changeActiveButtonLoading(false)
      })
    },
    /**
     * @Description: 修改加入已有rfq弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeJoinRfqDialogVisible(visible) {
      this.joinRfqDialogVisible = visible
    },
    /**
     * @Description: 文件下载
     * @Author: Luoshuang
     * @param {*} fileList
     * @return {*}
     */    
    async handleFileDownload(fileList) {
      if (fileList.length < 1) {
        return
      }
      const params = {
        applicationName: 'rise',
        fileList: fileList
      }
      await downloadFile(params)
    },
    /**
     * @Description: 更新配件信息
     * @Author: Luoshuang
     * @param {*} respDept 采购员部门
     * @param {*} respLINIE 采购员
     * @param {*} reason 退回原因
     * @param {*} updateType 更新类型（0：退回 1：分配Linie）
     * @return {*}
     */
    updateAffix({respDept, respLINIE, reason, updateType}){
      const params = {
        affixIdList: this.selectParts.map(item => item.id),
        respDept,
        respLINIE,
        reason,
        updateType
      }
      updateAffixList(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    /**
     * @Description: 分配LINIE
     * @Author: Luoshuang
     * @param {*} respDept 采购员部门
     * @param {*} respLINIE 采购员
     * @return {*}
     */    
    updateLinie(respDept, respLINIE) {
      this.updateAffix({respDept, respLINIE, updateType: '1'})
    },
    /**
     * @Description: 退回
     * @Author: Luoshuang
     * @param {*} reason 退回原因
     * @return {*}
     */    
    handleBack(reason) {
      this.updateAffix({reason, updateType: '1'})
    },
    /**
     * @Description: 重置搜索条件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    reset() {
      this.searchParams = {}
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getAffixList(params).then(res => {
        if (res?.result) {
          this.tableData = res.data.records
          this.page.currPage = res.data.current
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 点击RFQ编号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage(row) {
      const router =  this.$router.resolve({path: `/sourcing/partsrfq/editordetail?id=${row.rfqId}`})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 表格选中事件
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    /**
     * @Description: 分配LINIE/CSS弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changeLinieDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.linieDialogVisible = visible
    },
    /**
     * @Description: 退回弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changebackDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择配件')
        return
      }
      this.backDialogVisible = visible
    },
    /**
     * @Description: 点击创建RFQ按钮跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCreateRFQ() {
      if (this.selectParts.length < 1) {
        iMessage.warn('请选择附件')
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      if (selectLINIE.length > 1) {
        iMessage.warn('请选择相同LINIE的附件')
        return
      } if (!selectLINIE[0]) {
        iMessage.warn('请选择已分配LINIE的附件')
        return
      }
      const router =  this.$router.resolve({path: '/sourcing/createrfq', query: { type: '2', ids: this.selectParts.map(item => item.spnrNum).join(',') }})
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.signForParts {
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