<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome">
    <!-- <div class="headerNav-wraper margin-bottom10 margin-top20 margin-left20 margin-right20"> -->
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{
          mode === "add"
            ? language("XINJIANQIANZIDAN", "新建签字单")
            : language("LK_QIANZIDAN", "签字单")
        }}</span
      >
      <div class="floatright">
        <span v-if="mode === 'add'">
          <iButton
            :loading="updateLoading"
            @click="save"
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_DETAILSSAVE | 签字单详情保存
            "
          >
            {{ language("BAOCUN", "保存") }}
          </iButton>
          <iButton
            :loading="updateLoading"
            @click="submit"
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_DETAILSSUBMIT | 签字单详情提交
            "
          >
            {{ language("LK_TIJIAO", "提交") }}
          </iButton>
          <iButton
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_BACKEDIT | 签字单详情编辑返回
            "
            @click="
              $router.push({ path: '/sourcing/partsnomination/signSheet' })
            "
          >
            {{ language("FANHUI", "返回") }}
          </iButton>
        </span>
        <span v-else>
          <iButton
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_BACK | 签字单详情返回
            "
            @click="
              $router.push({ path: '/sourcing/partsnomination/signSheet' })
            "
          >
            {{ language("LK_FANHUI", "返回") }}
          </iButton>
        </span>
        <iLoger
          ref="log"
          :config="{ bizId_obj_ae: 'id', queryParams: ['bizId_obj_ae'] }"
          isPage
          :isUser="true"
          class="margin-left20"
        />
      </div>
      <headerNav />
    </div>
    <div class="headerNav-sub margin-top30 margin-bottom30">
      <iTabsList type="card" v-model="tab">
        <el-tab-pane
          v-for="(tab, $index) in tabs"
          :key="$index"
          :label="tab.name"
          :name="tab.key"
        >
          <div class="margin-top20">
            <component
              :ref="tab.key"
              :is="tab.component"
              :description.sync="description"
              @deleteData="deleteData"
            />
          </div>
        </el-tab-pane>
      </iTabsList>
    </div>
    <!-- <router-view ref="signSheetCom"></router-view> -->
    <!-- </div> -->
  </iPage>
</template>
<script>
import { MENU, heaederSubMenu } from "./components/data";
import {
  // icon,
  iTabsList,
  iButton,
  iPage,
  iMessage,
} from "rise";
import { clickMessage } from "@/views/partsign/home/components/data";
import partDesignateOrders from "@/views/designate/home/signSheet/details";
import MTZDesignateOrders from "@/views/designate/home/signSheet/mtzDetails";
import ChipDesignateOrders from "@/views/designate/home/signSheet/chipDetails";
import {
  saveSignSheet,
  submitSignSheet,
} from "@/api/designate/nomination/signsheet";
import iLoger from "rise/web/components/iLoger";

// eslint-disable-next-line no-undef
export default {
  data() {
    return {
      heaederSubMenu,
      tab: "partDesignateOrders",
      mode: this.$route.query.mode || "",
      tabs: [
        {
          key: "partDesignateOrders",
          name: "零件定点申请单",
          component: partDesignateOrders,
        },
        {
          key: "MTZDesignateOrders",
          name: "MTZ定点申请单",
          component: MTZDesignateOrders,
        },
        {
          key: "CHIPDesignateOrders",
          name: "芯片定点申请单",
          component: ChipDesignateOrders,
        },
      ],
      description: "",
      updateLoading: false,
    };
  },
  components: {
    // icon,
    iTabsList,
    iButton,
    iPage,
    iMessage,
    partDesignateOrders,
    MTZDesignateOrders,
    iLoger,
  },
  created() {
    const heaederSubMenuItem = this.heaederSubMenu.find(
      (o) => o.path === this.$route.path
    );
    this.tab = heaederSubMenuItem ? heaederSubMenuItem.key : "nomination";
    this.updateNavList;
  },
  methods: {
    change() {},
    // tab切换
    handleTabClick() {
      const { query } = this.$route;
      const path = this.heaederSubMenu.find((o) => o.key === this.tab).path;
      this.$router.push({
        path,
        query,
      });
    },
    save() {
      const params = {
        signId: this.$route.query.id,
        description: this.description,
      };

      params.nominateIdArr = Array.isArray(
        this.$refs.partDesignateOrders[0].tableListData
      )
        ? this.$refs.partDesignateOrders[0].tableListData.map((item) => item.id)
        : [];
        // MTZ
      params.mtzApplyIdAttr = Array.isArray(
        this.$refs.MTZDesignateOrders[0].tableListData
      )
        ? this.$refs.MTZDesignateOrders[0].tableListData.map((item) => item.id)
        : [];
        // 芯片
      params.chipApplyIdAttr = Array.isArray(
        this.$refs.CHIPDesignateOrders[0].tableListData
      )
        ? this.$refs.CHIPDesignateOrders[0].tableListData.map((item) => item.id)
        : [];

      this.updateLoading = true;
      saveSignSheet(params)
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.$refs.partDesignateOrders[0].getChooseData();
            this.$refs.partDesignateOrders[0].getSignSheetDetails();
            this.$refs.MTZDesignateOrders[0].getTableData();
            this.$refs.MTZDesignateOrders[0].getsignSheetDetails();
            this.$refs.CHIPDesignateOrders[0].getTableData();
            this.$refs.CHIPDesignateOrders[0].getSignSheetDetails();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => (this.updateLoading = false));
      // this.$refs.signSheetCom.handleSave()
    },
    async submit() {
      const params = {
        signIdArr: [this.$route.query.id],
      };

      const confirmInfo = await this.$confirm(
        this.language(
          "QINGQUEDINGTIJIAOZHIQIANYIJINGBAOCUNSHUJU",
          "请确定提交之前已经保存数据？"
        )
      );
      if (confirmInfo !== "confirm") return;

      this.updateLoading = true;
      submitSignSheet(params)
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.$refs.partDesignateOrders[0].getChooseData();
            this.$refs.partDesignateOrders[0].getSignSheetDetails();
            this.$refs.MTZDesignateOrders[0].getTableData();
            this.$refs.MTZDesignateOrders[0].getsignSheetDetails();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => (this.updateLoading = false));

      // this.$refs.signSheetCom.handleSubmit()
    },
    remove() {
      this.$refs.signSheetCom.handleRemove();
    },
    // 通过待办数跳转
    clickMessage,
    // 关联删除mtz
    deleteData(data) {
      if (Array.isArray(data))
        this.$refs.MTZDesignateOrders[0].forceDelete(
          data.map((item) => item.mtzApplyId)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  position: relative;
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 0px;
    bottom: -0.5rem;
  }
  .ext {
    ul {
      display: inline-block;
      vertical-align: middle;
      li {
        position: relative;
        display: inline-block;
        padding: 0 17px;
        line-height: 25px;
        &:after {
          display: inline-block;
          content: "";
          width: 1px;
          height: 16px;
          background: #000000;
          opacity: 0.42;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -8px;
        }
        &:last-child {
          padding-right: 0px;
          &:after {
            display: none;
          }
        }
        a {
          font-size: 18px;
          color: #000000;
          opacity: 0.42;
        }
      }
    }
    .iconMenu {
      display: inline-block;
      vertical-align: middle;
      padding: 0px 5px;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 80px;
        font-size: 16px;
        font-size: 1.175rem;
        vertical-align: middle;
      }
    }
    .iconDatabase {
      display: inline-block;
      vertical-align: middle;
      color: #f8f9fa !important;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 20px;
        font-size: 20px;
        font-size: 1.4rem;
        vertical-align: middle;
        color: #f8f9fa !important;
      }
    }
  }
}
.headerNav-sub {
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
}
.pull-right {
  float: right;
}
</style>