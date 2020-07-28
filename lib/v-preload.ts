import { uuid } from "./uuid";
import { newFnRun } from "./newFn";
import { fetchs } from "./component";

const tag = "v-preload";

class Component extends HTMLElement {
  _id = uuid("v_preload");
  onload = newFnRun(this.getAttribute("onload")!);
  constructor() {
    super();
    const pList: Promise<Function>[] = [];
    this.querySelectorAll('link[rel="verk"]').forEach((el: any) => {
      const href = el.getAttribute("href");
      el.remove();
      const vn = document.createElement("v-new") as any;
      vn.destory = true;
      if (fetchs.get(href) === 1) {
        pList.push(
          new Promise((res) => {
            function checkHref() {
              requestAnimationFrame(() => {
                if (fetchs.get(href) !== 2) {
                  checkHref();
                } else {
                  res();
                }
              });
            }
            checkHref();
          })
        );
      } else {
        fetchs.set(href, 1);
        vn.setAttribute("src", href);
        pList.push(
          new Promise((res) => {
            vn.onload = () => {
              fetchs.set(href, 2);
              res();
            };
            this.append(vn);
          })
        );
      }
    });
    Promise.all(pList).then(() => {
      this.innerHTML = "";
      this.onload();
    });
  }
}

customElements.define(tag, Component);
