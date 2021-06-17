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
		<iPagination
		    v-update
		    @size-change="handleSizeChange($event, getTableList)"
		    @current-change="handleCurrentChange($event, getTableList)"
		    background
		    :page-sizes="page.pageSizes"
		    :page-size="page.pageSize"
		    :layout="page.layout"
		    :current-page='page.currPage'
		    :total="page.totalCount"/>
	</iCard>
</template>

<script>
	import {iCard,iPagination} from 'rise';
	import tableList from './tableList';
	import {specialToolsTitle} from './data';
	import {pageMixins} from '@/utils/pageMixins';
	export default{
		mixins: [pageMixins],
		components:{
			iCard,tableList,iPagination
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
