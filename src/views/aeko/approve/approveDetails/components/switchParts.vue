<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:17:13
 * @LastEditTime: 2021-10-11 18:06:32
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard class="mb-20">
    <span class="title">切换零件：</span>
    <div class="i-select mb-20">
      <iSelect v-model="selected">
        <el-option
          :value="item.id"
          :label="item.name"
          v-for="(item, index) in applyType"
          :key="index"
        ></el-option>
      </iSelect>
    </div>
    <iTableCustom
      :data="tableData"
      :columns="setCloum"
      align="center"
    ></iTableCustom>
  </iCard>
</template>

<script>
import { switchPartsTableTitle } from "../data.js";
import { iCard, iSelect, iTableCustom } from "rise";
export default {
  components: {
    iCard,
    iSelect,
    iTableCustom,
  },
  data() {
    return {
      test: "123",
      selected: "",
      applyType: [
        {
          id: 1,
          key: "test",
          name: "3QG820005L_上海冀强_上海工厂",
        },
        {
          id: 2,
          key: "2test",
          name: "2QG820005L_上海冀强_上海工厂",
        },
      ],
      setCloum: switchPartsTableTitle,
      tableData: [
        {
          col1: "test",
          col2: "test1",
          col3: "test2",
          col4: "test3",
          col5: "test4",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 22px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  color: #000000;
}
.mb-20 {
  margin-bottom: 20px;
}
.i-select {
  width: 366px;
  height: 35px;
  display: inline-block;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
  border-radius: 4px;
}
</style>