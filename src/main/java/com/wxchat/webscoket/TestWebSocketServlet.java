package com.wxchat.webscoket;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "/websocket", urlPatterns = "/websocket", loadOnStartup = 2)
public class TestWebSocketServlet extends WebSocketServlet {

  private static final Logger log = LoggerFactory.getLogger(TestWebSocketServlet.class);

  private static final long serialVersionUID = 1L;
  //存储链接的容器
  private static List<WebSocketMessageInbound> connsList = new ArrayList<WebSocketMessageInbound>();

  @Override
  protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
// TODO Auto-generated method stub
    return new WebSocketMessageInbound();
  }
}
