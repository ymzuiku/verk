import { loadComponent, loadScripts } from "./component";
import "./v-for";
import "./v-txt";
import "./v-if";
import "./v-show";
import "./v-txt";
import "./v-set";
import "./v-component";
import "./v-new";
import "./v-watch";
import "./v-route";
import "./v-shadow";
import "./v-preload";

import { watch, dispatch, events } from "./ob";
import { uuid } from "./uuid";
import { initByCode } from "./initByCode";

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

(window as any).$verk = verk;

export default verk;
