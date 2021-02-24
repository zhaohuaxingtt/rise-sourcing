<!--
 * @Author: shujie
 * @Date: 2021-02-24 10:17:41
 * @LastEditTime: 2021-02-24 10:17:41
 * @LastEditors: shujie
 * @Description: 零件详情
 * @FilePath: \rise\src\views\partsign\editordetail\index.vue
-->
<template>
	<iPage>
		<!-- 零件详情操作按钮 -->
		<div class="pageTitle flex-between-center-center">
			<span>零件详情页--></span>
			<div class="btnList">
				<iButton>编辑</iButton>
				<iButton>生成RFQ</iButton>
			</div>
		</div>
		<!-- 零件详情内容 -->
		<el-row class="margin-top20">
			<el-col :span="12" class="padding-right10">
				<iCard :bodyStyle="{height:'200px'}">
					<div class="flex">
						<ul class="partDetail">
							<li class="partDetailList flex-align-center" v-for="(item,index) in 2" :key="index">
								<span>零件号：</span>
								<span>123jddddd33</span>
							</li>
						</ul>
						<ul class="partDetail">
							<li class="partDetailList" v-for="(item,index) in 10" :key="index">
								<span>零件号：</span>
								<span>123jddddd33</span>
							</li>
						</ul>
					</div>
				</iCard>
			</el-col>
			<el-col :span="6" class="padding-right10">
				<iCard :bodyStyle="{height:'200px'}">
					<ul class="">
						<li class="partDetailList" v-for="(item,index) in 5" :key="index">
							<span>零件号：</span>
							<span>123jddddd33</span>
						</li>
					</ul>
				</iCard>
			</el-col>
			<el-col :span="6">
				<iCard :bodyStyle="{height:'200px'}">
					<ul class="partDetail">
						<li class="partDetailList" v-for="(item,index) in 10" :key="index">
							<span>零件号：</span>
							<span>123jddddd33</span>
						</li>
					</ul>
				</iCard>
			</el-col>
		</el-row>
		<!-- 零件详情tab页 -->
		<div class="iTabs">
			<iTabs type="border-card" class="margin-top30">
				<el-tab-pane label="detailsTab1">
					<detailsTab1></detailsTab1>
				</el-tab-pane>
				<el-tab-pane label="Metarial">
					内容2
				</el-tab-pane>
				<el-tab-pane label="Jsdker">内容3</el-tab-pane>
				<el-tab-pane label="Jsdker">内容4</el-tab-pane>
				<el-tab-pane label="Jsdker">内容5</el-tab-pane>
			</iTabs>
			<!-- log -->
			<div class="log">
				<icon name="iconsousudingbu"></icon>
			</div>
		</div>
		
	</iPage>
</template>
<script>
	import {
		iPage,
		iButton,
		iCard,
		iTabs,
		icon
	} from '@/components';
	import detailsTab1 from './components/detailsTab1'
	export default {
		components: {
			iPage,
			iButton,
			iCard,
			iTabs,
			icon,
			detailsTab1,
		},
		data() {
			return {
			}
		},
	}
</script>
<style lang="scss" scoped>
	.pageTitle {}
	
	.partDetail {
		flex: 1;
		.partDetailList{
			span:nth-of-type(1){
				min-width: 150px;
			}
			span:nth-of-type(2){
				
			}
		}
	}
	// tab页
	.iTabs{
		position: relative;
		::v-deep .el-tabs__nav {
			padding-right: 300px;
		}
		.log{
			position: absolute;
			right: 10px;
			top: 10px;
		}
	}
	
</style>
