(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('i18n')) :
        typeof define === 'function' && define.amd ? define(['i18n'], factory) :
            (global = global || self, factory(window.i18n))
}(this, function (i18n) {
    'use strict'
    var oldLanguage = {
        'delete': "delete",
        "deleteSure":'are you sureAre you sure you want to do this?',
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
            'RFQINQUIRE': 'Search',
            'RFQRESET': 'Reset',
        },
        'partsprocure': {
            'PARTSPROCURENEWPROCUREMENTPROJECT': 'New Procurement Project',
            'PARTSPROCUREGENERATEFSGSNR': 'Generate FSNR/GSNR/SPNR',
            'PARTSPROCURECANCELPARTSPURCHASE': 'Cancel Parts Purchase',
            'PARTSPROCUREBATCHMAINTENANCE': 'Batch Maintenance',
            'PARTSPROCURESTARTINQUIRY': 'Start Inquiry',
            'PARTSPROCURETRANSFER': 'Transfer',
            'PARTSPROCUREFSNFGSNFSPNR': 'FSNR/GSNR/SPNR',
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
            "CF": 'CF',
            'PARTSPROCUREPARTSTATUSNAME': 'Project Status',
            'SHOUGONGCAIGOUXIANGMUCHUANGJIAN': '', // 手工采购项目创建
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
            'XunYuanZhiXing': 'Sourcing Operation', //寻源执行
            'JinDuJianKong': 'Progress Monitor', //进度监控
            'LingJianQianShou': 'Part sheet sign in', //零件签收
            'CaiGouXiangMuJianLi': 'Create Sourcing Project', //采购项目建立
            'RfqguanLi': 'Rfq Management', //RFQ管理
            'DingDianGuanLi': 'Nomination Management', //定点管理
            'RiZhi': 'Log', //日志
            'LingJianHao': 'Part No.', //零件号
            'LingJianMingChengZH': 'Name (zh)', //零件名称（中）
            'SheJiKeShi': 'TP dept.', //设计科室
            'GongChengShi': 'TP owner', //工程师
            'CheXingXiangMu': 'Car Model', //车型项目
            'XinXiDanFenLei': 'Sheet type', //信息单分类
            'XinXiDanZhuangTai': 'Sheet Status', //信息单状态
            'XinXiDanLiuShuiHao': 'TP sequence ID', //信息单流水号
            'XunJiaZiLiaoZhuangTai': 'Inquiry Document Status', //询价资料状态
            'MeiCheYongLiangZhuangTai': 'Quantity per car status', //每车用量状态
            'QingShuRu': 'Please Enter', //请输入
            'QingXuanZe': 'Please Choose', //请选择
            'QueRen': 'Confirm', //确认
            'ZhongZhi': 'Reset', //重置
            'XinJianXinXiDanQianShou': 'Receipt Of New Information Sheet', //新件信息单签收
            'ZhuanPai': 'Reassigned', //转派
            'QianShou': 'Sign in', //签收
            'TuiHui': 'Return', //退回
            'LingJianMingZH': 'Part Name (Cn)', //零件名（中）
            'LingJianMingDE': 'Part Name (Ger)', //零件名（德）
            'XinXiDanLeiXing': 'Information Sheet Type', //信息单类型
            'XianShiDiTiaoDaoTiaoJiLuGongTiaoJiLu': 'Display Records From Records To Records In Total', //显示第    条到    条记录，共    条记录
            'ShangYiYe': 'Previous Page', //上一页
            'XiaYiYe': 'Next Page', //下一页
            'QianWangYe': 'Go To Page' //前往    页
        },
        // 成本分析管理
        'costanalysismanage': {
            'ChengBenFenXiGuanLi': '', // 成本分析管理
            'ShuJuWeiHu': '', // 数据维护

            // 成本分析管理
            'RfqBianHao': '', // RFQ编号
            'QingShuRuRfqBianHao': '', // 请输入RFQ编号
            'RfqZhuangTai': '', // RFQ状态
            'QingXuanZeRfqZhuangTai': '', // 请选择RFQ状态
            'LingJianHao': '', // 零件号
            'LingJianMing': '', // 零件名
            'QingShuRuLingJianMing': '', // 请输入零件名
            'CheXingXiangMu': '', // 车型项目
            'QingXuanZeCheXingXiangMu': '', // 请选择车型项目
            'Pca': 'PCA', // PCA
            'QingShuRuPca': '', // 请输入PCA
            'Tia': 'TIA', // TIA
            'QingShuRuTia': '', // 请输入TIA
            'HeavyItem': 'Heavy Item', // Heavy Item
            'QingXuanZeHeavyItem': '', // 请选择Heavy Item
            'Commodity': 'COMMODITY', // COMMODITY
            'QingXuanZeCommodity': '', // 请选择COMMODITY
            'Linie': 'LINIE', // LINIE
            'QingXuanZeLinie': '', // 请选择LINIE
            'RfqLieBiao': '', // RFQ列表
            'RfqMingCheng': '', // RFQ名称
            'RfqLeiXing': '', // RFQ类型
            'ChuangJianRiQi': '', // 创建日期
            'DangQianLunCi': '', // 当前轮次
            'BaoJiaJieZhiRiQi': '', // 报价截止日期
            'XunJiaCaiGouYuan': '', // 询价采购员
            'JiShuZiLiao': '', // 技术资料
            'Cbd': '', // CBD
            'FenXiBaoGao': '', // 分析报告
            'FaSongShiJian':'发送时间', // 发送时间
            'XiaZai': '', // 下载

            // 数据维护
            'RenGongChengBenShuJuWeiHu': '', // 人工成本数据维护
            'DaoChu': '', // 导出
            'ShangChuan': '', // 上传
            'ShanChu': '', // 删除
            'ShangChuanWenJianMingCheng': '', // 上传文件名称
            'DaXiao': '', // 大小
            'ShiJian': '', // 时间
            'ShangChuanRen': '', // 上传人
            'BeiZhu': '', // 备注

            // rfq详情
            'BenLunZhuangTai': '', // 本轮状态
            'BenLunBaoJiaJieZhiRi': '', // 本轮报价截止日
            'LunCiLeiXing': '', // 轮次类型

            // 零件清单
            'LingJianQingDan': '', // 零件清单
            'BaoCun': '', // 保存
            'XiaZaiJiShuZiLiao': '', // 下载技术资料
            'XiaZaiCbd': '', // 下载CBD
            'FsnfGsnfSpnr': 'FSNF/GSNF/SPNR', // FSNF/GSNF/SPNR
            'LingJianMingZhong': '', // 零件名(中)
            'LingJianMingDe': '', // 零件名(德)
            'CaiGouGongChang': '', // 采购工厂
            'LingJianXiangMuLeiXing': '', // 零件项目类型
            'CheXingDaLei': '', // 车型大类
            'RfqLunCi': '', // RFQ轮次
            'GongYingShang': '供应商', // 供应商
            'PcaFenXiJieGuo': '', // PCA分析结果
            'TiaFenXiJieGuo': '', // TIA分析结果
            'QingXuanZeXuYaoBaoCunDeShuJu': '', // 请选择需要保存的数据
            'SavePcaResAndTiaResTips': '', // 请填写完整PCA分析结果和TIA分析结果

            'BaoGaoQingDan':'报告清单',// 报告清单

            // 成本分析
            'ChengBenFenXi': '', // 成本分析
            'FanHui': '', // 返回
            'WenJianMingCheng': '', // 文件名称
            'ShangChuanRiQi': '', // 上传日期
            'QingXuanZeXuYaoXiaZaiDeWenJian': '', // 请选择需要下载的文件
            'QingXuanZeXuYaoShanChuDeWenJian': '', // 请选择需要删除的文件
        },
        /*
        <!------------------------------------------------------------------------>
        <!--                                                                   --->
        <!------------------------------------------------------------------------>
        */

        'LK_CAIGOUFENEFENPEIDABUDAO': 'Procurement share allocation cannot reach 100%',// 采购份额分配达不到100%
        'LK_CAIGOUGONGCHNEGMINGCHENG': 'Name of Purchasing Factory',// 采购工厂名称
        'LK_CAOZUOCHENGGONG': 'Operation is successful',// 操作成功
        'LK_CHANLIANGZHANBI': 'Output ratio (%)',// 产量占比（%）
        'LK_CAIGOUFENEFENPEIWEIDADAO': 'The current allocation has not reached 100%, please reallocate!',// 当前分配未达到100%，请重新分配！
        'LK_CAIGOUFENEFENPEIWEIDADAODANGQIAN': 'The current allocation does not reach 100%. There is a 0 condition in the current allocation factory. Please reassign it!',// 当前分配未达到100%，请重新分配！
        'LK_CAIGOUFENEFENPEICHAOGUO': 'The current allocation has exceeded 100%, please reallocate!',// 当前分配已超过100%，请重新分配！
        'LK_DENGLU': 'Login',// 登录
        'LK_GONG': 'total',// 共
        'LK_MEIYOUKEYIXIAZHAIDEXINXI': 'There is no information available for download',// 没有可以下载的信息
        'LK_MIMA': 'PassWord',// 密码
        'LK_HAIWEIXUANZHEGONGCHANG': 'You have not selected a factory yet!',// 您还未选择工厂！
        'LK_QINGCHU': 'Remove',// 清除
        'LK_QINGTIANXIELIYOUSHURUKUANGBITIAN': 'Please fill in the reason. This input box is required',// 请填写理由，该输入框为必填
        'LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI': 'Please select the quantity per car status',// 请选择每车用量状态
        'LK_QINGXUANZHEXIANCAILIAOZU': 'Please Select',// 请选择先材料组
        'LK_QINGXUANZHEXINXIDANZHUANGTAI': 'Please select the part sheet status',// 请选择信息单状态
        'LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG': 'Please select the amount per vehicle to be exported',// 请选择需要导出的每车用量
        'LK_QINGXUANZHEXUYAODAOCHURIZHI': 'Please select the logs that you want to export',// 请选择需要导出的日志
        'LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN': 'Please select the attachment you want to delete',// 请选择需要删除的附件
        'LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN': 'Please select the attachment you want to download',// 请选择需要下载的附件
        'LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN': 'Please select the file you want to download',// 请选择需要下载文件
        'LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU': 'Please select the part purchase item to be modified',// 请选择需要修改的零件采购项目
        'LK_QINGXUANZHEXUNJIACAIGOUYUAN': 'Please select the forward buyer',// 请选择询价采购员
        'LK_QINGXUANZHEXUNJIAZILIAOZHUANGTAI': 'Please select inquiry data status',// 请选择询价资料状态
        'LK_QINGXUANZHEYITIAOJIHUAGENGXIN': 'Please select a plan to update to RFQ',// 请选择一条计划更新至询价产量
        'LK_QINGXUANZHEYITIAOXUYAOQUEREDEBANBEN': 'Please select a version that you want to confirm',// 请选择一条需要确认的版本
        'LK_QUESHICAILIAOZUBIANHAOETC': 'The category group number is missing. Please first set the category group corresponding to the part',// 缺失材料组编号，请先设置零件对应的材料组
        'LK_QUESHIYOUXIAODEGONGYIZUID': 'A valid process group ID is missing',// 缺失有效的工艺组id
        'LK_QUESHIYOUXIAODELINGJIANBIANHAO': 'A valid part number is missing',// 缺失有效的零件编号
        'LK_SHANCHUCHENGGONG': 'Delete the success',// 删除成功
        'LK_SHANGCHUAN': 'upload',// 上传
        'LK_SHANGCHUANCHENGGONG': 'Uploaded successfully',// 上传成功
        'LK_SHANGCHUANSHIBAI': 'Upload failed',// 上传失败
        'LK_TIAODI': 'to',// 条到第
        'LK_TIAOJILU': 'records',// 条记录
        'LK_XIANSHI': 'Displays',// 显示
        'LK_XINJIANXINXIDANTUIHUI': 'New piece of information sheet returned',// 新件信息单退回
        'LK_YIQIANSHOU': 'Have been signed',// 新件信息单退回
        'LK_XINJIANXINXIDANZHUANPAI': 'Delivery of new pieces of information',// 新件信息单转派
        'LK_XIUGAICHENGGONG': 'Modify the success',// 修改成功
        'LK_YITUIHUI': 'Returned',// 以退回
        'LK_YONGHUMING': 'UserName',// 用户名
        'LK_ZHUANPAICHENGGONG': 'Turn sent successfully',// 转派成功
        'LK_AEKOHAO': 'AEKO No.',//Aeko号
        'LK_XINDEAEKOHAO': 'AEKO No',    //  AEKO号
        'LK_BDLLIEBIAO': 'BDL List',//BDL列表
        'LK_BMG': 'BMG',//BMG
        'LK_BOMDANXINXI': 'BOM information',//BOM单信息
        'LK_CBDSHEZHI': 'CBD Setting',//CBD设置
        'LK_CBDXUANZE': 'CBD choice',//CBD选择
        'LK_CFFUZEREN': 'CF Owner',//CF负责人
        'LK_CFKONGZHIYUAN': 'CF Controller',//CF控制员
        'LK_CS_1BEIZHU': 'CS*1 Remark',//CS*1备注
        'LK_CS_1SHANGHUIBEIZHU': 'CS*1 meeting remark',//CS*1上会备注
        'LK_CSFPFUZEREN': 'CSF（P）Owner',//CSF（P）负责人
        'LK_FS_GSHAO': 'FS/GS No.',//FS/GS号
        'LK_FSHAO': 'FS No.',//FS号
        'LK_INBOUNDWULIUFANGSHI': 'INBOUND Logistics Mode',//INBOUND物流方式
        'LK_XINDELINIE': 'Linie',
        'LK_LINIE': 'Linie',//Linie
        'LK_LINIEBEIZHU': 'Linie Remark',//Linie备注
        'LK_LINIEBUMEN': 'Linie Department',//LINIE部门
        'LK_LINIESHANGHUIBEIZHU': 'Linie meeting remark',//Linie上会备注
        'LK_MBDL': 'MBDL',//MBDL
        'LK_MQPINGFENZHUANGTAI': 'MQ Rating Status',//MQ评分状态
        'LK_MTZLINGJIAN': 'MTZ Parts',//MTZ零件
        'LK_RFQBIANHAO': 'RFQ number ',//RFQ编号
        'LK_RFQGUANLI': 'RFQ Management',//RFQ管理
        'LK_RFQLEIXING': 'RFQ type',//RFQ类型
        'LK_RFQLIST': 'RFQ List',//RFQ列表
        'LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG': 'The RFQ part or RFQ supplier is empty and cannot create RFQ rounds',//RFQ零件或者RFQ供应商为空，不能创建RFQ轮次
        'LK_RFQMINGCHENG': 'RFQ name',//RFQ名称
        'LK_RFQMINGCHNEGBUNENGWEIKONG': 'The RFQ name cannot be empty',//RFQ名称不能为空
        'LK_RFQZHUANGTAI': 'RFQ status',//RFQ状态
        'LK_RFQZONGHEGUANLI': 'RFQ comprehensive management',//RFQ综合管理
        'LK_RWJIA': 'RW Price',//RW价
        'LK_SAICVOLKSWAGENKONGXIANGCAOZUO_XIAOSHI': 'SVW Empty Container_Hour',//SAIC VOLKSWAGEN空箱操作_小时
        'LK_SAICVOLKSWAGENKUCUN_XIAOSHI': 'SVW Stock_Hour',//SAIC VOLKSWAGEN库存_小时
        'LK_SOPRIQI': 'SOP Date',//SOP日期
        'LK_SUM': 'SUM',//SUM
        'LK_SVWYAOQIUEMZHOU': 'SVW required EM (week)',//SVW要求EM（周）
        'LK_SVWSHIMO': 'SVW requires the first trial',//SVW要求EM（周）
        'LK_SVWYAOQIUOTSZHOU': 'SVW required OTS (week)',//SVW要求OTS（周）
        'LK_SVWYAOQIUSHOUCISHIMO': 'SVW require First tryout',//SVW要求首次试模
        'LK_SWHAO': 'sw No.',//sw号
        'LK_TPPINGFENZHUANGTAI': 'TP Rating Status',//TP评分状态
        'LK_BANBENHAO': 'Version No.',//版本号
        'LK_BANBENZHUANGTAI': 'Version Status',//版本状态
        'LK_BAOZHUANGFUZEREN': 'Package Authority',//包装负责人
        'LK_BAOCUN': 'Save',//保存
        'LK_BAOCUNBINGCHUANGJIAN': 'Save and Create',//保存并创建
        'LK_BAOJIAJIEZHIRIQI': 'Quotation deadline',//报价截止日期
        'LK_RFQQUOTATIONDEADLINE': 'Deadline',//报价截至日期
        'LK_NINDANGQIANHAIWEIXUANZE': 'Sorry, you have not selected yet!',//抱歉！您当前还未选择！
        'LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN': 'Sorry, Forward Buyer not selected!',//抱歉！您当前还未选择询价采购员！
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
        "LK_NOTCHOUSEDELETEPROJECT":"抱歉！您还未选择您需要删除的采购项目。", //抱歉您还未选择您需要删除的采购项目
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU': 'Sorry, no projects to apply for target price is selected!',//抱歉，您当前还未选择需要申请目标价的采购项目！
        'LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU': 'Sorry, no project to be added is selected!',//抱歉，您当前还未选择需要添加的采购项目！
        'LK_NINXUANZHONGDEDANJUZHONGCUNZAIYIQIANSHOUDEXINXIDANBUNENGPILIANGQIANSHOU': 'Selections contain signed records, unable to batch sign in!',//抱歉，您选中的单据中存在已签收的信息单，不能批量签收！
        'LK_YONGHUMINGHUOMIMABUNENGWEIKONG': 'User name or password cannot be empty!',//抱歉，用户名或密码不能为空！
        'LK_BEIZHU': 'Notes',//备注
        'LK_BEIZHUXINXI': 'Remarks Info.',//备注信息
        'LK_BEIDAITILINGJIAN': 'Replaced Part',//被代替零件
        'LK_BEITIDAILINGJIAN': 'Replaced Parts',//被替代零件
        'LK_BENLUNBAOJIAJIEZHISHIJIAN': 'Round Quotation deadline',//本轮报价截止时间
        'LK_BENLUNBAOJIAQIZHISHIJIAN': 'Starting and ending date of the current quotation',//本轮报价起止时间
        'LK_BENLUNZHUANGTAI': 'Current Round Status',//本轮状态
        'LK_BIANHAO': 'No.',//编号
        'LK_BIANJI': 'Edit',//编辑
        'LK_BIANSUXIANGLEIXING': 'Transmission Type',//变速箱类型
        'LK_BIANSUXIANGPEIZHI': 'Gearbox Configuration',//变速箱配置
        'LK_BUNENGSHANCHUZHISHAOBAOLIUYITIAO': 'Can not delete, at least keep one!',//不能删除，至少保留一条!
        'LK_BUMENBIANHAO': 'Department No.',//部门编号
        'LK_BUMENPINGFENLEIXING': 'Department Rating Type',//部门评分类型
        'LK_CAILIAO': 'Material',//材料
        'LK_CAILIAOGONGYIZUMINGCHENGDE': 'Craft(De)',//材料工艺组名称（德）
        'LK_CAILIAOGONGYIZUMINGCHENGZHONG': 'Craft(Cn)',//材料工艺组名称（中）
        'LK_CAILIAOZU': 'Stuff Gategory',//材料组
        'LK_CAILIAOZULINEBUMEN': 'Dept. of the owner of the part\'s material group',//材料组LINE部门
        'LK_CAILIAOZUBIANHAO': 'Material Group Code',//材料组编号
        'LK_CAILIAOZUGONGYIBIANHAO': 'Stuff Gategory Stuffcode',//材料组工艺编号
        'LK_CAILIAOZUGONGYISHEZHI': 'Stuff Gategory Setting',//材料组工艺设置
        'LK_CAILIAOZUMINGCHENGDE': 'Stuff Name (De)',//材料组名称（德）
        'LK_CAILIAOZUMINGCHENGZHONG': 'Stuff Name (Zh)',//材料组名称（中）
        'LK_CAILIAOZUXINXI': 'Material Group Information',//材料组信息
        'LK_CF': 'CF',//财务控制员
        'LK_CAIWUMUBIAOJIA': 'CF Target Price',//财务目标价
        'LK_CAIGOUGONGCHANG': 'Plant',//采购工厂
        'LK_CAIGOUTIAOKUAN': 'Purchasing Terms',//采购条款
        'LK_CAIGOUXIANGMUJIANLI': 'Create Sourcing Project',//采购项目建立
        'LK_CAIGOUXIANGMUXINXI': 'Project Information',//采购项目信息
        'LK_CAIGOUYUAN': 'Buyer',//采购员
        'LK_CAIGOUYUANGONGHAO': 'Buyer\'s job number',//采购员工号
        'LK_CANKAOBAOZHUANG': 'Reference Packaging',//参考包装
        'LK_CANKAOBAOZHUANGDANJIAYUAN': 'Reference Unit Packaging Price (Yuan)',//参考包装单价（元）
        'LK_CANKAOBAOZHUANGGAOMM': 'Reference packaging height (mm)',//参考包装高（mm）
        'LK_CANKAOBAOZHUANGKUANMM': 'Reference Packaging - Width (mm)',//参考包装宽（mm）
        'LK_CANKAOBAOZHUANGQIJULEIXING': 'Reference Packaging Equipment Type',//参考包装器具类型
        'LK_CANKAOBAOZHUANGZHANGMM': 'Reference Packaging - Length (mm)',//参考包装长(mm)
        'LK_CANKAOCHANLIANGJISHIJIANJIHUA': 'Volume reference and Time Schedule',//参考产量及时间计划
        'LK_CANKAOCHEXING': 'Reference Model',//参考车型
        'LK_CANKAOLINGJIANHAO': 'Reference Parts No.',//参考零件号
        'LK_CANKAOLINGJIANMING': 'Reference Part Name',//参考零件名
        'LK_CAOZUO': 'Operation',//操作
        'LK_CAOZUOREN': 'Operator',//操作人
        'LK_UpdateDate': 'Operating time',//操作时间
        'LK_CHAKAN': 'To view',//查看!
        'LK_CHAKANQUANBUBANBEN': 'View All Versions',//查看全部版本
        'LK_INQUIRE': 'Query',//查询
        'LK_CHAZHAOGONGYIZUGONGYINGSHANG': 'Find Craft Group Supplier',//查找工艺组供应商
        'LK_CHAIFENCAIGOUGONGCHANG': 'Split Procurement Factory',//拆分采购工厂
        'LK_CHANLIANGPC': 'Volume(PC)',//产量（PC）
        'LK_CHANGJIANGMINGCHNEG': 'Task Name',//场景名称/任务名称
        'LK_CHANGJINGMINGCHENGRENWUMINGCHENG': 'Task Name',//场景名称/任务名称
        'LK_CHEXING': 'Car Type',//车型
        'LK_CHEXINGDALEI': 'Model',//车型大类
        'LK_CHEXINGDENGJI': 'Car Level',//车型等级
        'LK_CHEXINGSHENGCHANNIANXIAN': 'Car Production Life',//车型生产年限
        'LK_CHEXINGXIANGMU': 'Project',//车型项目
        'LK_CHEXINGXIANGMU0S': 'Project 0S',//车型项目0S
        'LK_CHEXINGXIANGMUPVS': 'Project PVS',//车型项目PVS
        'LK_CHEXINGXIANGMUSOP': 'Project SOP',//车型项目SOP
        'LK_CHEXINGXIANGMUMINGCHENG': 'Project Name',//车型项目名称
        'LK_CHEHUI': 'Withdraw',//撤回
        'LK_CHENGBEN': 'Cost',//成本
        'LK_CHICUN': 'Dimension',//尺寸
        'LK_CHUANGJIANRENGONGHAO': 'Creator Employee No.',//创建人工号
        'LK_CHUANGJIANRENXINGMING': 'Creator Name',//创建人姓名
        'LK_CHUANGJIANRIQI': 'Creation date',//创建日期
        'LK_CHUANGJIANSHIJIAN': 'Creation Time',//创建时间
        'LK_CONGLINGJIANPAISHENG': 'Created from part',//从零件派生
        'LK_DAXIAOMB': 'Size(MB)',//大小（MB）
        'LK_DAIBANSHIXIANG': 'To-Do List',//待办事项
        'LK_DAIQUERENBANBEN': 'Unconfirmed Version',//待确认版本
        'LK_DANWEI': 'Unit',//单位
        'LK_DANGQIANBANBEN': 'Current Version',//当前版本
        'LK_DANGQIANLUNCI': 'Current round',//当前轮次
        'LK_DAORUSHIJIAN': 'Import time',//导入时间
        'LK_DENGJIPEIZHI': 'Level Configuration',//等级配置
        'LK_DIANJISHANGCHUAN': 'Click to Upload',//点击上传
        'LK_DIANCHIRONGLIANG': 'Battery Capacity',//电池容量
        'LK_DIANCHIYONGLIANG': 'Battery Usage',//电池用量
        'LK_DINGDIANGUANLI': 'Nomination Management',//定点管理
        'LK_DUQUYOUXIAODOM': 'Load Valid BOM',//读取有效BOM
        'LK_DUQUYOUXIAOBOM': 'Load Valid BOM',//读取有效BOM
        'LK_FACHUXUNJIA': 'RFQ send out',//发出询价
        'LK_FADONGJILEIXING': 'Engine Type',//发动机类型
        'LK_FADONGJIPEIZHI': 'Engine Configuration',//发动机配置
        'LK_FASHENGSHIJIAN': 'Happening time',//发生时间
        'LK_FASONGXUNJIA': 'Send Inquiry',//发送询价
        'LK_FASONGZHIWODEYOUXIANG': 'Send to my mailbox',//发送至我的邮箱
        'LK_FANXIANGQIANBAOZHUANGMAOZHONGKG': 'Package Gross Weight before repacking(KG)',//翻箱前包装毛重（KG）
        'LK_FANXIANGQIANJICHUNIANWEIXIULÜ': 'Equipment Annual Repair Base Rate',//翻箱前基础年维修率
        'LK_FANXIANGQIANQIJUFANCHENGSHEDIEBI': 'Equipment Return Fold Ratio before repacking',//翻箱前器具返程折叠比
        'LK_FANXIANGQIANQIJUGAOMM': 'Equipment Height before repacking',//翻箱前器具高（mm）
        'LK_FANXIANGQIANQIJUHAO': 'Equipment No. before repacking',//翻箱前器具号
        'LK_FANXIANGQIANQIJUKUANMM': 'Equipment Width before repacking',//翻箱前器具宽（mm）
        'LK_FANXIANGQIANQIJULEIXING': 'Equipment Type before repacking',//翻箱前器具类型
        'LK_FANXIANGQIANQIJUSHOUMING': 'Equipment Life before repacking',//翻箱前器具寿命
        'LK_FANXIANGQIANQIJUSHU': 'Equipment Price before repacking(RMB)',//翻箱前器具数
        'LK_FANXIANGQIANQIJUZHANGMM': 'Equipment Length before repacking',//翻箱前器具长（mm）
        'LK_FANXIANGQIANQIJUZONGHEDANJIARMB': 'Equipment Price before repacking(RMB)First',//翻箱前器具综合单价（RMB）
        'LK_FANXIANGQIANQIJUZUJINRMBDAY': 'Equipment Rent before repacking(RMB/DAY)',//翻箱前器具租金（RMB/DAY）
        'LK_FANHUI': 'Back',//返回
        'LK_FUZEREN': 'Person in Charge',//负责人
        'LK_FUZERENDIANHUA': 'Person in Charge‘s telephone',//负责人电话
        'LK_FUZERENYOUXIANG': 'Person in Charge‘s email',//负责人邮箱
        'LK_FUJIANLIEBIAO': 'Attachment List ',//附件列表
        'LK_GENGXINYUANYIN': 'Update Reason',//更新原因
        'LK_GENGXINZHIXUNJIACHANLIANG': 'Update to Enquiry Volume',//更新至询价产量
        'LK_GONGCHENGSHI': 'TP owner',//工程师
        'LK_GONGYI': 'Craft',//工艺
        'LK_GONGYIHAO': 'Craft Number',//工艺号
        'LK_SHENGMINGJISHUBANBEN': 'Display Public UI Components, Based on second seal of element, current element version',//公共UI组件展示界面，基于element的二次封装，当前element版本
        'LK_GONGGONGUIZUJIANZHANSHIJIEMIANJIYUELEMENTDEERCIFENGZHUANGDANGQIANELEMENTBANBEN': 'Display Public UI Components, Based on second seal of element, current element version',//公共UI组件展示界面，基于element的二次封装，当前element版本
        'LK_GONGHUOFANGSHI': 'Supply Style',//供货方式
        'LK_GONGYINGSHANG360SHITU': 'Supplier 360° View',//供应商360°视图
        'LK_GONGYINGSHANGSAPHAO': 'Supplier SAP ID',//供应商SAP号
        'LK_GONGYINGSHANGTIMELINE': 'Supplier timeline',//供应商timeline!
        'LK_GONGYINGSHANGCAILIAOZHUNBEI': 'Supplier\'s material preparation',//供应商材料准备
        'LK_GONGYINGSHANGCHANPINGAIYAO': 'Supplier Product Profile',//供应商产品概要!
        'LK_GONGYINGSHANGGONGSIJIESHAO': 'Supplier Company Introduction',//供应商公司介绍!
        'LK_GONGYINGSHANGMING': 'Supplier',//供应商名
        'LK_SAPHAO': 'SAP ID', // SAP号
        'LK_GONGYINGSHANGMINGCHENG': 'Supplier',//供应商名称
        'LK_GONGYINGSHANGPINGFEN': 'Supplier Rating',//供应商评分
        'LK_GONGYINGSHANGPINGFENFUJIAN': 'Supplier Rating Attachment',//供应商评分附件
        'LK_GONGYINGSHANGSHENGCHANCHANGDI': 'Supplier Manufacturing Spot',//供应商生产场地
        'LK_HUIYIDIDIAN': 'Meeting place',//会议地点
        'LK_HUIYIJIBENXINXI': 'Basic information about the meeting',//会议基本信息
        'LK_HUIYIQITAXINXI': 'other information for the meeting',//会议其它信息
        'LK_HUIYISHIJIAN': 'Meeting time',//会议时间
        'LK_HUOBI': 'Currency',//货币
        'LK_JICHUXINXI': 'Basic information',//基础信息
        'LK_JISHUJIAOLIUHUI': 'Techonology Meeting',//技术交底会
        'LK_EP': 'EP',//技术评分人
        'LK_JIAGEMINGXI': 'Price Details',//价格明细
        'LK_JIAOFU': 'Delivery',//交付
        'LK_JIESHUBENLUNXUNJIA': 'Finish RFQ round',//结束本轮询价
        'LK_JIESHUXIANGMU': 'Terminate',//结束项目
        'LK_JINRIDAIBAN': 'Due Today',//今日待办
        'LK_JINDUJIANKONG': 'Progress Monitor',//进度监控
        'LK_JUJUE': 'Reject',//拒绝
        'LK_KAISHINIANFEN': 'Start Year',//开始年份
        'LK_LISHISHIYONGGAILÜ': 'Historical Applicable Rate',//历史适用概率
        'LK_LIRUMENJING': 'For example, the procedures for the application of baggage ban, other remarks information, etc',//例如：⻔禁申请步骤，其他备注信息等
        'LK_LINGJIANCAIGOUXIANGMU': 'Parts Project',//零件采购项目
        'LK_LINGJIANCAIGOUXIANGMUGUANLI': 'Parts Project Management',//零件采购项目管理
        'LK_LINGJIANCAIGOUXIANGMULEIXING': 'Parts Project Type',//零件采购项目类型
        'LK_LINGJIANCAIGOUXIANGMUZHUANPAI': 'Parts procurement project transfer',//零件采购项目转派
        'LK_LINGJIANCHANLIANG': 'Parts Yield',//零件产量
        'LK_LINGJIANCHANLIANGJIHUA': 'Parts Volume Plan',//零件产量计划
        'LK_LINGJIANCHANLIANGJILU': 'Parts Production Record',//零件产量记录
        'LK_LINGJIANHAO': 'Part No.',//零件号
        'LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN': 'Parts No./FSNR/RFQ No./Buyer',//零件号/FSNR/RFQ编号/采购员
        'LK_LINGJIANHAODIERBUFEN': '2nd part of part no.',//零件号第二部分
        'LK_LINGJIANHAODISANBUFEN': '3rd part of part no.',//零件号第三部分
        'LK_LINGJIANHAODISIBUFEN': '4th part of part no.',//零件号第四部分
        'LK_LINGJIANHAODIWUBUFEN': '5th part of part no.',//零件号第五部分
        'LK_LINGJIANHAODIYIBUFEN': '1st part of part no.',//零件号第一部分
        'LK_LINGJIANJIAGONGCHENGDUDE': 'Part processing status desc.(De)',//零件加工程度(德)
        'LK_LINGJIANJIAGONGCHENGDUYING': 'Part processing status desc.(En)',//零件加工程度(英)
        'LK_LINGJIANJIAGONGCHENGDUZHONG': 'Part processing status desc.(Cn)',//零件加工程度(中)
        'LK_LINGJIANJIAGONGCHENGDUDAIMA': 'Part processing status Code',//零件加工程度代码
        'LK_LINGJIANLEIXING': 'Type Maintenance',//零件类型
        'LK_LINGJIANLEIXINGDAIMA': 'Part Type Code',//零件类型代码
        'LK_LINGJIANMAOYISHUXINGDAIMA': 'Part Trade Property Code',//零件贸易属性代码
        'LK_LINGJIANMAOYISHUXINGMIAOSHUDE': 'Parts Trade Property Desc.(De)',//零件贸易属性描述(德)
        'LK_LINGJIANMAOYISHUXINGMIAOSHUYING': 'Parts Trade Property Desc.(En)',//零件贸易属性描述(英)
        'LK_LINGJIANMAOYISHUXINGMIAOSHUZHONG': 'Parts Trade Property Desc.(Cn)',//零件贸易属性描述(中)
        'LK_LINGJIANMEICHEYONGLIANG': 'Parts quantity per car status',//零件每车用量
        'LK_LINGJIANMINGDE': 'Part Name(Ger)',//零件名（德）
        'LK_LINGJIANMINGYING': 'Part Name(En)',//零件名（英）
        'LK_LINGJIANMINGZHONG': 'Part Name (Cn)',//零件名（中）
        'LK_LINGJIANMINGCHENG': 'Part Name',//零件名称
        'LK_LINGJIANMINGCHENGDE': 'Part Name (De)',//零件名称（德）
        'LK_LINGJIANMINGCHENGZHONG': 'Part Name (Cn)',//零件名称（中）
        'LK_LINGJIANPINGTAIXINGZHIDAIMA': 'Part platform property code',//零件平台性质代码
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUDE': 'Part platform property desc.(De)',//零件平台性质描述(德)
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUYING': 'Part platform property desc.(En)',//零件平台性质描述(英)
        'LK_LINGJIANPINGTAIXINGZHIMIAOSHUZHONG': 'Part platform property desc.(Cn)',//零件平台性质描述(中)
        'LK_LINGJIANPINGFEN': 'Parts rating',//零件评分
        'LK_LINGJIANQIANSHOU': 'Part sheet sign in',//零件签收
        'LK_LINGJIANQINGDAN': 'Parts List',//零件清单
        'LK_LINGJIANSUOSHUCAILIAOZULINIEBUMEN': 'Part\'s Material Group\'s Linie Department',//零件所属材料组LINIE部门
        'LK_LINGJIANSUOSHUCAILIAOZUDEWENMINGCHENG': 'Part\'s Material Group Name(De)',//零件所属材料组德文名称
        'LK_LINGJIANSUOSHUCAILIAOZUZHONGWENMINGCHENG': 'Part\'s Material Group Name(Zh)',//零件所属材料组中文名称
        'LK_LINGJIANSUOSHUGONGYIBIANHAO': 'No. of the part\'s craft',//零件所属工艺编号
        'LK_LINGJIANXIANGMULEIXING': 'Parts project type',//零件项目类型
        'LK_LINGJIANYANYONGXINGZHIDAIMA': 'Part COP property code',//零件沿用性质代码
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUDE': 'Part COP property desc.(De)',//零件沿用性质描述(德)
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUYING': 'Part COP property desc.(En)',//零件沿用性质描述(英)
        'LK_LINGJIANYANYONGXINGZHIMIAOSHUZHONG': 'Part COP property desc.(Cn)',//零件沿用性质描述(中)
        'LK_LINGJIANZHUANGTAI': 'Parts Status',//零件状态
        'LK_LUNCILEIXING': 'Round type',//轮次类型
        'LK_MAOZHONGKG': 'Gross Weight (KG)',//毛重（KG）
        'LK_MEICHEYONGLIANG': 'per car dosage',//每车用量
        'LK_MEICHEYONGLIANGZHUANGTAI': 'Dosage state',//每车用量状态
        'LK_MOJUYUSUANSHENQING': 'Model Budget Application',//模具预算申请
        'LK_MUBIAOJIA': 'Target Price',//目标价
        'LK_MUBIAOJIAZHUANGTAI': 'CF Target price status',//目标价状态
        'LK_NIANFEN': 'Year',//年份
        'LK_NINSHIFOUQUERENDUIXINJIANXINXIDANJINHANGQIANSHOU': 'Confirm to sign the new record?',//您是否确认对新件信息单进行签收？
        'LK_PEIZHIBILI': 'Configure Ratio',//配置比例
        'LK_PEIZHIBIANMA': 'Configuration ID',//配置编码
        'LK_PILIANGWEIHU': 'Batch maintenance',//批量维护
        'LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU': 'Batch maintenance',//批量维护零件采购项目
        'LK_PINGFEN': 'Grade',//评分
        'LK_PINGFENREN': 'Grader',//评分人
        'LK_PUTONGLUNCI': 'Common Round',//普通轮次
        'LK_QIWANGMUBIAOJIA': 'Expected Price',//期望目标价
        'LK_QITAPEIZHI': 'Other Configuration',//其他配置
        'LK_QITAXINXI': 'Other Information',//其他信息
        'LK_QIDONGXIANGMU': 'Resume',//启动项目
        'LK_QIDONGXUNJIA': 'Start inquiry',//启动询价
        'LK_QIANSHOU': 'Sign in',//签收
        'LK_QIANSHOUQUEREN': 'Confirm sign in',//签收确认
        'LK_QIANSHOURIQI': 'Sign in Date',//签收日期
        'LK_QIANDUANBAOZHUANGMINGCHENG': 'Equipment Height before repacking',//前段包装名称
        'LK_QINGSHURU': 'Please Enter',//请输入
        'LK_QINGSHURUBEIZHU': 'Please enter remarks',//请输入备注
        'LK_RFQPLEASEENTERQUERY': 'Please Enter Query',//请输入查询
        'LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG': 'Please enter to search for supplier name, factory…',//请输入查询供应商名称
        'LK_QINGSHURUCHAXUNGONGYINGSHANGMINGCHENGCHANGSHANG': 'Please enter to search for supplier name, factory…',//请输入查询供应商名称,厂商...
        'LK_QINGSHURULINGJIANHAO': 'Please Enter',//请输入零件号
        'LK_QINGSHURULINGJIANMING': 'Please Enter',//请输入零件名（中）
        'LK_QINGTIANJIAGONGYINGSHANG': 'Please add supplier!',//请添加供应商!
        'LK_QINGTIANXIEGONGCHENGSHI': 'Please Enter',//请填写工程师
        'LK_QINGTIANXIESHEJIKESHI': 'Please Enter',//请填写设计科室
        'LK_QINGTIANXIEXINXIDANLIUSHUIHAO': 'Please Enter',//请填写信息单流水号
        'LK_QINGXUANZE': 'Please Select',//请选择
        "LK_QINGXUANZHECHEXINGXIANGMU": 'Please select vehicle type item',//请选择车型项目
        "LK_QINGXUANZHEXINXIFENLEI": 'Please select the information category',//请选择信息分类
        'LK_QINGXUANZHEXUYAODAOCHUBANBEN': 'Select the version you want to export',//请选择需要导出的版本
        'LK_QINGXUANZHEXUYAODAOCHUSHUJU': 'Select the data you want to export',//请选择需要导出的数据
        'LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN': '',//请选择一个需要下载的版本
        'LK_QUXIAO': 'Cancel',//取消
        'LK_QUXIAOLINGJIANCAIGOUXIANGMU': 'Cancel Parts Purchase',//取消零件采购项目
        'LK_QUXIAOYUANYIN': 'Terminate reason',//取消原因
        'LK_QUANBUBANBEN': 'All Versions',//全部版本
        'LK_QUEDING': 'Confirm',//确定
        'LK_QUEREN': 'Confirm',//确认
        'LK_RENKEZHOUQIZHOU': 'Authentication Period (Week) ',//认可周期（周）
        'LK_RENWUZHONGXIN': 'Task Center',//任务中心
        'LK_RIZHI': 'Log',//日志
        'LK_RIHZICHAKAN': 'Show Log',//日志查看
        'LK_RIZHICHAKAN': 'Show Log',//日志查看
        'LK_RUCHANGBAOZHUANGMINGCHENG': 'Entry Packaging Name',//入场包装名称
        'LK_RUKUBAOZHUANGMAOZHONG': 'Inbound Packaging Gross Weight (Kg)',//入库包装毛重（KG）
        'LK_RUKUBAOZHUANGMAOZHONGKG': 'Inbound Packaging Gross Weight (Kg)',//入库包装毛重（KG）
        'LK_RUKUJICHUNIANWEIXIUFEILV': 'Inbound Annual Repair Base Rate',//入库基础年维修费率
        'LK_RUKUJICHUNIANWEIXIUFEILÜ': 'Inbound Annual Repair Base Rate',//入库基础年维修费率
        'LK_RUKUQIJUFANCHENGSHEDIEBI': 'Inbound Equipment Return Fold Ratio',//入库器具返程折叠比
        'LK_RUKUQIJUKUAN': 'Inbound Equipment Width (mm) ',//入库器具宽（mm）
        'LK_RUKUQIJUKUANMM': 'Inbound Equipment Width (mm)',//入库器具宽（mm）
        'LK_RUKUQIJULEIXING': 'Inbound Equipment Type',//入库器具类型
        'LK_RUKUQIJUSHOUMING': 'Inbound Equipment Useful Life',//入库器具寿命
        'LK_RUKUQIJUXINGHAO': 'Inbound Equipment ID',//入库器具型号
        'LK_RUKUQIJUCHANG': 'nbound Equipment Length (mm)',//入库器具长（mm）
        'LK_RUKUQIJUZHANGMM': 'Inbound Equipment Length (mm)',//入库器具长（mm）
        'LK_RUKUQIJUZHUANGXIANGSHU': 'Inbound Equipment Load Number',//入库器具装箱数
        'LK_RUKUQIJUZHONGHEDANJIA': 'Inbound Equipment Net Unit Price',//入库器具综合单价
        'LK_RUKUQIJUZHONGHEDANJIARMB': 'Inbound Equipment Net Unit Price (RMB)',//入库器具综合单价
        'LK_RUKUQIJUZUJINRMBDAY': 'Inbound Equipment Rent (RMB/Day)',//入库器具综合单价
        'LK_RUKUQIJUZONGHEDANJIA': 'Inbound Equipment Net Unit Price',//入库器具综合单价
        'LK_SEBIAOHAO': 'Color code',//色标号
        'LK_SHANCHU': 'Delete',//删除
        'LK_SHANCHUGONGYINGSHANG': 'Delete Supplier',//删除供应商
        'LK_SHANGCHUANREN': 'Uploader',//上传人
        'LK_SHANGCHUANRIQI': 'Upload date',//上传日期
        'LK_SHANGQIDAZHONGYUANQU': 'Room 303, Shanghai Volkswagen Park',//上汽⼤众园区303室!
        'LK_SHANGYIYE': 'Prevoius',//上一页
        'LK_SHEJIGONGCHENGSHIGONGHAO': 'TP owner No.',//设计工程师工号
        'LK_SHEJIGONGCHENGSHIHAO': 'TP owner No.',//设计工程师号
        'LK_SHEJIGONGCHENGSHIXINGMING': 'TP Name',//设计工程师姓名
        'LK_SHEJIKESHI': 'TP dept.',//设计科室
        'LK_SHEZHIGONGYIZU': 'Set Craft Group',//设置工艺组
        'LK_SHENQING': 'Apply',//申请
        'LK_SHENQINGRWJIA': 'Apply RW Price',//申请RW价
        'LK_SHENQINGBEIZHU': 'Application Remarks',//申请备注
        'LK_SHENQINGCAIWUMUBIAOJIA': 'Apply CF target price',//申请财务目标价
        'LK_SHENQINGLEIBIE': 'Application Type',//申请类别
        'LK_SHENQINGLEIXING': 'Application Type',//申请类型
        'LK_SHENQINGMUBIAOJIA': 'Apply Target Price',//申请目标价
        'LK_SHENQINGRIQI': 'Application Date ',//申请日期
        'LK_SHENQINGYUANYIN': 'Reason of Application',//申请原因
        'LK_SHENQINGZHUANGTAI': 'Application Status',//申请状态
        'LK_SHENDUGUOCHANHUABEIZHU': 'Deep localize remark',//深度国产化备注
        'LK_SHENDUGUOCHANHUADAIMA': 'Deep localize code',//深度国产化代码
        'LK_SHENPIYIJIAN': 'Approval Opinion',//审批意见
        'LK_SHENPIZHUANGTAI': 'Approval Status',//审批状态
        'LK_SHENGCHENGFS_GSNR': 'Generate FSNR/GSNR/SPNR',//生成FS/GSNR
        'LK_SHENGCHENGFSHAO': 'Generate FS',//生成FS号
        'LK_SHIJIANJIHUA': 'Time Schedule',//时间计划
        'LK_SHIFOUERCIJIAN': 'Tier-2 or not',//是否二次件
        'LK_SHIFOUJIARUYIYOURFQ': 'Confirm to add existing RFQ',//是否加入已有RFQ
        'LK_CONFIRM_SIGN_RECORD_TIPS': 'Confirm to sign the new record?',//是否确认对新件信息单进行签收？
        'LK_SHIFOUQUERENSHANCHU': 'Are you sure to delete?',//是否确认删除?
        'LK_SHIFOUSHENDUGUOCHANHUA': 'Deep localize or not',//是否深度国产化
        'LK_SHIFOUYANZHENGCBD': 'CBD verified or not',//是否验证CBD
        'LK_SHIFOUZUHEXINJIANRFQ': 'Confirm to group new RFQ',//是否组合新建RFQ
        'LK_ENTER_SEARCH_SUPPLIER_NAME_FACOTRY': 'Enter to Search for Supplier Name, Facotry Type…',//输入查询供应商名称、厂商类型...
        'LK_SUOXUANBANBENWUFUJIAN': '',//所选版本无附件
        'LK_TANPANZHUSHOU': 'Negotiation Assistant',//谈判助手
        'LK_TESHULINGJIANLEIXING': 'Special Parts Type',//特殊零件类型
        'LK_TESHUYAOQIU': 'Special Requirements',//特殊要求
        'LK_TIJIAO': 'Submit',//提交
        'LK_TIANJIA': 'Insert',//添加
        'LK_TIANJIAGONGYINGSHANG': 'Add supplier',//添加供应商
        'LK_TIANJIAZIDINGYIPINGFENXIANG': 'Add defined column',//添加自定义评分项
        'LK_TONGZHIQUANBUGONGYINGSHANG': 'Inform all suppliers',//通知全部供应商
        'LK_TONGZHIYIBAOJIAGONGYINGSHANG': 'Inform suppliers with quotation',//通知已报价供应商
        'LK_TOUZIYUSUAN': 'Investment Budget',//投资预算
        'LK_TUZHI': 'Blueprint',//图纸
        'LK_TUZHIHETPXIANGQINGYE': 'Blueprint and TP Information',//图纸和TP详情页
        'LK_TUZHIHETPDANXIANGQING': 'Blueprint and TP Order',//图纸和信息单详情
        'LK_TUZHIRIQI': 'Spec. date',//图纸日期
        'LK_TUISONGSHIJIAN': 'Forwarded time',//推送时间
        'LK_TUICHUDENGLU': 'Log out',//退出登录!
        'LK_TUIHUI': 'Return',//退回
        'LK_TUIHUIYUANYIN': 'Return reason',//退回原因
        'LK_WAIBUKAIFAFEIYUAN': 'External Developer Cost (Yuan)',//外部开发费（元）
        'LK_WEIHU': 'Maintain',//维护
        'LK_WEIHUREN': 'Maintainer',//维护人
        'LK_WENXINTISHI': 'Tips',//温馨提示
        'LK_WENJIANDAXIAOMB': 'File Size (MB)',//文件大小（MB）
        'LK_WENJIANMING': 'File Name',//文件名
        'LK_WENJIANMINGCHENG': 'File Name',//文件名称
        'LK_WULIUBIAOZHUN': 'Logistics Standard',//物流标准
        'LK_PL': 'PL',//物流审核人
        'LK_WULIUYAOQIU': 'Logistics requirement',//物流要求
        'LK_XIAYIYE': 'Next',//下一页
        'LK_XIAZAI': 'Download',//下载
        'LK_XIANGGUANCHEXING': 'Relevent car type',//相关车型
        'LK_XIANGNEIZHOUZHUANCAILIAOZONGHEJIAGE': 'Inbox turnover material price',//箱内周转材料综合价格
        'LK_XIANGNEIZHOUZHUANCAILIAOZONGHESHOUMING': 'Inbox turnover material life',//箱内周转材料综合寿命
        'LK_XIANGQINGXINXI': 'Detail',//详情信息
        "LK_TANPANZS":'谈判助手',
        'LK_XIANGMUCHEXING': 'Project Car Type',//项目车型
        'LK_XINJIANXINXIDANQIANSHOU': 'TP Apps Sign in',//新件信息单签收
        'LK_XINJIANXINXILIUSHUIDANHAO': 'New Tp Sequence No.',//新件信息流水单号
        'LK_XINJIANRFQLUNCI': 'Create New RFQ Round',//新建RFQ轮次
        'LK_XINJIANXINXIDANBEIZHU': 'Create new part info. remark',//新建信息单备注
        'LK_XINJIANXINXIDANLIUSHUIHAO': 'Part info. Sheet No.',//新建信息单流水号
        'LK_XINSHENQINGCAIWUMUBIAOJIA': 'Apply New CF Target Price',//新申请财务目标价
        'LK_XINXIDANFENLEI': 'Sheet type',//信息单分类
        'LK_XINXIDANLEIXING': 'Sheet type',//信息单类型
        'LK_XINXIDANLIUSHUIHAO': 'TP sequence ID',//信息单流水号
        'LK_XINXIDANSHENGCHENGSHIJIAN': 'Part Sheet creation time',//信息单生成时间
        'LK_XINXIDANXIANGQING': 'Part Sheet detailed info.',//信息单详情
        'LK_XINXIDANZHUANGTAI': 'Sheet Status',//信息单状态
        'LK_XINXILIUSHUIDANHAO': 'Part Sheet ID',//信息流水单号
        'LK_XUANZHUANGJIAN': 'Optional',//选装件
        'LK_XUNYUANZHIHANG': 'Sourcing Operation',//寻源执行
        'LK_XUNJIACAIGOUYUAN': 'Forward Buyer',//询价采购员
        'LK_XUNJIACAIGOUYUANBEIZHU': 'Forward Buyer remark',//询价采购员备注
        'LK_XUNJIACHANLIANGJIHUA': 'Enquiry Volume Plan',//询价产量计划
        'LK_XUNJIAFUJIAN': 'Inquiry attachments',//询价附件
        'LK_XUNJIATUZHI': 'Inquiry Blueprint',//询价图纸
        'LK_XUNJIAZILIAO': 'Drawing for inquiry',//询价资料
        'LK_XUNJIAZILIAOZHUANGTAI': 'Inquiry Documents Status',//询价资料状态
        'LK_YANYONGCHEXINGDALEIDAIMA': 'COP Model code',//沿用车型大类代码
        'LK_YAOQIUCSCHUIYIRIQI': 'Request CSC Meeting Date',//要求CSC会议日期
        'LK_YIBAOCUN': 'The saved',//已保存!
        'LK_YIBAOJIAGONGYINGSHANG': 'Supplier with quotation',//已报价供应商
        'LK_YITIANJIADAOSHANGXIAN': 'Added to the upper limit',//已添加到上限!
        'LK_YIXUNJIACAIGOUYUANSHANGHUIBEIZHU': 'Forward Buyer meeting remark',//已询价采购员上会备注
        'LK_YIXUNJIAGONGYINGSHANG': 'Supplier with inquiry',//已询价供应商
        'LK_YONGLIANG': 'Usage',//用量
        'LK_YUQIDAIBAN': 'Overdue',//逾期待办
        'LK_YUANPEICHANG': 'Old factory',//原配厂
        'LK_ZAISHENQINGCAIWUMUBIAOJIA': 'Reapply CF Target Price',//再申请财务目标价
        'LK_ZAICISHENGQINGCAIWUMUBIAOJIA': 'Reapply CF Target Price',//再新申请财务目标价
        'LK_ZAIXINSHENQINGCAIWUMUBIAOJIA': 'Reapply CF Target Price',//再新申请财务目标价
        'LK_ZAIXIANJINGJIA': 'Online Bidding',//在线竞价
        'LK_ZANWUSHUJU': 'No Data',//暂无数据
        'LK_ZENGJIADERENKEFEIYUAN': 'Addtional approval fee (Yuan)',//增加的认可费（元）
        'LK_ZHIFUTIAOKUAN': 'Payment Terms',//支付条款
        "LK_ZHINENGSHANGCHUANWENJIAN": 'Upload .xlsx file only',//只能上传.xlsx文件
        'LK_ZHILIANG': 'Quality',//质量
        'LK_MQ': 'MQ',//质量评分人
        'LK_ZHONGLIANG': 'Weight',//重量
        'LK_ZHONGXINSHENQING': 'Reapply',//重新申请
        'LK_ZHONGZHI': 'Reset',//重置
        'LK_ZHUANPAI': 'Handover',//转派
        'LK_ZHUANGXIANGSHU': 'Number of Containers',//装箱数
        'LK_ZHUANGTAI': 'Status',//状态
        'LK_ZUIXINRWJIA': 'Latest RW Price',//最新RW价
        'LK_ZUIXINFANHUIRIQI': 'Latest Response Date',//最新返回日期
        'LK_ZUIXINSHENQINGRIQI': 'Latest Application Date',//最新申请日期
        'LK_ZUIXINSHENQINGZHUANGTAI': 'Latest Application Status',//最新申请状态
        'LK_SHEZHIPINGFENBUMEN': 'Set up a scoring department', //设置评分部门
        'LK_TUISONGPINGFENRENWU': 'Push scoring task', //推送评分任务
        'LK_GONGYIZU': 'Craft Group', //工艺组
        'LK_GONGYISHEZHI': '', //工艺设置
        'LK_CAILIAOZUSHAIXUAN': '', //材料组筛选
        'LK_GONGYIZUXUANDING': '', //工艺组选定
        "LK_CHAIFENFACTORY": '选中的工厂中,存在未分配的份额，请填写后重试！',
        "LK_FACTORYNOTSAME": '您所选的采购工厂与主数据中该车型项目对应的采购工厂不一致，请确认是否修改',
        "LK_AREYOUSPLITE": '该车型项目主数据中对应多个采购工厂，是否拆分？',
        "LK_NHWXZBDL":"您还未选择BDL",
        'LK_XIETIAOREN': '', //协调人
        'LK_XINZENG': 'Add', //新增
        'LK_HUIFU': 'Recover', //恢复
        'LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN': '', //请选择需要删除的评分部门
        'LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN': '', //请选择需要恢复的评分部门
        'LK_QINGXUANZEWANSHUJUZAIZUOBAOCUN': '', //请选择完数据再做保存
        'LK_WEIBUXITONGWENJIANWUFASHANCHU': '', // xxx 为外部系统文件, 无法删除
        'LK_DINGDIANXINXI': '定点信息', // 定点信息
        'LK_SHANGHUI': '上会', // 上会
        'LK_LIUZHUAN': '流转', // 流转
        'LK_BEIAN': '备案', // 备案

        //摸具预算
        // 'LK_CAIGOUGONGCHANG': 'Plant',//采购⼯⼚
        // 'LK_DANWEI': 'Unit',//单位
        'LK_BAIWANYUAN': 'Mio.',//百万元
        'LK_ZONGYUSUAN': 'Total Budget',//总预算
        'LK_DINGDIANJINE': 'Nomi. Price',//定点⾦额
        'LK_ZUIXINGENGXINREN': 'Updated by',//最新更新人
        'LK_ZUIXINGENGXINSHIJIAN': 'Updated time',//最新更新时间
        'LK_BMDAN': 'BM sheet',//BM单
        'LK_FUKUAN': 'Payment',//付款
        'LK_CHEXINXIANGMU': 'Project',//⻋型项⽬
        'LK_XIANGMULEIXIN': 'Project Type',//项⽬类型
        'LK_DINGDIANLEIXIN': 'Nomi. Type',//定点类型
        'LK_CHEXINLEIBIE': 'Category',//⻋型类别
        // 'LK_QUEREN': 'Confirm',//确认
        // 'LK_CAILIAOZU': 'MG',//材料组
        'LK_LINJIANLIUWEIHAO': '6-digital No',//零件六位号
        'LK_TIANJIAHANG': 'Add',//添加⾏
        'LK_SHANCHUHANG': 'Delete',//删除⾏
        'LK_CANKAOCHEXIN': 'Refer Carline',//参考⻋型
        'LK_CAILIAOZUBIANHAO2': 'MG No',//材料组编号
        'LK_CAILIAOZUMINGCENGZHONG': 'MG Name_CN',//材料组名称（中）
        'LK_CAILIAOZUMINGCENGDE': 'MG Name_GE',//材料组名称（德）
        'LK_ZHUANYEKESHI': 'Commodity',//专业科室
        'LK_SHIFOUZUOGUOCOMMONSOURING': 'Common Sourcing',//是否做过Common Sourcing
        'LK_CommonSourcing': 'Common Sourcing',
        'LK_MOJUSHUXIN': 'Mold Property',//模具属性
        'LK_ZP': 'ZP',//ZP
        'LK_CANKAOCHEXINXIANGMU': 'Refer Project',//参考⻋型项⽬
        'LK_CANKAOCHEXINXIANGMUYI': '1st Refer',//参考⻋型项⽬⼀
        'LK_CANKAOCHEXINXIANGMUER': '2nd Refer ',//参考⻋型项⽬⼆
        'LK_CANKAOCHEXINXIANGMUSAN': '3rd Refer',//参考⻋型项⽬三
        'LK_QITACHEXINXIANGMUBEIXUAN': 'Others',//其它⻋型项⽬备选
        'LK_CHEXINXIANGMULEIXIN': 'Project Type',//⻋型项⽬类型
        'LK_CHEXINXIANGMUQIZHINIANFEN': 'Project SOP',//⻋型项⽬起⽌年份
        'LK_CHONGZHI': 'Reset',//重置
        'LK_CAILIAOZUBIANHAOZHONGWENMINGDEWEN': 'MG',//材料组编号/中⽂名/德⽂名
        'LK_CHAXUN': 'Search',//查询
        // 'LK_TIANJIA': 'Add',//添加
        'LK_BANBENHAO2': 'Version',//版本号
        'LK_CHEXINMINGCENG': 'Carline',//⻋型名称
        'LK_PIZHUNTOUZHI': 'Approved Invest',//批准投资
        'LK_FEIAEKO': 'Not AEKO',//⾮AEKO
        'LK_WEISHENQING': 'Not Apply',//未申请
        'LK_YISHENQING': 'Applied',//已申请
        'LK_WEIDINGDIAN': 'Not Nomi.',//未定点
        'LK_YIDINGDIAN': 'Nomi.',//已定点
        'LK_WUBA': 'Not BA',//⽆BA
        'LK_YOUBA': 'BA',//有BA
        'LK_WUBM': 'Not BM',//⽆BM
        'LK_YOUBM': 'BM',//有BM
        // 'LK_BIANJI': 'Edit',//编辑
        'LK_XIAZHAITOUZHIQINDAN': 'Download Invest List',//下载投资清单
        'LK_YUSUANJINEPSK': 'Budget Amount PSK(Mio.RMB)',//预算⾦额PSK
        'LK_SOURCINGLEIXIN': 'Sourcing Type',//Sourcing类型
        'LK_CANKAOXIANGMU': 'Refer Project',//参考项⽬
        'LK_CANKAOXINGMUMOJUJINE': 'Refer Project Nomi Amount(Mio.RMB)',//参考项⽬模具⾦额
        'LK_YUSUANBEIZHU': 'Budget Remark',//预算备注
        'LK_AEKOJINE': 'AEKO Amount',//AEKO⾦额
        'LK_ZONGHEPIANCHA': 'Comp. Deviation',//综合偏差
        'LK_ZHONGHEPIANCHAJINE': 'Comp. Deviation Amount',//综合偏差⾦额
        'LK_GUANLIANCHEXIN': 'Associated Carline',//关联⻋型
        // 'LK_BAOCUN': 'Save',//保存
        'LK_BAOCUNWEIXINBANBEN': 'Save New',//保存为新版本
        'LK_ANBILIZHESUAN': 'Convert By Proportion',//按⽐例折算
        'LK_ZHESUANBILI': 'Proportion',//折算⽐例
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

        'LK_CHEXINGXIANGMUGAILAN': 'Project Overview',//车型项目概览
        'LK_YUSUANGUANLI': 'Budget Mgmt',//预算管理
        'LK_YUSUANSHENPI': 'Budget Approval',//预算审批
        'LK_BASHENQING': 'BA Application',//BA申请
        'LK_BMSHENQING': 'BM Application',//BM申请
        'LK_TOUZIBAOGAO': 'Investment Report',//投资报告

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

        'LK_XIAYIBU': 'Next step',    //  下一步

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
        'LK_MODIFYANUMBERTXTTIPS': '确定后，所有同⼀⻋型项⽬、同⼀⼯⼚的BA申请相关记录将⼀并更改',  //  确定后，所有同⼀⻋型项⽬、同⼀⼯⼚·BA申请相关记录将⼀并更改
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
        'LK_HEAVYITEM': 'Heavy Item', // Heavy Item
        'LK_FENXIBAOGAO': '', // 分析报告
        'LK_LINGJIANCHENGBENFENXIYUAN': '', // 零件成本分析员
        'LK_MUJUCHENGBENFENXIYUAN': '', // 模具成本分析员
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
        'LK_DONGJIE':'冻结', // 冻结
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

        'LK_BAAPPLYTISP1': '请先勾选',  //  请先选择车型项目
        'LK_INPUTNUMBERORMORE1': '不能输入特殊字符',    //  不能输入特俗字符

        'LK_ALLBMAPPLY': '所有BM申请',    //  所有BM申请
        'LK_DAIQUERENBMDAN': '待确认BM单',    //  待确认BM单
        'LK_AEKOZENGZHIBMDAN': 'AEKO增值BM单',  //  Aeko增值BM单
        'LK_AEKOJIANZHIBMDAN': 'AEKO减值BM单',  //  Aeko减值BM单
        'LK_BMDANZHUANGTAI': 'BM单状态',    //  BM单状态
        'LK_AEKOLEIXING': 'AEKO类型',   //  AEKO类型
        'LK_BMDANLIUSHUIHAO': 'BM单流⽔号',   //  BM单流⽔号
        'LK_BMDANHAO': 'BM单号',    //  BM单号
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
        'LK_BAOCUNWEIZUIXINBANBEN': '保存为最新版本',  //
        'LK_SHUAXIN': '刷新',   //  刷新
        'LK_SHUAXINRIQI': '刷新日期',   //  刷新日期
        'LK_SHANGBANNIANSOPFUKUANDUIBI': '上半年SOP付款⽐',   //  上半年SOP付款⽐
        'LK_XIABANNIANSOPFUKUANDUIBI': '下半年SOP付款⽐',   //  下半年SOP付款⽐
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

        'LK_FUKUANKANBAN': '付款看板',  //  付款看板
        'LK_NIANDUJIHUA': '年度计划',   //  年度计划
        'LK_CHEXINGXIANGMUXIANGQ': '车型项目详情',

        'DAXIAO': 'Size', // 大小
        'WENJIANDAXIAO': 'File Size', // 文件大小

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
        'LK_FASONGGONGYIUNGSHANGQUEREN': '发送供应商确认',   //  资产单
        'LK_FAQIBIANGENG': '发起变更',   //  资产单
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

        // 定点管理
        'nominationLanguage': {
            'DingDianGuanLi': '定点管理',
            'LingJianHao': '零件号',
            'ShenQingDanHao': '申请单号',
            'RFQBianHao': 'RFQ编号',
            'LiuChengLeiXing': '流程类型',
            'ShenQingZhuangTai': '申请状态',
            'LingJianMing': '零件名',
            'LingJianMingCN': '零件名(中)',
            'LingJianMingDE': '零件名(德)',
            'XunJiaCaiGouYuan': '询价采购员',
            'CheXingXiangMu': '车型项目',
            'BaoJiaYiZhiXingJiaoYan': '报价一致性校验',
            'ShiFouDnaYiGongYingShang': '是否单一供应商',
            'XianShiZiJi': '显示自己',
            'Yes': '是',
            'No': '否',
            'DingDianShenQingZongHeGuanLi': '定点申请综合管理',
            'XinJianLingJIanDingDianShengQIng': '新建零件定点申请',
            'CheHui': '撤回',
            'ShanChu': '删除',
            'TiJiaoYiZhiXingJiaoYan': '提交一致性校验',
            'ShenQingDanMing': '申请单名',
            'LeiXing': '类型',
            'XingMuLeiXing': '项目类型',
            'HuiYi': '会议',
            'RSZhuangTai': 'RS单状态',
            'RSDongJieRiQi':'RS冻结日期',
            'BaoJiaYiZhiXingZhuangTai':'报价一致性校验状态',
            'SELDanJuQUeRenZH': 'SEL单据确认状态',
            'DingDianRiQi': '定点日期',
            'DINGDIANSHENQINGLEIXING':'定点申请类型', // 定点申请类型
            'RFQANDLINGJIANQINGDAN':'RFQ & 零件清单', // RFQ & 零件清单
            'GONGYINGSHANGANDDANYIGONGYINGSHANG':'供应商 & 单⼀供应商', // 供应商 & 单⼀供应商
            'DINGDIANJIANYI':'定点建议', // 定点建议
            'SHENPIRENANDSHENPIJILU':'审批⼈ & 审批记录', // 审批⼈ & 审批记录
            'JUECEZILIAO':'决策资料', // 决策资料
            'DINGDIAN':'定点', // 定点
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
        },
        'LK_TUICHUBIANJI': '退出编辑',    //  退出编辑
        'LK_SHANGCHUANQINGDAN': '上传清单',    //  上传清单
        'LK_YUEDUJIHUA': '月度计划',    //  月度计划
        'LK_DANGNIANFUKUANJIHUA': '当年付款计划',    //  当年付款计划
        'LK_CINIANFUKUANJIHUA': '次年付款计划',    //  次年付款计划
        'LK_YIYUE': 'Jan',    //  一月
        'LK_ERYUE': 'Feb',    //  二月
        'LK_SANYUE': 'Mar',    //  三月
        'LK_SIYUE': 'Apr',    //  四月
        'LK_WUYUE': 'May',    //  五月
        'LK_LIUYUE': 'Jun',    //  六月
        'LK_QIYUE': 'Jul',    //  七月
        'LK_BAYUE': 'Aug',    //  八月
        'LK_JIUYUE': 'Sep',    //  九月
        'LK_SHIYUE': 'Oct',    //  十月
        'LK_SHIYIYUE': 'Nov',    //  十一月
        'LK_SHIERYUE': 'Dec',    //  十二月
        "BJZS":{
            "LK_BAOJIAZUSHOU_MJ":"报价分析汇总-模具",
            "LK_BAOJIAZUSHOU_MJDANWEIYUAN":"报价分析汇总-模具（单元：元）"
        },
        //谈判助手
        "TPZS": {
            'FENXI': ' Analyze', //分析
            'YULAN': 'preview', //预览
            'GONGYINGSHANG': 'Supplier', //供应商
            'CHEXINGXIANGMU': 'Model project', //车型项目
            'CHEXING': 'Model', //车型
            'GONGCHANG': 'Factory', //工厂
            'ZONGDANJIA': 'Total unit price', //总单价
            'GUDINGCHENGBENZHANBI': 'Percentage of fixed costs', //固定成本占比
            'FEIYONGLEIXING': 'Types of fee', //费用类型
            'FEIYONGZONGE': 'Total cost', //费用总额
            'FENTANSHULIANG': 'Apportioned quantity', //分摊数量
            'YINGXIANGDANJIA': 'Affect the unit price', //影响单价
            'YINGXIANGCHENGBENZHANBI': 'Affect the proportion of cost', //影响成本占比
            'XIANSHIYINGCANG': 'show/hide', //显示/隐藏
            'WANCHENG': 'finish', //完成
            'QINGSHURUBIANHAOMINGCHENG': 'Please enter the number/name', //请输入编号/名称
            'QINGSHURUCHUANGJIANRENMINGCHENG': 'Please enter the name of the creator', //请输入创建人名称,
            'PCAZONGLAN': 'PCA overview', //PCA总览
            'BAOGAOMINGCHENG': 'Report name', //报告名称
            'QUXIAN': ' curve', //曲线
            'ZUIXINDINGDIANDANJIA': 'The latest fixed-point unit price', //最新定点单价
            'MUBIAODANJIA': 'Target unit price', //目标单价,
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
            i18n.setLocaleMessage('en', Object.assign(oldLanguage,data.data.cn))
        }
    }
    xmlHttp.open("GET", "http://10.122.18.136:8088/i18n/getTranslationMap?from=sourcing",false);
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.setRequestHeader("Accept","*/*");
    xmlHttp.send()
}))
