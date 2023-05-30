export const CSSCode = `
.cb-row{
  height: 22px;
  display: flex;
}

.cb-row:hover{
  background: rgb(31, 31, 31);
}

.cb-wrapper{
  padding: 20px;
  font-size: 14px;
  font-family: monospace;
  background: rgb(16, 20, 27);
}
/* width */
.cb-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
.cb-wrapper::-webkit-scrollbar-track {
  background-color: #222222;
}

/* Handle */
.cb-wrapper::-webkit-scrollbar-thumb {
  background: #ffffff;
}
`;

export const ReactCode = `
import { CodeBlock } from "~/components";
import { CSSCode, ReactCode } from "./data";

export interface DevPageProps {}

export default function App({}: DevPageProps) {
  
  const a,b,c,d = 10
  let b = "dog";
  let c = {
    a:1,
    b:"2"
  }
  
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <CodeBlock
        height={"100%"}
        style={{ flex: 1 }}
        code={CSSCode}
        type="css"
      />
      <CodeBlock
        height={"100%"}
        style={{ flex: 1 }}
        code={ReactCode}
        type="react"
      />
    </div>
  );
}

`;
