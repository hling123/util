var util = {
  _isAmount: function(value) {
    //金额，只允许保留两位小数
    return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
  },
  _isInt: function(value) {
    //只能为数字
    return /^[0-9]+$/.test(value);
  },
  // 判断正数字
  _isNum: function(value) {
    var reg = /^[0-9]+.?[0-9]*$/;
    return reg.test(value);
  },
  // 是否小数 （是小数返回 true,不是小数返回 false)
  _isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  _isNullOrEmpty: function(value) {
    return value === null || value === "" || value === undefined ? true : false;
  },
  _isMobile: function(value) {
    return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(
      value
    );
  },
  _isEmail: function(value) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      value
    );
  },
  _isFunction: function(value) {
    return this._type(value) == "function";
  },
  _isArray: function(value) {
    return this._type(value) == "array";
  },
  _isDocument: function(value) {
    return (
      value != null && !!value.nodeType && value.nodeType == value.DOCUMENT_NODE
    );
  },
  _isWindow: function(value) {
    return value != null && value == value.window;
  },
  _isObject: function(value) {
    return this._type(value) == "object";
  },
  _isPlainObject: function(value) {
    return (
      this._isObject(value) &&
      !this._isWindow(value) &&
      Object.getPrototypeOf(value) == Object.prototype
    );
  },
  _type: function(value) {
    var typeObj = this._allType();
    return value == null
      ? String(value)
      : typeObj[toString.call(value)] || "object";
  },
  _allType: function() {
    var typeObj = {};
    var tempArr = "Boolean Number String Function Array Date RegExp Object Error".split(
      " "
    );
    for (var i = 0; i < tempArr.length; i++) {
      typeObj["[object " + tempArr[i] + "]"] = tempArr[i].toLowerCase();
    }
    return typeObj;
  },
  // 默认返回两位小数  limit 可选
  _toFixed: function toFixed(num, limit) {
    if (this._isNum(num)) {
      if (this._isInt(num)) {
        this._repeat(0, limit);
        return num + "." + this._repeat(0, limit);
      } else {
        limit = limit || 2;
        return num.toFixed(limit);
      }
    } else {
      return "";
    }
  },
  // 返回 重复num次 value
  _repeat(value, num) {
    if (!!value) {
      return "";
    }
    if (this._isInt(num)) {
      var str = "";
      for (var i = 0; i < num; i++) {
        str += value.toString();
      }
      return str;
    } else {
      return value;
    }
  },
  // hex 转 rgba '#ffffff'  0 => rgba(255,255,255,0)
  _hexToRgb: function(hexValue, opc) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(" + r + "," + g + "," + b + "," + opc + ")";
  },
  // pc端 文件下载
  _downFile: function(url, target) {
    if (!target) {
      target = "_self";
    }
    if (this._ieVersion() > 0 || navigator.userAgent.indexOf("Firefox") >= 0) {
      window.open("", target);
      var link = top.window.document.createElement("a");
      top.window.document.body.appendChild(link);
      link.target = target;
      link.href = url;
      link.click();
    } else {
      window.open(url, target);
    }
  },
  // 返回ie 浏览器版本
  _ieVersion: function() {
    var userAgent = navigator.userAgent;
    var isIE =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    var isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6; //IE版本<=7
      }
    } else if (isEdge) {
      return 12; //edge
    } else if (isIE11) {
      return 11; //IE11
    } else {
      return -1; //不是ie浏览器
    }
  },
  _strEncode: function(value) {
    var s = "";
    if (value.length === 0) {
      return "";
    }
    s = value.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
  },
  _strDecode: function(value) {
    var s = "";
    if (value.length === 0) {
      return "";
    }
    s = value.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "'");
    s = s.replace(/&quot;/g, '"');
    return s;
  },
  _hasClass: function(ele, cls) {
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  },
  _addClass: function() {
    if (!this._hasClass(ele, cls)) ele.className += " " + cls;
  },
  _removeClass: function(ele, cls) {
    if (hasClass(ele, cls)) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, " ");
    }
  },
  _toggleClass: function(element, className) {
    if (!element || !className) {
      return;
    }
    var classString = element.className;
    var nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
      classString += "" + className;
    } else {
      classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length);
    }
    element.className = classString;
  },
  // {'a':1,'b':2} => a=1&b=2
  _json2param: function(json) {
    if (!json) return "";
    return this._cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return "";
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
    ).join("&");
  },
  _cleanArray: function(actual) {
    var newArray = [];
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  },
  // url 参数转为对象
  _param2Obj: function(url) {
    var search = url.split("?")[1];
    if (!search) {
      return {};
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, " ") +
        '"}'
    );
  },
  // url 参数转为对象
  _url2Obj: function(url) {
    var result = {};
    var reg = new RegExp("([?&])([^&]*)=([^&]*)", "ig");
    var arr = reg.exec(url);
    while (arr) {
      result[arr[2]] = decodeURIComponent(arr[3]);
      arr = reg.exec(url);
    }
    return result;
  },
  // url 参数转为对象
  _getQueryObject: function(url) {
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
      var name = decodeURIComponent($1);
      var val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
      return rs;
    });
    return obj;
  },
  // 时间格式转换  time 可以为时间戳，new Date对象，2019-7-24 12:12:12,2019/7/24
  _parseTime: function(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    var format = cFormat || "{y}-{m}-{d} {h}:{i}:{s} {a}";
    var date;
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
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      var value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
  },
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
},
  // 添加监听事件
  _addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  _getEvent: function(event) {
    return event ? event : window.event;
  },
  _getTarget: function(e) {
    return e.target || e.srcElement;
  },
  // 阻止浏览器的默认行为
  _preventDefault: function(e) {
    var e = this._getEvent(e);
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnVal = false;
    }
  },
  //停止事件冒泡
  _stopPropagation: function(e) {
    var e = this._getEvent(e);
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  },
  _formatTime: function(time, option) {
    var d;
    if (typeof time === "object") {
      // new Date()
      d = time;
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
      d = new Date(time).getTime();
    }
    var now = new Date().getTime();

    var diff = (now - d) / 1000;

    if (diff < 30) {
      return "刚刚";
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + "分钟前";
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + "小时前";
    } else if (diff < 3600 * 24 * 2) {
      return "1天前";
    }
    if (option) {
      return this._parseTime(time, option); // 使用上面时间转换
    } else {
      return (
        d.getMonth() +
        1 +
        "月" +
        this._repair(d.getDate()) +
        "日" +
        this._repair(d.getHours()) +
        "时" +
        this._repair(d.getMinutes()) +
        "分"
      );
    }
  },
  // 时间小于10 前面补0
  _repair: function(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  },
  _byteLength: function(str) {
    debugger;
    var s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s += 2;
      if (code >= 0xdc00 && code <= 0xdfff) i--;
    }
    return s;
  },
  // html 去除标签
  _htmlNoTag: function(value) {
    var temp = document.createElement("div");
    temp.innerHTML = value;
    var returnVal = temp.textContent || temp.innerText;
    temp = null;
    return returnVal;
  },
  // html 保留标签
  _htmlTag: function(value) {
    var temp = document.createElement("div");
    //innerText(ie支持)或者textContent(火狐，google支持)
    temp.textContent != undefined
      ? (temp.textContent = value)
      : (temp.innerText = value);
    var returnVal = temp.innerHTML;
    temp = null;
    return returnVal;
  },
  //   对象合并 在target 基础上合并 source 并返回合并后的target
  _objectMerge: function(target, source) {
    if (typeof target !== "object") {
      target = {};
    }
    if (Array.isArray(source)) {
      return source.slice();
    }
    Object.keys(source).forEach(property => {
      var sourceProperty = source[property];
      if (typeof sourceProperty === "object") {
        target[property] = this._objectMerge(target[property], sourceProperty);
      } else {
        target[property] = sourceProperty;
      }
    });
    return target;
  },
  //   深度克隆
  _deepClone: function(source) {
    if (!source && this._isObject(source) !== "object") {
      throw new Error("error arguments", "deepClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === "object") {
        targetObj[keys] = this._deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    });
    return targetObj;

    // let result = this._isArray(obj) == 'array' ? [] : {};
    // for (let key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         if (typeof obj[key] === 'object') {
    //             result[key] = this._deepClone(obj[key]);
    //         } else {
    //             result[key] = obj[key];
    //         }
    //     }
    // }
    // return result;
  },
  //   深度克隆
  _deepClone2: function(source) {
    return JSON.parse(JSON.stringify(source));
  },
  _createUniqueString: function() {
    var timestamp = +new Date() + "";
    var randomNum = parseInt((1 + Math.random()) * 65536) + "";
    var tempval = this._limitlength(randomNum + timestamp, 19, 9);
    console.log(tempval.length);
    return (+tempval).toString(32);
  },
  _randomColor: function() {
    var r = random(0, 256),
      g = random(0, 256),
      b = random(0, 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  },
  // 对value 限制长度为 num
  _limitlength: function(value, num, str) {
    var value = value.toString();
    if (!value) {
      return "";
    }
    if (this._isInt(num)) {
      if (value.length < num) {
        var tempstr = "";
        if (!!str) {
          tempstr = str;
        } else {
          var index = Math.floor(Math.random() * value.length);
          tempstr = value.charAt(index);
        }
        var len = num - value.length;
        for (var i = 0; i < len; i++) {
          value += tempstr;
        }
        return value;
      } else if (value.length == num) {
        return value;
      } else if (value.length > num) {
        return value.substring(0, num);
      }
    } else {
      return value;
    }
  },
  _isCarNo: function(value) {
    // 新能源车牌
    var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    // 旧车牌
    var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  },
  _leftTrim: function(value) {
    var regNeg = /(^\s+)/g;
    if (!regNeg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  _rightTrim: function(value) {
    var regNeg = /(\s+$)/g;
    if (!regNeg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  _createNum: function(num) {
    var numstr = "0123456789";
    var str = "";
    for (var i = 0; i < num; i++) {
      str += numstr.charAt(Math.floor(Math.random() * numstr.length));
    }
    return str;
  },
  _createIdCard: function(ymd) {
    var code = "";
    var ymd = ymd || util._parseTime(new Date(), "{y}{m}{d}");

    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    var cityId = [
      "11",
      "12",
      "13",
      "14",
      "15",
      "21",
      "22",
      "23",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "50",
      "51",
      "52",
      "53",
      "54",
      "61",
      "62",
      "63",
      "64",
      "65",
      "71",
      "81",
      "82",
      "91"
    ];
    var cityIdone = cityId[Math.floor(Math.random() * cityId.length)];
    code =
      cityIdone.toString() +
      this._createNum(4).toString() +
      ymd.toString() +
      this._createNum(3).toString();
    var codetemp = code.split("");
    //加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //校验位
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
      ai = codetemp[i];
      wi = factor[i];
      sum += ai * wi;
    }
    var last = parity[sum % 11];
    return code + last.toString();
  },
  _isIdCard: function(value) {
    // 传入字符串
    var idCard = value.toString();
    if (idCard.length == 15) {
      return this.__isValidityBrithBy15IdCard(idCard);
    } else if (idCard.length == 18) {
      if (
        this.__isValidityBrithBy18IdCard(idCard) &&
        this.__isTrueValidateCodeBy18IdCard(idCard)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  __isTrueValidateCodeBy18IdCard: function(idCard) {
    var code = idCard.toUpperCase();
    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (
      !code ||
      !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
        code
      )
    ) {
      tip = "格式错误";
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      tip = "地址编码错误";
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split("");
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          tip = "校验位错误";
          pass = false;
        }
      }
    }
    return pass;
  },
  __isValidityBrithBy18IdCard: function(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (
      temp_date.getFullYear() != parseFloat(year) ||
      temp_date.getMonth() != parseFloat(month) - 1 ||
      temp_date.getDate() != parseFloat(day)
    ) {
      return false;
    } else {
      return true;
    }
  },
  __isValidityBrithBy15IdCard: function(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

    if (
      temp_date.getYear() != parseFloat(year) ||
      temp_date.getMonth() != parseFloat(month) - 1 ||
      temp_date.getDate() != parseFloat(day)
    ) {
      return false;
    } else {
      return true;
    }
  },

  _isChinese: function(value) {
    var reg = /^[\u0391-\uFFE5]+$/;
    return (
      value !== "" &&
      reg.test(value) &&
      !this._isSpecial(value) &&
      !this._isEmoji(value)
    );
  },
  _isEnglish: function(value) {
    return /^[a-zA-Z]*$/.test(value);
  },
  _isEnAndNo: function(value) {
    //8~20位数字和字母组合 按需修改
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
  },
  //是否包含特殊字符
  _isSpecial: function(value) {
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (regEn.test(value) || regCn.test(value)) {
      return true;
    }
    return false;
  },
  _isEmoji: function(value) {
    //是否包含表情
    return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value);
  },
  _isDate: function(value) {
    //2019-10-12
    var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
    return reg.test(value);
  },
  _isUrl: function(value) {
    return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
      value
    );
  },
  _minLength: function(value, min) {
    return value.length >= Number(min);
  },
  _maxLength: function(value, max) {
    return value.length <= Number(max);
  }
};
