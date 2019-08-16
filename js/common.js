/**
 * common main
 */

//var ip = "http://192.168.0.110:8980";
var ip = "http://www.lanzuanwang.com";
//var ip = "http://192.168.1.138:8080";
// var ip ="http://ninemax.wicp.net:58106";
//var ip = "http://47.106.202.183:8080";
//var ip = "http://192.168.1.101:8080";
//var ip = "http://192.168.0.103:8080";

// 新添加
// http: //47.102.197.243:8980/ADMIN-789/a/sty/shopIn/saveUserShopInfo //暂时放着
var test_ip = "http://47.102.197.243";






var url = ip + "/ADMIN-789/a/xingzhexq/";
var shop_url = ip + "/ADMIN-789/a/shop/";
var serverUrl = ip;


// 新添加
var enter_url = test_ip + "/ADMIN-789/a/sty/";
var shop_url2 = test_ip + "/ADMIN-789/a/shop/";

var Interf = {
  login: url + "xingzhexqUser/login", //登陆
  laobanlogin : url + "xingzhexqUser/laobanlogin", //老板登陆
  sendCodeByUser: url + "xingzhexqUser/sendCodeByUser", //根据用户手机号获取验证码
  sendCode: url + "xingzhexqUser/sendCode", //发送验证码
  save: url + "xingzhexqUser/save", //用户注册
  getBackLoginPassword: url + "xingzhexqUser/getBackLoginPassword", //修改登陆密码
  updateInfo: url + "xingzhexqUser/updateInfo", //修改用户信息
  getUser: url + "xingzhexqUser/getUser", //获取用户信息
  update: url + "xingzhexqUser/update", //修改用户信息
  limtList: url + "xlsPriceInterval/limtList", //获取图表走势图
  getMessage: url + "xingzhexqUserMessage/page", // 获取个人消息
  getMillList: url + "xingzhexqMill/getMillList", //获取收集器信息
  payOrder: url + "xingzhexqUserOrder/payOrder", // 购买收集器
  scorePayOrder: url + "xingzhexqUserOrder/score/payOrder", // 积分购买收集器
  scoreandpricePayOrder: url + "xingzhexqUserOrder/score/scoreandpricePayOrder", // 积分蓝钻购买收集器
  upLoginPassword: url + "xlsUser/upLoginPassword", //修改登陆密码
  getUserByMobile: url + "xlsUser/getUserByMobile", //根据用户手机号获取用户信息
  sendOutMonery: url + "xingzhexqUser/sendOutMonery", //用户转账逻辑
  getRollOutRecordPage: url + "xingzhexqUserRollOutRecord/page", //获取用户的转账记录表
  getMyMillPage: url + "xingzhexqUserMill/page", //获取我的收集器信息
  dayget: url + "xingzhexqUserMill/dayget", //点击领取
  getMyOrderPage: url + "xingzhexqUserOrder/page", //获取我的订单信息
  updateUserInfo: url + "xlsUser/update", // 更新用户信息
  getUserRealApproveInfo: url + "xlsRealApprove/getInfo", // 获取用户实名认证
  saveUserRealApproveInfo: url + "xlsRealApprove/saveInfo", // 保存实名认证信息
  saveContact: url + "xingzhexqOpinion/saveInfo", // 保存意见信息
  getNoticeInfo: url + "xingzhexqNotice/getNoticeInfo", //获取公告详情
  getMessageInfo: url + "xingzhexqUserMessage/getMessageInfo", //获取消息详情
  getNotice: url + "xingzhexqNotice/page", //获取公告列表
  getMySpcGoNumber: url + "xingzhexqUserMill/getMySpcGoNumber", //获取进度加载信息
  getXlsUserMillRecord: url + "xlsUserMillRecord/getXlsUserMillRecord", //获取用户收集器记录
  getUserInvite: url + "xlsUser/getUserInvite", //获取用户的邀请记录信息
  getUserByParentId: url + "xlsUser/getUserByParentId",
  produceQR: url + "xingzhexqUser/produceQR", //获取用户的推广二维码信息
  loginOut: url + "xingzhexqUser/loginOut", //退出登录
  getUserByWalletAddress: url + "xingzhexqUser/getUserByWalletAddress", //根据用户的钱包地址获取用户信息
  sendCodeByToken: url + "xingzhexqUser/sendCodeByToken", //根据用户token发送验证码,
  getMyMillProductionAds: url + "xingzhexqUserMill/getMyMillProductionAds", //随机用户金额
  chargeMoney: url + "xingzhexqUserMill/chargeMoney", //获取矿机币变化
  getUserRewardsMoney: url + "xingzhexqUserRewardsMoney/page", //获取用户转账记录
  getMyteam: url + "xingzhexqUser/getMyteam", //获取用户团队信息
  getUserInvitationRecord: url + "xingzhexqUserInvitationRecord/page", //获取用户领取钻记录
  saveXingzhexqUserRealApprove: url + "xingzhexqUserRealApprove/save", //提交用户实名认证
  getNowMoney: url + "xingzhexqPriceMovement/getNowMoney", //获取用户当前金额
  getUserTradeRecord: url + "xingzhexqUserTrade/page", //获取用户领取钻记录
  addAddress: url + "xingzhexqUserAddress/addAddress", //添加用户地址
  getAddress: url + "xingzhexqUserAddress/getAddress", //获取地址信息
  getMyAddress: url + "xingzhexqUserAddress/getAllByUserId", //获取用户所有地址
  getUserScoreRecord: url + "xingzhexqUserScoreLog/page", //获取用户积分记录
  getMyPointPlan: url + "xingzhexqUserMill/getMyPointPlan", //获取用户加入得积分计划
  updateMyMoney: url + "xingzhexqUserMill/updateMyMoney" //更新用户已收取蓝钻量
};

var shopUrls = {
  getAllShowShopCategory: shop_url + "shopCategory/getAllShow", //获取全部展示的商品类目
  getZdShopItemInfoItem: shop_url + "shopItemInfo/getZdItem", //查询置顶商品
  getShopItemInfoByCategoryId: shop_url + "shopItemInfo/getByCategoryId", //根据商品类目查询商品列表
  showShopItemInfo: shop_url + "shopItemInfo/getItemInfo", //显示商品详细信息
  submitItemOrder: shop_url + "shopOrder/buyItem", //购买商品，提交订单
  getOrderInfo: shop_url + "shopOrder/getOrderInfo", //获取订单详情
  cogOrderStatus: shop_url + "shopOrder/cogOrderStatus", //设置订单状态
  // workcogOrderStatus: shop_url + "shopOrder/workcogOrderStatus",//是否支付成功
  cogOrderStatusAlipay: shop_url + "shopOrder/cogOrderStatusAlipay", //支付宝支付
  getMyByOrderStatus: shop_url + "shopOrder/getMyByOrderStatus", //根据订单状态查询用户的订单
  getMyByOrderProxy: shop_url + "shopOrder/getMyByOrderProxy", //根据订单状态查询代理商的订单
  getMyAllByOrderStatus: shop_url + "shopOrder/getMyAllByOrderStatus", //根据订单状态查询用户的订单统计
  confirmGoods: shop_url + "shopOrder/confirmGoods", //确认收货
  // 新添加
  bus_entry: enter_url + "shopIn/saveUserShopInfo", // 商家入驻
  bus_search: enter_url + "shopIn/queryUserShopInfo", // 店铺展示
  bus_submit: enter_url + "shopIn/queryUserShopInfo", // 商品名称
  order_list: enter_url + "shopIn/queryUserShopOrder", // 订单列表
  shop_msg: enter_url + "shopIn/queryUserShopMoney", // 订单列表
  shop_search: enter_url + "shopIn/queryCity", // 三级联动
  my_shop: enter_url + "shopIn/queryMyShop", // 我的商铺
  queryShopById: enter_url + "/shopIn/queryUserShopByOne",
  submitItemOrder2: shop_url2 + "shopOrder/buyItem", //购买商品，提交订单
  personOrder: enter_url + "/shopIn/queryUserShopOrderMJ", //买家订单列表
};

// 参数传递
var noticeId; //公告id
var messageId; //消息id
var myMillId; //我的收集器
var inviteCode; //我得邀请码
var itemInfoId; //商品ID
var addressId; //地址ID
var orderId; //订单ID
var topOrderStatus; //订单状态
/**
 * ajax 请求
 */
function _get(url, data, callback, isLoading, content) {
  data.token = localStorage.getItem("token"); //$.cookie('token');
  var loadingObj;
  $.ajax({
    type: "GET",
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


/**
 * post请求
 */
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

/**
 * 获取url参数
 */
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


/**
 * 提示信息
 */
function notice(content) {
  $(document).dialog({
    type: 'notice',
    infoText: content,
    overlayShow: false,
    autoClose: 1500,
    position: 'center' // center: 居中; bottom: 底部
  });
}

/**
 * 加载进度信息
 */
function loading(content) {
  return $(document).dialog({
    type: 'notice',
    infoIcon: 'img/loading.gif',
    infoText: content
  });
}

/**
 * 访问成功
 */
function success() {
  $(document).dialog({
    type: 'toast',
    infoIcon: 'img/success.png',
    infoText: '访问成功',
    autoClose: 1500
  });
}

/**
 * 访问成功
 */
function success2(content) {
  $(document).dialog({
    type: 'toast',
    infoIcon: 'img/success.png',
    infoText: content,
    autoClose: 1500
  });
}

/**
 * 访问异常
 */
function error(content) {
  $(document).dialog({
    type: 'toast',
    infoIcon: 'img/fail.png',
    infoText: content,
    autoClose: 1500
  });
}

/**
 * 倒计时加载
 */
var wait = 60;

function loadingTime(o) {
  if (wait == 0) {
    o.attr('disabled', false);
    o.html("获取验证码");
    wait = 60;
  } else {
    o.attr('disabled', true);
    o.html("重新发送(" + wait + ")");
    wait--;
    setTimeout(function () {
        loadingTime(o)
      },
      1000)
  }
}

/**
 * 修改成功提示
 */
function noticeSuccess(content, obj) {
  obj.update({
    infoIcon: '../images/icon/success.png',
    infoText: content,
    autoClose: 1500,
  });
}

//保留两位小数（四舍五入，不足补零）
function changeTwoDecimal_f(x) {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    // alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  var f_x = Math.round(x * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}