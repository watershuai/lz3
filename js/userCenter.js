
var clipboard = new ClipboardJS('.pool-copy-btn', {
    text: function () {
        return $("#walletAddress").html();
    }
});

clipboard.on('success', function (e) {
    notice("复制成功!");
});
_get(Interf.getUser, {}, function (result) {
    if (result.code == 200) {
        if (result.data.headImg != null && result.data.headImg != "") {
            $("#headImg").html(result.data.headImg); // 用户头像
        }
        $("#inviteCode").html(result.data.inviteCode); // 用户昵称
        $("#walletAddress").html(result.data.walletAddress);
        /* if (result.data.money > 0) {
           $("#money").html(changeTwoDecimal_f(result.data.money));
         }*/
        localStorage.setItem("parentInviteCode", result.data.parentInviteCode);

        if (result.data.score > 0) {
            $("#score").html(result.data.score);
        }
        $("#notArriveScore").html(result.data.notArriveScore);

        //验证当前实名认证状态，只有未认证的状态才能跳入认证页面
        if (result.data.isNameReal == 0) {
            $("#isNameReal").html("未认证");
            $("#real_name").attr("href", "#!/real_name.html");
        }

        if (result.data.isNameReal == 1) {
            $("#isNameReal").html("审核中");
            $("#real_name").attr("href", "javascript:void(0)");
        }

        if (result.data.isNameReal == 2) {
            $("#isNameReal").html("已认证");
            $("#real_name").attr("href", "javascript:void(0)");
        }
        //验证是否为代理商
        if (result.data.agentType == 1) {
            // $("#isNameReal").html("未认证");
            $("#my_proxy").css("display", "none");
        }
        //验证是否为代理商
        if (result.data.moneyreType == 1) {
            // $("#isNameReal").html("未认证");
            $("#my_money").css("display", "none");
        }
        //$("#nickName").html(result.data.nickName);
    } else if (result.code == 401) {
        window.location.href = "#!/login.html";
    } else {
        notice(result.message);
    }
});

function noMsg() {
    notice("待开放!");
}

_get(Interf.getNowMoney, {}, function (result) {
    if (result.result.code == 200) {
        $("#movementMoney").html(result.result.data.nowMoney);
    }
});

//获取订单状态统计
_get(shopUrls.getMyAllByOrderStatus, {}, function (result) {
    if (result.code == 200) {
        $("#shopOrders0").html(result.data.shopOrders0);
        $("#shopOrders1").html(result.data.shopOrders1);
        $("#shopOrders2").html(result.data.shopOrders2);
        $("#shopOrders3").html(result.data.shopOrders3);
    }
});

//获取正在生效的计划
_get(Interf.getMyPointPlan, {}, function (result) {
    if (result.code == 200 && result.data.size !== null) {
        $("#plan").html(result.data.size);
    }
});

function goUrl(obj) {
    topOrderStatus = $(obj).data("status");
    window.location.href = "#!/my_orders.html";
}

function _get(url, data, callback, isLoading, content) {
    data.token = localStorage.getItem("token"); //$.cookie('token');
    var loadingObj;
    $.ajax({
        type: "GET",
        contentType: 'application/x-www-form-urlencoded',
        dataType: "json",
        url: url,
        data: data,
        cache:false,
        beforeSend: function () {
            if (isLoading) {
                loadingObj = loading(content != undefined ? content : "加载中...")
            };
        },
        success: function (data) {
            typeof callback == 'function' && callback(data);
        },
        error: function (data) {
            error("访问异常");
        },
        complete: function () {
            // 此处关闭加载信息
            if (isLoading) {
                loadingObj.close()
            };
        }
    });
}
_get(Interf.getUserMoneyTr, {}, function (result) {
    if (result.data > 0) {
        $("#money").html(changeTwoDecimal_f(result.data));
    }
})



// 复写 post
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

// 获取商铺信息
_post(shopUrls.shop_msg, {}, function (result) {
    // console.log(result)
    if (result.code == 1){
        $("#zuodan").css("display", "none");
        $("#shangjia_money").css("display", "none");
        $("#wodedingdan").css("display", "none");
        $("#shangpudingdan").css("display", "none");
    }else if (result.code == 0){

    } else {
        $("#dingdanliebiao").css("display", "none");
        var html = ""
        html += "<ul class=\"tool-text-menu\">" +
            "<li>" +
            "<p class=\"menu-title\">商铺蓝钻余额</p>" +
            "<p class=\"menu-num\" id=\"score\">" + result.userShopMoney.money + "</p>" +
            "</li>" +
            "<li>" +
            "<p class=\"menu-title\">历史蓝钻</p>" +
            "<p class=\"menu-num\" id=\"notArriveScore\">" + result.userShopMoney.lslanzuan + "</p>" +
            "</li>" +
            "<li>" +
            "<p class=\"menu-title\">意向金总额</p>" +
            "<p class=\"menu-num\" id=\"plan\">" + result.userShopMoney.yxj + "</p>" +
            "</li>" +
            "<li>" +
            "<p class=\"menu-title\">订单数</p>" +
            "<p class=\"menu-num\" id=\"movementMoney\">" + result.userShopMoney.orderNum + "</p>" +
            "</li>" +
            "</ul>"
        var obj = document.getElementById("ruzhu");
        obj.innerHTML = "<img class=\"menu-icon\" src=\"img/icon/shaogouwu.png\" />" + "我的店铺";
        $(".is_shops").append(html);
        $("#shangjiamoney").html(changeTwoDecimal_f(result.userShopMoney.money));
        _post(shopUrls.my_shop, {}, function (result2) {
            var aObj = document.getElementById("ruzhu2");
            aObj.href=`/index.html#!/shop_detail.html?id=`+result2.id;
            localStorage.setItem("pic", result2.picUrl1);
            //$("#headImg").html("http://47.102.197.243/ADMIN-789/"+result.picUrl1);
            //document.getElementById("headImg").src="http://47.102.197.243/ADMIN-789/"+result2.picUrl1;
        });
        //根据id获取超链接,设置href属性
        /* var aObj = document.getElementById("ruzhu2");
         aObj.href= "#!/shop_show.html";*/

    }
});



function afterAddRes() {
    const lis = $(".shop_list li")
    for (let i = 0; i<lis.length; i++){
        lis.eq(i).click(function () {
            const hrefVal =  `/index.html#!/shop_detail.html?id=${lis.eq(i).attr('id')}`
            window.location.href = hrefVal
        })
    }
}