<!--
 * @Author: your name
 * @Date: 2021-06-18 14:55:06
 * @LastEditTime: 2021-06-21 11:03:21
 * @LastEditors: Please set LastEditors
 * @Description: Bob分析页面
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\index.vue
-->
<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">BoB{{ $t("TPZS.FENXI") }}</span>
      <div class="floatright">
        <!--Bob分析库-->
        <iButton>BoB{{ $t("LK_FENXIKU") }}</iButton>
        <!--查找零件-->
        <iButton>{{ $t("LK_CHAZHAOLINGJIAN") }}</iButton>
        <!--预览-->
        <iButton>{{ $t("LK_YULAN") }}</iButton>
        <!--保存-->
        <iButton>{{ $t("LK_BAOCUN") }}</iButton>
        <div class="customBox margin-left10" @click="handleOpenCustomDialog">
          <icon symbol name="iconzidingyi" class="customIcon" />
        </div>
      </div>
    </div>
    <div class="flex margin-bottom20">
      <Search class="searchBox"></Search>
      <Chart class="chartBox margin-left20"></Chart>
     
    </div>
    <div class="flex">
      <Search class="searchBox"></Search>
      <feeDetails class="tableBox margin-left20"></feeDetails>
    </div>
    
     
  </iPage>
</template>

<script>
import { iPage, iButton, icon } from "rise";
import Search from "./components/search";
import Chart from "./components/chart";
import feeDetails from "./components/feeDetails";

export default {
  components: {
    iPage,
    iButton,
    icon,
    Search,
    Chart,
    feeDetails,
  },
  data() {
    return {
      form: {
        aaa: "",
        bbb: "",
        ccc: "",
        ddd: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.customBox {
  display: inline-block;
}
.customIcon {
  font-size: 20px;
}
.search {
  width: 280px;
}
.searchBox {
  height: 579px;
}
.chartBox {
  height: 579px;
  flex: 1;
}
.tableBox{
 flex: 1;
}
</style>
