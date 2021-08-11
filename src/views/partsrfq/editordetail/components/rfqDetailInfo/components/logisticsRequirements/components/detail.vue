<!--
 * @Author: moxuan
 * @Date: 2021-03-04 17:24:15
 * @LastEditTime: 2021-07-12 10:35:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <iDialog :title="dataInfo.fsGsNum" :visible.sync="value" width="90%" @close='clearDiolog'>
    <div class="changeContent">
<!--      <div class="clearFloat">
        <div class="floatright title-button-box">
          <iButton @click="edit">{{ editStatus ? $t('LK_BAOCUN') : $t('LK_BIANJI') }}</iButton>
        </div>
      </div>-->
      <div>
        <div class="form-title">{{ language('LK_WULIUBIAOZHUN','物流标准') }}</div>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_INBOUNDWULIUFANGSHI','INBOUND物流方式')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.supplyType}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FUZEREN','负责人')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.direcorName}}</i-text>
          </iFormItem>
          <iFormItem label="ZP：" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.zp}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_TESHULINGJIANLEIXING','特殊零件类型')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.specialPartType}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
      <div>
        <div class="form-title">{{language('LK_CANKAOBAOZHUANG','参考包装')}}</div>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_BAOZHUANGFUZEREN','包装负责人')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.direcorName}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_RUCHANGBAOZHUANGMINGCHENG','入场包装名称')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_RUKUQIJUCHANG','入库器具长（mm）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesLength}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJUKUAN','入库器具宽（mm）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesWidth}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_CANKAOBAOZHUANGKUANMM','入库器具宽（mm）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePackageWidth}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJUZHUANGXIANGSHU','入库器具装箱数')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesCount}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_RUKUQIJUXINGHAO','入库器具型号')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesModel}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJULEIXING','入库器具类型')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesType}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJUZHONGHEDANJIARMB','入库器具综合单价（RMB）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingPerAppliancesPrice}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJUZUJINRMBDAY','入库器具租金（RMB/DAY）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesRent}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_RUKUBAOZHUANGMAOZHONG','入库包装毛重（KG）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesGrossWeight}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJUFANCHENGSHEDIEBI','入库器具返程折叠比')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesFoldingReturnRatio}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUQIJUSHOUMING','入库器具寿命')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesLife}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_RUKUJICHUNIANWEIXIUFEILV','入库基础年维修费率')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesAnnualMaintenanceRate}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE','箱内周转材料综合价格')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingMaterialComprehensivePrice}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING','箱内周转材料综合寿命')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingMaterialLife}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_QIANDUANBAOZHUANGMINGCHENG','前段包装名称')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUZHANGMM','翻箱前器具长（mm）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesLength}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUKUANMM','翻箱前器具宽（mm）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesWidth}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUGAOMM','翻箱前器具高（mm）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverPackageHeight}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUSHU','翻箱前器具数')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesCount}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUHAO','翻箱前器具号')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesModel}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJULEIXING','翻箱前器具类型')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesType}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUZONGHEDANJIARMB','翻箱前器具综合单价（RMB）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverPerAppliancesPrice}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUZUJINRMBDAY','翻箱前器具租金（RMB/DAY）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesRent}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="language('LK_FANXIANGQIANBAOZHUANGMAOZHONGKG','翻箱前包装毛重（KG）')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesGrossWeight}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI','翻箱前器具返程折叠比')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesFoldingReturnRatio}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANQIJUSHOUMING','翻箱前器具寿命')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesLife}}</i-text>
          </iFormItem>
          <iFormItem :label="language('LK_FANXIANGQIANJICHUNIANWEIXIULÜ','翻箱前基础年维修率')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesAnnualMaintenanceRate}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
    </div>
  </iDialog>
</template>
<script>
import {iMessage, iDialog, iFormGroup, iFormItem, iInput, iText} from 'rise'


export default {
  components: { iDialog, iFormGroup, iFormItem, iInput, iText},
  props: {
    value: {type: Boolean},
    repeatClick: Boolean,
    dataInfo: {
      type: Object,
      default: () => {
        return {
          partPackgeRequirements: {}
        }
      }
    }
  },
  data() {
    return {
      editStatus: false
    }
  },
  methods: {
    sureChangeItems() {
      if (this.selectTableData.length == '') return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZE','抱歉！您当前还未选择！'))
      this.$emit('sure', JSON.parse(this.selectTableData))
    },
    edit() {
      this.editStatus = !this.editStatus
    },
    clearDiolog() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;

  .form-title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #000000;
    margin-bottom: 17px;
  }

  .title-button-box {
    margin-top: -60px;
    margin-right: 30px;
  }
}
</style>

