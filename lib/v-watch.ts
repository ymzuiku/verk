import { newFnRun, runFn, newFnReturn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-watch";

class Component extends HTMLElement {
  _id = uuid("v_watch");
  _getVal = newFnReturn(this.getAttribute("value")!);
  constructor() {
    super();
    if (!this.closest("v-keep")) {
      events.set(this._id, this.update);
    }
  }
  update = () => {
    const v = runFn(this._getVal);
    if (typeof v === "function") {
      runFn(v);
    }
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
