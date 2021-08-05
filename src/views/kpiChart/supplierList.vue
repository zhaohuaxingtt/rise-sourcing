<template>
  <div>
      <iPage>
          <iCard>
               <div class="imgkpi-head">
               <el-form>
                <el-form-item
                  class="SearchOption"
                >
                <iInput suffix-icon="el-icon-search"></iInput>
                </el-form-item>
               </el-form>
               <div>
                   <iButton>{{language('QUEREN','确认')}}</iButton>
                   <iButton>{{language('CHONGZHI','重置')}}</iButton>
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
import iDialog from '@/components/iDialog/index'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        iTableCustom,
        supplierDetail,
        iDialog
    },
    data(){
        return {
            formData:{
                deptId:''
            },
            setCloum:setCloum,
            tabledata:[{index:1,name:"aaaaaaa"}],
     
        }
    },
    methods:{
        handleGoDetail(){
            this.$router.push('/supplier/supplierDetail')
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