<!--
 * @Author: youyuan
 * @Date: 2021-11-06 17:50:24
 * @LastEditTime: 2021-11-06 19:33:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\designate\home\signSheet\components\mtzDetails\index.vue
-->
<template>
  <div>
    <iCard class="margin-top20">
      <el-form :inline="true" :model="infoForm" label-position="left">
        <el-form-item 
        style="width: 300px;margin-right:68px;"
        :label="language('QIANZIDANHAO', '签字单号')">
          <iInput
          v-model="infoForm.signCode"
          :disabled="true"/>
        </el-form-item>
        <el-form-item 
        style="width: 300px; margin-right:68px;"
        :label="language('ZHUANGTAI', '状态')">
          <iInput
          v-model="infoForm.statusDesc"
          :disabled="true"/>
        </el-form-item>
        <el-form-item 
        style="width: 500px;margin-right:68px;"
        :label="language('CAOGAO', '草稿')">
          <iInput
          style="width: 300px;"
          v-model="infoForm.description"
          :placeholder="language('QINGSHURUMIAOSHU','请输入描述')"/>
        </el-form-item>
      </el-form>
    </iCard>
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{language('XIANGQINGLIEBIAO', '详情列表')}}</p>
        <span class="buttonBox">
          <iButton @click="handleClickChoose">{{language('XUANZE', '选择')}}</iButton>
          <iButton @click="handleClickMove">{{language('YICHU', '移除')}}</iButton>
        </span>
      </div>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :index="true"
        @handleSelectionChange="handleSelectionChange">
      </tableList>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import detail from './components/detail'
export default {
  components: {
    iCard,
    iButton,
    iInput,
    tableList,
    detail
  },
  data () {
    return {
      infoForm: {},
      tableListData: [],
      tableTitle,
      loading: false,
      detailParams: {
        key: 0,
        visible: false,
        data: []
      }
    }
  },
  created() {

  },
  methods: {
    // 点击选择
    handleClickChoose() {
      this.detailParams = {
        ...this.detailParams,
        key: Math.random(),
        visible: true
      }
    },
    // 点击移除
    handleClickMove() {
      
    }
  }
}
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
 
</style>
