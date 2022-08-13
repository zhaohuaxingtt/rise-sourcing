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
        <!-- <item :rowData="leftTableData" :header="tableTitle" :key="left"/> -->
        <shuttleTable :data="leftTableData" :columns="tableTitle" :rowKey="'id'"
      v-if="leftTableData.length > 0"
      row-key="id"
      ref="functionMenu"
      custom-selection
      :tree-expand="tableExpanded"
      highlight-current-row />
      </iCard>
      <div class="shuttle-btn-box">
        <i class="el-icon-caret-right font64" @click="toRight"></i>
        <i class="el-icon-caret-left font64" @click="toLeft"></i>
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
        <item :rowData="rightTableData" :header="tableTitle" key="right"/>
      </iCard>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iInput } from "rise";
import item from "./item";
import shuttleTable from "./shuttleTable";
import { shuttleTableTitle as tableTitle } from "../components/data.js";

export default {
  components: { iPage, iCard, iInput, item, shuttleTable },
  data() {
    return {
      leftSearch: "",
      rightSearch: "",
      tableTitle,
      tableExpanded: { expandKey: 'col1', childrenKey: 'children' },
      leftTableData:[],
      rightTableData:[],
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
              id:5,
            },{
              col1:'child-1',
              col2: "child-2",
              // visible:true,
              id:6
            },
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
    rightTableData() {
      let result = []
      this.allTableData.forEach(item=>{
        const item_ = JSON.parse(JSON.stringify(item))
        if(item_.check || item_.isIndeterminate){
          if(item_.children){
            let children = []
            item_.children.forEach((child_)=>{
              if(child_.check){
                children.push(child_)
              }
            })
            item_.children = children
          }
          result.push(item_)
        }
      })
      console.log(result);
      return result
    }
  },
  created(){
    this.leftTableData = JSON.parse(JSON.stringify(this.allTableData));
    this.getRightTable()
  },
  methods: {
    toRight(){
      this.allTableData = JSON.parse(JSON.stringify(this.leftTableData))
      this.getRightTable()
    },
    toLeft(){
      this.allTableData = JSON.parse(JSON.stringify(this.leftTableData))
      this.getRightTable()
    },
    getRightTable(){
      let result = []
      this.allTableData.forEach(item=>{
        const item_ = JSON.parse(JSON.stringify(item))
        if(item_.check || item_.isIndeterminate){
          if(item_.children){
            let children = []
            item_.show = false
            item_.children.forEach((child_)=>{
              if(child_.check){
                children.push(child_)
              }
            })
            item_.children = children
          }
          result.push(item_)
        }
      })
      this.rightTableData = result
    },
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