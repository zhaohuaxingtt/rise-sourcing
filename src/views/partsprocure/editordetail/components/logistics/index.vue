<!--
 * @Author: your name
 * @Date: 2021-03-02 16:53:24
 * @LastEditTime: 2021-03-02 17:03:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\logistics\index.vue
-->

<template>
	<div class="logistics">
		<iCard>
			<div class="header">
				<span class="title">物流标准</span>
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
		<iCard>
			<div class="header">
				<span class="title">参考包装</span>
			</div>
			<iFormGroup row="4" icon inline>
				<div class="flex-between-center margin-top20">
					<iFormItem label="参考包装长(mm)" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考包装宽(mm)" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考包装高(mm)" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="装箱撒" name="test">
						<iText>
						</iText>
					</iFormItem>
				</div>
				<div class="flex-between-center">
					<iFormItem label="参考车型" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考零件号" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考零件名" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考包装器具类型" name="test">
						<iText>
						</iText>
					</iFormItem>
				</div>
				<div class="flex-between-center">
					<iFormItem label="毛重(KG)" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考包装单价(元)" name="test">
						<iText>
						</iText>
					</iFormItem>
					<div style="width: 50%;"></div>
				</div>
				<div class="">
					<iFormItem label="毛重(KG)" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="参考包装单价(元)" name="test">
						<iText>
						</iText>
					</iFormItem>
				</div>
			</iFormGroup>
		</iCard>
		<iCard>
			<div class="header">
				<span class="title">SAIC VOLKSWAGEN库存_小时</span>
			</div>
			<iFormGroup row="4" icon inline>
				<div class="margin-top20">
					<iFormItem label="SAIC VOLKSWAGEN库存_小时" name="test">
						<iText>
						</iText>
					</iFormItem>
					<iFormItem label="SAIC VOLKSWAGEN空箱操作_小时" name="test">
						<iText>
						</iText>
					</iFormItem>
				</div>
			</iFormGroup>
		</iCard>
	</div>
</template>

<script>
	import {
		iCard,
		iFormGroup,
		iFormItem,
		iText
	} from "@/components";
	export default {
		components: {
			iCard,
			iFormGroup,
			iFormItem,
			iText
		},
		data() {
			return {};
		},
	};
</script>

<style scoped="scoped" lang="scss">
	.header {
		.title {
			font-size: 18px;
			font-weight: bold;
			color: #001847;
		}
	}

	.aa {
		>div{
			flex: 1;
		}
	}
</style>
