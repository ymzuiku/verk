import { newf } from "./newf";
import { ob, dispatchOb } from "./ob";
import { uuid } from "./uuid";

const tag = "v-set";

class Component extends HTMLElement {
  id = uuid("fn");
  html = this.innerHTML;
  getVal = newf(this.getAttribute("value")!);
  attrs: { [key: string]: any } = [];
  constructor() {
    super();
    ob.set(this.id, this.onUpdate);
    if (this.firstElementChild) {
      Array.from(this.attributes).map((attr) => {
        if (/^on/.test(attr.name)) {
          (this.firstElementChild as any)[attr.name] = function (e: any) {
            newf(attr.value)()(e);
            dispatchOb();
          };
        } else {
          this.attrs[attr.name] = newf(attr.value);
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
      Object.keys(this.attrs).forEach((k) => {
        const v = this.attrs[k]();
        if (this.firstElementChild!.getAttribute(k) !== v) {
          this.firstElementChild!.setAttribute(k, v);
        }
      });
    }
  };
  public disconnectedCallback() {
    ob.delete(this.id);
  }
}

customElements.define(tag, Component);

export default () => document.createElement(tag);
