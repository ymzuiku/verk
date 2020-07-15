import { queryUpdate } from './update';
import './fixParams';
import './obs';
declare const violent: {
    init: (node: any) => void;
    update: (node: any) => void;
    queryUpdate: typeof queryUpdate;
    middlewareByUpdate: Function[];
    middlewareByInit: Function[];
};
export default violent;
