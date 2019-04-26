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