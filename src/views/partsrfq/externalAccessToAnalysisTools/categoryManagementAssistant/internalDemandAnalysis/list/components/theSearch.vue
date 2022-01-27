<template>
    <iSearch @reset="handleSearchReset" @sure="getTableList" :icon="false">
        <el-form>
            <!--第一行-->
            <el-row class="margin-bottom20">
                <!--描述-->
                <el-form-item :label="language('LK_MIAOSHU','描述')">
                    <iInput :placeholder="language('请输入')" v-model="form.title"></iInput>
                </el-form-item>
                <!--状态-->

                <el-form-item :label="language('LK_ZHUANGTAI','状态')">
                    <iSelect multiple filterable collapse-tags :placeholder="language('请选择')" v-model="form.status">
                        <el-option
                                :value="item.key"
                                :label="$t($i18n.locale === 'zh' ? item.valueCN : item.valueEN) "
                                v-for="item in statusList"
                                :key="item.key"></el-option>
                    </iSelect>
                </el-form-item>
                <!--发起人-->
                <el-form-item :label="language('LK_FAQIREN','发起人')">
                    <iInput :placeholder="language('请输入')" v-model="form.createByName"></iInput>
                </el-form-item>
                <!--单据类型-->
                <el-form-item :label="language('LK_DANJULEIX','单据类型')">
                    <iSelect multiple filterable :placeholder="language('请选择')" v-model="form.billType">
                        <el-option
                                :value="item.key"
                                :label="$t($i18n.locale === 'zh' ? item.value : item.valueEN) "
                                v-for="item in billType"
                                :key="item.key"></el-option>
                    </iSelect>
                </el-form-item>
                <!--业务类型-->
                <el-form-item :label="language('LK_YEWULEIXING','业务类型')">
                    <iSelect multiple filterable :placeholder="language('请选择')" v-model="form.type">
                        <el-option
                                :value="item.key"
                                :label="$t($i18n.locale === 'zh' ? item.value : item.valueEN) "
                                v-for="item in type"
                                :key="item.key"></el-option>
                    </iSelect>
                </el-form-item>
            </el-row>

            <!--第二行-->
            <el-row>
                <!--版本号-->
                <el-form-item :label="language('LK_BANBENHAO','版本号')">
                    <iSelect :placeholder="language('请选择')" v-model="form.version">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item"
                                :label="item"
                                v-for="item,index in version"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>

                <!--来源-->
                <el-form-item :label="language('LK_LAIYUAN','来源')">
                    <iSelect multiple filterable :placeholder="language('请选择')" v-model="form.source">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.key"
                                :label="$t($i18n.locale === 'zh' ? item.value : item.valueEN) "
                                v-for="item in source"
                                :key="item.key"></el-option>
                    </iSelect>
                </el-form-item>

                <!--更新时间起-->
                <el-form-item prop="updateDateStart" class="r_el-form-item"
                              :label="language('LK_GENGXINRIQIQI','更新时间起')">
                    <iDatePicker clearable="false" v-model="form.updateDateStart" type="date"
                                 :picker-options="pickerOptionsStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                 :placeholder="language('请选择')"/>
                </el-form-item>
                <el-form-item prop="updateDateEnd" class="r_el-form-item el-form-itemnext"
                              :label="language('LK_GENGXINRIQIZHI','更新时间止')">
                    <iDatePicker clearable="false" v-model="form.updateDateEnd" type="date"
                                 :picker-options="pickerOptionsEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                 :placeholder="language('请选择')"/>
                </el-form-item>
            </el-row>
        </el-form>
    </iSearch>
</template>

<script>
  import {iSearch, iInput, iSelect, iDatePicker} from 'rise';
  import {
    getStatus,     //状态
    versionList,   // 版本
  } from '@/api/achievement';

  export default {
    components: {
      iSearch,
      iInput,
      iSelect,
      iDatePicker,
    },
    data() {
      return {
        form: {
          title: '', // 描述
          status: [0, 2, 3, 4, 11],        // 状态
          createByName: '', // 发起人
          billType: '', // 单据类型
          type: '', // 业务类型
          version: '', // 版本号
          source: '', // 来源
          updateDateStart: '', //更新日期起
          updateDateEnd: '',//更新日期止
        },
        // 开始时间限制
        pickerOptionsStart: {
          disabledDate: (time) => {
            if (this.form.updateDateEnd) {
              // eslint-disable-next-line max-len
              return time.getTime() > new Date(this.form.updateDateEnd).getTime()
            }
          },
        },
        // 结束时间限制
        pickerOptionsEnd: {
          disabledDate: (time) => {
            if (this.form.updateDateStart) {
              return time.getTime() < new Date(this.form.updateDateStart).getTime() - 3600 * 1000 * 24
            }
          },
        },
        statusList: [],  // 状态
        billType: [
          {key: 1, value: '基础', valueEN: 'base'},
          {key: 2, value: '跟踪', valueEN: 'track'},
        ],  // 单据类型
        type: [
          {
            key: 1, value: '批量件', valueEN: 'batch'
          },
          {
            key: 2, value: '配附件', valueEN: 'accessories'
          }
        ],// type
        source: [
          {
            key: 1, value: '系统 ', valueEN: 'KSLInterface'
          },
          {
            key: 2, value: '手动', valueEN: 'Manual Upload'
          }
        ],
        version: [],

      };
    },
    created() {
      this.getVersionList();
      this.getStatusList()
    },
    methods: {
      handleSearchReset() {
        this.form = {}
        this.$set(this.form, 'status', [0, 2, 3, 4, 11])
        this.getTableList();
      },
      // get 状态
      getStatusList() {
        getStatus().then(res => {
          if (res.result) {
            this.statusList = res.data
          }
        }).catch(() => {
        })
      },
      getTableList() {
        const form = this.form;
        this.$emit('getTableList', form);
      },
      async getVersionList() {
        const res = await versionList();
        this.version = res?.data;
      },

    },
  };
</script>

<style scoped>
    ::v-deep .cardBody {
        /*padding: 20px 40px !important;*/
    }

    ::v-deep .el-icon-date {
        position: absolute;
        right: -210px;
    }
</style>
