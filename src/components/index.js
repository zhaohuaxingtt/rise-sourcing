/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:08
 * @LastEditTime: 2021-02-25 17:39:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\components\index.js
 */
import {MessageBox,Message} from 'element-ui'
import iInput from '../components/iInput'
import iSelect from '../components/iSelect'
import iTabs from '../components/iTabs'
import iButton from '../components/iButton'
import iCard from '../components/iCard'
import icon from '../components/icon'
import iPage from '../components/iPage'
import iSearch from '../components/iSearch'
import mvpNavBar from "../components/mvpNavBar"
const iMessageBox = (content='',title='温馨提示',options={}) => {
  return MessageBox.confirm(content,title,Object.assign({zIndex:20000},options))
}
function message(){
  this.type = 'success';
  this.message = ''
  return this
}
message.prototype.success = (message)=>{
  Message({
    message: message || this.message,
    type: 'success',
  })
}
message.prototype.warn = (message)=>{
  Message({
    message: message || this.message,
    type: 'warning'
  })
}
message.prototype.error = (message)=>{
  Message({
    message: message || this.message,
    type: 'error'
  })
}
const iMessage = new message()
export {
  iInput,
  iSelect,
  iButton,
  iCard,
  iTabs,
  icon,
  iPage,
  iMessage,
  iMessageBox,
  iSearch,
  mvpNavBar
}