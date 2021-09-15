<!--
 * @Author: Luoshuang
 * @Date: 2021-09-15 14:51:03
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-15 16:26:34
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\monitorDetail\components\partList\index.vue
-->
<template>
  <div class="partListView" v-loading="loading"> 
    <div class="partListView-title"> 
      <div class="partListView-title-span"> 
        <!-- <el-checkbox class="partListView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> 
        <span class="partListView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span>  -->
      </div> 
      <div > 
        <iButton @click="handleSave" :loading="saveloading">{{language('CHAKANYANWUYUANYIN', '查看延误原因')}}</iButton> 
        <iButton :loading="versionLoading" @click="handleSecheduleVersion">{{language('CHAKANPAICHENGJIHUA', '查看排程计划')}}</iButton> 
        <iButton @click="handleSendFs">{{language('FASONGJINDUQUEREN', '发送进度确认')}}</iButton> 
        <iButton :loading="versionLoading" @click="handleSecheduleVersion">{{language('YANWUYUANYINQUEREN', '延误原因确认')}}</iButton> 
        <iButton @click="handleSendFs">{{language('DAOCHUQINGDAN', '导出清单')}}</iButton> 
      </div> 
    </div> 
    <div class="partListView-content"> 
      <div v-for="pro in parts" :key="pro.label" class="productItem"> 
        <div class="productItem-top"> 
          <el-checkbox v-model="pro.isChecked" @change="handleCheckboxChange($event, pro)"> 
            {{`${pro.partNum} ${pro.partNameZh} ${pro.partNameDe}`}} 
          </el-checkbox> 
        </div> 
        <div class="productItem-bottom">
          <div class="productItem-bottom-text">
            <div v-for="item in targetList" :key="item.value" class="productItem-top-targetList-item margin-top20">
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
                <iText class="productItem-bottom-stepBetween-input text ">{{pro[item[taItem.props]]}}{{index === nodeList.length - 1 ? '('+(pro[item[taItem.props1]] || '')+')' : ''}}</iText>
              </div>
            </div>
            <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1">
              <icon symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon margin-top45"></icon>
            </div>
          </div>
        </div>
      </div> 
    </div> 
    <!-- <fsConfirm ref="fsConfirmPart" :dialogVisible="dialogVisibleFS" @handleConfirm="handleSendFsConfirm" :tableListNomi="tableListNomi" :tableListKickoff="tableListKickoff" :cartypeProId="cartypeProId" @changeVisible="changeFsConfirmVisible" />  -->
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
      parts: [{partNum:'123232NN', partNameZh:'是啥', partNameDe: 'ZHFDSFLKF'}],
      checkedProducts: [],
      isIndeterminate: false,
      fsConfirmDialogVisible: false,
      targetList: [
        {label: '计划时间', key: 'JIHUASHIJIAN', value: 'vffTarget', props: 'vff', props1: 'vff1'},
        {label: '实际时间', key: 'SHIJISHIJIAN', value: 'pvsTarget', props: 'pvs', props1: 'pvs1'},
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
          this.parts = res.data || []
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handleCheckAllChange(val) {
      this.parts = this.parts.map(item => {
        return {
          ...item,
          isChecked: val
        }
      })
      this.isIndeterminate = false;
    },
    handleCheckboxChange(value, pro) {
      console.log(this.parts)
      let checkedCount = this.parts.filter(item => item.isChecked).length;
      this.checkAll = checkedCount === this.parts.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.parts.length;
    }
  }
}
</script>

<style lang="scss" scoped>
.partListView {
  height: 100%;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px;
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
  &-content {
    height: calc(100% - 80px);
    overflow: auto;
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
            width: 160px;
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