<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 22:46:03
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-03 09:51:45
 * @Description: 车型项目详情
 * @FilePath: \front-web\src\views\project\components\carprojectprogress\index.vue
-->

<template>
  <iCard class="projectProgressCard" :collapse="collapse" @handleCollapse="handleCollapse" >
    <div class="clearFloat" slot="header-control">
      <div class="titleSearch">
        <span class="margin-right20 titleSearch-label">{{language('CHEXINGXIANGMU','车型项目')}}</span>
        <carProjectSelect optionType="2" :filterable="true" v-model="carProjectId" @change="handleCarProjectChange" :disabled="disabled" />
      </div>
    </div>
    <div class="projectProgressCard-content" >
      <carEmpty v-if="!carProjectId" />
      <carProject v-else :carProjectId="carProjectId" @changeSopStatus="changeSopStatus" />
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import carEmpty from '@/views/project/components/empty/carEmpty'
import carProject from './components/progress'
import carProjectSelect from '../commonSelect/carProjectSelect'
export default {
  components: { iCard, carEmpty, carProject, carProjectSelect },
  props: {
    carProjectId: {type:String},
    disabled: {type:Boolean, default:false},
    collapse: {type:Boolean, default:true}
  },
  data() {
    return {
      carProjectOptions: [],
    }
  },
  methods: {
    handleCollapse(collapseValue) {
      this.$emit('handleCollapse', collapseValue)
    },
    /**
     * @Description: 是否sop状态修改，外层需要根据车型项目是否已sop做对应调整
     * @Author: Luoshuang
     * @param {*} isSop
     * @return {*}
     */
    changeSopStatus(isSop) {
      this.$emit('changeSopStatus', isSop)
    },
    /**
     * @Description: 车型项目选择改变时，返回车型项目id和名称
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleCarProjectChange(val, valLabel) {
      this.$emit('handleCarProjectChange', val, valLabel)
    }
  }
}
</script>

<style lang="scss" scoped>
.projectProgressCard {
  &-content {
    margin-top: 20px;
    border-top: 1px dashed #BBC4D6;;
  }
  .titleSearch-label {
    width: auto !important;
  }
  .titleSearch {
    display: flex;
    align-items: center;
    float: left;
    &-label {
      display: block;
      width: 60px;
      font-size: 14px !important;
    }
    ::v-deep .el-select {
      width: 240px;
    }
  }
  ::v-deep .cardHeader {
    width: 100%;
    & > div {
      &:first-child {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  ::v-deep .cardBody {
    margin-top: -15px;
  }
}
</style>