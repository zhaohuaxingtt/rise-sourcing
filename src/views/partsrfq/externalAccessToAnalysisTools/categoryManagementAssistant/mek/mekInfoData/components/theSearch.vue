<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 16:08:02
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <el-form label-position="left" label-width="50">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="5">
          <el-form-item :label="language('CAILIAOZU','材料组')">
            <iSelect :placeholder="language('QXZCLZ','请选择材料组')" v-model="form.materialGroupCode">
              <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="language('CHEXING','车型')">
            <iSelect :placeholder="language('QXZCX','请选择车型')" v-model="form.materialGroupCode">
              <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <iButton>{{language('BIANJI','编辑')}}</iButton>
            <iButton @click="add">{{language('TIANJIA','添加')}}</iButton>
            <iButton>{{language('SHANCHU','删除')}}</iButton>
            <iButton>{{language('DAOCHU','导出')}}</iButton>
            <iButton @click="handleLog">{{language('Change Log','Change Log')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <addPartDialog v-model="addPartDialog" />
    <changeLogDialog v-model="changeLogDialog" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iSelect, iButton } from "rise";
import addPartDialog from "./addPartDialog";
import changeLogDialog from "./changeLogDialog";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iSelect, iButton,addPartDialog,changeLogDialog },
  data() {
    // 这里存放数据
    return {
      addPartDialog: false,
      changeLogDialog: false,
      form: {
        materialGroup: '',
        materialGroupCode: '',
        rfqId: '',
        fsId: '',
        partsId: '',
      },
      formGoup: {
        materialGroupList: [],
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    add() {
      this.addPartDialog = true
    },
    handleLog() {
      this.changeLogDialog = true
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.el-form-item {
  display: flex;
}
::v-deep .el-col-12 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>
