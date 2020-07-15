import { bindInit } from './bindInit'
const observerOptions = {
  childList: true,
  attributes: false,
  subtree: true,
}

const observer = new MutationObserver((mutations) => {
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].addedNodes.length > 0) {
      mutations[i].addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        bindInit(node as any)
      })
    }
  }
})

export function initObserver() {
  observer.observe(document.body, observerOptions);
}
