/*
 * @Author: your name
 * @Date: 2021-02-19 14:29:08
 * @LastEditTime: 2021-03-24 20:50:20
 * @LastEditors: Please set LastEditors
 * @Description: 项目中用到的验证规则
 * @FilePath: \rise\src\assets\validate\zh_cn.js
 */
// eslint-disable-next-line no-undef
 const validate = {
  number:[/^[0-9]+$/,'请输入数字'],
  mobile:[/^1[3|4|5|6|7|8][0-9]{9}$/,'请输入手机号码'],
  email:[/^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/,'请输入邮箱'],
  IdCard:[/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,'请输入身份证'],
  password:[/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,'新密码至少八个字符，至少一个字母，一个数字和一个特殊字符'],
  floatNumber2:[/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/, '请输入大于零的数,最多保留两位小数']
}

export default validate