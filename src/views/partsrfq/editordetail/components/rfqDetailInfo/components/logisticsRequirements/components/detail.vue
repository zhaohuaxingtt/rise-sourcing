<!--
 * @Author: moxuan
 * @Date: 2021-03-04 17:24:15
 * @LastEditTime: 2021-03-04 17:24:15
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
        <div class="form-title">{{ $t('LK_WULIUBIAOZHUN') }}</div>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_INBOUNDWULIUFANGSHI')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.supplyType}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FUZEREN')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.direcorId}}</i-text>
          </iFormItem>
          <iFormItem label="ZP：" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.zp}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_TESHULINGJIANLEIXING')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.specialPartType}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
      <div>
        <div class="form-title">{{$t('LK_CANKAOBAOZHUANG')}}</div>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_BAOZHUANGFUZEREN')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.direcorId}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_RUCHANGBAOZHUANGMINGCHENG')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_RUKUQIJUCHANG')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesLength}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUQIJUKUAN')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesWidth}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_CANKAOBAOZHUANGKUANMM')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.referencePackageWidth}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUQIJUZHUANGXIANGSHU')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesCount}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_RUKUQIJUXINGHAO')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesModel}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUQIJULEIXING')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesType}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUQIJUZHONGHEDANJIARMB')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingPerAppliancesPrice}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUQIJUZUJINRMBDAY')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesRent}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_RUKUBAOZHUANGMAOZHONG')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesGrossWeight}}</i-text>
          </iFormItem>
          <iFormItem label="入库器具返程折叠比" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesFoldingReturnRatio}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUQIJUSHOUMING')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesLife}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_RUKUJICHUNIANWEIXIUFEILV')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingAppliancesAnnualMaintenanceRate}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingMaterialComprehensivePrice}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.warehousingMaterialLife}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_QIANDUANBAOZHUANGMINGCHENG')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.admissionPackgeName}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUZHANGMM')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesLength}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUKUANMM')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesWidth}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUGAOMM')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverPackageHeight}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUSHU')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesCount}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUHAO')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesModel}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJULEIXING')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesType}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUZONGHEDANJIARMB')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverPerAppliancesPrice}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUZUJINRMBDAY')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesRent}}</i-text>
          </iFormItem>
        </iFormGroup>
        <iFormGroup :row="4" inline icon>
          <iFormItem :label="$t('LK_FANXIANGQIANBAOZHUANGMAOZHONGKG')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesGrossWeight}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesFoldingReturnRatio}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANQIJUSHOUMING')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesLife}}</i-text>
          </iFormItem>
          <iFormItem :label="$t('LK_FANXIANGQIANJICHUNIANWEIXIULÜ')" name="test">
            <iInput v-if="editStatus"></iInput>
            <i-text v-else>{{dataInfo.partPackgeRequirements.turnoverAppliancesAnnualMaintenanceRate}}</i-text>
          </iFormItem>
        </iFormGroup>
      </div>
    </div>
  </iDialog>
</template>
<script>
import {iMessage, iDialog, iFormGroup, iFormItem, iInput, iText} from '@/components'


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
      if (this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
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

