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
				index
				@handleSelectionChange="handleSelectionChange">
				<template #isDefault="scope">
					<span>{{scope.row.isDefault?'是':'否'}}</span>
				</template>
			</tableList>
		</div>
	</iDialog>
</template>

<script>
	import {iDialog,iButton,iMessage} from 'rise';
	import tableList from './tableList';
	import {specialToolsTitle} from './data';
	import resultMessageMixin from '@/utils/resultMessageMixin';
	import {downloadFile} from '@/api/file';
	export default {
		mixins: [resultMessageMixin],
		components: {
			iDialog,
			iButton,
			tableList,
			iMessage
		},
		props:{
			value:{type:Boolean,default:false},
			tableListData:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				tableTitle: specialToolsTitle,
				tableLoading: false,
				selectData:[]
			};
		},
		methods: {
			handleSelectionChange(list){
				this.selectData=list
			},
			clearDiolog() {
				this.$emit('input', false);
			},
			down(){
				if (this.selectData.length==0) {
					iMessage.warn($t('TPZS.CANNOTSELECT'))
					return
				}
				let fileName=[]
				this.selectData.map(item=>{
					fileName.push(item.downloadName)
				})
				const req = {
					applicationName: 'rise',
					fileList: [fileName],
				}
				downloadFile(req)
			},
		},
	};
</script>

<style scoped lang="scss">
	.content {
		padding-bottom: 20px;
	}
	
</style>
