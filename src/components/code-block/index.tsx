import { CSSProperties, HTMLAttributes, useEffect, useState } from "react";
import { containsOnlyLetters, getTagColor, toEntity } from "./utils";
import "./index.css";
import { CodeBlockRender, CodeBlockType, CodeRole } from "./type";

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
      if (initialCode) {
        //codeRows perform conditonal split json to includes \n that we can use it to split(\n) to array with code row
        const codeRows: string[] = initialCode.includes("\n")
          ? initialCode.split("\n").filter((v) => v)
          : JSON.stringify(initialCode, null, 2)
              .split("\n")
              .filter((v) => v);
        let codeStringArray: string[][] = [];
        let codeCompactBlock: CodeBlockRender = [];
        let codeBlockWithNewRow: CodeBlockRender = [];

        // split code in code row
        codeRows?.forEach((row) => {
          // separate text
          // replace /\s\s/ is for some string will have unneccessory tab so we get it out
          // split complex pattern to get each part of word letter ex : ( { ; , . </
          // map some code to valid to entity to visual in html
          const genTexts = row
            .replace(/\u200B/g, "&nbsp;")
            .split(/(?<=[\(\{\;\,\}\)\[\>\s=.<])|(?=[\\{\;\,\}\)\[\]/>==\s])/g)
            .map((text) => toEntity(text).replace(/\s/g, "&nbsp;"));

          // detect for new line condition
          if (
            ["function"].some((str) => genTexts.includes(str)) &&
            genTexts.every((v) => v !== "&nbsp;")
          ) {
            // so format of simplify be like [...,[""],...,[""]] we will render [""] as empty row
            codeStringArray.push([""]);
          }

          codeStringArray.push(genTexts);
        });

        codeStringArray.forEach((texts, parentIndex) => {
          codeCompactBlock[parentIndex] = [];
          texts.forEach((text, index) => {
            let firstText = text[0] ?? "";
            let previousText = texts?.[index - 1] ?? "";
            let previous2Text = texts?.[index - 2] ?? "";
            let nextText = texts?.[index + 1] ?? "";
            let next2Text = texts?.[index + 2] ?? "";
            let lastText = text[text.length - 1] ?? "";
            let role: CodeRole = "code";

            if (
              [
                "function",
                "const",
                "let",
                "var",
                "return",
                "import",
                "export",
                "from",
              ].some((p) => text === p)
            ) {
              role = "decleartion";
            } else if (
              [`"`].some((p) => firstText && lastText == p) ||
              previous2Text[previous2Text.length - 1] === ":"
            ) {
              role = "value";
            } else if (
              firstText === `"` ||
              lastText === `"` ||
              firstText === `'` ||
              lastText === `'` ||
              (previousText == "&nbsp;" &&
                nextText === "&nbsp;" &&
                lastText !== ":")
            ) {
              role = "string";
            }

            // Agument Case
            if (
              [":"].some((p) => lastText === p) ||
              nextText === "=" ||
              next2Text == "{"
            ) {
              role = "argument";
            }

            if (lastText === "(" || text === "|" || text === ")") {
              role = "caller";
            }

            // Operator Case
            if (
              ["*", "-", "/", "="].some(
                (p) =>
                  text === p &&
                  previousText === "&nbsp;" &&
                  nextText === "&nbsp;"
              )
            ) {
              role = "operator";
            }

            // Html Case
            if (previousText === "&#60;") {
              if (
                text.replace(/\//g, "")?.[0] ===
                text.replace(/\//g, "").toUpperCase()?.[0]
              ) {
                role = "componentTag";
              } else {
                role = "htmlTag";
              }
            }

            // Comment Case
            if (
              (texts?.[0] === "/" && texts?.[0] === "/") ||
              texts[0] === "/*"
            ) {
              role = "comment";
            }

            if (type === "css") {
              text = text.replace(/"/g, "");
            }

            codeCompactBlock[parentIndex].push({
              text,
              role,
            });
          });
        });

        codeCompactBlock.forEach((row, index) => {
          let startWith = row.filter((v) => v.text !== "&nbsp;")[0].text;
          if (
            (index && startWith === ".") ||
            (startWith[0] === startWith[0].toUpperCase() &&
              containsOnlyLetters(startWith[0])) ||
            ["function", "return"].some((p) => startWith === p)
          ) {
            codeBlockWithNewRow.push([{ text: "", role: "enter" }]);
          }
          codeBlockWithNewRow.push(row);
        });

        setCodeTemplateArray(codeBlockWithNewRow);
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
          <div
            style={{
              width: 60,
              flexShrink: 0,
              userSelect: "none",
              textAlign: "end",
              marginRight: 24,
            }}
          >
            {parentIndex + 1}
          </div>
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
