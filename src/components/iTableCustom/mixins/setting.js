import { iMessage } from 'rise'
import iTableHeaderSorter from '@/components/iTableHeaderSort'
export default {
  components: { iTableHeaderSorter },
  computed: {
    unCols() {
      // 列权限控制，返回无权限的字段列表
      if (!this.permissionKey) {
        return []
      }
      const columnPermissions = sessionStorage.getItem('columnConfig')
      if (columnPermissions) {
        const currentColumnPermission =
          JSON.parse(columnPermissions)[this.permissionKey]
        if (currentColumnPermission) {
          return currentColumnPermission.unCols
        }
      }
      return []
    },
    tableVisibleColumns() {
      // 表格的列
      if (this.tableColumns.length) {
        return this.tableColumns.filter(
          (e) => !e.isHidden && !this.unCols.includes(e.prop)
        )
      }
      return this.columns.filter((e) => !this.unCols.includes(e.prop))
    },
    tableSettingColumns() {
      // 表格自由列表设置列
      if (this.tableColumns.length) {
        return this.tableColumns.filter((e) => !this.unCols.includes(e.prop))
      }
      return this.columns.filter((e) => !this.unCols.includes(e.prop))
    },
    usercenterApiPrefix() {
      let env = window.sessionStorage.getItem('env') || this.env
      const baseMap = {
        '': '/api',
        dev: '/usercenterApi',
        sit: '/usercenterApi',
        vmsit: '/usercenterApi',
        uat: '/usercenterApi',
        production: '/api'
      }
      return baseMap[env.toLowerCase()] || '/api'
    }
  },
  created() {
    if (this.permissionKey) {
      this.querySetting()
    }
  },
  methods: {
    /******************* 记忆列表 ********************/
    getCookie(name) {
      const strCookie = document.cookie //获取cookie字符串
      const arrCookie = strCookie.split('; ') //分割
      //遍历匹配
      for (let i = 0; i < arrCookie.length; i++) {
        if (arrCookie[i].indexOf(`${name}=`) === 0) {
          return arrCookie[i].replace(`${name}=`, '')
        }
      }
      return ''
    },
    openSetting() {
      this.settingVisible = true
    },
    handleSaveSetting(val) {
      const userInfo = window.sessionStorage.getItem('userInfo') || ''
      if (userInfo) {
        const userData = JSON.parse(userInfo)
        const accountId = userData?.accountId
        const http = new XMLHttpRequest()
        const url = `${this.usercenterApiPrefix}/web/configUserListMemory`
        http.open('POST', url, true)
        http.setRequestHeader('content-type', 'application/json')
        http.setRequestHeader('token', this.getCookie('token'))
        http.onreadystatechange = (res) => {
          if (http.readyState === 4 && http.status == 200) {
            const response = JSON.parse(http.responseText)
            if (response.code === '200') {
              this.tableColumns = val.length ? val : this.columns
              iMessage.success('保存成功')
            } else {
              iMessage.error('保存失败')
            }
          }
        }
        const requestData = {
          accountId: accountId,
          listConfig: JSON.stringify(val),
          permissionKey: this.permissionKey
        }
        if (this.settingId) {
          requestData.id = this.settingId
        }
        http.send(JSON.stringify(requestData))
      }
    },
    handleResetSetting() {
      this.handleSaveSetting([])
    },
    querySetting() {
      /*  const userInfo = window.sessionStorage.getItem('userInfo') || ''
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      const accountId = userData?.accountId */
      const http = new XMLHttpRequest()
      const url = `${this.usercenterApiPrefix}/web/getUserListMemory`
      http.open('POST', url, true)
      http.setRequestHeader('content-type', 'application/json')
      http.setRequestHeader('token', this.getCookie('token'))
      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status == 200) {
          const response = JSON.parse(http.responseText).data
          if (response && response.length > 0) {
            this.tableColumns = JSON.parse(response[0].listConfig)
            this.settingId = response[0].id
          } else {
            this.tableColumns = this.columns
          }
        } else {
          this.tableColumns = this.columns
        }
      }
      const requestData = {
        permissionKey: this.permissionKey
      }
      http.send(JSON.stringify(requestData))
    }
  }
}
