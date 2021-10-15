<!--
 * @author: shujie
 * @createTime: 2021-5-25 15:30:50
 * @Description:财报分析
 -->
<template>
	<div>
<!--    <div>-->
<!--      <span @click="toZH">中文 </span>-->
<!--      <span @click="toEN"> 英文</span>-->
<!--    </div>-->
		<!-- v-permission="TOOLING_PAYMENTPLAN_PAYMENTBOARD" -->
		<iPage class="page-content" v-permission="TOOLING_PAYMENTPLAN_PAYMENTBOARD">
			<iCard id='powerBi'>
				
			</iCard>
		</iPage>
	</div>
	
</template>

<script>
	import {iPage,iCard,iButton} from 'rise';
	import changeItem from './changeItem';
	import {powerBiUrl,averageName,supplierName} from "@/api/ws2/investmentAdmin/payBlock";
	import * as pbi from 'powerbi-client';
  import store from "@/store";
	export default {
		components: {iPage,iCard},
		data() {
			return {
				visible: false,
				industry: false,
				url: {
					accessToken: "", //验证token
					embedUrl: "", //报告信息内嵌地址
					tokenExpiry: "", //token过期时间
				},
				supplierNameData:[],//供应商名称
				averageNameData:[],//行业均值
				report:null,
				name:'',
				filter : {
						$schema: "http://powerbi.com/product/schema#basic",
						target: {
							table: "app_supplier_fin_analysis_sum_nt_daily",
							column: "subject_name"
						},
						operator: "In",
						values: [],//[this.name],// values
						filterType: null,
						requireSingleSelection: true
					},
				values:[]
			}
		},
		mounted() {
			if (this.$route.query.name) {
				this.name = this.$route.query.name;
			}
			this.filter={...this.filter,filterType:pbi.models.FilterType.BasicFilter},
			this.powerBiUrl()
		},
		methods: {
      toZH(){
        store.state.investmentAdmin.report.setPage(process.env.VUE_APP_CHANGELANG_POWERBI_CODE_ZH);
      },
      toEN(){
        store.state.investmentAdmin.report.setPage(process.env.VUE_APP_CHANGELANG_POWERBI_CODE_EN);
      },
			// 打开呈现对象弹窗
			openVisible() {
				this.visible = true
			},
			// 打开行业均值弹窗
			openIndustry() {
				this.industry = true
			},
			// 呈现对象确认
			sureChangeItems(data) {
				this.visible = false
				this.values= [...this.values,...data.map((v)=>v.nameZh)]
				let newfilter = window._.cloneDeep(this.filter);
				newfilter.values=this.values
				this.report.setFilters([newfilter])
				// this.report.updateFilters(pbi.models.FiltersOperations.Add, [filter]);
			},
			// 加入行业均值
			sureIndustryChangeItems(data) {
				this.industry = false
				console.log(data);
				this.values= [...this.values,data.industryName]
				let newfilter = window._.cloneDeep(this.filter);

				newfilter.values=this.values
				console.log(newfilter);

				this.report.setFilters([newfilter])
			},
			
			//维护行业均值
			onJumpIndustryAverage() {
				this.$router.push('/supplier/frmrating/depthRating/industryAverage')
			},
			// 获取财报iframeurl
			powerBiUrl() {
				powerBiUrl().then(res => {
					if (res.data) {
						this.url = res.data
						this.renderBi()
					}
				})
			},
			// 初始化页面
			renderBi() {
				var permissions = pbi.models.Permissions.All
				let pageName = localStorage.getItem('lang') == 'zh' ? process.env.VUE_APP_CHANGELANG_POWERBI_CODE_ZH : process.env.VUE_APP_CHANGELANG_POWERBI_CODE_EN

				var config = {
					type: 'report',
					tokenType: pbi.models.TokenType.Embed,
					accessToken: this.url.accessToken,
					embedUrl: this.url.embedUrl,
					// id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
					pageName: pageName,
					/*visualName: '47eb6c0240defd498d4b',
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
				var reportContainer = document.getElementById('powerBi');
				var report = powerbi.embed(reportContainer, config);
        this.$store.commit('SET_report', report);

				// Report.off removes a given event handler if it exists.
				report.off("loaded");

				// Report.on will add an event handler which prints to Log window.
				const name = this.name
				const newfilter = window._.cloneDeep(this.filter);
				newfilter.values=[name]
				this.values=[name]
				report.on("loaded", function() {
					console.log("Loaded");
					if(name!==''){
						report.setFilters([newfilter])
					// report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
				}
				});

				// Report.off removes a given event handler if it exists.
				report.off("rendered");

				// Report.on will add an event handler which prints to Log window.
				report.on("rendered", async function() {
				// 	console.log("Rendered");
				// 	//获取所有页面
				// 	const pages = await report.getPages();
				// 	let page = pages.filter(function (page) {
				// 			return page.isActive
				// 	})[0];
        //
				// 	//获取所有视觉对象
				// 	const visuals = await page.getVisuals();
				// 	//获取单个视觉对象
				// 	var visual = visuals.filter(async function (visual) {
				// 		//56e2a71da3229e40e713
				// 		if(visual.name == "56e2a71da3229e40e713"){
				// 			console.log("表格："+visual.title);
				// 			//导出某个视觉对象的数据
				// 			var result =await visual.exportData(pbi.models.ExportDataType.Summarized);
				// 			console.log(result.data);
        //
        //
				// 	    var newSettings = {
				// 				commands: [
				// 						{
				// 							/**
				// 								spotlight: {
				// 										displayOption: models.CommandDisplayOption.Hidden
				// 								},
				// 								drill: {
				// 										displayOption: models.CommandDisplayOption.Hidden
				// 								},
				// 								*/
				// 								exportData: {
				// 									displayOption: pbi.models.CommandDisplayOption.Enabled
				// 								}
				// 						}
				// 				]
				// 			};
				//     	report.updateSettings(newSettings);
				// 	  }else{
        //
				// 			var newSettings = {
				// 						commands: [
				// 								{
				// 									/**
				// 										spotlight: {
				// 												displayOption: models.CommandDisplayOption.Hidden
				// 										},
				// 										drill: {
				// 												displayOption: models.CommandDisplayOption.Hidden
				// 										},
				// 										*/
				// 										exportData: {
				// 											displayOption: pbi.models.CommandDisplayOption.Hidden
				// 										}
				// 								}
				// 						]
				// 			};
				// 			report.updateSettings(newSettings);
				// 	  }
        //
				// 		return visual.title === "表格";
				// })[0];



						console.log("报表渲染事件");
				});
				report.off("filtersApplied")
				
				report.on("filtersApplied", function() {
					console.log("filtersApplied");
				});

				report.on("error", function(event) {
					console.log(event.detail);
					report.off("error");
				});

				report.off("saved");
				report.on("saved", function(event) {
					console.log(event.detail);
					if (event.detail.saveAs) {
						console.log(
							'In order to interact with the new report, create a new token and load the new report'
							);
					}
				});

				this.report=report
				
			},
		},

    watch: {
      '$store.state.permission.language': (val) => {
        if(val === 'zh'){
          store.state.investmentAdmin.report.setPage(process.env.VUE_APP_CHANGELANG_POWERBI_CODE_ZH);
        } else {
          store.state.investmentAdmin.report.setPage(process.env.VUE_APP_CHANGELANG_POWERBI_CODE_EN);
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
.page-content{
  padding: 20px 0 0 0 !important;
}
	.title {
		font-weight: bold;
		font-size: 20px;
		color: $color-black;
		margin-bottom: 20px;
	}

	#powerBi {
		width: 100%;
		height: calc(100vh - 190px);
	}
</style>
