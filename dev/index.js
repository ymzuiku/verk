(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.$verk = factory());
}(this, function () { 'use strict';

  function newFnReturn(code) {
      return new Function("return " + code);
  }
  function newFnRun(code) {
      return new Function("$hook", code);
  }
  function runFn(fn, ...args) {
      try {
          return fn(...args);
      }
      catch (err) {
          console.error(err, fn);
      }
  }

  const watch = new Set();
  const events = new Map();
  let time;
  function dispatch() {
      if (time) {
          cancelAnimationFrame(time);
      }
      time = requestAnimationFrame(() => {
          watch.forEach((fn) => fn());
          events.forEach((v, k) => {
              if (Array.isArray(v)) {
                  v.forEach((sub) => {
                      sub();
                  });
              }
              else {
                  v();
              }
          });
      });
  }

  let n = 0;
  function uuid(u = "u") {
      n += 1;
      if (n > 9990) {
          n = 0;
      }
      return u + Date.now().toString().slice(4, 13) + n + '_';
  }

  const tag = "v-for";
  class Item extends HTMLElement {
  }
  customElements.define("v-for-item", Item);
  function getLen(val) {
      if (typeof val === "number") {
          return val;
      }
      if (Array.isArray(val)) {
          return val.length;
      }
      return 0;
  }
  class Component extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_for");
          this._len = newFnReturn(this.getAttribute("len"));
          this._i = new RegExp(this.getAttribute("index") || "\\$i", "g");
          this._getVal = newFnReturn(this.getAttribute("len"));
          this._html = this.innerHTML;
          this.getH = (i) => {
              const h = this._html.replace(this._i, i);
              return `<v-for-item ${this._id}="${i}">${h}</v-for-item>`;
          };
          this.update = () => {
              const len = getLen(runFn(this._getVal));
              if (typeof this._lastLen === "undefined") {
                  if (len) {
                      let nextHTML = "";
                      for (let i = 0; i < len; i++) {
                          nextHTML += this.getH(i);
                      }
                      this.innerHTML = nextHTML;
                  }
                  else {
                      this.innerHTML = "";
                  }
                  this._lastLen = len;
                  return;
              }
              if (this._lastLen === len) {
                  return;
              }
              if (len > this._lastLen) {
                  for (let i = this._lastLen; i < len; i++) {
                      const list = this.querySelectorAll(`[${this._id}]`);
                      const end = list[list.length - 1];
                      if (end) {
                          end.insertAdjacentHTML("afterend", this.getH(i));
                      }
                  }
              }
              else {
                  for (let i = len; i < this._lastLen; i++) {
                      this.querySelectorAll(`[${this._id}="${i}"]`).forEach((v) => {
                          v.remove();
                      });
                  }
              }
              this._lastLen = len;
          };
          if (!this.closest('v-keep')) {
              events.set(this._id, this.update);
          }
          this.update();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag, Component);

  const tag$1 = "v-txt";
  class Component$1 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_txt");
          this.update = () => {
              const v = runFn(this._fn);
              if (this.innerHTML !== v) {
                  this.innerHTML = v;
              }
          };
          this._fn = newFnReturn(this.innerHTML);
          if (!this.closest("v-keep")) {
              events.set(this._id, this.update);
          }
          this.update();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$1, Component$1);

  const tag$2 = "v-if";
  class Component$2 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_if");
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          this.update = () => {
              const v = runFn(this._getVal);
              if (this._lastVal === v) {
                  return;
              }
              this._lastVal = v;
              if (v) {
                  this.innerHTML = this._html;
              }
              else {
                  this.innerHTML = "";
              }
          };
          if (!this.closest('v-keep')) {
              events.set(this._id, this.update);
          }
          this.update();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$2, Component$2);

  const tag$3 = "v-show";
  class Component$3 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_show");
          this._display = this.style.display;
          this.update = () => {
              const v = runFn(this._getVal);
              if (this._lastVal === v) {
                  return;
              }
              this._lastVal = v;
              if (v) {
                  this.style.display = this._display;
              }
              else {
                  this.style.display = "none";
              }
          };
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          if (!this.closest('v-keep')) {
              events.set(this._id, this.update);
          }
          this.update();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$3, Component$3);

  const tag$4 = "v-set";
  class Component$4 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("fn");
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          this._attrs = [];
          this._query = this.getAttribute("query");
          this.update = () => {
              if (this.firstElementChild) {
                  Object.keys(this._attrs).forEach((k) => {
                      const v = this._attrs[k]();
                      if (this.firstElementChild.getAttribute(k) !== v) {
                          this.firstElementChild.setAttribute(k, v);
                      }
                  });
              }
          };
          let isNeedListen = false;
          if (this.firstElementChild) {
              Array.from(this.attributes).map((attr) => {
                  if (/^on/.test(attr.name)) {
                      this.firstElementChild[attr.name] = (e) => {
                          runFn(newFnReturn(attr.value)(), e);
                          if (this._query) {
                              document.querySelectorAll(this._query).forEach((el) => {
                                  if (el.update) {
                                      el.update();
                                  }
                              });
                          }
                          dispatch();
                      };
                  }
                  else {
                      isNeedListen = true;
                      const name = attr.name.replace(/^v-/, "");
                      this._attrs[name] = newFnReturn(attr.value);
                  }
              });
          }
          this.update();
          if (isNeedListen && !this.closest("v-keep")) {
              events.set(this._id, this.update);
          }
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$4, Component$4);

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  const comps = new Map();
  const fns = new Map();
  const fetchs = new Map();
  const vstart = new RegExp("<v-", "g");
  const vend = new RegExp("</v-", "g");
  const sstart = new RegExp("<v_", "g");
  const send = new RegExp("</v_", "g");
  function loadSc(sc, list) {
      list.push(new Promise((res) => {
          const src = sc.getAttribute("src");
          function getFetch() {
              if (fetchs.get(src) === 1) {
                  requestAnimationFrame(getFetch);
                  return;
              }
              if (fetchs.get(src) === 2) {
                  res();
                  return;
              }
              fetchs.set(src, 1);
              fetch(src)
                  .then((v) => {
                  if (v.ok) {
                      return v.text();
                  }
                  return new Promise((res) => res(""));
              })
                  .then((v) => {
                  if (v) {
                      newFnRun(v)();
                      fetchs.set(src, 2);
                  }
                  else {
                      fetchs.set(src, 0);
                  }
                  res();
              });
          }
          getFetch();
      }));
  }
  function elementLoadScript(el, query, list) {
      el.querySelectorAll(query).forEach((sc) => {
          loadSc(sc, list);
          sc.remove();
      });
  }
  function loadComponent(html, name) {
      return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
          if (!html) {
              return;
          }
          fetchs.set(name, 1);
          html = html.replace(vstart, "<v_");
          html = html.replace(vend, "</v_");
          const el = document.createElement("div");
          el.innerHTML = html;
          el.querySelectorAll("v_component").forEach((com) => {
              loadComponent(com.innerHTML, com.getAttribute("name"));
              com.remove();
          });
          const tmp = el.querySelector("template");
          if (tmp) {
              yield loadComponent(tmp.innerHTML, name);
              return;
          }
          const promiseList = [];
          elementLoadScript(el, "script[src]:not([defer])", promiseList);
          if (el.querySelector("script[defer]")) {
              elementLoadScript(el, 'script[defer=""]', promiseList);
              elementLoadScript(el, 'script[defer="1"]', promiseList);
              elementLoadScript(el, 'script[defer="2"]', promiseList);
              elementLoadScript(el, 'script[defer="3"]', promiseList);
          }
          yield Promise.all(promiseList);
          el.querySelectorAll("script:not([src])").forEach((sc) => {
              fns.set(name, newFnRun(sc.innerHTML));
              sc.remove();
          });
          html = el.innerHTML;
          html = html.replace(sstart, "<v-");
          html = html.replace(send, "</v-");
          comps.set(name, html);
          fetchs.set(name, 2);
          res();
      }));
  }

  const tag$5 = "v-component";
  class Component$5 extends HTMLElement {
      constructor() {
          super();
          // html: any;
          this._name = this.getAttribute("name");
          loadComponent(this.innerHTML, this._name);
      }
  }
  customElements.define(tag$5, Component$5);

  const tag$6 = "v-new";
  const srcReg = new RegExp('(src|href)=".', "g");
  const hookReg = /(\$hook|verk-)/g;
  const renderHookReg = /\$renderHook/g;
  class Component$6 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid();
          this._destroy = false;
          this._slot = new Map();
          this._tmp = this.querySelector("template");
          this.renderLoading = () => {
              if (!this._loading && this._tmp) {
                  const el = this._tmp.content.querySelector("[loading]");
                  if (el) {
                      this._loading = true;
                      // this.innerHTML = "";
                      this.append(el.cloneNode(true));
                  }
              }
          };
          this.load = () => {
              if (this._tmp) {
                  this._tmp.innerHTML = this._tmp.innerHTML.replace(renderHookReg, this._id);
                  this._tmp.content.querySelectorAll("[slot]").forEach((el) => {
                      const slot = el.getAttribute("slot");
                      const node = el.cloneNode(true);
                      node.removeAttribute("slot");
                      this._slot.set(slot, node);
                  });
              }
              if (fetchs.get(this._name) === 1) {
                  this.renderLoading();
                  requestAnimationFrame(this.load);
                  return;
              }
              if (fetchs.get(this._name) === 2) {
                  this.update();
                  return;
              }
              if (this._isSrc) {
                  this.renderLoading();
                  fetchs.set(this._name, 1);
                  fetch(this._name)
                      .then((v) => v.text())
                      .then((v) => {
                      let list = this._name.split("/");
                      list.pop();
                      if (list[0] === ".") {
                          list.shift();
                      }
                      const dir = list.join("/");
                      v = v.replace(srcReg, 'src="' + dir);
                      fetchs.set(this._name, 2);
                      loadComponent(v, this._name).then(() => {
                          this.update();
                      });
                  });
                  return;
              }
              this.innerHTML = "";
              this.update();
          };
          this.update = () => {
              if (this._destroy) {
                  return;
              }
              if (!comps.has(this._name)) {
                  return;
              }
              if (!this._html) {
                  this._html = comps.get(this._name);
                  this._fn = fns.get(this._name);
              }
              window[this._id] = this._hook;
              this._html = this._html.replace(hookReg, this._id);
              if (this._fn) {
                  Promise.resolve(this._fn(this._hook)).then((cb) => {
                      this.innerHTML = this._html;
                      this._slot.forEach((v, k) => {
                          this.querySelectorAll(`slot[name="${k}"]`).forEach((el) => {
                              Array.from(el.attributes).forEach((attr) => {
                                  v.setAttribute(attr.name, attr.value);
                              });
                              el.replaceWith(v.cloneNode(true));
                          });
                      });
                      if (typeof cb === "function") {
                          cb();
                      }
                  });
              }
              else {
                  this.innerHTML = this._html;
              }
          };
      }
      connectedCallback() {
          this._name = this.getAttribute("src") || this.getAttribute("name");
          this._isSrc = this.hasAttribute("src");
          this._props = runFn(newFnReturn(this.getAttribute("props") || "{}"));
          this._hook = {
              el: this,
              props: this._props,
              id: this._id,
              name: this._name,
          };
          this.load();
      }
      disconnectedCallback() {
          this._slot.clear();
          this._slot = null;
          this._destroy = true;
      }
  }
  customElements.define(tag$6, Component$6);

  const tag$7 = "v-watch";
  class Component$7 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_watch");
          this._getVal = newFnRun(this.getAttribute("value"));
          if (!this.closest('v-keep')) {
              events.set(this._id, this._getVal);
          }
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$7, Component$7);

  const tag$8 = "v-route";
  class Component$8 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_route");
          this.update = () => {
              if (this._lastHash === location.hash) {
                  return;
              }
              this._lastHash = location.hash;
              const path = this.getAttribute("path") || runFn(this._getVal);
              const v = location.hash.indexOf(path) === 0;
              if (v) {
                  this.innerHTML = this._html;
              }
              else {
                  this.innerHTML = "";
              }
          };
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          events.set(this._id, this.update);
          this.update();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$8, Component$8);

  const tag$9 = "v-shadow";
  class Component$9 extends HTMLElement {
      constructor() {
          super();
          this.shadow = this.attachShadow({
              mode: this.getAttribute("mode") || "open",
          });
          const tmp = this.querySelector("template");
          if (tmp) {
              tmp.content.querySelectorAll("script:not([src])").forEach((sc) => {
                  newFnRun(sc.innerHTML)();
                  sc.remove();
              });
              this.shadow.innerHTML = tmp.innerHTML;
          }
      }
  }
  customElements.define(tag$9, Component$9);

  const verk = {
      watch,
      dispatch,
      events,
  };
  window.$verk = verk;

  return verk;

}));
