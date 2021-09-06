<template>
  <iDialog
      :title="$t(title)"
      :visible.sync="value"
      width="400px"
      @close="clearDiolog"
      top="40vh"
  >
    <div class="changeContent">
      <span class="fontSize14">{{ subtitle1 }}：</span>
      <iSelect
          v-model.trim="selDept"
          :placeholder="$t('LK_QINGXUANZE')"
          @change="selDeptOnChange"
          value-key="id">
        <el-option :value="{}" :label="$t('all')"/>

        <el-option
            v-for="(items, index) in deptLists"
            :key="index"
            :value="items"
            :label="items.nameZh"/>
      </iSelect>
    </div>
    <div  class="changeContent">
      <span class="fontSize14">{{ subtitle }}：</span>
      <iSelect
          v-model.trim="selUser"
          :placeholder="$t('LK_QINGXUANZE')"
          value-key="id">
        <el-option
            v-for="(items, index) in userList"
            :key="index"
            :value="items"
            :label="items.nameZh" />
      </iSelect>
    </div>

    <span slot="footer" class="dialog-footer">
      <iButton @click="sureByMySelf">转派自己</iButton>
      <iButton :loading="repeatClick" @click="sureChangeItems">{{
          $t("LK_QUEREN")
        }}</iButton>
    </span>
  </iDialog>
</template>

<script>
import {iButton, iDialog, iMessage, iSelect} from 'rise'
import {getDeptListByTag, getUserListByTag, purchaseUsers} from "@/api/usercenter";
import store from "@/store";

export default {
  name: "TransferBuyerDialog",
  components: {iSelect, iButton, iDialog},
  props: {
    title: {type: String, default: "LK_XINJIANXINXIDANZHUANPAI"},
    subtitle: {type: String, default: "LK_XINJIANXINXIDANZHUANPAI"},
    subtitle1: {type: String, default: "LK_XINJIANXINXIDANZHUANPAI"},
    value: {type: Boolean},
    repeatClick: Boolean,
    deptDTO:Object,
  },
  data() {
    return {
      //选中的部门
      selDept: {},
      //选中的成员
      selUser:{},
      //部门列表
      deptLists: [],
      userList:[],
      // list:[{id:12,nameZh:"舒杰"},{id:13,nameZh:"周瑜松"}]
    };
  },
  created() {
    //this.selDept={'id':this.deptDTO.id,'nameZh':this.deptDTO.nameZh}
    this.queryDeptListByTag();
    this.selDeptOnChange();
  },
  methods: {
    //获取询价采购员数据。
    getInquiryBuyerListFn() {
      purchaseUsers({userId: store.state.permission.userInfo.id}).then(
          (res) => (this.inquiryBuyerList = res.data || [])
      );
    },
    clearDiolog() {
      this.selDept = {}
      this.selUser={}
      this.$emit("input", false);
    },
    sureByMySelf(){
      this.value=false
      this.$emit("sureByMySelf");
    },
    sureChangeItems() {
      // console.log(this.inquiryBuyer);
      if (!this.selUser.id)
        return iMessage.warn(
            this.$t("LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN")
        );
      this.value=false
      this.$emit("sure", this.selUser);
      this.selDept = {}
      this.selUser={}
    },
    /**
     * 查询特殊身份部门信息（多个）,查linie时tagId传4
     */
    queryDeptListByTag(){
      let parmars={'tagId':4}
      getDeptListByTag(parmars).then((res)=>{
        if(res.code==200){
          this.deptLists=res.data
        }
      })
    },
    //选中部分发生变化//获取部门用户
    selDeptOnChange(){
      this.selUser={}
      let parmars=null
      if(this.selDept!==null){
        parmars={'tagId':4,'deptId':this.selDept.id}
      }else{
        parmars={'tagId':4}
      }
      getUserListByTag(parmars).then((res)=>{
        if(+res.code===200){
          this.userList=res.data
          this.userList.sort((a, b)=> a.nameZh.localeCompare(b.nameZh, 'zh'));
        }
      })
    }

  },
}
</script>

<style scoped lang="scss">
.changeContent {
  display: flex;
  padding: 20px 10px 20px 10px;

span {
  display: inline-block;
  width: 140px;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
}
}
</style>
