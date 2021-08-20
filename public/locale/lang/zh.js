(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
        typeof define === 'function' && define.amd ? define(['i18n'], factory) :
        (global = global || self, factory(window.i18n))
}(this, function(i18n) {
    'use strict'
    const oldLanguage = {
        '#':"#",
        'delete': "删除",
        "deleteSure":'您确定要执行删除操作吗？',
        "revokeSure":'您确定要执行撤回操作吗？',
        "submitSure":'您确定要执行提交操作吗？',
        "cancelSure":'您确定要取消吗？',
        "saveSure":'您确定要保存吗？',
        "nextSure":'您确定要进行下一步吗？请确定数据已经完全保存',
        "copyChosenSure":'您确定要复制选中的数据吗？',
        "exitEditSure":'您的数据没保存，确定要退出编辑吗？',
        "resetSure":'您确定要重置吗？',
        'all': '全部',
        'search': '搜索',
        'setting': '设置',
        'pagination': {
            'prev': '上一页',
            'next': '下一页',
            'goto': '前往',
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
            'RFQINQUIRE': '确认',
            'RFQRESET': '重置',
        },
        'partsprocure': {
            'PARTSPROCURENEWPROCUREMENTPROJECT': '零件采购项目管理',
            'PARTSPROCUREGENERATEFSGSNR': '生成零件采购项目号',
            'PARTSPROCURECANCELPARTSPURCHASE': '取消零件采购项目',
            'PARTSPROCUREBATCHMAINTENANCE': '批量维护',
            'PARTSPROCURESTARTINQUIRY': '启动询价',
            'PARTSPROCURETRANSFER': '转派',
            'PARTSPROCUREFSNFGSNFSPNR': '零件采购项目号',
            'PARTSPROCUREPARTNUMBER': '零件号',
            'PARTSPROCUREPARTNAMEZH': '零件名（中）',
            'PARTSPROCUREPARTNAMEDE': '零件名（德）',
            'PARTSPROCUREPURCHASINGFACTORY': '采购工厂',
            'PARTSPROCUREPARTITEMTYPE': '零件项目类型',
            'PARTSPROCUREVEHICLECATEGORIES': '车型大类',
            'PARTSPROCUREMODELPROJECT': '车型项目',
            'PARTSPROCUREPARTSTATUS': '零件状态',
            'PARTSPROCUREPARTSTATUSNAME': '零件采购项目状态',
            'PARTSPROCURESTATUS': '采购项目状态',
            'PARTSPROCUREINQUIRYBUYER': '询价采购员',
            'PARTSPROCURELINIE': 'LINIE',
            'PARTSPROCURECF': 'CF',
            'PARTSPROCURE': '请输入零件号，多个逗号分隔',
            'PLEENTER': '请输入',
            'CHOOSE': '请选择',
            "CF": 'CF',
            'SHOUGONGCAIGOUXIANGMUCHUANGJIAN': '手工采购项目创建', // 手工采购项目创建
            'FaSong': '发送', // 发送
            'CheHui': '撤回', // 撤回
            'LingJianHao': '零件号', // 零件号
            'FsnrGsnr': 'FSNR/GSNR', // FSNR/GSNR
            'GongYingShangMingCheng': '供应商名称', // 供应商名称
            'CbdCengJi': 'CBD层级', // CBD层级
            'ShiFouYiBaoCbd': '是否已报CBD', // 是否已报CBD
            'FaSongZhuangTai': '发送状态', // 发送状态
        },
        'partsignLanguage': {
            'XunYuanZhiXing': '寻源执行', //寻源执行
            'JinDuJianKong': '进度监控', //进度监控
            'LingJianQianShou': '新件信息单', //零件签收
            'CaiGouXiangMuJianLi': '零件采购项目', //采购项目建立
            'RfqguanLi': 'RFQ', //RFQ管理
            'DingDianGuanLi': '定点管理', //定点管理
            'RiZhi': '日志', //日志
            'LingJianHao': '零件号', //零件号
            'LingJianMingChengZH': '零件名称（中）', //零件名称（中）
            'SheJiKeShi': '设计科室', //设计科室
            'GongChengShi': '工程师', //工程师
            'CheXingXiangMu': '车型项目', //车型项目
            'XinXiDanFenLei': '信息单分类', //信息单分类
            'XinXiDanZhuangTai': '信息单状态', //信息单状态
            'XinXiDanLiuShuiHao': '信息单流水号', //信息单流水号
            'XunJiaZiLiaoZhuangTai': '询价资料状态', //询价资料状态
            'MeiCheYongLiangZhuangTai': '每车用量状态', //每车用量状态
            'QingShuRu': '请输入', //请输入
            'QingXuanZe': '请选择', //请选择
            'QueRen': '确认', //确认
            'ZhongZhi': '重置', //重置
            'XinJianXinXiDanQianShou': '新件信息单签收', //新件信息单签收
            'ZhuanPai': '转派', //转派
            'QianShou': '签收', //签收
            'TuiHui': '退回', //退回
            'LingJianMingZH': '零件名（中）', //零件名（中）
            'LingJianMingDE': '零件名（德）', //零件名（德）
            'XinXiDanLeiXing': '信息单类型', //信息单类型
            'XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu': '显示第    条到    条记录，共    条记录', //显示第    条到    条记录，共    条记录
            'ShangYiYe': '上一页', //上一页
            'XiaYiYe': '下一页', //下一页
            'QianWangYe': '前往    页' //前往    页
        },
        // 手工采购项目创建
        'createparts': {
            'ShouGongCaiGouXiangMuChuangJian': '手工采购项目创建', // 手工采购项目创建
            'GangCaiPiLiangCaiGou': '钢材批量采购', // 钢材批量采购
            'GangCaiYiCiXingCaiGou': '钢材一次性采购', // 钢材一次性采购
            'GongChangQianYi': '工厂迁移', // 工厂迁移
            'QingShuRuLingJianHao': '请输入零件号', // 请输入零件号
            'QingShuRuLingJianMingZhong': '请输入零件名(中)', // 请输入零件名(中)
            'QingShuRuLingJianMingDe': '请输入零件名(德)', // 请输入零件名(德)
            'QingXuanZeLingJianLaiYuan': '请选择零件来源', // 请选择零件来源
            'QingXuanZeLingJianZhuangTai': '请选择零件状态', // 请选择零件状态
            'LingJianHao': '零件号', // 零件号
            'LingJianMingZhong': '零件名(中)', // 零件名(中)
            'LingJianMingDe': '零件名(德)', // 零件名(德)
            'LingJianLaiYuan': '零件来源', // 零件来源
            'ChuangJianCaiGouXiangMu': '创建采购项目', // 创建采购项目
            'LingJianZhuangTai': '零件状态', // 零件状态
            'JiHuoShiJian': '激活时间', // 激活时间
            'CaoZuoRiZhi': '操作日志', // 操作日志
            'ChaKan': '查看', // 查看
            'QingXuanZeZhiShaoYiTiaoShuJu': '请选择至少一条数据', // 请选择至少一条数据
        },
        // 成本分析管理
        'costanalysismanage': {
            'ChengBenFenXiGuanLi': '成本分析管理', // 成本分析管理
            'ShuJuWeiHu': '数据维护', // 数据维护

            // 成本分析管理
            'RfqBianHao': 'RFQ编号', // RFQ编号
            'QingShuRuRfqBianHao': '请输入RFQ编号', // 请输入RFQ编号
            'RfqZhuangTai': 'RFQ状态', // RFQ状态
            'QingXuanZeRfqZhuangTai': '请选择RFQ状态', // 请选择RFQ状态
            'LingJianHao': '零件号', // 零件号
            'QingShuRuLingJianHao': '请输入零件号', // 请输入零件号
            'LingJianMing': '零件名', // 零件名
            'QingShuRuLingJianMing': '请输入零件名', // 请输入零件名
            'CheXingXiangMu': '车型项目', // 车型项目
            'QingXuanZeCheXingXiangMu': '请选择车型项目', // 请选择车型项目
            'Pca': 'PCA', // PCA
            'QingShuRuPca': '请输入PCA', // 请输入PCA
            'Tia': 'TIA', // TIA
            'QingShuRuTia': '请输入TIA', // 请输入TIA
            'HeavyItem': 'Heavy Item', // Heavy Item
            'QingXuanZeHeavyItem': '请选择Heavy Item', // 请选择Heavy Item
            'Commodity': 'COMMODITY', // COMMODITY
            'QingXuanZeCommodity': '请选择COMMODITY', // 请选择COMMODITY
            'Linie': 'LINIE', // LINIE
            'QingXuanZeLinie': '请选择LINIE', // 请选择LINIE
            'RfqLieBiao': 'RFQ列表', // RFQ列表
            'RfqMingCheng': 'RFQ名称', // RFQ名称
            'RfqLeiXing': 'RFQ类型', // RFQ类型
            'ChuangJianRiQi': '创建日期', // 创建日期
            'DangQianLunCi': '当前轮次', // 当前轮次
            'BaoJiaJieZhiRiQi': '报价截止日期', // 报价截止日期
            'XunJiaCaiGouYuan': '询价采购员', // 询价采购员
            'JiShuZiLiao': '技术资料', // 技术资料
            'Cbd': 'CBD', // CBD
            'FenXiBaoGao': '分析报告', // 分析报告
            'FaSongShiJian':'发送时间', // 发送时间
            'XiaZai': '下载', // 下载

            // 数据维护
            'RenGongChengBenShuJuWeiHu': '人工成本数据维护', // 人工成本数据维护
            'DaoChu': '导出', // 导出
            'ShangChuan': '上传', // 上传
            'ShanChu': '删除', // 删除
            'ShangChuanWenJianMingCheng': '上传文件名称', // 上传文件名称
            'DaXiao': '大小', // 大小
            'ShiJian': '时间', // 时间
            'ShangChuanRen': '上传人', // 上传人
            'BeiZhu': '备注', // 备注

            // rfq详情
            'BenLunZhuangTai': '本轮状态', // 本轮状态
            'BenLunBaoJiaJieZhiRi': '本轮报价截止日', // 本轮报价截止日
            'LunCiLeiXing': '轮次类型', // 轮次类型

            // 零件清单
            'LingJianQingDan': '零件清单', // 零件清单
            'BaoCun': '保存', // 保存
            'XiaZaiJiShuZiLiao': '下载技术资料', // 下载技术资料
            'XiaZaiCbd': '下载CBD', // 下载CBD
            'FsnfGsnfSpnr': 'FSNF/GSNF/SPNR', // FSNF/GSNF/SPNR
            'LingJianMingZhong': '零件名(中)', // 零件名(中)
            'LingJianMingDe': '零件名(德)', // 零件名(德)
            'CaiGouGongChang': '采购工厂', // 采购工厂
            'LingJianXiangMuLeiXing': '零件项目类型', // 零件项目类型
            'CheXingDaLei': '车型大类', // 车型大类
            'RfqLunCi': 'RFQ轮次', // RFQ轮次
            'GongYingShang': '供应商', // 供应商
            'PcaFenXiJieGuo': 'PCA分析结果', // PCA分析结果
            'TiaFenXiJieGuo': 'TIA分析结果', // TIA分析结果
            'QingXuanZeXuYaoBaoCunDeShuJu': '请选择需要保存的数据', // 请选择需要保存的数据
            'SavePcaResAndTiaResTips': '请填写完整PCA分析结果和TIA分析结果', // 请填写完整PCA分析结果和TIA分析结果

            'BaoGaoQingDan':'报告清单',// 报告清单

            // 成本分析
            'ChengBenFenXi': '成本分析', // 成本分析
            'FanHui': '返回', // 返回
            'WenJianMingCheng': '文件名称', // 文件名称
            'ShangChuanRiQi': '上传日期', // 上传日期
            'QingXuanZeXuYaoXiaZaiDeWenJian': '请选择需要下载的文件', // 请选择需要下载的文件
            'QingXuanZeXuYaoShanChuDeWenJian': '请选择需要删除的文件', // 请选择需要删除的文件
        },
        /*
        <!------------------------------------------------------------------------>
        <!--                                                                   --->
        <!------------------------------------------------------------------------>
        */
        'supplierkpi':{
            'SUPPLIERRESULT':'供应商筛选结果',
            'TOTAL':'总分',
            'fuwuzhilian':'服务质量',
            'chengben':'成本',
            'jiaofu':'交付',
            'bumen':'所属部门',
            'cailiao':'材料组',
            'gongyingshangmincheng':'供应商名称'
        },
        'LK_CAIGOUFENEFENPEIDABUDAO': '采购份额分配达不到100%', // 采购份额分配达不到100%
        'LK_CAIGOUGONGCHNEGMINGCHENG': '采购工厂名称', // 采购工厂名称
        'LK_CAOZUOCHENGGONG': '操作成功', // 操作成功
        'LK_CHANLIANGZHANBI': '产量占比（%）', // 产量占比（%）
        'LK_CAIGOUFENEFENPEIWEIDADAO': '当前分配未达到100%，请重新分配！', // 当前分配未达到100%，请重新分配！
        'LK_CAIGOUFENEFENPEIWEIDADAODANGQIAN': '当前分配未达到100%当前分配的工厂中存在为0的情况，请重新分配！', // 当前分配未达到100%，请重新分配！
        'LK_CAIGOUFENEFENPEICHAOGUO': '当前分配已超过100%，请重新分配！', // 当前分配已超过100%，请重新分配！
        'LK_DENGLU': '登录', // 登录
        'LK_GONG': '共', // 共
        'LK_MEIYOUKEYIXIAZHAIDEXINXI': '没有可以下载的信息', // 没有可以下载的信息
        'LK_MIMA': '密码', // 密码
        'LK_HAIWEIXUANZHEGONGCHANG': '您还未选择工厂！', // 您还未选择工厂！
        "LK_NHWXZBDL":"您还未选择BDL",
        'LK_QINGCHU': '清除', // 清除
        'LK_QINGTIANXIELIYOUSHURUKUANGBITIAN': '请填写理由，该输入框为必填', // 请填写理由，该输入框为必填
        'LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI': '请选择每车用量状态', // 请选择每车用量状态
        'LK_QINGXUANZHEXIANCAILIAOZU': '请选择先材料组', // 请选择先材料组
        'LK_QINGXUANZHEXINXIDANZHUANGTAI': '请选择信息单状态', // 请选择信息单状态
        'LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG': '请选择需要导出的每车用量', // 请选择需要导出的每车用量
        'LK_QINGXUANZHEXUYAODAOCHURIZHI': '请选择需要导出的日志', // 请选择需要导出的日志
        'LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN': '请选择需要删除的附件', // 请选择需要删除的附件
        'LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN': '请选择需要下载的附件', // 请选择需要下载的附件
        'LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN': '请选择需要下载文件', // 请选择需要下载文件
        'LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU': '请选择需要修改的零件采购项目', // 请选择需要修改的零件采购项目
        'LK_QINGXUANZHEXUNJIACAIGOUYUAN': '请选择询价采购员', // 请选择询价采购员
        'LK_QINGXUANZHEXUNJIAZILIAOZHUANGTAI': '请选择询价资料状态', // 请选择询价资料状态
        'LK_QINGXUANZHEYITIAOJIHUAGENGXIN': '请选择一条计划更新至询价产量', // 请选择一条计划更新至询价产量
        'LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN': '请选择一条需要确认的版本', // 请选择一条需要确认的版本
        'LK_QUESHICAILIAOZUBIANHAOETC': '缺失材料组编号，请先设置零件对应的材料组', // 缺失材料组编号，请先设置零件对应的材料组
        'LK_QUESHIYOUXIAODEGONGYIZUID': '缺失有效的工艺组id', // 缺失有效的工艺组id
        'LK_QUESHIYOUXIAODELINGJIANBIANHAO': '缺失有效的零件编号', // 缺失有效的零件编号
        'LK_SHANCHUCHENGGONG': '删除成功', // 删除成功
        'LK_SHANGCHUAN': '上传', // 上传
        'LK_SHANGCHUANCHENGGONG': '上传成功', // 上传成功
        'LK_SHANGCHUANSHIBAI': '上传失败', // 上传失败
        'LK_TIAODI': '条到第', // 条到第
        'LK_TIAOJILU': '条记录', // 条记录
        'LK_XIANSHI': '显示', // 显示
        'LK_XINJIANXINXIDANTUIHUI': '新件信息单退回', // 新件信息单退回
        'LK_YIQIANSHOU': '已签收', // 新件信息单退回
        'LK_XINJIANXINXIDANZHUANPAI': '新件信息单转派', // 新件信息单转派
        'LK_XIUGAICHENGGONG': '修改成功', // 修改成功
        'LK_YITUIHUI': '已退回', // 以退回
        'LK_YONGHUMING': '用户名', // 用户名
        'LK_ZHUANPAICHENGGONG': '转派成功', // 转派成功
        'LK_AEKOHAO': 'AEKO号', //AEKO号
        'LK_XINDEAEKOHAO': 'AEKO号',    //  AEKO号
        'LK_BDLLIEBIAO': 'BDL列表', //BDL列表
        'LK_BMG': 'BMG', //BMG
        'LK_BOMDANXINXI': 'BOM单信息', //BOM单信息
        'LK_CBDSHEZHI': 'CBD设置', //CBD设置
        'LK_CBDXUANZE': 'CBD选择', //CBD选择
        'LK_CFFUZEREN': 'CF负责人', //CF负责人
        'LK_CFKONGZHIYUAN': 'CF控制员', //CF控制员
        'LK_CS_1BEIZHU': 'CS*1备注', //CS*1备注
        'LK_CS_1SHANGHUIBEIZHU': 'CS*1上会备注', //CS*1上会备注
        'LK_CSFPFUZEREN': 'CSF（P）负责人', //CSF（P）负责人
        'LK_FS_GSHAO': 'FS/GS号', //FS/GS号
        'LK_FSHAO': 'FS号', //FS号
        'LK_INBOUNDWULIUFANGSHI': 'INBOUND物流方式', //INBOUND物流方式
        'LK_XINDELINIE': 'Linie',
        'LK_LINIE': 'Linie', //Linie
        'LK_LINIEBEIZHU': 'Linie备注', //Linie备注
        'LK_LINIEBUMEN': 'LINIE部门', //LINIE部门
        'LK_LINIESHANGHUIBEIZHU': 'Linie上会备注', //Linie上会备注
        'LK_MBDL': 'MBDL', //MBDL
        'LK_MQPINGFENZHUANGTAI': 'MQ评分', //MQ评分状态
        'LK_MTZLINGJIAN': 'MTZ零件', //MTZ零件
        'LK_RFQBIANHAO': 'RFQ编号', //RFQ编号
        'LK_RFQGUANLI': 'RFQ', //RFQ管理
        'LK_RFQLEIXING': 'RFQ类型', //RFQ类型
        'LK_RFQLIST': 'RFQ列表', //RFQ列表
        'LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG': 'RFQ零件或者RFQ供应商为空，不能创建RFQ轮次', //RFQ零件或者RFQ供应商为空，不能创建RFQ轮次
        'LK_RFQMINGCHENG': 'RFQ名称', //RFQ名称
        'LK_RFQMINGCHNEGBUNENGWEIKONG': 'RFQ名称不能为空', //RFQ名称不能为空
        'LK_RFQZHUANGTAI': 'RFQ状态', //RFQ状态
        'LK_RFQZONGHEGUANLI': 'RFQ综合管理', //RFQ综合管理
        'LK_RWJIA': 'RW价', //RW价
        'LK_SAICVOLKSWAGENKONGXIANGCAOZUO_XIAOSHI': 'SAIC VOLKSWAGEN空箱操作_小时', //SAIC VOLKSWAGEN空箱操作_小时
        'LK_SAICVOLKSWAGENKUCUN_XIAOSHI': 'SAIC VOLKSWAGEN库存_小时', //SAIC VOLKSWAGEN库存_小时
        'LK_SOPRIQI': 'SOP日期', //SOP日期
        'LK_SUM': 'SUM', //SUM
        'LK_SVWYAOQIUEMZHOU': 'SVW要求EM（周）', //SVW要求EM（周）
        'LK_SVWSHIMO': 'SVW要求首次试模', //SVW要求EM（周）
        'LK_SVWYAOQIUOTSZHOU': 'SVW要求OTS（周）', //SVW要求OTS（周）
        'LK_SVWYAOQIUSHOUCISHIMO': 'SVW要求首次试模', //SVW要求首次试模
        'LK_SWHAO': 'SVW号', //sw号
        'LK_TPPINGFENZHUANGTAI': 'EP评分', //TP评分状态
        'LK_BANBENHAO': '版本号', //版本号
        'LK_BANBENZHUANGTAI': '版本状态', //版本状态
        'LK_BAOZHUANGFUZEREN': '包装负责人', //包装负责人
        'LK_BAOCUN': '保存', //保存
        'LK_BAOCUNBINGCHUANGJIAN': '保存并创建', //保存并创建
        'LK_BAOJIAJIEZHIRIQI': '截止日期', //报价截止日期
        'LK_RFQQUOTATIONDEADLINE': '截止日期', //报价截至日期
        'LK_NINDANGQIANHAIWEIXUANZE': '抱歉！您当前还未选择！', //抱歉！您当前还未选择！
        'LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN': '抱歉！您当前还未选择询价采购员！', //抱歉！您当前还未选择询价采购员！
        'LK_BEIZHUBUNENGWEIKONG': '抱歉，备注不能为空！', //抱歉，备注不能为空！
        'LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU': '抱歉，此处必须选择一条工艺组数据', //抱歉，此处必须选择一条工艺组数据
        'LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA': '抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！', //抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！
        'LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA': '抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！', //抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！
        'LK_LIYOUBUNENGWEIKONG': '抱歉，理由不能为空！', //抱歉，理由不能为空！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOQIANSHOUDEXINXIDAN': '抱歉，您当前还未选择您需要签收的信息单！', //抱歉，您当前还未选择您需要签收的信息单！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU': '抱歉，您当前还未选择您需要取消的零件采购项目！', //抱歉，您当前还未选择您需要取消的零件采购项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU': '抱歉，您当前还未选择您需要生成FS号的零件采购项目！', //抱歉，您当前还未选择您需要生成FS号的零件采购项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU': '抱歉，您当前还未选择您需要生批量维护的项目！', //抱歉，您当前还未选择您需要生批量维护的项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOTUIHUIDEXINXIDAN': '抱歉，您当前还未选择您需要退回的信息单！', //抱歉，您当前还未选择您需要退回的信息单！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU': '抱歉，您当前还未选择您需要转派的零件采购项目！', //抱歉，您当前还未选择您需要转派的零件采购项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU': '抱歉，您当前还未选择您需要转派的评分任务！', //抱歉，您当前还未选择您需要转派的评分任务！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEXINXIDAN': '抱歉，您当前还未选择您需要转派的信息单！', //抱歉，您当前还未选择您需要转派的信息单！
        'LK_NINDANGQIANHAIWEIXUANZERENWU': '抱歉，您当前还未选择任务！', //抱歉，您当前还未选择任务！
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU': '抱歉，您当前还未选择需要启动询价的采购项目！', //抱歉，您当前还未选择需要启动询价的采购项目！
        "LK_NOTCHOUSEDELETEPROJECT":"抱歉！您还未选择您需要删除的采购项目。",
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU': '抱歉，您当前还未选择需要申请目标价的采购项目！', //抱歉，您当前还未选择需要申请目标价的采购项目！
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU': '抱歉，您当前还未选择需要添加的采购项目！', //抱歉，您当前还未选择需要添加的采购项目！
        'LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU': '抱歉，您选中的单据中存在已签收的信息单，不能批量签收！', //抱歉，您选中的单据中存在已签收的信息单，不能批量签收！
        'LK_YONGHUMINGHUOMIMABUNENGWEIKONG': '抱歉，用户名或密码不能为空！', //抱歉，用户名或密码不能为空！
        'LK_BEIZHU': '备注', //备注
        'LK_BEIZHUXINXI': '备注信息', //备注信息
        'LK_BEIDAITILINGJIAN': '被代替零件', //被代替零件
        'LK_BEITIDAILINGJIAN': '被替代零件 ', //被替代零件
        'LK_BENLUNBAOJIAJIEZHISHIJIAN': '本轮报价截止时间', //本轮报价截止时间
        'LK_BENLUNBAOJIAQIZHISHIJIAN': '本轮报价起止时间', //本轮报价起止时间
        'LK_BENLUNZHUANGTAI': '本轮状态', //本轮状态
        'LK_BIANHAO': '编号', //编号
        'LK_BIANJI': '编辑', //编辑
        'LK_BIANSUXIANGLEIXING': '变速箱类型', //变速箱类型
        'LK_BIANSUXIANGPEIZHI': '变速箱配置', //变速箱配置
        'LK_BUNENGSHANCHUZHISHAOBAOLIUYITIAO': '不能删除，至少保留一条!', //不能删除，至少保留一条!
        'LK_BUMENBIANHAO': '部门编号', //部门编号
        'LK_BUMENPINGFENLEIXING': '部门评分类型', //部门评分类型
        'LK_CAILIAO': '材料', //材料
        'LK_CAILIAOGONGYIZUMINGCHENGDE': '材料工艺组名称（德）', //材料工艺组名称（德）
        'LK_CAILIAOGONGYIZUMINGCHENGZHONG': '材料工艺组名称（中）', //材料工艺组名称（中）
        'LK_CAILIAOZU': '材料组', //材料组
        'LK_CAILIAOZULINEBUMEN': '材料组LINE部门', //材料组LINE部门
        'LK_CAILIAOZUBIANHAO': '材料组编号', //材料组编号
        'LK_CAILIAOZUGONGYIBIANHAO': '材料组工艺编号', //材料组工艺编号
        'LK_CAILIAOZUGONGYISHEZHI': '材料组工艺设置', //材料组工艺设置
        'LK_CAILIAOZUMINGCHENGDE': '材料组名称（德）', //材料组名称（德）
        'LK_CAILIAOZUMINGCHENGZHONG': '材料组名称（中）', //材料组名称（中）
        'LK_CAILIAOZUXINXI': '材料组信息', //材料组信息
        'LK_CF': '财务控制员', //财务控制员
        'LK_CAIWUMUBIAOJIA': '财务目标价', //财务目标价
        'LK_CAIGOUGONGCHANG': '生产工厂', //采购工厂
        'LK_CAIGOUTIAOKUAN': '采购条款', //采购条款
        'LK_CAIGOUXIANGMUJIANLI': '零件采购项目', //采购项目建立
        'LK_CAIGOUXIANGMUXINXI': '采购项目信息', //采购项目信息
        'LK_CAIGOUYUANGONGHAO': '采购员工号', //采购员工号
        'LK_CANKAOBAOZHUANG': '参考包装', //参考包装
        'LK_CANKAOBAOZHUANGDANJIAYUAN': '参考包装单价（元）', //参考包装单价（元）
        'LK_CANKAOBAOZHUANGGAOMM': '参考包装高（mm）', //参考包装高（mm）
        'LK_CANKAOBAOZHUANGKUANMM': '参考包装宽（mm）', //参考包装宽（mm）
        'LK_CANKAOBAOZHUANGQIJULEIXING': '参考包装器具类型', //参考包装器具类型
        'LK_CANKAOBAOZHUANGZHANGMM': '参考包装长(mm)', //参考包装长(mm)
        'LK_CANKAOCHANLIANGJISHIJIANJIHUA': '参考产量及时间计划', //参考产量及时间计划
        'LK_CANKAOCHEXING': '参考车型', //参考车型
        'LK_CANKAOLINGJIANHAO': '参考零件号', //参考零件号
        'LK_CANKAOLINGJIANMING': '参考零件名 ', //参考零件名
        'LK_CAOZUO': '操作', //操作
        'LK_CAOZUOREN': '操作人', //操作人
        'LK_UpdateDate': '操作时间', //操作时间
        'LK_CHAKAN': '查看', //查看!
        'LK_CHAKANQUANBUBANBEN': '查看全部版本', //查看全部版本
        'LK_INQUIRE': '查询', //查询
        'LK_CHAZHAOGONGYIZUGONGYINGSHANG': '查找工艺组供应商', //查找工艺组供应商
        'LK_CHAIFENCAIGOUGONGCHANG': '拆分采购工厂', //拆分采购工厂
        'LK_CHANLIANGPC': '产量（PC）', //产量（PC）
        'LK_CHANGJIANGMINGCHNEG': '场景名称/任务名称', //场景名称/任务名称
        'LK_CHANGJINGMINGCHENGRENWUMINGCHENG': '场景名称/任务名称 ', //场景名称/任务名称
        'LK_CHEXING': '车型', //车型
        'LK_CHEXINGDALEI': '车型大类', //车型大类
        'LK_CHEXINGDENGJI': '车型等级', //车型等级
        'LK_CHEXINGSHENGCHANNIANXIAN': '车型生产年限', //车型生产年限
        'LK_CHEXINGXIANGMU': '车型项目', //车型项目
        'LK_CHEXINGXIANGMU0S': '车型项目0S', //车型项目0S
        'LK_CHEXINGXIANGMUPVS': '车型项目PVS', //车型项目PVS
        'LK_CHEXINGXIANGMUSOP': '车型项目SOP', //车型项目SOP
        'LK_CHEXINGXIANGMUMINGCHENG': '车型项目名称', //车型项目名称
        'LK_CHEHUI': '撤回', //撤回
        'LK_CHENGBEN': '成本', //成本
        'LK_CHICUN': '尺寸', //尺寸
        'LK_CHUANGJIANRENGONGHAO': '创建人工号', //创建人工号
        'LK_CHUANGJIANRENXINGMING': '创建人姓名', //创建人姓名
        'LK_CHUANGJIANRIQI': '创建日期', //创建日期
        'LK_CHUANGJIANSHIJIAN': '创建时间', //创建时间
        'LK_CONGLINGJIANPAISHENG': '从零件派生', //从零件派生
        'LK_DAXIAOMB': '大小（MB）', //大小（MB）
        'LK_DAXIAO': '大小', // 大小
        'LK_DAIBANSHIXIANG': '待办事项', //待办事项
        'LK_DAIQUERENBANBEN': '待确认版本', //待确认版本
        'LK_DANWEI': '价格单位', //单位
        'LK_DANGQIANBANBEN': '当前版本', //当前版本
        'LK_DANGQIANLUNCI': '当前轮次', //当前轮次
        'LK_DAORUSHIJIAN': '导入时间', //导入时间
        'LK_DENGJIPEIZHI': '等级配置', //等级配置
        'LK_DIANJISHANGCHUAN': '点击上传 ', //点击上传
        'LK_DIANCHIRONGLIANG': '电池容量', //电池容量
        'LK_DIANCHIYONGLIANG': '电池用量', //电池用量
        'LK_DINGDIANGUANLI': '定点管理', //定点管理
        'LK_DUQUYOUXIAODOM': '读取有效BOM', //读取有效BOM
        'LK_DUQUYOUXIAOBOM': '读取有效BOM ', //读取有效BOM
        'LK_FACHUXUNJIA': '发出询价', //发出询价
        'LK_FADONGJILEIXING': '发动机类型', //发动机类型
        'LK_FADONGJIPEIZHI': '发动机配置', //发动机配置
        'LK_FASHENGSHIJIAN': '发生时间', //发生时间
        'LK_FASONGXUNJIA': '发送询价', //发送询价
        'LK_FASONGZHIWODEYOUXIANG': '发送至我的邮箱', //发送至我的邮箱
        'LK_FANXIANGQIANBAOZHUANGMAOZHONGKG': '翻箱前包装毛重（KG）', //翻箱前包装毛重（KG）
        'LK_FANXIANGQIANJICHUNIANWEIXIULÜ': '翻箱前基础年维修率 ', //翻箱前基础年维修率
        'LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI': '翻箱前器具返程折叠比 ', //翻箱前器具返程折叠比
        'LK_FANXIANGQIANQIJUGAOMM': '翻箱前器具高（mm）', //翻箱前器具高（mm）
        'LK_FANXIANGQIANQIJUHAO': '翻箱前器具号 ', //翻箱前器具号
        'LK_FANXIANGQIANQIJUKUANMM': '翻箱前器具宽（mm）', //翻箱前器具宽（mm）
        'LK_FANXIANGQIANQIJULEIXING': '翻箱前器具类型 ', //翻箱前器具类型
        'LK_FANXIANGQIANQIJUSHOUMING': '翻箱前器具寿命 ', //翻箱前器具寿命
        'LK_FANXIANGQIANQIJUSHU': '翻箱前器具数 ', //翻箱前器具数
        'LK_FANXIANGQIANQIJUZHANGMM': '翻箱前器具长（mm）', //翻箱前器具长（mm）
        'LK_FANXIANGQIANQIJUZONGHEDANJIARMB': '翻箱前器具综合单价（RMB）', //翻箱前器具综合单价（RMB）
        'LK_FANXIANGQIANQIJUZUJINRMBDAY': '翻箱前器具租金（RMB/DAY）', //翻箱前器具租金（RMB/DAY）
        'LK_FANHUI': '返回', //返回
        'LK_FUZEREN': '负责人', //负责人
        'LK_FUZERENDIANHUA': '负责人电话', //负责人电话
        'LK_FUZERENYOUXIANG': '负责人邮箱', //负责人邮箱
        'LK_FUJIANLIEBIAO': '附件列表', //附件列表
        'LK_GENGXINYUANYIN': '更新原因', //更新原因
        'LK_GENGXINZHIXUNJIACHANLIANG': '更新至询价产量', //更新至询价产量
        'LK_GONGCHENGSHI': '工程师', //工程师
        'LK_GONGYI': '工艺', //工艺
        'LK_GONGYIHAO': '工艺号', //工艺号
        'LK_SHENGMINGJISHUBANBEN': '公共UI组件展示界面，基于element的二次封装，当前element版本', //公共UI组件展示界面，基于element的二次封装，当前element版本
        'LK_GONGGONGUIZUJIANZHANSHIJIEMIANJIYUELEMENTDEERCIFENGZHUANGDANGQIANELEMENTBANBEN': '公共UI组件展示界面，基于element的二次封装，当前element版本 ', //公共UI组件展示界面，基于element的二次封装，当前element版本
        'LK_GONGHUOFANGSHI': '供货方式', //供货方式
        'LK_GONGYINGSHANG360SHITU': '供应商360°视图', //供应商360°视图
        'LK_GONGYINGSHANGSAPHAO': '供应商SAP号', //供应商SAP号
        'LK_GONGYINGSHANGTIMELINE': '供应商timeline', //供应商timeline!
        'LK_GONGYINGSHANGCAILIAOZHUNBEI': '供应商材料准备', //供应商材料准备
        'LK_GONGYINGSHANGCHANPINGAIYAO': '供应商产品概要', //供应商产品概要!
        'LK_GONGYINGSHANGGONGSIJIESHAO': '供应商公司介绍', //供应商公司介绍!
        'LK_GONGYINGSHANGMING': '供应商名', //供应商名
        'LK_SAPHAO': 'SAP号', // SAP号
        'LK_GONGYINGSHANGMINGCHENG': '供应商名称', //供应商名称
        'LK_GONGYINGSHANGPINGFEN': '供应商评分', //供应商评分
        'LK_GONGYINGSHANGPINGFENFUJIAN': '供应商评分附件', //供应商评分附件
        'LK_GONGYINGSHANGSHENGCHANCHANGDI': '供应商工厂地址', //供应商工厂地址
        'LK_HUIYIDIDIAN': '会议地点', //会议地点
        'LK_HUIYIJIBENXINXI': '会议基本信息', //会议基本信息
        'LK_HUIYIQITAXINXI': '会议其它信息', //会议其它信息
        'LK_HUIYISHIJIAN': '会议时间', //会议时间
        'LK_HUOBI': '货币', //货币
        'LK_JICHUXINXI': '基础信息', //基础信息
        'LK_JISHUJIAOLIUHUI': '技术交底会', //技术交底会
        'LK_EP': '技术评分人', //技术评分人
        'LK_JIAGEMINGXI': '价格明细', //价格明细
        'LK_JIAOFU': '交付', //交付
        'LK_JIESHUBENLUNXUNJIA': '结束本轮询价', //结束本轮询价
        'LK_JIESHUXIANGMU': '结束项目', //结束项目
        'LK_JINRIDAIBAN': '今日待办 ', //今日待办
        'LK_JINDUJIANKONG': '进度监控', //进度监控
        'LK_JUJUE': '拒绝', //拒绝
        'LK_KAISHINIANFEN': '开始年份', //开始年份
        'LK_LISHISHIYONGGAILÜ': '历史适用概率', //历史适用概率
        'LK_LIRUMENJING': '例如：⻔禁申请步骤，其他备注信息等', //例如：⻔禁申请步骤，其他备注信息等
        'LK_LINGJIANCAIGOUXIANGMU': '零件采购项目', //零件采购项目
        'LK_LINGJIANCAIGOUXIANGMUGUANLI': '零件采购项目管理', //零件采购项目管理
        'LK_LINGJIANCAIGOUXIANGMULEIXING': '零件采购项目类型', //零件采购项目类型
        "LK_LINGJIANCAIGOUXIANGMUZHUANPAI": '零件采购项目转派', //零件采购项目转派
        'LK_LINGJIANCHANLIANG': '零件产量', //零件产量
        'LK_LINGJIANCHANLIANGJIHUA': '零件产量计划', //零件产量计划
        'LK_LINGJIANCHANLIANGJILU': '零件产量记录', //零件产量记录
        'LK_LINGJIANHAO': '零件号', //零件号
        'LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN': '零件号/FSNR/RFQ编号/采购员', //零件号/FSNR/RFQ编号/采购员
        'LK_LINGJIANHAODIERBUFEN': '零件号第二部分', //零件号第二部分
        'LK_LINGJIANHAODISANBUFEN': '零件号第三部分', //零件号第三部分
        'LK_LINGJIANHAODISIBUFEN': '零件号第四部分', //零件号第四部分
        'LK_LINGJIANHAODIWUBUFEN': '零件号第五部分', //零件号第五部分
        'LK_LINGJIANHAODIYIBUFEN': '零件号第一部分', //零件号第一部分
        'LK_LINGJIANJIAGONGCHENGDUDE': '零件加工程度(德)', //零件加工程度(德)
        'LK_LINGJIANJIAGONGCHENGDUYING': '零件加工程度(英)', //零件加工程度(英)
        'LK_LINGJIANJIAGONGCHENGDUZHONG': '零件加工程度(中)', //零件加工程度(中)
        'LK_LINGJIANJIAGONGCHENGDUDAIMA': '零件加工程度代码', //零件加工程度代码
        'LK_LINGJIANLEIXING': '零件类型', //零件类型
        'LK_LINGJIANLEIXINGDAIMA': '零件类型代码', //零件类型代码
        'LK_LINGJIANMAOYISHUXINGDAIMA': '零件贸易属性代码', //零件贸易属性代码
        'LK_LINGJIANMAOYISHUXINGMIAOSHUDE': '零件贸易属性描述(德)', //零件贸易属性描述(德)
        'LK_LINGJIANMAOYISHUXINGMIAOSHUYING': '零件贸易属性描述(英)', //零件贸易属性描述(英)
        'LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG': '零件贸易属性描述(中)', //零件贸易属性描述(中)
        'LK_LINGJIANMEICHEYONGLIANG': '零件每车用量', //零件每车用量
        'LK_LINGJIANMINGDE': '零件名（德）', //零件名（德）
        'LK_LINGJIANMINGYING': '零件名（英）', //零件名（英）
        'LK_LINGJIANMINGZHONG': '零件名（中）', //零件名（中）
        'LK_LINGJIANMINGCHENG': '零件名称', //零件名称
        'LK_LINGJIANMINGCHENGDE': '零件名称（德）', //零件名称（德）
        'LK_LINGJIANMINGCHENGZHONG': '零件名称（中）', //零件名称（中）
        'LK_LINGJIANPINGTAIXINGZHIDAIMA': '零件平台性质代码', //零件平台性质代码
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE': '零件平台性质描述(德)', //零件平台性质描述(德)
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING': '零件平台性质描述(英)', //零件平台性质描述(英)
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG': '零件平台性质描述(中)', //零件平台性质描述(中)
        'LK_LINGJIANPINGFEN': '零件评分', //零件评分
        'LK_LINGJIANQIANSHOU': '新件信息单', //零件签收
        'LK_LINGJIANQINGDAN': '零件清单', //零件清单
        'LK_LINGJIANSUOSHUCAILIAOZULINIEBUMEN': '零件所属材料组LINIE部门 ', //零件所属材料组LINIE部门
        'LK_LINGJIANSUOSHUCAILIAOZUDEWENMINGCHENG': '零件所属材料组德文名称 ', //零件所属材料组德文名称
        'LK_LINGJIANSUOSHUCAILIAOZUZHONGWENMINGCHENG': '零件所属材料组中文名称 ', //零件所属材料组中文名称
        'LK_LINGJIANSUOSHUGONGYIBIANHAO': '零件所属工艺编号', //零件所属工艺编号
        'LK_LINGJIANXIANGMULEIXING': '零件项目类型', //零件项目类型
        'LK_LINGJIANYANYONGXINGZHIDAIMA': '零件沿用性质代码', //零件沿用性质代码
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUDE': '零件沿用性质描述(德)', //零件沿用性质描述(德)
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUYING': '零件沿用性质描述(英)', //零件沿用性质描述(英)
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG': '零件沿用性质描述(中)', //零件沿用性质描述(中)
        'LK_LINGJIANZHUANGTAI': '零件状态', //零件状态
        'LK_LUNCILEIXING': '轮次类型', //轮次类型
        'LK_MAOZHONGKG': '毛重（KG）', //毛重（KG）
        'LK_MEICHEYONGLIANG': '每车用量', //每车用量
        'LK_MEICHEYONGLIANGZHUANGTAI': '每车用量状态', //每车用量状态
        'LK_MOJUYUSUANSHENQING': '模具预算申请', //模具预算申请
        'LK_MUBIAOJIA': '目标价', //目标价
        'LK_MUBIAOJIAZHUANGTAI': 'F-Target', //目标价状态
        'LK_NIANFEN': '年份', //年份
        'LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU': '您是否确认对新件信息单进行签收？', //您是否确认对新件信息单进行签收？
        'LK_PEIZHIBILI': '配置比例', //配置比例
        'LK_PEIZHIBIANMA': '配置编码', //配置编码
        'LK_PILIANGWEIHU': '批量维护', //批量维护
        'LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU': '批量维护零件采购项目', //批量维护零件采购项目
        'LK_PINGFEN': '评分', //评分
        'LK_PINGFENREN': '评分人', //评分人
        'LK_PUTONGLUNCI': '普通轮次', //普通轮次
        'LK_QIWANGMUBIAOJIA': '期望目标价', //期望目标价
        'LK_QITAPEIZHI': '其他配置', //其他配置
        'LK_QITAXINXI': '其他信息', //其他信息
        'LK_QIDONGXIANGMU': '启动项目', //启动项目
        'LK_QIDONGXUNJIA': '启动询价', //启动询价
        'LK_QIANSHOU': '签收', //签收
        'LK_QIANSHOUQUEREN': '签收确认', //签收确认
        'LK_QIANSHOURIQI': '签收日期', //签收日期
        'LK_QIANDUANBAOZHUANGMINGCHENG': '前段包装名称 ', //前段包装名称
        'LK_QINGSHURU': '请输入', //请输入
        'LK_QINGSHURUBEIZHU': '请输入备注', //请输入备注
        'LK_RFQPLEASEENTERQUERY': '请输入查询', //请输入查询
        'LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG': '请输入查询供应商名称', //请输入查询供应商名称
        'LK_QINGSHURUCHAXUNGONGYINGSHANGMINGCHENGCHANGSHANG': '请输入查询供应商名称,厂商...', //请输入查询供应商名称,厂商...
        'LK_QINGSHURULINGJIANHAO': '请输入零件号', //请输入零件号
        'LK_QINGSHURULINGJIANMING': '请输入零件名（中）', //请输入零件名（中）
        'LK_QINGTIANJIAGONGYINGSHANG': '请添加供应商!', //请添加供应商!
        'LK_QINGTIANXIEGONGCHENGSHI': '请填写工程师', //请填写工程师
        'LK_QINGTIANXIESHEJIKESHI': '请填写设计科室', //请填写设计科室
        'LK_QINGTIANXIEXINXIDANLIUSHUIHAO': '请填写信息单流水号', //请填写信息单流水号
        'LK_QINGXUANZE': '请选择', //请选择
        "LK_QINGXUANZHECHEXINGXIANGMU": '请选择车型项目', //请选择车型项目
        "LK_QINGXUANZHEXINXIFENLEI": '请选择信息分类', //请选择信息分类
        'LK_QINGXUANZHEXUYAODAOCHUBANBEN': '请选择需要导出的版本', //请选择需要导出的版本
        'LK_QINGXUANZHEXUYAODAOCHUSHUJU': '请选择需要导出的数据', //请选择需要导出的数据
        'LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN': '请选择一个需要下载的版本', //请选择一个需要下载的版本
        'LK_QUXIAO': '取 消', //取消
        'LK_QUXIAOLINGJIANCAIGOUXIANGMU': '取消零件采购项目', //取消零件采购项目
        'LK_QUXIAOYUANYIN': '取消原因', //取消原因
        'LK_QUANBUBANBEN': '全部版本', //全部版本
        'LK_QUEDING': '确定', //确定
        'LK_QUEREN': '确认', //确认
        'LK_RENKEZHOUQIZHOU': '认可周期（周）', //认可周期（周）
        'LK_RENWUZHONGXIN': '任务中心 ', //任务中心
        'LK_RIZHI': '日志', //日志
        'LK_RIHZICHAKAN': '日志查看', //日志查看
        'LK_RIZHICHAKAN': '日志查看 ', //日志查看
        'LK_RUCHANGBAOZHUANGMINGCHENG': '入场包装名称', //入场包装名称
        'LK_RUKUBAOZHUANGMAOZHONG': '入库包装毛重（KG）', //入库包装毛重（KG）
        'LK_RUKUBAOZHUANGMAOZHONGKG': '入库包装毛重（KG）', //入库包装毛重（KG）
        'LK_RUKUJICHUNIANWEIXIUFEILV': '入库基础年维修费率', //入库基础年维修费率
        'LK_RUKUJICHUNIANWEIXIUFEILÜ': '入库基础年维修费率', //入库基础年维修费率
        'LK_RUKUQIJUFANCHENGSHEDIEBI': '入库器具返程折叠比 ', //入库器具返程折叠比
        'LK_RUKUQIJUKUAN': '入库器具宽（mm） ', //入库器具宽（mm）
        'LK_RUKUQIJUKUANMM': '入库器具宽（mm） ', //入库器具宽（mm）
        'LK_RUKUQIJULEIXING': '入库器具类型', //入库器具类型
        'LK_RUKUQIJUSHOUMING': '入库器具寿命', //入库器具寿命
        'LK_RUKUQIJUXINGHAO': '入库器具型号', //入库器具型号
        'LK_RUKUQIJUCHANG': '入库器具长（mm）', //入库器具长（mm）
        'LK_RUKUQIJUZHANGMM': '入库器具长（mm）', //入库器具长（mm）
        'LK_RUKUQIJUZHUANGXIANGSHU': '入库器具装箱数', //入库器具装箱数
        'LK_RUKUQIJUZHONGHEDANJIA': '入库器具综合单价', //入库器具综合单价
        'LK_RUKUQIJUZHONGHEDANJIARMB': '入库器具综合单价（RMB）', //入库器具综合单价
        'LK_RUKUQIJUZUJINRMBDAY': '入库器具租金（RMB/DAY）', //入库器具综合单价
        'LK_RUKUQIJUZONGHEDANJIA': '入库器具综合单价 ', //入库器具综合单价
        'LK_SEBIAOHAO': '色标号', //色标号
        'LK_SHANCHU': '删除', //删除
        'LK_SHANCHUGONGYINGSHANG': '删除供应商', //删除供应商
        'LK_SHANGCHUANREN': '上传人', //上传人
        'LK_SHANGCHUANRIQI': '上传日期', //上传日期
        'LK_SHANGQIDAZHONGYUANQU': '上汽⼤众园区303室', //上汽⼤众园区303室!
        'LK_SHANGYIYE': '上一页', //上一页
        'LK_SHEJIGONGCHENGSHIGONGHAO': '设计工程师工号 ', //设计工程师工号
        'LK_SHEJIGONGCHENGSHIHAO': '设计工程师号', //设计工程师号
        'LK_SHEJIGONGCHENGSHIXINGMING': '设计工程师姓名', //设计工程师姓名
        'LK_SHEJIKESHI': '设计科室', //设计科室
        'LK_SHEZHIGONGYIZU': '设置工艺组', //设置工艺组
        'LK_SHENQING': '申请', //申请
        'LK_SHENQINGRWJIA': '申请RW价', //申请RW价
        'LK_SHENQINGBEIZHU': '申请备注', //申请备注
        'LK_SHENQINGCAIWUMUBIAOJIA': '申请财务目标价', //申请财务目标价
        'LK_SHENQINGLEIBIE': '申请类别', //申请类别
        'LK_SHENQINGLEIXING': '申请类型', //申请类型
        'LK_SHENQINGMUBIAOJIA': '申请目标价', //申请目标价
        'LK_SHENQINGRIQI': '申请日期', //申请日期
        'LK_SHENQINGYUANYIN': '申请原因', //申请原因
        'LK_SHENQINGZHUANGTAI': '申请状态', //申请状态
        'LK_SHENDUGUOCHANHUABEIZHU': '深度国产化备注', //深度国产化备注
        'LK_SHENDUGUOCHANHUADAIMA': '深度国产化代码', //深度国产化代码
        'LK_SHENPIYIJIAN': '审批意见', //审批意见
        'LK_SHENPIZHUANGTAI': '审批状态', //审批状态
        'LK_SHENGCHENGFS_GSNR': '生成FS/GS/SP NO.', //生成FS/GSNR
        'LK_SHENGCHENGFSHAO': '生成FS号', //生成FS号
        'LK_SHIJIANJIHUA': '时间计划', //时间计划
        'LK_SHIFOUERCIJIAN': '是否二次件', //是否二次件
        'LK_SHIFOUJIARUYIYOURFQ': '是否加入已有RFQ', //是否加入已有RFQ
        'LK_CONFIRM_SIGN_RECORD_TIPS': '是否确认对新件信息单进行签收？', //是否确认对新件信息单进行签收？
        'LK_SHIFOUQUERENSHANCHU': '是否确认删除?', //是否确认删除?
        'LK_SHIFOUSHENDUGUOCHANHUA': '是否深度国产化', //是否深度国产化
        'LK_SHIFOUYANZHENGCBD': '是否验证CBD', //是否验证CBD
        'LK_SHIFOUZUHEXINJIANRFQ': '是否组合新建RFQ', //是否组合新建RFQ
        'LK_ENTER_SEARCH_SUPPLIER_NAME_FACOTRY': '输入查询供应商名称、厂商类型...', //输入查询供应商名称、厂商类型...
        'LK_SUOXUANBANBENWUFUJIAN': '所选版本无附件', //所选版本无附件
        'LK_TANPANZHUSHOU': '谈判助手', //谈判助手
        'LK_TESHULINGJIANLEIXING': '特殊零件类型', //特殊零件类型
        'LK_TESHUYAOQIU': '特殊要求', //特殊要求
        'LK_TIJIAO': '提交', //提交
        'LK_TIANJIA': '添加', //添加
        'LK_TIANJIAGONGYINGSHANG': '添加供应商', //添加供应商
        'LK_TIANJIAZIDINGYIPINGFENXIANG': '添加自定义评分项', //添加自定义评分项
        'LK_TONGZHIQUANBUGONGYINGSHANG': '通知全部供应商', //通知全部供应商
        'LK_TONGZHIYIBAOJIAGONGYINGSHANG': '通知已报价供应商', //通知已报价供应商
        'LK_TOUZIYUSUAN': '投资预算', //投资预算
        'LK_TUZHI': '图纸', //图纸
        'LK_TUZHIHETPXIANGQINGYE': '图纸和TP详情页 ', //图纸和TP详情页
        'LK_TUZHIHETPDANXIANGQING': '图纸和信息单详情', //图纸和信息单详情
        'LK_TUZHIRIQI': '图纸日期', //图纸日期
        'LK_TUISONGSHIJIAN': '推送时间', //推送时间
        'LK_TUICHUDENGLU': '退出登录', //退出登录!
        'LK_TUIHUI': '退回', //退回
        'LK_TUIHUIYUANYIN': '退回原因', //退回原因
        'LK_WAIBUKAIFAFEIYUAN': '外部开发费（元）', //外部开发费（元）
        'LK_WEIHU': '维护', //维护
        'LK_WEIHUREN': '维护人', //维护人
        'LK_WENXINTISHI': '温馨提示', //温馨提示
        'LK_WENJIANDAXIAOMB': '文件大小（MB）', //文件大小（MB）
        'LK_WENJIANMING': '文件名', //文件名
        'LK_WENJIANMINGCHENG': '文件名称', //文件名称
        'LK_WULIUBIAOZHUN': '物流标准', //物流标准
        'LK_PL': '物流审核人', //物流审核人
        'LK_WULIUYAOQIU': '物流要求', //物流要求
        'LK_XIAYIYE': '下一页', //下一页
        'LK_XIAZAI': '下载', //下载
        'LK_XIANGGUANCHEXING': '相关车型', //相关车型
        'LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE': '箱内周转材料综合价格 ', //箱内周转材料综合价格
        'LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING': '箱内周转材料综合寿命 ', //箱内周转材料综合寿命
        'LK_XIANGQINGXINXI': '详情信息', //详情信息
        "LK_TANPANZS":'谈判助手',
        'LK_XIANGMUCHEXING': '项目车型 ', //项目车型
        'LK_XINJIANXINXIDANQIANSHOU': '新件信息单签收', //新件信息单签收
        'LK_XINJIANXINXILIUSHUIDANHAO': '新件信息流水单号 ', //新件信息流水单号
        'LK_XINJIANRFQLUNCI': '新建RFQ轮次', //新建RFQ轮次
        'LK_XINJIANXINXIDANBEIZHU': '新建信息单备注', //新建信息单备注
        'LK_XINJIANXINXIDANLIUSHUIHAO': '新件信息单流水号', //新建信息单流水号
        'LK_XINSHENQINGCAIWUMUBIAOJIA': '新申请财务目标价', //新申请财务目标价
        'LK_XINXIDANFENLEI': '信息单分类', //信息单分类
        'LK_XINXIDANLEIXING': '信息单类型', //信息单类型
        'LK_XINXIDANLIUSHUIHAO': '信息单流水号', //信息单流水号
        'LK_XINXIDANSHENGCHENGSHIJIAN': '信息单生成时间', //信息单生成时间
        'LK_XINXIDANXIANGQING': '信息单详情', //信息单详情
        'LK_XINXIDANZHUANGTAI': '信息单状态', //信息单状态
        'LK_XINXILIUSHUIDANHAO': '信息流水单号', //信息流水单号
        'LK_XUANZHUANGJIAN': '选装件', //选装件
        'LK_XUNYUANZHIHANG': '寻源', //寻源执行
        'LK_XUNJIACAIGOUYUAN': '询价采购员', //询价采购员
        'LK_XUNJIACAIGOUYUANBEIZHU': '询价采购员备注', //询价采购员备注
        'LK_XUNJIACHANLIANGJIHUA': '询价产量计划', //询价产量计划
        'LK_XUNJIAFUJIAN': '询价附件', //询价附件
        'LK_XUNJIATUZHI': '询价图纸 ', //询价图纸
        'LK_XUNJIAZILIAO': '询价资料', //询价资料
        'LK_XUNJIAZILIAOZHUANGTAI': '询价资料状态', //询价资料状态
        'LK_YANYONGCHEXINGDALEIDAIMA': '沿用车型大类代码', //沿用车型大类代码
        'LK_YAOQIUCSCHUIYIRIQI': '要求CSC会议日期', //要求CSC会议日期
        'LK_YIBAOCUN': '已保存', //已保存!
        'LK_YIBAOJIAGONGYINGSHANG': '已报价供应商', //已报价供应商
        'LK_YITIANJIADAOSHANGXIAN': '已添加到上限', //已添加到上限!
        'LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU': '询价采购员上会备注', //已询价采购员上会备注
        'LK_YIXUNJIAGONGYINGSHANG': '已询价供应商', //已询价供应商
        'LK_YONGLIANG': '用量', //用量
        'LK_YUQIDAIBAN': '逾期待办 ', //逾期待办
        'LK_YUANPEICHANG': '原配厂', //原配厂
        'LK_ZAISHENQINGCAIWUMUBIAOJIA': '再申请财务目标价', //再申请财务目标价
        'LK_ZAICISHENGQINGCAIWUMUBIAOJIA': '再申请财务目标价', //再新申请财务目标价
        'LK_ZAIXINSHENQINGCAIWUMUBIAOJIA': '再新申请财务目标价 ', //再新申请财务目标价
        'LK_ZAIXIANJINGJIA': '在线竞价', //在线竞价
        'LK_ZANWUSHUJU': '暂无数据', //暂无数据
        'LK_ZENGJIADERENKEFEIYUAN': '增加的认可费（元）', //增加的认可费（元）
        'LK_ZHIFUTIAOKUAN': '支付条款', //支付条款
        "LK_ZHINENGSHANGCHUANWENJIAN": '只能上传.xlsx文件', //只能上传.xlsx文件
        'LK_ZHILIANG': '质量', //质量
        'LK_MQ': '质量评分人', //质量评分人
        'LK_ZHONGLIANG': '重量', //重量
        'LK_ZHONGXINSHENQING': '重新申请', //重新申请
        'LK_ZHONGZHI': '重置', //重置
        'LK_ZHUANPAI': '转派', //转派
        'LK_ZHUANGXIANGSHU': '装箱数', //装箱数
        'LK_ZHUANGTAI': '状态', //状态
        'LK_ZUIXINRWJIA': '最新RW价', //最新RW价
        'LK_ZUIXINFANHUIRIQI': '最新返回日期', //最新返回日期
        'LK_ZUIXINSHENQINGRIQI': '最新申请日期', //最新申请日期
        'LK_ZUIXINSHENQINGZHUANGTAI': '最新申请状态', //最新申请状态
        'LK_SHEZHIPINGFENBUMEN': '设置评分部门', //设置评分部门
        'LK_TUISONGPINGFENRENWU': '推送评分任务', //推送评分任务
        'LK_GONGYISHEZHI': '工艺设置', //工艺设置
        'LK_CAILIAOZUSHAIXUAN': '材料组筛选', //材料组筛选
        'LK_GONGYIZUXUANDING': '工艺组选定', //工艺组选定
        'LK_GONGYIZU': '工艺组', //工艺组
        "LK_CHAIFENFACTORY": '选中的工厂中,存在未分配的份额，请填写后重试！',
        "LK_FACTORYNOTSAME": '您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改',
        "LK_AREYOUSPLITE": '该车型项目主数据中对应多个采购工厂，是否拆分？',
        'LK_XIETIAOREN': '协调人', //协调人
        'LK_XINZENG': '新增', //新增
        'LK_HUIFU': '恢复', //恢复
        'LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN': '请选择需要删除的评分部门', //请选择需要删除的评分部门
        'LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN': '请选择需要恢复的评分部门', //请选择需要恢复的评分部门
        'LK_QINGXUANZEWANSHUJUZAIZUOBAOCUN': '请选择完数据再做保存', //请选择完数据再做保存
        'LK_WEIBUXITONGWENJIANWUFASHANCHU': '为外部系统文件，无法删除', // xxx 为外部系统文件, 无法删除
        'LK_DINGDIANXINXI': '定点信息', // 定点信息
        'LK_SHANGHUI': '上会', // 上会
        'LK_LIUZHUAN': '流转', // 流转
        'LK_BEIAN': '备案', // 备案
        'LK_QINGSHURUTUIHUIYUANYIN': '请输入退回原因', // 备案

        //摸具预算
        // 点击进入【生成投资清单】页面
        // 下一步
        // 请输入自定义名称
        // 您还没有选择参考车型项目，是否继续?
        // 新版本命名
        // 请先选择车型项目
        // 请先输入车型名称
        // 已有车型名称，请重新输入
        // 请先勾选
        // 请先添加行
        // 开始时间不能大于结束时间，请重新选择。
        // 是否确定保存为新版本？

        // 'LK_CAIGOUGONGCHANG': '采购⼯⼚',//采购⼯⼚
        // 'LK_DANWEI': '单位',//单位
        'LK_BAIWANYUAN': '百万元',//百万元
        'LK_ZONGYUSUAN': '总预算',//总预算
        'LK_DINGDIANJINE': '定点⾦额',//定点⾦额
        'LK_ZUIXINGENGXINREN': '最新更新人',//最新更新人
        'LK_ZUIXINGENGXINSHIJIAN': '最新更新时间',//最新更新时间
        'LK_BMDAN': 'BM单',//BM单
        'LK_FUKUAN': '付款',//付款
        'LK_CHEXINXIANGMU': '⻋型项⽬',//⻋型项⽬
        'LK_XIANGMULEIXIN': '项⽬类型',//项⽬类型
        'LK_DINGDIANLEIXIN': '定点类型',//定点类型
        'LK_CHEXINLEIBIE': '⻋型类别',//⻋型类别 ----------------燃料类型
        // 'LK_QUEREN': '确认',//确认
        // 'LK_CAILIAOZU': '材料组',//材料组  -------------------材料组/中文名/德文名
        'LK_LINJIANLIUWEIHAO': '零件六位号',//零件六位号
        'LK_TIANJIAHANG': '添加⾏',//添加⾏
        'LK_SHANCHUHANG': '删除⾏',//删除⾏
        'LK_CANKAOCHEXIN': '参考⻋型',//参考⻋型
        'LK_CAILIAOZUBIANHAO2': '材料组编号',//材料组编号
        'LK_CAILIAOZUMINGCENGZHONG': '材料组名称（中）',//材料组名称（中）
        'LK_CAILIAOZUMINGCENGDE': '材料组名称（德）',//材料组名称（德）
        'LK_ZHUANYEKESHI': '专业科室',//专业科室
        'LK_SHIFOUZUOGUOCOMMONSOURING': '是否做过Common Sourcing',//是否做过Common Sourcing  -------------- common sourcing
        'LK_CommonSourcing': 'Common Sourcing',
        'LK_MOJUSHUXIN': '模具属性',//模具属性
        'LK_ZP': 'ZP',//ZP
        'LK_CANKAOCHEXINXIANGMU': '参考车型项目',//参考车型项目
        'LK_CANKAOCHEXINXIANGMUYI': '参考车型项目⼀',//参考车型项目⼀
        'LK_CANKAOCHEXINXIANGMUER': '参考车型项目⼆',//参考车型项目⼆
        'LK_CANKAOCHEXINXIANGMUSAN': '参考车型项目三',//参考车型项目三
        'LK_QITACHEXINXIANGMUBEIXUAN': '其它⻋型项⽬备选',//其它⻋型项⽬备选
        'LK_CHEXINXIANGMULEIXIN': '⻋型项⽬类型',//⻋型项⽬类型
        'LK_CHEXINXIANGMUQIZHINIANFEN': '⻋型项⽬起⽌年份',//⻋型项⽬起⽌年份
        'LK_CHONGZHI': '重置',//重置
        'LK_CAILIAOZUBIANHAOZHONGWENMINGDEWEN': '材料组编号/中⽂名/德⽂名',//材料组编号/中⽂名/德⽂名
        'LK_CHAXUN': '查询',//查询
        // 'LK_TIANJIA': '添加',//添加
        'LK_BANBENHAO2': '版本号',//版本号
        'LK_CHEXINMINGCENG': '⻋型名称',//⻋型名称
        'LK_PIZHUNTOUZHI': '批准投资',//批准投资
        'LK_FEIAEKO': '⾮AEKO',//⾮AEKO
        'LK_WEISHENQING': '未申请',//未申请
        'LK_YISHENQING': '已申请',//已申请
        'LK_WEIDINGDIAN': '未定点',//未定点
        'LK_YIDINGDIAN': '已定点',//已定点
        'LK_WUBA': '⽆BA',//⽆BA
        'LK_YOUBA': '有BA',//有BA
        'LK_WUBM': '⽆BM',//⽆BM
        'LK_YOUBM': '有BM',//有BM
        // 'LK_BIANJI': '编辑',//编辑
        'LK_XIAZHAITOUZHIQINDAN': '下载投资清单',//下载投资清单
        'LK_YUSUANJINEPSK': '预算⾦额PSK(Mio.RMB)',//预算⾦额PSK
        'LK_SOURCINGLEIXIN': 'Sourcing类型',//Sourcing类型
        'LK_CANKAOXIANGMU': '参考项目',//参考项目
        'LK_CANKAOXINGMUMOJUJINE': '参考项目模具定点金额(Mio.RMB)',//参考项⽬模具⾦额
        'LK_YUSUANBEIZHU': '预算备注',//预算备注
        'LK_AEKOJINE': 'AEKO⾦额',//AEKO⾦额
        'LK_ZONGHEPIANCHA': '综合偏差',//综合偏差
        'LK_ZHONGHEPIANCHAJINE': '综合偏差⾦额',//综合偏差⾦额
        'LK_GUANLIANCHEXIN': '关联⻋型',//关联⻋型
        // 'LK_BAOCUN': '保存',//保存
        'LK_BAOCUNWEIXINBANBEN': '保存为新版本',//保存为新版本
        'LK_ANBILIZHESUAN': '按⽐例折算',//按⽐例折算
        'LK_ZHESUANBILI': '折算⽐例',//折算⽐例
        'LK_CHEXINGXIANGMULEIXING': '车型项目类型',//车型项目类型
        'LK_BUDGETAMOUNTTOTAL': '总预算金额',   //  总预算金额
        'LK_APPLYINVESTAMOUNTTOTAL': '总申请投资金额',  //  总申请投资金额
        'LK_FIXEDINVESTAMOUNTTOTAL': '总定点投资金额',  //  总定点投资金额
        'LK_MOULDBUDGETSTATUS': '模具预算状态', //  模具预算状态
        'LK_APPLYDATESTARTANDEND': '申请⽇期起⽌',  //  申请⽇期起⽌
        'LK_RFQHAO': 'RFQ号',//RFQ号
        'LK_YUSUANZHUANGTAI': '预算状态',//预算状态
        'LK_SHENQINGREN': '申请人',//申请人
        'LK_SHENQINGSHIJIANQIZHI': '申请时间起止',//申请时间起止
        'LK_PIZHUAN': '批准',//批准
        'LK_SHENQINGSHIJIANQI': '申请时间起',
        'LK_SHENQINGSHIJIANZHI': '申请时间止',

        'LK_CHEXINGXIANGMUGAILAN': '车型项目概览',//车型项目概览
        'LK_YUSUANGUANLI': '预算管理',//预算管理
        'LK_YUSUANSHENPI': '预算审批',//预算审批
        'LK_BASHENQING': 'BA申请',//BA申请
        'LK_BMSHENQING': 'BM申请',//BM申请
        'LK_TOUZIBAOGAO': '投资报告',//投资报告

        'LK_BANMUBER': 'BA号',  //  BA号
        'LK_FIXEDPOINTSUPPLIER': '定点供应商', // 定点供应商
        'LK_MODULFIXEDPOINTMONEY': '模具定点金额',  //  模具定点金额
        'LK_REGINOCONTROLLER': '区域控制员',    //  区域控制员
        'LK_RSODDNUMBERS': 'RS单号',    //  RS单号
        'LK_SPAREPARTSNUMBER': '零件号',    //  零件号
        'LK_BADETAILSPOPUPTXT1': '您将要申请',  //  您将要申请
        'LK_BADETAILSPOPUPTXT2': '的BA账户，请确认金额：',   //  的BAzzh账户，请确认金额：
        'LK_BANUMBERDISTRIBUTION': 'BA号分配',  //  BA号分配
        'LK_AMOUNTMONEYRMB': '金额（RMB）', //  金额（RMB）
        'LK_FIXEDINVESTTOTAL': '总定点投资金额',    //  总定点投资金额

        // 'LK_XIAYIBU': '下一步',    //  下一步

        'LK_BAAPPROVAL': 'BA审批',  //  BA审批
        'LK_BADANSTATUS': 'BA单状态', // BA单状态
        'LK_ALL': '全部',   //  全部
        'LK_BAODDNUMBERS': 'BA单号',    //  BA单号
        'LK_BAACCOUNTTYPE': 'BA账户类型',   //  BA账户类型
        'LK_CURRENTAMOUNT': '当前金额', //  当前金额
        'LK_APPLYAMOUNT': '申请金额',   //  申请金额
        'LK_APPLYAMOUNTTHEN': '申请后金额', //  申请后金额
        'LK_MODIFYANUMBER': '修改A号',  //  修改A号
        'LK_CANCELAPPLY': '退回申请',   //  退回申请
        'LK_MODIFIABLE': '可修改',  //  可修改
        'LK_DEPNAME': '科室名称',   //  科室名称
        'LK_ALLBAAPPLY': '所有BA申请',  //  所有BA申请
        'LK_TOBECONFIRMEDBAAPPLY': '待确认BA申请',  //  待确认BA申请
        'LK_TOBECONFIRMEDMONEY': '待确认追加金额',  //  待确认追加金额
        'LK_DETAILEDTXT': '明细',   //  明细
        'LK_MODIFYANUMBERTXTTIPS': '确定后，所有同⼀⻋型项⽬、同⼀⼯⼚的BA申请相关记录将⼀并更改',  //  确定后，所有同⼀⻋型项⽬、同⼀⼯⼚的BA申请相关记录将⼀并更改
        'LK_PRIMARYAMBER': '原A号',     //  原A号
        'LK_NEWAMBER': '新A号', //  新A号
        'LK_CONFIRMANUMBER': '确认A号', //  确认A号
        'LK_CONFIRMMONEY': '确认金额',  //  确认金额
        'LK_INPUTNUMBERORMORE': '请输入5位或8位A号',    //  请输入5位或8位A号
        'LK_PLEASEINPUTTIPS1': '请选择需要修改的数据',  //  请选择需要修改的数据
        'LK_PLEASEINPUTTIPS2': '最多只能同时修改一条数据',  //  最多只能同时修改一条数据
        'LK_PLEASEINPUTTIPS3': '需要先确认A号',  //  需要先确认A号
        'LK_PLEASEINPUTTIPS4': '退回状态不能修改A号',  //  退回状态不能修改A号
        'LK_PLEASEINPUTTIPS5': '车型项目尚未确认A号，请先前往',  //  车型项目尚未确认A号，请先前往
        'LK_PLEASEINPUTTIPS6': '待确认BA申请',  //  待确认BA申请
        'LK_PLEASEINPUTTIPS7': '页面中进行A号确认',  //  页面中进行A号确认
        'LK_APPLYBANUMBER': '申请BA单',  //  申请BA单
        'LK_OF': '的', //  的
        // 'LK_QUEDING': '确定',//确定
        'LK_HEAVYITEM': 'Heavy Item', // Heavy Item
        'LK_FENXIBAOGAO': '分析报告', // 分析报告
        'LK_PJZDFPKESHI':'配件自动分配科室',
        'LK_LINGJIANCHENGBENFENXIYUAN': '零件成本分析员', // 零件成本分析员
        'LK_MUJUCHENGBENFENXIYUAN': '模具成本分析员', // 模具成本分析员
        'LK_FUJIANXUQIUDAORU':'附件需求导入', // 附件需求导入
        'LK_PEIJIANXUQIUQIANSHOU': '配件需求签收', // 配件需求签收
        'LK_PEIJIANZONGHEGUANLI': '配件综合管理', // 配件综合管理
        'LK_FUJIANZONGHEGUANLI': '附件综合管理', // 附件综合管理

        'LK_FUJIANLINGJIANHAO':'附件零件号', // 附件零件号
        'LK_SPHAO':'SP号', // SP号
        'LK_DAORUXIANGCI':'导⼊项次', // 导⼊项次
        'LK_CSFKESHI':'CSF科室', // CSF科室
        'LK_KESHI':'科室', // 科室
        'LK_FUJIANLINGJIANMINGCHENG':'附件零件名称', // 附件零件名称
        'LK_SHIYONGCHEXING':'使⽤⻋型', // 使⽤⻋型
        'LK_FUJIAN':'附件', // 附件
        'LK_FUJIANSHANGSHISHIJIAN':'附件上市时间', // 附件上市时间
        'LK_FUJIANQINGDAN':'附件清单', // 附件清单
        'LK_SHANGCHUANWENJIAN':'上传文件', // 上传文件
        'LK_DAORU':'导入', // 导入
        'LK_FUJIANMUBANXIAZAI':'附件模板下载', // 附件模板下载
        'LK_DAORUYUAN':'导⼊员', // 导⼊员
        'LK_YULAN':'预览', // 预览
        'LK_TIAOZHUANZHILINGJIANQINGDANTIANJIA':'跳转⾄零件清单添加', // 跳转⾄零件清单添加
        'LK_ZHANSHI':'展示', // 展示
        'LK_KAISHISHIJIAN':'开始日期', // 开始日期
        'LK_JIESHUSHIJIAN':'结束日期', // 结束日期
        'LK_WENJIANQINGXUANZHUANZHIZHENGCHANG':'上传附件:文件请旋转至正常方向后上传', // 上传附件:文件请旋转至正常方向后上传
        'LK_FASONGKM': '发送KM', // 发送KM
        'LK_BAAPPLYTISP1': '请先勾选',  //  请先选择车型项目
        'LK_INPUTNUMBERORMORE1': '不能输入特殊字符',    //  不能输入特俗字符
        'LK_DONGJIE':'冻结', // 冻结
        'LK_JIEDONG':'解冻', // 解冻
        'LK_CAOGAO': '草稿',
        'LK_TIJIAOZHONG': '提交中',
        'LK_YIDONGJIE': '已冻结',
        'LK_SHENPILIUZHUAN': '审批中/流转中',
        'LK_SHENPILIUZHUANWANCHENG': '审批完成/流转完成',
        'LK_NINQUERENZHIXINGDONGJIECAOZUOMA':'您确定要执行冻结操作吗？', // 您确定要执行冻结操作吗？
        'LK_DIYINIANXUQIULIANG':'第1年需求量', // 第1年需求量
        'LK_DIERNIANXUQIULIANG':'第2年需求量', // 第2年需求量
        'LK_DISANNIANXUQIULIANG':'第3年需求量', // 第3年需求量
        'LK_DISINIANXUQIULIANG':'第4年需求量', // 第4年需求量
        'LK_DIWUNIANXUQIULIANG':'第5年需求量', // 第5年需求量
        'LK_DILIUNIANXUQIULIANG':'第6年需求量', // 第6年需求量
        'LK_DIQINIANXUQIULIANG':'第7年需求量', // 第7年需求量
        'LK_DIBANIANXUQIULIANG':'第8年需求量', // 第8年需求量
        'LK_DIJIUNIANXUQIULIANG':'第9年需求量', // 第9年需求量
        'LK_DISHINIANXUQIULIANG':'第10年需求量', // 第10年需求量
        'LK_QINGXUANZEZHISHAOYITIAOSHUJU': '请选择至少一条数据', // 请选择至少一条数据
        'LK_XIAYIBU': '下一步', // 下一步
        'LK_QINGXUANZEYITIAORFQ': '请选择一条RFQ', // 请选择一条RFQ
        'LK_QINGXUANZEDINGDIANSHENQINGLEIXING': '请选择定点申请类型', // 请选择定点申请类型
        'LK_DINGDIANSHENQINGLEIXING': '定点申请类型', // 定点申请类型
        'LK_GAIDINGDIANSHENQINGZHONGYOUDANYIGONGYINGSHANG': '该定点申请中有单一供应商', // 该定点申请中有单一供应商
        'LK_DINGDIANXINLOI':'定点信 / LOI', // 定点信 / LOI
        'LK_DINGDIANXIN':'定点信', // 定点信
        'LK_LOI':'LOI', // LOI
        'LK_DINGDIANXINBIANHAO':'定点信编号', // 定点信编号
        'LK_DINGDIANXINZHUANGTAI':'定点信状态',//  定点信状态
        'LK_DINGDIANXINDANHAO':'定点申请单号', // 定点申请单号
        'LK_DINGDIANSHIJIANQIZHI':'定点时间起⽌', //  定点时间起⽌
        'LK_SHIFOUXIANSHIZIJI':'是否显⽰⾃⼰', //  是否显⽰⾃⼰
        'LK_GONGYINGSHANGFANKUI':'供应商反馈', // 供应商反馈
        'LK_SHIFOUQIANSHUXIEYI':'是否签署协议', // 是否签署协议
        'LK_DINGDIANRIQI':'定点⽇期', //定点⽇期
        'LK_LOIBIANHAO':'LOI编号', // LOI编号
        'LK_LOIZHUANGTAI':'LOI状态', // LOI状态
        'LK_LOISHENGCHENGSHIJIAN':'LOI⽣成时间', // LOI⽣成时间
        'LK_QUERENBINGTIJIAO':'确认并提交', // 确认并提交
        'LK_LINEQUEREN':'LINIE确认', // LINIE确认
        'LK_LINETUIHUI':'LINIE退回', // LINIE退回
        'LK_GUANBI':'关闭', // 关闭
        'LK_JIHUO':'激活', // 激活
        'LK_GUANBIDINGDIANXIN':'关闭定点信' , // 关闭定点信
        'LK_QINGSHURUGUANBIYUANYIN':'请输⼊关闭原因', // 请输⼊关闭原因
        'LK_MUBIAOXUNJIACAIGOUYUAN':'目标询价采购员', // 目标询价采购员
        'LK_MUBIAOLINE':'⽬标LINIE', // ⽬标LINIE
        'LK_GAILAN':'概览', // 概览
        'LK_BAOBIAOGUANLI':'报表管理', // 报表管理
        'LK_WANCHENGDINGDIANXIN':'完成定点信', // 完成定点信
        'LK_DAOCHUBIAOZHUNDINGDIANXIN':'导出标准定点信', // 导出标准定点信
        'LK_LISHIDINGDIANXIN':'历史定点信', // 历史定点信
        'LK_BIAOZHUNDINGDIANXIN':'标准定点信', // 标准定点信
        'LK_FEIBIAOZHUNDINGDIANXIN':'⾮标准定点信',  // ⾮标准定点信
        'LK_GONGYINGSHANGLIANXIR':'供应商联系⼈', // 供应商联系⼈
        'LK_SHANGCHUANSHIWENJIANQINGXUANZHUANZHIZHENGCHANGFANGXIANGHOUSHANGCHUAN':'上传时文件请旋转至正常方向后上传', // 上传时文件请旋转至正常方向后上传
        'LK_BIANJIBEIZHU':'编辑备注', // 编辑备注
        'LK_GUANBILOI':'关闭LOI', // 关闭LOI
        'LK_WANCHENGLOI':'完成LOI', // 完成LOI
        'LK_DAOCHUBIAOZHUNLOI':'导出标准LOI', // 导出标准LOI
        'LK_LISHILOI':'历史LOI', // 历史LOI
        'LK_BIAOZHUNLOI':'标准LOI', // 标准LOI
        'LK_FEIBIAOZHUNLOI':'⾮标准LOI', // ⾮标准LOI
        'LK_PILIANGLOI':'批量LOI', // 批量LOI
        'LK_KAIFALOI':'开发LOI', // 开发LOI
        'LK_KAIFAPILIANGLOI':'开发+批量LOI' , // 开发+批量LOI
        'LK_FRMPINGJI':'FRM评级', // FRM评级
        'LK_CBDSTATUS':'CBD状态', // CBD状态
        'LK_LETTER_XINZENGDINGDIANXIN':'新增定点信', // 新增定点信

        'LK_ALLBMAPPLY': '所有BM申请',    //  所有BM申请
        'LK_DAIQUERENBMDAN': '待确认BM单',    //  待确认BM单
        'LK_AEKOZENGZHIBMDAN': 'AEKO增值BM单',  //  Aeko增值BM单
        'LK_AEKOJIANZHIBMDAN': 'AEKO减值BM单',  //  Aeko减值BM单
        'LK_BMDANZHUANGTAI': 'BM单状态',    //  BM单状态
        'LK_AEKOLEIXING': 'AEKO类型',   //  AEKO类型
        'LK_BMDANLIUSHUIHAO': 'BM单流水号',   //  BM单流⽔号LK_BMDANLIUSHUIHAO
        'LK_BMDANHAO': 'BM单号',    //  BM单号
        'LK_SAPDINGDANHAO': 'SAP订单号',    //  BM单号
        'LK_RUZHANGDANHAO': '入账单号',    //  BM单号
        'LK_WBSBIANHAO': 'WBS编号',   //  WBS编号
        'LK_DAIBIAOLINGJIAN': '代表零件',  //  代表零件
        'LK_BMDANJINE':  'BM单金额', //  BM单金额
        'LK_BMZHUANGTAI': 'BM单状态',   //  BM单状态
        'LK_DINGDIANLEIXING': '定点类型',   //  定点类型
        'LK_AEKOZENGZHIJINE': 'AEKO增值金额',  //  Aeko增值金额
        'LK_XIAZAIQINGDAN': '下载清单', //  下载清单
        'LK_QUERENSHENQING': '确认申请',    //  确认申请
        'LK_ZUOFEI': '作废', // 作废
        'LK_DAIBIAOLINGJIANHAO': '代表零件号',  //  代表零件号
        'LK_CAIGOUSHENQINGHAO': '采购申请号',   //  采购申请号
        'LK_KEMU': '科目',  //  科目
        'LK_CHENGBENZHONGXIN': '成本中心',  //  成本中心
        'LK_CHENGBENKONGZHIYU': '成本控制域',   //  成本控制域
        'LK_ZONGZHANGKEMU': '总账科目', //  总账科目
        'LK_TONGJIDINGDAN': '统计订单', //  统计订单
        'LK_WULIAOZHU': '物料组',   //  物料组
        'LK_JIAOHUORIQI': '交货日期',   //  交货日期
        'LK_CAIGOUZU': '采购组',    //  采购组
        'LK_BUHANSUICHENGBEN':  '不含税成本',   //  不含税成本
        'LK_HANSUICHENGBEN': '含税成本',    //  含税成本
        'LK_DUANWENBEN': '短文本',  //  短文本
        'LK_LINGJIANMINGCHENZHONG': '零件名称（中）',   //  零件名称（中）
        'LK_LINGJIANMINGCHENDE': '零件名称（德）',  //  零件名称（德）
        'LK_CSF': 'CSF',    //  CSF
        'LK_BAOCUNWEIZUIXINBANBEN': '保存为最新版本',  //  保存为最新版本
        'LK_SHUAXIN': '刷新',   //  刷新
        'LK_SHUAXINRIQI': '刷新日期',   //  刷新日期
        'LK_SHANGBANNIANSOPFUKUANDUIBI': '上半年SOP付款比',   //  上半年SOP付款⽐
        'LK_XIABANNIANSOPFUKUANDUIBI': '下半年SOP付款比',   //  下半年SOP付款⽐
        'LK_SOPSHIJIAN': 'SOP时间', //  SOP时间
        'LK_YUSUANJINE': '预算⾦额',    //  预算⾦额
        'LK_BMJINE': 'BM金额',  //  BM金额
        'LK_YIFUKUANJINEWANGNIAN': '已付款⾦额-往年',   //  已付款⾦额-往年
        'LK_YIFUKUAIJINEDANGNIAN': '已付款⾦额-当年',   //  已付款⾦额-当年
        'LK_JIHUAFUKUANDANGNIAN': '计划付款-当年', // 计划付款-当年
        'LK_JIHUAFUKUANCINIAN': '计划付款-次年', // 计划付款-次年
        'LK_SOPFUKUANBI': 'SOP付款比',  //  SOP付款比
        'LK_XIANGMUCAIGOUYUAN': '项目采购员',   //  项目采购员
        'LK_XITONGJISUAN': '系统计算',  //  系统计算
        'LK_RENMINBI': '人民币',    //  人民币
        'LK_BUHANSUI': '不含税',    //  不含税
        'LK_SHOUGONGTIAOZHENG': '手工调整', //  手工调整
        'LK_QINGXUANZHE': '请先选择',   //  请先选择
        'LK_XUQIUGENZHONGHAO': '需求跟踪号',    //  需求跟踪号
        'LK_JILIANGDANWEI': '计量单位', //  计量单位
        'LK_SHULIANG': '数量',  //  数量
        'LK_LIZI': '例',    //  例
        'LK_LIZISHUOMING': '代表零件号的车型项目/零件号/零件名称/供应商简称',  //  代表零件号的车型项目/零件号/零件名称/供应商简称
        'LK_BMAPPLYBAOCUNMSG': '你有必填字段未填',  //  你有必填字段未填
        'LK_FUKUANJIHUADINGZHIYUCHAKAN':  '付款计划制定与查看',   //  付款计划制定与查看
        'LK_YUAN': '元',    //  元

        'SPR_FRM_DEP_FINANA': '财报分析', //财报分析
        'SPR_FRM_DEP_CXWHDX': '维护呈现对象', //维护呈现对象
        'SPR_FRM_DEP_JRHYJZ': '加入行业均值', //加入行业均值
        'SPR_FRM_DEP_WHHYJZ': '维护行业均值', //维护行业均值
        'SPR_FRM_DEP_OBJPLACE': '请选择呈现对象', // 请选择呈现对象
        'SPR_FRM_DEP_AVGPLACE': '请选择行业均值', // 请选择行业均值

        'LK_TUICHUBIANJI': '退出编辑',    //  退出编辑
        'LK_SHANGCHUANQINGDAN': '上传清单',    //  上传清单
        'LK_YUEDUJIHUA': '月度计划',    //  月度计划
        'LK_DANGNIANFUKUANJIHUA': '当年付款计划',    //  当年付款计划
        'LK_CINIANFUKUANJIHUA': '次年付款计划',    //  次年付款计划
        'LK_YIYUE': '一月',    //  一月
        'LK_ERYUE': '二月',    //  二月
        'LK_SANYUE': '三月',    //  三月
        'LK_SIYUE': '四月',    //  四月
        'LK_WUYUE': '五月',    //  五月
        'LK_LIUYUE': '六月',    //  六月
        'LK_QIYUE': '七月',    //  七月
        'LK_BAYUE': '八月',    //  八月
        'LK_JIUYUE': '九月',    //  九月
        'LK_SHIYUE': '十月',    //  十月
        'LK_SHIYIYUE': '十一月',    //  十一月
        'LK_SHIERYUE': '十二月',    //  十二月

        'LK_FUKUANKANBAN': '付款看板',  //  付款看板
        'LK_NIANDUJIHUA': '年度计划',   //  年度计划
        'LK_CHEXINGXIANGMUXIANGQ': '车型项目详情',

        'DAXIAO': '大小', // 大小
        'WENJIANDAXIAO': '文件大小', // 文件大小

        'LK_MUJUTOUZIJINE': '模具投资金额', //  模具投资金额
        'LK_MUJUTOUZIQINGDANZHUANGTAI': '模具投资清单状态', //  模具投资清单状态
        'LK_TOUZIQINGDANZHUANGTAI': '投资清单状态', //  投资清单状态
        'LK_YEWUCHULIZHUANGTAI': '业务处理状态',    //  业务处理状态
        'LK_XUHAO': '序号', //  序号
        'LK_MUJUID': '模具ID',  //  模具ID
        'LK_GUZIBIANHAO': '固资编号',   //  固资编号
        'LK_MUJUZHIZHAOSHANG': '模具制造商',    //  模具制造商
        'LK_GONGYILEIXING': '工艺类型', //  工艺类型
        'LK_GONGMUJUZHONGLEI': '工模具种类',    //  工模具种类
        'LK_ZICHANFENLEIBIANHAO': '资产分类编号',   //  资产分类编号
        'LK_LINGJIANZONGCHENMINGCHEN': '零件总成名称',  //  零件总成名称
        'LK_ZONGCHENLINGJIANHAO': '总成零件号', //  总成零件号
        'LK_GONGXIANGLINGJIANHAO': '共享零件号',    //  共享零件号
        'LK_LINGBUJIANMINGCHEN': '零部件名称',  //  零部件名称
        'LK_ZICHANDANJIA': '资产单价',   //  资产单价
        'LK_FASONGGONGYIUNGSHANGQUEREN': '发送供应商确认',   //  发送供应商确认
        'LK_FAQIBIANGENG': '发起变更',   //  发起变更
        'LK_XINZENGBIANGENG': '新增变更',   //  新增变更
        'LK_ZHUANPAIZIJI': '转派自己',   //  转派自己
        'LK_BIANGENDANHAO': '变更单号', //  变更单号
        'LK_BIANGENHOUBANBEN': '变更后版本',    //  变更后版本
        'LK_BIANGENLEIXING': '变更类型',    //  变更类型
        'LK_FAQIREN': '发起人', //  发起人
        'LK_BIANGENRIQI': '变更日期',   //  变更日期
        'LK_ZICHANZONGE': '资产总额',   //  资产总额
        'LK_TIAOZHENGSHUOMING': '调整说明', //  调整说明
        'LK_ZHAOPIAN': '照片',  //  照片
        'LK_GUZIMINGCHEN': '固资名称',  //  固资名称
        'LK_DUIBUQIMEIYOUQUANXIAN': '对不起，您所在得岗位没有该材料组权限', //  对不起，您所在得岗位没有该材料组权限
        'LK_XUANZEBMXINZENGBIANGENG': '选择BM新增单变更', //  选择BM新增单变更
        'LK_CHAKANBIANGENGDAN': '查看变更单', //  查看变更单
        'LK_TIJIAOSHENPI': '提交审批', //  提交审批
        'LK_MUJUTOUZIQINGDANBIANGENGXIANGQING': '模具投资清单变更详情', //  模具投资清单变更详情
        'LK_BIANGENGSHENPIFUJIAN': '变更审批附件', //  变更审批附件
        'LK_BIANGENGDANZHUANGTAI': '变更单状态', //  变更单状态

        // 定点管理
        'nominationLanguage': {
            "DingDianXiangQing": '定点详情', // 定点详情
            'DingDianGuanLi': '定点管理', // 定点管理
            'LingJianHao': '零件号', // 零件号
            'ShenQingDanHao': '申请单号', // 申请单号
            'RFQBianHao': 'RFQ编号', // RFQ编号
            'LiuChengLeiXing': '流程类型', // 流程类型
            'ShenQingZhuangTai': '申请状态', // 申请状态
            'LingJianMing': '零件名', //  零件名
            'LingJianMingCN': '零件名(中)', // 零件名(中)
            'LingJianMingDE': '零件名(德)', // 零件名(德)
            'XunJiaCaiGouYuan': '询价采购员', // 询价采购员
            'CheXingXiangMu': '车型项目', // 车型项目
            'BaoJiaYiZhiXingJiaoYan': '报价一致性校验', // 报价一致性校验
            'ShiFouDnaYiGongYingShang': '是否单一供应商', // 是否单一供应商
            'XianShiZiJi': '显示自己', // 显示自己
            'Yes': '是', // 是
            'No': '否', //  否
            'DingDianShenQingZongHeGuanLi': '定点申请综合管理', // 定点申请综合管理
            'XinJianLingJIanDingDianShengQIng': '新建零件定点申请', // 新建零件定点申请
            'CheHui': '撤回', // 撤回
            'ShanChu': '删除', // 删除
            'TiJiaoYiZhiXingJiaoYan': '提交一致性校验', // 提交一致性校验
            'ShenQingDanMing': '申请单名', // 申请单名
            'LeiXing': '类型', // 类型
            'XingMuLeiXing': '项目类型', // 项目类型
            'HuiYi': '会议', // 会议
            'HuiYiMingCheng': '会议名称', // 会议名称
            'RSZhuangTai': 'RS单状态', // RS单状态
            'RSDongJieRiQi':'RS冻结日期', // RS冻结日期
            'DongJieRiQi':'冻结日期', // 冻结日期
            'HuiYiZhuangTai': '会议状态', //会议状态
            'BaoJiaYiZhiXingZhuangTai':'报价一致性校验状态', // 报价一致性校验状态
            'SELDanJuQUeRenZH': 'SEL单据确认状态', // SEL单据确认状态
            'DingDianRiQi': '定点日期', // 定点日期
            'DINGDIANSHENQINGLEIXING':'定点申请类型', // 定点申请类型
            'RFQANDLINGJIANQINGDAN':'RFQ & 零件清单', // RFQ & 零件清单
            'GONGYINGSHANGANDDANYIGONGYINGSHANG':'供应商 & 单⼀供应商', // 供应商 & 单⼀供应商
            'DINGDIANJIANYI':'定点建议', // 定点建议
            'SHENPIRENANDSHENPIJILU':'审批⼈ & 审批记录', // 审批⼈ & 审批记录
            'JUECEZILIAO':'决策资料', // 决策资料
            'DINGDIAN':'定点', // 定点
            'QUXIAODINGDIAN':'取消定点', // 取消定点
            'DingDianIDNotNull': '定点申请单id不能为空', //定点申请单id不能为空
            'DongJieRS': '冻结RS单', //冻结RS单
            'JieDongRS': '解冻RS单',//解冻RS单
            'QingChuangJianWanDingDianShenQingDan': '请创建完定点申请单再继续下一步',//解冻RS单
            'QianZiDanHao': '签字单号', //签字单号
            'QianZiDanZhuangTai': '签字单状态',//签字单状态
            'FuHeJieZhiRiQi': '复核截止日期',//复核截止日期
            'FuHeShiFouJieZhi': '复核是否截止',//复核是否截止
            'FaQiFuHe': '发起复核',//发起复核
            'TuiHuiZhiTongGuoZHuangTai': '退回至通过状态',//退回至通过状态
            'SELDanJuQUeRen': 'SEL单据确认', // SEL单据确认
            'QianZiDan': '签字单', //签字单号
            'SELFenTanDanFuJianLieBiao': 'SEL分摊单附件列表',//SEL分摊单附件列表
            'XinJianQianZiDan': '新建签字单',//新建签字单
            'MQianZiDanLiebiao': 'M签字单列表',//M签字单列表
        },
        // 单一供应商
        "nominationSupplier": {
            'GongYingShangLieBiao': '供应商列表',
            'GongYingShangMing': '供应商名',
            'GongYingShangHao': '供应商号',
            'JiaRuZhanShi': '加入展示',
            'QuXiaoZhanShi': '取消展示',
            'ChangShangMing': '厂商名',
            'SAPHao': 'SAP号',
            'ChangShangMingEN': '厂商名(英)',
            'CaiGouGongChang': '采购工厂',
            'ShiFouZhanShi': '是否展示',
            'DanYiGongYingShang': '单一供应商',
            'DanYiYuanYin': '单一原因',
            'BuMen': '部门',
            'GengXinShiJian': '更新时间',
            // 零件清单
            "LingJianXiangMuLeiXing": "零件项目类型",
            "CheXingDaLei": "车型大类",
            "CheXingXiangMu": "车型项目",
            "LingJianZhuangTai": "零件状态",
            "XunJiaCaiGouYuan": "询价采购员",
            "LINIE": "LINIE",
            "CFMuBiaoJia": "CF目标价",
            "BatchEdit": "批量编辑",
            "Edit": "编辑",
            "COPY": "复制",
            "Export": "导出",
            "Refresh": "刷新",
            "Reset": "重置"
        },
        // 定点建议
        "nominationSuggestion": {
            "MoJuYuSuanGuanLi": "模具预算管理",
            "BiLi": "比例(%)",
            "TouZiYuSuan": "投资预算(RMB)",
            "CSFuZeRen": "CSF(P)负责人",
            "YeWuFenPeiMoNi": "业务分配模拟",
            "ShuaXinShiJian": "刷新时间",
            "FanAnXuanZhe": "方案选择",
            "ZuHe": '组合',
            "QuXiaoZuHe": "取消组合",
            "TuiChuBianJi": "退出编辑",
            'GengXinShiJian': '更新时间',
            'TiJiao': '提交', // 提交
            'CheHui': '撤回', // 撤回
            'QingXuanZeZhiShaoYiTiaoShuJu': '请选择至少一条数据', // 请选择至少一条数据
            'QingWuXuanZeYiFaSongDeShuJu': '请勿选择已发送的数据', // 请勿选择已发送的数据
            'QingWuXuanZeWeiFaSongDeShuJu': '请勿选择未发送的数据', // 请勿选择未发送的数据
            'LingJianHao': '零件号', // 零件号
            'FsnrGsnr': 'FSNR/GSNR', // FSNR/GSNR
            'RfqBianHao': 'RFQ编号', // RFQ编号
            'ShenQingRiQi': '申请日期', // 申请日期
            'CheXingXiangMu': '车型项目', // 车型项目
            'TouZiYuSuanRmb': '投资预算(RMB)', // 投资预算(RMB)
            'CsfPFuZeRen': 'CSF(P)负责人', // CSF(P)负责人
            'ShenPiZhuangTai': '审批状态', // 审批状态
            'ShenPiYiJian': '审批意见', // 审批意见
            'ChongFuTiJiao': '重复提交', // 重复提交
            'QiYuShuJuZhengChangTiJiao': '其余数据正常提交', // 其余数据正常提交
            'ChongFuCheHui': '重复撤回', // 重复撤回
            'QiYuShuJuZhengChangCheHui': '其余数据正常撤回', // 其余数据正常撤回
            'FenZuMingChen': '分组名称', //分组名称
            'QingShuRuFenZuMing': '请输入分组名', //请输入分组名
            'NingShuRuDeBiLiBuHeFa': '您输入的比例不合法', //您输入的比例不合法
            'QingXuanZeCbdCengJiWeiL3DeShuJu': '请选择CBD层级为L3的数据', // 请选择CBD层级为L3的数据
        },
        // 决策资料
        "strategicdoc": {
            "PaiXu": "排序",
            "QuanBuXiaZai": "全部下载",
            "XiaZai": "下载",
            "ShangChuan": "上传",
            "ShangChuanTuPian": "上传图片",
            "ShanChu": "删除",
            "ShangChuanRiQi": "上传日期",
            "ShangChuanWenJian": "上传文件",
            "ShangChuanRen": "上传人",
            "MingChen": "名称",
            "ZhuTi": "主题",
            "XianShiYinCang": "显示/隐藏",
            "ZiDingYi": "自定义",
            "ShangChuanXianXiaRS": "上传线下RS文件",
            "JieSuBianJi": "结束编辑",
            "BeiZuXinXi": "备注信息",
            "ShangChuanFaShengCuoWu": "上传发生错误，请稍后重试",
            "ShanChuHang": "删除行",
            "XinZengHang": "新增行",
            "WuFaChongZhi": "无法重置"
        },
        "BJZS":{
            "LK_BAOJIAZUSHOU_MJ":"报价分析汇总-模具",
            "LK_BAOJIAZUSHOU_MJDANWEIYUAN":"报价分析汇总-模具（单元：元）"
        },
        //谈判助手
        'TPZS': {
            'FENXI': '分析', //分析
            'YULAN': '预览', //预览
            'GONGYINGSHANG': '供应商', //
            'CHEXINGXIANGMU': '车型项目', //车型项目
            'CHEXING': '车型', //车型
            'GONGCHANG': '工厂', //工厂
            'ZONGDANJIA': '总单价', //总单价
            'GUDINGCHENGBENZHANBI': '固定成本占比', //固定成本占比
            'FEIYONGLEIXING': '费用类型', //费用类型
            'FEIYONGZONGE': '费用总额', //费用总额
            'FENTANSHULIANG': '分摊数量', //分摊数量
            'YINGXIANGDANJIA': '影响单价', //影响单价
            'YINGXIANGCHENGBENZHANBI': '影响成本占比', //影响成本占比
            'XIANSHIYINGCANG': '显示/隐藏', //显示/隐藏
            'WANCHENG': '完成', //完成
            'QINGSHURUBIANHAOMINGCHENG': '请输入编号/名称', //请输入编号/名称
            'QINGSHURUCHUANGJIANRENMINGCHENG': '请输入创建人名称', //请输入创建人名称
            'PCAZONGLAN': 'PCA总览', //PCA总览
            'PINLEIGUANLIZHUSHOU': '品类管理助手', //品类管理助手
            'TANPANZHUSHOU': '谈判助手', //谈判助手
            'BAOGAOMINGCHENG': '报告名称', //报告名称
            'TIAZONGLAN': 'TIA总览', //报告名称
            // ---------------------------------舒杰报告清单start-----------------------------------------------
            'BGQD': '报告清单', //报告清单
            'ZXFXGJ': '专项分析工具', //专项分析工具
            'BJFX': '报价分析', //报价分析
            'TPJBXX': '谈判基本信息', //谈判基本信息
            'BGMC': '报告名称', //报告名称
            'FXGJLX': '分析工具类型', //分析工具类型
            'RFQHMC': 'RFQ号/名称', //报告清单
            'MRX': '默认项', //默认项
            'WJLX': '文件类型', //文件类型
            'CJR': '创建人', //创建人
            'SCXGRQ': '上次修改日期', //上次修改日期
            'RFQ': 'RFQ', //RFQ
            'FX': "分析:", //分析
            'QSRBGMC':'请输入报告名称...',//请输入报告名称...
            'QSRCLZ':'请输入材料组...',//请输入材料组...
            'QSRLJH':'请输入零件号...',//请输入零件号...
            'QSRRFQMC':'请输入RFQ/名称...',//请输入RFQ/名称...
            'ZDDCBG':'最多导出10条报告',//最多导出10条报告
            'CANNOTSELECT':'未选择需要导出的报告',//未选择需要导出的报告

            // ---------------------------------舒杰报告清单end-------------------------------------------------
            // 张兵
            'BG': "报告:", //报告
            'SCGXSJ': "上次更新时间:", //上次更新时间
            'SCDCSJ': "上次导出时间:", //上次导出时间
            'PLGYSGL': "批量供应商概览", //批量供应商概览
            'PLGYSZL': "批量供应商总览", //批量供应商总览
            'GYS360': "供应商360", //供应商360
            'DW': "单位:", //单位
            'XMGL': "项目概览:", //项目概览
            'XMXX': "项目信息", //项目信息
            'MQXTY': "MQ协调员", //MQ协调员
            'PLXTY': "PL协调员", //PL协调员
            'CFXTY': "CF协调员", //CF协调员
            'FOPQK': "FOP情况", //FOP情况
            'MQQK': "MQ情况", //MQ情况
            'PLQK': "PL情况", //PL情况
            'CFQK': "CF情况", //CF情况
            'CXLC': "车型量产", //车型量产
            'SOPRQ': "SOP日期", //SOP日期
            'LCHTIPS': "绿：已提交，且没有超期<br/> 黄：没有提交，还没有超期（2周内）<br/> 橙：没有提交，还没有超期（2-4周内）<br/> 红：没有提交，且超期", //绿：已提交，且没有超期 黄：没有提交，还没有超期（2周内） 橙：没有提交，还没有超期（2-4周内） 红：没有提交，且超期
            'LJLBXX': "零件列表信息", //零件列表信息
            'LJH': "零件号", //零件号
            'LJM': "零件名", //零件名
            'GC': "工厂", //工厂
            'SOP': "SOP", //SOP
            'EBR': "EBR%", //EBR%
            'XMMC': "项目名称", //项目名称
            'QSMZQCL': "全生命周期产量", //全生命周期产量
            'FZNCL': "峰值年产量", //峰值年产量
            'GYSXX': "供应商信息", //供应商信息
            'SZD': "所在地", //所在地
            'SFMBDL': "是否MBDL", //是否MBDL
            'BJZT': "报价状态", //报价状态
            'MQDF': "MQ打分", //MQ打分
            'PLDF': "PL打分", //PL打分
            'EPDF': "EP打分", //EP打分
            'CLZMC': "材料组名称", //材料组名称
            'GYZMC': "工艺组名称", //工艺组名称
            'DDJE': "定点金额", //定点金额
            'DDSJ': "定点时间", //定点时间
            'SQDZDZ': "上汽大众地址：", //上汽大众地址：
            'ZXSE': "总销售额：", //总销售额：
            'DDJV': "定点记录", //定点记录
            'VPFX':"Volume Pricing分析",//Volume Pricing分析
            'VPFXK':"Volume Pricing分析库",//Volume Pricing分析库
            'CXJHCLYXSLJCLFX':"车型计划产量与现实累计产量分析",//车型计划产量与现实累计产量分析（截止2021-02）
            'DWL':"单位：辆",//单位：辆
            'ZF':"涨幅",//涨幅
            'SMZQ':"生命周期",//生命周期
            'PLGLZS':"品类管理助手",//品类管理助手
            'JRZXFXGJ':"进入专项分析工具",//进入专项分析工具
            'CLZRFQLJH':"材料组，RFQ，零件号…",//材料组，RFQ，零件号…
            'JHCL':"计划产量",//计划产量
            'SJCL':"实际产量",//实际产量
            'LJLB':"零件列表",//零件列表
            'QLLJ':"全量零件",//全量零件
            'YXLJ':"已选零件",//已选零件
            'CZLJ':"查找零件",//查找零件
            'GYS':"供应商",//供应商
            'DQJHCL':"当前计划产量",//当前计划产量
            'DQSJCL':"当前实际产量",//当前实际产量
            'SOPSH':"SOP时间",//SOP时间
            'JRFX':"进入分析",//进入分析
            'CLZ':"材料组",//材料组
            'SSJG':"搜索结果",//搜索结果
            'JHCLDQSJCLSOP':"计划产量、当前实际产量、SOP时间所展示信息均为该零件号在该⻋型最近⼀次定点的批量供货时间起点所对应的信息。",//计划产量、当前实际产量、SOP时间所展示信息均为该零件号在该⻋型最近⼀次定点的批量供货时间起点所对应的信息。
            'QXZYTSJ':"请选择一条数据",//请选择一条数据

            'BQYXLJMYSJQZQLLJZTJZYXLJ':"抱歉，已选零件没有数据，请在全量零件中添加至已选零件",//抱歉，已选零件没有数据，请在全量零件中添加至已选零件
            'QUXIAN': '曲线', //曲线
            'GHQSSJ': '供货起始时间', //供货起始时间
            'LCSJ': '量产时间', //量产时间
            'JHLCDCL': '计划量产达成率', //计划量产达成率
            'GHJSSJ': '供货结束时间', //供货结束时间
            'JHCLJZSYM': '计划产量（截至上月末）', //计划产量（截至上月末）
            'SJLJCL': '实际累计产量（截至上月末）', //实际累计产量（截至上月末）
            'VPJFQL': 'Volume Pricing降幅潜力', //Volume Pricing降幅潜力
            'JBDJ': '降本单价', //降本单价
            'YUAN': '元', //元
            'JHZCL': '计划总产量', //计划总产量
            'YJZCL': '预计总产量', //预计总产量
            'YSXEWJJ': '已实现额外降价', //已实现额外降价
            'SCHEME_TYPE': '方案',  //方案类型
            'REPORT_TYPE': '报告',  //报告类型
            'LK_CREATE': '新建',    //新建
            'LK_CUSTOM_TITLE': '自定义', //自定义
            'SHOWORHIDE': '显示/隐藏',  //显示/隐藏
            'SORT': '排序',   //排序
            'SEARCH_PART': '请搜索零件号', //请搜索零件号
            'PART_REQUIRE_MESSAGE': '零件号不能为空',//零件号不能为空
            'PART_UNIQUE_MESSAGE': '零件号不能重复', //零件号不能重复
            'YXLJZDZNTJYBT': '已选零件最多只能添加100条', //已选零件最多只能添加100条
            'ZUIXINDINGDIANDANJIA': '最新定点单价', //最新定点单价
            'MUBIAODANJIA': '目标单价', //目标单价
            'CHANLIANGLIANG': '产量（辆）', //产量（辆）
            'DANJIA': '单价', //单价
            'YUANJIAN': '（元/件）', //（元/件）
            'BAOGAO': '报告', //报告
            'JIHUAZHONGCHANLIANG': '计划总产量', //计划总产量
            'YUJIZONGCHANLIANG': '预计总产量', //预计总产量
            'GUDINGCHENGBEN': '固定成本', //固定成本
            'ZONGJIANGJIA': '总降价', //总降价
            'JIANGJIA': '降价', //降价
            'ZXFXGJNHYGLFXBG': '专项分析工具内有关联分析报告', //专项分析工具内有关联分析报告
            'ZXFXGJNMYGLFXBGDHHILJ': '专项分析工具内没有相关的分析报告，且含Heavy Item零件', //专项分析工具内没有关联分析报告，但含heavy item零件
            'ZXFXGJNMYGLFXBGQBHHILJ': '专项分析工具内没有相关的分析报告，且不含Heavy Item零件', //专项分析工具内没有关联分析报告，且不含heavy item零件
            'FEIYONGZONGEHEYINGXIANGDANJIABUENGWEIKONG': '费用总额和影响单价不能为空', //费用总额和影响单价不能为空

            'QSRCLZBHMC': '请输入材料组编号/名称',//请输入材料组编号/名称
            'QSRRFQH': '请输入RFQ号',//请输入RFQ号
            'BOBFXK': 'BoB分析库',//BoB分析库
            'FXMC': '分析名称',//分析名称
            'BQWFCXDJGSRCWHBCZQQRHCXSR': '抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入',//抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入
            'QXZXYCZDSJ': '请选择需要操作的数据', //请选择需要操作的数据
            'ZJSCSH': '最近上传时间:', //最近上传时间
        },
        'MEK':{
            'QIEHUANCAILIAOZU':"切换材料组"
        }
    }
    var xmlHttp = ''
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }else{
        // eslint-disable-next-line no-undef
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
            const data = JSON.parse(xmlHttp.responseText)
            i18n.setLocaleMessage('zh', Object.assign(oldLanguage,data.data.zh))
        }
    }
    xmlHttp.open("GET", "http://10.122.18.136:8088/i18n/getTranslationMap?from=sourcing",false);
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.setRequestHeader("Accept","*/*");
    xmlHttp.send()
}))
