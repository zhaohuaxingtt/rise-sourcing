<template>
  <div @click.stop="onBlur()">
      <iPage>
          <publicHeaderMenu></publicHeaderMenu>
          <iCard>
               <div class="imgkpi-head">
               <el-form>
                <el-form-item
                  class="SearchOption"
                >
                <div class="select-name-sap">
                <iInput 
                v-model="supplierName" 
                @input="remoteMethod" 
                placeholder="查询供应商名称,SAP号" 
                suffix-icon="el-icon-search"/>
                <div class="options" v-show="isShowOptions">
                    <p 
                    @click="handleSelectOption(x)" 
                    v-for="(x,index) in options" 
                    :key="index">{{x.label}}</p>
                </div>
                </div>
                </el-form-item>
               </el-form>
               <div>
                   <iButton @click="handleOk">{{language('QUEREN','确认')}}</iButton>
                   <iButton @click="handleRest">{{language('CHONGZHI','重置')}}</iButton>
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
import publicHeaderMenu from './commonHeardNav/headerNav'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        publicHeaderMenu
    },
    data(){
        return {
            filter : {
                $schema: "http://powerbi.com/product/schema#basic",
                target: {
                    table: "Fact_01_Supplier_SPI",
                    column: "supplier_id"
                },
                operator: "In",
                values: [],
                filterType: null,
                requireSingleSelection: true
            },
            formData:{
                deptId:''
            },
            config:{},
            reportContainer:null,
            report:null,
            // 阿里巴巴（中国）有限公司
            supplierName:"",
            configApiData:{},
            supplierId:null,
            name:null,
            values:[],
            options:[],
            isShowOptions:false
        }
    },
    mounted(){
       getPowerBiKpi({}).then(res=>{
            this.configApiData={...res.data}
            this.init()
            //this.renderBi()
        })
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
				const name = this.supplierId
				const newfilter = window._.cloneDeep(this.filter);
				newfilter.values=[name]
				this.values=[name]
				console.log(newfilter);
				report.on("loaded", ()=> {
					// console.log("Loaded");
					// if(name==""){
					// 	newfilter.values=[]
					//     report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
					// }
					report.setFilters([newfilter])
				});

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
            handleOk(){
                if(this.supplierId){
                    this.supplierId=this.supplierId.toString()
                    this.renderBi()
                }
            },
            handleRest(){
                this.supplierName=""
                this.supplierId=null
            },
            remoteMethod(){
                this.searchOptions()
            },
            handleSelectOption(x){
                this.supplierId=x.value
                this.supplierName=x.label
                this.isShowOptions=false
            },
            onBlur(){
               this.isShowOptions=false 
            },
            onFocus(){
                this.isShowOptions=true
            },
            searchOptions(){
                getPowerBiSupplier({keyWord:this.supplierName}).then(res=>{
                    if(res.data.length>0){
                        this.isShowOptions=true
                        this.options = res.data.map(z=>({
                            label:z.nameZh,
                            value:z.supplierId,
                            sapCode:z.sapCode
                        }))
                        this.loading = false;
                        this.options = this.options.filter(item => {
                        return item.label.toLowerCase()
                        })
                    }
                })
            }
            
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
    #powerBi{
        margin-top: 20px;
        width: 100%;
        padding: 0 40px;
        height: calc(100vh - 294px);
        overflow-y: auto;
    }
    .select-name-sap{
        position: relative;
        input{
            width: 282px;
            height: 35px;
            background: #FFFFFF;
            box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
            border-radius: 4px;
            border: 1px solid #ACB8CF;
            font-size: 14px;
            padding-left: 10px;
        }
        .options{
            left: 0;
            top: 40px;
            position: absolute;
            min-width: 238px;
            height: 300px;
            background-color: #fff;
            border-radius: 4px;
            z-index: 999;
            border: 1px solid #E0E6ED;
            padding: 10px 0;
            border-radius: 5px;
            overflow-x: auto;
            overflow-y: auto;
            p{
                width: 100%;
                height: 34px;
                padding: 0 30px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            p:hover{
                background-color: #F5F7FA;
                cursor: pointer;
            }
        }
        
    }

</style>