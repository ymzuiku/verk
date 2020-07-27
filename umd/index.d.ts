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
import { dispatch } from "./ob";
import { uuid } from "./uuid";
declare const verk: {
    uuid: typeof uuid;
    watch: Set<unknown>;
    dispatch: typeof dispatch;
    events: Map<any, any>;
    load: typeof loadComponent;
    loadScripts: typeof loadScripts;
    onError: {
        (message?: any, ...optionalParams: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
};
export default verk;
