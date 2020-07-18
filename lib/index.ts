import "./fixParams";
import {
  middlewareByUpdate,
  updateAll,
  middlewareByInit,
  setVerk,
} from "./update";
import { ReducerList, Reducer, uuid } from "./utils";
import { removeComponent } from './bindTemplate';

const $verk = {
  update: updateAll,
  middlewareByUpdate,
  middlewareByInit,
  Reducer,
  ReducerList,
  removeComponent,
  uuid,
};

window.addEventListener("load", function () {
  (document.querySelectorAll("[verk]") as any).forEach(function (
    el: HTMLElement
  ) {
    setVerk(el);
    updateAll(el);
    setTimeout(() => {
      if (el.style.visibility === "hidden") {
        el.style.visibility = "visible";
      }
    }, 200);
  });
});

export default $verk;
