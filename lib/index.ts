import './fixParams';
import { middlewareByUpdate, updateAll, middlewareByInit, setVerk } from './update'
import { ReducerList, Reducer } from './utils';

const $verk = {
  update: updateAll,
  middlewareByUpdate,
  middlewareByInit,
  Reducer,
  ReducerList,
};

window.addEventListener('load', function () {
  (document.querySelectorAll('[v-verk]') as any).forEach(function (el: HTMLElement) {
    setVerk(el);
    updateAll(el);
    setTimeout(() => {
      if (el.style.visibility === 'hidden') {
        el.style.visibility = 'visible';
      }
    }, 200);
  });
});

export default $verk;