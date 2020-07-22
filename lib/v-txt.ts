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
    events.set(this._id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    this.innerHTML = runFn(this._fn);
  };

  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
