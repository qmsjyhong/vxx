/**
 * Created by Administrator on 2017/12/25.
 */

import Model from './';

class Coverage extends Model {
  static testComm(data) {
    return Model.post('/api/service/nodes', data);
  }

  static getInputInfo(data) {
    return Model.post('/coverage/getInputInfo', data);
  }

  static getWinList() {
    return Model.get('/coverage/getWinList');
  }

  static setWinInput(data) {
    return Model.post('/coverage/setWinInput', data);
  }
  static getInputSourceList() {
    return Model.get('/coverage/getInputSourceList');
  }
}

export default Coverage;
