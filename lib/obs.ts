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
    }
  }
})

export function initObserver() {
  observer.observe(document.body, observerOptions);
}
