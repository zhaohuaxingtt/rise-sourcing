import language from "@/utils/language";

export const projectTableTitle = [
  {
    props: "index",
    name: language('BIDDING_XUHAO','序号'),
    key:'BIDDING_XUHAO',
    width:80,
    sortable: true
  },
  {
    props: "quoteType",
    name: language('BIDDING_BAOJIALEIXING','报价类型'),
    key:'BIDDING_BAOJIALEIXING',
    width:120,
    sortable: true
  },
  {
    props: "projectCode",
    width: 150,
    name: language('BIDDING_XIANGMUBIANHAO','项目编号'),
    key:'BIDDING_XIANGMUBIANHAO',
    sortable: true
  },
  {
    props: "rfqCode",
    name: language('BIDDING_RFQBIANHAO','RFQ编号'),
    width: 120,
    key:'BIDDING_RFQBIANHAO',
    sortable: true
  },
  {
    props: "projectName",
    name: language('BIDDING_XIANGMUMINGCHENG','项目名称'),
    width: 500,
    key:'BIDDING_XIANGMUMINGCHENG',
    sortable: true
  },
  {
    props: "projectType",
    name: language('BIDDING_XIANGMULEIXING','项目类型'),
    key:'BIDDING_XIANGMULEIXING',
    width: 120,
    sortable: true
  },
  {
    props: "biddingStatus",
    name: language('BIDDING_ZHUANGTAI','状态'),
    key:'BIDDING_ZHUANGTAI',
    width: 80,
    sortable: true
  },
  {
    props: "rfqRound",
    name: language('BIDDING_DANGQIANLUNCI','当前轮次'),
    key:'BIDDING_DANGQIANLUNCI',
    width: 120,
    sortable: true
  },
  {
    props: "createDate",
    name: language('BIDDING_CHUANGJIANRIQI','创建日期'),
    width: 120,
    key:"BIDDING_CHUANGJIANRIQI",
    sortable: true
  },
  {
    props: "createName",
    name: language('BIDDING_CHUANGJIANREN','创建人'),
    key:'BIDDING_CHUANGJIANREN',
    width: 200,
    sortable: true
  },
  {
    props: "createDept",
    name: language('BIDDING_CHUANGJIANBUMEN','创建部门'),
    key:'BIDDING_CHUANGJIANBUMEN',
    width: 120,
    sortable: true
  },
  {
    props: "biddingBeginTime",
    name: language('BIDDING_JINGJIAQIZHIRIQI','竞价起止日期'),
    width: 150,
    key:'BIDDING_JINGJIAQIZHIRIQI',
    sortable: true
  },
  {
    props: "pricingDeadline",
    name: language('BIDDING_BAOJIAJIEZHIRIQI','报价截止日期'),
    width: 150,
    key:'BIDDING_BAOJIAJIEZHIRIQI',
    sortable: true
  },
  {
    props: "openTenderTime",
    name: language('BIDDING_KAIBIAOSHIJIAN','开标时间'),
    width: 150,
    key:'BIDDING_KAIBIAOSHIJIAN',
    sortable: true
  },
]

// 项目类型
export const projectType = [
  {
    value: '01',
    label: '正式项目',
    key:'BIDDING_ZHENGSHIXIANGMU'
  },
  {
    value: '02',
    label: '测试项目',
    key:'BIDDING_CESHIXIANGMU'
  },
]

// 报价类型
export const quoteType = [
  {
    value: '01',
    label: '开标',
    key:'BIDDING_KAIBIAO'
  },
  {
    value: '02',
    label: '英式',
    key:'BIDDING_YINGSHI'
  },
  {
    value: '03',
    label: '荷式',
    key:'BIDDING_HESHI'
  },
]

// 竞价类型
export const biddingType = [
  {
    value: '01',
    label: '拍买（价低者得）',
    key:'BIDDING_PM（JDZD）'
  },
  {
    value: '02',
    label: '拍卖（价高者得）',
    key:'BIDDING_PM（JGZD）'
  },
]

// 项目状态
export const biddingStatus = [
  {
    value: '01',
    label: '草稿',
    key:'BIDDING_CAOGAO'
  },
  {
    value: '02',
    label: '待竞价',
    key:'BIDDING_DAIJINGJIA'
  },
  {
    value: '03',
    label: '未开标',
    key:'BIDDING_WEIKAIBIAO'
  },
  {
    value: '04',
    label: '竞价中',
    key:'BIDDING_JINGJIAZHONG'
  },
  {
    value: '05',
    label: '已开标',
    key:'BIDDING_YIKAIBIAO'
  },
  {
    value: '06',
    label: '已结束',
    key:'BIDDING_YIJIESHU'
  },
  {
    value: '07',
    label: '已流标',
    key:'BIDDING_YILIUBIAO'
  },
  {
    value: '08',
    label: '已作废',
    key:'BIDDING_YIZUOFEI'
  },
  {
    value: '09',
    label: '已取消',
    key:'BIDDING_YIQUXIAO'
  },
  {
    value: '10',
    label: '已发出',
    key:'BIDDING_YIFACHU'
  },
]

export const infoForm = {
  rfqCode: null, //RFQ/项目编号
  rfqName: null, //RFQ/项目名称
  projectType: null, //项目类型
  quoteType: null, //报价类型
  biddingType: null, //竞价类型
  rfqEndTime: null, //本轮RFQ关闭时间
  openTenderTime: null, //开始时间
  biddingBeginTime: null, //结束时间
  biddingStatus: null, //状态
  createName: null, //创建人
  partNumber: null, //零件号
}

export const RFQTurnList = [
  // { value: "01", label: "普通询价" },
  { value: "02", label: '在线开标', key:'BIDDING_ZAIXIANKAIBIAO' },
  { value: "03", label: '在线竞价-英式', key:'BIDDING_ZAIXIANJINGJIA_YINGSHI' },
]

export const procureTypeList = [
  { value: "01", label: '生产采购', key:'BIDDING_SHENGCHANCAIGOU' },
  { value: "02", label: '一般采购', key:'BIDDING_YIBANCAIGOU' },
]

export const manualBiddingTypeList = [
  {
    name: '在线竞价-英式',
    manualBiddingType: "01",
    key:'BIDDING_ZAIXIANJINGJIA_YINGSHI'
  },
  {
    name: '在线竞价-荷式',
    manualBiddingType: "02",
    key:'BIDDING_ZAIXIANJINGJIA_HESHI'
  },
]

