<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:30:23
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-04 16:43:00
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
    <productGroup ref="historyDBProductGroup" v-if="searchParams.level === '1'" :searchParams="searchParams" :carProjectOptions="this.selectOptions.carProjectOptions" />
    <part ref="historyDBpart" v-else :searchParams="searchParams" :carProjectOptions="this.selectOptions.carProjectOptions" />
  </div>
</template>

<script>
import { iSearch, iSelect, iInput, iButton, iMessage } from 'rise'
import { searchListPro, searchListPart } from './data'
import { cloneDeep } from 'lodash' 
import productGroup from './components/productGroup'
import part from './components/part'
import { getCarTypePro } from '@/api/project'
export default {
  components: { iSearch, iSelect, iInput, iButton, productGroup, part },
  data() {
    return {
      searchParams: {
        level: '1'
      },
      selectOptions: {
        levelOptions: [
          {value: '1', label: '产品组'},
          {value: '2', label: '零件'}
        ]
      },
    }
  },
  computed: {
    searchList() {
      return this.searchParams.level === '1' ? cloneDeep(searchListPro) : cloneDeep(searchListPart)
    }
  },
  created() {
    this.searchParams = {
      level: '1',
      cartypeProId: this.$route.query.cartypeProId || '',
      productGroup: this.$route.query.productGroup || '',
      sixPartCode: this.$route.query.sixPartCode || ''
    }
    this.getCarProjectOptions()
  },
  methods: {
    getCarProjectOptions() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            carProjectOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.cartypeProName
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleSure() {
      this.$nextTick(() => {
        this.$refs.historyDBProductGroup && this.$refs.historyDBProductGroup.handleNomalSearch()
        this.$refs.historyDBpart && this.$refs.historyDBpart.handleNomalSearch(false)
      })
    },
    handleReset() {
      this.searchParams = {
        level: this.searchParams.level
      }
      this.handleSure()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>