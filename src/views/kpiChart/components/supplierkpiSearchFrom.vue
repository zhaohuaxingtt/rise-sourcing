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
                                        ref="myCascader"
                                        :clearable="true"
                                        collapse-tags ></el-cascader>
                                    </div>
                                </el-col>
                             
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">起止年份</div>
                                    <div class="TOCase">
                                    <el-date-picker
                                    v-model="baseStartYear"
                                    type="year"
                                    @change="startChangeBase"
                                    format="yyyy"
                                    value-format="yyyy"
                                    >
                                    </el-date-picker>
                                    <span>-</span>
                                    <el-date-picker
                                    v-model="baseEndYear"
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
                                         :value='x.value' 
                                         :label='x.label'
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
                                    v-model="supplierStartYear"
                                    type="year"
                                    @change="startChangeSupplier"
                                    format="yyyy"
                                    value-format="yyyy"
                                    >
                                    </el-date-picker>
                                    <span>-</span>
                                    <el-date-picker
                                    v-model="supplierEndYear"
                                    type="year"
                                    format="yyyy"
                                    @change="endChangeSupplier"
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
            supplierEndYear:null,
            supplierStartYear:null,
            baseStartYear:null,
            baseEndYear:null,
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
            option : {
                color: ['#1763F7'],
                tooltip: {
                    trigger: 'item',
                    backgroundColor:'#fff',
                    lineStyle:{
                        color:'#000'
                    },
                    textStyle: {
                        color:'#000'
                    },
                    // formatter:function(params){
                    //     const str = `<div style="padding:10px">
                    //         <div>该分数断下供应商数量:<span style="color:#1763F7">${params.value}家</span></div>
                    //         <div>${params.seriesName}:${params.name}分</div>
                    //     </div>`
                    //     return str
                    // },
                    axisPointer:{//直线指示器
                        type:'none'
                    },
                    extraCssText: 'box-shadow: 0px 3px 10px rgba(27, 29, 33, 0.16);'
                },
                legend: {
                    data:[{
                        name:'',
                        icon:'circle',
                        textStyle: {
                            color: '#1763F7'
                        }
                    }],
                },
                grid: {
                    top: 50,
                    bottom: 20,
                    left:0,
                    right:0,
                    tooltip:{
                        axisPointer:{
                            shadowStyle:{
                                color:'red'
                            } 
                        }
                    }
                },
                xAxis: {
                        type: 'category',
                        splitLine:{
                            show:false//不显示网格线
                        },
                        axisTick: {
                            show:false
                        },
                        splitNumber:10,
                        axisLabel:{
                            interval:1
                        }, 
                        data: ['5', '15', '25', '35', '45', '55', '65', '75', '85', '95']
                   
                },
                yAxis: {
                    show:false,
                    type:'value',
                    name:'该分数段下供应商数量：',
                    min: 0,
                    max: 10,
                },
                series: [
                    {
                        name: '上海汇众汽车有限公司',
                        //symbol: "none",//显示隐藏曲线上的点
                        symbolSize:10,
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [],
                        markLine: {
                            lineStyle: {
                                type:'solid',
                                width: 1,
                                color: '#707070',
                            },
                            silent: true, // 鼠标悬停事件, true悬停不会出现实线
                            symbol: 'none', // 去掉箭头
                            data: [[
                                { coord: ['45', 0] }, // [x第几个（从0开始），y轴起始点 ]
                                { coord: ['45', 10] } // [x第几个（从0开始），y轴起始点 ]
                            ]]
                        },
                        markPoint:{
                             symbol:"circle"
                        }
                    }
                ]
            },
            supplierSeccoStockOption:[],
            props: {
                lazy: true,
                multiple: true,
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
                                const city = res.data.map(val=>({
                                    value: val.cityId,
                                    label: val.cityNameCn,
                                    leaf: level >= 2
                                }))
                                resolve(city)
                            })
                        }
                    })
                }
            }
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
            // 地区数量校验
            // if(e.length<6){
            //     this.baseAreaVmodel=e
            // }else{
            //     this.baseAreaVmodel=e.slice(0,5)
            //     this.$message({
            //     message: '最多选择5条数据',
            //     type: 'warning'
            //     });
            // }
            // if(this.baseAreaVmodel.length>0){
            //     this.formData.spiBaseDTO.cityCodeList=[]
            //     this.baseAreaVmodel.forEach(x=>{
            //         this.formData.spiBaseDTO.cityCodeList.push(x[2])
            //     })
            //     this.formData.spiBaseDTO.cityCodeList=this.formData.spiBaseDTO.cityCodeList.map(String)
            // }
            this.formData.spiBaseDTO.cityCodeList=[]
            this.supplierSeccoStockOption=[]
           if(this.$refs["myCascader"].getCheckedNodes().length>0){
               this.$refs["myCascader"].getCheckedNodes().forEach(x=>{
                   if(x.level==3){
                       this.formData.spiBaseDTO.cityCodeList.push(x.value.toString())
                       this.supplierSeccoStockOption.push({...x,value:x.value.toString()})
                   }
                   
               })
           }else{
               this.supplierSeccoStockOption=[]
               this.formData.spiBaseDTO.cityCodeList=[]
           }
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
           this.supplierStart=null
           this.supplierEnd=null
           this.supplierEndYear=null
           this.supplierStartYear=null
           this.baseStartYear=null
           this.baseEndYear=null
           this.baseAreaVmodel=[]
        },
        // base 开始日期
        startChangeBase(e){
            this.baseEndYear=null
            this.formData.spiBaseDTO.yearList=[]
            this.supplierStartYear=null
            const date = new Date().getFullYear()
            if(e>date || e<date-10){
                this.$message({
                    type:'warning',
                    message:'请选择近十年的时间'
                })
                this.baseStartYear=null
            }else{
                this.supplierStartYear=this.baseStartYear
            }
            
        },
        endChangeBase(e){
             // 未先选择开始时间
            if( this.baseStartYear==null || !this.baseStartYear){
                this.$message({
                    type:'warning',
                    message:'请选择开始时间'
                })
                this.baseEndYear=null
            }else{
                const date = new Date().getFullYear()
                if(e>date || e<date-10){
                    this.$message({
                        type:'warning',
                        message:'请选择近十年的时间'
                    })
                    this.baseEndYear=null
                }else{
                    // 近五年校验
                    console.log(e,Number(this.baseStartYear)+5)
                    if(e>Number(this.baseStartYear)+5){
                        this.$message({
                                type:'warning',
                                message:'请选择近5年的时间'
                            })
                            this.baseEndYear=null
                        return
                    }else{
                    this.supplierEndYear=this.baseEndYear
                    // 基数时间取值
                    let leg = this.baseEndYear - this.baseStartYear
                    this.formData.spiBaseDTO.yearList=[]
                    for (let i = 1; i < leg+1; i++) {
                        this.formData.spiBaseDTO.yearList.push((parseInt(this.baseStartYear)+i).toString())
                    }
                    // 供应商赋值
                    this.formData.spiSupplierDTO.yearList=JSON.parse(JSON.stringify(this.formData.spiBaseDTO.yearList))
                    }
                }
            }
        },
        // supplier 开始日期
        startChangeSupplier(e){
            this.supplierEndYear=null
            this.formData.spiSupplierDTO.yearList=[]
            const date = new Date().getFullYear()
            if(e<this.baseStartYear || e>this.baseEndYear){
                this.$message({
                    type:'warning',
                    message:'请选择基数范围内的时间'
                })
                this.supplierStartYear=this.baseStartYear
            }
            
        },
        endChangeSupplier(e){
            const date = new Date().getFullYear()
            if(e<this.baseStartYear || e>this.baseEndYear){
                this.$message({
                    type:'warning',
                    message:'请选择基数范围内的时间'
                })
                this.supplierEndYear=this.baseEndYear
            }else{
                // 供应商时间取值
                let leg = this.supplierEndYear - this.supplierStartYear
                this.formData.spiSupplierDTO.yearList=[]
                for (let i = 1; i < leg+1; i++) {
                    this.formData.spiSupplierDTO.yearList.push((parseInt(this.supplierStartYear)+i).toString())
                }
                console.log(this.formData.spiSupplierDTO.yearList)
            }
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