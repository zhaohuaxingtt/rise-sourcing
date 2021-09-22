<!--
/**
 * 自定义下拉框，支持多选，单选
 * @param   {array}        data             required:true      选项列表options              ——
 * @param   {string}       label            required:false     选项列表options中显示的名字   默认：label
 * @param   {string}       sortVal          required:false     用于前端排序(字母排序)的key   默认：nameEn
 * @param   {string}       value            required:false     选项列表options中唯一标识     默认：value
 * @param   {function}     search-method    required:false     搜索函数                     默认：null
 * @param   {string}       popoverClass     required:false     下拉框class                  默认：''
 * @param   {string}       inputClass       required:false     input框 class                默认：''
 * @param   {boolean}      multiple         required:false     是否多选                      默认：false
 * @param   {number}       multiple-limit   required:false     多选上限                      默认：0 无上限   注：多选且多选上限大于0的情况 全选按钮disabled
 * @param   {boolean}      disabled         required:false     是否disabled                 默认：false
 * @param   {object}       v-model          required:true      绑定值                       ——
 * @events  change         选中值发生变化时触发
 */
 -->
<template>
  <div class="custom-select-wrapper">
    <!-- <el-row :gutter="20" align="center" type="flex">
      <el-col :span="12">
        单选城市：
        <iSelectCustom
          :data="singleData"
          @change="handleSingleChange"
          v-model="citySingle"
          label="cityNameCn"
          sortVal="cityNameEn"
          value="cityId"
          :search-method="handleSingleSearch"
          :popoverClass="'popover-class'"
          :inputClass="'input-class'"
        />
      </el-col>
      <el-col :span="12">
        多选城市：
        <iSelectCustom
          :data="multipleData"
          label="cityNameCn"
          sortVal="cityNameEn"
          value="cityId"
          :multiple="multiple"
          @change="handleMultiChange"
          v-model="cityMultiple"
          :disabled="false"
          :search-method="handleMultiSearch"
          :multiple-limit="6"
        />
      </el-col>
    </el-row> -->
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="活动名称"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="城市多选"
                    prop="cityMultiple">
        <iSelectCustom :data="multipleData"
                       label="categoryName"
                       value="categoryId"
                       :multiple="multiple"
                       @change="handleMultiChange"
                       v-model="ruleForm.cityMultiple"
                       :disabled="false"
                       :search-method="handleMultiSearch"
                       :multiple-limit="6"
                       :popoverClass="'popover-class'" />
      </el-form-item>
      <el-form-item label="城市单选"
                    prop="citySingle">
        <iSelectCustom :data="singleData"
                       @change="handleSingleChange"
                       v-model="ruleForm.citySingle"
                       label="categoryName"
                       value="categoryId"
                       :search-method="handleSingleSearch"
                       :popoverClass="'popover-class'"
                       :inputClass="'input-class'" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import iSelectCustom from './index'
// import { getCityInfo } from '@/api/demo'

import { querySupplierTurnPartList } from "@/api/partsrfq/bob/analysisList";
import { category } from '@/api/categoryManagementAssistant/mek'
export default {
  components: { iSelectCustom },
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        citySingle: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        cityMultiple: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ]
      },
      ruleForm: {
        name: '',
        citySingle: {
          centerPoint: '121.509062,25.044332',
          cityId: 300035,
          cityIdStr: '300035',
          cityLevel: null,
          cityNameCn: '台湾省',
          cityNameDe: 'Taiwan',
          cityNameEn: 'Taiwan',
          createBy: 0,
          createDate: '2021-07-12 15:26:37',
          id: 300035,
          locationNum: 710000,
          locationType: 'Province',
          parentCityId: 300001,
          parentCityIdStr: '300001',
          sapLocationCode: '310',
          sortBy: null,
          updateBy: null,
          updateDate: null
        },
        cityMultiple: [

        ]
      },
      citySingle: {
        centerPoint: '121.509062,25.044332',
        cityId: 300035,
        cityIdStr: '300035',
        cityLevel: null,
        cityNameCn: '台湾省',
        cityNameDe: 'Taiwan',
        cityNameEn: 'Taiwan',
        createBy: 0,
        createDate: '2021-07-12 15:26:37',
        id: 300035,
        locationNum: 710000,
        locationType: 'Province',
        parentCityId: 300001,
        parentCityIdStr: '300001',
        sapLocationCode: '310',
        sortBy: null,
        updateBy: null,
        updateDate: null
      },
      cityMultiple: [

      ],
      singleData: [],
      multipleData: [],
      multiple: true,
      cityDisabled: false,
      // query: {
      //   cityName: '',
      //   locationNum: '',
      //   parentCityId: '300001',
      //   sapLocationCode: ''
      // }
      query: {
        data: {},
        analysisSchemeId: "242"
      }
    }
  },
  async mounted () {
    this.getProvince()
  },
  methods: {
    // async getProvince () {

    //   // querySupplierTurnPartList({
    //   //   data: {},
    //   //   analysisSchemeId: '',
    //   // }).then((res) => { })
    //   const result = await querySupplierTurnPartList(this.query)
    //   if (result?.code === '200' && result?.data) {
    //     // const data = result.data.sort((a, b) => {
    //     //   const a_swname = a.cityNameEn?.toLowerCase()
    //     //   const b_swname = b.cityNameEn?.toLowerCase()
    //     //   if (a_swname < b_swname) return -1
    //     //   if (a_swname > b_swname) return 1
    //     //   return 0
    //     // })
    //     this.singleData = result.data
    //     this.multipleData = result.data
    //     // console.log(this.multipleData)
    //   }
    // },
    async getProvince () {

      // querySupplierTurnPartList({
      //   data: {},
      //   analysisSchemeId: '',
      // }).then((res) => { })
      const result = await category(this.query)
      if (result?.code === '200' && result?.data) {
        // const data = result.data.sort((a, b) => {
        //   const a_swname = a.cityNameEn?.toLowerCase()
        //   const b_swname = b.cityNameEn?.toLowerCase()
        //   if (a_swname < b_swname) return -1
        //   if (a_swname > b_swname) return 1
        //   return 0
        // })
        this.singleData = result.data
        this.multipleData = result.data
        // console.log(this.multipleData)
      }
    },
    handleMultiSearch (val) {
      this.query.cityName = val
      this.getProvince()
    },
    handleSingleSearch (val) {
      this.query.cityName = val
      this.getProvince()
    },
    handleSingleChange () {
      // console.log('single model', this.citySingle)
      console.log('form single model', this.ruleForm.citySingle)
    },
    handleMultiChange () {
      // console.log('multi model', this.cityMultiple)
      console.log('form multi model', this.ruleForm.cityMultiple)
    }
  }
}
</script>

<style lang="scss">
.custom-select-wrapper {
  padding-top: 30px;
  text-align: center;
  display: inline-block;
}
.popover-class {
  width: 400px;
}
.input-class {
  width: 400px;
}
.popover1-class {
  width: 200px;
}
.input1-class {
  width: 200px;
}
</style>
