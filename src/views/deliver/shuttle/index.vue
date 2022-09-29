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
          row-key="id"
          ref="functionMenu"
          custom-selection
          @handle-selection-change="handleSelectionChangeLeft"
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
        <!-- <item :rowData="rightTableData" :header="tableTitle" key="right"/> -->
        <shuttleTable :data="rightTableData" :columns="tableTitle" :rowKey="'id'"
          row-key="id"
          ref="functionMenu"
          custom-selection
          :tree-expand="tableExpanded"
          @handle-selection-change="handleSelectionChangeRight"
          highlight-current-row />
      </iCard>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iInput } from "rise";
import item from "./item";
import shuttleTable from "./shuttleTable";
import { shuttleTableTitle as tableTitle } from "../components/data.js";
import {
  getMaterialGroupPart,
  getHeavyitem,
  setHeavyitem,
} from "@/api/project/deliver";
export default {
  components: { iPage, iCard, iInput, item, shuttleTable },
  data() {
    return {
      carProjectId:"",
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
      rightTableData:[],
      selectDataLeft:[],
      selectDataRight:[]
    };
  },
  computed: {
    rightTableData() {
      let result = []
      this.allTableData.forEach(item=>{
        const item_ = JSON.parse(JSON.stringify(item))
        if(item_.position=='right'){
          if(item_.children){
            let children = []
            item_.children.forEach((child_)=>{
              if(child_.position=='right'){
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
    this.carProjectId = this.$route.query.carProjectId;
    this.getData();
    this.getRightTable()
  },
  methods: {
    getData(){
      getMaterialGroupPart({
        carProjectId:this.carProjectId,
        type:0,
      }).then(res=>{
        console.log(res);
      })

      getMaterialGroupPart({
        carProjectId:this.carProjectId,
        type:1,
      }).then(res=>{
        console.log(res);
      })


      getHeavyitem(this.carProjectId).then(res=>{
        console.log(res);
      })
    },
    // 左侧选中数据
    handleSelectionChangeLeft(val,result){
      this.selectDataLeft = val
    },
    // 右侧选中数据
    handleSelectionChangeRight(val,result){
      this.selectDataRight = val
    },
    // 同步左侧选中数据到右侧中
    toRight(){
      let rightTableData = JSON.parse(JSON.stringify(this.rightTableData))
      let rightIdList = rightTableData.map(child=>child.id)
      this.selectDataLeft.forEach(item=>{
          if(!rightIdList.includes(item.id)){
            const child = {...item}
            child.checked = false
            rightTableData.push(child)
          }
      })
      this.rightTableData = JSON.parse(JSON.stringify(rightTableData))


      setHeavyitem([
        ...this.rightTableData
      ]).then(res=>{
        console.log(res);
      })
      // this.getRightTable()
    },
    
    toLeft(){
      console.log(this.selectDataRight);
      let rightTableData = JSON.parse(JSON.stringify(this.rightTableData))
      // this.rightTableData = 
      this.selectDataRight.forEach(item=>{
        if(!item.isIndeterminate){
          rightTableData.forEach((child,index)=>{
            if(child.id===item.id){
              rightTableData.splice(index,1)
            }
          })
        }
      })
      this.rightTableData = JSON.parse(JSON.stringify(rightTableData))

      setHeavyitem([
        ...this.rightTableData
      ]).then(res=>{
        console.log(res);
      })
      // this.allTableData = JSON.parse(JSON.stringify(this.leftTableData))
      // this.getRightTable()
    },
    getRightTable(){
      this.rightTableData = JSON.parse(JSON.stringify(this.selectDataLeft)).map(item=>{
        item.checked = false;
        item.expanded = false
        item.visible = item.uniqueId.split('-').length>1?false:true;
        return item
      })
      return
      let result = []
      this.allTableData.forEach(item=>{
        const item_ = JSON.parse(JSON.stringify(item))
        console.log(item_);
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
    handleRowClick(row) {
      this.$emit('set-resource-parent', row)
    },
    leftChange() {
      
    },
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
  margin-top:30px;
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
      margin-bottom:20px;
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