<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:30:23
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 11:20:13
 * @Description: 历史进度数据库
 * @FilePath: \front-web\src\views\project\schedulingassistant\historyprocessdb\index.vue
-->

<template>
  <div class="historyProcessDB">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iSelect v-if="item.type ==='select'" :filterable="item.filterable" v-model="searchParams[item.value]" :placeholder="item.placeholder ? language(item.placeholderKey, item.placeholder) : language('QINGXUANZE', '请选择')">
            <el-option
              v-for="item in selectOptions[item.selectOption]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="item.placeholder ? language(item.placeholderKey, item.placeholder) : language('QINGSHURU', '请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <productGroup ref="historyDBProductGroup" v-if="searchParams.level === '0'" />
    <part ref="historyDBpart" v-else />
  </div>
</template>

<script>
import { iSearch, iSelect, iInput, iButton } from 'rise'
import { searchListPro, searchListPart } from './data'
import { cloneDeep } from 'lodash' 
import productGroup from './components/productGroup'
import part from './components/part'
export default {
  components: { iSearch, iSelect, iInput, iButton, productGroup, part },
  data() {
    return {
      searchParams: {
        level: '0'
      },
      selectOptions: {
        levelOptions: [
          {value: '0', label: '产品组'},
          {value: '1', label: '零件'}
        ]
      },
    }
  },
  computed: {
    searchList() {
      return this.searchParams.level === '0' ? cloneDeep(searchListPro) : cloneDeep(searchListPart)
    }
  },
  methods: {
    handleSure() {
      this.$refs.historyDBProductGroup && this.$refs.historyDBProductGroup.changeProgress(false)
      this.$refs.historyDBpart && this.$refs.historyDBpart.changeProgress(false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>