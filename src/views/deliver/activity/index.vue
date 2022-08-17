<template>
  <iPage>
    <search
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="sure"
      @reset="reset"
    ></search>
    <iCard class="margin-top20">
      <el-table :data="tableListData">
        <template v-for="(item, index) in tableTitle">
          <el-table-column
            :key="index"
            :label="item.name"
            :prop="item.props"
            align="center"
            :min-width="item.minWidth"
            :width="item.width"
          >
            <template slot="header" slot-scope="scope">
              <span>{{ item.name }}</span>
              <template v-if="item.props == 'col3'">
                <el-popover placement="right" width="400" trigger="click">
                  <el-table :data="gridData">
                    <el-table-column
                      width="150"
                      property="date"
                      label="日期"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="name"
                      label="姓名"
                    ></el-table-column>
                    <el-table-column
                      width="300"
                      property="address"
                      label="地址"
                    ></el-table-column>
                  </el-table>
                  <icon
                    slot="reference"
                    @click="addItem(scope.row, scope.$index)"
                    symbol
                    name="iconliebiaozhankailishishuju"
                  />
                </el-popover>
              </template>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row[item.props] }}</span>
              <el-popover placement="right" width="auto" trigger="click" @hide="clear" v-model="scope.row.visible" v-if="item.props == 'col1'">
                <div>
                  <div class="flex-item">
                    <div>在上方插入</div>
                    <div class="padding"><iInput v-model="topNum" @keydown.enter.native="addItem(scope.row, scope.$index, 'top')" /></div>
                    <div>行</div>
                  </div>
                  <div class="flex-item">
                    <div>在上方插入</div>
                    <div class="padding"><iInput v-model="bottomNum" @keydown.enter.native="addItem(scope.row, scope.$index, 'bottom')" /></div>
                    <div>行</div>
                  </div>
                </div>
                <icon
                  slot="reference"
                  class="add"
                  symbol
                  name="iconxinzengchexingbao"
                />
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          label="操作"
          align="center"
          :min-width="120"
          :width="120"
        >
          <iButton type="text">删除</iButton>
        </el-table-column>
      </el-table>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iInput, iButton, icon } from "rise";
import search from "../components/search";
import { searchList, tableTitle } from "./data.js";
import tableList from "@/components/iTableSort";
export default {
  components: {
    iPage,
    iCard,
    iInput,
    iButton,
    icon,
    search,
    tableList,
  },
  data() {
    return {
      searchList,
      selectOptions: {
        typeOptions: [
          {
            value: "0",
            label: "类型0",
          },
          {
            value: "1",
            label: "类型1",
          },
        ],
        kzOptions: [
          {
            value: "0",
            label: "否",
          },
          {
            value: "1",
            label: "是",
          },
        ],
      },
      tableListData: [
        {
          col1: "1.0",
          col2: "2.0",
          col3: "3.0",
          col4: "4.0",
          col5: "5.0",
          col6: "6.0",
        },
        {
          col1: "1.0",
          col2: "2.0",
          col3: "3.0",
          col4: "4.0",
          col5: "5.0",
          col6: "6.0",
        },
      ],
      tableTitle,
      topNum: "",
      bottomNum: "",
    };
  },
  methods: {
    addItem(row, index, type='top') {
      let tableListData = JSON.parse(JSON.stringify(this.tableListData))
      if(type=='top'){
        tableListData.splice(index,0,{})
      }else{
        tableListData.splice(1+index,0,{})
      }
      this.tableListData = tableListData.map(item=>{
        item.visible = false
        return item
      })
      console.log(index);
      console.log(this.tableListData);
    },
    delete(row, rowIndex) {},
    clear(){
      this.topNum = ''
      this.bottomNum = ''
      this.visible = false
    },
    insert(){

    }
  },
};
</script>

<style lang="scss" scoped>
.add {
  margin-left: 10px;
}
.flex-item {
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: 5px 0;
  align-items: center;
  .padding{
    width: 100px;
    padding: 0 10px;
  }
}
</style>