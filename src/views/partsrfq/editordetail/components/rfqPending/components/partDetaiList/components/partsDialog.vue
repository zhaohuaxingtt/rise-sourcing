<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 15:16:47
 * @LastEditors: YoHo
 * @LastEditTime: 2022-01-06 18:43:48
 * @Description: 申请零件目标价
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\targetPriceDetail\components\basic.vue
-->

<template>
  <iDialog :visible.sync="visible" class="margin-top30 applyModuleTargetPrice" :loading="loading" v-on="$listeners">
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{'申请零件目标价'}}</span>
        <iButton @click="handleSubmit" class="btn">申请</iButton>
      </div>
    </template>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList ref="tableList" class="table" :tableData="tableData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange" @select="select">
      <!-----------期望目标价--------------------------->
      <template #expectedTargetPrice="scope">
        <iInput v-if="scope.row.isEdit" :value="scope.row.expectedTargetPrice" maxlength="8" @input="handleInput($event, scope.row, 'expectedTargetPrice')" />
        <iText v-else>{{scope.row.expectedTargetPrice}}</iText>
      </template>
      <!-- 财务控制人 -->
      <template #cfController="scope">
        <iSelect v-if="scope.row.isEdit" v-model="scope.row.cfController">
          <el-option :label="item.name" :value="item.id" v-for="item in fromGroup.CF_CONTROL" :key="item.id"></el-option>
        </iSelect>
        <iText v-else>{{scope.row.cfControllerName}}</iText>
      </template>
      <!-- 申请类型 -->
      <template #applyType="scope">
        <iSelect v-if="scope.row.isEdit" v-model="scope.row.applyType">
          <el-option :label="val" :value="val" v-for="(val,key) in options" :key="key"></el-option>
        </iSelect>
        <iText v-else>{{scope.row.applyType}}</iText>
      </template>
      <!-- 备注 -->
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
	import { applyJLTarget } from '@/api/financialTargetPrice/index'
import { dictkey } from '@/api/partsprocure/editordetail'
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
      tableTitle: [
        {props:'fsnrGsnrNum',name:'零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true},
        {props:'partNum',name:'零件号', key: "LINGJIANHAO", tooltip: true},
        {props:'partNameZh',name:'零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true},
        {props:'cfController',name:'财务控制员', key: "CAIWUKONGZHIYUAN", tooltip: true},
        {props:'applyType',name:'申请类别', key: "SHENQINGLEIBIE", tooltip: true},
        {props:'expectedTargetPrice',name:'期望目标价', key: "QIWANGMUBIAOJIA", tooltip: true},
        {props:'applyReason',name:'申请原因', key: "SHENQINGLEIBIE", tooltip: true},
        {props:'memo',name:'备注', key: "YUANMUBIAOJIA", tooltip: true},
      ]
    }
  },
  computed: {
    tableData(){
      let tableList = JSON.parse(JSON.stringify(this.tableList))
      return tableList.map(i=>{
        let obj = {
          purchasingProjectId: [i.id],
          applyType: i.applyType || 'LC',
          fsnrGsnrNum:i.fsnrGsnrNum,
          partNum:i.partNum,
          partNameZh:i.partNameZh,
          cfController:i.cfController,
          cfControllerName:i.cfControllerName,
        }
        return obj
      })
    },
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
      const params = this.selectList.filter(i=> i.cfController && i.applyType && i.expectedTargetPrice)
      console.log(params,this.selectList);
      if(params.length!=this.selectList.length){
        iMessage.warn(this.language('QINGWEIHUBITIANXIANG','请维护必填项'))
        this.saveLoading = false
        return
      }
      params.forEach(i=>{
        i.expTargetpri = i.expectedTargetPrice
        i.applicantId = i.cfController
      })
      applyJLTarget(params).then((res) => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    select(selection){
      selection.row.isEdit = true
    },
    handleSelectionChange(val) {
      this.selectList = val
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
      if (/^\d*$/.test(value)) {
        this.$set(row, name, value)
      }
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