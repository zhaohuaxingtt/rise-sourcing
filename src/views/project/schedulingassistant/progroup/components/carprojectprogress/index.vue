<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 22:46:03
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-12 19:20:59
 * @Description: 车型项目详情
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\carprojectprogress\index.vue
-->

<template>
  <div class="carProject" v-loading="loading">
    <div class="carProject-detail">
      <img src="../../../../../../assets/images/car.png" />
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
          <icon v-else-if="item.isDone == 1 && nodeList[index+1].isDone == 2" symbol name="iconchanpinzupaicheng_jinhangzhong" class="step-between-icon"></icon>
          <!-- 已完成 -->
          <icon v-else-if="item.isDone == 1" symbol name="iconchanpinzupaicheng_yiwancheng" class="step-between-icon"></icon>
          <!-- 未完成 -->
          <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="step-between-icon"></icon>
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
      nodeList: []
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
      }
    }
  }
}
</style>