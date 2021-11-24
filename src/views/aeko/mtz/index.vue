<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-29 10:34:01
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-11-24 16:39:25
 * @Description: 
-->
<template>
  <iPage class="aeko-mtz" >
    <div class="margin-bottom25 aeko-mtz-header">
      <span class="akeoTitle">{{language('LK_MTZBIANGENG', 'MTZ变更')}}:{{ $route.query.aekoNum }}</span>
      <div style="aeko-mtz-submenu">
        <!-- <logButton class="margin-left20" @click="toLogPage" v-if="showLogButton" /> -->
        <iLoger v-if="showLogButton" :config="{module_obj_ae: 'AEKO表态-详情页-内容表态', menuName_obj_ae: 'MTZ变更维护', bizId_obj_ae: 'requirementAekoId', queryParams:['bizId_obj_ae']}" isPage class="margin-left20" />
        <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
      </div>
    </div>
    <router-view @showLog="showLog"></router-view>
  </iPage>
</template>
<script>
import {iPage,icon,} from 'rise'
import iLoger from 'rise/web/components/iLoger'

export default {
  components: {
    iPage,
    icon,
    iLoger
  },
  provide() {
    return {
      vm: this,
    };
  },
  data() {
    return {
      showLogButton: true
    }
  },
  methods: {
    gotoDBhistory() {
      const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/historyprocessdb`})
      window.open(router.href,'_blank')
    },
  }
}
</script>
<style lang="scss" scoped>
.aeko-mtz {
  .aeko-mtz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .akeoTitle {
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
  }
  .aeko-mtz-submenu {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
  .aeko-mtz-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.log-icon {
  font-size: 20px;
  color: #CAD9F8;
}
</style>