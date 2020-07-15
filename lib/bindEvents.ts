import { HTMLAny } from './interface'
import { queryUpdate } from './update'
import { onError } from './onError';

const events = new Set([
  'abort',
  'animationcancel',
  'animationend',
  'animationiteration',
  'animationstart',
  'auxclick',
  'blur',
  'cancel',
  'canplay',
  'canplaythrough',
  'change',
  'click',
  'close',
  'contextmenu',
  'copy',
  'cuechange',
  'cut',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragexit',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'focus',
  'focusin',
  'focusout',
  'fullscreenchange',
  'fullscreenerror',
  'gotpointercapture',
  'input',
  'invalid',
  'keydown',
  'keypress',
  'keyup',
  'load',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'lostpointercapture',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'paste',
  'pause',
  'play',
  'playing',
  'pointercancel',
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'progress',
  'ratechange',
  'reset',
  'resize',
  'scroll',
  'securitypolicyviolation',
  'seeked',
  'seeking',
  'select',
  'selectionchange',
  'selectstart',
  'stalled',
  'submit',
  'suspend',
  'timeupdate',
  'toggle',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'transitioncancel',
  'transitionend',
  'transitionrun',
  'transitionstart',
  'volumechange',
  'waiting',
  'wheel',
])


export default function bindEvents(node: HTMLAny) {
  function bind(el: HTMLAny) {
    if (!el || !el.attributes) {
      return;
    }
    const l = el.attributes.length;
    const query = el.getAttribute('query');

    for (let i = 0; i < l; i++) {
      const attr = el.attributes.item(i)
      if (attr && events.has(attr.name)) {
        const fnKey = 'on' + attr.name;
        (el)[fnKey] = function (event: any) {
          let res;
          const value = event && event.target && event.target.value;
          try {
            res = new Function('$self', '$event', '$value', 'return ' + attr.value!)(el, event, value)
          } catch (err) {
            onError(err, el);
          }

          if (typeof res === 'function') {
            res(event)
          }
          queryUpdate(query)
        }
      }
    }
  }
  if (node.getAttribute('on')) {
    bind(node as any);
  }

  (node.querySelectorAll('[click], [input], [change], [scroll], [submit], [keydown], [all-events]') as any).forEach(bind);
}
