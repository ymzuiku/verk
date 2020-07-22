const tag = "v-shadow";

class Component extends HTMLElement {
  shadow = this.attachShadow({
    mode: (this.getAttribute("mode") as any) || "open",
  });
  constructor() {
    super();
    const tmp = this.querySelector('template');
    if (tmp) {
      this.shadow.innerHTML = tmp.innerHTML;
    }
  }
}

customElements.define(tag, Component);
