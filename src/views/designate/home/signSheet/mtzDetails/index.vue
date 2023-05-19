<!--
 * @Author: youyuan
 * @Date: 2021-11-06 17:50:24
 * @LastEditTime: 2021-11-10 09:54:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\designate\home\signSheet\components\mtzDetails\index.vue
-->
<template>
    <div>
      <iCard class="margin-top20">
        <div slot="header" class="headBox">
          <p class="headTitle">{{language('XIANGQINGLIEBIAO', '详情列表')}}</p>
          <span class="buttonBox">
          <iButton v-if="isDraft" @click="handleClickChoose">{{ language("XUANZE", "选择")}}</iButton>
          <iButton v-if="isDraft || isRefuse" @click="handleRemove">{{ language("YICHU", "移除") }}</iButton>
        </span>
        </div>
        <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange">
        </tableList>
      </iCard>
      <detail v-model="detailParams.visible" v-if="detailParams.visible" :params="detailParams.data" @handleCloseModal="handleCloseModal" @handleSubmitAdd="handleSubmitAdd"/>
    </div>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import detail from './components/detail'
import { getMTZSignPage } from '@/api/designate/nomination/signsheet'
import { removeSignApp } from '@/api/designate/nomination/mApprove'
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    detail
  },
  data () {
    return {
      tableListData: [],
      tableTitle,
      loading: false,
      detailParams: {
        visible: false,
        data: []
      },
      selection: []
    }
  },
  watch: {
    tableListData(val){
      this.$emit('setData','mtz',val.length)
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
    this.getTableData()
  },
  methods: {
    // 获取table数据
    getTableData() {
      this.loading = true
      getMTZSignPage({
        signId: Number(this.$route.query.id)
      }).then(res => {
        this.loading = false
        if (res && res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
        } else iMessage.error(res.desZh)
      })
    },
    // 点击选择
    handleClickChoose() {
      this.detailParams = {
        ...this.detailParams,
        visible: true,
        data: this.tableListData.map(item => item.id)
      }
      
    },
    // 关闭弹窗
    handleCloseModal() {
      this.detailParams = {
        ...this.detailParams,
        visible: false
      }
    },
    // 提交选择数据
    handleSubmitAdd(val) {
      this.detailParams.visible = false
      if (val.length) val.map(o => {
        // 做前端标记
        o.flagSelect = true
        return o
      })
      this.$set(this, 'tableListData', this.tableListData.concat(val))
      this.$emit('save','MTZDesignateOrders')
    },
    // 选中数据
    handleSelectionChange(val) {
      this.selection = val
    },
    // 移除
    async handleRemove() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }

      const ids = []
      try {
        this.selection.forEach(item => {
          if (!item.flagSelect) ids.push(item.id)
        })

        if (ids.length) throw ids
      } catch(e) {
        return iMessage.warn(`${ this.language("SHENQINGDANHAO", "申请单号") }: ${ ids.join("、") } ${ this.language("MTZDONTDELETE", "与零件定点申请相关联，不能移除") }`)
      }

      await this.$confirm(this.language('LK_REMOVESURE', '您确定要执行移除操作吗？'))
      let params = {
        mtzApplyIdAttr: this.selection.map(item=>item.id),
        signId: Number(this.$route.query.id)
      }
      removeSignApp(params).then(res=>{
        if(res?.code==200){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getTableData()
          this.$emit('getSignSheetDetails')
        }else{
          iMessage.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'))
        }
      })
    },
    forceDelete(ids = []) {
      let params = {
        mtzApplyIdAttr: ids,
        signId: Number(this.$route.query.id)
      }
      removeSignApp(params).then(res=>{
        if(res?.code==200){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getTableData()
          this.$emit('getSignSheetDetails')
        }else{
          iMessage.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'))
        }
      })
    }
  }
}
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
