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
    $(".pagin").css('width', 11 + ((page.total - 1) * 1.5) + "rem")
  } else {
    $(".pagin").css('width', 11 + (page.total * 1.5) + "rem")
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
    }
  }
}

function NextPage() {
  if (lock) {
    lock = false
    setTimeout(function () {
      lock = true;
    }, 500)
    if (index < totalNum - 2) {
      index++;
      currentNum(index)
      currentPage(index)
      console.log(current)
    } else {
      if (index + 1 == 5) {
        alert("为保障商家信息隐私暂不开放")
      }
    }
  }

}

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
  }
}

function noPage() {
  alert("为保障商家信息隐私暂不开放")
}