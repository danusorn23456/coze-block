import { CodeBlock } from "~/components";
import { CSSCode, ReactCode } from "./data";

export interface DevPageProps {}

export default function App({}: DevPageProps) {
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
