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
import { dispatch } from "./ob";
declare const verk: {
  watch: Set<unknown>;
  dispatch: typeof dispatch;
  events: Map<any, any>;
};
export default verk;
