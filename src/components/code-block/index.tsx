import { CSSProperties, HTMLAttributes, useEffect, useState } from "react";
import {
  getTagColor,
  toCodeBlockFormat,
  toRowsSplitStrings,
  toRowsString,
} from "./utils";
import "./index.css";
import { CodeBlockRender, CodeBlockType } from "./type";

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  code?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  type: CodeBlockType;
}

function CodeBlock({
  code: initialCode,
  width = "100%",
  height = 400,
  type = "js",
  name = "",
  ...rest
}: CodeBlockProps) {
  const [codeTemplateArray, setCodeTemplateArray] = useState<CodeBlockRender>(
    []
  );

  function handleCopy() {
    navigator.clipboard.writeText(initialCode || "");
  }

  useEffect(
    function manipulateCodeTag() {
      if (!!initialCode) {
        setCodeTemplateArray(() => {
          const rowsString: string[] = toRowsString(initialCode);
          const rowSplitStrings: string[][] = toRowsSplitStrings(rowsString);
          return toCodeBlockFormat(rowSplitStrings, type);
        });
      }
    },
    [initialCode, type]
  );

  return (
    <div
      {...rest}
      className={["cb-wrapper", rest.className || ""].join(" ")}
      style={{
        width,
        height,
        ...(rest.style || {}),
      }}
    >
      <div className="cb-row cb-heading">
        <div className="cb-index"></div>
        <span className="cb-filename">{name}</span>
        <button onClick={handleCopy} className="cb-copy-btn">
          copy
        </button>
      </div>
      {codeTemplateArray.map((row, parentIndex) => (
        <div key={parentIndex} className="cb-row">
          <div className="cb-index">{parentIndex + 1}</div>
          <div key={parentIndex} style={{ whiteSpace: "nowrap" }}>
            {row.map(({ text, role }, index) => (
              <span
                key={index}
                data-role={role}
                style={{ color: getTagColor(role) }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { CodeBlock };
