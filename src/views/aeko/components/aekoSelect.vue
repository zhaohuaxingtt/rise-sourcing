<!--
 * @Author: wentliao
 * @Date: 2021-08-17 10:22:54
 * @Description: select选项过多时的组件
-->
<template>
    <iSelect 
        class="multipleSelect" 
        collapse-tags
        :multiple="multiple" 
        :filterable="filterable" 
        :clearable="clearable" 
        v-model="searchParams[ParamKey]" 
        :placeholder="filterable ? language('LK_QINGSHURU','请输入') : language('partsprocure.CHOOSE','请选择')"
        reserve-keyword
        @change="handleChange"
        :filter-method="dataFilter"
        v-lazy-select="cartypeProjectLazy"
        @visible-change="selectVisibleChange"
    >
        <el-option value="" :label="language('all','全部')"></el-option>
        <el-option
            v-for="(item,index) in ProjectOptions || []"
            :key="'ProjectOptions_'+index"
            :label="item.desc"
            :value="item.code"
        >
        </el-option>  
    </iSelect> 
</template>

<script>
import {
    iSelect,
} from 'rise';
import { debounce,chunk } from "lodash"
export default {
    name:'aekoSelect',
    components:{
        iSelect,
    },
    props:{
        allOptionsData:{ // 所有数据
            type:Array,
            default:()=>[],
        },
        searchParams:{ // 搜索项 
            type:Object,
            default:()=>{},
        },
        ParamKey:{ // 绑定的key
            type:String,
            default:'carTypeCodeList'
        },
        searchKey:{ // 模糊搜索对比字段
            type:String,
            default:'lowerCaseLabel'
        },
        filterable:{ // 可搜索
            type:Boolean,
            default:true,
        },
        multiple:{ // 多选
            type:Boolean,
            default:false
        },
        clearable:{ // 可清除
            type:Boolean,
            default:false,
        }
    },
    data(){
        return{
            ProjectOptions:[],
            optionsCacheChunks: [],
            optionsFilterCache: [],
            CurrentPage:1,
            debouncer: null,
        }
    },
    watch:{
        allOptionsData(val){
            if(val){
                const {allOptionsData} = this;
                this.OptionsCache = allOptionsData;
                this.optionsFilterCache= allOptionsData;
                this.optionsCacheChunks = chunk(allOptionsData, 20);
                this.ProjectOptions = this.optionsCacheChunks[0] || [];
            }
            
        },
    },
    methods:{
      handleChange(value) {
          const {ParamKey} = this;
           if (!value[value.length - 1]) {
                this.$set(this.searchParams, ParamKey, [""])
            } else {
                this.$set(this.searchParams, ParamKey, this.searchParams[ParamKey].filter(item => item || item === 0))
            }
      },

      dataFilter(value){
        const {searchKey} = this;
        if (this.debouncer && typeof this.debouncer.cancel === "function") this.debouncer.cancel();

        this.debouncer = debounce(() => {
             let _value = typeof value === "string" ? value.trim().toLowerCase() : _value;
             console.log(_value,'_value_value_value');
            if (_value) {
              this.optionsFilterCache = this.OptionsCache.filter(item => item[searchKey] && item[searchKey].includes(_value));
              this.optionsCacheChunks = chunk(this.optionsFilterCache, 20);
            } else {
              this.optionsFilterCache = this.OptionsCache;
              this.optionsCacheChunks = chunk(this.OptionsCache, 20);
            }

            this.CurrentPage = 1;
            this.ProjectOptions = this.optionsCacheChunks[0] || [];
        },400);
        this.debouncer();
      },

        cartypeProjectLazy() {
            if (this.ProjectOptions.length < this.optionsFilterCache.length) {
                this.CurrentPage += 1;
                this.ProjectOptions = this.ProjectOptions.concat(this.optionsCacheChunks[this.CurrentPage - 1]);
            }
        },

        selectVisibleChange(visible){
            if (!visible) {
                this.optionsFilterCache = this.OptionsCache;
                this.optionsCacheChunks = chunk(this.OptionsCache, 20)
            }

            this.ProjectOptions = this.optionsCacheChunks[0] || []
            this.cartypeProjectCurrentPage = 1
        },
    }
    
}
</script>

<style>

</style>