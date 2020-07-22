import { newFnReturn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-for";

class Component extends HTMLElement {
  _id = uuid("v_for");
  _getVal = newFnReturn(this.getAttribute("data")!);
  _v = new RegExp(this.getAttribute("value") || "\\$v", "g");
  _i = new RegExp(this.getAttribute("index") || "\\$i", "g");
  _html = this.innerHTML;
  constructor() {
    super();
    events.set(this._id, this.onUpdate);

    this.onUpdate();
  }
  onUpdate = () => {
    const val = this._getVal();
    if (val && val.length > 0) {
      let nextHTML = "";
      val.forEach((v: any, i: any) => {
        let h = this._html.replace(this._v, v);
        h = h.replace(this._i, i);
        nextHTML += h;
      });
      this.innerHTML = nextHTML;
    } else {
      this.innerHTML = "";
    }
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
