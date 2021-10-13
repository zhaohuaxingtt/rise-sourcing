<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:17:13
 * @LastEditTime: 2021-10-09 18:19:03
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard class="mb-20">
    <span class="title">切换零件：</span>
    <iSelect v-model="selected" class="i-select mb-20">
      <el-option
        :value="item.id"
        :label="item.name"
        v-for="(item, index) in applyType"
        :key="index"
      ></el-option>
    </iSelect>
    <iTableCustom
      :data="tableData"
      :columns="setCloum"
      align="center"
    ></iTableCustom>
  </iCard>
</template>

<script>
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
      setCloum: [
        {
          prop: "col1",
          label: "原A价",
          i18n: "原A价",
          customRender: (h, scope) => {
            return (
              <el-tooltip
                content="台账库"
                placement="top"
                effect="light"
                popper-class="custom-card-tooltip"
              >
                <span>{scope.row.col1}</span>
              </el-tooltip>
            );
          },
        },
        {
          prop: "col2",
          label: "A价变动(含分摊)",
          i18n: "A价变动(含分摊)",
        },
        {
          prop: "col3",
          label: "新A价",
          i18n: "新A价",
        },
        {
          prop: "col4",
          label: "原BNK价",
          i18n: "原BNK价",
        },
        {
          prop: "col5",
          label: "新BNK价",
          i18n: "新BNK价",
        },
        {
          prop: "col6",
          label: "模具投资变动",
          i18n: "模具投资变动",
        },
        {
          prop: "col7",
          label: "开发费",
          i18n: "开发费",
        },
        {
          prop: "col8",
          label: "终止费",
          i18n: "终止费",
        },
        {
          prop: "col9",
          label: "样件费",
          i18n: "样件费",
        },
        {
          prop: "col10",
          label: "货币",
          i18n: "货币",
        },
        {
          prop: "col11",
          label: "计量单位",
          i18n: "计量单位",
        },
      ],
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
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
  opacity: 1;
  border-radius: 4px;
}
</style>