<template>
	<div class="page-content" v-permission.auto="AEKOYUQIBAOBIAO|逾期BI报表">
		<iCard id='powerBiReport'>
			
		</iCard>
	</div>
</template>

<script>
	import {iPage,iCard} from 'rise';
	import {statement} from '@/api/aeko/approve'
	import * as pbi from 'powerbi-client';
	export default {
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
		computed:{
			...Vuex.mapState({
					whiteBtnList: state => state.permission.whiteBtnList,
			})
		},
		created() {
			// 没有逾期报表查看权限，调整状态跟踪
			if(!this.whiteBtnList['AEKOYUQIBAOBIAO']){
        this.$router.push({
          path: '/aeko/report/statetrack',
          query: {},
        })
			}else{
				this.powerBiUrl()
			}
		},
		methods: {
			// 获取财报iframeurl
			powerBiUrl() {
				let params = {
					workspaceId: process.env.NODE_ENV == 'production' ? 'c272ae69-a6b4-4407-bd0e-f67953de36ce' : '876776a9-f959-442e-a011-b4bade0dd862', 
					reportId: process.env.NODE_ENV == 'production' ? '63648f3c-772a-49a0-9d86-94ad472b5b1b' : '6087b0b2-cdd2-40c5-9290-40a7fd2eba36' 
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
            pageName: 'ReportSectionae991d05cd104ed2c639',
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
									visible: true
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
