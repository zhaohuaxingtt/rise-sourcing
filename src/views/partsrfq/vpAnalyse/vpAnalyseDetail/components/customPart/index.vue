<!--
 * @Author: youyuan
 * @Date: 2021-06-18 16:03:35
 * @LastEditTime: 2021-06-21 17:53:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\index.vue
-->
<template>
  <div>
    <iDialog title="自定义" :visible.sync="visible" width="70%">
      <div style="text-align: right" v-if="!addMode">
        <iButton @click="del">删除</iButton>
        <iButton @click="add">新增</iButton>
        <iButton @click="reset">重置</iButton>
        <iButton @click="save">保存</iButton>
      </div>
      <div style="text-align: right" v-if="addMode">
        <iButton @click="cancelAdd">取消</iButton>
        <iButton @click="saveAdd">保存</iButton>
      </div>
      <div class="tableBox">
        <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="false"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #partNum="scope">
            <div v-if="addMode && scope.row.index === tableListData.length - 1">
              <iSelect v-model="scope.row.partNum" filterable @change="changePartNum">
                <el-option v-for="(item, index) in partNumData" :key="index" :value='item.partNum' :label='item.partNum'></el-option>
              </iSelect>
            </div>
            <div v-else>
              {{scope.row.partNum}}
            </div>
          </template>
          <template #isShow="scope">
            <div @click="changeStatus(scope.row)" class="statusBox">
              <icon symbol name="iconxianshi" class="statusIcon" v-if="scope.row.isShow" />
            </div>
            <div @click="changeStatus(scope.row)" class="statusBox">
              <icon symbol name="iconyincang" class="statusIcon" v-if="!scope.row.isShow" />
            </div>
          </template>
          <template #sort="scope">
            <span @click="clickMoveDown(scope.row)">
              <icon symbol name="iconpaixu-xiangxia" v-if="checkShowSortIcon(scope.row.index, 'ptdown')" class="sortIcon" />
            </span> 
              <icon symbol name="iconpaixu-xiangxiajinzhi" v-if="checkShowSortIcon(scope.row.index, 'jzdown')" class="sortIcon"/>
            <span @click="clickMoveUp(scope.row)">
              <icon symbol name="iconpaixu-xiangshang" v-if="checkShowSortIcon(scope.row.index, 'pttop')" class="sortIcon" />
            </span>
              <icon symbol name="iconpaixu-xiangshangjinzhi" v-if="checkShowSortIcon(scope.row.index, 'jztop')" class="sortIcon"/>
          </template>
        </tableList>
      </div>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iButton, icon, iSelect} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {tableTitle} from './components/data';
export default {
  name: 'CustomPart',
  components: {iDialog, iButton, icon, iSelect, tableList},
  props: {
    partList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      backupsTableData: [],
      selections: [],
      addMode: false,
      partNumData: [],
      insertPartData: null,
    }
  },
  created() {
    this.initInsertPartData()
    this.initTestTableData()
    this.initTestPartNumData()
    this.backupsTableData = JSON.parse(JSON.stringify(this.tableListData))
  },
  methods: {
    // 初始化添加零件号数据
    initInsertPartData() {
      this.insertPartData = {partNum: null, carProject: '选择后自动带出', carType: '选择后自动带出', factory: '选择后自动带出', supplier: '选择后自动带出', isShow: true, sort: 4}
    },
    // 初始化测试表格数据
    initTestTableData() {
      this.tableListData = [
        {partNum: '18D023601', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 1},
        {partNum: '18D023602', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 2},
        {partNum: '18D023603', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 3},
        {partNum: '18D023604', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 4},
      ]
    },
    // 初始化测试零件号数据
    initTestPartNumData() {
      this.partNumData = [
        {partNum: '18D023605', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 4},
        {partNum: '18D023606', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 5},
        {partNum: '18D023607', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 6},
      ]
    },
    // 改变选中事件
    handleSelectionChange(selection) {
      this.selections = selection
    },
    // 改变是否显示状态
    changeStatus(row) {
      row.isShow = !row.isShow
      const dataIndex = this.tableListData.findIndex(item => item.partNum == row.partNum)
      this.tableListData.splice(dataIndex, 1, row)
    },
    // 判断排序图标显示
    checkShowSortIcon(index, code) {
      if(index == 0) {
        switch (code) {
          case 'ptdown':
            return true
            break;
          case 'jzdown':
            return false
            break;
          case 'pttop':
            return false
            break;
          case 'jztop':
            return true
            break;
        }
      } else if(index == this.tableListData.length - 1) {
        switch (code) {
          case 'ptdown':
            return false
            break;
          case 'jzdown':
            return true
            break;
          case 'pttop':
            return true
            break;
          case 'jztop':
            return false
            break;
        }
      } else {
        switch (code) {
          case 'ptdown':
            return true
            break;
          case 'jzdown':
            return false
            break;
          case 'pttop':
            return true
            break;
          case 'jztop':
            return false
            break;
        }
      }
    },
    //向上移
    clickMoveUp(row) {
      const index1 = row.index
      const index2 = index1 - 1
      this.tableListData.splice(index2,1,...this.tableListData.splice(index1, 1 , this.tableListData[index2]))
    },
    // 向下移
    clickMoveDown(row) {
      const index1 = row.index
      const index2 = index1 + 1
      this.tableListData.splice(index2,1,...this.tableListData.splice(index1, 1 , this.tableListData[index2]))
    },
    // 点击删除按钮
    del() {
      if(this.selections.length == 0) {
        // 此处需校验是否选中数据
        const str = "请选中要删除的数据"
      }
      this.selections.forEach(selectRow => {
        const index = this.tableListData.findIndex(item => item.partNum == selectRow.partNum)
        this.tableListData.splice(index, index + 1)
      })
      this.selections = []
    },
    // 点击新增按钮
    add() {
      this.addMode = true
      this.tableListData.push(this.insertPartData)
    },
    // 新增时，改变选中零件编号
    changePartNum(val) {
      const data = this.partNumData.find(item => item.partNum == val)
      this.tableListData[this.tableListData.length - 1] = data
      this.insertPartData = data
    },
    // 取消添加
    cancelAdd() {
      this.addMode = false
      this.tableListData.splice(this.tableListData.length - 1, this.tableListData.length)
    },
    // 保存添加
    saveAdd() {
      // 此处需要校验零件号是否重复，还要校验零件号是否为空
      if(!this.insertPartData.partNum) {
        
      }
      this.addMode = false
    },
    // 点击重置按钮
    reset() {
      this.tableListData = JSON.parse(JSON.stringify(this.backupsTableData))
    },
    // 点击保存按钮
    save() {

    }
  }
}
</script>

<style lang='scss' scoped>
.tableBox {
  margin: 23px 0;
  padding-bottom: 50px;
}
.statusBox {
  &:hover {
    cursor: pointer;
  }
  .statusIcon {
    font-size: 20px;
  }
}

.sortIcon {
  font-size: 18px;
  margin: 0 8px;
  &:hover {
    cursor: pointer;
  }
}
 
</style>
