(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.$verk = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function newFnReturn(code) {
        try {
            return new Function("return " + code);
        }
        catch (err) {
            if (window.$verk) {
                window.$verk.onError(err, code);
            }
            else {
                console.error(err, code);
            }
        }
    }
    function newFnRun(code) {
        try {
            return new Function("$hook", code);
        }
        catch (err) {
            if (window.$verk) {
                window.$verk.onError(err, code);
            }
            else {
                console.error(err, code);
            }
        }
    }
    function runFn(fn, ...args) {
        try {
            return fn(...args);
        }
        catch (err) {
            if (window.$verk) {
                window.$verk.onError(err, args);
            }
            else {
                console.error(err, args);
            }
        }
    }

    window.$hook = {
        props: {},
        state: {},
    };
    const comps = new Map();
    const fns = new Map();
    const fetchs = new Map();
    const vstart = new RegExp("<v-", "g");
    const vend = new RegExp("</v-", "g");
    const sstart = new RegExp("<v_", "g");
    const send = new RegExp("</v_", "g");
    function appendSc(sc, list) {
        list.push(new Promise((res) => {
            const src = sc.getAttribute("src");
            const sc2 = document.createElement("script");
            sc2.setAttribute("src", src);
            sc2.setAttribute("type", sc.getAttribute("type") || "");
            sc2.onload = res;
            document.head.append(sc2);
        }));
    }
    function loadScripts(el, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield elementLoadScript(el, "script[src]:not([defer])");
            if (el.querySelector("script[defer]")) {
                yield elementLoadScript(el, 'script[defer=""]');
                yield elementLoadScript(el, 'script[defer="1"]');
                yield elementLoadScript(el, 'script[defer="2"]');
                yield elementLoadScript(el, 'script[defer="3"]');
            }
            el.querySelectorAll("script:not([src])").forEach((sc) => {
                fns.set(name, newFnRun(sc.innerHTML));
                sc.remove();
            });
        });
    }
    function elementLoadScript(el, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = [];
            el.querySelectorAll(query).forEach((sc) => {
                appendSc(sc, list);
                sc.remove();
            });
            yield Promise.all(list);
        });
    }
    function loadComponent(html, name) {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            if (!html) {
                return;
            }
            fetchs.set(name, 1);
            html = html.replace(vstart, "<v_");
            html = html.replace(vend, "</v_");
            const el = document.createElement("div");
            el.innerHTML = html;
            const subComps = [];
            el.querySelectorAll("v_component").forEach((com) => {
                subComps.push(new Promise((res) => {
                    loadComponent(com.firstElementChild.innerHTML, com.getAttribute("name")).then(() => {
                        com.remove();
                        res();
                    });
                }));
            });
            yield Promise.all(subComps);
            // const tmp = el.querySelector("template")!;
            // if (tmp) {
            //   await loadComponent(tmp.innerHTML, name);
            //   // return;
            // }
            yield loadScripts(el, name);
            html = el.innerHTML;
            html = html.replace(sstart, "<v-");
            html = html.replace(send, "</v-");
            comps.set(name, html);
            fetchs.set(name, 2);
            res(html);
        }));
    }

    const watch = new Set();
    const events = new Map();
    let time;
    function dispatch() {
        if (time) {
            cancelAnimationFrame(time);
        }
        time = requestAnimationFrame(() => {
            watch.forEach((fn) => fn());
            events.forEach((v, k) => {
                if (Array.isArray(v)) {
                    v.forEach((sub) => {
                        sub();
                    });
                }
                else {
                    v();
                }
            });
        });
    }

    let n = 0;
    function uuid(u = "u") {
        n += 1;
        if (n > 9990) {
            n = 0;
        }
        return u + Date.now().toString().slice(4, 13) + n + "_";
    }

    const tag = "v-for";
    class Item extends HTMLElement {
    }
    customElements.define("v-for-item", Item);
    function getLen(val) {
        if (typeof val === "number") {
            return val;
        }
        if (Array.isArray(val)) {
            return val.length;
        }
        return 0;
    }
    class Component extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_for");
            this._len = newFnReturn(this.getAttribute("len"));
            this._i = new RegExp(this.getAttribute("index") || "@i", "g");
            this._getVal = newFnReturn(this.getAttribute("len"));
            this._html = this.innerHTML;
            this.getH = (i) => {
                const h = this._html.replace(this._i, i);
                return `<v-for-item ${this._id}="${i}">${h}</v-for-item>`;
            };
            this.update = () => {
                const len = getLen(runFn(this._getVal));
                if (typeof this._lastLen === "undefined") {
                    if (len) {
                        let nextHTML = "";
                        for (let i = 0; i < len; i++) {
                            nextHTML += this.getH(i);
                        }
                        this.innerHTML = nextHTML;
                    }
                    else {
                        this.innerHTML = "";
                    }
                    this._lastLen = len;
                    return;
                }
                if (this._lastLen === len) {
                    return;
                }
                if (len > this._lastLen) {
                    for (let i = this._lastLen; i < len; i++) {
                        const list = this.querySelectorAll(`[${this._id}]`);
                        const end = list[list.length - 1];
                        if (end) {
                            end.insertAdjacentHTML("afterend", this.getH(i));
                        }
                    }
                }
                else {
                    for (let i = len; i < this._lastLen; i++) {
                        this.querySelectorAll(`[${this._id}="${i}"]`).forEach((v) => {
                            v.remove();
                        });
                    }
                }
                this._lastLen = len;
            };
            if (!this.closest("v-keep")) {
                events.set(this._id, this.update);
            }
            this.update();
        }
        disconnectedCallback() {
            events.delete(this._id);
        }
    }
    customElements.define(tag, Component);

    const tag$1 = "v-txt";
    class Component$1 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_txt");
            this.update = () => {
                const v = runFn(this._fn);
                if (this.innerHTML !== v) {
                    this.innerHTML = v;
                }
            };
            this._fn = newFnReturn(this.innerHTML);
            if (!this.closest("v-keep")) {
                events.set(this._id, this.update);
            }
            this.update();
        }
        disconnectedCallback() {
            events.delete(this._id);
        }
    }
    customElements.define(tag$1, Component$1);

    const tag$2 = "v-if";
    class Component$2 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_if");
            this._html = this.innerHTML;
            this._getVal = newFnReturn(this.getAttribute("value"));
            this.update = () => {
                const v = runFn(this._getVal);
                if (this._lastVal === v) {
                    return;
                }
                this._lastVal = v;
                if (v) {
                    this.innerHTML = this._html;
                }
                else {
                    this.innerHTML = "";
                }
            };
            if (!this.closest("v-keep")) {
                events.set(this._id, this.update);
            }
            this.update();
        }
        disconnectedCallback() {
            events.delete(this._id);
        }
    }
    customElements.define(tag$2, Component$2);

    const tag$3 = "v-show";
    class Component$3 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_show");
            this._display = this.style.display;
            this.update = () => {
                const v = runFn(this._getVal);
                if (this._lastVal !== void 0 && !!this._lastVal === !!v) {
                    return;
                }
                this._lastVal = !!v;
                if (v) {
                    this.style.display = this._display;
                }
                else {
                    this.style.display = "none";
                }
            };
            this._html = this.innerHTML;
            this._getVal = newFnReturn(this.getAttribute("value"));
            if (!this.closest("v-keep")) {
                events.set(this._id, this.update);
            }
            this.update();
        }
        disconnectedCallback() {
            events.delete(this._id);
        }
    }
    customElements.define(tag$3, Component$3);

    const tag$4 = "v-set";
    const ignoreAttr = {
        query: true,
        model: true,
    };
    function fixKind(el) {
        if (el.__modelName) {
            return;
        }
        const tag = el.tagName.toLowerCase();
        const kind = el.type;
        if (tag === "select") {
            el.__modelName = "onchange";
        }
        else if (tag === "input" || tag === "textarea") {
            el.__modelName = "oninput";
        }
        else {
            el.__modelName = "onclick";
        }
        if (tag === "select") {
            el.__valueName = "value";
        }
        else if (kind === "checkbox") {
            el.__valueName = "checked";
            el.__valueIsBool = true;
        }
        else if (kind === "radio") {
            el.__modelName = "onclick";
            el.__valueName = "checked";
            el.__valueIsBool = true;
        }
        else {
            el.__valueName = "value";
        }
    }
    class Component$4 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("fn");
            this._html = this.innerHTML;
            this._getVal = newFnReturn(this.getAttribute("value"));
            this._model = this.getAttribute("model");
            this._getModel = this._model && newFnReturn(this._model);
            this._attrs = new Map();
            this._query = this.getAttribute("query");
            this.updateModel = () => { };
            this.runModel = () => {
                let v = runFn(this._getModel);
                if (typeof v === "function") {
                    v = runFn(v, this.firstElementChild);
                }
                return v;
            };
            this.update = () => {
                this.updateModel();
                const child = this.firstElementChild;
                if (child) {
                    this._attrs.forEach((fn, k) => {
                        let v = runFn(fn);
                        if (typeof v === "function") {
                            v = runFn(v, this.firstElementChild);
                        }
                        if (k === "value") {
                            if (child[k] !== v) {
                                child[k] = v;
                            }
                        }
                        else if (child.getAttribute(k) !== v) {
                            child.setAttribute(k, v);
                        }
                    });
                }
            };
            this.dispatch = () => {
                if (this._query) {
                    document.querySelectorAll(this._query).forEach((el) => {
                        if (el.update) {
                            el.update();
                        }
                    });
                }
                dispatch();
            };
            let isNeedListen = false;
            if (this.firstElementChild) {
                if (this._getModel) {
                    const el = this.firstElementChild;
                    fixKind(el);
                    el[el.__modelName] = (e) => {
                        if (el.getAttribute("prevent-" + el.__modelName)) {
                            e.preventDefault();
                        }
                        if (el.getAttribute("stop-" + el.__modelName)) {
                            e.stopPropagation();
                        }
                        const v = el[el.__valueName];
                        newFnRun(`${this._model} = ${v};`)(window[this._id]);
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
                        this.firstElementChild[attr.name] = (e) => {
                            runFn(newFnReturn(attr.value)(), e);
                            this.dispatch();
                        };
                    }
                    else if (!ignoreAttr[attr.name]) {
                        isNeedListen = true;
                        const name = attr.name.replace(/^v-/, "");
                        this._attrs.set(name, newFnReturn(attr.value));
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
        disconnectedCallback() {
            this._attrs.clear();
            this._attrs = null;
            events.delete(this._id);
        }
    }
    customElements.define(tag$4, Component$4);

    const tag$5 = "v-component";
    class Component$5 extends HTMLElement {
        constructor() {
            super();
            // html: any;
            this._name = this.getAttribute("name");
            loadComponent(this.innerHTML, this._name);
        }
    }
    customElements.define(tag$5, Component$5);

    const tag$6 = "v-new";
    const srcReg = new RegExp('src="./', "g");
    const hrefReg = new RegExp('href="./', "g");
    const hookReg = /(\$hook|uuid-)/g;
    const renderHookReg = /\$renderHook/g;
    class Component$6 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid();
            this._slot = new Map();
            this._html = this.innerHTML;
            this._tmp = this.querySelector("template");
            this.destroy = false;
            this.renderLoading = () => {
                if (!this._loading && this._tmp) {
                    const el = this._tmp.content.querySelector("[loading]");
                    if (el) {
                        this._loading = true;
                        // this.innerHTML = "";
                        this.append(el.cloneNode(true));
                    }
                }
            };
            this.load = () => {
                if (fetchs.get(this._name) === 1) {
                    this.renderLoading();
                    requestAnimationFrame(this.load);
                    return;
                }
                if (this._tmp) {
                    this._tmp.innerHTML = this._tmp.innerHTML.replace(renderHookReg, this._id);
                    this._tmp.content.querySelectorAll("[slot]").forEach((el) => {
                        const slot = el.getAttribute("slot");
                        const node = el.cloneNode(true);
                        node.removeAttribute("slot");
                        this._slot.set(slot, node);
                    });
                }
                if (fetchs.get(this._name) === 2) {
                    this.onload();
                    this.update();
                    return;
                }
                if (this._isSrc) {
                    this.renderLoading();
                    fetchs.set(this._name, 1);
                    fetch(this._name)
                        .then((v) => v.text())
                        .then((v) => {
                        v = v.replace(srcReg, 'src="./' + this._hook.dir + "/");
                        v = v.replace(hrefReg, 'href="./' + this._hook.dir + "/");
                        fetchs.set(this._name, 2);
                        loadComponent(v, this._name).then(() => {
                            this.onload();
                            this.update();
                        });
                    });
                    return;
                }
                this.innerHTML = "";
                this.onload();
                this.update();
            };
            this.onload = () => { };
            this.update = () => {
                if (this.destroy) {
                    return;
                }
                if (!comps.has(this._name)) {
                    return;
                }
                if (!this._buildHtml) {
                    this._buildHtml = comps.get(this._name);
                    this._fn = fns.get(this._name);
                }
                window[this._id] = this._hook;
                this._buildHtml = this._buildHtml.replace(hookReg, this._id);
                const initDetail = (cb) => {
                    this.innerHTML = this._buildHtml;
                    this._slot.forEach((v, k) => {
                        this.querySelectorAll(`slot[name="${k}"]`).forEach((el) => {
                            Array.from(el.attributes).forEach((attr) => {
                                if (attr.name === "style" || attr.name === "class") {
                                    let old = v.getAttribute(attr.name) || "";
                                    if (old) {
                                        old += " ";
                                    }
                                    v.setAttribute(attr.name, old + attr.value);
                                }
                                else {
                                    v.setAttribute(attr.name, attr.value);
                                }
                            });
                            el.replaceWith(v.cloneNode(true));
                        });
                    });
                    if (typeof cb === "function") {
                        cb();
                    }
                };
                if (this._fn) {
                    Promise.resolve(this._fn(this._hook)).then(initDetail);
                }
                else {
                    initDetail(null);
                }
            };
        }
        connectedCallback() {
            this._name = this.getAttribute("src") || this.getAttribute("name");
            this._isSrc = this.hasAttribute("src");
            this._props = runFn(newFnReturn(this.getAttribute("props") || "{}"));
            const list = this._name.split("/");
            list.pop();
            const dir = list.join("/");
            this._hook = {
                el: this,
                props: this._props,
                id: this._id,
                name: this._name,
                dir,
            };
            this.load();
        }
        disconnectedCallback() {
            this._slot.clear();
            this._slot = null;
            this.destroy = true;
        }
    }
    customElements.define(tag$6, Component$6);

    const tag$7 = "v-watch";
    class Component$7 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_watch");
            this._getVal = newFnReturn(this.getAttribute("value"));
            this.update = () => {
                const v = runFn(this._getVal);
                if (typeof v === "function") {
                    runFn(v);
                }
            };
            if (!this.closest("v-keep")) {
                events.set(this._id, this.update);
            }
        }
        disconnectedCallback() {
            events.delete(this._id);
        }
    }
    customElements.define(tag$7, Component$7);

    const tag$8 = "v-route";
    class Component$8 extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_route");
            this.update = () => {
                if (this._lastHash === location.hash) {
                    return;
                }
                this._lastHash = location.hash;
                const path = this.getAttribute("path") || runFn(this._getVal);
                const v = location.hash.indexOf(path) === 0;
                if (v) {
                    this.innerHTML = this._html;
                }
                else {
                    this.innerHTML = "";
                }
            };
            this._html = this.innerHTML;
            this._getVal = newFnReturn(this.getAttribute("value"));
            events.set(this._id, this.update);
            this.update();
        }
        disconnectedCallback() {
            events.delete(this._id);
        }
    }
    customElements.define(tag$8, Component$8);

    const tag$9 = "v-shadow";
    class Component$9 extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({
                mode: this.getAttribute("mode") || "open",
            });
            const tmp = this.querySelector("template");
            if (tmp) {
                tmp.content.querySelectorAll("script:not([src])").forEach((sc) => {
                    newFnRun(sc.innerHTML)();
                    sc.remove();
                });
                this.shadow.innerHTML = tmp.innerHTML;
            }
        }
    }
    customElements.define(tag$9, Component$9);

    const tag$a = "v-preload";
    class Component$a extends HTMLElement {
        constructor() {
            super();
            this._id = uuid("v_preload");
            this.onload = newFnRun(this.getAttribute("onload"));
            const pList = [];
            this.querySelectorAll('link[rel="verk"]').forEach((el) => {
                const href = el.getAttribute("href");
                el.remove();
                const vn = document.createElement("v-new");
                vn.destory = true;
                if (fetchs.get(href) === 1) {
                    pList.push(new Promise((res) => {
                        function checkHref() {
                            requestAnimationFrame(() => {
                                if (fetchs.get(href) !== 2) {
                                    checkHref();
                                }
                                else {
                                    res();
                                }
                            });
                        }
                        checkHref();
                    }));
                }
                else {
                    fetchs.set(href, 1);
                    vn.setAttribute("src", href);
                    pList.push(new Promise((res) => {
                        vn.onload = () => {
                            fetchs.set(href, 2);
                            res();
                        };
                        this.append(vn);
                    }));
                }
            });
            Promise.all(pList).then(() => {
                this.innerHTML = "";
                this.onload();
            });
        }
    }
    customElements.define(tag$a, Component$a);

    function initByCode(code) {
        return new Promise((res) => {
            const name = uuid();
            window[name] = {};
            code = code.replace(/(\$hook|uuid-)/g, name);
            const tmp = document.createElement("div");
            try {
                tmp.innerHTML = code;
            }
            catch (err) { }
            loadComponent(tmp.innerHTML, name).then(() => {
                if (tmp.querySelector("script[src]")) {
                    tmp.querySelectorAll("script[src]").forEach((e) => {
                        document.head.append(e.cloneNode(true));
                    });
                }
                try {
                    tmp.querySelectorAll("script:not([src])").forEach((e) => {
                        eval(e.innerHTML);
                    });
                    res(code);
                }
                catch (err) { }
            });
        });
    }

    const verk = {
        uuid,
        watch,
        dispatch,
        events,
        load: loadComponent,
        loadScripts,
        onError: console.error,
        initByCode,
    };
    window.$verk = verk;

    return verk;

}));
