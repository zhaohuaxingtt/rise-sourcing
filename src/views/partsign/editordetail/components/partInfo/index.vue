<!--
* @author:shujie
* @Date: 2021-2-26 14:23:00
 * @LastEditors: Please set LastEditors
* @Description: In User Settings Edit
 -->
<template>	
	<iFormGroup row="3" inline :icon="icons">
		<iFormItem name="test" :class="item.isBlock && 'block'" v-for="(item,index) in title"
			:key="index" :label="language(item.language,item.name)" :v-permission="item.permissionKey">
			<iText v-if="item.key=='createDate' || item.key=='drawingDate'">
				{{data[item.key] | dateFilter}}
			</iText>
			<iText v-else>
				{{data[item.key]}}
			</iText>
		</iFormItem>
	</iFormGroup>
</template>

<script>
	import {
		iFormGroup,
		iFormItem,
		iText,
	} from 'rise'
	import filters from "@/utils/filters"
	export default {
		mixins: [filters],
		components: {
			iFormGroup,
			iFormItem,
			iText,
		},
		props: {
			icons: {
				type: Boolean,
				default: false
			},
			title: {
				type: Array,
				default: () => []
			},
			data: {
				type: Object,
				default: () => {}
			},
		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	// .partDetail {
	// 	flex-wrap: wrap;

	// 	.partDetailList {
	// 		margin-top: 36px;
	// 		margin-right: 137px;

	// 		>div {
	// 			>p {
	// 				width: 202px;
	// 				font-size: 16px;

	// 				span {
	// 					font-size: 16px;
	// 					color: #4B4B4C;
	// 					margin-left: 10px;
	// 				}
	// 			}

	// 			.content {
	// 				width: 250px;
	// 				height: 35px;
	// 				line-height: 35px;
	// 				text-align: center;
	// 				background: #F8F8FA;
	// 				border-radius: 4px;
	// 				font-size: 14px;
	// 				color: #000000;
	// 			}
	// 		}

	// 	}

	// 	@for $i from 1 to 4 {
	// 		.partDetailList:nth-of-type(#{$i}) {
	// 			margin-top: 0;
	// 		}
	// 	}

	// 	& :nth-child(3n) {
	// 		margin-right: 0;
	// 	}
	// }
</style>
