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
      <div class="text margin-bottom20">{{ language('GYLGL','N级供应链管理')}}</div>
      <div>
        <iButton @click="$emit('handleSave',form)">{{language('BAOCUN','保存')}}</iButton>
        <iButton @click="handleBack">{{language('FANHUI','返回')}}</iButton>
      </div>
    </div>
    <el-row type="flex" align='bottom' justify="space-between	">
      <el-col :span="3">
        <iInput :placeholder="language('CHEXING','车型')" v-model="form.carType">
        </iInput>
      </el-col>
      <el-col :span="3">
        <iSelect :placeholder="language('DIQU','地区')" v-model="form.province">
          <el-option :value="item.cityId" :label="item.cityNameCn" v-for="item of formGoup.provinceList" :key="item.cityId"></el-option>
        </iSelect>
      </el-col>
      <el-col :span="3">
        <iSelect :placeholder="language('CAILIAOZU','材料组')" v-model="form.categoryCode">
          <el-option :value="item.categoryCode" :label="item.categoryName" v-for="item of formGoup.materialGroupList" :key="item.categoryCode"></el-option>
        </iSelect>
      </el-col>
      <el-col :span="3">
        <iInput :placeholder="language('GONGYINGSHANG','供应商')" v-model="form.supplierName"></iInput>
      </el-col>
      <el-col :span="3">
        <iInput :placeholder="language('LINGJIAN','零件')" v-model="form.part"></iInput>
      </el-col>
      <el-col :span="5">
        <iButton @click="getMapList">{{language('QUEDING','确定')}}</iButton>
        <iButton @click="handleSearchReset">{{language('CHONGZHI','重置')}}</iButton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { userCategory, getCityInfo } from "@/api/partsrfq/supplyChainOverall/index.js";
import { iSelect, iInput, iButton } from 'rise'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iSelect, iInput, iButton },
  props: {
    ntierQueryConditionDTO: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      form: {
        categoryCode: '',
        carType: '',
        part: '',
        province: '',
        supplierName: '',
        provinceZh: ""
      },
      formGoup: {
        materialGroupList: [],
        provinceList: []
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    ntierQueryConditionDTO: {
      deep: true,
      handler(object) {
        this.form = object
      }
    }
  },
  // 方法集合
  methods: {
    getMapList() {
      this.form.province && this.formGoup.provinceList.forEach(item => {
        if (item.cityId === this.form.province) {
          this.form.provinceZh = item.cityNameCn
          return
        }
      })
      this.$emit('getMapList', this.form)
    },
    // 获取材料组数据||地区数据
    async dictByCode() {
      const res = await userCategory({})
      const res1 = await getCityInfo()
      this.formGoup.materialGroupList = res.data
      console.log(res1);
      this.formGoup.provinceList = res1.data
    },
    // 返回
    handleBack() {
      this.$router.go(-1)
    },
    // 重置
    handleSearchReset() {
      this.form = {
        categoryCode: '',
        carType: '',
        part: '',
        province: '',
        supplierName: '',
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.dictByCode()
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
::v-deep .el-col-5 {
  display: flex;
  justify-content: flex-end;
}
</style>
