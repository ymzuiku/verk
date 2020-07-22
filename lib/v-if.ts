import { newFnReturn, runFn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-if";

class Component extends HTMLElement {
  _id = uuid("v_if");
  _html: any;
  _getVal: any;
  constructor() {
    super();
    this._html = this.innerHTML;
    this._getVal = newFnReturn(this.getAttribute("value")!);
    events.set(this._id, this.update);
    this.update();
  }
  update = () => {
    if (runFn(this._getVal)) {
      this.innerHTML = this._html;
    } else {
      this.innerHTML = "";
    }
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
