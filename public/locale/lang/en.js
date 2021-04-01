(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
        typeof define === 'function' && define.amd ? define(['i18n'], factory) :
            (global = global || self, factory(window.i18n))
}(this, function (i18n) {
    'use strict'
    i18n.setLocaleMessage('en', {
        // ...require('element-ui/lib/locale/lang/en'),
        'delete': "delete",
        'all': 'all',
        'search': 'search',
        'setting': 'setting',
        'pagination': {
            'prev': 'prev',
            'next': 'next',
            'goto': 'go to',
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
            'RFQTARGETPRICESTATUS': 'TargetStatus',
            'RFQPARTNUMBERFSNRRFQBUYER': 'PartNumber/fsnr/rfqNumber/buyer',
            'RFQMODELPROJECT': 'ModelProject',
            'RFQPARTITEMTYPE': 'ItemType',
            'RFQPLEASECHOOSE': 'Please Choose',
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
            'PARTSPROCUREPARTNUMBER': 'Number',
            'PARTSPROCUREPARTNAMEZH': 'Name (ZH)',
            'PARTSPROCUREPARTNAMEDE': 'Name (DE)',
            'PARTSPROCUREPURCHASINGFACTORY': 'Purchasing Factory',
            'PARTSPROCUREPARTITEMTYPE': 'Item Type',
            'PARTSPROCUREVEHICLECATEGORIES': 'Vehicle Categories',
            'PARTSPROCUREMODELPROJECT': 'Model Project',
            'PARTSPROCUREPARTSTATUS': 'Part Status',
            'PARTSPROCURESTATUS': 'Status',
            'PARTSPROCUREINQUIRYBUYER': 'Inquiry Buyer',
            'PARTSPROCURELINIE': 'Linie',
            'PARTSPROCURECF': 'Cf',
            'PARTSPROCURE': 'Please Enter The Number, Separated By Multiple Commas',
            'PLEENTER': 'Please Enter',
            'CHOOSE': 'Please Choose',
            "CF": 'CF'
        },

        'partsignLanguage': {
            'XunYuanZhiXing': 'Sourcing Execution',    //寻源执行
            'JinDuJianKong': 'Progress Monitoring',    //进度监控
            'LingJianQianShou': 'Signing',    //零件签收
            'CaiGouXiangMuJianLi': 'Procurement Project Establishment',    //采购项目建立
            'RfqguanLi': 'Rfq Management',    //RFQ管理
            'DingDianGuanLi': 'Point Management',    //定点管理
            'RiZhi': 'Log',    //日志
            'LingJianHao': 'Number',    //零件号
            'LingJianMingChengZH': 'Name (zh)',    //零件名称（中）
            'SheJiKeShi': 'Design Department',    //设计科室
            'GongChengShi': 'Engineer',    //工程师
            'CheXingXiangMu': 'Model Project',    //车型项目
            'XinXiDanFenLei': 'Information Sheet Classification',    //信息单分类
            'XinXiDanZhuangTai': 'Information Sheet Status',    //信息单状态
            'XinXiDanLiuShuiHao': 'Information Single Serial Number',    //信息单流水号
            'XunJiaZiLiaoZhuangTai': 'Inquiry Data Status',    //询价资料状态
            'MeiCheYongLiangZhuangTai': 'Usage Status Per Vehicle',    //每车用量状态
            'QingShuRu': 'Please Enter',    //请输入
            'QingXuanZe': 'Please Choose',    //请选择
            'QueRen': 'Confirm',    //确认
            'ZhongZhi': 'Reset',    //重置
            'XinJianXinXiDanQianShou': 'Receipt Of New Information Sheet',    //新件信息单签收
            'ZhuanPai': 'Transfer',    //转派
            'QianShou': 'Sign',    //签收
            'TuiHui': 'Return',    //退回
            //'XinXiDanLiuShuiHao':'Information Single Serial Number',    //信息单流水号
            //'LingJianHao':'Number',    //零件号
            'LingJianMingZH': 'Name (zh)',    //零件名（中）
            'LingJianMingDE': 'Name (de）',    //零件名（德）
            //'CheXingXiangMu':'Model Project',    //车型项目
            //'SheJiKeShi':'Design Department',    //设计科室
            //'GongChengShi':'Engineer',    //工程师
            'XinXiDanLeiXing': 'Information Sheet Type',    //信息单类型
            //'XinXiDanZhuangTai':'Information Sheet Status',    //信息单状态
            //'XunJiaZiLiaoZhuangTai':'Inquiry Data Status',    //询价资料状态
            //'MeiCheYongLiangZhuangTai':'Usage Status Per Vehicle',    //每车用量状态
            'XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu': 'Display Records From Records To Records In Total',    //显示第    条到    条记录，共    条记录
            'ShangYiYe': 'Previous Page',    //上一页
            'XiaYiYe': 'Next Page',    //下一页
            'QianWangYe': 'Go To Page'    //前往    页
        },

        /*
        <!------------------------------------------------------------------------>
        <!--                                                                   --->
        <!------------------------------------------------------------------------>
        */

        'LK_ZUIXINSHENQINGZHUANGTAI': 'Latest Application Status',//最新申请状态
        'LK_ZUIXINSHENQINGRIQI': 'Latest Application Date',//最新申请日期
        'LK_ZUIXINFANHUIRIQI': 'Latest Response Date',//最新返回日期
        'LK_ZUIXINRWJIA': 'Latest RW Price',//最新RW价
        'LK_ZHUANGXIANGSHU': 'Name of Containers',//装箱数
        'LK_ZHUANXUNJIA': 'To inquiry',//转询价
        'LK_ZHUANTANPAN': 'To Negotiation',//转谈判
        'LK_ZHUANPAIPINGFENRENWU': 'Reassign Rating Task',//转派评分任务
        'LK_ZHUANPAI': 'Reassign',//转派
        'LK_ZHONGZHI': 'Reset',//重置
        'LK_ZHONGXINSHENQING': 'Reapply',//重新申请
        'LK_ZHONGLIANG': 'Weight',//重量
        'LK_ZHILIANG': 'Quality',//质量
        'LK_ZHIFUTIAOKUAN': 'Payment Terms',//支付条款
        'LK_ZENGJIADERENKEFEIYUAN': 'Addtional approval fee (Yuan)',//增加的认可费（元）
        'LK_ZANWUSHUJU': 'No Data',//暂无数据
        'LK_ZAISHENQINGCAIWUMUBIAOJIA': 'Reapply CF Target Price',//再申请财务目标价
        'LK_YUANPEICHANG': 'Old factory',//原配厂
        'LK_YONGLIANG': 'Usage',//用量
        'LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU': 'Sourcer meeting remark',//易询价采购员上会备注
        'LK_YIXUNJIAGONGYINGSHANG': 'Supplier with inquiry',//已询价供应商
        'LK_YIBAOJIAGONGYINGSHANG': 'Supplier with quotation',//已报价供应商
        'LK_YAOQIUCSCHUIYIRIQI': 'Request CSC Meeting Date',//要求CSC会议日期
        'LK_YANYONGCHEXINGDALEIDAIMA': 'Model Sequence No.',//沿用车型大类代码
        'LK_XUNJIAZILIAOZHUANGTAI': 'Inquiry document status',//询价资料状态
        'LK_XUNJIAZILIAO': 'Drawing for inquiry',//询价资料
        'LK_XUNJIAFUJIAN': 'Inquiry attachments',//询价附件
        'LK_XUNJIACHANLIANGJIHUA': 'Inquiry Volume Plan',//询价产量计划
        'LK_XUNJIACAIGOUYUANBEIZHU': 'Sourcer remark',//询价采购员备注
        'LK_XUNJIACAIGOUYUAN': 'Source owner',//询价采购员
        'LK_XUNYUANZHIHANG': 'Execute Soucring',//寻源执行
        'LK_XUANZHUANGJIAN': 'Optional',//选装件
        'LK_XINXILIUSHUIDANHAO': 'TP Sequence No.',//信息流水单号
        'LK_XINXIDANZHUANGTAI': 'Sheet status',//信息单状态
        'LK_XINXIDANXIANGQING': 'TP detailed info.',//信息单详情
        'LK_XINXIDANSHENGCHENGSHIJIAN': 'TP generation time',//信息单生成时间
        'LK_XINXIDANLIUSHUIHAO': 'TP sequence ID',//信息单流水号
        'LK_XINXIDANLEIXING': 'Sheet type',//信息单类型
        'LK_XINXIDANFENLEI': 'Sheet type',//信息单分类
        'LK_XINSHENQINGCAIWUMUBIAOJIA': 'Apply New CF Target Price',//新申请财务目标价
        'LK_XINJIANXINXIDANLIUSHUIHAO': 'Part info. sheet no.',//新建信息单流水号
        'LK_XINJIANXINXIDANBEIZHU': 'Create new part info. remark',//新建信息单备注
        'LK_XINJIANRFQLUNCI': 'Create New RFQ Round',//新建RFQ轮次
        'LK_XINJIANRFQ': 'Create New RFQ',//新建RFQ
        'LK_XINJIANXINXIDANQIANSHOU': 'TP Apps Sign in',//新件信息单签收
        'LK_XIANGQINGXINXI': 'Detail',//详情信息
        'LK_XIANGGUANCHEXING': 'Relevent car type',//相关车型
        'LK_XIAZAI': 'Download',//下载
        'LK_XIAYIYE': 'Next',//下一页
        'LK_WULIUYAOQIU': 'Logistics requirement',//物流要求
        'LK_WULIUBIAOZHUN': 'Logistics Standard',//物流标准
        'LK_WENJIANMINGCHENG': 'File Name',//文件名称
        'LK_WENJIANMING': 'File Name',//文件名
        'LK_WENJIANDAXIAOMB': 'File Size (MB)',//文件大小（MB）
        'LK_WEIHUREN': 'Maintainer',//维护人
        'LK_WEIHU': 'Maintain',//维护
        'LK_WAIBUKAIFAFEIYUAN': 'External Developer Cost (Yuan)',//外部开发费（元）
        'LK_TUIHUIYUANYIN': 'Return reason',//退回原因
        'LK_TUIHUI': 'Return',//退回
        'LK_TUISONGSHIJIAN': 'Forwarded time',//推送时间
        'LK_TUZHIRIQI': 'Spec. date',//图纸日期
        'LK_TUZHIHETPDANXIANGQING': 'Blueprint and TP Order',//图纸和信息单详情
        'LK_TUZHI': 'Blueprint',//图纸
        'LK_TOUZIYUSUAN': 'Investment Budget',//投资预算
        'LK_TONGZHIYIBAOJIAGONGYINGSHANG': 'Inform suppliers with quotation',//通知已报价供应商
        'LK_TONGZHIQUANBUGONGYINGSHANG': 'Inform all suppliers',//通知全部供应商
        'LK_TIANJIAZIDINGYIPINGFENXIANG': 'Add defined column',//添加自定义评分项
        'LK_TIANJIAGONGYINGSHANG': 'Add supplier',//添加供应商
        'LK_TIANJIA': 'Insert',//添加
        'LK_TIJIAO': 'Submit',//提交
        'LK_TESHUYAOQIU': 'Special Requirements',//特殊要求
        'LK_TESHULINGJIANLEIXING': 'Special Parts Type',//特殊零件类型
        'LK_TANPANZHUSHOU': 'Negotiation Assistant',//谈判助手
        'LK_ENTER_SEARCH_SUPPLIER_NAME_FACOTRY': 'Enter to Search for Supplier Name, Facotry Type…',//输入查询供应商名称、厂商类型...
        'LK_SHIFOUYANZHENGCBD': 'CBD verified or not',//是否验证CBD
        'LK_SHIFOUSHENDUGUOCHANHUA': 'Deep localize or not',//是否深度国产化
        'LK_CONFIRM_SIGN_RECORD_TIPS': 'Confirm to sign the new record?',//是否确认对新件信息单进行签收？
        'LK_SHIFOUERCIJIAN': 'Second or not',//是否二次件
        'LK_SHIJIANJIHUA': 'Time Schedule',//时间计划
        'LK_SHENGCHENGFSHAO': 'Generate FS',//生成FS号
        'LK_SHENGCHENGFS_GSNR': 'Generate FS/GSNR',//生成FS/GSNR
        'LK_SHENPIZHUANGTAI': 'Approval Status',//审批状态
        'LK_SHENPIYIJIAN': 'Approval Opinion',//审批意见
        'LK_SHENDUGUOCHANHUADAIMA': 'Deep localize code',//深度国产化代码
        'LK_SHENDUGUOCHANHUABEIZHU': 'Deep localize remark',//深度国产化备注
        'LK_SHENQINGZHUANGTAI': 'Application Status',//申请状态
        'LK_SHENQINGYUANYIN': 'Reason of Application',//申请原因
        'LK_SHENQINGRIQI': 'Application Date ',//申请日期
        'LK_SHENQINGMUBIAOJIA': 'Apply Target Price',//申请目标价
        'LK_SHENQINGLEIXING': 'Application Type',//申请类型
        'LK_SHENQINGLEIBIE': 'Application Type',//申请类别
        'LK_SHENQINGCAIWUMUBIAOJIA': 'Apply CF target price',//申请财务目标价
        'LK_SHENQINGBEIZHU': 'Application Remarks',//申请备注
        'LK_SHENQINGRWJIA': 'Apply RW Price',//申请RW价
        'LK_SHEZHIGONGYIZU': 'Set Craft Group',//设置工艺组
        'LK_SHEJIKESHI': 'TP dept.',//设计科室
        'LK_SHEJIGONGCHENGSHIXINGMING': 'TP name',//设计工程师姓名
        'LK_SHEJIGONGCHENGSHIHAO': 'TP owner NO.',//设计工程师号
        'LK_SHANGYIYE': 'Prevoius',//上一页
        'LK_SHANGCHUANRIQI': 'Upload date',//上传日期
        'LK_SHANGCHUANREN': 'Uploader',//上传人
        'LK_SHANGCHUANFUJIAN': 'Upload attachments',//上传附件
        'LK_SHANCHUGONGYINGSHANG': 'Delete Supplier',//删除供应商
        'LK_SHANCHU': 'Delete',//删除
        'LK_SEBIAOHAO': 'Color code',//色标号
        'LK_RUCHANGBAOZHUANGMINGCHENG': 'Entry Packaging Name',//入场包装名称
        'LK_RIZHI': 'Log',//日志
        'LK_RENKEZHOUQIZHOU': 'Authentication Period (Week) ',//认可周期（周）
        'LK_QUEREN': 'Confirm',//确认
        'LK_QUANBUBANBEN': 'All Versions',//全部版本
        'LK_QUXIAOYUANYIN': 'Terminate reason',//取消原因
        'LK_QUXIAOLINGJIANCAIGOUXIANGMU': 'Cancel Parts Project',//取消零件采购项目
        'LK_QINGXUANZE': 'Please Select',//请选择
        'LK_QINGSHURU': 'Please Enter',//请输入
        'LK_QIANSHOURIQI': 'Sign in Date',//签收日期
        'LK_QIANSHOUQUEREN': 'Confirm sign in',//签收确认
        'LK_QIANSHOU': 'Sign in',//签收
        'LK_QIDONGXUNJIA': 'Start inquiry',//启动询价
        'LK_QIDONGXIANGMU': 'Start Project',//启动项目
        'LK_QITAXINXI': 'Other Information',//其他信息
        'LK_QITAPEIZHI': 'Other Configuration',//其他配置
        'LK_QIWANGMUBIAOJIA': 'Target Price',//期望目标价
        'LK_PINGFENREN': 'Grader',//评分人
        'LK_PINGFEN': 'Grade',//评分
        'LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU': 'Batch maintenance',//批量维护零件采购项目
        'LK_PILIANGWEIHU': 'Batch maintenance',//批量维护
        'LK_PEIZHIBIANMA': 'Configuration ID',//配置编码
        'LK_PEIZHIBILI': 'Configure Ratio',//配置比例
        'LK_NIANFEN': 'Year',//年份
        'LK_MUBIAOJIAZHUANGTAI': 'CF Target price status',//目标价状态
        'LK_MUBIAOJIA': 'Target Price',//目标价
        'LK_MOJUYUSUANSHENQING': 'Tooling Budget Application',//模具预算申请
        'LK_MEICHEYONGLIANGZHUANGTAI': 'Dosage status',//每车用量状态
        'LK_MEICHEYONGLIANG': 'Per Car Dosage',//每车用量
        'LK_MAOZHONGKG': 'Gross Weight (KG)',//毛重（KG）
        'LK_LUNCILEIXING': 'Round type',//轮次类型
        'LK_LINGJIANZHUANGTAI': 'Parts Status',//零件状态
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG': 'Part COP property desc.(Cn)',//零件沿用性质描述(中)
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUYING': 'Part COP property desc.(En)',//零件沿用性质描述(英)
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUDE': 'Part COP property desc.(De)',//零件沿用性质描述(德)
        'LK_LINGJIANYANYONGXINGZHIDAIMA': 'Part COP property code',//零件沿用性质代码
        'LK_LINGJIANXIANGMULEIXING': 'Parts project type',//零件项目类型
        'LK_LINGJIANSUOSHUGONGYIHAO': 'No. of the part\'s craft',//零件所属工艺号
        'LK_LINGJIANSUOSHUCAILIAOZUMINGCHENGZHONG': 'Parts\' Material Group Name(Zh)',//零件所属材料组名称（中）
        'LK_LINGJIANSUOSHUCAILIAOZUMINGCHENGDE': 'Parts\' Material Group Name(De)',//零件所属材料组名称（德）
        'LK_LINGJIANSUOSHUCAILIAOZULINEBUMEN': 'Part\'s Material Group\'s Linie Department',//零件所属材料组LINE部门
        'LK_LINGJIANSUOSHUCAILIAOBIANHAO': 'Code of the part\'s material group',//零件所属材料编号
        'LK_LINGJIANQINGDAN': 'Parts List',//零件清单
        'LK_LINGJIANQIANSHOU': 'Parts sign in',//零件签收
        'LK_LINGJIANPINGFEN': 'Parts Rating',//零件评分
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG': 'Part platform property desc.(Cn)',//零件平台性质描述(中)
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING': 'Part platform property desc.(En)',//零件平台性质描述(英)
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE': 'Part platform property desc.(De)',//零件平台性质描述(德)
        'LK_LINGJIANPINGTAIXINGZHIDAIMA': 'Part platform property code',//零件平台性质代码
        'LK_LINGJIANMINGCHENGZHONG': 'Parts Name (Cn)',//零件名称（中）
        'LK_LINGJIANMINGCHENGDE': 'Parts Name (De)',//零件名称（德）
        'LK_LINGJIANMINGCHENG': 'Parts Name',//零件名称
        'LK_LINGJIANMINGZHONG': 'Parts Name (Cn)',//零件名（中）
        'LK_LINGJIANMINGYING': 'Part Name(En)',//零件名（英）
        'LK_LINGJIANMINGDE': 'Parts Name(De)',//零件名（德）
        'LK_LINGJIANMEICHEYONGLIANG': 'Parts Dosage Per Car',//零件每车用量
        'LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG': 'Parts Trade Property Description(Cn)',//零件贸易属性描述(中)
        'LK_LINGJIANMAOYISHUXINGMIAOSHUYING': 'Parts Trade Property Description(En)',//零件贸易属性描述(英)
        'LK_LINGJIANMAOYISHUXINGMIAOSHUDE': 'Parts Trade Property Description(De)',//零件贸易属性描述(德)
        'LK_LINGJIANMAOYISHUXINGDAIMA': 'Part Trade Property Code',//零件贸易属性代码
        'LK_LINGJIANLEIXINGDAIMA': 'Part Type Code',//零件类型代码
        'LK_LINGJIANLEIXING': 'Parts Type',//零件类型
        'LK_LINGJIANJIAGONGCHENGDUDAIMA': 'Part processing status Code',//零件加工程度代码
        'LK_LINGJIANJIAGONGCHENGDUZHONG': 'Part processing status desc.(Cn)',//零件加工程度(中)
        'LK_LINGJIANJIAGONGCHENGDUYING': 'Part processing status desc.(En)',//零件加工程度(英)
        'LK_LINGJIANJIAGONGCHENGDUDE': 'Part processing status desc.(De)',//零件加工程度(德)
        'LK_LINGJIANHAODIYIBUFEN': '1st part of part no.',//零件号第一部分
        'LK_LINGJIANHAODIWUBUFEN': '5th part of part no.',//零件号第五部分
        'LK_LINGJIANHAODISIBUFEN': '4th part of part no.',//零件号第四部分
        'LK_LINGJIANHAODISANBUFEN': '3rd part of part no.',//零件号第三部分
        'LK_LINGJIANHAODIERBUFEN': '2nd part of part no.',//零件号第二部分
        'LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN': 'Parts No./FSNR/RFQ No./Buyer',//零件号/FSNR/RFQ编号/采购员
        'LK_LINGJIANHAO': 'Parts No.',//零件号
        'LK_LINGJIANCHANLIANGJILU': 'Parts Yield Record',//零件产量记录
        'LK_LINGJIANCHANLIANGJIHUA': 'Parts Yield Planning',//零件产量计划
        'LK_LINGJIANCHANLIANG': 'Parts Yield',//零件产量
        'LK_LINGJIANCAIGOUXIANGMUGUANLI': 'Parts Project Management',//零件采购项目管理
        'LK_LINGJIANCAIGOUXIANGMU': 'Parts Project',//零件采购项目
        'LK_LISHISHIYONGGAILÜ': 'Historical Applicable Rate',//历史适用概率
        'LK_KAISHINIANFEN': 'Start Year',//开始年份
        'LK_JUJUE': 'Deny',//拒绝
        'LK_JINDUJIANKONG': 'Monitr progress',//进度监控
        'LK_JIESHUXIANGMU': 'End Project',//结束项目
        'LK_JIESHUBENLUNXUNJIA': 'Finish RFQ round',//结束本轮询价
        'LK_JIAOFU': 'Delivery',//交付
        'LK_JIAGEMINGXI': 'Price Details',//价格明细
        'LK_JISHUJIAOLIUHUI': 'Techonology Meeting',//技术交底会
        'LK_JIHUORFQ': 'Activate RFQ',//激活RFQ
        'LK_JICHUXINXI': 'Basic information',//基础信息
        'LK_HUOBI': 'Currency',//货币
        'LK_HUIYISHIJIAN': 'Meeting time',//会议时间
        'LK_HUIYIQITAXINXI': 'other information for the meeting',//会议其它信息
        'LK_HUIYIJIBENXINXI': 'Basic information about the meeting',//会议基本信息
        'LK_HUIYIDIDIAN': 'Meeting place',//会议地点
        'LK_GUANBIRFQ': 'Close RFQ',//关闭RFQ
        'LK_GONGYINGSHANGSHENGCHANCHANGDI': 'Supplier Manufacturing Spot',//供应商生产场地
        'LK_GONGYINGSHANGPINGFENFUJIAN': 'Supplier Rating Attachment',//供应商评分附件
        'LK_GONGYINGSHANGPINGFEN': 'Supplier Rating',//供应商评分
        'LK_GONGYINGSHANGMINGCHENG': 'Supplier',//供应商名称
        'LK_GONGYINGSHANGMING': 'Supplier',//供应商名
        'LK_GONGYINGSHANGCAILIAOZHUNBEI': 'Supplier\'s material preparation',//供应商材料准备
        'LK_GONGYINGSHANGSAPHAO': 'Supplier SAP ID',//供应商SAP号
        'LK_GONGYINGSHANG360SHITU': 'Supplier 360° View',//供应商360°视图
        'LK_GONGHUOFANGSHI': 'Supply method',//供货方式
        'LK_GONGYI': 'Technique',//工艺
        'LK_GONGCHENGSHI': 'TP owner',//工程师
        'LK_GENGXINZHIXUNJIACHANLIANG': 'Update to Inquiry Volume',//更新至询价产量
        'LK_GENGXINYUANYIN': 'Update Reason',//更新原因
        'LK_FUJIANLIEBIAO': 'Attachment List ',//附件列表
        'LK_FUZERENYOUXIANG': 'Person in Charge‘s email',//负责人邮箱
        'LK_FUZERENDIANHUA': 'Person in Charge‘s telephone',//负责人电话
        'LK_FUZEREN': 'Person in Charge',//负责人
        'LK_FANHUI': 'Back',//返回
        'LK_FASONGZHIWODEYOUXIANG': 'Send to my mailbox',//发送至我的邮箱
        'LK_FASONGXUNJIA': 'Send Inquiry',//发送询价
        'LK_FADONGJIPEIZHI': 'Engine Configuration',//发动机配置
        'LK_FADONGJILEIXING': 'Engine Type',//发动机类型
        'LK_FACHUXUNJIA': 'RFQ send out',//发出询价
        'LK_DINGDIANGUANLI': 'Manage SQO',//定点管理
        'LK_DIANCHIYONGLIANG': 'Battery Usage',//电池用量
        'LK_DIANCHIRONGLIANG': 'Battery Capacity',//电池容量
        'LK_DENGJIPEIZHI': 'Level Configuration',//等级配置
        'LK_DAOCHU': 'Export',//导出
        'LK_DANGQIANLUNCI': 'Current round',//当前轮次
        'LK_DANWEI': 'Unit',//单位
        'LK_DAIQUERENBANBEN': 'Unconfirmed Version',//待确认版本
        'LK_DAIBANSHIXIANG': 'To-Do List',//待办事项
        'LK_DAXIAOMB': 'Size(MB)',//大小（MB）
        'LK_CONGLINGJIANPAISHENG': 'created from part',//从零件派生
        'LK_CHUANGJIANSHIJIAN': 'Creation date',//创建时间
        'LK_CHUANGJIANRIQI': 'Creation date',//创建日期
        'LK_CHUANGJIANRENXINGMING': 'Creator name',//创建人姓名
        'LK_CHUANGJIANRENGONGHAO': 'Creator employee no.',//创建人工号
        'LK_CHUANGJIANDINGDIANSHENQING': 'Create SQO Application',//创建定点申请
        'LK_CHICUN': 'Dimension',//尺寸
        'LK_CHENGBEN': 'Cost',//成本
        'LK_CHEHUI': 'Withdraw',//撤回
        'LK_CHEXINGXIANGMUMINGCHENG': 'Car Project Name',//车型项目名称
        'LK_CHEXINGXIANGMUSOP': 'Car Project SOP',//车型项目SOP
        'LK_CHEXINGXIANGMUPVS': 'Car Project PVS',//车型项目PVS
        'LK_CHEXINGXIANGMU0S': 'Car Project 0S',//车型项目0S
        'LK_CHEXINGXIANGMU': 'Car Project',//车型项目
        'LK_CHEXINGSHENGCHANNIANXIAN': 'Car Production Life',//车型生产年限
        'LK_CHEXINGDENGJI': 'Car Level',//车型等级
        'LK_CHEXINGDALEI': 'Model',//车型大类
        'LK_CHEXING': 'Car Type',//车型
        'LK_CHANLIANGPC': 'Volume(PC)',//产量（PC）
        'LK_CHAIFENCAIGOUGONGCHANG': 'Separate Purchasing Factories',//拆分采购工厂
        'LK_CHAZHAOGONGYIZUGONGYINGSHANG': 'Find Craft Group Supplier',//查找工艺组供应商
        'LK_CHAKANQUANBUBANBEN': 'View All Versions',//查看全部版本
        'LK_CAOZUOREN': 'Handler',//操作人
        'LK_CAOZUO': 'Operation',//操作
        'LK_CANKAOLINGJIANHAO': 'Reference Parts No.',//参考零件号
        'LK_CANKAOCHEXING': 'Reference Model',//参考车型
        'LK_CANKAOCHANLIANGJISHIJIANJIHUA': 'Volume reference and Time Schedule',//参考产量及时间计划
        'LK_CANKAOBAOZHUANGZHANGMM': 'Reference Packaging - Length (mm)',//参考包装长(mm)
        'LK_CANKAOBAOZHUANGQIJULEIXING': 'Reference Packaging Equipment Type',//参考包装器具类型
        'LK_CANKAOBAOZHUANGKUANMM': 'Reference Packaging - Width (mm)',//参考包装宽（mm）
        'LK_CANKAOBAOZHUANGGAOMM': 'Reference packaging height (mm)',//参考包装高（mm）
        'LK_CANKAOBAOZHUANGDANJIAYUAN': 'Reference Unit Packaging Price (Yuan)',//参考包装单价（元）
        'LK_CANKAOBAOZHUANG': 'Packaging Reference',//参考包装
        'LK_CAIGOUYUANGONGHAO': 'Buyer ID',//采购员工号
        'LK_CAIGOUYUAN': 'Buyer',//采购员
        'LK_CAIGOUXIANGMUXINXI': 'Project Information',//采购项目信息
        'LK_CAIGOUXIANGMUJIANLI': 'Create Project',//采购项目建立
        'LK_CAIGOUTIAOKUAN': 'Purchasing Terms',//采购条款
        'LK_CAIGOUGONGCHANG': 'Purchasing Factory',//采购工厂
        'LK_CAIWUMUBIAOJIA': 'CF Target Price',//财务目标价
        'LK_CAILIAOZUXINXI': 'Material Group Information',//材料组信息
        'LK_CAILIAOZUMINGCHENGZHONG': 'Material Group Name(Cn)',//材料组名称（中）
        'LK_CAILIAOZUGONGYISHEZHI': 'Craft info. conf.',//材料组工艺设置
        'LK_CAILIAOZUGONGYIBIANHAO': 'Craft No.',//材料组工艺编号
        'LK_CAILIAOZU': 'Material Group',//材料组
        'LK_CAILIAOGONGYIZUMINGCHENGDE': 'Craft(De)',//材料工艺组名称（德）
        'LK_CAILIAOGONGYIZUMINGCHENGZHONG': 'Craft(Cn)',//材料工艺组名称（中）
        'LK_CAILIAO': 'Material',//材料
        'LK_BUMENPINGFENLEIXING': 'Department Rating Type',//部门评分类型
        'LK_BUMENBIANHAO': 'Department No.',//部门编号
        'LK_BIANSUXIANGPEIZHI': 'Transmission Configuration',//变速箱配置
        'LK_BIANSUXIANGLEIXING': 'Transmission Type',//变速箱类型
        'LK_BIANJI': 'Edit',//编辑
        'LK_BIANHAO': 'ID',//编号
        'LK_BENLUNBAOJIAQIZHISHIJIAN': 'Starting and ending date of the current quotation',//本轮报价起止时间
        'LK_BEIDAITILINGJIAN': 'Replaced Part',//被代替零件
        'LK_BEIZHUXINXI': 'Additional Information',//备注信息
        'LK_BEIZHU': 'Notes',//备注
        'LK_BAOJIAJIEZHIRIQI': 'Quotation deadline',//报价截止日期
        'LK_BAOCUN': 'Save',//保存
        'LK_BAOZHUANGFUZEREN': 'Package Person in Charge',//包装负责人
        'LK_BANBENZHUANGTAI': 'Version Status',//版本状态
        'LK_BANBENHAO': 'Version No.',//版本号
        'LK_TPPINGFENZHUANGTAI': 'TP Rating Status',//TP评分状态
        'LK_SWHAO': 'sw No.',//sw号
        'LK_SVWYAOQIUOTSZHOU': 'SVW required OTS (week)',//SVW要求OTS（周）
        'LK_SVWYAOQIUEMZHOU': 'SVW required EM (week)',//SVW要求EM（周）
        'LK_SVWSHIMO': 'SVW requires the first trial',//SVW要求EM（周）
        'LK_SUM': 'SUM',//SUM
        'LK_SOPRIQI': 'SOP Date',//SOP日期
        'LK_SAICVOLKSWAGENKUCUN_XIAOSHI': 'SAIC VOLKASWAGEN Stock_Hour',//SAIC VOLKSWAGEN库存_小时
        'LK_SAICVOLKSWAGENKONGXIANGCAOZUO_XIAOSHI': 'SAIC VOLKASWAGEN Empty Container_Hour',//SAIC VOLKSWAGEN空箱操作_小时
        'LK_RWJIA': 'RW Price',//RW价
        'LK_RFQZONGHEGUANLI': 'RFQ comprehensive management',//RFQ综合管理
        'LK_RFQZHUANGTAI': 'RFQ status',//RFQ状态
        'LK_RFQMINGCHENG': 'RFQ name',//RFQ名称
        'LK_RFQLEIXING': 'RFQ type',//RFQ类型
        'LK_RFQGUANLI': 'RFQ Managemnet',//RFQ管理
        'LK_RFQBIANHAO': 'RFQ number ',//RFQ编号
        'LK_MTZLINGJIAN': 'MTZ Parts',//MTZ零件
        'LK_MQPINGFENZHUANGTAI': 'MQ Rating Status',//MQ评分状态
        'LK_MBDL': 'MBDL',//MBDL
        'LK_LINIESHANGHUIBEIZHU': 'Linie meeting remark',//Linie上会备注
        'LK_LINIEBUMEN': 'Linie Department',//LINIE部门
        'LK_LINIEBEIZHU': 'Linie Remark',//Linie备注
        'LK_INBOUNDWULIUFANGSHI': 'INBOUND Logistics Mode',//INBOUND物流方式
        'LK_FSHAO': 'FS No.',//FS号
        'LK_FS_GSHAO': 'FS/GS No.',//FS/GS号
        'LK_CSFPFUZEREN': 'CSF（P）Person in Charge',//CSF（P）负责人
        'LK_CS_1SHANGHUIBEIZHU': 'CS*1 meeting remark',//CS*1上会备注
        'LK_CS_1BEIZHU': 'CS*1 Remark',//CS*1备注
        'LK_CFFUZEREN': 'CSF(P) Owner',//CSF(P) 负责人
        'LK_CBDXUANZE': 'CBD choice',//CBD选择
        'LK_CBDSHEZHI': 'CBD Setting',//CBD设置
        'LK_BOMDANXINXI': 'BOM information',//BOM单信息
        'LK_BDLLIEBIAO': 'BDL List',//BDL列表
        'LK_AEKOHAO': 'Aeko No.',//Aeko号
        'LK_QINGSHURULINGJIANHAO':'Please Enter',//请输入零件号
        'LK_QINGSHURULINGJIANMING':'Please Enter',//请输入零件名（中）
        'LK_QINGTIANXIESHEJIKESHI':'Please Enter',//请填写设计科室
        'LK_QINGTIANXIEGONGCHENGSHI':'Please Enter',//请填写工程师
        'LK_QINGTIANXIEXINXIDANLIUSHUIHAO':'Please Enter',//请填写信息单流水号
        'LK_RIHZICHAKAN':'Show Log', //日志查看
        'LK_CFKONGZHIYUAN':'CF Controller', //CF控制员
        'LK_RUKUQIJUCHANG':'nbound Equipment Length (mm)', //入库器具长（mm）
        'LK_RUKUQIJUKUAN':'Inbound Equipment Width (mm) ', //入库器具宽（mm） 
        'LK_RUKUQIJUZHUANGXIANGSHU':'Inbound Equipment Load Number', //入库器具装箱数
        'LK_RUKUQIJUZHONGHEDANJIA':'Inbound Equipment Net Unit Price', //入库器具综合单价
        'LK_RUKUBAOZHUANGMAOZHONG':'Inbound Packaging Gross Weight (Kg)', //入库包装毛重（KG）
        'LK_RUKUQIJUSHOUMING':'Inbound Equipment Useful Life', //入库器具寿命
        'LK_RUKUJICHUNIANWEIXIUFEILV':'Inbound Annual Repair Base Rate', //入库基础年维修费率
        'LK_FASHENGSHIJIAN':'Occurred Time', //发生时间 
        'LK_RUKUQIJUXINGHAO':'Inbound Equipment ID', //入库器具型号  
        'LK_RUKUQIJULEIXING':'Inbound Equipment Type', //入库器具类型  
        'LK_RUKUQIJUZHONGHEDANJIARMB':'Inbound Equipment Net Unit Price (RMB)', //入库器具综合单价  
        'LK_RUKUQIJUZUJINRMBDAY':'Inbound Equipment Rent (RMB/Day)', //入库器具综合单价
        'LK_BENLUNBAOJIAJIEZHISHIJIAN':'Deadline for Current Round of Quotation', //本轮报价截止时间 
        'LK_BENLUNZHUANGTAI':'Current Round Status', //本轮状态 
        'LK_ZAICISHENGQINGCAIWUMUBIAOJIA':'Reapply CF Target Price', //再新申请财务目标价  
        'LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG':'Please enter to search for supplier name, factory…', //请输入查询供应商名称  
        'LK_LINGJIANCAIGOUXIANGMULEIXING':'Parts Project Type', //零件采购项目类型  
        'LK_DUQUYOUXIAODOM':'Read Valid BOM', //读取有效BOM  
        'LK_CHANGJIANGMINGCHNEG':'Task Name', //场景名称/任务名称   
        'LK_SHENGMINGJISHUBANBEN':'Display Public UI Components, Based on second seal of element, current element version', //公共UI组件展示界面，基于element的二次封装，当前element版本
        'LK_BMG':'BMG', //BMG


        //2021-03-31 增加
        // 'LK_XIANGNEIZHOUZHUANCAILIAOZHONGHEJIAGE':'翻箱前器具综合单价（RMB）', //箱内周转材料综合价格 
        'LK_SVWYAOQIUSHOUCISHIMO': 'SVW requires first trial',//SVW要求首次试模
        'LK_BAOCUNBINGCHUANGJIAN': 'Save and Create',//保存并创建
        'LK_NINDANGQIANHAIWEIXUANZE': 'Sorry, you have not selected yet!',//抱歉！您当前还未选择！
        'LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN': 'Sorry, Forward Sourcing not selected!',//抱歉！您当前还未选择询价采购员！
        'LK_BEIZHUBUNENGWEIKONG': 'Sorry, notes cannot be empty!',//抱歉，备注不能为空！
        'LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU': 'Sorry, Please select a craft group data here!',//抱歉，此处必须选择一条工艺组数据
        'LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA': 'Sorry, this Project has ungenerated FSNR, unable to start inquiry',//抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！
        'LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA': 'Sorry, this Project has ungenerated FSNR, unable to add',//抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！
        'LK_LIYOUBUNENGWEIKONG': 'Sorry, reason cannot be empty',//抱歉，理由不能为空！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOQIANSHOUDEXINXIDAN': 'Sorry, no TP records to be signed is selected',//抱歉，您当前还未选择您需要签收的信息单！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOQUXIAODELINGJIANCAIGOUXIANGMU': 'Sorry, no TP records to be cancelled is selected',//抱歉，您当前还未选择您需要取消的零件采购项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU': 'Sorry, no Project is selected to generate FS number!',//抱歉，您当前还未选择您需要生成FS号的零件采购项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU': 'Sorry, no project to batch maintain is selected!',//抱歉，您当前还未选择您需要生批量维护的项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOTUIHUIDEXINXIDAN': 'Sorry, no TP records to be rejected is selected!',//抱歉，您当前还未选择您需要退回的信息单！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU': 'Sorry, no project to be reassign is selected!',//抱歉，您当前还未选择您需要转派的零件采购项目！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU': 'Sorry, no rating task to be reassign is selected!',//抱歉，您当前还未选择您需要转派的评分任务！
        'LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEXINXIDAN': 'Sorry, no TP records to be reassign is selected!',//抱歉，您当前还未选择您需要转派的信息单！
        'LK_NINDANGQIANHAIWEIXUANZERENWU': 'Sorry, you have not selected a task yet!',//抱歉，您当前还未选择任务！
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU': 'Sorry, no project to initiate inquiry is selected!',//抱歉，您当前还未选择需要启动询价的采购项目！
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU': 'Sorry, no projects to apply for target price is selected!',//抱歉，您当前还未选择需要申请目标价的采购项目！
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU': 'Sorry, no project to be added is selected!',//抱歉，您当前还未选择需要添加的采购项目！
        'LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU': 'Selections contain signed records, unable to batch sign in!',//抱歉，您选中的单据中存在已签收的信息单，不能批量签收！
        'LK_YONGHUMINGHUOMIMABUNENGWEIKONG': 'User name or password cannot be empty!',//抱歉，用户名或密码不能为空！
        'LK_BEITIDAILINGJIAN': 'Replaced Parts',//被替代零件 
        'LK_CANKAOLINGJIANMING': 'Reference Part Name',//参考零件名 
        'LK_CHANGJINGMINGCHENGRENWUMINGCHENG': 'Task Name',//场景名称/任务名称 
        'LK_DAORUSHIJIAN': 'Import time',//导入时间
        'LK_DIANJISHANGCHUAN': 'Click to Upload',//点击上传 
        'LK_DUQUYOUXIAOBOM': 'Read Valid BOM',//读取有效BOM 
        'LK_FANXIANGQIANBAOZHUANGMAOZHONGKG': '翻箱前包装毛重（KG）English',//翻箱前包装毛重（KG）
        'LK_FANXIANGQIANJICHUNIANWEIXIULÜ': '翻箱前基础年维修率 English',//翻箱前基础年维修率 
        'LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI': '翻箱前器具返程折叠比 English',//翻箱前器具返程折叠比 
        'LK_FANXIANGQIANQIJUGAOMM': '翻箱前器具高（mm）English',//翻箱前器具高（mm）
        'LK_FANXIANGQIANQIJUHAO': '翻箱前器具号 English',//翻箱前器具号 
        'LK_FANXIANGQIANQIJUKUANMM': '翻箱前器具宽（mm）English',//翻箱前器具宽（mm）
        'LK_FANXIANGQIANQIJULEIXING': '翻箱前器具类型 English',//翻箱前器具类型 
        'LK_FANXIANGQIANQIJUSHOUMING': '翻箱前器具寿命 English',//翻箱前器具寿命 
        'LK_FANXIANGQIANQIJUSHU': '翻箱前器具数 English',//翻箱前器具数 
        'LK_FANXIANGQIANQIJUZHANGMM': '翻箱前器具长（mm）English',//翻箱前器具长（mm）
        'LK_FANXIANGQIANQIJUZONGHEDANJIARMB': '翻箱前器具综合单价（RMB）English',//翻箱前器具综合单价（RMB）
        'LK_FANXIANGQIANQIJUZUJINRMBDAY': '翻箱前器具租金（RMB/DAY）English',//翻箱前器具租金（RMB/DAY）
        'LK_GONGGONGUIZUJIANZHANSHIJIEMIANJIYUELEMENTDEERCIFENGZHUANGDANGQIANELEMENTBANBEN': 'Display Public UI Components, Based on second seal of element, current element version',//公共UI组件展示界面，基于element的二次封装，当前element版本 
        'LK_JINRIDAIBAN': 'Due Today',//今日待办 
        'LK_LINGJIANSUOSHUCAILIAOZULINIEBUMEN': 'Part\'s Material Group\'s Linie Department',//零件所属材料组LINIE部门 
        'LK_LINGJIANSUOSHUCAILIAOZUDEWENMINGCHENG': 'Part\'s Material Group Name(De)',//零件所属材料组德文名称 
        'LK_LINGJIANSUOSHUCAILIAOZUZHONGWENMINGCHENG': 'Part\'s Material Group Name(Zh)',//零件所属材料组中文名称 
        'LK_LINGJIANSUOSHUGONGYIBIANHAO': 'No. of the part\'s craft',//零件所属工艺编号
        'LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU': '您是否确认对新件信息单进行签收？ English',//您是否确认对新件信息单进行签收？
        'LK_PUTONGLUNCI': 'Regular Round',//普通轮次
        'LK_QIANDUANBAOZHUANGMINGCHENG': '前段包装名称 english',//前段包装名称 
        'LK_QINGSHURUCHAXUNGONGYINGSHANGMINGCHENGCHANGSHANG': 'Please enter to search for supplier name, factory…',//请输入查询供应商名称,厂商...
        'LK_RENWUZHONGXIN': 'Task Center',//任务中心 
        'LK_RIZHICHAKAN': 'Show Log',//日志查看 
        'LK_RUKUBAOZHUANGMAOZHONGKG': 'Inbound Packaging Gross Weight (Kg)',//入库包装毛重（KG）
        'LK_RUKUJICHUNIANWEIXIUFEILÜ': 'Inbound Annual Repair Base Rate',//入库基础年维修费率
        'LK_RUKUQIJUFANCHENGSHEDIEBI': '入库器具返程折叠比 english',//入库器具返程折叠比 
        'LK_RUKUQIJUKUANMM': 'Inbound Equipment Width (mm)',//入库器具宽（mm） 
        'LK_RUKUQIJUZHANGMM': 'Inbound Equipment Length (mm)',//入库器具长（mm）
        'LK_RUKUQIJUZONGHEDANJIA': 'Inbound Equipment Net Unit Price',//入库器具综合单价 
        'LK_SHEJIGONGCHENGSHIGONGHAO': 'TP owner No.',//设计工程师工号 
        'LK_SHIFOUQUERENSHANCHU': '温馨提示 English',//是否确认删除?
        'LK_TUZHIHETPXIANGQINGYE': 'Blueprint and TP Information',//图纸和TP详情页 
        'LK_WENXINTISHI': '温馨提示',//温馨提示
        'LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE': '箱内周转材料综合价格 english',//箱内周转材料综合价格 
        'LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING': '箱内周转材料综合寿命 english',//箱内周转材料综合寿命 
        'LK_XIANGMUCHEXING': 'Project Car Type',//项目车型 
        'LK_XINJIANXINXILIUSHUIDANHAO': 'New Tp Sequence No.',//新件信息流水单号 
        'LK_XUNJIATUZHI': 'Inquiry Blueprint',//询价图纸 
        'LK_YUQIDAIBAN': 'Overdue',//逾期待办 
        'LK_ZAIXINSHENQINGCAIWUMUBIAOJIA': 'Reapply CF Target Price',//再新申请财务目标价 
        'LK_ZAIXIANJINGJIA': 'Online Bidding',//在线竞价
        'LK_DANGQIANBANBEN': 'Current Version',//当前版本
        'LK_XIANSHI': 'Displays', // 显示
        'LK_TIAODI': 'to', // 条到第
        'LK_TIAOJILU': 'records', // 条记录
        'LK_GONG': 'total', // 共
		'LK_ZHUANGTAI': 'Status',//状态
        'LK_QUXIAO': 'Cancel',//取消
        'LK_QINGXUANZHEXUYAODAOCHUSHUJU': 'Select the data you want to export', //请选择需要导出的数据
        'LK_BUNENGSHANCHUZHISHAOBAOLIUYITIAO': 'Can not delete, at least keep one!', //不能删除，至少保留一条!
        'LK_YITIANJIADAOSHANGXIAN': 'Added to the upper limit', //已添加到上限!
        'LK_GONGYINGSHANGGONGSIJIESHAO': 'Supplier Company Introduction', //供应商公司介绍!
        'LK_GONGYINGSHANGCHANPINGAIYAO': 'Supplier Product Profile', //供应商产品概要!
		'LK_GONGYINGSHANGTIMELINE': 'Supplier timeline', //供应商timeline!
        'LK_LIRUMENJING': 'For example, the procedures for the application of baggage ban, other remarks information, etc', //例如：⻔禁申请步骤，其他备注信息等
		'LK_SHANGQIDAZHONGYUANQU': 'Room 303, Shanghai Volkswagen Park', //上汽⼤众园区303室!
        'LK_YIBAOCUN': 'The saved', //已保存!
        'LK_QINGTIANJIAGONGYINGSHANG': 'Please add supplier!', //请添加供应商!
        'LK_CHAKAN': 'To view', //查看!
		'LK_TUICHUDENGLU': 'Log out', //退出登录!
        'LK_QINGSHURUBEIZHU': 'Please enter remarks', //请输入备注
        'LK_SHENQING': 'Apply', //申请
		'LK_CAIWUMUBIAOJIA': 'Financial target price', //财务⽬标价
		'LK_RFQMINGCHNEGBUNENGWEIKONG': 'The RFQ name cannot be empty', //RFQ名称不能为空
        'LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG': 'The RFQ part or RFQ supplier is empty and cannot create RFQ rounds', //RFQ零件或者RFQ供应商为空，不能创建RFQ轮次
        'LK_SHANGCHUAN': 'upload', // 上传
        'LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG': 'Please select the amount per vehicle to be exported', // 请选择需要导出的每车用量
        'LK_QINGXUANZHEYITIAOJIHUAGENGXIN': 'Please select a plan to update to RFQ', // 请选择一条计划更新至询价产量
        'LK_MEIYOUKEYIXIAZHAIDEXINXI': 'There is no information available for download', // 没有可以下载的信息
        'LK_QINGXUANZHEXUYAODAOCHURIZHI': 'Please select the logs that you want to export', // 请选择需要导出的日志
        'LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN': 'Please select the attachment you want to delete', // 请选择需要删除的附件
        'LK_SHANCHUCHENGGONG': 'Delete the success', // 删除成功
        'LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN': 'Please select the attachment you want to download', // 请选择需要下载的附件
        'LK_QUESHIGONGYIZUBIANHAOETC': 'The process group number is missing. Please first set the process group corresponding to the part', // 缺失工艺组编号，请先设置零件对应的工艺组
        'LK_QUESHIYOUXIAODELINGJIANBIANHAO': 'A valid part number is missing', // 缺失有效的零件编号
        'LK_QUESHIYOUXIAODEGONGYIZUID': 'A valid process group ID is missing', // 缺失有效的工艺组id
        'LK_XIUGAICHENGGONG': 'Modify the success', // 修改成功
        // 'LK_XIANGNEIZHOUZHUANCAILIAOZHONGHEJIAGE':'翻箱前器具综合单价（RMB）', //箱内周转材料综合价格 
        /*
        <!------------------------------------------------------------------------>
        <!--                                                                   --->
        <!------------------------------------------------------------------------>
        */
        //

    })
}))
