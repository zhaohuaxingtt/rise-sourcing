import language from "@/utils/language";

export const projectTableTitle = [
  {
    type: "selection",
    width: 60,
  },
  {
    type: "index",
    width: 70,
    label: language('BIDDING_XUHAO','序号'),
  },
  {
    prop: "quoteType",
    label: language('BIDDING_BAOJIALEIXING','报价类型'),
    customRender: (h, scope) => {
      return <span>{scope.row.quoteType === '01' ? language('BIDDING_KAIBIAO','开标') : scope.row.quoteType === '02' ? language('BIDDING_YINGSHI','英式') : scope.row.quoteType === '03' ? language('BIDDING_HESHI','荷氏') : ''}</span>;
    },
  },
  {
    prop: "projectCode",
    width: 140,
    label: language('BIDDING_XIANGMUBIANHAO','项目编号'),
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="open-link-text" style="cursor: pointer;">{scope.row.projectCode}</span>;
    },
  },
  {
    prop: "rfqCode",
    label: language('BIDDING_RFQBIANHAO','RFQ编号'),
  },
  {
    prop: "projectName",
    label: language('BIDDING_XIANGMUMINGCHENG','项目名称'),
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.projectName || scope.row.rfqName}</span>;
    },
  },
  {
    prop: "projectType",
    label: language('BIDDING_XIANGMULEIXING','项目类型'),
    customRender: (h, scope) => {
      return <span>{scope.row.projectType === '01' ? '正式' : scope.row.projectType === '02' ? '测试' : ''}</span>;
    },
  },
  {
    prop: "rfqRound",
    label: language('BIDDING_DANGQIANLUNCI','当前轮次'),
  },
  {
    prop: "createDate",
    label: language('BIDDING_CHUANGJIANRIQI','创建日期'),
    width: 150,
    customRender: (h, scope) => {
      return <span>{scope.row.createDate?.substring(0, 10)}</span>;
    },
  },
  {
    prop: "createName",
    label: language('BIDDING_CHUANGJIANREN','创建人'),
  },
  {
    prop: "createDept",
    label: language('BIDDING_CHUANGJIANBUMEN','创建部门'),
  },
  {
    prop: "biddingBeginTime,biddingEndTime,roundType,quoteType",
    label: language('BIDDING_JINGJIAQIZHIRIQI','竞价起止日期'),
    width: 200,
    customRender: (h, scope) => {
      return <span>{scope.row.quoteType === '01' ? '' : scope.row.biddingBeginTime?.substring(0, 16).replace('T', ' ')}
        <br />
        {(scope.row.roundType === '05' && scope.row.quoteType === '03') || scope.row.quoteType === '01'
          ? ''
          : scope.row.biddingEndTime?.substring(0, 16).replace('T', ' ')}
      </span>;
    },
  },
  {
    prop: "pricingDeadline",
    label: language('BIDDING_BAOJIAJIEZHIRIQI','报价截止日期'),
    width: 200,
    customRender: (h, scope) => {
      return <span>{scope.row.pricingDeadline?.substring(0, 16).replace('T', ' ')}</span>;
    },
  },
  {
    prop: "openTenderTime,roundType",
    label: language('BIDDING_KAIBIAOSHIJIAN','开标时间'),
    width: 200,
    customRender: (h, scope) => {
      return <span>{scope.row.roundType === '03' ? '' : scope.row.openTenderTime?.substring(0, 16).replace('T', ' ')}</span>;
    },
  },
]

// 项目类型
export const projectType = [
  {
    value: '01',
    label: language('BIDDING_ZHENGSHIXIANGMU','正式项目')
  },
  {
    value: '02',
    label: language('BIDDING_CESHIXIANGMU','测试项目')
  },
]

// 报价类型
export const quoteType = [
  {
    value: '01',
    label: language('BIDDING_KAIBIAO','开标')
  },
  {
    value: '02',
    label: language('BIDDING_YINGSHI','英式')
  },
  {
    value: '03',
    label: language('BIDDING_HESHI','荷式')
  },
]

// 竞价类型
export const biddingType = [
  {
    value: '01',
    label: language('BIDDING_PM（JDZD）','拍买（价低者得）')
  },
  {
    value: '02',
    label: language('BIDDING_PM（JGZD）','拍卖（价高者得）')
  },
]

// 项目状态
export const biddingStatus = [
  {
    value: '01',
    label: language('BIDDING_CAOGAO','草稿')
  },
  {
    value: '02',
    label: language('BIDDING_DAIJINGJIA','待竞价')
  },
  {
    value: '03',
    label: language('BIDDING_WEIKAIBIAO','未开标')
  },
  {
    value: '04',
    label: language('BIDDING_JINGJIAZHONG','竞价中')
  },
  {
    value: '05',
    label: language('BIDDING_YIKAIBIAO','已开标')
  },
  {
    value: '06',
    label: language('BIDDING_YIJIESHU','已结束')
  },
  {
    value: '07',
    label: language('BIDDING_YILIUBIAO','已流标')
  },
  {
    value: '08',
    label: language('BIDDING_YIZUOFEI','已作废')
  },
  {
    value: '09',
    label: language('BIDDING_YIQUXIAO','已取消')
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
  { value: "02", label: language('BIDDING_ZAIXIANKAIBIAO','在线开标') },
  { value: "03", label: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式') },
]

export const procureTypeList = [
  { value: "01", label: language('BIDDING_SHENGCHANCAIGOU','生产采购') },
  { value: "02", label: language('BIDDING_YIBANCAIGOU','一般采购') },
]

export const manualBiddingTypeList = [
  {
    name: language('BIDDING_ZAIXIANJINGJIA_YINGSHI','在线竞价-英式'),
    manualBiddingType: "01",
  },
  {
    name: language('BIDDING_ZAIXIANJINGJIA_HESHI','在线竞价-荷式'),
    manualBiddingType: "02",
  },
]

