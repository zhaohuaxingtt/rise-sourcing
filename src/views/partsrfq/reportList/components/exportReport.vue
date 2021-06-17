<!--
 * @author: shujie
 * @createTime: 2021-6-17 2:19:05 ?F10: PM?
 * @Description:导出 报告清单 弹窗
 -->
<template>
	<iDialog :visible.sync="value" width="90%" @close="clearDiolog">
		<div class="flex-between-center margin-right30" slot="title">
			<!-- 报告清单 -->
			<span class="pageTitle">{{$t('LK_DAOCHU')}}</span>
			<!-- 下载 -->
			<iButton @click="down">{{ $t('LK_XIAZAI') }}</iButton>
		</div>
		<div class="content">
			<tableList
				:tableData="tableListData"
				:tableTitle="tableTitle"
				:tableLoading="tableLoading"
				index>
				<template #version="scope">
					<span class="openPage">{{scope.row.version}}</span>
				</template>
			</tableList>
		</div>
	</iDialog>
</template>

<script>
	import {iDialog,iButton,iMessage} from 'rise';
	import tableList from './tableList';
	import {pageMixins} from '@/utils/pageMixins';
	import {specialToolsTitle} from './data';
	export default {
		mixins: [pageMixins],
		components: {
			iDialog,
			iButton,
			tableList,
			iMessage
		},
		props:{
			value:{type:Boolean,default:false}
		},
		data() {
			return {
				tableTitle: specialToolsTitle,
				tableLoading: false,
				tableListData:[],
			};
		},
		created() {
		},
		methods: {
			clearDiolog() {
				this.$emit('input', false);
			},
			down(){
				if (!this.group.id) {
					iMessage.warn('未选择需要导出的报告')
					return
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	.content {
		padding-bottom: 20px;
	}
	
</style>
