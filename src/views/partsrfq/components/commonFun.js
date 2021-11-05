import {iMessage} from 'rise';

export const rfqCommonFunMixins = {
    methods: {
        resultMessage(res, successCallback, errorCallback) {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (res.result) {
                iMessage.success(result)
                if (successCallback) {
                    successCallback()
                }
            } else {
                iMessage.error(result)
                if (errorCallback) {
                    errorCallback()
                }
            }
        }
    }
}