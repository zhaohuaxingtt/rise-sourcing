
<template>
  <div class="productGroup">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>

        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iSelect v-if="item.type ==='select'" :filterable="item.filterable" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option
              v-for="item in selectOptions[item.selectOption]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('CHANPINZUJINDUQUERENHUIZONG', '零件任务清单更新')}}</span>
        <div class="floatright">
          <!--------------------处理按钮----------------------------------->
          <iButton  @click="handleBatchUpdate" >{{language('PILIANGXIUGAIZHUANGTAI','批量修改状态')}}</iButton>
          <iButton  @click="handleExport('1')" >{{language('DAOCHUDEIEPQUERENQINGDAN','导出待EP确认清单')}}</iButton>
          <iButton  @click="handleExport('2')" >{{language('DAOCHUDEIMQQUERENQINGDAN','导出待MQ确认清单')}}</iButton>

        </div>
      </div>
      <tableList indexKey :tableTitle="tableTitle" :selectOptions="selectOptions" :tableData="tableData" :tableLoading="tableLoading" @handleSelectChange="handleSelectChange" @handleSelectionChange="handleSelectionChange">

      </tableList>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>

    <iDialog :visible.sync="dialogVisible" title="请选择零件分类"  @close="clearDialog"  width="20%" >
      <div >
        <iSelect  :filterable="false" v-model="dialogPartSort" :placeholder="language('QINGXUANZE', '请选择')">
          <el-option  v-for="item in selectOptions['partTaskPartSort']" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </iSelect>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>

    </iDialog>
  </div>
</template>

<script>
import { iSearch, iSelect, iInput, iButton, iCard, iPagination, iMessage,iDialog } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { searchList, tableTitle,partSortStatus } from './data'
import tableList from '@/views/project/progressmonitoring/partsTaskList/components/tableList'
import { getCarTypePro, getPartTaskList,downLoadPartScheduleFile,updatePartInfoList, transferSchedule } from '@/api/project'
import { getDictByCode } from '@/api/dictionary'
export default {
  mixins: [pageMixins],
  components: { iSearch, iSelect, iInput, iButton, iCard, tableList, iPagination,iDialog },
  data() {
    return {
      searchList,
      tableTitle,
      partSortStatus,
      dialogVisible:false,
      searchParams: {
        confirmStatus: 'TO_BE_CONFIRMED'
      },
      selectOptions: {},
      tableData: [],
      tableLoading: false,
      selectRows: [],
      fsDialogVisible: false,
      sendRows: [],
      oldTableData:[],
      dialogPartSort:"",
    }
  },
  computed: {

  },
  created() {
    this.getCarProjectOptions()
    this.getSelectOptions()
    this.getTableList()
  },
  methods: {

    handleTransfer(val) {
      transferSchedule(this.selectRows.map(item => item.id), val).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.productGroupTransfer.changeLoading(false)
      })
    },
    //列表数据选择零件状态
    handleSelectChange(val, item) {
      let ids= [item.id];
      let choosePartSort = item.partSort;
      let rowPartSort = "";
      this.oldTableData.forEach(data => {
         if(data.id == item.id){
           rowPartSort = data.partSort;
         }
      })
      if(!this.handingPartSortStatus(rowPartSort,choosePartSort)){
        item.partSort = rowPartSort;
        return;
      }
      this.updatePartTask(ids,choosePartSort)
    },
    //更新数据
    updatePartTask(optionIds,optionPartSort) {

      const params = {
        id:optionIds,
        partSort:optionPartSort,
      }
      updatePartInfoList(params).then(res => {
        if (res?.result) {
          this.getTableList();
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleExport(flag){
      let ids = [];
      this.selectRows.forEach(d => {
        ids.push(d.id);
      })
      const params = {
        id:ids,
        cartypeProId:this.searchParams.cartypeProId,
        partSort:flag,
      }
      downLoadPartScheduleFile(params).then(res => {
        if (res?.result) {
          this.getTableList();
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleBatchUpdate(){

      if(this.selectRows.length ==0){
        iMessage.error(this.language('QINGXUANZHEPILIANGGENGXINGSHUJU','请选择批量更新数据'));
        return
      }

      //判断零件分类状态是否一致
      let partSort = this.selectRows[0].partSort;
      let compareParSort = false;
      this.selectRows.forEach(d => {
        if(d.partSort !=partSort){
          compareParSort = true;
          return
        }
      })
      if(compareParSort){
        iMessage.error(this.language('QINGXUANZHELINGJIANFENGLEI','请选择同类型零件分类数据'))
        return
      }
      this.dialogPartSort = true;
      this.dialogVisible = true;
    },
    //弹出框
    dialogSure(){
      if(this.dialogPartSort ==''){
        iMessage.error(this.language('QINGXUANZHELINGJIANFENGLEI','请选择零件分类'))
        return
      }
      let rowsPartSort = this.selectRows[0].partSort;

      //判断零件状态
      if(!this.handingPartSortStatus(rowsPartSort,this.dialogPartSort)){
        return;
      }

      //更新批量数据
      let ids = [];
      this.selectRows.forEach(d => {
        ids.push(d.id);
      })

      this.updatePartTask(ids,this.dialogPartSort)
      this.dialogVisible = false;
    },
    handingPartSortStatus(rowsPartSort,choosePartSort){
      //判断选择的列表数据零件分类是否为EP确认
      if(rowsPartSort === partSortStatus.PART_TASK_NEED_EP_CONFIEMED){
        //判断弹框选择零件分类是否为等待释放或删除
        if(choosePartSort !== partSortStatus.PART_TASK_WAIT_RELEASE && choosePartSort !== partSortStatus.PART_TASK_WAIT_DELETE) {
          iMessage.error(this.language('LINGJIANFENLEIPARTPORTSTATUSEP','零件分类为 【需EP确认】 只能改为 【等待释放】or【等待删除】'))
          return false;
        }
        //【需MQ确认】更改为 【等待删除】or 【正常零件】
        //判断选择的列表数据零件分类是否为需MQ确认
      }else if(rowsPartSort === partSortStatus.PART_TASK_NEED_MQ_CONFIEMED){
        //判断弹框选择零件分类是否为等待删除或正常零件
        if(choosePartSort !== partSortStatus.PART_TASK_NORMAL_PARTS && choosePartSort !== partSortStatus.PART_TASK_WAIT_DELETE) {
          iMessage.error(this.language('LINGJIANFENLEIPARTPORTSTATUSMQ','零件分类为 【需MQ确认】 只能改为 【正常零件】or【等待删除】'))
          return false;
        }
      }
      return true;
    },
    /**
     * @Description: 获取下拉数据
     * @Author: leobao
     * @return {*}
     */
    getSelectOptions() {
      // 零件状态
      this.getDictionary('partTaskPartSort', 'PART_TAKS_SORT')
      // 处理状态
      this.getDictionary('partTaskStatus', 'PART_TAKS_STATUS')
    },
    /**
     * @Description: 调取数据字典获取下拉
     * @Author: leobai
     * @param {*} optionName 下拉选项名称
     * @param {*} optionType 下拉类型
     * @return {*}
     */
    getDictionary(optionName, optionType) {
      getDictByCode(optionType).then(res => {
        if(res?.result) {
          this.selectOptions[optionName] = res.data[0].subDictResultVo.map(item => {
            return { value: item.code, label: item.name }
          })
        }
      })
    },
    getCarProjectOptions() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            carProjectOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.cartypeProName
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleReset() {
      this.searchParams = {
      }
      this.handleSure()
    },
    handleSure() {
      this.page.pageSize = 10
      this.page.currPage = 1
      this.getTableList()
    },

    handleSelectionChange(val) {
      this.selectRows = val
    },
    getTableList() {

      let partNum = [];
      if(this.searchParams.partNum){
        partNum = this.searchParams.partNum.split(",");
      }
      const params = {
        size: this.page.pageSize,
        current: this.page.currPage,
        partNum: partNum,
        cartypeProId:this.searchParams.cartypeProId,
        partSort:this.searchParams.partSort,
        status:this.searchParams.status,
      }
      this.tableLoading = true
      getPartTaskList(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.oldTableData = JSON.parse(JSON.stringify( res.data));//备份历史数据
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
          this.page.currPage = Number(res.pageNum)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>