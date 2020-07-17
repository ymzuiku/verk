import './fixParams';
import { middlewareByUpdate, updateAll, middlewareByInit, setViolent } from './update'
import { ReducerList, Reducer } from './utils';

const $violent = {
  update: updateAll,
  middlewareByUpdate,
  middlewareByInit,
  Reducer,
  ReducerList,
};

window.addEventListener('load', function () {
  (document.querySelectorAll('[violent]') as any).forEach(function (el: HTMLElement) {
    setViolent(el);
    updateAll(el);
    setTimeout(() => {
      if (el.style.visibility === 'hidden') {
        el.style.visibility = 'visible';
      }
    }, 200);
  });
});

export default $violent;