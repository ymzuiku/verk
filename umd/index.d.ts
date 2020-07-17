import { queryUpdate } from './update';
import './fixParams';
declare const $violent: {
    reload: (node: any, cb?: Function | undefined) => void;
    update: (node: any, cb?: Function | undefined) => void;
    queryUpdate: typeof queryUpdate;
    middlewareByUpdate: Function[];
    middlewareByInit: Function[];
};
export default $violent;
