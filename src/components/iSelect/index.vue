<!--
/*
 * @Autor: Hao,Jiang
 * @Date: 2021-09-03 16:13:03
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-14 09:53:54
 * @Description: iSelect 优化版
 * 新特性
 * 1.完全兼容element-ui select 所有的属性
 * 2.扩展属性 支持拼音模糊查询
 * 3.扩展属性 option 超过20项自动开启filterable
 * 4.扩展属性 option 超过20项分页,支持超过20项lazy-load
 * 5.兼容option slot传和options传参两种方式，slot传参如果在option较大的时候容易出现性能问题
 */
-->
<template>
    <iSelectCopy
		v-model="data"
        class="iSelect-ultimate"
        :class="{inlineMode}"
		:placeholder="language('QINGXUANZE','请选择')"
        :filterable="canBeFilterable"
        :filter-method="dataFilter"
		:multiple="multiple"
        @change="onMultipleChosen"
        @visible-change="selectVisibleChange"
		v-lazy-options-load="lazyOptionsLoad"
		v-bind="$attrs"
        v-on="listeners"
    >
		<el-option
			v-if="optionAll"
			:value="optionAllDefaultValue"
			:label="optionAllText || language('all','全部')"
			></el-option>
			<el-option
				v-for="(item,index) in projectOptions || []"
				:key="index"
				:label="item && item[optionName] || ''"
				:value="item && item[optionKey] || ''"
			>
		</el-option>
    </iSelectCopy> 
</template>

<script>
import iSelectCopy from './iSelectCopy';
import { debounce,chunk,cloneDeep,uniqBy } from "lodash"
export default {
    name:'iSelect',
    components:{
        iSelectCopy,
    },
    props:{
        value: {
            type: String,
            default: ''
        },
        // 所有下拉数据
        options:{
            type:Array,
            default:()=>[],
        },
        // 绑定的key(只针对于options传参)
        optionKey:{
            type:String,
            default:'value'
        },
        // 绑定的描述(只针对于options传参)
        optionName:{
            type:String,
            default:'label'
        },
        // 分页阈值，默认20
		optionSize:{
            type:String||Number,
            default:20
        },
        // 是否展示全选选项
        optionAll: {
            type: Boolean,
            default: true
        },
        // 全选选项默认绑定值
        optionAllDefaultValue: {
            type: String||Number,
            default: ''
        },
        // 全选文案
        optionAllText: {
            type:String
        },
        // 模糊搜索对比字段
        searchKey:{
            type:String,
            default:'pinyin'
        },
        // 可搜索
        filterable:{
            type:Boolean,
            default:false,
        },
        // 多选
        multiple:{
            type:Boolean,
            default:false
        },
        // 默认是插槽模式还是option模式
		defaultSlotMode: {
			type:Boolean,
            default:true
		},
        // 选项框里面选中项目逗号展示
        inlineMode: {
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            data: this.value,
            projectOptions:[],
			// 备份option
			optionList: [],
            // 缓存的option数据
			OptionsCache: [],
            // 缓存的已分页option数据
            optionsCacheChunks: [],
            optionsFilterCache: [],
			originOptionsFilterCache: [],
            currentPage:1,
            debouncer: null,
            // 插槽模式，从updated取从接口回来的数据，防止死循环
			optionUpdating: false
        }
    },
	computed: {
		canBeFilterable() {
			return this.multiple || this.OptionsCache.length > this.optionSize || this.filterable
		},
        // 获取用户端监听的事件
        listeners() {
            const listeners = {}
            const reservedLitheners = {
                'change': this.onMultipleChosen,
                'visible-change': this.selectVisibleChange
            }
            // 遍历传入的事件
            Object.keys(this.$listeners).forEach(litnenerKey => {
                // 发现与保留事件冲突，取保留事件，保留事件切记要按照elementUI规范抛出相同事件
                if (Object.keys(reservedLitheners).includes(litnenerKey)) {
                    listeners[litnenerKey] = reservedLitheners[litnenerKey]
                } else {
                    // 取传入的事件
                    listeners[litnenerKey] = this.$listeners[litnenerKey]
                }
            })
            return listeners
        },
	},
	created() {
		this.defaultSlotMode && (this.updateOptions())
	},
	updated() {
        const slotDefault = this.$slots.default || []
		if (this.defaultSlotMode && this.originOptionsFilterCache.length !== slotDefault.length && !this.optionUpdating) {
			this.optionUpdating = true
			this.updateOptions()
		}
	},
    watch:{
        options(val){
            if(val){
                this.init(val)
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
                dom && (dom.addEventListener("scroll", function() {
                    if (Math.floor(this.scrollHeight - this.scrollTop) <= this.clientHeight) binding.value()
                }));
            }
        }
    },
    methods:{
		updateOptions() {
			let options = Array.from(this.$slots.default || []).slice()
			options = options.map(o => {
				return o.componentOptions && o.componentOptions.propsData
			})
			this.originOptionsFilterCache = cloneDeep(options)
            // 去除不合法的项目
            options = (options || []).filter(o => o)
			// 去除全部
			if (options && options[0] && !options[0][this.optionKey]) {
				options.shift()
			}
			this.$nextTick(() => {
				this.optionsFilterCache = cloneDeep(options)
				this.init(options)
			})
		},
		init(optionList = []) {
			const options = optionList || [];
			this.optionList = cloneDeep(optionList)
			this.OptionsCache = options;
			this.optionsFilterCache= options;
			this.optionsCacheChunks = chunk(options, this.optionSize);
			this.projectOptions = this.optionsCacheChunks[0] || [];
			this.optionUpdating = false
		},
        onMultipleChosen(value) {
            if (this.multiple && this.optionAll) {
                if (!(value && value[value.length - 1])) {
                    this.data=[this.optionAllDefaultValue]
                } else {
                    this.data=this.data.filter(item => item)
                }   
            }
			this.$emit('change', value)
        },
        dataFilter(value){
            const {searchKey,optionName} = this;
            if (this.debouncer && typeof this.debouncer.cancel === "function") this.debouncer.cancel();

            this.debouncer = debounce(() => {
                let _value = typeof value === "string" ? String(value).trim().toLowerCase() : _value;
                if (_value) {
                    !this.multiple && (this.data = String(value).trim());
                    this.optionsFilterCache = this.OptionsCache.filter(item => String(item[optionName]).includes(_value)|| String(item[searchKey]).includes(_value));
                    this.optionsCacheChunks = chunk(this.optionsFilterCache, this.optionSize);
                } else {
                    this.optionsFilterCache = this.OptionsCache;
                    this.optionsCacheChunks = chunk(this.OptionsCache, this.optionSize);
                }

                this.currentPage = 1;
                this.projectOptions = this.optionsCacheChunks[0] || [];
            },400);
            this.debouncer();
        },

        lazyOptionsLoad() {
            if (this.projectOptions.length < this.optionsFilterCache.length) {
                this.currentPage += 1;
				if (this.currentPage > this.optionsCacheChunks.length) return
                this.projectOptions = this.projectOptions.concat(this.optionsCacheChunks[this.currentPage - 1]);
            }
        },

        selectVisibleChange(visible){
            const value = this.data || (this.multiple ? [this.optionAllDefaultValue] : this.optionAllDefaultValue)
            // 选择过的项目默认提前

            // 单选
            if (!this.multiple) {
                const currentItem = this.optionList.find(o => o[this.optionKey] === value)
                this.OptionsCache = this.optionList.filter(o => o[this.optionKey] !== value)
                this.OptionsCache =currentItem ? [currentItem, ...this.OptionsCache] : this.OptionsCache
            } else {
                // 多选
                const currentItems = this.optionList.filter(o => value.includes(o[this.optionKey]))
                this.OptionsCache = this.optionList.filter(o => !value.includes(o[this.optionKey]))
                this.OptionsCache =currentItems.length ? [...currentItems, ...this.OptionsCache] : this.OptionsCache
            }
            // 根据optionKey 给选项去重
            this.OptionsCache = uniqBy(this.OptionsCache, o=> o[this.optionKey])
			// 关闭下拉的时候
            if (!visible) {
                this.optionsFilterCache = this.OptionsCache;
                this.optionsCacheChunks = chunk(this.OptionsCache, this.optionSize)
				// 如果当前值在列表中查不到，就清除
				if (!this.multiple && !this.optionList.find(o => o[this.optionKey] === value)) {
					this.data = this.optionAllDefaultValue
				}
                if (this.multiple && !this.optionList.filter(o => value.includes(o[this.optionKey])).length) {
					this.data = [this.optionAllDefaultValue]
				}
            }

            this.projectOptions = this.optionsCacheChunks[0] || []
            this.currentPage = 1
			this.$emit('visible-change', visible)
        },
    }
    
}
</script>

<style lang="scss" scoped>
.iSelect-ultimate {
    &.inlineMode {
        ::v-deep.el-select__input {
            margin-left: 0px;
        }
        ::v-deep.el-tag {
            background-color: transparent;
            border-color: transparent;
            position: relative;
            margin-left: 0px;
            padding-left: 2px;
            &:first-child {
                padding-left: 5px;
            }
            &:last-child {
                &:after {
                    display: none;
                }
            }
            &:after {
                content: ',';
                border-radius: 50%;
                text-align: center;
                position: relative;
                cursor: pointer;
                font-size: 12px;
                height: 16px;
                width: 16px;
                line-height: 16px;
                vertical-align: middle;
                top: -1px;
                right: -5px;
            }
            .el-tag__close {
                display: none;
            }
        }
    }
}
</style>