<template>
  <iCard class="designate-drawing">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ $t("Drawing") }}</span
      >
      <div class="floatright">
        <!-- 排序 -->
        <iButton @click="sortVisibal = true">
          {{ $t("strategicdoc.PaiXu") }}
        </iButton>
        <!-- 全部下载 -->
        <iButton>
          {{ $t("strategicdoc.QuanBuXiaZai") }}
        </iButton>
        <!-- 上传 -->
        <iButton @click="uploadVisibal = true">
          {{ $t("strategicdoc.ShangChuan") }}
        </iButton>
      </div>
    </div>
    <div class="list">
      <el-row gutter="20">
        <el-col class="margin-bottom25" span="12">
          <div class="drawing-content">
            <a class="trigger" href="javascript:;">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
        <el-col class="margin-bottom25" span="12">
          <div class="drawing-content">
            <a class="trigger" href="javascript:;">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
        <el-col class="margin-bottom25" span="12">
          <div class="drawing-content">
            <a class="trigger" href="javascript:;">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
        <el-col class="margin-bottom25" span="12">
          <div class="drawing-content">
            <a class="trigger" href="javascript:;">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 排序弹窗 -->
    <sortDialog :visible.sync="sortVisibal" />
    <!-- 上传弹窗 -->
    <uploadDialog :visible.sync="uploadVisibal" />
  </iCard>
</template>
<script>
import {
  iCard,
  iButton,
  icon
} from 'rise'
import sortDialog from './components/sortDialog'
import uploadDialog from './components/uploadDialog'

export default {
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false
    }
  },
  components: {
    iCard,
    iButton,
    icon,
    sortDialog,
    uploadDialog
  }
}
</script>
<style lang="scss" scoped>
.designate-drawing {
  .list {
    .drawing-content {
      width: 100%;
      height: 300px;
      border: 1px solid #d9dee5;
      border-radius: 15px;
      display: flex;
      justify-content: flex-end;
      .trigger {
        display: block;
        margin-top: 15px;
        margin-right: 15px;
      }
    }
  }
}
</style>