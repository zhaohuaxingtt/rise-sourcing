<template>
  <!--转派-->
  <iDialog
    :title="language('BIDDING_YAOQINGGONGYINGSHANG', '邀请供应商')"
    :visible.sync="show"
    append-to-body="true"
    width="95%"
    top="5vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="card">
      <div class="card__header"></div>
      <div class="card__body">
        <el-form :model="form" ref="ruleForm">
          <el-row>
            <el-form-item prop="supplierType" class="el-p" :label="language('BIDDING_CAIGOULEIXING', '采购类型')">
              <!-- <iInput
                :placeholder="$t('LK_QINGSHURU')"
                :value="form.type"
                disabled
              ></iInput> -->
              <iSelect v-model="form.supplierType" >
                <el-option
                  v-for="item in supplierType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item prop="supplierName" :label="language('BIDDING_GONGSIMINGCHENG', '公司名称')">
              <iInput
                :placeholder="language('BIDDING_QINGSHURU', '请输入')"
                v-model="form.supplierName"
              ></iInput>
            </el-form-item>
            <el-form-item prop="sapCode" :label="language('BIDDING_GYSBH', '供应商编号')">
              <iInput
                :placeholder="language('BIDDING_QINGSHURU', '请输入')"
                v-model="form.sapCode"
              ></iInput>
            </el-form-item>
            <el-form-item class="el-btn">
              <iButton @click="handleSearch">{{ language('BIDDING_QUEREN', '确认') }}</iButton>
              <iButton @click="handleReset">{{ language('BIDDING_CHONGZHI','重置') }}</iButton>
            </el-form-item>
          </el-row>
        </el-form>
        <el-divider></el-divider>
        <div class="tab_top">
          <iButton
            @click="handleChecked"
            :disabled="selectedTableData.length <= 0"
            >{{ language('BIDDING_TIANJIA', '添加') }}</iButton
          >
        </div>
        <iTableCustom
          ref="multipleTable"
          :loading="tableLoading"
          :data="tableListData"
          :columns="supplierTableListColumns"
          @handle-selection-change="handleSelectionChange"
        >
          <template #nameZh="scope">
            {{scope.row.nameZh}}
            <!-- <supplierBlackIcon/> -->
          </template>
        </iTableCustom>
        <iPagination
          v-update
          @current-change="handleCurrentChange($event, query)"
          @size-change="handleSizeChange($event, query)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :prev-text="language('BIDDING_SHANGYIYE','上一页')"
          :next-text="language('BIDDING_XIAYIYE','下一页')"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.total"
        />
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iPagination,iSelect } from "rise";
import iTableCustom from "@/components/biddingComponents/iTableCustom";
import { pageMixins } from "@/utils/pageMixins";
import { getSupplierInfo } from "@/api/mock/mock";
import { supplierTableListColumns } from "./data";
import { getBlackStuffList } from "@/api/bidding/bidding";
// import supplierBlackIcon from "@/views/partsrfq/components/supplierBlackIcon"

export default {
  mixins: [pageMixins],
  components: {
    iSelect,
    iDialog,
    iInput,
    iPagination,
    iTableCustom,
    iButton,
  },
  props: {
    show: { type: Boolean, default: false },
    suppliers: { type: Array },
    binddingRuleForm: {type: Object, default: () => {}}
  },
  watch: {
    show() {
      if (this.show) {
        // console.log("supplierListDialog-=-=-=-=-=-=-=-=-", this.suppliers);
        this.query();
      }
    },
  },
  computed: {
    // tableListDataList() {
    //   // let result = [];
    //   // let count = 0;
    //   // while (count * this.page.pageSize < this.tableListData?.length) {
    //   //   result.push(
    //   //     this.tableListData.slice(
    //   //       count * this.page.pageSize,
    //   //       this.page.pageSize * (count + 1)
    //   //     )
    //   //   );
    //   //   count++;
    //   // }
      
    //   const { currPage, pageSize } = this.page;
    //   return this.tableListData?.slice((currPage - 1) * pageSize, pageSize * currPage);
    // },
  },
  data() {
    return {
      tableListData: [],
      typeObject: {},
      supplierTableListColumns,
      form: {
        supplierType: null,
        supplierName: null,
        sapCode: null,
      },
      supplierType:[
        {
          label: this.language('BIDDING_SHENGCHAN', '生产'),
          value:'PP',
        },
        {
          label: this.language('BIDDING_YIBAN', '一般'),
          value:'GP',
        },
        {
          label: this.language('BIDDING_GONGYONG', '共用'),
          value:'PD',
        },
      ],
      selectedTableData: [],
      tableLoading: false,
    };
  },
  mounted() {
  this.query();
  },
  methods: {
    async query() {
      this.tableLoading = true;
      const param = {
        supplierName:this.form.supplierName,
        sapCode:this.form.sapCode,
        supplierType:this.form.supplierType || 'PP',
        pageNo:this.page.currPage,
        pageSize:this.page.pageSize
      }
      const res = await getSupplierInfo(param);

      const { name, code } = this.form;
      // this.tableListData = (res.data || []).filter(
      //   (item) => item.nameZh.includes(name) && item.supplierId.includes(code)
      // );
      this.tableListData = res?.data
      this.page.total = res.total;
      // this.page.currPage = 1;
      // this.page.pageSize = 1;
      // this.page.pageSizes = [1, 2, 3, 4];
      this.tableLoading = false;
    },
    handleSearch() {
      this.query();
    },
    handleReset() {
      this.$refs["ruleForm"].resetFields();
      this.query();
    },
    clearDiolog() {
      this.$emit("update-show");
    },
    // handleChangePage(e) {
    //   this.page.currPage = e;
    //   // let param = {
    //   //   pageNum: this.page.currPage,
    //   //   pageSize: 10,
    //   // };
    //   // this.query(param);
    // },
    // 表格选中值集
    async handleSelectionChange(val) {
      console.log(this.suppliers)
      console.log(val)
      
      let flag = false
      const res = await this.handleBlackStuffList(val)
      flag = !!res?.data?.length
      console.log(res)
      let isHad = false;
      let selection = this.$refs.multipleTable.$children[0].selection;
      if (this.suppliers.length != 0) {
        for (let i = 0; i < this.suppliers.length; i++) {
          for (let j = 0; j < val.length; j++) {
            if (this.suppliers[i].supplierId == val[j].subSupplierId || flag) {
              isHad = true;
              selection.splice(j, 1);
              val.splice(j, 1);
              // this.$refs.multipleTable.$children[0].toggleAllSelection(val)
            } else {
              isHad = false;
              this.selectedTableData = val;
            }
          }
        }
      } else {
        this.selectedTableData = val;
      }
      if (flag) {
        return this.$message.error(this.language('BIDDING_SKGYSBKXJ','受控供应商不可询价！'));
      }
      if (isHad) {
       return this.$message.error(this.language('BIDDING_YCZGYS', "已存在供应商"));
      }
      // this.selectedTableData = val;
    },

    // 判断是否有供应商黑名单
    handleBlackStuffList(val){
      const { products } = this.binddingRuleForm
      const fsnrGsnrList = products?.map(item => item.fsnrGsnr) || []  
      const supplierIdList = val?.map(item => Number(item.subSupplierId)) || []
      const blackData = {fsnr: fsnrGsnrList, spplierIds: supplierIdList}
      return new Promise((resolve, reject) => {
        if ( fsnrGsnrList.length && supplierIdList.length) {
          getBlackStuffList(blackData).then((res) => {
            resolve(res)
          }).catch(err => {
            reject(false)
          })
        } else {
          resolve(false)
        }
      })
    },
    // handleSizeChange(val) {
    //   console.log("handleSizeChange", this.page);
    //   this.page.pageSize = val;
    // },
    checkSelect(row, index) {
      console.log("表格点击", row);
    },
    handleChecked() {
      this.$emit("save-checked", this.selectedTableData);
      this.clearDiolog();
    },
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.card {
  padding-bottom: 20px;
  min-height: 778px;
  color: $color-black;

  .card__header {
    display: flex;
    justify-content: space-between;
    .card__header__item {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .card__body {
    margin-top: 10px;
    height: auto;
    overflow: hidden;
    min-height: 778px;
    ::v-deep .el-form {
      margin-right: -17%;

      .el-form-item {
        margin-bottom: 2px;
        width: 20%;
        float: left;
        margin-right: 4%;
        padding-left: 2px;
        padding-top: 5px;
        padding-bottom: 5px;
        display: flex;
        align-items: center;
        .el-form-item__label {
          width: 40%;
          font-size: 14px;
          color: $color-black;
          font-weight: 400;
          line-height: 14px;
          margin-bottom: 8px;
          text-align: left;
        }

        .el-form-item__content {
          width: 100%;
        }
      }
      .el-p {
        .el-form-item__content {
          .el-input {
            width: 100%;
            .el-input__inner {
              text-align: center;
              color: $color-black;
            }
          }
        }
      }
    }
    .tab_top {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
    }
  }
}
::v-deep .el-divider--horizontal {
  height: 1px;
}
::v-deep .el-button--default {
  min-width: 130px;
}
::v-deep .has-gutter tr {
  background-color: #eaf1fd;
}
::v-deep .el-table th {
  background-color: #eaf1fd;
}
</style>
