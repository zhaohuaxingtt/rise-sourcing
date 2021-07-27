<!--
 * @Author: wentliao
 * @Date: 2021-07-26 16:49:36
 * @Description: aeko操作页--AEKO管理
-->

<template>
  <iPage class="aeko-manage-list">
    <h2>{{language('LK_AEKOCAOZUO','AEKO操作')}}</h2>
    <iNavMvp :list="navList" lang  :lev="2" routerPage right></iNavMvp>

    <div class="margin-top20">
    <!-- 搜索区域 -->
      <iSearch @sure="getList" @reset="reset">
          <el-form>
              <el-form-item v-for="(item,index) in SearchList" :key="'SearchList_aeko'+index" :label="language(item.labelKey,item.label)">
                  <iSelect v-update v-if="item.type === 'select'" :multiple="item.multiple" v-model="searchParams[item.props]" :placeholder="language('partsprocure.CHOOSE','请选择')">
                    <!-- <el-option v-if="item.props!='showSelf'" value="" :label="language('all','全部')"></el-option> -->
                    <el-option
                      v-for="item in selectOptions[item.selectOption] || []"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>  
                  </iSelect> 
                  <iDatePicker style="width:185px" :placeholder="language('partsprocure.CHOOSE','请选择')" v-else-if="item.type === 'datePicker'" type="daterange"  value-format="yyyy-MM-dd" v-model="searchParams[item.props]"></iDatePicker>
                  <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-else v-model="searchParams[item.props]"></iInput> 
              </el-form-item>
          </el-form>
      </iSearch>
    </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
  iSearch,
  iSelect,
  iDatePicker,
  iInput,
} from 'rise';
import { searchList } from './data';
import { TAB } from '../data';
export default {
    name:'aekoManageList',
    components:{
      iPage,
      iNavMvp,
      iSearch,
      iSelect,
      iDatePicker,
      iInput,
    },
    data(){
      return{
        navList:TAB,
        SearchList:searchList,
        searchParams:{},
        selectOptions:{
          'f':[
            {label:'品牌1',value:'1'},
            {label:'品牌2',value:'2'},
          ],
          'g':[
            {label:'已导入',value:'1'},
            {label:'已分配',value:'2'},
            {label:'已冻结',value:'3'},
            {label:'已通过',value:'4'},
            {label:'已撤销',value:'5'},
          ],
          'h':[
            {label:'待表态',value:'1'},
            {label:'已提交',value:'2'},
            {label:'待审批',value:'3'},
            {label:'Commodity K3通过',value:'4'},
            {label:'Commodity 科室通过',value:'5'},
          ]
        }
      }
    }
}
</script>

<style lang="scss" scoped>
  .aeko-manage-list{
    ::v-deep .el-date-editor .el-range__close-icon{
        display: block;
        width: 10px;
    }
  }
</style>
