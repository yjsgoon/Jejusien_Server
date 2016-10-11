/**
 * Created by JiSoo on 2016-10-05.
 */

var JS = {};

JS.random = function(max) {
    return parseInt(Math.random(max)*max);
};

JS.loadScript = function(url, callback, charset) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    if (charset != null) {
        script.charset = "utf-8";
    }
    var loaded = false;

    script.onreadystatechange= function () {
        if (this.readyState == 'loaded' || this.readyState == 'complete') {
            if (loaded) {
                return;
            }
            loaded = true;
            if(callback)
                callback();
        }
    }
    script.onload = function () {
        if(callback)
            callback();
    }
    script.src = url;
    head.appendChild(script);

};

JS.getParameter = function(name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )    return undefined;
    else    return results[1];
}
