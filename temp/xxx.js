自己的ui模块可以参考题库的dialog的实现机制。

好吧 其实是atrDialog。可以看一下。


    bom.TMPaper = {
        paperData: null,
        quesCollection: null,

        ready: function () { return false; },
        close: function (fn) {
            $(window).on('beforeunload', function (ev) {
                fn && fn();
            });
            $(window).on('unload', function (ev) {
                fn && fn();
            });
        }
    };

    TMPaper.ready = function(){
      //do something;
    }


(function ($, bom, template, param) {
    var Score = function ($el) {
        var that = this;
        that.$AddScoreNum = $el.find('.tm-add_num');
        that.$AddScoreNum.on('click', '.ui.button', function (ev) {
        });
        function addScoreNum(score) {
            that.$scoreNum.append(SCORE_NUM.format(score));
            that.$score.val(score);
        }
    };
    Score.prototype = {
        show: function (fn) {
            this.$el.show();
            fn && fn.call(this);
        }
    };
    bom.TMScore = new Score($('.tm-score'));
}($, window, template));



//模态框提示类 created by shenjl 2016年8月22日16:08:30
   var ModelClass = function () {
       var that = this;
       that.$tips = $(".dy-tips");
       that.$modal = $(".dy-modal");
       that.$feedback = $(".modal-feedback");

       //Tips
       that.$tips.$title = that.$tips.find(".dy-tips-body");
       that.closetips = function () {
           that.$tips.removeClass("success false open");
       };
       that.showtips = function (content, type) {
           that.$tips.$title.text(content);
           if (type) {
               that.$tips.removeClass("success false open").addClass("open success");
               setTimeout(that.closetips, 2000);
           }
           else {
               that.$tips.removeClass("success false open").addClass("open false");
               setTimeout(that.closetips, 2000);
           }
       };

       //modal
       that.$modal.$title = that.$modal.find('.dy-modal-body .text-center');
       that.$modal.$yes = that.$modal.find(".btn-enter");
       that.$modal.$no = that.$modal.find(".btn-cancel");
       that.closemodal = function () {
           that.$modal.removeClass("success false open");
       };
       that.showmodal = function (content, event) {
           that.$modal.$title.text(content);
           that.$modal.removeClass("success false open").addClass("open success");
           if (event) { that.$modal.$yes.on('click', event); }
           that.$modal.$no.on('click', function () {
               that.closemodal();
               if (event) event();
           });
       };

       //feedback
       that.$feedback.$title = that.$feedback.find(".fb-content .dy-textarea");
       that.$feedback.$submit = that.$feedback.find(".feedback");
       that.closefeedback = function () {
           that.$feedback.removeClass("success false open");
       };
       that.$feedback.find(".close").on('click', that.closefeedback);
       that.showfeedback = function (event) {
           that.$feedback.removeClass("success false open").addClass("open success");
           if (event) { that.$feedback.$submit.on('click', event); }
       };

       //outside
       return {
           showtips: function (content, type) {
               that.showtips(content, type);
           },
           showmodal: function (content, event) {
               that.showmodal(content, event);
           },
           showfeedback: function (event) {
               that.showfeedback(event);
           }
       };
   };



   <!--弹窗 .open打开-->
   <div class="dy-modal">
       <div class="dy-modal-content">
           <div class="dy-modal-dialog">
               <div class="dy-modal-body">
                   <p class="text-center">
                       <!--置中 提示信息-->
                   </p>
               </div>
               <div class="dy-modal-footer">
                   <a class="btn btn-enter" href="javascript:;">确定</a>
                   <a class="btn btn-cancel" href="javascript:;">取消</a>
               </div>
           </div>
       </div>
   </div>

   <!--提示框 .open打开 .false失败 .success成功-->
   <div class="dy-tips">
       <div class="dy-tips-content">
           <div class="dy-tips-dialog">
               <div class="dy-tips-body">
                   <!--信息提示-->
               </div>
           </div>
       </div>
   </div>

   <!--问题反馈-->
   <div class="modal-feedback">
       <div class="fb-title">
           问题反馈
           <a class="close" href="javascript:;">
               <i class="icon-l icon-close"></i>
           </a>
       </div>
       <div class="fb-content">
           <textarea class="dy-textarea" placeholder="请填写你的问题，我们会尽快通过电话回复！"></textarea>
           <div class="fb-btn text-center mt20">
               <a class="dy-btn feedback" href="javascript:;">提交</a>
           </div>
       </div>
   </div>



function _ready() {
            var sid = setInterval(function () {
                TMPaper.ready() && clearInterval(sid);
            }, 60);
        }

_ready();
//适用于那种需要加载一会儿的处理，加载成功后清除Interval事件。


if (_tq !== void 0) {
     _r = _tq;
}
判断_tq是否是undefined

scoreChange: function (fn) {
    var that = this;
    that.$score.change(function () {
        fn && fn.call(that);
    });
},



<!doctype html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .loading{ position: fixed; left: 0; top: 0; display: table; width: 100%; height: 100%; }
    .loading .loading-dialog{ display: table-cell; vertical-align: middle; text-align: center;}
    .loading .loading-content{ display: inline-block; padding: 62px 20px 20px; background: #fff url("loader-medium.gif") no-repeat center 20px; border: 1px solid #000; border-radius: 5px; box-shadow: 0 0 7px 1px rgba(0,0,0,.15); }
  </style>
</head>
<body>
<div class="loading">
  <div class="loading-dialog">
    <div class="loading-content">加载中...</div>
  </div>
</div>
</body>
</html>

//请求类
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



/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function(window,document,$){
    //starting bibibbibi 

}(window,document,jQuery));