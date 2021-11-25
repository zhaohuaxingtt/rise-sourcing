<template>
  <iCard
    class="volume"
    tabCard
  >
    <div class="body">
        <div>
          <span class="title" v-if="params.partProjectSource == 1">
            {{`${language('LK_LINGJIANMEICHEYONGLIANG','零件每车用量')}（${ language('LK_DANGQIANBANBEN','当前版本') } : V${version}）`}}
          </span>
          <div class="btn-left">
            <iButton v-if="isEdit" @click="fillDown()">{{ language("LK_XIANGXIATIANCHONG",'向下填充') }}</iButton>
            <iButton v-if="isEdit" @click="calculation()">{{ language("LK_JISUANCHANLIANG",'计算产量') }}</iButton>
            <iButton v-if="isEdit" @click="deleteData()">{{ language("LK_SHANCHU",'删除') }}</iButton>
            <iButton v-if="isEdit" @click="addCar">{{ language("LK_TIANJIA",'添加') }}</iButton>
            <iButton v-if="isEdit" @click="saveData">{{ language("LK_BAOCUN",'保存') }}</iButton>
            <iButton v-if="!isEdit" @click="edit()">{{ language("LK_BIANJI",'编辑') }}</iButton>
          </div>
        </div>
      <tableList
        class="table"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :editable = "perCarDosage"
        @handleSelectionChange="handleSelectionChange"
        @getIndex="getIndex" 
        @isNum="isNum"
      />
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getData)"
        @current-change="handleCurrentChange($event, getData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
		    v-update
      />
    </div>
      <addCarType :dialogVisible="carTypeVisible" @changeVisible="changeVisible" @getSelectData="getSelectData" :params="params">

      </addCarType>
  </iCard>
</template>

<script>
import { iCard, iPagination, iMessage, iButton } from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList";
import { pageMixins } from "@/utils/pageMixins";
import { volumeTableTitle as tableTitle } from "./data";
import {
  getPerCarDosageVersion,
  getPerCarDosageInfo,
} from "@/api/partsign/editordetail";
import {
  savearDosage,
  calculateOutput,
  manualInfoTable,
  delCarDosage,
  fscalculateOutput,
  gscalculateOutput
  // getPerCarDosageInfo,
} from "@/api/partsprocure/editordetail";
import addCarType from './components/addCarType'
export default {
  components: { iCard, tableList, iPagination, iButton, addCarType },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      version: "",
      carTypeConfigId: "",
      tpId: "",
      isEdit:false,
      carTypeVisible:false,
      selectData:[],
      getPerCarDosage:{},
      isGs:true
    };
  },
  props: {
    params: {
      type: Object,
      require: true,
      default:()=>{}
    },
  },
  created() {
    this.getData();
     if(this.params.partProjectType == '1000003' || this.params.partProjectType == '50002001') {
      this.isGs = true
    } else {
      this.isGs = false
    }
},
  methods: {
    async getData() {  
      this.loading = true;
      if (this.params.partProjectSource == 1) {
        try {
          if ((!this.version || !this.carTypeConfigId) && this.params.purchasingRequirementId) {
            const versionRes = await getPerCarDosageVersion({
              currPage: 1,
              pageSize: 10,
              status: 1,
              purchasingRequirementId: this.params.purchasingRequirementId,
            });
  
            this.version = "V1";
  
            if (versionRes.code != 200) {
              return iMessage.error(`${ this.$i18n.locale === 'zh' ? versionRes.desZh : versionRes.desEn }`)
            }
  
            if (
              versionRes.data &&
              Array.isArray(versionRes.data.tpRecordList) &&
              versionRes.data.tpRecordList[0]
            ) {
              this.carTypeConfigId = versionRes.data.tpRecordList[0].carTypeConfigId;
              this.version = versionRes.data.tpRecordList[0].version || "V1";
              this.tpId = versionRes.data.tpRecordList[0].tpId
            }
          }
  
          if(!this.carTypeConfigId) return;
          const infoRes = await getPerCarDosageInfo({
            carTypeConfigId: this.carTypeConfigId,
            version: this.version,
            currPage: this.page.currPage,
            pageSize: this.page.pageSize,
            status: 1,
            tpId: this.tpId,
            purchasingRequirementId: this.params.id,
          });
  
          if (infoRes.code != 200) {
            return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
          }
  
          if (infoRes.data) {
            this.tableListData = infoRes.data.tpRecordList;
            this.page.totalCount = infoRes.data.totalCount || 0;
          }
        } catch (e) {
          // console.error(e);
        } finally {
          this.loading = false;
        }
      } else {
        try{
          manualInfoTable({
            currPage: this.page.currPage,
            pageSize: this.page.pageSize,
            purchasingRequirementId: this.params.id,
          }).then(res=>{
            if(res.code == '200') 
            {
            res.data.tpRecordList.forEach(val=>{
              this.$set(val,'partNum',this.params.partNum)
              this.$set(val,'partNameZh',this.params.partNameZh)
              this.$set(val,'partNameDe',this.params.partNameDe)
            })
            this.tableListData = res.data.tpRecordList;
            this.page.totalCount = res.data.totalCount || 0;
            } else {
            return iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)

            }
          })
        }catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
        }
      }
    },
    //计算产量
    calculation() {
      let flag = true 
      this.tableListData.forEach(val=>{
        val.id == undefined ?  flag = false :''
      })
      if(flag == false) {
        iMessage.error(this.language('QINGXIANBAOCUNMEICHEYONGLIANG','请先保存每车用量'))
      }else {
        let purchasingProjectPartId=this.params.id
        if(this.isGs == false) {
           fscalculateOutput(purchasingProjectPartId).then(res=> {
            if(res.code == '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          })
        }else {
          gscalculateOutput(purchasingProjectPartId).then(res=> {
            if(res.code == '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          })
        }
      }
    },
    //编辑
    edit() {
      this.isEdit = true
    },
    //添加弹框
    addCar() {
      this.carTypeVisible = true
    },
    //关闭弹框
    changeVisible(val) {
      this.carTypeVisible = val
    },
    //表格勾选
    handleSelectionChange(val) {
      this.selectData = val
    },
    //删除
    async deleteData() {
      console.log(this.selectData.length,'this.selectData.length');
      if(!this.selectData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu', '请选择至少一条数据'))
        return
      } else {
        const flag = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
        if (flag !== 'confirm') return
          let noInterfaceDelete=[]
          let interfaceDelete=[]
          let temData = [...this.selectData]
          temData.forEach(val =>{
            if(val.id) {
              interfaceDelete.push(val)
            }else {
              noInterfaceDelete.push(val)
            }
          })
          console.log()
          const idsLsit = interfaceDelete.map(val => val.id)
            noInterfaceDelete.forEach(val=>{
                this.tableListData = this.tableListData.filter((item) => {
                if(item.cartypeConfigId !== val.cartypeConfigId ) 
                return item
              })
            })
          console.log(noInterfaceDelete);
          if(idsLsit.length != 0) {
            delCarDosage(idsLsit).then(res =>{
              if(res.code == '200') {
               iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
               this.getData()
              }
              else {
                iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
              }
            })
          }
        
      }
    },
    //获取输入框的index和值
    getIndex(index,perCar) {
      this.getPerCarDosage.index = index
      this.getPerCarDosage.perCar = perCar
    },
    //向下填充
    fillDown() {
      let data = [...this.tableListData]
      data.forEach((val,index)=>{
        if(index>this.getPerCarDosage.index){
          this.$set(val,'perCarDosage',this.getPerCarDosage.perCar)
        }
      })
      this.tableListData = [...data]
    },
    //保存
    saveData() {
      let flag = true
       this.tableListData.forEach(val => {
        if(!val.perCarDosage) {
          flag=false
        }
      })
      if(flag == false) {
        iMessage.error(this.language(' WEITIANXIEMEICHEYONGLIANGDEJILU,BUKEBAOCUN', '存在未填写每车用量的记录，不可保存'))
        return
      }  else {         
        savearDosage(this.tableListData).then(res=>{
          if(res.code == '200') {
            iMessage.success(res.desZh)
            this.getData()
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
    },

    //添加表格数据
    getSelectData(val) {
      console.log(val);
      let valTemData = []
      let copyData  = [...val]
      if(this.isGs == true) {
        copyData.forEach(value=> {
          let dataItem = {}
          dataItem.purchasingRequirementObjectId = this.params.id
          dataItem.cartypeLevel = value.cartypeLevel
          dataItem.engineType = value.engineType
          dataItem.gearType = value.gearboxName
          dataItem.otherInfo = value.otherConf
          dataItem.cartype  = value.cartypeId
          dataItem.cartypeConfigId  = value.originId
          dataItem.partNum  = value.partNum
          dataItem.partNameZh  = value.partNameZh
          dataItem.partNameDe  = value.partNameDe
          dataItem.cartypeLevelRate  = value.cartypeLevelRate
          valTemData.push(dataItem)
        })
      } else {
        copyData.forEach(value=> {
          let dataItem = {}
          dataItem.purchasingRequirementObjectId = this.params.id
          dataItem.cartypeLevel = value.cartypeLevel
          dataItem.engineType = value.engineVo.engineName
          dataItem.gearType = value.gearboxVo.gearboxName
          dataItem.otherInfo = value.otherConf
          dataItem.cartype  = value.carProjectId
          dataItem.cartypeConfigId  = value.originId == null ? value.id  : value.originId
          dataItem.cartypeLevelRate  = value.cartypeLevelRate
           dataItem.partNum  = value.partNum
          dataItem.partNameZh  = value.partNameZh
          dataItem.partNameDe  = value.partNameDe
          valTemData.push(dataItem)
        })
      }
      if(this.tableListData.length == '0') {
        this.tableListData = valTemData
      } else {
        let data = [...this.tableListData]
        data.unshift(...valTemData)
        this.tableListData = data
      }
    },
    //输入整数
    isNum(val,key,idx) {
      this.tableListData.forEach((value,index)=>{
        if(index == idx) {
          value.perCarDosage =  (val + '').replace(/\D/g, '')
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .volume {
    .title{
      font-size: 18px;
			color: #131523;
			font-weight: bold;
    }
    .btn-left{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }
  }
</style> 