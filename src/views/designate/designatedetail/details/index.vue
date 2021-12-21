<!--
 * @Author: Luoshuang
 * @Date: 2021-05-21 09:23:11
 * @LastEditors:  
 * @LastEditTime: 2021-12-02 16:22:36
 * @Description: RFQ & 零件清单界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rfqdetail\index.vue
-->

<template>
  <iCard class="desinate-detail">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language( 'DINGDIANSHENGQINGXINAGQING', '定点申请详情' ) }}</span>
      <div class="floatright">
        <iButton :loading="isLoading" @click="updateNominate()">{{
          language("LK_BAOCUN", "保存")
        }}</iButton>
        <iButton @click="reset()" style="margin-right: 10px !important">{{
          language("LK_QUXIAO", "取 消")
        }}</iButton>
      </div>
    </div>
    <div class="body">
      <el-form class="desinate-detail-rows" label-width="104px">
        <el-form-item v-for="(item, index) in titleData" :key="index" :label="language(item.key,item.label)">
          <iInput v-if="item.props === 'nominateName'" v-model="data.nominateName" :placeholder="language('LK_QINGSHURU','请输入')" />
          <iText v-else>{{data[item.props] ? data[item.props] : ''}}</iText>
        </el-form-item>
      </el-form>
      <div class="clearFloat"></div>
    </div>
  </iCard>
</template>
<script>
import Vuex from 'vuex'
import { iPage, iCard, iText, iMessage, iButton, iInput, icon } from "rise"
import { updateNominate } from '@/api/designate' 

export default {
  components:{ iCard, iText, iButton, iInput },
  computed: {
    ...Vuex.mapState({
      nominationData: (state) => state.nomination.nominationData,
    }),
  },
  data() {
    return {
      titleData:[
        {label:'申请单名称',key:'SHENQINGDANMINGCHENG', props: 'nominateName'},
        {label:'询价采购员',key:'XUNJIACAIGOUYUAN', props: 'nominateUserName'},
        {label:'linie采购员',key:'RECORDLINIECAIGOUYUAN', props: 'linieName'},
        {label:'会议名称',key:'HUIYIMINGCHENG', props: 'meetingName'},
        {label:'申请状态',key:'SHENQINGZHUANGTAI', props: 'applicationStatusDesc'},
        {label:'采购项目类型',key:'LK_CAIGOUXIANGMULEIXING', props: 'partProjType'},
      ],
      nominateName: '',
      data: {}
    }
  },
  methods: {
    reset() {
      this.data.nominateName = this.nominateName
    },
    async updateNominate() {
      if (!this.data.nominateName) return iMessage.error(this.language('QINGSHURUDINGDIANSHENQINGDANMINGCHENG','请输入定点申请单名称'));
      this.isLoading = true
      const params = {
        nominateName: this.data.nominateName,
        nominateAppId:  this.data.id
      }
      updateNominate(params).then((res)=>{
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
          this.$store.dispatch('setNominateData',this.data)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.isLoading = false
      }).catch(e => {
      iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }).finally(() => {
        this.isLoading = false
      } )
    }
  },
  watch: {
    nominationData(data) {
      this.data = data
      this.nominateName = data.nominateName
    }
  }
}
</script>
<style lang="scss" scoped>
.desinate-detail {
  height: 520px;
  .desinate-detail-rows {
    ::v-deep.el-form-item {
      float: left;
      margin-right: 60px;
      &:nth-child(3n+1) {
        clear: left;
        .el-form-item__content {
          width: 640px;
        }
      }
      &:nth-child(3n) {
        margin-right: 0px !important;
      }
      .el-form-item__label {
        width: 104px;
        text-align: left;
      }
      .el-form-item__content {
        width: 244px;
      }
    }
  }
}
</style>