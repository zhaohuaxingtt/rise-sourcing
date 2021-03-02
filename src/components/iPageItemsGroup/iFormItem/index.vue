<!--
 * @Author: yuszhou
 * @Date: 2021-03-01 17:17:17
 * @LastEditTime: 2021-03-02 14:58:17
 * @LastEditors: Please set LastEditors
 * @Description: 为不同的宽度item做出UI还原
 * @FilePath: \rise\src\components\iFromItem\index.vue
-->
<script>
	import {
		FormItem
	} from 'element-ui'
	export default {
		extends: FormItem
	}
</script>
<style lang='scss' scoped>
	.row4 {
		margin-bottom: 25px;
		margin-right: 0px;

		::v-deep.el-form-item__label {
			width: 170px;
			text-align: left;
			font-size: 16px;
			color: #4B4B4C;
			word-break: normal;
		}

		::v-deep.el-form-item__content {
			width: 180px;
		}
	}

	.row3 {
		margin-right: 0px;
		margin-bottom: 25px;

		::v-deep.el-form-item__label {
			width: 220px;
			text-align: left;
			font-size: 16px;
			color: #4B4B4C;
		}

		::v-deep.el-form-item__content {
			width: 250px;
		}
	}

	.icon_self {
		.el-form-item__label {
			position: relative;

			&::before {
				content: "";
				height: 10px;
				width: 10px;
				border-radius: 50%;
				background-color: #1660F1;
				display: inline-block;
				position: absolute;
				left: -28px;
				top: 14px;
				z-index: 2;
			}

			&::after {
				content: "";
				height: 15px;
				width: 15px;
				border-radius: 50%;
				background-color: #DBE5FF;
				display: inline-block;
				position: absolute;
				left: -28px;
				top: 10px;
				z-index: 1;
			}
		}
	}
</style>
