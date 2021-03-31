(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
    typeof define === 'function' && define.amd ? define(['i18n'], factory) :
      (global = global || self, factory(window.i18n))
}(this, function (i18n) {
  'use strict'

  i18n.setLocaleMessage('zh', {
    'delete': "删除",
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
    'rfq': {
      'RFQACTIVATERFQ': '激活RFQ',
      'RFQNEWRFQ': '新建RFQ',
      'RFQCLOSERFQ': '关闭RFQ',
      'RFQASSIGNMENTOFSCORINGTASKS': '转派评分任务',
      'RFQTRANSFERNEGOTIATION': '转谈判',
      'RFQREINQUIRY': '转询价',
      'RFQCREATEAFIXEDPOINTAPPLICATION': '创建定点申请',
      'RFQEXPORT': '导出',
      'RFQINQUIRE': '查询',
      'RFQRESET': '重置',
      'RFQRFQNUMBER': 'RFQ编号',
      'RFQRFQNAME': 'RFQ名称',
      'RFQRFQTYPE': 'RFQ类型',
      'RFQCREATIONDATE': '创建日期',
      'RFQCURRENTROUND': '当前轮次',
      'RFQSUPPLIERSHAVEBEENINQUIRED': '已询价供应商',
      'RFQQUOTEDSUPPLIER': '已报价供应商',
      'RFQRFQSTATUS': 'RFQ状态',
      'RFQQUOTATIONDEADLINE': '报价截至日期',
      'RFQINQUIRYBUYER': '询价采购员',
      'RFQLINIE': 'LINIE',
      'RFQTPSCORESTATUS': 'TP评分状态',
      'RFQMQSCORESTATUS': 'MQ评分状态',
      'RFQTARGETPRICESTATUS': '目标价状态',
      'RFQPARTNUMBERFSNRRFQBUYER': '零件号/FSNR/RFQ编号/采购员',
      'RFQMODELPROJECT': '车型项目',
      'RFQPARTITEMTYPE': '零件项目类型',
      'RFQPLEASECHOOSE': '请选择',
      'RFQPLEASEENTERQUERY': '请输入查询',
      'RFQRFQINTEGRATEDMANAGEMENT': 'RFQ综合管理',
    },
    'partsprocure': {
      'PARTSPROCURENEWPROCUREMENTPROJECT': 'FSNF/GSNF/SPNR',
      'PARTSPROCUREGENERATEFSGSNR': '生成Fs/GsNr',
      'PARTSPROCURECANCELPARTSPURCHASE': '取消零件采购',
      'PARTSPROCUREBATCHMAINTENANCE': '批量维护',
      'PARTSPROCURESTARTINQUIRY': '启动询价',
      'PARTSPROCURETRANSFER': '转派',
      'PARTSPROCUREFSNFGSNFSPNR': 'FSNF/GSNF/SPNR',
      'PARTSPROCUREPARTNUMBER': '零件号',
      'PARTSPROCUREPARTNAMEZH': '零件名（中）',
      'PARTSPROCUREPARTNAMEDE': '零件名（德）',
      'PARTSPROCUREPURCHASINGFACTORY': '采购工厂',
      'PARTSPROCUREPARTITEMTYPE': '零件项目类型',
      'PARTSPROCUREVEHICLECATEGORIES': '车型大类',
      'PARTSPROCUREMODELPROJECT': '车型项目',
      'PARTSPROCUREPARTSTATUS': '零件状态',
      'PARTSPROCURESTATUS': '状态',
      'PARTSPROCUREINQUIRYBUYER': '询价采购员',
      'PARTSPROCURELINIE': 'LINIE',
      'PARTSPROCURECF': 'CF',
      'PARTSPROCURE': '请输入零件号，多个逗号分隔',
      'PLEENTER': '请输入',
      'CHOOSE': '请选择',
      "CF": 'CF'
    },
    'partsignLanguage': {
      'XunYuanZhiXing': '寻源执行',    //寻源执行
      'JinDuJianKong': '进度监控',    //进度监控
      'LingJianQianShou': '零件签收',    //零件签收
      'CaiGouXiangMuJianLi': '采购项目建立',    //采购项目建立
      'RfqguanLi': 'RFQ管理',    //RFQ管理
      'DingDianGuanLi': '定点管理',    //定点管理
      'RiZhi': '日志',    //日志
      'LingJianHao': '零件号',    //零件号
      'LingJianMingChengZH': '零件名称（中）',    //零件名称（中）
      'SheJiKeShi': '设计科室',    //设计科室
      'GongChengShi': '工程师',    //工程师
      'CheXingXiangMu': '车型项目',    //车型项目
      'XinXiDanFenLei': '信息单分类',    //信息单分类
      'XinXiDanZhuangTai': '信息单状态',    //信息单状态
      'XinXiDanLiuShuiHao': '信息单流水号',    //信息单流水号
      'XunJiaZiLiaoZhuangTai': '询价资料状态',    //询价资料状态
      'MeiCheYongLiangZhuangTai': '每车用量状态',    //每车用量状态
      'QingShuRu': '请输入',    //请输入
      'QingXuanZe': '请选择',    //请选择
      'QueRen': '确认',    //确认
      'ZhongZhi': '重置',    //重置
      'XinJianXinXiDanQianShou': '新件信息单签收',    //新件信息单签收
      'ZhuanPai': '转派',    //转派
      'QianShou': '签收',    //签收
      'TuiHui': '退回',    //退回
      //'XinXiDanLiuShuiHao':'信息单流水号',    //信息单流水号
      //'LingJianHao':'零件号',    //零件号
      'LingJianMingZH': '零件名（中）',    //零件名（中）
      'LingJianMingDE': '零件名（德）',    //零件名（德）
      //'CheXingXiangMu':'车型项目',    //车型项目
      //'SheJiKeShi':'设计科室',    //设计科室
      //'GongChengShi':'工程师',    //工程师
      'XinXiDanLeiXing': '信息单类型',    //信息单类型
      //'XinXiDanZhuangTai':'信息单状态',    //信息单状态
      //'XunJiaZiLiaoZhuangTai':'询价资料状态',    //询价资料状态
      //'MeiCheYongLiangZhuangTai':'每车用量状态',    //每车用量状态
      'XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu': '显示第    条到    条记录，共    条记录',    //显示第    条到    条记录，共    条记录
      'ShangYiYe': '上一页',    //上一页
      'XiaYiYe': '下一页',    //下一页
      'QianWangYe': '前往    页'    //前往    页


    },

    /*
    <!------------------------------------------------------------------------>
    <!--                                                                   --->
    <!------------------------------------------------------------------------>
    */
    //

    'LK_ZUIXINSHENQINGZHUANGTAI': '最新申请状态',//最新申请状态
    'LK_ZUIXINSHENQINGRIQI': '最新申请日期',//最新申请日期
    'LK_ZUIXINFANHUIRIQI': '最新返回日期',//最新返回日期
    'LK_ZUIXINRWJIA': '最新RW价',//最新RW价
    'LK_ZHUANGXIANGSHU': '装箱数',//装箱数
    'LK_ZHUANXUNJIA': '转询价',//转询价
    'LK_ZHUANTANPAN': '转谈判',//转谈判
    'LK_ZHUANPAIPINGFENRENWU': '转派评分任务',//转派评分任务
    'LK_ZHUANPAI': '转派',//转派
    'LK_ZHONGZHI': '重置',//重置
    'LK_ZHONGXINSHENQING': '重新申请',//重新申请
    'LK_ZHONGLIANG': '重量',//重量
    'LK_ZHILIANG': '质量',//质量
    'LK_ZHIFUTIAOKUAN': '支付条款',//支付条款
    'LK_ZENGJIADERENKEFEIYUAN': '增加的认可费（元）',//增加的认可费（元）
    'LK_ZANWUSHUJU': '暂无数据',//暂无数据
    'LK_ZAISHENQINGCAIWUMUBIAOJIA': '再申请财务目标价',//再申请财务目标价
    'LK_YUANPEICHANG': '原配厂',//原配厂
    'LK_YONGLIANG': '用量',//用量
    'LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU': '询价采购员上会备注',//易询价采购员上会备注
    'LK_YIXUNJIAGONGYINGSHANG': '已询价供应商',//已询价供应商
    'LK_YIBAOJIAGONGYINGSHANG': '已报价供应商',//已报价供应商
    'LK_YAOQIUCSCHUIYIRIQI': '要求CSC会议日期',//要求CSC会议日期
    'LK_YANYONGCHEXINGDALEIDAIMA': '沿用车型大类代码',//沿用车型大类代码
    'LK_XUNJIAZILIAOZHUANGTAI': '询价资料状态',//询价资料状态
    'LK_XUNJIAZILIAO': '询价资料',//询价资料
    'LK_XUNJIAFUJIAN': '询价附件',//询价附件
    'LK_XUNJIACHANLIANGJIHUA': '询价产量计划',//询价产量计划
    'LK_XUNJIACAIGOUYUANBEIZHU': '询价采购员备注',//询价采购员备注
    'LK_XUNJIACAIGOUYUAN': '询价采购员',//询价采购员
    'LK_XUNYUANZHIHANG': '寻源执行',//寻源执行
    'LK_XUANZHUANGJIAN': '选装件',//选装件
    'LK_XINXILIUSHUIDANHAO': '信息流水单号',//信息流水单号
    'LK_XINXIDANZHUANGTAI': '信息单状态',//信息单状态
    'LK_XINXIDANXIANGQING': '信息单详情',//信息单详情
    'LK_XINXIDANSHENGCHENGSHIJIAN': '信息单生成时间',//信息单生成时间
    'LK_XINXIDANLIUSHUIHAO': '信息单流水号',//信息单流水号
    'LK_XINXIDANLEIXING': '信息单类型',//信息单类型
    'LK_XINXIDANFENLEI': '信息单分类',//信息单分类
    'LK_XINSHENQINGCAIWUMUBIAOJIA': '新申请财务目标价',//新申请财务目标价
    'LK_XINJIANXINXIDANLIUSHUIHAO': '新建信息单流水号',//新建信息单流水号
    'LK_XINJIANXINXIDANBEIZHU': '新建信息单备注',//新建信息单备注
    'LK_XINJIANRFQLUNCI': '新建RFQ轮次',//新建RFQ轮次
    'LK_XINJIANRFQ': '新建RFQ',//新建RFQ
    'LK_XINJIANXINXIDANQIANSHOU': '新件信息单签收',//新件信息单签收
    'LK_XIANGQINGXINXI': '详情信息',//详情信息
    'LK_XIANGGUANCHEXING': '相关车型',//相关车型
    'LK_XIAZAI': '下载',//下载
    'LK_XIAYIYE': '下一页',//下一页
    'LK_WULIUYAOQIU': '物流要求',//物流要求
    'LK_WULIUBIAOZHUN': '物流标准',//物流标准
    'LK_WENJIANMINGCHENG': '文件名称',//文件名称
    'LK_WENJIANMING': '文件名',//文件名
    'LK_WENJIANDAXIAOMB': '文件大小（MB）',//文件大小（MB）
    'LK_WEIHUREN': '维护人',//维护人
    'LK_WEIHU': '维护',//维护
    'LK_WAIBUKAIFAFEIYUAN': '外部开发费（元）',//外部开发费（元）
    'LK_TUIHUIYUANYIN': '退回原因',//退回原因
    'LK_TUIHUI': '退回',//退回
    'LK_TUISONGSHIJIAN': '推送时间',//推送时间
    'LK_TUZHIRIQI': '图纸日期',//图纸日期
    'LK_TUZHIHETPDANXIANGQING': '图纸和TP单详情',//图纸和TP单详情
    'LK_TUZHI': '图纸',//图纸
    'LK_TOUZIYUSUAN': '投资预算',//投资预算
    'LK_TONGZHIYIBAOJIAGONGYINGSHANG': '通知已报价供应商',//通知已报价供应商
    'LK_TONGZHIQUANBUGONGYINGSHANG': '通知全部供应商',//通知全部供应商
    'LK_TIANJIAZIDINGYIPINGFENXIANG': '添加自定义评分项',//添加自定义评分项
    'LK_TIANJIAGONGYINGSHANG': '添加供应商',//添加供应商
    'LK_TIANJIA': '添加',//添加
    'LK_TIJIAO': '提交',//提交
    'LK_TESHUYAOQIU': '特殊要求',//特殊要求
    'LK_TESHULINGJIANLEIXING': '特殊零件类型',//特殊零件类型
    'LK_TANPANZHUSHOU': '谈判助手',//谈判助手
    'LK_ENTER_SEARCH_SUPPLIER_NAME_FACOTRY': '输入查询供应商名称、厂商类型...',//输入查询供应商名称、厂商类型...
    'LK_SHIFOUYANZHENGCBD': '是否验证CBD',//是否验证CBD
    'LK_SHIFOUSHENDUGUOCHANHUA': '是否深度国产化',//是否深度国产化
    'LK_CONFIRM_SIGN_RECORD_TIPS': '是否确认对新件信息单进行签收？',//是否确认对新件信息单进行签收？
    'LK_SHIFOUERCIJIAN': '是否二次件',//是否二次件
    'LK_SHIJIANJIHUA': '时间计划',//时间计划
    'LK_SHENGCHENGFSHAO': '生成FS号',//生成FS号
    'LK_SHENGCHENGFS_GSNR': '生成FS/GSNR',//生成FS/GSNR
    'LK_SHENPIZHUANGTAI': '审批状态',//审批状态
    'LK_SHENPIYIJIAN': '审批意见',//审批意见
    'LK_SHENDUGUOCHANHUADAIMA': '深度国产化代码',//深度国产化代码
    'LK_SHENDUGUOCHANHUABEIZHU': '深度国产化备注',//深度国产化备注
    'LK_SHENQINGZHUANGTAI': '申请状态',//申请状态
    'LK_SHENQINGYUANYIN': '申请原因',//申请原因
    'LK_SHENQINGRIQI': '申请日期',//申请日期
    'LK_SHENQINGMUBIAOJIA': '申请目标价',//申请目标价
    'LK_SHENQINGLEIXING': '申请类型',//申请类型
    'LK_SHENQINGLEIBIE': '申请类别',//申请类别
    'LK_SHENQINGCAIWUMUBIAOJIA': '申请财务目标价',//申请财务目标价
    'LK_SHENQINGBEIZHU': '申请备注',//申请备注
    'LK_SHENQINGRWJIA': '申请RW价',//申请RW价
    'LK_SHEZHIGONGYIZU': '设置工艺组',//设置工艺组
    'LK_SHEJIKESHI': '设计科室',//设计科室
    'LK_SHEJIGONGCHENGSHIXINGMING': '设计工程师姓名',//设计工程师姓名
    'LK_SHEJIGONGCHENGSHIHAO': '设计工程师号',//设计工程师号
    'LK_SHANGYIYE': '上一页',//上一页
    'LK_SHANGCHUANRIQI': '上传日期',//上传日期
    'LK_SHANGCHUANREN': '上传人',//上传人
    'LK_SHANGCHUANFUJIAN': '上传附件',//上传附件
    'LK_SHANCHUGONGYINGSHANG': '删除供应商',//删除供应商
    'LK_SHANCHU': '删除',//删除
    'LK_SEBIAOHAO': '色标号',//色标号
    'LK_RUCHANGBAOZHUANGMINGCHENG': '入场包装名称',//入场包装名称
    'LK_RIZHI': '日志',//日志
    'LK_RENKEZHOUQIZHOU': '认可周期（周）',//认可周期（周）
    'LK_QUEREN': '确认',//确认
    'LK_QUANBUBANBEN': '全部版本',//全部版本
    'LK_QUXIAOYUANYIN': '取消原因',//取消原因
    'LK_QUXIAOLINGJIANCAIGOUXIANGMU': '取消零件采购项目',//取消零件采购项目
    'LK_QINGXUANZE': '请选择',//请选择
    'LK_QINGSHURU': '请输入',//请输入
    'LK_QIANSHOURIQI': '签收日期',//签收日期
    'LK_QIANSHOUQUEREN': '签收确认',//签收确认
    'LK_QIANSHOU': '签收',//签收
    'LK_QIDONGXUNJIA': '启动询价',//启动询价
    'LK_QIDONGXIANGMU': '启动项目',//启动项目
    'LK_QITAXINXI': '其他信息',//其他信息
    'LK_QITAPEIZHI': '其他配置',//其他配置
    'LK_QIWANGMUBIAOJIA': '期望目标价',//期望目标价
    'LK_PINGFENREN': '评分人',//评分人
    'LK_PINGFEN': '评分',//评分
    'LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU': '批量维护零件采购项目',//批量维护零件采购项目
    'LK_PILIANGWEIHU': '批量维护',//批量维护
    'LK_PEIZHIBIANMA': '配置编码',//配置编码
    'LK_PEIZHIBILI': '配置比例',//配置比例
    'LK_NIANFEN': '年份',//年份
    'LK_MUBIAOJIAZHUANGTAI': '目标价状态',//目标价状态
    'LK_MUBIAOJIA': '目标价',//目标价
    'LK_MOJUYUSUANSHENQING': '模具预算申请',//模具预算申请
    'LK_MEICHEYONGLIANGZHUANGTAI': '每车用量状态',//每车用量状态
    'LK_MEICHEYONGLIANG': '每车用量',//每车用量
    'LK_MAOZHONGKG': '毛重（KG）',//毛重（KG）
    'LK_LUNCILEIXING': '轮次类型',//轮次类型
    'LK_LINGJIANZHUANGTAI': '零件状态',//零件状态
    'LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG': '零件沿用性质描述(中)',//零件沿用性质描述(中)
    'LK_LINGJIANYANYONGXINGZHIMIAOSHUYING': '零件沿用性质描述(英)',//零件沿用性质描述(英)
    'LK_LINGJIANYANYONGXINGZHIMIAOSHUDE': '零件沿用性质描述(德)',//零件沿用性质描述(德)
    'LK_LINGJIANYANYONGXINGZHIDAIMA': '零件沿用性质代码',//零件沿用性质代码
    'LK_LINGJIANXIANGMULEIXING': '零件项目类型',//零件项目类型
    'LK_LINGJIANSUOSHUGONGYIHAO': '零件所属工艺号',//零件所属工艺号
    'LK_LINGJIANSUOSHUCAILIAOZUMINGCHENGZHONG': '零件所属材料组名称（中）',//零件所属材料组名称（中）
    'LK_LINGJIANSUOSHUCAILIAOZUMINGCHENGDE': '零件所属材料组名称（德）',//零件所属材料组名称（德）
    'LK_LINGJIANSUOSHUCAILIAOZULINEBUMEN': '零件所属材料组LINE部门',//零件所属材料组LINE部门
    'LK_LINGJIANSUOSHUCAILIAOBIANHAO': '零件所属材料编号',//零件所属材料编号
    'LK_LINGJIANQINGDAN': '零件清单',//零件清单
    'LK_LINGJIANQIANSHOU': '零件签收',//零件签收
    'LK_LINGJIANPINGFEN': '零件评分',//零件评分
    'LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG': '零件平台性质描述(中)',//零件平台性质描述(中)
    'LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING': '零件平台性质描述(英)',//零件平台性质描述(英)
    'LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE': '零件平台性质描述(德)',//零件平台性质描述(德)
    'LK_LINGJIANPINGTAIXINGZHIDAIMA': '零件平台性质代码',//零件平台性质代码
    'LK_LINGJIANMINGCHENGZHONG': '零件名称（中）',//零件名称（中）
    'LK_LINGJIANMINGCHENGDE': '零件名称（德）',//零件名称（德）
    'LK_LINGJIANMINGCHENG': '零件名称',//零件名称
    'LK_LINGJIANMINGZHONG': '零件名（中）',//零件名（中）
    'LK_LINGJIANMINGYING': '零件名（英）',//零件名（英）
    'LK_LINGJIANMINGDE': '零件名（德）',//零件名（德）
    'LK_LINGJIANMEICHEYONGLIANG': '零件每车用量',//零件每车用量
    'LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG': '零件贸易属性描述(中)',//零件贸易属性描述(中)
    'LK_LINGJIANMAOYISHUXINGMIAOSHUYING': '零件贸易属性描述(英)',//零件贸易属性描述(英)
    'LK_LINGJIANMAOYISHUXINGMIAOSHUDE': '零件贸易属性描述(德)',//零件贸易属性描述(德)
    'LK_LINGJIANMAOYISHUXINGDAIMA': '零件贸易属性代码',//零件贸易属性代码
    'LK_LINGJIANLEIXINGDAIMA': '零件类型代码',//零件类型代码
    'LK_LINGJIANLEIXING': '零件类型',//零件类型
    'LK_LINGJIANJIAGONGCHENGDUDAIMA': '零件加工程度代码',//零件加工程度代码
    'LK_LINGJIANJIAGONGCHENGDUZHONG': '零件加工程度(中)',//零件加工程度(中)
    'LK_LINGJIANJIAGONGCHENGDUYING': '零件加工程度(英)',//零件加工程度(英)
    'LK_LINGJIANJIAGONGCHENGDUDE': '零件加工程度(德)',//零件加工程度(德)
    'LK_LINGJIANHAODIYIBUFEN': '零件号第一部分',//零件号第一部分
    'LK_LINGJIANHAODIWUBUFEN': '零件号第五部分',//零件号第五部分
    'LK_LINGJIANHAODISIBUFEN': '零件号第四部分',//零件号第四部分
    'LK_LINGJIANHAODISANBUFEN': '零件号第三部分',//零件号第三部分
    'LK_LINGJIANHAODIERBUFEN': '零件号第二部分',//零件号第二部分
    'LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN': '零件号/FSNR/RFQ编号/采购员',//零件号/FSNR/RFQ编号/采购员
    'LK_LINGJIANHAO': '零件号',//零件号
    'LK_LINGJIANCHANLIANGJILU': '零件产量记录',//零件产量记录
    'LK_LINGJIANCHANLIANGJIHUA': '零件产量计划',//零件产量计划
    'LK_LINGJIANCHANLIANG': '零件产量',//零件产量
    'LK_LINGJIANCAIGOUXIANGMUGUANLI': '零件采购项目管理',//零件采购项目管理
    'LK_LINGJIANCAIGOUXIANGMU': '零件采购项目',//零件采购项目
    'LK_LISHISHIYONGGAILÜ': '历史适用概率',//历史适用概率
    'LK_KAISHINIANFEN': '开始年份',//开始年份
    'LK_JUJUE': '拒绝',//拒绝
    'LK_JINDUJIANKONG': '进度监控',//进度监控
    'LK_JIESHUXIANGMU': '结束项目',//结束项目
    'LK_JIESHUBENLUNXUNJIA': '结束本轮询价',//结束本轮询价
    'LK_JIAOFU': '交付',//交付
    'LK_JIAGEMINGXI': '价格明细',//价格明细
    'LK_JISHUJIAOLIUHUI': '技术交底会',//技术交底会
    'LK_JIHUORFQ': '激活RFQ',//激活RFQ
    'LK_JICHUXINXI': '基础信息',//基础信息
    'LK_HUOBI': '货币',//货币
    'LK_HUIYISHIJIAN': '会议时间',//会议时间
    'LK_HUIYIQITAXINXI': '会议其它信息',//会议其它信息
    'LK_HUIYIJIBENXINXI': '会议基本信息',//会议基本信息
    'LK_HUIYIDIDIAN': '会议地点',//会议地点
    'LK_GUANBIRFQ': '关闭RFQ',//关闭RFQ
    'LK_GONGYINGSHANGSHENGCHANCHANGDI': '供应商生产场地',//供应商生产场地
    'LK_GONGYINGSHANGPINGFENFUJIAN': '供应商评分附件',//供应商评分附件
    'LK_GONGYINGSHANGPINGFEN': '供应商评分',//供应商评分
    'LK_GONGYINGSHANGMINGCHENG': '供应商名称',//供应商名称
    'LK_GONGYINGSHANGMING': '供应商名',//供应商名
    'LK_GONGYINGSHANGCAILIAOZHUNBEI': '供应商材料准备',//供应商材料准备
    'LK_GONGYINGSHANGSAPHAO': '供应商SAP号',//供应商SAP号
    'LK_GONGYINGSHANG360SHITU': '供应商360°视图',//供应商360°视图
    'LK_GONGHUOFANGSHI': '供货方式',//供货方式
    'LK_GONGYI': '工艺',//工艺
    'LK_GONGCHENGSHI': '工程师',//工程师
    'LK_GENGXINZHIXUNJIACHANLIANG': '更新至询价产量',//更新至询价产量
    'LK_GENGXINYUANYIN': '更新原因',//更新原因
    'LK_FUJIANLIEBIAO': '附件列表',//附件列表
    'LK_FUZERENYOUXIANG': '负责人邮箱',//负责人邮箱
    'LK_FUZERENDIANHUA': '负责人电话',//负责人电话
    'LK_FUZEREN': '负责人',//负责人
    'LK_FANHUI': '返回',//返回
    'LK_FASONGZHIWODEYOUXIANG': '发送至我的邮箱',//发送至我的邮箱
    'LK_FASONGXUNJIA': '发送询价',//发送询价
    'LK_FADONGJIPEIZHI': '发动机配置',//发动机配置
    'LK_FADONGJILEIXING': '发动机类型',//发动机类型
    'LK_FACHUXUNJIA': '发出询价',//发出询价
    'LK_DINGDIANGUANLI': '定点管理',//定点管理
    'LK_DIANCHIYONGLIANG': '电池用量',//电池用量
    'LK_DIANCHIRONGLIANG': '电池容量',//电池容量
    'LK_DENGJIPEIZHI': '等级配置',//等级配置
    'LK_DAOCHU': '导出',//导出
    'LK_DANGQIANLUNCI': '当前轮次',//当前轮次
    'LK_DANWEI': '单位',//单位
    'LK_DAIQUERENBANBEN': '待确认版本',//待确认版本
    'LK_DAIBANSHIXIANG': '待办事项',//待办事项
    'LK_DAXIAOMB': '大小（MB）',//大小（MB）
    'LK_CONGLINGJIANPAISHENG': '从零件派生',//从零件派生
    'LK_CHUANGJIANSHIJIAN': '创建时间',//创建时间
    'LK_CHUANGJIANRIQI': '创建日期',//创建日期
    'LK_CHUANGJIANRENXINGMING': '创建人姓名',//创建人姓名
    'LK_CHUANGJIANRENGONGHAO': '创建人工号',//创建人工号
    'LK_CHUANGJIANDINGDIANSHENQING': '创建定点申请',//创建定点申请
    'LK_CHICUN': '尺寸',//尺寸
    'LK_CHENGBEN': '成本',//成本
    'LK_CHEHUI': '撤回',//撤回
    'LK_CHEXINGXIANGMUMINGCHENG': '车型项目名称',//车型项目名称
    'LK_CHEXINGXIANGMUSOP': '车型项目SOP',//车型项目SOP
    'LK_CHEXINGXIANGMUPVS': '车型项目PVS',//车型项目PVS
    'LK_CHEXINGXIANGMU0S': '车型项目0S',//车型项目0S
    'LK_CHEXINGXIANGMU': '车型项目',//车型项目
    'LK_CHEXINGSHENGCHANNIANXIAN': '车型生产年限',//车型生产年限
    'LK_CHEXINGDENGJI': '车型等级',//车型等级
    'LK_CHEXINGDALEI': '车型大类',//车型大类
    'LK_CHEXING': '车型',//车型
    'LK_CHANLIANGPC': '产量（PC）',//产量（PC）
    'LK_CHAIFENCAIGOUGONGCHANG': '拆分采购工厂',//拆分采购工厂
    'LK_CHAZHAOGONGYIZUGONGYINGSHANG': '查找工艺组供应商',//查找工艺组供应商
    'LK_CHAKANQUANBUBANBEN': '查看全部版本',//查看全部版本
    'LK_CAOZUOREN': '操作人',//操作人
    'LK_CAOZUO': '操作',//操作
    'LK_CANKAOLINGJIANHAO': '参考零件号',//参考零件号
    'LK_CANKAOCHEXING': '参考车型',//参考车型
    'LK_CANKAOCHANLIANGJISHIJIANJIHUA': '参考产量及时间计划',//参考产量及时间计划
    'LK_CANKAOBAOZHUANGZHANGMM': '参考包装长(mm)',//参考包装长(mm)
    'LK_CANKAOBAOZHUANGQIJULEIXING': '参考包装器具类型',//参考包装器具类型
    'LK_CANKAOBAOZHUANGKUANMM': '参考包装宽（mm）',//参考包装宽（mm）
    'LK_CANKAOBAOZHUANGGAOMM': '参考包装高（mm）',//参考包装高（mm）
    'LK_CANKAOBAOZHUANGDANJIAYUAN': '参考包装单价（元）',//参考包装单价（元）
    'LK_CANKAOBAOZHUANG': '参考包装',//参考包装
    'LK_CAIGOUYUANGONGHAO': '采购员工号',//采购员工号
    'LK_CAIGOUYUAN': '采购员',//采购员
    'LK_CAIGOUXIANGMUXINXI': '采购项目信息',//采购项目信息
    'LK_CAIGOUXIANGMUJIANLI': '采购项目建立',//采购项目建立
    'LK_CAIGOUTIAOKUAN': '采购条款',//采购条款
    'LK_CAIGOUGONGCHANG': '采购工厂',//采购工厂
    'LK_CAIWUMUBIAOJIA': '财务目标价',//财务目标价
    'LK_CAILIAOZUXINXI': '材料组信息',//材料组信息
    'LK_CAILIAOZUMINGCHENGZHONG': '材料组名称（中）',//材料组名称（中）
    'LK_CAILIAOZUGONGYISHEZHI': '材料组工艺设置',//材料组工艺设置
    'LK_CAILIAOZUGONGYIBIANHAO': '材料组工艺编号',//材料组工艺编号
    'LK_CAILIAOZU': '材料组',//材料组
    'LK_CAILIAOGONGYIZUMINGCHENGDE': '材料工艺组名称（德）',//材料工艺组名称（德）
    'LK_CAILIAOGONGYIZUMINGCHENGZHONG': '材料工艺组名称（中）',//材料工艺组名称（中）
    'LK_CAILIAO': '材料',//材料
    'LK_BUMENPINGFENLEIXING': '部门评分类型',//部门评分类型
    'LK_BUMENBIANHAO': '部门编号',//部门编号
    'LK_BIANSUXIANGPEIZHI': '变速箱配置',//变速箱配置
    'LK_BIANSUXIANGLEIXING': '变速箱类型',//变速箱类型
    'LK_BIANJI': '编辑',//编辑
    'LK_BIANHAO': '编号',//编号
    'LK_BENLUNBAOJIAQIZHISHIJIAN': '本轮报价起止时间',//本轮报价起止时间
    'LK_BEIDAITILINGJIAN': '被代替零件',//被代替零件
    'LK_BEIZHUXINXI': '备注信息',//备注信息
    'LK_BEIZHU': '备注',//备注
    'LK_BAOJIAJIEZHIRIQI': '报价截止日期',//报价截止日期
    'LK_BAOCUN': '保存',//保存
    'LK_BAOZHUANGFUZEREN': '包装负责人',//包装负责人
    'LK_BANBENZHUANGTAI': '版本状态',//版本状态
    'LK_BANBENHAO': '版本号',//版本号
    'LK_TPPINGFENZHUANGTAI': 'TP评分状态',//TP评分状态
    'LK_SWHAO': 'sw号',//sw号
    'LK_SVWYAOQIUOTSZHOU': 'SVW要求OTS（周）',//SVW要求OTS（周）
    'LK_SVWYAOQIUEMZHOU': 'SVW要求EM（周）',//SVW要求EM（周）
    'LK_SUM': 'SUM',//SUM
    'LK_SOPRIQI': 'SOP日期',//SOP日期
    'LK_SAICVOLKSWAGENKUCUN_XIAOSHI': 'SAIC VOLKSWAGEN库存_小时',//SAIC VOLKSWAGEN库存_小时
    'LK_SAICVOLKSWAGENKONGXIANGCAOZUO_XIAOSHI': 'SAIC VOLKSWAGEN空箱操作_小时',//SAIC VOLKSWAGEN空箱操作_小时
    'LK_RWJIA': 'RW价',//RW价
    'LK_RFQZONGHEGUANLI': 'RFQ综合管理',//RFQ综合管理
    'LK_RFQZHUANGTAI': 'RFQ状态',//RFQ状态
    'LK_RFQMINGCHENG': 'RFQ名称',//RFQ名称
    'LK_RFQLEIXING': 'RFQ类型',//RFQ类型
    'LK_RFQGUANLI': 'RFQ管理',//RFQ管理
    'LK_RFQBIANHAO': 'RFQ编号',//RFQ编号
    'LK_MTZLINGJIAN': 'MTZ零件',//MTZ零件
    'LK_MQPINGFENZHUANGTAI': 'MQ评分状态',//MQ评分状态
    'LK_MBDL': 'MBDL',//MBDL
    'LK_LINIESHANGHUIBEIZHU': 'Linie上会备注',//Linie上会备注
    'LK_LINIEBUMEN': 'LINIE部门',//LINIE部门
    'LK_LINIEBEIZHU': 'Linie备注',//Linie备注
    'LK_INBOUNDWULIUFANGSHI': 'INBOUND物流方式',//INBOUND物流方式
    'LK_FSHAO': 'FS号',//FS号
    'LK_FS_GSHAO': 'FS/GS号',//FS/GS号
    'LK_CSFPFUZEREN': 'CSF（P）负责人',//CSF（P）负责人
    'LK_CS_1SHANGHUIBEIZHU': 'CS*1上会备注',//CS*1上会备注
    'LK_CS_1BEIZHU': 'CS*1备注',//CS*1备注
    'LK_CFFUZEREN': 'CF负责人',//CF负责人
    'LK_CBDXUANZE': 'CBD选择',//CBD选择
    'LK_CBDSHEZHI': 'CBD设置',//CBD设置
    'LK_BOMDANXINXI': 'BOM单信息',//BOM单信息
    'LK_BDLLIEBIAO': 'BDL列表',//BDL列表
    'LK_AEKOHAO': 'Aeko号',//Aeko号
    'LK_QINGSHURULINGJIANHAO':'请输入零件号',//请输入零件号
    'LK_QINGSHURULINGJIANMING':'请输入零件名（中）',//请输入零件名（中）
    'LK_QINGTIANXIESHEJIKESHI':'请填写设计科室',//请填写设计科室
    'LK_QINGTIANXIEGONGCHENGSHI':'请填写工程师',//请填写工程师
    'LK_QINGTIANXIEXINXIDANLIUSHUIHAO':'请填写信息单流水号'//请填写信息单流水号

    /*
    <!------------------------------------------------------------------------>
    <!--                                                                   --->
    <!------------------------------------------------------------------------>
    */
    // 待补字段
    // 1.日志查看 2. CF控制员 3. 图纸和TP详情页 4. 物流标准 5. 入库器具长（mm）6. 入库器具宽（mm） 7. 入库器具装箱数 8.入库器具综合单价 9.入库器具返程折叠比 入库器具租金（RMB/DAY）10. 入库包装毛重（KG）11. 入库器具寿命 12. 入库基础年维修费率
    // 13. 箱内周转材料综合价格 14. 箱内周转材料综合寿命 15. 前段包装名称 16. 翻箱前器具长（mm）17. 翻箱前器具宽（mm）18.翻箱前器具高（mm）19.翻箱前器具数 20.翻箱前器具号 21.翻箱前器具类型 22.翻箱前器具综合单价（RMB）23. 翻箱前器具租金（RMB/DAY）
    // 24.翻箱前包装毛重（KG）25.翻箱前器具返程折叠比 26.翻箱前器具寿命 27.翻箱前基础年维修率 28.零件采购项目类型29.本轮报价截止时间30.普通轮次31.在线竞价32.本轮状态33.保存并创建34.导入时间35.读取有效BOM 36.询价图纸 37.请输入查询供应商名称,厂商...
    // 38.再新申请财务目标价 39.任务中心 40.场景名称/任务名称 41.逾期待办 42.今日待办 43.公共UI组件展示界面，基于element的二次封装，当前element版本 44.点击上传 45.发生时间 46.新件信息流水单号 47.设计工程师工号 48.项目车型 49.被替代零件 50.零件所属材料组LINIE部门 51.零件所属材料组中文名称 52.零件所属材料组德文名称 53.零件所属工艺编号
    // 54.参考零件名 55. SVW要求首次试模, 56. ⽤量
  })
}))