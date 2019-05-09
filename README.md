 var url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=02003390_23_hao_pg&wd=tape%E5%8D%95%E5%85%83%E6%A3%80%E6%B5%8B%20&oq=tape.JS&rsv_pq=8d8912a900018103&rsv_t=8567QhO9l6161i9OPRXKcHnDHECcdTlf92PXYHsOwAVGJGGvmF6M5i4daz6XukR1HznSzhlLUmjb&rqlang=cn&rsv_enter=1&rsv_sug3=10&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=8467&rsv_sug4=9506';

    function urlToObj(url){
        var result = {};
        var url = decodeURIComponent(url);
        var reg = new RegExp("([&\?])([^&]*)=([^&]*)",'ig');
        var arr = reg.exec(url);
        while(arr){
            result[arr[2]] = arr[3];
            arr = reg.exec(url)
        }
        return result;
    }
    console.log(urlToObj(url));

    function urlObj(url){
        if(url.indexOf('?')!=-1){
            url = url.split("?")[1]
        }
        var result = {};
        try{
            result = JSON.parse('{"' + decodeURIComponent(url).replace(/'/g,'\'').replace(/"/g,'\"').replace(/&/g,'","').replace(/=/g,'":"') + '"}');
        }catch(e){
            console.log(e)
        }
        return result;
    }
    console.log(urlObj(url));

    function type(obj){
        return (obj === null || obj === undefined) ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase()
    }

    function isDay(title,val){
	if(isEmpty(title,val) && leftRrim(title,val) && rightRrim(title,val)){
		var regExp = /^[1-9]\d*\.[5]$|0\.[5]$|^[1-9]\d*$/;
		if(regExp.test(val)){
	        return true;
	    }else{
	    	//$('.notifyjs-corner').empty();
	    	//$.bw.notify( '【'+title+'】 最小值按0.5天计算!', 'error' );
	        return false;
	    }
	}	
}
function isNum(title,val){// 正数 
	if(isEmpty(title,val) && leftRrim(title,val) && rightRrim(title,val)){
		var regNeg = /^\d*$/; 
	    if(regNeg.test(val)){
	        return true;
	    }else{
	    	//$('.notifyjs-corner').empty();
	    	//$.bw.notify( '【'+title+'】 数值不是正整数或者0!', 'error' );
	        return false;
	    }
	} 
}
function isNumber2(title,val){
	if(isEmpty(title,val) && leftRrim(title,val) && rightRrim(title,val)){
		var regPos = /^\d+(\.\d+)?$/; 
	    var regNeg = /^[1-9]\d*$/; 
	    if(regPos.test(val) || regNeg.test(val)){
	        return true;
	    }else{
	    	//$('.notifyjs-corner').empty();
	    	//$.bw.notify( '【'+title+'】 数值不是正数!', 'error' );
	        return false;
	    }
	}  
}
function isNumberNM(title,val){
	if(isEmpty(title,val) && leftRrim(title,val) && rightRrim(title,val)){
		var regPos = /^\d+(\.\d+)?$/; 
	    var regNeg = /^[1-9]\d*$/; 
	    if(regPos.test(val) || regNeg.test(val)){
	    	if(val<=1 && val>=0){
	    		return true;
	    	}else{
	    		//$('.notifyjs-corner').empty();
		    	//$.bw.notify( '【'+title+'】 数值0到1之间!', 'error' );
		        return false;
	    	}    
	    }else{
	    	//$('.notifyjs-corner').empty();
	    	//$.bw.notify( '【'+title+'】 数值不是正数!', 'error' );
	        return false;
	    }
	}  
}
function isNumber(title,val){
	if(isEmpty(title,val) && leftRrim(title,val) && rightRrim(title,val)){
		var regPos = /^\d+(\.\d+)?$/; 
	    var regNeg = /^[1-9]\d*$/; 
	    if(regPos.test(val) || regNeg.test(val)){
	        return true;
	    }else{
	    	//$('.notifyjs-corner').empty();
	    	//$.bw.notify( '【'+title+'】 数值不是正数!', 'error' );
	        return false;
	    }
	}  
}
function leftRrim(title,val){
    var regNeg = /(^\s+)/g; 
    if(!regNeg.test(val)){
        return true;
    }else{
    	//$('.notifyjs-corner').empty();
    	//$.bw.notify( '【'+title+'】 前面不能有空格!', 'error' );
        return false;
    }
}
function rightRrim(title,val){
    var regNeg = /(\s+$)/g; 
    if(!regNeg.test(val)){
        return true;
    }else{
    	//$('.notifyjs-corner').empty();
    	//$.bw.notify( '【'+title+'】 后面不能有空格!', 'error' );
        return false;
    }
}
function isLength(title,val,max){
	if(val.length>max){
		//$('.notifyjs-corner').empty();
    	//$.bw.notify( '【'+title+'】 长度不能超过'+max+'字符!', 'error' );
        return false;
	}else{
		return true;
	}
}
function isEmpty(title,val){
    if(val!=''){
        return true;
    }else{
    	//$('.notifyjs-corner').empty();
    	//$.bw.notify( '【'+title+'】 不能为空!', 'error' );
        return false;
    }
}
 function outstr(num) {
        var numstr = '0123456789';
        var str = '';
        for (var i = 0; i < num; i++) {
            str += numstr.charAt(Math.floor(Math.random() * (numstr.length)))
        }
        return str;
    }

    function makerId(ymd) {
        var code = '';
        var ymd = ymd || 20000101;
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
        var cityId = ["11", "12", "13", "14", "15", "21", "22", "23", "31", "32", "33", "34", "35", "36", "37", "41", "42", "43", "44", "45", "46", "50", "51", "52", "53", "54", "61", "62", "63", "64", "65", "71", "81", "82", "91"];
        var cityIdone = cityId[Math.floor(Math.random() * (cityId.length))];
        code = cityIdone.toString() + outstr(4).toString() + ymd.toString() + outstr(3).toString()
        var codetemp = code.split('');
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
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
    }