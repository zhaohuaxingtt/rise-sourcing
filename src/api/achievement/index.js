import axios from '@/utils/axios'
import $qsAjax from '@/utils/ajax'

var requstAon = axios(process.env.VUE_APP_POWEBI_KPI + "/web/aon")
var requst,qsAjax

if(process.env.NODE_ENV=='dev') {
    requst = axios(process.env.VUE_APP_EKL)
    qsAjax = $qsAjax(process.env.VUE_APP_EKL)
} else {
    requst = axios()
    qsAjax = $qsAjax()
}

// 报表接口
export function getPowerBiVal(data) {
    return requst({
        url: `/eklApi/piEklreportEntity/getPowerBiVal`,
        method: 'POST',
        data
    })
}

//aon报表接口-获取eklPbi对应的的信息
export function getEklPbi(){
    return requstAon({
        url: `/eklApi/batchOverview/getEklPbi`,
        method: 'GET',
    })
}

// 获取状态列表
export function getStatus(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/getStatus`,
        method: 'POST',
        data
    })
}

// 版本号下拉数据
export function versionList(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/versionList`,
        method: 'POST',
        data
    })
}

// 年度添头-保存接口
export function aveEklAdjust(data) {
    return requst({
        url: `/eklApi/eklAdjustKeEntity/saveEklAdjust`,
        method: 'POST',
        data
    })
}

// 年度添头-产品家族查询
export function getProductFamily(data) {
    return requst({
        url: `/eklApi/eklAdjustCartypeEntity/listEklAdjustKe`,
        method: 'POST',
        data
    })
}

// 年度添头-科室查询接口
export function getDepartment(data) {
    return requst({
        url: `/eklApi/eklAdjustKeEntity/listEklAdjustKe`,
        method: 'POST',
        data
    })
}

// 初始化数据保存
export function querySavaTarget(data) {
    return qsAjax({
        url: `/eklApi/yearTargetDetailEntity/querySavaTarget`,
        method: 'POST',
        data
    })
}

// 获取科室数据
export function queryYearTargetDetail(data) {
    return qsAjax({
        url: `/eklApi/yearTargetDetailEntity/queryYearTargetDetail`,
        method: 'POST',
        data
    })
}

// 获取品牌内容
export function querybrandTarget(data) {
    return qsAjax({
        url: `/eklApi/brandTargetEntity/querybrandTarget`,
        method: 'POST',
        data
    })
}

// 修改科室数据
export function upYearTargetDetail(data) {
    return requst({
        url: `/eklApi/yearTargetDetailEntity/upYearTargetDetail`,
        method: 'POST',
        data
    })
}

//  新增修改年度头数据
export function saveOrUpYearTarget(data) {
    return requst({
        url: `/eklApi/yearTargetEntity/saveOrUpYearTarget`,
        method: 'POST',
        data
    })
}

//  修改品牌数据
export function upBrandTarget(data) {
    return requst({
        url: `/eklApi/brandTargetEntity/upBrandTarget`,
        method: 'POST',
        data
    })
}

//  发送站内信
export function sendLetter(data) {
    return qsAjax({
        url: `/eklApi/yearTargetDetailEntity/sendLetter`,
        method: 'POST',
        data
    })
}

// 修改配附件年度业绩科室数据
export function updateSpYearTargetDetail(data) {
    return requst({
        url: `/eklApi/spYearTargetDetailEntity/updateSpYearTargetDetail`,
        method: 'POST',
        data
    })
}

// 修改年度头数据
export function saveSpYearTarget(data) {
    return requst({
        url: `/eklApi/spYearTargetEntity/saveOrUpYearTarget`,
        method: 'POST',
        data
    })
}

// 获取配附件年度业绩明细数据接口
export function querySpYearTargetDetail(data) {
    return qsAjax({
        url: `/eklApi/spYearTargetDetailEntity/querySpYearTargetDetail`,
        method: 'POST',
        data
    })
}

// 获取配附件年度业绩
export function querySpYearTarget(data) {
    return qsAjax({
        url: `/eklApi/spYearTargetEntity/querySpYearTarget`,
        method: 'POST',
        data
    })
}

// 批量件-导入接口
export function batchImport(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/import`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-发起确认接口
export function baseAchievementConfirm(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/confirm`,
        method: 'POST',
        data
    })
}

// 业绩基础list
export function getAchievementList(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/page`,
        method: 'POST',
        data
    })
}

// 获取年份
export function getYear(data) {
    return requst({
        url: `/eklApi/yearTargetEntity/getMonth`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-失效接口
export function invalid(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/invalid`,
        method: 'POST',
        data
    })
}

// EKL车型产量主表-列表查询接口
export function cartypeOutputList(data) {
    return requst({
        url: `/eklApi/eklCartypeOutputEntity/page`,
        method: 'POST',
        data
    })
}

// 刷新
export function saveTask(data) {
    return requst({
        url: `/eklApi/monthPartlistTaskEntity/saveTask`,
        method: 'POST',
        data
    })
}

// 下载上传模板
export function downloadSptemplate(data) {
    return requst({
        url: `/eklApi/seriesbaseEntity/downloadExampleExcel`,
        method: 'GET',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `配附件基础表模板.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
}