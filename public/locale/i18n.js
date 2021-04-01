;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.i18n = factory())
}(this, function () { 
  'use strict'
  const lang = localStorage.getItem('lang')
  const orignalSetItem = localStorage.setItem;
  localStorage.setItem = function(key,newValue){
    var setItemEvent = new Event("setItemEvent");
    setItemEvent.key = key;
    window.dispatchEvent(setItemEvent);
    orignalSetItem.apply(this,arguments);
  };
  if (!lang) {
    lang = window.navigator.language ? window.navigator.language.replace(/^(.*)-(.*)$/, '$1'): 'zh'
    localStorage.setItem('lang', lang)
  }

  return new window.VueI18n({
    locale: lang || 'zh',
    fallbackLocale: 'en',
  })
}))
