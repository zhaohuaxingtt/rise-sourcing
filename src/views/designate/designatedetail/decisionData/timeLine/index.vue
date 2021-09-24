<!--
 * @Author: wentliao
 * @Date: 2021-05-24 11:39:32
 * @Description: 决策资料-timeLine
-->
<template>
    <div class="decision-data-timeLine" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TIMELINE|决策资料-timeline">
        <!-- 按钮区域 -->
        <div class="timeLine-btn-list" v-if="isPreview=='0'">
            <span v-if="isEdit">
                <iButton :loading="isLoading" @click="save" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TIMELINE_SAVE|保存">{{language('LK_BAOCUN','保存')}}</iButton>
                <iButton @click="edit" v-permission.auto="SOURCING_NOMINATION_ATTATCH_CANCEL|取消">{{language('LK_QUXIAO','取 消')}}</iButton>
                <iButton v-permission.auto="SOURCING_NOMINATION_ATTATCH_SHOW|展示">{{language('LK_ZHANSHI','展示')}}</iButton>
            </span>
            <span v-else>
                <iButton v-if="!nominationDisabled" @click="edit">{{language('LK_BIANJI','编辑')}}</iButton>
            </span>
        </div>
        <div v-for="(item,index) in detailData" :key="'timeLine_'+index">
            <!-- 编辑状态 -->
            <div v-if="isEdit">
                <!--  -->
                <iCard collapse :title="item.materialGroupName"  class="timeLine-card">
                    <ul class="timeLine-edit-list">
                        <li class="flex-between-center margin-bottom20" v-for="(groupNode,groupNodeIndex) in item.nomiTimeAxisGroup" :key="'groupNodeEdit_'+groupNodeIndex">
                            <span class="show-icon" @click="showLine(groupNodeIndex,item.nomiTimeAxisGroup)">
                                <icon v-if="groupNode.isVisible" symbol name="iconshenpiliu-shenpizhong" class="show-icon-item" ></icon>
                                <icon v-else symbol name="iconshenpiliu-daishenpi" class="show-icon-item" ></icon>
                            </span>
                            <groupStep 
                                :groupNode="groupNode.nomiTimeAxisLine"
                                :stepList="stepList" 
                                :isEdit="true"
                                class="list-item-step"
                            />
                        </li>
                    </ul>
                    <!-- 供应商编辑列表 -->
                    <ul class="supplier-edit-list">
                        <li  v-for="(supplierItem,supplierIndex) in item.nomiTimeAxisSupplierResultVOList" :key="'nomiTimeAxisSupplierResultVOListEdit_'+supplierIndex">
                            <supplierItem :itemIndex="supplierIndex" :key="'nomiTimeAxisSupplierResultVOListEdit_item_'+supplierIndex" :supplierData="supplierItem" @editSupplierLine="editSupplierLine"/>
                        </li>
                    </ul>
                </iCard>
            </div>
            <!-- 展示状态 -->
            <div v-else>
                <iCard collapse :title="item.materialGroupName" class="timeLine-card">
                    <template v-for="(groupNode,groupNodeIndex) in item.nomiTimeAxisGroup">
                        <!-- :stepIndex='2' -->
                        <groupStep 
                            v-if="groupNode.isVisible"
                            :stepList="stepList"
                            :groupNode="groupNode.nomiTimeAxisLine"
                            :key="'groupNode_'+groupNodeIndex">
                            <template slot="myStep">
                                <icon symbol name="iconTimeLine-Today" class="step-icon" ></icon>
                                <p>Today</p>
                            </template>
                        </groupStep>
                    </template>
                    
                    <!-- 供应商card -->
                    <div class="supplier-list" v-for="(supplierItem,supplierIndex) in item.nomiTimeAxisSupplierResultVOList" :key="'nomiTimeAxisSupplierResultVOList_'+supplierIndex">
                        <iCard collapse :title="supplierItem.supplierName" class="supplier-item">
                            <template slot="header-control" >
                                <supplierStep :supplierData="supplierItem.nomiTimeAxisSuppliers"/>
                            </template>
                            <ul class="supplier-item-list">
                                <li class="flex-between-center" v-for="(supplierListItem,supplierListItemIndex) in supplierItem.nomiTimeAxisSupplierExps" :key="'supplier-item-'+supplierListItemIndex">
                                    <span class="supplier-item-name">{{supplierListItem.durationName}}</span>
                                    <div class="supplier-item-line">
                                        <supplierLine 
                                            :allList="supplierItem.nomiTimeAxisSupplierExps"
                                            :supplierIndex="supplierListItemIndex"
                                            :cardIndex="index"
                                        />
                                    </div>
                                </li>
                            </ul>
                        </iCard>
                    </div>
                </iCard>
            </div>
        </div>
    </div>
</template>

<script>
import {
  iCard,
  iButton,
  icon,
  iMessage,
} from "rise";
import { stepList } from './components/data'
import groupStep from './components/groupStep'
import supplierStep from './components/supplierStep'
import supplierLine from './components/supplierLine'
import supplierItem from './components/supplierItem'
import {
    getTimeaxis,
    saveTimeaxis,
} from '@/api/designate/decisiondata/timeLine'
export default {
    name:'timeLine',
     components:{
        groupStep,
        supplierStep,
        supplierLine,
        supplierItem,
        iCard,
        iButton,
        icon,
    },
    data(){
        return{
            isEdit:false,
            stepList:stepList,
            isLoading:false,
            detailData:[],
            
        }
    },
    created(){
        this.getDetail();

    },
    methods:{
        // 编辑 取消
        edit(){
            const {isEdit} = this;
            if(isEdit){
                this.getDetail();
            }
            this.isEdit = !isEdit;
        },

        // 保存
        async save(){
            this.isLoading = true;
            const { detailData } = this;
            const data = {
                nomiTimeAxisList:detailData
            }
            const {query={}} = this.$route;
            const {desinateId=''} = query; 
            await saveTimeaxis(data).then((res)=>{
                const {code} = res;
                this.isLoading = false;
                if(code == 200){
                    iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    this.getDetail();
                    this.isEdit = false;
                    this.$store.dispatch('updateNominationStep',{desinateId , phaseType:'5'});
                }else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{ this.isLoading = false; })
        },

        // 获取timeLine详情
        getDetail(){
            const {query={}} = this.$route;
            const {desinateId=''} = query;  // 34
            getTimeaxis(desinateId).then((res)=>{
                const {code,data} = res;
                if(code == 200 && data){
                    this.detailData = this.resetDetail(data);
                }else{
                   iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn) 
                }
            }).catch((err)=>{});
        },

        // 显示隐藏指定的line
        showLine(index,line){
            line.map((item,itemIndex)=>{
                if(itemIndex == index) item.isVisible = true;
                else item.isVisible = false;
            })
        },

        // 重置下timeline数据
        resetDetail(data){
            const newData = data ; 
            data.map((item)=>{
                const {nomiTimeAxisSupplierResultVOList=[]} = item;
                nomiTimeAxisSupplierResultVOList.map((axisItem)=>{
                    const {nomiTimeAxisSupplierExps=[]} = axisItem;
                    nomiTimeAxisSupplierExps.map((expsItem)=>{
                        // 添加一个range字段给日期组件
                        expsItem.rangeDate = [expsItem.beginDate,expsItem.endDate]
                    })
                })
            });

             return data;
        },
    },
    computed:{
        // eslint-disable-next-line no-undef
        ...Vuex.mapState({
            nominationDisabled: state => state.nomination.nominationDisabled,
        }),
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },
}
</script>

<style lang="scss" scoped>
.decision-data-timeLine{
    .supplier-list{
        margin-top: 30px;
        .supplier-item{
            position: relative;
            ::v-deep .cardHeader{
                .collapse{
                    position: absolute;
                    left: -5px;
                    top: 43px;
                }
            }
            .supplier-item-list{
                width: 100%;
                overflow: hidden;
                li{
                    padding: 25px 0;
                    align-items: center;
                    .supplier-item-name{
                        font-size: 16px;
                        color: #0D2451;
                    }
                    .supplier-item-line{
                        width: 900px;
                    }
                    &:not(:last-child){
                        border-bottom: 1px solid rgba($color: #707070, $alpha: 0.18);
                    }
                }
            }
        }
    }
    .timeLine-card{
        margin-bottom: 20px;
    }
    .timeLine-btn-list{
         margin-bottom: 20px;
         text-align: right;
    }
    .timeLine-edit-list{
        .show-icon{
            width: 100px;
            padding-top: 10px;
            .show-icon-item{
                width: 25px;
                height: 25px;
                margin-left: 20px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .list-item-step{
            flex: 1;
        }
    }
}
</style>