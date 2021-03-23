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
			<iFormGroup row="4" icon inline>
				<iFormItem label="供货方式" name="test">
					<iText>
						{{infoDetail.supplyType}}
					</iText>
				</iFormItem>
				<iFormItem label="负责人" name="test">
					<iText>
						{{infoDetail.direcorId}}
					</iText>
				</iFormItem>
			</iFormGroup>
		</iCard>
		<iCard class="margin-top20">
			<div class="header">
				<span class="title">参考包装</span>
			</div>
			<iFormGroup row="4" icon inline>
				<iFormItem label="参考包装长(mm)" name="test">
					<iText>
						{{infoDetail.referencePackageLength}}
					</iText>
				</iFormItem>
				<iFormItem label="参考包装宽(mm)" name="test">
					<iText>
						{{infoDetailreferencePackageWidth}}
					</iText>
				</iFormItem>
				<iFormItem label="参考包装高(mm)" name="test">
					<iText>
						{{infoDetail.referencePackageHeight}}
					</iText>
				</iFormItem>
				<iFormItem label="装箱数" name="test">
					<iText>
						{{infoDetail.packingCount}}
					</iText>
				</iFormItem>
				<iFormItem label="参考车型" name="test">
					<iText>
						{{infoDetail.referenceCarType}}
					</iText>
				</iFormItem>
				<iFormItem label="参考零件号" name="test">
					<iText>
						{{infoDetail.referencePartNum}}
					</iText>
				</iFormItem>
				<iFormItem label="参考零件名" name="test">
					<iText>
						{{infoDetail.referencePartName}}
					</iText>
				</iFormItem>
				<iFormItem label="参考包装器具类型" name="test">
					<iText>
						{{infoDetail.referenceAppliancesType}}
					</iText>
				</iFormItem>
				<iFormItem label="毛重(KG)" name="test">
					<iText>
						{{infoDetail.grossWeight}}
					</iText>
				</iFormItem>
				<iFormItem label="参考包装单价(元)" name="test">
					<iText>
						{{infoDetail.referencePerPackagePrice}}
					</iText>
				</iFormItem>
			</iFormGroup>
		</iCard>
		<iCard class="margin-top20">
			<div class="header">
				<span class="title">SAIC VOLKSWAGEN库存_小时</span>
			</div>
			<iFormGroup row="4" icon inline>
				<iFormItem label="SAIC VOLKSWAGEN库存_小时" name="test">
					<iText>
						{{infoDetail.stockHours}}
					</iText>
				</iFormItem>
				<iFormItem label="SAIC VOLKSWAGEN空箱操作_小时" name="test">
					<iText>
						{{infoDetail.emptycaseHours}}
					</iText>
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
				infoDetail:{},//物流详情
			};
		},
		created() {
			this.getLogistics()
		},
		props:{
			infoItem:{
				type:Object,
				default:()=>{}
			}
		},
		methods: {
			// 获取物流信息
			getLogistics() {
				console.log(this.infoItem);
				let otherInfoPackage = {
					findType:'02',
					partNum: this.infoItem.partNum,
					rfqId: this.infoItem.rfqId,
					rfqPlanId: this.infoItem.fsnrGsnrNum,
				}
				getRfqDataList({otherInfoPackage}).then(res=>{
					this.infoDetail=res.data.partLogisticRequirementVO
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
