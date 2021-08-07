<template>
    <div>
        <iPage>
            <div class="head">
                <div class="head-left">
                    <div>
                        <div class="tittle">基数</div>
                        <el-form class="addUser-form">
                            <el-row :gutter="100">  
                                <el-col :span="6">
                                    <iFormItem
                                    label="科室(股)"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                             
                                <el-col :span="6">
                                    <iFormItem
                                    label="地区"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                             
                                <el-col :span="6">
                                    <iFormItem
                                    label="起止年份"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        class=""
                                        v-model="formData.userNum"
                                    ></iInput>
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="TO量级(元)"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        class=""
                                        v-model="formData.userNum"
                                    ></iInput>
                                    </iFormItem>
                                </el-col>
                            </el-row>
                        </el-form>  
                    </div>

                    <div>
                        <div class="tittle">供应商</div>
                        <el-form class="addUser-form">
                            <el-row :gutter="100">  
                                <el-col :span="6">
                                    <iFormItem
                                    label="科室(股)"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                           
                                <el-col :span="6">
                                    <iFormItem
                                    label="地区"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="材料组"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="工艺组"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iSelect v-model="formData.userNum" :placeholder="$t('partsignLanguage.QingXuanZe')">
                                        <el-option value='' label='全部'></el-option>
                                    </iSelect>
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="起止年份"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        class=""
                                        v-model="formData.userNum"
                                    ></iInput>
                                    </iFormItem>
                                </el-col>
                                <el-col :span="6">
                                    <iFormItem
                                    label="TO量级(元)"
                                    class="SearchOption"
                                    prop="userNum"
                                    >
                                    <iInput
                                        :placeholder="$t('partsignLanguage.INPUT_PLACEHOLDER')"
                                        class=""
                                        v-model="formData.userNum"
                                    ></iInput>
                                    </iFormItem>
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
import {iButton,iPage,iCard,iFormItem,iInput,iSelect} from 'rise'
import {getMaterialGroupByUserIds} from '@/api/kpiChart'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iFormItem,
        iInput,
        iSelect
    },
    data(){
        return {
           formData:{}
        }
    },
    mounted(){
       getMaterialGroupByUserIds({}).then(res=>{
           console.log(res)
       })
    },
    methods:{

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
</style>