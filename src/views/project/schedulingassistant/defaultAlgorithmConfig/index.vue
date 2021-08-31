<!--
 * @Author: your name
 * @Date: 2021-08-24 10:47:59
 * @LastEditTime: 2021-08-28 11:28:31
 * @LastEditors: Please set LastEditors
 * @Description: 默认算法配置
 * @FilePath: /front-web/src/views/project/schedulingassistant/defaultAlgorithmConfig/index.vue
-->
<template>
  <div>
    <iCard class="margin-top30">
      <div class="margin-bottom20 clearFloat">
        <span class="font20 font-weight">{{ language("CHANGZHOUQIDUANFAPEIZHI",'长周期产品组排程算法配置')}}</span>
        <div class="floatright">
          <iButton @click="reset">
            {{ language("YINGYONGMORENPEIZHI",'应用默认配置') }}
          </iButton>
        </div>
        <div class="defaultAlgorithmConfigForm">
          <iFormGroup row="2"
                      class="form">
            <iFormItem v-for="(item, index) in productLogicList"
                       :key="index">
              <span v-if="item.label"
                    slot="label">{{language(item.i18n_label, item.label)}}<span style="color:red;"
                      v-if="item.required">*</span>:</span>
              <iInput v-if="item.type === 'input'"
                      v-model="form[item.value]" />
              <iSelect v-else-if="item.type === 'select'"
                       v-model="form[item.value]"
                       :filterable="item.filterable">
                <el-option :value="item.code"
                           :label="item.name"
                           v-for="(item) in selectOptions[item.selectOption]"
                           :key="item.code"></el-option>
              </iSelect>
              <iDicoptions v-else-if="item.type === 'dictionary'"
                           v-model="form[item.value]"
                           :optionKey="item.dictionaryOption" />
              <el-autocomplete v-else-if="item.type === 'inputFilter'"
                               :fetch-suggestions="querySearch"
                               v-model="form[item.value]" />
            </iFormItem>
          </iFormGroup>

        </div>
      </div>
    </iCard>

    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font20 font-weight">{{ language("LINGJIANSUANFAPEIZHI",'零件算法配置')}}</span>
        <div class="floatright">
          <iButton @click="reset">
            {{ language("YINGYONGMORENPEIZHI",'应用默认配置') }}
          </iButton>
        </div>
        <div class="defaultAlgorithmConfigForm">
          <iFormGroup row="2"
                      class="form">
            <iFormItem v-for="(item, index) in partLogicList"
                       :key="index">
              <span v-if="item.label"
                    slot="label">{{language(item.i18n_label, item.label)}}<span style="color:red;"
                      v-if="item.required">*</span>:</span>
              <iInput v-if="item.type === 'input'"
                      v-model="form[item.value]" />
              <iSelect v-else-if="item.type === 'select'"
                       v-model="form[item.value]"
                       :filterable="item.filterable">
                <el-option :value="item.code"
                           :label="item.name"
                           v-for="(item) in selectOptions[item.selectOption]"
                           :key="item.code"></el-option>
              </iSelect>
              <iDicoptions v-else-if="item.type === 'dictionary'"
                           v-model="form[item.value]"
                           :optionKey="item.dictionaryOption" />
              <el-autocomplete v-else-if="item.type === 'inputFilter'"
                               :fetch-suggestions="querySearch"
                               v-model="form[item.value]" />
            </iFormItem>
          </iFormGroup>

        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormGroup, iFormItem, iSelect, iMessage } from 'rise'
import { selectDictByKeyss } from '@/api/dictionary'
import { productLogicList, partLogicList } from './components/data'
// import iDicoptions from 'rise/web/components/iDicoptions'

export default {
  components: { iCard, iButton, iInput, iFormGroup, iFormItem, iSelect, iDicoptions },
  data () {
    return {
      form: {},
      selectOptions: {},
      productLogicList,
      partLogicList
    }
  },
  created () {
    const keys = 'CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
  },
  methods: {
    reset () {

    },
    save () {

    },
    querySearch (queryString, cb) {
      var restaurants = this.selectOptions.productGroupOptions;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant = this.selectOptions.productGroupOptions) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    selectDictByKeys (keys) {
      selectDictByKeyss(keys).then(res => {
        if (res?.result) {
          this.selectOptions = { ...this.selectOptions, ...res.data }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    }

  }

}
</script>
<style lang="scss" scoped>
.defaultAlgorithmConfigForm {
  .form {
    padding-top: 30px;
    ::v-deep .el-form-item__label {
      width: 150px;
    }
  }
}
</style>