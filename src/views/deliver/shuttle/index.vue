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
import { iPage, iCard, iInput,iMessage } from "rise";
import item from "./item";
import shuttleTable from "./shuttleTable";
import { shuttleTableTitle as tableTitle } from "../components/data.js";
import {
  getMaterialGroupPart,
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
      tableExpanded: { expandKey: 'name', childrenKey: 'parts' },
      leftTableData:[],
      leftTableDataOld:[],
      rightTableData:[],
      rightTableDataOld:[],
      allTableData: [],
      selectDataLeft:[],
      selectDataRight:[]
    };
  },
  computed: {
    
  },
  created(){
    this.carProjectId = this.$route.query.carProjectId;
    this.getData();
    // this.getRightTable()
  },
  methods: {
    getData(){
      getMaterialGroupPart({
        cartypeProId:this.carProjectId,
        type:1,
      }).then(res=>{
        const data = res.data;
        data.forEach(e=>{
          e.name = e.materialGroupNameZh;
          e.nameEn = e.materialGroupNameDe;
          e.code = e.materialGroupCode;
          e.parent = true;
          if(e.parts && e.parts.length>0){
            e.parts.forEach(item=>{
              item.name = item.partNameZh
              item.nameEn = item.partNameDe
              item.code = item.partNum
            })
          }
        })
        this.leftTableDataOld = JSON.parse(JSON.stringify(data));
        this.leftTableData = _.cloneDeep(this.leftTableDataOld);
      })

      getMaterialGroupPart({
        cartypeProId:this.carProjectId,
        type:2,
      }).then(res=>{
        const data = res.data;
        data.forEach(e=>{
          e.name = e.materialGroupNameZh;
          e.nameEn = e.materialGroupNameDe;
          e.code = e.materialGroupCode;
          e.parent = true;
          if(e.parts && e.parts.length>0){
            e.parts.forEach(item=>{
              item.name = item.partNameZh
              item.nameEn = item.partNameDe
              item.code = item.partNum
            })
          }
        })
        this.rightTableDataOld = JSON.parse(JSON.stringify(data));
        this.rightTableData = _.cloneDeep(this.rightTableDataOld);
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
      if(this.selectDataLeft.length<1){
        iMessage.error("请勾选")
        return;
      }
      // let rightTableData = JSON.parse(JSON.stringify(this.rightTableData))
      // let rightIdList = rightTableData.map(child=>child.id)
      // this.selectDataLeft.forEach(item=>{
      //     if(!rightIdList.includes(item.id)){
      //       const child = {...item}
      //       child.checked = false
      //       rightTableData.push(child)
      //     }
      // })
      // this.rightTableData = JSON.parse(JSON.stringify(rightTableData))
      // this.selectDataLeft = [];
      this.setRequest(1)
    },
    setRequest(val){
      const ids = [];
      if(val == 0){
        console.log(this.selectDataRight)
        this.selectDataRight.forEach(e=>{
          if(e.parent){
            if(e.parts && e.parts.length>0){
              e.parts.forEach(item=>{
                if(ids.indexOf(item.id) == -1){
                  ids.push(item.id);
                }
              })
            }
          }else{
            if(ids.indexOf(e.id) == -1){
              ids.push(e.id);
            }
          }
        })
        this.selectDataRight = [];
      }else if(val == 1){
        console.log(this.selectDataLeft)
        this.selectDataLeft.forEach(e=>{
          if(e.parent){
            if(e.parts && e.parts.length>0){
              e.parts.forEach(item=>{
                if(ids.indexOf(item.id) == -1){
                  ids.push(item.id);
                }
              })
            }
          }else{
            if(ids.indexOf(e.id) == -1){
              ids.push(e.id);
            }
          }
        })
        this.selectDataLeft = [];
      }
      setHeavyitem({
        ids:ids,
        type:val
      }).then(res=>{
        if(res?.result){
          this.rightTableData = [];
          this.getData();
        }
      })
    },
    toLeft(){
      if(this.selectDataRight.length<1){
        iMessage.error("请勾选")
        return;
      }
      // let rightTableData = JSON.parse(JSON.stringify(this.rightTableData))
      // this.rightTableData = 
      // this.selectDataRight.forEach(item=>{
      //   if(!item.isIndeterminate){
      //     rightTableData.forEach((child,index)=>{
      //       if(child.id===item.id){
      //         rightTableData.splice(index,1)
      //       }
      //     })
      //   }
      // })
      // this.rightTableData = JSON.parse(JSON.stringify(rightTableData))
      // this.selectDataRight = [];
      this.setRequest(0)
    },
    handleRowClick(row) {
      this.$emit('set-resource-parent', row)
    },
    leftChange(val) {
      if(val == ""){
        this.leftTableData = _.cloneDeep(this.leftTableDataOld);
        return;
      }
      if(this.leftTableDataOld.length>0){
        var list = [];
        this.leftTableDataOld.forEach(e=>{
          if(this.$i18n.locale === "zh"){
            if(e.materialGroupNameZh.indexOf(val) != -1){
              list.push(e);
            }
            if(e.materialGroupCode.indexOf(val) != -1){
              if(list.length>0){
                if(list.id.indexOf(e.id) != -1){
                  list.push(e);
                }
              }else{
                list.push(e);
              }
            }
            if(e.parts.length>0){
              e.parts.forEach(item=>{
                console.log(item)
                console.log(item.partNameZh.indexOf(val))
                if(item.partNameZh.indexOf(val) != -1){
                  if(list.length>0){
                    if((list.filter(el => {return el.id == e.id})).length<1){
                      list.push(e);
                    }
                  }else{
                    list.push(e);
                  }
                }
                if(item.partNum.indexOf(val) != -1){
                  if(list.length>0){
                    if((list.filter(el => {return el.id == e.id})).length<1){
                      list.push(e);
                    }
                  }else{
                    list.push(e);
                  }
                }
              })
            }
          }else{
            if(e.materialGroupNameDe.indexOf(val) != -1){
              list.push(e);
            }
            if(e.materialGroupCode.indexOf(val) != -1){
              if(list.length>0){
                if(list.id.indexOf(e.id) != -1){
                  list.push(e);
                }
              }else{
                list.push(e);
              }
            }
          }
        })

        this.leftTableData = _.cloneDeep(list);
      }
    },
    rightChange(val) {
      if(val == ""){
        this.rightTableData = _.cloneDeep(this.rightTableDataOld);
        return;
      }
      if(this.rightTableDataOld.length>0){
        var list = [];
        this.rightTableDataOld.forEach(e=>{
          if(this.$i18n.locale === "zh"){
            if(e.materialGroupNameZh.indexOf(val) != -1){
              list.push(e);
            }
            if(e.materialGroupCode.indexOf(val) != -1){
              if(list.length>0){
                if(list.id.indexOf(e.id) != -1){
                  list.push(e);
                }
              }else{
                list.push(e);
              }
            }
            if(e.parts.length>0){
              e.parts.forEach(item=>{
                console.log(item)
                console.log(item.partNameZh.indexOf(val))
                if(item.partNameZh.indexOf(val) != -1){
                  if(list.length>0){
                    if((list.filter(el => {return el.id == e.id})).length<1){
                      list.push(e);
                    }
                  }else{
                    list.push(e);
                  }
                }
                if(item.partNum.indexOf(val) != -1){
                  if(list.length>0){
                    if((list.filter(el => {return el.id == e.id})).length<1){
                      list.push(e);
                    }
                  }else{
                    list.push(e);
                  }
                }
              })
            }
          }else{
            if(e.materialGroupNameDe.indexOf(val) != -1){
              list.push(e);
            }
            if(e.materialGroupCode.indexOf(val) != -1){
              if(list.length>0){
                if(list.id.indexOf(e.id) != -1){
                  list.push(e);
                }
              }else{
                list.push(e);
              }
            }
          }
        })

        this.rightTableData = _.cloneDeep(list);
      }
    },
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