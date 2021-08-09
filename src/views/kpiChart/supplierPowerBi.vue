<template>
  <div>
      <iPage>
          <iCard>
               <div class="imgkpi-head">
               <el-form>
                <el-form-item
                  class="SearchOption"
                >
                <iInput 
                suffix-icon="el-icon-search"
                v-model="supplierName"
                @select="handleSelect"
                ></iInput>
                </el-form-item>
               </el-form>
               <div>
                   <iButton>{{language('QUEREN','确认')}}</iButton>
                   <iButton>{{language('CHONGZHI','重置')}}</iButton>
               </div>
               </div>
           </iCard>
           <iCard id="powerBi"></iCard>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect,iTableCustom} from 'rise'
import * as pbi from 'powerbi-client';
import { getPowerBiKpi,getPowerBiSupplier } from '@/api/kpiChart'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
    },
    data(){
        return {
            formData:{
                deptId:''
            },
            config:{},
            reportContainer:null,
            report:null,
            supplierName:"公司",
            configApiData:{},
            company:[]
        }
    },
    created(){
         getPowerBiKpi({}).then(res=>{
            this.configApiData={...res.data}
        })
        getPowerBiSupplier({keyWord:"1234"}).then(res=>{
            this.company=this.data
        })
    },
    mounted(){
        console.log(this.configApiData.embedUrl)
        this.init()
        this.renderBi()

    },
    methods:{
        // 初始化配置
			init(){
				this.permissions = pbi.models.Permissions.All
				this.config = {
                    type: 'report',
					tokenType: pbi.models.TokenType.Embed,
                    embedUrl:this.configApiData.embedUrl,
                    accessToken:this.configApiData.accessToken,
					workspaceid:'876776a9-f959-442e-a011-b4bade0dd862',
                    reportid:'437fd85e-323d-48b6-aedd-de8d63ce6f37',
                    pageName:'ReportSection680575c9e561c8d8bd83',
				};
				this.reportContainer = document.getElementById('powerBi');
				this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
			},
        renderBi() {
				var report = this.powerbi.embed(this.reportContainer, this.config);

				// Report.off removes a given event handler if it exists.
				report.off("loaded");

				// Report.on will add an event handler which prints to Log window.
				// const name = this.name
				// const newfilter = window._.cloneDeep(this.filter);
				// newfilter.values=[name]
				// this.values=[name]
				// console.log(newfilter);
				// report.on("loaded", ()=> {
				// 	console.log("Loaded");
				// 	// if(name==""){
				// 		// newfilter.values=[]
				// 	// report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
				// 	// }
				// 	report.setFilters([newfilter])
				// });

				// Report.off removes a given event handler if it exists.
				report.off("rendered");

				// Report.on will add an event handler which prints to Log window.
				report.on("rendered", function() {
					console.log("Rendered");
				});
				// report.off("filtersApplied")
				
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
            querySearchAsync(queryString, cb) {
                    var restaurants = this.restaurants;
                    var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                    cb(results);
                    }, 3000 * Math.random());
                },
                createStateFilter(queryString) {
                    return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
            handleSelect(item) {
                console.log(item);
            },

    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
</style>