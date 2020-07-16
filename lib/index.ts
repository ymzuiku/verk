import { update, queryUpdate, middlewareByUpdate } from './update'
import { bindReload, middlewareByInit } from './bindReload'
import bindTemplate from './bindTemplate';
import { initObserver } from './obs';
import { initEffetcFlavorcss } from './runtimeFlavorcss';
import './fixParams';

const violent = {
  reload: bindReload,
  update,
  queryUpdate,
  middlewareByUpdate,
  middlewareByInit,
};

window.addEventListener('load', function () {
  initObserver();
  initEffetcFlavorcss();
  document.querySelectorAll('template').forEach(function (node) {
    bindTemplate(node);
  })
  bindReload(document.body);
  setTimeout(() => {
    if (document.body.style.visibility === 'hidden') {
      document.body.style.visibility = 'visible';
    }
  }, 200);
});

export default violent;