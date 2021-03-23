<template>
	<div class="remark">
		<iCard>
			<div class="list flex-between-center margin-bottom75">
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>询价采购员备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="infoDetail.buyerName"></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>Linie备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="infoDetail.linieMemo" disabled></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>CS*1备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="infoDetail.cs1Memo" disabled></iInput>
				</div>
				<!-- 保存 -->
				<span class="save">
					<iButton @click="save">保存</iButton>
				</span>
			</div>
			<div class="list flex-between-center margin-bottom40">
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>询价采购员上会备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="infoDetail.buyerName"></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>Linie上会备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="infoDetail.linieMeetMemo" disabled></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>CS*1上会备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="infoDetail.csfMeetMemo" disabled></iInput>
				</div>
			</div>
		</iCard>
	</div>
</template>

<script>
	import {getTabelData,changeProcure} from '@/api/partsprocure/home'
	import {
		infoDetail
	} from '../data'
	import {
		iCard,
		icon,
		iInput,
		iButton
	} from "@/components"

	export default {
		components: {
			iCard,
			icon,
			iInput,
			iButton
		},
		data() {
			return {
				infoDetail:infoDetail
			}
		},
		props:{
			partNum:{
				type:String,
				default:""
			}
		},
		created() {
			this.getDatail()
		},
		methods:{
			// 获取备注信息
			getDatail(){
				console.log(this.partNum);
				let data={
					'detailBaseReq.partNum':this.partNum,
				}
				getTabelData(data).then(res=>{
					this.infoDetail=res.data.detailData
				})
			},
			//修改详情。
			save(val) {
				let baseInfo=this.infoDetail
				changeProcure({baseInfo}).then(res => {
					this.diologChangeItems = false;
					this.getDatail()
				}).catch(() => {
					this.diologChangeItems = false;
				})
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.list {
		>div {
			width: 500px;

			>p {
				display: flex;
				align-items: center;
				font-size: 38px;
				margin-bottom: 20px;

				>span {
					font-size: 16px;
					margin-left: 10px;
				}
			}
		}

	}

	.list:nth-of-type(1) {
		position: relative;
		padding-top: 15px;
	}

	.save {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
