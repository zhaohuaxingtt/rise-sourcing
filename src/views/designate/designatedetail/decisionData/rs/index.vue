<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 13:35:30
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-07 16:22:15
 * @Description: 定点管理-决策资料-RS
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\index.vue
-->

<template>
  <div>
    <div v-if="isApproval">
      <circulation ref="circulation" v-if="isCirculation" :isPreview="isPreview || nominationDisabled || rsDisabled" :nominateId="nominateId" :projectType="projectType" >
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
      </circulation>
      <meeting ref="meeting" v-else :isPreview="isPreview || nominationDisabled || rsDisabled" :nominateId="nominateId" :projectType="projectType" :showSignatureForm="showSignatureForm" >
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
      </meeting>
    </div>
    <div v-else v-permission.auto.array="['SOURCING_NOMINATION_ATTATCH_RS|决策资料-rs', 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RECORD_RS|定点记录-RS']">
      <circulation ref="circulation" v-if="isCirculation" :isPreview="isPreview || nominationDisabled || rsDisabled" :nominateId="nominateId" :projectType="projectType" v-permission.auto.array="['SOURCING_NOMINATION_ATTATCH_RS_CIRCULATION|circulation', 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RECORD_RS_CIRCULATION|定点记录-circulation']" >
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
      </circulation>
      <meeting ref="meeting" v-else :isPreview="isPreview || nominationDisabled || rsDisabled" :nominateId="nominateId" :projectType="projectType" :showSignatureForm="showSignatureForm" v-permission.auto.array="['SOURCING_NOMINATION_ATTATCH_RS_METTING|meeting', 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RECORD_RS_METTING|定点记录-meeting']" >
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
      </meeting>
    </div>
  </div>
</template>

<script>
import meeting from './components/meeting'
import circulation from './components/circulation'
import { getList, nominateAppSDetail } from '@/api/designate/decisiondata/rs'

export default {
  components: { meeting, circulation },
  props: {
    otherPreview: {type: Boolean, default: false},
    otherNominationType: {type:String},
    otherNominationId: {type:String},
    otherPartProjectType: {type:String},
    showSignatureForm: {type:Boolean, default: false}
  },
  data() {
    return {
      nominateProcessType:''
    }
  },
  mounted() {
    this.init()
  },
  created() {
    let data = this.otherPreview ? this.otherNominationId : this.$route.query.desinateId

    if (!this.$store.getters.nominationType && !this.$route.query.designateType) {
      nominateAppSDetail({
        nominateAppId: data
      })
      .then(res => {
        this.nominateProcessType = res.data.nominateProcessType
      })
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    /**
     * @Description: 是否是流转类型，如果从其他页面点击预览，则从props里取定点类型，如是定点流程中的rs，则从url上获取定点类型
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    isCirculation(){
      let processType = this.$route.query.designateType === '' ? this.nominateProcessType :this.$route.query.designateType      
      return this.otherPreview ? this.otherNominationType === 'TRANFORM' : processType === 'TRANFORM'
    },
    /**
     * @Description: 是否是预览状态
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    isPreview() {
      return this.$route.query.isPreview == 1 || this.otherPreview
    },
    /**
     * @Description: 定点id，如果从其他页面点击预览，则从props里取定点id，如是定点流程中的rs，则从url上获取定点id
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    nominateId() {
      return this.otherPreview ? this.otherNominationId : this.$route.query.desinateId
    },
    /**
     * @Description: 零件采购项目类型
     *    FS("PT05", "FS零件"),
          ONE_TIME_PURCHASE("PT06", "一次性采购"),
          COP("PT07", "COP零件"),
          DB("PT04", "DB零件"),
          DB_CHANGE("PT03", "DB仅零件号更改"),
          CHANGE("PT08", "仅零件号更改"),
          FS_COMMON("PT09", "FS COMMON SOURCING"),
          GS_COMMON("PT10", "GS COMMON SOURCING"),
          GS_PART("PT11", "GS零件"),
          STELL_PATCH("PT12", "钢材批量"),
          STELL_ONE_TIME_PURCHASING("PT13", "钢材一次性采购"),
          SPECIAL("PT01", "SPECIAL零件"),
          OUTSOURCING("PT14", "工序委外"),
          CAPACITY_EXPANSION("PT15", "扩产能"),
          APPRECIATE("PT16", "涨价"),
          FITTING("PT17", "配件"),
          ANNEX("PT18", "附件"),
          AEKO("PT02", "AEKO零件"),
          DB_ONE_TIME_PURCHASE("PT19", "DB一次性采购")
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    projectType() {
      return this.otherPartProjectType
    },
    isApproval() {
      return this.$route.query.isApproval === "true"
    }
  },
  methods: {
    /**
     * @Description: 初始化页面数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      if (this.isCirculation) {
        this.$refs.circulation?.init && this.$refs.circulation.init()
      } else {
        this.$refs.meeting?.init && this.$refs.meeting.init()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>