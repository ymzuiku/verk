import { middlewareByUpdate, updateAll, middlewareByInit, setViolent } from './update'
import bindTemplate from './bindTemplate';
// import { initObserver } from './obs';
import './fixParams';

const $violent = {
  update: updateAll,
  middlewareByUpdate,
  middlewareByInit,
};

window.addEventListener('load', function () {
  setViolent(document.body);
  // initObserver();
  document.querySelectorAll('template').forEach(function (node) {
    bindTemplate(node);
  })
  updateAll(document.body);
  setTimeout(() => {
    if (document.body.style.visibility === 'hidden') {
      document.body.style.visibility = 'visible';
    }
  }, 200);
});

export default $violent;