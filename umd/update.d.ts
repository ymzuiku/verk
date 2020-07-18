import { HTMLAny } from "./interface";
export declare function setVerk(node: HTMLElement): void;
export declare function queryUpdate(query: string | null): void;
export declare const updateAttrs: (node: any, cb?: Function | undefined) => void;
export declare const middlewareByUpdate: Function[];
export declare function updateAsync(node: HTMLAny): void;
export declare const middlewareByInit: Function[];
export declare const updateAll: (node: any, cb?: Function | undefined) => void;
