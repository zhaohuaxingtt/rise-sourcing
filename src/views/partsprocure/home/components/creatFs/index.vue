<template>
	<div class="fs margin-left10 margin-right10">
		<iButton v-permission="PARTSPROCURE_GENERATEFSBUTTON" @click="creatFs()">
			{{ $t('partsprocure.PARTSPROCUREGENERATEFSGSNR') }}
		</iButton>
		<!-- 单条插入RFQ表格 -->
		<iDialog title="RFQ列表" :visible.sync="visible">
			<tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading"
			@handleSelectionChange="handleSelectionChange" isOne></tableList>
		</iDialog>
	</div>
</template>

<script>
	import {iButton,iMessage,iMessageBox,iDialog} from '@/components';
	import {changeProcure} from "@/api/partsprocure/home";
	import {insertRfq,addRfq} from "@/api/partsrfq/home";
	import tableList from "@/views/partsign/home/components/tableList";
	import {addRfqTitle} from "../data"
	export default {
		components: {iButton},
		props: {
			projectIds: {type: Array}
		},
		data() {
			return {
				visible: true,
				handleSelectArr:[],
				tableListData:[],
				tableTitle:addRfqTitle,
				tableLoading:false
			}
		},
		methods: {
			// 生成fs号
			creatFs() {
				if (this.projectIds.length == 0) return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU'));
				let fs = {
					purchaseProjectIds: this.projectIds,
				};
				changeProcure({fs}).then((res) => {
					if (!res.data) {
						// 多条组合RFQ
						let tip=""
						if (res.data) {//res.data.fs.projectList
							res.data.fs.projectList.map(res=>{
								tip=tip+res.fsnrGsnrNum+','
							})
							iMessageBox(tip+"是否组合新建RFQ","是否新组建RFQ",{ confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }).then(res=>{
								insertRfq({ rfqPartDTOList: this.projectIds}).then((res) => {
									if (res.data && res.data.rfqId) {
										iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
										this.$emit('refresh')
									} else {
										iMessage.warn(res.desZh);
									}
								})
							})	
						}else if(res){//res.data.fs.rfqList
							// 单条插入RFQ
							iMessageBox("是否加入已有RFQ","是否加入RFQ",{ confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }).then(res=>{
								this.visible=true
								console.log(1111);
							})	
						}else{
							iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
						}
					} else {
						iMessage.error(res.desZh)
					}
				});
			},
			handleSelectionChange(rows) {
				this.handleSelectArr = rows;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.fs {
		display: inline-block;
	}
</style>
