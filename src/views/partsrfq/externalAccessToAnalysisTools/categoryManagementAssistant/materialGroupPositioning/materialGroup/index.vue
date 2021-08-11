<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 10:13:24
 * @LastEditTime: 2021-08-09 16:46:34
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
		<!-- 材料组定位/材料组占比情况 -->
		<div>
			<div class="cardTitle flex-align-center">
				<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
				<span>{{ language("CAILIAOZUDINGWEI", "材料组定位") }}</span>
			</div>
			<piecewise></piecewise>
		</div>
		<!-- 业务影响度特征分布情况 供应复杂度特征分布 -->
		<el-row gutter="50" class="margin-top35">
			<el-col :span="8">
				<div class="cardTitle flex-align-center">
					<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
					<span>{{ language("YWYXDTZFBQK", "业务影响度特征分布情况") }}</span>
				</div>
				<tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection="false" />
			</el-col>
			<el-col :span="8">
				<div class="cardTitle flex-align-center">
					<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
					<span>{{ language("YSFZDTZFBQK", "供应复杂度特征分布") }}</span>
				</div>
				<tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection="false" />
			</el-col>
			<el-col :span="8">
				<div class="cardTitle flex-align-center">
					<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
					<span>{{ language("CLZZBQK", "材料组占比情况") }}</span>
				</div>
				<ring></ring>
			</el-col>
		</el-row>
		<!-- 战略方向/采购策略 -->
		<div class="cardTitle flex-align-center margin-top35">
			<icon symbol name="iconzhanlvefangxiang" class="font30"></icon>
			<span>{{ language("ZLFXCGCL", "战略方向/采购策略") }}</span>
		</div>
		<div class="flex-between-center">
			<div class="problem">
				<p>{{ language("RHKZGYSZY", "1.如何控制供应商数量最优") }}</p>
				<iInput type="textarea" rows="2" resize="none"></iInput>
			</div>
			<div class="problem">
				<p>{{ language("RHGLJGCBSMZQCB", "2.如何管理价格成本/生命周期成本") }}</p>
				<iInput type="textarea" rows="2" resize="none"></iInput>
			</div>
			<div class="problem">
				<p>{{ language("RHQDHZFSYHZSJ", "3.如何确定合作方式合作时长") }}</p>
				<iInput type="textarea" rows="2" resize="none"></iInput>
			</div>
			<div class="problem">
				<p>{{ language("RHQDWLGL", "4.如何牵动物流管理") }}</p>
				<iInput type="textarea" rows="2" resize="none"></iInput>
			</div>
			<div class="problem">
				<p>{{ language("RHGKPZ", "5.如何管控品质") }}</p>
				<iInput type="textarea" rows="2" resize="none"></iInput>
			</div>
		</div>
	</iCard>
</template>

<script>
	import {iCard,iPagination,iButton,iMessage,iMessageBox,icon,iInput} from 'rise';
	import tableList from '@/views/partsrfq/externalAccessToAnalysisTools/components/tableList.vue';
	import {tableTitle} from './data';
	import {reportList} from "@/api/partsrfq/reportList";
	import ring from "./ring";
	import piecewise from "./piecewise";
	export default{
		components:{
			iCard,tableList,iButton,icon,iInput,ring,piecewise
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
	width: 19%;
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
