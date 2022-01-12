<!--
 * @Author: wentliao
 * @Date: 2021-12-30 09:59:35
 * @Description: 零件采购项目类型配置
-->
<template>
  <iPage class="partsItemConfig">
      <iCard :title="language('LINGJIANLEIXINGPEIZHI','零件类型配置')">
          <template v-slot:header-control>
              <iButton @click="save()" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
          </template>
          <!-- 表单区域 -->
          <el-table
            :data="tablePtData"
            style="width: 100%"
            v-loading="tableLoading"
            >
            <template v-for="(item, $index) in tablePtHeader">
                <el-table-column :key="$index+'_partsItemConfig'" :prop="item.type" :label="item.name" >
                    <template slot-scope="scope">
                        <span  v-if="item.type =='name'">{{scope.row[item.type]}}</span>
                        <div v-else>
                            <!-- 开关 -->
                            <el-switch
                                v-if="scope.row['items'][item.type]['metadata']['type'] == 'SWITCH'"
                                active-value="ON"
                                inactive-value="OFF"
                                v-model="scope.row['items'][item.type]['value']"
                            />
                            <!-- 下拉框 -->
                            <iSelect
                                v-else-if="scope.row['items'][item.type]['metadata']['type'] == 'SELECT'"
                                v-model="scope.row['items'][item.type]['value']"
                            >
                                <el-option
                                    v-for="(item,selectIndex) in scope.row['items'][item.type]['metadata']['values'] || []"
                                    :key="item+'_'+selectIndex"
                                    :label="item"
                                    :value="item">
                                </el-option>  
                            </iSelect>
                            <!-- 输入框 -->
                            <iInput
                                v-else-if="scope.row['items'][item.type]['metadata']['type'] == 'TEXT'"
                                v-model="scope.row['items'][item.type]['value']"
                            />
                            <!-- Radio -->

                            <!-- 纯文本 -->
                            <span v-else>{{scope.row['items'][item.type]['value']}}</span>
                        </div>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="cardHeaderTitle margin-top20">
            <span class="title">{{language('LINGJIANCAIGOUXIANGMULEIXINGPEIZHI','零件采购项目类型配置')}}</span>
        </div>
        <div class="cardBody">
            <!-- 表单区域 -->
            <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="tableLoading"
            >
                <template v-for="(item, $index) in tableHeader">
                    <el-table-column :key="$index+'_partsItemConfig'" :prop="item.type" :label="item.name" >
                        <template slot-scope="scope">
                            <span  v-if="item.type =='name'">{{scope.row[item.type]}}</span>
                            <div v-else>
                                <!-- 开关 -->
                                <el-switch
                                    v-if="scope.row['items'][item.type]['metadata']['type'] == 'SWITCH'"
                                    active-value="ON"
                                    inactive-value="OFF"
                                    v-model="scope.row['items'][item.type]['value']"
                                />
                                <!-- 下拉框 -->
                                <iSelect
                                    v-else-if="scope.row['items'][item.type]['metadata']['type'] == 'SELECT'"
                                    v-model="scope.row['items'][item.type]['value']"
                                >
                                    <el-option
                                        v-for="(item,selectIndex) in scope.row['items'][item.type]['metadata']['values'] || []"
                                        :key="item+'_'+selectIndex"
                                        :label="item"
                                        :value="item">
                                    </el-option>  
                                </iSelect>
                                <!-- 输入框 -->
                                <iInput
                                    v-else-if="scope.row['items'][item.type]['metadata']['type'] == 'TEXT'"
                                    v-model="scope.row['items'][item.type]['value']"
                                />
                                <!-- Radio -->

                                <!-- 纯文本 -->
                                <span v-else>{{scope.row['items'][item.type]['value']}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>

      </iCard>
      
  </iPage>
</template>

<script>

import {
    iPage,
    iCard,
    iButton,
    iSelect,
    iInput,
} from 'rise'
import {
    getPartCheck,
    savePartCheck,
} from '@/api/partsItemConfig'
export default {
    name:'partsItemConfig',
    components:{
        iPage,
        iCard,
        iButton,
        iSelect,
        iInput,
    },
    data(){
        return{
            tableData:[],
            tablePtData: [],
            tableHeader:[],
            tablePtHeader: [],
            tableLoading:false,
            saveLoading:false,
            resData:{
                "headers":[
                    {
                        "name":"黑名单控制",
                        "type":"SUPPLIER_BLACK_STATUS",
                        "name_en":"test"
                    },
                    {
                        "name":"任务状态控制",
                        "type":"TASK_STATUS_STATUS",
                        "name_en":"test"
                    },
                    {
                        "name":"黑名单控制-1",
                        "type":"SUPPLIER_BLACK_STATUS-1",
                        "name_en":"test"
                    },
                    {
                        "name":"任务状态控制-1",
                        "type":"TASK_STATUS_STATUS-1",
                        "name_en":"test"
                    },

                ],
                "data":[
                    {
                        "code":"1000001",
                        "name":"FS零件",
                        "name_zh":"FS零件",
                        "name_en":"FS Parts",
                        "items":{
                            "SUPPLIER_BLACK_STATUS":{
                                "name":"黑名单控制",
                                "type":"SUPPLIER_BLACK_STATUS",
                                "value":"ON",
                                "metadata":{
                                    "type":"SWITCH",
                                    "values":[
                                        "ON",
                                        "OFF"
                                    ]
                                }
                            },
                            "TASK_STATUS_STATUS":{
                                "name":"任务状态控制",
                                "type":"TASK_STATUS_STATUS",
                                "value":"ON",
                                "metadata":{
                                    "type":"SELECT",
                                    "values":[
                                        "ON",
                                        "OFF"
                                    ]
                                }
                            },
                            "SUPPLIER_BLACK_STATUS-1":{
                                "name":"黑名单控制-1",
                                "type":"SUPPLIER_BLACK_STATUS-1",
                                "value":"ON",
                                "metadata":{
                                    "type":"TEXT",
                                    "values":["1"]
                                }
                            },
                            "TASK_STATUS_STATUS-1":{
                                "name":"任务状态控制-1",
                                "type":"TASK_STATUS_STATUS-1",
                                "value":"ON",
                                "metadata":{
                                    "type":"REDIO",
                                    "values":[
                                        "ON",
                                        "OFF"
                                    ]
                                }
                            }
                        }
                    }
                ],
            }
        }
    },
    created(){
        this.getData();
    },
    methods:{ 
        async getData(){
            this.tableLoading = true;
            await getPartCheck().then((res)=>{
                this.tableLoading = false;
                const {code,data} = res;
                if(code == 200){
                    const headersData = data['headers'] || [];
                    this.tableHeader = [
                        {
                            "name": this.language('LINGJIANXIANGMUCAIGOULEIXING','零件项目采购类型'),
                            "type": "name",
                        },
                        ...headersData
                    ];
                    this.tablePtHeader = [
                        {
                            "name": this.language('LINGJIANLEIX','零件类型'),
                            "type": "name",
                        },
                        ...headersData
                    ];
                    this.tableData = data.data && data.data.PPT || []
                    this.tablePtData = data.data && data.data.PT || []
                }else{
                    this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                }
            }).catch(()=>{this.tableLoading = false})
            // this.tableHeader = [
            //     {
            //         "name": "零件项目采购类型",
            //         "type": "name",
            //     },
            //     ...this.resData['headers']
            // ];
            // this.tableData = this.resData.data || [];
        },
        // 保存
        async save(){
            this.saveLoading = true;
            await savePartCheck({
                PT: this.tablePtData,
                PPT: this.tableData,
            }).then((res)=>{
                this.saveLoading = false;
                if(res.code == 200){
                    this.$message.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.getData();
                }else{
                   this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn); 
                }
            }).catch(()=>{ this.saveLoading = false })
        }
    }
}
</script>

<style lang="scss" scoped>
.cardHeaderTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.875rem 2.5rem;
    padding-left: 0px;
    .title {
        font-size: 1.125rem;
        color: #131523;
        font-weight: bold;
        font-size: 1.25rem;
    }
}
</style>
