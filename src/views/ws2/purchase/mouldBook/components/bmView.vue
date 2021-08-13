<template>
  <div>
    <div v-permission="PURCHASE_MOULDBOOK_BMVIEW">
      <iSearch
          class="margin-bottom20 giSearch"
          style="margin-top: 20px"
          @sure="sure"
          @reset="reset"
          :icon="false"
          :resetKey="PARTSPROCURE_RESET"
          :searchKey="PARTSPROCURE_CONFIRM"
          v-loading="loadingiSearch"
      >
        <el-form>

          <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model.trim="form['behalfPartsNum']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_AEKOHAO', 'AEKO号')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['aekoNum']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_BMDANHAO', 'BM单号')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['bmNum']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_SAPDINGDANHAO', 'SAP订单号')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['sapOrder']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_RUZHANGDANHAO', '入账单号')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['enterAccountNum']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_CHEXINXIANGMU', '车型项目')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['tmCartypeProId']"
                filterable
                ref="carTypeProjectRef"
                clearable
                collapse-tags
                multiple
            >
              <el-option
                  :value="item.tmCartypeProId"
                  :label="item.tmCartypeProName"
                  v-for="(item, index) in fromGroup"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>

          <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')">
            <iInput clearable :placeholder="language('LK_QINGSHURUGONGYINGSHANGHUOBIANHAO', '请输入(11025或上海汇众)')" v-model="form['designatedSupplierId']" ></iInput>
            <!-- <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['designatedSupplierId']"
                filterable
                collapse-tags
                multiple
            >
              <el-option
                  :value="item.supplierId"
                  :label="item.supplierName"
                  v-for="(item, index) in supplierList"
                  :key="index"
              ></el-option>
            </iSelect> -->
          </el-form-item>

          <el-form-item :label="language('LK_KESHI', '科室')">
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['deptId']"
                filterable
                ref="carTypeProjectRef"
                clearable
                collapse-tags
                multiple
            >
              <el-option
                  :value="item.deptId"
                  :label="item.deptName"
                  v-for="(item, index) in departmentList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>

          <el-form-item :label="language('LK_LINLE', 'Linie')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['linieId']"
                filterable
                clearable
                collapse-tags
                multiple
            >
              <el-option
                  :value="item.linieId"
                  :label="item.linieName"
                  v-for="(item, index) in linieList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>

          <el-form-item :label="language('LK_MUJUTOUZIQINGDANZHUANGTAI', '模具投资清单状态')">
            <iSelect
                class="multipleSelect"
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['moldInvestmentStatus']"
                filterable
                ref="carTypeProjectRef"
                clearable
                collapse-tags
                multiple
            >
              <el-option
                  :value="item.bmStatus"
                  :label="item.bmStatusName"
                  v-for="(item, index) in statusList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>

          
        </el-form>
      </iSearch>

      <iCard>

        <div class="bnts">
          <iButton :loading="exportLoding" @click="exportList">{{ language('LK_DAOCHU', '导出') }}</iButton>
        </div>

        <iTableList
          :tableData="bmTableList"
          :tableTitle="bmTableHead"
          :tableLoading="tableLoading"
          :selection="false"
        >
          <!-- BM单流⽔号 -->
          <template #bmSerial="scope">
            <div class="table-link" @click="openBMDetail(scope.row)">{{scope.row.bmSerial}}</div>
          </template>

          <template #moldInvestmentAmount="scope">
            <div v-if="scope.row.isPremission">{{getTousandNum(NumFormat(scope.row.moldInvestmentAmount))}}</div>
            <div v-else>-</div>
          </template>
        </iTableList>

        <iPagination
            v-update
            @size-change="handleSizeChange($event, getTableList)"
            @current-change="handleCurrentChange($event, getTableList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
        />

        <div class="UnitExplain">
          <UnitExplain />
        </div>
        
      </iCard>
    </div>
  </div>
</template>

<script>
import {iPage, iMessage, iDialog, iButton, iSelect, iSearch, iInput,
  iPagination, iCard
} from "rise";
import {
  iTableList
} from "@/components";
import { bmForm, bmTableHead } from "./data";
import UnitExplain from "./unitExplain";
import {
  bmViewCarTypePullDown,
  bmViewDeptPullDown,
  bmViewExport,
  bmViewMoldInvestmentListStatusPullDown,
  bmViewSupplierPullDown,
  findBmViewPageList,
  isPermission,
  bmViewLiniePullDown
} from "@/api/ws2/purchase/mouldBook";
import { cloneDeep } from "lodash";
import { pageMixins } from "@/utils/pageMixins";
import { tableHeight } from "@/utils/tableHeight";
import { getTousandNum, NumFormat } from "@/utils/tool";


export default {
  mixins: [tableHeight, pageMixins],

  components: {
    iSearch,
    iSelect,
    iInput,
    iTableList,
    iCard,
    iButton,
    UnitExplain,
    iPagination
  },

  data(){
    return {
      bmTableHead,
      form: cloneDeep(bmForm),
      fromGroup: [],  //  车型项目
      departmentList: [], //  科室
      statusList: [], //  模具投资清单状态
      bmTableList: [],  //  table数据
      supplierList: [], //  供应商列表
      linieList: [],
      tableLoading: false,
      loadingiSearch: false,
      exportLoding: false,
      page: {
        currPage: 1,
        pageSize: 10,
      },
      getTousandNum,
      NumFormat,
    }
  },

  created(){
    this.getSearchData();
    this.getTableList();
  },

  methods: {

    reset(){
      this.form = cloneDeep(bmForm);
      this.getTableList();
    },

    sure(){
      this.page.currPage = 1;
      this.getTableList();
    },

    getTableList(){
      this.tableLoading = true;
      const param = {
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize,
      }
      findBmViewPageList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          this.bmTableList = res.data;
          this.page.currPage = ~~res.pageNum;
          this.page.pageSize = ~~res.pageSize;
          this.page.totalCount = ~~res.total;
        }else{
          iMessage.error(result);
        }
        

        this.tableLoading = false;
      }).catch(err => {
        this.tableLoading = false;
      })
    },

    getSearchData(){
      this.loadingiSearch = true;
      //  车型项目、科室列表、清单状态、Linie列表、供应商
      Promise.all([bmViewCarTypePullDown(), bmViewDeptPullDown(),
        bmViewMoldInvestmentListStatusPullDown(),
        bmViewLiniePullDown(),
        //bmViewSupplierPullDown()
      ]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn;

        if(res[0].data){
          this.fromGroup = res[0].data;
        }else{
          iMessage.error(result0);
        }

        if(res[1].data){
          this.departmentList = res[1].data;
        }else{
          iMessage.error(result1);
        }

        if(res[2].data){
          this.statusList = res[2].data;
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.linieList = res[3].data;
        }else{
          iMessage.error(result3);
        }

        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    exportList(){ //  导出
      this.exportLoding = true;
      bmViewExport(this.bmTableList).then(res => {
        this.exportLoding = false;
      })
    },

    openBMDetail(row){ //  跳转详情

      // let {href} = this.$router.resolve({path: `/purchase/mouldBook/details`, query: {bmSerial: row.bmSerial, id: row.id }});
      // window.open(href, '_blank');

      if(row.isPremission){

        let {href} = this.$router.resolve({path: `/purchase/mouldBook/details`, query: {bmSerial: row.bmSerial, id: row.id }});
        window.open(href, '_blank');
      }else{
        // iMessage.warn(this.language('LK_DUIBUQIMEIYOUQUANXIAN', '对不起，您所在得岗位没有该材料组权限'));
        iMessage.warn(this.$t('LK_DUIBUQIMEIYOUQUANXIAN'));
      }

      
      
    },
  }
}
</script>

<style lang="scss" scoped>
.multipleSelect{
  ::v-deep .el-tag{
    max-width: calc(100% - 85px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.UnitExplain{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.bnts{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.table-link{
  color: #1763F7;
  cursor: pointer;
  text-decoration: underline;
}
</style>