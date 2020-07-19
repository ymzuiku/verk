import "./fixParams";
import {
  middlewareByUpdate,
  updateAll,
  middlewareByInit,
  setVerk,
} from "./update";
import { ReducerList, Reducer, uuid } from "./utils";
import { removeComponent } from "./bindTemplate/removeComponent";

function update(el: HTMLElement) {
  setVerk(el);
  updateAll(el);
  setTimeout(() => {
    if (el.style.visibility === "hidden") {
      el.style.visibility = "visible";
    }
  }, 200);
}

const $verk = {
  update,
  middlewareByUpdate,
  middlewareByInit,
  Reducer,
  ReducerList,
  removeComponent,
  uuid,
};

window.addEventListener("load", function () {
  (document.querySelectorAll("[verk]") as any).forEach(update);
});

export default $verk;
