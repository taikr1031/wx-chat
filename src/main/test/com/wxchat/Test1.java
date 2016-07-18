package com.wxchat;

import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.WxMpCustomMessage;

public class Test1 {

  public static void main(String[] args) throws WxErrorException {

	WxMpInMemoryConfigStorage config = new WxMpInMemoryConfigStorage();
	config.setAppId("wx791d897f45713b38"); // 设置微信公众号的appid
	config.setSecret("ec1be18ba7c332f5ff260c08f3c93e2d"); // 设置微信公众号的app corpSecret
	config.setToken("12345678901234567890123456789012"); // 设置微信公众号的token
//	config.setAesKey(""); // 设置微信公众号的EncodingAESKey

	WxMpService wxService = new WxMpServiceImpl();
	wxService.setWxMpConfigStorage(config);

	// 用户的openid在下面地址获得
	// https://mp.weixin.qq.com/debug/cgi-bin/apiinfo?t=index&type=用户管理&form=获取关注者列表接口%20/user/get
	String openid = "oMPxav8gQa7VgRFjILtzRX_lhymE";
	WxMpCustomMessage message = WxMpCustomMessage.TEXT().toUser(openid).content("777").build();
	wxService.customMessageSend(message);
  }
}
