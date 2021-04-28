import { changeEle } from "./changeEle";
import { next } from "./next";
// import { changeEle } from "./changeEle";

(window as any).next = next;

window.onload = () => {
  changeEle(document.body, window);
  document.body.hidden = false;

  // 页面内容变更监听 recordSetAttr
  // const onMutations = (mutationsList: any, ...args: any[]) => {
  //   const len = mutationsList.length;
  //   for (let i = 0; i < len; i++) {
  //     const mutation = mutationsList[i];
  //     if (mutation.type === "childList") {
  //       const ele = mutation.target as HTMLElement;
  //       console.log(ele);
  //       if (!ele.getAttribute("v-ob")) {
  //         changeEle(ele, window);
  //       }
  //     }
  //   }
  // };

  // const observer = new MutationObserver(onMutations);
  // observer.observe(document.body, {
  //   childList: true,
  //   subtree: true,
  //   attributes: false,
  //   characterData: false,
  //   attributeOldValue: false,
  //   characterDataOldValue: false,
  // });
};
