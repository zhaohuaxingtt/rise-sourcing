<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页
 -->
<template>
	<iPage>
		<div class="flex-between-center">
			<!-- 报告清单 -->
			<span class="pageTitle">{{$t('TPZS.BGQD')}}</span>
			<!-- 导出 -->
			<iButton @click="openExport">{{$t('LK_DAOCHU')}}</iButton>
		</div>
		<iSearch class="margin-top20" @reset="handleSearchReset" @sure="getTableList">
			<el-form>
				<el-form-item :label="item.key?$t(item.key):item.name" v-for="(item,index) in search" :key="index">
					<iSelect v-if="item.type=='select'">
						<el-option :value="item.code" :label="item.name" v-for="item in fromGroup[item.select]" :key="item.code"></el-option>
					</iSelect>
					<iInput v-else :placeholder="$t(item.placeholder)"></iInput>
				</el-form-item>
			</el-form>
		</iSearch>
		<!-- 专项分析工具 -->
		<specialTools></specialTools>
		<!------------------------------------内部进入------------------------------------>
		<el-row>
			<el-col :span="12">
				<!-- 报价分析 -->
				<quotationAnalysis class="margin-right20"></quotationAnalysis>
			</el-col>
			<el-col :span="12">
				<!-- 谈判基本信息 -->
				<negotiationBasic class="margin-left20"></negotiationBasic>
			</el-col>
		</el-row>
		<!-- 导出弹窗 -->
		<exportReport v-model="visible"></exportReport>
	</iPage>
</template>

<script>
	import {iPage,iCard,iSelect,iInput,iButton,iSearch} from 'rise';
	import {search} from './components/data';
	import {selectDictByKeys} from '@/api/dictionary';
	import specialTools from './components/specialTools';
	import quotationAnalysis from './components/quotationAnalysis';
	import negotiationBasic from './components/negotiationBasic';
	import exportReport from './components/exportReport'
	export default{
		components:{
			iPage,iCard,iSelect,iInput,iButton,iSearch,specialTools,quotationAnalysis,negotiationBasic,exportReport
		},
		data() {
			return {
				search,
				fromGroup: {},//下拉框数据
				visible:false
			}
		},
		created() {
			this.getAllSelect()
		},
		methods:{
			// 字段查询下拉框
			getAllSelect() {
				let data = [{keys: "PART_STATE"},{keys:"EMPLOYEE_GENDER"}]
				selectDictByKeys(data).then(res => {
					if (res.data) {
						this.fromGroup = res.data
					}
				})
			},
			// 打开导出弹窗
			openExport(){
				this.visible=true
			}
		}
	}
</script>

<style lang="scss">
	.pageTitle{
		font-size: 20px;
		color: $color-black;
		font-weight: bold;
	}
	.openPage{
		color: $color-blue;
		font-size: 14px;
		text-decoration: underline;
		cursor: pointer;
		width: 100px;
		@include text_;
	}
</style>
