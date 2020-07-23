import { newFnReturn, runFn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-route";

class Component extends HTMLElement {
  _id = uuid("v_route");
  _html: any;
  _getVal: any;
  _lastVal: any;
  _lastHash: any;
  constructor() {
    super();
    this._html = this.innerHTML;
    this._getVal = newFnReturn(this.getAttribute("value")!);
    events.set(this._id, this.update);
    this.update();
  }
  update = () => {
    if (this._lastHash === location.hash) {
      return;
    }
    this._lastHash = location.hash;
    const path = this.getAttribute("path") || runFn(this._getVal);
    const v = location.hash.indexOf(path) === 0;
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
