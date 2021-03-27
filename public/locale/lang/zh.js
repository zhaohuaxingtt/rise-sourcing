(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
  typeof define === 'function' && define.amd ? define(['i18n'], factory) :
  (global = global || self, factory(window.i18n))
}(this, function (i18n) { 
  'use strict'
  
  i18n.setLocaleMessage('zh', {
    'delete':"删除",
    'all': '全部',
    'search': '搜索',
    'setting': '设置',
    'pagination': {
      'prev': '上一页',
      'next': '下一页'
    },
    'topLayout': {
      'message': {
        'notice': '通知',
        'message': '消息'
      }
    },
    'partsign': {
      'enquiry': '询价资料',
      'volume': '每车用量',
      'log': '操作日志'
    },
        //
    /*
    <!------------------------------------------------------------------------>
    <!--                                                                   --->
    <!------------------------------------------------------------------------>
    */
   
    'XunYuanZhiXing':'寻源执行',    //寻源执行
    'JinDuJianKong':'进度监控',    //进度监控
    'LingJianQianShou':'零件签收',    //零件签收
    'CaiGouXiangMuJianLi':'采购项目建立',    //采购项目建立
    'RfqguanLi':'RFQ管理',    //RFQ管理
    'DingDianGuanLi':'定点管理',    //定点管理
    'RiZhi':'日志',    //日志
    'LingJianHao':'零件号',    //零件号
    'LingJianMingCheng（zhong）':'零件名称（中）',    //零件名称（中）
    'SheJiKeShi':'设计科室',    //设计科室
    'GongChengShi':'工程师',    //工程师
    'CheXingXiangMu':'车型项目',    //车型项目
    'XinXiDanFenLei':'信息单分类',    //信息单分类
    'XinXiDanZhuangTai':'信息单状态',    //信息单状态
    'XinXiDanLiuShuiHao':'信息单流水号',    //信息单流水号
    'XunJiaZiLiaoZhuangTai':'询价资料状态',    //询价资料状态
    'MeiCheYongLiangZhuangTai':'每车用量状态',    //每车用量状态
    'QingShuRu':'请输入',    //请输入
    'QingXuanZe':'请选择',    //请选择
    'QueRen':'确认',    //确认
    'ZhongZhi':'重置',    //重置
    'XinJianXinXiDanQianShou':'新件信息单签收',    //新件信息单签收
    'ZhuanPai':'转派',    //转派
    'QianShou':'签收',    //签收
    'TuiHui':'退回',    //退回
    'XinXiDanLiuShuiHao':'信息单流水号',    //信息单流水号
    'LingJianHao':'零件号',    //零件号
    'LingJianMing（zhong）':'零件名（中）',    //零件名（中）
    'LingJianMing（de）':'零件名（德）',    //零件名（德）
    'CheXingXiangMu':'车型项目',    //车型项目
    'SheJiKeShi':'设计科室',    //设计科室
    'GongChengShi':'工程师',    //工程师
    'XinXiDanLeiXing':'信息单类型',    //信息单类型
    'XinXiDanZhuangTai':'信息单状态',    //信息单状态
    'XunJiaZiLiaoZhuangTai':'询价资料状态',    //询价资料状态
    'MeiCheYongLiangZhuangTai':'每车用量状态',    //每车用量状态
    'XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu':'显示第    条到    条记录，共    条记录',    //显示第    条到    条记录，共    条记录
    'ShangYiYe':'上一页',    //上一页
    'XiaYiYe':'下一页',    //下一页
    'QianWangYe':'前往    页'    //前往    页

    /*
    <!------------------------------------------------------------------------>
    <!--                                                                   --->
    <!------------------------------------------------------------------------>
    */
    //
  })
}))