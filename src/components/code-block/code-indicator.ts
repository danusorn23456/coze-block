export const definitionNames = [
  "function",
  "from",
  "class",
  "const",
  "let",
  "var",
  "if",
  "else",
  "switch",
  "case",
  "default",
  "for",
  "while",
  "do",
  "try",
  "catch",
  "finally",
  "return",
  "break",
  "continue",
  "import",
  "export",
  "await",
  "async",
  "typeof",
  "instanceof",
  "new",
  "delete",
  "this",
  "super",
  "undefined",
  "null",
  "NaN",
  "true",
  "false",
];

export const definitionNamesMap = definitionNames.reduce(
  (obj: Record<string, string>, name) => {
    obj[name] = name;
    return obj;
  },
  {}
);
