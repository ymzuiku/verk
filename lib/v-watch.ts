import { newFnRun } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-watch";

class Component extends HTMLElement {
  _id = uuid("v_watch");
  _getVal = newFnRun(this.getAttribute("value")!);
  constructor() {
    super();
    events.set(this._id, this._getVal);
  }
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
