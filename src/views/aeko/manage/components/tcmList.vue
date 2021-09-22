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
                    v-model="form[item.props]"
                    :placeholder="language('partsprocure.CHOOSE','请选择')"
                >
                    <el-option
                        :value="item.value"
                        :label="item.label"
                        v-for="(item) in selectOptions[item.selectOption]"
                        :key="item.value"
                    >
                    </el-option>
                </iSelect>
                <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="form[item.props]"></iDatePicker>
                <iInput v-model="form[item.props]" v-else :placeholder="language('LK_QINGSHURU','请输入')"/>

              </el-form-item>
          </el-form>
      </iSearch>
      <p class="divider"></p>
      <!-- 操作按钮 -->
      <p class="text-align-right padding-top15 padding-bottom15">
          <iButton @click="exportTCM">{{language('LK_AEKO_TCM_SHOUDONGDAORU','⼿动导⼊')}}</iButton>
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
            SearchList:tcmSearchList,
            selectOptions:{
                status:[
                    {label:'导入失败',value:'1'},
                    {label:'导入成功',value:'2'},
                ]
            },
            form:{},
            tableListData:[],
            selectItems:[],
            tableTitle:tcmTableTitle,
        }
    },
    methods:{
        // 搜索确认
        sure(){

        },
        // 搜索重置
        reset(){

        },
        // 获取列表
        getList(){

        },
        handleSelectionChange(val) {
          this.selectItems = val;
        },
        // 手动导入
        exportTCM(){
             const {selectItems} = this;
              if(!selectItems.length){
                  iMessage.warn(this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
              }else{
                  // 只能选择一条数据
                  if(selectItems.length > 1){
                      iMessage.warn(this.language('LK_AEKO_TCM_TIPS_YICIZHINENGDAORUYITIAOSHUJU','一次只能导入一条数据'));
                  }else{
                      //  状态为‘导入失败’或‘导入成功'且没分派的Aeko
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
            border-bottom: 1px dashed #909091;
            padding: 10px 0;
        }
    }
</style>