<!--RISE协议号自定义-->
<template>
  <div>
    <span :class="'openLinkText cursor'" @click="openPage(row)"> {{ row["contractCode"] }}</span>
    <el-tooltip
      v-if="row['daysToToday'] <= 10 && row['state'] == 'draft'"
      class="item"
      effect="light"
      LK_JULIYOUXIAOQISHIRIQIHAIYOUNTIAN
      :content="$t('LK_JULIYOUXIAOQISHIRIQIHAIYOUNTIAN',{day:row['daysToToday']})"
      placement="bottom">
            <span class="g-red" @click="openPage(row)">
              <icon class="el-icon-warning-outline" color="red"/>
            </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    row: {type: Object, require: true},
  },
  methods: {
    openPage(e) {
      this.$emit("openPage", e);
    },
  }

}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}
.g-red {
  cursor: pointer;
  color: #cc4949;
  //display: none;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}
</style>