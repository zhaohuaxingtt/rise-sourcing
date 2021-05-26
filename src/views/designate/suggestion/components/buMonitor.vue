<!--
 * @Author: haojiang
 * @Date: 2021-05-25 09:42:07
 * @LastEditTime: 2021-05-25 17:15:37
 * @Description: 业务分配模拟
-->

<template>
  <div class="buMonitor">
    <el-row :gutter="24">
      <!-- 供应商表格 -->
      <el-col :span="16">
        <div class="supplierTable">
          <div class="margin-bottom20 clearFloat">
            <span class="font18 font-weight">
              {{ $t("nominationSuggestion.YeWuFenPeiMoNi") }}
            </span>
            <span class="updateTime">
              {{$t("nominationSuggestion.ShuaXinShiJian")}}:
              {{'2021-05-25'}}
            </span>
            
            <div class="floatright">
              <!-- 合并功能 -->
              <span class="combine">
                <iButton>
                  {{ $t("nominationSuggestion.ZuHe") }}
                </iButton>
                <iButton>
                  {{ $t("nominationSuggestion.QuXiaoZuHe") }}
                </iButton>
              </span>
              <span class="combine" v-if="multiEditControl">
                <iButton @click="multiEditControl = false">
                  {{ $t("nominationSuggestion.TuiChuBianJi") }}
                </iButton>
                <iButton>
                  {{ $t("LK_BAOCUN") }}
                </iButton>
              </span>
              <span class="combine" v-else>
                <!-- 编辑 -->
                <iButton @click="multiEditControl = true">
                  {{ $t("LK_BIANJI") }}
                </iButton>
              </span>
              <!-- 重置 -->
              <iButton>
                {{ $t("nominationSupplier.Reset") }}
              </iButton>
              <!-- 刷新 -->
              <iButton>
                {{ $t("nominationSupplier.Refresh") }}
              </iButton>
            </div>

            <!-- 表格 -->
            <div class="clearfix"></div>
            <div class="margin-top20">
              <monitorTableList @updateCharts="updateCharts" :batchEdit="multiEditControl" />
            </div>
          </div>
        </div>
      </el-col>
      <!-- 图标模拟 -->
      <el-col :span="8">
        <div class="buMonitor-charts">
          <buMonitorCharts :data="chartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { iButton } from 'rise'
import buMonitorCharts from './buMonitorCharts'
import monitorTableList from './monitorTableList'

export default {
  components: {
    iButton,
    buMonitorCharts,
    monitorTableList
  },
  data() {
    return {
      multiEditControl: false,
      tableEditState: false,
      chartData: []
    }
  },
  methods: {
    updateCharts(data) {
      this.chartData = data
    }
  }
}
</script>
<style lang="scss" scoped>
.buMonitor {
  box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
  border-radius: 0.375rem;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  .supplierTable {
    .updateTime {
      display: inline-block;
      padding-left: 15px;
      font-size: 12px;
    }
  }
}
.clearfix {
  clear: both;
}
.combine {
  margin-right: 10px
}
</style>