<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-18 10:19:11
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\components\categoryGroup.vue
-->
<template>
    <!-- 材料组定位 -->
    <iDialog :title='language("CAILIAOZU", "材料组")' :visible.sync="value" class="iDialog" width="400px" @close='clearDiolog' top="40vh">
      <p class="tip margin-bottom10">{{ language("QXZCAILIAOZU", "请选择材料组") }}</p>
      <el-autocomplete class="autocomplete" v-model="categoryName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <iButton @click="confirm">{{ language("QUEREN", "确认") }}</iButton>
      </span>
    </iDialog>
</template>

<script>
import {iButton, iDialog } from 'rise';
import { pageRfqBaseInfo } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool";
export default {
  components: {
    iButton,
    iDialog,
  },
  props: {
     value:{
        type:Boolean,
        default:false
     }
  },
  data() {
    return {
      categoryName: "",//材料组名称
      categoryCode: "",//材料组编号
    }
  },
  created() {
    
  },
  methods: {
    querySearchAsync(queryString, cb) {
      pageRfqBaseInfo({ keyword: queryString }).then(res => {
        if (res.data) {
          let result = []
          res.data.map(item => {
            if (item.categoryCode) {
              result.push({ value: item.categoryName, categoryCode: item.categoryCode })
            }
          })
          cb(result)
        }
      })
    },
    // 确认
    confirm() {
      this.$store.dispatch('setCategoryCode', this.categoryCode)
      this.$store.dispatch('setCategoryName', this.categoryName)
      this.value = false
    },
    // 重新定位材料组
    openCategoryCode() {
      this.value = true
    },
    handleSelect(item) {
      this.categoryCode = item.categoryCode
    },
     clearDiolog() {
      this.$emit('input', false);
    },
  }
};
</script>

<style scoped lang="scss">
.autocomplete {
  width: 100%;
}
</style>
