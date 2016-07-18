package com.wxchat.webscoket;

import org.apache.catalina.websocket.MessageInbound;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "InitServlet")
public class InitServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;
  private static List<MessageInbound> socketList;

  public void init(ServletConfig config) throws ServletException {
	InitServlet.socketList = new ArrayList<MessageInbound>();
	super.init(config);
	System.out.println("Server start============");
  }


  public static List<MessageInbound> getSocketList() {
	return InitServlet.socketList;
  }


}
