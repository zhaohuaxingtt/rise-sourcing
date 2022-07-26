/*
 * @Author: YoHo
 * @Date: 2022-03-21 11:06:15
 * @LastEditTime: 2022-03-28 14:29:58
 * @LastEditors: YoHo
 * @Description: 
 */
import menus from './menus'
import rfq from "./rfq";
import aeko from "./aeko";
import newField from "./newField";
export default { ...menus, ...rfq, ...aeko, ...newField }
