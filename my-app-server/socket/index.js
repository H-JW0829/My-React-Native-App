const Message = require('../models/message');
const Conversion = require('../models/conversion');
const User = require('../models/user');

const userSocket = {};
const socketUser = {};

module.exports = function (server) {
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log(socket.id, ' connect...');

    socket.on('setUser', (user) => {
      if (!userSocket[user._id]) {
        userSocket[user._id] = socket.id;
        socketUser[socket.id] = user._id;
      }
    });

    socket.on('disconnect', () => {
      if (socketUser[socket.id]) {
        const userId = socketUser[socket.id];
        userSocket[userId] = undefined;
        socketUser[socket.id] = undefined;
      }
    });

    socket.on('sendMsg', async ({ from, to, content }) => {
      try {
        console.log('服务端接收到客户端的消息：', content);
        //处理数据
        const conversion = await Conversion.findOne({
          $or: [
            { producer: from, consumer: to },
            { producer: to, consumer: from },
          ],
        });
        const fromUser = await User.findById(from);
        const toUser = await User.findById(to);
        let newMsg;
        if (!conversion) {
          const msg = new Message({
            from: fromUser._id,
            text: content,
            time: Date.now(),
            read: false,
          });
          var newConversion = new Conversion({
            producer: fromUser._id,
            consumer: toUser._id,
            lastMessage: msg,
          });
          msg.conversion = newConversion;
          await newConversion.save();
          newMsg = await msg.save();
          console.log('消息保存成功');
        } else {
          const msg = new Message({
            from: fromUser._id,
            text: content,
            conversion,
            time: Date.now(),
            read: false,
          });
          conversion.lastMessage = msg;
          conversion.producerUnread += 1;
          conversion.consumerUnread += 1;
          await conversion.save();
          newMsg = await msg.save();
        }
        console.log(newMsg);
        io.to(userSocket[to])
          .to(userSocket[from])
          .emit('receiveMsg', {
            _id: newMsg._id,
            text: newMsg.text,
            //   conversion: conversion || newConversion,
            conversion: newMsg.conversion,
            time: newMsg.time,
            read: newMsg.read,
            from: {
              _id: fromUser._id,
              avatar: fromUser.avatar,
            },
          });
      } catch (e) {
        console.log(e);
      }
    });
  });
};
