<!--
 * @Author: Luoshuang
 * @Date: 2021-11-12 13:37:50
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-18 10:23:17
 * @Description: 
 * @FilePath: \front-sourcing\src\views\designate\approvalPersonAndRecord\meetingProcess.vue
-->

<template>
  <div class="meetingApproval" v-loading="loading">
    <iCard class="approvalItem margin-bottom20" v-for="(appItem, appIndex) in approvalList" :key="appItem.id">
      <i @click="toggle(appIndex)" class="el-icon-arrow-up arrowIcon margin-left20 cursor"
           :class="{rotate:appItem.hidens}"></i>
      <div class="process-vertical" :class="{hiden:appItem.hidens}">
        <div
          v-for="(item, index) of appItem.list"
          :key="index"
          class="node"
          :class="{
            mulitiple: item.taskNodeList,
            active: ['已提交', '已审批'].includes(item.status)
          }"
        >
          <div class="node-icon">
            <icon symbol size="30" :name="getIcon(item)" />
          </div>
          <div class="title">{{ item.status || item.nodeName }}</div>
          <div class="item-name" v-if="!item.taskNodeList">
            <div>
              <span>
                {{
                  item.approvalUser && item.approvalUser.assigneeName
                }}
              </span>
            </div>
          </div>
          <div class="post text-ellipsis" v-if="!item.taskNodeList">
            <div>
              <span>
                {{ item.approvalUser && item.approvalUser.deptNameZh }}
              </span>
            </div>
          </div>
          <div class="date" v-if="!item.taskNodeList || appItem.hidens">
            {{ item.approvalUser && item.approvalUser.endTime || item.endTime }}
          </div>
          <div
            v-if="item.taskNodeList"
            class="content "
            :class="{
              active: ['已提交', '已审批'].includes(item.status)
            }"
          >
            <div class="type">
              {{ item.nodeTye === 'Non_MultiInst' ? '并行' : '会签' }}
            </div>
            <ul class="list">
              <li
                v-for="(approvalUser, i) of item.taskNodeList"
                :key="i"
                :class="{ active: approvalUser.endTime || ['已审批'].includes(item.status) }"
              >
                <div class="item-name">
                  <span v-if="approvalUser">
                    {{
                      approvalUser.assigneeName
                    }}
                  </span>
                  <div 
                    class="agentUser" 
                    v-for="(agentUser, agentUsersI) in approvalUser.agentUsers" 
                    :key="agentUsersI"
                  >
                    <span v-if="agentUser">
                      {{
                        agentUser.assigneeName + ' (代)'
                      }}
                    </span>
                    <span v-if="agentUser">
                      {{
                        agentUser.deptNameZh
                      }}
                    </span>
                  </div>
                </div>
                <div class="post">
                  {{ approvalUser.deptNameZh }}
                </div>
                <div class="date" v-if="approvalUser.endTime">
                  {{ approvalUser.endTime }}
                </div>
                <div class="commit">{{ approvalUser.operation }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, icon, iMessage } from 'rise'
import { getApprovalRecordMeeting } from '@/api/designate/decisiondata/approval'
export default {
  components: { iCard, icon },
  props: {
    // meetingDetail: {type:Array},
    processInstanceId: {type:String},
    nomiAppId: {type:String}
  },
  watch: {
    processInstanceId(val) {
      console.log('processInstanceId', val)
      this.getMeetingDetail()
    },
  },
  created() {
    this.getMeetingDetail()
  },
  data() {
    return {
      hidensIndex: [],
      meetingDetail: [],
      loading: false
    }
  },
  computed: {
    approvalList() {
      const approvalList = this.meetingDetail.map((item, index) => {
        const hidens = this.hidensIndex.includes(index)
        const list = [
          {
            nodeName: item.items[0]?.activityName,
            nodeTye: "Non_MultiInst",
            remark: "提交节点",
            status: "已提交",
            approvalUser: item.items[0]
          },
          {
            nodeName: item.items[1]?.activityName,
            nodeTye: "MultiInst",
            remark: "正常审批",
            status: !item.isEnd ? "审批中" : "已审批",
            taskNodeList: item.items?.filter((node, nodeIndex) => nodeIndex !== 0)
          },
          {
            approvalUserList: null,
            executionId: null,
            nodeName: "审批完成",
            nodeTye: "",
            remark: null,
            status: null,
            isEnd: item.isEnd,
            endTime: hidens ? item.items[item.items.length - 1]?.endTime : ''
          }
        ]
        return {hidens: hidens, list: hidens ? [list[2]]: list}
      })
      return approvalList
    }
  },
  methods: {
    toggle(appIndex){
      if (!this.hidensIndex.some(item => item === appIndex)) {
        this.hidensIndex.push(appIndex)
      } else {
        this.hidensIndex = this.hidensIndex.filter(item => item !== appIndex)
      }
      
    },
    getMeetingDetail() {
      if (this.nomiAppId && this.processInstanceId) {
        this.loading = true
        getApprovalRecordMeeting(this.nomiAppId, this.processInstanceId).then(res => {
          if (res?.result) {
            this.meetingDetail = res.data
            res.data.forEach((element, index) => {
              if (index !== res.data.length - 1) {
                this.hidensIndex.push(index)
              }
            });
          } else {
            this.meetingDetail = []
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          }
        }).catch(e => {
          this.meetingDetail = []
          iMessage.error(this.$i18n.locale === 'zh' ? e?.desZh : e?.desEn)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    getIcon(item) {
      if (item.isEnd) {
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
    .commit {
      margin-left: 20px;
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
            position: relative;
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
.meetingApproval{
  min-height: 100px;
  padding-bottom: 30px;
  .approvalItem {
    position: relative;
  }
  .rotate {
    transform: rotate(180deg);
    color: $color-blue;
    position: absolute !important;
    // top: -16px !important;
  }
  .arrowIcon{
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .el-icon-arrow-up {
    transition: all 0.5s;
    height: 15px;
    // position: relative;
    top: 20px;
  }
  .arrowIcon {
    font-size: 20px;
    color: #D3D3DB;

    &:hover {
      color: $color-blue;
    }
  }
  .hiden {
    max-height: 35px;
    overflow: hidden;
    min-height: auto;
  }
}
.agentUser {
  color: #8f8f90;
  display: flex;
  margin: 5px 0;
  span {
    margin-right: 20px;
  }
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
</style>