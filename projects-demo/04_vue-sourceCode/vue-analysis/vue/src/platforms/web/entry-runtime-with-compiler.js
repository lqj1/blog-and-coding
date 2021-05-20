/* @flow */

import config from 'core/config';
import { warn, cached } from 'core/util/index';
import { mark, measure } from 'core/util/perf';

// Vue引入，之后的逻辑都是对 Vue 这个对象做一些扩展，真正初始化 Vue 的地方，在 `src/core/index.js` 中
import Vue from './runtime/index';
import { query } from './util/index';
import { compileToFunctions } from './compiler/index';
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat';

const idToTemplate = cached(id => {
  const el = query(id);
  return el && el.innerHTML;
});

const mount = Vue.prototype.$mount;
// 调用 vm.$mount 的时候就是调用这里的函数
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  // 将 el 转换为 dom 对象
  el = el && query(el);
  /* istanbul ignore if */
  // Vue不能直接挂在到 body 或者 html 上，因为会覆盖
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' &&
      warn(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`);
    return this;
  }

  const options = this.$options;
  // resolve template/el and convert to render function
  // 判断有无手写 render
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(`Template element not found or is empty: ${options.template}`, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(`vue ${this._name} compile`, 'compile', 'compile end');
      }
    }
  }
  // vue只认render函数，有就调 mount 方法，没有就生成render
  return mount.call(this, el, hydrating);
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

Vue.compile = compileToFunctions;

export default Vue;
