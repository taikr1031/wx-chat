package com.wxchat.websocket;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * 建立连接时创立
 */
@WebServlet(name = "/mywebsocket", urlPatterns = "*.do")
public class MyWebSocketServlet extends WebSocketServlet {

  public String getUser(HttpServletRequest request) {
	String userName = (String) request.getSession().getAttribute("user");
	if (userName == null) {
	  return null;
	}
	return userName;
  }

  @Override
  protected StreamInbound createWebSocketInbound(String arg0,
												 HttpServletRequest request) {
	return new MyMessageInbound(this.getUser(request));
  }

}