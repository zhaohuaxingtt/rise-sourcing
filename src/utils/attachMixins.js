/*
 * @Author: haojiang
 * @Date: 2021-02-24 14:28:34
 * @LastEditTime: 2021-07-14 21:15:30
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
import { downloadUdFile as downloadFile } from '@/api/file'
import filters from '@/utils/filters'

export const attachMixins = {
  mixins: [ filters ],
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
      if (!this.nomiAppId && !params.nomiAppId) return iMessage.error(this.language('nominationLanguage_DingDianIDNotNull','定点申请单id不能为空'))
      try {
        const res1 = await getdDecisiondataListAll(Object.assign({
          nomiAppId: this.nomiAppId || this.$store.getters.nomiAppId,
          sortColumn: 'sort',
          isAsc: true,
          fileType: '101',
        }, params))
        if (res1.code === '200') {
          const list = res1.data || []
          const fileList = list.map(o => o.uploadId)
          if (fileList.length) {
            // const params = {
            //   applicationName: 'rise',
            //   fileList
            // }
            const params = fileList;
            console.log('批量下载', params)
            downloadFile(params)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    getDataList(params = {}) {
      if (!this.nomiAppId && params.nomiAppId) return iMessage.error(this.language('nominationLanguage_DingDianIDNotNull','定点申请单id不能为空'))
      this.tableLoading = true
      params = Object.assign({
        nomiAppId: this.nomiAppId || this.$store.getters.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
        pageNo: (this.page && this.page.currPage) || 1,
        pageSize: (this.page && this.page.pageSize) || 10
      }, params)
      console.log('-请求参数--', params)
      getdDecisiondataList(params).then(res => {
        if (res.code === '200') {
          this.dataList = res.data.records || res.data || []
          if (this.page) {
            this.page.totalCount = Number(res.total)
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
      if (!data.data.name && !data.data.path) {
        this.tableLoading = false
        // 上传发生错误，oss无文件名，路径返回
        iMessage.error(this.language('strategicdoc_ShangChuanFaShengCuoWu','上传发生错误，请稍后重试'))
        return
      }
      this.tableLoading = true
      const params = {
        // 业务配置相关
        fileType: data.fileType || 101,
        hostId: data.hostId || this.$store.getters.nomiAppId || '',
        fileCode: data.fileCode || '0',
        // 文件内容🇭相关
        fileName: data.data.name || '',
        filePath: data.data.path || '',
        fileSize: data.file.size || 0,
        size: data.file.size || 0,
        uploadId:data.data.id,
      }
      console.log(params, data)
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
    async deleteFile(fileList = [], callback) {
      let idList = []
      if (!(fileList && fileList.length)) {
        if (!this.multipleSelection.length) {
          iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
          return
        }
        const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
        if (confirmInfo !== 'confirm') return
        idList = this.multipleSelection.map(o => o.id)
      } else {
        // 直接提供数组id列表删除
        idList = [...fileList]
      }
      
      try {
        const res = await batchDeletefile(idList)
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          callback && typeof callback === 'function' && (callback())
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      }
    },
    // 下载文件
    downloadFile() {
      const fileList = this.multipleSelection.map(o => o.uploadId)
      if (!fileList.length) return iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
      try {
        console.log(fileList)
        if (fileList.length) {
          // const params = {
          //   applicationName: 'rise',
          //   fileList
          // }
          const params = fileList;
          downloadFile(params)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 
    dowloadSingleFile(item) {
      // const params = {
      //   applicationName: 'rise',
      //   fileList: [item.fileName]
      // }
      const params = [item.uploadId]
      downloadFile(params)
    },
  }
} 

