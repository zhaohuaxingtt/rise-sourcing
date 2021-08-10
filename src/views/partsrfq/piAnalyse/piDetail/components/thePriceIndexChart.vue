<template>
  <div>
    <div class="header-box">
      <div class="title">
        {{ language('PI.PIJIAGEFENXI', 'Price Index价格分析') }}
        <iconTips
            iconName="iconxinxitishi"
            :tipContent="language('PI.PIINDEXTISHI', '图中波动均为加权平均波动')"
            :iconStyle="{'fontSize': '12px'}"
            tipWidth="200"
            class="margin-left10"
        />
      </div>
      <div class="select-box">
        <div class="select-item">
          <div class="label">{{ language('PI.JIAGEWEIDU', '价格维度') }}</div>
          <el-cascader
              v-model="form.priceLatitude"
              :options="priceLatitudeOptions"
              :props="{ multiple: true }"
              @change="handlePriceLatitudeChange"
              collapse-tags
              clearable></el-cascader>
        </div>
        <div class="select-item margin-left30">
          <div class="label">{{ language('PI.SHIJIANKELIDU', '时间颗粒度') }}</div>
          <iSelect v-model="form.timeGranularity" @change="handleTimeGranularityChange">
            <el-option
                v-for="item of timeGranularityOptions"
                :key="item.name"
                :label="item.name"
                :value="item.value"
            ></el-option>
          </iSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iSelect} from 'rise';
import iconTips from '../../../../../components/ws3/iconTips';

export default {
  components: {
    iconTips,
    iSelect,
  },
  data() {
    return {
      priceLatitudeOptions: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
            }, {
              value: 7,
              label: '江苏',
            }, {
              value: 12,
              label: '浙江',
            }],
        },
      ],
      timeGranularityOptions: [
        {name: '年', value: '年'},
        {name: '季度', value: '季度'},
        {name: '月', value: '月'},
      ],
      form: {
        priceLatitude: [],
        timeGranularity: '',
      },
    };
  },
  methods: {
    handleTimeGranularityChange(val) {
      console.log(val);
    },
    handlePriceLatitudeChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped lang="scss">
.header-box {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  color: #000000;

  .title {
    display: flex;
    align-items: center;
  }

  .select-box {
    display: flex;
    align-items: center;

    .select-item {
      display: flex;
      align-items: center;

      .label {
        white-space: nowrap;
        font-size: 16px;
        color: #000000;
        margin-right: 20px;
      }
    }
  }
}
</style>
