<!--
 * @Author: wentliao
 * @Date: 2021-09-18 16:14:35
 * @Description: TCM导入清单
-->
<template>
  <iCard collapse class="tcmList margin-top20" :title="language('LK_AEKO_TCMDAORUQINGDAN','TCM导⼊清单')">
      <iSearch @sure="sure" @reset="reset" :icon="true" class="search-card">
          <el-form>
              <el-form-item 
              v-for="(item,index) in SearchList" 
              :key="'SearchList_'+index"
              :label="language(item.key, item.label)" 
              >
                <iSelect 
                    collapse-tags 
                    v-if="item.type === 'select'" 
                    v-model="searchParams[item.props]"
                    :placeholder="language('partsprocure.CHOOSE','请选择')"
                >
                    <el-option v-if="!item.noShowAll" value="" :label="language('all','全部')"></el-option>
                    <el-option
                        :value="item.value"
                        :label="language(item.labelKey,item.label)"
                        v-for="(item) in selectOptions[item.selectOption]"
                        :key="item.value"
                    >
                    </el-option>
                </iSelect>
                <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                <iInput v-model="searchParams[item.props]" v-else :placeholder="language('LK_QINGSHURU','请输入')"/>

              </el-form-item>
          </el-form>
      </iSearch>
      <p class="divider"></p>
      <!-- 操作按钮 -->
      <p class="text-align-right padding-top15 padding-bottom15">
          <iButton :loading="btnLoading" @click="exportTCM">{{language('LK_AEKO_TCM_SHOUDONGDAORU','⼿动导⼊')}}</iButton>
      </p>
      <!-- 表单区域 -->
      <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :selection="true"
          @handleSelectionChange="handleSelectionChange"
        ></tableList>
        <!-- 分页 -->
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          />
  </iCard>
</template>

<script>
import {
    iCard,
    iSearch,
    iInput,
    iButton,
    iSelect,
    iDatePicker,
    iPagination,
    iMessage,
} from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins";
import {
    tcmSearchList,
    tcmTableTitle,
} from '../data';
import {
    getAekoImportRecordPage,
    manualImportAekoFromTCM,
} from '@/api/aeko/manage'
export default {
    name:'tcmList',
    mixins: [pageMixins],
    components:{
        iCard,
        iSearch,
        iInput,
        iButton,
        iSelect,
        iDatePicker,
        tableList,
        iPagination,
    },
    data(){
        return{
            loading:false,
            SearchList:tcmSearchList,
            selectOptions:{
                status:[
                    {label:'导入成功',value:'SUCCESS',labelKey:'LK_AEKO_TCM_DAORUCHENGGONG_1'},
                    {label:'导入失败',value:'FAIL',labelKey:'LK_AEKO_TCM_DAORUSHIBAI_1'},
                ]
            },
            searchParams:{
                status:'',
            },
            tableListData:[],
            selectItems:[],
            tableTitle:tcmTableTitle,
            btnLoading:false,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        // 搜索确认
        sure(){
            this.page.currPage = 1;
            this.getList();
        },
        // 搜索重置
        reset(){
            this.searchParams={
                status:'',
            };
            this.page.currPage = 1;
            this.getList();
        },
        // 获取列表
        async getList(){
            const {page,searchParams} = this;
            // 若有收到日期起止时间将其拆分成两个字段
            const {receiveDate=[],aekoNum,status} = searchParams;
            console.log(receiveDate,'receiveDate');
            const data = {
                current:page.currPage,
                size:page.pageSize,
                aekoNum,
                status,
            };
            if(receiveDate && receiveDate.length){
                data['receiveDateStart'] = receiveDate[0];
                data['receiveDateEnd'] = receiveDate[1];
            }
            this.loading = true;
            await getAekoImportRecordPage(data).then((res)=>{
                const {code,data={}} = res;
                this.loading = false;
                if(code==200){
                    const {records=[],total} = data;
                    this.tableListData = records;
                    this.page.totalCount = total;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.loading = false;
            })
        },
        handleSelectionChange(val) {
          this.selectItems = val;
        },
        // 手动导入
        async  exportTCM(){
             const {selectItems} = this;
              if(!selectItems.length){
                  iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
              }else{
                  // 只能选择一条数据
                  if(selectItems.length > 1){
                      iMessage.warn(this.language('LK_AEKO_TCM_TIPS_YICIZHINENGDAORUYITIAOSHUJU','一次只能导入一条数据'));
                  }else{
                      this.btnLoading = true;
                      const importRecordId = selectItems[0].id;
                      await manualImportAekoFromTCM({importRecordId}).then((res)=>{
                          this.btnLoading = false;
                          if(res.code == 200){
                            res.data ? iMessage.success(this.language('LK_AEKO_TCM_TIPS_DAORUCHENGGONG','导入成功')) : iMessage.warn(this.language('LK_AEKO_TCM_TIPS_DAORUSHIBAI','导入失败'));
                            this.getList();
                          }else{
                             iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn); 
                          }
                      }).catch((err)=>{
                          this.btnLoading = false;
                      })
                  }
              }
        },
    }
}
</script>

<style lang="scss" scoped>
    .tcmList{
        .search-card{
            box-shadow: none;
            ::v-deep.cardBody{
                padding: 0;
            }
        }
        .divider{
            border-bottom: 1px dashed #9FA4AE;
            padding: 10px 0;
        }
    }
</style>