<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 22:46:03
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-28 10:53:47
 * @Description: 车型项目详情
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\carProject\index.vue
-->

<template>
  <div class="carProject">
    <div class="carProject-detail">
      <img src="../../../../../../assets/images/car.png" />
      <span class="carProject-detail-title">Tiguan X 2021</span>
      <div class="carProject-detail-info">
        <span>上海工厂</span>
        <span>SOP: 2020年12月</span>
      </div>
    </div>
    <div class="carProject-progress">
      <div v-for="(item, index) in progressListWithWeek" :key="item.label" class="stepItem">
        <div class="stepItem-box">
            <!-- 已完成 -->
          <icon v-if="item.isDone" symbol name="icondingdianguanli-yiwancheng"  class="step-icon"></icon> 
          <!-- 正在进行中 -->
          <icon v-else-if="index > 0 ? !item.isDone && progressListWithWeek[index - 1].isDone : !item.isDone" symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
          <!-- 未完成 -->
          <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>
          <span class="stepItem-box-title">{{item.label}}</span>
          <span class="stepItem-box-week">{{item.week}}</span>
        </div>
          <!-- 正在进行中 -->
          <template v-if="index === progressListWithWeek.length - 1"></template>
          <icon v-else-if="item.isDone && !progressListWithWeek[index+1].isDone" symbol name="iconchanpinzupaicheng_jinhangzhong" class="step-between-icon"></icon>
          <!-- 已完成 -->
          <icon v-else-if="item.isDone" symbol name="iconchanpinzupaicheng_yiwancheng" class="step-between-icon"></icon>
          <!-- 未完成 -->
          <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="step-between-icon"></icon>
      </div>
    </div>
  </div>
</template>

<script>
import { icon } from 'rise'
import moment from 'moment'
export default {
  components: { icon },
  data() {
    return {
      progressList: [
        { label: 'PD', date: '2020-05-01' },
        { label: 'PF', date: '2020-05-01' },
        { label: 'KF', date: '2020-05-01' },
        { label: 'PLF', date: '2020-05-01' },
        { label: 'BF', date: '2020-05-01' },
        { label: 'LF', date: '2021-05-01' },
        { label: 'VFF', date: '2021-06-01' },
        { label: 'PVS', date: '2021-07-01' },
        { label: '0S', date: '2021-08-01' },
        { label: 'SOP', date: '2021-09-01' },
        { label: 'ME', date: '2021-12-01' }
      ]
    }
  },
  computed: {
    progressListWithWeek() {
      return this.progressList.map(item => {
        return {
          ...item,
          week: `${moment(item.date).year()}-KW${moment(item.date).week()}`,
          isDone: moment(item.date).isBefore(moment())
        }
      })
    }
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
    width: 200px;
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