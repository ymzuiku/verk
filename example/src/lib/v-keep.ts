import { uuid } from "./uuid";

const tag = "v-keep";

class Component extends HTMLElement {
  _id = uuid("v_keep");
  constructor() {
    super();
  }
}

customElements.define(tag, Component);
