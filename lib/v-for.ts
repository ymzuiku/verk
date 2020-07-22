import { newFnReturn, runFn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";
import { copy } from "./deep";

const tag = "v-for";
class Item extends HTMLElement {}
customElements.define("v-for-item", Item);

class Component extends HTMLElement {
  _id = uuid("v_for");
  _getVal = newFnReturn(this.getAttribute("data")!);
  _v: any;
  _i: any;
  _html: any;
  _keep: any;
  _lastVal: any;

  constructor() {
    super();
    this._getVal = newFnReturn(this.getAttribute("data")!);
    this._v = new RegExp(this.getAttribute("value") || "\\$v", "g");
    this._i = new RegExp(this.getAttribute("index") || "\\$i", "g");
    this._html = this.innerHTML;
    this._keep = this.hasAttribute("keep");
    events.set(this._id, this.update);
    this.update();
  }
  getH = (v: any, i: any) => {
    let h = this._html.replace(this._v, v);
    h = h.replace(this._i, i);
    return `<v-for-item ${this._id}="${i}">${h}</v-for-item>`;
  };

  update = () => {
    const val = runFn(this._getVal);
    if (!this._lastVal) {
      if (val && val.length > 0) {
        let nextHTML = "";
        val.forEach((v: any, i: any) => {
          let h = this._html.replace(this._v, v);
          h = h.replace(this._i, i);
          nextHTML += this.getH(v, i);
        });
        this.innerHTML = nextHTML;
      } else {
        this.innerHTML = "";
      }
      this._lastVal = copy(val);
      return;
    }
    if (this._keep || this._lastVal.length === val.length) {
      return;
    }

    val.forEach((v: any, i: any) => {
      if (i > this._lastVal.length - 1) {
        let h = this._html.replace(this._v, v);
        h = h.replace(this._i, i);
        const list = this.querySelectorAll(`[${this._id}]`);
        const end = list[list.length - 1];
        if (end) {
          end.insertAdjacentHTML("afterend", this.getH(v, i));
        }
      }
    });
    const a = val.length;
    const b = this._lastVal.length;
    for (let i = a; i < b; i++) {
      this.querySelectorAll(`[${this._id}="${i}"]`).forEach((v) => {
        v.remove();
      });
    }

    this._lastVal = copy(val);
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
