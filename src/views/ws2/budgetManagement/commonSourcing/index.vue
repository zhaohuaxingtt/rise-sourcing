<template>
  <div>
    <div v-loading="mainLoading" v-permission="TOOLING_BUDGET_COMMONSOURCING_MODELBAGBUDGET">
      <div class="header">
        <div>
          车型包名称
          <iInput v-model="packageNameZh" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="pageCarTypePackage"></i>
          </iInput>
        </div>
        <div class="btns">
          <iButton @click="hanldeDownload">{{$t('下载模板')}}</iButton>
          <Upload
              class="upload-demo"
              ref="uploadRef"
              :action="actionUrl"
              :on-change="beforeUpload"
              :on-success="onSuccess"
              :before-upload="beforeAvatarUpload"
              :before-remove="beforeRemove"
              :limit="1"
              :show-file-list="false"
              :file-list="uploadFiles">
            <iButton icon="el-icon-circle-plus-outline" type="primary">新增车型包</iButton>
          </Upload>
        </div>
<!--        <iButton icon="el-icon-circle-plus-outline" @click="addCarTypeBag" type="primary">新增车型包</iButton>-->
      </div>
      <div class="content" v-loading="tableLoading">
        <div class="title">
          <div>{{ $t('车型包名称') }}</div>
          <div>{{ $t('起始时间') }}</div>
          <div>{{ $t('最近更新时间') }}</div>
          <div>{{ $t('更新人') }}</div>
          <div>
            <span class="marginRight50">{{ $t('上移一级') }}</span>
            <span>{{ $t('下移一级') }}</span>
          </div>
        </div>
        <div class="table" v-for="(item, index) in tableListData" :key="index">
          <div>
            <div class="carTypeName" @click="toBagList(item.id)">
              <icon symbol name="iconchexingbao" class="carTypeIcon"></icon>
              <span>{{ item.packageNameZh }}</span>
            </div>
          </div>
          <div>{{ item.createDate }}</div>
          <div>{{ item.updateDate }}</div>
          <div>{{ item.updateByName }}</div>
          <div>
            <icon symbol @click.native="dataMove(item, 1)" name="iconshangyiyiji"
                  class="carTypeIcon marginRight50"></icon>
            <icon symbol @click.native="dataMove(item, 2)" name="iconxiayiyiji" class="carTypeIcon"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iInput, iButton, iMessage, icon} from 'rise'
import {Upload} from "element-ui"
import {pageCarTypePackage, dataMove, commonSourcingExport} from '@/api/ws2/commonSourcing'

export default {
  name: "commonSourcing",
  components: {
    iInput,
    iButton,
    icon,
    Upload
  },
  data() {
    return {
      packageNameZh: '',
      mainLoading: false,
      tableLoading: false,
      tableListData: []
    }
  },
  computed: {
    actionUrl() {
      return process.env.VUE_APP_TOOLING + '/CSBudget' + '/create'
    }
  },
  created() {
    this.pageCarTypePackage()
  },
  methods: {
    // addCarTypeBag(){
    //   this.$router.push({
    //     path: '/tooling/budgetManagement/addModelBag',
    //   })
    // },
    onSuccess(res){
      const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
      this.$refs['uploadRef'].clearFiles();
      if (Number(res.code) === 0) {
        this.$router.push({
          path: '/tooling/budgetManagement/addModelBag',
          query: {
            carTypePackageId: res.data.carTypePackageId
          }
        })
        iMessage.success(result);
      } else {
        iMessage.error(result);
      }
      this.mainLoading = false
    },
    beforeAvatarUpload(file) {
      this.mainLoading = true;
      let FileExt = file.name.replace(/.+\./, "").toLowerCase();
      let flag = ["xls", "xlsx"].includes(FileExt);
      if (!flag) {
        this.mainLoading = false;
        iMessage.error("只能上传excel文件!");
      }
      return flag;
    },
    toBagList(carTypePackageId){
      this.$router.push({
        path: '/tooling/budgetManagement/addModelBag',
        query: {
          carTypePackageId: carTypePackageId
        }
      })
    },
    add() {
      this.$router.push({
        path: '/tooling/budgetManagement/addModelBag',
      })
    },
    pageCarTypePackage() {
      this.tableLoading = true
      pageCarTypePackage({
        packageNameZh: this.packageNameZh,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData = res.data;
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
      })
    },
    dataMove(item, behaviorCode) {
      console.log(1)
      this.tableLoading = true
      dataMove({
        behaviorCode: behaviorCode,
        carTypePackageId: item.id,
        sortOrder: item.sortOrder,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.pageCarTypePackage()
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
      })
    },
    hanldeDownload(){
      this.mainLoading = true;
      let params = {
        cartypePackageId: null,
        versionId: null,
        commodity: null,
        categoryId: null,
      }
      commonSourcingExport(params)
        .then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            iMessage.success(result)
          } else {
            iMessage.error(result)
          }
          this.mainLoading = false;
        }).catch(() => (this.mainLoading = false));
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .btns{
    display: flex;
    ::v-deep .upload-demo{
      margin-left: 10px;
    }
  }
  ::v-deep .el-input {
    width: 220px;
    margin-left: 20px;
  }

  ::v-deep .el-button--primary {
    font-size: 16px;
    color: #1660F1;
    background-color: #EEF2FB;
    border-color: #EEF2FB;
  }
}

.content {
  .title, .table {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-bottom: 20px;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      .carTypeName {
        width: 80%;
        height: 60px;
        cursor: pointer;
        .carTypeIcon {
          margin-right: 45px;
        }
        span{
          display: inline-block;
          max-width: 150px;
          min-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      width: 25%;

      .marginRight50 {
        margin-right: 50px;
      }

      .carTypeIcon {
        font-size: 30px;
        vertical-align: 14px;
        cursor: pointer;
      }
    }
  }

  .table {
    height: 60px;
    line-height: 60px;
    font-weight: 400;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    border-radius: 10px;
  }
}
</style>