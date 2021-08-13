<!--
 * @Author: your name
 * @Date: 2021-03-02 16:53:24
 * @LastEditTime: 2021-07-09 15:15:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\logistics\index.vue
-->

<template>
	<div class="logistics">
		<iCard>
			<div class="header">
				<span class="title">{{ language('LK_WULIUBIAOZHUN','物流标准') }}</span>
			</div>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_INBOUNDWULIUFANGSHI','INBOUND物流方式')" name="test">
					<i-text>{{dataInfo.supplyType}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FUZEREN','负责人')" name="test">

					<i-text>{{dataInfo.direcorName}}</i-text>
				</iFormItem>
				<iFormItem label="ZP" name="test">

					<i-text>{{dataInfo.zp}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_TESHULINGJIANLEIXING','特殊零件类型')" name="test">

					<i-text>{{dataInfo.specialPartType}}</i-text>
				</iFormItem>
			</iFormGroup>
		</iCard>
		<iCard class="margin-top20">
			<div class="header">
				<span class="title">{{ language('LK_CANKAOBAOZHUANG','参考包装') }}</span>
			</div>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_BAOZHUANGFUZEREN','包装负责人')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.direcorName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_RUCHANGBAOZHUANGMINGCHENG','入场包装名称')" name="test">
					<i-text>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_RUKUQIJUCHANG','入库器具长（mm）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesLength}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJUKUAN','入库器具宽（mm）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesWidth}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_CANKAOBAOZHUANGKUANMM','参考包装宽（mm）')" name="test">

					<i-text>{{dataInfo.referencePackageWidth}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJUZHUANGXIANGSHU','入库器具装箱数')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesCount}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_RUKUQIJUXINGHAO','入库器具型号')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesModel}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJULEIXING','入库器具类型')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesType}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJUZHONGHEDANJIARMB','入库器具综合单价（RMB）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingPerAppliancesPrice}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJUZUJINRMBDAY','入库器具租金（RMB/DAY）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesRent}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_RUKUBAOZHUANGMAOZHONG','入库包装毛重（KG）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesGrossWeight}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJUFANCHENGSHEDIEBI','入库器具返程折叠比')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesFoldingReturnRatio}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUQIJUSHOUMING','入库器具寿命')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesLife}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_RUKUJICHUNIANWEIXIUFEILV','入库基础年维修费率')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingAppliancesAnnualMaintenanceRate}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE','箱内周转材料综合价格')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingMaterialComprehensivePrice}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING','箱内周转材料综合寿命')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.warehousingMaterialLife}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_QIANDUANBAOZHUANGMINGCHENG','前段包装名称')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUZHANGMM','翻箱前器具长（mm）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesLength}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUKUANMM','翻箱前器具宽（mm）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesWidth}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUGAOMM','翻箱前器具高（mm）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverPackageHeight}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUSHU','翻箱前器具数')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesCount}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUHAO','翻箱前器具号')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesModel}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJULEIXING','翻箱前器具类型')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesType}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUZONGHEDANJIARMB','翻箱前器具综合单价（RMB）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverPerAppliancesPrice}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUZUJINRMBDAY','翻箱前器具租金（RMB/DAY）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesRent}}</i-text>
				</iFormItem>
			</iFormGroup>
			<iFormGroup :row="4" inline icon>
				<iFormItem :label="language('LK_FANXIANGQIANBAOZHUANGMAOZHONGKG','翻箱前包装毛重（KG）')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesGrossWeight}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI','翻箱前器具返程折叠比')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesFoldingReturnRatio}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANQIJUSHOUMING','翻箱前器具寿命')" name="test">

					<i-text>{{dataInfo.partPackgeRequirements.turnoverAppliancesLife}}</i-text>
				</iFormItem>
				<iFormItem :label="language('LK_FANXIANGQIANJICHUNIANWEIXIULÜ','翻箱前基础年维修率')" name="test">

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
	} from 'rise';
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
