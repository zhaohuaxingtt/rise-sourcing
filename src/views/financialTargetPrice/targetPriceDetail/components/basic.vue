<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 17:21:08
 * @Description: 基础信息
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iCard title="基础信息" collapse class="margin-top30">
    <iFormGroup row="4" class="targetPriceDetail">
      <iFormItem v-for="(item, index) in detailList" :key="index" :label="item.label+':'" :class="item.row ? 'row'+item.row : ''">
        <template v-if="item.editable && isEdit">
          <iInput v-if="item.type === 'input'" />
          <iSelect v-else-if="item.type === 'select'"></iSelect>
        </template>
        <iText v-else>{{detailData[item.value]}}</iText>
      </iFormItem>
      <iFormItem class="row2" style="text-align:right">
        <iButton v-if="!isEdit" @click="$emit('changeIsEdit', true)">编辑</iButton>
        <template v-else>
          <iButton @click="$emit('handleSave')">保存</iButton>
          <iButton @click="$emit('handleCancel')">取消</iButton>
        </template>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText, iInput, iSelect, iButton } from 'rise'
import { detailList } from '../data'
import { getTargetPriceDetail } from "@/api/financialTargetPrice/index"
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {type:String}
  },
  components: {iCard, iFormGroup, iFormItem, iText, iInput, iSelect, iButton},
  data() {
    return {
      detailList: detailList,
      detailData: {}
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      if (!this.$route.query.applyId) {
        return
      }
      getTargetPriceDetail(this.$route.query.applyId).then(res => {
        
      })
    },
    /**
     * @Description: 保存基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicSave() {
      this.changeBasicIsEdit(false)
    },
    /**
     * @Description: 取消基础信息编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleBasicCancel() {
      this.changeBasicIsEdit(false)
    },
    /**
     * @Description: 切换基础信息部分编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit
     * @return {*}
     */    
    changeBasicIsEdit(isEdit) {
      this.basicIsEdit = isEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.targetPriceDetail {
  ::v-deep {
    .row2 {
      margin-right: 3.75rem;
      width: calc((100% - 1*3.75rem) / 2);
      &:nth-child(2n) {
        margin-right: 0px;
      }
    }
    .row2, .row4 {
      // width: calc((100% - 1*3.75rem) / 2);
      .el-form-item__label {
        width: 150px
      }
    }
  }
}
</style>