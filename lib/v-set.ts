import { newFnReturn } from "./newFn";
import { events, dispatch } from "./ob";
import { uuid } from "./uuid";

const tag = "v-set";

class Component extends HTMLElement {
  _id = uuid("fn");
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  _attrs: { [key: string]: any } = [];
  constructor() {
    super();
    events.set(this._id, this.onUpdate);
    if (this.firstElementChild) {
      Array.from(this.attributes).map((attr) => {
        if (/^on/.test(attr.name)) {
          (this.firstElementChild as any)[attr.name] = function (e: any) {
            newFnReturn(attr.value)()(e);
            dispatch();
          };
        } else {
          const name = attr.name.replace(/^v-/, '');;
          this._attrs[name] = newFnReturn(attr.value);
        }
      });
    }
    this.onUpdate();
  }

  text = () => {
    return new Function("return " + this.innerHTML)();
  };
  onUpdate = () => {
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
