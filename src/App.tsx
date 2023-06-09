import { CodeBlock } from "~/components";
import { ReactCode } from "./data";

export interface DevPageProps {}

export default function App({}: DevPageProps) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CodeBlock
        name="App.tsx"
        width={900}
        height={500}
        code={ReactCode}
        type="react"
      />
    </div>
  );
}
