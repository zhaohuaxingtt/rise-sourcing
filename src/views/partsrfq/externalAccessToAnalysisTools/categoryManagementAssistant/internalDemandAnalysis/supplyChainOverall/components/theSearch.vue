<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-02 20:01:05
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class='title'>
    <div class="flex-between-center-center">
      <div class="text margin-bottom20">{{ language('GYLGLNJGYLGL','供应链概览（N级供应链管理）')}}</div>
      <div>
        <iButton>{{language('BAOCUN','保存')}}</iButton>
        <iButton>{{language('FANHUI','返回')}}</iButton>
      </div>
    </div>
    <el-form label-width="50px" label-position="left">
      <el-row type="flex" align='bottom' justify="space-between	">
        <el-col :span="3">
          <el-form-item :label="language('CHEXING','车型:')">
            <iSelect :placeholder="language('CHEXING','车型')" v-model="form.materialGroupCode">
              <el-option :value="item.code" :label="item.name" v-for="item of formGoup.materialGroupList" :key="item.code"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('DIQU','地区:')">
            <iInput :placeholder="language('DIQU','地区')" v-model="form.rfqId"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('CAILIAOZU','材料组:')">
            <iInput :placeholder="language('CAILIAOZU','材料组')" v-model="form.fsId"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('GONGYINGSHANG','供应商:')">
            <iInput :placeholder="language('GONGYINGSHANG','供应商')" v-model="form.partsId"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('LINGJIAN','零件:')">
            <iInput :placeholder="language('LINGJIAN','零件')" v-model="form.partsId"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <iButton @click="getTableList">{{language('QUEDING','确定')}}</iButton>
            <iButton @click="handleSearchReset">{{language('CHONGZHI','重置')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iSelect, iInput, iButton } from 'rise'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iSelect, iInput, iButton },
  data() {
    // 这里存放数据
    return {
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
.title {
  .text {
    font-size: 22px;
    font-weight: Bold;
  }
}
::v-deep .el-col-6 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>
