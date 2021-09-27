<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 14:18:12
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-23 10:30:19
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\components\carproNameTop.vue
-->

<template>
  <div class="carProjectTop">
    <span class="carProjectTop-name">{{language('CHEXINGXIANGMU','车型项目')}}: {{carProjectName}}</span>
    <div class="carProjectTop-control">
      <iButton @click="handleBack">{{language('FANHUI', '返回')}}</iButton>
      <logButton class="margin-left20" @click="toLogPage" />
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
    </div>
  </div>
</template>

<script>
import { iButton, icon } from 'rise'
import logButton from "@/components/logButton"
export default {
  components: { iButton, icon, logButton },
  computed: {
    carProjectName() {
      return this.$route.query.carProjectName
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    toLogPage(){
      const id = 'scheduleRecordId'
      const router =  this.$router.resolve({path: `/log?recordId=${id}`})
      window.open(router.href, '_blank')
    },
    gotoDBhistory() {
      const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/historyprocessdb`})
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.carProjectTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  &-name {
    font-size: 20px;
    font-weight: bold;
  }
  &-control {
    display: flex;
    align-items: center;
  }
  .log-icon {
    font-size: 20px;
  }
}
</style>