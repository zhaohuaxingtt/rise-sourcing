<!--
 * @Description: CF车型配置
 * @Author: tyra liu
 * @Date: 2021-11-16 16:54:18
 * @LastEditTime: 2021-11-18 16:04:34
 * @LastEditors:  
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="changeVisible"
    width="80%"
  >
    <div class="top">
      <div class="top-left">
        <span class="title">{{language('CHEXING','车型')}}</span>
        <iSelect v-model="carTypeModel">
          <el-option
            value=" "
           :label="language('all','全部')"
          ></el-option>
          <el-option
            v-for="(item,index) in carTypeOptions"
            :key="item.value"
            :label="item.name"
            :value="index"
          >  
          </el-option>
        </iSelect>
      </div>
      <div class="top-right">
        <iButton @click="changeVisible">{{language('QUXIAO','取消')}}</iButton>
        <iButton>{{language('YINGYONG','应用')}}</iButton>
      </div>
    </div>
    <tableList
      lang
      :tableTitle="carTableTitle"
      :tableData="carTableData"
    >
    </tableList>
  </iDialog>
</template>
<script>
import {iDialog, iButton, iSelect} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList";
import {carTitle} from "../data"
import {getCartypeDict} from "@/api/partsrfq/home";
export default {
  components: { iDialog, iButton, tableList, iSelect},
  props: {
    dialogVisible: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      carTableTitle:[...carTitle],
      carTableData:[],
      carTypeOptions:[],
      carTypeModel:''
    }
  },
  created() {
    this.getCartypeDict()
  },
  methods: {
    changeVisible() {
      this.$emit('changeVisible', false)
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict().then(res => {
        this.carTypeOptions = res.data
      }).catch(err=>{
        console.log(err)  
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .top{
    display: flex;
    justify-content: space-between;
    margin:0 0 20px 0 ;
    .top-left{
      display: flex;
      .title{
          font-size: 18px;
          color: #131523;
          font-weight: bold;
          width: 70px;
        }
    }
  }
</style>