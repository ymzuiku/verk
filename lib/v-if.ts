import { newFnReturn, runFn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-if";

class Component extends HTMLElement {
  _id = uuid("v_if");
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  _lastVal: any;
  constructor() {
    super();
    if (!this.closest("v-keep")) {
      events.set(this._id, this.update);
    }
    this.update();
  }

  update = () => {
    const v = runFn(this._getVal);
    if (this._lastVal === v) {
      return;
    }
    this._lastVal = v;
    if (v) {
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
