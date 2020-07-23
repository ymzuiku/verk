import { newFnReturn, runFn } from "./newFn";
import { uuid } from "./uuid";
import { comps, fns, loadComponent, fetchs } from "./component";

const tag = "v-new";
const srcReg = new RegExp('(src|href)=".', "g");
const hookReg = /(\$hook|verk-)/g;
const renderHookReg = /\$renderHook/g;

class Component extends HTMLElement {
  _id = uuid();
  _destroy = false;
  _name: any;
  _isSrc: any;
  _html: any;
  _child: any;
  _fn: any;
  _props: any;
  _hook: any;
  _loading: any;
  _slot = new Map();
  _tmp = this.querySelector("template");
  constructor() {
    super();
  }
  public connectedCallback() {
    this._name = this.getAttribute("src") || this.getAttribute("name")!;
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
  renderLoading = () => {
    if (!this._loading && this._tmp) {
      const el = this._tmp.content.querySelector("[loading]");
      if (el) {
        this._loading = true;
        // this.innerHTML = "";
        this.append(el.cloneNode(true));
      }
    }
  };
  load = () => {
    if (this._tmp) {
      this._tmp.innerHTML = this._tmp.innerHTML.replace(
        renderHookReg,
        this._id
      );
      this._tmp.content.querySelectorAll("[slot]").forEach((el) => {
        const slot = el.getAttribute("slot")!;
        const node = el.cloneNode(true) as any;
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

  update = () => {
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

    (window as any)[this._id] = this._hook;
    this._html = this._html.replace(hookReg, this._id);

    if (this._fn) {
      Promise.resolve(this._fn(this._hook)).then((cb) => {
        this.innerHTML = this._html;
        this._slot.forEach((v: HTMLElement, k) => {
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
    } else {
      this.innerHTML = this._html;
    }
  };
  public disconnectedCallback() {
    this._slot.clear();
    this._slot = null as any;
    this._destroy = true;
  }
}

customElements.define(tag, Component);
