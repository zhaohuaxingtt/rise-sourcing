/*
 * @Author: Luoshuang
 * @Date: 2021-09-16 15:17:46
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-26 13:54:06
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressmonitoring\monitorDetail\components\partList\data.js
 */

export const svgList = {
  'iconliuchengjiedianjinhangzhong1': '<svg t="1631776681663" class="icon" viewBox="0 0 18090 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18751" width="200" height="200"><path d="M17364.650667 988.16a247.637333 247.637333 0 0 1-54.272-164.352V200.192a248.32 248.32 0 0 1 54.272-164.352 89.6 89.6 0 0 1 117.077333-22.698667l526.336 311.637334a254.464 254.464 0 0 1 0 375.466666l-526.336 311.637334a85.333333 85.333333 0 0 1-44.544 12.8 98.304 98.304 0 0 1-72.533333-36.522667z m-1290.069334-305.664a170.666667 170.666667 0 1 1 0-341.333333h1050.112a170.666667 170.666667 0 1 1 0 341.333333z m-1988.096 0a170.666667 170.666667 0 0 1 0-341.333333h1050.453334a170.666667 170.666667 0 0 1 0 341.333333z m-1987.754666 0a170.666667 170.666667 0 1 1 0-341.333333h1050.112a170.666667 170.666667 0 1 1 0 341.333333z m-1987.754667 0a170.666667 170.666667 0 1 1 0-341.333333h1050.112a170.666667 170.666667 0 1 1 0 341.333333z m-1988.096 0a170.666667 170.666667 0 1 1 0-341.333333h1050.112a170.666667 170.666667 0 1 1 0 341.333333z m-1987.754667 0a170.666667 170.666667 0 1 1 0-341.333333h1050.112a170.666667 170.666667 0 1 1 0 341.333333z m-1988.266666 0a170.666667 170.666667 0 0 1 0-341.333333h1050.453333a170.666667 170.666667 0 0 1 0 341.333333z m-1987.754667 0a170.666667 170.666667 0 1 1 0-341.333333h1050.112a170.666667 170.666667 0 1 1 0 341.333333zM170.666667 682.666667a170.666667 170.666667 0 0 1 0-341.333334h1050.453333a170.666667 170.666667 0 1 1 0 341.333334z" fill="#1660F1" p-id="18752"></path></svg>',
  'iconliuchengjiedianyiwancheng1': '<svg t="1631776731179" class="icon" viewBox="0 0 128000 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28323" width="200" height="200"><path d="M1212.928 1024C543.232 1024 0 794.624 0 512s543.232-512 1212.928-512h126150.656c669.696 0 641.024 519.68 634.368 512-8.192-15.36 35.84 512-634.368 512z" fill="#1660F1" p-id="28324"></path></svg>',
  'iconliuchengjiedian-weikaishi': '<svg t="1631776770638" class="icon" viewBox="0 0 108545 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37895" width="200" height="200"><path d="M100322.304 1024a512 512 0 0 1 0-1024h7709.696a512 512 0 1 1 0 1024zM87847.936 1024a512 512 0 1 1 0-1024h7707.648a512 512 0 1 1 0 1024zM75371.52 1024a512 512 0 1 1 0-1024h7709.696a512 512 0 0 1 0 1024zM62894.08 1024a512 512 0 0 1 0-1024h7709.696a512 512 0 0 1 0 1024zM50417.664 1024a512 512 0 0 1 0-1024h7709.696a512 512 0 0 1 0 1024zM37941.248 1024a512 512 0 0 1 0-1024h7709.696a512 512 0 0 1 0 1024zM25464.832 1024a512 512 0 0 1 0-1024h7709.696a512 512 0 0 1 0 1024zM12988.416 1024a512 512 0 0 1 0-1024h7709.696a512 512 0 1 1 0 1024zM513.024 1024a512 512 0 1 1 0-1024h7707.648a512 512 0 1 1 0 1024z" fill="#CED4E1" p-id="37896"></path></svg>'
}

export const nodeList = [
  {
    label: '释放',
    key: 'SHIFANG',
    kw: 'releaseTimeKw', 
    planKw: 'planReleaseTimeKw', 
    partPeriod: 1, 
    isDelay: 'fsdocDelay',
    delayReason: 'fsdocRemark', 
    soll1: 'fsdocSoll1', 
    soll2: 'fsdocSoll2', 
    delayWeeks: 'releaseDelayWeeks',
  },
  {
    label: '定点', 
    key: 'DINGDIAN', 
    kw: 'nomiTimeKw', 
    planKw: 'planNomiTimeKw', 
    partPeriod: 2, 
    isDelay: 'cscDelay',
    delayReason: 'cscRemark', 
    soll1: 'cscSoll1', 
    soll2: 'cscSoll2', 
    delayWeeks: 'nomiDelayWeeks',
  },
  {
    label: 'BF', 
    kw: 'bfTimeKw', 
    planKw: 'planBfTimeKw', 
    partPeriod: 4, 
    isDelay: 'bfDelay',
    delayReason: 'bfRemark', 
    soll1: 'bfSoll1', 
    soll2: 'bfSoll2', 
    delayWeeks: 'bfDelayWeeks',
  },
  {
    label: '1st Tryout', 
    kw: 'firstTryoutTimeKw', 
    planKw: 'planFirstTryoutTimeKw', 
    partPeriod: 5, 
    isDelay: 'isttryoutDelay',
    delayReason: 'isttryoutRemark', 
    soll1: 'isttryoutSoll1', 
    soll2: 'isttryoutSoll2', 
    delayWeeks: 'firstTryoutDelayWeeks',
  },
  {
    label: 'EM(OTS)', 
    kw: 'emTimeKw', 
    planKw: 'planEmTimeKw', 
    kw1: 'otsTimeKw', 
    planKw1: 'planOtsTimeKw', 
    partPeriod: 6, 
    isDelay: 'emDelay',
    delayReason: 'emRemark', 
    soll1: 'emSoll1', 
    soll2: 'emSoll2' , 
    isDelay2: 'otsDelay',
    delayReason2: 'otsRemark', 
    soll12: 'otsSoll1', 
    soll22: 'otsSoll2', 
    delayWeeks: 'emDelayWeeks',
    delayWeeks2: 'otsDelayWeeks',
    delayWeeksLarger: 'emOtsDelayWeeks'
  }
]