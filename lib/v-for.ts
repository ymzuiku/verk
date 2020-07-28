import { newFnReturn, runFn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-for";
class Item extends HTMLElement {}
customElements.define("v-for-item", Item);

function getLen(val: any) {
  if (typeof val === "number") {
    return val;
  }
  if (Array.isArray(val)) {
    return val.length;
  }
  return 0;
}

class Component extends HTMLElement {
  _id = uuid("v_for");
  _len = newFnReturn(this.getAttribute("len")!);
  _i = new RegExp(this.getAttribute("index") || "@i", "g");
  _getVal = newFnReturn(this.getAttribute("len")!);
  _html = this.innerHTML;
  _lastLen: any;

  constructor() {
    super();
    if (!this.closest("v-keep")) {
      events.set(this._id, this.update);
    }
    this.update();
  }

  getH = (i: any) => {
    const h = this._html.replace(this._i, i);
    return `<v-for-item ${this._id}="${i}">${h}</v-for-item>`;
  };

  update = () => {
    const len = getLen(runFn(this._getVal));
    if (typeof this._lastLen === "undefined") {
      if (len) {
        let nextHTML = "";
        for (let i = 0; i < len; i++) {
          nextHTML += this.getH(i);
        }
        this.innerHTML = nextHTML;
      } else {
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
    } else {
      for (let i = len; i < this._lastLen; i++) {
        this.querySelectorAll(`[${this._id}="${i}"]`).forEach((v) => {
          v.remove();
        });
      }
    }

    this._lastLen = len;
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
