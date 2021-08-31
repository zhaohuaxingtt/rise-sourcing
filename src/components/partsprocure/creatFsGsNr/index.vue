<template>
	<div class="fs margin-left10 margin-right10" v-permission='PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR|生成FSNRGSNR按钮'>
		<iButton  @click="validateFs()" :loading='partNumberLoading'>
			{{ language('partsprocure.PARTSPROCUREGENERATEFSGSNR','生成零件采购项目号') }}
		</iButton>
		<!-- 单条插入RFQ表格 -->
		<iDialog :title="language('LK_RFQLIST','RFQ列表')" :visible.sync="visible">
			<div class="flex-align-center add">
				<iButton @click="addRfq">{{ language('LK_TIANJIA','添加') }}</iButton>
			</div>
			<tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" radio></tableList>
			<div class="placeholder"></div>
		</iDialog>
	</div>
</template>

<script>
	import {iButton,iMessage,iMessageBox,iDialog} from 'rise';
	import {generateFs} from "@/api/partsprocure/home";
	import {insertRfq,addRfq} from "@/api/partsrfq/home";
	import tableList from "@/views/partsign/home/components/tableList";
	import {addRfqTitle} from "./data";
	import store from "@/store";
	import {partProjTypes} from '@/config'
	export default {
		components: {iButton,iDialog,tableList},
		props: {
			projectItems: {type: Array},
			keys:{
				type:String,
				default:'id'
			}
		},
		data() {
			return {
				partNumberLoading:false,
				visible: false,
				handleSelectArr:[],
				tableListData:[],
				tableTitle:addRfqTitle,
				tableLoading:false,
				rfqPartDTOList:[]//单挑插入RFQ数据
			}
		},
		methods: {
			validateFs(){
				this.fsProjectTypeAnIscommonSroucing(this.creatFs)
			},
			// 生成fs号
			creatFs() {
				if (this.projectItems.length == 0) return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU','抱歉，您当前还未选择您需要生成FS号的零件采购项目！'));
				this.partNumberLoading = true
				let fs = {
					ids: this.projectItems.map(res=>res[this.keys]),
				};
				generateFs(fs).then((res) => {
					this.partNumberLoading = false
					if (res.data) {
						this.$emit('refresh')
						// 多条组合RFQ
						let tip=""
						if (res.data.canJoinProjectList) {
							res.data.canJoinProjectList.map(res=>{
								tip=tip+res.fsnrGsnrNum+','
							})
							tip=tip+this.language('LK_SHIFOUZUHEXINJIANRFQ','是否组合新建RFQ')
							iMessageBox(tip,'',{ confirmButtonText: this.language('LK_QUEDING','确定'), cancelButtonText: this.language('LK_QUXIAO','取 消') }).then(val=>{
								insertRfq({ rfqPartDTOList: res.data.canJoinProjectList.map(r=>{return {...r,...{purchaseProjectId:r.id}}})}).then((res) => {
									if (res.data && res.data.rfqId) {
										iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
									} else {
										iMessage.warn(res.desZh);
									}
								})
							})	
						}else if(res.data.canJoinRfqList){
							// 单条插入RFQ
							iMessageBox(this.language('LK_SHIFOUJIARUYIYOURFQ','是否加入已有RFQ'),'',{ confirmButtonText: this.language('LK_QUEDING','确定'), cancelButtonText: this.language('LK_QUXIAO','取 消') }).then(val=>{
								this.visible=true
								this.tableListData=res.data.canJoinRfqList
								this.rfqPartDTOList = res.data.projectList.map(r=>{return {...r,...{purchaseProjectId:r.id}}}) 
							})
						}else{
							iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
						}
					} else {
						iMessage.error(res.desZh)
					}
				})
			},
			// 添加零件到RFQ
			addRfq(){
				this.addLoding = true;
				addRfq({
					insertRfqPackage: {
						operationType: '1',
						userId: store.state.permission.userInfo.id || '',
						userName: store.state.permission.userInfo.userName,
						rfqPartDTOList: this.rfqPartDTOList,
						rfqId: this.handleSelectArr[0].id
					}
				}).then((res) => {
						this.addLoding = false;
						if (res.data && res.data.rfqId) {
							iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
			/**
			* @description: 限制保存和提交的零件类型和是否commonsourcing是否匹配
			* @param {*}
			* @return {*}
			*/
			fsProjectTypeAnIscommonSroucing(callBack){
				try {
					if(this.projectItems.find(i=>(i.isCommonSourcing != undefined && i.partProjectType))){
						if(this.projectItems.find(res=>(!res.isCommonSourcing) && (res.partProjectType == partProjTypes.FSCOMMONSOURCING || res.partProjectType == partProjTypes.GSCOMMONSOURCING))){
							iMessageBox(this.language('SPIRNT11COMMONSS','存在零件采购项目类型与commonSourcing为[否]不统一，是否继续？')).then(res=>{
								callBack()
							})
						}else{
							callBack()
						}
					}else{
						callBack()
					}
					} catch (error) {
						console.warn(error)
						callBack()
					}
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
