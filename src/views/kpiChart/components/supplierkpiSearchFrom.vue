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
                                    <iSelect v-model="exisList" 
                                    :placeholder="$t('partsignLanguage.QingXuanZe')"
                                    @change="handlechange"
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
                                    <iFormItem
                                    label="地区"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <!-- <iSelect v-model="formData.spiBaseDTO" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect> -->
                                    <el-cascader  
                                    v-model="areaData" 
                                    :options="areaOptions"
                                     @change="handleChangeArea"
                                     @expand-change="expandChange"
                                     @getCheckedNodes="getNodeNumber"></el-cascader>
                                    </iFormItem>
                                </el-col>
                             
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
                                    value-format="yyyy"
                                    @change="endchange"
                                    >
                                    </el-date-picker>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div style="margin-bottom:10px;margin-top:10px;">TO量级（元）</div>
                                    <div class="TOCase">
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        v-model="formData.spiSupplierDTO.toAmountStart"
                                    ></iInput>
                                    <span>-</span>
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        v-model="formData.spiSupplierDTO.toAmountEnd"
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
                                    <iSelect v-model="exisList" 
                                    :placeholder="$t('partsignLanguage.QingXuanZe')"
                                    @change="handlechange"
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
                                    <iFormItem
                                    label="地区"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <!-- <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect> -->
                                    <el-cascader :props="props"></el-cascader>
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
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        v-model="formData.spiSupplierDTO.toAmountStart"
                                    ></iInput>
                                    <span>-</span>
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        v-model="formData.spiSupplierDTO.toAmountEnd"
                                    ></iInput>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div style="margin-top:35px;float: right;">
                                    <iButton>重置</iButton>
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
import {getMaterialGroupByUserIds,spiTotalScore,getRelationship,getStuffByCategory,getLine} from '@/api/kpiChart'
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
            areaData:[],
            areaOptions:[],
           formData:{
               spiBaseDTO:{
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
        // 查询材料组
       getMaterialGroupByUserIds({}).then(res=>{
           if(res.code==="200"){
                this.material=res.data
           }
       })
       this.getRelationship()
       this.getStuffByCategory()
    },
    methods:{
        expandChange(x){
            console.log(x)
            //this.getcity(x[0])
        },
        handleChangeArea(x){
            
        },
        getNodeNumber(x){
            console.log(x)
        },
         //城市
        getcity(x){
            getCityInfo({parentCityId:x}).then(res=>{
                console.log(res)
                // this.areaOptions=this.areaOptions.map(c=>{
                //     c.children=res
                // })
            })
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
        handleOk(){
            getLine(this.formData).then(res=>{
                this.$emit("chartData",res.data)
            })
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
       }
   }
   ::v-deep.TOCase{
       display: flex;
           justify-content: space-between;
           align-items: center;
    //    input{
    //        width: 40%;
    //    }
   }
   .bottom-underline{
       border-bottom: 1px solid #E3E3E3;
       margin-bottom: 20px;
       padding-bottom: 10px;
   }
</style>