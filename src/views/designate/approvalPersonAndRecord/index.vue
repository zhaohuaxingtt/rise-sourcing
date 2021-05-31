<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 21:04:49
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-27 14:29:04
 * @Description: 定点-审批人&审批记录
 * @FilePath: \front-web\src\views\designate\approvalPersonAndRecord\index.vue
-->
<template>
  <iPage class="approvalFlow">
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{'审批人&审批记录'}}</span>
          <!------------------------------------------------------------------------------->
          <!-------------------------未编辑状态下的按钮---------------------------------------->
          <!------------------------------------------------------------------------------->
          <div class="floatright"  v-if="!isEdit">
            <!--------------------同步按钮----------------------------------->
            <span class="cursor tongbu" @click="synchronization"><icon symbol class="margin-right8" name='icontongbu' ></icon>同步</span>
            <!--------------------审批流按钮----------------------------------->
            <iButton @click="openAprroveFlow" >审批流</iButton>
            <!--------------------编辑按钮----------------------------------->
            <iButton @click="handleEdit" >编辑</iButton>
            
          </div>
          <!------------------------------------------------------------------------------->
          <!-------------------------编辑状态下的按钮---------------------------------------->
          <!------------------------------------------------------------------------------->
          <div class="floatright" v-else>
            <!--------------------保存按钮----------------------------------->
            <iButton @click="handleSave" >保存</iButton>
            <!--------------------取消按钮----------------------------------->
            <iButton @click="handleCancelEdit" >取消编辑</iButton>
          </div>
      </div>
      <tableList v-update :tableTitle="tableTitle" indexKey :selection="true" :tableData="tableData" class="doubleHeader" @openDialog="changeDialogVisible(true)" ></tableList>
      <iPagination v-update 
        @size-change="handleSizeChange($event, getRfqTableList)" 
        @current-change="handleCurrentChange($event, getRfqTableList)" 
        background 
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <approvalFlowDialog :dialogVisible="flowDialogVisible" @changeVisible="changeflowDialogVisible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitle, mockData } from './data'
import { cloneDeep } from 'lodash'
import approvalFlowDialog from './approvalFlow'
export default {
  mixins: [pageMixins],
  components: { iPage, iCard, iPagination, tableList, iButton, approvalFlowDialog },
  data() {
    return {
      tableData: cloneDeep(mockData),
      isEdit: false,
      editableItem: ['a', 'a1'],
      flowDialogVisible: false
    }
  },
  computed: {
    tableTitle() {
      return tableTitle.map(item => {
        return {
          ...item,
          editable: this.editableItem.includes(item.props) ? this.isEdit : false
        }
      })
    }
  },
  methods: {
    /**
     * @Description: 同步按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    synchronization() {},
    /**
     * @Description: 审批流按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openAprroveFlow() {
      this.changeflowDialogVisible(true)
    },
    /**
     * @Description: 编辑按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleEdit() {
      this.isEdit = true
    },
    /**
     * @Description: 取消编辑按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCancelEdit() {
      this.isEdit = false
      this.tableData = cloneDeep(mockData)
    },
    /**
     * @Description: 保存按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.isEdit = false
    },
    /**
     * @Description: 审批流弹窗状态切换
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeflowDialogVisible(visible) {
      this.flowDialogVisible =  visible
    }
  }
}
</script>

<style lang="scss" scoped>
.approvalFlow {
  padding: 0;
}
.tongbu {
  font-size: 16px;
  font-weight: 400;
  color: rgba(22, 96, 241, 1);
  margin-right: 10px;
}
</style>