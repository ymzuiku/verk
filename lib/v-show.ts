import { newFnReturn, runFn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";

const tag = "v-show";

class Component extends HTMLElement {
  _id = uuid("v_show");
  _html: any;
  _getVal: any;
  _display = this.style.display;
  constructor() {
    super();
    this._html = this.innerHTML;
    this._getVal = newFnReturn(this.getAttribute("value")!);
    events.set(this._id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    if (runFn(this._getVal)) {
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
