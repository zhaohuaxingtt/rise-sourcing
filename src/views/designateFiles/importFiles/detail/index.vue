<!--
 * @Author: wentliao
 * @Date: 2021-05-26 13:53:02
 * @Description: 特殊定点-配附件--附件需求导入列表----附件清单页
-->
<template>
    <iPage class="filesDetailList">
        <div v-if="!showUploadList">
            <p class="title margin-bottom10">{{$t('LK_FUJIANQINGDAN')}}：SAZJ1029</p>
            <iCard collapse>
                <!-- 搜索区域 -->
                <iSearch @sure="sure" @reset="reset">
                    <el-form>
                        <el-form-item :label="$t('LK_FUJIANLINGJIANHAO')">
                            <iInput v-model="searchParams['a']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="$t('LK_FUJIANLINGJIANMINGCHENG')">
                            <iInput v-model="searchParams['b']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="$t('LK_SHIYONGCHEXING')">
                            <iInput v-model="searchParams['c']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="$t('LK_FUJIANSHANGSHISHIJIAN')">
                            <iDatePicker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchParams['d']"></iDatePicker> 
                        </el-form-item>
                    </el-form>
                </iSearch>
            </iCard>
            <!-- 表单区域 -->
            <iCard>
                <el-table
                :data="tableData"
                fit 
                tooltip-effect='light'
                :empty-text="$t('LK_ZANWUSHUJU')"
                >
                <el-table-column
                    type="selection"
                    align='center'
                    width="50">
                </el-table-column>
                <el-table-column
                    type="index"
                    label="#"
                    align='center'
                    width="50">
                </el-table-column>
                <el-table-column v-for="(item,index) in tableTitle" 
                    :key="'filesDetailListTable'+index" 
                    align='center'
                    :label="$t(item.key) || item.name"
                    :prop="item.props"
                    >
                    <template slot-scope="scope">
                        <span class="link-underline"  v-if="item.key === 'LK_FUJIAN'" @click="checkUploadList">{{$t('LK_SHANGCHUAN')}}</span>
                        <span v-else>{{scope.row[item.props] || '-'}}</span>
                    </template>
                </el-table-column>
                </el-table>
                <!-- 分页 -->
                <iPagination
                    class="margin-bottom20"
                    @size-change="handleSizeChange($event, purchaseFactory)"
                    @current-change="handleCurrentChange($event, purchaseFactory)"
                    background
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    :layout="page.layout"
                    :current-page="page.currPage"
                    :total="page.totalCount" v-update
                />
            </iCard>
        </div>
        <div v-else>
            <iCard>
                <p class="uploadList-icon margin-bottom20">
                    <span @click="changeShowStatus">
                        <icon symbol name="guanbixiaoxiliebiaokapiannei" class="close-icon" ></icon>
                    </span>
                </p>
                <uploadList />
            </iCard>
        </div>
    </iPage>
</template>

<script>
import {
    iPage,
    iCard,
    iSearch,
    iInput,
    iDatePicker,
    iPagination,
    icon,
} from 'rise'
import { tableTitle } from './data'
import {pageMixins} from '@/utils/pageMixins'
import uploadList from './components/uploadList'
export default {
    name:'filesDetailList',
    mixins:[pageMixins],
    components:{
        uploadList,
        iPage,
        iCard,
        iSearch,
        iInput,
        iDatePicker,
        iPagination,
        icon,
    },
    data(){
        return{
            searchParams:{
                a:'',
                b:'',
                c:'',
                d:'',
            },
            tableTitle:tableTitle,
            tableData:[
                {a:'Z00856102',b:'SP123',c:'SVAA432',d:'1',e:'1111'}
            ],
            showUploadList:false,
        }
    },
    methods:{
        // 查询
        sure(){
            console.log(this.searchParams);
        },
        // // 重置
        reset(){
            const {searchParams} = this;
            for(let i in searchParams){
                searchParams[i] = '';
            }
            this.searchParams = searchParams;
        },
        // 改变弹窗是否显示状态
        changeShowStatus(){
            const {showUploadList} = this;
            this.showUploadList = !showUploadList;
        },
        // 查看上传列表
        checkUploadList(){
            this.changeShowStatus();
        }
    }
}
</script>

<style lang="scss" scoped>
    .filesDetailList{
        .title{
        font-size: 20px;
        font-weight: bold;
        }
        .uploadList-icon{
            text-align: right;
            .close-icon{
                width: 24px;
                height: 24px;
                border: 1px solid red;
            }
        }
    }
</style>
