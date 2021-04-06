<template>
	<div class="fs margin-left10 margin-right10">
		<iButton v-permission="PARTSPROCURE_GENERATEFSBUTTON" @click="creatFs()">
			{{ $t('partsprocure.PARTSPROCUREGENERATEFSGSNR') }}
		</iButton>
		<!-- 单条插入RFQ表格 -->
		<iDialog title="RFQ列表" :visible.sync="visible">
			<div class="flex-align-center add">
				<iButton @click="addRfq">添加</iButton>
			</div>
			<tableList  :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" radio></tableList>
			<div class="placeholder"></div>
		</iDialog>
	</div>
</template>

<script>
	import {iButton,iMessage,iMessageBox,iDialog} from '@/components';
	import {changeProcure} from "@/api/partsprocure/home";
	import {insertRfq,addRfq} from "@/api/partsrfq/home";
	import tableList from "@/views/partsign/home/components/tableList";
	import {addRfqTitle} from "../data";
	import store from "@/store";
	export default {
		components: {iButton,iDialog,tableList},
		props: {
			projectIds: {type: Array}
		},
		data() {
			return {
				visible: false,
				handleSelectArr:[],
				tableListData:[],
				tableTitle:addRfqTitle,
				tableLoading:false,
				rfqPartDTOList:[]//单挑插入RFQ数据
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
					if (res.data) {
						// 多条组合RFQ
						let tip=""
						if (res.data.fs.projectList) {
							res.data.fs.projectList.map(res=>{
								tip=tip+res.fsnrGsnrNum+','
							})
							tip=tip+"是否组合新建RFQ"
							iMessageBox(tip,"是否新组建RFQ",{ confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }).then(val=>{
								insertRfq({ rfqPartDTOList: res.data.fs.projectList}).then((res) => {
									if (res.data && res.data.rfqId) {
										iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
										this.$emit('refresh')
									} else {
										iMessage.warn(res.desZh);
									}
								})
							})	
						}else if(res.data.fs.rfqResult){
							// 单条插入RFQ
							iMessageBox("是否加入已有RFQ","是否加入RFQ",{ confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }).then(val=>{
								this.visible=true
								this.tableListData=res.data.fs.rfqResult.list
								this.rfqPartDTOList.push(res.data.fs.rfqResult.project) 
							})	
						}else{
							iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
							this.$emit('refresh')
						}
					} else {
						iMessage.error(res.desZh)
					}
				});
			},
			// 添加零件到RFQ
			addRfq(){
				this.addLoding = true;
				addRfq({
					insertRfcPackage: {
						operationType: '1',
						userId: store.state.permission.userInfo.id || '',
						userName: store.state.permission.userInfo.userName,
						rfqPartDTOList: this.rfqPartDTOList,
						rfqId: this.handleSelectArr[0].id
					}
				}).then((res) => {
						this.addLoding = false;
						if (res.data && res.data.rfqId) {
							iMessage.success("操作成功")
							this.visible=false
							this.$emit('refresh')
						} else {
							iMessage.error(res.desZh)
						}
					}).catch(() => {
						this.addLoding = false;
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
	.add{
		justify-content: flex-end;
		margin-bottom: 20px;
	}
	.placeholder{
		height: 30px;
	}
</style>
