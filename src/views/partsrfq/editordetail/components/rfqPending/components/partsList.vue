<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
* @LastEditors: shujie
* @Description: 待办事项-零件清单
 -->
<template>
	<div class="partsList">
		<!-- 添加筛选 -->
		<div class="menu flex-between-center-center">
			<iButton>添加</iButton>
			<icon name="iconxiaoxi"></icon>
		</div>
	</div>
</template>

<script>
	import {
		iButton,
		icon
	} from '@/components'
	export default {
		components: {
			iButton,
			icon
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.partsList{
		
	}
	.menu{
		height: 80px;
	}
</style>
