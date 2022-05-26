<template>
  <iCard
    class="volume"
    tabCard
  >
    <template #header>
      <div class="title">
      <p>{{language('LK_LINGJIANMEICHEYONGLIANG','零件每车用量')}} <template v-if="params.partProjectSource == 1">{{`（${ language('LK_DANGQIANBANBEN','当前版本') } : ${ versionComputed }）`}}</template></p>
      </div>
      <div>
        <div class="control">
          <div v-if="!disabled" class="btn-left">
            <iButton v-if="isEdit" @click="addCar" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_ADD|添加">{{ language("LK_TIANJIA",'添加') }}</iButton>
            <iButton v-if="isEdit" @click="saveData" :loading="saveLoading" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_SAVE|保存">{{ language("LK_BAOCUN",'保存') }}</iButton>
            <iButton v-if="isEdit" @click="calculation()" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_CALCULATION|计算产量">{{ language("LK_JISUANCHANLIANG",'计算产量') }}</iButton>
            <iButton v-if="isEdit" @click="deleteData()" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_DELETE|删除">{{ language("LK_SHANCHU",'删除') }}</iButton>
            <iButton v-if="isEdit" @click="fillDown()" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_FILLDOWN|向下填充">{{ language("LK_XIANGXIATIANCHONG",'向下填充') }}</iButton>
            <iButton v-if="!isEdit && ispartProjectSource" @click="edit()" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_EDIT|编辑/取消">{{ language("LK_BIANJI",'编辑') }}</iButton>
            <iButton v-if="isEdit" @click="cancelEdit" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_VOLUME_EDIT|编辑/取消">{{ language("QUXIAO",'取消') }}</iButton>
          </div>
        </div>
      </div>
    </template>
    <div class="body">
      <tableList
        class="table"
        ref="table"
        index
        lang
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #perCarDosage="scope">
          <iInput v-if="isEdit && ispartProjectSource" v-model="scope.row.perCarDosage" @click.native.stop @focus="handleFocusByInput(scope.row)" @input="handleInputByPerCarDosage($event, scope.row)" />
          <span v-else>{{ scope.row.perCarDosage }}</span>
        </template>
        <!-- <template #cartypeLevelRate="scope">
          <span>{{ percent(scope.row.cartypeLevelRate) }}</span>
        </template> -->
      </tableList>
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
      <addCarType :dialogVisible="carTypeVisible" v-if="carTypeVisible"  @changeVisible="changeVisible" @getSelectData="getSelectData" :params="params" @afterSave="getData" />
  </iCard>
</template>

<script>
import { iCard, iPagination, iMessage, iButton, iInput } from 'rise';
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
import { cloneDeep } from "lodash"
import { numberProcessor } from "@/utils"

export default {
  components: { iCard, tableList, iPagination, iButton, addCarType, iInput },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      tableListDataCache: [], // 表格缓存
      totalCountCache: 0, // 数据量缓存
      version: "",
      carTypeConfigId: "",
      tpId: "",
      isEdit:false,
      carTypeVisible:false,
      selectData:[],
      ispartProjectSource:false,
    };
  },
  props: {
    params: {
      type: Object,
      require: true,
      default:()=>{}
    },
    isSameGroupPartProjectType: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sourcePartProjectType: {
      type:String
    }
  },
  created() {
    this.getData();
    if(this.params.partProjectSource == 2) {
      this.ispartProjectSource = true
    } else {
      this.ispartProjectSource = false
    }
  },
  computed:{
    // ispartProjectSource() {
    //    if(this.params.partProjectSource == 2) {
    //   return true
    // } else {
    //   return false
    // }
    // }
    versionComputed() {
      const str = this.version ? this.version + "" : "V1"
      
      return !/^v\d+$/i.test(str) ? `V${ str }` : str 
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
              cartypeProjectId: this.params.carTypeProjectId,
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
            infoRes.data.tpRecordList.forEach(val=>{
            })
            this.tableListData = Array.isArray(infoRes.data.tpRecordList) ? infoRes.data.tpRecordList : []
            this.page.totalCount = infoRes.data.totalCount || 0;
          }

          if (!this.isSameGroupPartProjectType) {
            this.tableListData = []
          }
        } catch (e) {
          // console.error(e);
        } finally {
          this.loading = false;
        }
      } else {
        manualInfoTable({
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          purchasingRequirementId: this.params.purchasingRequirementId,
        }).then(res=>{
          if(res.code == '200') 
          {
          res.data.tpRecordList.forEach(val=>{
            this.$set(val,'partNum',this.params.partNum)
            this.$set(val,'partNameCn',this.params.partNameZh)
            this.$set(val,'partNameDe',this.params.partNameDe)
          })
          this.tableListData = Array.isArray(res.data.tpRecordList) ? res.data.tpRecordList : []
          this.tableListDataCache = cloneDeep(Array.isArray(res.data.tpRecordList) ? res.data.tpRecordList : [])
          this.page.totalCount = res.data.totalCount || 0;
          this.totalCountCache = res.data.totalCount || 0

          this.selectData = []

          if (!this.isSameGroupPartProjectType) {
            this.tableListData = []
          }
          } else {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)

          }
        })
        .finally(() => this.loading = false)
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
        
        if(this.isGSType(this.sourcePartProjectType) == false) {
           fscalculateOutput(purchasingProjectPartId).then(res=> {
            if(res.code == '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
              this.$emit('updateStartYear')
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          })
        }else {
          gscalculateOutput(purchasingProjectPartId).then(res=> {
            if(res.code == '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
              this.$emit('updateStartYear')
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
    // 取消编辑
    cancelEdit() {
      this.isEdit = false
      this.tableListData = cloneDeep(this.tableListDataCache)
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
          const idsLsit = interfaceDelete.map(val => val.id)
            noInterfaceDelete.forEach(val=>{
                this.tableListData = this.tableListData.filter((item) => {
                if(item.cartypeConfigId !== val.cartypeConfigId ) 
                return item
              })
            })
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
    // input聚焦转换成自动勾选当前行
    handleFocusByInput(row) {
      this.$refs.table.$refs.table.clearSelection()
      this.$refs.table.$refs.table.toggleRowSelection(row, true)
    },
    //向下填充
    fillDown() {
      this.$nextTick(() => {
        if (this.selectData.length != 1) return iMessage.warn(this.language("QINGXUANZEYITIAOMEICHEYONGLIANGSHUJUJINXINGXIANGXIATIANCHONG", "请选择一条每车用量数据进行向下填充"))
        if (!this.selectData[0].perCarDosage) return iMessage.warn(this.language('QINGSHURUMEICHEYONGLIANG','请输入每车用量'))

        let afterFoucsRowFlag = false
        this.tableListData.forEach(item => {
          if (afterFoucsRowFlag) this.$set(item, "perCarDosage", this.selectData[0].perCarDosage)

          if (item === this.selectData[0]) afterFoucsRowFlag = true
        })

        this.$refs.table.$refs.table.clearSelection()
      })
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
      } else {
        this.saveLoading = true     
        savearDosage(this.tableListData).then(res=>{
          if(res.code == '200') {
            iMessage.success(res.desZh)
            this.getData()
          } else {
            iMessage.error(res.desZh)
          }
        }).finally(() => this.saveLoading = false)
      }
    },
    //添加表格数据
    // getSelectData(val) {
    //   let valTemData = []
    //   let copyData  = [...val]
    //   if(this.isGs == true) {
    //     copyData.forEach(value=> {
    //       let dataItem = {}
    //       dataItem.purchasingRequirementId = this.params.purchasingRequirementId
    //       dataItem.cartypeLevel = value.cartypeLevel
    //       dataItem.engineType = value.engineType
    //       dataItem.gearType = value.gearboxName
    //       dataItem.otherInfo = value.otherConf
    //       dataItem.cartype  = value.cartypeId
    //       dataItem.cartypeConfigId  = value.originId
    //       dataItem.partNum  = this.params.partNum
    //       dataItem.partNameCn  = this.params.partNameZh
    //       dataItem.partNameDe  = this.params.partNameDe
    //       dataItem.cartypeLevelRate  = value.cartypeLevelRate
    //       valTemData.push(dataItem)
    //     })
    //   } else {
    //     copyData.forEach(value=> {
    //       let dataItem = {}
    //       dataItem.purchasingRequirementId = this.params.purchasingRequirementId
    //       dataItem.cartypeLevel = value.cartypeLevel
    //       dataItem.engineType = value.engineVo?.engineName
    //       dataItem.gearType = value.gearboxVo?.gearboxName
    //       dataItem.otherInfo = value.otherConf
    //       dataItem.cartype  = value.carProjectId
    //       dataItem.cartypeConfigId  = value.originId == null ? value.id  : value.originId
    //       dataItem.cartypeLevelRate  = value.cartypeLevelRate
    //       dataItem.partNum  = this.params.partNum
    //       dataItem.partNameCn  = this.params.partNameZh
    //       dataItem.partNameDe  = this.params.partNameDe
    //       valTemData.push(dataItem)
    //     })
    //   }
    //   if(this.tableListData.length == '0') {
    //     this.tableListData = valTemData
    //   } else {
    //     // 去重
    //     const savedOriginIds = this.tableListData.map(item => item.originId)
    //     const data = val.filter(item => !savedOriginIds.includes(item.originId))
    //     this.tableListData = data.concat(this.tableListData)
    //   }
    // },
    //输入整数
    handleInputByPerCarDosage(value, row) {
      this.$set(row, "perCarDosage", numberProcessor(value, 0))
    },
    // 清空数据
    clearAll() {
      if (this.params.partProjectSource == 1) return

      this.tableListData = []
      this.selectData = []
      this.page.totalCount = 0
    },
    // 还原表格
    reduction() {
      if (this.params.partProjectSource == 1) return

      this.tableListData = this.tableListDataCache
      this.page.totalCount = this.totalCountCache
    },
    //是否GS
    isGSType(data) {
      return data == '1000003' || data =='50002001'
    },
    percent(val) {
      return math.multiply(math.bignumber(val), 100).toString() + '%'
    }
  },
};
</script>

<style lang="scss" scoped>
</style> 
