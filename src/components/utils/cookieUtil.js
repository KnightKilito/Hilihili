/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(name, value) {
    console.log("正在设置cookie：" + name + ":" + value);
    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 10 * 60 * 60 * 10);   //时间单位毫秒
    document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toGMTString() + ";path=/";
    //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！

}


/*获取cookie*/
export function getCookie(a) {
    // console.log(a)
    var d;
    var b = document.cookie;
    // console.log(b)
    var c = b.split(";");
    for (let e = 0; e < c.length; e++) {
        var f = c[e].split("=");
        if (a == f[0].toString().trim()) {
            d = f[1];
            break;
        }
    }
    if (void 0 == d || null == d) {
        return "";
    } else {
        var g = unescape(d.trim());
        return g;
    }
}


/*删除cookie*/
export function delCookie(c_name) {
    var b = new Date(0).toGMTString();
    document.cookie = c_name + "=;expires=" + b + ";path=/";
}