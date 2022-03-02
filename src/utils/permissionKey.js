const permissionKeyMap = {
	'/order/#/overview': 'PRICEORDER_FINDKEY',
	'/sourcing/#/tooling': 'TOOLSMANAGE_FINDKEY',
	'/portal/#/supplier/supplierlist': 'GP_SUPPLIER',
	'/supplier/frmrating/supplieroverview': 'PORTAL_SUPPLIER_NAV_GAILAN',
	'/order/#/purchase': 'PURCHASE',
	'/sourcing/#/purchasesupplier': 'PURCHASESUPPLIER',
	'/portal/contract/#/contract/terms': 'ADMIN_CONTRACT_TERMS',
	'/sourcing/#/aeko/quondampart/ledger': 'QUONDAMPARTLEDGER',
	'/sourcing/#/aeko/quondampart/aeko': 'QUONDAMPARTAEKO',
	'/scheassistant': 'PROJECTMGT',
	'/sourcing': 'SCHEDULINGASSISTANT',
	'/position/list': 'ADMIN_PRO_CS_POSITION_VIEW',
	'/position': 'ADMIN_PRO_CS_POSITION',
	'/position/sub': 'ADMIN_PRO_CS_POSITION_SUB',
	'/portal/#/index': 'RISE',
	'/portal/index': 'RISE_GP',
	'/portal/#/meeting/hall': 'CF_MEETING',
	'/portal/#/news/news': 'CF_NEWS',
	'/portal/#/applications': 'CF/APPLICATIONS',
	'/portal/#/task/center': 'CF_TASK',
	'/portal/#/reportform/web/reportcards': 'CF_REPORT',
	'/portal/#/cf-procs': 'CF_PRO_CS',
	'/portal/#/electronicsignature/productionpurchase/0': 'CF_E_SIGN',
	'/portal/#/bpm/approval/center': 'CF_APPROVAL',
	'/portal/#/meeting/type': 'ADMIN_MEETING_TYPE',
	'/portal/#/meeting/home?menutype=admin': 'ADMIN_MEETING_HOME',
	'/portal/#/procs': 'ADMIN_PRO_CS',
	'/portal/#/terms/management': 'ADMIN_TERMS',
	'/portal/#/processapproval': 'ADMIN_APPROVAL',
	'/portal/#/main-data/product-family': 'ADMIN_MAIN_DATA_PRODUCT_FAMILY',
	'/portal/#/infomgmt': 'ADMIN_MESSAGE',
	'/portal/#/params/tree': 'ADMIN_PARAMS',
	'/sourcing/#/sourcing/categorymanagementassistant/internaldemandanalysis':
		'CATEGORY_ASSISTANT',
	'/sourcing/#/supplier/kpiindex': 'SUPPLIER_MERITS',
	'/portal/#/cf-org/chart': 'CF_PRO_CS_ORG_CHART',
	'/org/list': 'CF_PRO_CS_ORG',
	'/cf-position': 'CF_PRO_CS_POSITION',
	'/role/index': 'CF_PRO_CS_ROLE',
	'/provider': 'CF_PRO_CS_PROVIDER',
	'/portal/#/knowledge/index': 'CF_PRO_CS_KNOWLEDGE',
	'/portal/#/cf-procs/index': 'CF_PRO_CS_PROCS',
	'/cf-position/list': 'CF_PRO_CS_POSITION_VIEW',
	'/cf-position/sub': 'CF_PRO_CS_POSITION_SUB',
	'/cf-position/transfer': 'CF_PRO_CS_POSITION_TRANSFER',
	'/cf-position/agent': 'CF_PRO_CS_POSITION_AGENT',
	'/provider/usermgm/list': 'ADMIN_PRO_CS_PROVIDER_USER',
	'/provider/sysmgm/list': 'ADMIN_PRO_CS_PROVIDER_SYSTEM',
	'/provider/authmgm/list': 'ADMIN_PRO_CS_PROVIDER_AUTH',
	'/portal/#/achievement/basedata/mymerit': 'ACHIEVEMENT',
	'/portal/achievement/basedata': 'ACHIEVEMENT_BASEDATA',
	'/portal/achievement/basedata/list': 'ACHIEVEMENT_BASEDATA_LIST',
	'/portal/achievement/basedata/outputmanagement':
		'ACHIEVEMENT_BASEDATA_OUTPUTMANAGE',
	'/portal/achievement/basedata/targetmanage':
		'ACHIEVEMENT_BASEDATA_TARGETMANAGE',
	'/sourcing/#/projectmgt': '/PROJECTMGT',
	'/projectmgt/projectscheassistant': '/PROJECTMGT/PROJECTSCHEASSISTANT',
	'/projectmgt/projectscheassistant/scheduleversion':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/SCHEDULEVERSION',
	'/sourcing/#/aeko': '/AEKO',
	'/aeko/managelist': '/AEKO/MANAGELIST',
	'/aeko/aekodetail': '/AEKO/AEKODETAIL',
	'/aeko/quotationdetail': '/AEKO/QUOTATIONDETAIL',
	'/projectmgt/projectprogressmonitoring':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING',
	'/projectmgt/projectprogressmonitoring/home':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/HOME',
	'/projectmgt/projectoverview': '/PROJECTMGT/PROJECTOVERVIEW',
	'/projectmgt/projectscheassistant/progroupscheduling':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/PROGROUPSCHEDULING',
	'/projectmgt/projectscheassistant/partscheduling':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/PARTSCHEDULING',
	'/projectmgt/projectscheassistant/progressconfirmsummary':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/PROGRESSCONFIRMSUMMARY',
	'/projectmgt/projectscheassistant/proconfirm':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/PROCONFIRM',
	'/aeko/stancelist': '/AEKO/STANCELIST',
	'/sourcing/#/projectmgt/projectscheassistant/historyprocessdb':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/HISTORYPROCESSDB',
	'/sourcing/#/purchase/investmentlist': 'SOURCING_PURCHASE_INVESTMENT',
	'/sourcing/#/purchasesupplier/investmentlist':
		'SOURCING_PURCHASE_INVESTMENT_SUPPLIER',
	'/sourcing/#/purchase/investmentlist/changetask':
		'PURCHASE_PURCHASESUPPLIER_CHANGETASK',
	'/order/#/purchaseorderhome': 'WORKBENCH_PURCHASE_HOME_WP_ORDER',
	'/order/#/priceretrospect': 'WORKBENCH_PRICEFALLBACK_BATCH',
	'/#/contractquery': 'WORKBENCH_CONTRACT_QUERY',
	'/order/#/pricingmanagement/priceordertobeconfirmed': 'WORKBENCH_PRICE_ORDER',
	'/sourcing/reportmgmt': '/SOURCING/REPORTMGMT',
	'/sourcing/reportmgmt/details': '/SOURCING/REPORTMGMT/DETAILS',
	'/sourcing/#/financialtargetprice/maintenance':
		'/FINANCIALTARGETPRICE/MAINTENANCE',
	'/sourcing/#/financialtargetprice/approval': '/FINANCIALTARGETPRICE/APPROVAL',
	'/sourcing/#/financialtargetprice/query': '/FINANCIALTARGETPRICE/QUERY',
	'/portal/contract/#/contract/contractquerysupplier':
		'WORKBENCH_CONTRACT_QUERY_SUPPLIER',
	'/portal/#/meeting/home?menutype=cf': 'CF_MEETING_HOME',
	'/sourcing/#/projectmgt/projectprogressreport':
		'/PROJECTMGT/PROJECTPROGRESSREPORT',
	'/sourcing/#/projectmgt/projectprogressmonitoring/partstask':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/PARTSTASK',
	'/projectmgt/projectprogressmonitoring/monitordetail':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/MONITORDETAIL',
	'/portal/#/errormgmt': 'ADMIN_INFO_MGMT_ERROR',
	'/portal/#/tipsmgmt': 'ADMIN_INFO_MGMT_TIPS',
	'/portal/#/infotemplate': 'ADMIN_INFO_MGMT_MSG',
	'/portal/#/infotemplate/template': 'ADMIN_INFO_MGMT_TEMPLATE',
	'/portal/#/infotemplate/publish/history': 'ADMIN_INFO_MGMT_HISTORY',
	'/portal/#/dialogmgmt': 'CF_ADMIN_INFO_MGMT_DIALOG',
	'/projectmgt/projectprogressmonitoring/partlist':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/PARTLIST',
	'/portal/#/news/management/modulemanagement/index':
		'ADMIN_NEWS_MANAGEMENT_MODULE',
	'/portal/achievement/basedata/mymerit': 'PB_COSTCONTROL_CHIEFOFUNIT_CN',
	'/purchase/fixedassetmanagement/checklist':
		'SOURCING_PURCHASE_FIXEDASSETS_ORDER',
	'/purchase/fixedassetmanagement/informationchange':
		'SOURCING_PURCHASE_FIXEDASSETS_INFO',
	'/order/#/pricingmanagement/aekomanagement/page':
		'WORKBENCH_PRICE_AEKO_APPLY',
	'/sourcing/#/projectmgt/projectprogressmonitoring/delaysummary':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/DELAYSUMMARY',
	'/sourcing/#/projectmgt/projectprogressmonitoring/delayconfirm':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/DELAYCONFIRM',
	'/aeko/approve': '/AEKO/APPROVE',
	'/aeko/approve/approvelist': '/AEKO/APPROVE/APPROVELIST',
	'/aeko/describe': '/AEKO/DESCRIBE',
	'/aeko/partslist': '/AEKO/PARTSLIST',
	'/scheassistant/defaultschelogic': 'DEFAULTSCHELOGIC',
	'/scheassistant/riskandalarmconfig': 'RISKANDALARMCONFIG',
	'/aeko/aekoapprovaldetails': '/AEKO/AEKOAPPROVALDETAILS',
	'/aeko/aekoapprovaldetails/explainattach':
		'/AEKO/AEKOAPPROVALDETAILS/EXPLAINATTACH',
	'/portal/#/biz/adminlog': 'ADMIN_LOG_MANAGEMENT',
	'/purchase/fixedassetmanagement/recorded':
		'SOURCING_PURCHASE_FIXEDASSETS_ENTRY',
	'/aeko/approve/approvelistcsf': '/AEKO/APPROVE/APPROVELISTCSF',
	'/aeko/approve/approvelistcsf/akeopendingpage':
		'/AEKO/APPROVE/APPROVELISTCSF/AKEOPENDINGPAGE',
	'/aeko/approve/approvelistcsf/akeoapprovedpage':
		'/AEKO/APPROVE/APPROVELISTCSF/AKEOAPPROVEDPAGE',
	'/aeko/aekoapprovaldetails/approvalform':
		'/AEKO/AEKOAPPROVALDETAILS/APPROVALFORM',
	'/portal/#/survey/answer': 'CF_NEWS_SURVEY',
	'/portal/#/news/content': 'ADMIN_NEWS_MANAGEMENT_CONTENT',
	'/portal/#/survey/management': 'ADMIN_NEWS_SURVEY',
	'/portal/#/news/notice/index': 'CF_NEWS_NOTICE',
	'/aeko/aekoapprovaldetails/recommendationtable':
		'/AEKO/AEKOAPPROVALDETAILS/RECOMMENDATIONTABLE',
	'/aeko/aekoapprovaldetails/cbdsummary':
		'/AEKO/AEKOAPPROVALDETAILS/CBDSUMMARY',
	'/aeko/approveorder': '/AEKO/APPROVEORDER',
	'/aeko/checklist': '/AEKO/CHECKLIST',
	'/aeko/quondampart': '/AEKO/QUONDAMPART',
	'/sourcing/#/projectmgt/projectprogressreport/partprogress':
		'/PROJECTMGT/PROJECTPROGRESSREPORT/PARTPROGRESS',
	'/modeltargetprice': '/MODELTARGETPRICE',
	'/modeltargetprice/maintenance': '/MODELTARGETPRICE/MAINTENANCE',
	'/modeltargetprice/approval': '/MODELTARGETPRICE/APPROVAL',
	'/modeltargetprice/query': '/MODELTARGETPRICE/QUERY',
	'/modeltargetprice/signin': '/MODELTARGETPRICE/SIGNIN',
	'/aeko/bipage': '/AEKO/BIPAGE',
	'/aeko/report': '/AEKO/REPORT',
	'/aeko/report/item': '/AEKO/REPORT/ITEM',
	'/bkm/login.do': 'WORKBENCH_BKM',
	'/portal/#/bpm/report': 'ADMIN_APPROVAL_MANAGEMENT_REPORT',
	'/aeko/assign': '/AEKO/ASSIGN',
	'/sourcing/createparts/home': '/SOURCING/CREATEPARTS/HOME',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/overview':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/OVERVIEW',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/bulksupplierpandect':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/BULKSUPPLIERPANDECT',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/carprice':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/CARPRICE',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/purchaseamountoverall':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/PURCHASEAMOUNTOVERALL',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/output':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/OUTPUT',
	'/sourcing/categorymanagementassistant/externalsupplymarketanalysis/overview':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/EXTERNALSUPPLYMARKETANALYSIS/OVERVIEW',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/batchsupplier':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/BATCHSUPPLIER',
	'/sourcing/categorymanagementassistant/materialgrouppositioning/overview':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/MATERIALGROUPPOSITIONING/OVERVIEW',
	'/gpurchase/#/overview/': 'GP_REPORT',
	'/portal/#/supplier/frmrating/depthrating': 'GP_FINANCE',
	'/order/#/contract/terms': 'ADMIN_CONTRACT',
	'/portal/contract/#/contract/contracttemplate': 'ADMIN_CONTRACT_TEMPLATE',
	'/sourcing/#/sourcing/partsrfq/externalnegotiationassistant':
		'WORKBENCH_NEGOCIATE',
	'/portal/#/mtz/': 'WORKBENCH_MTZ',
	'/order/#/purchaseokm': 'WORKBENCH_0KM-CS',
	'/order/#/logisticsokm': 'WORKBENCH_0KM-PL',
	'/portal/#/supplier/frmrating/supplieroverview': 'WORKBENCH_FINANCE',
	'/sourceinquirypoint/sourcing/partsprocure':
		'SOURCEINQUIRYPOINT_MENU_PARTSPROCURE',
	'/sourceinquirypoint/sourcing/filemanage':
		'/SOURCEINQUIRYPOINT/SOURCING/FILEMANAGE',
	'/sourceinquirypoint/sourcing/signforpartsdemand':
		'/SOURCEINQUIRYPOINT/SOURCING/SIGNFORPARTSDEMAND',
	'/sourceinquirypoint/sourcing/integratedmanage':
		'/SOURCEINQUIRYPOINT/SOURCING/INTEGRATEDMANAGE',
	'/sourceinquirypoint/sourcing/partsrfq':
		'SOURCEINQUIRYPOINT_MENU_RFQMANAGE_SUBMENU_RFQ',
	'/projectmgt/projectprogressmonitoring/delaysummary':
		'/PROJECTMGT/PROJECTPROGRESSMONITORING/DELAYSUMMARY',
	'/aeko/report/overdue': '/AEKO/REPORT/OVERDUE',
	'/sourceinquirypoint/sourcing/partsrfq/editordetail':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSRFQ/EDITORDETAIL',
	'/sourceinquirypoint/sourcing/partsletter':
		'SOURCEINQUIRYPOINT_MENU_PARTSLETTER_SUBMENU_PARTSLETTER',
	'/supplierscore/home': '/SUPPLIERSCORE/HOME',
	'/sourceinquirypoint/sourcing/partsletter/letterdetail':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSLETTER/LETTERDETAIL',
	'/sourceinquirypoint/sourcing/biddingprojectlist':
		'/SOURCEINQUIRYPOINT/SOURCING/BIDDINGPROJECTLIST',
	'/sourceinquirypoint/sourcing/steeldemandcreation':
		'/SOURCEINQUIRYPOINT/SOURCING/STEELDEMANDCREATION',
	'/financialtargetprice/maintenance': '/FINANCIALTARGETPRICE/MAINTENANCE',
	'/financialtargetprice/approval': '/FINANCIALTARGETPRICE/APPROVAL',
	'/financialtargetprice/query': '/FINANCIALTARGETPRICE/QUERY',
	'/sourceinquirypoint/sourcing/partsletter/loidetail':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSLETTER/LOIDETAIL',
	'/sourceinquirypoint/sourcing/partsrfq/editorinfo':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSRFQ/EDITORINFO',
	'/sourceinquirypoint/sourcing/importfiles':
		'/SOURCEINQUIRYPOINT/SOURCING/IMPORTFILES',
	'/sourceinquirypoint/sourcing/partsprocure/editordetail':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSPROCURE/EDITORDETAIL',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/costanalysismain':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/COSTANALYSISMAIN',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/technology':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/TECHNOLOGY',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/historypoint':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/HISTORYPOINT',
	'/tooling': '/TOOLING',
	'/tooling/bmapplyindex': '/TOOLING/BMAPPLYINDEX',
	'/sourceinquirypoint/sourcing/partsign/editordetail':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSIGN/EDITORDETAIL',
	'/sourceinquirypoint/sourcing/partsprocure/batchmiantain':
		'/SOURCEINQUIRYPOINT/SOURCING/PARTSPROCURE/BATCHMIANTAIN',
	'/tooling/budgetmanagement/cartypeoverview': 'TOOLING_INVEST_YUSUANGUANLI',
	'/aeko/report/statetrack': '/AEKO/REPORT/STATETRACK',
	'/costanalysismanage': '/COSTANALYSISMANAGE',
	'/costanalysismanage/home': '/COSTANALYSISMANAGE/HOME',
	'/costanalysismanage/datamaintenance/costmaintenance':
		'/COSTANALYSISMANAGE/DATAMAINTENANCE/COSTMAINTENANCE',
	'/sourcing/#/targetpriceandscore/datamaintenance/costdatamaintenance':
		'COSTANALYSISMANAGE_DATAMAINTENANCE_COSTDATAMAINTENANCE_TAB',
	'/costanalysismanage/datamaintenance/costdatamaintenance':
		'/COSTANALYSISMANAGE/DATAMAINTENANCE/COSTDATAMAINTENANCE',
	'/costanalysismanage/rfqdetail': '/COSTANALYSISMANAGE/RFQDETAIL',
	'/costanalysismanage/costanalysis': '/COSTANALYSISMANAGE/COSTANALYSIS',
	'/sourcing/categorymanagementassistant/internaldemandanalysis/sop':
		'/SOURCING/CATEGORYMANAGEMENTASSISTANT/INTERNALDEMANDANALYSIS/SOP',
	'/supplierscore/rfqdetail': '/SUPPLIERSCORE/RFQDETAIL',
	'/targetpriceandscore/costanalysismanage/datamaintenance/costmaintenance':
		'/TARGETPRICEANDSCORE/COSTANALYSISMANAGE/DATAMAINTENANCE/COSTMAINTENANCE',
	'/projectmgt/projectscheassistant/historyprocessdb':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/HISTORYPROCESSDB',
	'/projectmgt/projectscheassistant/defaultschelogic':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/DEFAULTSCHELOGIC',
	'/projectmgt/projectscheassistant/riskandalarmconfig':
		'/PROJECTMGT/PROJECTSCHEASSISTANT/RISKANDALARMCONFIG',
	'/projectmgt/projectprogressreport': '/PROJECTMGT/PROJECTPROGRESSREPORT',
	'/projectmgt/projectprogressreport/partprogress':
		'/PROJECTMGT/PROJECTPROGRESSREPORT/PARTPROGRESS',
	'/targetpriceandscore/costanalysismanage/datamaintenance/costdatamaintenance':
		'/TARGETPRICEANDSCORE/COSTANALYSISMANAGE/DATAMAINTENANCE/COSTDATAMAINTENANCE',
	'/aeko/mtz': '/AEKO/MTZ',
	'/aeko/mtz/list': '/AEKO/MTZ/LIST',
	'/aeko/mtz/details': '/AEKO/MTZ/DETAILS',
	'/aeko/akeopagecontent': '/AEKO/AKEOPAGECONTENT',
	'/aeko/akeopagecontent/approvelistcsf':
		'/AEKO/AKEOPAGECONTENT/APPROVELISTCSF',
	'/aeko/akeopagecontent/approvelistcsf/akeoapprovedpage':
		'/AEKO/AKEOPAGECONTENT/APPROVELISTCSF/AKEOAPPROVEDPAGE',
	'/sourcing/partsrfq/externalnegotiationassistant':
		'WORKBENCH_RFQ_TANPANZHUSHOU',
	'/aeko/partslist2': '/AEKO/PARTSLIST2',
	'/portal/#/mtz/annualgeneralbudget/locationchange/mtzlocationpoint':
		'WORKBENCH_MTZ_SOURCING',
	'/sourceinquirypoint/sourcing/supplier/quotationdetail':
		'/SOURCEINQUIRYPOINT/SOURCING/SUPPLIER/QUOTATIONDETAIL',
	'/partsfp/automaticallyassignde': '/PARTSFP/AUTOMATICALLYASSIGNDE',
	'/portal/#/offline-download': 'CF_DOWNLOAD',
	'/tooling/baapplyindex': '/TOOLING/BAAPPLYINDEX',
	'/tooling/budgetmanagement/generateinvestmentlist':
		'/TOOLING/BUDGETMANAGEMENT/GENERATEINVESTMENTLIST',
	'/tooling/investmentadmin/payblock': '/TOOLING/INVESTMENTADMIN/PAYBLOCK',
	'/tooling/budgetapproval': '/TOOLING/BUDGETAPPROVAL',
	'/tooling/investmentadmin/monthlyplan':
		'/TOOLING/INVESTMENTADMIN/MONTHLYPLAN',
	'/portal/#/assistant/problemman': 'ADMIN_PROCS_PROB',
	'/portal/#/assistant/helpcenterman': 'ADMIN_PROCS_USER_ASSIS',
	'/tooling/budgetmanagement/investmentlistjv':
		'/TOOLING/BUDGETMANAGEMENT/INVESTMENTLISTJV',
	'/sourcing/categorymanagementassistant/internaldemandanalysis':
		'CATEGORY_ASSISTANT_NEIBUXUQIUFENXI',
	'/provider/opcs/list': 'ADMIN_PRO_CS_PROVIDER_OPCS',
	'/tooling/budgetmanagement/investmentlistcommon':
		'/TOOLING/BUDGETMANAGEMENT/INVESTMENTLISTCOMMON',
	'/tooling/database': '/TOOLING/DATABASE',
	'/tooling/baapprovalindex': '/TOOLING/BAAPPROVALINDEX',
	'/portal/#/supplier/frmrating/preliminaryrating/qualitativescoringpage':
		'WORKBENCH_MTZ_SOURCING_CHUBUPINGJI',
	'/portal/#/authoritymgmt': 'ADMIN/STAFF_MANAGEMENT',
	'/portal/#/authoritymgmt/index': 'ADMIN/STAFF_MANAGEMENT/USER',
	'/portal/#/authoritymgmt/applications': 'ADMIN/STAFF_MANAGEMENT/APPLICATIONS',
	'/sourcing/#/sourceinquirypoint': 'SOURCEINQUIRYPOINT',
	'/sourcing/dashboard': 'SOURCEINQUIRYPOINT_MENU_DASHBOARD',
	'/sourcing/dashboard/index':
		'SOURCEINQUIRYPOINT_MENU_DASHBOARD_SUBMENU_DASHBOARD',
	'/sourcing/dashboard/report':
		'SOURCEINQUIRYPOINT_MENU_DASHBOARD_SUBMENU_REPORT',
	'/sourcing/dashboard/details':
		'SOURCEINQUIRYPOINT_MENU_DASHBOARD_SUBMENU_DETAILS',
	'/sourceinquirypoint/sourcing/partsign':
		'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_PARTSIGN',
	'/sourceinquirypoint/sourcing/partsign/signforpartsdemand':
		'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_SIGNFORPARTSDEMAND',
	'/sourceinquirypoint/sourcing/partsign/integratedmanage':
		'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_INTEGRATEDMANAGE',
	'/sourceinquirypoint/sourcing/partsign/importfiles':
		'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_IMPORTFILES',
	'/sourceinquirypoint/sourcing/partsign/filemanage':
		'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_FILEMANAGE',
	'/sourceinquirypoint/sourcing/partsign/steeldemandcreation':
		'SOURCEINQUIRYPOINT_MENU_PARTSIGN_SUBMENU_STEELDEMANDCREATION',
	'/sourceinquirypoint/sourcing/partsrfq/biddingprojectlist':
		'SOURCEINQUIRYPOINT_MENU_RFQMANAGE_SUBMENU_BIDDINGPROJECTLIST',
	'/sourcing/partsnomination':
		'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_PARTSNOMINATION',
	'/sourcing/partsnomination/rsreview':
		'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RSREVIEW',
	'/sourcing/partsnomination/signsheetbox':
		'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_SIGNSHEETBOX',
	'/sourcing/partsnomination/record':
		'SOURCEINQUIRYPOINT_MENU_PARTSNOMINATION_SUBMENU_RECORD',
	'/sourceinquirypoint/sourcing/partsletter/loi':
		'SOURCEINQUIRYPOINT_MENU_PARTSLETTER_SUBMENU_LOI',
	'/sourcing/#/targetpriceandscore/financialtargetprice/maintenance':
		'FINANCIALMANAGE',
	'/targetpriceandscore/financialtargetprice/maintenance':
		'FINANCIALMANAGE_MENU_PARTTARGETPRICE_SUBMENU_MAINTENANCE',
	'/targetpriceandscore/financialtargetprice/approval':
		'FINANCIALMANAGE_MENU_PARTTARGETPRICE_SUBMENU_APPROVAL',
	'/targetpriceandscore/financialtargetprice/query':
		'FINANCIALMANAGE_MENU_PARTTARGETPRICE_SUBMENU_QUERY',
	'/targetpriceandscore/modeltargetprice/signin':
		'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_SIGNIN',
	'/targetpriceandscore/modeltargetprice/maintenance':
		'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_MAINTENANCE',
	'/targetpriceandscore/modeltargetprice/approval':
		'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_APPROVAL',
	'/targetpriceandscore/modeltargetprice/query':
		'FINANCIALMANAGE_MENU_MODELTARGETPRICE_SUBMENU_QUERY',
	'/sourcing/#/targetpriceandscore/supplierscore/home': 'CSCSCOREMANAGE',
	'/targetpriceandscore/supplierscore/home':
		'CSCSCOREMANAGE_MENU_SUPPLIERSCORE',
	'/sourcing/#/targetpriceandscore/costanalysismanage/home':
		'COSTANALYSISMANAGE',
	'/targetpriceandscore/costanalysismanage/home':
		'COSTANALYSISMANAGE_MENU_COSTANALYSISMANAGE',
	'/targetpriceandscore/datamaintenance/costdatamaintenance':
		'COSTANALYSISMANAGE_MENU_DATAMAINTENANCE_SUBMENU_COSTMAINTENANCE',
	'/targetpriceandscore/configscoredept': 'MANAGEBACKEND_MENU_CONFIGSCOREDEPT',
	'/tooling/investmentreport': 'TOOLING_INVEST_TOUZIBAOGAO',
	'/tooling/investmentadmin': 'TOOLING_INVEST_FUKUANJIHUACHAKAN',
	'/purchase/investmentlist/suretask': 'PURCHASE_PURCHASE_SURETASK',
	'/purchase/mouldpurchasing': 'SOURCING_PURCHASE_PURCHASE',
	'/purchase/modelorderlist': 'SOURCING_PURCHASE_PURCHASEORDER',
	'/purchase/fixedassetmanagement/retirementapplication':
		'SOURCING_PURCHASE_FIXEDASSETS_SCRAP',
	'/overview': 'WORKBENCH_PRICE_OVERVIEW',
	'/priceorder': 'WORKBENCH_PRICE_PURCHASE_PURCHASE',
	'/purchaseorderhome': 'WORKBENCH_PRICE_PRICEORDER_TOOL',
	'/contractquery': 'WORKBENCH_CONTRACT_QUERY_BUYER',
	'/pricingmanagement': 'WORKBENCH_PRICE_ORDER_TEMPORARY',
	'/supplier/kpilist': 'WORKBENCH_KPI',
	'/supplier/ntier': 'WORKBENCH_N_LEVEL_SUPPLIER',
	'/supplier/frmrating/frmintegratedmanagement':
		'PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI',
	'/supplier/frmrating/newsupplierrating':
		'PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI',
	'/supplier/frmrating/depthrating': 'PORTAL_SUPPLIER_NAV_SHENRUPINGJI',
	'/supplier/frmrating/risksignal': 'PORTAL_SUPPLIER_NAV_FENGXIANXINHAO',
	'/mtz/annualgeneralbudget/annualbudget': 'PORTAL_MTZ_NAV_NAINDUYUSUAN',
	'/mtz/annualgeneralbudget/reportsshow': 'PORTAL_MTZ_NAV_BAOBIAOZHANSHI',
	'/mtz/annualgeneralbudget/replenishmentmanagement':
		'PORTAL_MTZ_NAV_BUCHAGUANLI',
	'/mtz/database': 'PORTAL_MTZ_SHUJUKU',
	'/purchaseokm/pendingtask': 'DAICHULIRENWU',
	'/logisticsokm/claimlist': 'LGLSPQD',
	'/logisticsokm/comprehensivequery': 'ZHONGHECHAXUN',
	'/logisticsokm/partscrap': 'QUERENLINGJIANBAOFEI',
	'/logisticsokm/factoryinformationconfiguration': 'GONGCHANGXINXIPEIZHI',
	'/portal/#/backstagemanagement/configscoredept': 'CONFIGSCOREDEPT_TAB',
	'/portal/#/backstagemanagement/qualityscorerules': 'QUALITYSCORERULES_TAB',
	'/portal/#/news/label': 'ADMIN_NEWS_MANAGEMENT_LABEL',
	'/portal/#/news/topic': 'ADMIN_NEWS_MANAGEMENT_TOPIC',
	'/portal/#/news/kvmanagement': 'ADMIN_NEWS_MANAGEMENT_KV',
	'/portal/#/assistant/problemman?module=problemhandler':
		'ADMIN_PROCS_PROB_problemHandler',
	'/portal/#/assistant/problemman?module=problemstatement':
		'ADMIN_PROCS_PROB_problemStatement',
	'/portal/#/assistant/problemman?module=modulemanagement':
		'ADMIN_PROCS_PROB_moduleManagement',
	'/portal/#/assistant/problemman?module=labelmanagement':
		'ADMIN_PROCS_PROB_labelManagement',
	'/portal/#/assistant/problemman?module=keywordsmanagement':
		'ADMIN_PROCS_PROB_keyWordsManagement',
	'/portal/#/assistant/helpcenterman?module=manual':
		'ADMIN_PROCS_USER_ASSIS_manual',
	'/portal/#/assistant/helpcenterman?module=question':
		'ADMIN_PROCS_USER_ASSIS_question',
	'/portal/#/bpm/template': 'ADMIN_APPROVAL_MANAGEMENT_TEMPLATE',
	'/portal/#/bpm/monitoring': 'ADMIN_APPROVAL_MANAGEMENT_MONITOR',
	'/portal/#/approval/agent': 'ADMIN_APPROVAL_MANAGEMENT_AGENT',
	'/portal/#/main-data/car-project': 'ADMIN_MAIN_DATA_CARPROJECT',
	'/portal/#/main-data/car': 'ADMIN_MAIN_DATA_CARMODEL',
	'/portal/#/materieldata/parts-message': 'ADMIN_MATERIEL_DATA_PARTS_MESSAGE',
	'/portal/#/materieldata/material-group': 'ADMIN_MATERIEL_DATA_MATERIAL_GROUP',
	'/portal/#/materieldata/product-message':
		'ADMIN_MATERIEL_DATA_PRODUCT_MESSAGE',
	'/portal/#/materieldata/mould': 'ADMIN_MATERIEL_DATA_MOULD',
	'/portal/#/materieldata/heavy-item': 'ADMIN_MATERIEL_DATA_HEAVY_ITEM',
	'/portal/#/materieldata/raw-message': 'ADMIN_MATERIEL_DATA_RAW_MESSAGE',
	'/portal/#/materieldata/mtz-raw-materiel':
		'ADMIN_MATERIEL_DATA_MTZ_RAW_MATERIEL',
	'/portal/#/materieldata/mtz-materiel-group':
		'ADMIN_MATERIEL_DATA_MTZ_MATERIEL_GROUP',
	'/portal/#/maindatasupplier/list': 'ADMIN_MAIN_DATA_SUPPLIER_DATA_LIST',
	'/portal/#/maindatasupplier/user': 'ADMIN_MAIN_DATA_SUPPLIER_DATA_USER',
	'/portal/#/maindatasupplier/n-tier': 'ADMIN_MAIN_DATA_SUPPLIER_DATA_N_TIER',
	'/portal/#/exchange-parities': 'ADMIN_MAIN_DATA_EXCHANGE_PARTIES',
	'/portal/#/dialogmgmt/popup-window-management': 'ADMIN_INFO_MGMT_DIALOG',
	'/portal/#/reportform/admin/typemaintain': 'ADMIN_REPORT',
	'/supplier/frmrating/publicopinion': 'PORTAL_SUPPLIER_NAV_YUQINGJIANCE',
	'/mtz/annualgeneralbudget/reportsshow/mtzannualbudget':
		'MTZ_REPORT_ANNUAL_BUDGET',
	'/mtz/annualgeneralbudget/reportsshow/monthlytracking':
		'MTZ_REPORT_MONTHLY_TRACKING',
	'/mtz/annualgeneralbudget/replenishmentmanagement/mtzreplenishmentoverview':
		'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
	'/mtz/annualgeneralbudget/replenishmentmanagement/supplementarylist':
		'MTZ_REPORT_BUCHAGUANLI_BUCHADANLIEBIAO',
	'/mtz/annualgeneralbudget/replenishmentmanagement/vwptuploadquantity':
		'MTZ_REPORT_BUCHAGUANLI_VWPTSHANGZAISHULIANG',
	'/supplier/spiindex/spiall': 'SUPPLIER_WORKBENCH_JIXIAO_ZONGLAN',
	'/supplier/spiindex/supplierpowerbi':
		'SUPPLIER_WORKBENCH_JIXIAO_GONGYINGSHANGJIXIAO',
	'/supplier/spiindex/supplierpoint':
		'SUPPLIER_WORKBENCH_JIXIAO_NIANDUZHONGDIANZHUIZONG',
	'/supplier/spiindex/supplierlist':
		'SUPPLIER_WORKBENCH_JIXIAO_BANNIANBAOHUIGU',
	'/supplier/kpirouter/kpilist': 'SUPPLIER_WORKBENCH_KPI_ZONGLAN',
	'/supplier/kpirouter/supplierkpitreetable':
		'SUPPLIER_WORKBENCH_KPI_XIANGQING',
	'/supplier/ntier/ntiermap': 'SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANDITU',
	'/supplier/ntier/supplychainrisk':
		'SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANFENGXIAN',
	'/supplier/ntier/supplychainanalysis':
		'SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANFENXI',
	'/supplier/ntier/supplymaintain/ntierbkl':
		'SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANWEIHU',
	'/supplier/frmrating/preliminaryrating/qualitativescoringpage':
		'PORTAL_SUPPLIER_NAV_CUBUPJNGJI_DINGXINGDAFEN',
	'/supplier/frmrating/preliminaryrating/preliminaryrating':
		'PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CHUBUPINGJI',
	'/mtz/annualgeneralbudget/reportsshow/mtzannualbudget/materialgroup':
		'MTZ_REPORT_ANNUAL_BUDGET_MATERIAL_GROUP',
	'/mtz/annualgeneralbudget/reportsshow/mtzannualbudget/classmaterial':
		'MTZ_REPORT_ANNUAL_BUDGET_MEDIUM_CLASS_OF_MATERIALS',
	'/mtz/annualgeneralbudget/reportsshow/mtzannualbudget/department':
		'MTZ_REPORT_ANNUAL_BUDGET_DEPARTMENT',
	'/mtz/annualgeneralbudget/reportsshow/mtzannualbudget/brand':
		'MTZ_REPORT_ANNUAL_BUDGET_BRAND',
	'/mtz/annualgeneralbudget/reportsshow/mtzannualbudget/model':
		'MTZ_REPORT_ANNUAL_BUDGET_CAR_MODEL',
	'/mtz/annualgeneralbudget/reportsshow/monthlytracking/monthlybudgettracking':
		'MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_BUDGET_TRACKING',
	'/mtz/annualgeneralbudget/reportsshow/monthlytracking/causeanalysisdifference':
		'MTZ_REPORT_MONTHLY_TRACKING_ANALYSIS_CAUSES_DIFFERENCES',
	'/mtz/annualgeneralbudget/reportsshow/monthlytracking/monthlytrackingpayment':
		'MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_PAYMENT_AMOUNT_TRACKING',
	'/mtz/annualgeneralbudget/reportsshow/monthlytracking/modelmonthlybudgettracking':
		'MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_MODEL_BUDGET_TRACKING',
	'/mtz/database/partsquery': 'PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN',
	'/mtz/database/rulesquery': 'PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN',
	'/mtz/database/sourcemarketprice': 'PORTAL_MTZ_SEARCH_MTZSHICHANGJIALAIYUAN',
	'/mtz/database/marketpriceenquiry': 'PORTAL_MTZ_SEARCH_MTZSHICHANGJIACHAXUN',
	'/mtz/database/preciousmetalmarketpriceinquiry':
		'PORTAL_MTZ_SEARCH_GUIJINSHUSHICHANGJIACHAXUN',
	'/mtz/annualbudgetedit': 'PORTAL_MTZ_NIANDUYUSUAN_MTZNIANDUYUSUANBIANJI',
	'/meeting/type': 'CF_MEETING_TONGYONGHUIYI',
	'/mtz/annualbudgetedit/buyeroverview':
		'PORTAL_MTZ_NIANDUYUSUAN_CAIGOUYUANYUSUANZONGLAN',
	'/mtz/annualbudgetedit/officeoverview':
		'PORTAL_MTZ_NIANDUYUSUAN_KESHIYUSUANZONGLAN',
	'/mtz/annualbudgetedit/brandoverview':
		'PORTAL_MTZ_NIANDUYUSUAN_PINPAIYUSUANZONGLAN',
	'/mtz/annualbudgetedit/otheroverview': 'PORTAL_MTZ_NIANDUYUSUAN_BIANJIQITA',
	'/meeting/speciallive': 'CF_MEETING_SCCGCSC_HUIYIZHIBO',
	'/meeting/special-near-meeting': 'CF_MEETING_SCCGCSC_JINQIHUIYI',
	'/news/news': 'CF_NEWS_NEWS',
	'/news/notice': 'CF_NEWS_GONGGAO',
	'/survey/answer': 'CF_NEWS_DIAOCHAWENJUAN',
	'/sourcing/categorymanagementassistant/externalsupplymarketanalysis':
		'CATEGORY_ASSISTANT_WBGYSCFX',
	'/sourcing/categorymanagementassistant/materialgrouppositioning':
		'CATEGORY_ASSISTANT_CAILIAOZUDINGWEI',
	'/sourcing/categorymanagementassistant/listofinitiatives':
		'CATEGORY_ASSISTANT_JUCUOQINGDAN',
	'/portal/#/approval/agent?type=normal':
		'ADMIN_APPROVAL_MANAGEMENT_AGENT_NORMAL',
	'/portal/#/approval/agent?type=meeting':
		'ADMIN_APPROVAL_MANAGEMENT_AGENT_MEETING',
	'/electronicsignature/productionpurchase/0':
		'ELECTRONIC_SIGNATURE_PRODUCTION_PURCHASE',
	'/electronicsignature/productionpurchase/1':
		'ELECTRONIC_SIGNATURE_GENERAL_PURCHASE',
	'/portal/#/adminprocs': 'ADMIN_PROCS_MANAGEMENT',
	'/portal/#/adminprocs/process/mainprocess': 'ADMIN_PROCS_MAIN_PROCESS',
	'/portal/#/adminprocs/adminknowledge/index': 'ADMIN_PROCS_KNOWLEDGE',
	'/portal/#/adminprocs/glossary/index': 'ADMIN_PROCS_GLOSSARY',
	'/portal/#/cf-procs/processmanage': 'CF_PROCS_PROCESS',
	'/portal/#/cf-procs/knowledgemanage': 'CF_PROCS_KNOWLEDGE',
	'/portal/#/cf-procs/glossarymanage': 'CF_PROCS_GLOSSARY',
	'/portal/#/assistant/man': 'ADMIN_USER_ASSIS',
}

let Base64 = {
	_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	encode: function (e) {
		let t = ''
		let n, r, i, s, o, u, a
		let f = 0
		e = Base64._utf8_encode(e)
		while (f < e.length) {
			n = e.charCodeAt(f++)
			r = e.charCodeAt(f++)
			i = e.charCodeAt(f++)
			s = n >> 2
			o = ((n & 3) << 4) | (r >> 4)
			u = ((r & 15) << 2) | (i >> 6)
			a = i & 63
			if (isNaN(r)) {
				u = a = 64
			} else if (isNaN(i)) {
				a = 64
			}
			t =
				t +
				this._keyStr.charAt(s) +
				this._keyStr.charAt(o) +
				this._keyStr.charAt(u) +
				this._keyStr.charAt(a)
		}
		return t
	},
	_utf8_encode: function (e) {
		e = e.replace(/rn/g, 'n')
		let t = ''
		for (let n = 0; n < e.length; n++) {
			let r = e.charCodeAt(n)
			if (r < 128) {
				t += String.fromCharCode(r)
			} else if (r > 127 && r < 2048) {
				t += String.fromCharCode((r >> 6) | 192)
				t += String.fromCharCode((r & 63) | 128)
			} else {
				t += String.fromCharCode((r >> 12) | 224)
				t += String.fromCharCode(((r >> 6) & 63) | 128)
				t += String.fromCharCode((r & 63) | 128)
			}
		}
		return t
	},
	resEncode: function (str) {
		let n = new Date().getTime() + ''
		let n1 = n.substr(0, 3)
		let n2 = n.substr(3) + 'a'

		return Base64.encode(n2 + str + n1)
	},
}

export default function getPermissionKey() {
	const { href, origin } = window.location
	const hashUrl = href.replace(origin, '')
	const url = href.replace(window.location.pathname, '')
	if (hashUrl || url) {
		const key =
			permissionKeyMap[hashUrl.toLocaleLowerCase()] ||
			permissionKeyMap[url.toLocaleLowerCase()] ||
			''
		return Base64.resEncode(key)
	}
	return ''
}
