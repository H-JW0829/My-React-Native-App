const router = require('koa-router')();
const mongoose = require('mongoose');

const Conversion = require('../../models/conversion');
const Message = require('../../models/message');
const { compare } = require('../../utils/method');

router.prefix('/api/conversion');

router.post('/getAll', async (ctx, next) => {
  try {
    const { user } = ctx.request.body;
    const opts = [
      { path: 'producer', select: '_id nickname avatar tel' },
      { path: 'consumer', select: '_id nickname avatar tel' },
      { path: 'lastMessage', select: 'text time' },
    ];
    let conversions = await Conversion.find({
      $or: [{ producer: user }, { consumer: user }],
    }).populate(opts);
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        conversions,
      },
    };
  } catch (e) {
    throw e;
  }
});

router.post('/reset', async (ctx, next) => {
  try {
    const { conversionID, user } = ctx.request.body;
    console.log(conversionID);
    const opts = [
      { path: 'producer', select: '_id nickname avatar tel' },
      { path: 'consumer', select: '_id nickname avatar tel' },
      { path: 'lastMessage', select: 'text time' },
    ];
    const conversion = await Conversion.findById(conversionID).populate(opts);
    if (conversion.producer._id.toString() === user) {
      conversion.producerUnread = 0;
    } else if (conversion.consumer._id.toString() === user) {
      conversion.consumerUnread = 0;
    }
    await conversion.save();
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        conversion,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
});

router.post('/getAllMsg', async (ctx, next) => {
  try {
    const { conversionID, from, to } = ctx.request.body;
    let msgs;
    const opts = [{ path: 'from', select: '_id avatar' }];
    let conversionId;
    if (conversionID) {
      conversionId = conversionID;
      msgs = await Message.find({ conversion: conversionID }).populate(opts);
    } else {
      const conversion = await Conversion.findOne({
        $or: [
          { producer: from, consumer: to },
          { consumer: from, producer: to },
        ],
      });
      conversionId = conversion._id;
      msgs = await Message.find({ conversion: conversion._id }).populate(opts);
    }
    console.log(msgs);
    let result = msgs.sort(compare('time', 1));
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        conversionID: conversionId,
        msgs: result,
      },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
});

module.exports = router;
