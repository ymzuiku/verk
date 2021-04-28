import { vIf } from "./vIf";
import { vNew } from "./vNew";
import { vDyn } from "./vDyn";
import { vFor } from "./vFor";

window.onload = () => {
  document.querySelectorAll("[v-if]").forEach((node) => {
    vIf(node as any, null);
  });
  document.querySelectorAll("[v-new]").forEach((node) => {
    vNew(node as any, null);
  });
  document.querySelectorAll("[v-for]").forEach((node) => {
    vFor(node as any, null);
  });
  document.querySelectorAll("*:not([v-dyn])").forEach((node) => {
    vDyn(node as any, null);
  });
  document.body.hidden = false;
};
