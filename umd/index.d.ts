import './fixParams';
import { ReducerList, Reducer } from './utils';
declare const $violent: {
    update: (node: any, cb?: Function | undefined) => void;
    middlewareByUpdate: Function[];
    middlewareByInit: Function[];
    Reducer: typeof Reducer;
    ReducerList: typeof ReducerList;
};
export default $violent;
