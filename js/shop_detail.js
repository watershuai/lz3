function back() {
    window.history.go(-1)
}
getmsg()

function getmsg() {
    $(".detail-top").hide()
    $(".detail-bottom").hide()
    console.log(window.location)
    const id = window.location.href.substring(window.location.href.lastIndexOf('=') + 1, window.location.href.length)
    _post(shopUrls.queryShopById, {
        id: id
    }, function (result) {
        console.log(result)
        if(JSON.stringify(result) == "{}"){
            $(".detail-top").hide()
            $(".detail-bottom").hide()
            $('.show_hint').removeClass('hide')
        }else{
            var top = "<div class=\"portrait\">"+
                "<img src=\""+ "http://47.102.197.243/ADMIN-789/" +result.picUrl1+"\">"+
                "</div>"+
                "<p>店铺名称:"+result.shopName+"</p>"+
                "<p>地址:"+result.address+"</p>"


            var bottom =   " <p>店铺展示</p>"+
                "<ul class=\"item-cell-list\" id=\"categoryItemList\">"+
                "<li>"+
                "<div class=\"item-pic\">"+
                "<img src=\""+ "http://47.102.197.243/ADMIN-789/" +result.picUrl1+"\" />"+
                "</div>"+
                "</li>"+
                "<li>"+
                "<div class=\"item-pic\">"+
                "<img src=\""+ "http://47.102.197.243/ADMIN-789/" +result.picUrl2+"\" />"+
                "</div>"+
                "</li>"+
                "</ul>"+
                "<p>店铺介绍</p>"+
                "<p>"+result.trade+"</p>"

            setTimeout(function () {
                $('.show_hint').addClass('hide')
                $(".detail-top").append(top)
                $(".detail-bottom").append(bottom)
                $(".detail-top").show()
                $(".detail-bottom").show()
            },500)
        }
    }, true);
}