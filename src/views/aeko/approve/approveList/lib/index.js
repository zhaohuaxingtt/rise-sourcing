/*
 * @Autor: Hao,Jiang
 * @Date: 2021-10-26 10:54:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-29 15:53:48
 * @Description: 
 */
import {getAekoDetail} from "@/api/aeko/detail";

/**
 * @description: 跳转审批单
 * @param {*} vm vue对象
 * @param {*} row aeko行
 * @param {*} _blank 是否新窗口打开
 * @param {*} queue 队列
 * @return {*}
 */
export function lookDetails(vm, row, _blank=true, queue=null,isfromCheck=false) {
  let reqP = {requirementAekoId: row.requirementAekoId}
  let workFlowDTOS = row.workFlowDTOS || [];
    getAekoDetail(reqP).then(res => {
      if (res.code == 200) {
        let taskIds = workFlowDTOS.map((item) => item.taskId)
        let taskId = taskIds.join(',');
        let transmitObj = {
          option: isfromCheck ? 5:1, // 如果从AEKO查看跳转过来
          aekoApprovalDetails: {
            aekoNum: row.aekoNum,
            requirementAekoId: row.requirementAekoId,
            aekoAuditType: row.auditType,
            workFlowDTOS: workFlowDTOS,
            aekoManageId: res.data.aekoManageId
          },
          isBatchApprove: queue !== null,
          queue
        }
        const routerParams = {
          path: `/aeko/AEKOApprovalDetails`,
          query: {
            requirementAekoId: row.requirementAekoId,
            aekoManageId: res.data.aekoManageId,
            linieId: vm.$store.state.permission.userInfo.id,
            taskId: taskId,
            transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
          }
        }
        if (_blank) {
          const routeData = vm.$router.resolve(routerParams)
          window.open(routeData.href, '_blank')
        } else {
          vm.$router.push(routerParams)
        }
        
      } else {
        vm.$message.error(res.desZh)
      }
    })
}