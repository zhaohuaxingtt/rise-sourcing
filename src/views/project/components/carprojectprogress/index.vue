<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 22:46:03
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-25 15:49:08
 * @Description: 车型项目详情
 * @FilePath: \front-web\src\views\project\components\carprojectprogress\index.vue
-->

<template>
  <iCard class="projectCard" :collapse="collapse" @handleCollapse="handleCollapse" >
    <div class="clearFloat" slot="header-control">
      <div class="titleSearch">
        <span class="margin-right20 titleSearch-label">{{language('CHEXINGXIANGMU','车型项目')}}</span>
        <iSelect filterable v-model="carProjectId" @change="handleCarProjectChange" :disabled="disabled">
          <el-option
            v-for="item in carProjectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </iSelect>
      </div>
    </div>
    <div class="projectCard-content" >
      <carEmpty v-if="!carProjectId" />
      <carProject v-else :carProjectId="carProjectId" @changeSopStatus="changeSopStatus" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iMessage, iSelect } from 'rise'
import { getSelectCarType } from '@/api/project'
import carEmpty from '@/views/project/components/empty/carEmpty'
import carProject from './components/progress'
export default {
  components: { iCard, carEmpty, carProject, iSelect },
  props: {
    carProjectId: {type:String},
    disabled: {type:Boolean, default:false},
    collapse: {type:Boolean, default:false}
  },
  data() {
    return {
      carProjectOptions: [],
    }
  },
  created() {
    this.getCarProjectOptinos()
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
    handleCarProjectChange(val) {
      this.$emit('handleCarProjectChange', val, this.carProjectOptions.find(item => item.value === val).label)
    },
     /**
     * @Description: 获取车型项目下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getCarProjectOptinos() {
      getSelectCarType().then(res => {
        if (res?.result) {
          this.carProjectOptions = res.data.map(item => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProjectZh
            }
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.projectCard {
  &-content {
    margin-top: 20px;
    border-top: 1px dashed #BBC4D6;;
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