<!--
 * @Author: your name
 * @Date: 2021-03-02 16:53:24
 * @LastEditTime: 2021-03-02 17:03:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\logistics\index.vue
-->

<template>
	<div class="logistics">
		<iCard>
			<div class="header">
				<span class="title">{{ $t('LK_WULIUBIAOZHUN') }}</span>
			</div>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_INBOUNDWULIUFANGSHI')" name="test">
					<i-text>{{dataInfo.supplyType}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FUZEREN')" name="test">

					<i-text>{{dataInfo.direcorId}}</i-text>
				</iFormItem>
				<iFormItem label="ZP" name="test">

					<i-text>{{dataInfo.zp}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_TESHULINGJIANLEIXING')" name="test">

					<i-text>{{dataInfo.specialPartType}}</i-text>
				</iFormItem>
			</iFormGroup>
		</iCard>
		<iCard class="margin-top20">
			<div class="header">
				<span class="title">{{ $t('LK_CANKAOBAOZHUANG') }}</span>
			</div>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_BAOZHUANGFUZEREN')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.direcorId}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_RUCHANGBAOZHUANGMINGCHENG')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_RUKUQIJUCHANG')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesLength}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJUKUAN')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesWidth}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_CANKAOBAOZHUANGKUANMM')" name="test">

					<i-text>{{dataInfo.referencePackageWidth}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJUZHUANGXIANGSHU')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesCount}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_RUKUQIJUXINGHAO')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesModel}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJULEIXING')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesType}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJUZHONGHEDANJIARMB')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingPerAppliancesPrice}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJUZUJINRMBDAY')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesRent}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_RUKUBAOZHUANGMAOZHONG')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesGrossWeight}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJUFANCHENGSHEDIEBI')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesFoldingReturnRatio}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUQIJUSHOUMING')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesLife}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_RUKUJICHUNIANWEIXIUFEILV')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesAnnualMaintenanceRate}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingMaterialComprehensivePrice}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingMaterialLife}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_QIANDUANBAOZHUANGMINGCHENG')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUZHANGMM')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesLength}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUKUANMM')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesWidth}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUGAOMM')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverPackageHeight}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUSHU')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesCount}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUHAO')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesModel}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJULEIXING')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesType}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUZONGHEDANJIARMB')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverPerAppliancesPrice}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUZUJINRMBDAY')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesRent}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="$t('LK_FANXIANGQIANBAOZHUANGMAOZHONGKG')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesGrossWeight}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesFoldingReturnRatio}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANQIJUSHOUMING')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesLife}}</i-text>
				</iFormItem>
				<iFormItem :label="$t('LK_FANXIANGQIANJICHUNIANWEIXIULÜ')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesAnnualMaintenanceRate}}</i-text>
				</iFormItem>
			</iFormGroup>
		</iCard>
	</div>
</template>

<script>
	import {
		iCard,
		iFormGroup,
		iFormItem,
		iText
	} from "@/components";
	import {
		getRfqDataList
	} from "@/api/partsrfq/home";
	export default {
		components: {
			iCard,
			iFormGroup,
			iFormItem,
			iText
		},
		data() {
			return {
				//物流详情
				dataInfo: {
					supplyType:"",
					direcorId:"",
					ZP:"",
					specialPartType:"",
					referencePackageWidth:"",
					partPackgeRequirements:{
						admissionPackgeName:"",
						direcorId:"",
						warehousingAppliancesLength:"",
						warehousingAppliancesWidth:"",
						warehousingAppliancesCount:"",
						warehousingAppliancesModel:"",
						warehousingAppliancesType:"",
						warehousingPerAppliancesPrice:"",
						warehousingAppliancesRent:"",
						warehousingAppliancesGrossWeight:"",
						warehousingAppliancesFoldingReturnRatio:"",
						warehousingAppliancesLife:"",
						warehousingAppliancesAnnualMaintenanceRate:"",
						warehousingMaterialComprehensivePrice:"",
						warehousingMaterialLife:"",
						// admissionPackgeName:"",
						turnoverAppliancesLength:"",
						turnoverAppliancesWidth:"",
						turnoverPackageHeight:"",
						turnoverAppliancesCount:"",
						turnoverAppliancesModel:"",
						turnoverAppliancesType:"",
						turnoverPerAppliancesPrice:"",
						turnoverAppliancesRent:"",
						turnoverAppliancesGrossWeight:"",
						turnoverAppliancesFoldingReturnRatio:"",
						turnoverAppliancesLife:"",
						turnoverAppliancesAnnualMaintenanceRate:""
					},
					
				}, 
			};
		},
		created() {
			this.getLogistics()
			// console.log(this.infoItem);
		},
		props: {
			infoItem: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			// 获取物流信息
			getLogistics() {
				let otherInfoPackage = {
					findType: '09',
					partNum: this.infoItem.partNum,
					rfqId: this.infoItem.rfqId,
					fsGsNum: this.infoItem.fsnrGsnrNum,
				}
				getRfqDataList({
					otherInfoPackage
				}).then(res => {
					if (res.data) {
						this.dataInfo = res.data.partLogisticRequirementVO
					}
				})
			}

		}
	};
</script>

<style scoped="scoped" lang="scss">
	.header {
		margin-bottom: 20px;

		.title {
			font-size: 18px;
			font-weight: bold;
			color: #001847;
		}
	}
</style>
