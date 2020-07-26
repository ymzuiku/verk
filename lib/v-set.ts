import { newFnReturn, runFn, newFnRun } from "./newFn";
import { events, dispatch } from "./ob";
import { uuid } from "./uuid";

const tag = "v-set";

const ignoreAttr = {
  query: true,
  model: true,
};

function fixKind(el: any) {
  if (el.__modelName) {
    return;
  }
  const tag = el.tagName.toLowerCase();
  const kind = el.type;
  if (tag === "select") {
    el.__modelName = "onchange";
  } else if (tag === "input" || tag === "textarea") {
    el.__modelName = "oninput";
  } else {
    el.__modelName = "onclick";
  }
  if (tag === "select") {
    el.__valueName = "value";
  } else if (kind === "checkbox") {
    el.__valueName = "checked";
    el.__valueIsBool = true;
  } else if (kind === "radio") {
    el.__modelName = "onclick";
    el.__valueName = "checked";
    el.__valueIsBool = true;
  } else {
    el.__valueName = "value";
  }
}

class Component extends HTMLElement {
  _id = uuid("fn");
  _html = this.innerHTML;
  _getVal = newFnReturn(this.getAttribute("value")!);
  _diff: any;
  _model = this.getAttribute("model");
  _getModel = this._model && newFnReturn(this._model);
  _lastDiff: any;
  _attrs: Map<string, any> = new Map();
  _query = this.getAttribute("query");
  updateModel = () => {};

  constructor() {
    super();

    let isNeedListen = false;
    if (this.firstElementChild) {
      if (this._getModel) {
        const el = this.firstElementChild as any;
        fixKind(el);
        el[el.__modelName] = (e: any) => {
          if (el.getAttribute("prevent-" + el.__modelName)) {
            e.preventDefault();
          }
          if (el.getAttribute("stop-" + el.__modelName)) {
            e.stopPropagation();
          }
          const v = el[el.__valueName];
          newFnRun(`${this._model as any} = ${v};`)((window as any)[this._id]);
          this.dispatch();
        };
        this.updateModel = () => {
          const v = this.runModel();
          if (el[el.__valueName] !== v) {
            el[el.__valueName] = v;
          }
        };
      }
      Array.from(this.attributes).map((attr) => {
        if (/^on/.test(attr.name)) {
          (this.firstElementChild as any)[attr.name] = (e: any) => {
            runFn(newFnReturn(attr.value)(), e);
            this.dispatch();
          };
        } else if (!(ignoreAttr as any)[attr.name]) {
          isNeedListen = true;
          const name = attr.name.replace(/^v-/, "");
          let v = runFn(newFnReturn(attr.value));
          if (typeof v === "function") {
            v = runFn(v, this.firstElementChild);
          }
          this._attrs.set(name, v);
        }
        this.removeAttribute(attr.name);
      });
    }
    this.update();
    if (!this.closest("v-keep")) {
      if (isNeedListen || this._getModel) {
        events.set(this._id, this.update);
      }
    }
  }
  runModel = () => {
    let v = runFn(this._getModel);
    if (typeof v === "function") {
      v = runFn(v, this.firstElementChild);
    }
    return v;
  };
  update = () => {
    this.updateModel();
    if (this.firstElementChild) {
      this._attrs.forEach((v, k) => {
        if (this.firstElementChild!.getAttribute(k) !== v) {
          this.firstElementChild!.setAttribute(k, v);
        }
      });
    }
  };
  dispatch = () => {
    if (this._query) {
      document.querySelectorAll(this._query).forEach((el: any) => {
        if (el.update) {
          el.update();
        }
      });
    }
    dispatch();
  };

  public disconnectedCallback() {
    this._attrs.clear();
    this._attrs = null as any;
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
