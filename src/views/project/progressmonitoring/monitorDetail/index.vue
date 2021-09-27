<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 11:08:13
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-24 15:26:07
 * @Description: 监控明细
 * @FilePath: \front-web\src\views\project\progressmonitoring\monitorDetail\index.vue
-->

<template>
  <iPage class="monitorDetail" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_PAGE|项目管理-监控明细页面">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="carProgress" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_CARPROGRESS|项目管理-监控明细-车型项目进度状态部分">
      <carProject :carProjectId="carProjectId" />
    </iCard>
    <iCard class="margin-top20 projectCard" :class="{withCollapse:!collapseValue}" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_PARTLIST|项目管理-监控明细-零件列表">
      <div class="margin-bottom20 searchWrapper">
        <div class="titleSearch">
          <div v-for="(item, index) in searchListByPartStatus" :key="index" class="titleSearch-item" v-permission.auto="item.permission">
            <span class="titleSearch-item-lable">{{language(item.key, item.label)}}</span>
            <iDicoptions v-if="item.type === 'selectDict'" class="titleSearch-item-content" :optionAll="item.optionAll" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
          </div>
        </div>
        <div>
          <iButton @click="handleSure">{{language('QUEREN','确认')}}</iButton>
          <iButton @click="handleReset">{{language('CHONGZHI','重置')}}</iButton>
        </div>
      </div>
      <div class="projectCard-content">
        <partList v-loading="loading" :list="partList" :partStatus="partStatus" :cartypeProId="carProjectId" :carProjectName="carProjectName" @handleSure="handleSure" />
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iMessage } from 'rise'
import carProject from '@/views/project/components/carprojectprogress/components/progress'
import iDicoptions from 'rise/web/components/iDicoptions'
import partList from './components/partList'
import { getProProgressMonitorDetail } from '@/api/project/process'
export default {
  components: { iPage, carProject, iCard, iDicoptions, iButton, partList },
  data() {
    return {
      collapseValue: true,
      searchList: [
        {value: 'partStatus', label: '零件状态', key: 'LINGJIANZHUANGTAI', type: 'selectDict', selectOption: 'PART_PERIOD_TYPE', optionAll: false, permission: 'PROJECTMGT_MONITORINGDETAIL_PARTSTATUS|项目管理-监控明细-零件状态'},
        {value: 'projectRisk', label: '项目风险', key: 'XIANGMUFENGXIAN', type: 'selectDict', selectOption: 'DELAY_GRADE_CONFIG', optionAll: true, permission: 'PROJECTMGT_MONITORINGDETAIL_PROJECTRISK|项目管理-监控明细-项目风险'},
        {value: 'projectDone', label: '项目进度', key: 'XIANGMUJINDU', type: 'selectDict', selectOption: 'PROJECTDONE', optionAll: true,permission: 'PROJECTMGT_MONITORINGDETAIL_PROJECTDONE|项目管理-监控明细-项目进度'},
        {value: 'partProc', label: '零件进度', key: 'LINGJIANJINDU', type: 'selectDict', selectOption: 'PARTS_PROGRESS', optionAll: true,permission: 'PROJECTMGT_MONITORINGDETAIL_PARTPROC|项目管理-监控明细-零件进度'},
      ],
      searchParams: {
        projectId: '1001862',
        partStatus: '4'
      },
      partList: [],
      loading: false,
      partStatus: 0
    }
  },
  computed: {
    carProjectId() {
      return this.$route.query.carProjectId
    },
    carProjectName() {
      return this.$route.query.carProjectName
    },
    searchListByPartStatus() {
      return this.searchList.reduce((accu, curr) => {
        if (curr.key === 'XIANGMUFENGXIAN') {
          if (Number(this.searchParams.partStatus) !== 7) {
            return [...accu, curr]
          } else {
            return accu
          }
        } else if (curr.key === 'XIANGMUJINDU') {
          if (this.searchParams.partStatus == 7) {
            return [...accu, curr]
          } else {
            return accu
          }
        } else if (curr.key === 'LINGJIANJINDU') {
          if (Number(this.searchParams.partStatus) !== 7 && Number(this.searchParams.partStatus) !== 1) {
            return [...accu, curr]
          } else {
            return accu
          }
        } else {
          return [...accu, curr]
        }
      },[])
    }
  },
  created() {
    const { carProjectId = '', partStatus = '', projectRisk = '', projectDone = '', partProc = ''} = this.$route.query
    this.searchParams = { projectId: carProjectId, partStatus, projectRisk, projectDone, partProc }
    this.handleSure()
  },
  methods: {
    handleReset() {
      this.searchParams = {
        ...this.searchParams,
        projectRisk: '',
        partProc: '',
        projectDone: ''
      }
      this.handleSure()
    },
    handleSure() {
      this.searchParams = {
        ...this.searchParams,
        projectRisk: this.searchParams.partStatus == 7 ? '' : this.searchParams.projectRisk,
        projectDone: this.searchParams.partStatus == 7 ? this.searchParams.projectDone : '',
        partProc: this.searchParams.partStatus == 7 && this.searchParams.partStatus == 1 ? '' : this.searchParams.partProc
      }
      this.partStatus = this.searchParams.partStatus
      this.loading = true
      getProProgressMonitorDetail(this.searchParams).then(res => {
        if (res?.result) {
          this.partList = res.data
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)  
        }
      }).finally(() => {
        this.loading = false
      })
    },
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
  height: calc(100% - 65px);
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
  .projectCard {
    height: calc(100% - 180px);
    overflow: hidden;
    &.withCollapse {
      height: calc(100% - 120px);
      overflow: auto;
    }
    &-content {
      height: calc(100% - 40px);
    }
  }
  ::v-deep .card > div:first-child {
    height: 100%;
  }
}
</style>