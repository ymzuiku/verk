import { coms, comScripts } from "./data";

export function removeComponent(name: string) {
  delete coms[name];
  delete comScripts[name];
}
