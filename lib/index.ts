import { update, queryUpdate, middlewareByUpdate, bindReload, middlewareByInit } from './update'
import bindTemplate from './bindTemplate';
import { initObserver } from './obs';
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