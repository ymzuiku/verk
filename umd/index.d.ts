import { queryUpdate } from './update';
import './fixParams';
declare const violent: {
    init: (node: any) => void;
    update: (node: any) => void;
    queryUpdate: typeof queryUpdate;
    middlewareByUpdate: Function[];
    middlewareByInit: Function[];
};
export default violent;
