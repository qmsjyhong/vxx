/**
 * Created by Administrator on 2017/12/26.
 */
import Model from './';
class Scene extends Model {
  static testComm(data) {
    return Model.post('/api/service/nodes', data);
  }

  static getSceneList() {
    return Model.get('/scene/getSceneList');
  }

  static setLoadScene(data) {
    return Model.post('/scene/setLoadScene', data);
  }

  static saveScene(data) {
    return Model.post('/scene/saveScene', data);
  }
  static alterSceneName(data) {
    return Model.post('/scene/alterSceneName', data);
  }

  static getCurScene() {
    return Model.get('/scene/getCurScene');
  }
}

export default Scene;
