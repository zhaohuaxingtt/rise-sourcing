<!--
* @author:shujie
* @Date: 2021-2-22 13:39:22
* @LastEditors: shujie
* @Description: 标签页
 -->
<script>
	import {
		Tabs
	} from "element-ui";
	export default {
		extends: Tabs,
		methods: {},
	};
</script>

<style lang="scss" scoped>
	// 默认样式
	.el-tabs {
		.el-tabs__nav-wrap::after {
			height: 0;
		}

		::v-deep .el-tabs__nav-scroll {
			.el-tabs__active-bar {
				width: 70px !important;
				background-color: $color-blue;
			}

			.el-tabs__item {
				// height: 33px;
				// line-height: 33px;
				font-size: 20px;
				color: $color-header-iocn;
			}

			.is-active {
				color: #000000;
			}
		}

	}

	// type="border-card"
	.el-tabs--border-card {
		border-radius: 10px;
		overflow: hidden;
		box-shadow: $btn-box-shadow;
		border: none;
		::v-deep .el-tabs__nav {
			width: 100%;
			display: flex;
			align-items: center;
			height: 38px;

			.el-tabs__item {
				height: 38px;
				line-height: 38px;
				font-size: 16px;
				color: $color-header-iocn;
				border: none;
			}

			>div {
				flex: 1;
				text-align: center;
			}

			.is-active {
				color: $color-blue;
				border-radius: 10px 10px 0 0;
				box-shadow: 0px 0px 10px 2px rgba(27, 29, 33, 0.08);
			}
		}

		.el-tabs--border-card>.el-tabs__header {
			border: none;
		}

		.el-tabs__content {
			z-index: 100;
			box-shadow: 0 1px 4px 1px rgb(0 0 0 / 12%);
		}
	}
</style>
