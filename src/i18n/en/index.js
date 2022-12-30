/*
 * @Author: YoHo
 * @Date: 2022-03-21 11:06:15
 * @LastEditTime: 2022-12-06 17:11:00
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 
 */
import menus from './menus'
import rfq from "./rfq";
import aeko from "./aeko";
import sel from "./sel";
import newField from "./newField";
export default { ...menus, ...rfq, ...aeko, ...sel, ...newField }
