export declare class DiffElement extends HTMLElement {
    _id: string;
    _diff: any;
    _lastDiff: any;
    constructor();
    init: () => void;
    keepUpdate: () => void;
    update: () => void;
    disconnectedCallback(): void;
}
