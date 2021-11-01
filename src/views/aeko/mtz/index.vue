<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-29 10:34:01
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-29 15:31:42
 * @Description: 
-->
<template>
  <iPage class="aeko-mtz" >
    <div class="margin-bottom25 aeko-mtz-header">
      <span class="akeoTitle">{{language('LK_MTZBIANGENG', 'MTZ变更')}}:{{ $route.query.aekoNum }}</span>
      <div style="aeko-mtz-submenu">
        <logButton class="margin-left20" @click="toLogPage" />
        <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
      </div>
    </div>
    <router-view></router-view>
  </iPage>
</template>
<script>
import {iPage,icon,} from 'rise'
import logButton from "@/components/logButton"

export default {
  components: {
    iPage,
    icon,
    logButton
  },
  methods: {
    // 跳转查看日志
    toLogPage() {
      const id = 'scheduleRecordId'
      const router =  this.$router.resolve({path: `/log?recordId=${id}`})
      window.open(router.href, '_blank')
    },
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