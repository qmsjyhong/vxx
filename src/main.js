//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAjax from 'vue-resource';
import router from './router/';
import Locales from './locale';
import { setLoc } from './utils';
import touch from './utils/vue-touch';
import VueI18n from 'vue-i18n';
import { Button, Header, Tabbar, TabItem, Cell, MessageBox, Indicator, Range, Switch, Popup } from 'mint-ui';
import components from './components/index.js'; // 加载公共组件

import AlloyFinger from 'alloyfinger';
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue';

import App from './App'; // 主入口
import './less/main.less';

//全局引入第三方插件
Vue.use(VueRouter);
Vue.use(VueAjax);
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
});
Vue.use(VueI18n);
Vue.directive('touch', touch);
const locale = 'zh';

setLoc('lang', locale);

const messages = Object.create(null);
console.log(Locales);
Object.keys(Locales).forEach(local => {
  messages[local] = {
    ...Locales[local]
  };
});
const i18n = new VueI18n({
  locale,
  messages
});

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Cell.name, Cell);
Vue.component(Range.name, Range);
Vue.component(Switch.name, Switch);
Vue.component(Popup.name, Popup);

Vue.prototype.$indicator = Indicator;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$prompt = MessageBox.prompt;

Vue.prototype.$msgClose = MessageBox.close;

// Resource Header Set
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

Vue.config.productionTip = false;

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase()); //首字母大写

  Vue.component(`vx${name}`, components[key]);
});

function start() {
  new Vue({
    el: '#app',
    router,
    i18n,
    template: '<App/>',
    components: {
      App
    }
  });
}
start();
