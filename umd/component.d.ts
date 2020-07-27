export declare const comps: Map<any, any>;
export declare const fns: Map<any, any>;
export declare const fetchs: Map<any, any>;
export declare function stringToHex(str: string, pix?: string): string;
export declare function loadScripts(el: HTMLElement, name: string): Promise<void>;
export declare function elementLoadScript(el: Element, query: string): Promise<void>;
export declare function loadComponent(html: string, name: string): Promise<unknown>;
