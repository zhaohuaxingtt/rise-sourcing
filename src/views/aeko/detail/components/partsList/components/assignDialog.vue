<!--
 * @Author: wentliao
 * @Date: 2021-07-28 14:27:28
 * @Description: 分配科室弹窗
-->
<template>
    <iDialog     
        :title="assignType === 'commodity' ? language('LK_AEKO_FENPAIKESHI','分派科室') : language('LK_AEKO_FENPAICAIGOUYUAN','分派采购员')"
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="25%"
        class="assignDialog"
    >
    <div class="assignDialog-contain">
        <!-- 单一分派 -->
        <div v-if="singleAssign.length">
            <p>{{ assignType === "commodity" ? language("XUANZEFENPAIKESHI", "选择分派科室") : language("XUANZEFENPAICAIGOUYUAN", "选择分派采购员") }}</p>
            <iSelect 
                v-model="refferenceSmtNum" 
                class="margin-top20" 
                style="width:100%"
                :filterable="assignType !== 'commodity'"
                @visible-change="selectVisibleChange($event)"
                :placeholder="assignType == 'commodity' ? language('LK_AEKO_DAIXUANZE','待选择') : language('LK_QINGSHURU','请输入')"
                :filter-method="(val)=>{dataFilter(val)}"
            >
                <el-option
                    v-for="item in (assignType === 'commodity' ? commoditySelectOptions : linieSelectCopyOptions) || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option> 
            </iSelect>
        </div>

        <!-- 批量分派 -->
        <div v-else>
            <el-radio v-model="radioType" label="1">{{ assignType === "commodity" ? language('LK_AEKO_FENPAIGEIYUSHEKESHI','分派给预设科室') : language('LK_AEKO_FENPAIGEIYUSHECAIGOUYUAN','分派给预设采购员') }}</el-radio>
            <br/>
            <el-radio v-model="radioType" label="2" class="radio-select">
                {{ assignType === "commodity" ? language('LK_AEKO_SHOUDONGFENPAIKESHI','⼿动分派科室') : language('LK_AEKO_SHOUDONGFENPAICAIGOUYUAN','⼿动分派采购员') }}
                <br/>
                <iSelect  
                    v-model="refferenceSmtNum" 
                    :filterable="assignType !== 'commodity'"
                    :filter-method="(val)=>{dataFilter(val)}"
                    @visible-change="selectVisibleChange($event)"
                    :disabled="radioType=='1'" 
                    :placeholder="assignType == 'commodity' ? language('LK_AEKO_DAIXUANZE','待选择') : language('LK_QINGSHURU','请输入')"
                    class="margin-top20" style="width:100%" 
                    >
                    <el-option
                        v-for="item in (assignType === 'commodity' ? commoditySelectOptions : linieSelectCopyOptions) || []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option> 
                </iSelect>
            </el-radio>
        </div>
    </div>
     <div class="confirmBtn padding-bottom20 padding-top20 ">
        <iButton v-if="assignType === 'commodity'" @click="assign" :loading="isLoading">{{language('LK_AEKO_FENPAI','分派')}}</iButton>
        <iButton @click="save" :loading="isLoading" v-else>{{language('BAOCUN','保存')}}</iButton>
     </div>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iSelect,
    iButton,
    iMessage,
} from 'rise';
import {
    searchCommodity,
    searchLinie,
} from '@/api/aeko/manage';
import {
    assignDept,
    assignLinie,
} from '@/api/aeko/detail/partsList.js'
import {user as configUser } from '@/config'
export default {
    name:'assignDialog',
    components:{
        iDialog,
        iSelect,
        iButton,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        selectItems:{
            type:Array,
            default:()=>[],
        },
        singleAssign:{
            type:Array,
            default:()=>[],
        },
        // 类型
        assignType: {
            type: String,
            default: ""
        },
        requirementAekoId:{
            type:String,
            default:'',
        },
        linieDeptNum:{
            type:Array,
            default:()=>[],
        },
        buyerName:{
            type:Array,
            default:()=>[],
        },
        userInfo:{
            type:Object,
            default:()=>{},
        }
    },
    computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
  },
    data(){
        return{
            radioType:'1',
            isLoading:false,
            commoditySelectOptions:[],
            linieSelectOptions: [],
            linieSelectCopyOptions: [],
            refferenceSmtNum:'',
            deptId:null,
        }
    },
    created(){
        this.init();
        if(this.assignType === 'commodity'){
            this.getDePartList();
        }else{
            this.getLinieList();
        }
    },
    methods:{
        clearDialog(){
            this.$emit('changeVisible','assignVisible',false);
        },
        init(){
            // 分配科室
           if(this.assignType === 'commodity'){
                // 单一分配时将预设科室回填
                if(this.singleAssign.length){
                    this.refferenceSmtNum = this.singleAssign[0].refferenceSmtId;
                }else{
                    // 批量分派
                    // 需判断一下预设科室是否相同
                    const { selectItems } = this;
                    const arr = selectItems.map((item)=>item.refferenceSmtId);
                    const filterArr = Array.from(new Set(arr));
                    if(filterArr.length ==1){ // 批量处理的预设科室一致
                            this.refferenceSmtNum = filterArr[0];
                    }
                }
           }else{  // 分派采购员
                if(this.singleAssign.length){
                        this.refferenceSmtNum = this.singleAssign[0].refferenceByuerId;
                        // this.deptId = this.singleAssign[0].linieDeptId;
                }else{
                    // 批量分派
                    // 需判断一下预设采购员是否相同
                    const { selectItems } = this;
                    const arr = selectItems.map((item)=>item.refferenceByuerId);
                    const filterArr = Array.from(new Set(arr));
                    if(filterArr.length ==1){ // 批量处理的预设科室一致
                            this.refferenceSmtNum = filterArr[0];
                    }
                }
           }
           
        },
        // 获取科室列表
        async getDePartList(){
            const { linieDeptNum=[] } = this;
            if(linieDeptNum.length){
                linieDeptNum.map((item)=>{
                    item.label = item.deptNum;
                    item.value = item.id+'';
                })
                this.commoditySelectOptions = linieDeptNum;
            }else{
                searchCommodity().then((res)=>{
                    const {code,data} = res;
                    if(code ==200 ){
                        data.map((item)=>{
                        item.label = item.deptNum;
                        item.value = item.id+'';
                        })
                        this.commoditySelectOptions = data;
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                })
            }

        },

        // 分派科室
        async assign(){
            let data = [];
            const {singleAssign,requirementAekoId,refferenceSmtNum,commoditySelectOptions,selectItems} = this;
            if(singleAssign.length){

                 // 判断是否已选择
                if(!refferenceSmtNum) return iMessage.warn(this.language('LK_AEKO_QINGXUANZEHOUTIJIAO','请选择后提交'));

            
                // 单一分配
                const depArr = commoditySelectOptions.filter((item)=>item.id ==refferenceSmtNum );
                const singleData = {
                    aekoPartId:singleAssign[0].aekoPartId,
                    requirementAekoId,
                    linieDeptId:refferenceSmtNum,
                    linieDeptName:depArr.length ? depArr[0].nameZh : singleAssign[0].refferenceSmt,
                    linieDeptNum:depArr.length ? depArr[0].deptNum : singleAssign[0].refferenceSmtNum,
                }
                data.push(singleData);
            }else{ // 批量分派
                const { radioType } = this;
                if(radioType == 1){ // 预设

                    // 判断勾选项是否无预设科室 若没有弹出提示
                    const refferArr = selectItems.filter((item)=>!item.refferenceSmtNum);

                    if(refferArr.length){
                        const str = refferArr.map((item)=>item.partNum).toString();
                        return iMessage.warn(str+this.language('LK_AEKO_LINGJIANWUYUSHEKESHIQINGCHONGXINXUANZE','零件无预设科室，请重新选择!'))
                    }
                    
                    selectItems.map((item)=>{
                        data.push({
                            requirementAekoId,
                            aekoPartId:item.aekoPartId,
                            linieDeptName:item.refferenceSmt,
                            linieDeptNum:item.refferenceSmtNum,
                            linieDeptId:item.refferenceSmtId,
                        })
                    })
                }else{ // 手动分派

                    // 判断是否已选择
                    if(!refferenceSmtNum) return iMessage.warn(this.language('LK_AEKO_QINGXUANZEHOUTIJIAO','请选择后提交'));


                    const depArr = commoditySelectOptions.filter((item)=>item.id ==refferenceSmtNum );
                    selectItems.map((item)=>{
                        data.push({
                            requirementAekoId,
                            aekoPartId:item.aekoPartId,
                            linieDeptName:depArr.length ? depArr[0].nameZh : '',
                            linieDeptNum:depArr.length ? depArr[0].deptNum : '',
                            linieDeptId:refferenceSmtNum,
                        })
                    })
                }
            }
            this.isLoading = true;
            await assignDept(data).then((res)=>{
                this.isLoading = false;
                const { code } = res;
                if(code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.clearDialog();
                    this.$emit('getList');
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.isLoading = false;
            })

        },

        // 分派采购员
        async save(){
            let data = [];
            const {singleAssign,requirementAekoId,refferenceSmtNum,linieSelectOptions,selectItems} = this;
            if(singleAssign.length){

                // 判断是否已选择
                if(!refferenceSmtNum) return iMessage.warn(this.language('LK_AEKO_QINGXUANZEHOUTIJIAO','请选择后提交'));

                // 单一分配
                const depArr = linieSelectOptions.filter((item)=>item.id ==refferenceSmtNum );
                const singleData = {
                    aekoPartId:singleAssign[0].aekoPartId,
                    requirementAekoId,
                    buyerId:refferenceSmtNum,
                    buyerName:depArr.length ? depArr[0].nameZh : '',
                }
                data.push(singleData);
            }else{ // 批量分派
                const { radioType } = this;
                if(radioType == 1){ // 预设

                    // 判断勾选项是否无预设采购员 若没有弹出提示
                    const refferArr = selectItems.filter((item)=>!item.refferenceByuerId);


                    if(refferArr.length){
                        const str = refferArr.map((item)=>item.partNum).toString();
                        return iMessage.warn(str+this.language('LK_AEKO_LINGJIANWUYUSHECAIGOUYUANQINGCHONGXINXUANZE','零件无预设采购员，请重新选择!'))
                    }

                    selectItems.map((item)=>{
                        data.push({
                            requirementAekoId,
                            aekoPartId:item.aekoPartId,
                            buyerId:item.refferenceByuerId,
                            buyerName:item.refferenceByuerName,
                        })
                    })
                }else{ // 手动分派


                    // 判断是否已选择
                    if(!refferenceSmtNum) return iMessage.warn(this.language('LK_AEKO_QINGXUANZEHOUTIJIAO','请选择后提交'));


                    const depArr = linieSelectOptions.filter((item)=>item.id ==refferenceSmtNum );
                    selectItems.map((item)=>{
                        data.push({
                            requirementAekoId,
                            aekoPartId:item.aekoPartId,
                            buyerId:refferenceSmtNum,
                            buyerName:depArr.length ? depArr[0].nameZh : '',
                        })
                    })
                }
            }
            this.isLoading = true;
            await assignLinie(data).then((res)=>{
                this.isLoading = false;
                const { code } = res;
                if(code == 200){
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                    this.clearDialog();
                    this.$emit('getList');
                    // 提示XXX（Linie中文名）没有当前零件(XXX）所属材料组权限，请及时申请，以免影响后续操作
                    // this.$message.warning({
                    //     message: this.$i18n.locale === "zh" ? res.desZh : res.desEn,
                    //     duration:15000,
                    //     showClose: true
                    // })
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.isLoading = false;
            })
        },

        // 获取linie列表
        async getLinieList(){
            const { buyerName=[],userInfo={} } = this;
            // if(buyerName.length){
            //      buyerName.map((item)=>{
            //         item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
            //         item.value = item.id;
            //     })
            //     this.linieSelectOptions = buyerName;

            // }else{
                const {deptDTO={}} = userInfo;
                const deptId = deptDTO.id;
                await searchLinie({tagId:configUser.LINLIE,deptId,}).then((res)=>{
                    const {code,data} = res;
                    if(code ==200 ){
                        data.map((item)=>{
                        item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
                        item.value = item.id+'';
                        })
                        this.linieSelectOptions = data;
                        this.linieSelectCopyOptions = data;
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                })
            // }

            // 判断一下预设采购员 如果可选列表内无预设采购员选项则不显示预设
            const { linieSelectOptions=[],refferenceSmtNum='' } = this;
            const reffLen = linieSelectOptions.filter((item)=>item.value == refferenceSmtNum);
            if(!reffLen.length) this.refferenceSmtNum = '';
            
            
        },

        // 模糊搜索处理
        dataFilter(val){
            // 去除前后空格
            const trimVal = val.trim();
            // linieSelectOptions  linieSelectCopyOptions
            const { linieSelectOptions } = this;
            if(trimVal){
                const list = linieSelectOptions.filter((item) => {
                if (!!~item.nameZh.indexOf(trimVal) || (item.nameEn && !!~item.nameEn.toUpperCase().indexOf(trimVal.toUpperCase()))) {
                    return true
                }
                })
                this.linieSelectCopyOptions = list;
            }else{
                this.linieSelectCopyOptions = linieSelectOptions
            }
            
        },

        selectVisibleChange(visible, key){
          if(!visible){
                const { linieSelectOptions } = this;
                this.linieSelectCopyOptions = linieSelectOptions;
          }
      }
    }
}
</script>

<style lang="scss" scoped>
    .assignDialog{
        .assignDialog-contain{
            ::v-deep.el-radio{
                margin: 10px 0;
                .el-radio__input.is-checked+.el-radio__label{
                    color: #606266;
                }
            }
        }
        .radio-select{
            display: block;
        }
        .confirmBtn{
            text-align: right;
        }
    }
</style>