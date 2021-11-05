<!--
 * @Author: yuszhou
 * @Date: 2021-05-24 17:41:24
 * @LastEditTime: 2021-05-24 21:05:15
 * @LastEditors: Please set LastEditors
 * @Description: 自动分配科室
                  1）配件分配会分两步：首先根据零件6位号匹配材料组，找到对应的科室，如果材料组是轮胎或机油则分配给CSX，如果不是轮胎或机油，则分配给CSS；分配科室之后，再根据零件和采购员（采购岗位）的匹配关系分给对应的采购员
                  2）配件目前是分轮胎&机油和其他，未来可能会调整，需要设置可配置的表格（表格1,2,列为全量材料组，第三列可批量编辑分配科室）
                  3）分配不到人的配件需求会继续在需求任务界面显示，由配件管理员手动分配；已经分配到人的任务会在配件综合管理界面显示
 * @FilePath: \front-web\src\views\AutomaticallyAssignDe\index.vue
-->

<template>
  <iPage>
    <!----------------------------------------------------------------->
    <!---------------------------配件自动分配头部------------------------->
    <!----------------------------------------------------------------->
    <topComponents>
      <iNavMvp :lev='1' slot='left' :list='navBarList'></iNavMvp>
    </topComponents>
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch class="margin-top20" :icon='true'>
      <el-form>
        <el-form-item label="材料组编号">
          <iSelect></iSelect>  
        </el-form-item>
        <el-form-item label="材料组名称">
          <iInput></iInput>  
        </el-form-item>
        <el-form-item label="科室">
          <iSelect></iSelect>  
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
          <span class="font18 font-weight">配件自动分配科室</span>
            <div class="floatright">
              <!--------------------批量分配科室----------------------------------->
              <iButton @click="batchData">批量分配科室</iButton>
              <!--------------------拒绝按钮----------------------------------->
              <iButton @click="edit" v-if='editData'>编辑</iButton>
              <!--------------------接受按钮----------------------------------->
              <iButton @click="save" v-if='!editData'>保存</iButton>
              <!--------------------拒绝按钮----------------------------------->
              <iButton @click="remove" v-if='!editData'>取消</iButton>
            </div>
        </div>
      <tableList :tableData='tableData' :tableTitle='tabelTile' @handleSelectionChange="handleSelectionChange"></tableList>
          <!------------------------------------------------------------------------>
          <!--                  表格分页                                          --->
          <!------------------------------------------------------------------------>
          <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount"
          />
    </iCard>
   <batchBox v-model='showValue'></batchBox>
  </iPage>
</template>
<script>
import {iPage,iNavMvp,iSelect,iInput,iSearch,iCard,iButton,iPagination,iMessage} from 'rise'
import topComponents from './components/topComponents'
import {navBarList,tabelTile} from './components/data'
import tableList from './components/tableList'
import { pageMixins } from "@/utils/pageMixins";
import batchBox from './components/batchBox'
export default{
  mixins: [pageMixins],
  components:{iPage,topComponents,iNavMvp,iSelect,iInput,iSearch,iCard,tableList,iButton,iPagination,batchBox},
  data(){
    return {
      navBarList:navBarList, 
      tabelTile:tabelTile,//表格表头
      tableData:[{},{},{}], //表格数据
      editData:true, //默认表格是否编辑
      selectList:[], //选中的数据
      showValue:false, //弹窗数据
    }
  },
  methods:{
    /** 
     * @description: 验证规则界面。 
     * @param {*}
     * @return {*}
     */    
    listValidate(){
      return new Promise((r)=>{
        if(this.selectList.length > 0) {r(true)}
        else{
          iMessage.warn('抱歉！您还未请选择材料组!')
          return r(false)
        }
      })
    },
    /**
     * @description: 点击表格中的checkBox后，子组件中会将数据注入res
     * @param {*} res 选中的所有数据
     * @return {*}
     */
    handleSelectionChange(res){this.selectList = res},
    /**
     * @description: 批量分配科室 
     * @param {*}
     * @return {*}
     */
    async batchData(){
       const pass = await this.listValidate()
       if(pass){
         this.showValue = !this.showValue
       }
    },
    /**
     * @description: 编辑方法 
     * @param {*}
     * @return {*}
     */
    edit(){
      this.editData = !this.editData
    },
    /**
     * @description: 保存数据 
     * @param {*}
     * @return {*}
     */
    async save(){
     
    },
    /**
     * @description: 取消保存 
     * @param {*}
     * @return {*}
     */
    remove(){
      this.editData = !this.editData
    }
  }
}
</script>
<style lang='scss' scoped>
</style>