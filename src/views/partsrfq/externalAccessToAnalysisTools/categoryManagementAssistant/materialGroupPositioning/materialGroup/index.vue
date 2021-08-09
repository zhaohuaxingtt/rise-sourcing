<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-06 17:27:51
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\materialGroup\index.vue
-->
<template>
	<iCard :title='language("CAILIAOZUDINGWEI","材料组定位")' class="margin-top20">
		<template slot="header-control">
			<iButton>{{ language("SHUANGCHUAN", "编辑") }}</iButton>
			<iButton @click="deleted">{{ language("SHANCHU", "保存") }}</iButton>
			<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
		</template>
		<el-row gutter="50">
			<el-col :span="17">
				<!-- 材料组定位/材料组占比情况 -->
				<el-row gutter="50">
					<el-col :span="16">
						<div class="cardTitle flex-align-center">
							<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
							<span>{{ language("CAILIAOZUDINGWEI", "材料组定位") }}</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="cardTitle flex-align-center">
							<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
							<span>{{ language("CLZZBQK", "材料组占比情况") }}</span>
						</div>
						<ring />
					</el-col>
				</el-row>
				<!-- 业务影响度特征分布情况 供应复杂度特征分布 -->
				<el-row>
					<el-col :span="12">
						<div class="cardTitle flex-align-center padding-right25">
							<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
							<span>{{ language("YWYXDTZFBQK", "业务影响度特征分布情况") }}</span>
						</div>
						<div class="margin-right25">
							<tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection="false" />
						</div>
					</el-col>
					<el-col :span="12">
						<div class="cardTitle flex-align-center padding-left25">
							<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
							<span>{{ language("YSFZDTZFBQK", "供应复杂度特征分布") }}</span>
						</div>
						<div class="margin-left25">
							<tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection="false" />
						</div>
					</el-col>
				</el-row>
			</el-col>
			<!-- 战略方向/采购策略 -->
			<el-col :span="7">
				<div class="cardTitle flex-align-center">
					<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
					<span>{{ language("ZLFXCGCL", "战略方向/采购策略") }}</span>
				</div>
				<div class="problem marginTop20">
					<p>{{ language("RHKZGYSZY", "1.如何控制供应商数量最优") }}</p>
					<iInput type="textarea" rows="2" resize="none"></iInput>
				</div>
				<div class="problem marginTop20">
					<p>{{ language("RHGLJGCBSMZQCB", "2.如何管理价格成本/生命周期成本") }}</p>
					<iInput type="textarea" rows="2" resize="none"></iInput>
				</div>
				<div class="problem marginTop20">
					<p>{{ language("RHQDHZFSYHZSJ", "3.如何确定合作方式合作时长") }}</p>
					<iInput type="textarea" rows="2" resize="none"></iInput>
				</div>
				<div class="problem marginTop20">
					<p>{{ language("RHQDWLGL", "4.如何牵动物流管理") }}</p>
					<iInput type="textarea" rows="2" resize="none"></iInput>
				</div>
				<div class="problem marginTop20">
					<p>{{ language("RHGKPZ", "5.如何管控品质") }}</p>
					<iInput type="textarea" rows="2" resize="none"></iInput>
				</div>
			</el-col>
		</el-row>
		<!-- <iPagination
						v-update
						@size-change="handleSizeChange($event, getTableList)"
						@current-change="handleCurrentChange($event, getTableList)"
						background
						:page-sizes="page.pageSizes"
						:page-size="page.pageSize"
						:layout="page.layout"
						:current-page='page.currPage'
						:total="page.totalCount"/> -->
	</iCard>
</template>

<script>
	import {iCard,iPagination,iButton,iMessage,iMessageBox,icon,iInput} from 'rise';
	import tableList from '@/views/partsrfq/externalAccessToAnalysisTools/components/tableList.vue';
	import {tableTitle} from './data';
	// import {pageMixins} from '@/utils/pageMixins';
	import {reportList} from "@/api/partsrfq/reportList";
	import ring from "./ring";
	export default{
		// mixins: [pageMixins],
		components:{
			iCard,tableList,iButton,icon,iInput,ring
		},
		props:{
			searchCriteria:{
				type:Object,
				default:()=>{}
			}
		},
		computed:{
		},
		data() {
			return {
				tableListData:[],
				tableTitle,
				tableLoading:false,
				selectData:[],
			}
		},
		created() {
			this.getTableList()
		},
		methods:{
			handleSelectionChange(list){
				this.selectData=list
			},
			getTableList(){
				this.tableLoading=true
				let data={
					pageNo:1,
					pageSize:12,
				}
				reportList(data).then(res=>{
					if (res.data) {
						// this.page.currPage = res.pageNum;
						// this.page.totalCount = res.total;
						this.tableLoading=false
						this.tableListData=res.data
					}
				})
			},
			// 返回
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
.cardTitle{
	padding-bottom: 10px;
	border-bottom:1px solid #CED4E1;
	span{
		font-size: 18px;
		color: $color-black;
		font-weight: bold;
		margin-left: 15px;
	}
}
.problem{
	margin-top: 30px;
	>p{
		font-size: 16px;
		color:#333333;
		margin-bottom:10px;
		font-weight: bold;
	}
	input{
		color: #6E7C97;
		font-size: 14px;
	}
}
</style>
