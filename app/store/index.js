import { observable, action, computed, makeAutoObservable } from 'mobx';

import { get, post } from '../common/http';

export class ConversionStore {
  @observable conversions;

  constructor(value) {
    makeAutoObservable(this);
  }

  @action
  async initConversions(userID) {
    // this.conversions = [...conversions];
    const response = await post('/conversion/getAll', {
      user: userID,
    });
    if (response.code === 0) {
      this.conversions = response.data.conversions;
      // console.log(response.data.conversions);
    }
  }

  @action resetConversion(conversion) {
    // this.conversions = [...conversions];
    const result = this.conversions.map((item, index) => {
      if (item._id === conversion._id) {
        item = { ...conversion };
        // console.log(conversion);
      }
      return item;
    });
    this.conversions = result;
  }

  @action deleteConversion(index) {
    this.conversions.splice(index, 1);
    this.conversions = [...this.conversions];
  }
}

export class MsgStore {
  msgs = [];
  conversionID;

  constructor(value) {
    makeAutoObservable(this);
  }

  @action
  async initMsgs(opts) {
    // this.conversions = [...conversions];
    if (opts.method === 1) {
      const response = await post('/conversion/getAllMsg', {
        conversionID: opts.conversionID,
      });
      if (response.code === 0) {
        this.msgs = response.data.msgs;
        // console.log(this.msgs);
        this.conversionID = response.data.conversionID;
      }
    } else {
      const response = await post('/conversion/getAllMsg', {
        from: opts.from,
        to: opts.to,
      });
      if (response.code === 0) {
        this.msgs = response.data.msgs;
        // console.log(this.msgs);
        this.conversionID = response.data.conversionID;
      }
    }
  }

  @action receiveMsg(msg) {
    const temp = this.msgs;
    this.msgs = [msg, ...temp];
    // this.msgs.unshift(msg);
    // console.log('zzz', ...this.msgs);
    // this.msgs = [...this.msgs, msg];
  }
}

class UserStore {
  @observable user;

  constructor(value) {
    this.user = value;
  }

  @action initUser = (user) => {
    this.user = user;
  };
}

export const userStore = new UserStore();
export const conversionStore = new ConversionStore();
export const msgStore = new MsgStore();
