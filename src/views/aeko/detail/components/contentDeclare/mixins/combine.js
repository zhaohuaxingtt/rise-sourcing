/*
 * @Autor: Hao,Jiang
 * @Date: 2021-11-02 11:12:44
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-11-09 14:44:08
 * @Description: 内容表态组合相关功能
 */

import {
  saveCombination,
  updateGroupName,
  cancelCombination
} from "@/api/aeko/detail"
import {iMessage} from 'rise'

export const combine = {
  data() {
    return {
      spanArr: [],
    }
  },
  computed: {
    // 判断是否支持组合
    cantBeCombine() {
      const selectionLength = this.multipleSelection.length
      return selectionLength && selectionLength === this.multipleSelection.filter(o => o.groupCode).length
    },
  },
  methods: {
    // 组合
    async combine() {
      const dataList = this.multipleSelection
      if (dataList.length <= 1) {
        this.$message.error(this.language('GOUXUANDUOLINGJIANZUHE','请勾选多个零件行项目组合'))
        return
      }
      // 包含已经有分组的零件
      if (dataList.filter(o => o.groupCode).length) {
        this.$message.error(this.language('XUXUANZHONGMEIBEIFENZUDELINGJIAN','需选中没有被分组的零件行项目，请重新选择！'))
        return
      }
      const requirementAekoId = this.$route.query.requirementAekoId
      const oldPartNumPreset = window._.uniq(dataList.map(o => o.oldPartNumPreset))
      const partNum = window._.uniq(dataList.map(o => o.partNum))
      const ids = dataList.map(o => o.objectAekoPartId)
      const params = {
        requirementAekoId,
        groupName: '',
        ids,
        oldPartNumPreset,
        partNum
      }
      this.$confirm(this.language('NINQUEDINGYAOZHIXINGZUHE', '您确定要执行组合吗')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          saveCombination(params).then(res => {
            if (res && res.code === '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
              this.init()
            } else if (res) {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          }).catch(e => {
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
          })
        }
      })
    },
    // 删除合并
    async cancelCombination() {
      let dataList = this.multipleSelection
      const filtedDataList = window._.uniqBy(dataList, o => o.groupCode)
      const groupCode = filtedDataList[0].groupCode
      if (filtedDataList.length > 1) {
        this.$message.error(this.language('GOUXUANBAOHANDUOGEFENZUCUOWU','勾选的项目包含多个分组'))
        return
      }
      if (dataList.filter(o => o.groupType === 1).length) {
        this.$message.error(this.language('XITONGZIDONGZUHEQUXAIOSHIBAI','当前组合项目为系统自动组合，【取消组合】失败'))
        return
      }
      dataList = this.tableListData.filter(o => o.groupCode === groupCode)
      const oldPartNumPreset = window._.uniq(dataList.map(o => o.oldPartNumPreset)).filter(o => o)
      const partNum = window._.uniq(dataList.map(o => o.partNum)).filter(o => o)
      const ids = dataList.map(o => o.objectAekoPartId)
      const requirementAekoId = this.$route.query.requirementAekoId
      const params = {
        requirementAekoId,
        groupCode,
        ids,
        oldPartNumPreset,
        partNum
      }
      this.$confirm(this.language('SHIFOUQUXAIODANGQIANGOUXUANZUHE', '是否取消当前勾选组合？')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          cancelCombination(params).then(res => {
            if (res && res.code === '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
              this.init()
            } else if (res) {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          }).catch(e => {
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
          })
        }
      })
    },
    // 修改组合名
    updateGroupName(row) {
      const groupName = row.groupName
      const groupCode = row.groupCode
      const groupType = row.groupType
      const requirementAekoId = this.$route.query.requirementAekoId
      if (groupName && groupCode && groupName !== row.groupNameBak) {
        const dataList = this.tableListData.filter(o => o.groupCode === groupCode)
        const oldPartNumPreset = window._.uniq(dataList.map(o => o.oldPartNumPreset)).filter(o => o)
        const partNum = window._.uniq(dataList.map(o => o.partNum)).filter(o => o)
        const ids = dataList.map(o => o.objectAekoPartId)
        const params = {
          requirementAekoId,
          groupName,
          groupCode,
          groupType,
          ids,
          oldPartNumPreset,
          partNum
        }
        updateGroupName(params).then(res => {
          if (res && res.code === '200') {
            this.init()
            console.log('update groupName success', groupName)
          } else if (res) {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch(e => {
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        })
      }
    },
    rowspan(dataList = [], groupKey = 'groupCode', cb = null) {
      // 缓存每行的span记录
      const spanArr = []
      // 遍历dataList index
      let position = 0
      // 过滤有分组的数据行，把相同分组id的放在一起,并排序
      const groupedArray = dataList.filter(o => o[groupKey]).sort((a, b) => {return a[groupKey] === b[groupKey]})
      // 过滤出没有分组的数据行
      const unGroupedArray = dataList.filter(o => !o[groupKey])
      // 合并
      dataList = [...groupedArray, ...unGroupedArray]

      dataList.map((item, index) => {
        if( index === 0){
          spanArr.push(1);
          position = 0;
        }else{
          if(item[groupKey] && item[groupKey] === dataList[index-1][groupKey] ){
            spanArr[position] += 1;
            spanArr.push(0);
          }else{
            spanArr.push(1);
            position = index;
          }
        }
        return item
      })
      // 处理回调
      typeof cb === 'function' && (cb(dataList, spanArr))
      this.spanArr = spanArr
      return spanArr
    },
    spanMethod({row, column, rowIndex, columnIndex}) {
      // 只做第2列合并操作
      if (columnIndex === 2) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
  }
  
}