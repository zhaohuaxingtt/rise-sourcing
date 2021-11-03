<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: csf/commodity 筛选
-->
<template>
  <iSearch
    class="margin-bottom20"
    @sure="sure"
    @reset="reset"
    :resetKey="QUEREN"
    :searchKey="REST"
  >
    <el-form>
      <!-- 科室 -->
      <el-form-item :label="language('LK_AEKOKESHI','科室')">
        <iSelect
          class="multi-select"
          v-model="form.deptIds"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          collapse-tags 
          multiple
          filterable
          clearable
        >
          <el-option
            value=""
            :label="language('all','全部')"
          ></el-option>
          <el-option
            :value="items.code"
            :label="items.value"
            v-for="(items, index) in (selectOptions && selectOptions.linieDeptNumList) || []"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <!-- 上传人 -->
      <el-form-item :label="language('SHANGCHUANREN', '上传人')">
        <iInput
          v-model="form.userName"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
      <!-- 文件描述 -->
      <el-form-item :label="language('LK_WENJIANMIOASHU', '文件描述')">
        <iInput
          v-model="form.fileDescribe"
          :placeholder="language('LK_QINGSHURU','请输入')"
          clearable
        ></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>

import {
  iSearch,
  iInput,
  iSelect,
  iMessage
} from "rise";
import {
  searchCommodity,
} from '@/api/aeko/manage'

export default {
  data() {
    return {
      form: {

      },
      selectOptions: {
        linieDeptNumList: []
      }
    }
  },
  components: {
    iSearch,
    iInput,
    iSelect,
  },
  mounted() {
    this.getSearchList()
  },
  beforeDestroy() {
  },
  methods: {
    sure() {
      this.$emit('search', this.form)
    },
    reset() {
      this.form = {}
      this.$emit('search', {})
    },
    // 获取搜索框下拉数据
    getSearchList(){
      // 科室
      searchCommodity().then((res)=>{
        const {code,data} = res;
        if(code === '200' ) {
          this.selectOptions.linieDeptNumList = data.map((item)=>{
            return {
              value: item.deptNum,
              code: item.id
            }
          });
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
      
    },
  },
}
</script>

<style lang="scss" scoped>
.multi-select {
  &::v-deep.el-select {
    .el-select__tags {
      max-height: 60px !important;
      overflow: hidden;
    }
  }
}
::v-deep.intervalCss .el-form-item__content{
  display: inline-flex;
  align-items: center;
}
</style>