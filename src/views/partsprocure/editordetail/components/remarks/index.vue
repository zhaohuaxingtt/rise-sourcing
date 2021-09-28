<template>
	<div class="remark">
		<iCard v-loading='diologChangeItems'>
			<div class="list flex-between-center margin-bottom75">
				<div v-permission.auto="PARTSPROCURE_EDITORDETAIL_REMARKS_INQUIRYBUYER_SHOW|询价采购员备注">
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ language('LK_XUNJIACAIGOUYUANBEIZHU','询价采购员备注') }}</span>
					</p>
					<iInput :disabled="disabled" type="textarea" rows="8" resize="none" v-model="vmdetailData.csfMemo" v-permission.disabled="PARTSPROCURE_EDITORDETAIL_REMARKS_INQUIRYBUYER"></iInput>
						<!-- partsprocure.PARTSPROCURETRANSFER -->
				</div>


				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ language('LK_LINIEBEIZHU','Linie备注') }}</span>
					</p>
					<iInput :disabled="disabled" type="textarea" rows="8" resize="none" v-model="vmdetailData.linieMemo" v-permission.disabled="PARTSPROCURE_EDITORDETAIL_REMARKS_LINIENOTES"></iInput>
				</div>


				
				<div v-permission.auto="PARTSPROCURE_EDITORDETAIL_REMARKS_AEKOMANAGER|aeko管理员备注">
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ language('LK_AEKO_GUANLIYUANBEIZHU','aeko管理员备注') }}</span>
					</p>
					<iInput :disabled="disabled" type="textarea" rows="8" resize="none" v-model="vmdetailData.aekoManagerMemo" ></iInput>
				</div>

				
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ language('LK_CS_1BEIZHU','CS*1备注') }}</span>
					</p>
					<iInput :disabled="disabled" type="textarea" rows="8" resize="none" v-model="vmdetailData.cs1Memo"  v-permission.disabled="PARTSPROCURE_EDITORDETAIL_REMARKS_CS1REMARKS"></iInput>
				</div>
				<!-- 保存 -->
				<span class="save">
					<iButton v-if="!disabled" @click="save" v-permission="PARTSPROCURE_EDITORDETAIL_REMARKS_SAVE">{{ language('LK_BAOCUN','保存') }}
					</iButton>
				</span>

				<!-- AEKO管理员-保存 -->
				<span class="save">
					<iButton v-if="!disabled" @click="save" v-permission.auto="PARTSPROCURE_EDITORDETAIL_REMARKS_SAVE_AEKO_MANGE|保存-AEKO管理员">{{ language('LK_BAOCUN','保存') }}
					</iButton>
				</span>
			</div>
			<!-- <div class="list flex-between-center margin-bottom40">
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ $t('LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU') }}</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.csfMeetMemo"
						v-permission="PARTSPROCURE_EDITORDETAIL_REMARKS_REMARKSMEETING"></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ $t('LK_LINIESHANGHUIBEIZHU') }}</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.linieMeetMemo" disabled
						v-permission="PARTSPROCURE_EDITORDETAIL_REMARKS_LINIEMEETINGNOTES"></iInput>
				</div>
				<div>
					<p>
						<icon symbol name="iconbeizhuxinxi"></icon>
						<span>{{ $t('LK_CS_1SHANGHUIBEIZHU') }}</span>
					</p>
					<iInput type="textarea" rows="8" resize="none" v-model="detailData.cs1MeetMemo" disabled></iInput>
				</div>
			</div> -->
		</iCard>
	</div>
</template>

<script>
	import {
		updateProcure
	} from "@/api/partsprocure/home";
	import {
		iCard,
		icon,
		iInput,
		iButton,
		iMessage
	} from 'rise';

	export default {
		components: {
			iCard,
			icon,
			iInput,
			iButton,
		},
		data() {
			return {
				vmdetailData:{},
				diologChangeItems:false,
				isAeko:false,
			};
		},
		inject:['detailData', 'getDisabled'],
		computed: {
			disabled() {
				return this.getDisabled()
			}
		},
		created() {
			this.vmdetailData = this.detailData();
		},
		methods: {
			//修改详情里面备注。
			save(val) {
				this.diologChangeItems = true
				updateProcure({...this.detailData(),...{
					csfMemo: this.vmdetailData.csfMemo,
					csfMeetMemo: this.vmdetailData.csfMeetMemo,
					aekoManagerMemo:this.vmdetailData.aekoManagerMemo
					}})
					.then((res) => {
						if (res.data) {
							iMessage.success(this.language('LK_XIUGAICHENGGONG','修改成功'))
						} else {
							iMessage.error(res.desZh);
						}
						this.diologChangeItems = false;
					})
					.catch(() => {
						this.diologChangeItems = false;
					});
			},
		},
	};
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
