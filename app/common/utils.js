import { io } from 'socket.io-client';

import { SOCKET_SERVER } from '../config/commonVar';
import { msgStore } from '../store';

export let socket = null;

export const initIO = (user) => {
  if (!socket) {
    socket = io(SOCKET_SERVER);
    socket.on('connect', () => {
      // console.log(user);
      socket.emit('setUser', user);
    });

    socket.on('receiveMsg', (msg) => {
      console.log('客户端接收到服务器的消息：', msg);
      msgStore.receiveMsg({ ...msg });
    });
  }
};

export const sendMsg = ({ from, to, content }) => {
  //   console.log(from, to, content);
  socket.emit('sendMsg', { from, to, content });
};
