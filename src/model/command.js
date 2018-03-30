/**
 * Created by Administrator on 2018/1/1.
 */
import Model from './';
class Command extends Model {
  static commandMessage(data) {
    return Model.post('/Command/commandMessage', data);
  }
}

export default Command;
