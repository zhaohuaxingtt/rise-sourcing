<!--
 * @Author: your name
 * @Date: 2021-07-26 20:00:13
 * @LastEditTime: 2021-08-24 17:16:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\index.vue
-->
<template>
  <iPage class="quondampart">
    <div class="header">
      <div class="title">{{ language("ZHIDINGYUANLINGJIAN", "指定原零件") }}</div>
      <div class="control">
        <!-- <iNavMvp class="nav margin-right20" :lev="2" :list="navList" lang routerPage routerParam /> -->
        <iButton @click="save" v-permission="AEKO_QUONDAMPARTLEDGER_BUTTON_SAVE">{{ language("LK_BAOCUN", "保存") }}</iButton>
        <iButton @click="handleBack">{{ language("FANHUI", "返回") }}</iButton>
        <div class="control">
          <logButton class="margin-left20" />
          <span class="margin-left20">
            <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
          </span>
        </div>
      </div>
    </div>
    <div class="margin-top30">
      <ledger ref='ledger'/>
      <aeko v-if="aekoShow"/>
      <!-- <router-view></router-view> -->
    </div>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, iButton, icon } from "rise"
import logButton from "@/components/logButton"
import { navList } from "./components/data"
import ledger from './components/ledger'
import aeko from './components/aeko'

export default {
  components: { iPage, 
    // iNavMvp,
   logButton, iButton, icon,
   ledger,
   aeko,
    },
  data() {
    return {
      navList,
      aekoShow:false,
    }
  },
  methods: {
    handleBack() {
      if (sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)) {
        try {
          const aekoConatentDeclareParams = JSON.parse(sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`))

          this.$router.replace({
            path: "/aeko/aekodetail",
            query: {
              requirementAekoId: aekoConatentDeclareParams.requirementAekoId
            }
          })
        } catch(e) {
          console.error(e)

          this.$router.replace({
            path: "/aeko/managelist",
            query: {}
          })
        }
      } else {
        this.$router.replace({
          path: "/aeko/managelist",
          query: {}
        })
      }
    },
    
    // 保存
    save(){
      this.$refs.ledger.handleSave();
    },
  },
  beforeDestroy() {
    if (sessionStorage.getItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)) sessionStorage.removeItem(`aekoConatentDeclareParams_${ this.$route.query.requirementAekoId }`)
  },
}
</script>

<style lang="scss" scoped>
.quondampart {
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .nav {
      // position: absolute;
      // top: 50%;
      // right: 130px;
      // transform: translate(0, -50%);
    }

    .subControl {
      // position: absolute;
      // top: 50%;
      // right: 0;
      // transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }
}
</style>