<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-25 15:02:21
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-28 16:25:58
 * @Description: select选项过多时的组件,支持拼音/文字/英文模糊搜索
-->
<template>
    <iSelect
        collapse-tags
        reserve-keyword
        v-model="data"
        :multiple="multiple" 
        :filterable="filterable" 
        :clearable="clearable"
        :placeholder="language('partsprocure.CHOOSE','请选择')"
        :filter-method="dataFilter"
        v-lazy-options-load="lazyOptionsLoad"
        @change="onMultipleChosen"
        @visible-change="selectVisibleChange"
    >
        <el-option
        v-if="optionAll"
        value=""
        :label="optionAllText || language('all','全部')"
        ></el-option>
        <el-option
            v-for="(item,index) in projectOptions || []"
            :key="index"
            :label="item[optionName]"
            :value="item[optionKey]"
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
        value: {
            type: String,
            default: ''
        },
        options:{ // 所有数据
            type:Array,
            default:()=>[],
        },
        optionKey:{ // 绑定的key
            type:String,
            default:'code'
        },
        optionName:{ // 绑定的描述
            type:String,
            default:'desc'
        },
        optionAll: { // 是否展示全选选项
            type: Boolean,
            default: true
        },
        optionAllText: { // 全选文案
            type:String
        },
        searchKey:{ // 模糊搜索对比字段
            type:String,
            default:'pinyin'
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
            data: this.value,
            projectOptions:[],
            optionsCacheChunks: [],
            optionsFilterCache: [],
            currentPage:1,
            debouncer: null,
        }
    },
    watch:{
        options(val){
            if(val){
                const {options} = this;
                this.OptionsCache = options;
                this.optionsFilterCache= options;
                this.optionsCacheChunks = chunk(options, 20);
                this.projectOptions = this.optionsCacheChunks[0] || [];
            }
        },
        data(val) {
            if (val) {
                this.$nextTick(() => {
                    this.data = val
                })
            }
            this.$emit('input', val)
        },
        value(val) {
            this.data = val
        }
    },
    directives: {
        lazyOptionsLoad: {
            bind(el, binding) {
                const dom = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap")
                dom.addEventListener("scroll", function() {
                    if (Math.floor(this.scrollHeight - this.scrollTop) <= this.clientHeight) binding.value()
                });
            }
        }
    },
    methods:{
        onMultipleChosen(value) {
            if (this.multiple && this.optionAll) {
                if (!value[value.length - 1]) {
                    this.data=['']
                } else {
                    this.data=this.data.filter(item => item)
                }   
            }
        },
        dataFilter(value){
            const {searchKey,optionName} = this;
            if (this.debouncer && typeof this.debouncer.cancel === "function") this.debouncer.cancel();

            this.debouncer = debounce(() => {
                let _value = typeof value === "string" ? String(value).trim().toLowerCase() : _value;
                if (_value) {
                    this.optionsFilterCache = this.OptionsCache.filter(item => item[optionName].includes(_value)|| item[searchKey].includes(_value));
                    this.optionsCacheChunks = chunk(this.optionsFilterCache, 20);
                } else {
                    this.optionsFilterCache = this.OptionsCache;
                    this.optionsCacheChunks = chunk(this.OptionsCache, 20);
                }

                this.currentPage = 1;
                this.projectOptions = this.optionsCacheChunks[0] || [];
            },400);
            this.debouncer();
        },

        lazyOptionsLoad() {
            if (this.projectOptions.length < this.optionsFilterCache.length) {
                this.currentPage += 1;
                this.projectOptions = this.projectOptions.concat(this.optionsCacheChunks[this.currentPage - 1]);
            }
        },

        selectVisibleChange(visible){
            const value = this.data || ''
            // 选择过的项目默认提前
            const currentItem = this.options.find(o => o[this.optionKey] === value)
            this.OptionsCache = this.options.filter(o => o[this.optionKey] !== value)
            this.OptionsCache =currentItem ? [currentItem, ...this.OptionsCache] : this.OptionsCache
            if (!visible) {
                this.optionsFilterCache = this.OptionsCache;
                this.optionsCacheChunks = chunk(this.OptionsCache, 20)
            }

            this.projectOptions = this.optionsCacheChunks[0] || []
            this.cartypeProjectcurrentPage = 1
        },
    }
    
}
</script>

<style>

</style>