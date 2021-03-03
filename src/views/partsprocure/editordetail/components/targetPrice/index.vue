<template>
	<iCard>
		<!-- 价格明细 -->
		<div class="header flex-between-center-center">
			<span class="title">价格明细</span>
			<div class="control">
			  <iButton>保存</iButton>
			</div>
		</div>
		<iFormGroup row="4" icon inline>
			<div class="flex-align-center aa margin-top20">
				<iFormItem label="供货方式" name="test">
					<iText>
					</iText>
				</iFormItem>
				<iFormItem label="负责人" name="test">
					<iText>
					</iText>
				</iFormItem>
			</div>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请财务目标价 -->
		<div class="header flex-between-center-center">
			<span class="title">申请财务目标价</span>
			<div class="control">
			  <iButton>申请</iButton>
			</div>
		</div>
		<iFormGroup row="4" icon inline>
			<div class="flex-align-center aa margin-top20">
				<iFormItem label="供货方式" name="test">
					<iText>
					</iText>
				</iFormItem>
				<iFormItem label="负责人" name="test">
					<iText>
					</iText>
				</iFormItem>
			</div>
		</iFormGroup>
		<div class="line"></div>
		<!-- 申请RW价 -->
		<div class="header flex-between-center-center">
			<span class="title">申请RW价</span>
			<div class="control">
			  <iButton>申请</iButton>
			</div>
		</div>
		<iFormGroup row="4" icon inline>
			<div class="flex-align-center aa margin-top20">
				<iFormItem label="供货方式" name="test">
					<iText>
					</iText>
				</iFormItem>
				<iFormItem label="负责人" name="test">
					<iText>
					</iText>
				</iFormItem>
			</div>
		</iFormGroup>
	</iCard>
</template>

<script>
	import {
		iCard,
		iFormGroup,
		iFormItem,
		iText,
		icon,
		iButton
	} from "@/components";
	export default {
		components: {
			iCard,
			iFormGroup,
			iFormItem,
			iText,
			icon,
			iButton
		},
		data() {
			return {}
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.header {
		margin-bottom:30px;
		
		.title {
			font-size: 18px;
			font-weight: bold;
			color: #001847;
		}
		.control {
		}
	}
	.line{
		height: 1px;
		background-color: #CDDAF0;
		margin-top: 30px;
		margin-bottom: 36px;
	}
</style>
