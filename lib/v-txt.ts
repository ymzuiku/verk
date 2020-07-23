import { events } from "./ob";
import { uuid } from "./uuid";
import { newFnReturn, runFn } from "./newFn";

export const a = 0;

const tag = "v-txt";

class Component extends HTMLElement {
  _fn: any;
  _id = uuid("v_txt");

  constructor() {
    super();
    this._fn = newFnReturn(this.innerHTML);
    if (!this.closest('v-keep')) {
      events.set(this._id, this.update);
    }
    this.update();
  }
  update = () => {
    const v = runFn(this._fn);
    if (this.innerHTML !== v) {
      this.innerHTML = v;
    }
  };

  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
