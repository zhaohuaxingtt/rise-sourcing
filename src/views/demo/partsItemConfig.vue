<!--
 * @Author: wentliao
 * @Date: 2021-12-30 09:59:35
 * @Description: 零件采购项目类型配置
-->
<template>
  <iPage class="partsItemConfig">
      <iCard title="零件采购项目类型配置">
          <template v-slot:header-control>
              <iButton>保存</iButton>
          </template>
          <!-- 表单区域 -->
          <el-table
            :data="tableData"
            style="width: 100%">
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
      </iCard>
      
  </iPage>
</template>
s
<script>

import {
    iPage,
    iCard,
    iButton,
    iSelect,
    iInput,
} from 'rise'
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
            tableHeader:[],
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
        this.restData();
    },
    methods:{ 
        restData(){
            this.tableHeader = [
                {
                    "name": "零件项目采购类型",
                    "type": "name",
                },
                ...this.resData['headers']
            ];
            this.tableData = this.resData.data || [];
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
