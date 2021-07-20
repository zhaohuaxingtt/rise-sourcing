<!--
 * @Author: your name
 * @Date: 2021-06-29 17:02:51
 * @LastEditTime: 2021-06-30 15:01:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steeldemandcreation\index.vue
-->
<template>
  <iPage>
    <div class="topMenu">
      <iNavMvp class="margin-bottom30" lang @change="change" :list='navListLeft' routerPage lev="1" @message="clickMessage" />
      <iNavMvp class="margin-bottom30" lang @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
    </div>
    <iSearch class="margin-bottom20">
      <el-form>
        <template v-for='(items,index) in searchForm'>
          <el-form-item :label='language(items.i18nKey,items.i18nName)' :key="index">
            <template v-if='items.type == "input"'>
              <iInput v-model="form[items.moduleKey]" :placeholder='language("QINGITANXIE","请填写")'></iInput>
            </template>
            <template v-else>
              <iSelect :placeholder='language("QINGXUANZE","请选择")'>
                <el-option v-for="(item,i) in items.list" :key='i' :label="item.name" :value="item.code"></el-option>
              </iSelect>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template>
      </template>
    </iSearch>
    <iCard>
      <div class="textalign-right">
        <iButton>{{language('XIAZAIPILIANGMOBAN','下载批量模板')}}</iButton>
        <iButton>{{language('SHANGCHUANWENJIANYICIX','上传文件（一次性）')}}</iButton>
        <iButton>{{language('SHANGCHUANWENJJIANPILIANG','上传文件批量')}}</iButton>
        <iButton>{{language('DAYINGDINGDANLIUZHUANDAN','打印订单流转单(一次性)')}}</iButton>
        <iButton>{{language('DAYINGDINGDANLIUZDPILIANG','打印订单流转单（批量）')}}</iButton>
      </div>
      <el-table :data='tabelList' v-loading='tabelLoading'>
        <template v-for='(items,index) in tableTitle'>
          <el-table-column :prop="items.props" :label="language(items.key,items.name)" align="center" :key='index'></el-table-column>
        </template>
      </el-table>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, steeldemandcreation)"
          @current-change="handleCurrentChange($event, steeldemandcreation)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </iCard> 
  </iPage>
</template>
<script>
import {iPage,iSearch,iCard,iNavMvp,iSelect,iInput,iButton,iPagination} from 'rise'
import {searchForm,form,tableTitle} from './components/data'
import {steeldemandcreation} from '@/api/steelDemandCreation/home'
import {pageMixins} from "@/utils/pageMixins";
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")
export default{
  mixins:[pageMixins],
  components:{iPage,iSearch,iCard,iNavMvp,iSelect,iInput,iButton,iPagination},
    created(){
      this.searchForm = searchForm()
      this.steeldemandcreation()
    },
    data(){
      return {
        searchForm:[],
        form:form,
        tableTitle:tableTitle,
        tabelLoading:false,
        tabelList:[]
      }
    },
    computed: {
      ...mapState(["navList","navListLeft"]),
      ...mapActions(["updateNavList"])
    },
    methods:{
      steeldemandcreation(){
        steeldemandcreation().then(res=>{
          this.tabelList = res.data.list
        }).catch(err=>{})
      }
    }
}
</script>
<style lang='scss' scoped>
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
  .textalign-right{
    text-align: right;
    margin-bottom: 20px;
  }
</style>