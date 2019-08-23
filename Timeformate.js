  formatDate:function (time,str){
    if (typeof time === "object") {
      // new Date()
      date = time;
    } else {
      if (typeof time === "string" && /^[0-9]+$/.test(time)) {
        //时间戳字符串
        time = parseInt(time);
      }
      if (typeof time === "number" && time.toString().length === 10) {
        // 10位时间戳
        time = time * 1000;
      }
      if (typeof time === "string" && time.indexOf("-")) {
        time = time.replace(/-/g, "/"); // 兼容苹果
      }
      date = new Date(time);
    } 
    var obj ={
        yyyy:date.getFullYear(),
        yy:(''+date.getFullYear()).slice(-2),
        M:date.getMonth()+1,
        MM:('0'+(date.getMonth()+1)).slice(-2),
        d:date.getDate(),
        dd:('0'+date.getDate()).slice(-2),
        H:date.getHours(),
        HH:('0'+date.getHours()).slice(-2),
        h:date.getHours()%12,
        hh:('0'+date.getHours()%12).slice(-2),
        m:date.getMinutes(),
        mm:('0'+date.getMinutes()).slice(-2),
        s:date.getSeconds(),
        ss:('0'+date.getSeconds()).slice(-2),
        w:['日','一','二','三','四','五','六'][date.getDay()]
    }
    return str.replace(/([a-z]+)/ig,function(item){debugger
      return obj[item]
    })
}
