<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <div class="headerNav-wraper margin-bottom10">
    <div class="headerNav">
      <iNavMvp
        :list="navListLeft"
        lang
        @change="change"
        :lev="1"
        routerPage
      ></iNavMvp>
      <iNavMvp
        @change="change"
        lang
        class="pull-right"
        right
        :routerPage="true"
        lev="2"
        reversePosit
        :list="heaederSubMenu"
      />
    </div>
    <div class="headerNav-sub margin-top30"></div>
  </div>
</template>
<script>
import { iNavMvp, iTabsList } from "rise";
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing");

export default {
  data() {
    return {
      group: null,
    };
  },
  props: {
    type: {
      type: String,
      default: "sourceinquirypoint"
    }
  },
  components: {
    iNavMvp,
    iTabsList,
  },
  created() {
    this.updateNavList;
    this.group = this[`${ this.type }ThirdMenu`].filter((i) => i.url == this.$route.path)[0].group;
  },
  computed: {
    ...mapState([
      "sourceinquirypointNavListLeft", 
      "sourceinquirypointThirdMenu",
      "financialmanageNavListLeft",
      "financialmanageThirdMenu",
      "scoremanageNavListLeft",
      "scoremanageThirdMenu"
    ]),
    ...mapActions(["updateNavList"]),
    navListLeft() {
      return this[`${ this.type }NavListLeft`] || []
    },
    heaederSubMenu() {
      let heaederSubMenu = this[`${ this.type }ThirdMenu`]
        .filter((i) => i.group == this.group)
        .map((item, index) => {
          item.value = 1 + index;
          return item;
        });
      return heaederSubMenu;
    },
  },
  methods: {
    change(pramas) {
      this.group = pramas.group;
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