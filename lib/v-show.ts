import { newFnReturn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-show";

class Component extends HTMLElement {
  _id = uuid("v_show");
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  _display = this.style.display;
  constructor() {
    super();
    events.set(this._id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    if (this._getVal()) {
      this.style.display = this._display;
    } else {
      this.style.display = "none";
    }
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
