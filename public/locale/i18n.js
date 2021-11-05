(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global = global || self, global.i18n = factory())
}(this, function() {
    'use strict'
    let lang = localStorage.getItem('lang')
    if (!lang) {
        lang = window.navigator.language ? window.navigator.language.replace(/^(.*)-(.*)$/, '$1') : 'zh'
        localStorage.setItem('lang', lang)
    }
    //默认语言设置ELEMENT
    if (lang == "en") {
        // eslint-disable-next-line no-undef
        ELEMENT.locale(ELEMENT.lang.en)
    } else {
        // eslint-disable-next-line no-undef
        ELEMENT.locale(ELEMENT.lang.zhCN)
    }

    return new window.VueI18n({
        locale: lang || 'zh',
        fallbackLocale: 'en',
    })
}))