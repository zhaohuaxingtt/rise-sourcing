<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-27 15:36:29
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\components\drawer.vue
-->

<template>
  <el-drawer
    append-to-body
    :visible.sync="visible"
    :show-close="false"
    :withHeader="false"
    size="97vh"
    custom-class="m-drawer"
    direction="btt"
  >
    <div @click.self="close" class="drawer-container">
      <div class="drawer-content">
        <div class="close" @click="close">
          <img :src="left" alt="" srcset="" />
        </div>
        <div class="drawer-header margin-bottom20">
          <span>
            定点申请: {{ nomination }}
            <!-- <template v-if="nomination"> - 
              <span class="link" @click="gotoMTZ">{{nomination}}</span>
            </template> -->
            {{ row.appName }} ({{ row.approvedStatusName }})
          </span>
          <span class="value" ref="menuIcon">
            <img
              @click="prev"
              class="list-icon left"
              :class="index == 0 ? 'disable' : ''"
              :src="allow"
              alt="上箭头"
            />
            <img
              @click="next"
              class="list-icon right"
              :class="index == menuList.length - 1 ? 'disable' : ''"
              :src="allow"
              alt="下箭头"
            />
            <el-popover
              popper-class="meeting-list"
              placement="bottom-end"
              :visible-arrow="false"
              width="330"
              trigger="click"
              class="menu"
              @show="showItem"
            >
              <ul class="item-list" ref="menu">
                <li
                  class="list-item cursor"
                  @click="getData(i)"
                  v-for="(item, i) in menuList || []"
                  :key="i"
                  :class="{
                    'is-active': i == index,
                  }"
                >
                  <div class="content">
                    <p class="text margin-bottom5">
                      <span>{{ 1 + i }}</span
                      ><span>{{ item.linieDept }}</span>
                    </p>
                    <p>{{ item.appName }}</p>
                  </div>
                </li>
              </ul>
              <img
                class="list-icon-menu cursor"
                slot="reference"
                :src="menu"
                alt="数据列表"
              />
            </el-popover>
          </span>
        </div>
        <div class="drawer-btn" v-if="showApproveBtn">
          <iButton @click="signApprove(1)">批准</iButton>
          <iButton @click="signApprove(0)">拒绝</iButton>
        </div>
        <mtzDetails v-if="isMtz" :mtzAppId="nomination" class="margin-top10 data-container" />
        <RS
          :otherNominationId="nomination"
          :key="nomination"
          :otherPreview="true"
          v-else
          class="margin-top10 data-container"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script>
import left from "@/assets/images/cscIcon/allow-right.svg";
import allow from "@/assets/images/cscIcon/right.svg";
import menu from "@/assets/images/cscIcon/menu.svg";
import { iButton, iMessage } from "rise";
import RS from "@/views/designate/designatedetail/previewCSC/rs/home.vue";
import mtzDetails from "./mtzDetails.vue";
import { signApprove } from "@/api/designate/nomination/mApprove";
export default {
  components: { iButton, RS, mtzDetails },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    isMtz: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => ({}),
    },
    indexInit: {
      type: String,
    },
  },
  data() {
    return {
      left,
      allow,
      menu,
      showApproveBtn:false
    };
  },
  watch:{
    row:{
      handler(val){
        this.showApproveBtn = val.approvedStatus == 'M_CHECK_INPROCESS'
      },
      deep:true,
    }
  },
  computed: {
    nomination() {
      return this.row.appNo || "";
    },
    index(){
      return this.menuList.map(item=>item.appNo).indexOf(this.nomination)
    },
  },
  methods: {
    close() {
      this.$refs.menuIcon.click(); // 关闭列表弹窗
      this.$nextTick(() => {
        this.$emit("update:visible", false);
      });
    },
    // 滚动到当前议题
    showItem() {
      this.$nextTick(() => {
        let active = this.$refs.menu.getElementsByClassName("is-active")[0];
        if (active)
          this.$refs.menu.scrollTo(
            0,
            [active][0].offsetTop - this.$refs.menu.offsetHeight / 2
          );
      });
    },
    prev() {
      if (this.index > 0) {
        this.getData(this.index - 1);
      }
    },
    next() {
      if (this.index < this.menuList.length - 1) {
        this.getData(this.index + 1);
      }
    },
    getData(index) {
      if (this.index == index) return;
      this.row = this.menuList[index];
      this.$set(this, 'row', this.menuList[index])
    },
    
    signApprove(isAgree) {
      // 0拒绝、1同意
      let params = {
        isAgree: isAgree, // 0拒绝、1同意
        isConfirm: 1, // 是否确认弹窗请求，1-是，0-否
        reason: isAgree ? "【同意】" : "【拒绝】", // 原因
        signAppIds: [this.row.signAppId],
      };
      signApprove(params).then(async (res) => {
        if (res?.code == 200) {
          iMessage.success("操作成功");
          this.$emit('refreshData')
          this.showApproveBtn = false
          // this.$forceUpdate()
        } else {
          await this.$confirm(
            this.$i18n.locale == 'zh' ? res.desZh:res.desEn,
            this.language("LK_WENXINTISHI", "温馨提示"),
            {
              confirmButtonText: this.language("LK_QUEDING", "确定"),
              cancelButtonText: this.language("LK_QUXIAO", "取 消"),
            }
          )
            .then(() => {
              let params = {
                isAgree: isAgree, // 0拒绝、1同意
                isConfirm: 0, // 是否确认弹窗请求，1-是，0-否
                reason: isAgree ? "【同意】" : "【拒绝】", // 原因
                signAppIds: [this.row.signAppId],
              };
              signApprove(params).then((res) => {
                if (res?.code == 200) {
                  iMessage.success("操作成功");
                  this.$emit('refreshData')
                  this.showApproveBtn = false
                  // this.$forceUpdate() 
                } else {
                  iMessage.error("操作失败");
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    // 跳转MTZ详情
    gotoMTZ(){
      const router = this.$router.resolve({
        path: window.location.origin + "/portal#/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/signPreview",
        query: {
          mtzAppId: row.signId,
        },
      });
      window.open(router.href, "_blank");
    }
  },
};
</script>

<style lang="scss" scoped>
.close {
  width: 110px;
  height: 20px;
  border-radius: 20px;
  background: #222;
  text-align: center;
  margin: 0 auto 10px;
  img {
    transform: rotate(90deg);
    height: 20px;
  }
}
.drawer-header {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-list {
  height: calc(100vh - 148px);
  min-height: 400px;
  overflow: auto;
  padding-right: 20px;
  padding: 0;
  color: #4f4f4f;
  .list-item {
    padding: 0 18px;
    .content {
      padding: 12px 0;
      border-bottom: 1px solid #efefef;
    }
  }
  .text {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .is-active {
    background: #364d6e;
    color: #fff;
    .content {
      padding: 12px 0;
      border-bottom: 0px;
    }
    &:hover {
      background: #364d6e;
      color: #fff;
      opacity: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    min-height: 8px;
    min-width: 8px;
  }
  &::-webkit-scrollbar-track {
    width: 8px;
  }
}
.list-icon {
  margin-right: 10px;
  height: 30px;
  cursor: pointer;
  &.right {
    transform: rotateZ(90deg);
  }
  &.left {
    transform: rotateZ(-90deg);
  }
}
.list-icon-menu {
  height: 30px;
}
.disable {
  cursor: no-drop;
  opacity: 0.8;
}
.drawer-btn {
  text-align: right;
}

::v-deep .el-table {
  border-radius: 0;
  font-size: 18px;
  th.gutter:last-of-type {
    background: #fff;
    border: 0;
  }
  .el-table__header {
    th {
      border-color: #d9d9d9;
      .cell {
        color: #fff;
        line-height: 20px;
      }
    }
  }
  .el-table__body-wrapper,
  .el-table__fixed-body-wrapper {
    tr:nth-child(even) {
      background-color: #ffffff;
    }

    tr:last-of-type {
      td {
        border-bottom: 1px solid #d9d9d9;
      }
    }

    td {
      border-color: #d9d9d9;
      border-top: 1px solid #d9d9d9;
      .cell {
        line-height: 20px;
      }
    }
  }
  .el-table__footer-wrapper {
    tr:nth-child(even) {
      background-color: #ffffff;
    }
  }
  tr {
    border-top: 1px solid #d9d9d9;
    .link {
      color: #364d6e;
      text-decoration: underline;
    }
  }
}
</style>
<style lang="scss">
.meeting-list {
  margin-top: 40px !important;
  padding: 0;
  border: 0;
  font-size: 16px;
}
.m-drawer.el-drawer {
  background: transparent;
  .el-drawer__body {
    height: 100%;
    background: transparent;
    .drawer-container {
      height: 100%;
      padding: 0 20px;
      background: transparent;
      .drawer-content {
        height: 100%;
        padding: 0 20px;
        background: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .data-container{
          height: calc(100% - 135px);
          overflow: auto;
        }
      }
    }
  }
}
</style>