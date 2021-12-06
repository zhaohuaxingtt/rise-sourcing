<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:36:34
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-29 14:42:49
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\defaultScheLogic\components\logicItem.vue
-->

<template>
  <iCard v-loading="loading">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight" v-if="cardTitle">{{language(cardTitle.key, cardTitle.name)}}</span>
        <div class="floatright">
          <!--------------------应用默认配置按钮----------------------------------->
          <iButton @click="$emit('handleOK')" >{{language('YINGYONGMORENPEIZHI','应用默认配置')}}</iButton>
        </div>
    </div>
    <iFormGroup row="2" class="targetPriceDetail">
      <iFormItem v-for="(item, index) in logicList" :key="index" :label="language(item.i18n_label, item.label)+':'" >
        <iInput v-if="item.type === 'input'" v-model="logicData[item.value]" />
        <iSelect v-else-if="item.type === 'select'" v-model="logicData[item.value]" >
          <el-option
            :value="item.code"
            :label="item.name"
            v-for="(item) in selectOptions[item.selectOption]"
            :key="item.code"
          ></el-option>
        </iSelect>
      </iFormItem>
    </iFormGroup>
  </iCard>
</template>

<script>
import { iCard, iButton, iFormGroup, iFormItem, iSelect, iInput } from 'rise'
export default {
  components: { iCard, iButton, iFormGroup, iFormItem, iSelect, iInput },
  props: {
    cardTitle: {type:Object, default: () => {}},
    logicList: {type:String, default: () => []},
    logicData: {type:Object, default: () => {}},
    selectOptions: {type:Object, default: () => {}},
    loading: {type:Boolean, default: false}
  },
  methods: {
    handleOK() {
      this.$emit('handleOK')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>