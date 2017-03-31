//«Î«Û¿‡
(function ($, bom) {
    var ajax = function () {
        var that = this;
        var config = {
            url: '',
            type: '',
            data: null,
            success: function () { },
            error: function () { }
        };
        var dtd = $.Deferred();
        that.post = function (url, data) {
            config.url = url;
            config.type = 'post';
            config.data = data || null;
            return ajaxToDeferred(config);
        };
        that.get = function (url, data) {
            config.url = url;
            config.type = 'get';
            config.data = data || null;
            return ajaxToDeferred(config);
        };

        function ajaxToDeferred(config) {
            var dtd = $.Deferred();
            config.success = function (res) {
                if (res.data === void 0) res = JSON.parse(res);
                dtd.resolve(res);
            };
            config.error = function (res) {
                if (res.data === void 0) res = JSON.parse(res);
                dtd.reject(res);
            };
            $.ajax(config);
            return dtd;
        }
    };
    var api = {
        getPaperData: function (data) {
            var getApi = new ajax();
            return getApi.get('/marking/getonlinepaper.json', data);
        },
        saveScoring: function (data) {
            var postApi = new ajax();
            return postApi.post('/marking/markingonlinepaper.json', data);
        },
        commitOnlinePaper: function (data) {
            var postApi = new ajax();
            return postApi.post('/marking/commitonlinepaper.json', data);
        },
        getStatus: function () {
            var postApi = new ajax();
            return postApi.post('/marking/getstatusforonlinepaper.json');
        },
        setStatus: function (data) {
            var postApi = new ajax();
            return postApi.post('/marking/setstatusforonlinepaper.json', data);
        },
        getGameData: function (data) {
            var postApi = new ajax();
            return postApi.post('/resume/detail.json?deliverid={0}&systemtype=campus'.format(data.dlpkid));
        },
        getHandleData: function (data) {
            var postApi = new ajax();
            return postApi.post('/marking/loadoperaterecords.json?paperid={0}'.format(data.guid));
        }
    };

    bom.TMApi = api;
}($, window));