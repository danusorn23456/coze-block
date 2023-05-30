import { CodeRole } from "./type";

let codeColors: Record<CodeRole, string> = {
  code: "#FFFFFF",
  argument: "#79C0FF",
  comment: "#777777",
  value: "#FFFFFF",
  caller: "#D1A8FC",
  string: "#9FCFF6",
  decleartion: "#FE7A72",
  htmlTag: "#7EE787",
  operator: "blue",
  tagWrapper: "green",
  componentTag: "#C8D0D8",
  typeWrapper: "orange",
  naming: "white",
  symbol: "pink",
  enter: "",
};

export function containsOnlyLetters(str: string) {
  return /^[a-zA-Z]+$/.test(str);
}

export function getTagColor(is: CodeRole) {
  return codeColors[is];
}

export function toEntity(s: string) {
  return s.replace(/[\u00A0-\u9999<>\&]/g, (i) => "&#" + i.charCodeAt(0) + ";");
}
