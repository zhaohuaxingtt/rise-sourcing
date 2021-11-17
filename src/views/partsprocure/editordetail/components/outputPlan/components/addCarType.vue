<!--
 * @Description: CF车型配置
 * @Author: tyra liu
 * @Date: 2021-11-16 16:54:18
 * @LastEditTime: 2021-11-17 11:25:17
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
            v-for="item in carTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
      carTypeOptions:[{
        value:'选项1',
        label:'黄金糕'
      }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      carTypeModel:''
    }
  },
  methods: {
    changeVisible() {
      this.$emit('changeVisible', false)
    }
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