import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { iMessage } from 'rise'
import {
    uploads
} from '@/api/file/upload'
import {
    udMutilfiles,
    reportAdd
} from '@/api/partsrfq/reportList/index'
/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */



export function downloadPDF({
    
    idEle: ele,
    pdfName: pdfName,
    callback: callback,
    exportPdf: exportPdf,
}) {
    let el = document.querySelector(ele) //通过getElementById获取要导出的内容
    let eleW = el.offsetWidth // 获得该容器的宽
    let eleH = el.offsetHeight // 获得该容器的高
    let eleOffsetTop = el.offsetTop // 获得该容器到文档顶部的距离
    let eleOffsetLeft = el.offsetLeft // 获得该容器到文档最左的距离
    var canvas = document.createElement('canvas')
    var abs = 0
    let win_in = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
    let win_out = window.innerWidth // 获得当前窗口的宽度（包含滚动条）

    if (win_out > win_in) {
        abs = (win_out - win_in) / 2 // 获得滚动条宽度的一半
    }
    canvas.width = eleW * 2 // 将画布宽&&高放大两倍
    canvas.height = eleH * 2

    var context = canvas.getContext('2d')
    context.scale(2, 2)
    context.translate(-eleOffsetLeft - abs, -eleOffsetTop)

    html2canvas(el, {
        dpi: 96, //分辨率
        scale: 2, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        //backgroundColor:'#ffffff',这样背景还是黑的
        bgcolor: '#ffffff', //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
    }).then((canvas) => {
        // el.setAttribute("crossOrigin",'anonymous');
        var contentWidth = canvas.width
        var contentHeight = canvas.height
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 592.28) * 841.89
        //未生成pdf的html页面高度
        var leftHeight = contentHeight
        //页面偏移
        var position = 0
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28
        var imgHeight = (595.28 / contentWidth) * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        var pdf = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
            // 分页
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                //避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage()
                }
            }
        }
        //可动态生成
        if (exportPdf) {
            pdf.save(pdfName)
        }
        if (callback) {
            callback(pdf, pdfName)
        }
    })
}
// export const addFileMixins={ 
//     methods: {

//   }
// }
// pdf 转 file对象
export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    //转换成file对象
    return new File([u8arr], filename, {
        type: mime
    })
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
}

// pdf相关处理
export const downloadPdfMixins = {
   
    methods: {
        getDownloadFileAndExportPdf({
            domId,
            pdfName,
            watermark,
            callBack,
            exportPdf
        }) {
            return new Promise((resolve) => {
                downloadPDF({
                    idEle: domId,
                    pdfName: pdfName,
                    exportPdf,
                    callback: async (pdf, pdfName) => {
                        const time = new Date().getTime()
                        const filename = pdfName + time + '.pdf'
                        const pdfFile = pdf.output('datauristring')
                        const blob = dataURLtoFile(pdfFile, filename)
                        const formDataReq = {
                            multifile: blob,
                            watermark: watermark
                        }
                        const res = await uploads(formDataReq)
                        const data = res.data[0]
                        const req = {
                            downloadName: data.name,
                            downloadUrl: data.path,
                        }
                        resolve(req)
                        if (callBack) {
                            callBack()
                        }
                    },
                })
            })
        },
        addFile(e,key, name) {
          const  toolType=[
                { code:'QUOTE_IMITATE',
                 msg:'业务分配模拟'},
               { code:'QUOTE_TRACK',
                 msg:'报价与评分跟踪'},
                 {code:'NEGOTIATION_BASE',msg:'项目概览'},
                 {code:'NEGOTIATION_SUPPLIER',msg:'批量供应商概览'},
                 {code:'NEGOTIATION_NOMI',msg:'定点记录'},
                 {code:'NEGOTIATION_PLANT',msg:'批量供应商工厂总览'},
                 {code:'QUOTE_PARTS',msg:'报价分析汇总-零件'},
                 
             ]
             
            return new Promise((resolve) => {
                //   let el = document.querySelector('#'+val)
                //   let el = document.querySelector('rightaa')
                //        iMessageBox(
                //       this.language('SHIFOUTUISONGKUAIZHAOZHIBAOGAOQINGDAN', '是否推送快照至报告清单?'),
                //       this.language('TUISONG', '推送'),
                //       {
                //         confirmButtonText: this.language('QUEREN', '确认'),
                //         cancelButtonText: this.language('QUXIAO', '取消')
                //       }
                //     )
                //   .then(async () => {
                //   })
                this.$set(this.cardShow.find(items=>items.key == key), 'show', true)
                console.log(e)
                e.collapseValue=true
                this.$nextTick(() => {
                    if (key == '4') {
                        this.$refs.quotationScoringEcartsCard.$refs.previewsCom.exportExcel('addFile')
                    } else if (key == '3') {
                        this.$refs.quotationScoringMj.handleDownload('addFile')
                    } else {
                        downloadPDF({
                            idEle: '#card' + key,
                            pdfName: name,
                            exportPdf: true,
                            waterMark: true,
                            callback: async (pdf, pdfName) => {
                                try {
                                    const filename = pdfName.replaceAll(/\./g, '_') + '.pdf'
                                    const pdfFile = pdf.output('datauristring')
                                    const blob = dataURLtoFile(pdfFile, filename)
                                    const formData = new FormData()
                                    formData.append('businessId', Math.ceil(Math.random() * 100000)) // 业务id，默认固定8025
                                    formData.append('applicationName', name)
                                    formData.append('multifile', blob || []) // 文件
                                    udMutilfiles(formData).then((res) => {
                                        if (res && res.code == 200) {
                                            // iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
                                            let req = {
                                                instanceId: -1,
                                                isBindingInstantce: false,
                                                Type: '报告',
                                                name:toolType.find(res => res.msg == name).msg || '',
                                                toolType: toolType.find(res => res.msg == name).code || '',
                                                downloadUrl: res.data[0].id,
                                                materialGroupName:this.rfqInfoData.categoryName||'',
                                                materialGroupNo:this.rfqInfoData.categoryCode||'',
                                                partsNo:''
                                            }
                                            reportAdd(req).then(v => {
                                                if (res && res.code == 200) {
                                                    iMessage.success(res.desZh)
                                                    this.downloadButtonLoading = false
                                                } else {
                                                    iMessage.error(res.desZh)
                                                    this.downloadButtonLoading = false
                                                }
                                            })
                                        } else {
                                            iMessage.error(this.language('SHANGCHUANSHIBAI', '上传失败'))
                                        }
                                    })
                                } catch {
                                    iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'))
                                }
                            },
                        })
                    }

                })
            })
        }
    },
}