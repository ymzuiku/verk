import { HTMLAny } from "./interface";
import { checkSingle } from "./utils";
import { queryUpdate } from "./update";
import { onError } from "./onError";

function getKind(el: HTMLAny) {
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

export default function bindModel(node: HTMLAny) {
  function bind(el: HTMLAny) {
    const model = el.getAttribute("model")!;
    const query = el.getAttribute("query");
    getKind(el);

    if (!el.__bindedModel) {
      el[el.__modelName] = function fn(e: any) {
        if (el.getAttribute("prevent-" + el.__modelName)) {
          e.preventDefault();
        }
        if (el.getAttribute("stop-" + el.__modelName)) {
          e.stopPropagation();
        }
        const v = (e.target && e.target[el.__valueName]) || "";
        let code: any;
        if (el.__valueIsBool) {
          const valValue = el.getAttribute("set-value");
          const strValue = el.getAttribute("value");
          if (valValue) {
            code = `${model}[${valValue}] = !${model}[${valValue}]; return ${model}[${valValue}];`;
          } else if (strValue) {
            code = `${model}['${strValue}'] = !${model}['${strValue}']; return ${model}['${strValue}'];`;
          } else {
            code = `${model}=${!!v}; return ${model};`;
          }
        } else {
          code = `${model}=\`${v}\`; return ${model};`;
        }
        let fnv: any;
        try {
          fnv = new Function(code)();
        } catch (err) {
          onError(err, el);
        }
        if (el[el.__valueName] !== fnv) {
          el[el.__valueName] = fnv;
        }
        queryUpdate(query);
      };

      el.__bindedModel = true;
    }

    let v: any;
    let code: any;
    if (el.__valueIsBool) {
      const valValue = el.getAttribute("set-value");
      const strValue = el.getAttribute("value");
      if (strValue) {
        code = `return ${model}['${strValue}']`;
      } else if (valValue) {
        code = `return ${model}[${valValue}]`;
      } else {
        code = "return " + model;
      }
    } else {
      code = "return " + model;
    }

    try {
      v = new Function(code)() || "";
    } catch (err) {
      onError(err, el);
    }

    if (el[el.__valueName] !== v) {
      requestAnimationFrame(function () {
        el[el.__valueName] = v;
      });
    }
  }

  checkSingle(node, bind, "model", "[model]");
}
