<!--RISE协议号自定义-->
<template>
  <div class="RiseFlex">
    <div class="tooltipWidth">
      <el-tooltip v-if="row['daysToToday'] <= 10 && row['state'] == 'draft'" class="item" effect="light" MODEL-ORDER.LK_JULIYOUXIAOQISHIRIQIHAIYOUNTIAN :content="$t('LK_JULIYOUXIAOQISHIRIQIHAIYOUNTIAN', { day: row['daysToToday'] })" placement="bottom">
        <span class="g-red" @click="openPage(row)">
          <icon class="el-icon-warning-outline" color="red" />
        </span>
      </el-tooltip>
    </div>
    <span :class="'openLinkText cursor'" @click="openPage(row)"> {{ row['contractCode'] }}</span>
    <span class="icon-gray" @click="openPage(row)">
      <icon symbol class="show" name="icontiaozhuananniu" />
      <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
    </span>
  </div>
</template>

<script>
import { icon } from 'rise'
export default {
  components: { icon },
  name: 'RiseContractCodeComponents',
  props: {
    row: { type: Object, require: true },
  },
  methods: {
    openPage(e) {
      this.$emit('openPage', e)
    },
  },
}
</script>
<style lang='scss' scoped>
.tooltipWidth {
  width: 16.8px;
  height: 16.8px;
}
.RiseFlex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.openLinkText {
  color: $color-blue;
}
.g-red {
  cursor: pointer;
  color: #cc4949;
  //display: none;
  // align-items: center;
  // margin-left: 10px;
  // justify-content: center;
}
.icon-gray {
  cursor: pointer;
  .active {
    display: none;
  }
  .show {
    display: block;
  }
}
.icon-gray:hover {
  cursor: pointer;
  .show {
    display: none;
  }
  .active {
    display: block;
  }
}
</style>