<template>
	<div class="page-content" v-permission.auto="ZHUANGTAIGENZONGBAOBIAO|状态跟踪报表">
		<iCard id='powerBiReport'></iCard>
	</div>
</template>

<script>
	import {iPage,iCard} from 'rise';
	import {statement} from '@/api/aeko/approve'
	import * as pbi from 'powerbi-client';
import { roleMixins } from "@/utils/roleMixins";
	export default {
		mixins:[roleMixins],
		components: {
			iPage,
			iCard,
		},
		data() {
			return {
				visible: false,
				industry: false,
				url: {
					accessToken: "", //验证token
					embedUrl: "", //报告信息内嵌地址
					tokenExpiry: "", //token过期时间
				},
				report:null,
				filter : {
						$schema: "http://powerbi.com/product/schema#basic",
						target: {
							table: "app_supplier_fin_analysis_sum_nt_daily",
							column: "subject_name"
						},
						operator: "In",
						values: [],//[this.name],// values
						requireSingleSelection: true,
						filterType: pbi.models.FilterType.BasicFilter
					},
				values:[]
			}
		},
		created() {
			this.powerBiUrl()
		},
		methods: {
			// 获取财报iframeurl
			powerBiUrl() {
				// 生产环境: production
				console.log(process.env.NODE_ENV);
				let params = {
					// 生产环境
					// workspaceId:	'c272ae69-a6b4-4407-bd0e-f67953de36ce',
					// reportId:	'bfa0fc3a-f12a-48e4-94ca-2e042f6ef542',
					// datasetId:	['980a894e-6ee7-442a-97ad-11abf8aab6a9'],
					// 测试环境
					workspaceId: process.env.NODE_ENV == 'production' ? 'c272ae69-a6b4-4407-bd0e-f67953de36ce' : '876776a9-f959-442e-a011-b4bade0dd862', 
					reportId: process.env.NODE_ENV == 'production' ? 'bfa0fc3a-f12a-48e4-94ca-2e042f6ef542' : '25724165-8d58-4452-a6e3-363facc62d2b',
          datasets:[process.env.NODE_ENV == 'production' ? '980a894e-6ee7-442a-97ad-11abf8aab6a9' : '734b852b-4b5e-4392-b715-3a698a5a7209'],
          username: this.userInfo.id,
          roles:['role'],	// 固定参数，报表端自己判断角色权限
				}
				statement(params).then(res => {
					console.log(res);
					if (res.data) {
						this.url = res.data
						this.renderBi()
					}
				})
			},
			renderBi() {
				try {
					var permissions = pbi.models.Permissions.All
					var config = {
						type: 'report',
						tokenType: pbi.models.TokenType.Embed,
						accessToken: this.url.accessToken,
						embedUrl: this.url.embedUrl,
            // pageName: 'ReportSectionae991d05cd104ed2c639',
						// id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
						/*pageName: 'ReportSectioneb8c865100f8508cc533',
						visualName: '47eb6c0240defd498d4b',
						permissions: permissions,*/
						settings: {
							panes: {
								filters: {
									visible: false
								},
								pageNavigation: {
									visible: false
								}
							}
						}
					};
					let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
					var reportContainer = document.getElementById('powerBiReport');
					var report = powerbi.embed(reportContainer, config);
					// Report.off removes a given event handler if it exists.
					report.off("loaded");
					
					this.report=report
				} catch (e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-content{
		height: 100%;
		width: 100%;
	}
	.title {
		font-weight: bold;
		font-size: 20px;
		color: $color-black;
		margin-bottom: 20px;
	}

	#powerBiReport {
		width: 100%;
		height: 100%;
		iframe {
			border: 0px !important;
			overflow: auto;
		}
	}
</style>
<style>
iframe {
	border: 0px !important;
}
</style>
