<template>
  <div class="approval-process" :class="{ root: isRoot }">
    <div class="approval-process-content">
      <div class="node" v-for="(item, index) in data" :key="index">
        <div
          class="node-content"
          :class="size"
          :style="{ height: approveContentHeight + 'px' }"
        >
          <div class="title">
            {{ item.title }}
          </div>
          <div
            class="node-icon"
            :data-level="level"
            :data-index="index"
            :data-group="
              item.children && item.children.length
                ? `group-${level}-${index}`
                : ''
            "
            :data-end="index === data.length - 1 ? 1 : 0"
            :data-status="item.status"
          >
            <icon symbol size="30" :name="item.icon" class="process-icon" />
          </div>
          <div
            class="approval-user"
            :class="{
              multiple: item.approvers.length > 1,
              single: item.approvers.length === 1
            }"
            :style="{ height: approverUserHeight + 'px' }"
          >
            <span v-if="item.approvers.length === 1">
              {{ item.approvers[0].deptFullCode }}
              {{ item.approvers[0].nameZh }}
              {{ item.approvers[0].taskStatus }}
            </span>
            <div
              v-if="
                item.approvers.length === 1 &&
                item.approvers[0].agentUsers &&
                item.approvers[0].agentUsers.length
              "
              class="single-approvers-agents"
            >
              <ul
                v-if="
                  item.approvers[0].agentUsers && item.approvers[0].agentUsers
                "
              >
                <li
                  v-for="(agentUser, agentIndex) in item.approvers[0]
                    .agentUsers"
                  :key="agentIndex"
                >
                  {{ agentUser.deptFullCode }} {{ agentUser.nameZh }}
                  {{ agentUser.taskStatus }}(代)
                </li>
              </ul>
            </div>
            <ul v-if="item.approvers.length > 1" class="approval-users">
              <li
                v-for="(approver, i) in item.approvers"
                :key="i"
                :class="{
                  active: ['同意', '拒绝', '有异议', '无异议', '拒绝'].includes(
                    approver.taskStatus
                  )
                }"
                :status="approver.taskStatus"
              >
                <div class="self-user">
                  <span>
                    {{ approver.deptFullCode }} {{ approver.nameZh }}
                    {{ approver.taskStatus }}
                  </span>
                </div>
                <ul
                  v-if="approver.agentUsers && approver.agentUsers.length"
                  class="agent-users"
                  :class="{
                    active: getAgentUserActive(i, item.approvers)
                  }"
                >
                  <li
                    v-for="(agentUser, agentIndex) in approver.agentUsers"
                    :key="agentIndex"
                  >
                    {{ agentUser.deptFullCode }} {{ agentUser.nameZh }}
                    {{ agentUser.taskStatus }}(代)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="children" v-if="item.children">
          <approvalNodeHorizontal
            v-for="(child, i) in item.children"
            :key="i"
            :data="child"
            :isRoot="false"
            :level="level + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'approvalNodeHorizontal',
  components: { Icon },
  props: {
    isRoot: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  computed: {
    approverUserHeight() {
      let height = 0
      //let itemAllUsers = []
      this.data.forEach((e) => {
        /* if (e.approvers && e.approvers.length > itemAllUsers.length) {
          itemAllUsers = e.approvers
        } */
        let itemHeight = 0
        e.approvers.forEach((approver) => {
          itemHeight += 28
          if (approver.agentUsers && approver.agentUsers.length) {
            approver.agentUsers.forEach(() => {
              itemHeight += 28
            })
            itemHeight += 20
          }
        })
        if (itemHeight > height) {
          height = itemHeight
        }
      })
      return height // itemAllUsers.length * 28 + 20
    },
    approveContentHeight() {
      return this.approverUserHeight + 70
    }
  },
  methods: {
    getAgentUserActive(index, users) {
      if (index >= users.length - 1) {
        return false
      }
      return ['同意', '拒绝', '有异议', '无异议'].includes(
        users[index + 1].taskStatus
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.approval-process {
  align-items: center;
  font-size: 12px;

  display: flex;

  .root {
    overflow-x: auto;
    overflow-y: visible;
    position: relative;
  }
  .approval-process {
    overflow: hidden;
  }
  .approval-process-content {
    display: flex;
    .node {
      display: flex;
      align-items: center;
      margin: 20px 0px;

      .node-content {
        box-sizing: content-box;
        text-align: center;
        &.small {
          min-width: 160px;
        }
        &.large {
          min-width: 240px;
        }
        .approval-user {
          height: 50px;
          &.single {
            padding-top: 10px;
          }
          &.multiple {
            /* position: absolute;
            left: 50%; */
            transform: translateX(50%);
            margin-left: -10px;
          }
          &.multiple ul.approval-users {
            list-style: none;
            margin: 0;
            padding: 0;
            position: relative;
            margin-top: 7px;
            padding-right: 40px;
          }

          &.multiple ul.approval-users::before {
            content: '';
            height: 10px;
            border-left: solid 1px #ddd;
            display: block;
            position: absolute;
            left: 5px;
            top: -5px;
          }

          &.multiple ul.approval-users > li {
            margin: 0;
            padding: 0;
            text-align: left;
            white-space: nowrap;
            padding: 10px 0px;
            line-height: 12px;
            position: relative;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }

          /* &.multiple ul.approval-users > li::before {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border: solid 1px #ddd;
            border-radius: 16px;
            box-sizing: border-box;
            float: left;
            margin: 0px 10px 0px -3px;
            background: #fff;
          } */
          &.multiple ul.approval-users > li > .self-user {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
          }
          &.multiple ul.approval-users > li > .self-user::before {
            content: '';
            display: block;
            width: 16px;
            height: 16px;
            border: solid 1px #ddd;
            border-radius: 16px;
            box-sizing: border-box;
            float: left;
            margin: 0px 10px 0px -3px;
            background: #fff;
          }
          &.multiple ul.approval-users > li.active > .self-user::before {
            background: $color-blue;
            border: $color-blue;
          }

          &.multiple ul.approval-users > li::after {
            content: '';
            display: block;
            height: 20px;
            border-left: dashed 1px #ddd;
            display: block;
            position: absolute;
            left: 5px;
            top: -10px;
          }
          &.multiple ul.approval-users > li.active {
            &::before {
              background: $color-blue;
              border-color: $color-blue;
            }
            &::after {
              border-left: solid 1px $color-blue;
            }
          }
          &.multiple ul.approval-users > li {
            .agent-users {
              width: 100%;
              padding: 10px 0px 10px 25px;
              box-sizing: border-box;
              position: relative;
              > li {
                padding: 10px 0px;
                font-size: 12px;
                display: flex;
                align-items: center;

                &::before {
                  display: block;
                  content: '';
                  width: 10px;
                  height: 10px;
                  border-radius: 10px;
                  background-color: #ccc;
                  margin-right: 6px;
                }
                color: #888;
              }
              &::before {
                content: '';
                display: block;
                height: 100%;
                border-left: dashed 1px #ddd;
                display: block;
                position: absolute;
                left: 5px;
                top: 0;
              }
              &.active::before {
                border-left: solid 1px $color-blue;
              }
            }
            &:last-child {
              .agent-users {
                &::before {
                  display: none;
                }
              }
            }
          }
        }

        .single-approvers-agents {
          width: 100%;
          margin-left: 50%;
          transform: translateX(-5px);
          padding: 5px 0px;
          > ul > li {
            display: flex;
            align-items: center;
            color: #888;
            padding: 5px 0px;
            font-size: 12px;
          }
          > ul > li::before {
            display: block;
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background-color: #ccc;
            margin-right: 6px;
          }
        }

        .title {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
        }
        .node-icon {
          margin-bottom: 5px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          font-size: 24px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
      }
      .children {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.process-icon {
  background: #fff;
}
</style>
