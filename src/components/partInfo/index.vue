<!--
* @author:shujie
* @Date: 2021-2-26 14:23:00
* @LastEditors: shujie
* @Description: In User Settings Edit
 -->
<template>
	<div>
		<ul class="partDetail flex-align-center">
			<li class="partDetailList flex-align-center" v-for="(item, index) in title" :key="index">
				<p class="flex-align-center">
					<icon name="icondian" v-if="icons"></icon>
					<span class="title">{{item.name}}</span>
				</p>
				<span class="content">{{data[item.key]}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		icon
	} from "@/components"
	export default {
		components: {
			icon
		},
		data() {
			return {
				
			}
		},
		props: {
			icons: {
				type: Boolean,
				default: false
			},
			title: {
				type: Array,
				default:()=>[]
			},
			data:{
				type:Object,
				default:()=>{}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.partDetail {
		flex-wrap: wrap;

		.partDetailList {
			// width: 33.33%;
			margin-top: 36px;
			margin-right: 120px;
			>p {
				min-width: 202px;
				font-size: 16px;

				span {
					font-size: 16px;
					color: #4B4B4C;
					margin-left: 10px;
				}
			}

			.content {
				width: 250px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				background: #F8F8FA;
				border-radius: 4px;
				font-size: 14px;
				color: #000000;
			}
		}

		@for $i from 1 to 4 {
			.partDetailList:nth-of-type(#{$i}) {
				margin-top: 0;
			}
		}

		& :nth-child(3n) {
			margin-right: 0;
		}
	}
</style>
