<!--
 * @Author: your name
 * @Date: 2021-07-27 10:51:18
 * @LastEditTime: 2021-11-16 17:32:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\components\aeko\index.vue
-->
<template>
  <div>
    <iCard v-if="tableData.length" class="margin-top20" :title="language('ZHIDINGAEKOKUYUANLINGJIAN', '指定AEKO库原零件')">
    <template #header-control>
       <iButton  
        @click="handleExport" 
        v-permission.auto="AEKO_QUONDAMPARTLEDGER_BUTTON_EXPORT_AEKO|AEKO库列表导出"
        :disabled="ledgerSelection.length > 0"
       >
       {{ language("DAOCHU", "导出") }}
       </iButton>
    </template>

    <div class="body">
      <tableList
        ref="aekoTable"
        class="table"
        index
        :lang="true"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        :selectable="selectInit"
        ></tableList>

        
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
    </div>

  </iCard>
  </div>
  
</template>

<script>
import{
  iCard,iButton,iPagination,iMessage
} from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { aekoPartTableTitle } from '../data'
import { getAekoLibraryInfo } from "@/api/aeko/detail"
import { excelExport } from "@/utils/filedowLoad"
export default {
  name:'aekoPartList',
  mixins: [ pageMixins ],
  components:{
    iCard,iButton,iPagination,
    tableList,
  },
  props:{
    ledgerSelection:{
      type:Array,
      default:()=>[],
    },
    form:{
      type:Object,
      default:()=>{},
    },
    objectAekoPartId:{
      type:String,
      default:'',
    },
    aekomultipleSelection:{
      type:Array,
      default:()=>[],
    }
  },
  data(){
    return{
      loading:false,
      tableTitle:aekoPartTableTitle,
      tableData:[],
    }
  },
  methods:{
    handleSelectionChange(list) {
      this.$emit('changeAekoSelection',list);
    },

    async getList(isRest= false){
      // 判断是否重置
      if(isRest){
        this.page.currPage = 1
      }
      
      this.loading = true;
      await getAekoLibraryInfo({
         ...this.form,
        objectAekoPartId: this.objectAekoPartId,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then((res)=>{
        this.loading = false;
        if (res.code == 200) {
          this.tableData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        
      }).catch((err)=>{
        this.loading = false;
      })
    },


    // 勾选限制
    selectInit(row){
      const idArr = this.ledgerSelection.map((item)=>item.partNum);
      // 判断台账零件列表是否已存在相同原零件 若存在 则不勾选
      if(!idArr.includes(row.partNum)){
        return true
      }else{
        return false
      }
    },
    
    // 导出
    handleExport() {
      if (!this.aekomultipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAODAOCHUDEYUANLINGJIAN", "请选择需要导出的原零件"))
    
      excelExport(this.aekomultipleSelection, this.tableTitle)
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 260px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #1660f1;
  text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #ccc;
}
</style>