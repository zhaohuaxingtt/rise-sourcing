import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { uploadUdFile } from '@/api/file/upload'
import Store from '@/store'
// import { addfont } from "./font.js";
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
  let el = document.getElementById(ele) //通过getElementById获取要导出的内容
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
    let dept = Store.state.permission.userInfo.deptDTO.nameZh + '-' + Store.state.permission.userInfo.userNum + '-' + Store.state.permission.userInfo.nameZh
    // pdf.save('test')
    function addWaterMark(doc) {
      var totalPages = doc.internal.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        for (var x = 200; x <= doc.internal.pageSize.height - 30; x = x + 300) {
          for (var j = 30; j <= doc.internal.pageSize.width - 30; j = j + 200) {
            doc.setPage(i)
            //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
            doc.setTextColor(150)
            // addfont(doc)
            // doc.addFont('bolds', 'b', 'normal')
            // doc.setFont('b');
            doc.text('Wordmark', j, x, 45)
            // doc.text(window.moment().format('YYYY-MM-DD HH:mm:ss'), j + 13, x + 15, 45)
          }
        }
      }
      return doc
    }

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
    pdf = addWaterMark(pdf)
    if (exportPdf) {
      pdf.save(pdfName)
    }
    if (callback) {
      callback(pdf, pdfName)
    }
  })
}

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
  return new File([u8arr], filename, { type: mime })
  //转换成成blob对象
  //return new Blob([u8arr],{type:mime});
}

// pdf相关处理
export const downloadPdfMixins = {
  methods: {
    getDownloadFileAndExportPdf({ domId, pdfName, callBack, exportPdf }) {
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
            }
            const res = await uploadUdFile(formDataReq)
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
  },
}
