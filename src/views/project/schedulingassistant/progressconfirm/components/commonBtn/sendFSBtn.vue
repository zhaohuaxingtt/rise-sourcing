<!--
 * @Author: Luoshuang
 * @Date: 2021-08-31 17:49:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-01 18:04:26
 * @Description: 发送FS按钮
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\commonBtn\sendFSBtn.vue
-->

<template>
  <span>
    <iButton @click="handleOpenSendDialog" :loading="sendLoading">{{language('FASONG','发送')}}</iButton>
    <fsConfirm ref="fsConfirmPart" :dialogVisible="dialogVisibleFS" @handleConfirm="handleSendFsConfirm" :tableListNomi="tableListNomi" :tableListKickoff="tableListKickoff" @changeVisible="changeFsConfirmVisible" />
  </span>
</template>

<script>
import { iMessage, iButton } from 'rise'
import { getFsUserListPart, partProgressConfirm } from '@/api/project'
import fsConfirm from '@/views/project/schedulingassistant/part/components/fsconfirm'
export default {
  components: { iButton, fsConfirm },
  props: {
    /**
     * @Description: 类型  1-产品组  2-零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    sendType: {type:String,default:'1'},
    /**
     * @Description: 发送数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    sendData: {type:Array,default:()=>[]}
  },
  data() {
    return {
      loading: false,
      dialogVisibleFS: false,
      tableListNomi: [],
      tableListKickoff: [],
      sendLoading: false
    }
  },
  methods: {
    handleSave() {
      if(this.sendData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOTUIHUIDESHUJU', '请选择需要退回的数据'))
        return
      }
      this.changeFsConfirmVisible(true)
      // if (this.sendType === '1') {
      //   this.saveSchedule()
      // } else {
      //   this.returnPartScheduleList()
      // }
    },
    changeFsConfirmVisible(visible) {
      this.dialogVisibleFS = visible
    },
    /**
     * @Description: 根据选中的行获取每一行的fs下拉列表
     * @Author: Luoshuang
     * @param {*} tableList
     * @return {*}
     */    
    async getFsUserList(tableList) {
      const res = await getFsUserListPart({partNums: tableList.map(item => item.partNum).join(',')})
      if (res?.result) {
        return res.data
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        return null
      }
    },
    async handleOpenSendDialog() {
      this.sendLoading = true
      if (this.sendData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据'))
        return
      }
      const sendData = this.sendData.filter(item => item.riskLevel !== 1)
      if (sendData.length < 1) {
        iMessage.warn(this.language('MEIYOUXUYAOFASONGDESHUJU', '没有需要发送的数据'))
        return
      }
      // 获取询价采购员下拉数据
      const fsOptions = await this.getFsUserList(sendData)
      const tableListNomi = []
      const tableListKickoff = []
      sendData.forEach((item) => {
        const options = fsOptions ? fsOptions[item.partNum]?.map(item => {
          return {
            ...item,
            value: item.userId,
            label: item.userName
          }
        }) : []
        const tableItem = {
          ...item,
          carTypeProject: item.cartypeProject,
          carTypeProId: item.cartypeProId,
          selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions
        }
        if (item.partPeriod == 2) {
          tableListNomi.push(tableItem)
        }
        if (item.partPeriod == 3) {
          tableListKickoff.push(tableItem)
        }
      })
      this.tableListNomi = tableListNomi
      this.tableListKickoff = tableListKickoff
      this.sendLoading = false
      this.changeFsConfirmVisible(true)
    },
    handleSendFsConfirm(selectRow) {
      // eslint-disable-next-line no-undef
      partProgressConfirm(selectRow.map(item => _.omit(item, 'selectOption'))).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeFsConfirmVisible(false)
          this.$emit('getTableList')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.fsConfirmPart.changeSaveLoading(false)
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>