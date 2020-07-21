import { newf } from "./newf";
import { ob } from "./ob";
import { uuid } from "./uuid";

const tag = "v-if";

class Component extends HTMLElement {
  id = uuid('if');
  html = this.innerHTML;
  getVal = newf(this.getAttribute("value")!);
  constructor() {
    super();
    ob.set(this.id, this.onUpdate);
    this.onUpdate();
  }
  onUpdate = () => {
    if (this.getVal()) {
      this.innerHTML = this.html;
    } else {
      this.innerHTML = "";
    }
  };
  public disconnectedCallback() {
    ob.delete(this.id)
  }
}

customElements.define(tag, Component);

export default () => document.createElement(tag);
