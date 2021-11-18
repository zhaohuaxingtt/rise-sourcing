<template>
  <div class="process-vertical" v-if="instanceId">
    <div class="loading" v-loading="loading"></div>
    <div
      v-for="(item, index) of panorama"
      :key="index"
      class="node"
      :class="{
        mulitiple: isMultiApprovalUser(item),
        active: isDividerActive(item)
      }"
    >
      <div class="node-icon">
        <icon symbol size="30" :name="getIcon(item)" />
      </div>
      <div class="title">{{ item.status || item.nodeName }}</div>
      <div class="item-name" v-if="!isMultiApprovalUser(item)">
        <div>
          <span v-for="(approvalUser, i) of approvalUsers(item)" :key="i">
            {{
              approvalUser.approvedUser
                ? getUserName(approvalUser.approvedUser)
                : getUserName(approvalUser)
            }}
          </span>
        </div>
      </div>
      <div class="post text-ellipsis" v-if="!isMultiApprovalUser(item)">
        <div>
          <span v-for="(approvalUser, i) of approvalUsers(item)" :key="i">
            {{ approvalUser.positionZhNameList }}
          </span>
        </div>
      </div>
      <div class="date" v-if="!isMultiApprovalUser(item)">
        {{ getSingleApprovalDate(item) }}
      </div>
      <div
        v-if="isMultiApprovalUser(item)"
        class="content "
        :class="{
          active: isActiveItem(item)
        }"
      >
        <div class="type">
          {{ item.nodeTye === 'Non_MultiInst' ? '并行' : '会签' }}
        </div>
        <ul class="list">
          <li
            v-for="(approvalUser, i) of approvalUsers(item)"
            :key="i"
            :class="{ active: isUserActive(approvalUser) }"
          >
            <div class="item-name">
              <span v-if="approvalUser">
                {{
                  approvalUser.approvedUser
                    ? getUserName(approvalUser.approvedUser)
                    : getUserName(approvalUser)
                }}
              </span>
              <div 
                class="agentUser" 
                v-for="(agentUser, agentUsersI) in approvalUser.agentUsers" 
                :key="agentUsersI"
              >
                <span v-if="agentUser">
                  {{
                    agentUser.approvedUser
                    ? getUserName(agentUser.approvedUser)
                    : getUserName(agentUser) + ' (代)'
                  }}
                </span>
              </div>
            </div>
            <div class="post">
              {{ approvalUser.positionZhNameList }}
              <div 
                class="agentUserDept" 
                v-for="(agentUser, agentUsersI) in approvalUser.agentUsers" 
                :key="agentUsersI"
              >
                <span v-if="agentUser">
                  {{
                    agentUser.positionZhNameList
                  }}
                </span>
              </div>
            </div>
            <div class="date" v-if="getApprovalDate(approvalUser)">
              {{ getApprovalDate(approvalUser) }}
            </div>
            <div class="commit">{{ getApprovalStatus(approvalUser) }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else style="text-align:center" class="padding-top20 padding-bottom20">{{language('ZANWUSHUJU','暂无数据')}}</div>
</template>

<script>
// import { queryWorkflowDetail } from '@/api/approval/myApplication'
import { getInstDetail } from '@/api/designate/decisiondata/approval'
import { Icon } from 'rise'
export default {
  name: 'ProcessVertical',
  components: {
    Icon
  },
  props: {
    instanceId: {
      type: String
    }
  },
  data() {
    return {
      panorama: [],
      detail: {},
      loading: false
    }
  },
  computed: {
    isEnd() {
      return this.detail.stateCode !== 3 && this.detail.stateCode !== 4
    }
  },
  watch: {
    instanceId() {
      this.getDetail()
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      if (this.instanceId) {
        this.loading = true
        getInstDetail(this.instanceId)
          .then(res => {
            const { data } = res
            this.panorama = data.panorama || []
            this.detail = data
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    getUserName(user) {
      const res = []
      if (!user) {
        return ''
      }
      if (user.deptFullCode) {
        res.push(user.deptFullCode)
      }
      if (this.$i18n.locale === 'en') {
        res.push(user.nameEn || user.nameZh)
      } else {
        res.push(user.nameZh || user.nameEn)
      }
      return res.join(' ')
    },
    getIcon(item) {
      if (this.isEnd) {
        return 'iconshenpiliu-yishenpi'
      }
      if (['已提交', '已审批'].includes(item.status)) {
        return 'iconshenpiliu-yishenpi'
      }
      if (item.status === '审批中') {
        return 'iconshenpiliu-shenpizhong'
      }
      return 'iconshenpiliu-daishenpi'
    },
    isActiveItem(item) {
      return ['已提交', '已审批'].includes(item.status)
    },
    isDividerActive(item) {
      return ['已提交', '已审批'].includes(item.status)
    },
    isMultiApprovalUser(item) {
      const users = this.approvalUsers(item)
      return users && users.length > 1
    },
    approvalUsers(item) {
      let users = []
      if (item.approvalUserList) {
        for (let i = 0; i < item.approvalUserList.length; i++) {
          const element = item.approvalUserList[i]
          const status =
            item.nodeTye === 'MultiInst' ? false : item.status === '已审批'
          users.push({ ...element, approvalStatus: status })
        }
      }
      if (item.taskNodeList) {
        for (let i = 0; i < item.taskNodeList.length; i++) {
          const element = item.taskNodeList[i]
          if (element.approvedUser) {
            const status =
              item.nodeTye === 'MultiInst'
                ? element.endTime !== null
                : item.status === '已审批'
            users.push({
              ...element.approvedUser,
              approvalStatus: status,
              endTime: element.endTime,
              taskId: element.taskId,
              taskStatus: element.taskStatus
            })
          }
        }
      }
      return users
      // return item.approvalUserList || item.taskNodeList
    },
    isUserActive(user) {
      if (['有异议', '补充材料'].includes(user.taskStatus)) {
        return ['有异议', '补充材料'].includes(user.taskStatus)
      } else {
        return user.approvalStatus
      }
      
      /* if (!user.taskStatus) {
        return false
      }
      return ['同意'].includes(user.taskStatus) */
    },
    getApprovalDate(user) {
      if (!user.endTime) {
        return ''
      }
      return user.endTime
    },
    getApprovalStatus(user) {
      if (!user.taskStatus) {
        return ''
      }
      if (['审批中'].includes(user.taskStatus)) {
        return ''
      }
      if (['补充材料'].includes(user.taskStatus)) {
        return '有异议'
      }
      return user.taskStatus
    },
    getSingleApprovalDate(item) {
      if (item.taskNodeList && item.taskNodeList.length > 0) {
        return item.taskNodeList[0].endTime
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
$primaryColor: $color-blue;
$borderColor: #cbcbcb;
.process-vertical {
  margin-top: 10px;
  min-height: 100px;
  max-width: 800px;
  overflow: auto;
  .text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .node {
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    &.mulitiple {
      padding-bottom: 10px;
      flex-wrap: wrap;
    }
    &:last-child {
      padding-bottom: 0px;
    }
    .title {
      margin-right: 10px;
      font-size: 14px;
      margin-bottom: 0px;
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-name {
      width: 160px;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .post {
      margin-right: 10px;
      font-size: 14px;
      width: 150px;
      margin-left: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .date {
      font-size: 14px;
    }
    &::before {
      content: '';
      position: absolute;
      display: block;
      left: 8px;
      top: 20px;
      width: 1px;
      height: calc(100% - 20px);
      border-right: dashed 1px $borderColor;
    }
    &.active::before {
      border-right: solid 1px $primaryColor;
    }
    &.active:last-child::before {
      border: none;
    }
    &:last-child::before {
      border: none;
    }
    .node-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border-radius: 50%;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    .content {
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      padding-left: 30px;
      .type {
        padding: 0px;
        color: #8f8f90;
        white-space: nowrap;
      }
      .list {
        font-size: 14px;
        margin-top: 10px;
        margin-left: 16px;
        .name {
          display: block;
          min-width: 160px;
          margin-right: 10px;
        }
        li {
          display: flex;
          align-items: flex-start;
          position: relative;
          padding-left: 22px;
          font-size: 14px;
          white-space: nowrap;
          line-height: 19px;
          margin-bottom: 5px;
          clear: both;
          &::before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            border: dashed 1px $borderColor;
            border-radius: 50%;
            background: #fff;
            margin-right: 8px;
            top: 5px;
          }
        }
        li.active {
          &::before {
            border: solid 1px $primaryColor;
            background: $primaryColor;
          }
        }
        .commit {
          margin-left: 20px;
        }
      }
    }
  }
}
.agentUser {
  color: #8f8f90;
  display: flex;
  margin: 5px 0;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: dashed 1px $borderColor;
    border-radius: 50%;
    background: #fff;
    margin-right: 8px;
    position: relative;
    top: 5px;
  }
}
.agentUserDept {
  color: #8f8f90;
  display: flex;
  margin: 5px 0;
}
</style>
