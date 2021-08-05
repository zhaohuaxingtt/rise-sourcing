<template>
  <div>
      <iPage>
           <iCard style="margin-top:20px">
               <div class="top">
                   <div class="searchOptions">
                        <el-form>
                            <el-row>
                                <el-col>
                                        <iSelect>
                                            <option></option>
                                        </iSelect>
                                </el-col>
                            </el-row>
                        </el-form>
                        <i class="el-icon-warning-outline rotate"></i>
                    </div>
                    <div class="el-icon-error closed" @click="handleClosed"></div>
               </div>
               <iTableCustom
               style="margin-top:20px"
               :data="tabledata"
               :columns="setCloum"
               @go-detail="handleGoDetail"></iTableCustom>
           </iCard>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect,iTableCustom} from 'rise'
import {setCloum} from './data'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        iTableCustom
    },
    data(){
        return {
            formData:{
                deptId:''
            },
            setCloum:setCloum,
            tabledata:[{index:1,name:"aaaaaaa"}]
        }
    },
    methods:{
        handleClosed(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
    
    .top{
        display: flex;
        justify-content: space-between;
        .searchOptions{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .rotate{
            transform: rotate(180deg);
            color: #A0BFFC;
            margin-left: 10px;
        }
        .closed{
            font-size: 24px;
            color: #A0BFFC;
            cursor: pointer;
        }
    }
</style>