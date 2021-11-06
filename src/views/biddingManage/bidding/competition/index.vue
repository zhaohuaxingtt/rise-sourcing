<template>
  <iPage>
    <div class="card">
      <div class="card--header">
        <div class="card--header--item">
          <div class="header--item--left">
            <div class="header--item--lable header--item--lable__left">
              <!-- RFQ编号: 51332131 -->
              {{ title }}
            </div>
            <!-- <div class="header--item--lable">
              <iButton>英式竞标</iButton>
            </div> -->
          </div>
          <!-- <div class="header--item--left header--item--left__btn">
            <iButton class="">保存</iButton>
            <iButton class="">新建REQ轮次</iButton>
            <iButton class="">发出本轮RFQ</iButton>
            <iButton class="">结束本轮RFQ</iButton>
            <iButton class="">创建定点申请</iButton>
          </div> -->
        </div>
        <div class="card--header--item">
          <div class="header--item--left">
            <div class="header--item--left__btn header--item--left__tab">
              <div
                v-if="ruleForm.biddingStatus !== '01'"
                class="header-item-mouse"
              >
                <iButton
                  v-for="item in tabList"
                  :key="item.value"
                  :class="{ active: bottomActived === item.activation }"
                  @click="
                    $router.push({
                      name: item.path,
                    })
                  "
                  >{{ item.label }}</iButton
                >
              </div>
              <template v-else>
                <iButton :class="{ active: actived === 1 }">基本信息</iButton>
                <iButton :class="{ active: actived === 2 }">项目信息</iButton>
                <iButton :class="{ active: actived === 3 }">报价规则</iButton>
              </template>
            </div>
          </div>
          <!-- <template v-if="ruleForm.biddingStatus !== '01'"> -->
          <template>
            <div class="hander-item-right">
              <iButton @click="handleBack">返回</iButton>
            </div>
          </template>
        </div>
      </div>

      <div class="card--body">
        <router-view @change-title="handleChangeTitle"></router-view>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton } from "rise";

export default {
  components: {
    iPage,
    iButton,
  },
  data() {
    return {
      actived: -1,
      ruleForm: {},
      bottomActived: 1,
      tabList: [
        {
          value: "base",
          label: "基础信息",
          path: "biddingCompetitionBase",
          activation: 1,
        },
        {
          value: "project",
          label: "项目信息",
          path: "biddingCompetitionProject",
          activation: 2,
        },
        {
          value: "quotation",
          label: "报价规则",
          path: "biddingCompetitionQuotation",
          activation: 3,
        },
      ],
    };
  },
  computed: {
    title() {
      const { rfqCode, projectCode } = this.ruleForm || {};
      return rfqCode ? `RFQ编号：${rfqCode}` : `项目编号：${projectCode}`;
    },
    role() {
      return this.$route.meta.role;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        switch (to.name) {
          case "biddingCompetition":
            this.$router.push({
              name: "biddingCompetitionBase",
            });
            this.actived = 1;
            break;
          case "biddingCompetitionBase":
            this.actived = 1;
            this.bottomActived = 1;
            break;
          case "biddingCompetitionProject":
            this.actived = 2;
            this.bottomActived = 2;
            break;
          case "biddingCompetitionQuotation":
            this.actived = 3;
            this.bottomActived = 3;
            break;
        }
      },
    },
  },
  methods: {
    handleChangeTitle(data) {
      this.ruleForm = data;
    },
    // 返回
    handleBack() {
      this.$router.push({
        name: "biddingProjectInquiry",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header-item-mouse {
  cursor: pointer;
  ::v-deep .el-button--default {
    cursor: pointer !important;
  }
}
.card {
  .card--header {
    .card--header--item {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 15px;
      min-height: 37px;

      .header--item--left {
        display: flex;
        .header--item--lable {
          ::v-deep .el-button {
            font-size: 0.9rem;
            background-color: #fff;
            color: #1763f7;
            box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
            border-color: transparent;
          }
        }

        .header--item--lable__left {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          min-width: 290px;
          margin-right: 10px;
        }
      }
      .hander-item-right {
        ::v-deep .el-button--default {
          min-width: 10rem;
        }
      }
      .header--item--left__btn {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;

        ::v-deep .el-button--default {
          min-width: 130px;
          margin-bottom: 10px;
          cursor: default;
        }
        ::v-deep .el-button.active {
          color: #1763f7;
          box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
          border-color: transparent;
        }
      }
      .header--item--left__tab {
        ::v-deep .el-button {
          margin-left: 2px;
          background-color: #fcfdfd;
          color: #ccc;
        }
      }
    }
  }
}
</style>
