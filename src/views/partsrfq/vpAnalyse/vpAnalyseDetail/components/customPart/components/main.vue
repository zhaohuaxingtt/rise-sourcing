<!--
 * @Author: your name
 * @Date: 2021-07-23 16:36:33
 * @LastEditTime: 2021-08-18 11:03:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\components\main.vue
-->

<template>
  <div>
    <div style="text-align: right">
      <iButton @click="del">{{$t('delete')}}</iButton>
      <iButton @click="add">{{$t('LK_XINZENG')}}</iButton>
      <iButton @click="submit">{{$t('LK_BAOCUN')}}</iButton>
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
          {{scope.row.partsId}}
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
  </div>
</template>

<script>
import {iButton, icon, iMessage} from 'rise'
import tableList from '@/components/ws3/commonTable';
import {tableTitle} from './data';
import {getCustomPartDataList, fetchSaveCustomPart} from '@/api/partsrfq/vpAnalysis/vpCustomPart'

export default {
  name: 'CustomPartMain',
  components: {iButton, icon, tableList},
  props: {
    partList: {
      type: Array,
      default: () => []
    },
    addStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      selections: [],
      partNumData: [],
      remoteLoading: false
    }
  },
  created() {
    if(!this.addStatus) this.initTableData()
    else this.tableListData = window._.cloneDeep(this.partList)
  },
  computed: {
    batchNumber() {
      if(this.partList && this.partList.length > 0)
        return (this.partList.find(item => item.batchNumber)).batchNumber
      else 
        return null
    }
  },
  methods: {
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
      this.save()
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
      this.save()
    },
    // 向下移
    clickMoveDown(row) {
      const index1 = row.index
      const index2 = index1 + 1
      this.tableListData.splice(index2,1,...this.tableListData.splice(index1, 1 , this.tableListData[index2]))
      this.exchangeSort(this.tableListData[index1], this.tableListData[index2])
      this.save()
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
      this.save()
    },
    // 点击新增按钮
    add() {
      this.$emit('handleReturnAdd', this.partList)
    },
    // 点击保存按钮
    save() {
      return new Promise(resolve => {
        const params = {
          batchNumber: this.batchNumber,
          vpPartsList: this.tableListData
        }
        fetchSaveCustomPart(params).then(res => {
          if(res && res.code == 200) {
            this.initTableData()
            resolve(res)
          } else {
            iMessage.error(res.desZh)
            this.initTableData()
          }
        })
      })
    },
    // 提交保存数据，提示并关闭弹窗
    submit() {
      this.save().then(res => {
        iMessage.success(res.desZh)
        this.$emit('saveCustomPart')
      })
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


