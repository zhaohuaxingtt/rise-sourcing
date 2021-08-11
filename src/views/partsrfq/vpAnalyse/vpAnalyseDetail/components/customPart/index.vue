<!--
 * @Author: youyuan
 * @Date: 2021-06-18 16:03:35
 * @LastEditTime: 2021-07-12 14:14:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\index.vue
-->
<template>
  <div>
    <iDialog :title="$t('TPZS.LK_CUSTOM_TITLE')" :visible.sync="visible" width="70%"  @close="handleClose">
      <div style="text-align: right" v-if="!addMode">
        <iButton @click="del">{{$t('delete')}}</iButton>
        <iButton @click="add">{{$t('LK_XINZENG')}}</iButton>
        <iButton @click="reset">{{$t('LK_CHONGZHI')}}</iButton>
        <iButton @click="save">{{$t('LK_BAOCUN')}}</iButton>
      </div>
      <div style="text-align: right" v-if="addMode">
        <iButton @click="cancelAdd">{{$t('LK_QUXIAO')}}</iButton>
        <iButton @click="saveAdd">{{$t('LK_BAOCUN')}}</iButton>
      </div>
      <div class="tableBox">
        <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="false"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #partsId="scope">
            <div v-if="addMode && scope.row.index === tableListData.length - 1">
              <iSelect 
                v-model="scope.row.partsId" 
                filterable 
                remote
                :placeholder="$t('TPZS.SEARCH_PART')"
                :remote-method="remoteMethod"
                :loading="remoteLoading"
                @change="changePartNum">
                <el-option  v-for="(item, index) in partNumData" :key="index" :value='item.partsId' :label='item.partsId'></el-option>
              </iSelect>
            </div>
            <div v-else>
              {{scope.row.partsId}}
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
          <template #sort="scope" v-if="!addMode">
            <span @click="clickMoveDown(scope.row)">
              <icon symbol name="iconpaixu-xiangxia" v-if="checkShowSortIcon(scope.row.index, 'ptdown')" class="sortIcon" />
            </span> 
              <icon symbol name="iconpaixu-xiangxiajinzhi" v-if="checkShowSortIcon(scope.row.index, 'jzdown')" class="sortIcon"/>
            <span @click="clickMoveUp(scope.row)">
              <icon symbol name="iconpaixu-xiangshang" v-if="checkShowSortIcon(scope.row.index, 'pttop')" class="sortIcon" />
            </span>
              <icon symbol name="iconpaixu-xiangshangjinzhi" v-if="checkShowSortIcon(scope.row.index, 'jztop')" class="sortIcon"/>
          </template>
          <template #sort="scope" v-else></template>
        </tableList>
      </div>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iButton, icon, iSelect} from 'rise'
import {iMessage} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {tableTitle} from './components/data';
import {getCustomPartDataList, fetchSaveCustomPart, getCustomPartListByPartId} from '@/api/partsrfq/vpAnalysis/vpCustomPart'
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
      remoteLoading: false
    }
  },
  created() {
    // this.initTestPartNumData()
    // this.initTestTableData()
    this.initTableData()
    this.initInsertPartData()
  },
  computed: {
    batchNumber() {
      if(this.partList && this.partList.length > 0)
        return (this.partList ? this.partList.find(item => item.batchNumber) : null).batchNumber
      else 
        return null
    }
  },
  methods: {
    // 初始化添加零件号数据
    initInsertPartData() {
      this.insertPartData = {partsId: null, carTypeProj: '选择后自动带出', carType: '选择后自动带出', procureFactory: '选择后自动带出', supplierName: '选择后自动带出', isShow: true}
    },
    // 初始化测试表格数据
    initTestTableData() {
      this.tableListData = [
        {partsId: '18D023601', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 1},
        {partsId: '18D023602', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 2},
        {partsId: '18D023603', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 3},
        {partsId: '18D023604', carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX', isShow: true, sort: 4},
      ]
    },
    // 获取自定义零件列表数据
    initTableData() {
      const params = {
        batchNumber: this.batchNumber
      }
      getCustomPartDataList(params).then(res => {
        if(res && res.code == 200) {
          this.tableListData = res.data
          this.backupsTableData = JSON.parse(JSON.stringify(this.tableListData))
        }
      })
    },
    // 初始化测试零件号数据
    initTestPartNumData() {
      this.partNumData = [
        {partsId: '18D023605',  isShow: true, partsDetail: 
          {carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX'}
        },
        {partsId: '18D023606',  isShow: true, partsDetail: 
          {carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX'}
        },
        {partsId: '18D023607',  isShow: true, partsDetail: 
          {carProject: 'XXXXXXX', carType: 'XXXXXXX', factory: 'XXXXXXX', supplier: 'XXXXXXX'}
        },
      ]
    },
    // 改变选中事件
    handleSelectionChange(selection) {
      this.selections = selection
    },
    // 改变是否显示状态
    changeStatus(row) {
      row.isShow = !row.isShow
      const dataIndex = this.tableListData.findIndex(item => item.partsId == row.partsId)
      this.tableListData.splice(dataIndex, 1, row)
    },
    // 判断排序图标显示
    checkShowSortIcon(index, code) {
      if(index == 0) {
        switch (code) {
          case 'ptdown':
            return true
          case 'jzdown':
            return false
          case 'pttop':
            return false
          case 'jztop':
            return true
        }
      } else if(index == this.tableListData.length - 1) {
        switch (code) {
          case 'ptdown':
            return false
          case 'jzdown':
            return true
          case 'pttop':
            return true
          case 'jztop':
            return false
        }
      } else {
        switch (code) {
          case 'ptdown':
            return true
          case 'jzdown':
            return false
          case 'pttop':
            return true
          case 'jztop':
            return false
        }
      }
    },
    //向上移
    clickMoveUp(row) {
      const index1 = row.index
      const index2 = index1 - 1
      this.tableListData.splice(index2,1,...this.tableListData.splice(index1, 1 , this.tableListData[index2]))
      this.exchangeSort(this.tableListData[index1], this.tableListData[index2])
    },
    // 向下移
    clickMoveDown(row) {
      const index1 = row.index
      const index2 = index1 + 1
      this.tableListData.splice(index2,1,...this.tableListData.splice(index1, 1 , this.tableListData[index2]))
      this.exchangeSort(this.tableListData[index1], this.tableListData[index2])
    },
    // 交换排序号
    exchangeSort(obj1, obj2) {
      const tempSort = obj1.sort
      obj1.sort = obj2.sort
      obj2.sort = tempSort
    },
    // 点击删除按钮
    del() {
      if(this.selections.length == 0) {
        // 此处需校验是否选中数据
        const str = "请选中要删除的数据"
      }
      this.selections.forEach(selectRow => {
        const index = this.tableListData.findIndex(item => item.partsId == selectRow.partsId)
        this.tableListData.splice(index, index + 1)
      })
      this.selections = []
    },
    // 点击新增按钮
    add() {
      this.addMode = true
      this.tableListData.push(this.insertPartData)
      console.log('tableListData', this.tableListData);
    },
    // 新增时，根据输入零件号检索
    remoteMethod(val) {
      if(val.length < 3) {
        return 
      }
      this.remoteLoading = true
      getCustomPartListByPartId(val).then(res => {
        this.remoteLoading = false
        if(res && res.code == 200) {
          this.partNumData = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 新增时，改变选中零件编号
    changePartNum(val) {
      const data = this.partNumData.find(item => item.partsId == val)
      console.log('tableListData', this.tableListData);
      this.tableListData.splice(this.tableListData.length - 1, this.tableListData.length, window._.cloneDeep(data))
      this.insertPartData = window._.cloneDeep(data)
    },
    // 取消添加
    cancelAdd() {
      this.addMode = false
      this.tableListData.splice(this.tableListData.length - 1, this.tableListData.length)
      this.initInsertPartData()
    },
    // 保存添加
    saveAdd() {
      // 此处需要校验零件号是否重复，还要校验零件号是否为空
      if(!this.insertPartData.partsId) {
        iMessage.error(this.$t('PART_REQUIRE_MESSAGE'))
        return
      }
      let count = 0
      this.tableListData.forEach(item => {
        if(item.partsId == this.insertPartData.partsId) count++
      })
      if(count > 1) {
        iMessage.error(this.$t('PART_UNIQUE_MESSAGE'))
        return
      }
      let maxSortObj = window._.maxBy(this.tableListData, function(o) { return o.sort; });
      const endObj = this.tableListData[this.tableListData.length - 1]
      if(!maxSortObj) maxSortObj = 0
      endObj['sort'] = maxSortObj.sort + 1
      endObj['isShow'] = true
      this.addMode = false
      this.initInsertPartData()
    },
    // 点击重置按钮
    reset() {
      this.tableListData = JSON.parse(JSON.stringify(this.backupsTableData))
    },
    // 点击保存按钮
    save() {
      const params = {
        batchNumber: this.batchNumber,
        vpPartsList: this.tableListData
      }
      fetchSaveCustomPart(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.initTableData()
          this.$emit('saveCustomPart')
        }
      })
    },
    //取消事件
    handleClose() {
      this.addMode = false
      this.$emit('handleCloseCustomPart')
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
