import { initMixin } from './init';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';
import { warn } from '../util/index';

// 这里是 Vue 的庐山真面目了，就是一个 function
function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    // 这里说明 Vue 必须要通过 new 的方法去实现，这里主要通过 es5
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}
// 上面之所以不用 class 声明，而用 new 是因为这里需要往 vue 的原型上挂载方法，而es6的 class 不好实现
// es5 可以将不同挂载方法拆分到不同的文件下
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
