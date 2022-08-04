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
        <Item :list="allTableData" :header="tableTitle"/>
        <tableList
          v-if="tableTitle.length > 0"
          row-key="id"
          :height="tableHeight||500"
          ref="functionMenu"
          custom-selection
          :loading="tableLoading||false"
          :data="allTableData"
          :columns="tableTitle"
          :tree-expand="tableExpanded"
          :default-selected-rows="defaultSelectedRows||[]"
          highlight-current-row
          @handle-selection-change="handleSelectionChange"
          @row-click="handleRowClick"
        />
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
import tableList from "./shuttleTable.vue";
import Item from "./item.vue";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { shuttleTableTitle as tableTitle } from "../components/data.js";

export default {
  components: { iPage, iCard, iInput, tableList, Item },
  mixins: [tableSortMixins],
  data() {
    return {
      leftSearch: "",
      rightSearch: "",
      tableTitle,
      tableExpanded: { expandKey: 'name', childrenKey: 'menuList' },
      allTableData: [
        {
          col1: "TEST",
          col2: "TEST2",
          id: 1,
        },
        {
          col1: "TEST",
          col2: "TEST2",
          id: 2,
          children:[
            {
              col1:'child-1',
              col2: "child-2",
              id:5
            }
          ]
        },
        {
          col1: "TEST",
          col2: "TEST2",
          id: 3,
        },
        {
          col1: "TEST",
          col2: "TEST2",
          id: 4,
        }
      ],
    };
  },
  computed: {
    tableList() {
      return this.allTableData.filter((item) => item.selectBorder);
    },
  },
  methods: {
    handleSelectionChange() {},
    handleRowClick(row) {
      this.$emit('set-resource-parent', row)
    },
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
    ::v-deep .cardBody {
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
    .table {
      height: calc(100% - 40px);
    }
  }
}
</style>