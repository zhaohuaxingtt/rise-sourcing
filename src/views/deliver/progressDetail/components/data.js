export function GanTeDelayColor(startPlan,endPlan,startSJ,endSJ,type){
    // green 正常
    // yellow 超出0~2周 >0.<=week*2
    // red  超出3~4周 >week*2.<=week*4
    // black 超出5周以上 >week*4

    // type == 1 计划点
    // type == 2 实际点
    // type == 3 计划线
    // type == 4 实际线

    const colorList = ["green","#ffb400","red","black","#d9d9d9"];
    const weekTime = 60*60*24*7//一周的时间戳
    const todayTime = Math.round(new Date().getTime()/1000);//当前时间
    if(type == 1){
        const endPlanTime = timeOff(endPlan);
        if(!endSJ){
            if(todayTime < endPlanTime){//当前时间<计划结束时间
                return colorList[4]
            }else{
                const todayRang = todayTime - endPlanTime
                if(todayRang>0 && todayRang<=weekTime*2){
                    return colorList[1]
                }else if(todayRang>weekTime*2 && todayRang<=weekTime*4){
                    return colorList[2]
                }else if(todayRang>weekTime*4){
                    return colorList[3]
                }
            }
        }else{
            return colorList[4]
        }
    }else if(type == 2){
        const endPlanTime = timeOff(endPlan);
        const endSJTime = timeOff(endSJ);
        const timeRang = endSJTime - endPlanTime;
        if(endPlanTime>=endSJTime){
            return colorList[0]
        }else{
            if(timeRang>0 && timeRang<=weekTime*2){
                return colorList[1]
            }else if(timeRang>weekTime*2 && timeRang<=weekTime*4){
                return colorList[2]
            }else if(timeRang>weekTime*4){
                return colorList[3]
            }
        }
    }else if(type == 3){
        const startPlanTime = timeOff(startPlan);
        const startSJTime = timeOff(startSJ);
        if(!startSJ && !endSJ){
            if(startPlanTime<todayTime){
                const timeRang = todayTime-startPlanTime
                if(timeRang>0 && timeRang<=weekTime*2){
                    return colorList[1]
                }else if(timeRang>weekTime*2 && timeRang<=weekTime*4){
                    return colorList[2]
                }else if(timeRang>weekTime*4){
                    return colorList[3]
                }
            }else{
                return colorList[4]
            }
        }else if(startSJ && !endSJ){
            if(startPlanTime<startSJTime){
                const timeRang = startSJTime-startPlanTime
                if(timeRang>0 && timeRang<=weekTime*2){
                    return colorList[1]
                }else if(timeRang>weekTime*2 && timeRang<=weekTime*4){
                    return colorList[2]
                }else if(timeRang>weekTime*4){
                    return colorList[3]
                }
            }else{
                return colorList[4]
            }
        }
    }else if(type == 4){
        const endPlanTime = timeOff(endPlan);
        const endSJTime = timeOff(endSJ);
        if(startSJ && !endSJ){
            const timeRang = todayTime - endPlanTime;
            if(endPlanTime>=todayTime){
                return colorList[0]
            }else{
                if(timeRang>0 && timeRang<=weekTime*2){
                    return colorList[1]
                }else if(timeRang>weekTime*2 && timeRang<=weekTime*4){
                    return colorList[2]
                }else if(timeRang>weekTime*4){
                    return colorList[3]
                }
            }
        }else if(startSJ && endSJ){
            const timeRang = endSJTime - endPlanTime;
            if(endPlanTime>=endSJTime){
                return colorList[0]
            }else{
                if(timeRang>0 && timeRang<=weekTime*2){
                    return colorList[1]
                }else if(timeRang>weekTime*2 && timeRang<=weekTime*4){
                    return colorList[2]
                }else if(timeRang>weekTime*4){
                    return colorList[3]
                }
            }
        }
    }
}

export function timeOff(val){
    if(val){
        return (new Date(val)).getTime()/1000;
    }else{
        return null;
    }
}

export function getNowDate(){
    var date = new Date();
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    var week = weekArr[date.getDay()];
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
}