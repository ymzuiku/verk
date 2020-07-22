import { newFnReturn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-for";

class Component extends HTMLElement {
  _id = uuid('v_for');
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  constructor() {
    super();
    events.set(this._id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    if (this._getVal()) {
      this.innerHTML = this._html;
    } else {
      this.innerHTML = "";
    }
  };
  public disconnectedCallback() {
    events.delete(this._id)
  }
}

customElements.define(tag, Component);
