<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 13:59:40
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-26 17:03:36
 * @Description: 零件排程页面
 * @FilePath: \front-web\src\views\project\schedulingassistant\part\index.vue
-->

<template>
  <iPage class="schedulePart">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ------------>
    <!---------------------------------------------------------------------->
    <carProject :carProjectId="carProject" @handleCarProjectChange="handleCarProjectChange" :collapse="true" @changeSopStatus="changeSopStatus" @handleCollapse="handleCollapse" />
    <!---------------------------------------------------------------------->
    <!----------                  零件区域                   ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="margin-top20 partCard" :class="{withCollapse:!collapseValue}">
      <div class="margin-bottom20 searchWrapper">
        <div class="titleSearch">
          <div v-for="(item, index) in searchList" :key="index" class="titleSearch-item">
            <span class="titleSearch-item-lable">{{language(item.key, item.label)}}</span>
            <el-autocomplete class="titleSearch-item-content" :fetch-suggestions="item.querySearch" v-if="item.type === 'input'" v-model="searchParams[item.value]" :trigger-on-focus="false" />
            <iSelect class="titleSearch-item-content" v-else-if="item.type === 'select'" v-model="searchParams[item.value]" >
              <el-option
                :value="item.code"
                :label="item.name"
                v-for="(item) in delayGradeConfigOption"
                :key="item.code"
              ></el-option>
            </iSelect>
          </div>
        </div>
        <div>
          <iButton @click="handleSure">{{language('QUEREN','确认')}}</iButton>
          <iButton @click="handleReset">{{language('CHONGZHI','重置')}}</iButton>
        </div>
      </div>
      <carEmpty v-if="!carProject" :isColumn="true" />
      <partList v-else ref="partList" :isSop="isSop" :collapseValue="collapseValue" :cartypeProId="carProject" :carProjectName="carProjectName" />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iSelect, iButton } from 'rise'
import carProject from '@/views/project/components/carprojectprogress'
import { getLastOperateCarType } from '@/api/project'
import partList from './components/partList'
import carEmpty from '../../components/empty/carEmpty'
import { getDictByCode } from '@/api/dictionary'
export default {
  components: { iPage, carProject, iCard, iSelect, iButton, carEmpty, partList },
  data() {
    return {
      carProject: '',
      carProjectName: '',
      searchList: [
        {value: 'partNum', label: '零件号', key: 'LINGJIANHAO', type: 'input', querySearch: this.querySearchPartNum},
        {value: 'partNameZh', label: '零件中文名称', key: 'LINGJIANZHONGWENMINGCHENG', type: 'input', querySearch: this.querySearchPartNameZh},
        {value: 'partNameDe', label: '零件德文名称', key: 'LINGJIANDEWENMINGCHENG', type: 'input', querySearch: this.querySearchPartNameDe},
        {value: 'level', label: '风险等级', key: 'FENGXIANDENGJI', type: 'select'},
      ],
      searchParams: {},
      isSop: false,
      collapseValue: true,
      delayGradeConfigOption: []
    }
  },
  created() {
    this.init()
    this.getDict()
  },
  methods: {
    querySearchPartNameDe(queryString, cb) {
      var results = []
      if(this.$refs.partList?.getFitPartNameDeList) {
        results = this.$refs.partList.getFitPartNameDeList(queryString)
      }
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchPartNameZh(queryString, cb) {
      var results = []
      if(this.$refs.partList?.getFitPartNameZhList) {
        results = this.$refs.partList.getFitPartNameZhList(queryString)
      }
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchPartNum(queryString, cb) {
      var results = []
      if(this.$refs.partList?.getFitPartNumList) {
        results = this.$refs.partList.getFitPartNumList(queryString)
      }
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    /**
     * @Description: 重置筛选条件和页面
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleReset() {
      this.searchParams = {}
      this.$nextTick(() => {
        this.handleSure()
      })
    },
    /**
     * @Description: 根据条件删选
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSure() {
      this.$refs.partList.searchPartList && this.$refs.partList.searchPartList(this.searchParams)
    },
    /**
     * @Description: 下拉框获取
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getDict() {
      getDictByCode('DELAY_GRADE_CONFIG').then(res => {
      if(res?.result) {
        this.delayGradeConfigOption = res.data[0].subDictResultVo
      }
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
    /**
     * @Description: 是否sop状态切换
     * @Author: Luoshuang
     * @param {*} isSop
     * @return {*}
     */    
    changeSopStatus(isSop) {
      this.isSop = isSop
    },
    /**
     * @Description: 初始化页面
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      if (this.$route.query.carProject) { // 概览页跳转到此页面
        this.carProject = this.$route.query.carProject
        this.carProjectName = this.$route.query.cartypeProjectZh
        this.initPartSchedule(this.carProject)
      } else { // 点击tab进入，获取用户最后一次操作的车型项目
        this.getLastOperateCarType()
      }
    },
    initPartSchedule(carProjectId) {
      if (carProjectId) {
        this.$nextTick(() => {
          this.$refs.partList?.getPartList && this.$refs.partList.getPartList(carProjectId)
        })
      }
    },
    /**
     * @Description: 车型项目切换
     * @Author: Luoshuang
     * @param {*} carProjectId
     * @param {*} carProjectName
     * @return {*}
     */    
    handleCarProjectChange(carProjectId, carProjectName) {
      this.carProjectName = carProjectName
      this.initPartSchedule(carProjectId)
    },
    /**
     * @Description: 获取用户最后一次操作的车型项目
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getLastOperateCarType() {
      const res = await getLastOperateCarType(2)
      if (res?.result) {
        if (res.data.id) {
          this.carProject = res.data.id
          this.carProjectName = res.data.cartypeProName
          this.initPartSchedule(this.carProject)
        }
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
.schedulePart {
  padding: 0;
  padding-top: 10px;
  height: calc(100% - 55px);
  overflow: auto;
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
    height: calc(100% - 360px);
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