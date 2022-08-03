/*
 * @Author: your name
 * @Date: 2021-06-16 15:25:24
 * @LastEditTime: 2022-02-22 16:05:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\store\module\sourcing.js
 */
import { getAgentTasksNum } from '@/api/partsrfq/home'
import { cloneDeep } from 'lodash'
import axios from 'axios'

const state = {
	navList: [
		//sourcing 4级菜单列表
		{
			value: 1,
			name: '零件签收',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign',
			activePath: 'partsign',
			key: 'LK_LINGJIANQIANSHOU',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSIGN',
			permissionName: '寻源执行-零件签收',
		},
		{
			value: 2,
			name: '采购项目建立',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsprocure',
			activePath: 'partsprocure',
			key: 'LK_CAIGOUXIANGMUJIANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSPROCURE',
			permissionName: '寻源执行-采购项目建立',
		},
		{
			value: 3,
			name: '配件签收',
			message: 0,
			url: '/sourceinquirypoint/sourcing/signforpartsdemand',
			activePath: 'signforpartsdemand',
			key: 'LK_PEIJIANXUQIUQIANSHOU',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_SIGNFORPARTSDEMAND',
			permissionName: '寻源执行-配件签收',
		},
		{
			value: 4,
			name: '配件管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/integratedmanage',
			activePath: 'integratedmanage',
			key: 'LK_PEIJIANZONGHEGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_INTEGRATEDMANAGE',
			permissionName: '寻源执行-配件管理',
		},
		{
			value: 5,
			name: '附件导入',
			message: 0,
			url: '/sourceinquirypoint/sourcing/importfiles',
			activePath: 'importfiles',
			key: 'LK_FUJIANXUQIUDAORU',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_IMPORTFILES',
			permissionName: '寻源执行-附件导入',
		},
		{
			value: 6,
			name: '附件管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/filemanage',
			activePath: 'filemanage',
			key: 'LK_FUJIANZONGHEGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_FILEMANAGE',
			permissionName: '寻源执行-附件管理',
		},
		{
			value: 7,
			name: 'RFQ管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsrfq',
			activePath: 'partsrfq',
			key: 'LK_RFQGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSRFQ',
			permissionName: '寻源执行-RFQ管理',
		},
		{
			value: 8,
			name: '竞价开标',
			message: 0,
			url: '/sourceinquirypoint/sourcing/biddingProjectList',
			activePath: 'biddingProjectList',
			key: 'LK_JINGJIAKAIBIAO',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_BIDDINGPROJECTLIST',
			permissionName: '寻源执行-竞价开标',
		},
		{
			value: 9,
			name: '定点管理',
			message: 0,
			url: '/sourcing/partsnomination',
			activePath: 'partsnomination',
			key: 'LK_DINGDIANGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSNOMINATION',
			permissionName: '寻源执行-定点管理',
		},
		{
			value: 10,
			name: '钢材创建',
			message: 0,
			url: '/sourceinquirypoint/sourcing/steeldemandcreation',
			activePath: 'steeldemandcreation',
			key: 'GANGCAIXUQIUCHUANGJIAN',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_STEELDEMANDCREATION',
			permissionName: '寻源执行-钢材创建',
		},
		{
			value: 11,
			name: '定点信/LOI',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsletter',
			activePath: 'partsletter',
			key: 'LK_DINGDIANXINLOI',
			permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_SUBMENU_PARTSLETTER',
			permissionName: '寻源执行-定点信/LOI',
		},
	],

	sourceinquirypointNavListLeft: [
		//sourcing 三级菜单列表
		// {
		//   value: 1,
		//   name: "寻源执行",
		//   message: 0,
		//   url: "/sourceinquirypoint/sourcing/partsign",
		//   activePath: "sourcing",
		//   key: "XUANYUANCAIDAN",
		//   permissionKey: 'SOURCEINQUIRYPOINT_SOURCING_MENU',
		//   permissionName: '寻源执行'
		// },
		{
			value: 1,
			name: '寻源概览',
			message: 0,
			url: '/sourcing/dashboard',
			activePath: 'dashboard',
			key: 'XUANYUANGAILAN',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_DASHBOARD',
			permissionName: '寻源概览',
			group: 1,
		},
		{
			value: 2,
			name: '需求管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign',
			activePath: 'partsign',
			key: 'XUQIUGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSIGN',
			permissionName: '需求管理',
			group: 2,
		},
		{
			value: 3,
			name: '采购项目',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsprocure',
			activePath: 'partsprocure',
			key: 'CAIGOUXIANGMU',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSPROCURE',
			permissionName: '采购项目',
			group: 3,
		},
		{
			value: 4,
			name: 'RFQ管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsrfq',
			activePath: 'partsrfq',
			key: 'LK_RFQGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_RFQMANAGE',
			permissionName: 'RFQ管理',
			group: 4,
		},
		{
			value: 5,
			name: '定点管理',
			message: 0,
			url: '/sourcing/partsnomination',
			activePath: 'partsnomination',
			key: 'LK_DINGDIANGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION',
			permissionName: '定点管理',
			group: 5,
		},
		{
			value: 6,
			name: '定点信/LOI',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsletter',
			activePath: 'partsletter',
			key: 'LK_DINGDIANXINLOI',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSLETTER',
			permissionName: '定点信/LOI',
			group: 6,
		},
	],
	sourceinquirypointThirdMenu: [
		//sourcing 4级菜单列表
		{
			name: '概览',
			message: 0,
			url: '/sourcing/dashboard/index',
			activePath: 'dashboard/index',
			key: 'GAILAN',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_DASHBOARD_SUBMENU_DASHBOARD',
			permissionName: '概览',
			group: 1,
		},
		{
			name: '状态跟踪报表',
			message: 0,
			url: '/sourcing/dashboard/report',
			activePath: 'dashboard/report',
			key: 'LK_ZHUANGTAIGENZHONGBAOBIAO',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_DASHBOARD_SUBMENU_REPORT',
			permissionName: '状态跟踪报表',
			group: 1,
		},
		{
			name: '状态跟踪详情',
			message: 0,
			url: '/sourcing/dashboard/details',
			activePath: 'dashboard/details',
			key: 'LK_ZHUANGTAIGENZHONGXIANGQING',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_DASHBOARD_SUBMENU_DETAILS',
			permissionName: '状态跟踪详情',
			group: 1,
		},
		{
			name: '批量件签收',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign',
			activePath: 'partsign',
			key: 'PILIANGJIANQIANSHOU',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_PARTSIGN',
			permissionName: '批量件签收',
			group: 2,
		},
		{
			name: '配件签收',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign/signforpartsdemand',
			activePath: 'signforpartsdemand',
			key: 'LK_PEIJIANXUQIUQIANSHOU',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_SIGNFORPARTSDEMAND',
			permissionName: '配件签收',
			group: 2,
		},
		{
			name: '配件管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign/integratedmanage',
			activePath: 'integratedmanage',
			key: 'LK_PEIJIANZONGHEGUANLI',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_INTEGRATEDMANAGE',
			permissionName: '配件管理',
			group: 2,
		},
		{
			name: '附件导入',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign/importfiles',
			activePath: 'importfiles',
			key: 'LK_FUJIANXUQIUDAORU',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_IMPORTFILES',
			permissionName: '附件导入',
			group: 2,
		},
		{
			name: '附件管理',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign/filemanage',
			activePath: 'filemanage',
			key: 'LK_FUJIANZONGHEGUANLI',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_FILEMANAGE',
			permissionName: '附件管理',
			group: 2,
		},
		{
			name: '钢材导入',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign/steeldemandcreation',
			activePath: 'steeldemandcreation',
			key: 'GANGCAIDAORU',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_STEELDEMANDCREATION',
			permissionName: '钢材导入',
			group: 2,
		},
		{
			name: '工序委外',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsign/outsouringorder',
			activePath: 'outsouringorder',
			key: '工序委外',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_STEELDEMANDCREATION',
			permissionName: '工序委外',
			group: 2,
		},
		{
			name: 'RFQ',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsrfq',
			activePath: 'partsrfq',
			key: 'RFQUPPERCASE',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_RFQMANAGE_SUBMENU_RFQ',
			permissionName: 'RFQ',
			group: 4,
		},
		{
			name: '竞价开标',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsrfq/biddingProjectList',
			activePath: 'biddingProjectList',
			key: 'LK_JINGJIAKAIBIAO',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_RFQMANAGE_SUBMENU_BIDDINGPROJECTLIST',
			permissionName: '竞价开标',
			group: 4,
		},
		{
			name: '定点申请',
			path: '/sourcing/partsnomination',
			message: 0,
			key: 'DINGDIANSHENQING',
			url: '/sourcing/partsnomination',
			activePath: '/partsnomination',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_PARTSNOMINATION',
			permissionName: '定点申请',
			group: 5,
		},
		{
			name: '上会RS复核',
			path: '/sourcing/partsnomination/rsReview',
			message: 0,
			key: 'SHANGHUIRSFUHE',
			url: '/sourcing/partsnomination/rsReview',
			activePath: 'rsReview',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RSREVIEW',
			permissionName: '上会RS复核',
			group: 5,
		},
		{
			name: 'M签字单',
			path: '/sourcing/partsnomination/signSheetBox',
			message: 0,
			key: 'SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE_1',
			url: '/sourcing/partsnomination/signSheetBox',
			activePath: 'signSheetBox',
			permissionKey:
				'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_SIGNSHEETBOX',
			permissionName: 'M签字单',
			group: 5,
		},
		{
			name: '定点记录',
			path: '/sourcing/partsnomination/record',
			message: 0,
			key: 'SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE',
			url: '/sourcing/partsnomination/record',
			activePath: 'record',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RECORD',
			permissionName: '定点记录',
			group: 5,
		},
		{
			name: '定点信',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsletter',
			activePath: 'partsletter',
			key: 'LK_DINGDIANXINLOI_TITLE',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSLETTER_SUBMENU_PARTSLETTER',
			permissionName: '定点信',
			group: 6,
		},
		{
			name: 'LOI',
			message: 0,
			url: '/sourceinquirypoint/sourcing/partsletter/loi',
			activePath: 'loi',
			key: 'LK_DINGDIANXINLOI_LOI',
			permissionKey: 'SOURCEINQUIRYPOINT_MENU_PARTSLETTER_SUBMENU_LOI',
			permissionName: 'LOI',
			group: 6,
		},
	],

	financialmanageNavListLeft: [
		{
			value: 1,
			name: '零件目标价',
			message: 0,
			url: '/targetpriceandscore/financialtargetprice/maintenance',
			activePath: 'financialtargetprice',
			key: 'LINGJIANMUBIAOJIA',
			permissionKey: 'FINANCIALMANAGE_MENU_PARTTARGETPRICE',
			permissionName: '零件目标价',
			group: 1,
		},
		{
			value: 2,
			name: '模具目标价',
			message: 0,
			url: '/targetpriceandscore/modeltargetprice/signin',
			activePath: 'modeltargetprice',
			key: 'MOJUMUBIAOJIA',
			permissionKey: 'FINANCIALMANAGE_MENU_MODELTARGETPRICE',
			permissionName: '模具目标价',
			group: 2,
		},
	],
	financialmanageThirdMenu: [
		{
			name: '维护',
			message: 0,
			url: '/targetpriceandscore/financialtargetprice/maintenance',
			activePath: 'maintenance',
			key: 'WEIHU',
			permissionKey: 'FINANCIALMANAGE_MENU_PARTTARGETPRICE_SUBMENU_MAINTENANCE',
			permissionName: '维护',
			group: 1,
		},
		{
			name: '审批',
			message: 0,
			url: '/targetpriceandscore/financialtargetprice/approval',
			activePath: 'approval',
			key: 'SHENPI',
			permissionKey: 'FINANCIALMANAGE_MENU_PARTTARGETPRICE_SUBMENU_APPROVAL',
			permissionName: '审批',
			group: 1,
		},
		{
			name: '查询',
			message: 0,
			url: '/targetpriceandscore/financialtargetprice/query',
			activePath: 'query',
			key: 'CHAXUN',
			permissionKey: 'FINANCIALMANAGE_MENU_PARTTARGETPRICE_SUBMENU_QUERY',
			permissionName: '查询',
			group: 1,
		},
		{
			name: '签收',
			message: 0,
			url: '/targetpriceandscore/modeltargetprice/signin',
			activePath: 'signin',
			key: 'QIANSHOU',
			permissionKey: 'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_SIGNIN',
			permissionName: '签收',
			group: 2,
		},
		{
			name: '维护',
			message: 0,
			url: '/targetpriceandscore/modeltargetprice/maintenance',
			activePath: 'maintenance',
			key: 'WEIHU',
			permissionKey:
				'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_MAINTENANCE',
			permissionName: '维护',
			group: 2,
		},
		{
			name: '审批',
			message: 0,
			url: '/targetpriceandscore/modeltargetprice/approval',
			activePath: 'approval',
			key: 'SHENPI',
			permissionKey: 'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_APPROVAL',
			permissionName: '审批',
			group: 2,
		},
		{
			name: '查询',
			message: 0,
			url: '/targetpriceandscore/modeltargetprice/query',
			activePath: 'query',
			key: 'CHAXUN',
			permissionKey: 'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_QUERY',
			permissionName: '查询',
			group: 2,
		},
	],

	scoremanageNavListLeft: [
		{
			value: 1,
			name: '评分任务',
			message: 0,
			url: '/targetpriceandscore/supplierscore/home',
			activePath: 'home',
			key: 'PINGFENRENWU',
			permissionKey: 'CSCSCOREMANAGE_MENU_SUPPLIERSCORE',
			permissionName: '评分任务',
			group: 1,
		},
	],
	scoremanageThirdMenu: [],

	costanalysismanageNavListLeft: [
		{
			value: 1,
			name: '成本分析管理',
			message: 0,
			url: '/targetpriceandscore/costanalysismanage/home',
			activePath: 'home',
			key: 'CHENGBENFENXIGUANLI',
			permissionKey: 'COSTANALYSISMANAGE_MENU_COSTANALYSISMANAGE',
			permissionName: '成本分析管理',
			group: 1,
		},
		{
			value: 2,
			name: '基础数据维护',
			message: 0,
			url: '/targetpriceandscore/datamaintenance/costMaintenance',
			activePath: 'datamaintenance',
			key: 'JICHUSHUJUWEIHU',
			permissionKey: 'COSTANALYSISMANAGE_MENU_DATAMAINTENANCE',
			permissionName: '基础数据维护',
			group: 2,
		},
	],
	costanalysismanageThirdMenu: [
		{
			name: '人工成本维护',
			message: 0,
			url: '/targetpriceandscore/datamaintenance/costMaintenance',
			activePath: 'costDatatenance',
			key: 'RENGONGCHENGBENWEIHU',
			permissionKey:
				'COSTANALYSISMANAGE_MENU_DATAMAINTENANCE_SUBMENU_COSTMAINTENANCE',
			permissionName: '人工成本维护',
			group: 2,
		},
		{
			name: '人工成本数据维护',
			message: 0,
			url: '/targetpriceandscore/datamaintenance/costDataMaintenance',
			activePath: 'costDataMaintenance',
			key: 'RGCBSJWH',
			permissionKey:
				'COSTANALYSISMANAGE_DATAMAINTENANCE_COSTDATAMAINTENANCE_TAB',
			permissionName: '人工成本数据维护',
			group: 2,
		},
	],

	configscoredeptNavListLeft: [
		{
			value: 1,
			name: '评分部门设置',
			message: 0,
			url: '/targetpriceandscore/configscoredept',
			activePath: 'configscoredept',
			key: 'PINGFENBUMENSHEZHI',
			permissionKey: 'MANAGEBACKEND_MENU_CONFIGSCOREDEPT',
			permissionName: '评分部门设置',
			group: 1,
		},
	],
	configscoredeptThirdMenu: [],
	pendingRequestNum: 0,
	mapControl: [],
	updateKey: '0',
	imgList: [],
}

const mutations = {
	SET_NAV_LIST(state, data) {
		state.navList = data
	},
	SET_SOURCEINQUIRYPOINT_NAV_LIST_LEFT(state, data) {
		state.sourceinquirypointNavListLeft = data
	},
	SET_SOURCEINQUIRYPOINT_THIRD_MENU(state, data) {
		state.sourceinquirypointThirdMenu = data
	},
	SET_PENDINGREQUESTNUM(state, data) {
		state.pendingRequestNum = data
	},
	SET_MAPCONTROL(state, mapControl) {
		state.mapControl = mapControl
	},
	SET_UPDATE(state) {
		state.updateKey = +new Date()
	},
	// img 数据加载
	PUSH_IMGLIST(state, data) {
		state.imgList.push(data)
	},
	// img 数据加载完毕
	REMOVE_IMGLIST(state, data) {
		let i = state.imgList.indexOf(data)
		state.imgList.splice(i, 1)
	},
}

let source = null
let num = 0
const actions = {
	updateNavList({ commit, state }) {
		if (source) source.cancel()
		source = axios.CancelToken.source()

		return new Promise((resolve, reject) => {
			getAgentTasksNum({ cancelToken: source.token })
				.then((res) => {
					if (res.code == 200) {
						const sourceinquirypointNavListLeft = cloneDeep(
							state.sourceinquirypointNavListLeft
						)
						const sourceinquirypointThirdMenu = cloneDeep(
							state.sourceinquirypointThirdMenu
						)

						Object.keys(res.data).forEach((key) => {
							//   for (let i = 0, item; (item = navList[i++]);) {
							switch (key) {
								case 'partAgentNum': // 零件签收待办
									sourceinquirypointThirdMenu[3].message = res.data[key] || 0
									break
								case 'purchaseProjectAgentNum': // 采购项目待办
									sourceinquirypointNavListLeft[2].message = res.data[key] || 0
									break
								case 'rfqAgentNum': // RFQ待办
									sourceinquirypointThirdMenu[9].message = res.data[key] || 0
									break
								case 'normiAgentNun': // 定点管理待办
									sourceinquirypointThirdMenu[11].message = res.data[key] || 0
									break
								default:
									break
							}
							//   }
						})

						// commit("SET_NAV_LIST", navList)
						commit(
							'SET_SOURCEINQUIRYPOINT_NAV_LIST_LEFT',
							sourceinquirypointNavListLeft
						)
						commit(
							'SET_SOURCEINQUIRYPOINT_THIRD_MENU',
							sourceinquirypointThirdMenu
						)
						resolve(res)
					} else {
						reject(res)
					}
				})
				.catch((err) => reject(err))
		})
	},
	updatePendingRequestNum({ commit }, requestNum = 0) {
		commit('SET_PENDINGREQUESTNUM', requestNum)
	},
	updatePdfPage({ commit }) {
		commit('SET_UPDATE')
	},
	updateMapControl({ commit }, mapControl) {
		commit('SET_MAPCONTROL', mapControl)
	},
	pushImgList({ commit }, img) {
		const key = 'img' + num
		num++
		commit('PUSH_IMGLIST', key)
		return new Promise((r, j) => {
			const timeOut = setTimeout(() => {
				console.log('timeOut')
				commit('REMOVE_IMGLIST', key)
				img.style.height = '300px'
				r(img)
			}, 30000)
			img.onload = () => {
				commit('REMOVE_IMGLIST', key)
				clearTimeout(timeOut)
				r(img)
			}
			img.onerror = () => {
				commit('REMOVE_IMGLIST', key)
				img.style.height = '300px'
				clearTimeout(timeOut)
				j(img)
			}
			img.onabort = () => {
				commit('REMOVE_IMGLIST', key)
				img.style.height = '300px'
				clearTimeout(timeOut)
				j(img)
			}
		})
	},
}

const getters = {
	navList: (state) => state.navList,
	pendingRequestNum: (state) => state.pendingRequestNum,
	updateKey: (state) => state.updateKey,
	mapControl: (state) => state.mapControl,
	imgList: (state) => state.imgList,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
