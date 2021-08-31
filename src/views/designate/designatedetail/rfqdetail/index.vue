<!--
 * @Author: Luoshuang
 * @Date: 2021-05-21 09:23:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-15 21:17:17
 * @Description: RFQ & 零件清单界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rfqdetail\index.vue
-->

<template>
  <iPage class="rfq-detail-page">
    <!-- <designateStep/> -->
    <iCard class="margin-top20" >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('RFQQINGDAN','RFQ清单')}}</span>
        <div class="floatright">
          <iInput :placeholder="language('QINGSHURULINGJIANHAORFQLINIE','请输入零件号/RFQ编号/RFQ名称/LINIE')" v-model="searchParam" class="margin-right20 input" @blur="searchRfqTableList" >
            <icon symble slot="suffix" name="iconshaixuankuangsousuo" />
          </iInput>
          <!--------------------新增按钮----------------------------------->
          <iButton @click="addRfq">{{language('XINZENG','新增')}}</iButton>
          <!--------------------删除按钮----------------------------------->
          <iButton @click="deleteRfq">{{language('SHANCHU','删除')}}</iButton>
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
      >
        <template #kmAnalysis="scope">
          <el-popover
            v-if="scope.row.kmAnalysis"
            placement="left"
            width="300"
            trigger="click"
            @show="showAttachmentTable(scope.row)"
            @hide="attachmentTableListData = []">
            <tableList :tableTitle="attachmentTableTitle" :tableData="attachmentTableListData" :tableLoading="attachmentLoading" :selection="false">
              <template #fileName="attachmentScope">
                <span class="link" @click="downLoad(attachmentScope.row)">{{ attachmentScope.row.fileName }}</span>
              </template>
            </tableList>
            <icon class="tick icon-style" symbol name="iconbaojiazhuangtailiebiao_yibaojia" slot="reference"/>
          </el-popover>
        </template>
      </tableList>
    </iCard>
    <iCard class="margin-top20" >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('LK_LINGJIANQINGDAN','零件清单')}}</span>
        <div class="floatright">
          <!--------------------保存按钮----------------------------------->
          <iButton @click="saveParts">{{language('BAOCUN','保存')}}</iButton>
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
import { iPage, iCard, iMessage, iButton, iInput, icon } from "rise"
import tableList from '../components/tableList'
import { rfqListTitle, partsListTitle } from './data'
import { pageMixins } from "@/utils/pageMixins";
import { getRfqList, getPartList, updatePart, deleteRfq } from '@/api/designate/designatedetail/rfqdetail/index'
import { cloneDeep } from 'lodash'
import { getKmFileHistory } from "@/api/costanalysismanage/costanalysis"
import { attachmentTableTitle} from "@/views/partsrfq/home/components/data";
import { downloadFile, downloadUdFile } from "@/api/file"
export default {
  mixins: [pageMixins],
  components:{ iPage, iCard, tableList, iButton, iInput, icon },
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
      searchParam: '',
      attachmentTableListData: [],
      attachmentTableTitle,
      attachmentLoading: false
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
    // 分析报告下载
    downLoad(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.fileName
      // })
      downloadUdFile(row.uploadId)
    },
    showAttachmentTable(row) {
      this.getKmFileHistory(row.id)
    },
    // 获取分析报告
    getKmFileHistory(rfqId) {
      if (!rfqId) return

      this.attachmentLoading = true
      getKmFileHistory({
        hostId: rfqId,
        type: 1,
        currPage: 1,
        pageSize: 99999999
      })
      .then(res => {
        if (res.code == 200) {
          this.attachmentTableListData = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.attachmentLoading = false
      })
      .catch(() => this.attachmentLoading = false)
    },
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
      // if (this.partsSelectedItems.length < 1) {
      //   iMessage.warn(this.language('NOMILINGJIANWEIKONGTIXING','当前零件清单未勾选任何零件，请至少勾选一个零件后再进行操作！'))
      //   return
      // }
      this.partsTableLoading = true
      // const params = {
      //   nominateAppId: this.desinateId,
      //   partPrjList: (this.partsSelectedItems.length > 0 ? this.partsSelectedItems : this.partsTableListData).map(item => {
      //     return {
      //       id: item.id,
      //       partPrjCode: item.fsnrGsnrNum,
      //       // partPrjId: item.
      //     }
      //   })
      // }
      const params = {
        nominateAppId: this.desinateId,
        partPrjList: this.partsSelectedItems
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
        iMessage.warn(this.language('QINGXUANZEYAOSHANCHUDEHANG','请选择需要删除的行'))
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
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.id}`})
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
      // 零件清单标记为空
      this.$store.dispatch('setPartListNull', !this.partsSelectedItems.length)
    },
    /**
     * @Description: 零件列表点击零件号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPartsPage(row){
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.rfqId}`})
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