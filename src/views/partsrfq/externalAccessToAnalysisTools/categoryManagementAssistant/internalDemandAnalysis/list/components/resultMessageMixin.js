import {iMessage} from 'rise';

export default {
  methods: {
    resultMessage(res, successCallback, errorCallback) {
      const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
      const moduleName = res.moduleName ? res.moduleName + ':' : '';
      if (res.result) {
        iMessage.success(moduleName + result);
        if (successCallback) {
          successCallback();
        }
      } else {
        iMessage.error(moduleName + result);
        if (errorCallback) {
          errorCallback();
        }
      }
    },
  },
};
