<!--
 * @Author: Luoshuang
 * @Date: 2021-05-21 09:23:11
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-01 14:45:31
 * @Description: RFQ & 零件清单界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rfqdetail\index.vue
-->

<template>
  <iPage class="rfq-detail-page">
    <!-- <designateStep/> -->
    <iCard class="margin-top20" >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">RFQ清单</span>
        <div class="floatright">
          <iInput placeholder="请输入零件号/RFQ编号/RFQ名称/LINIE" v-model="searchParam" class="margin-right20 input" @blur="getRfqTableList" >
            <icon symble slot="suffix" name="iconshaixuankuangsousuo" />
          </iInput>
          <!--------------------新增按钮----------------------------------->
          <iButton @click="addRfq">新增</iButton>
          <!--------------------删除按钮----------------------------------->
          <iButton @click="deleteRfq">删除</iButton>
        </div>
      </div>
      <tableList
        :activeItems='"rfqId"'
        selection
        indexKey
        :tableData="rfqTableListData"
        :tableTitle="rfqTableTitle"
        :tableLoading="rfqTableLoading"
        @handleSelectionChange="handleRfqSelectionChange"
        @openPage="openRfqPage"
        @updateSlot='rfqToTop'
      />
      <iPagination v-update 
        @size-change="handleSizeChange($event, getRfqTableList)" 
        @current-change="handleCurrentChange($event, getRfqTableList)" 
        background 
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <iCard class="margin-top20" >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">零件清单</span>
        <div class="floatright">
          <!--------------------保存按钮----------------------------------->
          <iButton @click="saveParts">保存</iButton>
        </div>
      </div>
      <tableList
        :activeItems='"rfqId"'
        selection
        indexKey
        :tableData="partsTableListData"
        :tableTitle="partsTableTitle"
        :tableLoading="partsTableLoading"
        @handleSelectionChange="handlePartsSelectionChange"
        @openPage="openPartsPage"
        @updateSlot='partsToTop'
      />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iMessage, iButton, iInput, icon } from "rise"
import tableList from '../components/tableList'
import { rfqListTitle, partsListTitle } from './data'
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components:{ iPage, iCard, tableList, iPagination, iButton, iInput, icon },
  data() {
    return {
      rfqTableTitle: rfqListTitle,
      rfqTableListData: [],
      rfqTableLoading: false,
      rfqSelectedItems: [],
      partsTableTitle: partsListTitle,
      partsTableListData: [],
      partsTableLoading: false,
      partsSelectedItems: [],
      searchParam: ''
    }
  },
  methods: {
    /**
     * @Description: 保存选中的零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    saveParts() {
      if (this.partsSelectedItems.length < 1) {
        iMessage.warn('请选择需要保存的零件')
      }
    },
    /**
     * @Description: 删除rfq按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    deleteRfq() {
      if (this.rfqSelectedItems.length < 1) {
        iMessage.warn('请选择需要删除的行')
        return
      }
    },
    /**
     * @Description: 新增rfq按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    addRfq() {
      this.$router.push({path: '/sourcing/designate/rfqdetail/addRfq'})
    },
    /**
     * @Description: rfq清单列表数据查询
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getRfqTableList() {},
    /**
     * @Description: rfq清单列表选中处理事件
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */        
    handleRfqSelectionChange(selectItems){},
    /**
     * @Description: rfq清单列表点击rfq编号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openRfqPage(row){},
    /**
     * @Description: rfq清单列表置顶处理事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    rfqToTop(row){},
    /**
     * @Description: 零件列表数据查询
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getPartsTableList(){},
    /**
     * @Description: 零件列表选中处理
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */    
    handlePartsSelectionChange(selectItems){},
    /**
     * @Description: 零件列表点击零件号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPartsPage(row){},
    /**
     * @Description: 零件列表处理事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    partsToTop(row){}
  }
}
</script>

<style lang="scss" scoped>
.rfq-detail-page {
  padding: 0;
}
.floatright {
  display: flex;
}
.input {
  ::v-deep input {
    width: 338px;
    padding-right: 50px;
    padding-left: 20px;
  }

  ::v-deep .el-input__suffix {
    right: 18px;

    .el-input__suffix-inner {
      height: 35px;
      line-height: 35px;
    }
  }
}
</style>