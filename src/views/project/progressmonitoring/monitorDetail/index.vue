<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 11:08:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:06:15
 * @Description: 监控明细
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\monitorDetail\index.vue
-->

<template>
  <iPage class="monitorDetail" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_PAGE|项目管理-监控明细页面">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="carProgress" v-show="vm.collapseValue" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_CARPROGRESS|项目管理-监控明细-车型项目进度状态部分">
      <carProject :carProjectId="carProjectId" />
    </iCard>
    <iCard class="projectCard" :class="{withCollapse:!vm.collapseValue, 'margin-top20':vm.collapseValue}" v-permission.auto="PROJECTMGT_MONITORINGDETAIL_PARTLIST|项目管理-监控明细-零件列表">
      <div class="margin-bottom20 searchWrapper">
        <div class="titleSearch">
          <div v-for="(item, index) in searchListByPartStatus" :key="index" class="titleSearch-item" v-permission.auto="item.permission">
            <span class="titleSearch-item-lable">{{language(item.key, item.label)}}</span>
            <iDicoptions @change="handleChange" v-if="item.type === 'selectDict'" class="titleSearch-item-content" :optionAll="item.optionAll" :optionKey="item.selectOption" v-model="searchParams[item.value]" :optionAllText="language('ZONGJI','总计')" />
            <iSelect v-else-if="item.type === 'select'" v-model="searchParams[item.value]" class="titleSearch-item-content" >
              <el-option
                v-if="item.optionAll"
                value=""
                :label="language('ZONGJI','总计')"
              ></el-option>
              <el-option
                :value="items.code"
                :label="items.value"
                v-for="(items, index) in options"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
        </div>
        <div>
          <iButton @click="handleSure">{{language('LK_INQUIRE', '查询')}}</iButton>
          <iButton @click="handleReset">{{language('CHONGZHI','重置')}}</iButton>
        </div>
      </div>
      <div class="projectCard-content">
        <partList v-if="!loading" ref="monitorDetailPartList" v-loading="loading" :list="partList" :partStatus="partStatus" :cartypeProId="carProjectId" :carProjectName="carProjectName" @handleSure="handleSure" :sliceArr="sliceArr"/>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iMessage, iSelect } from 'rise'
import carProject from '@/views/project/components/carprojectprogress/components/progress'
import iDicoptions from 'rise/web/components/iDicoptions'
import partList from './components/partList'
import { getProProgressMonitorDetail } from '@/api/project/process'
import {selectDictByKeyss} from '@/api/dictionary'
export default {
  components: { iPage, carProject, iCard, iDicoptions, iButton, partList, iSelect },
  data() {
    return {
      collapseValue: true,
      searchList: [
        {value: 'partStatus', label: '零件状态', key: 'LINGJIANZHUANGTAI', type: 'select', selectOption: 'PART_PERIOD_TYPE', optionAll: false, permission: 'PROJECTMGT_MONITORINGDETAIL_PARTSTATUS|项目管理-监控明细-零件状态'},
        {value: 'projectRisk', label: '项目风险', key: 'XIANGMUFENGXIAN', type: 'selectDict', selectOption: 'DELAY_GRADE_CONFIG', optionAll: true, permission: 'PROJECTMGT_MONITORINGDETAIL_PROJECTRISK|项目管理-监控明细-项目风险'},
        {value: 'projectProc', label: '项目进度', key: 'XIANGMUJINDU', type: 'selectDict', selectOption: 'PROJECTDONE', optionAll: true,permission: 'PROJECTMGT_MONITORINGDETAIL_PROJECTDONE|项目管理-监控明细-项目进度'},
        {value: 'partProc', label: '零件进度', key: 'LINGJIANJINDU', type: 'selectDict', selectOption: 'PARTS_PROGRESS', optionAll: true,permission: 'PROJECTMGT_MONITORINGDETAIL_PARTPROC|项目管理-监控明细-零件进度'},
      ],
      searchParams: {
        projectId: '1001862',
        partStatus: '4'
      },
      partList: [],
      loading: false,
      partStatus: 0,
      options: [],
      sliceArr: [0, 10],
    }
  },
  inject:['vm'],
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
          if (Number(this.searchParams.partStatus) !== 9) {
            return [...accu, curr]
          } else {
            return accu
          }
        } else if (curr.key === 'XIANGMUJINDU') {
          if (this.searchParams.partStatus == 9) {
            return [...accu, curr]
          } else {
            return accu
          }
        } else if (curr.key === 'LINGJIANJINDU') {
          if (Number(this.searchParams.partStatus) !== 9 && Number(this.searchParams.partStatus) !== 1) {
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
    this.searchParams = { projectId: carProjectId, partStatus, projectRisk, projectProc: projectDone, partProc }
    this.handleSure()
  },
  mounted() {
    this.getDict()
  },
  methods: {
    getDict() {
      selectDictByKeyss('PART_PERIOD_TYPE').then((res) => {
        const options = res.data && res.data['PART_PERIOD_TYPE'] || [];
        this.options = options.filter(item => item.code !== '9').map(o => {
          o.value = o.value || o.name || o.nameEn
          if (this.lang) o.value = this.$i18n.locale === 'zh' ? o.value : o.nameEn
          return o
        })
      })
    },
    handleChange(val) {
      console.log(val)
    },
    handleReset() {
      this.searchParams = {
        ...this.searchParams,
        projectRisk: '',
        partProc: '',
        projectProc: ''
      }
      this.handleSure()
    },
    handleSure() {
      this.searchParams = {
        ...this.searchParams,
        projectRisk: this.searchParams.partStatus == 9 ? '' : this.searchParams.projectRisk,
        projectProc: this.searchParams.partStatus == 9 ? this.searchParams.projectProc : '',
        partProc: this.searchParams.partStatus == 9 && this.searchParams.partStatus == 1 ? '' : this.searchParams.partProc
      }
      this.partStatus = this.searchParams.partStatus
      this.loading = true
      getProProgressMonitorDetail(this.searchParams).then(res => {
        this.sliceArr = [0, 10]
        if (res?.result) {
          this.partList = res.data
        } else {
          this.partList = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)  
        }
      }).catch(e => {
        this.partList = []
      }).finally(() => {
        this.loading = false
        this.$refs.monitorDetailPartList.resetSelectPart()
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
  height: calc(100% - 45px);
  overflow: visible;
  .carProgress {
    ::v-deep .cardHeader {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    ::v-deep .cardBody {
      position: relative;
      top: -20px;
      padding-bottom: 0;
    }
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
      height: 100%;
      overflow: hidden;
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