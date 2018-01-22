/**
 * Created by msxiehui on 2018/1/22.
 * Date:2018/1/22
 * Time:17:05
 * Emali:msxiehui@163.com
 * VERSION:
 *北京耀启网络科技有限公司
 *北京百孚思传实网络营销机构
 *
 */

(function () {
    var JSSDK = window.JSSDK = window.JSSDK || {}

    JSSDK.version="1.0.1";
    
    JSSDK.config={
        share:null,
        shareWx:null,
        shareQQ:null,
        shareTimeline:null,
        ShareQZone:null,
        postUrl:"",
    };
    
    function _init(param) {
    
        JSSDK.param =param || {};
        
        for (var key in JSSDK.param)  {
            JSSDK.config[key]=JSSDK.param[key]
            for(var s in JSSDK.param[key]){
                JSSDK.config[key][s]=JSSDK.param[key][s]
            }
        }
    
    
        JSSDK.config.shareWx= ShareIsNull(JSSDK.config.shareWx);
        
        
        
        // if(JSSDK.config.shareQQ==null || JSSDK.config.shareWx==null || JSSDK.config.shareTimeline==null || JSSDK.config.ShareQZone==null){
        //     console.log("有空")
        //     if(JSSDK.config.share==null){
        //         console.log("share 不能为空")
        //     }
        //
        // }
        //
        console.log(JSSDK.config.share)
        console.log("init");
        
    }
    
    function ShareIsNull(obj) {
        console.log(obj);
        var requet={};
        if(obj==null){
            if(JSSDK.config.share!=null){
                requet=JSSDK.config.share
            }
        }else{
            requet= obj
        }
        
        return requet;
        
        
    }
    
    
    JSSDK.init=_init;
    
    
    // JSSDK.reset=_reset;
    // JSSDK.version="0.2.2";
    // JSSDK.url="http://"+window.location.host;
})();



