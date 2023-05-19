<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome">
    <!-- <div class="headerNav-wraper margin-bottom10 margin-top20 margin-left20 margin-right20"> -->
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{
          isDraft
            ? language("XINJIANQIANZIDAN", "新建签字单")
            : language("LK_QIANZIDAN", "签字单")
        }}</span
      >
      <div class="floatright">
        <span v-if="isDraft">
          <iButton
            :loading="updateLoading"
            @click="save"
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_DETAILSSAVE | 签字单详情保存
            "
          >
            {{ language("BAOCUN", "保存") }}
          </iButton>
          <iButton
            :loading="updateLoading"
            v-if="showBtn"
            @click="submit"
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_DETAILSSUBMIT | 签字单详情提交
            "
          >
            {{ language("LK_TIJIAO", "提交") }}
          </iButton>
          <iButton
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_BACKEDIT | 签字单详情编辑返回
            "
            @click="
              $router.push({ path: '/sourcing/partsnomination/signSheet' })
            "
          >
            {{ language("FANHUI", "返回") }}
          </iButton>
        </span>
        <span v-else>
          <iButton
            v-permission.auto="
              SOURCING_NOMINATION_SIGNSHEET_BACK | 签字单详情返回
            "
            @click="
              $router.push({ path: '/sourcing/partsnomination/signSheet' })
            "
          >
            {{ language("LK_FANHUI", "返回") }}
          </iButton>
        </span>
        <iLoger
          ref="log"
          :config="{ bizId_obj_ae: 'id', queryParams: ['bizId_obj_ae'] }"
          isPage
          :isUser="true"
          class="margin-left20"
        />
      </div>
      <headerNav />
    </div>
    <div class="headerNav-sub">
      <iTabsList type="card" v-model="tab">
        <el-tab-pane
          v-for="(tab, $index) in tabs"
          :key="$index"
          :label="tab.name"
          :name="tab.key"
        >
          <div class="margin-top20">
            <iCard class="margin-top20">
              <el-form class="signSheet-filter" :inline="true">
                <el-row gutter="20">
                  <el-col span="6">
                    <el-form-item :label="`${language('QIANZIDANHAO','签字单号')}:`">
                      <iInput v-model="infoForm.signCode" :disabled="true"></iInput>
                    </el-form-item>
                  </el-col>
                  <el-col span="6">
                    <el-form-item :label="`${language('ZHUANGTAI','状态')}:`">
                      <iInput v-model="infoForm.statusDesc" :disabled="true"></iInput>
                    </el-form-item>
                  </el-col>
                  <el-col span="12">
                    <el-form-item :label="`${language('MIAOSHU','描述')}:`" class="desc">
                      <iInput v-model="infoForm.description" :placeholder="language('QINGSHURUMIAOSHU','请输入描述')"></iInput>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </iCard>
            <component
              :ref="tab.key"
              :is="tab.component"
              :isRefuse="isRefuse"
              :isDraft="isDraft"
              @getSignSheetDetails="getSignSheetDetails"
              @deleteData="deleteData"
              @save="save"
              @setData="setData"
            />
          </div>
        </el-tab-pane>
      </iTabsList>
    </div>
  </iPage>
</template>
<script>
import { heaederSubMenu } from "./components/data";
import {
  iCard,
  iTabsList,
  iInput,
  iButton,
  iPage,
  iMessage,
} from "rise";
import { clickMessage } from "@/views/partsign/home/components/data";
import partDesignateOrders from "@/views/designate/home/signSheet/details";
import MTZDesignateOrders from "@/views/designate/home/signSheet/mtzDetails";
import ChipDesignateOrders from "@/views/designate/home/signSheet/chipDetails";
import {
  saveSignSheet,
  submitSignSheet,
  getsignSheetDetails
} from "@/api/designate/nomination/signsheet";
import iLoger from "rise/web/components/iLoger";

// eslint-disable-next-line no-undef
export default {
  data() {
    return {
      heaederSubMenu,
      tab: "partDesignateOrders",
      mode: this.$route.query.mode || "",
      tabs: [
        {
          key: "partDesignateOrders",
          name: "零件定点申请单",
          component: partDesignateOrders,
        },
        {
          key: "MTZDesignateOrders",
          name: "MTZ定点申请单",
          component: MTZDesignateOrders,
        },
        {
          key: "CHIPDesignateOrders",
          name: "芯片定点申请单",
          component: ChipDesignateOrders,
        },
      ],
      updateLoading: false,
      childData: {},
      infoForm:{},
    };
  },
  components: {
    iCard,
    iTabsList,
    iInput,
    iButton,
    iPage,
    iMessage,
    partDesignateOrders,
    MTZDesignateOrders,
    iLoger,
  },
  computed:{
    showBtn(){
      let result = false
      Object.values(this.childData).forEach(child=>{
        if(child){
          result = true
        }
      })
      return result
    },
    // 拒绝状态
    isRefuse(){
      return ['1'].includes(this.infoForm.status)
    },
    // 草稿状态
    isDraft(){
      return ['2'].includes(this.infoForm.status)
    }
  },
  created() {
    const heaederSubMenuItem = this.heaederSubMenu.find(
      (o) => o.path === this.$route.path
    );
    this.tab = heaederSubMenuItem ? heaederSubMenuItem.key : "nomination";
    this.getSignSheetDetails()
  },
  methods: {
    setData(key,value){
      this.$set(this.childData,key, value)
    },
    // 获取签字单详情 
    getSignSheetDetails() {
      getsignSheetDetails({
        signId: this.$route.query.id
      }).then(res => {
        if (res?.code == 200) {
          this.infoForm = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取TAB页面表格数据
    getTableData(){
      const params = {
        nominateIdArr:[],
        nomiAppInfoList:[],
        mtzApplyIdAttr:[],
        mtzAppInfoList:[],
        chipApplyIdAttr:[],
        chipAppInfoList:[]
      };
      if(Array.isArray(this.$refs.partDesignateOrders[0].tableListData)){
        this.$refs.partDesignateOrders[0].tableListData.forEach(item=>{
          params.nominateIdArr.push(item.id)
          params.nomiAppInfoList.push({
            appNo: item.id,
            meetingName: item.meetingName,
            appName: item.nominateName,
            partProjType: item.partProjType,
            linieDept: item.linieDept
          })
        })
      }
      // MTZ
      if(Array.isArray(this.$refs.MTZDesignateOrders[0].tableListData)){
        this.$refs.MTZDesignateOrders[0].tableListData.forEach(item=>{
          params.mtzApplyIdAttr.push(item.id)
          params.mtzAppInfoList.push({
            appNo: item.id,
            meetingName: item.meetingName,
            appName: item.appName,
            partProjType: 'MTZ',
            linieDept: item.linieDeptName
          })
        })
      }
      // CHIP
      if(Array.isArray(this.$refs.CHIPDesignateOrders[0].tableListData)){
        this.$refs.CHIPDesignateOrders[0].tableListData.forEach(item=>{
          params.chipApplyIdAttr.push(item.id)
          params.chipAppInfoList.push({
            appNo: item.id,
            meetingName: item.meetingName,
            appName: item.appName,
            partProjType: 'CHIP',
            linieDept: item.linieDeptName
          })
        })
      }
      return params
    },
    // 保存
    async save(type) {
      const params = {
        signId: this.$route.query.id,
        description: this.infoForm.description,
        ...this.getTableData()
      };
      this.updateLoading = true;
      let res = await saveSignSheet(params)
      this.updateLoading = false
      if (res.code == 200) {
        if(type=='partDesignateOrders'){
          this.$refs.partDesignateOrders[0].getChooseData();
        }else if(type=='MTZDesignateOrders'){
          this.$refs.MTZDesignateOrders[0].getChooseData();
        }else if(type=='CHIPDesignateOrders'){
          this.$refs.CHIPDesignateOrders[0].getChooseData();
        }
        // 如果是提交则不用重复提示
        if(type!='submit'){
          iMessage.success(
            this.$i18n.locale === "zh" ? res.desZh : res.desEn
          );
          this.getSignSheetDetails()
        }
        return true
      } else {
        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        return false
      }
    },
    // 提交
    async submit() {
      const params = {
        signIdArr: [this.$route.query.id],
      };
      let isSave = await this.save('submit')
      if(!isSave) return
      this.updateLoading = true;
      submitSignSheet(params)
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.$refs.partDesignateOrders[0].getChooseData();
            this.$refs.MTZDesignateOrders[0].getTableData();
            this.$refs.CHIPDesignateOrders[0].getTableData();
            this.getSignSheetDetails()
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => (this.updateLoading = false));

    },
    // 通过待办数跳转
    clickMessage,
    // 删除零件时同时删除零件对应定点申请单关联的mtz
    deleteData(data) {
      if (Array.isArray(data))
        this.$refs.MTZDesignateOrders[0].forceDelete(
          data.map((item) => item.mtzApplyId)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  position: relative;
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 0px;
    bottom: -0.5rem;
  }
  .ext {
    ul {
      display: inline-block;
      vertical-align: middle;
      li {
        position: relative;
        display: inline-block;
        padding: 0 17px;
        line-height: 25px;
        &:after {
          display: inline-block;
          content: "";
          width: 1px;
          height: 16px;
          background: #000000;
          opacity: 0.42;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -8px;
        }
        &:last-child {
          padding-right: 0px;
          &:after {
            display: none;
          }
        }
        a {
          font-size: 18px;
          color: #000000;
          opacity: 0.42;
        }
      }
    }
    .iconMenu {
      display: inline-block;
      vertical-align: middle;
      padding: 0px 5px;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 80px;
        font-size: 16px;
        font-size: 1.175rem;
        vertical-align: middle;
      }
    }
    .iconDatabase {
      display: inline-block;
      vertical-align: middle;
      color: #f8f9fa !important;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 20px;
        font-size: 20px;
        font-size: 1.4rem;
        vertical-align: middle;
        color: #f8f9fa !important;
      }
    }
  }
}
.headerNav-sub {
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
}
.pull-right {
  float: right;
}

.signSheet-filter {
  .el-form-item {
    ::v-deep .el-form-item__label {
      padding-right: 30px;
    }
  }
  .desc {
    width: 100%;
    ::v-deep .el-form-item__content {
      width: 90%;
    }
  }
}
</style>