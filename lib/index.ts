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
import { watch, dispatch, events } from "./ob";
import * as deep from "./deep";

const verk = {
  watch,
  dispatch,
  events,
  deep,
};

(window as any).$verk = verk;

export default verk;
