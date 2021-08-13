<!--
 * @Author: youyuan
 * @Date: 2021-08-06 14:46:27
 * @LastEditTime: 2021-08-11 14:24:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\supplierList.vue
-->
<template>
  <div>
      <iPage>
        <publicHeaderMenu></publicHeaderMenu>
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
               <iTableCustom
               :data="tabledata"
               :columns="setCloum"
               @go-detail="handleGoDetail"></iTableCustom>
           </iCard>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect,iTableCustom} from 'rise'
import {setCloum} from './components/data'
import supplierDetail from './components/supplierDetail'
import { iMessage } from '@/components';
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
        supplierDetail,
        publicHeaderMenu
    },
    data(){
      return {
        formData:{},
        setCloum:setCloum,
        tabledata:[],
      }
    },
    created () {
      this.getTableData()
    },
    methods:{
      handleGoDetail(row){
        this.$router.push({
          path: '/supplier/supplierDetail',
          query: {
            supplierId: row.supplierId
          }
        })
      },
      getTableData() {
        const params = {
          keyWord: this.formData.supplierName,
          supplierType: "PP"
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
      }
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
</style>