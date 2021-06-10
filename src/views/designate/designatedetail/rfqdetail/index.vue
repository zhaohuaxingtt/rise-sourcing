<!--
 * @Author: Luoshuang
 * @Date: 2021-05-21 09:23:11
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-10 21:41:06
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
          <iInput placeholder="请输入零件号/RFQ编号/RFQ名称/LINIE" v-model="searchParam" class="margin-right20 input" @blur="searchRfqTableList" >
            <icon symble slot="suffix" name="iconshaixuankuangsousuo" />
          </iInput>
          <!--------------------新增按钮----------------------------------->
          <iButton @click="addRfq">新增</iButton>
          <!--------------------删除按钮----------------------------------->
          <iButton @click="deleteRfq">删除</iButton>
        </div>
      </div>
      <tableList
        :activeItems='"id"'
        selection
        indexKey
        :tableData="rfqTableListData"
        :tableTitle="rfqTableTitle"
        :tableLoading="rfqTableLoading"
        @handleSelectionChange="handleRfqSelectionChange"
        @openPage="openRfqPage"
        @updateSlot='rfqToTop'
        ref="rfqTable"
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
        :selectedItems="partsSelectedItems"
        ref="partTable"
      />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iMessage, iButton, iInput, icon } from "rise"
import tableList from '../components/tableList'
import { rfqListTitle, partsListTitle } from './data'
import { pageMixins } from "@/utils/pageMixins";
import { getRfqList, getPartList, updatePart, deleteRfq } from '@/api/designate/designatedetail/rfqdetail/index'
import { cloneDeep } from 'lodash'
export default {
  mixins: [pageMixins],
  components:{ iPage, iCard, tableList, iPagination, iButton, iInput, icon },
  data() {
    return {
      rfqTableTitle: rfqListTitle,
      rfqTableListData: [],
      rfqTableListDataTemp: [],
      rfqTableLoading: false,
      rfqSelectedItems: [],
      partsTableTitle: partsListTitle,
      partsTableListData: [],
      partsTableListDataTemp: [],
      partsTableLoading: false,
      partsSelectedItems: [],
      searchParam: ''
    }
  },
  created(){
    if(this.$route.query.desinateId){
      this.desinateId = this.$route.query.desinateId
      this.getRfqTableList()
    } 
  },
  mounted(){
    if(this.$route.query.desinateId){
      this.getPartsTableList()
    }
  },
  methods: {
    searchRfqTableList() {
      this.rfqTableListData = this.rfqTableListDataTemp.filter(item => (
        item.id.toLocaleLowerCase().includes(this.searchParam.toLocaleLowerCase()) || item.rfqName.toLocaleLowerCase().includes(this.searchParam.toLocaleLowerCase()) || item.linieNameZh.toLocaleLowerCase().includes(this.searchParam.toLocaleLowerCase())
      ))
      this.partsTableListData = this.partsTableListDataTemp.filter(item => this.rfqTableListData.some(rfqItem => rfqItem.id === item.rfqId))
      this.$nextTick(()=>{
        this.$refs.rfqTable.toggleSelection()
        this.defaultSelectTable()
      })
    },
    /**
     * @Description: 默认选中表格部分
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    defaultSelectTable(){
       this.$refs.partTable.toggleSelection(this.partsTableListData.filter(item => item.selected == 1))
    },
    /**
     * @Description: 保存选中的零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    saveParts() {
      if (this.partsSelectedItems.length < 1) {
        iMessage.warn('请选择需要保存的零件')
        return
      }
      this.partsTableLoading = true
      const params = {
        nominateAppId: this.desinateId,
        partPrjList: this.partsSelectedItems.map(item => {
          return {
            id: item.id,
            partPrjCode: item.fsnrGsnrNum,
            // partPrjId: item.
          }
        })
      }
      updatePart(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getPartsTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.partsTableLoading = false
      })
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
      this.rfqTableLoading = true
      const params = {
        nominateAppId: this.desinateId,
        rfqIdList: this.rfqSelectedItems.map(item => item.id)
      }
      deleteRfq(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getRfqTableList()
          this.getPartsTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.rfqTableLoading = false
      })
    },
    /**
     * @Description: 新增rfq按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    addRfq() {
      this.$router.push({path: '/sourcing/designate/rfqdetail/addRfq', query: {desinateId: this.desinateId}})
    },
    /**
     * @Description: rfq清单列表数据查询
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getRfqTableList() {
      this.rfqTableLoading = true
      getRfqList(this.desinateId).then(res => {
        if(res?.result) {
          this.rfqTableListData = res.data
          this.rfqTableListDataTemp = cloneDeep(res.data)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.rfqTableLoading = false
      })
    },
    /**
     * @Description: rfq清单列表选中处理事件
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */        
    handleRfqSelectionChange(selectItems){
      this.rfqSelectedItems = selectItems
    },
    /**
     * @Description: rfq清单列表点击rfq编号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openRfqPage(row){
      const router =  this.$router.resolve({path: `/sourcing/partsrfq/editordetail?id=${row.id}`})
      window.open(router.href,'_blank')
    },
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
    getPartsTableList(){
      this.partsTableLoading = true
      getPartList(this.desinateId).then(res => {
        if(res?.result) {
          this.partsTableListData = res.data
          this.partsTableListDataTemp = cloneDeep(res.data)
          this.$nextTick(()=>{
            this.defaultSelectTable()
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.partsTableLoading = false
      })
    },
    /**
     * @Description: 零件列表选中处理
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */    
    handlePartsSelectionChange(selectItems){
      this.partsSelectedItems = selectItems
    },
    /**
     * @Description: 零件列表点击零件号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPartsPage(row){
      const router =  this.$router.resolve({path: `/sourcing/partsrfq/editordetail?id=${row.rfqId}`})
      window.open(router.href,'_blank')
    },
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