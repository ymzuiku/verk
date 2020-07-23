import { newFnReturn, runFn } from "./newFn";
import { uuid } from "./uuid";
import { comps, fns, loadComponent, fetchs } from "./component";

const tag = "v-new";
const srcReg = new RegExp('(src|href)=".', "g");
const hookReg = /(\$hook|verk-)/g;

class Component extends HTMLElement {
  _id = uuid();
  _destroy = false;
  _name: any;
  _isSrc: any;
  _html: any;
  _fn: any;
  _props: any;
  _hook: any;
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
  load = () => {
    if (fetchs.get(this._name) === 1) {
      this.querySelectorAll("[loading]").forEach((el) => {
        console.log("------");
      });
      requestAnimationFrame(this.load);
      return;
    }
    if (fetchs.get(this._name) === 2) {
      this.update();
      return;
    }
    if (this._isSrc) {
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
    this.update();
  };
  
  update = () => {
    if (this._destroy) {
      return;
    }
    if (!this._html) {
      this._html = comps.get(this._name);
      this._fn = fns.get(this._name);
    }

    if (!this._html) {
      return;
    }

    (window as any)[this._id] = this._hook;
    this._html = this._html.replace(hookReg, this._id);

    if (this._fn) {
      Promise.resolve(this._fn(this._hook)).then((cb) => {
        this.innerHTML = this._html;
        if (typeof cb === "function") {
          cb();
        }
      });
    } else {
      this.innerHTML = this._html;
    }
  };
  public disconnectedCallback() {
    this._destroy = true;
  }
}

customElements.define(tag, Component);
