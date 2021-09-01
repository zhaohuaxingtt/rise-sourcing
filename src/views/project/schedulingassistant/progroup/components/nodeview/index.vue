<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:14:21
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-01 17:23:13
 * @Description: 节点视图
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\nodeview\index.vue
-->
<template>
  <div class="periodicView" v-loading="loading">
    <div class="periodicView-title">
      <div class="periodicView-title-span">
        <el-checkbox class="periodicView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <span class="periodicView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span>
      </div>
      <div>
        <iButton @click="$emit('changeNodeView')">{{language('QIEHUANZHOUQISHITU', '切换周期视图')}}</iButton>
        <iButton @click="handleDownloadNode" :loading="downloadLoading">{{language('DAOCHU', '导出')}}</iButton>
      </div>
    </div>
    <div v-for="pro in products" :key="pro.label" class="productItem">
      <div class="productItem-top">
        <el-checkbox v-model="pro.isChecked" @change="handleCheckboxChange($event, pro)">
          {{pro.productGroupNameZh}}
        </el-checkbox>
      </div>
      <div class="productItem-bottom">
        <div class="productItem-bottom-text">
          <div v-for="item in targetList" :key="item.value" class="productItem-top-targetList-item margin-top20">
            <icon v-if="pro[item.value] == 1" symbol name="iconbaojiapingfengenzong-jiedian-lv" class="productItem-top-targetList-item-icon"></icon>
            <icon v-else-if="pro[item.value] == 2" symbol name="iconbaojiapingfengenzong-jiedian-huang" class="productItem-top-targetList-item-icon"></icon>
            <icon v-else-if="pro[item.value] == 3" symbol name="iconbaojiapingfengenzong-jiedian-hong" class="productItem-top-targetList-item-icon"></icon>
            <span class="productItem-top-targetList-item-label">{{language(item.key, item.label)}}</span>
          </div>
        </div>
        <div v-for="(item, index) in nodeList" :key="item.key" class="productItem-bottom-node">
          <div class="productItem-bottom-nodeItem">
            <span class="productItem-bottom-nodeItem-label" v-if="!item.label.includes('1st')">{{item.key ? language(item.key, item.label) : item.label}}</span>
            <span class="productItem-bottom-nodeItem-label" v-else>1<sup>st</sup>{{item.label.split('1st')[1]}}</span>
            <icon v-if="pro[item.status] === 1" symbol name="icondingdianguanli-yiwancheng" class="step-icon  click-icon"></icon>
            <icon v-else symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
            <div class="flex-box margin-top20 " v-for="taItem in targetList" :key="taItem.value" >
              <iText class="productItem-bottom-stepBetween-input text ">{{pro[item[taItem.props]]}}</iText>
              <iText v-if="index === nodeList.length - 1" class="productItem-bottom-stepBetween-input text margin-left10">{{pro[item[taItem.props1]]}}</iText>
            </div>
          </div>
          <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1">
            <icon symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon margin-top45"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton, icon, iText, iMessage } from 'rise'
import { getProductGroupNodeInfoList, downloadNodeView } from '@/api/project'
export default {
  components: { iButton, icon, iText },
  props: {
    cartypeProId: {type:String}
  },
  data() {
    return {
      loading: false,
      checkAll: false,
      products: [],
      checkedProducts: [],
      isIndeterminate: false,
      fsConfirmDialogVisible: false,
      targetList: [
        {label: 'VFF目标', key: 'VFFMUBIAO', value: 'vffTarget', props: 'vff', props1: 'vff1'},
        {label: 'PVS目标', key: 'PVSMUBIAO', value: 'pvsTarget', props: 'pvs', props1: 'pvs1'},
        {label: '0S目标', key: '0SMUBIAO', value: 'zerosTarget', props: 'os', props1: 'os1'}
      ],
      nodeList: [
        {label: '释放', key: 'SHIFANG', pvs: 'pvsTargetReleaseWeek', vff: 'vffTargetReleaseWeek', os: 'zerosTargetReleaseWeek', status: 'releaseStatus'},
        {label: '定点', key: 'DINGDIAN', pvs: 'pvsTargetNomiWeek', vff: 'vffTargetNomiWeek', os: 'zerosTargetNomiWeek', status: 'nomiStatus'},
        {label: 'BF', pvs: 'pvsTargetBfWeek', vff: 'vffTargetBfWeek', os: 'zerosTargetBfWeek', status: 'bfStatus'},
        {label: '1st Tryout', pvs: 'pvsTargetFirstTryWeek', vff: 'vffTargetFirstTryWeek', os: 'zerosTargetFirstTryWeek', status: 'firstTryStatus'},
        {label: 'EM(OTS)', pvs: 'pvsTargetEmWeek', vff: 'vffTargetEmWeek', os: 'zerosTargetEmWeek', pvs1: 'pvsTargetOtsWeek', vff1: 'vffTargetOtsWeek', os1: 'zerosTargetOtsWeek', status: 'emStatus'}
      ],
      downloadLoading: false
    }
  },
  methods: {
    async handleDownloadNode() {
      this.downloadLoading = true
      await downloadNodeView(this.cartypeProId)
      this.downloadLoading = false
    },
    init() {
      this.getProducts(this.cartypeProId)
    },
    getProducts(id) {
      this.loading = true
      getProductGroupNodeInfoList(id).then(res => {
        if (res?.result) {
          this.products = res.data || []
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleCheckAllChange(val) {
      this.products = this.products.map(item => {
        return {
          ...item,
          isChecked: val
        }
      })
      this.isIndeterminate = false;
    },
    handleCheckboxChange(value, pro) {
      console.log(this.products)
      let checkedCount = this.products.filter(item => item.isChecked).length;
      this.checkAll = checkedCount === this.products.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.products.length;
    }
  }
}
</script>

<style lang="scss" scoped>
.periodicView {
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0 20px;
    &-span {
      padding-left: 20px;
      display: flex;
      align-items: center;
      &-unit {
        font-size: 16px;
        color: #939393;
        margin-left: 12px;
      }
    }
  }
  .productItem {
    background-color: rgba(205, 212, 226, 0.12);
    border-radius: 10px;
    padding: 25px 20px 30px;
    &-top {
      display: flex;
      align-items: center;
      &-targetList {
        margin-left: 130px;
        display: flex;
        align-items: center;
        &-item {
          margin-right: 54px;
          display: flex;
          align-items: center;
          &-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
          &-label {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .flex-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        font-size: 16px;
        color: #333;
        margin-left: 30px;
        span {
          display: flex;
          height: 30px;
          align-items: center;
        }
      }
      &-node {
        flex: 2;
        position: relative;
        display: flex;
        &:last-child {
          flex: 1;
        }
        .productItem-bottom-nodeItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          &-label {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            // display: flex;
            height: 30px;
            // align-items: center;
            // justify-content: center;
          }
          .step-icon {
            width: 36px;
            height: 36px;
          }
        }
        .productItem-bottom-stepBetween {
          // position: absolute;
          // right: 0;
          // top: 30px;
          margin-left: 5%;
          width: 50%;
          margin-right: 5%;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          &-input {
            height: 30px;
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            &.text {
              border: 1px solid rgba(181, 186, 198, 0.19);
              background-color: rgba(233, 236, 241, 0.75);
            }
          }
          .small {
            .productItem-bottom-stepBetween-input {
              width: 60px;
            }
          }
          .step-between-icon {
            width: 100%;
          }
        }
      }
    }
  }
  .productItem + .productItem {
    margin-top: 20px;
  }
  ::v-deep .el-checkbox {
    display: flex;
    align-items: center;
  }
  ::v-deep .el-checkbox__inner {
    width: 20px;
    height: 20px;
    &::after {
      height: 10px;
      width: 5px;
      left: 6px;
    }
    &::before {
      top: 8px;
    }
  }
  ::v-deep .el-checkbox__label {
    font-size: 18px;
    font-weight: bold;
    color: #41434A;
  }
}
</style>