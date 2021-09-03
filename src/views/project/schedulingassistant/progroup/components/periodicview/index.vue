<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 15:13:45
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-03 11:18:59
 * @Description: 周期视图
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\periodicview\index.vue
-->

<template>
  <div class="periodicView" v-loading="loading">
    <div class="periodicView-title">
      <div class="periodicView-title-span">
        <el-checkbox class="periodicView-title-check" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <span class="periodicView-title-span-unit">{{language('DANWEIZHOU','单位：周')}}</span>
      </div>
      <div v-if="!isSop">
        <iButton @click="$emit('changeNodeView')">{{language('QIEHUANJIEDIANSHITU', '切换节点视图')}}</iButton>
        <iButton @click="handleSave" :loading="saveloading">{{language('BAOCUN', '保存')}}</iButton>
        <iButton @click="handleSendFs">{{language('FASONGFSQUEREN', '发送FS确认')}}</iButton>
        <iButton @click="handleDownloadPvPk" :loading="downloadLoading">{{language('DAOCHUFASONGPVPKQINGDAN', '导出发送PV/PK清单')}}</iButton>
      </div>
    </div>
    <div class="periodicView-content">
      <div v-for="pro in products" :key="pro.label" class="productItem">
        <div class="productItem-top">
          <el-checkbox v-model="pro.isChecked" @change="handleCheckboxChange($event, pro)">
            {{pro.productGroupNameZh}}
          </el-checkbox>
          <div class="productItem-top-targetList">
            <div v-for="item in targetList" :key="item.value" class="productItem-top-targetList-item">
              <icon v-if="pro[item.value] == 1" symbol name="iconbaojiapingfengenzong-jiedian-lv" class="productItem-top-targetList-item-icon"></icon>
              <icon v-else-if="pro[item.value] == 2" symbol name="iconbaojiapingfengenzong-jiedian-huang" class="productItem-top-targetList-item-icon"></icon>
              <icon v-else-if="pro[item.value] == 3" symbol name="iconbaojiapingfengenzong-jiedian-hong" class="productItem-top-targetList-item-icon"></icon>
              <span class="productItem-top-targetList-item-label">{{language(item.key, item.label)}}</span>
            </div>
          </div>
        </div>
        <div class="productItem-bottom">
          <div class="productItem-bottom-text">
            <span class="margin-bottom14">{{language('JINGYANCHANGZHI', '经验常值')}}</span>
            <span>{{language('LISHICANKAOZHI', '历史参考值')}}<icon @click.native="gotoDBhistory(pro)" symbol name="iconlishicankaozhi" class="margin-left8 cursor"></icon></span>
          </div>
          <div v-for="(item, index) in nodeList" :key="item.key" class="productItem-bottom-node">
            <div class="productItem-bottom-nodeItem">
              <span class="productItem-bottom-nodeItem-label" v-if="!item.label.includes('1st')">{{item.key ? language(item.key, item.label) : item.label}}</span>
              <span class="productItem-bottom-nodeItem-label" v-else>1<sup>st</sup>{{item.label.split('1st')[1]}}</span>
              <icon symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
            </div>
            <div class="productItem-bottom-stepBetween" v-if="index < nodeList.length - 1">
              <div :class="`productItem-bottom-stepBetween-double flex-box margin-bottom18 ${index === nodeList.length - 2 && 'small'}`">
                <iInput onkeyup="value=value.replace(/[^\d]/g,'')" :class="`productItem-bottom-stepBetween-input ${pro[item.isChange] == 1 ? 'markBlue':''}` " v-model="pro[item.keyPoint]"></iInput>
                <div v-if="index === nodeList.length - 2" class="flex-box">
                  （<iInput :class="`productItem-bottom-stepBetween-input ${pro[nodeList[nodeList.length - 1].isChange] == 1 ? 'markBlue':''}` " v-model="pro[nodeList[nodeList.length - 1].keyPoint]"></iInput>）
                </div>
              </div>
              <icon symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon"></icon>
              <div :class="`productItem-bottom-stepBetween-double flex-box margin-bottom14 margin-top30 ${index === nodeList.length - 2 && 'small'}`">
                <iText :class="`productItem-bottom-stepBetween-input text `">{{pro[item.const]}}</iText>
                <div v-if="index === nodeList.length - 2" class="flex-box">
                  （<iText class="productItem-bottom-stepBetween-input text">{{pro[nodeList[nodeList.length - 1].const]}}</iText>）
                </div>
              </div>
              <div :class="`productItem-bottom-stepBetween-double flex-box ${index === nodeList.length - 2 && 'small'}`">
                <iText :class="`productItem-bottom-stepBetween-input text ${pro[item.history] && pro[item.const] && (pro[item.history] > pro[item.const]) ? 'markRed' : ''}`">{{pro[item.history]}}</iText>
                <div v-if="index === nodeList.length - 2" class="flex-box">
                  （<iText :class="`productItem-bottom-stepBetween-input text ${pro[nodeList[nodeList.length - 1].history] && pro[nodeList[nodeList.length - 1].const] && (pro[nodeList[nodeList.length - 1].history] > pro[nodeList[nodeList.length - 1].const]) ? 'markRed' : ''}`">{{pro[nodeList[nodeList.length - 1].history]}}</iText>）
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---------------------------------------------------------------------->
    <!----------                  fs确认弹窗                   ---------------->
    <!---------------------------------------------------------------------->
    <fsConfirm ref="fsConfirm" @handleConfirm="handleFSConfirm" :cartypeProId="cartypeProId" :tableList="fsTableList" :dialogVisible="fsConfirmDialogVisible" @changeVisible="changeFsConfirmVisible" />
  </div>
</template>

<script>
import { iButton, icon, iInput, iText, iMessage } from 'rise'
import fsConfirm from '../fsconfirm'
import { getProductGroupInfoList, saveProductGroupInfoList, deliveryProduct, getAllFS, downloadPvPk, getFsUserList, getBuyer, getCarConfig, validSchedule } from '@/api/project'
import moment from 'moment'
export default {
  components: { iButton, fsConfirm, icon, iInput, iText },
  props: {
    cartypeProId: {type:String},
    carProjectName: {type:String},
    isSop: {type:Boolean}
  },
  data() {
    return {
      saveloading: false,
      loading: false,
      checkAll: false,
      products: [],
      checkedProducts: [],
      isIndeterminate: false,
      fsConfirmDialogVisible: false,
      targetList: [
        {label: 'VFF目标', key: 'VFFMUBIAO', value: 'vffTarget'},
        {label: 'PVS目标', key: 'PVSMUBIAO', value: 'pvsTarget'},
        {label: '0S目标', key: '0SMUBIAO', value: 'zerosTarget'}
      ],
      nodeList: [
        {label: '释放', key: 'SHIFANG', const: 'constReleaseToNomiWeek', keyPoint: 'keyReleaseToNomiWeek', history: 'hiReleaseToNomiWeek', isChange: 'keyReleaseToNomiStatus'},
        {label: '定点', key: 'DINGDIAN', const: 'constNomiToBffWeek', keyPoint: 'keyNomiToBffWeek', history: 'hiNomiToBffWeek', isChange: 'keyNomiToBffStatus'},
        {label: 'BF', const: 'constBfToFirstTryoutWeek', keyPoint: 'keyBfToFirstTryoutWeek', history: 'hiBfToFirstTryoutWeek', isChange: 'keyBfToFirstTryoutStatus'},
        {label: '1st Tryout', const: 'constFirstTryEmWeek', keyPoint: 'keyFirstTryEmWeek', history: 'hiFirstTryEmWeek', isChange: 'keyFirstTryEmStatus'},
        {label: 'EM(OTS)', const: 'constFirstTryOtsWeek', keyPoint: 'keyFirstTryOtsWeek', history: 'hiFirstTryOtsWeek', isChange: 'keyFirstTryOtsStatus'}
      ],
      fsTableList: [],
      downloadLoading: false,
      selectOptions: {},
      interval: null
    }
  },
  created() {
    this.getFSOPtions()
  },
  methods: {
    /**
     * @Description: 获取fs下拉选项
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getFSOPtions() {
      getAllFS().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            fsOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.nameZh
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 下载pvpk
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async handleDownloadPvPk() {
      await this.autoSave()
      this.downloadLoading = true
      await downloadPvPk(this.cartypeProId)
      this.downloadLoading = false
    },
    /**
     * @Description: 发送fs
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleFSConfirm(val) {
      deliveryProduct(val).then(res => {
        if (res?.result) {
          if (res.data.length > 0) {
            iMessage.warn(res.data?.map(item => item.productGroupZh).join(',')+'产品组询价采购员还未确认，请勿重复发送')
          } else {
            iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
            this.changeFsConfirmVisible(false)
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.fsConfirm.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 保存按钮触发保存
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.saveloading = true
      saveProductGroupInfoList(this.products).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.init()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveloading = false
      })
    },
    /**
     * @Description: 自动保存，只做保存操作不刷新页面
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    autoSave() {
      if (this.products.length < 1) {
        return
      }
      this.saveloading = true
      saveProductGroupInfoList(this.products).then(res => {
        if (res?.result) {
          // iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveloading = false
      })
    },
    /**
     * @Description: 页面初始化
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      this.getProducts(this.cartypeProId)
    },
    /**
     * @Description: 根据车型项目获取产品组
     * @Author: Luoshuang
     * @param {*} id
     * @return {*}
     */    
    getProducts(id) {
      this.loading = true
      getProductGroupInfoList(id).then(res => {
        if (res?.result) {
          this.products = res.data
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @Description: 跳转历史数据库
     * @Author: Luoshuang
     * @param {*} pro
     * @return {*}
     */    
    async gotoDBhistory(pro) {
      this.loading = true
      try{
        const res = await getCarConfig(this.cartypeProId)
        this.loading = false
        if (res?.result) {
          // console.log(this.cartypeProId)
          const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/historyprocessdb`, query: {...res.data,cartypeProId:this.cartypeProId,productGroup:pro.productGroupNameZh}})
          window.open(router.href,'_blank')
        } else {
          iMessage.warn('HUOQUSUANFAPEIZHISHIBAI','获取算法配置失败')
        }
      } catch(error) {
        this.loading = false
      }
    },
    /**
     * @Description: 根据选中的行获取每一行的fs下拉列表
     * @Author: Luoshuang
     * @param {*} tableList
     * @return {*}
     */    
    async getFsUserList(tableList) {
      const res = await getFsUserList(tableList.map(item => item.productGroupId))
        if (res?.result) {
          return res.data
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          return null
        }
    },
    /**
     * @Description: 获取项目采购员
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getBuyer() {
      if (!this.cartypeProId) {
        return null
      }
      const res = await getBuyer(this.cartypeProId)
      if (res?.result) {
        return res.data
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        return null
      }
    },
    /**
     * @Description: 点击发送fs按钮打开对应弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async handleSendFs() {
      await this.autoSave()
      
      if (!this.products?.some(item => item.isChecked)) {
        iMessage.warn(this.language('QINGGOUXUANXUYAOFASONGDESHUJU','请勾选需要发送的数据'))
        return
      }
      try {
        this.loading = true
        const selectRows = this.products.filter(item => item.isChecked)
        const validScheduleRowsRes = await validSchedule(selectRows)
        if (validScheduleRowsRes.result && validScheduleRowsRes.data && validScheduleRowsRes.data.length === selectRows.length) {
          iMessage.warn(this.language('GOUXUANCHANPINZUDOUYIFASONGJINDUQUERENRENWU','勾选产品组都已发送进度确认任务，如需查看请前往进度确认汇总页面'))
          throw(false)
        }
        const canSendRows = selectRows.filter(item => !(validScheduleRowsRes.data || []).some(rItem => rItem.productGroupId === item.productGroupId))
        const fsOptions = await this.getFsUserList(canSendRows)
        const nextThreeWorkDay = await this.getNextThreeWorkDay()
        this.fsTableList = canSendRows.map(item => {
          const fs = fsOptions && fsOptions[item.productGroupId] && fsOptions[item.productGroupId][0].userName || ''
          const fsId = fsOptions && fsOptions[item.productGroupId] && fsOptions[item.productGroupId][0].userId || ''
          const options = fsOptions ? fsOptions[item.productGroupId]?.reduce((accu, item) => {
            if (item.userId) {
              return [...accu, {
                ...item,
                value: item.userId,
                label: item.userName
              }]
            } else {
              return accu
            }
          },[]) : []
          return {
            ...item,
            cartypeProject: this.carProjectName,
            scheBfToFirstTryoutWeek: item.keyBfToFirstTryoutWeek,
            scheFirstTryEmWeek: item.keyFirstTryEmWeek,
            scheFirstTryOtsWeek: item.keyFirstTryOtsWeek,
            productGroupDe: item.productGroupNameDe,
            productGroupZh: item.productGroupNameZh,
            confirmDateDeadline: nextThreeWorkDay,
            projectPurchaser: this.$store.state.permission.userInfo.nameZh,
            projectPurchaserId: this.$store.state.permission.userInfo.id,
            selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions,
            fs: fs,
            fsId: fsId
          }
        })
        this.loading = false
        this.changeFsConfirmVisible(true)
      } catch(error) {
        this.loading = false
      }
      
    },
    /**
     * @Description: 获取三个工作日后的日期
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getNextThreeWorkDay() {
      if (moment().day() === 2 || moment().day() === 1) {
        return moment().add(3, 'days').format('YYYY-MM-DD')
      } else {
        return moment().add(5, 'days').format('YYYY-MM-DD')
      }
    },
    /**
     * @Description: 切换fs确认弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeFsConfirmVisible(visible) {
      this.fsConfirmDialogVisible = visible 
    },
    /**
     * @Description: 选中全部产品组状态切换
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleCheckAllChange(val) {
      this.products = this.products?.map(item => {
        return {
          ...item,
          isChecked: val
        }
      })
      this.isIndeterminate = false;
    },
    /**
     * @Description: 产品组checkbox选中状态变更
     * @Author: Luoshuang
     * @param {*} value
     * @param {*} pro
     * @return {*}
     */    
    handleCheckboxChange(value, pro) {
      console.log(this.products)
      let checkedCount = this.products.filter(item => item.isChecked).length;
      this.checkAll = checkedCount === this.products.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.products.length;
    }
  }
}
</script>

<style lang="scss" scoped>
.periodicView {
  height: 100%;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0 20px;
    &-span {
      padding-left: 20px;
      display: flex;
      align-items: center;
      &-unit {
        font-size: 16px;
        color: #939393;
        margin-left: 12px;
      }
    }
  }
  &-content {
    height: calc(100% - 80px);
    overflow: auto;
  }
  .productItem {
    background-color: rgba(205, 212, 226, 0.12);
    border-radius: 10px;
    padding: 25px 20px 30px;
    &-top {
      display: flex;
      align-items: center;
      &-targetList {
        margin-left: 130px;
        display: flex;
        align-items: center;
        &-item {
          margin-right: 54px;
          display: flex;
          align-items: center;
          &-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
          &-label {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      &-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        font-size: 16px;
        color: #333;
        margin-left: 30px;
        span {
          display: flex;
          height: 30px;
          align-items: center;
        }
      }
      &-node {
        flex: 2;
        position: relative;
        display: flex;
        &:last-child {
          flex: 1;
        }
        .productItem-bottom-nodeItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          &-label {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            // display: flex;
            height: 30px;
            // align-items: center;
            // justify-content: center;
          }
          .step-icon {
            width: 36px;
            height: 36px;
          }
        }
        .productItem-bottom-stepBetween {
          // position: absolute;
          // right: 0;
          // top: 30px;
          margin-left: 5%;
          width: 50%;
          margin-right: 5%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .flex-box {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &-input {
            height: 30px;
            width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            ::v-deep .el-input__inner {
              text-align: center;
              font-weight: bold;
            }
            &.text {
              border: 1px solid rgba(181, 186, 198, 0.19);
              background-color: rgba(233, 236, 241, 0.75);
            }
            &.markBlue {
              ::v-deep .el-input__inner{
                color: rgba(23, 99, 247, 1);
                text-align: center;
                border-color: rgba(23, 99, 247, 1);
              }
            }
            &.markRed {
              color: rgba(227, 13, 13, 1);
            }
          }
          .small {
            .productItem-bottom-stepBetween-input {
              width: 60px;
            }
          }
          .step-between-icon {
            width: 100%;
          }
        }
      }
    }
  }
  .productItem + .productItem {
    margin-top: 20px;
  }
  ::v-deep .el-checkbox {
    display: flex;
    align-items: center;
  }
  ::v-deep .el-checkbox__inner {
    width: 20px;
    height: 20px;
    &::after {
      height: 10px;
      width: 5px;
      left: 6px;
    }
    &::before {
      top: 8px;
    }
  }
  ::v-deep .el-checkbox__label {
    font-size: 18px;
    font-weight: bold;
    color: #41434A;
  }
}
</style>