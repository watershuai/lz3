function back(event) {
    window.history.go(-1)
}

// 调用分页器
// 分页器方法
function initPagin(total) {
    pagin({
        total: total //总页数
    })
}



var province = "" //省份
var city = "" // 城市
var area = "" // 地区
var is_search = false //判断是不是查询数据
var first = true;
// 铺数据列表
getList()

function getHtmlByRes(result) {
    let html = "";
    $.each(result.dataList.list, function (i, j) {
        html += `<li id="${j.id}">
        <div class="shop-pic">
          <img src="http://47.102.197.243/ADMIN-789/${j.picUrl1}">
        </div>
        <div class="shop-info">
          <p class="shop-name" >${j.shopName}</p>
          <p class="shop-address">
            <span class="shop-address-name">地址：</span>
            <span class="shop-address-val">${j.province + j.city + j.area}</span>
          </p>
        </div>
      </li>`
    })
    return html
}

function afterAddRes() {
    const lis = $(".shop_list li")
    for (let i = 0; i<lis.length; i++){
        lis.eq(i).click(function () {
            const hrefVal =  `/index.html#!/shop_detail.html?id=${lis.eq(i).attr('id')}`
            window.location.href = hrefVal
        })
    }
}

function getList(pageNo) {
    if (pageNo === undefined) {
        pageNo = 1 //默认pageNo 显示第一页
    }
    _post(shopUrls.bus_search, {
        status: 1,
        pageNo: pageNo,
        pageSize: 10,
        isShow: 1
    }, function (result) {
        if (first) {
            first = false
            $(".msg").html("已经入驻" + result.fakeNum + "家 商家!")
        }
        if (result.dataList.list.length == 0) {
            $(".shop_list li").remove();
            $(".um-content").addClass('hide')
            $(".pagin").addClass('hide')
            $('.hint').removeClass('hide')
        } else {
            let html = getHtmlByRes(result)
            $('.hint').addClass('hide')
            $(".shop_list li").remove();
            $(".um-content").removeClass('hide')
            setTimeout(function () {
                $(".shop_list").append(html);
                $(".um-content").addClass('hide')
                initPagin(5)
                $(".pagin").removeClass('hide')

                afterAddRes()
            }, 500)
        }
    }, true);
}

function search(pageNo, province, city, area) {
    _post(shopUrls.bus_search, {
        status: 1,
        pageNo: pageNo,
        province: province,
        city: city,
        area: area,
        pageSize: 10,
        isShow: 1
    }, function (result) {
        if (result.dataList.list.length == 0) {
            $(".shop_list  li").remove();
            $(".um-content").addClass('hide')
            $(".pagin").addClass('hide')
            $('.hint').removeClass('hide')
        } else {
            var html = getHtmlByRes(result)
            $('.hint').addClass('hide')
            $(".shop_list li").remove();
            $(".um-content").removeClass('hide')
            setTimeout(function () {
                $(".shop_list").append(html);
                $(".um-content").addClass('hide')
                initPagin(5)
                $(".pagin").removeClass('hide')
                is_search = true
                afterAddRes()
            }, 500)
        }
    }, true);
}


// 翻页方法


function Page(pageNo) {
    if (is_search) {
        _post(shopUrls.bus_search, {
            status: 1,
            pageNo: pageNo,
            province: province,
            city: city,
            area: area,
            pageSize: 10,
            isShow: 1
        }, function (result) {
            var html = getHtmlByRes(result);
            $('.hint').addClass('hide')
            $(".shop_list li").remove();
            $(".um-content").removeClass('hide')
            setTimeout(function () {
                $(".shop_list").append(html);
                $(".um-content").addClass('hide')
                initPagin(5)
                $(".pagin").removeClass('hide')
                afterAddRes();
                is_search = true
            }, 500)
        }, true);
    } else {
        $('.hint').addClass('hide')
        $(".shop_list  li").remove();
        $(".um-content").removeClass('hide')
        _post(shopUrls.bus_search, {
            status: 1,
            pageNo: pageNo,
            pageSize: 10
        }, function (result) {
            var html = getHtmlByRes(result)
            setTimeout(function () {
                $(".shop_list").append(html);
                $(".um-content").addClass('hide')
                afterAddRes()
            }, 500)
        }, true);
    }


}

//展示项品详情
function showShopItemInfo(obj) {
    itemInfoId = $(obj).data("id");
    window.location.href = "#!/shop/item_info.html";
}



getAddr()

function getAddr() {
    var html = " <option value=\"请选择省\">请选择省</option>"
    _post(shopUrls.shop_search, {
        type: "1",
    }, function (result) {
        for (i = 0; i < result.length; i++) {
            html += "<option value=\"" + result[i] + "\">" + result[i] + "</option>"
        }
        setTimeout(function () {
            $(" .province select option").remove()
            $(" .province select").append(html)
        }, 500)
    }, true);
}



// 选择省
$(" .province select").change(function () {
    province = $(this).val();
    var html = " <option value=\"请选择市\">请选择市</option>"
    var html2 = " <option value=\"请选择区/县\">请选择区/县</option>"
    if (province === "请选择省") {
        setTimeout(function () {
            $(" .city select option").remove()
            $(" .area select option").remove()
            $(" .city select").append(html)
            $(" .area select").append(html2)
            is_search = false
            getList()
        }, 500)
    } else {
        dex=2;
        _post(shopUrls.shop_search, {
            type: "2",
            sheng: province
        }, function (result) {
            for (i = 0; i < result.length; i++) {
                html += "<option value=\"" + result[i] + "\">" + result[i] + "</option>"
            }
            setTimeout(function () {
                $(" .city select option").remove()
                $(" .area select option").remove()
                $(" .city select").append(html)
                $(" .area select").append(html2)
            }, 500)
        }, true);
    }
});
// 选择市
$(" .city select").change(function () {
    city = $(this).val();
    var html = " <option value=\"请选择区/县\">请选择区/县</option>"
    if (city === "请选择市") {
        setTimeout(function () {
            $(" .area select option").remove()
            $(" .area select").append(html)
        }, 500)
    } else {
        _post(shopUrls.shop_search, {
            type: "3",
            shi: city
        }, function (result) {
            for (i = 0; i < result.length; i++) {
                html += "<option value=\"" + result[i] + "\">" + result[i] + "</option>"
            }
            setTimeout(function () {
                $(" .area select option").remove()
                $(" .area select").append(html)
            }, 500)
        }, true);
    }
});


// 选择区
$(" .area select").change(function () {
    area = $(this).val();
    if (area != "请选择区/县") {
        search(1, province, city, area)
        console.log("省" + province)
        console.log("市" + city)
        console.log("县" + area)
    }
});

// 封装分页器方法
var dex=0;
var index = 0;
var totalNum = null;
var current = index + 1
var lock = true;
// 当前页数
function currentPage(index) {
    current = index + 1
}

function pagin(page) {
    totalNum = page.total + 1;

    // 计算分页宽度
    if (page.total < 5) {
        $(".pagin").css('width', 11 + ((page.total - 1) * 2) + "rem")
    } else {
        $(".pagin").css('width', 11 + (page.total * 2) + "rem")
    }

    $('.pagin *').remove()
    var html = ""
    var list = ""
    for (i = 1; i < totalNum; i++) {
        if (i == 1) {
            list += "<li class=\"item current\" onclick=\"choose(" + i + ")\">" + i + "</li>"
        } else {
            list += "<li class=\"item\" onclick=\"choose(" + i + ")\">" + i + "</li>"
        }
    }
    if (totalNum > 5) {

        list += "<li class=\"item\"  onclick=\"noPage()\">...</li>"
    }
    html = " <span id=\"firstPage\" onclick=\"FirstPage()\">首页</span>" +
        "<span id=\"prePage\" onclick=\"PrePage()\">上一页</span>" +
        "<ul class=\"group\">" + list +
        "</ul>" +
        "<span id=\"nextPage\" onclick=\"NextPage()\">下一页</span>"
    $('.pagin').append(html)

    console.log(index)
}

// 高亮
function currentNum(index) {
    $(".group .item").eq(index).addClass("current").siblings('.item').removeClass('current')
}

// 首页
function FirstPage() {
    if (lock) {
        lock = false
        setTimeout(function () {
            lock = true;
        }, 500)
        if (index != 0) {
            index = 0;
            currentNum(index)
            currentPage(index)
            console.log(current)
            sessionStorage.setItem("current", current)
            Page(current)
        }
    }
}
// 下一页
function NextPage() {
    if (lock) {
        lock = false
        setTimeout(function () {
            lock = true;
        }, 500)
        if (dex == 2) {
            if (index + 1 == 5) {
                alert("为保障商家信息隐私暂不开放")
                return
            }
        }
        //if (index < totalNum - 2) {
        index++;
        currentNum(index)
        currentPage(index)
        console.log(current)
        sessionStorage.setItem("current", current)
        Page(current)
        // } else {

        // }
    }

}

// 上一页
function PrePage() {
    if (lock) {
        lock = false
        setTimeout(function () {
            lock = true;
        }, 500)
        if (index > 0) {
            index--;
            currentNum(index)
            currentPage(index)
            console.log(current)
            sessionStorage.setItem("current", current)
            Page(current)
        }
    }
}

function choose(num) {
    if (lock) {
        lock = false
        setTimeout(function () {
            lock = true
        }, 500)
        index = num - 1
        currentNum(index)
        currentPage(index)
        console.log(current)
        if (current != sessionStorage.getItem("current")) {
            sessionStorage.setItem("current", current)
            Page(current)
        }
    }
}

function noPage() {
    alert("为保障商家信息隐私暂不开放")
}