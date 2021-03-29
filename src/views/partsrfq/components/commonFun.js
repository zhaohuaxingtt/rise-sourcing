import {iMessage} from "@/components";

export const rfqCommonFunMixins = {
    methods: {
        resultMessage(res) {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (res.result) {
                iMessage.success(result)
            } else {
                iMessage.error(result)
            }
        }
    }
}