import { loadComponent } from './component';

const tag = "v-component";


class Component extends HTMLElement {
  // html: any;
  _name = this.getAttribute("name")!;
  constructor() {
    super();
    loadComponent(this.innerHTML, this._name);
  }
  public connectedCallback() {
    this.innerHTML = "";
  }
}

customElements.define(tag, Component);
