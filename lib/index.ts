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

const verk = {
  watch,
  dispatch,
  events,
};

(window as any).$verk = verk;

export default verk;
