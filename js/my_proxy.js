var pageNo = 1, pageSize = 99,pageData = 0;
requestDelayTime = 600;

// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
/*var miniRefresh = new MiniRefresh({
    container: '#minirefresh',
    down: {
        callback: function() {
            // 下拉事件
            setTimeout(function() {
                // 每次下拉刷新后，上拉的状态会被自动重置
                Refresh();
                if(pageNo == 1){
                    miniRefresh.endDownLoading();
                }
                miniRefresh.endUpLoading();
            }, requestDelayTime);
        }
    },
    up: {
        callback: function() {
            setTimeout(function() {
                Load();
                if(pageNo == 1){
                    miniRefresh.endDownLoading();
                }
                miniRefresh.endUpLoading(pageData == 0 ? true : false);
            }, requestDelayTime);
        }
    }
});*/
getMyByOrderProxy1();

/**
 * 获取用户信息
 */
function getMyByOrderProxy1() {
    $("#order1").css("color","green");
    $("#order2").css("color","#333333");
    $("#orderList").empty();
    _get(shopUrls.getMyByOrderProxy,{pageNo:pageNo,pageSize:pageSize,orderStatus:3},function(result){
        if(result.code == 200){
            pageData = result.data.shopOrders.length;
            $("#shopOrders0").html(result.data.xingzhexqUsersize);
            $("#shopOrders1").html(result.data.xingzhexqUsersize);
            $("#shopOrders2").html(result.data.bigDecimal);

            if(pageNo == 1){
                $("#orderList").empty();
            }
            var html = "";
            $.each(result.data.shopOrders,function (i,j) {
                html +=	'<li><div class="message-icon">' +
                    '<img src="' + serverUrl + j.itemPic + '" /></div>' +
                    '<div class="message-info"><div class="message-title">' + j.itemName +
                    '</div>';
                if(j.payType === 2){ //蓝钻
                    html += '<div class="message-content">'+
                        '<img src="img/zuan.png" style="width: 10px; height: 8px; padding-right: 4px;"/>'
                        + changeTwoDecimal_f(j.totalMoney);
                }else{
                    html += '<div class="message-content">￥' + changeTwoDecimal_f(j.totalMoney);
                }
                html += '<span class="message-time">' + j.orderTime + '</span></div></div>';
                //增加确认收货
                if(topOrderStatus === 0){
                    html += '<div class="message-confirm" onclick="payGoods('+'\''+j.id+'\''+')">前往支付</div>';
                }else if(topOrderStatus === 1){

                }else if(topOrderStatus === 2){
                    html += '<div class="message-confirm" onclick="confirmGoods('+'\''+j.id+'\''+')">确认收货</div>';
                }else if(topOrderStatus === 3){

                }else{
                    html += '</li>';
                }
            });
            $("#orderList").append(html);
        } else if(result.code == 401){
            window.location.href = "#!/login.html";
        } else {
            notice(result.message);
        }
    },true);
}


/**
 * 获取商家信息
 */
function getMyByOrderShop() {
    var pageNo1 = 1;
    var pageSize1 = 50;
    $("#order2").css("color","green");
    $("#order1").css("color","#333333");
    $("#orderList").empty();
    _post(shopUrls.order_list, {
        orderStatus: "11",
        pageNo: pageNo1,
        pageSize: pageSize1
    }, function (result) {
        var html = "";
        $.each(result.list, function (i, j) {
            html +=	'<li><div class="message-icon">' +
                '<img src="' + serverUrl + j.userCord + '" /></div>' +
                '<div class="message-info"><div class="message-title">' + j.itemName +
                '</div>';
            if(j.payType === 2){ //蓝钻
                html += '<div class="message-content">'+
                    '<img src="img/zuan.png" style="width: 10px; height: 8px; padding-right: 4px;"/>'
                    + changeTwoDecimal_f(j.totalMoney);
            }else{
                html += '<div class="message-content">￥' + changeTwoDecimal_f(j.totalMoney);
            }
            html += '<span class="message-time">' + j.orderTime + '</span></div></div>';
            //增加确认收货
            if(topOrderStatus === 0){
                html += '<div class="message-confirm" onclick="payGoods('+'\''+j.id+'\''+')">前往支付</div>';
            }else if(topOrderStatus === 1){

            }else if(topOrderStatus === 2){
                html += '<div class="message-confirm" onclick="confirmGoods('+'\''+j.id+'\''+')">确认收货</div>';
            }else if(topOrderStatus === 3){

            }else{
                html += '</li>';
            }
        });
        $("#orderList").append(html);

    }, true);

    _post(shopUrls.getMyByShopProxy,{code: localStorage.getItem("parentInviteCode"),parentInviteCode: localStorage.getItem("parentInviteCode")},function(result){


        var html = "";
        $.each(result.xxddList.list,function (i,j) {
            html +=	'<li><div class="message-icon">' +
                '<img src="' + serverUrl + j.userCord + '" /></div>' +
                '<div class="message-info"><div class="message-title">' + j.itemName +
                '</div>';
            if(j.payType === 2){ //蓝钻
                html += '<div class="message-content">'+
                    '<img src="img/zuan.png" style="width: 10px; height: 8px; padding-right: 4px;"/>'
                    + changeTwoDecimal_f(j.totalMoney);
            }else{
                html += '<div class="message-content">￥' + changeTwoDecimal_f(j.totalMoney);
            }
            html += '<span class="message-time">' + j.orderTime + '</span></div></div>';
            //增加确认收货
            if(topOrderStatus === 0){
                html += '<div class="message-confirm" onclick="payGoods('+'\''+j.id+'\''+')">前往支付</div>';
            }else if(topOrderStatus === 1){

            }else if(topOrderStatus === 2){
                html += '<div class="message-confirm" onclick="confirmGoods('+'\''+j.id+'\''+')">确认收货</div>';
            }else if(topOrderStatus === 3){

            }else{
                html += '</li>';
            }
        });
        $("#orderList").append(html);
    },true);
}

function _post(url, data, callback, isLoading, content) {
    data.token = localStorage.getItem("token"); //
    var loadingObj;
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        dataType: "json",
        url: url,
        data: data,
        beforeSend: function () {
            if (isLoading) {
                loadingObj = loading(content != undefined ? content : "加载中...")
            };
        },
        success: function (data) {
            typeof callback == 'function' && callback(data);
        },
        error: function (data) {
            // error("访问异常");
        },
        complete: function () {
            // 此处关闭加载信息
            if (isLoading) {
                loadingObj.close()
            };
        }
    });
}





function confirmGoods(goodsId){
    _post(shopUrls.confirmGoods, {id:goodsId}, function(result) {
        if(result.code == 200) {
            notice("收货成功！");
            Refresh();
        } else if(result.code == 401) {
            window.location.href = "#!/login.html";
        } else {
            notice(result.message);
        }
    }, true);
}

function payGoods(goodsId) {
    notice("支付功能待开发。。。。");
}

function Refresh() {
    pageNo = 1;
    getMyByOrderProxy1();
}

function Load() {
    /*pageNo += 1;*/
    getMyByOrderProxy1();
}

// /**
//  * 跳转
//  */
// function goUrl (id) {
//     noticeId = id;
//     window.location.href = "#!/notice_info.html";
// }
/*getUserScoreRecord();
/!**
 * 获取交易记录
 *!/
function getUserScoreRecord() {
    _get(Interf.getUserScoreRecord,{pageNo:pageNo,pageSize:pageSize},function(result){
       if(result.code == 200){
             var html = "";
             pageData = result.data.length;

             if(pageNo == 1){
                     $("#scoreList").empty();
                 }

             $.each(result.data,function (i,j) {
                 var score = j.score;
                if(score > 0){
                    score = "+" + score;
                }

                html +=	'<li><div class="message-icon">' +
                                '<img src="img/trade/trade' + j.type + '.png" /></div>' +
                                '<div class="message-info"><div class="message-title">' +
                                '<span class="price">' + score + '</span>' +
                                '<span class="message-time">' + j.createDate + '</span></div>' +
                                '<div class="message-content">' + j.remarks + '</div></div></li>';
             });
             $("#scoreList").append(html);
       } else if(result.code == 401){
          window.location.href = "#!/login.html";
       } else {
          notice(result.message);
       }
    },true);
}

function Refresh(){
    pageNo = 1;
    getUserScoreRecord();
}

function Load(){
    pageNo += 1;
    getUserScoreRecord();
}*/

/*var pageNo = 1,
    pageSize = 15;
_get(Interf.getUserTradeRecord, {
    pageNo: pageNo,
    pageSize: pageSize
}, function(result) {
    if(result.code == 200) {
        $(".dui-log-list").empty();
        var html = "";
        $.each(result.data, function(i, j) {
            var money = j.money;

            if(money > 0){
                        money = "+" + money;
                    }

            html += '	<li class="list-detail">' + j.content +
                '	<span class="detail-time">' + j.createTime + '</span>' +
                '	<span class="detail-z">' + money + '</span>                  ' +
                '</li>                                                ';
        });
        $(".dui-log-list").append(html);
    } else if(result.code == 401) {
        window.location.href = "#!/login.html";
    } else {
        notice(result.message);
    }
});

refresher.init({
    id: "wrapper",
    pullDownAction: Refresh,
    pullUpAction: Load
});
var generatedCount = 0;

function Refresh() {
    pageNo = 1;
    setTimeout(function() {
        _get(Interf.getUserTradeRecord, {
            pageNo: pageNo,
            pageSize: pageSize
        }, function(result) {
            if(result.code == 200) {
                $(".dui-log-list").empty();
                var html = "";
                $.each(result.data, function(i, j) {
                    var money = j.money;

                    if(money > 0){
                        money = "+" + money;
                    }

                    html += '	<li class="list-detail">' + j.content +
                        '	<span class="detail-time">' + j.createTime + '</span>' +
                        '	<span class="detail-z">' + money + '</span>                  ' +
                        '</li>                                                ';
                });
                $(".dui-log-list").append(html);
                myScroll.refresh();
            } else if(result.code == 401) {
                window.location.href = "#!/login.html";
            } else {
                notice(result.message);
            }
        });
    }, 1000);
}

function Load() {
    pageNo += 1;
    setTimeout(function() {
        _get(Interf.getUserTradeRecord, {
            pageNo: pageNo,
            pageSize: pageSize
        }, function(result) {
            if(result.code == 200) {
                var html = "";
                $.each(result.data, function(i, j) {
                    var money = j.money;

                    if(money > 0){
                        money = "+" + money;
                    }

                    html += '	<li class="list-detail">' + j.content +
                        '	<span class="detail-time">' + j.createTime + '</span>' +
                        '	<span class="detail-z">' + money + '</span>                  ' +
                        '</li>                                                ';
                });
                $(".dui-log-list").append(html);
                myScroll.refresh();
            } else if(result.code == 401) {
                window.location.href = "#!/login.html";
            } else {
                notice(result.message);
            }
        });
    }, 1000);
}*/