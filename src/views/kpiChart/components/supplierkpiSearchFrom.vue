<template>
    <div>
        <iPage>
            <div class="head">
                <div class="head-left">
                    <div class="bottom-underline">
                        <div class="tittle">基数</div>
                        <el-form class="addUser-form">
                            <el-row :gutter="30">  
                                <el-col :span="6">
                                    <iFormItem
                                    label="科室(股)"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect 
                                    v-model="formData.spiBaseDTO.existShareIdList" 
                                    :placeholder="$t('partsignLanguage.QingXuanZe')"
                                    @change="handlechangeSeccoStock('base',$event)"
                                    multiple
                                    collapse-tags>
                                        <el-option 
                                        v-for="(x,index) in Relationship"
                                         :value='x.existShareId' 
                                         :label='x.existShareName'
                                         :key="index"></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                             
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">地区</div>
                                    <div class="TOCaseArea">
                                        <el-cascader 
                                        v-model="baseAreaVmodel"
                                        :props="props"
                                        @change="handleBaseChangeArea($event)"
                                        :clearable="true"
                                        collapse-tags ></el-cascader>
                                    </div>
                                </el-col>
                             
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">起止年份</div>
                                    <div class="TOCase">
                                    <el-date-picker
                                    v-model="startyear"
                                    type="year"
                                    @change="startChangeBase"
                                    format="yyyy"
                                    value-format="yyyy"
                                    >
                                    </el-date-picker>
                                    <span>-</span>
                                    <el-date-picker
                                    v-model="endyear"
                                    type="year"
                                    format="yyyy"
                                    value-format="yyyy"
                                    @change="endChangeBase"
                                    >
                                    </el-date-picker>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">TO量级（元）</div>
                                    <div class="TOCase">
                                    <iInput
                                        placeholder="请输入"
                                        v-model="formData.spiBaseDTO.toAmountStart"
                                        @input="formData.spiSupplierDTO.toAmountStart=formData.spiBaseDTO.toAmountStart,supplierStart=formData.spiBaseDTO.toAmountStart"
                                    ></iInput>
                                    <span>-</span>
                                    <iInput
                                        placeholder="请输入"
                                        v-model="formData.spiBaseDTO.toAmountEnd"
                                         @input="formData.spiSupplierDTO.toAmountEnd=formData.spiBaseDTO.toAmountEnd,supplierEnd=formData.spiBaseDTO.toAmountEnd"
                                    ></iInput>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>  
                    </div>

                    <div>
                        <div class="tittle">供应商</div>
                        <el-form class="addUser-form">
                            <el-row :gutter="30">  
                                <el-col :span="6">
                                    <iFormItem
                                    label="科室(股)"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect 
                                    v-model="formData.spiSupplierDTO.existShareIdList" 
                                    :placeholder="$t('partsignLanguage.QingXuanZe')"
                                    @change="handlechangeSeccoStock('supplier',$event)"
                                     multiple
                                    collapse-tags>
                                        <el-option 
                                        v-for="(x,index) in supplierSeccoStockOption"
                                         :value='x.existShareId' 
                                         :label='x.existShareName'
                                         :key="index"></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                           
                                <el-col :span="6">
                                    <!-- <div style="margin-bottom:10px;margin-top:10px;">地区</div> -->
                                    <!-- <div class="TOCaseArea">
                                        <el-cascader 
                                        v-model="baseSupplierVmodel"
                                        :props="props"
                                        @change="handleSupplierChangeArea($event)"
                                        :clearable="true"
                                        collapse-tags ></el-cascader>
                                    </div> -->
                                    <iFormItem
                                    label="地区"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect 
                                    v-model="formData.spiSupplierDTO.cityCodeList" 
                                    :placeholder="$t('partsignLanguage.QingXuanZe')"
                                    @change="handlechangeSeccoStock('supplier',$event)"
                                     multiple
                                    collapse-tags>
                                        <el-option 
                                        v-for="(x,index) in supplierSeccoStockOption"
                                         :value='x.existShareId' 
                                         :label='x.existShareName'
                                         :key="index"></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="材料组"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect 
                                    v-model="formData.spiSupplierDTO.categoryCodeList" 
                                    multiple
                                    collapse-tags
                                    @change="materialValue"
                                    :multiple-limit="5"
                                    :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option 
                                        v-for="(x,index) in material"
                                        :value='x.categoryId' 
                                        :key="index"
                                        :label='x.categoryName'></el-option>
                                    </iSelect>
                                   
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="工艺组"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                     <iSelect 
                                     v-model="formData.spiSupplierDTO.stuffCodeList" 
                                     multiple
                                    collapse-tags
                                     :multiple-limit="5"
                                     :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option 
                                        v-for="(x,index) in StuffByCategory" 
                                        :value='x.stuffCode' 
                                        :label='x.stuffName'
                                        :key="index"></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">  
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">起止年份</div>
                                    <div class="TOCase">
                                    <el-date-picker
                                    v-model="startyear"
                                    type="year"
                                    @change="startchange"
                                    format="yyyy"
                                    value-format="yyyy"
                                    >
                                    </el-date-picker>
                                    <span>-</span>
                                    <el-date-picker
                                    v-model="endyear"
                                    type="year"
                                    format="yyyy"
                                    @change="endchange"
                                    value-format="yyyy"
                                    >
                                    </el-date-picker>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">TO量级（元）</div>
                                    <div class="TOCase">
                                    <iInput
                                        placeholder="请输入"
                                        v-model="supplierStart"
                                        @change="handleToStart"
                                    ></iInput>
                                    <span>-</span>
                                    <iInput
                                        placeholder="请输入"
                                        v-model="supplierEnd"
                                        @change="handleToEnd"
                                    ></iInput>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div style="margin-top:35px;float: right;">
                                    <iButton @click="handleRest">重置</iButton>
                                    <iButton @click="handleOk">确认</iButton></div>
                                </el-col>
                            </el-row>
                        </el-form>  
                    </div>
                </div>
            </div>
        </iPage>
    </div>
</template>

<script>
import {iButton,iPage,iCard,iFormItem,iInput,iSelect,iDatePicker} from 'rise'
import {getMaterialGroupByUserIds,spiTotalScore,getRelationship,getStuffByCategory,getLine,getTO} from '@/api/kpiChart'
import { getCityInfo } from "@/api/partsrfq/supplyChainOverall";
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iFormItem,
        iInput,
        iSelect,
        iDatePicker,
        iInput
    },
    data(){
        return {
            supplierStart:'',
            supplierEnd:'',
           baseAreaVmodel:[],
           partyOrganId:[],
           formData:{
               spiBaseDTO:{
                   cityCodeList:[],
                   yearList:[],
                   existShareIdList:[]
               },
               spiSupplierDTO:{
                   yearList:[],
                   existShareIdList:[]
               }
           },
           material:[],
            Relationship:[],
            exisList:[],
            StuffByCategory:[],
            startyear:null,
            endyear:null,
            getCityid:"-1",
            props: {
                lazy: true,
                multiple: true,
                checkStrictly:true,
                lazyLoad (node, resolve) {
                    const { level } = node;
                    setTimeout(() => {
                        if(level==0){
                            getCityInfo({parentCityId:"-1"}).then(res=>{
                                const country = res.data.map(val=>({
                                    value: val.cityId,
                                    label: val.cityNameCn,
                                    leaf: level >= 2
                                }))
                                resolve(country)
                            })
                        }
                        if(level==1){
                            console.log(level)
                            getCityInfo({parentCityId:node.value}).then(res=>{
                                const province = res.data.map(val=>({
                                    value: val.cityId,
                                    label: val.cityNameCn,
                                    leaf: level >= 2
                                }))
                                resolve(province)
                            })
                        }
                        if(level==2){
                           getCityInfo({parentCityId:node.value}).then(res=>{
                               console.log(res)
                                const city = res.data.map(val=>({
                                    value: val.cityId,
                                    label: val.cityNameCn,
                                    leaf: level >= 2

                                }))
                                resolve(city)
                            })
                        }
                        }, 200);
                    }
                },
            supplierSeccoStockOption:[],
        }
    },
    created(){
        // 初始化国家
        getCityInfo({parentCityId:this.getCityid}).then(res=>{
            console.log(res)
            this.areaOptions=res.data.map(x=>{
                return {...x,
                label:x.cityNameCn,
                value:x.cityId,
                children:[]}})
        })
    },
    mounted(){
       this.getMaterialGroupByUserIds()
       this.getRelationship()
       this.getStuffByCategory()
    },
    methods:{
        // 查询材料组
        getMaterialGroupByUserIds(){
            getMaterialGroupByUserIds({}).then(res=>{
                if(res.code==="200"){
                        this.material=res.data
                }
            })
        },
         //基数地区
        handleBaseChangeArea(e,b){
            
            if(e.length<6){
                this.baseAreaVmodel=e
            }else{
                this.baseAreaVmodel=e.slice(0,5)
                this.$message({
                message: '最多选择5条数据',
                type: 'warning'
                });
            }
            if(this.baseAreaVmodel.length>0){
                this.formData.spiBaseDTO.cityCodeList=[]
                this.baseAreaVmodel.forEach(x=>{
                    this.formData.spiBaseDTO.cityCodeList.push(x[2])
                })
                this.formData.spiBaseDTO.cityCodeList=this.formData.spiBaseDTO.cityCodeList.map(String)
            }
            //this.baseSupplierVmodel=JSON.parse(JSON.stringify(this.baseAreaVmodel))
            console.log(this.baseAreaVmodel,this.formData.spiBaseDTO.cityCodeList)
        },
        //供应商地区
        handleSupplierChangeArea(){
             //this.baseSupplierVmodel
        },
        // 科股
        getRelationship(){
            getRelationship({}).then(res=>{
                this.Relationship=res.data
            })
        },
        // 工艺组
        getStuffByCategory(){
            getStuffByCategory({}).then(res=>{
                this.StuffByCategory=res.data
            })
        },
        handlechange(){
            this.formData.spiSupplierDTO.existShareIdList=this.exisList
            this.formData.spiBaseDTO.existShareIdList=this.exisList
        },
        startchange(){
            
        },
        endchange(){
            let start = parseInt(this.startyear)
            let end = parseInt(this.endyear)
            if(!this.startyear){
                this.$message.error('请先选择开始日期');
            }
            if(end-start>5){
                 this.$message.error('时间间隔不能大于五年');
            }
            if(this.startyear && end-start<5){
                let arr = end-start
                let year = []
                for (let i = 1; i < arr+1; i++) {
                   year.push(start+i)                  
                }
                year=year.map(String)
                this.formData.spiBaseDTO.yearList =   year 
                this.formData.spiSupplierDTO.yearList = year
            }

        },
        //科股监听
        handlechangeSeccoStock(str,val){
            if(str=="base" && val.length>0){
                this.supplierSeccoStockOption=[]
                val.forEach(x=>{
                  let fdx =this.Relationship.filter(y=>{return y.existShareId==x})
                  this.supplierSeccoStockOption=this.supplierSeccoStockOption.concat(fdx)
                })
            }
            if(str=="base" && val.length==0){
                debu
                this.supplierSeccoStockOption=[]
            }
        },
        handleOk(){
            getLine(this.formData).then(res=>{
                this.$emit("chartData",res.data)
            })
        },
        handleRest(){
            this.formData={
               spiBaseDTO:{
                   cityCodeList:[],
                   yearList:[],
                   existShareIdList:[]
               },
               spiSupplierDTO:{
                   yearList:[],
                   existShareIdList:[]
               }
           }
           this.startyear=null
           this.endyear=null
           this.baseAreaVmodel=[]
        },
        // base 开始日期
        startChangeBase(e){
            console.log(e)
        },
        endChangeBase(e){
            console.log(e)
        },
        // 供应商to量级
        handleToStart(x){
            if(x<this.formData.spiBaseDTO.toAmountStart){
                this.$message({
                    type:'warning',
                    message:'不能小于基数开始金额'
                })
                this.formData.spiSupplierDTO.toAmountStart=this.formData.spiBaseDTO.toAmountStart
                this.supplierStart=this.formData.spiBaseDTO.toAmountStart
            }
        },
        handleToEnd(x){
            if(x>this.formData.spiBaseDTO.toAmountEnd){
                this.$message({
                    type:'warning',
                    message:'不能大于基数结束金额'
                })
                this.formData.spiSupplierDTO.toAmountEnd=this.formData.spiBaseDTO.toAmountEnd
                this.supplierEnd=this.formData.spiBaseDTO.toAmountEnd
            }
        }
    }
}
</script>

<style lang="scss" scoped>
   .head{
       width: 100%;
       background-color: #fff;
       .tittle{
           font-weight: bold;
           font-size: 18px;
           position: relative;
       }
   }
   ::v-deep.TOCase{
        display: flex;
        justify-content: space-between;
        align-items: center;
   }
   .TOCaseArea{
       position: relative;
        .el-cascader-panel {
            height: 200px;
        }
   }
   .bottom-underline{
       border-bottom: 1px solid #E3E3E3;
       margin-bottom: 20px;
       padding-bottom: 10px;
   }
   .el-cascader{
       width: 100%;
   }
  
</style>