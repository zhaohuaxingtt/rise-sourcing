<!--
 * @Author: Luoshuang
 * @Date: 2021-05-21 09:23:11
 * @LastEditors:  
 * @LastEditTime: 2021-12-02 16:22:36
 * @Description: RFQ & 零件清单界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rfqdetail\index.vue
-->

<template>
  <iCard class="desinate-detail" v-permission.auto="SOURCING_NOMINATION_DETAIL|定点申请详情页面">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language( 'DINGDIANSHENGQINGXINAGQING', '定点申请详情' ) }}</span>
      <div class="floatright" >
        <iButton :loading="isLoading" @click="updateNominate()" v-permission.auto="SOURCING_NOMINATION_DETAIL_BAOCUN|定点申请详情页面-保存">{{
          language("LK_BAOCUN", "保存")
        }}</iButton>
        <iButton @click="reset()" style="margin-left:15px" v-permission.auto="SOURCING_NOMINATION_DETAIL_QUXIAO|定点申请详情页面-取消">{{
          language("LK_QUXIAO", "取 消")
        }}</iButton>
      </div>
    </div>
    <div class="body" v-permission.auto="SOURCING_NOMINATION_DETAIL_BIAODAN|定点申请详情页面-表单">
      <el-form class="desinate-detail-rows" label-width="104px" >
        <el-row>
          <el-col :span="!(index%3) ? 12 : 6" v-for="(item, index) in titleData" :key="index">
            <el-form-item :label="language(item.key,item.label)">
              <!-- 定点单名称，状态为草稿才能编辑 -->
              <iInput v-if="item.props === 'nominateName' && nominationData && nominationData.applicationStatus === 'NEW'" v-model="data.nominateName" :placeholder="language('LK_QINGSHURU','请输入')" />
              <iText v-else>{{data[item.props] ? data[item.props] : ''}}</iText>
            </el-form-item>
          </el-col>
        </el-row>
        
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
        {label:'采购项目类型',key:'LK_CAIGOUXIANGMULEIXING', props: 'partProjTypeDesc'},
      ],
      nominateName: '',
      data: {}
    }
  },
  created() {
    this.data = _.cloneDeep(this.nominationData)
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
      this.data = _.cloneDeep(data)
      this.nominateName = data.nominateName
    }
  }
}
</script>
<style lang="scss" scoped>
.desinate-detail {
  height: 520px;
  .desinate-detail-rows {
    .el-col-6 .el-form-item{
      padding-left: 60px;
    }
    ::v-deep.el-form-item {
      .el-form-item__label {
        width: 104px;
        text-align: left;
      }
    }
  }
}
</style>