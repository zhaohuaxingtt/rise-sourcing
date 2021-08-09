<!--
 * @Author: haojiang
 * @Date: 2021-08-06 15:21:13
 * @LastEditTime: 2021-08-09 15:43:48
 * @LastEditors: Please set LastEditors
 * @Description: 状态跟踪详情
 * @FilePath: /front-web/src/views/dashboard/report/index.vue
-->
<template>
  <iPage class="dashboard-report">
    <headerNav />
    <div class="dashboard-card margin-top10">
      <el-row :gutter="10">
        <!-- 零件签收 -->
        <el-col :span="16">
          <!-- 列表筛选 -->
          <search />
        </el-col>
        <el-col :span="8">
          <iCard class="report-countrfq">
            <ul>
              <li><div><strong>26</strong><p class="margin-top10">{{language('JINXINGZHONGDERFQ','进行中的RFQ')}}</p></div></li>
              <li><div><strong class="note">3</strong><p class="margin-top10">{{language('YANWUDERFQ','延误的RFQ')}}</p></div></li>
            </ul>
          </iCard>
        </el-col>
      </el-row>
    </div>
    <div class="margin-top10">
      <iCard class="report-rfqList">
        <rfqList />
      </iCard>
    </div>
  </iPage>
</template>

<script>
import headerNav from './components/headerNav'
import search from './components/search'
import rfqList from './components/rfqList'
import {iPage, iCard, icon} from 'rise'

export default {
  components: {
    headerNav,
    iPage,
    iCard,
    search,
    rfqList
  }
}
</script>
<style lang="scss" scoped>
.report-countrfq {
  background: #fff;
  height: 131PX;
  overflow: hidden;
  position: relative;
  &:after {
    content: '';
    width: 1PX;
    height: 105px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -53px;
  }
  .cardBody {
    height: 131PX;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      text-align: center;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 50%;
      padding-top: 25px;
      strong {
        font-size: 40px;
        color: #000000;
        &.note {
          color: #E30D0D
        }
      }
    }
  }
}
.report-rfqList {
  .cardBody {
    padding-top: 0px;
  }
}
</style>