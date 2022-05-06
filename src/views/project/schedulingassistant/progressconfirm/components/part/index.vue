<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 10:55:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:03:02
 * @Description: 零件
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\part\index.vue
-->

<template>
  <div>
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('LK_INQUIRE', '查询')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iInput v-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
          <!--------------询价采购员下拉----------------------->
          <fsSelect v-else-if="item.type === 'fsSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------项目采购员下拉----------------------->
          <productPurchaserSelect v-else-if="item.type === 'productPurchaserSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------车型项目下拉----------------------->
          <carProjectSelect v-else-if="item.type === 'carProjectSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------字典下拉----------------------->
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
        </el-form-item>
      </el-form>
    </iSearch>
    <confirmTable
      ref="confirmTableNomi"
      class="margin-top20"
      title="风险零件进度确认-待定点"
      titleKey="FENGXIANLINGJIANJINDUQUERENDAIDINGDIAN"
      :tableTitle="tableTitleNomi"
      :tableData="tableDataNomi"
      :collapse="true"
      :isFS="isFS"
      partPeriod="2"
      :searchParams="searchParams"
    />
    <confirmTable
      ref="confirmTableKickoff"
      class="margin-top20"
      title="风险零件进度确认-待Kickoff"
      titleKey="FENGXIANLINGJIANJINDUQUERENDAIKICKOFF"
      :tableTitle="tableTitleKickoff"
      :tableData="tableDataKickoff"
      :collapse="true"
      :isFS="isFS"
      partPeriod="3"
      :searchParams="searchParams"
    />
    <fsConfirm ref="fsConfirmPart" :dialogVisible="dialogVisibleFS" @handleConfirm="handleSendFsConfirm" :tableListNomi="tableListNomi" :tableListKickoff="tableListKickoff" :cartypeProId="cartypeProId" @changeVisible="changeFsConfirmVisible" />
  </div>
</template>

<script>
import { iSearch, iInput, iButton } from 'rise'
import confirmTable from '../confirmTable'
import { tableTitleNomi, tableTitleKickoff, searchList } from './data'
import fsSelect from '@/views/project/components/commonSelect/fsSelect'
import productPurchaserSelect from '@/views/project/components/commonSelect/productPurchaserSelect'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect'
import iDicoptions from 'rise/web/components/iDicoptions'
import fsConfirm from '@/views/project/schedulingassistant/part/components/fsconfirm'
import { roleMixins } from "@/utils/roleMixins";
export default {
  components: { fsConfirm, confirmTable, iSearch, iInput, iButton, fsSelect, productPurchaserSelect, carProjectSelect, iDicoptions },
  mixins: [roleMixins],
  data() {
    return {
      tableTitleNomi,
      tableTitleKickoff,
      tableDataNomi: [],
      tableDataKickoff: [],
      searchList:searchList.filter((item)=>!item.hidden),
      searchParams: {},
      selectOptions: {}
    }
  },
  computed: {
    isFS() {
      return this.$route.path.includes('proconfirm')
    },
  },
  created() {
    this.initSearchParams()

    // 判断一下是否包含以下角色 若包含则展示询价采购员搜索框
    // ADMIN      超级管理员
    // QQCGKZ     前期采购科长
    // QQCGGZ     前期采购股长
    // CGBZ       采购部长
    // CIXTGLY    CI系统管理员
    // CSXTGLY    CS系统管理员
    // QQCGKZ_WF    前期采购科长_外方
    // CGBZ_WF      采购部长_外方
    if(this.$route.path.includes('proconfirm')){
      const list = ['ADMIN','QQCGKZ','QQCGGZ','CGBZ','CIXTGLY','CSXTGLY','QQCGKZ_WF','CGBZ_WF'];
      const roleList = this.roleList;
      let isIncludes = false;
      roleList.map((item)=>{
        if(list.includes(item)) isIncludes = true;
      })
      if(isIncludes){
        this.searchList = searchList
      }
    }else{
      this.searchList = searchList
    }

  },
  methods: {
    initSearchParams() {
      this.searchParams = {
        confirmStatus: '2',
        cartypeProId: this.$route.query.cartypeProId || '',
        partNum: this.$route.query.partNum || '',
        fsId: '',
        projectPurchaserId: ''
      }
    },
    handleSure() {
      this.$refs.confirmTableNomi && this.$refs.confirmTableNomi.getTableList(true)
      this.$refs.confirmTableKickoff && this.$refs.confirmTableKickoff.getTableList(true)
    },
    handleReset() {
      this.initSearchParams()
      this.$nextTick(() => {
        this.handleSure()
      })
    },
  }
}
</script>