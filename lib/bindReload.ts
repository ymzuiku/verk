import bindEvents from './bindEvents';
import { updateAsync } from './update'
import bindTemplate from './bindTemplate'
import { Reducer } from './utils';

export const middlewareByInit: Function[] = [bindTemplate, bindEvents]

export const bindReload = Reducer(function (node) {
  updateAsync(node)
  middlewareByInit.forEach(function (fn) {
    fn(node)
  })
});
