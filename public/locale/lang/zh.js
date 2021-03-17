(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
  typeof define === 'function' && define.amd ? define(['i18n'], factory) :
  (global = global || self, factory(window.i18n))
}(this, function (i18n) { 
  'use strict'
  
  i18n.setLocaleMessage('zh', {
    'all': '全部',
    'search': '搜索',
    'setting': '设置',
    'pagination': {
      'prev': '上一页',
      'next': '下一页'
    },
    'topLayout': {
      'message': {
        'notice': '通知',
        'message': '消息'
      }
    },
    'partsign': {
      'enquiry': '询价资料',
      'volume': '每车用量',
      'log': '操作日志'
    }
  })
}))