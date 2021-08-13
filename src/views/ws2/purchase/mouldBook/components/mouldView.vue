<template>
  <div>
    <div v-permission="PURCHASE_MOULDBOOK_MOULDVIEW">
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
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model.trim="form['partsNum']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_CAILIAOZU', '材料组')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['categoryName']" ></iInput>
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

          <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')">
            <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['supplier']" ></iInput>
          </el-form-item>

          <el-form-item :label="language('LK_GONGYILEIXING', '工艺类型')">
            <!-- <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput> -->
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['craftType']"
                filterable
                ref="carTypeProjectRef"
                clearable
            >
              <el-option
                  :value="item"
                  :label="item"
                  v-for="(item, index) in processTypeList"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>

          <el-form-item :label="language('LK_ZICHANFENLEIBIANHAO', '资产分类编号')">
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="form['assetTypeNum']"
                filterable
                ref="carTypeProjectRef"
                clearable
            >
              <el-option
                  :value="item.value"
                  :label="item.name"
                  v-for="(item, index) in assetsTypeList"
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
          :tableData="tableList"
          :tableTitle="assetsTableHead"
          :tableLoading="tableLoading"
          :selection="false"
        >

          <template #partsShareNum="scope">
            <div v-if="scope.row.partsShareNum">
              <Popover
                  placement="bottom"
                  trigger="hover">
                <div>
                  <div v-for="(item, index) in scope.row.partsShareNum.split(',')" :key="index">{{ item }}</div>
                </div>
                <div slot="reference">
                  {{ scope.row.partsShareNum.split(',')[0] }}<span v-if="scope.row.partsShareNum.split(',').length > 1">...</span>
                </div>
              </Popover>
            </div>
            <div v-else>{{ scope.row.partsShareNum }}</div>
          </template>

          <template #picture="scope">
            <div v-if="scope.row.picture" class="table-link" @click="openPhotoList(scope.row.picture.split(','))">查看</div>
            <div v-else></div>
          </template>

          <template #assetTotal="scope">
            <div v-if="scope.row.isPremission">{{getTousandNum(NumFormat(scope.row.assetTotal))}}</div>
            <div v-else>-</div>
          </template>

          <template #assetPrice="scope">
            <div v-if="scope.row.isPremission">{{getTousandNum(NumFormat(scope.row.assetPrice))}}</div>
            <div v-else>-</div>
          </template>
        </iTableList>

        <iPagination
            v-update
            @size-change="handleSizeChange($event, getTableData)"
            @current-change="handleCurrentChange($event, getTableData)"
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

      <PhotoList :imgList="imgList" :visible="visible" @changeLayer="() => visible = false" />
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
import PhotoList from "../../components/photoList";
import { mouldForm, assetsTableHead } from "./data";
import UnitExplain from "./unitExplain";
import {
  assetTypes,
  moldViewDeptPullDown,
  moldViewCarTypePullDown,
  craftTypes,
  findMoldViewPage,
  moldViewExport
} from "@/api/ws2/purchase/mouldBook";
import { cloneDeep } from "lodash";
import { pageMixins } from "@/utils/pageMixins";
import { tableHeight } from "@/utils/tableHeight";
import { getTousandNum, NumFormat } from "@/utils/tool";
import {Switch, Popover} from "element-ui"

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iCard,
    iTableList,
    iButton,
    UnitExplain,
    iPagination,
    PhotoList,
    Popover
  },

  mixins: [tableHeight, pageMixins],

  data(){
    return {
      form: cloneDeep(mouldForm),
      departmentList: [], //  科室列表
      fromGroup: [],  //  车型项目
      assetsTypeList: [], //  资产分类编号
      tableList: [],
      tableLoading: false,
      assetsTableHead,
      loadingiSearch: false,
      processTypeList: [],
      page: {
        currPage: 1,
        pageSize: 10,
      },
      getTousandNum,
      NumFormat,
      exportLoding: false,
      imgList: [],
      visible: false,
    }
  },

  created(){
    this.getSearchData();
    this.getTableData();
  },

  methods: {

    sure(){
      this.page.currPage = 1;
      this.getTableData();
    },

    openPhotoList(imgList){
      this.visible = true;
      this.imgList = imgList;
    },

    getTableData(){
      this.tableLoading = true;
      const param = {
        ...this.form,
        current: this.page.currPage,
        size: this.page.pageSize,
      }
      findMoldViewPage(param).then(res => {

        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          this.tableList = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
        }else{
          iMessage.error(result);
        }

        this.tableLoading = false;
      }).catch(err => {
        this.tableLoading = false;
      })
    },

    reset(){
      this.form = cloneDeep(mouldForm);
      this.getTableData();
    },

    getSearchData(){
      this.loadingiSearch = true;
      //  科室列表、资产分类编号、车型项目、工艺类型
      Promise.all([moldViewDeptPullDown(),
          assetTypes(), moldViewCarTypePullDown(), craftTypes()
      ]).then(res => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn;
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn;
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn;
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn;

        if(res[0].data){
          this.departmentList = res[0].data;
        }else{
          iMessage.error(result0);
        }

        if(res[1].data){
          this.assetsTypeList = res[1].data;
        }else{
          iMessage.error(result1);
        }

        if(res[2].data){
          this.fromGroup = res[2].data;
        }else{
          iMessage.error(result2);
        }

        if(res[3].data){
          this.processTypeList = res[3].data;
        }else{
          iMessage.error(result3);
        }

        this.loadingiSearch = false;
      }).catch(err => {
        this.loadingiSearch = false;
      })
    },

    exportList(){   //  导出
      this.exportLoding = true;
      moldViewExport(this.tableList).then(res => {
        this.exportLoding = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.multipleSelect {
  ::v-deep .el-tag {
    max-width: calc(100% - 75px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.table-link{
  color: #1763F7;
  cursor: pointer;
  text-decoration: underline;
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
</style>