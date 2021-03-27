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
				<span class="title">物流标准</span>
			</div>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="INBOUND物流方式1" name="test">
					<i-text>{{dataInfo.supplyType}}</i-text>
				</iFormItem>
				<iFormItem label="负责人" name="test">

					<i-text>{{dataInfo.direcorId}}</i-text>
				</iFormItem>
				<iFormItem label="ZP" name="test">

					<i-text>{{dataInfo.zp}}</i-text>
				</iFormItem>
				<iFormItem label="特殊零件类型" name="test">

					<i-text>{{dataInfo.specialPartType}}</i-text>
				</iFormItem>
			</iFormGroup>
		</iCard>
		<iCard class="margin-top20">
			<div class="header">
				<span class="title">参考包装</span>
			</div>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="包装负责人" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.direcorId}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="入场包装名称" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="入库器具长（mm）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesLength}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具宽（mm）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesWidth}}</i-text>
				</iFormItem>
				<iFormItem label="参考包装宽（mm）" name="test">

					<i-text>{{dataInfo.referencePackageWidth}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具装箱数" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesCount}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="入库器具型号" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesModel}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具类型" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesType}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具综合单价（RMB）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingPerAppliancesPrice}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具租金（RMB/DAY）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesRent}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="入库包装毛重（KG）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesGrossWeight}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具返程折叠比" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesFoldingReturnRatio}}</i-text>
				</iFormItem>
				<iFormItem label="入库器具寿命" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesLife}}</i-text>
				</iFormItem>
				<iFormItem label="入库基础年维修费率" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesAnnualMaintenanceRate}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="箱内周转材料综合价格" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingMaterialComprehensivePrice}}</i-text>
				</iFormItem>
				<iFormItem label="箱内周转材料综合寿命" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingMaterialLife}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="前段包装名称" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.frontPackgeName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="翻箱前器具长（mm）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesLength}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具宽（mm）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesWidth}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具高（mm）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverPackageHeight}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具数" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesCount}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="翻箱前器具号" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesModel}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具类型" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesType}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具综合单价（RMB）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverPerAppliancesPrice}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具租金（RMB/DAY）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesRent}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem label="翻箱前包装毛重（KG）" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesGrossWeight}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具返程折叠比" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesFoldingReturnRatio}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前器具寿命" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesLife}}</i-text>
				</iFormItem>
				<iFormItem label="翻箱前基础年维修率" name="test">

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
						frontPackgeName:"",
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
			console.log(this.infoItem);
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
					if (res.data.partLogisticRequirementVO) {
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
