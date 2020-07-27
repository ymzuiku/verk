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
import { loadComponent, loadScripts } from "./component";

import { watch, dispatch, events } from "./ob";
import { uuid } from "./uuid";

const verk = {
  uuid,
  watch,
  dispatch,
  events,
  load: loadComponent,
  loadScripts,
};

(window as any).$verk = verk;

export default verk;
