(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
  typeof define === 'function' && define.amd ? define(['i18n'], factory) :
  (global = global || self, factory(window.i18n))
}(this, function (i18n) {
  'use strict'
  
  i18n.setLocaleMessage('en', {
    'delete':"delete",
    'XXDLSH':"XXDLSH",  //信息单流水号
    'all': 'all',
    'search': 'search',
    'setting': 'setting',
    'pagination': {
      'prev': 'prev',
      'next': 'next'
    },
    'topLayout': {
      'message': {
        'notice': 'notice',
        'message': 'message'
      }
    },
    'partsign': {
      'enquiry': 'enquiry',
      'volume': 'volume',
      'log': 'log'
    }
  })
}))
