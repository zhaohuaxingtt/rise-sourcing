<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 11:34:43
 * @LastEditors: zbin
 * @Descripttion: 项目信息
-->
<template>
  <div>
    <div class="info">{{$t('TPZS.XMXX')}}</div>
    <iFormGroup :key="$index" row="4" inline>
      <iFormItem>
        <iLabel :label="'RFQ'" slot="label"></iLabel>
        <iText>{{  form.rfqName }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('LK_CAILIAOZU')" slot="label"></iLabel>
        <iText>{{  form.categoryName }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="'FS/CSS'" slot="label"></iLabel>
        <iText>{{  form.buyerName }}</iText>
      </iFormItem>
      <iFormItem>
      </iFormItem>
      <iFormItem>
        <iLabel :label="'FOP'" slot="label"></iLabel>
        <iText>{{  form.ep }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.MQXTY')" slot="label"></iLabel>
        <iText>{{  form.mq }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.PLXTY')" slot="label"></iLabel>
        <iText>{{  form.pl }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel :label="$t('TPZS.CFXTY')" slot="label"></iLabel>
        <iText>{{  form.cf }}</iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.FOPQK')" slot="label"></iLabel>
        <iText>
          <icon :name="form.tpGradeStatus==='1'?'iconbaojiapingfengenzong-jiedian-lv':form.tpGradeStatus==='2'?'iconbaojiapingfengenzong-jiedian-huang':form.tpGradeStatus==='3'?'iconbaojiapingfengenzong-jiedian-cheng':form.tpGradeStatus==='4'?'iconbaojiapingfengenzong-jiedian-hong':''" symbol></icon>
        </iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.MQQK')" slot="label"></iLabel>
        <iText>
          <icon :name="form.mqGradeStatus==='1'?'iconbaojiapingfengenzong-jiedian-lv':form.mqGradeStatus==='2'?'iconbaojiapingfengenzong-jiedian-huang':form.mqGradeStatus==='3'?'iconbaojiapingfengenzong-jiedian-cheng':form.mqGradeStatus==='4'?'iconbaojiapingfengenzong-jiedian-hong':''" symbol></icon>
        </iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.PLQK')" slot="label"></iLabel>
        <iText>
          <icon :name="form.plStatus==='1'?'iconbaojiapingfengenzong-jiedian-lv':form.plStatus==='2'?'iconbaojiapingfengenzong-jiedian-huang':form.plStatus==='3'?'iconbaojiapingfengenzong-jiedian-cheng':form.plStatus==='4'?'iconbaojiapingfengenzong-jiedian-hong':''" symbol></icon>
        </iText>
      </iFormItem>
      <iFormItem>
        <iLabel icons="iconxinxitishi" :tip="$t('TPZS.LCHTIPS')" :label="$t('TPZS.CFQK')" slot="label"></iLabel>
        <iText>
          <icon :name="form.targetGradeStatus==='1'?'iconbaojiapingfengenzong-jiedian-lv':form.targetGradeStatus==='2'?'iconbaojiapingfengenzong-jiedian-huang':form.targetGradeStatus==='3'?'iconbaojiapingfengenzong-jiedian-cheng':form.targetGradeStatus==='4'?'iconbaojiapingfengenzong-jiedian-hong':''" symbol></icon>
        </iText>
      </iFormItem>
    </iFormGroup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iFormItem, iText, iFormGroup, iLabel, icon } from "rise";
import { getOneRfqInfo } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iFormItem, iText, iFormGroup, iLabel, icon },
  data() {
    // 这里存放数据
    return {
      form: {
        rfqName: '',
        categoryName: '',
        buyerName: '',//fs
        ep: '',
        mq: '',
        pl: '',
        cf: '',
        tpGradeStatus: '',//FOP情况
        mqGradeStatus: '',
        plStatus: '',
        targetGradeStatus: '',//cf情况
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getTableList() {
      this.tableLoading = true;
      try {
        const res = await getOneRfqInfo(this.$route.query.id);
        if (res.result) {
          this.form = res.data;
        }
        this.tableLoading = false;
      } catch {
        this.form = {};
        this.tableLoading = false;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTableList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' >
// @import url(); 引入公共css类
.row4[data-v-018a401a] .el-form-item__label {
  width: 8rem !important;
}
</style>
