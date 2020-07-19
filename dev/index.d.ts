import "./fixParams";
import { ReducerList, Reducer, uuid } from "./utils";
import { removeComponent } from "./bindTemplate/removeComponent";
import initElement from './initElement';
declare function update(el: HTMLElement): void;
declare const $verk: {
    initElement: typeof initElement;
    update: typeof update;
    middlewareByUpdate: Function[];
    middlewareByInit: Function[];
    Reducer: typeof Reducer;
    ReducerList: typeof ReducerList;
    removeComponent: typeof removeComponent;
    uuid: typeof uuid;
};
export default $verk;
