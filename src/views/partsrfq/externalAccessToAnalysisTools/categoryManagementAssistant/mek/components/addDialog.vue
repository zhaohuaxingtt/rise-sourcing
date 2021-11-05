<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iDialog :visible.sync="value"
           width="20%"
           @close="clearDiolog">
    <div slot="title"
         class="title">
      {{language('TIANJIALINGJIAN','添加零件')}}
      <el-popover :content="language('CFXGJJZCDDZTLJ','此分析工具仅支持定点状态零件')"
                  trigger="hover"
                  placement="top-start">
        <icon slot="reference"
              symbol
              name="iconxinxitishi"
              class="font-size16 marin-left5" />
      </el-popover>
    </div>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="60px"
             label-position="top">
      <el-form-item prop="materialGroupCode"
                    :label="language('QINGXUANZHECAILIAOZU','请选择材料组')">
        <iSelect v-model="form.materialGroupCode"
                 filterable
                 :loading="categoryLoading"
                 @change="handleCarType"
                 :placeholder="language('QINGXUANZHECIAOZUMINGCHENG','请输入材料组/名称')">
          <el-option v-for="(item,index) in formGoup.materialGroupList"
                     :key="index"
                     :label="item.categoryName"
                     :value="item.categoryCode"></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item prop="targetMotor"
                    :label="language('QINGXUANZHEMUBIAOCHEXING','请选择目标车型')">
        <iSelect filterable
                 :placeholder="language('QINGSHURUMUBIAOCHEXINGGONGCHANGXINGXI','请输入目标车型/工厂信息')"
                 v-model="form.targetMotor"
                 @change="handleChange">
          <el-option v-for="(item,index) in formGoup.carTypeList"
                     :key="index"
                     :label="item.modelNameZh+'('+item.productFactoryNames+')'"
                     :value="item.id"></el-option>
        </iSelect>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
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
  data () {
    return {
      rules: {
        materialGroupCode: [
          { required: true, message: '请选择材料组', trigger: 'blur' },
        ],
        targetMotor: [
          { required: true, message: '请选择目标车型', trigger: 'blur' },
        ]
      },
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
      handler (val) {
        this.form.materialGroupCode = val
      }
    }
  },
  created () {
    this.categoryList()
  },
  methods: {
    handleAdd () {
      this.$refs.form.validate(async (res) => {
        if (res) {
          const pms = {
            isBindingRfq: !!this.$store.state.rfq.entryStatus,
            materialGroupCode: '',
            materialGroupId: '',
            materialGroupName: '',
            targetMotor: this.form.targetMotor,
            productFactoryNames: this.productFactoryNames
          }
          this.formGoup.materialGroupList.forEach(item => {
            if (item.categoryCode === this.form.materialGroupCode) {
              pms.materialGroupCode = item.categoryCode
              pms.materialGroupId = item.categoryId
              pms.materialGroupName = item.categoryName
            }
          })
          this.$emit('add', pms)
        }
      })
    },
    async handleCarType () {
      const res = await carTypeList({ materialGroupCode: this.form.materialGroupCode })
      this.form.targetMotor = ''
      this.formGoup.carTypeList = res.data
    },
    clearDiolog () {
      this.$emit('input', false);
    },
    async categoryList () {
      try {
        this.categoryLoading = true
        const res = await categoryList({ categoryCodeOrName: this.form.materialGroupCode })
        this.formGoup.materialGroupList = res.data
        this.categoryLoading = false
      } catch (error) {
        this.categoryLoading = false
        this.formGoup.materialGroupList = []
      }
    },
    handleChange (val) {
      this.formGoup.carTypeList.forEach(item => {
        if (item.id === val) {
          this.productFactoryNames = item.productFactoryNames
        }
      })
    }

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
