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
                <el-popover placement="bottom" width="auto" trigger="click">
                  <div>
                    <p>
                      <icon
                        symbol
                        name="icontishi-cheng"
                      />节点(Activity)类型</p>
                    <p>Note</p>
                    <p>ank</p>
                  </div>
                  <icon
                    slot="reference"
                    @click="addItem(scope.row, scope.$index)"
                    symbol
                    name="icontishi-cheng"
                  />
                </el-popover>
              </template>
            </template>
            <template slot-scope="scope">
              <template  v-if="item.props == 'col3'">
                <iSelect clearable v-model="scope.row[item.prop]"
                  :placeholder="language('QINGXUANZE', '请选择')">
                  <el-option v-for="item in typeList || []" :key="item.value" :label="$i18n.locale=='zh' ? item.name : item.nameEn" :value="item.value">
                  </el-option>
                </iSelect>
              </template>
              <span v-else>{{ scope.row[item.props] }}</span>
              <el-popover placement="right" width="auto" trigger="click" @hide="clear" v-model="scope.row.visible" v-if="item.props == 'col1'">
                <div>
                  <div class="flex-item">
                    <div>在上方插入</div>
                    <div class="padding"><iInput v-model="topNum" @keydown.enter.native="addItem(scope.$index, 'top')" /></div>
                    <div>行</div>
                  </div>
                  <div class="flex-item">
                    <div>在上方插入</div>
                    <div class="padding"><iInput v-model="bottomNum" @keydown.enter.native="addItem(scope.$index, 'bottom')" /></div>
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
          <template slot-scope="scope">
            <iButton type="text" @click="deleteItem(scope.$index)">删除</iButton>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iInput, iSelect, iButton, icon } from "rise";
import search from "../components/search";
import { searchList, tableTitle } from "./data.js";
import tableList from "@/components/iTableSort";
export default {
  components: {
    iPage,
    iCard,
    iInput,
    iSelect,
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
          col3: "point",
          col4: "4.0",
          col5: "5.0",
          col6: "6.0",
        },
        {
          col1: "1.0",
          col2: "2.0",
          col3: "slot",
          col4: "4.0",
          col5: "5.0",
          col6: "6.0",
        },
      ],
      tableTitle,
      topNum: "",
      bottomNum: "",
      typeList:[
        {
          value: 'point',
          name: 'Point',
          nameEn: 'Point'
        },{
          value: 'slot',
          name: 'Slot',
          nameEn: 'Slot'
        },
      ]
    };
  },
  methods: {
    addItem(index, type='top') {
      let tableListData = JSON.parse(JSON.stringify(this.tableListData))
      if(type=='top'){
        for (let i = 0; i < this.topNum; i++) {
          tableListData.splice(index,0,{})
        }
      }else{
        for (let i = 0; i < this.bottomNum; i++) {
          tableListData.splice(1+index,0,{})
        }
      }
      this.tableListData = tableListData.map(item=>{
        item.visible = false
        return item
      })
      console.log(index);
      console.log(this.tableListData);
    },
    deleteItem(index) {
      console.log(index);
      this.tableListData.splice(index,1)
    },
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