/**
 * Created by Administrator on 2018/1/11.
 */
import Model from './';
class common extends Model {
  static getDeviceInfo() {
    return Model.get('/common/getDeviceInfo');
  }
}

export default common;
