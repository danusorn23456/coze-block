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
function DevPage({ ...rest }: DevPageProps) {
  return (
    <MainLayout {...rest}>
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        <CodeBlock code={a} type="css" />
        <CodeBlock code={b} type="js" />
        <CodeBlock code={c} type="js" />
      </div>
    </MainLayout>
  )
}`;
