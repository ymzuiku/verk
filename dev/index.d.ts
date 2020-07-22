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
import { dispatch } from "./ob";
import * as deep from "./deep";
declare const verk: {
    watch: Set<unknown>;
    dispatch: typeof dispatch;
    events: Map<any, any>;
    deep: typeof deep;
};
export default verk;
