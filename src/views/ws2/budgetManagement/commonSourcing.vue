<template>
  <div>
    <div class="header">
      <div>
        车型包名称
        <iInput v-model="packageNameZh" :placeholder="$t('LK_RFQPLEASEENTERQUERY')" maxlength="6">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </iInput>
      </div>
      <iButton slot="reference" icon="el-icon-circle-plus-outline" type="primary">新增车型项目</iButton>
    </div>
    <div class="content" v-loading="tableLoading">
      <div class="title">
        <div>{{$t('车型包名称')}}</div>
        <div>{{$t('起始时间')}}</div>
        <div>{{$t('最近更新时间')}}</div>
        <div>{{$t('更新人')}}</div>
        <div>
          <span class="marginRight50">{{$t('上移一级')}}</span>
          <span>{{$t('下移一级')}}</span>
        </div>
      </div>
      <div class="table" v-for="(item, index) in tableListData" :key="index">
        <div>
          <icon symbol name="iconchexingbao" class="carTypeIcon"></icon>
          {{ item.packageNameZh }}</div>
        <div>{{ item.createDate }}</div>
        <div>{{ item.updateDate }}</div>
        <div>{{ item.updateByName }}</div>
        <div>
          <icon symbol name="iconshangyiyiji" class="carTypeIcon marginRight50"></icon>
          <icon symbol name="iconxiayiyiji" class="carTypeIcon"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iInput, iButton, iMessage, icon} from 'rise'
import {pageCarTypePackage} from '@/api/ws2/commonSourcing'
export default {
  name: "commonSourcing",
  components: {
    iInput,
    iButton,
    icon
  },
  data(){
    return {
      packageNameZh: '',
      tableLoading: false,
      tableListData: []
    }
  },
  created() {
    this.pageCarTypePackage()
  },
  methods: {
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
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.header{
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  ::v-deep .el-input{
    width: 220px;
    margin-left: 40px;
  }
  ::v-deep .el-button--primary{
    font-size: 16px;
    color: #1660F1;
    background-color: #EEF2FB;
    border-color: #EEF2FB;
  }
}
.content{
  .title, .table{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    margin-bottom: 20px;
    > div{
      width: 25%;
      .marginRight50{
        margin-right: 50px;
      }
      .carTypeIcon{
        font-size: 30px;
        vertical-align: middle;
      }
    }
  }
  .table{
    height: 60px;
    line-height: 60px;
    font-weight: 400;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    border-radius: 10px;
  }
}
</style>