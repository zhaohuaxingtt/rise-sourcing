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
            定点申请: 600012345 5JASS621E21-VADASDNVJDSJFN-前盖铰链加强版总成{{
              status
            }}
          </span>
          <span class="value" ref="menuIcon">
            <img
              @click="prev"
              class="list-icon cursor left"
              :src="allow"
              alt="上箭头"
            />
            <img
              @click="next"
              class="list-icon cursor right"
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
                      ><span
                        >{{ item.presenterDept || 'presenterDept' }} {{ item.presenterEn || 'presenterEn' }}</span
                      >
                    </p>
                    <p>{{ item.topic || 'topic' }}</p>
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
        <div class="drawer-btn">
          <iButton>批准</iButton>
          <iButton>拒绝</iButton>
        </div>
        <mtzDetails v-if="isMtz" class="margin-top10" />
        <RS v-else class="margin-top10" />
      </div>
    </div>
  </el-drawer>
</template>

<script>
import left from "@/assets/images/cscIcon/allow-right.svg";
import allow from "@/assets/images/cscIcon/right.svg";
import menu from "@/assets/images/cscIcon/menu.svg";
import { iButton } from "rise";
import RS from "@/views/designate/designatedetail/previewCSC/rs/home.vue";
import mtzDetails from "./mtzDetails.vue";
export default {
  components: { iButton, RS, mtzDetails },
  props: {
    menuList:{
      type: Array,
      default:()=>[]
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
  },
  data() {
    return {
      left,
      allow,
      menu,
      status: "待审批",
      index: 0,
    };
  },
  watch: {
    row(val) {
      if (val.nomination) {
        console.log(val);
      }
    },
  },
  created() {},
  methods: {
    close() {
      this.$refs.menuIcon.click() // 关闭列表弹窗
      this.$nextTick(()=>{
        this.$emit("update:visible", false);
      })
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
      if(this.index==index) return
      this.index = index
      console.log("获取数据",index);
    },
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
      }
    }
  }
}
</style>