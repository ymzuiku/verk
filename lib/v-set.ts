import { newFnReturn, runFn } from "./newFn";
import { events, dispatch } from "./ob";
import { uuid } from "./uuid";
import { diff } from "./diff";

const tag = "v-set";

class Component extends HTMLElement {
  _id = uuid("fn");
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  _diff: any;
  _lastDiff: any;
  _attrs: { [key: string]: any } = [];

  constructor() {
    super();
    let isNeedListen = false;
    if (this.firstElementChild) {
      Array.from(this.attributes).map((attr) => {
        if (/^on/.test(attr.name)) {
          (this.firstElementChild as any)[attr.name] = (e: any) => {
            runFn(newFnReturn(attr.value)(), e);
            dispatch();
          };
        } else {
          isNeedListen = true;
          const name = attr.name.replace(/^v-/, "");
          this._attrs[name] = newFnReturn(attr.value);
        }
      });
    }
    this.update();
    if (isNeedListen) {
      events.set(this._id, this.update);
    }
  }

  update = () => {
    if (this.firstElementChild) {
      Object.keys(this._attrs).forEach((k) => {
        const v = this._attrs[k]();
        if (this.firstElementChild!.getAttribute(k) !== v) {
          this.firstElementChild!.setAttribute(k, v);
        }
      });
    }
  };

  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
