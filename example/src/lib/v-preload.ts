import { uuid } from "./uuid";
import { newFnRun } from "./newFn";

const tag = "v-preload";

class Component extends HTMLElement {
  _id = uuid("v_preload");
  _showQuery = this.getAttribute("show-query")!;
  onload = newFnRun(this.getAttribute("onload")!);
  constructor() {
    super();
    const pList: Promise<Function>[] = [];
    if (this._showQuery) {
      document.body.querySelectorAll(this._showQuery).forEach((el: any) => {
        el.style.visibility = "hidden";
      });
    }
    this.querySelectorAll('link[rel="verk"]').forEach((el: any) => {
      const href = el.getAttribute("href");
      el.remove();
      const vn = document.createElement("v-new") as any;
      vn.destory = true;
      vn.setAttribute("src", href);
      pList.push(
        new Promise((res) => {
          vn.onload = res;
          this.append(vn);
        })
      );
    });
    Promise.all(pList).then(() => {
      this.innerHTML = "";
      if (this._showQuery) {
        document.body.querySelectorAll(this._showQuery).forEach((el: any) => {
          el.style.visibility = "visible";
        });
      }
      this.onload();
    });
  }
}

customElements.define(tag, Component);
