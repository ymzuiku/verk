// import { updateAll, setViolent } from './update'
// const observerOptions = {
//   childList: true,
//   attributes: false,
//   subtree: true,
// }

// const observer = new MutationObserver((mutations) => {
//   for (let i = 0; i < mutations.length; i++) {
//     const node = mutations[i].target as HTMLElement;
//     setViolent(node);
//     if (!node.getAttribute('ignore-observer')) {
//       updateAll(node);
//     } else {
//       console.log('0000', node);
//     }
//   }
// })

// export function initObserver() {
//   observer.observe(document.body, observerOptions);
// }
