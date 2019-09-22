
function back(event) {
    window.history.go(-1)
}

// 输入判断

// 给总价赋值
function total() {
    // if (price.toString().indexOf(".") > 0 && Number(price.toString().split(".")[1].length) > 2) {
    //   console.log("小数点不能超过2位~");
    //   document.getElementById("price").value = Math.round(price * 100) / 100;
    // }
    var unitprice = $("#unitprice").val()
    var num = $("#num").val();
    var intention = $("#intention").val()

    if (unitprice === "") {
        unitprice = 0
    } else if (unitprice.toString().indexOf(".") > 0 && Number(unitprice.toString().split(".")[1].length) > 2) {
        alert("单价不能超过2位小数");
        unitprice = Math.floor(unitprice * 100) / 100;
        $("#unitprice").val(unitprice)
    }

    if (num === "") {
        num = 0
    } else if (num.toString().indexOf(".") > 0 && Number(num.toString().split(".")[1].length) > 0) {
        alert("数量必须为整数");
        num = Math.floor(num)
        $("#num").val(num)
    }

    if (intention === "") {
        intention = 0
    } else if (intention.toString().indexOf(".") > 0 && Number(intention.toString().split(".")[1].length) > 2) {
        alert("单价不能超过2位小数");
        intention = Math.floor(intention * 100) / 100;
        $("#intention").val(intention)
    }

    // var num = parseFloat($("#num").val() === "" ? 0 : $("#num").val())
    // var intention = parseFloat($("#intention").val() === "" ? 0 : $("#intention").val())

    // console.log(intention)

    unitprice = parseFloat(unitprice)
    num = parseFloat(num)
    intention = parseFloat(intention)

    // console.log(typeof (unitprice))
    // console.log(typeof (num))
    // console.log(typeof (intention))

    var total = unitprice * num;
    if (unitprice == 0 || num == 0) {
        total = 0
    }
    $("#total").val(total)
}
// 给积分赋值
function integral() {
    // var intention = parseFloat($("#intention").val() === "" ? 0 : $("#intention").val())
    var intention = $("#intention").val()
    if (intention === "") {
        intention = 0
    } else if (intention.toString().indexOf(".") > 0 && Number(intention.toString().split(".")[1].length) > 2) {
        alert("单价不能超过2位小数");
        intention = Math.floor(intention * 100) / 100;
        $("#intention").val(intention)
    }


    var integral = changeTwoDecimal_f(parseFloat(intention * 0.9));
    if (intention == 0) {
        integral = 0
    }
    $("#integral").val(integral)
}

// 监听单价变化
$("#unitprice").blur(function () {
    total()
})
// 监听数量变化
$("#num").blur(function () {
    total()
})
// 监听意向金变化
$("#intention").blur(function () {
    integral()
    total()
})

// 提交按钮
function shop_pay() {
    // 获取商铺信息
    var sss="";
    _post(shopUrls.my_shop, {}, function (result2) {
        sss=result2.picUrl1;
    });



    var poneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    var phone = $('#phone').val().trim() //手机号
    var shopName = $('#shopName').val().trim() //店铺名称
    var unitprice = $('#unitprice').val().trim() //单价
    var num = $('#num').val().trim() // 数量
    var intention = $('#intention').val().trim() // 促单意向金
    var integral = $('#integral').val().trim() // 赠送积分
    var total = $('#total').val().trim() // 总额
    if (phone == null || phone == "") {
        notice("请输入手机号!");
        return;
    }
    if (!poneReg.test(phone)) {
        notice("请输入正确手机号!");
        return;
    }
    if (shopName == null || shopName == "") {
        notice("请输入店铺名称!");
        return;
    }
    if (unitprice == null || unitprice == "") {
        notice("请输入单价!");
        return;
    }


    if (num == null || num == "") {
        notice("请输入数量!");
        return;
    }
    if (intention == null || intention == "") {
        notice("请输入促单意向金");
        return;
    }

    var integral = $('#integral').val().trim() // 赠送积分
    var total = $('#total').val().trim() // 总额
    var param = {
        types: "shangjia",
        address: phone, //电话
        itemName: shopName, //店铺名称
        itemPic: intention, //促单意向金
        price: unitprice, //单价
        itemNum: num, //数量
        totalMoney: total, //总额
        sendScore: integral, //赠送积分
        //sendScore: integral.toFixed(2),  //赠送积分
        payType:1,
        userCord:localStorage.getItem("pic")

    }
    console.log(param)
    // _post(shopUrls.bus_entry, param, function (result) {
    //     console.log(result)
    //     if (result.code == 200) {
    //         success2("提交成功");
    //         //$("#nickName").html(result.data.nickName);
    //     } else if (result.code == 401) {} else {
    //         notice(result.message);
    //     }
    // }, true);
    var data = {
        itemId: "1115884359251865600",
        price: total,
        itemNum: num,
        addressId: "1152822194083598336"
    };
    //提交订单
    _post(shopUrls.submitItemOrder, param, function (result) {
        console.log(result)
        if (result.code == 200) {
            if (result.data.payType == 2) {
                $.confirm("是否蓝钻兑换？", function () {
                    //设置成功付款状态
                    _post(shopUrls.cogOrderStatus, {
                        id: result.data.id,
                        orderStatus: 1
                    }, function (result1) {
                        if (result1.code == 200) {
                            orderId = result1.data.id;
                            window.location.href = "#!/shop/order_success.html";
                        } else if (result1.code == 401) {
                            window.location.href = "#!/login.html";
                        } else {
                            notice(result1.message);
                        }
                    }, true);
                }, function () {
                    // window.location.href = "#!/user_center.html";
                });
            } else {
                $.confirm("是否选者支付宝支付？", function () {
                    //发起支付宝支付
                    window.location.href = shopUrls.cogOrderStatusAlipay + "?id=" + result.data.id + "&orderStatus=10";
                }, function () {
                    window.location.href = "#!/commodity_show.html";
                });
                // notice("支付功能待开发。。。。");
            }
        } else if (result.code == 401) {
            window.location.href = "#!/login.html";
        } else {
            notice(result.message);
        }
    }, true);
}

function NumberCheck(t){
    var num = t.value;
    var re=/^\d*$/;
    if(!re.test(num)){
        isNaN(parseInt(num))?t.value=0:t.value=parseInt(num);
    }
}
