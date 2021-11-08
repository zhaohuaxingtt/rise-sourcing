<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
<div class="headerNav-wraper margin-bottom10 margin-top20 margin-left20 margin-right20">
  <div class="margin-bottom20 clearFloat">
    <span class="font18 font-weight">
      {{ mode === 'add' ? language("XINJIANQIANZIDAN",'新建签字单') : language("LK_QIANZIDAN",'签字单') }}</span
    >
    <div class="floatright">
      <span v-if="mode === 'add'">
        <iButton @click="handleSave" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSSAVE|签字单详情保存">
          {{ language("BAOCUN",'保存') }}
        </iButton>
        <iButton @click="handleSubmit" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSSUBMIT|签字单详情提交">
          {{ language("LK_TIJIAO",'提交') }}
        </iButton>
        <iButton @click="handleRemove" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DETAILSREMOVE|签字单详情移除">
          {{ language("YICHU",'移除') }}
        </iButton>
        <iButton @click="$router.push({path: '/sourcing/partsnomination/signSheet'})">
          {{ language("FANHUI",'返回') }}
        </iButton>
      </span>
      <span v-else>
        <iButton @click="$router.push({path: '/sourcing/partsnomination/signSheet'})">
          {{ language("LK_FANHUI",'返回') }}
        </iButton>
      </span>
      
    </div>
    <headerNav />
  </div>
  <div class="headerNav-sub margin-top30">
    <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
      <el-tab-pane lazy v-for="(item,index) in heaederSubMenu" :key="index" :label="item.name" :name="item.key" v-permission.dynamic.auto="item.permissionKey"></el-tab-pane>
    </iTabsList>
  </div>
  <router-link/>
</div>
</template>
<script>
import {MENU, heaederSubMenu} from './components/data'
import {
  // icon,
  iTabsList,
  iButton
} from "rise";
import { clickMessage } from "@/views/partsign/home/components/data"
// eslint-disable-next-line no-undef
export default {
  data() {
    return {
      heaederSubMenu,
      tab: 'partDesignateOrders',
      mode: this.$route.query.mode || '',
    }
  },
  components: {
    // icon,
    iTabsList,
    iButton
  },
  created() {
    // const heaederSubMenuItem = this.heaederSubMenu.find(o => o.path === this.$route.path)
    // this.tab = heaederSubMenuItem ? heaederSubMenuItem.key : 'nomination'
    this.updateNavList
  },
  methods: {
    change() {
    },
    // tab切换
    handleTabClick(){
      const { query } =  this.$route;
      const path = this.heaederSubMenu.find(o => o.key === this.tab).path
      console.log('query', query);
      console.log('path', path);
      this.$router.push({
          path,
          query,
      });
    },
    // 通过待办数跳转
    clickMessage,
  }
}
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  position: relative;
  &:after {
    content: '';
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
          content: '';
          width: 1px;
          height: 16px;
          background: #000000;
          opacity: 0.42;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -8px
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
.pull-right{
  float: right;
}
</style>