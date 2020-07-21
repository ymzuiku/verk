import { ob } from "./ob";
import { uuid } from "./uuid";
import { newf } from "./newf";

export const a = 0;

const tag = "v-txt";

class Component extends HTMLElement {
  text = newf(this.innerHTML);
  id = uuid("str");
  constructor() {
    super();
    console.log(this.id);
    ob.set(this.id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    this.innerHTML = this.text();
    return;
  };
  public disconnectedCallback() {
    ob.delete(this.id);
  }
}

customElements.define(tag, Component);
