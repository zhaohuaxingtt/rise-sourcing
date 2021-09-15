<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 11:08:13
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-15 15:45:41
 * @Description: 监控明细
 * @FilePath: \front-web\src\views\project\progressmonitoring\monitorDetail\index.vue
-->

<template>
  <iPage class="monitorDetail" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_PAGE|项目管理-监控明细页面">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="carProgress">
      <carProject :carProjectId="carProjectId" />
    </iCard>
    <iCard class="margin-top20 projectCard" :class="{withCollapse:!collapseValue}" >
      <div class="margin-bottom20 searchWrapper">
        <div class="titleSearch">
          <div v-for="(item, index) in searchList" :key="index" class="titleSearch-item">
            <span class="titleSearch-item-lable">{{language(item.key, item.label)}}</span>
            <iDicoptions v-if="item.type === 'selectDict'" class="titleSearch-item-content" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
          </div>
        </div>
        <div>
          <iButton @click="handleSure">{{language('QUEREN','确认')}}</iButton>
          <iButton @click="handleReset">{{language('CHONGZHI','重置')}}</iButton>
        </div>
      </div>
      <div class="projectCard-content">
        <partList />
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from 'rise'
import carProject from '@/views/project/components/carprojectprogress/components/progress'
import iDicoptions from 'rise/web/components/iDicoptions'
import partList from './components/partList'
export default {
  components: { iPage, carProject, iCard, iDicoptions, iButton, partList },
  data() {
    return {
      collapseValue: true,
      searchList: [
        {value: 'partStatus', label: '零件状态', key: 'LINGJIANZHUANGTAI', type: 'selectDict', selectOption: 'PART_PERIOD_TYPE'},
        {value: 'level', label: '项目风险', key: 'XIANGMUFENGXIAN', type: 'selectDict', selectOption: 'DELAY_GRADE_CONFIG'},
        {value: 'level', label: '项目进度', key: 'XIANGMUJINDU', type: 'selectDict', selectOption: 'DELAY_GRADE_CONFIG'},
        {value: 'level', label: '零件进度', key: 'LINGJIANJINDU', type: 'selectDict', selectOption: 'DELAY_GRADE_CONFIG'},
      ],
      searchParams: {}
    }
  },
  computed: {
    carProjectId() {
      return this.$route.query.carProjectId
    },
    carProjectName() {
      return this.$route.query.carProjectName
    }
  },
  methods: {
    /**
     * @Description: 车型项目部分是否收起
     * @Author: Luoshuang
     * @param {*} collapseValue
     * @return {*}
     */    
    handleCollapse(collapseValue) {
      this.collapseValue = collapseValue
    },
  }
}
</script>

<style lang="scss" scoped>
.monitorDetail {
  padding: 0;
  padding-top: 10px;
  height: calc(100% - 55px);
  overflow: visible;
  .carProgress {
    .carProject {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .searchWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px dashed #BBC4D6;
    .titleSearch {
      display: flex;
      align-items: center;
      &-item {
        display: flex;
        align-items: center;
        &-lable {
          font-size: 14px;
          margin-right: 10px;
        }
        &-content {
          width: 220px
        }
      }
      .titleSearch-item + .titleSearch-item {
        margin-left: 50px;
      }
    }
  }
  .partCard {
    height: calc(100% - 345px);
    &.withCollapse {
      height: calc(100% - 120px);
      overflow: auto;
    }
  }
  ::v-deep .card > div:first-child {
    height: 100%;
  }
}
</style>