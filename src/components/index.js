/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:08
 * @LastEditTime: 2021-03-02 14:29:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\components\index.js
 */
import {MessageBox,Message} from 'element-ui'
import iInput from '../components/iInput'
import iSelect from '../components/iSelect'
import iTabs from '../components/iTabs'
import iTabsList from "../components/iTabsList"
import iButton from '../components/iButton'
import iCard from '../components/iCard'
import icon from '../components/icon'
import iPage from '../components/iPage'
import iPagination from '../components/iPagination'
import iSearch from '../components/iSearch'
import iNavMvp from "../components/iNavMvp"
import iDialog from '../components/iDialog'
import iFormGroup from '../components/iPageItemsGroup/iFormGroup'
import iFormItem from '../components/iPageItemsGroup/iFormItem'
import iText from '../components/iPageItemsGroup/iText'
import iDrawer from "../components/iDrawer"
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
  iFormGroup,
  iFormItem,
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
  iDialog,
  iText,
  iDrawer
}