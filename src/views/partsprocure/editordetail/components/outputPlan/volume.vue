<template>
  <iCard
    class="volume"
    tabCard
  >
    <div class="body">
        <div>
          <span class="title">
            {{`${language('LK_LINGJIANMEICHEYONGLIANG','零件每车用量')}（${ language('LK_DANGQIANBANBEN','当前版本') } : V${version}）`}}
          </span>
          <div class="btn-left">
            <iButton v-if="isEdit" @click="fillDown()">{{ language("LK_XIANGXIATIANCHONG",'向下填充') }}</iButton>
            <iButton v-if="isEdit">{{ language("LK_JISUANCHANLIANG",'计算产量') }}</iButton>
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
      <addCarType :dialogVisible="carTypeVisible" @changeVisible="changeVisible" @getSelectData="getSelectData">

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
  getCarDosage
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
      getPerCarDosage:{}
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
  },
  methods: {
    async getData() {
      // if (this.params.partProjectSource != 1) return // 手工创建的采购项目不调用该接口

      this.loading = true;

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
        });

        if (infoRes.code != 200) {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
        }

        if (infoRes.data) {
          this.tableListData = infoRes.data.tpRecordList;
          this.page.totalCount = infoRes.data.totalCount || 0;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
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
        alert('11',flag)
      }
    },
    //向下填充
    fillDown() {
      let data = [...this.tableListData]
      data.forEach((val,index)=>{
        if(index>this.getPerCarDosage.index){
          val.perCarDosage = this.getPerCarDosage.perCar
        }
      })
      this.tableListData = data
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

        savearDosage([...this.tableListData]).then(res=>{
          if(res.code == '200') {
            this.getData()
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
    },
    //获取输入框的index和值
    getIndex(index,perCar) {
      this.getPerCarDosage.index = index
      this.getPerCarDosage.perCar = perCar
    },
    //添加表格数据
    getSelectData(val) {
      console.log(val,'-------------------');
      if(this.tableListData.length == '0') {
        this.tableListData = val
      } else {

      }
    },
    //输入整数
    isNum(val,key,idx) {
      this.tableListData.forEach((value,index)=>{
        if(index == idx) {
          value.perCarDosage =  (val + '').replace(/\D/g, '')
          console.log(value.perCarDosage,);
        }
      })
      console.log(idx,val,key,'++++++++++sdfsdfjldskjfjdlkfj');
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