<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页-专项分析工具
 -->
<template>
	<iCard :title="$t('TPZS.ZXFXGJ')" collapse class="margin-top20">
		<tableList 
			:tableData="tableListData"
			:tableTitle="tableTitle"
			:tableLoading="tableLoading"
			index>
			<template #version="scope">
				<span class="openPage">{{scope.row.version}}</span>
			</template>
		</tableList>
	</iCard>
</template>

<script>
	import {iCard} from 'rise';
	import tableList from './tableList';
	import {specialToolsTitle} from './data';
	export default{
		components:{
			iCard,tableList
		},
		data() {
			return {
				tableListData:[{version:111}],
				tableTitle:specialToolsTitle,
				tableLoading:false,
			}
		},
	}
</script>

<style lang="scss">
</style>
