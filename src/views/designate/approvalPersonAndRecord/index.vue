<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 21:04:49
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-07 14:44:09
 * @Description: 定点-审批人&审批记录
 * @FilePath: \front-web\src\views\designate\approvalPersonAndRecord\index.vue
-->
<template>
  <iPage class="approvalFlow" v-permission.auto="SOURCING_NOMINATION_APPROVAL_PAGE|审批人&审批记录">
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('LK_SHENPIRENANDSHENPIJILU','审批人&审批记录')}}</span>
          <!------------------------------------------------------------------------------->
          <!-------------------------未编辑状态下的按钮---------------------------------------->
          <!------------------------------------------------------------------------------->
          <div class="floatright" v-if="!isEdit">
            <!--------------------同步按钮----------------------------------->
            <span v-if="!nominationDisabled" class="cursor tongbu" @click="synchronization" :loading="approvalSyncLoading" v-permission.auto="SOURCING_NOMINATION_APPROVAL_ASYNC|同步"><icon symbol class="margin-right8" name='icontongbu' ></icon>{{language('LK_TONGBU','同步')}}</span>
            <!--------------------审批流按钮----------------------------------->
            <iButton @click="openAprroveFlow" v-permission.auto="SOURCING_NOMINATION_APPROVAL_SHENPILIU|审批流">{{language('SHENPILIU','审批流')}}</iButton>
            <!--------------------编辑按钮----------------------------------->
            <iButton v-if="!nominationDisabled" @click="handleEdit" v-permission.auto="SOURCING_NOMINATION_APPROVAL_EDIT|编辑">{{language('LK_BIANJI','编辑')}}</iButton>
            
          </div>
          <!------------------------------------------------------------------------------->
          <!-------------------------编辑状态下的按钮---------------------------------------->
          <!------------------------------------------------------------------------------->
          <div class="floatright" v-else>
            <span v-if="!nominationDisabled">
              <!--------------------新增按钮----------------------------------->
              <iButton @click="handleAdd" v-permission.auto="SOURCING_NOMINATION_APPROVAL_ADD|新增">{{language('LK_XINZENG','新增')}}</iButton>
              <!--------------------删除按钮----------------------------------->
              <iButton @click="handleDelete" v-permission.auto="SOURCING_NOMINATION_APPROVAL_DELETE|删除">{{language('LK_SHANCHU','删除')}}</iButton>
              <!--------------------恢复按钮----------------------------------->
              <iButton @click="handleRecover" v-permission.auto="SOURCING_NOMINATION_APPROVAL_RECOVER|恢复">{{language('LK_HUIFU','恢复')}}</iButton>
              <!--------------------保存按钮----------------------------------->
              <iButton @click="handleSave" :loading="saveLoading" v-permission.auto="SOURCING_NOMINATION_APPROVAL_SAVE|保存">{{language('LK_BAOCUN','保存')}}</iButton>
              <!--------------------取消按钮----------------------------------->
              <iButton @click="handleCancelEdit" v-permission.auto="SOURCING_NOMINATION_APPROVAL_EXITEDIT|结束编辑">{{language('LK_JIESHUBIANJI','结束编辑')}}</iButton>
            </span>
          </div>
      </div>
      <tableList 
        v-update
        :editCompare="false" 
        :tableLoading="tableLoading" 
        :tableTitle="tableTitle" 
        indexKey 
        :selection="true" 
        :tableData="tableData" 
        class="doubleHeader" 
        @openDialog="changeDialogVisible(true)" 
        @handleSelectionChange="handleRfqSelectionChange" 
        :deptOptions="deptOptions"
        v-permission.auto="SOURCING_NOMINATION_APPROVAL_TABLE|表格"
      ></tableList>
    </iCard>
    <approvalFlowDialog :dialogVisible="flowDialogVisible" @changeVisible="changeflowDialogVisible" :processInstanceId="processInstanceId" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, icon, iMessage } from 'rise'
import tableList from './tableList'
import { tableTitle } from './data'
import { cloneDeep, omit } from 'lodash'
import approvalFlowDialog from './approvalFlow'
import { getApprovalNode, approvalSync, updateApprovalNode, getDept, getSubDeptListByParam, getDeptListByParam } from '@/api/designate/decisiondata/approval'
export default {
  components: { iPage, iCard, tableList, iButton, approvalFlowDialog, icon },
  data() {
    return {
      isEdit: false,
      editableItem: ['approveDeptNum', 'approveParentDeptNum'],
      flowDialogVisible: false,
      tableDataTemp: [],
      approvalSyncLoading: false,
      tableLoading: false,
      selectItems: [],
      saveLoading: false,
      deptOptions: [],
      parentDeptOptions: [],
      processInstanceId: ''
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
    }),
    tableTitle() {
      return tableTitle.map(item => {
        return {
          ...item,
          props: this.editableItem.includes(item.props) ? item.name === '审批部门' ? this.isEdit ? 'approveParentDeptNum' : 'approveParentDeptNumName' : this.isEdit ? 'approveDeptNum' : 'approveDeptNumName' : item.props,
          editable: this.editableItem.includes(item.props) ? this.isEdit : false,
        }
      })
    },
    tableData() {
      return this.tableDataTemp.filter(item => !item.isDelete)
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getDeptList()
      this.getTableList()
    },
    /**
     * @Description: 恢复操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleRecover() {
      this.getTableList()
    },
    /**
     * @Description: 列表选中事件
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */    
    handleRfqSelectionChange(selectItems) {
      this.selectItems = selectItems
    },
    /**
     * @Description: 删除操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleDelete() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('LK_QINGXUANZEXUYAOSHANCHUDEHANG','请选择需要删除的行'))
        return
      }
      this.tableDataTemp = this.tableDataTemp.map(item => {
        return {
          ...item,
          isDelete: this.selectItems.includes(item) ? true : item.isDelete
        }
      })
    },
    /**
     * @Description: 新增操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleAdd() {
      this.tableDataTemp = [
        ...this.tableDataTemp, 
        {
          isDelete: false,
          approveParentDeptNum:null,
          approveDeptNum:null,
          deptOptions: this.parentDeptOptions,
          deptSubOptions: []
        }
      ]
    },
    /**
     * @Description: 获取部门下拉列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getDeptList() {
      const res = await getDeptListByParam()
      if (res?.result) {
        this.parentDeptOptions = res.data.map(item => {
          return {
            ...item,
            label: item.nameZh,
            value: item.id
          }
        })
      }
    },
    async getDeptSubOptions(item) {
      const res = await getSubDeptListByParam(item.approveParentDeptNum)
      return res.data.map(item => {
        return {
          ...item,
          label: item.nameZh,
          value: item.id
        }
      })
    },
    // getApperovalList(){
    //   getDeptListByParam().then(res=>{
    //     console.log(res);
    //   })
    // },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getTableList() {
      this.tableLoading = true
      //this.$route.query.desinateId 
      const res = await getApprovalNode(this.$route.query.desinateId)
      if (res?.result) {
        for(var i = 0; i < (res.data.nomiApprovalProcessNodeVOList || []).length; i++) {
          const deptSubOptions = await this.getDeptSubOptions(res.data.nomiApprovalProcessNodeVOList[i])
          res.data.nomiApprovalProcessNodeVOList[i].deptOptions = this.parentDeptOptions
          res.data.nomiApprovalProcessNodeVOList[i].deptSubOptions = deptSubOptions
        }
        this.tableDataTemp = cloneDeep(res.data.nomiApprovalProcessNodeVOList)
        this.processInstanceId = res.data.nominateAppVo?.processInstanceId
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
      this.tableLoading = false
    },
    /**
     * @Description: 同步按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    synchronization() {
      this.approvalSyncLoading = true
      approvalSync(this.$route.query.desinateId).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.approvalSyncLoading = false
      })
    },
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
      this.getTableList()
    },
    /**
     * @Description: 保存按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.saveLoading = true
      const params = {
        nomiApprovalProcessNodeDTOList: this.tableDataTemp.filter(item => {
          if (item.id) {
            return true
          } else {
            if (!item.approveDeptNum && !item.approveParentDeptNum) {
              return false
            } 
            return true
          }
        }).map(item => omit(item, ['deptOptions','deptSubOptions'])),
        nominateAppId: this.$route.query.desinateId //this.$route.query.desinateId
      }
      console.log(params)
      updateApprovalNode(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
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