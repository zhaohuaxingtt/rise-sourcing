<!--
 * @author: shujie
 * @createTime: 2021-5-20 17:32:55
 * @Description:描述
 -->
<template>
	<iDialog :title="$t(title)" :visible.sync="value" width="400px" @close='clearDiolog' top="40vh">
		<p class="tip margin-bottom10">{{tip}}</p>
		<!-- <iSelect v-if="option==1" v-model='inquiryBuyer' :multiple='multiple' :collapse-tags='true' :filterable='true' value-key='id'>
			<iInput style="margin:10px;padding-right: 20px;"/>
			<div style="text-align:center;margin:5px">
				<iButton @click="selectAll">全部选取</iButton>
				<iButton @click="removeAll">全部移除</iButton>
			</div>
			<div class="select-title">已选择对象</div>
			<el-divider></el-divider>
			<div class="select-title">可选对象</div>
			<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
				<li v-for="(items,index) in buffered" :key='index' class="infinite-list-item" >{{ option==1?items.nameZh:items.industryName }}</li>
			</ul>
			<el-option v-if="selectData.length>0">
			</el-option>
		</iSelect> -->
		<iSelect v-if="option==1" v-model='inquiryBuyer' :multiple='multiple' :collapse-tags='true'  :filterable='true' :remote="true" :remote-method="remoteMethod" value-key='id'>
			<el-option v-for="(items,index) in supplierNameData" :key='index' :value='items' :label="items.nameZh" @change="searchSu"/>
		</iSelect>
		<iSelect v-else v-model='inquiryBuyer' :multiple='false' :filterable='true' value-key='id'>
			<el-option v-for="(items,index) in averageNameData" :key='index' :value='items' :label="items.industryName" />
		</iSelect>
		<span slot="footer" class="dialog-footer">
			<iButton @click="$emit('input',false)">{{$t('LK_QUXIAO')}}</iButton>
			<iButton :loading='repeatClick' @click="sureChangeItems">{{$t('LK_QUEREN')}}</iButton>
		</span>
	</iDialog>
</template>
<script>
	import {
		iSelect,
		iButton,
		iMessage,
		iDialog,
		iInput
	} from 'rise';
	import {averageName,searchSupplierName} from "@/api/ws2/investmentAdmin/payBlock";
	export default {
		components: {
			iSelect,
			iButton,
			iDialog,
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			value: {
				type: Boolean
			},
			tip: {
				type: String
			},
			multiple:{
				type:Boolean,
				default:false
			},
			selectData:{
				type:Array,
				default:()=>[]
			},
			option:{
				type:Number,
				default:1,//1 呈现维护对象  2 行业均值
			}
		},
		data() {
			return {
				inquiryBuyer:[],
				count:100,
				buffered:[],
				selected:[],
				current:10,
				supplierNameData:[],
				averageNameData:[]
			}
		},
		mounted() {
			this.getAverageName()
			// this.getSupplierName()
			this.buffered=this.selectData.splice(1,10)
		},
		methods: {
			remoteMethod(e){
				console.log(e)
				if(e.length>=2){
					this.getSupplierName(e)
				}
			},
			clearDiolog() {
				this.inquiryBuyer = []
				this.$emit('input', false)
			},
			sureChangeItems() {
				if (!this.inquiryBuyer) return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN'))
				this.$emit('sure', this.inquiryBuyer)
			},
			load(){
				console.log(123)
				this.buffered=[...this.buffered,...this.selectData.splice(this.current,10)]
				this.current=this.current+10
			},
			// 获取供应商名称
			getSupplierName(e){
				searchSupplierName(e).then(res=>{
					if (res.data) {
						this.supplierNameData=res.data
					}
				})
			},
			// 获取行业均值
			getAverageName(){
				averageName().then(res=>{
					if (res.data) {
						this.averageNameData=res.data
					}
				})
			},
		}
	}
</script>
<style lang='scss' scoped>
	.tip {
		font-size: 14px;
		color: $color-black;
	}
	.select-title{
		font-size: 14px;
		font-family: Arial;
		font-weight: 400;
		line-height: 16px;
		color: #000000;
		opacity: 1;
	}
</style>
