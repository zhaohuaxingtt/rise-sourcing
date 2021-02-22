;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
  typeof define === 'function' && define.amd ? define(['i18n'], factory) :
  (global = global || self, factory(window.i18n))
}(this, function (i18n) {
  'use strict'
  
  i18n.setLocaleMessage('en', {
    'all': 'all',
    'search': 'search'
  })
}))
