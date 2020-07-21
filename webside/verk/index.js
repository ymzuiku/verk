(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.$verk = {}));
}(this, function (exports) { 'use strict';

  const ob = new Map();
  function dispatchOb() {
      ob.forEach((v, k) => {
          v();
      });
  }

  let n = 0;
  function uuid(u = "u") {
      n += 1;
      if (n > 9990) {
          n = 0;
      }
      return u + Date.now().toString().slice(4, 13) + "_" + n;
  }

  function newf(code) {
      return new Function("return " + code);
  }

  const tag = "v-txt";
  class Component extends HTMLElement {
      constructor() {
          super();
          this.text = newf(this.innerHTML);
          this.id = uuid("str");
          this.onUpdate = () => {
              this.innerHTML = this.text();
              return;
          };
          console.log(this.id);
          ob.set(this.id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          ob.delete(this.id);
      }
  }
  customElements.define(tag, Component);

  const tag$1 = "v-if";
  class Component$1 extends HTMLElement {
      constructor() {
          super();
          this.id = uuid('if');
          this.html = this.innerHTML;
          this.getVal = newf(this.getAttribute("value"));
          this.onUpdate = () => {
              if (this.getVal()) {
                  this.innerHTML = this.html;
              }
              else {
                  this.innerHTML = "";
              }
          };
          ob.set(this.id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          ob.delete(this.id);
      }
  }
  customElements.define(tag$1, Component$1);

  const tag$2 = "v-set";
  class Component$2 extends HTMLElement {
      constructor() {
          super();
          this.id = uuid("fn");
          this.html = this.innerHTML;
          this.getVal = newf(this.getAttribute("value"));
          this.attrs = [];
          this.text = () => {
              return new Function("return " + this.innerHTML)();
          };
          this.onUpdate = () => {
              if (this.firstElementChild) {
                  Object.keys(this.attrs).forEach((k) => {
                      const v = this.attrs[k]();
                      if (this.firstElementChild.getAttribute(k) !== v) {
                          this.firstElementChild.setAttribute(k, v);
                      }
                  });
              }
          };
          ob.set(this.id, this.onUpdate);
          if (this.firstElementChild) {
              Array.from(this.attributes).map((attr) => {
                  if (/^on/.test(attr.name)) {
                      this.firstElementChild[attr.name] = function (e) {
                          newf(attr.value)()(e);
                          dispatchOb();
                      };
                  }
                  else {
                      this.attrs[attr.name] = newf(attr.value);
                  }
              });
          }
          this.onUpdate();
      }
      disconnectedCallback() {
          ob.delete(this.id);
      }
  }
  customElements.define(tag$2, Component$2);

  const verk = 0;

  exports.verk = verk;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
