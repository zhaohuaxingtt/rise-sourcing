/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:08
 * @LastEditTime: 2021-04-01 19:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\components\index.js
 */
import { MessageBox, Message } from 'element-ui'
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
import iEditForm from './iEditForm'
import iNavMvp from "../components/iNavMvp"
import iDialog from '../components/iDialog'
import iFormGroup from '../components/iPageItemsGroup/iFormGroup'
import iFormItem from '../components/iPageItemsGroup/iFormItem'
import iText from '../components/iPageItemsGroup/iText'
import iDrawer from "../components/iDrawer"
import iRadio from "../components/iRadio"
import iDatePicker from "../components/iDatePicker"
// const msg = this.$t('LK_WENXINTISHI');
const iMessageBox = (content = '', title, options = {}) => {
    return MessageBox.confirm(content, title, Object.assign({ zIndex: 20000 }, options))
}

function message() {
    this.type = 'success';
    this.message = ''
    return this
}
message.prototype.success = (message) => {
    Message({
        message: message || this.message,
        type: 'success',
    })
}
message.prototype.warn = (message) => {
    Message({
        message: message || this.message,
        type: 'warning'
    })
}
message.prototype.error = (message) => {
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
    iEditForm,
    iDialog,
    iText,
    iDrawer,
    iRadio,
    iDatePicker
}