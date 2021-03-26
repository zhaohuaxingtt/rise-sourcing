<template>
	<div class="remark">
		<iCard>
			<div class="list flex-between-center margin-bottom75">
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>询价采购员备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.csfMemo"></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>Linie备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.linieMemo" disabled></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>CS*1备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.cs1Memo" disabled></iInput>
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
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.csfMeetMemo"></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>Linie上会备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.linieMeetMemo" disabled></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>CS*1上会备注</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.csfMeetMemo" disabled></iInput>
				</div>
			</div>
		</iCard>
	</div>
</template>

<script>
	import {getTabelData,changeProcure} from '@/api/partsprocure/home'
	import {
		detailData
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
			}
		},
		props:{
			detailData:{
				type:Object,
				default:()=>{
					return detailData
				}
			}
		},
		created() {
		},
		methods:{
			//修改详情里面备注。
			save(val) {
				let detailData=this.detailData
				changeProcure({detailData}).then(res => {
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
