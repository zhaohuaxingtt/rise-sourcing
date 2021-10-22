import axios from "@/utils/axios";
const request = axios();

const filePreview = ({
  url,
  callback,
  type = "application/pdf",
  //   type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel", 

  data,
}) => {
  request({
    url: url,
    method: "POST",
    responseType: "blob", // 响应类型必须设置
    getResponse: true,
    data,
  })
    .then((response) => {
      let blob = new Blob([response.data], { type });
      const blobUrl = window.URL.createObjectURL(blob);
      callback && callback(blobUrl);
    })
    .catch((err) => {
      callback && callback(false);
    });
};

export { filePreview };

//毛孔， 黑眼圈，色斑 痘痘 皱纹  
   