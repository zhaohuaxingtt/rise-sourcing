<template>
  <horizontalPanel
    v-if="nodeData && nodeData.length"
    :nodeData="nodeData"
    :instanceId="instanceId"
    :useFrom="useFrom"
  />
</template>

<script>
import horizontalPanel from './horizontalPanel'
export default {
  name: 'processNodeHorizontal',
  components: { horizontalPanel },
  props: {
    panorama: {
      type: Array,
      default: function () {
        return []
      }
    },
    isEnd: {
      type: Boolean,
      default: false
    },
    instanceId: {
      type: String,
      default: ''
    },
    useFrom: {
      type: String,
      default: ''
    }
  },
  watch: {
    panorama() {
      this.getData()
    }
  },
  data() {
    return {
      nodeData: [],
      iconMap: {
        审批结束: 'iconshenpiliu-yishenpi',
        已提交: 'iconshenpiliu-yishenpi',
        审批中: 'iconshenpiliu-shenpizhong',
        待审批: 'iconshenpiliu-daishenpi',
        未审批: 'iconshenpiliu-daishenpi',
        已审批: 'iconshenpiliu-yishenpi',
        已拒绝: 'iconshenpiliu-yishenpi',
        拒绝: 'iconshenpiliu-yishenpi',
        同意: 'iconshenpiliu-yishenpi'
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.panorama) {
        return []
      }
      this.setItemChildBranchFlag()
      console.log('this.panorama', this.panorama)
      const nodeData = []
      const len = this.panorama.length
      for (let i = 0; i < len; i++) {
        const panoromaItem = this.panorama[i]

        const item = this.getDatItem(panoromaItem)

        // 检查一下有没有并行节点
        if (
          panoromaItem?.branchFlag?.indexOf('branch') === 0 &&
          panoromaItem?.childBranchFlag &&
          panoromaItem?.childBranchFlag.length > 1
        ) {
          item.children = []
          panoromaItem.childBranchFlag.forEach((flag) => {
            const filterItems = this.panorama.filter(
              (e) =>
                e.branchFlag.indexOf(flag + '_') === 0 &&
                e.branchFlag !== item.branchFlag
            )
            const itemChildren = []
            filterItems.forEach((filterItem) => {
              itemChildren.push(this.getDatItem(filterItem))
              filterItem.isUsed = true
            })
            item.children.push(itemChildren)
          })
        }

        if (!item.isUsed) {
          nodeData.push(item)
        }

        item.isUsed = true
      }
      console.log('node data', nodeData)
      this.nodeData = nodeData
    },
    getDatItem(panoromaItem) {
      const approvers = []
      if (panoromaItem.taskApprovesList) {
        panoromaItem.taskApprovesList.forEach((task) => {
          if (task.approvedUser) {
            const taskUser = {
              ...task.approvedUser,
              taskStatus: '',
              taskId: '',
              endTime: ''
            }
            if (task.agentUsers) {
              taskUser.agentUsers = task.agentUsers
            }
            approvers.push(taskUser)
          }
        })
      }
      if (panoromaItem.taskNodeList) {
        panoromaItem.taskNodeList.forEach((task) => {
          if (task.taskApproves) {
            task.taskApproves.forEach((approve) => {
              const taskUser = {
                ...approve.approvedUser,
                taskStatus: task.taskStatus,
                taskId: task.taskId,
                endTime: task.endTime
              }
              if (approve.agentUsers) {
                taskUser.agentUsers = approve.agentUsers || []
              }
              approvers.push(taskUser)
            })
          }
        })
      }
      if (panoromaItem.nodeName === '审批结束') {
        return {
          ...panoromaItem,
          status: this.isEnd ? '审批结束' : '待审批',
          title: panoromaItem.nodeName,
          icon: this.iconMap[this.isEnd ? '审批结束' : '待审批'],
          approvers: approvers
        }
      }
      return {
        ...panoromaItem,
        status: panoromaItem.status,
        title: panoromaItem.status,
        icon: this.iconMap[panoromaItem.status],
        approvers: approvers
      }
    },
    setItemChildBranchFlag() {
      const len = this.panorama.length
      let defaultBranchFlag = ''
      for (let i = 0; i < len; i++) {
        const element = this.panorama[i]
        if (element.status === '已提交') {
          const otherNodes = this.panorama.filter((e) => e.status !== '已提交')
          const childs = []
          otherNodes.forEach((e) => {
            if (e.branchFlag) {
              const branch = this.getBranchFlag(e.branchFlag)
              if (!childs.includes(branch)) {
                childs.push(branch)
              }
            }
          })
          element.childBranchFlag = childs
        }
        if (!defaultBranchFlag) {
          defaultBranchFlag = element.branchFlag
        }
        if (element.nodeName === '审批结束') {
          element.branchFlag = defaultBranchFlag + 'end'
        }
      }
    },
    getBranchFlag(flag) {
      if (!flag) {
        return ''
      }
      return flag.substring(0, flag.lastIndexOf('_'))
    }
  }
}
</script>

<style lang="scss" scoped></style>
