/*
 * @Author: haojiang
 * @Date: 2021-02-24 14:28:34
 * @LastEditTime: 2021-05-10 16:21:04
 * @LastEditors: Please set LastEditors
 * @Description: 针对所有的分页插件，实行方法混入。
 * @FilePath: \rise\src\utils\attachMixins.js
 */
import Vue from 'vue'
import {iMessage} from 'rise'
import {
  uploadfile,
  batchDeletefile,
  getdDecisiondataList,
  getdDecisiondataListAll
} from '@/api/designate/decisiondata/attach'
// 下载文件api
import { downloadFile } from '@/api/file'

export const attachMixins = {
  data(){
    return {
    // 加载状态
    tableLoading: false,
    //  选中的数据
    multipleSelection: [],
    // 列表
    dataList: []
    }
  },
  methods:{
    // 选中
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    async batchDownload(params = {}) {
      if (!this.nomiAppId && !params.nomiAppId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      try {
        const res1 = await getdDecisiondataListAll(Object.assign({
          nomiAppId: this.nomiAppId,
          sortColumn: 'sort',
          isAsc: true,
          fileType: '101',
        }, params))
        if (res1.code === '200') {
          const list = res1.data.records || []
          const fileList = list.map(o => o.id)
          console.log(fileList)
          if (fileList.length) {
            const params = {
              applicationName: 'rise',
              fileList
            }
            console.log('批量下载', params)
            downloadFile(params)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    getDataList(params = {}) {
      if (!this.nomiAppId && params.nomiAppId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      this.tableLoading = true
      getdDecisiondataList(Object.assign({
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
        pageNo: (this.page && this.page.currPage) || 1,
        pageSize: (this.page && this.page.pageSize) || 10
      }, params)).then(res => {
        if (res.code === '200') {
          this.dataList = res.data.records || []
          if (this.page) {
            this.page.totalCount = res.data.total
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
    },
    // 上传成功回调，配合@/components/Upload 食用
    onUploadsucess(data, callback) {
      console.log(data)
      this.tableLoading = true
      const params = {
        // 业务配置相关
        fileType: data.fileType || 101,
        hostId: data.hostId || '1',
        fileCode: data.fileCode || '0',
        // 文件内容🇭相关
        fileName: data.data.fileName || '',
        filePath: data.data.filePath || '',
        fileSize: data.file.size || 0,
        size: data.file.size || 0
      }
      console.log(params)
      uploadfile(params).then(res => {
        if (res.code === '200') {
          iMessage.success('上传成功')
          callback && typeof callback === 'function' && (callback())
          console.log(res)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      })

    },
    // 删除文件,
    async deleteFile(fileList = []) {
      let idList = []
      if (!(fileList && fileList.length)) {
        if (!this.multipleSelection.length) {
          iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
          return
        }
        const confirmInfo = await this.$confirm(this.$t('deleteSure'))
        if (confirmInfo !== 'confirm') return
        idList = this.multipleSelection.map(o => o.id)
      } else {
        // 直接提供数组id列表删除
        idList = [...fileList]
      }
      
      try {
        const res = await batchDeletefile({idList})
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      }
    },
    // 下载文件
    downloadFile() {
      const fileList = this.multipleSelection.map(o => o.id)
      if (!fileList.length) return iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
      try {
        console.log(fileList)
        if (fileList.length) {
          const params = {
            applicationName: 'rise',
            fileList
          }
          downloadFile(params)
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
} 

