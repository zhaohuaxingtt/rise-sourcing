/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:08
 * @LastEditTime: 2021-02-26 18:25:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\components\index.js
 */
import {MessageBox,Message} from 'element-ui'
import iInput from '../components/iInput'
import iSelect from '../components/iSelect'
import iTabs from '../components/iTabs'
import iTabsList from "../components/iTabs-list"
import iButton from '../components/iButton'
import iCard from '../components/iCard'
import icon from '../components/icon'
import iPage from '../components/iPage'
import iPagination from '../components/iPagination'
import iSearch from '../components/iSearch'
import logDialog from '../components/logDialog'
import iNavMvp from "../components/iNav-mvp"
import iEditorInfo from "../components/iEditor-info"
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
  iTabsList,
  icon,
  iPage,
  iMessage,
  iMessageBox,
  iPagination,
  iNavMvp,
  iSearch,
  logDialog,
  iEditorInfo
}