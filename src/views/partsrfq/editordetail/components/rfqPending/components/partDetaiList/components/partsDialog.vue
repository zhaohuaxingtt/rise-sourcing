<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-23 16:15:02
 * @Description: 申请零件目标价
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iDialog :visible.sync="visible" class="margin-top30 applyModuleTargetPrice" :loading="loading" v-on="$listeners">
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{ language("LK_SHENQINGLINGJIANMUBIAOJIA", "申请零件目标价") }}</span>
        <iButton @click="handleSubmit" class="btn">{{ language('LK_APPLAY', '申请') }}</iButton>
      </div>
    </template>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList ref="tableList" class="table" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange" @select="select">
      <!-----------期望目标价--------------------------->
      <template #expectedTargetPrice="scope">
        <iInput v-if="scope.row.isEdit" :value="scope.row.expectedTargetPrice" @input="handleInput($event, scope.row, 'expectedTargetPrice')" />
        <iText v-else>{{scope.row.expectedTargetPrice}}</iText>
      </template>
      <!-- 财务控制人 -->
      <!-- <template #cfController="scope">
        <iSelect v-if="scope.row.isEdit && false" v-model="scope.row.cfController">
          <el-option :label="item.name" :value="item.id" v-for="item in fromGroup.CF_CONTROL" :key="item.id"></el-option>
        </iSelect>
        <iText v-else>{{scope.row.cfControllerName}}</iText>
      </template> -->
      <!-- 申请类别 -->
      <template #applyType="scope">
        <iSelect v-if="scope.row.isEdit" v-model="scope.row.applyType">
          <el-option :label="val" :value="val" v-for="(val,key) in options" :key="key"></el-option>
        </iSelect>
        <iText v-else>{{scope.row.applyType}}</iText>
      </template>
      <!-- 申请原因 -->
      <template #applyReason="scope">
        <iInput v-if="scope.row.isEdit" v-model="scope.row.applyReason"></iInput>
        <iText v-else>{{scope.row.applyReason}}</iText>
      </template>
      <!-- 备注 -->
      <template #memo="scope">
        <iInput v-if="scope.row.isEdit" v-model="scope.row.memo"></iInput>
        <iText v-else>{{scope.row.memo}}</iText>
      </template>
    </tableList>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iText, iInput, iSelect, iButton } from 'rise'
import tableList from '@/views/partsign/home/components/tableList'
import { applyPartTarget } from '@/api/financialTargetPrice/index'
import { dictkey } from '@/api/partsprocure/editordetail'
import { partsDialogTitle as tableTitle } from "../data";
import { partProjTypes } from "@/config";
import { numberProcessor } from "@/utils";
export default {
  props: {
    visible:{type:Boolean},
    tableList: {
      type: Array,
      default:()=>[]
    }
  },
  components: {iDialog, iText, tableList, iInput, iSelect, iButton},
  data() {
    return {
      isEdit: false,
      options:{
        1: 'LC',
        2: 'SKD',
        3: 'CKD LANDED',
      },
      fromGroup:{},
      loading: false,
      currencyOptions: [],
      remarks: '',
      selectList: [],
      isAgainEdit:false,
      tableTitle
    }
  },
  computed: {
    tableData(){
      let tableList = JSON.parse(JSON.stringify(this.tableList))
      const {businessKey} = this.$route.query;
      return tableList.map(i=>{
        let obj = {
          purchasingProjectId: [i.id],
          applyType: businessKey==partProjTypes.DBLINGJIAN ? 'SKD' : 'LC',
          fsnrGsnrNum:i.fsnrGsnrNum,
          partNum:i.partNum,
          partNameZh:i.partNameZh,
          cfController:i.cfController,
          cfControllerName:i.cfControllerName,
          isEdit: true
        }
        return obj
      })
    },
  },
  watch:{
    visible(nv){
      if(nv){
        this.$nextTick(()=>{
          this.$refs.tableList.defaultSelectAll()
        })
      }
    }
  },
  created(){
    this.getDict()
  },
  methods: {
			getDict() {
				dictkey().then(res => {
					if (res.code == 200) {
						Object.keys(res.data).forEach(key => {
							this.fromGroup = {
								...this.fromGroup,
								[key]: Array.isArray(res.data[key]) ? res.data[key] : []
							}
						})

					}
				})
			},
    handleSubmit() {
      if(!this.selectList.length){
        iMessage.warn('请选择要申请的数据')
        return
      }
      this.saveLoading = true
      const params = this.selectList.filter(i=> i.cfController && i.applyType)
      if(params.length!=this.selectList.length){
        iMessage.warn(this.language('QINGWEIHUBITIANXIANG','请维护必填项'))
        this.saveLoading = false
        return
      }
      params.forEach(i=>{
        i.expTargetpri = i.expectedTargetPrice
        i.applicantId = i.cfController
      })
      applyPartTarget(params).then((res) => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$store.dispatch('setTodoObj',this.$route.query.id);
          this.$emit('update','partsTargetPrice')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    select(selection){
      // selection.row.isEdit = !selection.row.isEdit
    },
    handleSelectionChange(val) {
      this.selectList = val
      const FS = val.map(item=>item.fsnrGsnrNum) || []
      this.tableData.map(item=>{
        if(FS.includes(item.fsnrGsnrNum)){
          this.$set(item,'isEdit',true)
        }else{
          this.$set(item,'isEdit',false)
        }
      })
    },
    /**
     * @Description: 输入限制
     * @Author: Luoshuang
     * @param {*} value
     * @param {*} row
     * @param {*} name
     * @return {*}
     */    
    handleInput(value, row, name) {
      this.$set(row, name, numberProcessor(value,2))
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { projectId: row.purchasingProjectPartId, businessKey: row.partProjectType }})
      window.open(router.href,'_blank')
    },
  }
}
</script>

<style lang="scss" scoped>
.applyModuleTargetPrice {
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn{
      margin-right: 20px;
    }
  }
  .table{
    padding-bottom: 20px;
  }
}
</style>