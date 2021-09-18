<!--
 * @Author: your name
 * @Date: 2021-08-24 16:55:21
 * @LastEditTime: 2021-09-17 14:13:13
 * @LastEditors: Hao,Jiang
 * @Description: 项目状态图表
 * @FilePath: /front-web/src/views/project/progressmonitoring/components/projectStateChart.vue
-->
<template>
  <div class="projectStateChart" :class="{'disabled': disabled}">
    <div class="tit" @click="onTitleClick" v-html="(data && data.title) || ''"></div>
    <div class="projectStateChart-container">
      <div class="subtit" v-show="!disabled">{{language('XIANGMUFENGXIAN', '项目风险')}}</div>
      <div v-show="!disabled" :id="id" class="projectStateChart-charts"></div>
      <div class="process" v-show="!disabled && !(data && data.hideTaskProcess)">
        <div class="subtit">{{language('RENWUJINDU', '任务进度')}}</div>
        <ul>
          <li 
            v-for="(item, index) in partProc"
            :key="index"
            @click="onTaskProcessClick(item)">
            <icon symbol :name="item.icon" class="icon" /><span>{{data && item.valueKey && data[item.valueKey] || 0}}</span></li>
        </ul>
      </div>
      
      
    </div>
    
  </div>
</template>

<script>
import {icon} from 'rise'
import echarts from "@/utils/echarts";
import {generateOptions} from './lib/genBarChart'
import {partProc} from './lib/data'

export default {
  components: {icon},
  props: {
    id: {
      type: String,
      default: `chart${Math.floor(Math.random()*100000000)}`
    },
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isEMOTSComplished() {
      return this.data.isEMOTSComplished
    }
  },
  data() {
    return {
      partProc
    }
  },
  watch: {
    data(data) {
      this.init(data)
    },
    disabled(disabled) {
      if (!disabled) {
        this.$nextTick(() => {
          this.init(this.data)
        })
      }
    }
  },
  mounted() {
    this.init(this.data)
  },
  methods: {
    init(params) {
      if (this.disabled || !params) return
      const self = this
      const options = generateOptions(params, params.type)
      console.log('-mokeData-', options, this.id)
      const vm = echarts().init(document.getElementById(this.id));
      vm.clear()
      vm.setOption(options);
      // 点击事件
      vm.on('click', 'series.bar', function (params) {
        self.$emit('onSeriesBarClick', Object.assign(params, self.data))
      });
    },
    /**
     * @description: 点击标题
     * @param {*}
     * @return {*}
     */    
    onTitleClick() {
      this.$emit('onTitleClick', this.data)
    },
    /**
     * @description: 点击任务进度的点
     * @param {*} row
     * @return {*}
     */    
    onTaskProcessClick(row) {
      this.$emit('onTaskProcessClick', Object.assign(this.data, row))
    },
  }
}
</script>
<style lang="scss" scoped>
.projectStateChart {
  min-width: 190px;
  width: 100%;
  height: 388px;
  position: relative;
  &.disabled {
    .tit {
      color: #CDD4E2;
    }
    .projectStateChart-container {
      background: url(~@/assets/images/dash_disabled.gif) no-repeat center #F8F8FA;
      border: 1px solid rgba(200, 208, 226, 0.3);
    }
  }
  .tit {
    padding: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    // line-height: 21px;
    color: #0D0D0D;
    ::v-deep.sup {
      display: inline-block;
      line-height: 10px;
    }
  }
  .projectStateChart-container {
    box-sizing: border-box;
    border: 1px solid rgba(200, 208, 226, 1);
    border-radius: 3px;
    width: 100%;
    height: 350px;
    min-width: 190px;
    padding-bottom: 20px;
    .subtit {
      padding: 10px 10px;
    }
    .process {
      width: 90%;
      border-top: 1px solid #eaedf6;
      margin-left: 5%;
      ul {
        width: 100%;
        text-align: center;
        li {
          display: inline-block;
          padding: 2px 10px;
          cursor: pointer;
          span {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            line-height: 20px;
            padding-top: 5px;
          }
        }
      }
    }
  }
  .projectStateChart-charts {
    width: 100%;
    min-width: 190px;
    height: 180px;
  }
  
}

</style>