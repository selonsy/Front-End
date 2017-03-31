window.onerror = function (message, url, line) {
        var errorMsg = message + '\n'; //错误信息
        errorMsg += 'FilePath:' + url + '\n'; //文件位置
        errorMsg += 'URL:' + window.location.href + '\n'; //当前页面url
        errorMsg += 'Line:' + line + '\n'; //错误行数
        errorMsg += 'Brower:' + navigator.userAgent.toString(); //浏览器信息

        //发送到后端进行处理
        // sendReq('/error/logError.json', {
        //     errorMsg: errorMsg
        // });
    };
