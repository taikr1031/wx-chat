package com.wxchat.webscoket;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

public class WebSocketMessageInbound extends MessageInbound {

  private final Logger log = LoggerFactory.getLogger(WebSocketMessageInbound.class);

  @Override
  protected void onClose(int status) {
//        InitServlet.getSocketList().remove(this);
	super.onClose(status);
	log.debug("onClose");
	InitServlet.getSocketList().remove(this);
  }

  @Override
  protected void onOpen(WsOutbound outbound) {
	log.debug("onOpen");
	super.onOpen(outbound);
	InitServlet.getSocketList().add(this);
  }

  @Override
  protected void onBinaryMessage(ByteBuffer message) throws IOException {
// TODO Auto-generated method stub
	log.debug("onBinaryMessage");
  }


  @Override
  protected void onTextMessage(CharBuffer message) throws IOException {
// TODO Auto-generated method stub
	log.debug("onTextMessage=" + message);
// this.getWsOutbound().writeTextMessage(CharBuffer.wrap("===="));
// this.getWsOutbound().writeTextMessage(message);
//发送给所有链接的
	for (MessageInbound messageInbound : InitServlet.getSocketList()) {
	  CharBuffer buffer = CharBuffer.wrap(message);
	  WsOutbound outbound = messageInbound.getWsOutbound();
	  outbound.writeTextMessage(buffer);
	  outbound.flush();
	}
  }

}
