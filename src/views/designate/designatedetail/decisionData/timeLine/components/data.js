/*
 * @Author: wentliao
 * @Date: 2021-05-24 14:16:51
 * @Description: 
 */
// timeline顶部的总步骤
export const stepList = [
    {title:'Parts Release',icon:'iconTimeLine-PartsRelease',key:'PR',isEdit:false},
    {title:'CSC meeting',icon:'iconTimeLine-CSCMeeting',key:'CM',isEdit:false},
    {title:'BF Confirm',icon:'iconTimeLine-BFConfirm',key:'BC',isEdit:false},
    {title:'VFF',icon:'icondingdianguanlijiedian-jinhangzhong',key:'VFF',isEdit:false},
    {title:'PVS',icon:'icondingdianguanlijiedian-jinhangzhong',key:'PVS',isEdit:false},
    {title:'0S',icon:'icondingdianguanlijiedian-jinhangzhong',key:'0S',isEdit:false},
    {title:'SOP',icon:'icondingdianguanlijiedian-jinhangzhong',key:'SOP',isEdit:false},
]

// timeline供应商步骤
export const supplierStepList = [
    {title:'1st Try Out',tips:'KW25',},
    {title:'OTS',tips:'KW29',},
    {title:'EM',tips:'KW35',},
    {title:'Part SOP',tips:'KW42'},
]

// 模拟数据
export const MockData = {
    "code": "200",
    "data": [
      {
        "materialGroupCode": "string",
        "materialGroupName": "Material Group 1",
        "nomiTimeAxisGroup": [
          {
            "isVisible": true,
            "nomiTimeAxisLine":{
                'PR':{
                    "carProjectCode": "string",
                    "createBy": "string",
                    "createDate": "2021-06-03T09:02:40.709Z",
                    "id": "string",
                    "isDelete": true,
                    "isEditable": true,
                    "isTodayAfter": true,
                    "isVisible": true,
                    "isVisibleGroup": true,
                    "materialGroupCode": "string",
                    "materialGroupName": "string",
                    "mgId": "string",
                    "mgName": "string",
                    "nodeCode": "string",
                    "nodeDate": "2021-06-03T09:02:40.709Z",
                    "nodeWeek": "KW12",
                    "nomiAppId": "string",
                    "updateBy": "string",
                    "updateDate": "2021-06-03T09:02:40.709Z"
                  }
            }
          }
        ],
        "nomiTimeAxisSupplierResultVOList": [
          {
            "mgId": "string",
            "nomiTimeAxisSupplierExps":[
                {
                  "beginDate": "1621048561000",
                  "carProjCode": "string",
                  "createBy": "string",
                  "createDate": "2021-06-03T09:02:40.709Z",
                  "durationName": "string",
                  "endDate": "1621912561000",
                  "id": "string",
                  "isBuiltin": true,
                  "isDelete": true,
                  "isVisible": true,
                  "mg": "string",
                  "mgId": "string",
                  "nodeWeek": "string",
                  "nomiAppId": "string",
                  "supplierId": "string",
                  "supplierNameZh": "supplier1",
                  "supplierSvwNum": "string",
                  "supplierTempNum": "string",
                  "updateBy": "string",
                  "updateDate": "2021-06-03T09:02:40.709Z"
                },
                {
                    "beginDate": "1621480561000",
                    "carProjCode": "string",
                    "createBy": "string",
                    "createDate": "2021-06-03T09:02:40.709Z",
                    "durationName": "string",
                    "endDate": "1621998961000",
                    "id": "string",
                    "isBuiltin": true,
                    "isDelete": true,
                    "isVisible": true,
                    "mg": "string",
                    "mgId": "string",
                    "nodeWeek": "string",
                    "nomiAppId": "string",
                    "supplierId": "string",
                    "supplierNameZh": "supplier2",
                    "supplierSvwNum": "string",
                    "supplierTempNum": "string",
                    "updateBy": "string",
                    "updateDate": "2021-06-03T09:02:40.709Z"
                  }
              ],
            "nomiTimeAxisSuppliers": [
                {
                  "beginDate": "1621048561",
                  "carProjCode": "string",
                  "createBy": "string",
                  "createDate": "2021-06-03T09:02:40.709Z",
                  "durationName": "string",
                  "endDate": "1621912561",
                  "id": "string",
                  "isBuiltin": true,
                  "isDelete": true,
                  "isVisible": true,
                  "mg": "string",
                  "mgId": "string",
                  "nodeWeek": "KW25",
                  "nomiAppId": "string",
                  "supplierId": "string",
                  "supplierNameZh": "1st Try Out",
                  "supplierSvwNum": "string",
                  "supplierTempNum": "string",
                  "updateBy": "string",
                  "updateDate": "2021-06-03T09:02:40.709Z"
                },
              ],
            "supplierName": "supplier"
          }
        ]
      }
    ],
    "desEn": "string",
    "desZh": "string",
    "result": true
  }
