(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
    typeof define === 'function' && define.amd ? define(['i18n'], factory) :
    (global = global || self, factory(window.i18n))
  }(this, function (i18n) { 
    'use strict'
    
    i18n.setLocaleMessage('en', {
        'delete': "delete",
        'all': 'all',
        'search': 'search',
        'setting': 'setting',
        'pagination': {
            'prev': 'prev',
            'next': 'next'
        },
        'topLayout': {
            'message': {
                'notice': 'notice',
                'message': 'message'
            }
        },
        'partsign': {
            'enquiry': 'enquiry',
            'volume': 'volume',
            'log': 'log'
        },
        'rfq': {
            'RFQACTIVATERFQ': 'Activate',
            'RFQNEWRFQ': 'New',
            'RFQCLOSERFQ': 'Close',
            'RFQASSIGNMENTOFSCORINGTASKS': 'Assignment',
            'RFQTRANSFERNEGOTIATION': 'Transfer',
            'RFQREINQUIRY': 'Re-inquiry',
            'RFQCREATEAFIXEDPOINTAPPLICATION': 'CreateFixedApp',
            'RFQEXPORT': 'Export',
            'RFQINQUIRE': 'Inquire',
            'RFQRESET': 'Reset',
            'RFQRFQNUMBER': 'Number',
            'RFQRFQNAME': 'Name',
            'RFQRFQTYPE': 'Type',
            'RFQCREATIONDATE': 'Date',
            'RFQCURRENTROUND': 'Round',
            'RFQSUPPLIERSHAVEBEENINQUIRED': 'Suppliers',
            'RFQQUOTEDSUPPLIER': 'QuotedSupplier',
            'RFQRFQSTATUS': 'Status',
            'RFQQUOTATIONDEADLINE': 'Deadline',
            'RFQINQUIRYBUYER': 'Buyer',
            'RFQLINIE': 'Linie',
            'RFQTPSCORESTATUS': 'TpStatus',
            'RFQMQSCORESTATUS': 'MqStatus',
            'RFQTARGETPRICESTATUS': 'PriceStatus',
            'RFQPARTNUMBERFSNRRFQBUYER': 'PartNumber/fsnr/rfq/buyer',
            'RFQMODELPROJECT': 'Model',
            'RFQPARTITEMTYPE': 'PartType',
            'RFQPLEASEENTERQUERY': 'Please Enter Query',
            'RFQRFQINTEGRATEDMANAGEMENT': 'Rfq Integrated Management',
        },
        'partsprocure': {
          'PARTSPROCURENEWPROCUREMENTPROJECT': 'New Procurement Project',
          'PARTSPROCUREGENERATEFSGSNR': 'Generate Fs/gsnr',
          'PARTSPROCURECANCELPARTSPURCHASE': 'Cancel Parts Purchase',
          'PARTSPROCUREBATCHMAINTENANCE': 'Batch Maintenance',
          'PARTSPROCURESTARTINQUIRY': 'Start Inquiry',
          'PARTSPROCURETRANSFER': 'Transfer',
          'PARTSPROCUREFSNFGSNFSPNR': 'FSNF/GSNF/SPNR',
          'PARTSPROCUREPARTNUMBER': 'Part Number',
          'PARTSPROCUREPARTNAMEZH': 'Part Name (ZH)',
          'PARTSPROCUREPARTNAMEDE': 'Part Name (DE)',
          'PARTSPROCUREPURCHASINGFACTORY': 'Purchasing Factory',
          'PARTSPROCUREPARTITEMTYPE': 'Part Item Type',
          'PARTSPROCUREVEHICLECATEGORIES': 'Vehicle Categories',
          'PARTSPROCUREMODELPROJECT': 'Model Project',
          'PARTSPROCUREPARTSTATUS': 'Part Status',
          'PARTSPROCUREINQUIRYBUYER': 'Inquiry Buyer',
          'PARTSPROCURELINIE': 'Linie',
          'PARTSPROCURECF': 'Cf',
          'PARTSPROCURE': 'Please Enter The Part Number, Separated By Multiple Commas',
          'PLEENTER': 'Please Enter',
          'CHOOSE': 'Please Choose',
        },
    
    'partsignLanguage':{
       //
    /*
    <!------------------------------------------------------------------------>
    <!--                                                                   --->
    <!------------------------------------------------------------------------>
    */
    
    'XunYuanZhiXing':'Sourcing Execution',    //寻源执行
    'JinDuJianKong':'Progress Monitoring',    //进度监控
    'LingJianQianShou':'Part Signing',    //零件签收
    'CaiGouXiangMuJianLi':'Procurement Project Establishment',    //采购项目建立
    'RfqguanLi':'Rfq Management',    //RFQ管理
    'DingDianGuanLi':'Point Management',    //定点管理
    'RiZhi':'Log',    //日志
    'LingJianHao':'Part Number',    //零件号
    'LingJianMingChengZH':'Part Name (zh)',    //零件名称（中）
    'SheJiKeShi':'Design Department',    //设计科室
    'GongChengShi':'Engineer',    //工程师
    'CheXingXiangMu':'Model Project',    //车型项目
    'XinXiDanFenLei':'Information Sheet Classification',    //信息单分类
    'XinXiDanZhuangTai':'Information Sheet Status',    //信息单状态
    'XinXiDanLiuShuiHao':'Information Single Serial Number',    //信息单流水号
    'XunJiaZiLiaoZhuangTai':'Inquiry Data Status',    //询价资料状态
    'MeiCheYongLiangZhuangTai':'Usage Status Per Vehicle',    //每车用量状态
    'QingShuRu':'Please Enter',    //请输入
    'QingXuanZe':'Please Choose',    //请选择
    'QueRen':'Confirm',    //确认
    'ZhongZhi':'Reset',    //重置
    'XinJianXinXiDanQianShou':'Receipt Of New Information Sheet',    //新件信息单签收
    'ZhuanPai':'Transfer',    //转派
    'QianShou':'Sign For',    //签收
    'TuiHui':'Return',    //退回
    //'XinXiDanLiuShuiHao':'Information Single Serial Number',    //信息单流水号
    //'LingJianHao':'Part Number',    //零件号
    'LingJianMingZH':'Part Name (zh)',    //零件名（中）
    'LingJianMingDE':'Part Name (de）',    //零件名（德）
    //'CheXingXiangMu':'Model Project',    //车型项目
    //'SheJiKeShi':'Design Department',    //设计科室
    //'GongChengShi':'Engineer',    //工程师
    'XinXiDanLeiXing':'Information Sheet Type',    //信息单类型
    //'XinXiDanZhuangTai':'Information Sheet Status',    //信息单状态
    //'XunJiaZiLiaoZhuangTai':'Inquiry Data Status',    //询价资料状态
    //'MeiCheYongLiangZhuangTai':'Usage Status Per Vehicle',    //每车用量状态
    'XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu':'Display Records From Records To Records In Total',    //显示第    条到    条记录，共    条记录
    'ShangYiYe':'Previous Page',    //上一页
    'XiaYiYe':'Next Page',    //下一页
    'QianWangYe':'Go To Page'    //前往    页
    
    /*
    <!------------------------------------------------------------------------>
    <!--                                                                   --->
    <!------------------------------------------------------------------------>
    */
    //
    }    
    })
  }))
