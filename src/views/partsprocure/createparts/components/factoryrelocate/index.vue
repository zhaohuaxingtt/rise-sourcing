<!--
 * @Author: YUSZHOU
 * @Date: 2021-05-24 17:17:01
 * @LastEditTime: 2022-03-23 15:52:55
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsprocure\createparts\components\factoryrelocate\index.vue
-->
<template>
  <iPage class="home">
    <div class="header">
      <iNavMvp :lev="1" :list="navList" :lang="true" routerPage class="nav" />
      <div class="control">
        <!-- <logButton class="margin-left20" @click="log" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span> -->
      </div>
    </div>
    <iCard class="margin-top40">
      <div class="textalineright margin-bottom20">
        <iButton v-permission.auto="FACTORYRELOCATE_DOWNLOAD|工厂迁移-下载模板">{{language('DUNLOADTEMPATE','下载模板')}}</iButton>
        <iButton v-permission.auto="FACTORYRELOCATE_UPLOAD|工厂迁移-上传文件">{{language('UPLOADFILE','上传文件')}}</iButton>
        <button-table-setting @click="edittableHeader" />
      </div> 
      <!-- <el-table v-loading='tablaLoading' :data='tableData' v-permission.auto="FACTORYRELOCATE_TABLE|工厂迁移-表格">
        <template v-for="(items,index) in tableFileTitle">
          <el-table-column align="center" :prop="items.props" :label="language(items.key,items.name)" :key='index'></el-table-column>
        </template>
      </el-table>  -->
      <tablelist
        permissionKey="PARTSPROCURE_CREATEPARTS_COMPONENTS_FACTORYRELOCATE"
        v-permission.auto="FACTORYRELOCATE_TABLE|工厂迁移-表格"
        ref="tableList"
        lang
        :selection="false"
        :tableData="tableData"
        :tableTitle="tableFileTitle"
        :tableLoading="tablaLoading"
      /> 
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, factoryTranslate)"
        @current-change="handleCurrentChange($event, factoryTranslate)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
	      v-update
      />
    </iCard> 
  </iPage>
</template>

<script>
import {iCard,iButton,iPagination,iPage,iNavMvp} from 'rise'
import {tableFileTitle} from './components/data'
import { pageMixins } from "@/utils/pageMixins";
import {factoryTranslate} from '@/api/partsprocure/editordetail'
import { navList, noOnlineText } from "../data"
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  components:{
    iCard,iButton,iPagination,iPage,iNavMvp,
    tablelist,
    buttonTableSetting
  },
  mixins:[pageMixins,tableSortMixins],
  data(){
    return {
      navList: _.cloneDeep(navList),
      tableData:[],
      tableFileTitle:tableFileTitle,
      tablaLoading:false
    }
  },
  created() {
    this.factoryTranslate()
    this.$set(this.navList[this.navList.length - 1], 'slot', noOnlineText(this.$i18n.locale))
  },
  watch: {
    ['$i18n.locale'](lang) {
      this.$set(this.navList[this.navList.length - 1], 'slot', noOnlineText(lang))
    }
  },
  methods:{
    factoryTranslate(){
      this.tablaLoading = true
      factoryTranslate().then(res=>{
        this.tablaLoading = false
        this.tableData = res.list
      }).catch(err=>{
        this.tablaLoading = false
        //iMessage.error()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .control {
    // position: absolute;
    // top: 30px;
    // right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>

<style>
  .textalineright{
    text-align: right;
  }
</style>