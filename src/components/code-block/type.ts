export type CodeBlockType = "js" | "css" | "html" | "react" | "sass";

export type CodeRole =
  | "definition"
  | "caller"
  | "typeWrapper"
  | "naming"
  | "operator"
  | "componentTag"
  | "htmlTag"
  | "tagWrapper"
  | "value"
  | "argument"
  | "symbol"
  | "code"
  | "string"
  | "comment"
  | "enter";

export interface CodeBlockObject {
  text: string;
  role: CodeRole;
}

export type CodeBlockObjectArrays = CodeBlockObject[];

export type CodeBlockRender = CodeBlockObjectArrays[];
