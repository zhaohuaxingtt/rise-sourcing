<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 14:18:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-22 11:42:58
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\components\carproNameTop.vue
-->

<template>
  <div class="carProjectTop">
    <div>
      <span class="carProjectTop-name">{{language('CHEXINGXIANGMU','车型项目')}}: {{carProjectName}}</span>
      <i @click="handleCollapse" v-if='collapse' class="el-icon-arrow-up collapse margin-left20 cursor" :class="{ rotate: !collapseValue }"></i>
    </div>
    <div class="carProjectTop-control">
      <iButton @click="handleBack">{{language('FANHUI', '返回')}}</iButton>
      <!-- <logButton class="margin-left20" @click="toLogPage" /> -->
      <iLoger ref="log" :config="{ bizId_obj_ae: bizId}" isPage :isUser="true" class="margin-left20" />
      <!-- <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon> -->
      <!-- <iLog :show.sync="showDialog" :bizId="bizId"></iLog> -->
    </div>
  </div>
</template>

<script>
import { iButton, icon } from 'rise'
import logButton from "@/components/logButton"
import iLog from '@/views/project/log'
import iLoger from 'rise/web/components/iLoger'
export default {
  components: { iButton, icon, logButton, iLog, iLoger },
  computed: {
    carProjectName() {
      return this.$route.query.carProjectName
    },
    bizId() {
      return this.$route.path.includes('projectprogressmonitoring') ? 'progressMonitorId' : 'scheduleRecordId'
    },
    collapse() {
      return this.$route.meta.collapse
    }
  },
  data() {
    return {
      // bizId: 'scheduleRecordId',
      showDialog: false,
      collapseValue: true
    }
  },
  methods: {
    handleCollapse() {
      this.collapseValue = !this.collapseValue
      this.$emit('handleCollapse', this.collapseValue)
    },
    handleBack() {
      this.$router.go(-1)
    },
    toLogPage(){
      this.showDialog = true
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
  .el-icon-arrow-up {
    transition: all 0.5s;
  }

  .rotate {
    transform: rotate(180deg);
    color: $color-blue;
  }

  .collapse {
    font-size: 20px;
    color:#D3D3DB;

    &:hover {
      color:$color-blue;
    }
  }
}
</style>