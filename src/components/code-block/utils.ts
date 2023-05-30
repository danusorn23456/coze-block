import { definitionNames } from "./code-indicator";
import { CodeBlockRender, CodeBlockType, CodeRole } from "./type";

let codeColors: Record<CodeRole, string> = {
  code: "#FFFFFF",
  argument: "#79C0FF",
  comment: "#777777",
  value: "#FFFFFF",
  caller: "#D1A8FC",
  string: "#9FCFF6",
  definition: "#FE7A72",
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

export function toRowsString(string: string): string[] {
  return string.includes("\n")
    ? string.split("\n").filter((v: any) => v)
    : JSON.stringify(string, null, 2)
        .split("\n")
        .filter((v) => v);
}

export function toRowsSplitStrings(stringArr: string[]) {
  return stringArr?.map((row) => {
    // separate text
    // replace /\s\s/ is for some string will have unneccessory tab so we get it out
    // split complex pattern to get each part of word letter ex : ( { ; , . </
    // map some code to valid to entity to visual in html
    return row
      .replace(/\u200B/g, "&nbsp;")
      .split(/(?<=[\(\{\;\,\}\)\[\:>\s=.<])|(?=[\\{\;\,\}\)\[\]/>==\s])/g)
      .map((text) => toEntity(text).replace(/\s/g, "&nbsp;"));
  });
}

export function toCodeBlockFormat(
  rowSplitStrings: string[][],
  type: CodeBlockType
): CodeBlockRender {
  const result: CodeBlockRender = [];
  let insideString = false;
  let insideElement = 0;

  rowSplitStrings?.forEach((texts, parentIndex) => {
    result[parentIndex] = [];

    texts.forEach((text, index) => {
      let role: CodeRole = "code";

      if (/^["']$/.test(text)) {
        insideString = !insideString;
      }

      if (text === "&#60;" || text === "&#60;/") {
        insideElement = index;
      } else if (text === "&#62;" || text === "/&#62;") {
        insideElement = 0;
      }

      const isCSS = type === "css";
      const isSASS = type === "sass";
      const isDifinition = definitionNames.includes(text);
      const isString = text.includes('"');
      const isArgument =
        (!text.match(/&nbsp;/g) && !text.match(/{|}/g) && text.includes(":")) ||
        texts?.[index + 1] === "=";

      const isTag = ["&#60;", "&#62;"].some((p) => text.includes(p));
      const isCaller = text.charAt(text.length - 1) === "(" || text === ")";
      const isComponentTag = insideElement && index === insideElement + 1;
      const isSymbol = ["=", "-", ".", ","].some((p) => text === p);

      if (isSymbol) {
        role = "code";
      } else if (isDifinition) {
        role = "definition";
      } else if (isCaller) {
        role = "caller";
      } else if (isString) {
        role = "string";
      } else if (isArgument) {
        if ((isCSS || isSASS) && texts[index - 1] !== "&nbsp;") {
          role = "code";
        } else {
          role = "argument";
        }
      } else if (isTag) {
        role = "tagWrapper";
      } else if (isComponentTag) {
        role = "componentTag";
      }

      result[parentIndex].push({
        text,
        role,
      });
    });
  });

  return result;
}
