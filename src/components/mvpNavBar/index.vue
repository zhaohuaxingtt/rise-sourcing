<!--
* @author:shujie
* @Date: 2021-2-25 16:13:25
* @LastEditors: shujie
* @Description: mvp顶部导航栏
 -->
<template>
	<div class="nav flex-align-center" :class="[center && 'justify-center',right && 'justify-right']">
		<div v-for="(item,index) in list" :key="index" @click="change(item,index)">
			<span class="name" :class="index==activeIndex && 'active'">{{item.name}}</span>
			<!-- <span class="circle" v-show="item.message>0">{{item.message}}</span> -->
			<el-badge class="badge" :max="99" :hidden="!item.message" :value="item.message"></el-badge>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
			}
		},
		props: {
			center: {
				type: Boolean,
				default: false
			},
			right: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: () => [{
					value: 1,
					name: "零件签收",
					message: 1
				}, {
					value: 2,
					name: "采购项目建立",
					message: 123
				}, {
					value: 3,
					name: "RFQ执行",
					message: 0
				}, {
					value: 4,
					name: "定点管理",
					message: 0
				}]
			},

		},
		methods: {
			// 切换nav
			change(item, index) {
				if (index != this.activeIndex) {
					this.activeIndex = index
					this.$emit('change', item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		div {
			margin-left: 10px;
			position: relative;
			cursor: pointer;

			.name {
				padding: 4px 10px;
				opacity: 1;
				border-radius: 5px;
				font-size: 16px;
				color: #727272;
			}

			.active {
				color: #1660F1;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
				background: #FFFFFF;
				font-weight: bold;
			}

			.badge {
				position: absolute;
				right: -10px;
				top: -12px;

				::v-deep .el-badge__content {
					padding: 0 4px;
					height: 18px;
					line-height: 18px;
				}
			}
		}

	}

	.justify-center {
		justify-content: center;
	}

	.justify-right {
		justify-content: flex-end;
	}
</style>
