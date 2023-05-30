import React from "react";
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
  ...rest
}: CodeBlockProps) {
  const [codeTemplateArray, setCodeTemplateArray] = useState<CodeBlockRender>(
    []
  );

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
      className={["cb-wrapper text-white", rest.className || ""].join(" ")}
      style={{
        width,
        height,
        border: "1px solid dimgray",
        overflow: "auto",
        borderRadius: "8px",
        ...(rest.style || {}),
      }}
    >
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
