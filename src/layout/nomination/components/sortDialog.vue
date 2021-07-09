<template>
  <iDialog class="sort-menu-dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{$t('strategicdoc.ZiDingYi')}}</div>
      <div class="control">
        <iButton :loading="submiting" @click="submit">{{ $t('LK_BAOCUN') }}</iButton>
        <iButton :loading="isLoading" @click="reset">{{ $t('LK_CHONGZHI') }}</iButton>
      </div>
    </div>
    <div class="body">
      <tableList
        :selection="false"
        :height="280"
        v-show="visible"
        class="table"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange">
        <template #flag="scope">
          <a class="link-underline" v-if="scope.row.flag === 1" @click="toggleVisible(scope.row, 0)">
            <icon symbol name="iconyincang" class="icon trigger-visible" />
          </a>
          <a class="link-underline" @click="toggleVisible(scope.row, 1)" v-else>
            <icon symbol name="iconxianshi" class="icon trigger-visible" />
          </a>
        </template>
        <template #sort="scope">
          <a class="link-underline" v-if="scope.$index === 0">
            <icon symbol name="iconpaixu-xiangshangjinzhi" class="icon" />
          </a>
          <a class="link-underline" @click="sort(scope, true)" v-else>
            <icon symbol name="iconpaixu-xiangshang" class="icon" />
          </a>

          <a class="link-underline" v-if="scope.$index === tableListData.length - 1">
            <icon symbol name="iconpaixu-xiangxiajinzhi" class="icon" />
          </a>
          <a class="link-underline"  @click="sort(scope, false)" v-else>
            <icon symbol name="iconpaixu-xiangxia" class="icon" />
          </a>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage, iButton, icon } from 'rise'
import { sortTableTitle as tableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'
import _ from 'lodash'
import { decisionType } from './data'
import {
  updateTabPageManager,
  tabPageLayoutsReset,
} from '@/api/designate'

export default {
  components: { tableList, iDialog, iButton, icon },
  mixins: [ pageMixins, filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible: {
      handler() {
        this.$nextTick(() => { if (this.visible) this.getFetchData() })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      phaseType: {},
      Selection: [],
      controlHeight: 0,
      isLoading:false,
      submiting: false
    }
  },
  methods: {
    // 切换显示， 隐藏
    toggleVisible(row, state) {
      this.$set(row, 'flag', state)
    },
    // 切换排序
    sort(scope, up = true) {
      const index = scope.$index
      if (up) {
        this.tableListData[index - 1].sort = index
        this.tableListData[index].sort = index - 1
      } else {
        this.tableListData[index + 1].sort = index
        this.tableListData[index].sort = index + 1
      }
      this.tableListData = this.tableListData.sort((a, b) => {
        return a.sort - b.sort
      })
    },
    async reset() {
      const nominateId = this.$store.getters.nomiAppId ; 
      const confirmInfo = await this.$confirm(this.$t('resetSure'))
      if (confirmInfo !== 'confirm') return
      this.isLoading = true;
      tabPageLayoutsReset(nominateId).then((res)=>{
        const { code } = res;
        this.isLoading = false;
        if(code == '200'){
          const nodes = []
          // 从接口取菜单顺序
          let nodeList = res.data.nodeList
          if (!nodeList.length) {
            iMessage.error(this.$t('strategicdoc.WuFaChongZhi'))
            return
          }
          // 取接口回来的顺序
          nodeList.forEach(tab => {
            const targetItem = decisionType.find(o => o.name === tab.tabName)
            targetItem && (tab.path = targetItem.path)
            nodes.push(tab)
          })
          this.tableListData = nodes
          this.submit(false)
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch((err)=>{
        iMessage.error(this.$i18n.locale === "zh" ? err.desZh : err.desEn)
        this.isLoading = false;
      })
      
    },
    async submit(confirm = true) {
      const { query } = this.$route;
      const {desinateId} = query;
      const data = {
        nodes: this.tableListData,
        nominateId: this.$store.getters.nomiAppId
        // phaseType: this.phaseType
      }
      if (confirm) {
        const confirmInfo = await this.$confirm(this.$t('submitSure'))
        if (confirmInfo !== 'confirm') return
      }
      this.submiting = true
      updateTabPageManager(data).then((res)=>{
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
          const nominateId = this.$route.query.desinateId || this.$store.getters.nomiAppId
          this.$store.dispatch('setNominationStep',{nominateId})
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.submiting = false
      }).catch(e => {
        this.submiting = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    getFetchData() {
      const nominationStep = this.$store.getters.nominationStep
      const tableListData = nominationStep.nodeList || []
      this.tableListData = _.cloneDeep(tableListData)
      this.phaseType = nominationStep.phaseType || {}
      console.log('tableListData', tableListData)
    },
    handleSelectionChange(list) {
      this.Selection = list
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-menu-dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .link-underline {
    display: inline-block;
    font-size: 16px;
    margin-right: 15px;
  }
  .trigger-visible {
    font-size: 20px;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
  }

  ::v-deep .el-dialog {
    width: 620px!important;
    height: 520px;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 380px;
    }

    .el-dialog__header {
      @include pdtb(30px, 20px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }
}
</style>