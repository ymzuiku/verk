import { vOn } from "./vOn";
import { vIf } from "./vIf";
import { vNew } from "./vNew";
import { vOb } from "./vOb";
import { vFor } from "./vFor";

export const changeEle = (parent: HTMLElement, self: any) => {
  vIf(parent as any, window);
  vFor(parent as any, window);
  vOn(parent as any, window);
  vOb(parent as any, window);
  vNew(parent as any, window);

  parent.querySelectorAll("[v-if]").forEach((node) => {
    vIf(node as any, window);
  });
  parent.querySelectorAll("[v-for]").forEach((node) => {
    vFor(node as any, window);
  });
  parent.querySelectorAll("*").forEach((node) => {
    vOn(node as any, window);
  });
  parent.querySelectorAll("*").forEach((node) => {
    vOb(node as any, window);
  });
  parent.querySelectorAll("[v-new]").forEach((node) => {
    vNew(node as any, window);
  });
};
