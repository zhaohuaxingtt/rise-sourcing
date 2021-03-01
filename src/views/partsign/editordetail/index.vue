<!--
* @author:shujie
* @Date: 2021-2-26 14:55:05
* @LastEditors: shujie
* @Description: In User Settings Edit
 -->
<template>
	<iPage>
		<!-- 零件详情操作按钮 -->
		<div class="pageTitle flex-between-center-center">
			<span>3QG810005L</span>
			<div class="btnList">
				<iButton @click="openDiologChangeItems">转派</iButton>
				<iButton @click="save">签收</iButton>
				<iButton @click="openDiologBack">退回</iButton>
				<iButton @click="back">返回</iButton>
			<!-- 	<span>
					<icon name="icondatabaseweixuanzhong"></icon>
				</span> -->
			</div>
		</div>
		<!-- 零件详情内容 -->
		<iCard class="partsDetail">
			<partInfo icons :title="partTitle" :data="partDetails"></partInfo>
		</iCard>
		<!-- 零件详情tab页 -->
		<div class="iTabs">
			<iTabs-list type="border-card">
				<el-tab-pane label="信息单详情">
					<iCard>
						<partInfo :title="partDetailTitle" :data="partInfos"></partInfo>
					</iCard>
				</el-tab-pane>
				<el-tab-pane :label="$t('partsign.enquiry')">
					<enquiry />
				</el-tab-pane>
				<el-tab-pane :label="$t('partsign.usage')">
					<usage />
				</el-tab-pane>
			</iTabs-list>
		</div>
		<!-- 转派弹出框 -->
		<changeItems v-model="diologChangeItems" @sure='sureChangeItems'></changeItems>
		<!-- 退回弹出框 -->
		<backItems v-model='diologBack' @sure='sureBackmark'></backItems>
	</iPage>
</template>
<script>
	import {
		iPage,
		iButton,
		iCard,
		iTabsList,
		icon,
		partInfo,
		iMessage
	} from "@/components";
	import enquiry from "./components/enquiry";
	import usage from "./components/usage";
	import backItems from '../home/components/backItems'
	import changeItems from '../home/components/changeItems'
	import {
		partDetailTitle,
		partTitle
	} from "./components/data"
	import {
		getPartInfo
	} from "@/api/partsign/editordetail"
	export default {
		components: {
			iPage,
			iButton,
			iCard,
			iTabsList,
			icon,
			partInfo,
			enquiry,
			usage,
			backItems,
			changeItems
		},
		data() {
			return {
				partDetailTitle: partDetailTitle, //顶部零件数据
				partTitle: partTitle, //tab页零件详情数据
				diologChangeItems: false, //转派弹窗
				diologBack: false, //退回弹窗
				partDetails: {},//零件信息
				partInfos: {},//信息单详情
			};
		},
		created() {
			this.getPartInfo()
		},
		methods: {
			getPartInfo() {
				getPartInfo().then(res=>{
					this.partDetails=res.data
					this.partInfos=res.data
				})
			},
			//签收
			save() {
				iMessage.success('签收成功')
			},
			//退回
			openDiologBack() {
				this.diologBack = true
			},
			//转派
			openDiologChangeItems() {
				this.diologChangeItems = true;
			},
			// 确定退回
			sureBackmark(val) {
				console.log('your message:', val)
				this.diologBack = false
			},
			// 确定转派
			sureChangeItems(val) {
				console.log('your select data is', JSON.parse(val))
				this.diologChangeItems = false
			},
			// 返回
			back() {
				this.$router.go(-1);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.pageTitle {
		>span {
			font-size: 20px;
			font-weight: bold;
		}

		.btnList {
			>span {
				font-size: 20px;
				margin-left: 30px;
			}
		}
	}

	.partsDetail {
		margin-top: 23px;
		z-index: 10;
	}

	.iTabs {
		margin-top: 15px;
	}
</style>
