package com.wxchat.websocket;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.apache.catalina.websocket.MessageInbound;

@WebServlet(name = "/initServlet", urlPatterns = "", loadOnStartup = 1)
public class InitServlet extends HttpServlet {

  private static final long serialVersionUID = -3163557381361759907L;

  //private static List<MessageInbound> socketList;
  private static HashMap<String, MessageInbound> socketList;

  public void init(ServletConfig config) throws ServletException {
//        InitServlet.socketList = new ArrayList<MessageInbound>();
	InitServlet.socketList = new HashMap<String, MessageInbound>();
	super.init(config);
	System.out.println("Server start============");
  }

  public static HashMap<String, MessageInbound> getSocketList() {
	return InitServlet.socketList;
  }
/*    public static List<MessageInbound> getSocketList() {
		return InitServlet.socketList;
    }
*/
}