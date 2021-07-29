<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:13:45
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-29 15:01:29
 * @Description: 周期视图
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\periodicview\index.vue
-->

<template>
  <div class="periodicView">
    <div class="periodicView-title">
      <div class="periodicView-title-span">
        <el-checkbox class="periodicView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <span class="periodicView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span>
      </div>
      <div>
        <iButton @click="$emit('changeNodeView')">{{language('QIEHUANJIEDIANSHITU', '切换节点视图')}}</iButton>
        <iButton>{{language('BAOCUN', '保存')}}</iButton>
        <iButton @click="handleSendFs">{{language('FASONGFSQUEREN', '发送FS确认')}}</iButton>
        <iButton>{{language('DAOCHUFASONGPVPKQINGDAN', '导出发送PV/PK清单')}}</iButton>
      </div>
    </div>
    <div v-for="pro in products" :key="pro.label" class="productItem">
      <div class="productItem-top">
        <el-checkbox v-model="pro.isChecked" @change="handleCheckboxChange($event, pro)">
          {{pro.label}}
        </el-checkbox>
        <div class="productItem-top-targetList">
          <div v-for="item in targetList" :key="item.value" class="productItem-top-targetList-item">
            <icon v-if="pro[item.value] == 1" symbol name="iconbaojiapingfengenzong-jiedian-lv" class="productItem-top-targetList-item-icon"></icon>
            <icon v-else symbol name="iconbaojiapingfengenzong-jiedian-hong" class="productItem-top-targetList-item-icon"></icon>
            <span class="productItem-top-targetList-item-label">{{language(item.key, item.label)}}</span>
          </div>
        </div>
      </div>
      <div class="productItem-bottom">
        <div class="productItem-bottom-text">
          <span class="margin-bottom14">{{language('JINGYANCHANGZHI', '经验常值')}}</span>
          <span>{{language('LISHICANKAOZHI', '历史参考值')}}<icon @click.native="gotoDBhistory" symbol name="iconlishicankaozhi" class="margin-left8 cursor"></icon></span>
        </div>
        <div v-for="(item, index) in nodeList" :key="item.key" class="productItem-bottom-node">
          <div class="productItem-bottom-nodeItem">
            <span class="productItem-bottom-nodeItem-label" v-if="!item.label.includes('1st')">{{item.key ? language(item.key, item.label) : item.label}}</span>
            <span class="productItem-bottom-nodeItem-label" v-else>1<sup>st</sup>{{item.label.split('1st')[1]}}</span>
            <icon symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
          </div>
          <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1">
            <div :class="`productItem-bottom-stepBetween-double flex-box margin-bottom18 ${index === nodeList.length - 2 && 'small'}`">
              <iInput onkeyup="value=value.replace(/[^\d]/g,'')" :class="`productItem-bottom-stepBetween-input ${pro[item.isChange] == 1 ? 'markBlue':''}` " v-model="pro[item.keyPoint]"></iInput>
              <div v-if="index === nodeList.length - 2" class="flex-box">
                （<iInput :class="`productItem-bottom-stepBetween-input ${pro[nodeList[nodeList.length - 1].isChange] == 1 ? 'markBlue':''}` " v-model="pro[nodeList[nodeList.length - 1].keyPoint]"></iInput>）
              </div>
            </div>
            <icon symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon"></icon>
            <div :class="`productItem-bottom-stepBetween-double flex-box margin-bottom14 margin-top30 ${index === nodeList.length - 2 && 'small'}`">
              <iText :class="`productItem-bottom-stepBetween-input text `">{{pro[item.const]}}</iText>
              <div v-if="index === nodeList.length - 2" class="flex-box">
                （<iText class="productItem-bottom-stepBetween-input text">{{pro[nodeList[nodeList.length - 1].const]}}</iText>）
              </div>
            </div>
            <div :class="`productItem-bottom-stepBetween-double flex-box ${index === nodeList.length - 2 && 'small'}`">
              <iText :class="`productItem-bottom-stepBetween-input text ${pro[item.history] && pro[item.const] && (pro[item.history] > pro[item.const]) ? 'markRed' : ''}`">{{pro[item.history]}}</iText>
              <div v-if="index === nodeList.length - 2" class="flex-box">
                （<iText :class="`productItem-bottom-stepBetween-input text ${pro[nodeList[nodeList.length - 1].history] && pro[nodeList[nodeList.length - 1].const] && (pro[nodeList[nodeList.length - 1].history] > pro[nodeList[nodeList.length - 1].const]) ? 'markRed' : ''}`">{{pro[nodeList[nodeList.length - 1].history]}}</iText>）
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fsConfirm :dialogVisible="fsConfirmDialogVisible" @changeVisible="changeFsConfirmVisible" />
  </div>
</template>

<script>
import { iButton, icon, iInput, iText } from 'rise'
import fsConfirm from '../fsconfirm'
export default {
  components: { iButton, fsConfirm, icon, iInput, iText },
  data() {
    return {
      checkAll: false,
      products: [
        {
          label:'保险杠',
          isChecked: false,
          vffTarget:1,
          keyReleaseToNomiWeek: 1,
          keyNomiToBffWeek: 1,
          keyBfToFirstTryoutWeek: 1,
          keyFirstTryOtsWeek: 1,
          keyFirstTryEmWeek: 1,
          constReleaseToNomiWeek: 1,
          constNomiToBffWeek: 1,
          constBfToFirstTryoutWeek: 1,
          constFirstTryOtsWeek: 1,
          constFirstTryEmWeek: 1,
          releaseToNomiWeek: 1,
          hiNomiToBffWeek: 2,
          hiBfToFirstTryoutWeek: 1,
          hiFirstTryOtsWeek: 5,
          hiFirstTryEmWeek: 1,
          keyReleaseToNomiStatus: 1,
          keyNomiToBffStatus: 0,
          keyBfToFirstTryoutStatus: 0,
          keyFirstTryOtsStatus: 0,
          keyFirstTryEmStatus: 1,
        }, 
        {
          label: '前大灯', 
          isChecked: false, 
          vffTarget:1
        }
      ],
      checkedProducts: [],
      isIndeterminate: false,
      fsConfirmDialogVisible: false,
      targetList: [
        {label: 'VFF目标', key: 'VFFMUBIAO', value: 'vffTarget'},
        {label: 'PVS目标', key: 'PVSMUBIAO', value: 'pvsTarget'},
        {label: '0S目标', key: '0SMUBIAO', value: 'zerosTarget'}
      ],
      nodeList: [
        {label: '释放', key: 'SHIFANG', const: 'constReleaseToNomiWeek', keyPoint: 'keyReleaseToNomiWeek', history: 'releaseToNomiWeek', isChange: 'keyReleaseToNomiStatus'},
        {label: '定点', key: 'DINGDIAN', const: 'constNomiToBffWeek', keyPoint: 'keyNomiToBffWeek', history: 'hiNomiToBffWeek', isChange: 'keyNomiToBffStatus'},
        {label: 'BF', const: 'keyBfToFirstTryoutWeek', keyPoint: 'constBfToFirstTryoutWeek', history: 'hiBfToFirstTryoutWeek', isChange: 'keyBfToFirstTryoutStatus'},
        {label: '1st Tryout', const: 'constFirstTryEmWeek', keyPoint: 'keyFirstTryEmWeek', history: 'hiFirstTryEmWeek', isChange: 'keyFirstTryEmStatus'},
        {label: 'EM(OTS)', const: 'constFirstTryOtsWeek', keyPoint: 'keyFirstTryOtsWeek', history: 'hiFirstTryOtsWeek', isChange: 'keyFirstTryOtsStatus'}
      ]
    }
  },
  methods: {
    gotoDBhistory() {
      const router =  this.$router.resolve({path: `/projectscheassistant/historyprocessdb`})
      window.open(router.href,'_blank')
    },
    handleSendFs() {
      this.changeFsConfirmVisible(true)
    },
    changeFsConfirmVisible(visible) {
      this.fsConfirmDialogVisible = visible 
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
          .flex-box {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &-input {
            height: 30px;
            width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            ::v-deep .el-input__inner {
              text-align: center;
              font-weight: bold;
            }
            &.text {
              border: 1px solid rgba(181, 186, 198, 0.19);
              background-color: rgba(233, 236, 241, 0.75);
            }
            &.markBlue {
              ::v-deep .el-input__inner{
                color: rgba(23, 99, 247, 1);
                text-align: center;
                border-color: rgba(23, 99, 247, 1);
              }
            }
            &.markRed {
              color: rgba(227, 13, 13, 1);
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