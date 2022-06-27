<template>
  <iPage class="progressDetail">
    <projectTop />
    <iSearch>
      <!-- <template #header> -->
        <div class="isearch-top">
          <el-form inline class="form">
            <el-form-item :label="language('CHEXINGXIANGMU','车型项目')">
                <iSelect filterable v-model="searchParams.carProject" :placeholder="language('QINGXUANZE','请选择')">
                  <el-option
                    v-for="item in carProjectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </iSelect>
              </el-form-item>
          </el-form>
          <iprogress :carProjectId="'50141107'"></iprogress>
        </div>
      <!-- </template> -->
      <span class="form-title">零件进度：</span>
      <el-form class="margin-top10">
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key, item.label)">
          <iSelect clearable v-update v-if="item.type === 'select'" v-model="searchParams[item.prop]"
            :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-if="item.prop == 'showSelf' || item.prop == 'linieApportionStatus'" value=""
              :label="language('ALL', '全部')"></el-option>
            <el-option v-for="item_ in selectOptions[item.selectOption] || []" :key="item_.value" :label="item_.label"
              :value="item_.value">
            </el-option>
          </iSelect>
          <iDatePicker v-else-if="item.type === 'date'" value-format="yyyy-MM-dd" type="daterange"
            v-model="searchParams[item.prop]" :placeholder="language('QINGXUANZE', '请选择')"></iDatePicker>
          <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.prop]"
            :title="language(item.key, item.label)" />
          <iInput clearable v-else v-model="searchParams[item.vpropalue]" :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iTabsList type="card" class='margin-top20' v-model="tabVal" @tab-click="changeTab" >
      <el-tab-pane name="1" label="HeavyItem零件">
        <heavyItem/>
      </el-tab-pane>
      <el-tab-pane name="2" label="普通零件">
        <iCard>
          普通零件
        </iCard>
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise";
import projectTop from '../components/projectHeader'
import iprogress from "../components/progress";
import heavyItem from "./components/heavyItem";
import { progressDetailSearchList as searchList } from "../components/data";

  export default {
    components:{
      iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage, projectTop,iprogress,heavyItem
    },
    data() {
      return {
        searchParams: {
          carProject:""
        },
        carProjectOptions:[],
        searchList,
        selectOptions:{},
        tabVal:'1'
      }
    },
    methods:{
      changeTab(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.progressDetail{
  .form-title{
    font-size: 18px;
    font-weight: bold;
  }
  .isearch-top{
    display: flex;
    // justify-content: space-between;
    flex-flow: row;
  
  }
  ::v-deep .hiden{
    max-height: 108px;
  }
}
</style>