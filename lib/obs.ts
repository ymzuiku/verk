import { bindReload, setViolent } from './update'
const observerOptions = {
  childList: true,
  attributes: false,
  subtree: true,
}

const observer = new MutationObserver((mutations) => {
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].addedNodes.length > 0) {
      setViolent(mutations[i].target as any);
      bindReload(mutations[i].target);
      // mutations[i].addedNodes.forEach(node => {
      //   if (node.nodeType !== 1) return;
      //   setViolent(node as any);
      //   bindReload(node as any)
      // })
    }
  }
})

export function initObserver() {
  observer.observe(document.body, observerOptions);
}
