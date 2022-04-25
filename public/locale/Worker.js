function LOG (){
  console.log('TEST');
  postMessage(true);
}
LOG();

// function exportPDF2(){
//   this.fileList = []
//   this.loading = true
//   let elList = document.getElementsByClassName('pageCard-main')
//   console.log(elList);
//     if(!elList.length){
//       iMessage.warn('请稍等')
//       this.loading = false
//       return
//     }
//     for (let i = 0; i < elList.length; i++) {
//       const el = elList[i];
//       this.getPdfImage({
//         dom: el,
//         index: i
//       })
//     }
//     console.log('123');
//     this.uploadUdFile();
// }
// exportPDF2()