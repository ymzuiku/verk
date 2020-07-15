import { update, queryUpdate, middlewareByUpdate } from './update'
import { bindInit, middlewareByInit } from './bindInit'
import bindTemplate from './bindTemplate';
import './fixParams';
import './obs';

const violent = {
  init: bindInit,
  update,
  queryUpdate,
  middlewareByUpdate,
  middlewareByInit,
};

window.addEventListener('load', function () {
  document.querySelectorAll('template').forEach(function(node){
    bindTemplate(node);
  })
  bindInit(document.body);
  setTimeout(() => {
    if (document.body.style.visibility === 'hidden') {
      document.body.style.visibility = 'visible';
    }
  }, 200);
});

export default violent;