<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :visible.sync="value" width="20%" @close="clearDiolog">
    <div slot="title" class="title">
      {{language('TIANJIALINGJIAN','添加零件')}}
      <el-popover :content="language('CFXGJJZCDDZTLJ','此分析工具仅支持定点状态零件')" trigger="hover" placement="top-start">
        <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 marin-left5" />
      </el-popover>
    </div>
    <el-form label-width="60px" label-position="top">
      <el-form-item :label="language('QINGXUANZHECAILIAOZU','请选择材料组')">
        <iSelect v-model="form.materialGroupCode" filterable :loading="categoryLoading" @change="handleCarType" :placeholder="language('QINGXUANZHECIAOZUMINGCHENG','请输入材料组/名称')">
          <el-option v-for="(item,index) in formGoup.materialGroupList" :key="index" :label="item.categoryName" :value="item.categoryCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('QINGXUANZHEMUBIAOCHEXING','请选择目标车型')">
        <iSelect filterable :placeholder="language('QINGSHURUMUBIAOCHEXINGGONGCHANGXINGXI','请输入目标车型/工厂信息')" v-model="form.targetMotor">
          <el-option v-for="(item,index) in formGoup.carTypeList" :key="index" :label="item.modelNameZh	" :value="item.id"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleAdd">{{language('TIANJIA','添加')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iSelect, iButton, iDialog } from 'rise'
import { categoryList, carTypeList } from "@/api/partsrfq/mek/index.js";
export default {
  components: {
    iSelect, iButton, iDialog
  },
  props: {
    value: { type: Boolean },
    materialGroup: { type: String, default: '' }
  },
  data() {
    return {
      form: {
        materialGroupCode: '',
        targetMotor: ""
      },
      categoryLoading: false,
      carTypeLoading: false,
      formGoup: {
        materialGroupList: [],
        carTypeList: []
      },
    }
  },
  watch: {
    materialGroup: {
      handler(val) {
        this.form.materialGroupCode = val
      }
    }
  },
  created() {
    this.categoryList()
  },
  methods: {
    async handleAdd() {
      const pms = {
        isBindingRfq: !!this.$store.state.rfq.entryStatus,
        materialGroupCode: '',
        materialGroupId: '',
        materialGroupName: '',
        targetMotor: this.form.targetMotor
      }
      this.formGoup.materialGroupList.forEach(item => {
        if (item.categoryCode === this.form.materialGroupCode) {
          pms.materialGroupCode = item.categoryCode
          pms.materialGroupId = item.categoryId
          pms.materialGroupName = item.categoryName
        }
      })
      this.$emit('add', pms)
    },
    async handleCarType() {
      const res = await carTypeList({ materialGroupCode: this.form.materialGroupCode })
      this.formGoup.carTypeList = res.data
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    async categoryList() {
      try {
        this.categoryLoading = true
        console.log(this.form);
        const res = await categoryList({ categoryCodeOrName: this.form.materialGroupCode })
        this.formGoup.materialGroupList = res.data
        this.categoryLoading = false
      } catch (error) {
        this.categoryLoading = false
        this.formGoup.materialGroupList = []
      }
    },

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 220px;
}
::v-deep .el-col-8 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
.title {
  font-size: 18px;
}
::v-deep .el-form-item__content {
  width: 100%;
}
</style>
