import { newFnReturn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-route";

class Component extends HTMLElement {
  _id = uuid("v_route");
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  constructor() {
    super();
    events.set(this._id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    const path = this.getAttribute("path") || this._getVal();
    if (location.hash.indexOf(path) === 0) {
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
