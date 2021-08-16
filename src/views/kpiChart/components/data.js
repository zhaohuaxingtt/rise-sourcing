/*
 * @Author: your name
 * @Date: 2021-08-04 20:49:10
 * @LastEditTime: 2021-08-16 15:50:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\components\data.js
 */
/*
    设置开始点 start:true
    设置开始点 start:true
*/
export const tabSetting = [
    {
      prop:"nameZh",
      label: '供应商名称',
    },
    {
      prop: "all",
      label: 'KPI(ALL)',
    },
    {
      prop:"cs",
      label: 'KPI(CS)',
      icon:"el-icon-minus",
      start:true
    },
    {
      prop: "mq",
      label: 'KPI(MQ)',
    },
    {
      prop: "tp",
      label: 'KPI(EP)',
    },
    {
      prop: "tl",
      label: 'KPI(PL)',
    },
    {
      prop: "sa",
      label: 'KPI(SA)',
    },
  ]

  export const tabsetting = [
    {
      type: 'selection',
      width: 50,
    },
    {
      prop: '#',
      label: '#',
      i18n: '#',
      width: 50,
      align: 'center',
    },
    {
      prop: 'nameZh',
      label: '供应商名称',
      i18n: 'LK_GONGYINGSHANGMINGCHENG',
      align: 'center',
      tooltip: true
    },
    ]
  

    export const setCloum = [{
      prop: 'index',
      label: '#',
      i18n: '#',
      width: 50,
      align: 'center',
    },{
      prop: 'nameZh',
      label: '供应商名称',
      i18n: 'partsprocure.GongYingShangMingCheng',
      align: 'left',
      emit: 'go-detail',
      customRender: (h, scope) => {
        return <span class="open-link-text" style="text-decoration: underline;">{scope.row.nameZh}</span>
      },
      tooltip: true,
    }]
