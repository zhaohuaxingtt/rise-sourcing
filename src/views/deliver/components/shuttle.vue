<template>
  <iPage>
    <h1>HeavyItem</h1>
    <div class="shuttle-box">
      <iCard class="shuttle-item" title="备选清单">
        <div class="search">
          <span>查询条件：</span>
          <div class="search-input">
            <iInput
              v-model="leftSearch"
              @change="leftChange"
              placeholder="材料组/材料名称/零件编号/零件名称"
            ></iInput>
          </div>
        </div>
        <tableList class="table" :tableData="tableData" :tableTitle="tableTitle" max-height="600px">

        </tableList>
      </iCard>
      <div class="shuttle-btn-box">
        <i class="el-icon-caret-left font64"></i>
        <i class="el-icon-caret-right font64"></i>
      </div>
      <iCard class="shuttle-item" title="HeavyItem清单">
        <div class="search">
          <span>查询条件：</span>
          <div class="search-input">
            <iInput
              v-model="rightSearch"
              @change="rightChange"
              placeholder="材料组/材料名称/零件编号/零件名称"
            ></iInput>
          </div>
        </div>
      </iCard>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iInput } from "rise";
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { shuttleTableTitle as tableTitle } from "./data.js";

export default {
  components: { iPage, iCard, iInput, tableList },
  mixins: [tableSortMixins],
  data() {
    return {
      leftSearch: "",
      rightSearch: "",
      tableTitle,
      tableData:[
        {
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST'
        },{
          col1:'TEST11'
        },{
          col1:'TEST11'
        },{
          col1:'TEST11'
        },{
          col1:'TEST11'
        },{
          col1:'TEST11'
        },{
          col1:'TEST11'
        },
      ]
    };
  },
  methods: {
    leftChange() {},
    rightChange() {},
  },
};
</script>

<style lang="scss" scoped>
.shuttle-box {
  width: 100%;
  height: calc(100% - 40px);
  min-height: 500px;
  display: flex;
  flex-flow: row;
  .shuttle-btn-box {
    width: 80px;
    height: 100%;
    display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .font64 {
      font-size: 64px;
      color: #1660f1;
    }
  }
  .shuttle-item {
    width: 50%;
    height: 100%;
    min-height: 500px;
    ::v-deep .cardBody{
      height: calc(100% - 86px);
    }
    .search {
      width: 100%;
      display: flex;
      align-items: center;
      .search-input {
        flex: 1;
        width: 100%;
      }
    }
    .table{
      height: calc(100% - 40px);
    }
  }
}
</style>