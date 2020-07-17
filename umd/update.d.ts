import { HTMLAny } from './interface';
export declare function setViolent(node: HTMLAny): void;
export declare function queryUpdate(query: string | null): void;
export declare const update: (node: any) => void;
export declare const middlewareByUpdate: Function[];
export declare function updateAsync(node: HTMLAny): void;
export declare const middlewareByInit: Function[];
export declare const bindReload: (node: any) => void;
