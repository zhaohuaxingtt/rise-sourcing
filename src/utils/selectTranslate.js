Vue.prototype.$getLabel = function (Zh,En){//下拉框国际化
    if(this.$i18n.locale === "zh"){
        return Zh?Zh:En
    }else{
        return En?En:Zh
    }
}

export default Vue.prototype.$getLabel