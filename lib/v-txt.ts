import { events } from "./ob";
import { uuid } from "./uuid";
import { newFnReturn } from "./newFn";

export const a = 0;

const tag = "v-txt";

class Component extends HTMLElement {
  _text = newFnReturn(this.innerHTML);
  _id = uuid("v_txt");
  constructor() {
    super();
    events.set(this._id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    this.innerHTML = this._text();
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
