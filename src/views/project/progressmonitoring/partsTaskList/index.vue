
<template>
  <iPage class="partsTaskList" v-permission.auto="PROJECTMGT_PARTSTASK_PAGE|项目管理-零件任务清单-页面">
    <!-- <p class="font18 font-weight">
      车型项目：{{titleName}}
    </p> -->
    <iSearch :icon="true" class="margin-top20">
      <template slot="button">
        <!-- <iButton @click="back">{{language('Back', '返回')}}</iButton> -->
        <iButton @click="handleSure">{{language('LK_INQUIRE', '查询')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>

        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)" v-permission.dynamic.auto="item.permission" :class="item.type === 'iMultiLineInput'? 'currentWidth' : ''">
          <iSelect v-if="item.type ==='select'" :filterable="item.filterable" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option value="" :label="language('all','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURUDUOGELINGJIANHAO', '请输入多个零件号，多个逗号分割')" />
          
          <iMultiLineInput
            v-else-if="item.type === 'iMultiLineInput'"
            :placeholder="language('QINGSHURUDUOGELINGJIANHAO', '请输入多个零件号，多个逗号分割')"
            :title="language('partsprocure.PARTSPROCUREPARTNUMBER','零件号')"
            v-model="searchParams[item.value]"
          ></iMultiLineInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" v-permission.auto="PROJECTMGT_PARTSTASK_TABLE|项目管理-零件任务清单-表格">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('LINGJIANRENWUQINGDANGENGXIN', '零件任务清单更新')}}</span>
        <div class="floatright">
          <!--------------------处理按钮----------------------------------->
          <iButton  @click="handleBatchUpdate" >{{language('PILIANGXIUGAIZHUANGTAI','批量修改状态')}}</iButton>
          <iButton  :loading="btnSaveLoading" @click="updatePartTask" >{{language('BAOCUN','保存')}}</iButton>
          <iButton  @click="handleExport('1')" >{{language('DAOCHUDEIEPQUERENQINGDAN','导出待EP确认清单')}}</iButton>
          <iButton  @click="handleExport('2')" >{{language('DAOCHUDEIMQQUERENQINGDAN','导出待MQ确认清单')}}</iButton>
          <iButton  @click="handleExportAll" :loading="downloadLoading" >{{language('DAOCHUQUANBU','导出全部')}}</iButton>
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
      </div>
      <tableList 
                permissionKey="PROJECT_PROGRESSMONITORING_PARTSTASKLIST"
                indexKey
                 ref="tableList"
                 :lang="true"
                 :tableTitle="tableTitle"
                 :selectOptions="selectOptions"
                 :tableData="tableData"
                 :tableLoading="tableLoading"
                 @handleSelectChange="handleSelectChange"
                 @handleSelectionChange="handleSelectionChange"
      >
        <template #partNum="scope">
          <span style="white-space:pre;">{{scope.row.partNum}}</span>
        </template>
        <template #partSort="scope">
          <iSelect v-model="scope.row['partSort']" @change="val => handleSelectChange(val, scope.row)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in  selectOptions['partTaskPartSort']"
              :key="index"
            ></el-option>
          </iSelect>
        </template>

      </tableList>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>

    <iDialog :visible.sync="dialogVisible" title="零件分类"  @close="clearDialog"  width="20%" >
      <div >
        <el-form>

          <el-form-item :label="language('XUANZHELINGJIANFENLEI','选择零件分类')">
            <iSelect  :filterable="false" v-model="dialogPartSort" :placeholder="language('QINGXUANZE', '请选择')">
              <el-option  v-for="item in selectOptions['partTaskPartSort']" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSure">{{language('QUEDING','确 定')}}</el-button>
      </div>

    </iDialog>
  </iPage>
</template>

<script>
import { iSearch, iSelect, iInput, iButton, iCard, iPagination, iMessage,iDialog, iPage,iMultiLineInput } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { searchList, tableTitle,partSortStatus } from './data'
import { getPartTaskList,downLoadPartScheduleFile,updatePartInfoList, transferSchedule, downAllFile } from '@/api/project'
import { getDictByCode } from '@/api/dictionary'
//import tableList  from '@/views/project/progressmonitoring/partsTaskList/components/tableList'

import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [pageMixins,tableSortMixins],
  components: { iSearch, iSelect, iInput, iButton, iCard, iPagination,iDialog, tableList,iPage, buttonTableSetting,iMultiLineInput },
  data() {
    return {
      searchList,
      tableTitle,
      partSortStatus,
      dialogVisible:false,
      searchParams: {
        cartypeProId: this.$route.query.cartypeProId,
        status: this.$route.query.status || '',
        partSort:'',
        risePartDesc:'',
      },
      titleName:this.$route.query.carProjectName,
      selectOptions: {
        'partTaskPartSortQuery':[],
        'partTaskStatus':[],
        'partTaskRisePartDesc':[],
        'partTaskPartSort':[]
      },
      tableData: [],
      tableLoading: false,
      selectRows: [],
      fsDialogVisible: false,
      sendRows: [],
      oldTableData:[],
      batchUpdataMap:new Map(),
      dialogPartSort:"",
      downloadLoading: false,
      btnSaveLoading:false,
    }
  },
  computed: {

  },
  mounted() {
    console.log("页面加载完成")
  },
  created() {
    this.getSelectOptions()
    this.getTableList()
  },
  methods: {
    async handleExportAll() {
      this.downloadLoading = true
      await downAllFile({...this.searchParams, partNum: this.searchParams.partNum ? this.searchParams.partNum.split(",") : []})
      this.downloadLoading = false
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //列表数据选择零件状态
    handleSelectChange(val, item) {
      //存储变更数据
      this.batchUpdataMap.set(item.id,item);
    },
    /**
     * @Description: 点击保存 批量更新数据
     * @Author: leobao
     * @return {*}
     */
    updatePartTask() {

      console.log(this.batchUpdataMap);

      const partTaskDTOS = [];
      let isMessage = '1';


      for(let [key,item] of this.batchUpdataMap){
        console.log(item);
        if(item.partSort == 5){
          isMessage ='2'
        }
        partTaskDTOS.push({ id:item.id, partSort:item.partSort, })
      }

      this.btnSaveLoading = true;
      this.tableLoading = true;

      updatePartInfoList(partTaskDTOS).then(res => {
        this.btnSaveLoading = false;
        this.tableLoading = false;
        if (res?.result) {
          this.getTableList();
          if(isMessage == '2'){
            iMessage.success(this.language('BAOCUNCHENGGONJINRUHOUXUJIANKONMOKUAI','保存成功，[正常零件]已进入后续监控模块！'));
            return
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).catch((err)=>{
        this.btnSaveLoading = false;
        this.tableLoading = false;
      })
    },
    /**
     * @Description: 导出execl mq 和ep公用
     * @Author: leobao
     * @return {*}
     */
    handleExport(flag){
      if(this.selectRows.length>0){
        var msg=``
        var p=true
        this.selectRows.forEach(val=>{
          if(val.partSort!=1&&flag=='1'){
            msg+=`<p>零件号${val.partNum}，零件分类不为EP需确认，不能导出EP确认清单</p>`
            p=false
          }else if(val.partSort!=2&&flag=='2'){
            msg+=`<p>零件号${val.partNum}，零件分类不为MQ需确认，不能导出MQ确认清单</p>`
            p=false
          }
        })
     
      }
      if(p){
        let ids = [];
        this.selectRows.forEach(d => {
          ids.push(d.id);
        })
        const params = {
          ids:ids,
          cartypeProId:this.searchParams.cartypeProId,
          downPartSort:flag,
        }
        downLoadPartScheduleFile(params).then(res => {
          this.getTableList();
          if (!res?.result) {
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          }
        })
      }else{
        this.$alert(msg, '导出失败', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
        });
      }
      
  },
    /**
     * @Description: 批量更新弹出框
     * @Author: leobao
     * @return {*}
     */
    handleBatchUpdate(){

      if(this.selectRows.length ==0){
        iMessage.error(this.language('QINGXUANZHELINGJIANJILUHOUPILIANGCAOZUO','请选择零件记录后批量操作！'));
        return
      }
      this.dialogPartSort = '';
      this.dialogVisible = true;
    },
    //弹出框
    dialogSure(){
      if(this.dialogPartSort ==''){
        iMessage.error(this.language('QINGXUANZHELINGJIANFENGLEI','请选择零件分类'))
        return
      }
      //更新批量数据
      let ids = [];
      this.selectRows.forEach(d => {
        d.partSort = this.dialogPartSort;
        //存储变更数据
        this.batchUpdataMap.set(d.id,d);
      })


      //this.updatePartTask(ids,this.dialogPartSort)
      this.dialogVisible = false;
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
      // 异常原因
      this.getDictionary('partTaskRisePartDesc', 'PART_TAKS_RISE_PART_DESC')
      //查询零件状态
      this.getDictionary('partTaskPartSortQuery', 'PART_TAKS_SORT')

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
             if(optionName == 'partTaskPartSort'){
               item.code = parseInt(item.code);
             }
            return { value: item.code, label: item.name }
          })
          // if(optionName == 'partTaskPartSortQuery' ){
          //   this.selectOptions[optionName] = this.selectOptions[optionName].filter(item => {
          //     return item.value !='5';
          //   })
          // }
        }
      })
    },
    handleReset() {
      this.searchParams = {
        cartypeProId:this.$route.query.cartypeProId,
        status:'',
        partSort:'',
        risePartDesc:'',
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
        risePartDesc:this.searchParams.risePartDesc
      }
      this.tableLoading = true
      getPartTaskList(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.oldTableData = JSON.parse(JSON.stringify( res.data));//备份历史数据
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
          this.page.currPage = Number(res.pageNum)
          this.batchUpdataMap = new Map();
          console.log("列表查询")
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
.partsTaskList {
  padding: 0;
  height: auto;
  overflow-y: auto;
}
.currentWidth{
  width: 490px!important;
}
</style>