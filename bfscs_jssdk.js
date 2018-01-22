 /**
  *	JSSDK 模块 需配合 jssdk.php 使用，单独使用无效。  
  * VERSION: 0.2.2
  * DATE: 2016-06-16
  *	@author:msxiehui<msxiehui@163.com>
  *	北京耀启网络科技有限公司
  * 北京传实互动  北京百孚思广告  
  *	
  * 0.2.2 2016-11-19 
  *		添加 url 变量 内置当前服务器的URL。正式和测试不同链接。
  *		添加 version 变量 显示当前版本号。
  *	0.2.1 2016-06-16 
  *		修改 config 变量 为 JSSDKconfig 防止冲突
  *
 */

(function () {
    var JSSDK = window.JSSDK= function (selector) {
        return new JSSDK.fn.init(selector);
    }; 
	JSSDK.fn = JSSDK.prototype = {
        init: function (selector) {
            if (selector) this.selector = selector;
            return this;
        },      
    };
   JSSDK.init=_init;
   JSSDK.reset=_reset;
   JSSDK.version="0.2.2";
   JSSDK.url="http://"+window.location.host;
})();
 var titles,links,imgUrls,doc;
 function _init(_title,_doc,_link,_img,debug,$succFun,$cance){
	titles=_title;
	links=_link;
	imgUrls=_img;
	doc=_doc;
	//JS 判断是否 传入了 debug 参数；
	var debug=arguments[4]?arguments[4]:false;

	try{
		jssdk(debug,$succFun,$cance);
	}catch(e){	
	console.log(e.description);
	}
 }
 
 function _reset(_title,_doc,_link,_img,debug,$succFun,$cancel){
	titles=_title;
	links=_link;
	imgUrls=_img;
	doc=_doc;
	share($succFun,$cancel);
 }
var JSSDKconfig;
function get_config(url){
     url=JSSDK.url+"/Public/php/jssdk.php?get=js&url="+url;
    $.ajax({
        type: "GET",
        async: false,
        timeout:10000,
        url: url,
        dataType:"json",
        error: function(XMLHttpRequest, textStatus, errorThrown){
            //alert("系统错误："+errorThrown);
        },
        success: function(json){
            JSSDKconfig=json;
        }
    });
}
 
function jssdk(debug,$succFun,$cancel){
var url=location.href.split('#')[0];
url=encodeURIComponent(url);
get_config(url);
wx.config({
    debug: debug,
    appId: JSSDKconfig.appId,
    timestamp:JSSDKconfig.timestamp,
    nonceStr: JSSDKconfig.nonceStr,
    signature: JSSDKconfig.signature,
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
	  'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','closeWindow','chooseImage','previewImage'
    ]
  });
  wx.ready(function () {
    // 在这里调用 API
	share($succFun,$cancel);
	});

}
function share($succFun,$cancel){
    wx.onMenuShareTimeline({
        title: doc,
        link: links,
        desc: doc,
        imgUrl: imgUrls,
        success: function () {
            //alert('分享成功');
            if($succFun!=null){
                $succFun();
            }

        },
        cancel: function () {
         //  alert('取消分享');
            if($cancel!=null){
                $cancel();
            }

        }
    });
    wx.onMenuShareAppMessage({
        title: titles,
        link: links,
        desc: doc,
        imgUrl: imgUrls,
        success: function () {
            //alert('分享成功');
            if($succFun!=null){
                $succFun();
            }
        },
        cancel: function () {
            //alert('取消分享');
            if($cancel!=null){
                $cancel();
            }

        }
    });
    wx.onMenuShareQQ({
        title: titles,
        link: links,
        desc: doc,
        imgUrl: imgUrls,
        success: function () {
            //alert('分享成功');
            if($succFun!=null){
                $succFun();
            }
        },
        cancel: function () {
             //alert('取消分享');
            if($cancel!=null){
                $cancel();
            }

        }
    });
}
