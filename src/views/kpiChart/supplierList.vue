<!--
 * @Author: youyuan
 * @Date: 2021-08-06 14:46:27
 * @LastEditTime: 2021-08-18 10:59:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\supplierList.vue
-->
<template>
  <div>
    <iPage>
      <div class="navBox clearfix">
            <el-tabs v-model="activeName" @tab-click="handleleftClick" class="leftNav">
                <el-tab-pane 
                v-for="x in tabRouterList"
                :label="x.name" 
                :name="x.url"
                :key="x.value"
                ></el-tab-pane>
            </el-tabs>
            <div>
            <el-tabs v-model="activeRightName" @tab-click="handlerightClick" class="rightNav">
                <el-tab-pane 
                v-for="x in categoryManagementAssistantList"
                :label="x.name" 
                :name="x.url"
                :key="x.value"
                ></el-tab-pane>
            </el-tabs>
            <logButton class="logButton"/>
            </div>
        </div>
      <iTabs style='margin-left:20px;' v-model="tabVal" @tab-click="changeTab" >
          <el-tab-pane name="PP" label="生产供应商">
          </el-tab-pane>
          <el-tab-pane name="GP" label="一般供应商">
          </el-tab-pane>
        </iTabs>
      <!-- <div class="tab">
        <div class="current radius-left">生产供应商</div>
        <div class="radius-right">一般供应商</div>
      </div> -->
        <iCard>
              <div class="imgkpi-head">
              <el-form :model="formData">
              <el-form-item class="SearchOption">
                <iInput v-model="formData.supplierName" suffix-icon="el-icon-search" :placeholder="language('SHURUCHAXUNGONGYINGSHANGMINGCHENG', '输入查询供应商名称')"></iInput>
              </el-form-item>
              </el-form>
              <div>
                  <iButton @click="clickSure">{{language('QUEREN','确认')}}</iButton>
                  <iButton @click="clickReset">{{language('CHONGZHI','重置')}}</iButton>
              </div>
              </div>
          </iCard>
          <iCard style="margin-top:20px">
            <div class="supplier-table-tittle">重点追踪供应商名单</div>
              <iTableCustom
              :data="tabledata"
              :columns="setCloum"
              @go-detail="handleGoDetail"></iTableCustom>
          </iCard>
    </iPage>
  </div>
</template>

<script>
import {iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantList, iMessage } from './commonHeardNav/navData'
import logButton from '@/components/logButton'
import {iButton, iPage, iCard, iInput, iSelect, iTableCustom, iTabs} from 'rise'
import {setCloum} from './components/data'
import supplierDetail from './components/supplierDetail'
import { getFocusSupplierList } from '@/api/partsrfq/spi/index.js'
import publicHeaderMenu from './commonHeardNav/headerNav'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        iTableCustom,
        iTabs,
        supplierDetail,
        publicHeaderMenu,
        categoryManagementAssistantList,
        tabRouterList,
        iNavMvp,
        logButton
    },
    data(){
      return {
        activeName:'/supplier/kpiIndex',
        activeRightName:'/supplier/supplierList',
        tabRouterList:tabRouterList,
        categoryManagementAssistantList:categoryManagementAssistantList,
        formData:{},
        setCloum:setCloum,
        tabledata:[],
        tabVal: 'PP',
      }
    },
    created () {
      this.getTableData()
    },
    methods:{
      handleleftClick(tab,event){
            this.$router.push(tab.name)
        },
        handlerightClick(tab){
            this.activeName='/supplier/kpiIndex'
             this.$router.push(tab.name)
        },
      handleGoDetail(row){
        this.$router.push({
          path: '/supplier/supplierDetail',
          query: {
            supplierType: this.tabVal,
            supplierId: row.supplierId,
            supplierName: row.nameZh
          }
        })
      },
      getTableData() {
        const params = {
          keyWord: this.formData.supplierName,
          supplierType: this.tabVal
        }
        getFocusSupplierList(params).then(res => {
          if(res && res.code == 200) {
            this.tabledata = res.data
            this.initHandleData()
          } else iMessage.error(res.desZh)
        })
      },
      initHandleData() {
        this.tabledata.forEach((item, index) => {
          item['index'] = index + 1
        })
      },
      // 点击确定
      clickSure() {
        this.getTableData()
      },
      // 点击重置
      clickReset() {
        this.formData = {
          ...this.formData,
          supplierName: null,
        }
        this.getTableData()
      },
      //改变Tab事件
      changeTab() {
        this.getTableData()
      },
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
    .tab{
      width: 240px;
      display: flex;
      justify-content: flex-start;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
      margin-bottom: 20px;
      
      div{
        width: 120px;
        height: 35px;
        color: #000;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        font-weight: bold;
      }
      .radius-left{
        border-radius: 10px 0 0 10px;
      }
      .radius-right{
        border-radius: 0 10px 10px 0;
      }
      .current{
        background-color: #fff!important;
        color: #67C23A!important;
      }
    }
    .supplier-table-tittle{
      font-size: 18px;
      color: #000;
      font-weight: bold;
      margin-bottom: 20px;
    }
    ::v-deep.navBox {
  .logButton .icon + span{vertical-align: top;}
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  margin-bottom: 20px;
  div{font-size: 20px;}
  .el-tabs__nav-wrap::after{
    width: 0;
  }
  .el-tabs__item{
    line-height: 24px;
  }
  .el-tabs__item.is-active{
    font-weight: Bold;
  }
  .leftNav{
      float: left;
  }
  .rightNav {
    float: right;
    margin-right: 110px;
    .el-tabs__active-bar {
        background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
.clearfix:after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }
</style>