<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:30:23
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-08 15:48:17
 * @Description: 历史进度数据库
 * @FilePath: \front-web\src\views\project\schedulingassistant\historyprocessdb\index.vue
-->

<template>
<!------v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_HISTORYPROCESSDB_PAGE|项目管理-排程助手-历史进度数据库"------>
  <iPage class="historyProcessDB" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_HISTORYPROCESSDB_PAGE|项目管理-排程助手-历史进度数据库">
    <iSearch :icon="true" >
      <template slot="button">
        <iButton @click="handleSure">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)" v-permission.dynamic.auto="item.permission">
          <iSelect v-if="item.type ==='select'" :filterable="item.filterable" v-model="searchParams[item.value]" :placeholder="item.placeholder ? language(item.placeholderKey, item.placeholder) : language('QINGXUANZE', '请选择')" @change="handleChange($event, item.value)">
            <el-option
              v-for="item in selectOptions[item.selectOption]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
          <iInput v-else-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="item.placeholder ? language(item.placeholderKey, item.placeholder) : language('QINGSHURU', '请输入')" />
          <el-autocomplete v-else-if="item.type === 'inputFilter'" :fetch-suggestions="querySearch" v-model="searchParams[item.value]" :placeholder="item.placeholder ? language(item.placeholderKey, item.placeholder) : language('QINGSHURU', '请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <productGroup ref="historyDBProductGroup" v-if="searchParams.level === '1'" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_HISTORYPROCESSDB_PRODUCTGROUPPAGE|项目管理-排程助手-历史进度数据库-产品组" :searchParams="searchParams" :carProjectOptions="selectOptions.carProjectOptionsALL" :productGroupOptions="selectOptions.productGroupOptions" />
    <part ref="historyDBpart" v-else :searchParams="searchParams" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_HISTORYPROCESSDB_PARTPAGE|项目管理-排程助手-历史进度数据库-零件" :carProjectOptions="selectOptions.carProjectOptionsALL" :productGroupOptions="selectOptions.productGroupOptions" />
  </iPage>
</template>

<script>
import { iSearch, iSelect, iInput, iButton, iMessage, iPage } from 'rise'
import { searchListPro, searchListPart } from './data'
import productGroup from './components/productGroup'
import part from './components/part'
import { getCarTypePro, getProductGroupAll } from '@/api/project'
export default {
  components: { iSearch, iSelect, iInput, iButton, productGroup, part, iPage },
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
      // eslint-disable-next-line no-undef
      return this.searchParams.level === '1' ? _.cloneDeep(searchListPro) : _.cloneDeep(searchListPart)
    }
  },
  created() {
    this.searchParams = {
      level: this.$route.query.level || '1',
      // productGroup: this.$route.query.productGroup || '',
      productGroup: '',
      sixPartCode: ''
    }
    this.getCarProjectOptions()
    this.getProductGroupAll()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.selectOptions.productGroupOptions;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant=this.selectOptions.productGroupOptions) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    /**
     * @Description: 获取所有产品组
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getProductGroupAll() {
      getProductGroupAll().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            productGroupOptions: res.data.map(item => {
              return {
                ...item,
                value: item.pgNameZh,
                label: item.pgNameZh
              }
            })
          }
        }
      })
    },
    /**
     * @Description: 查看维度修改
     * @Author: Luoshuang
     * @param {*} val
     * @param {*} props
     * @return {*}
     */    
    handleChange(val, props) {
      if (props === 'level'){
        this.searchParams = {
          level: val,
          productGroup: '',
          categoryName: ''
        }
      }
    },
    /**
     * @Description: 获取车型项目下拉
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getCarProjectOptions() {
      getCarTypePro({isSop:true}).then(res => {
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
      getCarTypePro().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            carProjectOptionsALL: res.data.map(item => {
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
    /**
     * @Description: 确认
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSure() {
      this.$nextTick(() => {
        this.$refs.historyDBProductGroup && this.$refs.historyDBProductGroup.handleNomalSearch()
        this.$refs.historyDBpart && this.$refs.historyDBpart.handleNomalSearch(false)
      })
    },
    /**
     * @Description: 重置
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleReset() {
      this.searchParams = {
        level: this.searchParams.level,
        productGroup: ''
      }
      this.handleSure()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-autocomplete {
  height: $input-height;
  width: 100%;
  .el-input{
    height: $input-height;
    .el-input__inner{
      @include input_inner;
    }
  }
}
.historyProcessDB {
  padding: 0;
  padding-top: 10px;
  height: auto;
  overflow: auto;
}
</style>