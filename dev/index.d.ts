import "./fixParams";
import { ReducerList, Reducer, uuid } from "./utils";
import { removeComponent } from './bindTemplate';
declare const $verk: {
    update: (node: any, cb?: Function | undefined) => void;
    middlewareByUpdate: Function[];
    middlewareByInit: Function[];
    Reducer: typeof Reducer;
    ReducerList: typeof ReducerList;
    removeComponent: typeof removeComponent;
    uuid: typeof uuid;
};
export default $verk;
