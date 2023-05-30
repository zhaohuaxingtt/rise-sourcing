<!--
 * @Author: youyuan
 * @Date: 2021-11-06 17:50:24
 * @LastEditTime: 2022-12-07 15:16:10
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\designate\home\signSheet\components\chipDetails\index.vue
-->
<template>
  <div>
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language("XIANGQINGLIEBIAO", "详情列表") }}</p>
        <span class="buttonBox">
          <iButton v-if="isDraft" @click="handleClickChoose">{{
              language("XUANZE", "选择")
          }}</iButton>
          <iButton v-if="isDraft || isRefuse" @click="handleRemove">{{
              language("YICHU", "移除")
          }}</iButton>
        </span>
      </div>
      <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading"
        :index="true" @handleSelectionChange="handleSelectionChange">
        <template #appType="scope">
          {{ scope.row.appType == '1' ? $t('定点') : $t('变更') }}
        </template>
      </tableList>
    </iCard>
    <detail v-model="detailParams.visible" v-if="detailParams.visible" :params="detailParams.data"
      @handleCloseModal="handleCloseModal" @handleSubmitAdd="handleSubmitAdd" />
  </div>
</template>

<script>
import { iCard, iButton, iMessage } from "rise";
import tableList from "@/components/ws3/commonTable";
import { tableTitle } from "./components/data";
import detail from "./components/detail";
import {
  getCHIPSignPage,
} from "@/api/designate/nomination/signsheet";
export default {
  components: {
    iCard,
    iButton,
    tableList,
    detail,
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      loading: false,
      detailParams: {
        visible: false,
        data: [],
      },
      selection: [],
    };
  },
  watch: {
    tableListData(val){
      this.$emit('setData','chip',val.length)
    }
  },
  props: {
    isRefuse: {
      type:Boolean,
      default:false
    },
    isDraft: {
      type:Boolean,
      default:false
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取table数据
    getTableData() {
      this.loading = true;
      getCHIPSignPage({
        signId: Number(this.$route.query.id),
      }).then((res) => {
        this.loading = false;
        if (res && res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : [];
        } else iMessage.error(res.desZh);
      });
    },
    // 点击选择
    handleClickChoose() {
      this.detailParams = {
        ...this.detailParams,
        visible: true,
        data: this.tableListData.map((item) => item.id),
      };
    },
    // 关闭弹窗
    handleCloseModal() {
      this.detailParams = {
        ...this.detailParams,
        visible: false,
      };
    },
    // 提交选择数据
    handleSubmitAdd(val) {
      this.detailParams.visible = false;
      if (val.length)
        val.forEach((o) => {
          // 做前端标记
          o.flagSelect = true;
          o.ttNominateAppId = o.appNo
        });
      this.$set(this, "tableListData", this.tableListData.concat(val));
      this.$emit('save','CHIPDesignateOrders')
    },
    // 选中数据
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 移除
    async handleRemove() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language("QINGZHISHAOXUANZHONGYITIAOSHUJU", "请至少选中一条数据"));
      }
      await this.$confirm(
        this.language("LK_REMOVESURE", "您确定要执行移除操作吗？")
      );
      let params = {
        chipApplyIdAttr: this.selection.map(item=>item.id),
        signId: Number(this.$route.query.id)
      }
      removeSignApp(params).then(res=>{
        if(res?.code==200){
          this.getTableData()
          this.$emit('getSignSheetDetails')
        }else{
          iMessage.error( this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
        }
      })
    },
  },
};
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;

  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }

  .buttonBox {
    position: absolute;
    right: 0;
  }
}
</style>
