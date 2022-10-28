import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { iMessage, iMessageBox } from 'rise'
import { uploads, uploadUdFile } from '@/api/file/upload'
import { udMutilfiles, reportAdd } from '@/api/partsrfq/reportList/index'
import { cbdDownloadFileTWO } from '@/api/rfqManageMent/quotationdetail'
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
  console.log(el)
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
    type: mime,
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
      exportPdf,
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
              watermark: watermark,
            }
            const res = await uploadUdFile(formDataReq)
            const data = res.data[0]
            const req = {
              downloadName: data.name,
              downloadUrl: data.id,
            }
            resolve(req)
            if (callBack) {
              callBack()
            }
          },
        })
      })
    },
    addFile(e, key, name, Hierarchy) {
      //e为icard回调，key为当前点击的cardkey，name为当前点击的卡片name,Hierarchy为当前点击事件的ref层级（因为页面内可能有不同层级的卡片头部绑定的ref层级不同）
      return new Promise((resolve) => {
        iMessageBox(
          this.language(
            'SHIFOUTUISONGKUAIZHAOZHIBAOGAOQINGDAN',
            '是否推送快照至报告清单?'
          ),
          this.language('TUISONG', '推送'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消'),
          }
        ).then(async () => {
          console.log(key)
          this.$set(
            this.cardShow.find((items) => items.key == key),
            'show',
            true
          )
          console.log(e)
          var blob = {}
          var instanceId = 0
          const formData = new FormData()
          formData.append('businessId', Math.ceil(Math.random() * 100000)) // 业务id，默认固定8025
          formData.append('applicationName', name)
          if ([1, 2, 3, 4, 5].includes(key)) {
            //用于区分谈判信息和报价分析
            instanceId = -1
          } else {
            instanceId = 0
          }
          console.log(typeof e)
          if (typeof e == 'object') {
            //3与5是混入的页面，原生js触发方法
            e.collapseValue = true
          }
          this.$nextTick(() => {
            if (key == '2') {
              this.$refs.quotationScoringHZ.exportPartsTwo().then((res) => {
                //文件流转换为base64
                getBase64(res.data).then((resBase64) => {
                  let blob = dataURLtoFile(resBase64, name + '.xlsx')
                  formData.append('multifile', blob)
                  this.setfile(formData, instanceId, name)
                })
              })
            } else if (key == '3') {
              var obj1 = ''
              if (Hierarchy == 1) {
                obj1 = this.$refs.quotationScoringMj
              } else if (Hierarchy == 2) {
                obj1 = this
              }
              obj1.getRfqSupplierList().then((res) => {
                cbdDownloadFileTWO({
                  rfqId: parseInt(this.$route.query.id),
                  round: obj1.getbaseInfoData().currentRounds,
                  supplierId: res.data[0].supplierId,
                }).then((res) => {
                  //文件流转换为base64
                  getBase64(res.data).then((resBase64) => {
                    let blob = dataURLtoFile(resBase64, name + '.xlsx')
                    formData.append('multifile', blob)
                    this.setfile(formData, instanceId, name)
                  })
                })
              })
            }
            // else if (key == '4') {
            //     var obj = ''
            //     if (Hierarchy == 1) {
            //         obj = this.$refs.quotationScoringEcartsCard.$refs.previewsCom
            //     } else if (Hierarchy == 2) {
            //         obj = this.$refs.previewsCom
            //     }
            //     obj.exportExcelTwo()
            //         .then((res) => {
            //             //文件流转换为base64
            //             console.log(res)
            //             if(res)
            //             // let blob=   new File([res.data], name + '.zip',{type:'application/zip'})
            //             console.log(blob)
            //             getBase64(res.data).then((resBase64) => {
            //                 console.log(resBase64)
            //                 let blob = dataURLtoFile(resBase64, name + '.xlsx')
            //                 formData.append('multifile', blob)
            //                 this.setfile(formData, instanceId, name)
            //             })
            //         })
            // }
            else {
              setTimeout(() => {
                downloadPDF({
                  idEle: '#card' + key,
                  pdfName: name,
                  exportPdf: false,
                  waterMark: true,
                  callback: async (pdf, pdfName) => {
                    try {
                      const filename = pdfName.replaceAll(/\./g, '_') + '.pdf'
                      const pdfFile = pdf.output('datauristring')
                      blob = dataURLtoFile(pdfFile, filename)
                      formData.append('multifile', blob || []) // 文件
                      this.setfile(formData, instanceId, name)
                    } catch {
                      iMessage.error(
                        this.language('SHENGCHENGSHIBAI', '生成失败')
                      )
                    }
                  },
                })
              }, 1000)
            }
          })
        })
      })
    },
    setfile(formData, instanceId, name) {
      const toolType = [
        {
          code: 'QUOTE_IMITATE',
          msg: '业务分配模拟',
        },
        {
          code: 'QUOTE_TRACK',
          msg: '报价与评分跟踪',
        },
        {
          code: 'NEGOTIATION_BASE',
          msg: '项目概览',
        },
        {
          code: 'NEGOTIATION_SUPPLIER',
          msg: '批量供应商概览',
        },
        {
          code: 'NEGOTIATION_NOMI',
          msg: '定点记录',
        },
        {
          code: 'NEGOTIATION_PLANT',
          msg: '批量供应商工厂总览',
        },
        {
          code: 'QUOTE_PARTS',
          msg: '报价分析汇总-零件',
        },
        {
          code: 'QUOTE_MODEL',
          msg: '报价分析汇总-模具',
        },
        {
          code: 'QUOTE_TREND',
          msg: '报价趋势',
        },
      ]
      console.log(this.rfqInfoData)
      udMutilfiles(formData).then((res) => {
        if (res && res.code == 200) {
          let req = {
            instanceId: instanceId,
            isBindingInstance: 0,
            type: '报告',
            name:
              toolType.find((res) => res.msg == name).msg + getCurrentTime() ||
              '',
            toolType: toolType.find((res) => res.msg == name).code || '',
            downloadUrl: res.data[0].id,
            downloadName: res.data[0].name,
            rfq: this.$route.query.id + '-' + this.$route.query.rfqName || '',
            materialGroupName: this.rfqInfoData.categoryName || '',
            materialGroupNo: this.rfqInfoData.categoryCode || '',
            partsNo: '',
            isDefault: 0,
          }
          reportAdd(req).then((v) => {
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
    },
  },
}
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult = ''
    reader.readAsDataURL(file)
    // 开始转
    reader.onload = () => {
      fileResult = reader.result
    }
    // 转 失败
    reader.onerror = (error) => {
      reject(error)
    }
    // 转 结束
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}
export function getCurrentTime() {
  let yy = new Date().getFullYear()
  let mm = new Date().getMonth() + 1
  let dd = new Date().getDate()
  return '_' + yy + mm + dd
}

export function transverseDownloadPDF({
  //html横向导出pdf
  idEle: ele,
  dom,
  pdfName: pdfName,
  callback: callback,
  exportPdf: exportPdf,
  title: titleArr,
}) {
  var titleHeight = 0
  if (titleArr) {
    var title = document.querySelector(titleArr.toString()) //获取页面dom节点
    var titleHeight = title.offsetHeight + 1 //页眉高度 ===>70px
  }

  let el = ''
  if (ele) el = document.getElementById(ele)
  //通过getElementById获取要导出的内容
  else el = dom

  let eleW = el.offsetWidth // 获得该容器的宽
  let eleH = el.offsetHeight // 获得该容器的高
  var canvasFragment = document.createElement('canvas')
  var abs = 0
  let win_in = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
  let win_out = window.innerWidth // 获得当前窗口的宽度（包含滚动条）

  if (win_out > win_in) {
    abs = (win_out - win_in) / 2 // 获得滚动条宽度的一半
  }
  canvasFragment.width = eleW * 2 // 将画布宽&&高放大两倍
  canvasFragment.height = eleH * 2

  var context = canvasFragment.getContext('2d')
  context.scale(2, 2)
  html2canvas(el, {
    dpi: 96, //分辨率
    scale: 2, //设置缩放
    useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    bgcolor: '#ffffff', //应该这样写
    logging: false, //打印日志用的 可以不加默认为false
  }).then((canvas) => {
    var contentWidth = canvas.width //
    var contentHeight = canvas.height //
    // console.log(contentHeight)
    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = (contentWidth / 841.89) * 595.28 //
    //未生成pdf的html页面高度
    var leftHeight = contentHeight //
    //页面偏移
    var position = 0
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 841.89
    var imgHeight = (841.89 / contentWidth) * contentHeight
    let pageData = canvas.toDataURL('image/png', 0.5)
    var pdf = new JsPDF('l', 'pt', 'a4', true) //l横向打印，p纵向打印 true=>开启压缩

    if (leftHeight < pageHeight) {
      //
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
    } else {
      // 分页
      var num = 1
      while (leftHeight > 0) {
        var syheight = 0
        if (leftHeight >= pageHeight - titleHeight * 2) {
          syheight = titleHeight * 2 + num * (pageHeight - titleHeight * 2)
        } else {
          syheight = leftHeight
        }
        context.clearRect(0, 0, contentWidth / 2, pageHeight / 2) //清空画布

        // var imgData = context.getImageData(0,0,contentWidth/2,pageHeight/2);//canvas设置背景色
        // imgData.data[0] = 255;
        // imgData.data[1] = 255;
        // imgData.data[2] = 255;
        // imgData.data[3] = 255;
        // context.putImageData(imgData,0, 0);

        //需要注意的是，这里的canvas图片的像素宽高是context画布的两倍
        context.drawImage(
          canvas,
          0,
          0,
          contentWidth,
          titleHeight * 2,
          0,
          0,
          contentWidth / 2,
          titleHeight
        )
        context.drawImage(
          canvas,
          0,
          titleHeight * 2 + (num - 1) * (pageHeight - titleHeight * 2),
          contentWidth,
          syheight,
          0,
          titleHeight,
          contentWidth / 2,
          syheight / 2
        )
        let imageData = canvasFragment.toDataURL('image/png', 0.5) //封装png图片
        pdf.addImage(imageData, 'JPEG', 0, 0, imgWidth, imgHeight) //添加png图片，空白处自动转换成白色背景图（jpeg为黑色）
        leftHeight -= pageHeight
        position -= 595.28
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage()
          num++
        }
      }
    }
    if (exportPdf) {
      pdf.save(pdfName)
    }
    if (callback) {
      callback(pdf, pdfName)
    }
  })
}


export function transverseDownloadPDFNew({//html横向导出pdf
  idEle: ele,
  pdfName: pdfName,
  callback: callback,
  exportPdf: exportPdf,
  title:titleArr,
}){
  var titleHeight = 0;
  if(titleArr){
    var title = document.querySelector((titleArr).toString())//获取页面dom节点
    titleHeight = title.offsetHeight + 1 + 20 + 50;//页眉高度 ===>70px
  }
  let el = document.getElementById(ele) //通过getElementById获取要导出的内容
  let eleW = el.offsetWidth // 获得该容器的宽
  let eleH = el.offsetHeight // 获得该容器的高
  var canvasFragment = document.createElement('canvas')
  var abs = 0
  let win_in = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
  let win_out = window.innerWidth // 获得当前窗口的宽度（包含滚动条）

  if (win_out > win_in) {
    abs = (win_out - win_in) / 2 // 获得滚动条宽度的一半
  }
  canvasFragment.width = eleW * 2 // 将画布宽&&高放大两倍
  canvasFragment.height = eleH * 2

  var context = canvasFragment.getContext('2d')
  context.scale(2, 2)
  html2canvas(el, {
    dpi: 96, //分辨率
    scale: 2, //设置缩放
    useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    bgcolor: '#ffffff', //应该这样写
    backgroundColor:'#ffffff',//这样背景还是黑的
    logging: false, //打印日志用的 可以不加默认为false
  }).then((canvas) => {
    // console.log(canvas)
    var contentWidth = canvas.width//
    var contentHeight = canvas.height//
    // console.log(contentHeight)
    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = (contentWidth / 841.89) * 595.28//
    //未生成pdf的html页面高度
    var leftHeight = contentHeight//
    //页面偏移
    var position = 0
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 841.89
    var imgHeight = (841.89 / contentWidth) * contentHeight
    let pageData = canvas.toDataURL('image/png', 0.5)
    // var pdf = new JsPDF('l', 'pt', 'a4',false)//l横向打印，p纵向打印 true=>开启压缩
    var pdf = new JsPDF('l', 'pt', 'a4',true)//l横向打印，p纵向打印 true=>开启压缩

    // console.log(titleHeight*2)
    // console.log(leftHeight)
    // console.log(pageHeight)

    if (leftHeight < pageHeight) {//
      pdf.addImage(pageData,"JPEG",0, position, imgWidth, imgHeight);
    } else {
      // 分页
      var num = 1;
      
      while (leftHeight > 0) {
        var syheight = 0
        if(leftHeight>=pageHeight-titleHeight*2){
          syheight = titleHeight*2+num*(pageHeight-titleHeight*2)
        }else{
          syheight = leftHeight;
        }
        context.clearRect(0,0,contentWidth/2,pageHeight/2);//清空画布

        //需要注意的是，这里的canvas图片的像素宽高是context画布的两倍
        context.drawImage(canvas,0,0,contentWidth,titleHeight*2,0,0,contentWidth/2,titleHeight);
        context.drawImage(canvas,0,titleHeight*2+(num-1)*(pageHeight-titleHeight*2),contentWidth,syheight,0,titleHeight,contentWidth/2,syheight/2);
        let imageData = canvasFragment.toDataURL('image/png', 0.5)//封装png图片
        pdf.addImage(imageData,"JPEG",0, 0, imgWidth, imgHeight);//添加png图片，空白处自动转换成白色背景图（jpeg为黑色）

        if(num>1){
          leftHeight -= (pageHeight-titleHeight*2)
        }else{
          leftHeight -= pageHeight
        }
        // leftHeight -= (pageHeight-(num-1)*(titleHeight*2))
        // position -= 595.28
        console.log("------------第" + num + "页------------")
        console.log(leftHeight)
        console.log(pageHeight)
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage()
          num++;
        }
      }
    }
    if (exportPdf) {
      pdf.save(pdfName)
    }
    if (callback) {
      callback(pdf, pdfName)
    }
  })
}