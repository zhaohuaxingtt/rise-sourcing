<!--
 * @Author: Luoshuang
 * @Date: 2021-08-24 10:24:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-16 10:55:54
 * @Description: 车型项目详情
 * @FilePath: \front-web\src\views\project\components\carprojectprogress\components\progress.vue
-->

<template>
  <div class="carProject" v-loading="loading">
    <div class="carProject-detail">
      <img src="../../../../../assets/images/car.png" />
      <span class="carProject-detail-title">{{carProjectInfo.cartypeProCode}}</span>
      <div class="carProject-detail-info">
        <span>{{carProjectInfo.factory}}</span>
        <span>SOP: {{carProjectInfo.pepSopWk}}</span>
      </div>
    </div>
    <div class="carProject-progress">
      <div v-for="(item, index) in nodeList" :key="item.label" class="stepItem">
        <div class="stepItem-box">
            <!-- 已完成 -->
          <icon v-if="item.isDone == 1" symbol name="icondingdianguanli-yiwancheng"  class="step-icon"></icon> 
          <!-- 正在进行中 -->
          <icon v-else-if="item.isDone == 2" symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
          <!-- 未完成 -->
          <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>
          <span class="stepItem-box-title">{{item.label}}</span>
          <span class="stepItem-box-week">{{item.week}}</span>
        </div>
          <!-- 正在进行中 -->
          <template v-if="index === nodeList.length - 1"></template>
          <!-- <icon v-else-if="item.isDone == 1 && nodeList[index+1].isDone == 2" symbol name="iconchanpinzupaicheng_jinhangzhong" class="step-between-icon"></icon> -->
          <span v-else-if="item.isDone == 1 && nodeList[index+1].isDone == 2" v-html="svgList['iconchanpinzupaicheng_jinhangzhong']" class="step-between-icon"></span>
          <!-- 已完成 -->
          <!-- <icon v-else-if="item.isDone == 1" symbol name="iconchanpinzupaicheng_yiwancheng" class="step-between-icon"></icon> -->
          <span v-else-if="item.isDone == 1" v-html="svgList['iconchanpinzupaicheng_yiwancheng']" class="step-between-icon"></span>
          <!-- 未完成 -->
          <!-- <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="step-between-icon"></icon> -->
          <span v-else v-html="svgList['iconchanpinzupaicheng_weijinhang']" class="step-between-icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { icon, iMessage } from 'rise'
import moment from 'moment'
import { getCarTypeProPepTimeNode } from '@/api/project'
export default {
  components: { icon },
  props: {
    carProjectId: {type:String}
  },
  data() {
    return {
      moment,
      loading: false,
      carProjectInfo: {},
      progressList: [
        { label: 'PD', date: '2020-05-01', value: 'pepPdWk', status: 'pepPdStatus' },
        { label: 'PF', date: '2020-05-01', value: 'pepPfWk', status: 'pepPfStatus' },
        { label: 'KF', date: '2020-05-01', value: 'pepKfWk', status: 'pepKfStatus' },
        { label: 'PLF', date: '2020-05-01', value: 'pepPlfWk', status: 'pepPlfStatus' },
        { label: 'BF', date: '2020-05-01', value: 'pepBfWk', status: 'pepBfStatus' },
        { label: 'LF', date: '2021-05-01', value: 'pepLfWk', status: 'pepLfStatus' },
        { label: 'VFF', date: '2021-06-01', value: 'pepVffWk', status: 'pepVffStatus' },
        { label: 'PVS', date: '2021-07-01', value: 'pepPvsWk', status: 'pepPvsStatus' },
        { label: '0S', date: '2021-08-01', value: 'pepOsWk', status: 'pepOsStatus' },
        { label: 'SOP', date: '2021-09-01', value: 'pepSopWk', status: 'pepSopStatus' },
        { label: 'ME', date: '2021-12-01', value: 'pepMeWk', status: 'pepMeStatus' }
      ],
      nodeList: [],
      svgList: {
        'iconchanpinzupaicheng_weijinhang': '<svg t="1631758281435" class="icon" viewBox="0 0 52224 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="56908" width="100%" height="100"><path d="M51712 1024h-2048a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2048a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-5120 0h-3072a512 512 0 0 1-512-512 512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072a512 512 0 0 1-512-512 512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072a512 512 0 0 1-512-512 512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072a512 512 0 0 1-512-512 512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072a512 512 0 0 1-512-512 512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072a512 512 0 0 1-512-512 512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072A512 512 0 0 1 6144 512a512 512 0 0 1 512-512h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z m-6144 0h-3072A512 512 0 0 1 0 512 512 512 0 0 1 512 0h3072a512 512 0 0 1 512 512 512 512 0 0 1-512 512z" fill="#CED4E1" p-id="56909"></path></svg>',
        'iconchanpinzupaicheng_yiwancheng': '<svg t="1631758321224" class="icon" viewBox="0 0 25600 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="66516" width="100%" height="100"><path d="M25108.07552 1024H492.65152A502.272 502.272 0 0 1 0.10752 512a502.272 502.272 0 0 1 492.544-512h24615.424A502.272 502.272 0 0 1 25600.10752 512a502.272 502.272 0 0 1-492.032 512z" fill="#1660F1" p-id="66517"></path></svg>',
        'iconchanpinzupaicheng_jinhangzhong': '<svg t="1631758354535" class="icon" viewBox="0 0 8704 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="76121" width="100%" height="100"><path d="M7750.236034 988.508727A213.63016 213.63016 0 0 1 7678.400333 824.020329V682.737763h-682.524474a170.631119 170.631119 0 1 1 0-341.262237h682.524474v-141.282566a213.63016 213.63016 0 0 1 71.835701-164.488398 143.500771 143.500771 0 0 1 153.568007-23.035201l690.885399 311.913684a216.701521 216.701521 0 0 1 0 375.388461l-690.885399 311.401791a141.453197 141.453197 0 0 1-58.526474 12.797334 147.93718 147.93718 0 0 1-95.041533-35.661904zM5289.564674 682.737763a170.631119 170.631119 0 0 1 0-341.262237h853.155593a170.631119 170.631119 0 1 1 0 341.262237zM3583.253489 682.737763a170.631119 170.631119 0 1 1 0-341.262237h853.155592a170.631119 170.631119 0 0 1 0 341.262237zM1876.942304 682.737763a170.631119 170.631119 0 1 1 0-341.262237h853.155592a170.631119 170.631119 0 1 1 0 341.262237zM170.631119 682.737763a170.631119 170.631119 0 1 1 0-341.262237h853.155592a170.631119 170.631119 0 1 1 0 341.262237z" fill="#1660F1" p-id="76122"></path></svg>',
        'iconchanpinzupaicheng_xuxian': '<svg t="1631758384625" class="icon" viewBox="0 0 28918 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="85726" width="100%" height="100"><path d="M28406.784 1024H26112a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2294.784a512 512 0 0 1 512 512 512 512 0 0 1-512 512zM23552 1024h-2560a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2560a512 512 0 0 1 512 512 512 512 0 0 1-512 512zM18432 1024h-2560a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2560a512 512 0 0 1 512 512 512 512 0 0 1-512 512zM13312 1024h-2560a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2560a512 512 0 0 1 512 512 512 512 0 0 1-512 512zM8192 1024h-2560a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2560a512 512 0 0 1 512 512 512 512 0 0 1-512 512zM3072 1024H512a512 512 0 0 1-512-512 512 512 0 0 1 512-512h2560a512 512 0 0 1 512 512 512 512 0 0 1-512 512z" fill="#1660F1" p-id="85727"></path></svg>'
      }
    }
  },
  watch: {
    carProjectId: {
      handler(id) {
        if (id) {
          this.getProgressList(id)
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @Description: 获取节点列表
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    async getProgressList(val) {
      if (!val) {
        return
      }
      this.loading = true
      try {
        const res = await getCarTypeProPepTimeNode(val)
        if (res?.result) {
          this.carProjectInfo = res.data
          this.nodeList = this.progressList.reduce((accu, curr) => {
            if (!res.data[curr.value]) {
              return accu
            }
            return [...accu, {
              ...curr,
              week: res.data[curr.value],
              isDone: res.data[curr.status]
            }]
          },[])
          this.$emit('changeSopStatus', moment(res.data.pepSop).isBefore(moment()))
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
        this.loading = false
      } catch(error) {
        this.loading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.carProject {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
  &-detail {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-title {
      font-size: 16px;
      font-weight: bold;
      color: #41434A;
      margin: 12px 0;
    }
    &-info {
      font-size: 14px;
      color: #5F6879;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  &-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 300px);
    margin-right: -40px;
    .step-icon {
      width: 36px;
      height: 36px;
    }
    .stepItem {
      display: flex;
      align-items: center;
      flex: 1;
      position: relative;
      &-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        &-title {
          font-size: 16px;
          font-weight: bold;
          color: #41434A;
          margin-top: 23px;
          margin-bottom: 12px;
        }
        &-week {
          font-size: 14px;
          color: #5F6879;
        }
      }
      .step-between-icon {
        height: 8px;
        width: calc(100% - 85px);
        position: absolute;
        right: 0;
        top: 14px;
        ::v-deep .icon {
          height: 10px;
        }
      }
    }
  }
}
</style>